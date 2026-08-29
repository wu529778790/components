/**
 * 右上角头像账号组件（UserAvatar）
 *
 * 交互流程：
 *   - 未登录：默认人形头像，点击 → 弹微信订阅号认证登录窗（走 sdk.requireAuth）
 *   - 已登录：真实头像（微信 > GitHub > 昵称首字母），Hover/点击 → 下拉菜单（设置 / 退出登录）
 *   - 设置弹窗：头像昵称 + openid、绑定/解绑 GitHub、修改昵称
 *
 * 零运行时依赖，原生 DOM。样式 --ua-* CSS 变量驱动（见 src/styles.css）。
 *
 * @param container 渲染容器（HTMLElement 或 Web Component 的 shadow root），默认 document.body
 */
import type { WxAuthApi } from './wx-auth'
import { getWindowSdk } from './wx-auth'
import type { WxUserInfo } from './types'
import portalStyles from './styles.css'
import {
  getAuthToken,
  deleteAuthCookies,
  cleanupJunkTokens,
  escapeHtml,
  escapeAttr,
  USER_ICON_SVG,
  SETTINGS_ICON,
  LOGOUT_ICON,
  CLOSE_ICON,
  GITHUB_ICON
} from './utils'

export interface UserAvatarTheme {
  /** 头像按钮背景 */
  btnBg?: string
  /** 头像尺寸 */
  size?: string
  /** 主色（登录/保存按钮、焦点色、已绑定标签） */
  accent?: string
  /** 头像按钮边框 */
  btnBorder?: string
  /** 圆角 */
  radius?: string
  /** 卡片/菜单背景 */
  bg?: string
  /** 正文文字色 */
  text?: string
  /** 次要文字色 */
  subText?: string
  /** 遮罩色 */
  overlay?: string
  /** 危险色（退出登录/解绑） */
  danger?: string
  /** 成功色 */
  success?: string
}

export interface UserAvatarOptions {
  /** wx-auth-sdk 实例（缺省时自动从 window.WxAuth 读取） */
  sdk?: WxAuthApi
  /** 后端 API 地址（userinfo/profile/oauth 前缀），留空走同域 */
  apiBase?: string
  /** 是否 fixed 固定右上角，默认 true */
  fixed?: boolean
  /** 右上角偏移（CSS，'top right'），默认 '1rem 1.5rem' */
  offset?: string
  /** 头像尺寸，默认 '2.5rem' */
  size?: string
  /** 弹窗 z-index，默认 12000（比 wx-auth 登录弹窗 9999 高） */
  zIndex?: number
  /**
   * 是否将设置弹窗 / 下拉菜单渲染到 body（Portal），默认 true。
   * 开启后弹窗与菜单脱离 this.root，避免被带 backdrop-filter / transform /
   * filter / contain / overflow 的祖先当作 containing block 或裁剪，
   * 从而始终全屏居中、不被裁剪。
   */
  portal?: boolean
  /**
   * Portal 渲染容器（仅在 portal 为 true 时生效）。
   * 缺省为 document.body。可传入自定义容器（须位于页面顶层，且自身不被
   * transform / overflow 影响）。
   */
  portalEl?: HTMLElement
  /** 主题（映射 --ua-* CSS 变量） */
  theme?: UserAvatarTheme
  /** 登录成功回调 */
  onLogin?: (user: WxUserInfo) => void
  /** 退出登录回调 */
  onLogout?: () => void
  /** GitHub 绑定成功回调 */
  onGithubBound?: (user: WxUserInfo) => void
}

type Theme = Required<UserAvatarTheme>

interface ResolvedOptions {
  sdk?: WxAuthApi
  apiBase: string
  fixed: boolean
  offset: string
  size: string
  zIndex: number
  portal: boolean
  portalEl?: HTMLElement
  theme: Theme
  onLogin?: (user: WxUserInfo) => void
  onLogout?: () => void
  onGithubBound?: (user: WxUserInfo) => void
}

/**
 * 默认主题（颜色均用 light-dark(浅色, 深色) 包裹，颜色随宿主页面声明的
 * color-scheme 切换：宿主声明 light / dark 时组件对应浅色 / 深色主题，
 * 宿主未声明时继承 UA 默认跟随系统；用户显式传入的 theme 值会覆盖默认值，
 * 固定使用用户指定的颜色，不再随系统切换）。
 */
const DEFAULT_THEME: Theme = {
  btnBg: 'light-dark(#ffffff, #262a30)',
  size: '2.5rem',
  accent: 'light-dark(#1f2328, #e6edf3)',
  btnBorder: 'light-dark(rgba(27, 31, 36, 0.12), rgba(255, 255, 255, 0.14))',
  radius: '16px',
  bg: 'light-dark(#ffffff, #1c1e22)',
  text: 'light-dark(#1f2328, #e6edf3)',
  subText: 'light-dark(#656d76, #8b949e)',
  overlay: 'light-dark(rgba(31, 35, 40, 0.45), rgba(0, 0, 0, 0.6))',
  danger: 'light-dark(#dc2626, #f85149)',
  success: 'light-dark(#1a7f37, #3fb950)'
}

export class UserAvatar {
  private readonly root: HTMLElement
  private readonly container: HTMLElement | ShadowRoot
  private readonly opts: ResolvedOptions

  private user: WxUserInfo | null = null
  /**
   * 头像按钮三态：
   * - checking：有 token 正在服务端校验（骨架脉冲占位，点击忽略）
   * - auth：已登录（真实头像；图片加载完成前继续骨架，onload 后淡入）
   * - unauth：未登录（显示「登录」）
   */
  private status: 'checking' | 'auth' | 'unauth' = 'checking'
  private menuEl: HTMLElement | null = null
  private settingsEl: HTMLElement | null = null
  private menuCleanup: (() => void) | null = null
  private settingsCleanup: (() => void) | null = null
  private confirmEl: HTMLElement | null = null
  private confirmCleanup: (() => void) | null = null
  private githubMsgListener: ((e: MessageEvent) => void) | null = null
  private saving = false
  private saveBtnTimer: number | null = null
  private nicknameDraft = ''

  constructor(options: UserAvatarOptions = {}, container: HTMLElement | ShadowRoot = document.body) {
    this.container = container
    this.opts = this.resolve(options)
    // 挂载前清理一次「格式非法的残留脏 token」（如早期 mock 写的 demo-token）。
    // 这类 cookie 连签名格式都不满足，服务端永远判无效，无需等网络往返，直接物理清掉。
    // 真实 token 的「服务端判失效（过期/吊销/解绑）→ 自动清本地」由 fetchUser 负责。
    cleanupJunkTokens()
    this.root = document.createElement('div')
    this.root.className = 'ua-root'
  }

  /** 环境检查：找不到 SDK 时返回错误信息（供外部/Web Component 提示） */
  static check(sdk?: WxAuthApi): string | null {
    return sdk || getWindowSdk() ? null : '未检测到微信认证 SDK（window.WxAuth），请先引入 wx-auth-sdk 并调用 WxAuth.init()'
  }

  /** 挂载到页面 */
  mount(target?: HTMLElement): this {
    if (this.root.isConnected) return this
    if (target) {
      target.appendChild(this.root)
    } else if (this.container instanceof ShadowRoot) {
      this.container.appendChild(this.root)
    } else if (this.container === document.body) {
      document.body.appendChild(this.root)
    } else {
      this.container.appendChild(this.root)
    }
    this.applyTheme()
    this.render()
    void this.fetchUser()
    // 页面重新聚焦/显示时刷新用户信息：
    // 微信登录弹窗关闭、GitHub OAuth 子窗口关闭、或他从别的窗口登录后切回，头像自动同步
    window.addEventListener('focus', this.onWindowFocus)
    document.addEventListener('visibilitychange', this.onVisibility)
    return this
  }

  /** 卸载并销毁 */
  unmount(): void {
    this.destroy()
  }

  /** 主动触发微信登录（Promise<是否登录成功>） */
  async login(): Promise<boolean> {
    return this.triggerLogin()
  }

  /** 刷新用户信息（登录/绑定后外部可调用） */
  async refresh(): Promise<void> {
    await this.fetchUser()
  }

  destroy(): void {
    this.closeMenu()
    this.closeSettings()
    if (this.githubMsgListener) {
      window.removeEventListener('message', this.githubMsgListener)
      this.githubMsgListener = null
    }
    window.removeEventListener('focus', this.onWindowFocus)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.root.remove()
  }

  // ==================== 初始化 ====================

  private resolve(options: UserAvatarOptions): ResolvedOptions {
    const sdk = options.sdk ?? getWindowSdk()
    // 默认后端固定为 wx-auth 服务（自家项目，直接写死）；传了 api-base 则覆盖
    const apiBase = options.apiBase !== undefined && options.apiBase !== ''
      ? options.apiBase
      : 'https://wx-auth.shenzjd.com'
    return {
      sdk,
      apiBase,
      fixed: options.fixed ?? true,
      offset: options.offset ?? '1rem 1.5rem',
      size: options.size ?? DEFAULT_THEME.size,
      zIndex: options.zIndex ?? 12000,
      portal: options.portal ?? true,
      portalEl: options.portalEl,
      // theme.size 与 size 同步：options.size 优先于 options.theme.size
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}), size: options.size ?? (options.theme?.size ?? DEFAULT_THEME.size) },
      onLogin: options.onLogin,
      onLogout: options.onLogout,
      onGithubBound: options.onGithubBound
    }
  }

  private applyTheme(): void {
    const t = this.opts.theme
    const s = this.root.style
    s.setProperty('--ua-btn-bg', t.btnBg)
    s.setProperty('--ua-size', t.size)
    s.setProperty('--ua-accent', t.accent)
    s.setProperty('--ua-btn-border', t.btnBorder)
    s.setProperty('--ua-radius', t.radius)
    s.setProperty('--ua-bg', t.bg)
    s.setProperty('--ua-text', t.text)
    s.setProperty('--ua-sub', t.subText)
    s.setProperty('--ua-overlay', t.overlay)
    s.setProperty('--ua-danger', t.danger)
    s.setProperty('--ua-success', t.success)
  }

  // ==================== Portal（弹窗 / 菜单挂载到顶层） ====================

  /**
   * Portal 是否启用：默认开启。关闭时弹窗/菜单仍内联在 this.root（旧行为）。
   * portalEl 仅在 portal 开启时生效，缺省 document.body。
   */
  private usePortal(): boolean {
    return this.opts.portal
  }

  /** 获取 Portal 挂载容器（body 或自定义 portalEl） */
  private getPortalRoot(): HTMLElement {
    return this.opts.portalEl ?? document.body
  }

  /**
   * 将子节点挂到对应容器：
   * - portal 开启：挂到顶层容器（body / portalEl），脱离被 transform/overflow 困住的祖先；
   * - portal 关闭：挂到 this.root，保持旧的内联行为。
   * 由于挂到顶层后不再继承 .ua-root 的 --ua-* 主题变量，这里把主题变量一并复制过去。
   * 同时 Portal 节点脱离了 Web Component 的 shadow DOM，原本在 shadow 内通过 `<style>`
   * 注入的 .ua-* 选择器在 body 上找不到规则，因此把样式以 inline `<style>` 形式
   * 追加到 portaled 节点子树内——选择器全是类名（.ua-menu / .ua-mask / .ua-dialog...），
   * 在子树里照常匹配；--ua-* 变量也已在节点上设置，无需依赖 .ua-root 的 :root 规则。
   */
  private appendOverlay(el: HTMLElement): void {
    if (this.usePortal()) {
      // 主题变量迁移：portaled 节点脱离 .ua-root，需显式补齐 --ua-* 变量
      const t = this.opts.theme
      const s = el.style
      s.setProperty('--ua-btn-bg', t.btnBg)
      s.setProperty('--ua-size', t.size)
      s.setProperty('--ua-accent', t.accent)
      s.setProperty('--ua-btn-border', t.btnBorder)
      s.setProperty('--ua-radius', t.radius)
      s.setProperty('--ua-bg', t.bg)
      s.setProperty('--ua-text', t.text)
      s.setProperty('--ua-sub', t.subText)
      s.setProperty('--ua-overlay', t.overlay)
      s.setProperty('--ua-danger', t.danger)
      s.setProperty('--ua-success', t.success)
      // 样式注入：shadow DOM 外 portaled 节点找不到原 shadow 内 <style>，把
      // 同样的 CSS 作为 <style> 子节点挂到 portaled 节点上。选择器全是 .ua-* 类名，
      // 子树内匹配没问题；@keyframes / @media 也照常工作。
      const style = document.createElement('style')
      style.setAttribute('data-ua-portal-style', '')
      style.textContent = portalStyles
      el.appendChild(style)
      this.getPortalRoot().appendChild(el)
    } else {
      this.root.appendChild(el)
    }
  }

  // ==================== 登录 / 退出 ====================

  private async triggerLogin(): Promise<boolean> {
    const sdk = this.opts.sdk
    if (!sdk) {
      console.warn('[UserAvatar] 未找到微信认证 SDK')
      return false
    }
    const ok = await sdk.requireAuth()
    if (ok) {
      await this.fetchUser()
      if (this.user) this.opts.onLogin?.(this.user)
    }
    return ok
  }

  private async logout(): Promise<void> {
    // 优先服务端吊销（SDK >= 1.2.18）：POST /api/auth/logout 把 token 拉黑，
    // 根治「其他子域 localStorage 备份仍能恢复登录」的问题。
    // 老版本 SDK 无 revoke() → 回退仅本地 clearToken（行为同旧版）。
    const sdk = this.opts.sdk
    if (sdk?.revoke) {
      await sdk.revoke()
    } else {
      sdk?.clearToken()
      deleteAuthCookies()
    }
    this.user = null
    this.status = 'unauth'
    this.closeMenu()
    this.closeSettings()
    this.render()
    this.opts.onLogout?.()
  }

  // ==================== 数据 ====================

  private async fetchUser(): Promise<void> {
    const token = getAuthToken()
    if (!token) {
      // 本地无 token：同步确定未登录，直接展示「登录」，不经过骨架态
      this.user = null
      this.status = 'unauth'
      this.render()
      return
    }
    // 有 token 需服务端校验：仅在尚未展示头像时进入骨架态。
    // focus / visibilitychange 触发的静默刷新（已是 auth）不重渲染，避免头像闪烁。
    if (this.status !== 'auth') {
      this.status = 'checking'
      this.render()
    }
    const prev = this.user
    try {
      const base = this.opts.apiBase || window.location.origin
      const res = await fetch(`${base}/api/auth/userinfo?token=${encodeURIComponent(token)}`)
      const data = (await res.json()) as {
        authenticated: boolean
        error?: string
        user?: WxUserInfo
      }
      if (!data.authenticated) {
        // 服务端判定 token 失效（过期 / 被吊销 / 已解绑 / 非法）：
        // 本地这份 token 已经没用了，主动清掉，避免每次刷新都带着旧 token 白请求。
        console.warn('[UserAvatar] token 已失效，自动清理本地凭证', data.error ?? '')
        deleteAuthCookies()
        this.user = null
        this.status = 'unauth'
        // 登录态已失效，开着的设置弹窗不能留着（弹窗 portal 在 body 上，render 清不掉）
        this.closeSettings()
        this.render()
        return
      }
      this.user = data.user ? data.user : null
      this.status = this.user ? 'auth' : 'unauth'
      // 静默刷新且数据无变化：跳过重渲染，避免头像图片重新加载导致闪烁
      if (this.status === 'auth' && prev && JSON.stringify(prev) === JSON.stringify(this.user)) {
        return
      }
    } catch (e) {
      console.error('[UserAvatar] 拉取用户详情失败', e)
      // 网络异常：已展示头像则保留（避免误踢下线），否则视为未登录
      if (this.status !== 'auth') {
        this.user = null
        this.status = 'unauth'
      }
    }
    this.render()
  }

  /** 窗口重新聚焦时刷新（登录弹窗 / OAuth 子窗关闭后切回自动同步头像） */
  private readonly onWindowFocus = (): void => {
    void this.fetchUser()
  }

  /** 页面从隐藏切回可见时刷新 */
  private readonly onVisibility = (): void => {
    if (document.visibilityState === 'visible') void this.fetchUser()
  }

  private async saveNickname(): Promise<void> {
    const token = getAuthToken()
    const nickname = this.nicknameDraft.trim()
    if (!token) return
    if (nickname.length < 2 || nickname.length > 20) {
      this.setMsg('昵称需为 2-20 个字符')
      return
    }
    if (this.saving) return
    this.saving = true
    this.updateSaveBtn()
    this.setMsg('')
    let ok = false
    try {
      const base = this.opts.apiBase || window.location.origin
      const res = await fetch(`${base}/api/auth/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'set-nickname', nickname })
      })
      const data = (await res.json()) as { success: boolean; message?: string }
      if (data.success) {
        ok = true
        this.nicknameDraft = nickname
        // 先等用户信息刷新完再报成功，避免「保存中…」与「已保存」同屏
        await this.fetchUser()
      } else {
        this.setMsg(data.message || '保存失败')
      }
    } catch (e) {
      console.error('[UserAvatar] 保存昵称失败', e)
      this.setMsg('保存失败，请重试')
    } finally {
      this.saving = false
      this.updateSaveBtn(ok)
    }
  }

  private async unbindGithub(): Promise<void> {
    const token = getAuthToken()
    if (!token) return
    try {
      const base = this.opts.apiBase || window.location.origin
      const res = await fetch(`${base}/api/auth/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'unbind-github' })
      })
      const data = (await res.json()) as { success: boolean; message?: string }
      if (data.success) {
        await this.fetchUser()
      } else {
        window.alert(data.message || '解绑失败')
      }
    } catch (e) {
      console.error('[UserAvatar] 解绑失败', e)
      window.alert('解绑失败，请重试')
    }
  }

  // ==================== 头像按钮 ====================

  private render(): void {
    this.root.innerHTML = ''
    // 重渲染只影响头像按钮本体：菜单贴头像定位已失效，真正移除；设置弹窗
    // portal 在顶层、内容自包含，跨重渲染保留——若在这里把 settingsEl 置空，
    // 弹窗会留在 DOM 上却再也关不掉（closeSettings 变成空操作），保存成功后
    // fetchUser → render 正好触发过这条路径。
    this.closeMenu()

    const pos = this.opts.fixed
      ? `position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}`
      : ''

    const checking = this.status === 'checking'
    const btnClass = checking
      ? 'ua-avatar ua-avatar-checking'
      : this.status === 'auth'
        ? 'ua-avatar'
        : 'ua-avatar ua-avatar-unauth'

    this.root.innerHTML = `
      <div class="ua-widget" style="${pos}">
        <button type="button" class="${btnClass}" aria-haspopup="true"${checking ? ' aria-busy="true"' : ''} aria-label="${this.status === 'auth' ? '打开用户菜单' : checking ? '正在检测登录状态' : '微信登录'}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `

    const btn = this.root.querySelector<HTMLButtonElement>('.ua-avatar')!

    // 已登录且头像为图片：加载完成前按钮保持骨架脉冲，onload 后移除并淡入图片
    const img = this.root.querySelector<HTMLImageElement>('.ua-avatar-img')
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('ua-img-loaded')
      } else {
        btn.classList.add('ua-avatar-loading-img')
        img.addEventListener('load', () => {
          img.classList.add('ua-img-loaded')
          btn.classList.remove('ua-avatar-loading-img')
        }, { once: true })
        img.addEventListener('error', () => {
          // 图片加载失败：退回首字母头像，避免空白圆
          const name = this.user?.nickname || this.user?.github?.login || '微'
          const span = document.createElement('span')
          span.className = 'ua-avatar-fallback'
          span.textContent = name.charAt(0).toUpperCase()
          img.replaceWith(span)
          btn.classList.remove('ua-avatar-loading-img')
        }, { once: true })
      }
    }

    btn.addEventListener('click', () => {
      if (this.status === 'checking') return
      if (this.user) this.toggleMenu()
      else void this.triggerLogin()
    })
  }

  private offsetTop(): string {
    const m = /^([^,\s]+)/.exec(this.opts.offset)
    return m ? m[1] : '1rem'
  }

  private offsetRight(): string {
    const m = /,\s*([^\s,]+)/.exec(this.opts.offset)
    if (m) return m[1]
    const parts = this.opts.offset.trim().split(/\s+/)
    return parts[1] ?? parts[0] ?? '1.5rem'
  }

  private buildAvatarInnerHtml(): string {
    // 登录校验中：骨架脉冲占位，避免先闪「登录」再突变头像
    if (this.status === 'checking') {
      return '<span class="ua-avatar-skeleton" aria-hidden="true"></span>'
    }
    if (!this.user) {
      // 未登录：圆形按钮内显示「登录」文字（字号自适应 --ua-size），比灰色人形图标更明确
      return '<span class="ua-avatar-login">登录</span>'
    }
    const src = this.user.headimgurl || this.user.github?.avatar || ''
    if (src) return `<img class="ua-avatar-img" src="${escapeAttr(src)}" alt="" referrerpolicy="no-referrer" />`
    const name = this.user.nickname || this.user.github?.login || '微信用户'
    return `<span class="ua-avatar-fallback">${escapeHtml(name.charAt(0).toUpperCase())}</span>`
  }

  // ==================== 下拉菜单 ====================

  private toggleMenu(): void {
    if (this.menuEl) this.closeMenu()
    else this.openMenu()
  }

  private openMenu(): void {
    const u = this.user
    if (!u || this.menuEl) return
    this.closeSettings()

    const menu = document.createElement('div')
    menu.className = 'ua-menu'
    menu.style.zIndex = String(this.opts.zIndex + 1)
    const name = u.nickname || (u.github ? `@${u.github.login}` : '微信用户')
    menu.innerHTML = `
      <div class="ua-menu-user"><span class="ua-menu-name">${escapeHtml(name)}</span></div>
      <button type="button" class="ua-menu-item" data-action="settings">${SETTINGS_ICON}<span>设置</span></button>
      <button type="button" class="ua-menu-item ua-menu-item-danger" data-action="logout">${LOGOUT_ICON}<span>退出登录</span></button>
    `

    // Portal 开启时菜单脱离 this.root 挂到顶层：原来的 absolute 相对 .ua-widget 定位失效，
    // 改为根据头像按钮当前视口坐标用 fixed 定位，既不被 transform/overflow 祖先裁剪，
    // 也始终紧贴按钮。portal 关闭时保留内联 absolute 定位（旧行为）。
    if (this.usePortal()) {
      const btn = this.root.querySelector<HTMLButtonElement>('.ua-avatar')
      const rect = btn?.getBoundingClientRect()
      if (rect && rect.width > 0) {
        const gap = 0.5
        const gapPx = gap * 16
        menu.style.position = 'fixed'
        menu.style.top = `${rect.bottom + gapPx}px`
        // 与按钮右缘对齐（复刻内联 absolute 的 right:0 效果）
        menu.style.left = 'auto'
        menu.style.right = `${Math.max(window.innerWidth - rect.right, 0)}px`
        menu.style.minWidth = '12rem'
        menu.style.maxWidth = 'min(20rem, calc(100vw - 2rem))'
        // 动画使用 transform，fixed 定位节点自身 transform 不会影响定位（transform 作用于自身盒模型）
        menu.dataset.uaPortal = 'true'
      } else {
        // 头像按钮不可见/异常时退回内联，避免菜单悬空
        this.usePortalMenuInlineFallback(menu)
      }
    }

    const onDocDown = (e: MouseEvent) => {
      // 组件可能挂在 shadow DOM（Web Component）。document 收到的事件在跨过
      // shadow 边界时 e.target 会被 retarget 成 host，contains 永远 false，
      // 导致"点菜单项即被误关"。composedPath() 含 shadow 内完整路径，用它判断。
      // 菜单 portal 到顶层后不再是 this.root 后代，需把菜单本身也计入"内部区域"。
      const path = e.composedPath()
      if (!path.includes(this.root) && !(this.menuEl && path.includes(this.menuEl))) this.closeMenu()
    }
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.closeMenu()
    }
    document.addEventListener('mousedown', onDocDown)
    document.addEventListener('keydown', onDocKey)
    this.menuCleanup = () => {
      document.removeEventListener('mousedown', onDocDown)
      document.removeEventListener('keydown', onDocKey)
    }

    menu.querySelector<HTMLButtonElement>('[data-action="settings"]')?.addEventListener('click', () => {
      this.openSettings()
    })
    menu.querySelector<HTMLButtonElement>('[data-action="logout"]')?.addEventListener('click', () => {
      // 二次确认：菜单里点「退出登录」先弹确认框，确认后才真正登出
      this.openLogoutConfirm()
    })

    this.appendOverlay(menu)
    this.menuEl = menu
  }

  /** Portal 下头像按钮不可见时的兜底：退回内联挂载，避免菜单悬空/定位错乱 */
  private usePortalMenuInlineFallback(menu: HTMLElement): void {
    menu.style.position = 'absolute'
    menu.style.top = ''
    menu.style.left = ''
    menu.style.right = '0'
    menu.style.minWidth = '12rem'
    menu.style.maxWidth = ''
    // 内联时由 this.root 提供主题变量，无需复制
    this.root.appendChild(menu)
  }

  private closeMenu(): void {
    this.menuEl?.remove()
    this.menuEl = null
    this.menuCleanup?.()
    this.menuCleanup = null
  }

  // ==================== 退出登录二次确认 ====================

  private openLogoutConfirm(): void {
    this.closeMenu()
    this.closeConfirm()

    const confirm = document.createElement('div')
    confirm.className = 'ua-mask'
    confirm.style.zIndex = String(this.opts.zIndex + 10)
    confirm.innerHTML = `
      <div class="ua-dialog ua-confirm" role="alertdialog" aria-modal="true" aria-label="退出登录">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">退出登录</h3>
          <button type="button" class="ua-close" data-action="cancel" aria-label="关闭">${CLOSE_ICON}</button>
        </div>
        <div class="ua-dialog-body">
          <p class="ua-confirm-text">确定要退出登录吗？退出后需要重新登录才能继续使用。</p>
        </div>
        <div class="ua-confirm-actions">
          <button type="button" class="ua-confirm-btn" data-action="cancel">取消</button>
          <button type="button" class="ua-confirm-btn ua-confirm-btn-danger" data-action="confirm">退出登录</button>
        </div>
      </div>
    `
    this.confirmEl = confirm
    // 与设置弹窗同一 overlay 通道：portal 开启时挂顶层，避免被 transform/overflow 祖先裁剪
    this.appendOverlay(confirm)

    const close = () => this.closeConfirm()
    confirm.querySelector<HTMLButtonElement>('[data-action="confirm"]')?.addEventListener('click', () => {
      close()
      void this.logout()
    })
    confirm.querySelectorAll<HTMLButtonElement>('[data-action="cancel"]').forEach((btn) => {
      btn.addEventListener('click', close)
    })

    const onMaskDown = (e: MouseEvent) => {
      // 同 openSettings：shadow DOM 下用 composedPath[0] 取真实点击目标
      if (e.composedPath()[0] === confirm) close()
    }
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onMaskDown)
    document.addEventListener('keydown', onDocKey)
    this.confirmCleanup = () => {
      document.removeEventListener('mousedown', onMaskDown)
      document.removeEventListener('keydown', onDocKey)
    }
  }

  private closeConfirm(): void {
    this.confirmEl?.remove()
    this.confirmEl = null
    this.confirmCleanup?.()
    this.confirmCleanup = null
  }

  // ==================== 设置弹窗 ====================

  private openSettings(): void {
    const u = this.user
    if (!u) return
    this.closeMenu()
    this.closeSettings()
    this.nicknameDraft = u.nickname || ''

    const settings = document.createElement('div')
    settings.className = 'ua-mask'
    settings.style.zIndex = String(this.opts.zIndex + 10)
    settings.innerHTML = this.buildSettingsHtml(u)
    this.settingsEl = settings
    // Portal 开启时挂到 body/portalEl（脱离 backdrop-filter/transform 祖先的 containing block），
    // 遮罩始终覆盖整个视口并居中；关闭时内联到 this.root（旧行为）。
    this.appendOverlay(settings)

    this.bindSettingsEvents(settings)

    const onMaskDown = (e: MouseEvent) => {
      // 同 openMenu：shadow DOM 下 e.target 被 retarget 成 host，用 composedPath[0] 取真实点击目标
      if (e.composedPath()[0] === settings) this.closeSettings()
    }
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.closeSettings()
    }
    document.addEventListener('mousedown', onMaskDown)
    document.addEventListener('keydown', onDocKey)
    this.settingsCleanup = () => {
      document.removeEventListener('mousedown', onMaskDown)
      document.removeEventListener('keydown', onDocKey)
    }
  }

  private buildSettingsHtml(u: WxUserInfo): string {
    const avatarSrc = u.headimgurl || u.github?.avatar
    const bigAvatar = avatarSrc
      ? `<img class="ua-big-avatar" src="${escapeAttr(avatarSrc)}" alt="" referrerpolicy="no-referrer" />`
      : `<div class="ua-big-avatar ua-big-avatar-fallback">${escapeHtml((u.nickname || u.github?.login || '?').charAt(0).toUpperCase())}</div>`

    const githubBlock = u.github
      ? `
        <div class="ua-github-bound">
          <div class="ua-github-info">
            ${u.github.avatar
              ? `<img class="ua-gh-avatar" src="${escapeAttr(u.github.avatar)}" alt="@${escapeAttr(u.github.login)}" referrerpolicy="no-referrer" />`
              : `<div class="ua-gh-avatar ua-gh-avatar-fallback">${escapeHtml(u.github.login.charAt(0).toUpperCase())}</div>`}
            <div class="ua-gh-meta">
              <div class="ua-gh-login">@${escapeHtml(u.github.login)} <span class="ua-badge">已绑定</span></div>
              <div class="ua-gh-date">绑定于 ${escapeHtml(new Date(u.github.boundAt).toLocaleDateString())}</div>
            </div>
          </div>
          <button type="button" class="ua-gh-unbind" data-action="unbind">解绑</button>
        </div>`
      : `
        <div class="ua-github-unbound">
          <p class="ua-gh-tip">绑定 GitHub 账号，用于身份识别与后续业务对接</p>
          <button type="button" class="ua-gh-bind" data-action="bind">${GITHUB_ICON}<span>绑定 GitHub</span></button>
        </div>`

    return `
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="设置">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">设置</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="关闭">${CLOSE_ICON}</button>
        </div>
        <div class="ua-dialog-body">
          <!-- 用户信息卡片 -->
          <div class="ua-profile-card">
            <div class="ua-profile-header">
              ${bigAvatar}
              <div class="ua-profile-info">
                <div class="ua-user-name">${escapeHtml(u.nickname || (u.github ? `@${u.github.login}` : '微信用户'))}</div>
                <div class="ua-user-sub">登录于 ${escapeHtml(new Date(u.authenticatedAt || Date.now()).toLocaleString())}</div>
              </div>
            </div>
          </div>

          <!-- 微信 ID -->
          <div class="ua-field-group">
            <label class="ua-field-label">微信 ID（openid）</label>
            <div class="ua-mono-value">${escapeHtml(u.openid || '-')}</div>
          </div>

          <!-- GitHub 绑定 -->
          <div class="ua-field-group">
            <div class="ua-section-title">${GITHUB_ICON}<span>GitHub</span></div>
            ${githubBlock}
          </div>

          <!-- 设置名字 -->
          <div class="ua-field-group">
            <div class="ua-section-title">${USER_ICON_SVG}<span>设置名字</span></div>
            <div class="ua-nickname-row">
              <input type="text" class="ua-input" maxlength="20" placeholder="2-20 个字符" value="${escapeAttr(this.nicknameDraft)}" />
              <button type="button" class="ua-save" data-action="save">保存</button>
            </div>
            <div class="ua-msg" data-role="msg"></div>
          </div>
        </div>
      </div>
    `
  }

  private bindSettingsEvents(settings: HTMLElement): void {
    const input = settings.querySelector<HTMLInputElement>('.ua-input')
    input?.addEventListener('input', () => {
      this.nicknameDraft = input.value
      this.setMsg('')
    })
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') void this.saveNickname()
    })
    settings.querySelector<HTMLButtonElement>('[data-action="save"]')?.addEventListener('click', () => {
      void this.saveNickname()
    })
    settings.querySelector<HTMLButtonElement>('[data-action="close"]')?.addEventListener('click', () => {
      this.closeSettings()
    })
    settings.querySelector<HTMLButtonElement>('[data-action="bind"]')?.addEventListener('click', () => {
      this.startGithubBind()
    })
    settings.querySelector<HTMLButtonElement>('[data-action="unbind"]')?.addEventListener('click', () => {
      void this.unbindGithub()
    })
  }

  private closeSettings(): void {
    if (this.saveBtnTimer !== null) {
      clearTimeout(this.saveBtnTimer)
      this.saveBtnTimer = null
    }
    this.settingsEl?.remove()
    this.settingsEl = null
    this.settingsCleanup?.()
    this.settingsCleanup = null
  }

  /** 提示行只用于错误信息；成功反馈由保存按钮自身展示（见 updateSaveBtn） */
  private setMsg(text: string): void {
    const el = this.settingsEl?.querySelector<HTMLElement>('[data-role="msg"]')
    if (!el) return
    el.textContent = text
    el.className = text ? 'ua-msg ua-msg-err' : 'ua-msg'
  }

  /**
   * 保存按钮状态机：保存 → 保存中…（禁用）→ 已保存 ✓（约 2s 后自动回到保存）。
   * 定时器回调持有按钮元素本身的引用：即使期间弹窗被关闭/重建，也只会写到
   * 已脱离 DOM 的旧节点上，不会误改新弹窗的按钮。
   */
  private updateSaveBtn(success = false): void {
    const btn = this.settingsEl?.querySelector<HTMLButtonElement>('[data-action="save"]')
    if (!btn) return
    if (this.saveBtnTimer !== null) {
      clearTimeout(this.saveBtnTimer)
      this.saveBtnTimer = null
    }
    btn.disabled = this.saving
    btn.textContent = this.saving ? '保存中…' : success ? '已保存 ✓' : '保存'
    if (success) {
      this.saveBtnTimer = window.setTimeout(() => {
        btn.textContent = '保存'
        this.saveBtnTimer = null
      }, 2000)
    }
  }

  // ==================== GitHub 绑定 ====================

  private startGithubBind(): void {
    const token = getAuthToken()
    if (!token) {
      window.alert('请先完成微信登录')
      return
    }
    const base = this.opts.apiBase || window.location.origin
    const url = `${base}/api/oauth/github/authorize?token=${encodeURIComponent(token)}`
    window.open(url, 'github-bind', 'width=720,height=720,menubar=no,toolbar=no,location=no,status=no')

    if (this.githubMsgListener) return
    this.githubMsgListener = (e: MessageEvent) => {
      const d = e.data as { type?: string }
      if (!d || d.type !== 'github-bound') return
      window.removeEventListener('message', this.githubMsgListener!)
      this.githubMsgListener = null
      void this.fetchUser().then(() => {
        if (this.user?.github) this.opts.onGithubBound?.(this.user)
      })
    }
    window.addEventListener('message', this.githubMsgListener)
  }
}
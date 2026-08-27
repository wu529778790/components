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
  /** 成功色（已保存提示） */
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

const DEFAULT_THEME: Theme = {
  btnBg: '#ffffff',
  size: '2.5rem',
  accent: '#1f2328',
  btnBorder: 'rgba(27, 31, 36, 0.12)',
  radius: '16px',
  bg: '#ffffff',
  text: '#1f2328',
  subText: '#656d76',
  overlay: 'rgba(31, 35, 40, 0.45)',
  danger: '#dc2626',
  success: '#1a7f37'
}

export class UserAvatar {
  private readonly root: HTMLElement
  private readonly container: HTMLElement | ShadowRoot
  private readonly opts: ResolvedOptions

  private user: WxUserInfo | null = null
  private menuEl: HTMLElement | null = null
  private settingsEl: HTMLElement | null = null
  private menuCleanup: (() => void) | null = null
  private settingsCleanup: (() => void) | null = null
  private githubMsgListener: ((e: MessageEvent) => void) | null = null
  private saving = false
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
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) },
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
    this.closeMenu()
    this.closeSettings()
    this.render()
    this.opts.onLogout?.()
  }

  // ==================== 数据 ====================

  private async fetchUser(): Promise<void> {
    const token = getAuthToken()
    if (!token) {
      this.user = null
      this.render()
      return
    }
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
        this.render()
        return
      }
      this.user = data.user ? data.user : null
    } catch (e) {
      console.error('[UserAvatar] 拉取用户详情失败', e)
      this.user = null
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
    try {
      const base = this.opts.apiBase || window.location.origin
      const res = await fetch(`${base}/api/auth/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'set-nickname', nickname })
      })
      const data = (await res.json()) as { success: boolean; message?: string }
      if (data.success) {
        this.setMsg('已保存')
        this.nicknameDraft = nickname
        await this.fetchUser()
      } else {
        this.setMsg(data.message || '保存失败')
      }
    } catch (e) {
      console.error('[UserAvatar] 保存昵称失败', e)
      this.setMsg('保存失败，请重试')
    } finally {
      this.saving = false
      this.updateSaveBtn()
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
    this.menuEl = null
    this.settingsEl = null

    const pos = this.opts.fixed
      ? `position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}`
      : ''

    this.root.innerHTML = `
      <div class="ua-widget" style="${pos}">
        <button type="button" class="ua-avatar" aria-haspopup="true" aria-label="${this.user ? '打开用户菜单' : '微信登录'}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `

    const btn = this.root.querySelector<HTMLButtonElement>('.ua-avatar')!
    btn.addEventListener('click', () => {
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
    if (!this.user) return USER_ICON_SVG
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
      void this.logout()
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
          <div class="ua-user-row">
            ${bigAvatar}
            <div class="ua-user-meta">
              <div class="ua-user-name">${escapeHtml(u.nickname || (u.github ? `@${u.github.login}` : '微信用户'))}</div>
              <div class="ua-user-sub">登录于 ${escapeHtml(new Date(u.authenticatedAt || Date.now()).toLocaleString())}</div>
            </div>
          </div>

          <div class="ua-mono-row">
            <div class="ua-mono-label">微信 ID（openid）</div>
            <div class="ua-mono-value">${escapeHtml(u.openid || '-')}</div>
          </div>

          <div class="ua-section">
            <div class="ua-section-title">${GITHUB_ICON}<span>GitHub</span></div>
            ${githubBlock}
          </div>

          <div class="ua-section">
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
    this.settingsEl?.remove()
    this.settingsEl = null
    this.settingsCleanup?.()
    this.settingsCleanup = null
  }

  private setMsg(text: string): void {
    const el = this.settingsEl?.querySelector<HTMLElement>('[data-role="msg"]')
    if (!el) return
    el.textContent = text
    el.className = text === '已保存' ? 'ua-msg ua-msg-ok' : text ? 'ua-msg ua-msg-err' : 'ua-msg'
  }

  private updateSaveBtn(): void {
    const btn = this.settingsEl?.querySelector<HTMLButtonElement>('[data-action="save"]')
    if (btn) btn.textContent = this.saving ? '保存中…' : '保存'
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
/**
 * 顶部站点导航组件（SiteNavbar）
 *
 * 功能：
 *   - 内置 shenzjd.com 系列子站链接（可用 links 覆盖），按当前 host 自动高亮当前站
 *   - 桌面端居中链接 + 右侧头像；移动端折叠为 hamburger 下拉菜单
 *   - 内置 user-avatar（微信登录头像，已随构建打包，无需额外引入）
 *
 * 零运行时依赖，原生 DOM。样式 --sn-* CSS 变量驱动（见 src/styles.css）。
 *
 * @param container 渲染容器（HTMLElement 或 Web Component 的 shadow root），默认 document.body
 */
import { UserAvatar, type UserAvatarOptions } from '@wu529778790/user-avatar'
import uaStyles from '@wu529778790/user-avatar/style.css'
import styles from './styles.css'
import type { SiteNavbarBrand, SiteNavbarLink, SiteNavbarTheme } from './types'
import { CLOSE_ICON, HAMBURGER_ICON, escapeAttr, isCurrentHost } from './utils'

/** 内置默认子站链接（shenzjd.com 系列） */
export const DEFAULT_LINKS: SiteNavbarLink[] = [
  { href: 'https://shenzjd.com', label: '首页', icon: '🏠' },
  { href: 'https://alist.shenzjd.com', label: 'Alist', icon: '📁' },
  { href: 'https://panhub.shenzjd.com', label: '网盘搜索', icon: '🔍' },
  { href: 'https://parse.shenzjd.com', label: '视频解析', icon: '🎬' },
  { href: 'https://newshub.shenzjd.com', label: '热点聚合', icon: '📰' },
  { href: 'https://navhub.shenzjd.com', label: '个人导航', icon: '🧭' },
  { href: 'https://bing.shenzjd.com', label: '必应壁纸', icon: '🖼️' }
]

export interface SiteNavbarOptions {
  /** 链接列表（缺省用内置默认） */
  links?: SiteNavbarLink[]
  /** 品牌区（缺省不渲染品牌，链接纯居中；传 null 同样不渲染） */
  brand?: SiteNavbarBrand | null
  /** 是否渲染头像，默认 true */
  avatar?: boolean
  /** 头像配置（透传给 @wu529778790/user-avatar；fixed 强制为 false 以嵌入导航栏） */
  avatarOptions?: UserAvatarOptions
  /** 主题（映射 --sn-* CSS 变量） */
  theme?: SiteNavbarTheme
  /** 移动端断点（px），默认 768 */
  breakpoint?: number
  /**
   * 移动端下拉菜单的 portal 挂载容器（默认 document.body）。
   * 移动菜单必须脱离组件本身的 shadow root，挂到顶层才能避免：
   * 1. 被祖先的 backdrop-filter / transform / contain 影响绘制
   * 2. 在 sticky / overflow 祖先内被裁剪或渲染边界异常
   * 通常无需配置；只有你想把菜单放进自定义 overlay 容器时传入。
   */
  portalEl?: HTMLElement
  /** 点击导航链接回调 */
  onNavigate?: (link: SiteNavbarLink, event: MouseEvent) => void
}

interface ResolvedOptions {
  links: SiteNavbarLink[]
  brand: SiteNavbarBrand | null
  avatar: boolean
  avatarOptions: UserAvatarOptions
  theme: Required<SiteNavbarTheme>
  breakpoint: number
  portalEl: HTMLElement
  onNavigate?: (link: SiteNavbarLink, event: MouseEvent) => void
}

/** 头像默认尺寸（与 avatarOptions 默认 size 保持同步） */
const AVATAR_DEFAULT_SIZE = '2.2rem'

const DEFAULT_THEME: Required<SiteNavbarTheme> = {
  primary: '#1f2328',
  secondary: '#656d76',
  accent: '#1a6dff',
  hoverBg: 'rgba(31, 35, 40, 0.06)',
  bg: 'rgba(255, 255, 255, 0.55)',
  border: 'rgba(27, 31, 36, 0.08)',
  radius: '12px',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
}

export class SiteNavbar {
  private readonly root: HTMLElement
  private readonly container: HTMLElement | ShadowRoot
  private readonly opts: ResolvedOptions

  private avatar: UserAvatar | null = null
  private toggleEl: HTMLElement | null = null
  private mobileEl: HTMLElement | null = null
  private mobileOpen = false

  constructor(
    options: SiteNavbarOptions = {},
    container: HTMLElement | ShadowRoot = document.body
  ) {
    this.container = container
    this.opts = this.resolve(options)
    this.root = document.createElement('div')
    this.root.className = 'sn-root'
  }

  /** 环境检查：头像 SDK 缺失时返回提示（不影响导航本体渲染） */
  static check(): string | null {
    return UserAvatar.check()
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
    // user-avatar 以类方式（new UserAvatar）嵌入时不会自动注入自身样式
    // （单独用 <user-avatar> custom element 才会注入）。这里把它的完整
    // 样式一并注入本组件（render 之后再注入，避免被 render 的 innerHTML='' 清空），
    // 保证头像、下拉菜单、设置弹窗样式正常。
    const style = document.createElement('style')
    style.setAttribute('data-ua-styles', '')
    style.textContent = uaStyles
    this.root.appendChild(style)
    return this
  }

  /** 卸载并销毁 */
  unmount(): void {
    this.destroy()
  }

  destroy(): void {
    this.avatar?.unmount()
    this.avatar = null
    if (this.mobileEl && this.mobileEl.parentElement) {
      this.mobileEl.parentElement.removeChild(this.mobileEl)
    }
    this.mobileEl = null
    document.removeEventListener('click', this.onDocClick)
    document.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScroll, true)
    this.root.remove()
  }

  // ==================== 初始化 ====================

  private resolve(options: SiteNavbarOptions): ResolvedOptions {
    return {
      links: options.links ?? DEFAULT_LINKS,
      brand: options.brand ?? null,
      avatar: options.avatar ?? true,
      // 头像内嵌导航栏：fixed 必须为 false；size 同步写入 theme，避免 user-avatar
      // 内 opts.theme.size 不与 options.size 同步时只取 DEFAULT 的坑
      avatarOptions: {
        size: AVATAR_DEFAULT_SIZE,
        ...(options.avatarOptions ?? {}),
        theme: {
          size: AVATAR_DEFAULT_SIZE,
          ...(options.avatarOptions?.theme ?? {})
        },
        fixed: false
      },
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) },
      breakpoint: options.breakpoint ?? 768,
      portalEl: options.portalEl ?? document.body,
      onNavigate: options.onNavigate
    }
  }

  private applyTheme(): void {
    const t = this.opts.theme
    const s = this.root.style
    s.setProperty('--sn-primary', t.primary)
    s.setProperty('--sn-secondary', t.secondary)
    s.setProperty('--sn-accent', t.accent)
    s.setProperty('--sn-hover-bg', t.hoverBg)
    s.setProperty('--sn-bg', t.bg)
    s.setProperty('--sn-border', t.border)
    s.setProperty('--sn-radius', t.radius)
    s.setProperty('--sn-font-family', t.fontFamily)
  }

  // ==================== 渲染 ====================

  private render(): void {
    this.root.innerHTML = ''

    // ---- 导航栏 ----
    const bar = document.createElement('div')
    bar.className = 'sn-bar'

    if (this.opts.brand) {
      bar.appendChild(this.renderBrand(this.opts.brand))
    }

    const nav = document.createElement('nav')
    nav.className = 'sn-links'
    for (const link of this.opts.links) {
      nav.appendChild(this.renderLink(link))
    }
    bar.appendChild(nav)

    // 头像（user-avatar 渲染到独立容器）
    if (this.opts.avatar) {
      const host = document.createElement('div')
      host.className = 'sn-avatar'
      bar.appendChild(host)
      this.avatar = new UserAvatar(this.opts.avatarOptions, host)
      this.avatar.mount()
    }

    // 移动端 hamburger
    const toggle = document.createElement('button')
    toggle.className = 'sn-toggle'
    toggle.type = 'button'
    toggle.setAttribute('aria-label', '菜单')
    toggle.setAttribute('aria-expanded', 'false')
    toggle.innerHTML = HAMBURGER_ICON
    toggle.addEventListener('click', (e) => {
      e.stopPropagation()
      this.setMobileOpen(!this.mobileOpen)
    })
    bar.appendChild(toggle)
    this.toggleEl = toggle

    this.root.appendChild(bar)

    // ---- 移动端下拉菜单（portal 模式挂到 body，避开 shadow/backdrop-filter 祖先） ----
    const mobile = document.createElement('div')
    mobile.className = 'sn-mobile'
    mobile.setAttribute('aria-hidden', 'true')
    for (const link of this.opts.links) {
      mobile.appendChild(this.renderLink(link))
    }
    // portal 出去的 mobile 脱离了 shadow，shadow 内样式不再生效——
    // 把 styles.css 作为 inline <style> 挂到 mobile 子树里，让 .sn-mobile / .sn-link
    // 等选择器在 portal 节点内也能匹配
    const portalStyle = document.createElement('style')
    portalStyle.setAttribute('data-sn-portal-styles', '')
    portalStyle.textContent = styles
    mobile.appendChild(portalStyle)
    this.opts.portalEl.appendChild(mobile)
    this.mobileEl = mobile

    // ---- 全局事件 ----
    document.addEventListener('click', this.onDocClick)
    document.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll, true) // 捕获阶段：sticky header 内滚动也要更新
  }

  private renderBrand(brand: SiteNavbarBrand): HTMLElement {
    const a = document.createElement('a')
    a.className = 'sn-brand'
    a.href = escapeAttr(brand.href ?? this.opts.links[0]?.href ?? '#')
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    if (brand.icon) {
      const icon = document.createElement('span')
      icon.className = 'sn-brand-icon'
      icon.innerHTML = brand.icon
      a.appendChild(icon)
    }
    if (brand.text) {
      a.appendChild(document.createTextNode(brand.text))
    }
    return a
  }

  private renderLink(link: SiteNavbarLink): HTMLElement {
    const a = document.createElement('a')
    a.className = 'sn-link'
    a.href = escapeAttr(link.href)
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    const active = link.active === true || (link.active !== false && isCurrentHost(link.href))
    if (active) a.classList.add('sn-active')
    a.setAttribute('aria-current', active ? 'page' : 'false')
    if (link.icon) {
      const icon = document.createElement('span')
      icon.className = 'sn-link-icon'
      icon.innerHTML = link.icon
      a.appendChild(icon)
    }
    a.appendChild(document.createTextNode(link.label))
    a.addEventListener('click', (e) => this.opts.onNavigate?.(link, e))
    return a
  }

  // ==================== 移动端菜单交互 ====================

  private setMobileOpen(open: boolean): void {
    this.mobileOpen = open
    if (this.mobileEl) {
      this.mobileEl.classList.toggle('sn-open', open)
      this.mobileEl.setAttribute('aria-hidden', String(!open))
      if (open) {
        this.updateMobilePosition()
      }
    }
    if (this.toggleEl) {
      this.toggleEl.setAttribute('aria-expanded', String(open))
      this.toggleEl.innerHTML = open ? CLOSE_ICON : HAMBURGER_ICON
    }
  }

  /**
   * 根据导航栏根节点（.sn-root）的视口位置更新 portal 菜单的 fixed 定位。
   * position: fixed + top/left/width 三件套确保菜单紧贴导航栏下方，
   * 不受祖先 backdrop-filter / transform / sticky 等影响绘制边界。
   */
  private updateMobilePosition(): void {
    if (!this.mobileEl) return
    const rect = this.root.getBoundingClientRect()
    const s = this.mobileEl.style
    s.position = 'fixed'
    s.top = `${Math.round(rect.bottom + 8)}px`
    s.left = `${Math.round(rect.left)}px`
    s.width = `${Math.round(rect.width)}px`
  }

  /** 点击导航栏外部关闭移动菜单 */
  private onDocClick = (e: MouseEvent): void => {
    if (!this.mobileOpen) return
    const target = e.target as Node
    // 关闭条件：点击既不在导航栏内，也不在菜单内（菜单在 portal）
    if (!this.root.contains(target) && !(this.mobileEl && this.mobileEl.contains(target))) {
      this.setMobileOpen(false)
    }
  }

  /** Esc 关闭移动菜单 */
  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.mobileOpen) {
      this.setMobileOpen(false)
    }
  }

  /** 视口超过断点时收起移动菜单 + 滚动时实时更新菜单位置 */
  private onResize = (): void => {
    if (this.mobileOpen && window.innerWidth > this.opts.breakpoint) {
      this.setMobileOpen(false)
    }
  }

  /** 页面滚动时实时更新菜单 fixed 位置，避免菜单与导航栏脱节 */
  private onScroll = (): void => {
    if (this.mobileOpen) {
      this.updateMobilePosition()
    }
  }
}

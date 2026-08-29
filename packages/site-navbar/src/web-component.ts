/**
 * Web Component 入口：把 SiteNavbar 包装成 <site-navbar> custom element。
 *
 * 用法：
 *   1. 一行 script 引入（unpkg 或自身 CDN）—— 页面放 <site-navbar></site-navbar> 即出现整条导航。
 *   2. 声明式属性：<site-navbar brand="我的导航" avatar="false"></site-navbar>
 *   3. 全局配置：window.__SITE_NAVBAR_OPTIONS__ = { links: [...], avatarOptions: {...}, theme: {...} }
 *      （属性优先级高于全局配置）
 *
 * 注意：右侧头像运行时动态加载 <user-avatar> Web Component（默认 unpkg @latest），
 * user-avatar 发版后自动跟上，无需重新发布本组件；页面需自行引入 wx-auth-sdk 并 init。
 * 可用 avatar-src 属性 / avatarOptions.src 指定头像脚本地址（如自身 CDN）。
 * 样式内联进 shadow DOM，外部可通过 :host 上的 --sn-* 变量定制。
 */
import {
  SiteNavbar,
  type SiteNavbarAvatarOptions,
  type SiteNavbarOptions
} from './SiteNavbar'
import type { SiteNavbarBrand, SiteNavbarLink, SiteNavbarTheme } from './types'
import styles from './styles.css'

const TAG = 'site-navbar'
const GLOBAL_KEY = '__SITE_NAVBAR_OPTIONS__'

function readGlobal(): SiteNavbarOptions | undefined {
  return (window as unknown as Record<string, unknown>)[GLOBAL_KEY] as
    | SiteNavbarOptions
    | undefined
}

function boolAttr(el: HTMLElement, name: string, fallback: boolean): boolean {
  const v = el.getAttribute(name)
  if (v === null) return fallback
  return v === '' || v === 'true' || v === '1'
}

const THEME_ATTRS: ReadonlyArray<readonly [string, keyof SiteNavbarTheme]> = [
  ['theme-primary', 'primary'],
  ['theme-secondary', 'secondary'],
  ['theme-accent', 'accent'],
  ['theme-hover-bg', 'hoverBg'],
  ['theme-bg', 'bg'],
  ['theme-border', 'border'],
  ['theme-radius', 'radius'],
  ['theme-font-family', 'fontFamily']
]

export class SiteNavbarElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'brand',
      'brand-icon',
      'avatar',
      'avatar-src',
      'links',
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  private readonly shadow: ShadowRoot
  private widget: SiteNavbar | null = null

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = styles
    this.shadow.appendChild(style)
  }

  connectedCallback(): void {
    this.mountWidget()
  }

  disconnectedCallback(): void {
    this.widget?.unmount()
    this.widget = null
  }

  attributeChangedCallback(): void {
    if (this.isConnected) {
      this.mountWidget()
    }
  }

  private mountWidget(): void {
    this.widget?.unmount()
    this.widget = new SiteNavbar(this.buildOptions(), this.shadow)
    this.widget.mount()
  }

  private buildOptions(): SiteNavbarOptions {
    const global = readGlobal() ?? {}
    const get = (name: string): string | null => this.getAttribute(name)

    const theme: SiteNavbarTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) theme[key] = v
    }

    // 品牌区：brand 属性（文本）+ brand-icon 属性，缺省回退全局配置
    let brand: SiteNavbarBrand | null | undefined = global.brand
    const brandAttr = get('brand')
    if (brandAttr !== null) {
      brand = { ...(global.brand ?? {}), text: brandAttr }
    }
    const brandIcon = get('brand-icon')
    if (brandIcon !== null) {
      brand = { ...(brand ?? {}), icon: brandIcon }
    }

    // links 属性：JSON 数组字符串，优先级高于全局配置
    let links: SiteNavbarLink[] | undefined = global.links
    const linksAttr = get('links')
    if (linksAttr !== null) {
      try {
        const parsed: unknown = JSON.parse(linksAttr)
        if (Array.isArray(parsed)) links = parsed as SiteNavbarLink[]
      } catch {
        // 忽略非法 JSON，回退默认
      }
    }

    // avatar-src 属性：覆盖运行时加载的 <user-avatar> 脚本地址（如指向自身 CDN）
    let avatarOptions: SiteNavbarAvatarOptions | undefined = global.avatarOptions
    const avatarSrc = get('avatar-src')
    if (avatarSrc !== null) {
      avatarOptions = { ...(avatarOptions ?? {}), src: avatarSrc }
    }

    return {
      ...global,
      links,
      brand,
      avatar: boolAttr(this, 'avatar', global.avatar ?? true),
      avatarOptions,
      theme: { ...(global.theme ?? {}), ...theme },
      onNavigate: global.onNavigate
    }
  }
}

/**
 * 防闪烁占位：<site-navbar> 升级为 custom element 前是"未知元素"，
 * 高度为 0；等 JS 加载、组件注册、渲染后才撑出高度，页面下方内容会被
 * 突然往下推（布局跳动/闪一下）。
 *
 * 在注册前向全局注入一条样式：未定义（:not(:defined)）的 <site-navbar>
 * 也占一个与导航栏等高的空间。这样从页面首帧起布局就稳定，
 * 组件升级后由自身接管渲染，占位样式自动失效（:defined 匹配不再命中）。
 *
 * 高度默认 44px（与导航栏实际渲染高度 43.7px 对齐，避免加载后回跳），
 * 接入方可覆盖：
 *   site-navbar { --sn-navbar-height: 64px; }
 * 若要彻底消除 JS 下载期间的闪烁，接入方可在 <head> 里直接写：
 *   site-navbar:not(:defined){ display:block; height:44px }
 */
function injectPlaceholder(): void {
  const id = `data-sn-placeholder`
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = `${TAG}:not(:defined) {
  display: block;
  height: var(--sn-navbar-height, 44px);
  box-sizing: border-box;
}`
  ;(document.head || document.documentElement).appendChild(style)
}

/** 有 <site-navbar> 标签才注册；无标签不自动注入 */
if (!customElements.get(TAG)) {
  injectPlaceholder()
  customElements.define(TAG, SiteNavbarElement)
}

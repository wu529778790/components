/**
 * Web Component 入口：把 SiteNavbar 包装成 <site-navbar> custom element。
 *
 * 用法：
 *   1. 一行 script 引入（unpkg 或自身 CDN）—— 页面放 <site-navbar></site-navbar> 即出现整条导航。
 *   2. 声明式属性：<site-navbar brand="我的导航" avatar="false"></site-navbar>
 *   3. 全局配置：window.__SITE_NAVBAR_OPTIONS__ = { links: [...], avatarOptions: {...}, theme: {...} }
 *      （属性优先级高于全局配置）
 *
 * 注意：头像（user-avatar）已打包进本组件，无需再引入 user-avatar.wc.js。
 * 样式内联进 shadow DOM，外部可通过 :host 上的 --sn-* 变量定制。
 */
import { SiteNavbar, type SiteNavbarOptions } from './SiteNavbar'
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

    return {
      ...global,
      links,
      brand,
      avatar: boolAttr(this, 'avatar', global.avatar ?? true),
      theme: { ...(global.theme ?? {}), ...theme },
      onNavigate: global.onNavigate
    }
  }
}

/** 有 <site-navbar> 标签才注册；无标签不自动注入 */
if (!customElements.get(TAG)) {
  customElements.define(TAG, SiteNavbarElement)
}

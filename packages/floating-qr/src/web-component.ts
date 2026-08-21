/**
 * Web Component 入口：把 FloatingQR 包装成 <floating-qr> custom element。
 *
 * 用法（三选一）：
 * 1. 一行 script 零配置 —— 无 <floating-qr> 标签时自动注入默认浮窗
 * 2. 声明式标签 —— <floating-qr position="left-bottom" theme-accent="#f00"></floating-qr>
 * 3. 全局配置 —— window.__FLOATING_QR_OPTIONS__ = {...}（属性优先级更高）
 *
 * 样式内联进 shadow DOM，外部可通过 :host 上的 --fq-* CSS 变量定制。
 */
import { FloatingQR, type FloatingQROptions, type FloatingQRTheme } from './FloatingQR'
import styles from './styles.css'

const TAG = 'floating-qr'
const GLOBAL_KEY = '__FLOATING_QR_OPTIONS__'
const AUTO_FLAG = '__floatingQrAutoInjected__'
const MOBILE_QUERY = '(max-width: 767px)'

type GlobalOptions = FloatingQROptions | undefined

function readGlobal(): GlobalOptions {
  return (window as unknown as Record<string, unknown>)[GLOBAL_KEY] as GlobalOptions
}

function boolAttr(el: HTMLElement, name: string, fallback: boolean): boolean {
  const v = el.getAttribute(name)
  if (v === null) return fallback
  return v === '' || v === 'true' || v === '1'
}

function numAttr(el: HTMLElement, name: string, fallback: number): number {
  const v = el.getAttribute(name)
  if (v === null || v === '') return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

const THEME_ATTRS: ReadonlyArray<readonly [string, keyof FloatingQRTheme]> = [
  ['theme-bg', 'bg'],
  ['theme-accent', 'accent'],
  ['theme-radius', 'radius'],
  ['theme-border', 'border']
]

export class FloatingQRElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'position',
      'close-persistence',
      'hide-on-mobile',
      'z-index',
      'wechat-src',
      'wechat-title',
      'wechat-desc',
      'donate-src',
      'donate-title',
      'donate-desc',
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  private readonly shadow: ShadowRoot
  private widget: FloatingQR | null = null
  private raf = 0

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = styles
    this.shadow.appendChild(style)
  }

  connectedCallback(): void {
    this.renderSoon()
  }

  disconnectedCallback(): void {
    cancelAnimationFrame(this.raf)
    this.widget?.destroy()
    this.widget = null
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.renderSoon()
  }

  /** 以当前属性 + 全局配置重建实例 */
  private render(): void {
    if (!this.isConnected) return

    const opts = this.buildOptions()
    if (opts.hideOnMobile && window.matchMedia?.(MOBILE_QUERY)?.matches) return

    this.widget?.destroy()
    this.widget = new FloatingQR(opts, this.shadow)
  }

  private renderSoon(): void {
    cancelAnimationFrame(this.raf)
    this.raf = requestAnimationFrame(() => this.render())
  }

  private buildOptions(): FloatingQROptions {
    const global = readGlobal() ?? {}
    const get = (name: string): string | null => this.getAttribute(name)

    const theme: FloatingQRTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) theme[key] = v
    }

    const block = (
      prefix: 'wechat' | 'donate',
      fallback: FloatingQROptions['wechat']
    ): FloatingQROptions['wechat'] => {
      const src = get(`${prefix}-src`)
      const title = get(`${prefix}-title`)
      const desc = get(`${prefix}-desc`)
      if (src === null && title === null && desc === null) return fallback
      const b: NonNullable<FloatingQROptions['wechat']> = {}
      if (src !== null) b.src = src
      if (title !== null) b.title = title
      if (desc !== null) b.desc = desc
      return b
    }

    return {
      ...global,
      position: (get('position') as FloatingQROptions['position']) ?? global.position,
      closePersistence: boolAttr(this, 'close-persistence', global.closePersistence ?? false),
      hideOnMobile: boolAttr(this, 'hide-on-mobile', global.hideOnMobile ?? true),
      zIndex: numAttr(this, 'z-index', global.zIndex ?? 9999),
      theme: { ...(global.theme ?? {}), ...theme },
      wechat: block('wechat', global.wechat),
      donate: block('donate', global.donate)
    }
  }
}

/** 共存策略：页面有 <floating-qr> 标签则按标签渲染（define 时自动 upgrade），
 *  没有任何标签且未禁用时才自动注入一个默认浮窗 */
function autoInit(): void {
  const doc = document.documentElement
  if (doc?.getAttribute('data-fq-auto') === 'false') return
  if (document.querySelector(TAG)) return
  if ((window as unknown as Record<string, unknown>)[AUTO_FLAG]) return
  ;(window as unknown as Record<string, unknown>)[AUTO_FLAG] = true

  const el = document.createElement(TAG)
  document.body.appendChild(el)
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, FloatingQRElement)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit)
  } else {
    autoInit()
  }
}

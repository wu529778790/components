/**
 * Web Component 入口：把 FloatingModal 包装成 <floating-modal> custom element。
 *
 * 用法：
 * 1. 一行 script 零配置 —— 无 <floating-modal> 标签时自动注入默认弹窗
 * 2. 声明式标签 —— <floating-modal title="公告" qr-src="..."></floating-modal>
 *    （默认连接即自动弹出；auto-show="false" 时需 JS 调用 el.show()）
 * 3. 全局配置 —— window.__FLOATING_MODAL_OPTIONS__ = {...}（属性优先级更高）
 *
 * 样式内联进 shadow DOM，外部可通过 :host 上的 --fm-* CSS 变量定制。
 */
import { FloatingModal, type FloatingModalOptions, type FloatingModalTheme } from './FloatingModal'
import styles from './styles.css'

const TAG = 'floating-modal'
const GLOBAL_KEY = '__FLOATING_MODAL_OPTIONS__'
const AUTO_FLAG = '__floatingModalAutoInjected__'

function readGlobal(): FloatingModalOptions | undefined {
  return (window as unknown as Record<string, unknown>)[GLOBAL_KEY] as
    | FloatingModalOptions
    | undefined
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

const THEME_ATTRS: ReadonlyArray<readonly [string, keyof FloatingModalTheme]> = [
  ['theme-bg', 'bg'],
  ['theme-accent', 'accent'],
  ['theme-radius', 'radius'],
  ['theme-border', 'border'],
  ['theme-overlay', 'overlay'],
  ['theme-title-color', 'titleColor'],
  ['theme-text-color', 'textColor']
]

export class FloatingModalElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'auto-show',
      'title',
      'content',
      'content-html',
      'qr-src',
      'qr-alt',
      'width',
      'mask-closable',
      'close-on-esc',
      'show-close',
      'delay',
      'z-index',
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  private readonly shadow: ShadowRoot
  private widget: FloatingModal | null = null
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

  /** 手动展示弹窗（绕过 auto-show 检查，强制渲染） */
  show(): void {
    if (this.widget?.isOpen()) return
    this.widget?.destroy()
    this.widget = new FloatingModal(this.buildOptions(), this.shadow)
  }

  /** 关闭弹窗 */
  close(): void {
    this.widget?.close()
  }

  private render(): void {
    if (!this.isConnected) return
    if (!boolAttr(this, 'auto-show', true)) return

    this.widget?.destroy()
    this.widget = new FloatingModal(this.buildOptions(), this.shadow)
  }

  private renderSoon(): void {
    cancelAnimationFrame(this.raf)
    this.raf = requestAnimationFrame(() => this.render())
  }

  private buildOptions(): FloatingModalOptions {
    const global = readGlobal() ?? {}
    const get = (name: string): string | null => this.getAttribute(name)

    const theme: FloatingModalTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) theme[key] = v
    }

    const qrSrc = get('qr-src')
    const qrAlt = get('qr-alt')
    const qr =
      qrSrc === null && qrAlt === null
        ? global.qr
        : {
            src: qrSrc ?? global.qr?.src ?? '',
            alt: qrAlt ?? global.qr?.alt
          }

    return {
      ...global,
      title: get('title') ?? global.title,
      content: get('content') ?? global.content,
      contentHtml: get('content-html') ?? global.contentHtml,
      qr,
      width: numAttr(this, 'width', global.width ?? 380),
      maskClosable: boolAttr(this, 'mask-closable', global.maskClosable ?? true),
      closeOnEsc: boolAttr(this, 'close-on-esc', global.closeOnEsc ?? true),
      showClose: boolAttr(this, 'show-close', global.showClose ?? true),
      delay: numAttr(this, 'delay', global.delay ?? 0),
      zIndex: numAttr(this, 'z-index', global.zIndex ?? 10000),
      theme: { ...(global.theme ?? {}), ...theme }
    }
  }
}

/** 共存策略：页面有 <floating-modal> 标签则按标签渲染（define 时自动 upgrade），
 *  没有任何标签且未禁用时才自动注入一个默认弹窗 */
function autoInit(): void {
  const doc = document.documentElement
  if (doc?.getAttribute('data-fm-auto') === 'false') return
  if (document.querySelector(TAG)) return
  if ((window as unknown as Record<string, unknown>)[AUTO_FLAG]) return
  ;(window as unknown as Record<string, unknown>)[AUTO_FLAG] = true

  const el = document.createElement(TAG)
  document.body.appendChild(el)
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, FloatingModalElement)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit)
  } else {
    autoInit()
  }
}

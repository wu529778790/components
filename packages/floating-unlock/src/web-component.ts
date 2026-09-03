/**
 * Web Component 入口：把 FloatingUnlock 包装成 <floating-unlock> custom element。
 *
 * 用法：
 * 1. 声明式标签 —— <floating-unlock api-base="https://wx-auth.shenzjd.com" site-id="xxx"></floating-unlock>
 *    业务在需要解锁时调用 el.unlock()，返回 Promise<UnlockResult>，
 *    { ok: true, ticket, grant } 才代表解锁成功。
 * 2. 全局配置 —— window.__FLOATING_UNLOCK_OPTIONS__ = {...}（属性优先级更高）
 *
 * 注意：本组件是「强制解锁」场景，不自动弹出——由业务方在需要解锁的动作处
 * （如「继续搜索」）调用 unlock() 触发。样式内联进 shadow DOM，外部可通过
 * :host 上的 --fu-* CSS 变量定制。
 */
import {
  FloatingUnlock,
  type FloatingUnlockOptions,
  type FloatingUnlockResult,
  type FloatingUnlockTheme
} from './FloatingUnlock'
import styles from './styles.css'

const TAG = 'floating-unlock'
const GLOBAL_KEY = '__FLOATING_UNLOCK_OPTIONS__'

function readGlobal(): FloatingUnlockOptions | undefined {
  return (window as unknown as Record<string, unknown>)[GLOBAL_KEY] as
    | FloatingUnlockOptions
    | undefined
}

function numAttr(el: HTMLElement, name: string, fallback: number): number {
  const v = el.getAttribute(name)
  if (v === null || v === '') return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

const THEME_ATTRS: ReadonlyArray<readonly [string, keyof FloatingUnlockTheme]> = [
  ['theme-bg', 'bg'],
  ['theme-accent', 'accent'],
  ['theme-radius', 'radius'],
  ['theme-border', 'border'],
  ['theme-overlay', 'overlay'],
  ['theme-title-color', 'titleColor'],
  ['theme-text-color', 'textColor']
]

export class FloatingUnlockElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'api-base',
      'site-id',
      'title',
      'content',
      'content-html',
      'width',
      'z-index',
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  private readonly shadow: ShadowRoot
  private widget: FloatingUnlock | null = null

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = styles
    this.shadow.appendChild(style)
  }

  disconnectedCallback(): void {
    this.widget?.destroy()
    this.widget = null
  }

  /**
   * 发起解锁。返回 Promise<FloatingUnlockResult>：
   *   { ok: true,  ticket, grant }  → 解锁成功；业务方须把 ticket+grant 带去业务后端验票
   *   { ok: false, ticket: null, grant: null } → 失败/过期/被取消，业务应中断
   */
  unlock(): Promise<FloatingUnlockResult> {
    this.widget?.destroy()
    this.widget = new FloatingUnlock(this.buildOptions(), this.shadow)
    return this.widget.unlock()
  }

  /** 关闭弹窗 */
  close(): void {
    this.widget?.close()
  }

  private buildOptions(): FloatingUnlockOptions {
    const global = readGlobal() ?? {}
    const get = (name: string): string | null => this.getAttribute(name)

    const theme: FloatingUnlockTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) theme[key] = v
    }

    return {
      ...global,
      apiBase: get('api-base') ?? global.apiBase,
      siteId: get('site-id') ?? global.siteId,
      title: get('title') ?? global.title,
      content: get('content') ?? global.content,
      contentHtml: get('content-html') ?? global.contentHtml,
      width: numAttr(this, 'width', global.width ?? 380),
      zIndex: numAttr(this, 'z-index', global.zIndex ?? 10000),
      theme: { ...(global.theme ?? {}), ...theme }
    }
  }
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, FloatingUnlockElement)
}
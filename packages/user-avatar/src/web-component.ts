/**
 * Web Component 入口：把 UserAvatar 包装成 <user-avatar> custom element。
 *
 * 用法：
 *   1. 一行 script 引入（unpkg 或自身 CDN）—— 若页面已有 <user-avatar> 标签自动升级；
 *      没有标签时不自动注入（头像组件必须显式声明，不做全站自动挂载）。
 *   2. 声明式：<user-avatar api-base="/" size="2.5rem" fixed></user-avatar>
 *   3. 全局配置：window.__USER_AVATAR_OPTIONS__ = { apiBase: '', theme: {...} }
 *   4. 程序化：el.props = { fixed: false, size: '2rem', onLogin() {...} }
 *      （优先级：props > 标签属性 > 全局配置；供 site-navbar 等宿主组件嵌入时传
 *      回调/复杂对象——这些无法走标签属性）
 *
 * 注意：本组件依赖 window.WxAuth（wx-auth-sdk），请确保先引入 wx-auth-sdk 并 init。
 * 样式内联进 shadow DOM，外部可通过 :host 上的 --ua-* 变量定制。
 */
import { UserAvatar, type UserAvatarOptions, type UserAvatarTheme } from './UserAvatar'
import styles from './styles.css'

const TAG = 'user-avatar'
const GLOBAL_KEY = '__USER_AVATAR_OPTIONS__'

function readGlobal(): UserAvatarOptions | undefined {
  return (window as unknown as Record<string, unknown>)[GLOBAL_KEY] as
    | UserAvatarOptions
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

/** 解析 portal-el：接受 CSS 选择器 或 `#id` / 元素 id，解析不到返回 undefined（用 body） */
function resolvePortalEl(value: string | HTMLElement | undefined): HTMLElement | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  const v = value.trim()
  // `#xxx` 或元素 id（无前缀）都按 id 解析
  const id = v.startsWith('#') ? v.slice(1) : v
  const byId = document.getElementById(id)
  if (byId) return byId
  // 否则按 CSS 选择器解析（querySelector 兜底）
  try {
    const found = document.querySelector<HTMLElement>(v)
    return found ?? undefined
  } catch {
    return undefined
  }
}

const THEME_ATTRS: ReadonlyArray<readonly [string, keyof UserAvatarTheme]> = [
  ['theme-btn-bg', 'btnBg'],
  ['theme-size', 'size'],
  ['theme-accent', 'accent'],
  ['theme-btn-border', 'btnBorder'],
  ['theme-radius', 'radius'],
  ['theme-bg', 'bg'],
  ['theme-text', 'text'],
  ['theme-sub-text', 'subText'],
  ['theme-overlay', 'overlay'],
  ['theme-danger', 'danger'],
  ['theme-success', 'success']
]

export class UserAvatarElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'api-base',
      'fixed',
      'offset',
      'size',
      'z-index',
      'portal',
      'portal-el',
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  /**
   * 程序化传入完整配置（JS 属性，优先级最高）。
   * 用 declare 而非类字段：元素在脚本加载完成前就可能与宿主组合
   * （此时赋的值是普通 expando），类字段会在升级后的 constructor 里
   * 覆盖掉它，declare 不产生任何赋值语句，expando 得以保留。
   */
  declare props?: UserAvatarOptions

  private readonly shadow: ShadowRoot
  private widget: UserAvatar | null = null
  private pollTimer: ReturnType<typeof setInterval> | null = null

  /** 环境检查透传：供宿主组件（如 site-navbar）在无法直接 import 类时调用 */
  static check(): string | null {
    return UserAvatar.check()
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = styles
    this.shadow.appendChild(style)
  }

  connectedCallback(): void {
    this.mountWidget()
    // wx-auth-sdk 可能晚于本组件加载（如脚本顺序在后）。
    // 轮询 window.WxAuth：一旦出现就重建组件，保证能正常登录。
    if (UserAvatar.check() !== null) {
      this.startPolling()
    }
  }

  disconnectedCallback(): void {
    this.stopPolling()
    this.widget?.unmount()
    this.widget = null
  }

  attributeChangedCallback(): void {
    if (this.isConnected) {
      this.stopPolling()
      this.mountWidget()
      if (UserAvatar.check() !== null) this.startPolling()
    }
  }

  private startPolling(): void {
    if (this.pollTimer) return
    this.pollTimer = setInterval(() => {
      if (UserAvatar.check() === null) {
        this.stopPolling()
        this.mountWidget()
      }
    }, 400)
  }

  private stopPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer)
      this.pollTimer = null
    }
  }

  private mountWidget(): void {
    this.widget?.unmount()
    const error = UserAvatar.check()
    if (error) {
      console.warn(`[${TAG}] ${error}`);
    }
    this.widget = new UserAvatar(this.buildOptions(), this.shadow)
    this.widget.mount()
  }

  private buildOptions(): UserAvatarOptions {
    const global = readGlobal() ?? {}
    const props = this.props ?? {}
    const get = (name: string): string | null => this.getAttribute(name)

    const themeAttrs: UserAvatarTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) themeAttrs[key] = v
    }

    // 标签属性层：只收集显式声明过的属性，未声明的保持 undefined 不参与覆盖
    const attrs: UserAvatarOptions = {
      apiBase: get('api-base') ?? undefined,
      fixed: get('fixed') !== null ? boolAttr(this, 'fixed', true) : undefined,
      offset: get('offset') ?? undefined,
      size: get('size') ?? undefined,
      zIndex: get('z-index') !== null ? numAttr(this, 'z-index', 12000) : undefined,
      portal: get('portal') !== null ? boolAttr(this, 'portal', true) : undefined,
      portalEl: resolvePortalEl(get('portal-el') ?? undefined),
      theme: Object.keys(themeAttrs).length ? themeAttrs : undefined
    }

    // 优先级：props（程序化传入）> 标签属性 > window 全局配置
    return {
      ...compact(global),
      ...compact(attrs),
      ...compact(props),
      theme: { ...(global.theme ?? {}), ...(attrs.theme ?? {}), ...(props.theme ?? {}) }
    }
  }
}

/** 浅拷贝并剔除 undefined 字段，避免高优先级对象里未设置的字段抹掉低优先级的值 */
function compact<T extends object>(o: T): Partial<T> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(o)) {
    if (v !== undefined) out[k] = v
  }
  return out as Partial<T>
}

/** 有 <user-avatar> 标签才注册；无标签不自动注入（头像组件需显式声明） */
if (!customElements.get(TAG)) {
  customElements.define(TAG, UserAvatarElement)
}
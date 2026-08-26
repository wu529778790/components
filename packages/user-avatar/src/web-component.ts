/**
 * Web Component 入口：把 UserAvatar 包装成 <user-avatar> custom element。
 *
 * 用法：
 *   1. 一行 script 引入（unpkg 或自身 CDN）—— 若页面已有 <user-avatar> 标签自动升级；
 *      没有标签时不自动注入（头像组件必须显式声明，不做全站自动挂载）。
 *   2. 声明式：<user-avatar api-base="/" size="2.5rem" fixed></user-avatar>
 *   3. 全局配置：window.__USER_AVATAR_OPTIONS__ = { apiBase: '', theme: {...} }
 *      （属性优先级高于全局配置）
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
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  private readonly shadow: ShadowRoot
  private widget: UserAvatar | null = null
  private pollTimer: ReturnType<typeof setInterval> | null = null

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
    const get = (name: string): string | null => this.getAttribute(name)

    const theme: UserAvatarTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) theme[key] = v
    }

    return {
      ...global,
      apiBase: get('api-base') ?? global.apiBase,
      fixed: boolAttr(this, 'fixed', global.fixed ?? true),
      offset: get('offset') ?? global.offset,
      size: get('size') ?? global.size,
      zIndex: numAttr(this, 'z-index', global.zIndex ?? 12000),
      theme: { ...(global.theme ?? {}), ...theme },
      onLogin: global.onLogin,
      onLogout: global.onLogout,
      onGithubBound: global.onGithubBound
    }
  }
}

/** 有 <user-avatar> 标签才注册；无标签不自动注入（头像组件需显式声明） */
if (!customElements.get(TAG)) {
  customElements.define(TAG, UserAvatarElement)
}
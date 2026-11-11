/**
 * Web Component 入口：把 FloatingAd 包装成 <floating-ad> custom element。
 *
 * 用法（三选一）：
 * 1. 声明式标签 —— <floating-ad ad-src="..." ad-title="..." ad-href="..."></floating-ad>
 *                    多条广告用 ads-json='[{...},{...}]'
 * 2. 全局配置 —— window.__FLOATING_AD_OPTIONS__ = {...} + 一行 script（无标签时自动注入）
 * 3. JS 调用 —— el.setAttribute('ads-json', JSON.stringify([...]))
 *
 * 注意：广告浮窗没有默认素材，零配置不会注入空白卡片。
 * 样式内联进 shadow DOM，外部可通过 :host 上的 --fa-* CSS 变量定制。
 */
import {
  FloatingAd,
  type FloatingAdItem,
  type FloatingAdOptions,
  type FloatingAdTheme
} from './FloatingAd'
import styles from './styles.css'

const TAG = 'floating-ad'
const GLOBAL_KEY = '__FLOATING_AD_OPTIONS__'
const AUTO_FLAG = '__floatingAdAutoInjected__'
const MOBILE_QUERY = '(max-width: 767px)'

type GlobalOptions = FloatingAdOptions | undefined

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

const THEME_ATTRS: ReadonlyArray<readonly [string, keyof FloatingAdTheme]> = [
  ['theme-bg', 'bg'],
  ['theme-accent', 'accent'],
  ['theme-radius', 'radius'],
  ['theme-border', 'border']
]

/** 解析 ads-json 属性：JSON 数组 / 单个对象 → 广告列表；非法 JSON 返回 null 走全局配置 */
function parseAdsJson(raw: string | null): FloatingAdItem[] | null {
  if (raw === null) return null
  const trimmed = raw.trim()
  if (!trimmed) return null
  try {
    const parsed: unknown = JSON.parse(trimmed)
    if (Array.isArray(parsed)) return parsed as FloatingAdItem[]
    if (parsed && typeof parsed === 'object') return [parsed as FloatingAdItem]
  } catch {
    /* 非法 JSON 静默忽略 */
  }
  return null
}

/** 解析 ad-label：缺省 / 空串 / true 走默认；false|none|off|0 关闭；其余为自定义文案 */
function resolveAdLabel(raw: string | null, fallback: string | false): string | false {
  if (raw === null) return fallback
  const trimmed = raw.trim()
  if (!trimmed || trimmed === 'true') return fallback === false ? '广告' : fallback
  if (/^(false|none|off|0)$/i.test(trimmed)) return false
  return trimmed
}

export class FloatingAdElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'position',
      'close-persistence',
      'hide-on-mobile',
      'z-index',
      'ad-label',
      'width',
      'offset',
      'image-fit',
      'image-height',
      'ad-src',
      'ad-title',
      'ad-desc',
      'ad-href',
      'ad-target',
      'ad-badge',
      'ads-json',
      ...THEME_ATTRS.map(([attr]) => attr)
    ]
  }

  private readonly shadow: ShadowRoot
  private widget: FloatingAd | null = null
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

  /** 手动打开（关闭后再次显示） */
  open(): void {
    if (this.widget?.isMounted()) return
    this.widget?.destroy()
    this.widget = new FloatingAd(this.buildOptions(), this.shadow)
  }

  /** 关闭浮窗 */
  close(): void {
    this.widget?.close()
  }

  /** 以当前属性 + 全局配置重建实例 */
  private render(): void {
    if (!this.isConnected) return

    const opts = this.buildOptions()
    if (opts.hideOnMobile && window.matchMedia?.(MOBILE_QUERY)?.matches) return

    this.widget?.destroy()
    this.widget = new FloatingAd(opts, this.shadow)
  }

  private renderSoon(): void {
    cancelAnimationFrame(this.raf)
    this.raf = requestAnimationFrame(() => this.render())
  }

  private buildOptions(): FloatingAdOptions {
    const global = readGlobal() ?? {}
    const get = (name: string): string | null => this.getAttribute(name)

    const theme: FloatingAdTheme = {}
    for (const [attr, key] of THEME_ATTRS) {
      const v = get(attr)
      if (v !== null) theme[key] = v
    }

    const jsonAds = parseAdsJson(get('ads-json'))
    const single = this.readSingleAd()
    const ads = jsonAds ?? (single ? [single] : global.ads)

    const fit = get('image-fit')
    const imageFit: FloatingAdOptions['imageFit'] =
      fit === 'contain' || fit === 'cover' ? fit : global.imageFit

    return {
      ...global,
      ads,
      position: (get('position') as FloatingAdOptions['position']) ?? global.position,
      closePersistence: boolAttr(this, 'close-persistence', global.closePersistence ?? false),
      hideOnMobile: boolAttr(this, 'hide-on-mobile', global.hideOnMobile ?? true),
      zIndex: numAttr(this, 'z-index', global.zIndex ?? 9999),
      width: numAttr(this, 'width', global.width ?? 170),
      offset: numAttr(this, 'offset', global.offset ?? 16),
      imageFit,
      imageHeight: numAttr(this, 'image-height', global.imageHeight ?? 0),
      adLabel: resolveAdLabel(get('ad-label'), global.adLabel ?? '广告'),
      theme: { ...(global.theme ?? {}), ...theme }
    }
  }

  /** 单条广告的扁平静态属性（ad-src / ad-title / ...），无任一属性返回 null */
  private readSingleAd(): FloatingAdItem | null {
    const src = this.getAttribute('ad-src')
    const title = this.getAttribute('ad-title')
    const desc = this.getAttribute('ad-desc')
    const href = this.getAttribute('ad-href')
    const badge = this.getAttribute('ad-badge')
    const target = this.getAttribute('ad-target')

    if (src === null && title === null && desc === null && href === null && badge === null) {
      return null
    }

    const item: FloatingAdItem = {}
    if (src !== null) item.src = src
    if (title !== null) item.title = title
    if (desc !== null) item.desc = desc
    if (href !== null) item.href = href
    if (badge !== null) item.badge = badge
    if (target === '_self' || target === '_blank') item.target = target
    return item
  }
}

/** 共存策略：页面有 <floating-ad> 标签则按标签渲染（define 时自动 upgrade）；
 *  没有标签、且提供了全局广告配置时才自动注入 —— 不注入空白卡片 */
function autoInit(): void {
  const doc = document.documentElement
  if (doc?.getAttribute('data-fa-auto') === 'false') return
  if (document.querySelector(TAG)) return
  if ((window as unknown as Record<string, unknown>)[AUTO_FLAG]) return
  if (!readGlobal()) return
  ;(window as unknown as Record<string, unknown>)[AUTO_FLAG] = true

  const el = document.createElement(TAG)
  document.body.appendChild(el)
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, FloatingAdElement)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit)
  } else {
    autoInit()
  }
}

export type Position =
  | 'right-bottom'
  | 'right-top'
  | 'right-center'
  | 'left-bottom'
  | 'left-top'
  | 'left-center'

/** 单条广告 */
export interface FloatingAdItem {
  /** 广告图片地址（必填；没有图片的条目不会渲染） */
  src: string
  /** 标题 */
  title?: string
  /** 副文案 / 卖点 */
  desc?: string
  /** 点击跳转链接（可选，不传则不可点击） */
  href?: string
  /** 跳转方式，默认 `_blank`（仅在传了 href 时生效） */
  target?: '_blank' | '_self'
  /** 图片 alt，缺省使用标题 */
  alt?: string
  /** 图片右上角角标文案，如「限时」 */
  badge?: string
}

export interface FloatingAdTheme {
  /** 浮窗背景色 */
  bg?: string
  /** 强调色（标题、角标） */
  accent?: string
  /** 圆角大小 */
  radius?: string
  /** 边框颜色 */
  border?: string
}

export interface FloatingAdOptions {
  /** 广告列表（按数组顺序自上而下排列；为空时不渲染浮窗） */
  ads?: FloatingAdItem[]
  /** 浮窗位置，默认 left-center（左侧垂直居中） */
  position?: Position
  /** 关闭后是否记住状态（写入 localStorage），默认 false —— false 时刷新页面必然重新出现 */
  closePersistence?: boolean
  /** 移动端（<768px）默认隐藏，默认 true */
  hideOnMobile?: boolean
  /** 浮窗 z-index，默认 9999 */
  zIndex?: number
  /** 「广告」标识文案（压在首图左上角），默认 false 不显示；传字符串则显示该文案 */
  adLabel?: string | false
  /** 浮窗宽度（px），默认 170 */
  width?: number
  /** 浮窗距视口边缘距离（px），默认 16 */
  offset?: number
  /** 图片填充方式，默认 cover */
  imageFit?: 'cover' | 'contain'
  /** 图片固定高度（px），0 表示按图片原始比例自适应，默认 0 */
  imageHeight?: number
  /** 主题（映射为 CSS 变量，也可直接覆盖 --fa-* 变量） */
  theme?: FloatingAdTheme
  /** 点击广告回调（不影响默认跳转行为） */
  onClick?: (ad: FloatingAdItem, event: MouseEvent) => void
}

interface ResolvedOptions {
  ads: FloatingAdItem[]
  position: Position
  closePersistence: boolean
  hideOnMobile: boolean
  zIndex: number
  adLabel: string | false
  width: number
  offset: number
  imageFit: 'cover' | 'contain'
  imageHeight: number
  theme: Required<FloatingAdTheme>
  /** 用户显式传入的主题子集（未配置的 key 交给 CSS 默认值，可随系统深浅色变化） */
  themeOverrides: FloatingAdTheme
  onClick?: (ad: FloatingAdItem, event: MouseEvent) => void
}

const DEFAULT_THEME: Required<FloatingAdTheme> = {
  bg: 'rgba(255, 255, 255, 0.96)',
  accent: '#333',
  radius: '12px',
  border: 'rgba(0, 0, 0, 0.1)'
}

const STORAGE_KEY = 'floating-ad:closed'
const MOBILE_QUERY = '(max-width: 767px)'

function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.(MOBILE_QUERY)?.matches ?? false
}

function hasCloseMark(): boolean {
  if (typeof localStorage === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function setCloseMark(): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* ignore quota / privacy mode */
  }
}

/** 只有带图片的条目才会渲染（本组件只承载图片广告） */
function isRenderableAd(ad: FloatingAdItem | null | undefined): ad is FloatingAdItem {
  return Boolean(ad && typeof ad === 'object' && ad.src?.trim())
}

function resolveOptions(options: FloatingAdOptions): ResolvedOptions {
  const raw = Array.isArray(options.ads) ? options.ads : []
  return {
    ads: raw.filter(isRenderableAd),
    position: options.position ?? 'left-center',
    closePersistence: options.closePersistence ?? false,
    hideOnMobile: options.hideOnMobile ?? true,
    zIndex: options.zIndex ?? 9999,
    adLabel: options.adLabel === undefined ? false : options.adLabel,
    width: Number.isFinite(options.width) ? Math.max(80, Number(options.width)) : 170,
    offset: Number.isFinite(options.offset) ? Math.max(0, Number(options.offset)) : 16,
    imageFit: options.imageFit === 'contain' ? 'contain' : 'cover',
    imageHeight: Number.isFinite(options.imageHeight) ? Math.max(0, Number(options.imageHeight)) : 0,
    theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) },
    themeOverrides: options.theme ?? {},
    onClick: options.onClick
  }
}

/**
 * A minimal floating ad slot that pins image / text ads to the left (or right) edge.
 * Zero dependencies. Framework-agnostic. Styleable via --fa-* CSS variables.
 *
 * 没有广告数据时不渲染任何节点（不会留下空白卡片）。
 *
 * @param container 渲染容器，默认 document.body；Web Component 场景传入 shadow root
 */
export class FloatingAd {
  private opts: ResolvedOptions
  private readonly container: HTMLElement | ShadowRoot
  private el: HTMLElement | null = null
  private closeBtn: HTMLButtonElement | null = null
  /** 本次渲染的广告列表（与 DOM 上的 data-index 一一对应） */
  private rendered: FloatingAdItem[] = []

  constructor(
    options: FloatingAdOptions = {},
    container: HTMLElement | ShadowRoot = document.body
  ) {
    this.opts = resolveOptions(options)
    this.container = container

    if (this.opts.hideOnMobile && isMobile()) return
    if (this.opts.closePersistence && hasCloseMark()) return

    this.render()
  }

  /** 是否已挂载到页面 */
  isMounted(): boolean {
    return this.el !== null && this.el.isConnected
  }

  /** 打开（已关闭后再次显示，忽略 localStorage 关闭标记） */
  open(): void {
    if (this.isMounted()) return
    this.render()
  }

  /** 关闭浮窗（完全移除）。默认不记住状态，刷新后重新出现 */
  close(): void {
    if (this.opts.closePersistence) {
      setCloseMark()
    }
    this.destroy()
  }

  /** 从页面移除并解绑 */
  destroy(): void {
    this.closeBtn?.removeEventListener('click', this.handleClose)
    this.closeBtn = null
    this.el?.removeEventListener('click', this.handleItemClick)
    this.el?.remove()
    this.el = null
    this.rendered = []
  }

  /** 用新配置重渲染（保留原容器） */
  update(options: FloatingAdOptions): void {
    this.destroy()
    this.opts = resolveOptions(options)

    if (this.opts.hideOnMobile && isMobile()) return
    if (this.opts.closePersistence && hasCloseMark()) return

    this.render()
  }

  private render(): void {
    const { ads, position, zIndex, themeOverrides, adLabel, width, offset, imageFit, imageHeight } =
      this.opts

    if (ads.length === 0) return

    const root = document.createElement('div')
    root.className = 'fa-widget'
    root.dataset.position = position
    root.style.zIndex = String(zIndex)
    root.style.setProperty('--fa-width', `${width}px`)
    root.style.setProperty('--fa-offset', `${offset}px`)
    root.style.setProperty('--fa-img-fit', imageFit)
    if (imageHeight > 0) root.style.setProperty('--fa-img-height', `${imageHeight}px`)

    // 仅把用户显式设置的主题写为 inline（用户优先）；
    // 未设置的 key 交给 CSS 变量默认值，以便跟随系统深浅色（prefers-color-scheme）
    const overrides = [
      ['--fa-bg', themeOverrides.bg],
      ['--fa-accent', themeOverrides.accent],
      ['--fa-radius', themeOverrides.radius],
      ['--fa-border', themeOverrides.border]
    ] as const
    for (const [key, value] of overrides) {
      if (value !== undefined) root.style.setProperty(key, value)
    }

    // 「广告」标识不单独占行：压在首图左上角
    const label = adLabel ? escapeHtml(String(adLabel)) : ''

    root.innerHTML = `
      <button class="fa-close" type="button" aria-label="关闭广告">${CLOSE_SVG}</button>
      ${ads
        .map((ad, index) => this.renderItem(ad, index, index === 0 ? label : ''))
        .join('<div class="fa-divider" role="separator"></div>')}
    `

    this.closeBtn = root.querySelector<HTMLButtonElement>('.fa-close')
    this.closeBtn?.addEventListener('click', this.handleClose)
    root.addEventListener('click', this.handleItemClick)

    this.rendered = ads
    this.container.appendChild(root)
    this.el = root
  }

  private renderItem(ad: FloatingAdItem, index: number, label: string): string {
    const media = `<span class="fa-media">
        <img class="fa-img" src="${escapeAttr(ad.src)}" alt="${escapeAttr(ad.alt ?? ad.title ?? '')}" loading="lazy" decoding="async" />
        ${ad.badge ? `<span class="fa-tag">${escapeHtml(ad.badge)}</span>` : ''}
        ${label ? `<span class="fa-label">${label}</span>` : ''}
      </span>`

    const body =
      ad.title || ad.desc
        ? `<span class="fa-body">
            ${ad.title ? `<span class="fa-title">${escapeHtml(ad.title)}</span>` : ''}
            ${ad.desc ? `<span class="fa-desc">${escapeHtml(ad.desc)}</span>` : ''}
          </span>`
        : ''

    const inner = `${media}${body}`

    const href = ad.href ? safeHref(ad.href) : null
    if (href) {
      const target = ad.target === '_self' ? '_self' : '_blank'
      const rel =
        target === '_blank'
          ? ' rel="noopener noreferrer nofollow sponsored"'
          : ' rel="nofollow sponsored"'
      return `<a class="fa-item" href="${escapeAttr(href)}" target="${target}"${rel} data-index="${index}">${inner}</a>`
    }

    return `<div class="fa-item" data-index="${index}">${inner}</div>`
  }

  private readonly handleClose = (): void => {
    this.close()
  }

  private readonly handleItemClick = (event: Event): void => {
    if (!this.opts.onClick) return
    const target = event.target as Element | null
    const item = target?.closest?.('.fa-item') as HTMLElement | null
    if (!item) return
    const index = Number(item.dataset.index)
    const ad = this.rendered[index]
    if (!ad) return
    this.opts.onClick(ad, event as MouseEvent)
  }
}

const CLOSE_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'

/** 过滤危险协议（javascript: / data: / vbscript: 等），返回可用链接或 null */
function safeHref(href: string): string | null {
  const trimmed = href.trim()
  if (!trimmed) return null
  const compact = trimmed.replace(/[\s\u0000-\u001f]/g, '').toLowerCase()
  if (/^(javascript|data|vbscript|file):/.test(compact)) return null
  return trimmed
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(value: string): string {
  return escapeHtml(value)
}

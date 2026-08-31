export type Position =
  | 'right-bottom'
  | 'right-top'
  | 'right-center'
  | 'left-bottom'
  | 'left-top'
  | 'left-center'

export interface FloatingQRBlock {
  /** 二维码图片 URL（可选，缺省使用组件内置的公众号/小程序默认图） */
  src?: string
  /** 区块标题文案 */
  title?: string
  /** 区块副文案（可选，不传则不显示） */
  desc?: string
}

export interface FloatingQRTheme {
  /** 浮窗背景色 */
  bg?: string
  /** 强调色（标题、分割线） */
  accent?: string
  /** 圆角大小 */
  radius?: string
  /** 边框颜色 */
  border?: string
}

/** 底部社交链接（Telegram / GitHub / X 等） */
export interface FloatingQRLink {
  /** 链接地址 */
  href: string
  /** 图标（可直接传 SVG 字符串，或内置 key / URL） */
  icon?: string
  /** 链接标题（alt / aria-label） */
  title?: string
}

export interface FloatingQROptions {
  /** 公众号区块（可选，缺省使用默认公众号二维码） */
  wechat?: FloatingQRBlock
  /** 小程序区块（可选，默认渲染；显示在公众号下方） */
  donate?: FloatingQRBlock
  /** 浮窗位置，默认 right-center */
  position?: Position
  /** 关闭后是否记住状态（写入 localStorage），默认 false —— false 时刷新页面必然重新出现 */
  closePersistence?: boolean
  /** 移动端（<768px）默认隐藏，默认 true */
  hideOnMobile?: boolean
  /** 浮窗 z-index，默认 9999 */
  zIndex?: number
  /** 主题（映射为 CSS 变量，也可直接覆盖 --fq-* 变量） */
  theme?: FloatingQRTheme
  /** 底部社交链接（公众号/小程序下方），如 Telegram、GitHub、X */
  links?: FloatingQRLink[]
}

interface ResolvedOptions {
  wechat: Required<FloatingQRBlock>
  /** 小程序区块（默认渲染） */
  donate: Required<FloatingQRBlock>
  position: Position
  closePersistence: boolean
  hideOnMobile: boolean
  zIndex: number
  theme: Required<FloatingQRTheme>
  /** 用户显式传入的主题子集（未配置的 key 交给 CSS 默认值，可随系统深浅色变化） */
  themeOverrides: FloatingQRTheme
  links: FloatingQRLink[]
}

const DEFAULT_BLOCKS: Record<'wechat' | 'donate', Required<FloatingQRBlock>> = {
  wechat: {
    src: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg',
    title: '公众号',
    desc: ''
  },
  // 小程序区块（默认渲染；已由赞赏码换成小程序）
  donate: {
    src: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260828-153016-d3e9.jpg',
    title: '小程序',
    desc: ''
  }
}

const DEFAULT_THEME: Required<FloatingQRTheme> = {
  bg: 'rgba(255, 255, 255, 0.96)',
  accent: '#333',
  radius: '12px',
  border: 'rgba(0, 0, 0, 0.1)'
}

/** 默认底部社交链接（零配置/CDN 一行即可展示，可传 links: [] 隐藏） */
const DEFAULT_LINKS: FloatingQRLink[] = [
  { href: 'https://t.me/shenzjd_com', icon: 'tg', title: 'Telegram' },
  { href: 'https://github.com/wu529778790', icon: 'github', title: 'GitHub' },
  { href: 'https://x.com/shenzujiudi', icon: 'x', title: 'X' }
]

/** 链接图标内置 key → SVG（可直接用 icon: 'tg' / 'github' / 'x'） */
const LINK_ICONS: Record<string, string> = {
  tg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.2c-1.2.5-1.1 2.2.1 2.6l4.3 1.4 1.6 5.2c.3 1.1 1.7 1.4 2.5.6l2.4-2.4 4.5 3.3c1 .7 2.4.2 2.7-1L21.9 4.6zM8.6 13.5l8.7-5.4c.1-.1.3.1.2.2l-6.8 6.7c-.2.2-.3.4-.4.7l-.5 2.6c0 .1-.2.1-.2 0l-.9-4.7c-.1-.1 0-.2 0-.1z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.1 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1.1 16.1h1.7L8.1 4.7H6.3L16.4 19.1z"/></svg>'
}

/** 解析链接图标：内置 key → SVG；URL → <img>；含 < 视为原始 SVG；其余用首字母 */
function resolveLinkIcon(icon: string | undefined, title: string | undefined): string {
  if (!icon) return escapeHtml((title || '•').slice(0, 1))
  if (LINK_ICONS[icon]) return LINK_ICONS[icon]
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(icon) || icon.startsWith('data:')) {
    return `<img class="fq-link-img" src="${escapeAttr(icon)}" alt="" loading="lazy" />`
  }
  if (icon.includes('<')) return icon
  return escapeHtml(icon.slice(0, 1))
}

const STORAGE_KEY = 'floating-qr:closed'
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

/**
 * A minimal floating widget that shows a WeChat QR (and optionally a donation QR).
 * Zero dependencies. Framework-agnostic. Styleable via --fq-* CSS variables.
 *
 * @param container 渲染容器，默认 document.body；Web Component 场景传入 shadow root
 */
export class FloatingQR {
  private readonly opts: ResolvedOptions
  private el: HTMLElement | null = null
  private closeBtn: HTMLButtonElement | null = null

  constructor(
    options: FloatingQROptions = {},
    container: HTMLElement | ShadowRoot = document.body
  ) {
    this.opts = this.resolve(options)

    if (this.opts.hideOnMobile && isMobile()) {
      return
    }
    if (this.opts.closePersistence && hasCloseMark()) {
      return
    }

    this.render(container)
  }

  /** 是否已挂载到页面 */
  isMounted(): boolean {
    return this.el !== null && this.el.isConnected
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
    this.el?.remove()
    this.el = null
  }

  /** 用新配置重渲染（会先销毁当前实例） */
  update(options: FloatingQROptions): void {
    this.destroy()
    const fresh = new FloatingQR(options)
    this.opts.theme = fresh.opts.theme
    this.opts.themeOverrides = fresh.opts.themeOverrides
    this.opts.position = fresh.opts.position
    this.opts.closePersistence = fresh.opts.closePersistence
    this.opts.hideOnMobile = fresh.opts.hideOnMobile
    this.opts.zIndex = fresh.opts.zIndex
    this.opts.wechat = fresh.opts.wechat
    this.opts.donate = fresh.opts.donate
    this.opts.links = fresh.opts.links
    this.el = fresh.el
    this.closeBtn = fresh.closeBtn
  }

  private resolve(options: FloatingQROptions): ResolvedOptions {
    const block = (
      b: FloatingQRBlock | undefined,
      key: 'wechat' | 'donate'
    ): Required<FloatingQRBlock> => {
      const def = DEFAULT_BLOCKS[key]
      return {
        src: b?.src ?? def.src,
        title: b?.title ?? def.title,
        desc: b?.desc ?? def.desc
      }
    }

    return {
      wechat: block(options.wechat, 'wechat'),
      donate: block(options.donate, 'donate'),
      position: options.position ?? 'right-center',
      closePersistence: options.closePersistence ?? false,
      hideOnMobile: options.hideOnMobile ?? true,
      zIndex: options.zIndex ?? 9999,
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) },
      themeOverrides: options.theme ?? {},
      links: options.links ?? DEFAULT_LINKS
    }
  }

  private render(container: HTMLElement | ShadowRoot = document.body): void {
    const { wechat, donate, position, zIndex, themeOverrides, links } = this.opts

    const root = document.createElement('div')
    root.className = 'fq-widget'
    root.dataset.position = position
    root.style.zIndex = String(zIndex)
    // 仅把用户显式设置的主题写为 inline（用户优先）；
    // 未设置的 key 交给 CSS 变量默认值，以便跟随系统深浅色（prefers-color-scheme）
    const overrides = [
      ['--fq-bg', themeOverrides.bg],
      ['--fq-accent', themeOverrides.accent],
      ['--fq-radius', themeOverrides.radius],
      ['--fq-border', themeOverrides.border]
    ] as const
    for (const [key, value] of overrides) {
      if (value !== undefined) root.style.setProperty(key, value)
    }

    root.innerHTML = `
      <button class="fq-close" type="button" aria-label="关闭浮窗">${CLOSE_SVG}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${escapeAttr(wechat.src)}" alt="${escapeAttr(wechat.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${escapeHtml(wechat.title)}</p>
        ${wechat.desc ? `<p class="fq-desc">${escapeHtml(wechat.desc)}</p>` : ''}
      </div>
      ${donate
        ? `<div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${escapeAttr(donate.src)}" alt="${escapeAttr(donate.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${escapeHtml(donate.title)}</p>
        ${donate.desc ? `<p class="fq-desc">${escapeHtml(donate.desc)}</p>` : ''}
      </div>`
        : ''}
      ${links.length
        ? `<div class="fq-links">${links
            .map(
              (link) => `
        <a class="fq-link" href="${escapeAttr(link.href)}" title="${escapeAttr(link.title ?? '')}" target="_blank" rel="noopener noreferrer">${resolveLinkIcon(link.icon, link.title)}</a>`
            )
            .join('')}
        </div>`
        : ''}
    `

    this.closeBtn = root.querySelector<HTMLButtonElement>('.fq-close')
    this.closeBtn?.addEventListener('click', this.handleClose)

    container.appendChild(root)
    this.el = root
  }
  private readonly handleClose = (): void => {
    this.close()
  }
}

const CLOSE_SVG =
  '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'

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

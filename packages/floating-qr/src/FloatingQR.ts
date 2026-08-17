export type Position =
  | 'right-bottom'
  | 'right-top'
  | 'right-center'
  | 'left-bottom'
  | 'left-top'
  | 'left-center'

export interface FloatingQRBlock {
  /** 二维码图片 URL（可选，缺省使用组件内置的公众号/赞赏码默认图） */
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

export interface FloatingQROptions {
  /** 公众号区块（可选，缺省使用默认公众号二维码） */
  wechat?: FloatingQRBlock
  /** 赞赏码区块（可选，缺省使用默认赞赏码） */
  donate?: FloatingQRBlock
  /** 浮窗位置，默认 right-bottom */
  position?: Position
  /** 关闭后是否记住状态（写入 localStorage），默认 false —— false 时刷新页面必然重新出现 */
  closePersistence?: boolean
  /** 移动端（<768px）默认隐藏，默认 true */
  hideOnMobile?: boolean
  /** 浮窗 z-index，默认 9999 */
  zIndex?: number
  /** 主题（映射为 CSS 变量，也可直接覆盖 --fq-* 变量） */
  theme?: FloatingQRTheme
}

interface ResolvedOptions {
  wechat: Required<FloatingQRBlock>
  donate: Required<FloatingQRBlock>
  position: Position
  closePersistence: boolean
  hideOnMobile: boolean
  zIndex: number
  theme: Required<FloatingQRTheme>
}

const DEFAULT_BLOCKS: Record<'wechat' | 'donate', Required<FloatingQRBlock>> = {
  wechat: {
    src: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg',
    title: '公众号',
    desc: ''
  },
  donate: {
    src: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png',
    title: '赞赏码',
    desc: ''
  }
}

const DEFAULT_THEME: Required<FloatingQRTheme> = {
  bg: 'rgba(255, 255, 255, 0.96)',
  accent: '#333',
  radius: '12px',
  border: 'rgba(0, 0, 0, 0.1)'
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
 * A minimal floating widget that shows a WeChat QR and a donation QR.
 * Zero dependencies. Framework-agnostic. Styleable via --fq-* CSS variables.
 */
export class FloatingQR {
  private readonly opts: ResolvedOptions
  private el: HTMLElement | null = null
  private closeBtn: HTMLButtonElement | null = null

  constructor(options: FloatingQROptions = {}) {
    this.opts = this.resolve(options)

    if (this.opts.hideOnMobile && isMobile()) {
      return
    }
    if (this.opts.closePersistence && hasCloseMark()) {
      return
    }

    this.render()
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
    this.opts.position = fresh.opts.position
    this.opts.closePersistence = fresh.opts.closePersistence
    this.opts.hideOnMobile = fresh.opts.hideOnMobile
    this.opts.zIndex = fresh.opts.zIndex
    this.opts.wechat = fresh.opts.wechat
    this.opts.donate = fresh.opts.donate
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
      position: options.position ?? 'right-bottom',
      closePersistence: options.closePersistence ?? false,
      hideOnMobile: options.hideOnMobile ?? true,
      zIndex: options.zIndex ?? 9999,
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) }
    }
  }

  private render(): void {
    const { wechat, donate, position, zIndex, theme } = this.opts

    const root = document.createElement('div')
    root.className = 'fq-widget'
    root.dataset.position = position
    root.style.zIndex = String(zIndex)
    root.style.setProperty('--fq-bg', theme.bg)
    root.style.setProperty('--fq-accent', theme.accent)
    root.style.setProperty('--fq-radius', theme.radius)
    root.style.setProperty('--fq-border', theme.border)

    root.innerHTML = `
      <button class="fq-close" type="button" aria-label="关闭浮窗">${CLOSE_SVG}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${escapeAttr(wechat.src)}" alt="${escapeAttr(wechat.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${escapeHtml(wechat.title)}</p>
        ${wechat.desc ? `<p class="fq-desc">${escapeHtml(wechat.desc)}</p>` : ''}
      </div>
      <div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${escapeAttr(donate.src)}" alt="${escapeAttr(donate.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${escapeHtml(donate.title)}</p>
        ${donate.desc ? `<p class="fq-desc">${escapeHtml(donate.desc)}</p>` : ''}
      </div>
    `

    this.closeBtn = root.querySelector<HTMLButtonElement>('.fq-close')
    this.closeBtn?.addEventListener('click', this.handleClose)

    document.body.appendChild(root)
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

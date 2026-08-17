/** 展示频率：'always' 每次访问都展示 / 'daily' 每天最多一次 / number=关闭后 N 天不再打扰 */
export type ModalFrequency = 'always' | 'daily' | number

export interface FloatingModalTheme {
  /** 卡片背景色 */
  bg?: string
  /** 强调色（标题、主按钮） */
  accent?: string
  /** 卡片圆角 */
  radius?: string
  /** 卡片边框色 */
  border?: string
  /** 遮罩颜色 */
  overlay?: string
  /** 标题颜色 */
  titleColor?: string
  /** 正文颜色 */
  textColor?: string
}

export interface FloatingModalQR {
  /** 二维码图片 URL */
  src: string
  /** 图片 alt 文案 */
  alt?: string
}

export interface FloatingModalOptions {
  /** 弹窗标题 */
  title?: string
  /** 正文（纯文本，自动转义，支持 \n 换行） */
  content?: string
  /** 正文原始 HTML（自行确保安全） */
  contentHtml?: string
  /** 赞赏码/二维码图片（可选，不传不显示二维码区） */
  qr?: FloatingModalQR
  /** 卡片宽度（px），默认 380 */
  width?: number
  /** 点遮罩关闭，默认 true */
  maskClosable?: boolean
  /** 按 Esc 关闭，默认 true */
  closeOnEsc?: boolean
  /** 显示右上角关闭按钮，默认 true */
  showClose?: boolean
  /** 展示频率，默认 7（关闭后 7 天不再打扰） */
  frequency?: ModalFrequency
  /** 延迟展示毫秒数，默认 0 */
  delay?: number
  /** 弹窗 z-index，默认 10000 */
  zIndex?: number
  /** 主题（映射为 CSS 变量，也可直接覆盖 --fm-* 变量） */
  theme?: FloatingModalTheme
  /** 关闭后回调 */
  onClose?: () => void
}

interface ResolvedOptions {
  title: string
  content: string
  contentHtml: string
  qr: Required<FloatingModalQR>
  width: number
  maskClosable: boolean
  closeOnEsc: boolean
  showClose: boolean
  frequency: ModalFrequency
  delay: number
  zIndex: number
  theme: Required<FloatingModalTheme>
  onClose?: () => void
}

const DEFAULT_CONTENT =
  '服务器、域名、电费都是自己掏的，内容永远免费。\n赞助完全自愿，觉得有用就支持一下，让它再扛 365 天。'

const DEFAULT_QR = {
  src: 'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png',
  alt: '赞赏码'
}

const DEFAULT_THEME: Required<FloatingModalTheme> = {
  bg: '#fff',
  accent: '#185fa5',
  radius: '16px',
  border: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  titleColor: '#1f1f1f',
  textColor: '#555'
}

const STORAGE_KEY = 'floating-modal'
const DAY = 24 * 60 * 60 * 1000

interface StorageState {
  lastShown?: number
  closedAt?: number
}

function readState(): StorageState {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StorageState) : {}
  } catch {
    return {}
  }
}

function writeState(state: StorageState): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore quota / privacy mode */
  }
}

function isSameDay(a: number, b: number): boolean {
  const da = new Date(a)
  const db = new Date(b)
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  )
}

/**
 * A minimal centered modal popup for sponsor QR, notices and announcements.
 * Zero dependencies. Framework-agnostic. Styleable via --fm-* CSS variables.
 */
export class FloatingModal {
  private readonly opts: ResolvedOptions
  private mask: HTMLElement | null = null
  private closeBtn: HTMLButtonElement | null = null
  private timer: ReturnType<typeof setTimeout> | null = null
  private escHandler: ((e: KeyboardEvent) => void) | null = null
  private shownAt = 0

  constructor(options: FloatingModalOptions = {}) {
    this.opts = this.resolve(options)
    if (!this.shouldShow()) return

    const show = () => {
      this.shownAt = Date.now()
      this.render()
    }
    if (this.opts.delay > 0) {
      this.timer = setTimeout(show, this.opts.delay)
    } else {
      show()
    }
  }

  /** 是否正在展示 */
  isOpen(): boolean {
    return this.mask !== null && this.mask.isConnected
  }

  /** 展示（手动调用时无视频率限制） */
  show(): void {
    if (this.isOpen()) return
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.shownAt = Date.now()
    this.render()
  }

  /** 关闭并销毁（记录关闭时间，用于 frequency 频率控制） */
  close(): void {
    if (this.opts.frequency !== 'always') {
      writeState({ ...readState(), closedAt: Date.now() })
    }
    this.destroy()
    this.opts.onClose?.()
  }

  /** 从页面移除并解绑 */
  destroy(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    if (this.escHandler) {
      document.removeEventListener('keydown', this.escHandler)
      this.escHandler = null
    }
    this.closeBtn?.removeEventListener('click', this.handleClose)
    this.closeBtn = null
    this.mask?.remove()
    this.mask = null
  }

  private resolve(options: FloatingModalOptions): ResolvedOptions {
    const qr = options.qr ?? DEFAULT_QR
    return {
      title: options.title ?? '小水管请求支援',
      content: options.content ?? DEFAULT_CONTENT,
      contentHtml: options.contentHtml ?? '',
      qr: { src: qr.src, alt: qr.alt ?? '赞赏码' },
      width: options.width ?? 380,
      maskClosable: options.maskClosable ?? true,
      closeOnEsc: options.closeOnEsc ?? true,
      showClose: options.showClose ?? true,
      frequency: options.frequency ?? 7,
      delay: options.delay ?? 0,
      zIndex: options.zIndex ?? 10000,
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) },
      onClose: options.onClose
    }
  }

  private shouldShow(): boolean {
    const state = readState()
    const now = Date.now()
    const freq = this.opts.frequency

    if (freq === 'always') return true
    if (freq === 'daily') {
      return !(state.lastShown && isSameDay(state.lastShown, now))
    }
    // number: 关闭后 N 天不再打扰
    if (typeof freq === 'number' && state.closedAt) {
      return now - state.closedAt >= freq * DAY
    }
    return true
  }

  private render(): void {
    const { width, zIndex, theme, showClose, maskClosable } = this.opts

    const mask = document.createElement('div')
    mask.className = 'fm-mask'
    mask.style.zIndex = String(zIndex)
    mask.style.setProperty('--fm-overlay', theme.overlay)
    mask.style.setProperty('--fm-bg', theme.bg)
    mask.style.setProperty('--fm-accent', theme.accent)
    mask.style.setProperty('--fm-radius', theme.radius)
    mask.style.setProperty('--fm-border', theme.border)
    mask.style.setProperty('--fm-title-color', theme.titleColor)
    mask.style.setProperty('--fm-text-color', theme.textColor)
    mask.style.setProperty('--fm-width', `${width}px`)

    if (maskClosable) {
      mask.addEventListener('click', this.handleMaskClick)
    }

    mask.innerHTML = `
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${escapeAttr(this.opts.title)}">
        ${showClose ? `<button class="fm-close" type="button" aria-label="关闭弹窗">${CLOSE_SVG}</button>` : ''}
        <p class="fm-title">${escapeHtml(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
        ${this.buildHint()}
      </div>
    `

    this.closeBtn = mask.querySelector<HTMLButtonElement>('.fm-close')
    this.closeBtn?.addEventListener('click', this.handleClose)

    document.body.appendChild(mask)
    this.mask = mask

    if (this.opts.closeOnEsc) {
      this.escHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this.close()
      }
      document.addEventListener('keydown', this.escHandler)
    }

    writeState({ ...readState(), lastShown: this.shownAt })
  }

  private buildContent(): string {
    if (this.opts.contentHtml) return this.opts.contentHtml
    return escapeHtml(this.opts.content).replace(/\n/g, '<br>')
  }

  private buildQR(): string {
    const { qr } = this.opts
    return `
      <div class="fm-qr">
        <img class="fm-qr-img" src="${escapeAttr(qr.src)}" alt="${escapeAttr(qr.alt)}" loading="lazy" />
      </div>
    `
  }

  private buildHint(): string {
    const freq = this.opts.frequency
    if (freq === 'always') return ''
    if (freq === 'daily') return '<p class="fm-hint">每天最多提醒一次</p>'
    return `<p class="fm-hint">关闭后 ${freq} 天内不再打扰</p>`
  }

  private readonly handleClose = (): void => {
    this.close()
  }

  private readonly handleMaskClick = (e: MouseEvent): void => {
    if (e.target === this.mask) this.close()
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

/**
 * 自愿支持弹窗（静态化版，原「强制看广告解锁」组件）
 *
 * 场景：网页在合适的位置弹出小程序激励页二维码，用户**自愿**扫码看视频支持；
 * 想看就看、想关随时关，组件不校验、不轮询、不上报 —— 完全静态。
 *
 * 与旧版的区别：
 *   - 不再调 wx-auth 的 create/status/verify 接口，没有 ticket / grant 票据链路
 *   - 二维码是写死的固定图片（小程序激励页 pages/reward-unlock/index 的
 *     release 版码，无 scene 参数），由 scripts/generate-qr.mjs 一次性生成
 *   - 弹窗可关闭（右上角 ×、点遮罩、Esc 均可），不再强制看完
 *
 * 用法：
 *   const unlock = new FloatingUnlock()
 *   unlock.show()   // 打开弹窗
 *
 * 兼容：unlock() 仍可用（旧业务调用点无需改动），但只负责打开弹窗并立即
 * resolve { ok: true } —— 不再阻塞业务，等待/验票语义已随静态化移除。
 *
 * 零依赖、框架无关、运行时零请求（二维码图片走图床 CDN），样式通过 --fu-* CSS 变量定制。
 */

export type FloatingUnlockStatus = 'idle' | 'open'

/**
 * 旧版解锁结果，仅作兼容保留。
 * 静态化后组件不再产生票据：ticket / grant 恒为 null，ok 恒为 true。
 */
export interface FloatingUnlockResult {
  ok: boolean
  ticket: string | null
  grant: string | null
}

export interface FloatingUnlockTheme {
  /** 卡片背景色 */
  bg?: string
  /** 强调色（标题、关闭按钮悬停等） */
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

export interface FloatingUnlockOptions {
  /** 二维码图片地址，默认内置固定小程序激励页码（图床 CDN） */
  qrSrc?: string
  /** 弹窗标题，默认「帮帮小水管服务器吧」 */
  title?: string
  /** 正文（纯文本，自动转义，支持 \n 换行），默认内置文案 */
  content?: string
  /** 正文原始 HTML（自行确保安全），优先于 content */
  contentHtml?: string
  /** 卡片宽度（px），默认 380 */
  width?: number
  /** 弹窗 z-index，默认 10000 */
  zIndex?: number
  /** 主题（映射为 CSS 变量，也可直接覆盖 --fu-* 变量） */
  theme?: FloatingUnlockTheme
}

interface ResolvedOptions {
  qrSrc: string
  title: string
  content: string
  contentHtml: string
  width: number
  zIndex: number
  theme: Required<FloatingUnlockTheme>
}

const DEFAULT_QR_SRC =
  'https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/reward-unlock-qr.jpg'
const DEFAULT_TITLE = '帮帮小水管服务器吧'
const DEFAULT_CONTENT = '服务器成本不小，如果觉得好用，微信扫码看个视频支持一下吧。'
const DEFAULT_HINT = '微信扫码，在小程序内观看视频（自愿支持，随时可关闭）'
const BTN_DISMISS = '下次一定'
const BTN_SUPPORT = '看完啦，支持作者'

const DEFAULT_THEME: Required<FloatingUnlockTheme> = {
  bg: '#fff',
  accent: '#185fa5',
  radius: '16px',
  border: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  titleColor: '#1f1f1f',
  textColor: '#555'
}

export class FloatingUnlock {
  private readonly opts: ResolvedOptions
  private readonly container: HTMLElement | ShadowRoot
  private mask: HTMLElement | null = null
  private status: FloatingUnlockStatus = 'idle'
  private escHandler: ((e: KeyboardEvent) => void) | null = null
  private destroyed = false

  constructor(
    options: FloatingUnlockOptions = {},
    container: HTMLElement | ShadowRoot = document.body
  ) {
    this.opts = this.resolve(options)
    this.container = container
  }

  /** 当前状态 */
  getState(): FloatingUnlockStatus {
    return this.status
  }

  /** 是否正在展示 */
  isOpen(): boolean {
    return this.mask !== null && this.mask.isConnected
  }

  /**
   * 兼容旧版调用点：打开弹窗并立即返回成功（不再阻塞业务、不再产生票据）。
   * 新代码请直接用 show()。
   */
  unlock(): Promise<FloatingUnlockResult> {
    this.show()
    return Promise.resolve({ ok: true, ticket: null, grant: null })
  }

  /** 打开弹窗（重复调用幂等） */
  show(): void {
    if (this.destroyed || this.isOpen()) return
    this.render()
    this.status = 'open'
  }

  /** 关闭弹窗（可随时再 show() 打开） */
  close(): void {
    this.teardown()
  }

  /** 从页面移除并解绑，之后不可再 show() */
  destroy(): void {
    this.destroyed = true
    this.teardown()
  }

  // ==================== 内部实现 ====================

  private resolve(options: FloatingUnlockOptions): ResolvedOptions {
    return {
      qrSrc: options.qrSrc ?? DEFAULT_QR_SRC,
      title: options.title ?? DEFAULT_TITLE,
      content: options.content ?? DEFAULT_CONTENT,
      contentHtml: options.contentHtml ?? '',
      width: options.width ?? 380,
      zIndex: options.zIndex ?? 10000,
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) }
    }
  }

  private render(): void {
    const { width, zIndex, theme } = this.opts

    const mask = document.createElement('div')
    mask.className = 'fu-mask'
    mask.style.zIndex = String(zIndex)
    mask.style.setProperty('--fu-overlay', theme.overlay)
    mask.style.setProperty('--fu-bg', theme.bg)
    mask.style.setProperty('--fu-accent', theme.accent)
    mask.style.setProperty('--fu-radius', theme.radius)
    mask.style.setProperty('--fu-border', theme.border)
    mask.style.setProperty('--fu-title-color', theme.titleColor)
    mask.style.setProperty('--fu-text-color', theme.textColor)
    mask.style.setProperty('--fu-width', `${width}px`)

    mask.innerHTML = `
      <div class="fu-modal" role="dialog" aria-modal="true" aria-label="${escapeAttr(this.opts.title)}">
        <button class="fu-close" type="button" aria-label="关闭">×</button>
        <p class="fu-title">${escapeHtml(this.opts.title)}</p>
        <div class="fu-content">${this.buildContent()}</div>
        <div class="fu-qr"><img class="fu-qr-img" alt="支持二维码" src="${escapeAttr(this.opts.qrSrc)}" /></div>
        <div class="fu-hint">${escapeHtml(DEFAULT_HINT)}</div>
        <div class="fu-actions">
          <button class="fu-btn fu-btn-ghost" type="button">${escapeHtml(BTN_DISMISS)}</button>
          <button class="fu-btn fu-btn-primary" type="button">${escapeHtml(BTN_SUPPORT)}</button>
        </div>
      </div>
    `

    // 自愿观看：关闭按钮 / 底部两按钮 / 遮罩 / Esc 均可关闭（两按钮无差别，仅关闭）
    mask.querySelector('.fu-close')?.addEventListener('click', () => this.close())
    mask.querySelector('.fu-btn-ghost')?.addEventListener('click', () => this.close())
    mask.querySelector('.fu-btn-primary')?.addEventListener('click', () => this.close())
    mask.addEventListener('click', (e) => {
      if (e.target === mask) this.close()
    })
    this.escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.close()
    }
    document.addEventListener('keydown', this.escHandler)

    this.container.appendChild(mask)
    this.mask = mask
    lockBodyScroll()
  }

  private teardown(): void {
    if (this.escHandler) {
      document.removeEventListener('keydown', this.escHandler)
      this.escHandler = null
    }
    this.mask?.remove()
    this.mask = null
    this.status = 'idle'
    unlockBodyScroll()
  }

  private buildContent(): string {
    if (this.opts.contentHtml) return this.opts.contentHtml
    return escapeHtml(this.opts.content).replace(/\n/g, '<br>')
  }
}

// ==================== 背景滚动锁定（支持多实例叠加） ====================
// 弹窗打开时把 body 固定住，防止背景继续滚动；关闭时恢复并滚回原位。
// 引用计数：多个弹窗实例叠加时，只有最后一个关闭才真正恢复滚动。

let scrollLockCount = 0
interface ScrollLockState {
  top: string
  left: string
  width: string
  position: string
  scrollY: number
}
let scrollLockState: ScrollLockState | null = null

function lockBodyScroll(): void {
  scrollLockCount += 1
  if (scrollLockState) return // 已被本模块锁定，仅计数
  const body = document.body
  const st = body.style
  scrollLockState = {
    top: st.top,
    left: st.left,
    width: st.width,
    position: st.position,
    scrollY: window.scrollY
  }
  // position: fixed + 反向偏移，避免锁定瞬间页面跳动，且能保留原滚动位置
  st.top = `-${scrollLockState.scrollY}px`
  st.left = '0'
  st.width = '100%'
  st.position = 'fixed'
}

function unlockBodyScroll(): void {
  if (scrollLockCount <= 0) return
  scrollLockCount -= 1
  if (scrollLockCount > 0 || !scrollLockState) return
  const body = document.body
  const st = body.style
  const state = scrollLockState
  scrollLockState = null
  st.top = state.top
  st.left = state.left
  st.width = state.width
  st.position = state.position
  // 样式恢复后浏览器才会真正滚回原位，放到下一帧执行
  if (state.scrollY > 0) {
    requestAnimationFrame(() => window.scrollTo(0, state.scrollY))
  }
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

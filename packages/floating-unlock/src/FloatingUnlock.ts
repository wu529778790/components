/**
 * 通用解锁弹窗（激励视频广告解锁）
 *
 * 场景：网页端在需要解锁的动作处（如「继续搜索」）弹出小程序码，用户扫码进小程序
 * 看完激励视频后，网页轮询到 unlocked 放行业务。
 *
 * 后端链路（wx-auth 项目，已上线）：
 *   1. POST /api/auth/mp-reward/create   → { ticket, qrDataUrl, expiresIn }（5 分钟有效）
 *   2. 用户微信扫码 → 小程序激励页看完整视频 → POST /api/auth/mp-reward/report
 *   3. GET  /api/auth/mp-reward/status?ticket=xxx → waiting | unlocked | expired
 *
 * 用法：
 *   const unlock = new FloatingUnlock({ apiBase: 'https://wx-auth.shenzjd.com', siteId: 'xxx' })
 *   const ok = await unlock.unlock()   // true=解锁成功，false=失败/过期
 *   if (ok) { /* 继续业务 *\/ }
 *
 * 强制不可关：解锁前无关闭按钮、点遮罩/Esc 均无效，看完广告才能继续。
 * 零依赖、框架无关，样式通过 --fu-* CSS 变量定制。
 */

export type FloatingUnlockStatus =
  | 'idle' // 未开始
  | 'loading' // 出码中
  | 'waiting' // 展示二维码，等待扫码/看视频
  | 'unlocked' // 解锁成功
  | 'expired' // 二维码过期

export interface FloatingUnlockTheme {
  /** 卡片背景色 */
  bg?: string
  /** 强调色（标题、主按钮、成功态） */
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
  /** 后端 API 地址，默认 https://wx-auth.shenzjd.com */
  apiBase?: string
  /** 站点标识（小程序端展示"为哪个站点解锁" + 广告分桶统计） */
  siteId?: string
  /** 弹窗标题，默认「帮帮小水管服务器吧」 */
  title?: string
  /** 正文（纯文本，自动转义，支持 \n 换行），默认内置卖惨话术 */
  content?: string
  /** 正文原始 HTML（自行确保安全），优先于 content */
  contentHtml?: string
  /** 卡片宽度（px），默认 380 */
  width?: number
  /** 弹窗 z-index，默认 10000 */
  zIndex?: number
  /** 主题（映射为 CSS 变量，也可直接覆盖 --fu-* 变量） */
  theme?: FloatingUnlockTheme
  /** 解锁成功回调（resolve 之外的通知） */
  onUnlocked?: (result: { ticket: string; siteId?: string }) => void
  /** 解锁失败/过期回调 */
  onError?: (error: { code: string; message: string }) => void
}

interface ResolvedOptions {
  apiBase: string
  siteId: string
  title: string
  content: string
  contentHtml: string
  width: number
  zIndex: number
  theme: Required<FloatingUnlockTheme>
  onUnlocked?: (result: { ticket: string; siteId?: string }) => void
  onError?: (error: { code: string; message: string }) => void
}

const DEFAULT_TITLE = '帮帮小水管服务器吧'
const DEFAULT_CONTENT =
  '服务器又快扛不住了，看个广告帮服务器续个命吧。\n\n扫码进小程序看完视频，本页立刻自动放行，感谢理解！'

const DEFAULT_THEME: Required<FloatingUnlockTheme> = {
  bg: '#fff',
  accent: '#185fa5',
  radius: '16px',
  border: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  titleColor: '#1f1f1f',
  textColor: '#555'
}

/** 首次轮询前的静默期：用户需要扫码→打开小程序→看完广告→上报，此时间内轮询纯属空转 */
const MIN_POLL_DELAY_MS = 15 * 1000
/** 轮询间隔 */
const POLL_INTERVAL_MS = 2000

export class FloatingUnlock {
  private readonly opts: ResolvedOptions
  private readonly container: HTMLElement | ShadowRoot
  private mask: HTMLElement | null = null
  private ticket = ''
  private qrDataUrl = ''
  private expiresAt = 0
  private status: FloatingUnlockStatus = 'idle'
  private unlockPromise: Promise<boolean> | null = null
  private resolveUnlock: ((value: boolean) => void) | null = null
  private pollTimer: ReturnType<typeof setInterval> | null = null
  private delayTimer: ReturnType<typeof setTimeout> | null = null
  private countdownTimer: ReturnType<typeof setInterval> | null = null
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
   * 发起解锁。返回 Promise：
   *   resolve(true)  → 解锁成功，业务可继续
   *   resolve(false) → 失败/过期/出码失败，业务应中断
   */
  unlock(): Promise<boolean> {
    if (this.unlockPromise) return this.unlockPromise
    this.unlockPromise = new Promise<boolean>((resolve) => {
      this.resolveUnlock = resolve
      this.start()
    })
    return this.unlockPromise
  }

  /** 关闭并销毁（解锁成功后由内部调用；外部一般无需调用） */
  close(): void {
    this.destroy()
  }

  /** 从页面移除并解绑 */
  destroy(): void {
    this.destroyed = true
    this.stopPolling()
    this.stopCountdown()
    this.mask?.remove()
    this.mask = null
    this.unlockPromise = null
    this.resolveUnlock = null
    unlockBodyScroll()
  }

  // ==================== 内部实现 ====================

  private resolve(options: FloatingUnlockOptions): ResolvedOptions {
    return {
      apiBase: (options.apiBase ?? 'https://wx-auth.shenzjd.com').replace(/\/+$/, ''),
      siteId: options.siteId ?? '',
      title: options.title ?? DEFAULT_TITLE,
      content: options.content ?? DEFAULT_CONTENT,
      contentHtml: options.contentHtml ?? '',
      width: options.width ?? 380,
      zIndex: options.zIndex ?? 10000,
      theme: { ...DEFAULT_THEME, ...(options.theme ?? {}) },
      onUnlocked: options.onUnlocked,
      onError: options.onError
    }
  }

  private start(): void {
    this.render()
    this.setStatus('loading')
    void this.createTicket()
  }

  private async createTicket(): Promise<void> {
    try {
      const res = await fetch(`${this.opts.apiBase}/api/auth/mp-reward/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: this.opts.siteId || undefined })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (!data.ticket || !data.qrDataUrl) throw new Error('create 响应缺少 ticket/qrDataUrl')

      this.ticket = String(data.ticket)
      this.qrDataUrl = String(data.qrDataUrl)
      this.expiresAt = Date.now() + (Number(data.expiresIn) || 300) * 1000

      this.setStatus('waiting')
      this.showQr()
      this.startCountdown()
      // 前 15s 只跑本地倒计时（留给用户扫码→进小程序→看广告），之后才开始轮询
      this.delayTimer = setTimeout(() => this.startPolling(), MIN_POLL_DELAY_MS)
    } catch (error) {
      this.fail('create_failed', error instanceof Error ? error.message : '出码失败，请重试')
    }
  }

  private startPolling(): void {
    if (this.destroyed || this.status !== 'waiting') return
    this.stopPolling()
    this.pollTimer = setInterval(() => void this.poll(), POLL_INTERVAL_MS)
  }

  private async poll(): Promise<void> {
    if (this.destroyed || this.status !== 'waiting' || !this.ticket) return
    // 本地已过期即停（服务端 expired 同口径）
    if (Date.now() >= this.expiresAt) {
      this.setStatus('expired')
      this.stopPolling()
      this.stopCountdown()
      return
    }
    try {
      const res = await fetch(
        `${this.opts.apiBase}/api/auth/mp-reward/status?ticket=${encodeURIComponent(this.ticket)}`
      )
      if (!res.ok) {
        // 429/5xx 等瞬时错误：保持轮询，不把服务抖动当作过期
        if (res.status >= 500 || res.status === 429) return
        throw new Error(`HTTP ${res.status}`)
      }
      const data = await res.json()
      if (data.status === 'unlocked') {
        this.succeed()
      } else if (data.status === 'expired') {
        this.setStatus('expired')
        this.stopPolling()
        this.stopCountdown()
      }
      // waiting → 下一轮
    } catch {
      // 网络抖动：保持轮询
    }
  }

  private succeed(): void {
    this.stopPolling()
    this.stopCountdown()
    this.setStatus('unlocked')
    this.opts.onUnlocked?.({ ticket: this.ticket, siteId: this.opts.siteId })
    // 短暂展示成功态后自动关闭
    setTimeout(() => {
      if (this.destroyed) return
      this.resolveUnlock?.(true)
      this.resolveUnlock = null
      this.destroy()
    }, 600)
  }

  private fail(code: string, message: string): void {
    this.stopPolling()
    this.stopCountdown()
    this.opts.onError?.({ code, message })
    this.resolveUnlock?.(false)
    this.resolveUnlock = null
    this.destroy()
  }

  private setStatus(status: FloatingUnlockStatus): void {
    this.status = status
    this.updateStatusUI()
  }

  private stopPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer)
      this.pollTimer = null
    }
    if (this.delayTimer) {
      clearTimeout(this.delayTimer)
      this.delayTimer = null
    }
  }

  private stopCountdown(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
      this.countdownTimer = null
    }
  }

  private startCountdown(): void {
    this.stopCountdown()
    const tick = () => {
      if (this.destroyed) return
      const remain = Math.max(0, Math.ceil((this.expiresAt - Date.now()) / 1000))
      const el = this.mask?.querySelector<HTMLElement>('.fu-countdown')
      if (el) el.textContent = `二维码 ${remain}s 后过期`
      if (remain <= 0) this.stopCountdown()
    }
    tick() // 立即先更新一次，避免空档
    this.countdownTimer = setInterval(tick, 1000)
  }

  private showQr(): void {
    const img = this.mask?.querySelector<HTMLImageElement>('.fu-qr-img')
    const loading = this.mask?.querySelector<HTMLElement>('.fu-loading')
    if (img) {
      img.src = this.qrDataUrl
      img.style.display = 'block'
    }
    if (loading) loading.style.display = 'none'
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

    // 强制解锁：遮罩点击不关闭（无关闭按钮、Esc 无效）
    mask.innerHTML = `
      <div class="fu-modal" role="dialog" aria-modal="true" aria-label="${escapeAttr(this.opts.title)}">
        <p class="fu-title">${escapeHtml(this.opts.title)}</p>
        <div class="fu-content">${this.buildContent()}</div>
        <div class="fu-qr">
          <div class="fu-loading"><span class="fu-spinner"></span></div>
          <img class="fu-qr-img" alt="解锁二维码" style="display:none" />
        </div>
        <div class="fu-status">
          <span class="fu-countdown"></span>
          <span class="fu-hint">微信扫码，在小程序内观看视频即可解锁</span>
        </div>
        <div class="fu-expired" style="display:none">
          <div class="fu-expired-text">二维码已过期</div>
          <button class="fu-btn" type="button">刷新二维码</button>
        </div>
      </div>
    `

    const refreshBtn = mask.querySelector<HTMLButtonElement>('.fu-btn')
    refreshBtn?.addEventListener('click', () => this.refresh())

    this.container.appendChild(mask)
    this.mask = mask
    lockBodyScroll()
  }

  private refresh(): void {
    if (!this.mask) return
    const expired = this.mask.querySelector<HTMLElement>('.fu-expired')
    const img = this.mask.querySelector<HTMLImageElement>('.fu-qr-img')
    const loading = this.mask.querySelector<HTMLElement>('.fu-loading')
    if (expired) expired.style.display = 'none'
    if (img) img.style.display = 'none'
    if (loading) loading.style.display = 'flex'
    this.setStatus('loading')
    void this.createTicket()
  }

  private buildContent(): string {
    if (this.opts.contentHtml) return this.opts.contentHtml
    return escapeHtml(this.opts.content).replace(/\n/g, '<br>')
  }

  private updateStatusUI(): void {
    if (!this.mask) return
    const expired = this.mask.querySelector<HTMLElement>('.fu-expired')
    const countdown = this.mask.querySelector<HTMLElement>('.fu-countdown')
    const hint = this.mask.querySelector<HTMLElement>('.fu-hint')
    const img = this.mask.querySelector<HTMLImageElement>('.fu-qr-img')
    const loading = this.mask.querySelector<HTMLElement>('.fu-loading')

    if (this.status === 'unlocked') {
      if (expired) expired.style.display = 'none'
      if (countdown) countdown.textContent = ''
      if (hint) {
        hint.textContent = '✅ 解锁成功，即将继续…'
        hint.style.color = 'var(--fu-accent)'
      }
    } else if (this.status === 'waiting') {
      if (expired) expired.style.display = 'none'
      if (countdown) countdown.textContent = ''
      if (hint) {
        hint.textContent = '微信扫码，在小程序内观看视频即可解锁'
        hint.style.color = ''
      }
      if (loading) loading.style.display = 'none'
    } else if (this.status === 'expired') {
      if (expired) expired.style.display = 'flex'
      if (countdown) countdown.textContent = ''
      if (hint) hint.textContent = ''
      if (img) img.style.display = 'none'
      if (loading) loading.style.display = 'none'
    } else if (this.status === 'loading') {
      if (expired) expired.style.display = 'none'
      if (countdown) countdown.textContent = ''
      if (hint) {
        hint.textContent = '正在生成二维码…'
        hint.style.color = ''
      }
      if (img) img.style.display = 'none'
      if (loading) loading.style.display = 'flex'
    }
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
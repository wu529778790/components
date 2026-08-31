/**
 * wx-auth-sdk 自举模块：让 site-navbar 做到「只引入一条 JS 全自动工作」。
 *
 * 使用方无需再手动引入 wx-auth.umd.js、也无需自己写 WxAuth.init()——
 * 本模块在组件内部闭环处理：
 *   1. 若 window.WxAuth 尚不存在，动态注入 wx-auth.umd.js（默认 unpkg @latest）
 *   2. 轮询等待 window.WxAuth 就绪（每 100ms，默认 10s 超时）
 *   3. 就绪后自动调用 WxAuth.init({ silent: true, required: false }) 静默校验登录态
 *   4. 加载失败 / 超时 → 静默降级（仅 console.warn，绝不抛错、绝不阻塞页面）
 *
 * 全页共享一次加载：多实例导航栏 / 多次调用不会重复注入脚本或重复 init。
 *
 * 与使用方已有 init 的兼容性：
 * - 若使用方已自行引入 SDK（window.WxAuth 已存在），本模块**不重复 init**，
 *   只确保 SDK 存在即可——避免与使用方自己的初始化冲突（SDK 文档建议只 init 一次）。
 * - 仅当 SDK 是本模块自己注入的（使用方未引入）时，才由本模块主动 init。
 */

/** 全局 window.WxAuth（CDN 引入 wx-auth-sdk 后存在） */
export interface WxAuthGlobal {
  WxAuth?: {
    /** 初始化（silent 模式下仅静默校验，不弹窗） */
    init?(options?: Record<string, unknown>): void
    /** 校验本地凭证，无效时弹出扫码/验证码登录弹窗，返回是否认证成功 */
    requireAuth?(): Promise<boolean>
  }
}

/** 自举配置（可通过全局配置 / 属性覆盖，默认零配置即可用） */
export interface WxAuthBootstrapOptions {
  /** SDK 脚本地址（缺省 unpkg @latest） */
  src?: string
  /** 是否自动加载并初始化 SDK，默认 true */
  enabled?: boolean
  /** 传给 WxAuth.init 的选项，默认 { silent: true, required: false } */
  initOptions?: Record<string, unknown>
  /** 轮询间隔（ms），默认 100 */
  pollInterval?: number
  /** 就绪等待超时（ms），默认 10000 */
  timeout?: number
  /** SDK 就绪并 init 完成后的回调 */
  onReady?: (sdk: NonNullable<WxAuthGlobal['WxAuth']>) => void
  /** 加载失败 / 超时后的回调 */
  onError?: (reason: string) => void
}

/** 默认 SDK 地址（unpkg @latest，与头像组件保持一致） */
const DEFAULT_SDK_SRC = 'https://unpkg.com/wx-auth-sdk@latest/dist/wx-auth.umd.js'

/** 全局共享的启动 Promise：全页只自举一次 */
let bootstrapPromise: Promise<boolean> | null = null

/** 是否已由本组件调用过 init（避免重复 init） */
let initialized = false

function getWindowSdk(): WxAuthGlobal['WxAuth'] | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as WxAuthGlobal).WxAuth
}

/**
 * 确保 wx-auth-sdk 已加载并初始化。
 * 返回是否成功（失败仅降级，不抛错）。
 *
 * 安全策略（避免与使用方自己的 init 冲突）：
 * - 若使用方已自行引入 SDK（window.WxAuth 已存在），我们**不重复 init**——
 *   使用方大概率已自己 init，重复调用可能非幂等（SDK 文档建议只 init 一次）。
 *   我们只确保 SDK 存在即可，绝不阻塞、绝不覆盖使用方的初始化。
 * - 仅当 SDK 是我们自己注入的（使用方未引入）时，才由我们主动 init。
 */
export function ensureWxAuth(options: WxAuthBootstrapOptions = {}): Promise<boolean> {
  const {
    src = DEFAULT_SDK_SRC,
    enabled = true,
    initOptions = { silent: true, required: false },
    pollInterval = 100,
    timeout = 10000,
    onReady,
    onError
  } = options

  // 显式禁用：直接返回失败（不注入、不 init）
  if (!enabled) return Promise.resolve(false)

  // 使用方已自行引入 SDK：不重复 init，直接视为就绪
  const existing = getWindowSdk()
  if (existing) {
    onReady?.(existing)
    return Promise.resolve(true)
  }

  // 全局共享一次自举：避免多实例重复注入脚本 / 重复轮询
  if (!bootstrapPromise) {
    bootstrapPromise = new Promise<boolean>((resolve) => {
      injectSdkScript(src)
      const started = Date.now()
      const timer = setInterval(() => {
        const sdk = getWindowSdk()
        if (sdk) {
          clearInterval(timer)
          // 仅当我们自己注入的 SDK 就绪时才 init（使用方未引入，必然需要 init）
          if (!initialized && typeof sdk.init === 'function') {
            try {
              sdk.init(initOptions)
              initialized = true
            } catch (e) {
              console.warn('[site-navbar] WxAuth.init 调用失败', e)
            }
          }
          onReady?.(sdk)
          resolve(true)
        } else if (Date.now() - started > timeout) {
          clearInterval(timer)
          const reason = `wx-auth-sdk 加载超时（${timeout}ms）`
          console.warn(`[site-navbar] ${reason}，头像登录功能不可用，导航栏照常渲染`)
          onError?.(reason)
          resolve(false)
        }
      }, pollInterval)
    })
  }
  return bootstrapPromise
}

/** 动态注入 SDK 脚本（幂等：已存在则跳过） */
function injectSdkScript(src: string): void {
  if (typeof document === 'undefined') return
  // 已注入过同地址脚本则跳过
  const existing = Array.from(document.querySelectorAll<HTMLScriptElement>('script[data-wx-auth-sdk]'))
  if (existing.some((s) => s.src === src)) return
  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.setAttribute('data-wx-auth-sdk', '')
  script.onerror = () => {
    console.warn(`[site-navbar] wx-auth-sdk 加载失败：${src}，头像功能不可用，导航栏照常渲染`)
  }
  ;(document.head || document.documentElement).appendChild(script)
}
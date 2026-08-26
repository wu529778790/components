/**
 * wx-auth-sdk（微信订阅号认证 SDK）对外开放的最小接口。
 *
 * 组件不强依赖 wx-auth-sdk 包本身，凡是具备下面这些方法/回调的对象
 * 都能作为 sdk 传入（如 CDN 方式 window.WxAuth）。
 */
export interface WxAuthApi {
  /** 校验本地凭证，无效时弹出扫码/验证码登录弹窗，返回是否认证成功 */
  requireAuth(): Promise<boolean>
  /** 清空本地登录凭证（Cookie + localStorage 双删） */
  clearToken(): void
  /** 初始化（silent 模式下仅静默校验，不弹窗） */
  init?(options?: Record<string, unknown>): void
}

/** 全局 window.WxAuth（CDN 引入 wx-auth-sdk 后存在） */
export interface WxAuthGlobal {
  WxAuth?: WxAuthApi
}

export function getWindowSdk(): WxAuthApi | undefined {
  if (typeof window !== 'undefined') {
    return (window as unknown as WxAuthGlobal).WxAuth
  }
  return undefined
}
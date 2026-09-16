/**
 * wx-auth 积分账本客户端（2026-09-17 接入）
 *
 * 背景：wx-auth 的积分账本已上线，全站通用一份余额（登录 → 签到 / 看广告赚分 →
 * 业务动作扣分）。本组件在「设置」弹窗里展示余额，并提供两条赚分路径：
 *
 *   1. 读余额   GET  /api/points/balance?token=...      → { balance, checkedIn, adReward, checkinReward, ... }
 *   2. 每日签到 POST /api/points/checkin  body { token } → { ok, granted, balance }
 *   3. 看广告   不调接口：码是固定的小程序码，加分在小程序侧完成，
 *              网页只等十几秒后**重新读余额**核对到账（见 UserAvatar 的 earn 流程）
 *
 * 为什么没有「扣分」：POST /api/points/spend 必须由**子站服务端**调用（额度判断在服务端
 * 收口，浏览器直调等于把记账权交给客户端）。本模块只负责展示与赚分，不参与计费。
 *
 * 凭证：与 userinfo 同一份 wxauth-token（cookie 里读），走 query token / body token
 * 两条通道——跨站调用由 wx-auth 的 CORS 中间件反射 Origin 放行，与 userinfo 一致。
 *
 * 全部静默：任何失败都只回 null / 错误文案，由调用方决定怎么显示，绝不 throw。
 */
import type { WxPointsInfo } from './types'

/**
 * 积分端点超时。wx-auth 侧一次 balance 内部要串行查几次远程库（实测 1.5s 起步），
 * 再加上公网域名绕行，预算给宽一点；超时按失败处理（不阻塞弹窗其余功能）。
 */
const TIMEOUT_MS = 8_000

function num(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function endpoint(base: string, path: string): string {
  const b = (base || '').trim().replace(/\/+$/, '')
  return `${b || window.location.origin}${path}`
}

interface RawCall<T> {
  ok: boolean
  status: number
  data: T | null
}

async function call<T>(url: string, init: RequestInit): Promise<RawCall<T>> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { ...init, signal: controller.signal })
    const data = (await res.json().catch(() => null)) as T | null
    return { ok: res.ok, status: res.status, data }
  } catch {
    return { ok: false, status: 0, data: null }
  } finally {
    clearTimeout(timer)
  }
}

/** 读余额；失败（未登录 / 服务不可用 / 超时）返回 null */
export async function fetchPoints(base: string, token: string): Promise<WxPointsInfo | null> {
  const r = await call<Partial<WxPointsInfo> & { error?: string }>(
    endpoint(base, `/api/points/balance?token=${encodeURIComponent(token)}`),
    { method: 'GET', headers: { accept: 'application/json' } }
  )
  if (!r.ok || !r.data || r.data.error) return null
  if (!Number.isFinite(Number(r.data.balance))) return null
  return {
    balance: num(r.data.balance),
    checkedIn: r.data.checkedIn === true,
    adReward: num(r.data.adReward, 10),
    checkinReward: num(r.data.checkinReward, 10),
    adsRemaining: num(r.data.adsRemaining)
  }
}

export interface PointsCheckinResult {
  /** 本次实发积分（0 = 今天已经领过，幂等重放） */
  granted: number
  /** 余额：只在本次真发了分时才可信（幂等重放返回 null） */
  balance: number | null
}

/**
 * 每日签到。上游按 action_id（checkin-<userId>-<北京日期>）幂等：
 * 重复调用返回 granted:0 且不报错，所以客户端不需要自己记日期。
 */
export async function checkinPoints(base: string, token: string): Promise<PointsCheckinResult | null> {
  const r = await call<{ ok?: boolean; granted?: number; balance?: number | null }>(
    endpoint(base, '/api/points/checkin'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    }
  )
  if (!r.ok || !r.data?.ok) return null
  const balance = Number(r.data.balance)
  return {
    granted: num(r.data.granted),
    balance: r.data.balance === null || r.data.balance === undefined || !Number.isFinite(balance)
      ? null
      : balance
  }
}

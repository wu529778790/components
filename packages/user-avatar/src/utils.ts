/**
 * 小工具：Cookie 读写、内联 SVG 图标、HTML 转义。
 * 图标独立成常量便于复用（头像、设置、GitHub 均会用到 GitHub 图标）。
 */

// ==================== Cookie ====================

const TOKEN_COOKIE = 'wxauth-token'
const LEGACY_COOKIE = 'wxauth-openid'

/**
 * 读取当前微信登录 token。
 *
 * 为什么不用第一个匹配：
 * 历史遗留的 mock/demo 可能在同一浏览器写过「主机域（无 domain）」的
 * wxauth-token=demo-token，与 SDK 写入的「根域 .shenzjd.com」真实 token 同名共存。
 * document.cookie 里同名不同域的 cookie 都会返回，顺序由浏览器决定（通常主机域在前）。
 * 若直接取第一个，会拿到 demo-token 这类无效值。
 *
 * 因此：扫描全部同名 cookie，取「第一个疑似合法签名 token」。
 * 签名 token 格式固定：{openid}.{秒级时间戳}.{64位hex签名}，demo-token 不符 → 被跳过。
 * 注意：正则校验不等于后端验签，前端只是「从候选里挑最像真的」；
 * 是否有效以服务端 /check 为准（无效则组件显示未登录，行为正确）。
 */
function looksLikeSignedToken(value: string): boolean {
  if (!value || value.length < 20) return false
  // {x}.{数字}.{64位hex} 三段结构（签名 token 特征）
  return /^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(value)
}

export function getAuthToken(): string {
  const cookies = document.cookie.split('; ')
  const tokenCandidates: string[] = []
  const legacyCandidates: string[] = []
  for (const row of cookies) {
    const eq = row.indexOf('=')
    if (eq < 0) continue
    const name = row.slice(0, eq).trim()
    const value = row.slice(eq + 1)
    if (name === TOKEN_COOKIE) tokenCandidates.push(value)
    else if (name === LEGACY_COOKIE) legacyCandidates.push(value)
  }
  // 优先：更像签名 token 的（真实 token 优先于 demo/mock、lexid 兜底）
  const hit =
    tokenCandidates.find(looksLikeSignedToken) ||
    tokenCandidates[0] ||
    legacyCandidates.find(looksLikeSignedToken) ||
    legacyCandidates[0] ||
    ''
  return hit
}

/** 与 SDK setCookie 完全一致的根域推导（localhost / IP 不设 domain） */
function getRootDomain(): string {
  const hostname = window.location.hostname
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return ''
  const parts = hostname.split('.')
  return parts.length >= 2 ? '.' + parts.slice(-2).join('.') : ''
}

/**
 * 显式删除登录 Cookie（兜底：SDK clearToken 之外再删一遍）
 * 同时删「根域」与「主机域（无 domain）」两份：
 * 历史 mock 可能写过无 domain 的 demo-token（主机域 cookie），
 * 若只删根域会残留，导致 getAuthToken 仍能读到它。
 */
export function deleteAuthCookies(): void {
  cleanupCookie(TOKEN_COOKIE, false)
  cleanupCookie(TOKEN_COOKIE, true)
  cleanupCookie(LEGACY_COOKIE, false)
  cleanupCookie(LEGACY_COOKIE, true)
}

/**
 * 自愈：清掉「不是签名 token」的残留脏数据（如早期 mock 写的 demo-token）。
 * 页面初始化时调用一次——把历史遗留的 demo-token 这类无效 cookie 删掉，
 * 避免它和真实 token 同名共存、干扰读取（getAuthToken 已优先签名格式，
 * 这里再做最后的物理清理，防止脏 token 一直挂在浏览器里）。
 */
export function cleanupJunkTokens(): void {
  const cookies = document.cookie.split('; ')
  for (const row of cookies) {
    const eq = row.indexOf('=')
    if (eq < 0) continue
    const name = row.slice(0, eq).trim()
    if (name !== TOKEN_COOKIE && name !== LEGACY_COOKIE) continue
    const value = row.slice(eq + 1)
    // 合法签名 token 三段式 {x}.{ts}.{hex}；其他（demo-token/明文 openid）都算脏数据
    if (!/^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(value)) {
      cleanupCookie(name, false)
      cleanupCookie(name, true)
    }
  }
}

function cleanupCookie(name: string, withDomain: boolean): void {
  const domainStr = withDomain && getRootDomain() ? `;domain=${getRootDomain()}` : ''
  const secureStr = window.location.protocol === 'https:' ? ';Secure' : ''
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainStr}${secureStr};SameSite=Strict`
}

export { getRootDomain }

// ==================== XSS 转义 ====================

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function escapeAttr(value: string): string {
  return escapeHtml(value)
}

// ==================== 内联图标（SVG，无外部资源） ====================

/** 默认人形头像（未登录 / 无头像） */
export const USER_ICON_SVG =
  '<svg class="ua-icon-user" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>'

/** 齿轮（设置） */
export const SETTINGS_ICON =
  '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>'

/** 退出（箭头出框） */
export const LOGOUT_ICON =
  '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h4a1 1 0 110 2H4v12h4a1 1 0 110 2H4a1 1 0 01-1-1V3zm10.293 9.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293a1 1 0 000 1.414zM21 10a1 1 0 01-1-1v2a1 1 0 110 0v-2a1 1 0 011 0 1 1 0 010 1v-1h27a1 1 0 010 2H20a1 1 0 01-1-1v-2a1 1 0 010-1z" clip-rule="evenodd"/></svg>'

/** 关闭（X） */
export const CLOSE_ICON =
  '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>'

/** GitHub 图标（Octocat） */
export const GITHUB_ICON =
  '<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>'
/**
 * 小工具：XSS 转义、当前站判断、内联 SVG 图标。
 */

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

// ==================== 当前站判断 ====================

/** host 匹配等级：exact = 完全相等；sub = 当前 host 是该链接的子域；null = 不匹配 */
export type HostMatch = 'exact' | 'sub' | null

/** 归一化 host：去掉 www. 前缀，避免「链接 www.example.com / 当前 example.com」这类写法互相不命中 */
function normalizeHost(host: string): string {
  return host.replace(/^www\./i, '')
}

/**
 * 判断链接 host 与当前站的匹配等级（用于自动高亮当前站）。
 * 匹配规则：
 *   - exact：归一化后 host 完全相等（当前就在该站，含 www 互通）
 *   - sub：当前 host 是该链接的子域（如当前在 parse.shenzjd.com，
 *     链接 https://shenzjd.com 判定为子域命中）
 *   - null：不匹配
 *
 * 返回等级而非布尔值，供调用方做「精确优先、子域取最长」的整体匹配，
 * 避免「当前在 panhub.shenzjd.com 时主站与子站链接同时高亮」。
 */
export function matchCurrentHost(href: string): HostMatch {
  try {
    const linkHost = normalizeHost(new URL(href, window.location.href).hostname)
    const currentHost = normalizeHost(window.location.hostname)
    if (!linkHost || !currentHost) return null
    if (linkHost === currentHost) return 'exact'
    if (currentHost.endsWith('.' + linkHost)) return 'sub'
    return null
  } catch {
    return null
  }
}

/**
 * 判断链接 host 是否为当前站点（宽松匹配：完全相等或当前 host 是其子域）。
 * 保留兼容导出；新代码建议用 matchCurrentHost 做精确优先的整体匹配。
 */
export function isCurrentHost(href: string): boolean {
  return matchCurrentHost(href) !== null
}

// ==================== 内联图标（SVG，无外部资源） ====================

/** 移动端菜单（三条横线） */
export const HAMBURGER_ICON =
  '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>'

/** 关闭（X，移动菜单展开态） */
export const CLOSE_ICON =
  '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>'

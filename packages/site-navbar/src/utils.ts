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

/**
 * 判断链接 host 是否为当前站点（用于自动高亮当前站）。
 * 匹配规则：完整 host 相等，或当前 host 是该链接的子域
 * （如当前在 parse.shenzjd.com，链接 https://shenzjd.com 也判定命中）。
 */
export function isCurrentHost(href: string): boolean {
  try {
    const host = new URL(href, window.location.href).hostname
    if (!host) return false
    const current = window.location.hostname
    return host === current || current.endsWith('.' + host)
  } catch {
    return false
  }
}

// ==================== 内联图标（SVG，无外部资源） ====================

/** 移动端菜单（三条横线） */
export const HAMBURGER_ICON =
  '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>'

/** 关闭（X，移动菜单展开态） */
export const CLOSE_ICON =
  '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>'

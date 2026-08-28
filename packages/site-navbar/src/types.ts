/** 导航链接配置 */
export interface SiteNavbarLink {
  /** 完整链接地址（如 https://alist.shenzjd.com） */
  href: string
  /** 显示文本 */
  label: string
  /** 图标（emoji 或任意 HTML），可选 */
  icon?: string
  /** 强制高亮为当前站（不传则按 location.hostname 自动匹配） */
  active?: boolean
}

/** 品牌区配置（显示在导航左侧，可选） */
export interface SiteNavbarBrand {
  /** 品牌图标（emoji / SVG / 任意 HTML），可选 */
  icon?: string
  /** 品牌名称 */
  text?: string
  /** 点击跳转地址（默认取第一个链接） */
  href?: string
}

/** 主题（映射 --sn-* CSS 变量） */
export interface SiteNavbarTheme {
  /** 主文字色（品牌 / hover 文字） */
  primary?: string
  /** 次要文字色（默认链接） */
  secondary?: string
  /** 强调色（当前站高亮） */
  accent?: string
  /** hover 背景（链接 hover 已改为纯文字变色，现仅 hamburger 按钮使用） */
  hoverBg?: string
  /** 导航栏背景（玻璃拟态色，当前站高亮 / 移动菜单共用） */
  bg?: string
  /** 边框 / 分隔线颜色 */
  border?: string
  /** 圆角 */
  radius?: string
  /** 字体族 */
  fontFamily?: string
}

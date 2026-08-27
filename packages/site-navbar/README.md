# @wu529778790/site-navbar

**顶部站点导航组件**：内置 shenzjd.com 系列子站链接，按当前 host 自动高亮当前站；桌面端居中链接 + 右侧头像，移动端（<768px）折叠为 hamburger 下拉菜单。头像（user-avatar）已内置打包，无需额外引入。

适用于个人站群、博客、文档站等需要「统一导航 + 账号登录」的页面。

## 特性

- 🧭 内置 shenzjd.com 系列子站链接（AI情报局 / 网盘搜索 / 视频解析 / 热点聚合 / 导航森林 / 必应壁纸），可用 `links` 覆盖
- 🎯 按 `location.hostname` **自动高亮当前站**，也可用 `active` 强制指定
- 👤 **内置 user-avatar**（微信登录头像），已随构建打包，一行引入即带登录能力
- 📱 移动端（<768px）折叠为 hamburger 下拉菜单，`position: fixed` portal 挂载，玻璃拟态
- 🎨 CSS 变量主题化（`--sn-*`），一行覆盖主色 / 强调色 / 背景 / 圆角
- 📦 NPM + CDN 双通道引入，TypeScript 类型齐全

## 安装

```bash
pnpm add @wu529778790/site-navbar
# 或 npm i @wu529778790/site-navbar / yarn add @wu529778790/site-navbar
```

## 快速开始（推荐 · Web Component）

### 方式一：CDN 一行引入（零配置，自动出现整条导航）

```html
<!-- 1. 先引入 wx-auth-sdk（头像登录依赖它） -->
<script src="https://unpkg.com/wx-auth-sdk/dist/wx-auth.umd.js"></script>
<script>
  // silent:true = 加载时只静默校验登录态、绝不自动弹登录窗
  // required:false = 可选认证：弹窗带 × 关闭按钮
  WxAuth.init({ silent: true, required: false })
</script>

<!-- 2. 再引入本组件（头像已内置，无需再引 user-avatar） -->
<script src="https://unpkg.com/@wu529778790/site-navbar@latest/dist/site-navbar.wc.js"></script>

<!-- 3. 页面放一个标签即出现整条导航 -->
<site-navbar></site-navbar>
```

> 备选 CDN（GitHub 直连，push 即生效）：`https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/site-navbar.wc.js`

### 方式二：声明式属性

```html
<site-navbar
  brand="我的导航"
  brand-icon="🧭"
  avatar="false"          <!-- 不需要头像时 -->
  theme-accent="#e04040"  <!-- 强调色 -->
  >
</site-navbar>
```

### 方式三：全局配置（复杂参数：自定义链接、主题）

```html
<script>
  window.__SITE_NAVBAR_OPTIONS__ = {
    links: [
      { href: 'https://shenzjd.com', label: 'AI情报局', icon: '🏠' },
      { href: 'https://panhub.shenzjd.com', label: '网盘搜索', icon: '🔍' }
    ],
    brand: { text: '我的导航', icon: '🧭' },
    theme: { accent: '#1a6dff' }
  }
</script>
<script src="https://unpkg.com/@wu529778790/site-navbar@latest/dist/site-navbar.wc.js"></script>
```

### 方式四：NPM 双轨（React/Vue 项目）

```ts
import { SiteNavbar } from '@wu529778790/site-navbar'

const nav = new SiteNavbar({
  links: [
    { href: 'https://shenzjd.com', label: 'AI情报局', icon: '🏠' },
    { href: 'https://panhub.shenzjd.com', label: '网盘搜索', icon: '🔍' }
  ],
  brand: { text: '我的导航', icon: '🧭' },
  onNavigate: (link, e) => console.log('点击', link.label)
})
nav.mount(document.body)

// 卸载
nav.unmount()
```

## Web Component 属性

`<site-navbar>` 全部属性均可选，不设即用默认值。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `brand` | `string` | — | 品牌文本（显示在导航左侧） |
| `brand-icon` | `string` | — | 品牌图标（emoji / SVG / 任意 HTML） |
| `avatar` | `boolean` | `true` | 是否渲染头像（user-avatar） |
| `links` | `string` | 内置默认 | JSON 数组字符串，如 `[{"href":"...","label":"..."}]` |
| `theme-primary` | `string` | `#1f2328` | 主文字色（品牌 / hover 文字） |
| `theme-secondary` | `string` | `#656d76` | 次要文字色（默认链接） |
| `theme-accent` | `string` | `#1a6dff` | 强调色（当前站高亮） |
| `theme-hover-bg` | `string` | `rgba(31,35,40,.06)` | 链接 hover 背景 |
| `theme-bg` | `string` | `rgba(255,255,255,.55)` | 导航栏背景（玻璃拟态） |
| `theme-border` | `string` | `rgba(27,31,36,.08)` | 边框 / 分隔线色 |
| `theme-radius` | `string` | `12px` | 圆角 |
| `theme-font-family` | `string` | 系统字体栈 | 字体族 |

> 样式已隔离在 shadow DOM，外部可用 `--sn-*` 变量覆盖（见下文「自定义主题」）。

## JS API（NPM 双轨）

### `new SiteNavbar(options, container?)`

**所有参数均可选**，不传即用默认值，`new SiteNavbar()` 即可。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `links` | `SiteNavbarLink[]` | 内置默认 | 链接列表 |
| `brand` | `SiteNavbarBrand \| null` | `null` | 品牌区（不传不渲染，链接纯居中） |
| `avatar` | `boolean` | `true` | 是否渲染头像 |
| `avatarOptions` | `UserAvatarOptions` | — | 透传给 user-avatar（`fixed` 强制为 `false` 以嵌入导航栏） |
| `theme` | `SiteNavbarTheme` | 默认主题 | 主题（映射 `--sn-*` 变量） |
| `breakpoint` | `number` | `768` | 移动端断点（px） |
| `portalEl` | `HTMLElement` | `document.body` | 移动菜单 portal 挂载容器（通常无需配置） |
| `onNavigate` | `(link, event) => void` | — | 点击导航链接回调 |

#### 链接 `links`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `href` | `string` | 完整链接地址（必填） |
| `label` | `string` | 显示文本（必填） |
| `icon` | `string` | 图标（emoji / SVG / 任意 HTML），可选 |
| `active` | `boolean` | 强制高亮为当前站（不传则按 `location.hostname` 自动匹配） |

#### 品牌 `brand`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `icon` | `string` | 品牌图标（emoji / SVG / 任意 HTML），可选 |
| `text` | `string` | 品牌名称 |
| `href` | `string` | 点击跳转地址（默认取第一个链接） |

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `mount(target?)` | 挂载到页面（缺省挂到构造时传入的 container） |
| `unmount()` | 卸载并销毁（解绑事件、移除 portal 菜单） |
| `destroy()` | 同 `unmount()` |
| `static check()` | 环境检查：头像 SDK 缺失时返回提示（不影响导航本体渲染） |

## 自定义主题

组件通过 CSS 变量暴露主题，直接在宿主页面覆盖即可：

```css
site-navbar {
  --sn-primary: #1f2328;        /* 主文字色 */
  --sn-secondary: #656d76;      /* 次要文字色 */
  --sn-accent: #1a6dff;         /* 强调色（当前站高亮） */
  --sn-hover-bg: rgba(31,35,40,.06); /* hover 背景 */
  --sn-bg: rgba(255,255,255,.55);    /* 导航栏背景（玻璃拟态） */
  --sn-border: rgba(27,31,36,.08);  /* 边框 */
  --sn-radius: 12px;            /* 圆角 */
  --sn-font-family: -apple-system, ...; /* 字体族 */
}
```

## 防闪烁（FOUC）与布局稳定

**组件默认已处理**：

1. **Web Component 未定义时的占位**：`<site-navbar>` 是未知元素时高度为 0，等 JS 加载、组件注册、渲染后才撑出高度，页面内容会被突然往下推（"闪一下"）。组件在注册时自动注入一条全局样式：

   ```css
   site-navbar:not(:defined) { display: block; height: var(--sn-navbar-height, 44px); }
   ```

   从页面首帧起 `<site-navbar>` 就占位 44px（与导航栏实际渲染高度 43.7px 对齐，加载后不会回跳），组件升级后由自身接管渲染，占位自动失效。

2. **移动端菜单不占布局**：菜单以 `position: fixed` 挂到 `body`，**任何时刻都脱离文档流**（无论开/关），不会在页面底部撑出空白。

**接入方可选（彻底消除 JS 下载期间的闪烁）**：

如果希望 JS 下载期间页面也纹丝不动，可在 `<head>` 里直接写一条 CSS（不依赖 JS 加载）：

```html
<style>
  site-navbar:not(:defined) { display: block; height: 44px; }
</style>
```

> 导航栏实际高度默认 44px；若你自定义了导航栏高度（如增大内边距），请同步调整该值，或用变量 `--sn-navbar-height` 覆盖。

## 在线演示

**https://blog.shenzjd.com/components/packages/site-navbar/demo/**

## 本地演示

```bash
pnpm build            # 仓库根目录执行，产出 dist/
pnpm preview          # 启动静态服务器 http://localhost:8317
```

浏览器打开 `http://localhost:8317/packages/site-navbar/demo/index.html`，顶部即导航组件实时样式；把窗口缩到 768px 以下看移动端菜单。

## 浏览器兼容

现代浏览器（Chrome / Firefox / Safari / Edge），无 IE 支持计划。

## License

MIT
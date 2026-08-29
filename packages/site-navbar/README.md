# @wu529778790/site-navbar

**顶部站点导航组件**：内置 shenzjd.com 系列子站链接，按当前 host 自动高亮当前站；桌面端居中链接 + 右侧头像，移动端（<768px）折叠为 hamburger 下拉菜单。头像运行时动态加载 `<user-avatar>` Web Component（默认 unpkg `@latest`），user-avatar 发版后自动跟上，无需重新发布本组件。

适用于个人站群、博客、文档站等需要「统一导航 + 账号登录」的页面。

## 特性

- 🧭 内置 shenzjd.com 系列子站链接（AI情报局 / 网盘搜索 / 视频解析 / 热点聚合 / 导航森林 / 必应壁纸），可用 `links` 覆盖
- 🎯 按 `location.hostname` **自动高亮当前站**（host 精确匹配，匹配不上则不高亮任何链接），也可用 `active` 强制指定；高亮样式仅为文字变色
- 👤 **内置 user-avatar**（微信登录头像）：运行时动态加载最新版 Web Component，头像组件发版即自动生效，导航栏无需跟随发版
- 📱 移动端（<768px）折叠为 hamburger 下拉菜单，`position: fixed` portal 挂载，玻璃拟态
- 🌗 默认**深浅色自动适配**（`light-dark()`）：宿主页面声明 `color-scheme: light / dark` 时跟随宿主配色，未声明时跟随系统，无需任何配置
- 📏 导航栏自带**底部分隔线**（`--sn-border` 控制，随深浅色切换），无需宿主额外画线
- 🎨 CSS 变量主题化（`--sn-*`），一行覆盖主色 / 强调色 / 背景 / 圆角（显式指定后固定使用，不随系统切换）
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

<!-- 2. 再引入本组件（头像由本组件运行时自动加载最新版，无需再引 user-avatar） -->
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
| `avatar-src` | `string` | unpkg `@latest` | 运行时加载的 `<user-avatar>` 脚本地址（如指向自身 CDN） |
| `links` | `string` | 内置默认 | JSON 数组字符串，如 `[{"href":"...","label":"..."}]` |
| `theme-primary` | `string` | 随系统* | 主文字色（品牌 / hover 文字） |
| `theme-secondary` | `string` | 随系统* | 次要文字色（默认链接） |
| `theme-accent` | `string` | 随系统* | 强调色（当前站高亮） |
| `theme-hover-bg` | `string` | 随系统* | hover 背景（现仅 hamburger 按钮使用，链接 hover 已改为纯文字变色） |
| `theme-bg` | `string` | 随系统* | 保留参数（当前站高亮已改为纯文字变色，不再使用背景，暂无样式作用） |
| `theme-border` | `string` | 随系统* | 边框 / 分隔线色 |
| `theme-radius` | `string` | `12px` | 圆角 |
| `theme-font-family` | `string` | 系统字体栈 | 字体族 |

> \* 颜色类主题默认值自动适配深浅色：浅色 `#1f2328 / #656d76 / #1a6dff / rgba(255,255,255,.55) …`，深色 `#e6edf3 / #8b949e / #4d9fff / rgba(28,31,36,.55) …`。取色规则：宿主页面声明 `color-scheme: light / dark` 时跟随宿主，未声明时跟随系统。显式传入某个 `theme-*` 属性后该值固定使用，不再随系统切换。

> 样式已隔离在 shadow DOM，外部可用 `--sn-*` 变量覆盖（见下文「自定义主题」）。

## JS API（NPM 双轨）

### `new SiteNavbar(options, container?)`

**所有参数均可选**，不传即用默认值，`new SiteNavbar()` 即可。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `links` | `SiteNavbarLink[]` | 内置默认 | 链接列表 |
| `brand` | `SiteNavbarBrand \| null` | `null` | 品牌区（不传不渲染，链接纯居中） |
| `avatar` | `boolean` | `true` | 是否渲染头像 |
| `avatarOptions` | `SiteNavbarAvatarOptions` | — | 透传给 user-avatar（`fixed` 强制为 `false` 以嵌入导航栏）；`src` 可覆盖头像脚本地址 |
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
| `href` | `string` | 点击跳转地址（默认跳**当前站首页**；同站 `_self` 跳转，跨站自动 `_blank`） |

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `mount(target?)` | 挂载到页面（缺省挂到构造时传入的 container） |
| `unmount()` | 卸载并销毁（解绑事件、移除 portal 菜单） |
| `destroy()` | 同 `unmount()` |
| `static check()` | 环境检查：头像 SDK 缺失时返回提示（不影响导航本体渲染） |

## 头像（user-avatar）：始终最新，无需联动发版

右侧头像不再打包进本组件，而是运行时动态加载 `<user-avatar>` Web Component（默认 `https://unpkg.com/@wu529778790/user-avatar@latest/dist/user-avatar.wc.js`）：

- **自动跟随最新版**：user-avatar 每次发版（push 到 main 后 CI 自动发布 npm），所有接入站点的导航栏头像即刻用上新版，site-navbar **无需重新构建/发布**；
- **已加载则不重复加载**：页面已引入 `user-avatar.wc.js` 或聚合版 `widgets.js` 时，导航栏直接复用已注册的元素；
- **失败不影响导航**：头像脚本加载失败（如内网无外网）只会在控制台告警并留空头像区，导航本体不受影响；
- **可指定脚本地址**：国内直连 unpkg 慢、或希望锁定版本时，用 `avatarOptions.src`（JS API）或 `avatar-src` 属性覆盖：

```html
<site-navbar avatar-src="https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/user-avatar.wc.js"></site-navbar>
```

前置条件不变：页面需自行引入 `wx-auth-sdk` 并 `WxAuth.init()`（登录能力依赖它）。

## 自定义主题

组件通过 CSS 变量暴露主题，直接在宿主页面覆盖即可（默认值随系统深浅色自适应，覆盖后固定使用你的颜色）：

```css
site-navbar {
  --sn-primary: #1f2328;        /* 主文字色 */
  --sn-secondary: #656d76;      /* 次要文字色 */
  --sn-accent: #1a6dff;         /* 强调色（当前站高亮） */
  --sn-hover-bg: rgba(31,35,40,.06); /* hover 背景（现仅 hamburger 按钮使用） */
  --sn-bg: rgba(255,255,255,.55);    /* 保留变量（当前无样式作用） */
  --sn-border: rgba(27,31,36,.08);  /* 边框 / 底部分隔线 */
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
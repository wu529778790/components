# @wu529778790/floating-qr

极简、零依赖的浮窗组件：在网站右侧展示「公众号二维码」+「小程序」，关闭后刷新页面自动重新出现。

适用于博客、文档站、个人网站等任何需要「涨粉 + 打赏」双驱动的页面。小程序区块默认渲染，可通过 `donate` 配置（或 `donate-*` 属性）自定义。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入、改一处全站生效
- 🎯 声明式标签 `<floating-qr>`，属性改动即时热更新
- 🎨 CSS 变量主题化（`--fq-*`），一行覆盖背景色 / 强调色 / 圆角 / 边框
- 📱 移动端默认隐藏，可配置开启
- 🧹 关闭即消失，默认不记住状态（刷新必重新出现）
- 📦 NPM + CDN 双通道引入，TypeScript 类型齐全

## 安装

```bash
pnpm add @wu529778790/floating-qr
# 或 npm i @wu529778790/floating-qr / yarn add @wu529778790/floating-qr
```

## 快速开始（推荐 · Web Component）

### 方式一：CDN 一行引入（零配置，自动出现默认浮窗）

```html
<script src="https://unpkg.com/@wu529778790/floating-qr@latest/dist/floating-qr.wc.js"></script>
<!-- 无需任何标签/JS，自动注入默认公众号 + 小程序浮窗 -->
```

### 方式二：声明式标签（按需定制，属性即时热更新）

```html
<floating-qr
  position="left-bottom"
  theme-accent="#e04040"
  wechat-title="公众号"
  donate-title="小程序">
</floating-qr>
<script src="https://unpkg.com/@wu529778790/floating-qr@latest/dist/floating-qr.wc.js"></script>
```

### 方式三：全局配置（复杂参数：二维码 URL、主题色）

```html
<script>
  window.__FLOATING_QR_OPTIONS__ = {
    wechat: { src: 'https://.../wechat.jpg', title: '公众号' },
    donate: { src: 'https://.../miniprogram.png', title: '小程序' },
    theme: { bg: '#fff', accent: '#333' }
  }
</script>
<script src="https://unpkg.com/@wu529778790/floating-qr@latest/dist/floating-qr.wc.js"></script>
```

**不想自动注入**：给 `<html>` 加 `data-fq-auto="false"`，此时只有页面中的 `<floating-qr>` 标签会生效。

> 备选 CDN（GitHub 直连，push 即生效、不依赖 npm 发布）：
> `https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/floating-qr.wc.js`

### 方式四：NPM 双轨（React/Vue 项目照旧）

```ts
import FloatingQR from '@wu529778790/floating-qr'
import '@wu529778790/floating-qr/style.css'

new FloatingQR() // 直接使用内置公众号二维码 + 小程序
```

## Web Component 属性

`<floating-qr>` 全部属性均可选，不设即用默认值；`data-fq-auto="false"` 可完全禁用自动初始化。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | `string` | `'right-center'` | `right-bottom` / `right-top` / `right-center` / `left-bottom` / `left-top` / `left-center` |
| `close-persistence` | `boolean` | 关 | 打开时关闭写入 localStorage，刷新不再出现 |
| `hide-on-mobile` | `boolean` | 开 | `<768px` 时不渲染 |
| `z-index` | `number` | `9999` | 浮窗层级 |
| `wechat-src` | `string` | 内置公众号二维码图 | 公众号二维码图片 URL |
| `wechat-title` | `string` | `'公众号'` | 公众号区块标题 |
| `wechat-desc` | `string` | `''` | 副文案，不传不显示 |
| `donate-src` | `string` | 内置小程序图 | 小程序图片 URL |
| `donate-title` | `string` | `'小程序'` | 小程序区块标题 |
| `donate-desc` | `string` | `''` | 副文案，不传不显示 |
| `link-hrefs` | `string` | - | 社交链接 URL 列表，逗号分隔；自动按域名匹配内置图标 |
| `theme-bg` | `string` | 半透明白 | 背景色 |
| `theme-accent` | `string` | `#333` | 标题文字强调色 |
| `theme-radius` | `string` | `12px` | 圆角 |
| `theme-border` | `string` | `rgba(0,0,0,.1)` | 边框色 |

> 样式已隔离在 shadow DOM，外部可用 `--fq-*` 变量覆盖（见下文「自定义主题」）。
> 小程序区块默认渲染：设置任一 `donate-*` 属性可自定义（图片留空用内置小程序图）。

## JS API（NPM 双轨）

### `new FloatingQR(options)`

**所有参数均可选**，不传即用默认值，`new FloatingQR()` 即可。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `wechat` | `FloatingQRBlock` | 内置公众号二维码 | 公众号区块 |
| `wechat.src` | `string` | 内置公众号二维码图 | 公众号二维码图片 URL |
| `wechat.title` | `string` | `'公众号'` | 公众号区块标题 |
| `wechat.desc` | `string` | `''` | 副文案，不传不显示 |
| `donate` | `FloatingQRBlock` | 内置小程序 | 小程序区块，默认渲染 |
| `donate.src` | `string` | 内置小程序图 | 小程序图片 URL |
| `donate.title` | `string` | `'小程序'` | 小程序区块标题 |
| `donate.desc` | `string` | `''` | 副文案，不传不显示 |
| `position` | `Position` | `'right-center'` | `right-bottom` / `right-top` / `right-center` / `left-bottom` / `left-top` / `left-center` |
| `closePersistence` | `boolean` | `false` | `true` 时关闭写入 localStorage，刷新不再出现 |
| `hideOnMobile` | `boolean` | `true` | `<768px` 时不渲染 |
| `zIndex` | `number` | `9999` | 浮窗层级 |
| `links` | `FloatingQRLink[]` | `[]` | 底部社交链接（见下） |
| `theme.bg` | `string` | 半透明白 | 背景色 |
| `theme.accent` | `string` | `#333` | 标题文字强调色 |
| `theme.radius` | `string` | `12px` | 圆角 |
| `theme.border` | `string` | `rgba(0,0,0,.1)` | 边框色 |

#### 链接 `links`

在二维码下方渲染一排社交图标链接：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `href` | `string` | 链接地址（必填） |
| `icon` | `string` | 图标：内置 key（`tg` / `github` / `x`）、SVG 字符串、图片 URL，缺省用标题首字母 |
| `title` | `string` | 链接标题（hover 提示 / aria-label） |

```ts
new FloatingQR({
  links: [
    { href: 'https://t.me/shenzjd_com', icon: 'tg', title: 'Telegram' },
    { href: 'https://github.com/wu529778790', icon: 'github', title: 'GitHub' },
    { href: 'https://x.com/shenzujiudi', icon: 'x', title: 'X (Twitter)' }
  ]
})
```

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `close()` | 关闭并移除浮窗（`closePersistence` 为 `true` 时同时写入 localStorage） |
| `destroy()` | 从页面移除并解绑事件 |
| `update(options)` | 用新配置重渲染 |
| `isMounted()` | 当前是否已挂载 |

## 自定义主题

组件通过 CSS 变量暴露主题，直接在宿主页面覆盖即可：

```css
.fq-widget {
  --fq-bg: #fffbe6;        /* 背景 */
  --fq-accent: #c0392b;    /* 强调色 */
  --fq-radius: 8px;        /* 圆角 */
  --fq-border: #e0d5a0;    /* 边框 */
  --fq-offset: 24px;       /* 距视口边缘距离 */
  --fq-width: 160px;       /* 浮窗宽度 */
}
```

## 在线演示

**https://blog.shenzjd.com/components/packages/floating-qr/demo/**

## 本地演示

```bash
pnpm build            # 仓库根目录执行，产出 dist/
pnpm preview          # 启动静态服务器 http://localhost:8317
```

浏览器打开 `http://localhost:8317/packages/floating-qr/demo/index.html`，右侧即组件实时样式，左侧面板可调参。

## 浏览器兼容

现代浏览器（Chrome / Firefox / Safari / Edge），无 IE 支持计划。

## License

MIT

# @wu529778790/floating-modal

极简、零依赖的**赞助 / 公告弹窗**：居中模态卡片，正文下直接放赞赏码二维码，每次进入页面自动弹出。

适用于个人博客、文档站等"靠爱发电"的场景：一句真诚话术 + 一个扫码动作，得体不烦人。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入、改一处全站生效
- 🎯 声明式标签 `<floating-modal>`，默认连接即自动弹出
- 🎨 CSS 变量主题化（`--fm-*`），支持正文 HTML
- ⌨️ 点遮罩关闭、Esc 关闭、右上角 X
- 📦 NPM + CDN 双通道，CDN 引入即自动弹出

## 安装

```bash
pnpm add @wu529778790/floating-modal
```

## 快速开始（推荐 · Web Component）

### 方式一：CDN 一行引入（零配置，自动弹出默认弹窗）

```html
<script src="https://unpkg.com/@wu529778790/floating-modal@latest/dist/floating-modal.wc.js"></script>
<!-- 无需任何标签/JS，自动弹出默认赞助弹窗 -->
```

### 方式二：声明式标签（默认连接即弹出；`auto-show="false"` 时手动调用 `show()`）

```html
<floating-modal
  auto-show="false"
  title="站点公告"
  qr-src="https://.../qrcode.png">
</floating-modal>
<script src="https://unpkg.com/@wu529778790/floating-modal@latest/dist/floating-modal.wc.js"></script>
<script>
  // auto-show="false" 时不自动弹，由按钮/时机手动触发：
  document.getElementById('my-modal').show()
</script>
```

### 方式三：全局配置

```html
<script>
  window.__FLOATING_MODAL_OPTIONS__ = {
    title: '站点公告',
    content: '本站将于 8 月 20 日凌晨迁移服务器…',
    delay: 3000
  }
</script>
<script src="https://unpkg.com/@wu529778790/floating-modal@latest/dist/floating-modal.wc.js"></script>
```

**不想自动弹出**：给 `<html>` 加 `data-fm-auto="false"`，此时只有页面中的 `<floating-modal>` 标签会生效。

> 备选 CDN（GitHub 直连，push 即生效、不依赖 npm 发布）：
> `https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/floating-modal.wc.js`

### 方式四：NPM 双轨（React/Vue 项目照旧）

```ts
import FloatingModal from '@wu529778790/floating-modal'
import '@wu529778790/floating-modal/style.css'

new FloatingModal() // 默认话术 + 默认赞赏码
```

## Web Component 属性

`<floating-modal>` 全部属性均可选，不设即用默认值；`data-fm-auto="false"` 可完全禁用自动弹出。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `auto-show` | `boolean` | 开 | 关时连接不自动弹，需 JS 调用 `el.show()` |
| `title` | `string` | `'小水管请求支援'` | 弹窗标题 |
| `content` | `string` | 内置赞助话术 | 正文（纯文本，自动转义，`\n` 换行） |
| `content-html` | `string` | `''` | 正文原始 HTML（自行确保安全），优先于 content |
| `qr-src` | `string` | 内置赞赏码 | 二维码图片，不设则不显示二维码区 |
| `qr-alt` | `string` | - | 二维码 alt 文案 |
| `width` | `number` | `380` | 卡片宽度 px |
| `mask-closable` | `boolean` | 开 | 点遮罩关闭 |
| `close-on-esc` | `boolean` | 开 | 按 Esc 关闭 |
| `show-close` | `boolean` | 开 | 显示右上角关闭按钮 |
| `delay` | `number` | `0` | 延迟展示毫秒数 |
| `z-index` | `number` | `10000` | 弹窗层级 |
| `theme-bg` | `string` | `#fff` | 背景色 |
| `theme-accent` | `string` | `#185fa5` | 强调色 |
| `theme-radius` | `string` | `16px` | 圆角 |
| `theme-border` | `string` | `rgba(0,0,0,.1)` | 边框色 |
| `theme-overlay` | `string` | `rgba(0,0,0,.4)` | 遮罩色 |
| `theme-title-color` | `string` | `#1f1f1f` | 标题文字色 |
| `theme-text-color` | `string` | `#555` | 正文文字色 |

> 样式已隔离在 shadow DOM，外部可用 `--fm-*` 变量覆盖（见下文「自定义主题」）。

## JS API（NPM 双轨）

**所有参数均可选**，不传即用默认值，`new FloatingModal()` 即可。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `'小水管请求支援'` | 弹窗标题 |
| `content` | `string` | 内置赞助话术 | 正文（纯文本，自动转义，`\n` 换行） |
| `contentHtml` | `string` | `''` | 正文原始 HTML（自行确保安全），优先于 content |
| `qr` | `{ src, alt? }` | 内置赞赏码 | 二维码图片，不传则不显示二维码区 |
| `width` | `number` | `380` | 卡片宽度 px |
| `maskClosable` | `boolean` | `true` | 点遮罩关闭 |
| `closeOnEsc` | `boolean` | `true` | 按 Esc 关闭 |
| `showClose` | `boolean` | `true` | 显示右上角关闭按钮 |
| `delay` | `number` | `0` | 延迟展示毫秒数 |
| `zIndex` | `number` | `10000` | 弹窗层级 |
| `theme` | `FloatingModalTheme` | - | 主题（见下） |
| `onClose` | `() => void` | - | 关闭后回调 |

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `show()` | 手动展示 |
| `close()` | 关闭并销毁 |
| `destroy()` | 从页面移除并解绑 |
| `isOpen()` | 当前是否展示中 |

### 主题 `theme`

| 字段 | 默认值 | 对应 CSS 变量 |
| --- | --- | --- |
| `bg` | `#fff` | `--fm-bg` |
| `accent` | `#185fa5` | `--fm-accent` |
| `radius` | `16px` | `--fm-radius` |
| `border` | `rgba(0,0,0,.1)` | `--fm-border` |
| `overlay` | `rgba(0,0,0,.4)` | `--fm-overlay` |
| `titleColor` | `#1f1f1f` | `--fm-title-color` |
| `textColor` | `#555` | `--fm-text-color` |

## 在线演示

**https://blog.shenzjd.com/components/packages/floating-modal/demo/**

## 本地演示

```bash
pnpm build            # 仓库根目录执行，产出 dist/
pnpm preview          # 启动静态服务器 http://localhost:8317
```

浏览器打开 `http://localhost:8317/packages/floating-modal/demo/index.html`。

## 浏览器兼容

现代浏览器（Chrome / Firefox / Safari / Edge），无 IE 支持计划。

## License

MIT

# @wu529778790/floating-modal

极简、零依赖的**赞助 / 公告弹窗**：居中模态卡片，正文下直接放赞赏码二维码，关闭后 7 天内不再打扰。

适用于个人博客、文档站等"靠爱发电"的场景：一句真诚话术 + 一个扫码动作，得体不烦人。

## 特性

- 🧩 零依赖、无框架绑定（原生 JS 核心）
- 🎯 默认赞助话术（自嘲 + 真诚）+ 内置赞赏码二维码，`new FloatingModal()` 零配置可用
- 🕐 频率控制：每次 / 每天一次 / 关闭后 N 天不再打扰（避免惹人烦）
- 🎨 CSS 变量主题化（`--fm-*`），支持正文 HTML
- ⌨️ 点遮罩关闭、Esc 关闭、右上角 X
- 📦 NPM + CDN 双通道，CDN 引入即自动弹出

## 安装

```bash
pnpm add @wu529778790/floating-modal
```

## 使用

### 零配置（最快）

```ts
import FloatingModal from '@wu529778790/floating-modal'
import '@wu529778790/floating-modal/style.css'

new FloatingModal() // 默认话术 + 默认赞赏码，关闭后 7 天不再打扰
```

### 自定义内容

```ts
new FloatingModal({
  title: '小水管请求支援',
  content: '这台小服务器只有 1M 小水管，全靠爱和电费扛到现在。\n觉得有用，扫码请它喝杯咖啡。',
  qr: { src: 'https://.../qrcode.png', alt: '赞赏码' },
  frequency: 7,          // 关闭后 7 天不再打扰（'always' | 'daily' | number）
  width: 380
})
```

### CDN 零代码（一条标签即自动弹出）

```html
<link rel="stylesheet" href="https://unpkg.com/@wu529778790/floating-modal@latest/dist/floating-modal.css" />
<script src="https://unpkg.com/@wu529778790/floating-modal@latest/dist/index.umd.js"></script>
```

CDN 自定义参数（引入前定义全局对象即可）：

```html
<script>
  window.__FLOATING_MODAL_OPTIONS__ = {
    title: '站点公告',
    content: '本站将于 8 月 20 日凌晨迁移服务器…'
  }
</script>
<script src="https://unpkg.com/@wu529778790/floating-modal@latest/dist/index.umd.js"></script>
```

完全禁用自动弹出：给 `<html>` 加 `data-fm-auto="false"`，再手动 `new FloatingModal()`。

## API

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
| `frequency` | `'always' \| 'daily' \| number` | `7` | 展示频率：每次 / 每天一次 / 关闭后 N 天不再打扰 |
| `delay` | `number` | `0` | 延迟展示毫秒数 |
| `zIndex` | `number` | `10000` | 弹窗层级 |
| `theme` | `FloatingModalTheme` | - | 主题（见下） |
| `onClose` | `() => void` | - | 关闭后回调 |

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `show()` | 手动展示（不受频率限制） |
| `close()` | 关闭并销毁（记录关闭时间） |
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

**https://wu529778790.github.io/components/packages/floating-modal/demo/**

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

# @wu529778790/floating-qr

极简、零依赖的浮窗组件：在网站右侧展示「公众号二维码 + 赞赏码」，关闭后刷新页面自动重新出现。

适用于博客、文档站、个人网站等任何需要「涨粉 + 打赏」双驱动的页面。

## 特性

- 🧩 零依赖、无框架绑定（原生 JS 核心，任意技术栈可用）
- 🎨 CSS 变量主题化，一行覆盖背景色 / 强调色 / 圆角 / 边框
- 📱 移动端默认隐藏，可配置开启
- 🧹 关闭即消失，默认不记住状态（刷新必重新出现）
- 📦 NPM + CDN 双通道引入，TypeScript 类型齐全

## 安装

```bash
pnpm add @wu529778790/floating-qr
# 或 npm i @wu529778790/floating-qr / yarn add @wu529778790/floating-qr
```

## 使用

### 零配置（最快）

```ts
import FloatingQR from '@wu529778790/floating-qr'
import '@wu529778790/floating-qr/style.css'

new FloatingQR() // 直接使用内置公众号 + 赞赏码二维码
```

### ESM（自定义内容）

```ts
import FloatingQR from '@wu529778790/floating-qr'
import '@wu529778790/floating-qr/style.css'

new FloatingQR({
  wechat: { src: 'https://.../wechat-qr.jpg', title: '公众号' },
  donate: { src: 'https://.../donate-qr.png', title: '赞赏码' }
})
```

### CDN 零代码（最快 · 一条标签即自动出现）

```html
<link rel="stylesheet" href="https://unpkg.com/@wu529778790/floating-qr@latest/dist/floating-qr.css" />
<script src="https://unpkg.com/@wu529778790/floating-qr@latest/dist/index.umd.js"></script>
<!-- 无需任何 JS，浮窗自动出现，使用内置公众号 + 赞赏码 -->
```

**CDN + 自定义参数**：引入前定义一个全局对象即可，无需手动 `new`：

```html
<script>
  window.__FLOATING_QR_OPTIONS__ = {
    wechat: { title: '扫码关注' },
    donate: { title: '赞赏支持' },
    position: 'right-bottom'
  }
</script>
<script src="https://unpkg.com/@wu529778790/floating-qr@latest/dist/index.umd.js"></script>
```

**完全禁用自动初始化**（改用手动控制）：给 `<html>` 加 `data-fq-auto="false"`，然后手动 `new FloatingQR(...)`。

> CDN 方式全局挂载为 `window.FloatingQR`。自动初始化只执行一次（`__floatingQrAutoInit__` 守卫）。

## API

### `new FloatingQR(options)`

**所有参数均可选**，不传即用默认值，`new FloatingQR()` 即可。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `wechat` | `FloatingQRBlock` | 内置公众号二维码 | 公众号区块 |
| `wechat.src` | `string` | 内置公众号二维码图 | 公众号二维码图片 URL |
| `wechat.title` | `string` | `'公众号'` | 公众号区块标题 |
| `wechat.desc` | `string` | `''` | 副文案，不传不显示 |
| `donate` | `FloatingQRBlock` | 内置赞赏码 | 赞赏码区块 |
| `donate.src` | `string` | 内置赞赏码图 | 赞赏码图片 URL |
| `donate.title` | `string` | `'赞赏码'` | 赞赏码区块标题 |
| `donate.desc` | `string` | `''` | 副文案，不传不显示 |
| `position` | `Position` | `'right-bottom'` | `right-bottom` / `right-top` / `right-center` / `left-bottom` / `left-top` / `left-center` |
| `closePersistence` | `boolean` | `false` | `true` 时关闭写入 localStorage，刷新不再出现 |
| `hideOnMobile` | `boolean` | `true` | `<768px` 时不渲染 |
| `zIndex` | `number` | `9999` | 浮窗层级 |
| `theme.bg` | `string` | 半透明白 | 背景色 |
| `theme.accent` | `string` | `#333` | 标题文字强调色 |
| `theme.radius` | `string` | `12px` | 圆角 |
| `theme.border` | `string` | `rgba(0,0,0,.1)` | 边框色 |

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

**https://wu529778790.github.io/components/packages/floating-qr/demo/**

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

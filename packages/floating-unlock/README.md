# @wu529778790/floating-unlock

极简、零依赖的**自愿支持弹窗**：在合适的位置弹出固定的小程序激励页二维码，用户**自愿**扫码看视频支持；想看就看、想关随时关。

组件**完全静态**——运行时零后端请求、无校验、无票据，二维码是一张写死 URL 的固定图片（小程序激励页 `pages/reward-unlock/index` 的 release 版码，无参数）。

> 历史说明：旧版为「强制看广告解锁」，走 wx-auth 出码/轮询/验票链路并强制不可关。
> 静态化后该链路整体移除；`unlock()` 兼容保留但只负责打开弹窗并立即返回。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入、改一处全站生效
- 🎯 声明式标签 `<floating-unlock>`，业务方调用 `el.show()` 打开
- 🔓 **自愿观看**：右上角 ×、点遮罩、Esc 均可随时关闭
- 📷 **固定二维码**：内置写死的小程序激励页码图片（图床 CDN），运行时零请求后端
- 🎨 CSS 变量主题化（`--fu-*`），支持正文 HTML
- 📦 NPM + CDN 双通道，TypeScript 类型齐全

## 安装

```bash
pnpm add @wu529778790/floating-unlock
# 或 npm i @wu529778790/floating-unlock / yarn add @wu529778790/floating-unlock
```

## 快速开始（推荐 · Web Component）

```html
<floating-unlock></floating-unlock>
<script src="https://unpkg.com/@wu529778790/floating-unlock@latest/dist/floating-unlock.wc.js"></script>
<script>
  const unlockEl = document.querySelector('floating-unlock')

  // 在合适的位置打开弹窗；用户可随时关闭
  unlockEl.show()
</script>
```

> 备选 CDN（GitHub 直连，push 即生效、不依赖 npm 发布）：
> `https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/floating-unlock.wc.js`

### 方式二：NPM

```ts
import FloatingUnlock from '@wu529778790/floating-unlock'
import '@wu529778790/floating-unlock/style.css'

const unlock = new FloatingUnlock()
unlock.show() // 打开弹窗；close() 关闭
```

## Web Component 属性

`<floating-unlock>` 全部属性均可选，不设即用默认值。**本组件不自动弹出**，由业务方调用 `el.show()` 触发。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `qr-src` | `string` | 内置固定小程序码 | 二维码图片 URL |
| `title` | `string` | `'帮帮小水管服务器吧'` | 弹窗标题 |
| `content` | `string` | 内置文案 | 正文（纯文本，自动转义，`\n` 换行） |
| `content-html` | `string` | `''` | 正文原始 HTML（自行确保安全），优先于 content |
| `width` | `number` | `380` | 卡片宽度 px |
| `z-index` | `number` | `10000` | 弹窗层级 |
| `theme-bg` | `string` | `#fff` | 背景色 |
| `theme-accent` | `string` | `#185fa5` | 强调色 |
| `theme-radius` | `string` | `16px` | 圆角 |
| `theme-border` | `string` | `rgba(0,0,0,.1)` | 边框色 |
| `theme-overlay` | `string` | `rgba(0,0,0,.4)` | 遮罩色 |
| `theme-title-color` | `string` | `#1f1f1f` | 标题文字色 |
| `theme-text-color` | `string` | `#555` | 正文文字色 |

> 样式已隔离在 shadow DOM，外部可用 `--fu-*` 变量覆盖（见下文「自定义主题」）。

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `show()` | 打开弹窗（重复调用幂等） |
| `close()` | 关闭弹窗（可再次 `show()` 打开） |
| `unlock()` | **兼容旧版**：等价 `show()`，返回立即 resolve 的 `Promise`（不再阻塞业务、不再产生票据） |

## JS API（NPM）

### `new FloatingUnlock(options)`

**所有参数均可选**，不传即用默认值。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `qrSrc` | `string` | 内置固定小程序码 | 二维码图片 URL |
| `title` | `string` | `'帮帮小水管服务器吧'` | 弹窗标题 |
| `content` | `string` | 内置文案 | 正文（纯文本，自动转义，`\n` 换行） |
| `contentHtml` | `string` | `''` | 正文原始 HTML（自行确保安全），优先于 content |
| `width` | `number` | `380` | 卡片宽度 px |
| `zIndex` | `number` | `10000` | 弹窗层级 |
| `theme` | `FloatingUnlockTheme` | - | 主题（见下） |

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `show()` | 打开弹窗 |
| `close()` | 关闭弹窗 |
| `destroy()` | 从页面移除并解绑（之后不可再 `show()`） |
| `unlock()` | **兼容旧版**：等价 `show()`，返回立即 resolve 的 `Promise` |
| `isOpen()` | 当前是否展示中 |
| `getState()` | 当前状态：`idle` / `open` |

### 主题 `theme`

| 字段 | 默认值 | 对应 CSS 变量 |
| --- | --- | --- |
| `bg` | `#fff` | `--fu-bg` |
| `accent` | `#185fa5` | `--fu-accent` |
| `radius` | `16px` | `--fu-radius` |
| `border` | `rgba(0,0,0,.1)` | `--fu-border` |
| `overlay` | `rgba(0,0,0,.4)` | `--fu-overlay` |
| `titleColor` | `#1f1f1f` | `--fu-title-color` |
| `textColor` | `#555` | `--fu-text-color` |

## 自定义主题

组件通过 CSS 变量暴露主题，直接在宿主页面覆盖即可：

```css
floating-unlock {
  --fu-bg: #fffbe6;        /* 背景 */
  --fu-accent: #c0392b;    /* 强调色 */
  --fu-radius: 8px;        /* 圆角 */
  --fu-border: #e0d5a0;    /* 边框 */
}
```

## 固定二维码的生成

内置二维码由 `scripts/generate-qr.mjs` 一次性调微信 `wxacode.get` 生成（release 版、
无 scene 参数、430px），托管在图床仓库 `img.shenzjd.com`：

```
https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/reward-unlock-qr.jpg
```

激励页路径变更或码版本切换时重新出码：

```bash
node scripts/generate-qr.mjs /path/to/wx-auth-full   # 凭证读取自 wx-auth-full/.env
# 把 assets/reward-unlock-qr.jpg 拷入图床仓库提交推送即可
```

## 在线演示

**https://blog.shenzjd.com/components/packages/floating-unlock/demo/**

## 本地演示

```bash
pnpm build            # 仓库根目录执行，产出 dist/
pnpm preview          # 启动静态服务器 http://localhost:8317
```

浏览器打开 `http://localhost:8317/packages/floating-unlock/demo/index.html`。

## 浏览器兼容

现代浏览器（Chrome / Firefox / Safari / Edge），无 IE 支持计划。

## License

MIT

# @wu529778790/floating-ad

极简、零依赖的广告浮窗组件：在网站左侧（或任意边角）常驻一张广告卡片，支持多张图片广告混排、点击跳转、关闭后刷新重现。

与 [`@wu529778790/floating-qr`](../floating-qr) 视觉同源：同一套圆角卡片、半透明背景、右上角关闭按钮、跟随系统深浅色，左边挂广告、右边挂二维码可以完全对齐。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入、改一处全站生效
- 🎯 声明式标签 `<floating-ad>`，属性改动即时热更新
- 🖼 图片固定 120×120 方形（与右侧公众号浮窗的二维码同尺寸），`cover` / `contain` 可选，多张混排自动分隔线
- 🏷 可选的「广告」标识（默认不显示），开启后压首图左上角、不占排版行高
- 🎨 CSS 变量主题化（`--fa-*`），一行覆盖背景色 / 强调色 / 圆角 / 边框
- 📱 移动端小一号展示（卡片 140 / 图片 112），默认落在左下角，可配置隐藏
- 🧹 关闭即消失，默认不记住状态（刷新必重新出现）
- 🚫 没有广告数据时不渲染任何节点，不会留一张空白卡片
- 📦 NPM + CDN 双通道引入，TypeScript 类型齐全

## 安装

```bash
pnpm add @wu529778790/floating-ad
# 或 npm i @wu529778790/floating-ad / yarn add @wu529778790/floating-ad
```

## 快速开始（推荐 · Web Component）

### 方式一：CDN + 声明式标签（单条广告）

```html
<floating-ad
  ad-src="https://.../ad.jpg"
  ad-title="云服务器 · 2 核 4G"
  ad-desc="新用户首年 99 元"
  ad-href="https://..."
  ad-badge="限时">
</floating-ad>
<script src="https://unpkg.com/@wu529778790/floating-ad@latest/dist/floating-ad.wc.js"></script>
```

### 方式二：多条广告（`ads-json`）

```html
<floating-ad ads-json='[
  { "src": "https://.../a.jpg", "title": "云服务器特惠", "href": "https://..." },
  { "title": "周刊订阅", "desc": "每周一封，只讲有用的工具", "href": "https://..." }
]'></floating-ad>
<script src="https://unpkg.com/@wu529778790/floating-ad@latest/dist/floating-ad.wc.js"></script>
```

### 方式三：全局配置（无标签时自动注入）

```html
<script>
  window.__FLOATING_AD_OPTIONS__ = {
    ads: [{ src: 'https://.../ad.jpg', title: '云服务器特惠', href: 'https://...' }],
    position: 'left-center',
    width: 180
  }
</script>
<script src="https://unpkg.com/@wu529778790/floating-ad@latest/dist/floating-ad.wc.js"></script>
```

> **没有默认素材**：不传 `ads` / 全局配置时不会自动注入（避免空白广告卡片）。
> 不想自动注入：给 `<html>` 加 `data-fa-auto="false"`，此时只有页面中的 `<floating-ad>` 标签生效。
>
> 备选 CDN（GitHub 直连，push 即生效、不依赖 npm 发布）：
> `https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/floating-ad.wc.js`

### 方式四：NPM 双轨（React/Vue 项目照旧）

```ts
import FloatingAd from '@wu529778790/floating-ad'
import '@wu529778790/floating-ad/style.css'

new FloatingAd({
  ads: [{ src: '/ad.jpg', title: '广告位招租', desc: '联系微信 xxx', href: '/' }]
})
```

## Web Component 属性

`<floating-ad>` 全部属性均可选，不设即用默认值。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `position` | `string` | 桌面 `left-center`<br>移动 `left-bottom` | `left-center` / `left-bottom` / `left-top` / `right-center` / `right-bottom` / `right-top` |
| `width` | `number` | 桌面 150<br>移动 140 | 浮窗宽度（px） |
| `offset` | `number` | 桌面 16<br>移动 12 | 距视口边缘距离（px） |
| `close-persistence` | `boolean` | 关 | 打开时关闭写入 localStorage，刷新不再出现 |
| `hide-on-mobile` | `boolean` | 关 | `<768px` 时是否隐藏（默认展示小一号浮窗） |
| `z-index` | `number` | `9999` | 浮窗层级 |
| `ad-label` | `string` | 不显示 | 标识文案（压在首图左上角，不占行高）；空值 / `true` 显示「广告」，`false` / `none` / `off` / `0` 关闭 |
| `image-fit` | `string` | `'cover'` | 图片填充方式：`cover` / `contain` |
| `image-size` | `number` | 桌面 120<br>移动 112 | 广告图片边长（px，正方形） |
| `ad-src` | `string` | - | 单条广告图片 URL（必填，缺省不渲染） |
| `ad-title` | `string` | - | 单条广告标题 |
| `ad-desc` | `string` | - | 单条广告副文案 |
| `ad-href` | `string` | - | 单条广告跳转链接 |
| `ad-target` | `string` | `'_blank'` | `_blank` / `_self` |
| `ad-badge` | `string` | - | 图片右上角角标，如「限时」 |
| `ads-json` | `string` | - | 多条广告的 JSON 数组，优先级高于 `ad-*` 单一属性 |
| `theme-bg` | `string` | 半透明白 | 背景色 |
| `theme-accent` | `string` | `#333` | 强调色（标题 / 角标） |
| `theme-radius` | `string` | `12px` | 圆角 |
| `theme-border` | `string` | `rgba(0,0,0,.1)` | 边框色 |

> 样式已隔离在 shadow DOM，外部可用 `--fa-*` 变量覆盖（见下文「自定义主题」）。

## JS API（NPM 双轨）

### `new FloatingAd(options, container?)`

**所有参数均可选**；没有有效广告时不渲染。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ads` | `FloatingAdItem[]` | `[]` | 广告列表，见下 |
| `position` | `Position` | 桌面 `left-center`<br>移动 `left-bottom` | 位置 |
| `closePersistence` | `boolean` | `false` | `true` 时关闭写入 localStorage，刷新不再出现 |
| `hideOnMobile` | `boolean` | `true` | `<768px` 时不渲染 |
| `zIndex` | `number` | `9999` | 浮窗层级 |
| `adLabel` | `string \| false` | `false` | 标识文案，默认不显示；传字符串如 `'广告'` 显示 |
| `width` | `number` | 桌面 150<br>移动 140 | 宽度（px） |
| `offset` | `number` | 桌面 16<br>移动 12 | 距边缘（px） |
| `imageFit` | `'cover' \| 'contain'` | `'cover'` | 图片填充 |
| `imageSize` | `number` | 桌面 120<br>移动 112 | 广告图片边长（px，正方形） |
| `theme.bg` | `string` | 半透明白 | 背景色 |
| `theme.accent` | `string` | `#333` | 强调色 |
| `theme.radius` | `string` | `12px` | 圆角 |
| `theme.border` | `string` | `rgba(0,0,0,.1)` | 边框色 |
| `onClick` | `(ad, event) => void` | - | 点击广告回调（不阻止默认跳转） |

#### 广告项 `FloatingAdItem`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 图片 URL（必填；没有图片的条目会被忽略） |
| `title` | `string` | 标题 |
| `desc` | `string` | 副文案 |
| `href` | `string` | 跳转链接；`javascript:` / `data:` 等危险协议会被忽略 |
| `target` | `'_blank' \| '_self'` | 跳转方式，默认 `_blank` |
| `alt` | `string` | 图片 alt，缺省用 `title` |
| `badge` | `string` | 图片右上角角标 |

```ts
new FloatingAd({
  ads: [
    { src: '/ad-1.jpg', title: '云服务器特惠', desc: '首年 99 元', href: 'https://...', badge: '限时' },
    { title: '周刊订阅', desc: '每周一封，只讲有用的工具', href: 'https://...' }
  ],
  position: 'left-center',
  onClick: (ad) => console.log('ad clicked', ad.title)
})
```

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `open()` | 重新打开（忽略 localStorage 关闭标记） |
| `close()` | 关闭并移除浮窗（`closePersistence` 为 `true` 时同时写入 localStorage） |
| `destroy()` | 从页面移除并解绑事件 |
| `update(options)` | 用新配置重渲染（保留原容器） |
| `isMounted()` | 当前是否已挂载 |

Web Component 元素同样提供 `open()` / `close()`。

## 响应式（桌面 / 移动）

同一份配置自动适配两端，断点为 `768px`：

| 项 | 桌面（≥768px） | 移动端（<768px） |
| --- | --- | --- |
| 位置 | `left-center`（左侧垂直居中） | `left-bottom`（左下角） |
| 卡片宽度 | 150px | 140px |
| 图片边长 | 120px | 112px |
| 距视口边缘 | 16px | 12px |
| 关闭按钮 | 悬停出现 | 常显（触屏无 hover） |

- 显式设置 `position` / `width` / `offset` / `imageSize` 时会覆盖两端默认值（移动端也用同一尺寸）
- 想彻底不在移动端出现：`hide-on-mobile`
- 想改移动端尺寸又保留响应式：直接覆盖 CSS 变量（不要传 `width` 等 JS 参数）

```css
@media (max-width: 767px) {
  .fa-widget {
    --fa-width: 130px;
    --fa-img-size: 104px;
    --fa-offset: 10px;
  }
}
```

## 自定义主题

组件通过 CSS 变量暴露主题，直接在宿主页面覆盖即可：

```css
.fa-widget {
  --fa-bg: #fffbe6;        /* 背景 */
  --fa-accent: #c0392b;    /* 强调色 */
  --fa-radius: 8px;        /* 圆角 */
  --fa-border: #e0d5a0;    /* 边框 */
  --fa-offset: 24px;       /* 距视口边缘距离 */
  --fa-width: 180px;       /* 浮窗宽度 */
  --fa-img-fit: cover;     /* 图片填充方式 */
  --fa-img-size: 120px;   /* 广告图片边长（正方形） */
}
```

## 在线演示

**https://blog.shenzjd.com/components/packages/floating-ad/demo/**

## 本地演示

```bash
pnpm build            # 仓库根目录执行，产出 dist/
pnpm preview          # 启动静态服务器 http://localhost:8317
```

浏览器打开 `http://localhost:8317/packages/floating-ad/demo/index.html`，左侧即组件实时样式，左侧面板可调参。

## 浏览器兼容

现代浏览器（Chrome / Firefox / Safari / Edge），无 IE 支持计划。

## License

MIT

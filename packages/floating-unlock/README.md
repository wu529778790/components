# @wu529778790/floating-unlock

极简、零依赖的**通用解锁弹窗**：在需要解锁的动作处（如「继续搜索」）弹出小程序码，用户扫码进小程序看完激励视频广告后，网页轮询到 `unlocked`，把**一次性放行票据 grant** 带回给调用方。

适用于任何「看广告换功能放行」的场景——搜索、下载、导出、高级功能等，业务无关，接入方在解锁成功后把 `ticket + grant` 交给**自己的后端**验票放行。

> ⚠️ **业务后端必须验票**：`unlock()` 返回的 `{ ok: true, ticket, grant }` **不代表放行**。`grant` 是一次性 HMAC 票据，业务方后端须在真正放行（如继续搜索）前，用 `ticket + grant` 调 wx-auth 的 `/api/auth/mp-reward/verify` 验票并核销，`valid: true` 才放行业务。放行权在后端，改前端代码无法绕过。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入、改一处全站生效
- 🎯 声明式标签 `<floating-unlock>`，业务方调用 `el.unlock()` 返回 `Promise<UnlockResult>`：`{ ok: true, ticket, grant }` 即解锁成功
- 🔒 **强制不可关**：解锁前无关闭按钮、点遮罩/Esc 均无效，看完广告才能继续
- 🛡️ **防绕过闭环**：解锁结果携带一次性 HMAC 票据 grant，须由业务后端验票放行，前端不再自证
- 🎨 CSS 变量主题化（`--fu-*`），支持正文 HTML
- ⏱ 内置倒计时、过期自动提示「刷新二维码」、成功态展示
- 📦 NPM + CDN 双通道，TypeScript 类型齐全

## 后端依赖

本组件依赖 [wx-auth](https://wx-auth.shenzjd.com) 项目的激励解锁接口（已上线）：

| 接口 | 方法 | 调用方 | 说明 |
| --- | --- | --- | --- |
| `/api/auth/mp-reward/create` | POST | 网页（本组件） | 生成 ticket + 小程序码，返回 `{ticket, qrDataUrl, expiresIn}`（5 分钟有效） |
| `/api/auth/mp-reward/status?ticket=xxx` | GET | 网页（本组件，轮询） | 轮询状态：`waiting` / `unlocked` / `expired`；`unlocked` 时携带 `{status:'unlocked', siteId, grant}`，`grant` 为 HMAC 签名的一次性放行票据 |
| `/api/auth/mp-reward/verify` | POST | **业务方后端**（服务端对服务端） | 放行前验票：body `{ticket, grant}`，返回 `{ok:true, valid:true}`（验真并核销）或 `already_consumed` / `invalid_grant` |

完整链路：网页 `create` 出码 → 用户微信扫码进小程序激励页看完整视频 → 小程序 `report` 上报 → 网页轮询 `status` 拿到 `unlocked` + `grant` → 业务方把 `ticket + grant` 交给**自己后端**调 `verify` 验票 → `valid: true` 才真正放行业务。

> 一次解锁对应一张 `grant`，只能核销一次（「一次解锁管一次继续动作」），核销后重复使用返回 `already_consumed`，业务侧引导重新解锁即可。

## 安装

```bash
pnpm add @wu529778790/floating-unlock
# 或 npm i @wu529778790/floating-unlock / yarn add @wu529778790/floating-unlock
```

## 快速开始（推荐 · Web Component）

### 方式一：声明式标签 + 业务方调用 unlock()

```html
<floating-unlock
  api-base="https://wx-auth.shenzjd.com"
  site-id="panhub.shenzjd.com">
</floating-unlock>
<script src="https://unpkg.com/@wu529778790/floating-unlock@latest/dist/floating-unlock.wc.js"></script>
<script>
  const unlockEl = document.querySelector('floating-unlock')

  async function continueSearch() {
    // 强制看广告；{ ok: true } 才代表用户看完了广告、拿到了票据
    const { ok, ticket, grant } = await unlockEl.unlock()
    if (!ok) return   // 失败/过期/取消

    // ⚠️ 前端解锁不代表放行：把票据带给后端，由后端调 verify 验票后再真正放行
    const searchRes = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Unlock-Ticket': ticket,
        'X-Unlock-Grant': grant
      },
      body: JSON.stringify({ keyword })
    })
  }
</script>
```

> 备选 CDN（GitHub 直连，push 即生效、不依赖 npm 发布）：
> `https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/floating-unlock.wc.js`

### 方式二：NPM 双轨（React/Vue 项目照旧）

```ts
import FloatingUnlock from '@wu529778790/floating-unlock'
import '@wu529778790/floating-unlock/style.css'

const unlock = new FloatingUnlock({
  apiBase: 'https://wx-auth.shenzjd.com',
  siteId: 'panhub.shenzjd.com'
})

const { ok, ticket, grant } = await unlock.unlock()
if (!ok) return   // 解锁失败/过期/取消

// ⚠️ 必须把 ticket + grant 带给业务后端，由后端调 verify 验票后才放行业务
axios.post('/api/search', { keyword }, {
  headers: {
    'X-Unlock-Ticket': ticket,
    'X-Unlock-Grant': grant
  }
})
```

**返回结构 `UnlockResult`：**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `ok` | `boolean` | 解锁是否成功 |
| `ticket` | `string \| null` | 解锁会话票据；失败/过期/取消时为 `null` |
| `grant` | `string \| null` | 一次性 HMAC 放行票据（业务后端验票用）；失败/过期/取消时为 `null` |

## Web Component 属性

`<floating-unlock>` 全部属性均可选，不设即用默认值。**本组件不自动弹出**，由业务方调用 `el.unlock()` 触发。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `api-base` | `string` | `https://wx-auth.shenzjd.com` | 后端 API 地址 |
| `site-id` | `string` | `''` | 站点标识（小程序端展示"为哪个站点解锁" + 广告分桶统计） |
| `title` | `string` | `'帮帮小水管服务器吧'` | 弹窗标题 |
| `content` | `string` | 内置卖惨话术 | 正文（纯文本，自动转义，`\n` 换行） |
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
| `unlock()` | 发起解锁，返回 `Promise<UnlockResult>`：`{ok:true, ticket, grant}`=解锁成功（业务方自行把票据带去后端验票）；`{ok:false, ticket:null, grant:null}`=失败/过期/取消 |
| `close()` | 关闭弹窗 |

## JS API（NPM 双轨）

### `new FloatingUnlock(options)`

**所有参数均可选**，不传即用默认值。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `apiBase` | `string` | `https://wx-auth.shenzjd.com` | 后端 API 地址 |
| `siteId` | `string` | `''` | 站点标识 |
| `title` | `string` | `'帮帮小水管服务器吧'` | 弹窗标题 |
| `content` | `string` | 内置卖惨话术 | 正文（纯文本，自动转义，`\n` 换行） |
| `contentHtml` | `string` | `''` | 正文原始 HTML（自行确保安全），优先于 content |
| `width` | `number` | `380` | 卡片宽度 px |
| `zIndex` | `number` | `10000` | 弹窗层级 |
| `theme` | `FloatingUnlockTheme` | - | 主题（见下） |
| `onUnlocked` | `(result: { ticket: string; grant: string \| null; siteId?: string }) => void` | - | 解锁成功回调（携带一次性票据 grant） |
| `onError` | `(error) => void` | - | 解锁失败/过期回调 |

### 实例方法

| 方法 | 说明 |
| --- | --- |
| `unlock()` | 发起解锁，返回 `Promise<UnlockResult>`（见上文返回结构）；请勿再用旧写法 `if (await unlock())` 判断 |
| `close()` | 关闭并销毁 |
| `destroy()` | 从页面移除并解绑 |
| `isOpen()` | 当前是否展示中 |
| `getState()` | 当前状态：`idle` / `loading` / `waiting` / `unlocked` / `expired` |

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
# @wu529778790/user-avatar

右上角**用户头像账号组件**：未登录显示默认人形头像，点击弹出**微信订阅号登录**窗口；已登录显示真实头像，点击弹出下拉菜单（**设置 / 退出登录**），设置弹窗内含 **GitHub 绑定**、openid 展示、**修改昵称**。

与 [`wx-auth`](https://github.com/wu529778790/wx-auth) 微信订阅号认证体系深度集成：复用其 SDK（`window.WxAuth`）与后端接口（`/api/auth/userinfo`、`/api/auth/profile`、`/api/oauth/github/authorize`）。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入即可用
- 🎨 头像组件零样式依赖：CSS 变量驱动（`--ua-*`），可整套换肤
- 🔐 与 wx-auth 微信登录无缝衔接：未登录点击 → 弹扫码/验证码；登录后自动识别人头
- 🐙 设置弹窗内绑定 / 解绑 GitHub（子窗口授权，`postMessage` 自动刷新）
- ✏️ 修改昵称（复用后端 nickname 配置），openid 一键复制
- 📦 NPM + CDN 双通道

## 安装

```bash
pnpm add @wu529778790/user-avatar
```

## 快速开始（推荐 · Web Component）

> ⚠️ 前置：本组件依赖 **wx-auth-sdk**（`window.WxAuth`）。请先引入 SDK 并 `WxAuth.init({ required: false })`，组件会自动探测并复用。

### 方式一：CDN 一行引入

```html
<!-- 1. 先引入 wx-auth-sdk（微信认证，登录弹窗由它渲染） -->
<script src="https://unpkg.com/wx-auth-sdk/dist/wx-auth.umd.js"></script>
<script>
  WxAuth.init({ required: false, onVerified: () => location.reload() })
</script>

<!-- 2. 再引入本组件 -->
<script src="https://unpkg.com/@wu529778790/user-avatar@latest/dist/user-avatar.wc.js"></script>

<!-- 3. 页面放一个标签即出现右上角头像 -->
<user-avatar></user-avatar>
```

> 备选 CDN（GitHub 直连，push 即生效）：`https://cdn.jsdmirror.com/gh/wu529778790/components@main/cdn/user-avatar.wc.js`

### 方式二：声明式属性

```html
<user-avatar
  size="44px"                               <!-- 头像尺寸 -->
  fixed                                     <!-- 固定右上角 -->
  offset="1rem 1.5rem"                      <!-- top right 偏移 -->
  >
</user-avatar>
```

### 方式三：NPM 双轨（React/Vue 项目）

```ts
import UserAvatar from '@wu529778790/user-avatar'
import '@wu529778790/user-avatar/style.css'

// 已登录用户状态由组件自动探测（读 wxauth-token cookie + userinfo 接口）
const avatar = new UserAvatar({ apiBase: '' })
avatar.mount(document.body)

// 手动控制
await avatar.login()          // 弹微信登录，返回是否成功
await avatar.refresh()        // 重新拉取用户信息
avatar.unmount()              // 卸载
```

## 属性一览（Web Component）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `api-base` | `string` | `https://wx-auth.shenzjd.com` | 后端 API 前缀（默认写死自家 wx-auth 后端，一般无需配置） |
| `fixed` | `boolean` | true | 是否固定右上角（`fixed` 存在即 true） |
| `offset` | `string` | `'1rem 1.5rem'` | 固定定位偏移（top right） |
| `size` | `string` | `'2.5rem'` | 头像直径 |
| `z-index` | `number` | `12000` | 弹窗层级 |
| `theme-accent` | `string` | `#1f2328` | 主色（头像/按钮/toast，默认中性灰黑） |
| `theme-size` | `string` | `2.5rem` | 头像尺寸（略同 size） |
| `theme-radius` | `string` | `16px` | 卡片/弹窗圆角 |
| `theme-bg` | `string` | `#fff` | 卡片背景 |
| `theme-text` / `theme-sub-text` | `string` | — | 正文 / 次要文字色 |
| `theme-overlay` | `string` | — | 遮罩色 |
| `theme-danger` | `string` | — | 危险按钮色（退出/解绑） |
| `theme-success` | `string` | — | 成功色（已绑定） |

也可直接覆盖 CSS 变量：`--ua-btn-bg` `--ua-size` `--ua-accent` `--ua-btn-border` `--ua-radius` `--ua-bg` `--ua-text` `--ua-sub` `--ua-overlay` `--ua-danger` `--ua-success`。

## JS API（NPM 用法）

```ts
import { UserAvatar, UserAvatarOptions } from '@wu529778790/user-avatar'

const avatar = new UserAvatar({
  // apiBase 不传即默认 https://wx-auth.shenzjd.com（自家后端，一般无需配置）
  sdk: window.WxAuth,                // 可显式传 SDK，缺省自动取 window.WxAuth
  fixed: true, offset: '1rem 1.5rem',
  theme: { accent: '#1f2328' },
  onLogin: (user) => console.log('登录', user),
  onLogout: () => console.log('登出'),
  onGithubBound: (user) => console.log('绑定 GitHub', user),
})

avatar.mount(document.body)

// 主动登录：等待用户完成微信扫码/验证码
const ok = await avatar.login()

// 强制刷新用户（登录/解绑后）
await avatar.refresh()

avatar.unmount()
```

## 交互流程

```
未登录                         已登录
┌──────────┐  点击头像   ┌──────────────────┐
│ 默认人形   │ ─────────► │ 微信扫码登录窗（SDK）│
└──────────┘             └──────────────────┘
                          验证成功 ──► 头像变真实头像 + 下拉菜单
                                        │
                                        ├─ 设置 ──► 设置弹窗（GitHub 绑定/解绑、改昵称、openid）
                                        └─ 退出登录（清 cookie）
```

## 数据接口依赖（后端应为 wx-auth 同款）

| 接口 | 说明 |
| --- | --- |
| `GET /api/auth/userinfo?token=` | 拉取当前用户（openid / nickname / github 等） |
| `POST /api/auth/profile` | `{action:'set-nickname', nickname}` / `{action:'unbind-github'}` |
| `GET /api/oauth/github/authorize?token=` | 发起 GitHub OAuth 绑定（新窗口），子窗 `postMessage({type:'github-bound'})` |

若无这些接口，组件依然能渲染头像与登录，但设置面板的能力（绑定/改名）不可用。

## License

MIT
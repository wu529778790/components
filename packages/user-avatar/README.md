# @wu529778790/user-avatar

右上角**用户头像账号组件**：未登录显示默认人形头像，点击弹出**微信订阅号登录**窗口；已登录显示真实头像，点击弹出下拉菜单（**设置 / 退出登录**），设置弹窗内含 **积分**（余额 / 每日签到 / 看广告赚分）、**GitHub 绑定**、openid 展示、**修改昵称**、**用户序号**（本站第 N 位用户）。

与 [`wx-auth`](https://github.com/wu529778790/wx-auth) 微信订阅号认证体系深度集成：复用其 SDK（`window.WxAuth`）与后端接口（`/api/auth/userinfo`、`/api/auth/profile`、`/api/oauth/github/authorize`、`/api/points/**`）。

## 特性

- 🧩 Web Component 封装，一行 `<script>` 注入即可用
- 🎨 头像组件零样式依赖：CSS 变量驱动（`--ua-*`），可整套换肤
- 🌗 默认**深浅色自动适配**（`light-dark()`）：宿主页面声明 `color-scheme: light / dark` 时跟随宿主配色，未声明时跟随系统，无需任何配置
- 🔐 与 wx-auth 微信登录无缝衔接：未登录点击 → 弹扫码/验证码；登录后自动识别人头
- 🪙 **积分**（wx-auth 账本，全站通用）：设置弹窗内展示余额、今日签到状态，可一键**签到**领分、**看广告赚分**（弹小程序码 → 看完激励视频自动到账）
- 🐙 设置弹窗内绑定 / 解绑 GitHub（子窗口授权，`postMessage` 自动刷新）
- ✏️ 修改昵称（复用后端 nickname 配置），openid 一键复制
- 🔢 展示用户序号（userinfo 的 `userSeq`）：设置弹窗内显示「你是本站第 N 位用户」
- 📦 NPM + CDN 双通道

## 安装

```bash
pnpm add @wu529778790/user-avatar
```

## 快速开始（推荐 · Web Component）

> ⚠️ 前置：本组件依赖 **wx-auth-sdk**（`window.WxAuth`，建议 `>= 1.2.41`）。请先引入 SDK 并 `WxAuth.init({ silent: true, required: false })`，组件会自动探测并复用。
> 头像登录弹窗的「能否关闭」由组件自己按 `login-required` 决定，不受宿主全局 `required` 影响，详见下方「登录弹窗能不能关？」。

### 方式一：CDN 一行引入

```html
<!-- 1. 先引入 wx-auth-sdk（微信认证，登录弹窗由它渲染） -->
<script src="https://unpkg.com/wx-auth-sdk/dist/wx-auth.umd.js"></script>
<script>
  // silent:true = 加载时只静默校验登录态、绝不自动弹登录窗（头像组件是可选项登录，
  //               弹窗只由点击头像时 SDK.requireAuth() 触发）
  // required:false = 可选认证：弹窗带 × 关闭按钮，用户可主动关闭
  WxAuth.init({ silent: true, required: false, onVerified: () => location.reload() })
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
await avatar.login()          // 弹微信登录（默认可关闭），返回是否成功
await avatar.refresh()        // 重新拉取用户信息
avatar.unmount()              // 卸载

// 需要「必须登录才能继续」的宿主流程：让本次弹窗强制不可关闭
const forced = new UserAvatar({ loginRequired: true })
```

## 属性一览（Web Component）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `api-base` | `string` | `https://wx-auth.shenzjd.com` | 后端 API 前缀（默认写死自家 wx-auth 后端，一般无需配置） |
| `fixed` | `boolean` | true | 是否固定右上角（`fixed` 存在即 true） |
| `offset` | `string` | `'1rem 1.5rem'` | 固定定位偏移（top right） |
| `size` | `string` | `'2.5rem'` | 头像直径 |
| `z-index` | `number` | `12000` | 弹窗层级 |
| `portal` | `boolean` | true | 设置弹窗 / 下拉菜单是否挂到顶层（body）。开启后弹窗始终全屏居中，避免被 `backdrop-filter` / `transform` / `filter` / `contain` / `overflow` 祖先困住；关闭则内联到组件根节点（旧行为） |
| `portal-el` | `string` | — | Portal 挂载容器。接受 CSS 选择器或元素 id（如 `#app` 或 `.overlay-root`），解析不到则回退到 `body` |
| `points-qr-src` | `string` | 内置固定小程序码 | 「看广告赚积分」弹窗里的小程序码图片地址（看广告的码是固定的，一般无需配置） |
| `login-required` | `boolean` | false | 点击头像触发的登录弹窗是否**强制不可关闭**。默认 false = 带 × 可关闭（用户主动点登录允许反悔）；只有「必须完成登录才能继续」的宿主场景才设为 true |
| `theme-accent` | `string` | `#1f2328` | 主色（头像/按钮/toast，默认中性灰黑） |
| `theme-size` | `string` | `2.5rem` | 头像尺寸（略同 size） |
| `theme-radius` | `string` | `16px` | 卡片/弹窗圆角 |
| `theme-bg` | `string` | `#fff` | 卡片背景 |
| `theme-text` / `theme-sub-text` | `string` | — | 正文 / 次要文字色 |
| `theme-overlay` | `string` | — | 遮罩色 |
| `theme-danger` | `string` | — | 危险按钮色（退出/解绑） |
| `theme-success` | `string` | — | 成功色（已绑定） |

也可直接覆盖 CSS 变量：`--ua-btn-bg` `--ua-size` `--ua-accent` `--ua-btn-border` `--ua-radius` `--ua-bg` `--ua-text` `--ua-sub` `--ua-overlay` `--ua-danger` `--ua-success`。

### 程序化传参：`el.props`（优先级最高）

回调、SDK 实例等复杂对象无法走标签属性，可用 JS 属性 `props` 传入完整配置。优先级：`props` > 标签属性 > `window.__USER_AVATAR_OPTIONS__`：

```html
<user-avatar id="ua" fixed></user-avatar>
<script>
  document.getElementById('ua').props = {
    apiBase: 'https://api.example.com',
    onLogin: (user) => console.log('登录成功', user)
  }
</script>
```

宿主组件嵌入场景（如 site-navbar）即在脚本加载前/后设置 `props`，元素升级后自动生效。

## JS API（NPM 用法）

```ts
import { UserAvatar, UserAvatarOptions } from '@wu529778790/user-avatar'

const avatar = new UserAvatar({
  // apiBase 不传即默认 https://wx-auth.shenzjd.com（自家后端，一般无需配置）
  sdk: window.WxAuth,                // 可显式传 SDK，缺省自动取 window.WxAuth
  fixed: true, offset: '1rem 1.5rem',
  portal: true,                      // 弹窗/菜单挂 body（默认 true）。若容器在 transform/overflow 祖先内，请保持 true
  // portalEl: document.querySelector('#overlay-root'), // 可选：自定义 Portal 容器，缺省 document.body
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
                                        ├─ 设置 ──► 设置弹窗（积分、GitHub 绑定/解绑、改昵称、openid、用户序号）
                                        │             └─ 看广告赚分 ──► 小程序码弹窗（扫码看完自动到账）
                                        └─ 退出登录（清 cookie）
```

## 积分（wx-auth 账本）

积分账本由 wx-auth 统一记账、**全站通用一份余额**（站点侧只负责展示与赚分，扣分一律由各站服务端收口）。
组件在设置弹窗里做了三件事，全程静默（读不到就只提示，绝不弹错、不阻断弹窗其他功能）：

| 行为 | 交互 |
| --- | --- |
| 展示余额 | 打开设置弹窗即读一次 `/api/points/balance`，显示「积分 12 分」+ 今日签到状态 |
| 每日签到 | 未签到时按钮显示「签到 +N」（N 取服务端下发的 `checkinReward`）→ 点击领取；已签到则按钮置灰为「今日已签到」。上游按「北京自然日」幂等，重复调用不会重复发分 |
| 看广告赚分 | 「看广告 +N」→ 弹出**固定的小程序码**（不动态出码）→ 用户扫码在小程序看完激励视频 → 组件静默 15s 后开始核对余额（每 3s 一次，最多 90s），比开窗时多即视为到账 → 卡片提示「看广告 +N 积分已到账」并自动收起弹窗 |

约定与边界：

- 余额数字与奖励额度**一律取服务端下发值**（`adReward` / `checkinReward`），组件不写死数字。
- **不动态出码**：看广告赚积分全站共用一张固定小程序码（`points-qr-src` 可换图），领票 / 播视频 / 加分都在小程序侧完成，网页侧没有票可查，为一个静态图请求接口纯属浪费。
- **先静默再核对**：一个激励视频要十几秒，扫码后立刻查必然是「还没变」，所以等 15s 才开始核对（间隔 3s，窗口 90s）；窗口过后可点弹窗里的「刷新积分」手动核对一次。
- 到账判定用的是**余额差值**（开窗基准 vs 当前余额），差值即本次赚到的分；基准未知时（开窗时读不到余额）把第一次成功读数当基准，避免误报「已到账」。
- 余额刷新失败时保留上一次读数、只提示「积分刷新失败」，不会把已有数字换成破折号；首次就读不到才显示「—」+「重试」。
- 小程序码弹窗是设置弹窗的子层：关闭设置弹窗会一并关闭它并停止核对。
- **组件不代扣分**：`POST /api/points/spend` 必须由接入方服务端携带用户凭证调用（浏览器直调等于把记账权交给客户端），所以本组件里没有扣分入口。

## 登录弹窗能不能关？（重要）

用户**主动点头像**属于可反悔操作，弹窗默认可关闭（右上角 ×）。组件调用 SDK 时会显式传本次语义：

```ts
sdk.requireAuth({ required: this.opts.loginRequired })   // 默认 false → 可关闭
```

为什么必须显式传：`required` 在 wx-auth-sdk 里是**调用级**入参，缺省才回落到 `WxAuth.init()` 的全局配置。
而宿主页面常常会为「搜索 / 获取 / 上传」这类**后端校验**流程把全局配置 init 成 `required: true`（强制不可关），
同一个页面里的头像弹窗就会被一起带成强制——用户点了头像却关不掉，只能刷新页面。
本组件自己传 `required: false` 后与宿主全局配置解耦，各是各的语义。

反向需求：如果宿主希望「点头像必须完成登录才能继续」，设 `loginRequired: true`（或属性 `login-required`）。

> 依赖 `wx-auth-sdk >= 1.2.41`；更老的 SDK 会忽略该入参（不报错），此时弹窗形态取决于宿主 init 的 `required`。

## 数据接口依赖（后端应为 wx-auth 同款）

| 接口 | 说明 |
| --- | --- |
| `GET /api/auth/userinfo?token=` | 拉取当前用户（openid / nickname / github 等） |
| `POST /api/auth/profile` | `{action:'set-nickname', nickname}` / `{action:'unbind-github'}` |
| `GET /api/oauth/github/authorize?token=` | 发起 GitHub OAuth 绑定（新窗口），子窗 `postMessage({type:'github-bound'})` |
| `GET /api/points/balance?token=` | 积分余额 + 今日签到状态 + 广告/签到奖励额度（到账核对也是复用它，不再另开接口） |
| `POST /api/points/checkin` | `{token}` 每日签到（幂等，`granted:0` = 今天已领） |

若无这些接口，组件依然能渲染头像与登录，但设置面板的能力（积分、绑定/改名）不可用。

## License

MIT
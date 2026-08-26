# components

一套可独立发布、跨网站复用的前端组件库（Monorepo）。

> 每个组件是一个独立 NPM 包，统一 `@wu529778790/` scope，可单独安装、单独发版。

## 组件列表

| 包 | 说明 | 状态 |
| --- | --- | --- |
| [`@wu529778790/floating-qr`](./packages/floating-qr) | 公众号 + 赞赏码浮窗 | ✅ 已发布可用 |
| [`@wu529778790/floating-modal`](./packages/floating-modal) | 赞助 / 公告弹窗 | ✅ 已发布可用 |
| [`@wu529778790/user-avatar`](./packages/user-avatar) | 右上角头像账号组件（微信登录 / GitHub 绑定 / 设置面板） | 🆕 待发布 |

## 架构

```
components/
├── packages/          # 独立发布的组件包
│   └── floating-qr/   # 浮窗组件（含自身 demo/）
│       └── demo/      # 每个包的 demo 跟随包走
├── .github/workflows/ # 自动发版（push 即发布）
├── pnpm-workspace.yaml
└── tsconfig.base.json # 统一 TS 基线
```

## 开发

```bash
pnpm install          # 安装全部依赖
pnpm build            # 构建所有包（产出 dist/）
pnpm dev              # 监听模式构建
pnpm typecheck        # 类型检查全部包
```

演示站：每个包的 demo 在包内（如 `packages/floating-qr/demo/index.html`）。在线预览：[components 组件库演示](https://wu529778790.github.io/components/)；本地 `npm run preview` 后访问对应 URL。

## 发布新包

**全自动**（`.github/workflows/release.yml`）：push 到 `main` 后自动给有变更的包 `+0.0.1`（patch）并自动发布到 npm，无需任何手动操作。

- **认证方式**：npm Trusted Publishing（OIDC），**无需配置 token**（npm 已于 2025-12-09 作废 classic token）。
- **npm 端配置**（每个包一次）：npmjs.com → `package/<包名>/settings` → Trusted Publisher：
  - Provider：`GitHub Actions`；Organization/User：`wu529778790`；Repository：`components`；Workflow filename：`release.yml`
- **首次发布**：新包第一次需手动 `npm login && npm publish --access public`（trusted publisher 只能配在已存在的包上）。
- 只发布本次 push 有文件变更的包（`packages/*/` 下，含包内 demo/文档）；只改根目录文件（根 README、workflow）不会触发发布。

## 技术约定（每个包必须遵守）

- **语言**：TypeScript，输出 `.d.ts`
- **构建**：tsup，输出 `ESM + CJS + IIFE(UMD)` 三格式
- **依赖**：零运行时依赖（或极低），不绑定框架
- **样式**：CSS 变量驱动主题，样式与 JS 分离导出
- **发版**：GitHub Actions 自动 bump patch + 发布（OIDC 免 token）

## License

MIT

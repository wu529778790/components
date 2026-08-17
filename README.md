# components

一套可独立发布、跨网站复用的前端组件库（Monorepo）。

> 每个组件是一个独立 NPM 包，统一 `@wu529778790/` scope，可单独安装、单独发版。

## 组件列表

| 包 | 说明 | 状态 |
| --- | --- | --- |
| [`@wu529778790/floating-qr`](./packages/floating-qr) | 公众号 + 赞赏码浮窗 | ✅ 已发布可用 |
| … | 更多组件持续补充中 | - |

## 架构

```
components/
├── packages/          # 独立发布的组件包
│   ├── floating-qr/   # 浮窗组件
│   └── ...            # 未来组件
├── demo/              # 聚合演示站（本地直接打开即可）
├── .changeset/        # 版本管理与发版
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

演示站：本地构建后直接打开 `demo/index.html`。

## 发布新包

**发布已全自动**（`.github/workflows/release.yml`）：PR 合入 main 后 changesets 自动创建版本 PR，合入后自动 `pnpm release` 发布到 npm，全程无需手动执行命令。

- **认证方式**：npm Trusted Publishing（OIDC），**无需配置 token**（npm 已于 2025-12-09 作废 classic token）。
- **首次发布**：新包第一次发布必须手动执行一次 `npm login && npm publish --access public`（trusted publisher 只能配置在已存在的包上）。
- **npm 端配置**：每个包在 npmjs.com 的 `package/<包名>/settings` → Trusted Publisher 添加：
  - Provider：`GitHub Actions`
  - Organization/User：`wu529778790`
  - Repository：`components`
  - Workflow filename：`release.yml`

开发期手动发版：`pnpm changeset` → `pnpm version && pnpm release`。

## 技术约定（每个包必须遵守）

- **语言**：TypeScript，输出 `.d.ts`
- **构建**：tsup，输出 `ESM + CJS + IIFE(UMD)` 三格式
- **依赖**：零运行时依赖（或极低），不绑定框架
- **样式**：CSS 变量驱动主题，样式与 JS 分离导出
- **发版**：changesets 统一管理版本号与 CHANGELOG

## License

MIT

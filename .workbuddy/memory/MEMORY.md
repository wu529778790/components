# components 项目长期记忆

## 项目定位
一套可独立发布、跨网站复用的前端组件库（Monorepo）。根目录只做编排，packages/ 下每个组件是独立 NPM 包。

## 架构约定（必须遵守）
- **Monorepo**：pnpm workspace（`packages/*`）+ changesets 管理发版
- **包命名**：统一 `@wu529778790/` scope（如 `@wu529778790/floating-qr`）
- **每个包的技术栈约定**：
  - TypeScript，输出 .d.ts
  - tsup 构建：ESM + CJS + IIFE(UMD) 三格式，IIFE 需 footer 让全局可直接 new
  - 零运行时依赖，不绑定框架（原生 JS 核心）
  - 样式 CSS 变量驱动（--fq-* 风格），CSS 与 JS 分离导出（./style.css 子路径）
  - src/ 下 FloatingQR.ts + styles.css + index.ts 结构；构建产物 dist/index.*，CSS 复制为 dist/floating-qr.css
- **发版**：`pnpm changeset` → `pnpm version` → `pnpm release`（changesets publish）

## pnpm 11 注意事项（踩过的坑）
- 构建脚本白名单在 **pnpm-workspace.yaml** 顶部：`allowBuilds:\n  esbuild: true`（非 package.json 的 pnpm.onlyBuiltDependencies，pnpm 11 已废弃）
- `_tmp_*`、`*.bundled_*.mjs` 为构建临时产物，已在 .gitignore 忽略

## 组件清单
- `@wu529778790/floating-qr`：公众号+赞赏码浮窗。产品决策：关闭即完全消失、刷新必重新出现（closePersistence 默认 false）、移动端默认隐藏、固定双区。素材图片托管在用户图床（jsdmirror CDN）。

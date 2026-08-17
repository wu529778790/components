# Changelog

## 0.1.6 - 2026-08-17

### Changed
- 更新内置默认赞赏码二维码图片 URL

## 0.1.1 - 2026-08-17

### Features
- `wechat` / `donate` 二维码改为可选，缺省使用内置默认图（公众号 + 赞赏码），`new FloatingQR()` 零配置可用
- CDN 引入即自动出现浮窗（零代码），支持 `window.__FLOATING_QR_OPTIONS__` 全局配置
- `<html data-fq-auto="false">` 可禁用自动初始化（改手动控制）

### Fixes
- 移除 `publishConfig.provenance`，修复本地手动发布 EUSAGE 错误（CI 中 OIDC 发布仍自动生成 provenance）

## 0.1.0 - 2026-08-17

### Features
- 首个版本：公众号 + 赞赏码浮窗组件
- 极简样式，`--fq-*` CSS 变量主题化
- 关闭即消失，默认不记住状态（刷新必重新出现）
- 移动端默认隐藏、四方位定位、零运行时依赖
- tsup 构建 ESM + CJS + IIFE 三格式，输出 `.d.ts` 类型声明

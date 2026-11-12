# Changelog

## 0.1.0

### Features

- 首个版本：左侧广告浮窗组件，与 `floating-qr` 视觉同源（圆角卡片 / 半透明背景 / 右上角关闭 / 跟随系统深浅色）
- 多张图片广告混排，自动分隔线；`badge` 支持图片角标（`src` 必填，没有图片的条目忽略）
- 广告图固定 120×120 方形（`image-size` 可调、`image-fit` 支持 cover / contain），默认卡片宽 150px 与右侧公众号浮窗对齐
- 响应式：移动端（<768px）小一号展示（卡片 140 / 图片 112 / 距边 12）并默认落在左下角，`hide-on-mobile` 改为默认关
- 「广告」标识默认不显示（`ad-label` / `adLabel` 传文案时才出现，压首图左上角、不占行高）
- Web Component `<floating-ad>`：支持 `ad-*` 单条属性与 `ads-json` 多条的 JSON 配置
- `window.__FLOATING_AD_OPTIONS__` 全局配置；`data-fa-auto="false"` 可禁用自动注入
- 没有广告数据时不渲染任何节点（不产生空白卡片）
- 关闭后刷新重现（可选 `closePersistence` 记住状态）、六方位定位
- 图片加载失败自动降级：隐藏空图框只留文字，连文字都没有则整条隐藏
- 危险协议链接（`javascript:` / `data:` / `vbscript:`）自动忽略，文案与属性全量转义
- tsup 构建 ESM + CJS + IIFE 三格式，输出 `.d.ts` 类型声明

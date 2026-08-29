import { defineConfig } from 'tsup'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const PKG_VERSION = require('./package.json').version

/**
 * site-navbar 构建：
 * - esm / cjs：NPM 双轨（React/Vue 等框架项目）
 * - iife：原生 JS 直接 <script> 使用，全局名 SiteNavbar
 * - Web Component 单文件产物：自动注册 <site-navbar>，样式内联进 shadow DOM
 *
 * 头像不再打包进产物：<user-avatar> Web Component 由运行时动态加载
 * （默认 unpkg @latest，见 SiteNavbar.ts 的 ensureUserAvatarElement），
 * user-avatar 发版后导航栏自动跟上，无需重新构建/发布本组件。
 * 对 user-avatar 仅保留 type-only import（生成 d.ts 用，不进产物）。
 */
export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    loader: { '.css': 'text' },
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.umd.cjs' }
    }
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'SiteNavbar',
    outDir: 'dist',
    loader: { '.css': 'text' },
    footer: {
      js: `
if (typeof SiteNavbar !== "undefined") {
  SiteNavbar = SiteNavbar.default || SiteNavbar;
}`
    },
    outExtension() {
      return { js: '.umd.js' }
    }
  },
  {
    // Web Component 单文件产物：自动注册 <site-navbar>，样式内联进 shadow DOM
    entry: { 'site-navbar': 'src/web-component.ts' },
    format: ['iife'],
    outDir: 'dist',
    loader: { '.css': 'text' },
    banner: { js: `/* @wu529778790/site-navbar v${PKG_VERSION} */` },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])

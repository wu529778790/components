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
 * 将 @wu529778790/user-avatar 一并打包进产物（noExternal），
 * 因此用户只需引入 site-navbar 一份 JS，头像能力即开箱即用。
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
    noExternal: ['@wu529778790/user-avatar'],
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
    noExternal: ['@wu529778790/user-avatar'],
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
    noExternal: ['@wu529778790/user-avatar'],
    banner: { js: `/* @wu529778790/site-navbar v${PKG_VERSION} */` },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])

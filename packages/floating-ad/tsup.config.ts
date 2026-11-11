import { defineConfig } from 'tsup'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const PKG_VERSION = require('./package.json').version

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.umd.cjs' }
    }
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'FloatingAd',
    outDir: 'dist',
    footer: {
      // 广告浮窗没有默认素材：只有显式提供全局配置时才自动注入，
      // 避免出现一张空白广告卡片
      js: `
if (typeof FloatingAd !== "undefined") {
  FloatingAd = FloatingAd.default || FloatingAd;
  var faDoc = document.documentElement;
  var faDisabled = faDoc && faDoc.getAttribute("data-fa-auto") === "false";
  if (!faDisabled && window.__FLOATING_AD_OPTIONS__ && !window.__floatingAdAutoInit__) {
    window.__floatingAdAutoInit__ = true;
    new FloatingAd(window.__FLOATING_AD_OPTIONS__);
  }
}`
    },
    outExtension() {
      return { js: '.umd.js' }
    }
  },
  {
    // Web Component 单文件产物：自动注册 <floating-ad>，样式内联进 shadow DOM
    entry: { 'floating-ad': 'src/web-component.ts' },
    format: ['iife'],
    outDir: 'dist',
    loader: { '.css': 'text' },
    banner: { js: `/* @wu529778790/floating-ad v${PKG_VERSION} */` },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])

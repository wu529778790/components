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
    globalName: 'FloatingModal',
    outDir: 'dist',
    footer: {
      js: `
if (typeof FloatingModal !== "undefined") {
  FloatingModal = FloatingModal.default || FloatingModal;
  var fmDoc = document.documentElement;
  var fmDisabled = fmDoc && fmDoc.getAttribute("data-fm-auto") === "false";
  if (!fmDisabled && !window.__floatingModalAutoInit__) {
    window.__floatingModalAutoInit__ = true;
    new FloatingModal(window.__FLOATING_MODAL_OPTIONS__ || undefined);
  }
}`
    },
    outExtension() {
      return { js: '.umd.js' }
    }
  },
  {
    // Web Component 单文件产物：自动注册 <floating-modal>，样式内联进 shadow DOM
    entry: { 'floating-modal': 'src/web-component.ts' },
    format: ['iife'],
    outDir: 'dist',
    loader: { '.css': 'text' },
    banner: { js: `/* @wu529778790/floating-modal v${PKG_VERSION} */` },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])

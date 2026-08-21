import { defineConfig } from 'tsup'

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
    globalName: 'FloatingQR',
    outDir: 'dist',
    footer: {
      js: `
if (typeof FloatingQR !== "undefined") {
  FloatingQR = FloatingQR.default || FloatingQR;
  var fqDoc = document.documentElement;
  var fqDisabled = fqDoc && fqDoc.getAttribute("data-fq-auto") === "false";
  if (!fqDisabled && !window.__floatingQrAutoInit__) {
    window.__floatingQrAutoInit__ = true;
    new FloatingQR(window.__FLOATING_QR_OPTIONS__ || undefined);
  }
}`
    },
    outExtension() {
      return { js: '.umd.js' }
    }
  },
  {
    // Web Component 单文件产物：自动注册 <floating-qr>，样式内联进 shadow DOM
    entry: { 'floating-qr': 'src/web-component.ts' },
    format: ['iife'],
    outDir: 'dist',
    loader: { '.css': 'text' },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])

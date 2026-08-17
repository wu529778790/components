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
  }
])

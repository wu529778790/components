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
      js: 'if (typeof FloatingQR !== "undefined") { FloatingQR = FloatingQR.default || FloatingQR; }'
    },
    outExtension() {
      return { js: '.umd.js' }
    }
  }
])

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
    globalName: 'FloatingUnlock',
    outDir: 'dist',
    outExtension() {
      return { js: '.umd.js' }
    }
  },
  {
    // Web Component 单文件产物：自动注册 <floating-unlock>，样式内联进 shadow DOM
    entry: { 'floating-unlock': 'src/web-component.ts' },
    format: ['iife'],
    outDir: 'dist',
    loader: { '.css': 'text' },
    banner: { js: `/* @wu529778790/floating-unlock v${PKG_VERSION} */` },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])
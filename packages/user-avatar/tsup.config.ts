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
    loader: { '.css': 'text' },
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.umd.cjs' }
    }
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'UserAvatar',
    outDir: 'dist',
    loader: { '.css': 'text' },
    footer: {
      js: `
if (typeof UserAvatar !== "undefined") {
  UserAvatar = UserAvatar.default || UserAvatar;
}`
    },
    outExtension() {
      return { js: '.umd.js' }
    }
  },
  {
    // Web Component 单文件产物：自动注册 <user-avatar>，样式内联进 shadow DOM
    entry: { 'user-avatar': 'src/web-component.ts' },
    format: ['iife'],
    outDir: 'dist',
    loader: { '.css': 'text' },
    banner: { js: `/* @wu529778790/user-avatar v${PKG_VERSION} */` },
    outExtension() {
      return { js: '.wc.js' }
    }
  }
])
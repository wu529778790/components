/**
 * CDN 发布脚本：
 *   1. 构建全部包（pnpm -r build）
 *   2. 复制各包 dist/*.wc.js 到仓库根 cdn/
 *   3. esbuild 聚合 widgets.js（一行引入全部组件）
 *   4. git add + commit（不 push，push 由用户手动执行）
 *
 * 用法：pnpm cdn
 */
import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PACKAGES = path.join(ROOT, 'packages')
const CDN = path.join(ROOT, 'cdn')

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts })
}

async function main() {
  // 1. 构建全部包  console.log('\n[1/4] 构建全部包 ...')
  run('pnpm -r --filter "./packages/*" build')

  // 2. 复制 *.wc.js 到 cdn/
  console.log('[2/4] 复制 Web Component 产物到 cdn/ ...')
  mkdirSync(CDN, { recursive: true })
  let copied = 0
  for (const pkg of readdirSync(PACKAGES)) {
    const dist = path.join(PACKAGES, pkg, 'dist')
    if (!existsSync(dist)) continue
    for (const f of readdirSync(dist)) {
      if (f.endsWith('.wc.js')) {
        cpSync(path.join(dist, f), path.join(CDN, f))
        copied++
        console.log(`      ${f}`)
      }
    }
  }
  if (copied === 0) console.log('      (没有找到 *.wc.js 产物)')

  // 3. 聚合 widgets.js
  console.log('[3/4] 聚合 widgets.js ...')
  await build({
    entryPoints: [path.join(ROOT, 'scripts', 'widgets-entry.ts')],
    bundle: true,
    format: 'iife',
    minify: true,
    treeShaking: false,
    loader: { '.css': 'text' },
    outfile: path.join(CDN, 'widgets.js'),
    logLevel: 'info'
  })

  // 4. git commit（仅当 cdn/ 有变化）
  console.log('[4/4] git commit ...')
  const changed = execSync('git status --porcelain cdn/ scripts/widgets-entry.ts', {
    cwd: ROOT
  })
    .toString()
    .trim()
  if (!changed) {
    console.log('      cdn/ 无变化，跳过 commit')
  } else {
    const date = new Date().toISOString().slice(0, 10)
    run(`git add cdn/ scripts/widgets-entry.ts && git commit -m "chore(cdn): update web component bundles (${date})"`)
  }

  console.log('\n✅ CDN 产物就绪：')
  for (const f of readdirSync(CDN)) console.log(`   cdn/${f}`)
  console.log('\n（已 commit，未 push —— 确认无误后自行 push 即全站生效）')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

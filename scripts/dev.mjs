#!/usr/bin/env node
// 本地开发一条龙：`npm run dev` 同时做两件事——
//   1. 各包 tsup --watch 编译监听（原 dev 行为不变）
//   2. 起一个 demo 静态服务（端口 8317），日志打印各包 demo 地址
// Ctrl+C 整组退出，不留 tsup 孤儿进程。
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const PORT = 8317;
const HOST = `http://localhost:${PORT}`;

// ---------- 找出各包 demo 页 ----------
const demos = readdirSync(join(ROOT, 'packages'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(ROOT, 'packages', d.name, 'demo', 'index.html')))
  .map((d) => d.name);

// ---------- demo 静态服务（托管仓库根目录，替代 python http.server） ----------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, HOST).pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = normalize(join(ROOT, pathname));
    if (file !== ROOT && !file.startsWith(ROOT + sep)) {
      res.writeHead(403).end();
      return;
    }
    if (!existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404).end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store', // dev 服务禁缓存，改完代码刷新即生效
    });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(500).end();
  }
});

server.once('error', (err) => {
  console.warn(`⚠️  端口 ${PORT} 被占用（${err.code}），demo 服务没起来，编译监听不受影响。`);
  console.warn(`   释放端口：lsof -ti:${PORT} | xargs kill`);
});

server.listen(PORT, () => {
  console.log(`\n🚀 demo 预览已启动（Ctrl+C 退出）：`);
  for (const name of demos) {
    console.log(`   ${name.padEnd(16)}${HOST}/packages/${name}/demo/index.html`);
  }
  console.log('');
});

// ---------- 编译监听（原 dev 脚本逻辑） ----------
const isWin = process.platform === 'win32';
const watch = spawn('pnpm', ['-r', '--parallel', '--filter', './packages/*', 'dev'], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: isWin,
  detached: !isWin, // POSIX 下放进独立进程组，退出时整组回收
});

let exiting = false;
function shutdown() {
  if (exiting) return;
  exiting = true;
  try {
    if (watch.pid) isWin ? watch.kill() : process.kill(-watch.pid, 'SIGTERM');
  } catch {}
  server.close();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

watch.on('exit', (code) => {
  if (!exiting) {
    console.log(`\n编译监听已退出（code ${code ?? 0}），demo 服务一并关闭。`);
    server.close();
    process.exit(code ?? 0);
  }
});

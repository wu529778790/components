#!/usr/bin/env node
// 本地开发一条龙：`npm run dev` 同时做两件事——
//   1. 各包 tsup --watch 编译监听（原 dev 行为不变）
//   2. 起一个 demo 静态服务（端口 8317），日志打印本机 + 内网（手机同 WiFi 可开）地址
// Ctrl+C 整组退出，不留 tsup 孤儿进程。
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { networkInterfaces } from 'node:os';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const PORT = 8317;
const LOCAL_URL = `http://localhost:${PORT}`;

// ---------- 找出各包 demo 页 ----------
const demos = readdirSync(join(ROOT, 'packages'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(ROOT, 'packages', d.name, 'demo', 'index.html')))
  .map((d) => d.name);

// ---------- 内网地址（手机同一 WiFi 下访问） ----------
function lanAddresses() {
  const list = [];
  for (const addrs of Object.values(networkInterfaces())) {
    for (const a of addrs ?? []) {
      // Node 18 是数字 4，Node 20+ 是 'IPv4'，两种都兼容
      if (a.family !== 'IPv4' && a.family !== 4) continue;
      if (a.internal) continue;
      list.push(a.address);
    }
  }
  // 私网段优先：192.168.x > 10.x > 172.16-31.x > 其他（虚拟网卡）
  const rank = (ip) =>
    ip.startsWith('192.168.')
      ? 0
      : ip.startsWith('10.')
        ? 1
        : /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
          ? 2
          : 3;
  return list.sort((a, b) => rank(a) - rank(b));
}

/** 每次打印都重新取，换 WiFi / 拔插网线后地址自动跟着变 */
function lanUrl() {
  const [ip] = lanAddresses();
  return ip ? `http://${ip}:${PORT}` : null;
}

// ---------- 地址横幅 ----------
function printBanner() {
  const lan = lanUrl();
  const lines = [
    '',
    '🚀 demo 预览已启动（Ctrl+C 退出）',
    '',
    `   本机   ${LOCAL_URL}/`,
    lan
      ? `   手机   ${lan}/        ← 同一 WiFi，手机浏览器打开这个`
      : '   手机   未检测到内网地址（电脑没连 WiFi / 没有可用网卡）',
    '',
    '   演示页（拼在地址后面，也可以直接打开上面的根地址点卡片）：',
  ];
  for (const name of demos) {
    lines.push(`     ${name.padEnd(16)}/packages/${name}/demo/index.html`);
  }
  lines.push('');
  process.stdout.write(lines.join('\n') + '\n');
}

/** 编译日志会把上面的横幅刷走，打断后重印一行，保证地址永远在最后 */
function printShortcut() {
  const lan = lanUrl();
  const parts = [`本机 ${LOCAL_URL}/`];
  if (lan) parts.push(`手机 ${lan}/`);
  process.stdout.write(`\n👉 ${parts.join('   ')}\n`);
}

let reprintTimer = null;
function scheduleShortcut() {
  clearTimeout(reprintTimer);
  reprintTimer = setTimeout(printShortcut, 600);
}

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
    let pathname = decodeURIComponent(new URL(req.url, LOCAL_URL).pathname);
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

// 不指定 host → 监听全部网卡（IPv4/IPv6 都收），手机才能通过内网 IP 访问
server.listen(PORT, () => {
  printBanner();
});

// ---------- 编译监听（原 dev 脚本逻辑） ----------
const isWin = process.platform === 'win32';
const watch = spawn('pnpm', ['-r', '--parallel', '--filter', './packages/*', 'dev'], {
  cwd: ROOT,
  stdio: ['inherit', 'pipe', 'pipe'], // 接管输出，好在每次编译完把地址补回最后一行
  shell: isWin,
  detached: !isWin, // POSIX 下放进独立进程组，退出时整组回收
});

function forward(src, dest) {
  if (!src) return;
  src.setEncoding('utf8');
  src.on('data', (chunk) => {
    dest.write(chunk);
    scheduleShortcut();
  });
}
forward(watch.stdout, process.stdout);
forward(watch.stderr, process.stderr);

let exiting = false;
function shutdown() {
  if (exiting) return;
  exiting = true;
  clearTimeout(reprintTimer);
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

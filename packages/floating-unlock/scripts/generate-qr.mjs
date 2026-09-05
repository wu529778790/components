/**
 * 一次性出码脚本：生成「不带参数」的固定小程序激励页码图片。
 *
 * 背景：floating-unlock 组件静态化后不再调后端 create 接口出码，二维码改为
 * 一张写死 URL 的图片（指向小程序激励页 pages/reward-unlock/index，无 scene
 * 参数）。图片托管在用户的 GitHub 图床仓库（img.shenzjd.com），组件零请求后端。
 *
 * 什么时候需要重新跑：
 *   - 激励页路径变更
 *   - 之前出的是 trial 体验版码，正式发布后换 release 码
 *
 * 用法（凭证读取自本机 wx-auth-full/.env，不落库不提交）：
 *   node scripts/generate-qr.mjs [/path/to/wx-auth-full]
 *
 * 产物：assets/reward-unlock-qr.jpg —— 手动拷入图床仓库（img.shenzjd.com）
 * 提交推送后，组件里的 DEFAULT_QR_SRC 即可通过 jsdmirror CDN 访问。
 *
 * 安全说明：走 stable_token（默认不强制刷新，不会踢掉线上正在用的 token），
 * 出码用 wxacode.get（指定页面路径，不支持 scene 参数 —— 正好符合静态化需求）。
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const wxAuthDir = process.argv[2] || resolve(here, '../../../../wx-auth-full')

// ---- 读取凭证（wx-auth-full/.env） ----
const envText = readFileSync(resolve(wxAuthDir, '.env'), 'utf8')
const readEnv = (key) => {
  const m = envText.match(new RegExp(`^${key}=(.*)$`, 'm'))
  if (!m) throw new Error(`wx-auth-full/.env 缺少 ${key}`)
  return m[1].trim()
}
const appid = readEnv('NUXT_MP_APPID')
const secret = readEnv('NUXT_MP_SECRET')

// 小程序激励页路径（与 wx-auth 的 NUXT_MP_REWARD_PAGE 保持一致）
const REWARD_PAGE = 'pages/reward-unlock/index'
/** 码的版本：release（生产）| trial（体验版，联调用） */
const ENV_VERSION = 'release'
/** 码的边长 px（与 wx-auth 线上动态出码一致：430） */
const WIDTH = 430

// ---- 1. stable_token 拿全局 access_token（不强制刷新，不影响线上） ----
const tokenRes = await fetch('https://api.weixin.qq.com/cgi-bin/stable_token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ grant_type: 'client_credential', appid, secret })
})
const tokenData = await tokenRes.json()
if (!tokenData.access_token) {
  throw new Error(`stable_token 失败: errcode=${tokenData.errcode} errmsg=${tokenData.errmsg}`)
}

// ---- 2. wxacode.get 出不带参数的固定页码 ----
const qrRes = await fetch(
  `https://api.weixin.qq.com/wxa/getwxacode?access_token=${encodeURIComponent(tokenData.access_token)}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: REWARD_PAGE, env_version: ENV_VERSION, width: WIDTH, check_path: false })
  }
)
const contentType = qrRes.headers.get('content-type') || ''
if (contentType.includes('application/json')) {
  const err = await qrRes.json()
  throw new Error(`getwxacode 失败: errcode=${err.errcode} errmsg=${err.errmsg}`)
}
const imageBuffer = Buffer.from(await qrRes.arrayBuffer())

// ---- 3. 写出图片文件 ----
const outDir = resolve(here, '../assets')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'reward-unlock-qr.jpg')
writeFileSync(outPath, imageBuffer)
console.log(
  `✅ 已生成 ${outPath}\n   ${REWARD_PAGE}（${ENV_VERSION}，${WIDTH}px，${(imageBuffer.length / 1024).toFixed(1)} KB）\n   下一步：拷入图床仓库 img.shenzjd.com 提交推送，CDN URL 即生效。`
)

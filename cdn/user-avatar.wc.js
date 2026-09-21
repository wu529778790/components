/* @wu529778790/user-avatar v0.1.29 */
"use strict";
(() => {
  // src/wx-auth.ts
  function getWindowSdk() {
    if (typeof window !== "undefined") {
      return window.WxAuth;
    }
    return void 0;
  }

  // src/points.ts
  var TIMEOUT_MS = 8e3;
  function num(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }
  function endpoint(base, path) {
    const b = (base || "").trim().replace(/\/+$/, "");
    return `${b || window.location.origin}${path}`;
  }
  async function call(url, init) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      const data = await res.json().catch(() => null);
      return { ok: res.ok, status: res.status, data };
    } catch {
      return { ok: false, status: 0, data: null };
    } finally {
      clearTimeout(timer);
    }
  }
  async function fetchPoints(base, token) {
    const r = await call(
      endpoint(base, `/api/points/balance?token=${encodeURIComponent(token)}`),
      { method: "GET", headers: { accept: "application/json" } }
    );
    if (!r.ok || !r.data || r.data.error) return null;
    if (!Number.isFinite(Number(r.data.balance))) return null;
    return {
      balance: num(r.data.balance),
      checkedIn: r.data.checkedIn === true,
      adReward: num(r.data.adReward, 10),
      checkinReward: num(r.data.checkinReward, 10),
      adsRemaining: num(r.data.adsRemaining)
    };
  }
  async function checkinPoints(base, token) {
    var _a;
    const r = await call(
      endpoint(base, "/api/points/checkin"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      }
    );
    if (!r.ok || !((_a = r.data) == null ? void 0 : _a.ok)) return null;
    const balance = Number(r.data.balance);
    return {
      granted: num(r.data.granted),
      balance: r.data.balance === null || r.data.balance === void 0 || !Number.isFinite(balance) ? null : balance
    };
  }

  // src/styles.css
  var styles_default = `/* ============================================================
  user-avatar \u7EC4\u4EF6\u6837\u5F0F
  \u5168\u90E8\u4E3B\u9898\u901A\u8FC7 --ua-* CSS \u53D8\u91CF\u9A71\u52A8\uFF0C\u76F4\u63A5\u8986\u76D6\u53D8\u91CF\u5373\u53EF\u6362\u80A4\u3002

  \u6DF1\u6D45\u8272\u81EA\u9002\u5E94\uFF1A
  - \u9ED8\u8BA4\u503C\u7528 light-dark(\u6D45\u8272, \u6DF1\u8272)\uFF0C\u989C\u8272\u968F\u5BBF\u4E3B\u9875\u9762\u58F0\u660E\u7684 color-scheme \u5207\u6362\uFF1A
    \u5BBF\u4E3B\u58F0\u660E color-scheme: light / dark \u65F6\u7EC4\u4EF6\u5BF9\u5E94\u4F7F\u7528\u6D45\u8272 / \u6DF1\u8272\u4E3B\u9898\uFF1B
    \u5BBF\u4E3B\u672A\u58F0\u660E\u65F6\u7EE7\u627F UA \u9ED8\u8BA4\uFF0C\u8DDF\u968F\u7CFB\u7EDF prefers-color-scheme\uFF1B
  - \u4E0D\u652F\u6301 light-dark() \u7684\u8001\u6D4F\u89C8\u5668\uFF0C\u7531\u4E0B\u65B9 @media (prefers-color-scheme: dark)
    \u515C\u5E95\u4E3A\u7EAF\u6DF1\u8272\u503C\uFF1B
  - \u7528\u6237\u663E\u5F0F\u4F20\u5165 theme / \u8986\u76D6 --ua-* \u53D8\u91CF\u65F6\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u4E0D\u968F\u7CFB\u7EDF\u53D8\u5316\u3002
  ============================================================ */

/* \u53D8\u91CF\u9ED8\u8BA4\u503C\u540C\u65F6\u4F5C\u7528\u4E8E .ua-root \u4E0E portal \u51FA\u53BB\u7684 .ua-menu / .ua-mask /
   .ua-dialog\uFF08\u8131\u79BB .ua-root \u540E\u65E0\u6CD5\u7EE7\u627F\u5176\u53D8\u91CF\uFF0C\u987B\u81EA\u8EAB\u6301\u6709\u9ED8\u8BA4\u503C\uFF1B
   JS \u6CE8\u5165\u7684\u7528\u6237\u4E3B\u9898\u53D8\u91CF\u4F18\u5148\u7EA7\u66F4\u9AD8\uFF09 */
.ua-root,
.ua-menu,
.ua-mask,
.ua-dialog {
  /* ===== \u4E3B\u9898\u53D8\u91CF\uFF08\u9ED8\u8BA4\u503C\uFF0C\u53EF\u5728\u4EFB\u610F\u7236\u7EA7\u8986\u76D6\uFF09 ===== */
  --ua-btn-bg: light-dark(#ffffff, #262a30);
  --ua-size: 2.5rem;
  --ua-accent: light-dark(#1f2328, #e6edf3);
  --ua-btn-border: light-dark(rgba(27, 31, 36, 0.12), rgba(255, 255, 255, 0.14));
  --ua-radius: 16px;
  --ua-bg: light-dark(#ffffff, #1c1e22);
  --ua-text: light-dark(#1f2328, #e6edf3);
  --ua-sub: light-dark(#656d76, #8b949e);
  --ua-overlay: light-dark(rgba(31, 35, 40, 0.45), rgba(0, 0, 0, 0.6));
  --ua-danger: light-dark(#dc2626, #f85149);
  --ua-success: light-dark(#1a7f37, #3fb950);

  /* \u56FE\u6807\u5C3A\u5BF8 */
  --ua-icon: 1rem;
}

/* \u4E0D\u652F\u6301 light-dark() \u7684\u6D4F\u89C8\u5668\uFF1A\u6DF1\u8272\u7CFB\u7EDF\u4E0B\u7528\u7EAF\u6DF1\u8272\u503C\u515C\u5E95 */
@media (prefers-color-scheme: dark) {
  .ua-root,
  .ua-menu,
  .ua-mask,
  .ua-dialog {
    --ua-btn-bg: #262a30;
    --ua-accent: #e6edf3;
    --ua-btn-border: rgba(255, 255, 255, 0.14);
    --ua-bg: #1c1e22;
    --ua-text: #e6edf3;
    --ua-sub: #8b949e;
    --ua-overlay: rgba(0, 0, 0, 0.6);
    --ua-danger: #f85149;
    --ua-success: #3fb950;
  }
}

.ua-root svg,
.ua-menu svg,
.ua-mask svg {
  width: 1.2em;
  height: 1.2em;
  flex-shrink: 0;
}

.ua-root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  /* \u4E0D\u786C\u7F16\u7801 color-scheme\uFF1A\u7EE7\u627F\u5BBF\u4E3B\u9875\u9762\u58F0\u660E\u7684\u914D\u8272\u65B9\u6848\uFF0C
     \u5BBF\u4E3B\u672A\u58F0\u660E\u65F6\u7EE7\u627F UA \u9ED8\u8BA4\uFF0C\u8DDF\u968F\u7CFB\u7EDF prefers-color-scheme\u3002 */
  line-height: 1.5;
}

.ua-root * {
  box-sizing: border-box;
}

/* ==================== \u5934\u50CF\u6309\u94AE ==================== */

.ua-widget {
  position: relative;
  /* \u7528 block \u800C\u975E inline-block\uFF1Ainline-block \u9ED8\u8BA4 vertical-align: baseline\uFF0C
     \u5F53\u6309\u94AE\u5185\u662F block \u7684 <img>\uFF08\u5DF2\u767B\u5F55\u5934\u50CF\uFF09\u65F6\u57FA\u7EBF\u4F1A\u53D6\u5E95\u90E8\u8FB9\u7F18\uFF0C\u6574\u4E2A\u6309\u94AE
     \u88AB\u884C\u6846\u57FA\u7EBF\u300C\u62AC\u4E0A\u53BB\u300D\u5BFC\u81F4\u5782\u76F4\u504F\u4E0A\uFF1Bblock \u4E0D\u53C2\u4E0E\u884C\u5185\u57FA\u7EBF\u5BF9\u9F50\u3002 */
  display: block;
}

.ua-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--ua-size);
  height: var(--ua-size);
  padding: 0;
  border: 1px solid var(--ua-btn-border);
  border-radius: 50%;
  background: var(--ua-btn-bg);
  color: var(--ua-sub);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
  -webkit-tap-highlight-color: transparent;
}

.ua-avatar:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border-color: var(--ua-accent);
}

.ua-avatar:active {
  transform: scale(0.96);
}

.ua-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease;
}

/* \u767B\u5F55\u6821\u9A8C\u4E2D\uFF1A\u9AA8\u67B6\u8109\u51B2\u5360\u4F4D\uFF08\u4E0D\u54CD\u5E94 hover\u3001\u4E0D\u53EF\u70B9\u51FB\uFF09 */
.ua-avatar-checking {
  cursor: default;
}
.ua-avatar-checking:hover {
  border-color: var(--ua-btn-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.ua-avatar-skeleton {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: color-mix(in srgb, var(--ua-text) 12%, var(--ua-bg));
  animation: ua-skeleton-pulse 1.4s ease-in-out infinite;
}

/* \u5DF2\u767B\u5F55\u4F46\u5934\u50CF\u56FE\u7247\u5C1A\u672A\u52A0\u8F7D\uFF1A\u6309\u94AE\u6574\u4F53\u8109\u51B2\uFF0C\u52A0\u8F7D\u5B8C\u6210\u540E\u6DE1\u5165 */
.ua-avatar-loading-img {
  animation: ua-skeleton-pulse 1.4s ease-in-out infinite;
  background: color-mix(in srgb, var(--ua-text) 12%, var(--ua-btn-bg));
}
.ua-avatar-loading-img .ua-avatar-img {
  opacity: 0;
}

@keyframes ua-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

.ua-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--ua-accent), color-mix(in srgb, var(--ua-accent) 60%, #000));
  color: #fff;
  font-size: calc(var(--ua-size) * 0.45);
  font-weight: 600;
}

/* \u672A\u767B\u5F55\uFF1A\u5706\u5F62\u300C\u767B\u5F55\u300D\u6309\u94AE\u6587\u5B57 */
.ua-avatar-login {
  font-size: calc(var(--ua-size) * 0.34);
  font-weight: 600;
  line-height: 1;
  color: var(--ua-accent);
  letter-spacing: 0.04em;
  user-select: none;
  white-space: nowrap;
}

/* \u672A\u767B\u5F55\u6309\u94AE hover\uFF1A\u4E3B\u9898\u8272\u63CF\u8FB9 + \u6DE1\u586B\u5145 */
.ua-avatar-unauth:hover {
  border-color: var(--ua-accent);
  background: color-mix(in srgb, var(--ua-accent) 6%, var(--ua-btn-bg));
}

.ua-icon {
  width: var(--ua-icon);
  height: var(--ua-icon);
  flex-shrink: 0;
}

.ua-icon-user {
  width: calc(var(--ua-size) * 0.5);
  height: calc(var(--ua-size) * 0.5);
}

/* ==================== \u4E0B\u62C9\u83DC\u5355 ==================== */

.ua-menu {
  position: absolute;
  top: calc(var(--ua-size) + 0.5rem);
  right: 0;
  min-width: 12rem;
  /* portal \u5230 body \u540E\u7EE7\u627F body \u7684 color-scheme\uFF08\u5BBF\u4E3B\u58F0\u660E light/dark
     \u6216 UA \u9ED8\u8BA4\u8DDF\u968F\u7CFB\u7EDF\uFF09\uFF0Clight-dark() \u53D8\u91CF\u968F\u4E4B\u5207\u6362 */
  background: var(--ua-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: var(--ua-radius);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  animation: ua-pop 0.16s ease;
}

@keyframes ua-pop {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.ua-menu-user {
  padding: 0.6rem 0.9rem;
  background: color-mix(in srgb, var(--ua-accent) 6%, var(--ua-bg));
  border-bottom: 1px solid var(--ua-btn-border);
}

.ua-menu-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.ua-menu-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: none;
  background: transparent;
  color: var(--ua-text);
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
}

.ua-menu-item span {
  flex: 1;
}

.ua-menu-item:hover {
  background: color-mix(in srgb, var(--ua-text) 6%, var(--ua-bg));
}

.ua-menu-item-danger {
  color: var(--ua-danger);
  border-top: 1px solid var(--ua-btn-border);
}

.ua-menu-item-danger:hover {
  background: color-mix(in srgb, var(--ua-danger) 8%, var(--ua-bg));
}

/* ==================== \u8BBE\u7F6E\u5F39\u7A97\uFF08\u906E\u7F69 + \u5BF9\u8BDD\u6846\uFF09 ==================== */

.ua-mask {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  /* \u540C .ua-menu\uFF1Aportal \u5230 body \u540E\u7EE7\u627F body \u7684 color-scheme */
  background: var(--ua-overlay);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: ua-fade-in 0.3s ease-out both;
}

@keyframes ua-fade-in {
  from {
    opacity: 0;
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
  }
  to {
    opacity: 1;
  }
}

.ua-dialog {
  width: 100%;
  max-width: 28rem;
  /* \u9AD8\u5EA6\u8D34\u8FD1\u89C6\u53E3\uFF0C\u4E3B\u4F53\u5185\u90E8\u7559\u51FA\u53EF\u6EDA\u52A8\u4F59\u91CF\uFF1B\u540C\u65F6\u8BA9\u5F39\u7A97\u5728\u684C\u9762\u7AEF\u4E5F\u4E0D\u8D85\u51FA */
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  background: var(--ua-bg);
  border-radius: 18px;
  /* portal \u5230 body \u540E\u7EE7\u627F body \u7684 color-scheme */
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 light-dark(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.06));
  animation: ua-slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes ua-slide-up {
  from {
    opacity: 0;
    transform: translateY(32px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.ua-dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* \u7D27\u51D1\uFF1A\u6807\u9898\u5934\u90E8\u4E0A\u4E0B\u95F4\u8DDD\u4ECE ~44px \u538B\u7F29\u5230 ~36px */
  padding: 1.1rem 1.5rem 0.9rem;
  border-bottom: 1px solid var(--ua-btn-border);
}

.ua-dialog-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ua-text);
  letter-spacing: -0.02em;
}

.ua-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: var(--ua-sub);
  cursor: pointer;
  transition: all 0.25s ease;
}

.ua-close:hover {
  background: color-mix(in srgb, var(--ua-text) 6%, var(--ua-bg));
  color: var(--ua-text);
  transform: rotate(90deg) scale(1.05);
}

.ua-close svg {
  width: 18px;
  height: 18px;
}

.ua-dialog-body {
  /* \u7D27\u51D1\uFF1A\u5DE6\u53F3\u4E0A\u4E0B padding \u51CF\u5C0F\u5230 1.1rem / 1.35rem\uFF1B\u533A\u5757\u95F4\u8DDD\u4ECE 1.5rem \u6536\u5230 0.85rem */
  padding: 1.1rem 1.35rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

/* ===== \u7528\u6237\u4FE1\u606F\u5361\u7247 ===== */
.ua-profile-card {
  background: var(--ua-bg);
  border-radius: 14px;
  /* \u7D27\u51D1\uFF1A\u5185\u8FB9\u8DDD 1.5rem \u2192 0.75rem / 0.9rem */
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--ua-btn-border);
  position: relative;
  overflow: hidden;
}

.ua-profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.ua-profile-header {
  display: flex;
  align-items: center;
  /* \u7D27\u51D1\uFF1A\u5934\u50CF\u4E0E\u53F3\u4FA7\u4FE1\u606F\u95F4\u8DDD 1.1rem \u2192 0.9rem */
  gap: 0.9rem;
}

.ua-big-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 3px solid var(--ua-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.ua-big-avatar:hover {
  transform: scale(1.05);
}

.ua-big-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
}

.ua-profile-info {
  min-width: 0;
  flex: 1;
  /* \u6587\u5B57\u6574\u7EC4\u9760\u53F3\uFF1A\u6635\u79F0\u4E0E\u5FBD\u6807\u53F3\u5BF9\u9F50\uFF0C\u4E0E\u660E\u4FE1\u7247\u533A\u53F3\u4FA7 OPENID \u547C\u5E94 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ua-user-name {
  max-width: 100%;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.ua-user-sub {
  font-size: 0.78rem;
  color: var(--ua-sub);
  margin-top: 0.25rem;
}

/* \u672C\u7AD9\u7B2C N \u4F4D\u7528\u6237\uFF08userSeq\uFF09\u5FBD\u6807 */
.ua-user-seq {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--ua-accent);
  background: color-mix(in srgb, var(--ua-text) 6%, transparent);
  border: 1px solid var(--ua-btn-border);
  border-radius: 999px;
  padding: 0.12rem 0.55rem;
  margin-top: 0.35rem;
  letter-spacing: 0.02em;
}

/* \u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u5DE6 = \u7F51\u7AD9\u54C1\u724C\u300C\u795E\u65CF\u4E5D\u5E1D\u300D\uFF0C\u53F3 = \u7528\u6237 OPENID
   \u6574\u4F53\u5DE6\u53F3\u4E24\u7AEF\u5BF9\u9F50\uFF0C\u7528\u6D45\u8272\u5185\u5D4C\u5E95 + dashed \u9876\u7EBF \u8425\u9020\u660E\u4FE1\u7247"\u6295\u9012\u4FE1\u606F\u533A"\u5C42\u6B21 */
.ua-profile-postcard {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.7rem;
  /* \u8D1F margin \u8BA9\u6D45\u5E95\u5EF6\u4F38\u5230\u5361\u7247\u5DE6\u53F3\u8FB9\u7F18\uFF0C\u4E0E\u5361\u7247\u5E95\u90E8\u5706\u89D2\u5BF9\u9F50 */
  margin: 0.7rem -0.9rem -0.75rem;
  padding: 0.6rem 0.9rem;
  /* \u660E\u663E\u53EF\u611F\u77E5\u7684\u6D45\u5E95\uFF1A\u4E0E\u4E0A\u65B9\u767D\u8272\u5934\u50CF\u533A\u660E\u786E\u5206\u5C42\uFF0C\u5F62\u6210\u300C\u660E\u4FE1\u7247\u6295\u9012\u680F\u300D */
  background: color-mix(in srgb, var(--ua-text) 7%, var(--ua-bg));
  border-top: 1px dashed var(--ua-btn-border);
  border-radius: 0 0 14px 14px;
  min-width: 0;
}

.ua-postcard-brand {
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-postcard-id {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "SF Mono", monospace;
  font-size: 0.74rem;
  color: var(--ua-sub);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  user-select: all;
  letter-spacing: 0.01em;
}

/* ===== \u5B57\u6BB5\u7EC4 ===== */
.ua-field-group {
  display: flex;
  flex-direction: column;
  /* \u7D27\u51D1\uFF1A\u5B57\u6BB5\u7EC4\u5185\u90E8\u95F4\u8DDD 0.85rem \u2192 0.45rem */
  gap: 0.45rem;
}

.ua-field-label {
  font-size: 0.78rem;
  color: var(--ua-sub);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* \u533A\u5757 */
.ua-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ua-section-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-section-title .ua-icon {
  width: 16px;
  height: 16px;
  color: #656d76;
}

/* GitHub \u7ED1\u5B9A\uFF1A\u5355\u884C\u5DE6\u53F3\u7ED3\u6784
   \u5DE6\u4FA7\u56FA\u5B9A\uFF1AGitHub \u56FE\u6807 +\u300CGitHub\u300D\u6807\u9898\uFF1B
   \u53F3\u4FA7\u72B6\u6001\u533A\uFF1A\u672A\u7ED1\u5B9A \u2192\u300C\u7ED1\u5B9A GitHub\u300D\u6309\u94AE\uFF1B\u5DF2\u7ED1\u5B9A \u2192 GitHub \u540D\u5B57 + \u89E3\u7ED1\u6309\u94AE */
.ua-gh-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.5rem 0.85rem;
  background: var(--ua-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
}

.ua-gh-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  min-width: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-gh-title .ua-icon {
  width: 18px;
  height: 18px;
  color: #656d76;
  flex-shrink: 0;
}

/* \u53F3\u4FA7\u72B6\u6001\u533A\uFF1A\u540D\u5B57 / \u6309\u94AE */
.ua-gh-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.ua-gh-name {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ua-badge {
  font-size: 0.65rem;
  font-weight: 500;
  color: #16a34a;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 1px solid #86efac;
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

/* \u89E3\u7ED1\u5C0F\u6309\u94AE\uFF08\u5DF2\u7ED1\u5B9A\uFF09
   \u4E0E\u53F3\u4FA7\u300C\u5DF2\u7ED1\u5B9A\u300D\u7EFF\u8272 pill badge \u5171\u5904\u4E00\u884C\uFF1A
   - \u7528 pill \u5706\u89D2\uFF08999px\uFF09\u4E0E\u4E4B\u547C\u5E94\uFF0C\u907F\u514D\u65B9\u89D2\u6309\u94AE\u5728\u89C6\u89C9\u4E0A\u663E\u5F97\u7A81\u5140
   - \u9AD8\u5EA6\u6536\u7D27\u5230\u63A5\u8FD1 badge\uFF0C\u907F\u514D\u4E00\u884C\u5185\u5143\u7D20\u7EB5\u5411\u53C2\u5DEE
   - \u8FB9\u6846\u7528 color-mix + --ua-danger \u6D3E\u751F\uFF0C\u6D45/\u6DF1\u8272\u6A21\u5F0F\u81EA\u52A8\u9002\u914D */
.ua-gh-unbind {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--ua-danger);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--ua-danger) 32%, transparent);
  border-radius: 999px;
  padding: 0.18rem 0.62rem;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease;
}

.ua-gh-unbind:hover {
  background: color-mix(in srgb, var(--ua-danger) 10%, transparent);
  border-color: var(--ua-danger);
}

.ua-gh-unbind:active {
  background: color-mix(in srgb, var(--ua-danger) 18%, transparent);
  transform: scale(0.96);
}

.ua-gh-unbind:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ua-danger) 22%, transparent);
}

/* \u7ED1\u5B9A\u6309\u94AE\uFF08\u672A\u7ED1\u5B9A\uFF09 */
.ua-gh-bind {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0.32rem 0.75rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #24292f 0%, #1a1f24 100%);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ua-gh-bind .ua-icon {
  width: 15px;
  height: 15px;
}

.ua-gh-bind:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(36, 41, 47, 0.3);
}

.ua-gh-bind:active {
  transform: translateY(0) scale(0.98);
}

/* \u6635\u79F0\u7F16\u8F91 */
.ua-nickname-row {
  display: flex;
  gap: 0.55rem;
  align-items: stretch;
}

.ua-input {
  flex: 1;
  min-width: 0;
  /* \u7D27\u51D1\uFF1A\u8F93\u5165\u6846 padding 0.55rem 0.9rem \u2192 0.5rem 0.8rem */
  padding: 0.5rem 0.8rem;
  font-size: 0.86rem;
  color: var(--ua-text);
  background: var(--ua-bg);
  border: 1.5px solid var(--ua-btn-border);
  border-radius: 12px;
  outline: none;
  transition: all 0.25s ease;
  font-weight: 500;
}

.ua-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
  background: var(--ua-bg);
}

.ua-input::placeholder {
  color: #a0a0a0;
  font-weight: 400;
}

.ua-save {
  flex-shrink: 0;
  /* \u4E0E\u6700\u957F\u6587\u6848\uFF08\u4FDD\u5B58\u4E2D\u2026 / \u5DF2\u4FDD\u5B58 \u2713\uFF09\u7B49\u5BBD\uFF1A\u4E09\u6001\u5207\u6362\u4E0D\u5E26\u52A8\u6574\u884C\u6296\u52A8 */
  min-width: 5.5rem;
  /* \u7D27\u51D1\uFF1A\u4FDD\u5B58\u6309\u94AE padding 0.55rem 1.2rem \u2192 0.5rem 1rem */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.01em;
}

.ua-save::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ua-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.35);
}

.ua-save:hover::before {
  opacity: 1;
}

.ua-save:active {
  transform: translateY(0) scale(0.97);
}

.ua-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.ua-msg {
  min-height: 1em;
  font-size: 0.78rem;
  font-weight: 500;
}

.ua-msg-err {
  color: var(--ua-danger);
  animation: ua-shake 0.4s ease;
}

@keyframes ua-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

/* ==================== \u54CD\u5E94\u5F0F ==================== */

@media (max-width: 480px) {
  .ua-dialog {
    max-width: 100%;
    border-radius: 16px;
    max-height: calc(100vh - 1.5rem);
  }

  .ua-mask {
    padding: 0.75rem;
  }

  .ua-dialog-head {
    padding: 0.95rem 1.25rem 0.8rem;
  }

  .ua-dialog-body {
    padding: 1.1rem 1.25rem 1rem;
    gap: 0.85rem;
  }

  .ua-profile-card {
    padding: 0.85rem 1rem;
  }

  .ua-big-avatar {
    width: 3.2rem;
    height: 3.2rem;
  }
}
/* ==================== \u9000\u51FA\u767B\u5F55\u4E8C\u6B21\u786E\u8BA4 ==================== */

/* \u5C0F\u4E00\u53F7\u7684\u5BF9\u8BDD\u6846\uFF08\u76F8\u5BF9\u8BBE\u7F6E\u5F39\u7A97\u7684 28rem\uFF09 */
.ua-confirm {
  max-width: 22rem;
}

.ua-confirm .ua-dialog-body {
  padding: 1.25rem 1.5rem 0.5rem;
}

.ua-confirm-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ua-text);
}

.ua-confirm-actions {
  display: flex;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
}

.ua-confirm-btn {
  flex: 1;
  padding: 0.7rem 1rem;
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
  background: var(--ua-btn-bg);
  color: var(--ua-text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ua-confirm-btn:hover {
  background: color-mix(in srgb, var(--ua-text) 8%, var(--ua-btn-bg));
}

.ua-confirm-btn-danger {
  border-color: transparent;
  background: var(--ua-danger);
  color: #fff;
}

.ua-confirm-btn-danger:hover {
  background: color-mix(in srgb, var(--ua-danger) 85%, #000);
}

/* ==================== \u79EF\u5206\uFF08wx-auth \u8D26\u672C\uFF09 ==================== */

/* \u4E0A\uFF1A\u6807\u9898 + \u4F59\u989D\uFF1B\u4E0B\uFF1A\u72B6\u6001\u6587\u6848 + \u52A8\u4F5C\u6309\u94AE\uFF08\u4E0E GitHub \u884C\u540C\u4E00\u5957\u5361\u7247\u8BED\u8A00\uFF09 */
.ua-points-card {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.6rem 0.85rem;
  background: var(--ua-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
}

.ua-points-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.ua-points-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  min-width: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-points-title .ua-icon {
  width: 18px;
  height: 18px;
  /* \u91D1\u5E01\u8272\uFF1A\u6D45/\u6DF1\u8272\u80CC\u666F\u4E0B\u90FD\u4FDD\u6301\u53EF\u8FA8\u8BC6\u7684\u91D1\u9EC4 */
  color: #d99b1f;
  flex-shrink: 0;
}

.ua-points-balance {
  display: inline-flex;
  align-items: baseline;
  gap: 0.2rem;
  min-width: 0;
}

.ua-points-num {
  /* inline-block\uFF1A\u4F59\u989D\u653E\u5927\u53CD\u9988\u9700\u8981\u5B83\u662F\u53EF\u53D8\u6362\u7684\u76D2 */
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--ua-text);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.ua-points-num-muted {
  color: var(--ua-sub);
  font-weight: 700;
}

/* \u4F59\u989D\u53D8\u5316\u53CD\u9988\uFF1A\u77ED\u4FC3\u653E\u5927 + \u53D8\u91D1\u8272\uFF08\u6570\u503C\u6084\u6084\u53D8\u4E86\u6CA1\u52A8\u9759\uFF1D\u50CF\u6CA1\u751F\u6548\uFF09 */
.ua-points-num-bump {
  animation: ua-points-bump 0.7s ease;
}

@keyframes ua-points-bump {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.28);
    color: #d99b1f;
  }
  100% {
    transform: scale(1);
  }
}

.ua-points-unit {
  font-size: 0.72rem;
  color: var(--ua-sub);
}

.ua-points-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.ua-points-hint {
  min-width: 0;
  font-size: 0.76rem;
  color: var(--ua-sub);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ua-points-hint-ok {
  color: var(--ua-success);
  font-weight: 600;
}

.ua-points-btns {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.ua-points-btn {
  padding: 0.28rem 0.7rem;
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  color: var(--ua-text);
  background: var(--ua-btn-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease;
}

.ua-points-btn:not(:disabled):hover {
  border-color: var(--ua-accent);
  background: color-mix(in srgb, var(--ua-text) 7%, var(--ua-bg));
}

.ua-points-btn:not(:disabled):active {
  transform: scale(0.97);
}

.ua-points-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ua-accent) 22%, transparent);
}

.ua-points-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ua-points-btn-primary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ua-points-btn-primary:not(:disabled):hover {
  border-color: transparent;
  background: linear-gradient(135deg, #5b6fd6 0%, #684094 100%);
}

/* ==================== \u770B\u5E7F\u544A\u8D5A\u79EF\u5206\uFF08\u5C0F\u7A0B\u5E8F\u7801\u5F39\u7A97\uFF09 ==================== */

.ua-earn {
  max-width: 22rem;
}

.ua-earn-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  padding: 1.1rem 1.4rem 1.4rem;
  text-align: center;
}

.ua-earn-sub {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--ua-sub);
}

.ua-earn-sub b {
  color: var(--ua-text);
}

.ua-earn-qr {
  width: 11rem;
  height: 11rem;
  padding: 0.35rem;
  /* \u4E8C\u7EF4\u7801\u6052\u767D\u5E95\uFF1A\u6DF1\u8272\u6A21\u5F0F\u4E5F\u4E0D\u53CD\u8272\uFF0C\u5426\u5219\u90E8\u5206\u673A\u578B\u626B\u4E0D\u51FA\u6765 */
  background: #fff;
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
  object-fit: contain;
  box-sizing: content-box;
}

.ua-earn-status {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ua-sub);
}

.ua-earn-status-ok {
  color: var(--ua-success);
}

.ua-earn-status-err {
  color: var(--ua-danger);
}

/* \u7A84\u5C4F\uFF1A\u52A8\u4F5C\u6309\u94AE\u6362\u884C\uFF0C\u4E8C\u7EF4\u7801\u7565\u7F29 */
@media (max-width: 480px) {
  .ua-points-foot {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .ua-points-btns {
    width: 100%;
    justify-content: flex-end;
  }

  .ua-earn-qr {
    width: 9.5rem;
    height: 9.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ua-points-num-bump {
    animation: none;
  }
}
`;

  // src/utils.ts
  var TOKEN_COOKIE = "wxauth-token";
  var LEGACY_COOKIE = "wxauth-openid";
  function looksLikeSignedToken(value) {
    if (!value || value.length < 20) return false;
    return /^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(value);
  }
  function getAuthToken() {
    const cookies = document.cookie.split("; ");
    const tokenCandidates = [];
    const legacyCandidates = [];
    for (const row of cookies) {
      const eq = row.indexOf("=");
      if (eq < 0) continue;
      const name = row.slice(0, eq).trim();
      const value = row.slice(eq + 1);
      if (name === TOKEN_COOKIE) tokenCandidates.push(value);
      else if (name === LEGACY_COOKIE) legacyCandidates.push(value);
    }
    const hit = tokenCandidates.find(looksLikeSignedToken) || tokenCandidates[0] || legacyCandidates.find(looksLikeSignedToken) || legacyCandidates[0] || "";
    return hit;
  }
  function getRootDomain() {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return "";
    const parts = hostname.split(".");
    return parts.length >= 2 ? "." + parts.slice(-2).join(".") : "";
  }
  function deleteAuthCookies() {
    cleanupCookie(TOKEN_COOKIE, false);
    cleanupCookie(TOKEN_COOKIE, true);
    cleanupCookie(LEGACY_COOKIE, false);
    cleanupCookie(LEGACY_COOKIE, true);
  }
  function cleanupJunkTokens() {
    const cookies = document.cookie.split("; ");
    for (const row of cookies) {
      const eq = row.indexOf("=");
      if (eq < 0) continue;
      const name = row.slice(0, eq).trim();
      if (name !== TOKEN_COOKIE && name !== LEGACY_COOKIE) continue;
      const value = row.slice(eq + 1);
      if (!/^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(value)) {
        cleanupCookie(name, false);
        cleanupCookie(name, true);
      }
    }
  }
  function cleanupCookie(name, withDomain) {
    const domainStr = withDomain && getRootDomain() ? `;domain=${getRootDomain()}` : "";
    const secureStr = window.location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainStr}${secureStr};SameSite=Strict`;
  }
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function escapeAttr(value) {
    return escapeHtml(value);
  }
  var USER_ICON_SVG = '<svg class="ua-icon-user" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>';
  var SETTINGS_ICON = '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>';
  var LOGOUT_ICON = '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h4a1 1 0 110 2H4v12h4a1 1 0 110 2H4a1 1 0 01-1-1V3zm10.293 9.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293a1 1 0 000 1.414zM21 10a1 1 0 01-1-1v2a1 1 0 110 0v-2a1 1 0 011 0 1 1 0 010 1v-1h27a1 1 0 010 2H20a1 1 0 01-1-1v-2a1 1 0 010-1z" clip-rule="evenodd"/></svg>';
  var COIN_ICON = '<svg class="ua-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>';
  var CLOSE_ICON = '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';
  var GITHUB_ICON = '<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>';

  // src/UserAvatar.ts
  var DEFAULT_THEME = {
    btnBg: "light-dark(#ffffff, #262a30)",
    size: "2.5rem",
    accent: "light-dark(#1f2328, #e6edf3)",
    btnBorder: "light-dark(rgba(27, 31, 36, 0.12), rgba(255, 255, 255, 0.14))",
    radius: "16px",
    bg: "light-dark(#ffffff, #1c1e22)",
    text: "light-dark(#1f2328, #e6edf3)",
    subText: "light-dark(#656d76, #8b949e)",
    overlay: "light-dark(rgba(31, 35, 40, 0.45), rgba(0, 0, 0, 0.6))",
    danger: "light-dark(#dc2626, #f85149)",
    success: "light-dark(#1a7f37, #3fb950)"
  };
  var DEFAULT_POINTS_QR_SRC = "https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/img.shenzjd.com-20260917-010529-5ck1.png";
  var EARN_FIRST_POLL_DELAY_MS = 15e3;
  var EARN_POLL_INTERVAL_MS = 3e3;
  var EARN_POLL_WINDOW_MS = 9e4;
  var UserAvatar = class {
    constructor(options = {}, container = document.body) {
      this.user = null;
      /**
       * 头像按钮三态：
       * - checking：有 token 正在服务端校验（骨架脉冲占位，点击忽略）
       * - auth：已登录（真实头像；图片加载完成前继续骨架，onload 后淡入）
       * - unauth：未登录（显示「登录」）
       */
      this.status = "checking";
      this.menuEl = null;
      this.settingsEl = null;
      this.menuCleanup = null;
      this.settingsCleanup = null;
      this.confirmEl = null;
      this.confirmCleanup = null;
      this.githubMsgListener = null;
      this.saving = false;
      this.saveBtnTimer = null;
      this.nicknameDraft = "";
      // ===== 积分（wx-auth 账本）=====
      /** 最近一次读到的余额读数（null = 还没读到过） */
      this.points = null;
      /** 积分卡片状态：idle=未请求 / loading=读取中 / ready=可展示 / error=读不到（显示重试） */
      this.pointsState = "idle";
      /** 签到 / 出码在途：期间按钮禁用，避免连点造成重复请求 */
      this.pointsBusy = false;
      /** 卡片副文案（签到结果 / 出码失败原因），一次性 */
      this.pointsTip = "";
      this.pointsTipOk = false;
      /** 余额刚变过：数字做一次短促放大反馈 */
      this.pointsBump = false;
      this.pointsBumpTimer = null;
      /** 请求代际：弹窗重开/重试后丢弃过期响应，避免旧结果覆盖新读数 */
      this.pointsSeq = 0;
      // ===== 看广告赚积分（固定小程序码弹窗）=====
      this.adEl = null;
      this.adCleanup = null;
      /** 第一次核对余额的定时器（激励视频十几秒，先静默再查） */
      this.adFirstTimer = null;
      this.adPollTimer = null;
      this.adPolling = false;
      /** 开窗时的余额基准：比它多即视为到账（null = 开窗时还没读到余额） */
      this.adBaseline = null;
      /** 自动核对窗口的截止时间 */
      this.adDeadline = 0;
      /** 本轮广告是否已结算（防止轮询与手动核对竞态下重复结算） */
      this.adRedeemed = false;
      this.adCloseTimer = null;
      /**
       * 静默刷新节流：focus / visibilitychange 触发的刷新受最小间隔限制，
       * 避免用户频繁切换标签页/窗口时对 userinfo 接口造成过多请求。
       * 单位毫秒，默认 30s。
       */
      this.silentRefreshThrottle = 3e4;
      this.lastSilentRefreshAt = 0;
      /**
       * 用户数据缓存：记录上次「成功」拉取的用户信息与拉取时间。
       * 静默刷新时若距上次成功拉取在缓存有效期内且 token 未变，直接复用缓存，
       * 不再发请求，避免数据无变化时仍频繁请求 userinfo。
       */
      this.cachedUser = null;
      this.cachedAt = 0;
      this.cachedToken = "";
      /** 缓存有效期，单位毫秒，默认 60s */
      this.userCacheTtl = 6e4;
      /**
       * 静默刷新（focus / visibilitychange 触发）。
       * 两个事件在切回页面时常同时触发，这里统一走同一入口并做节流：
       * 距上次静默刷新不足 silentRefreshThrottle 时直接忽略，避免频繁请求 userinfo。
       */
      this.silentRefresh = () => {
        const now = Date.now();
        if (now - this.lastSilentRefreshAt < this.silentRefreshThrottle) return;
        this.lastSilentRefreshAt = now;
        void this.fetchUser();
      };
      /** 窗口重新聚焦时刷新（登录弹窗 / OAuth 子窗关闭后切回自动同步头像） */
      this.onWindowFocus = () => {
        this.silentRefresh();
      };
      /** 页面从隐藏切回可见时刷新 */
      this.onVisibility = () => {
        if (document.visibilityState === "visible") this.silentRefresh();
      };
      this.container = container;
      this.opts = this.resolve(options);
      cleanupJunkTokens();
      this.root = document.createElement("div");
      this.root.className = "ua-root";
    }
    /** 环境检查：找不到 SDK 时返回错误信息（供外部/Web Component 提示） */
    static check(sdk) {
      return sdk || getWindowSdk() ? null : "\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()";
    }
    /** 挂载到页面 */
    mount(target) {
      if (this.root.isConnected) return this;
      if (target) {
        target.appendChild(this.root);
      } else if (this.container instanceof ShadowRoot) {
        this.container.appendChild(this.root);
      } else if (this.container === document.body) {
        document.body.appendChild(this.root);
      } else {
        this.container.appendChild(this.root);
      }
      this.applyTheme();
      this.render();
      void this.fetchUser(true);
      window.addEventListener("focus", this.onWindowFocus);
      document.addEventListener("visibilitychange", this.onVisibility);
      return this;
    }
    /** 卸载并销毁 */
    unmount() {
      this.destroy();
    }
    /** 主动触发微信登录（Promise<是否登录成功>） */
    async login() {
      return this.triggerLogin();
    }
    /** 刷新用户信息（登录/绑定后外部可调用），强制请求绕过缓存 */
    async refresh() {
      await this.fetchUser(true);
    }
    destroy() {
      this.closeMenu();
      this.closeSettings();
      if (this.githubMsgListener) {
        window.removeEventListener("message", this.githubMsgListener);
        this.githubMsgListener = null;
      }
      window.removeEventListener("focus", this.onWindowFocus);
      document.removeEventListener("visibilitychange", this.onVisibility);
      this.root.remove();
    }
    // ==================== 初始化 ====================
    resolve(options) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const sdk = (_a = options.sdk) != null ? _a : getWindowSdk();
      const apiBase = options.apiBase !== void 0 && options.apiBase !== "" ? options.apiBase : "https://wx-auth.shenzjd.com";
      return {
        sdk,
        apiBase,
        fixed: (_b = options.fixed) != null ? _b : true,
        offset: (_c = options.offset) != null ? _c : "1rem 1.5rem",
        size: (_d = options.size) != null ? _d : DEFAULT_THEME.size,
        zIndex: (_e = options.zIndex) != null ? _e : 12e3,
        portal: (_f = options.portal) != null ? _f : true,
        portalEl: options.portalEl,
        // theme.size 与 size 同步：options.size 优先于 options.theme.size
        theme: { ...DEFAULT_THEME, ...(_g = options.theme) != null ? _g : {}, size: (_j = options.size) != null ? _j : (_i = (_h = options.theme) == null ? void 0 : _h.size) != null ? _i : DEFAULT_THEME.size },
        pointsQrSrc: ((_k = options.pointsQrSrc) == null ? void 0 : _k.trim()) || DEFAULT_POINTS_QR_SRC,
        loginRequired: (_l = options.loginRequired) != null ? _l : false,
        onLogin: options.onLogin,
        onLogout: options.onLogout,
        onGithubBound: options.onGithubBound
      };
    }
    applyTheme() {
      const t = this.opts.theme;
      const s = this.root.style;
      s.setProperty("--ua-btn-bg", t.btnBg);
      s.setProperty("--ua-size", t.size);
      s.setProperty("--ua-accent", t.accent);
      s.setProperty("--ua-btn-border", t.btnBorder);
      s.setProperty("--ua-radius", t.radius);
      s.setProperty("--ua-bg", t.bg);
      s.setProperty("--ua-text", t.text);
      s.setProperty("--ua-sub", t.subText);
      s.setProperty("--ua-overlay", t.overlay);
      s.setProperty("--ua-danger", t.danger);
      s.setProperty("--ua-success", t.success);
    }
    // ==================== Portal（弹窗 / 菜单挂载到顶层） ====================
    /**
     * Portal 是否启用：默认开启。关闭时弹窗/菜单仍内联在 this.root（旧行为）。
     * portalEl 仅在 portal 开启时生效，缺省 document.body。
     */
    usePortal() {
      return this.opts.portal;
    }
    /** 获取 Portal 挂载容器（body 或自定义 portalEl） */
    getPortalRoot() {
      var _a;
      return (_a = this.opts.portalEl) != null ? _a : document.body;
    }
    /**
     * 将子节点挂到对应容器：
     * - portal 开启：挂到顶层容器（body / portalEl），脱离被 transform/overflow 困住的祖先；
     * - portal 关闭：挂到 this.root，保持旧的内联行为。
     * 由于挂到顶层后不再继承 .ua-root 的 --ua-* 主题变量，这里把主题变量一并复制过去。
     * 同时 Portal 节点脱离了 Web Component 的 shadow DOM，原本在 shadow 内通过 `<style>`
     * 注入的 .ua-* 选择器在 body 上找不到规则，因此把样式以 inline `<style>` 形式
     * 追加到 portaled 节点子树内——选择器全是类名（.ua-menu / .ua-mask / .ua-dialog...），
     * 在子树里照常匹配；--ua-* 变量也已在节点上设置，无需依赖 .ua-root 的 :root 规则。
     */
    appendOverlay(el) {
      if (this.usePortal()) {
        const t = this.opts.theme;
        const s = el.style;
        s.setProperty("--ua-btn-bg", t.btnBg);
        s.setProperty("--ua-size", t.size);
        s.setProperty("--ua-accent", t.accent);
        s.setProperty("--ua-btn-border", t.btnBorder);
        s.setProperty("--ua-radius", t.radius);
        s.setProperty("--ua-bg", t.bg);
        s.setProperty("--ua-text", t.text);
        s.setProperty("--ua-sub", t.subText);
        s.setProperty("--ua-overlay", t.overlay);
        s.setProperty("--ua-danger", t.danger);
        s.setProperty("--ua-success", t.success);
        const style = document.createElement("style");
        style.setAttribute("data-ua-portal-style", "");
        style.textContent = styles_default;
        el.appendChild(style);
        this.getPortalRoot().appendChild(el);
      } else {
        this.root.appendChild(el);
      }
    }
    // ==================== 登录 / 退出 ====================
    async triggerLogin() {
      var _a, _b;
      const sdk = this.opts.sdk;
      if (!sdk) {
        console.warn("[UserAvatar] \u672A\u627E\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK");
        return false;
      }
      const ok = await sdk.requireAuth({ required: this.opts.loginRequired });
      if (ok) {
        await this.fetchUser(true);
        if (this.user) (_b = (_a = this.opts).onLogin) == null ? void 0 : _b.call(_a, this.user);
      }
      return ok;
    }
    async logout() {
      var _a, _b;
      const sdk = this.opts.sdk;
      if (sdk == null ? void 0 : sdk.revoke) {
        await sdk.revoke();
      } else {
        sdk == null ? void 0 : sdk.clearToken();
        deleteAuthCookies();
      }
      this.user = null;
      this.status = "unauth";
      this.closeMenu();
      this.closeSettings();
      this.render();
      (_b = (_a = this.opts).onLogout) == null ? void 0 : _b.call(_a);
    }
    // ==================== 数据 ====================
    /**
     * 拉取用户信息。
     * @param force 是否强制请求。默认 false：静默刷新时若缓存仍有效（数据无变化），
     *              直接复用缓存不发请求；登录/改昵称/解绑/绑定等主动操作传 true 强制刷新。
     */
    async fetchUser(force = false) {
      var _a;
      const token = getAuthToken();
      if (!token) {
        this.user = null;
        this.status = "unauth";
        this.render();
        return;
      }
      if (!force && this.cachedUser && this.cachedToken === token && Date.now() - this.cachedAt < this.userCacheTtl) {
        this.user = this.cachedUser;
        this.status = "auth";
        this.render();
        return;
      }
      if (this.status !== "auth") {
        this.status = "checking";
        this.render();
      }
      const prev = this.user;
      try {
        const base = this.opts.apiBase || window.location.origin;
        const res = await fetch(`${base}/api/auth/userinfo?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!data.authenticated) {
          console.warn("[UserAvatar] token \u5DF2\u5931\u6548\uFF0C\u81EA\u52A8\u6E05\u9664\u672C\u5730\u51ED\u8BC1", (_a = data.error) != null ? _a : "");
          deleteAuthCookies();
          this.user = null;
          this.status = "unauth";
          this.cachedUser = null;
          this.cachedAt = 0;
          this.cachedToken = "";
          this.closeSettings();
          this.render();
          return;
        }
        this.user = data.user ? data.user : null;
        this.status = this.user ? "auth" : "unauth";
        this.cachedUser = this.user;
        this.cachedAt = Date.now();
        this.cachedToken = token;
        if (this.status === "auth" && prev && JSON.stringify(prev) === JSON.stringify(this.user)) {
          return;
        }
      } catch (e) {
        console.error("[UserAvatar] \u62C9\u53D6\u7528\u6237\u8BE6\u60C5\u5931\u8D25", e);
        if (this.status !== "auth") {
          this.user = null;
          this.status = "unauth";
        }
      }
      this.render();
    }
    async saveNickname() {
      const token = getAuthToken();
      const nickname = this.nicknameDraft.trim();
      if (!token) return;
      if (nickname.length < 2 || nickname.length > 20) {
        this.setMsg("\u6635\u79F0\u9700\u4E3A 2-20 \u4E2A\u5B57\u7B26");
        return;
      }
      if (this.saving) return;
      this.saving = true;
      this.updateSaveBtn();
      this.setMsg("");
      let ok = false;
      try {
        const base = this.opts.apiBase || window.location.origin;
        const res = await fetch(`${base}/api/auth/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "set-nickname", nickname })
        });
        const data = await res.json();
        if (data.success) {
          ok = true;
          this.nicknameDraft = nickname;
          await this.fetchUser(true);
        } else {
          this.setMsg(data.message || "\u4FDD\u5B58\u5931\u8D25");
        }
      } catch (e) {
        console.error("[UserAvatar] \u4FDD\u5B58\u6635\u79F0\u5931\u8D25", e);
        this.setMsg("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      } finally {
        this.saving = false;
        this.updateSaveBtn(ok);
      }
    }
    async unbindGithub() {
      const token = getAuthToken();
      if (!token) return;
      try {
        const base = this.opts.apiBase || window.location.origin;
        const res = await fetch(`${base}/api/auth/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "unbind-github" })
        });
        const data = await res.json();
        if (data.success) {
          await this.fetchUser(true);
          this.refreshGithubRow();
        } else {
          window.alert(data.message || "\u89E3\u7ED1\u5931\u8D25");
        }
      } catch (e) {
        console.error("[UserAvatar] \u89E3\u7ED1\u5931\u8D25", e);
        window.alert("\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
    }
    // ==================== 头像按钮 ====================
    render() {
      this.root.innerHTML = "";
      this.closeMenu();
      const pos = this.opts.fixed ? `position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}` : "";
      const checking = this.status === "checking";
      const btnClass = checking ? "ua-avatar ua-avatar-checking" : this.status === "auth" ? "ua-avatar" : "ua-avatar ua-avatar-unauth";
      this.root.innerHTML = `
      <div class="ua-widget" style="${pos}">
        <button type="button" class="${btnClass}" aria-haspopup="true"${checking ? ' aria-busy="true"' : ""} aria-label="${this.status === "auth" ? "\u6253\u5F00\u7528\u6237\u83DC\u5355" : checking ? "\u6B63\u5728\u68C0\u6D4B\u767B\u5F55\u72B6\u6001" : "\u5FAE\u4FE1\u767B\u5F55"}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `;
      const btn = this.root.querySelector(".ua-avatar");
      const img = this.root.querySelector(".ua-avatar-img");
      if (img) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add("ua-img-loaded");
        } else {
          btn.classList.add("ua-avatar-loading-img");
          img.addEventListener("load", () => {
            img.classList.add("ua-img-loaded");
            btn.classList.remove("ua-avatar-loading-img");
          }, { once: true });
          img.addEventListener("error", () => {
            var _a, _b, _c;
            const name = ((_a = this.user) == null ? void 0 : _a.nickname) || ((_c = (_b = this.user) == null ? void 0 : _b.github) == null ? void 0 : _c.login) || "\u5FAE";
            const span = document.createElement("span");
            span.className = "ua-avatar-fallback";
            span.textContent = name.charAt(0).toUpperCase();
            img.replaceWith(span);
            btn.classList.remove("ua-avatar-loading-img");
          }, { once: true });
        }
      }
      btn.addEventListener("click", () => {
        if (this.status === "checking") return;
        if (this.user) this.toggleMenu();
        else void this.triggerLogin();
      });
    }
    offsetTop() {
      const m = /^([^,\s]+)/.exec(this.opts.offset);
      return m ? m[1] : "1rem";
    }
    offsetRight() {
      var _a, _b;
      const m = /,\s*([^\s,]+)/.exec(this.opts.offset);
      if (m) return m[1];
      const parts = this.opts.offset.trim().split(/\s+/);
      return (_b = (_a = parts[1]) != null ? _a : parts[0]) != null ? _b : "1.5rem";
    }
    buildAvatarInnerHtml() {
      var _a, _b;
      if (this.status === "checking") {
        return '<span class="ua-avatar-skeleton" aria-hidden="true"></span>';
      }
      if (!this.user) {
        return '<span class="ua-avatar-login">\u767B\u5F55</span>';
      }
      const src = this.user.avatarUrl || this.user.headimgurl || ((_a = this.user.github) == null ? void 0 : _a.avatar) || "";
      if (src) return `<img class="ua-avatar-img" src="${escapeAttr(src)}" alt="" referrerpolicy="no-referrer" />`;
      const name = this.user.nickname || ((_b = this.user.github) == null ? void 0 : _b.login) || "\u5FAE\u4FE1\u7528\u6237";
      return `<span class="ua-avatar-fallback">${escapeHtml(name.charAt(0).toUpperCase())}</span>`;
    }
    // ==================== 下拉菜单 ====================
    toggleMenu() {
      if (this.menuEl) this.closeMenu();
      else this.openMenu();
    }
    openMenu() {
      var _a, _b;
      const u = this.user;
      if (!u || this.menuEl) return;
      this.closeSettings();
      const menu = document.createElement("div");
      menu.className = "ua-menu";
      menu.style.zIndex = String(this.opts.zIndex + 1);
      const name = u.nickname || (u.github ? `@${u.github.login}` : "\u5FAE\u4FE1\u7528\u6237");
      menu.innerHTML = `
      <div class="ua-menu-user"><span class="ua-menu-name">${escapeHtml(name)}</span></div>
      <button type="button" class="ua-menu-item" data-action="settings">${SETTINGS_ICON}<span>\u8BBE\u7F6E</span></button>
      <button type="button" class="ua-menu-item ua-menu-item-danger" data-action="logout">${LOGOUT_ICON}<span>\u9000\u51FA\u767B\u5F55</span></button>
    `;
      if (this.usePortal()) {
        const btn = this.root.querySelector(".ua-avatar");
        const rect = btn == null ? void 0 : btn.getBoundingClientRect();
        if (rect && rect.width > 0) {
          const gap = 0.5;
          const gapPx = gap * 16;
          menu.style.position = "fixed";
          menu.style.top = `${rect.bottom + gapPx}px`;
          menu.style.left = "auto";
          menu.style.right = `${Math.max(window.innerWidth - rect.right, 0)}px`;
          menu.style.minWidth = "12rem";
          menu.style.maxWidth = "min(20rem, calc(100vw - 2rem))";
          menu.dataset.uaPortal = "true";
        } else {
          this.usePortalMenuInlineFallback(menu);
        }
      }
      const onDocDown = (e) => {
        const path = e.composedPath();
        if (!path.includes(this.root) && !(this.menuEl && path.includes(this.menuEl))) this.closeMenu();
      };
      const onDocKey = (e) => {
        if (e.key === "Escape") this.closeMenu();
      };
      document.addEventListener("mousedown", onDocDown);
      document.addEventListener("keydown", onDocKey);
      this.menuCleanup = () => {
        document.removeEventListener("mousedown", onDocDown);
        document.removeEventListener("keydown", onDocKey);
      };
      (_a = menu.querySelector('[data-action="settings"]')) == null ? void 0 : _a.addEventListener("click", () => {
        this.openSettings();
      });
      (_b = menu.querySelector('[data-action="logout"]')) == null ? void 0 : _b.addEventListener("click", () => {
        this.openLogoutConfirm();
      });
      this.appendOverlay(menu);
      this.menuEl = menu;
    }
    /** Portal 下头像按钮不可见时的兜底：退回内联挂载，避免菜单悬空/定位错乱 */
    usePortalMenuInlineFallback(menu) {
      menu.style.position = "absolute";
      menu.style.top = "";
      menu.style.left = "";
      menu.style.right = "0";
      menu.style.minWidth = "12rem";
      menu.style.maxWidth = "";
      this.root.appendChild(menu);
    }
    closeMenu() {
      var _a, _b;
      (_a = this.menuEl) == null ? void 0 : _a.remove();
      this.menuEl = null;
      (_b = this.menuCleanup) == null ? void 0 : _b.call(this);
      this.menuCleanup = null;
    }
    // ==================== 退出登录二次确认 ====================
    openLogoutConfirm() {
      var _a;
      this.closeMenu();
      this.closeConfirm();
      const confirm = document.createElement("div");
      confirm.className = "ua-mask";
      confirm.style.zIndex = String(this.opts.zIndex + 10);
      confirm.innerHTML = `
      <div class="ua-dialog ua-confirm" role="alertdialog" aria-modal="true" aria-label="\u9000\u51FA\u767B\u5F55">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u9000\u51FA\u767B\u5F55</h3>
          <button type="button" class="ua-close" data-action="cancel" aria-label="\u5173\u95ED">${CLOSE_ICON}</button>
        </div>
        <div class="ua-dialog-body">
          <p class="ua-confirm-text">\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417\uFF1F\u9000\u51FA\u540E\u9700\u8981\u91CD\u65B0\u767B\u5F55\u624D\u80FD\u7EE7\u7EED\u4F7F\u7528\u3002</p>
        </div>
        <div class="ua-confirm-actions">
          <button type="button" class="ua-confirm-btn" data-action="cancel">\u53D6\u6D88</button>
          <button type="button" class="ua-confirm-btn ua-confirm-btn-danger" data-action="confirm">\u9000\u51FA\u767B\u5F55</button>
        </div>
      </div>
    `;
      this.confirmEl = confirm;
      this.appendOverlay(confirm);
      const close = () => this.closeConfirm();
      (_a = confirm.querySelector('[data-action="confirm"]')) == null ? void 0 : _a.addEventListener("click", () => {
        close();
        void this.logout();
      });
      confirm.querySelectorAll('[data-action="cancel"]').forEach((btn) => {
        btn.addEventListener("click", close);
      });
      const onMaskDown = (e) => {
        if (e.composedPath()[0] === confirm) close();
      };
      const onDocKey = (e) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("mousedown", onMaskDown);
      document.addEventListener("keydown", onDocKey);
      this.confirmCleanup = () => {
        document.removeEventListener("mousedown", onMaskDown);
        document.removeEventListener("keydown", onDocKey);
      };
    }
    closeConfirm() {
      var _a, _b;
      (_a = this.confirmEl) == null ? void 0 : _a.remove();
      this.confirmEl = null;
      (_b = this.confirmCleanup) == null ? void 0 : _b.call(this);
      this.confirmCleanup = null;
    }
    // ==================== 设置弹窗 ====================
    openSettings() {
      const u = this.user;
      if (!u) return;
      this.closeMenu();
      this.closeSettings();
      this.nicknameDraft = u.nickname || "";
      this.pointsTip = "";
      this.pointsBump = false;
      const settings = document.createElement("div");
      settings.className = "ua-mask";
      settings.style.zIndex = String(this.opts.zIndex + 10);
      settings.innerHTML = this.buildSettingsHtml(u);
      this.settingsEl = settings;
      this.appendOverlay(settings);
      this.bindSettingsEvents(settings);
      this.bindPointsEvents(settings);
      void this.loadPoints();
      const onMaskDown = (e) => {
        if (e.composedPath()[0] === settings) this.closeSettings();
      };
      const onDocKey = (e) => {
        if (e.key === "Escape") this.closeSettings();
      };
      document.addEventListener("mousedown", onMaskDown);
      document.addEventListener("keydown", onDocKey);
      this.settingsCleanup = () => {
        document.removeEventListener("mousedown", onMaskDown);
        document.removeEventListener("keydown", onDocKey);
      };
    }
    buildSettingsHtml(u) {
      var _a, _b;
      const avatarSrc = u.avatarUrl || u.headimgurl || ((_a = u.github) == null ? void 0 : _a.avatar);
      const bigAvatar = avatarSrc ? `<img class="ua-big-avatar" src="${escapeAttr(avatarSrc)}" alt="" referrerpolicy="no-referrer" />` : `<div class="ua-big-avatar ua-big-avatar-fallback">${escapeHtml((u.nickname || ((_b = u.github) == null ? void 0 : _b.login) || "?").charAt(0).toUpperCase())}</div>`;
      const githubRow = this.buildGithubRowHtml(u);
      const pointsCard = this.buildPointsCardHtml();
      return `
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="\u8BBE\u7F6E">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u8BBE\u7F6E</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${CLOSE_ICON}</button>
        </div>
        <div class="ua-dialog-body">
          <!-- \u7528\u6237\u4FE1\u606F\u5361\u7247\uFF08\u542B\u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u7AD9\u70B9\u54C1\u724C + \u7528\u6237 ID\uFF09 -->
          <div class="ua-profile-card">
            <div class="ua-profile-header">
              ${bigAvatar}
              <div class="ua-profile-info">
                <div class="ua-user-name">${escapeHtml(u.nickname || (u.github ? `@${u.github.login}` : "\u5FAE\u4FE1\u7528\u6237"))}</div>
                ${typeof u.userSeq === "number" && u.userSeq > 0 ? `<div class="ua-user-seq">\u4F60\u662F\u672C\u7AD9\u7B2C ${u.userSeq} \u4F4D\u7528\u6237</div>` : ""}
              </div>
            </div>
            <!-- \u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u5DE6 = \u7F51\u7AD9\u54C1\u724C\u300C\u795E\u65CF\u4E5D\u5E1D\u300D\uFF1B\u53F3 = \u7528\u6237 OPENID -->
            <div class="ua-profile-postcard">
              <span class="ua-postcard-brand">\u795E\u65CF\u4E5D\u5E1D</span>
              <span class="ua-postcard-id">${escapeHtml(u.openid || "-")}</span>
            </div>
          </div>

          <!-- \u79EF\u5206\uFF08wx-auth \u8D26\u672C\uFF09\uFF1A\u4F59\u989D + \u4ECA\u65E5\u7B7E\u5230 + \u770B\u5E7F\u544A\u8D5A\u5206 -->
          ${pointsCard}

          <!-- GitHub \u7ED1\u5B9A\uFF1A\u5DE6\u53F3\u5355\u884C\uFF08\u5DE6\uFF1A\u56FE\u6807+\u6807\u9898\uFF1B\u53F3\uFF1A\u7ED1\u5B9A\u6309\u94AE / \u7528\u6237\u540D+\u89E3\u7ED1\uFF09 -->
          ${githubRow}

          <!-- \u8BBE\u7F6E\u540D\u5B57 -->
          <div class="ua-field-group">
            <div class="ua-section-title">${USER_ICON_SVG}<span>\u8BBE\u7F6E\u540D\u5B57</span></div>
            <div class="ua-nickname-row">
              <input type="text" class="ua-input" maxlength="20" placeholder="2-20 \u4E2A\u5B57\u7B26" value="${escapeAttr(this.nicknameDraft)}" />
              <button type="button" class="ua-save" data-action="save">\u4FDD\u5B58</button>
            </div>
            <div class="ua-msg" data-role="msg"></div>
          </div>
        </div>
      </div>
    `;
    }
    /**
     * 构建 GitHub 绑定行的 HTML。
     * 抽出来是为了让「解绑 / 绑定」成功后能原地替换这行（见 refreshGithubRow），
     * 而不是重渲染整个设置弹窗 —— 后者会丢掉用户在「设置名字」输入框里的草稿和焦点。
     */
    buildGithubRowHtml(u) {
      return u.github ? `
        <div class="ua-gh-row">
          <span class="ua-gh-title">${GITHUB_ICON}<b>GitHub</b></span>
          <div class="ua-gh-status">
            <span class="ua-gh-name">@${escapeHtml(u.github.login)}<span class="ua-badge">\u5DF2\u7ED1\u5B9A</span></span>
            <button type="button" class="ua-gh-unbind" data-action="unbind">\u89E3\u7ED1</button>
          </div>
        </div>` : `
        <div class="ua-gh-row">
          <span class="ua-gh-title">${GITHUB_ICON}<b>GitHub</b></span>
          <div class="ua-gh-status">
            <button type="button" class="ua-gh-bind" data-action="bind">${GITHUB_ICON}<span>\u7ED1\u5B9A GitHub</span></button>
          </div>
        </div>`;
    }
    /**
     * 就地刷新打开中的设置弹窗里的 GitHub 行。
     * 在解绑 / 绑定成功后调用：this.user.github 已更新，需要让弹窗立刻反映出新状态。
     * 弹窗未打开时无需动作。
     */
    refreshGithubRow() {
      var _a, _b;
      if (!this.settingsEl || !this.user) return;
      const oldRow = this.settingsEl.querySelector(".ua-gh-row");
      if (!oldRow) return;
      const wrapper = document.createElement("div");
      wrapper.innerHTML = this.buildGithubRowHtml(this.user).trim();
      const newRow = wrapper.firstElementChild;
      if (!newRow) return;
      oldRow.replaceWith(newRow);
      (_a = newRow.querySelector('[data-action="bind"]')) == null ? void 0 : _a.addEventListener("click", () => {
        this.startGithubBind();
      });
      (_b = newRow.querySelector('[data-action="unbind"]')) == null ? void 0 : _b.addEventListener("click", () => {
        void this.unbindGithub();
      });
    }
    bindSettingsEvents(settings) {
      var _a, _b, _c, _d;
      const input = settings.querySelector(".ua-input");
      input == null ? void 0 : input.addEventListener("input", () => {
        this.nicknameDraft = input.value;
        this.setMsg("");
      });
      input == null ? void 0 : input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") void this.saveNickname();
      });
      (_a = settings.querySelector('[data-action="save"]')) == null ? void 0 : _a.addEventListener("click", () => {
        void this.saveNickname();
      });
      (_b = settings.querySelector('[data-action="close"]')) == null ? void 0 : _b.addEventListener("click", () => {
        this.closeSettings();
      });
      (_c = settings.querySelector('[data-action="bind"]')) == null ? void 0 : _c.addEventListener("click", () => {
        this.startGithubBind();
      });
      (_d = settings.querySelector('[data-action="unbind"]')) == null ? void 0 : _d.addEventListener("click", () => {
        void this.unbindGithub();
      });
    }
    closeSettings() {
      var _a, _b;
      if (this.saveBtnTimer !== null) {
        clearTimeout(this.saveBtnTimer);
        this.saveBtnTimer = null;
      }
      this.closeEarnDialog();
      if (this.pointsBumpTimer !== null) {
        clearTimeout(this.pointsBumpTimer);
        this.pointsBumpTimer = null;
      }
      this.pointsBump = false;
      this.pointsSeq++;
      (_a = this.settingsEl) == null ? void 0 : _a.remove();
      this.settingsEl = null;
      (_b = this.settingsCleanup) == null ? void 0 : _b.call(this);
      this.settingsCleanup = null;
    }
    /** 提示行只用于错误信息；成功反馈由保存按钮自身展示（见 updateSaveBtn） */
    setMsg(text) {
      var _a;
      const el = (_a = this.settingsEl) == null ? void 0 : _a.querySelector('[data-role="msg"]');
      if (!el) return;
      el.textContent = text;
      el.className = text ? "ua-msg ua-msg-err" : "ua-msg";
    }
    /**
     * 保存按钮状态机：保存 → 保存中…（禁用）→ 已保存 ✓（约 2s 后自动回到保存）。
     * 定时器回调持有按钮元素本身的引用：即使期间弹窗被关闭/重建，也只会写到
     * 已脱离 DOM 的旧节点上，不会误改新弹窗的按钮。
     */
    updateSaveBtn(success = false) {
      var _a;
      const btn = (_a = this.settingsEl) == null ? void 0 : _a.querySelector('[data-action="save"]');
      if (!btn) return;
      if (this.saveBtnTimer !== null) {
        clearTimeout(this.saveBtnTimer);
        this.saveBtnTimer = null;
      }
      btn.disabled = this.saving;
      btn.textContent = this.saving ? "\u4FDD\u5B58\u4E2D\u2026" : success ? "\u5DF2\u4FDD\u5B58 \u2713" : "\u4FDD\u5B58";
      if (success) {
        this.saveBtnTimer = window.setTimeout(() => {
          btn.textContent = "\u4FDD\u5B58";
          this.saveBtnTimer = null;
        }, 2e3);
      }
    }
    // ==================== GitHub 绑定 ====================
    startGithubBind() {
      const token = getAuthToken();
      if (!token) {
        window.alert("\u8BF7\u5148\u5B8C\u6210\u5FAE\u4FE1\u767B\u5F55");
        return;
      }
      const base = this.opts.apiBase || window.location.origin;
      const url = `${base}/api/oauth/github/authorize?token=${encodeURIComponent(token)}`;
      window.open(url, "github-bind", "width=720,height=720,menubar=no,toolbar=no,location=no,status=no");
      if (this.githubMsgListener) return;
      this.githubMsgListener = (e) => {
        const d = e.data;
        if (!d || d.type !== "github-bound") return;
        window.removeEventListener("message", this.githubMsgListener);
        this.githubMsgListener = null;
        void this.fetchUser(true).then(() => {
          var _a, _b, _c;
          this.refreshGithubRow();
          if ((_a = this.user) == null ? void 0 : _a.github) (_c = (_b = this.opts).onGithubBound) == null ? void 0 : _c.call(_b, this.user);
        });
      };
      window.addEventListener("message", this.githubMsgListener);
    }
    // ==================== 积分（wx-auth 账本） ====================
    /**
     * 构建积分卡片的 HTML。
     * 与 GitHub 行同款做法（抽成方法）：读到余额 / 签到 / 重试后原地替换这一块，
     * 不重渲染整个设置弹窗——后者会丢掉用户在「设置名字」输入框里的草稿与焦点。
     */
    buildPointsCardHtml() {
      var _a, _b, _c;
      const p = this.points;
      const loading = this.pointsState === "idle" || this.pointsState === "loading";
      const failed = this.pointsState === "error";
      const reward = (_a = p == null ? void 0 : p.checkinReward) != null ? _a : 0;
      const adReward = (_b = p == null ? void 0 : p.adReward) != null ? _b : 0;
      const balance = loading && !p ? '<span class="ua-points-num ua-points-num-muted">\xB7\xB7\xB7</span>' : failed && !p ? '<span class="ua-points-num ua-points-num-muted">\u2014</span>' : `<span class="ua-points-num${this.pointsBump ? " ua-points-num-bump" : ""}">${(_c = p == null ? void 0 : p.balance) != null ? _c : 0}</span><span class="ua-points-unit">\u5206</span>`;
      const hint = this.pointsTip ? this.pointsTip : (p == null ? void 0 : p.checkedIn) ? `\u4ECA\u65E5\u5DF2\u7B7E\u5230${reward > 0 ? ` +${reward}` : ""}` : reward > 0 ? `\u6BCF\u65E5\u7B7E\u5230 +${reward}` : "\u6BCF\u65E5\u7B7E\u5230\u9886\u79EF\u5206";
      let actions;
      if (loading && !p) {
        actions = '<button type="button" class="ua-points-btn" disabled>\u8BFB\u53D6\u4E2D\u2026</button>';
      } else if (failed && !p) {
        actions = '<button type="button" class="ua-points-btn" data-action="points-retry">\u91CD\u8BD5</button>';
      } else {
        const disabled = this.pointsBusy ? " disabled" : "";
        const checkinBtn = (p == null ? void 0 : p.checkedIn) ? '<button type="button" class="ua-points-btn" disabled>\u4ECA\u65E5\u5DF2\u7B7E\u5230</button>' : `<button type="button" class="ua-points-btn ua-points-btn-primary" data-action="checkin"${disabled}>\u7B7E\u5230${reward > 0 ? ` +${reward}` : ""}</button>`;
        actions = checkinBtn + `<button type="button" class="ua-points-btn" data-action="earn"${disabled}>\u770B\u5E7F\u544A${adReward > 0 ? ` +${adReward}` : ""}</button>`;
      }
      return `
      <div class="ua-points-card">
        <div class="ua-points-head">
          <span class="ua-points-title">${COIN_ICON}<b>\u79EF\u5206</b></span>
          <span class="ua-points-balance">${balance}</span>
        </div>
        <div class="ua-points-foot">
          <span class="ua-points-hint${this.pointsTip && this.pointsTipOk ? " ua-points-hint-ok" : ""}">${escapeHtml(hint)}</span>
          <span class="ua-points-btns">${actions}</span>
        </div>
      </div>`;
    }
    /** 绑定积分卡片内的按钮事件（初次渲染与原地替换后都要调用） */
    bindPointsEvents(root) {
      var _a, _b, _c;
      (_a = root.querySelector('[data-action="checkin"]')) == null ? void 0 : _a.addEventListener("click", () => {
        void this.doCheckin();
      });
      (_b = root.querySelector('[data-action="earn"]')) == null ? void 0 : _b.addEventListener("click", () => {
        this.openEarnDialog();
      });
      (_c = root.querySelector('[data-action="points-retry"]')) == null ? void 0 : _c.addEventListener("click", () => {
        void this.loadPoints();
      });
    }
    /** 原地刷新积分卡片（弹窗未打开时无操作） */
    refreshPointsRow() {
      if (!this.settingsEl) return;
      const old = this.settingsEl.querySelector(".ua-points-card");
      if (!old) return;
      const wrapper = document.createElement("div");
      wrapper.innerHTML = this.buildPointsCardHtml().trim();
      const next = wrapper.firstElementChild;
      if (!next) return;
      old.replaceWith(next);
      this.bindPointsEvents(next);
    }
    /** 一次性提示（签到结果 / 出码失败原因）；写入后由调用方 refreshPointsRow 落地 */
    setPointsTip(text, ok = false) {
      this.pointsTip = text;
      this.pointsTipOk = ok;
    }
    /**
     * 读余额。已有历史读数时不进「读取中」（避免数字被省略号顶掉再回来），
     * 刷新失败也只提示、不清空旧值——积分是增强信息，不该看起来像坏了。
     */
    async loadPoints() {
      const token = getAuthToken();
      if (!token) return;
      const seq = ++this.pointsSeq;
      if (!this.points) {
        this.pointsState = "loading";
        this.refreshPointsRow();
      }
      const info = await fetchPoints(this.opts.apiBase, token);
      if (seq !== this.pointsSeq) return;
      if (info) {
        this.points = info;
        this.pointsState = "ready";
      } else if (this.points) {
        this.pointsState = "ready";
        this.setPointsTip("\u79EF\u5206\u5237\u65B0\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5");
      } else {
        this.pointsState = "error";
      }
      this.refreshPointsRow();
    }
    /** 每日签到（上游幂等：重复调用返回 granted:0，不会重复发分） */
    async doCheckin() {
      const token = getAuthToken();
      if (!token || this.pointsBusy) return;
      this.pointsBusy = true;
      this.setPointsTip("");
      this.refreshPointsRow();
      const r = await checkinPoints(this.opts.apiBase, token);
      this.pointsBusy = false;
      if (!this.settingsEl) return;
      if (!r) {
        this.setPointsTip("\u7B7E\u5230\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
      } else if (r.granted > 0) {
        this.applyPointsBalance(r.balance);
        if (this.points) this.points.checkedIn = true;
        this.setPointsTip(`\u7B7E\u5230\u6210\u529F +${r.granted} \u79EF\u5206`, true);
        this.bumpPoints();
      } else {
        if (this.points) this.points.checkedIn = true;
        this.setPointsTip("\u4ECA\u5929\u5DF2\u7ECF\u7B7E\u5230\u8FC7\u4E86", true);
      }
      this.refreshPointsRow();
    }
    /** 用服务端读数覆盖本地余额（非法值忽略：宁可不更新也不写脏） */
    applyPointsBalance(value) {
      if (value === null || !Number.isFinite(value)) return;
      if (this.points) this.points = { ...this.points, balance: value };
    }
    /** 余额变化的短促放大反馈：数值悄悄变了没动静，会被感知成「没生效」 */
    bumpPoints() {
      this.pointsBump = true;
      if (this.pointsBumpTimer !== null) clearTimeout(this.pointsBumpTimer);
      this.pointsBumpTimer = window.setTimeout(() => {
        this.pointsBumpTimer = null;
        this.pointsBump = false;
        this.refreshPointsRow();
      }, 800);
    }
    // ==================== 看广告赚积分（固定小程序码） ====================
    /**
     * 弹出「看广告赚积分」的小程序码。
     *
     * 刻意**不动态出码**：看广告赚积分全站共用一张固定的小程序码，用户扫码进小程序
     * 广告页，领票 / 播激励视频 / 加分都在小程序那条链路上完成——网页侧没有票可查，
     * 为一张静态图去请求接口纯属浪费。
     *
     * 到账检测：一个激励视频要十几秒，扫码后立刻查必然是「没变」，所以先静默
     * EARN_FIRST_POLL_DELAY_MS 再开始核对余额，比开窗时的基准余额多即视为到账
     * （多出来的差值就是本次赚到的分）。窗口过后仍可手动「刷新积分」核对。
     */
    openEarnDialog() {
      var _a, _b, _c, _d;
      this.closeEarnDialog();
      const reward = (_b = (_a = this.points) == null ? void 0 : _a.adReward) != null ? _b : 0;
      const waitSec = Math.round(EARN_FIRST_POLL_DELAY_MS / 1e3);
      const mask = document.createElement("div");
      mask.className = "ua-mask";
      mask.style.zIndex = String(this.opts.zIndex + 20);
      mask.innerHTML = `
      <div class="ua-dialog ua-earn" role="dialog" aria-modal="true" aria-label="\u770B\u5E7F\u544A\u8D5A\u79EF\u5206">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u770B\u5E7F\u544A\u8D5A\u79EF\u5206</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${CLOSE_ICON}</button>
        </div>
        <div class="ua-earn-body">
          <p class="ua-earn-sub">\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u91CC\u770B\u5B8C\u4E00\u4E2A\u6FC0\u52B1\u89C6\u9891${reward > 0 ? `\uFF0C<b>+${reward} \u79EF\u5206</b>\u81EA\u52A8\u5230\u8D26` : "\uFF0C\u79EF\u5206\u81EA\u52A8\u5230\u8D26"}</p>
          <img class="ua-earn-qr" src="${escapeAttr(this.opts.pointsQrSrc)}" alt="\u5C0F\u7A0B\u5E8F\u7801" />
          <div class="ua-earn-status" data-role="earn-status">\u770B\u5B8C\u5E7F\u544A\u7EA6 ${waitSec} \u79D2\u540E\u81EA\u52A8\u5230\u8D26</div>
          <button type="button" class="ua-points-btn" data-action="earn-refresh">\u5237\u65B0\u79EF\u5206</button>
        </div>
      </div>
    `;
      this.adEl = mask;
      this.adBaseline = this.points ? this.points.balance : null;
      this.appendOverlay(mask);
      const close = () => this.closeEarnDialog();
      (_c = mask.querySelector('[data-action="close"]')) == null ? void 0 : _c.addEventListener("click", close);
      (_d = mask.querySelector('[data-action="earn-refresh"]')) == null ? void 0 : _d.addEventListener("click", () => {
        void this.checkEarnManually();
      });
      const onMaskDown = (e) => {
        if (e.composedPath()[0] === mask) close();
      };
      const onDocKey = (e) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("mousedown", onMaskDown);
      document.addEventListener("keydown", onDocKey);
      this.adCleanup = () => {
        document.removeEventListener("mousedown", onMaskDown);
        document.removeEventListener("keydown", onDocKey);
      };
      this.adFirstTimer = window.setTimeout(() => {
        this.adFirstTimer = null;
        if (!this.adEl) return;
        this.setEarnStatus("\u6B63\u5728\u68C0\u6D4B\u79EF\u5206\u5230\u8D26\u2026");
        this.startEarnPolling();
      }, EARN_FIRST_POLL_DELAY_MS);
    }
    /** 到账核对轮询（第一次在静默期结束后触发） */
    startEarnPolling() {
      this.stopEarnPolling();
      this.adDeadline = Date.now() + EARN_POLL_WINDOW_MS;
      this.adPollTimer = window.setInterval(() => {
        if (this.adPolling) return;
        if (Date.now() > this.adDeadline) {
          this.stopEarnPolling();
          this.setEarnStatus("\u8FD8\u6CA1\u68C0\u6D4B\u5230\u5230\u8D26\uFF0C\u53EF\u70B9\u300C\u5237\u65B0\u79EF\u5206\u300D\u518D\u6838\u5BF9\u4E00\u6B21");
          return;
        }
        void this.checkEarnOnce();
      }, EARN_POLL_INTERVAL_MS);
    }
    stopEarnPolling() {
      if (this.adPollTimer !== null) {
        clearInterval(this.adPollTimer);
        this.adPollTimer = null;
      }
    }
    /**
     * 读一次余额并判断是否到账。
     * 读失败（网络抖动 / 服务不可用）按「本次没结论」处理，继续轮询即可。
     */
    async checkEarnOnce() {
      if (this.adPolling || !this.adEl || this.adRedeemed) return false;
      this.adPolling = true;
      let info = null;
      try {
        info = await this.readPoints();
      } finally {
        this.adPolling = false;
      }
      if (!this.adEl || !info) return false;
      return this.maybeSettle(info);
    }
    /** 「刷新积分」：手动核对一次（不受自动核对窗口限制） */
    async checkEarnManually() {
      if (!this.adEl || this.adRedeemed) return;
      const info = await this.readPoints();
      if (!this.adEl || !info) {
        if (this.adEl) this.setEarnStatus("\u79EF\u5206\u8BFB\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5", "err");
        return;
      }
      if (this.maybeSettle(info)) return;
      this.setEarnStatus("\u8FD8\u6CA1\u68C0\u6D4B\u5230\u65B0\u7684\u79EF\u5206\u5230\u8D26\uFF0C\u770B\u5B8C\u5E7F\u544A\u518D\u70B9\u4E00\u6B21");
    }
    /**
     * 用余额差值判断本次广告是否到账：比开窗基准多即结算，多出来的差值就是这次赚的。
     * 基准未知（开窗前没读到余额）时，把第一次读到的值当基准——否则会把
     * 「第一次读成功」误判成「已到账」。
     */
    maybeSettle(info) {
      if (this.adRedeemed) return true;
      if (this.adBaseline === null) {
        this.adBaseline = info.balance;
        return false;
      }
      if (info.balance <= this.adBaseline) return false;
      this.settleEarn(info);
      return true;
    }
    /** 到账：状态行报喜 + 卡片余额刷新，「已到账」停留一瞬后收起弹窗 */
    settleEarn(info) {
      if (this.adRedeemed) return;
      this.adRedeemed = true;
      this.stopEarnPolling();
      const gained = this.adBaseline === null ? 0 : info.balance - this.adBaseline;
      this.setEarnStatus(gained > 0 ? `\u5DF2\u5230\u8D26 +${gained} \u79EF\u5206` : "\u79EF\u5206\u5DF2\u5230\u8D26", "ok");
      this.setPointsTip(gained > 0 ? `\u770B\u5E7F\u544A +${gained} \u79EF\u5206\u5DF2\u5230\u8D26` : "\u770B\u5E7F\u544A\u79EF\u5206\u5DF2\u5230\u8D26", true);
      this.bumpPoints();
      this.refreshPointsRow();
      this.adCloseTimer = window.setTimeout(() => {
        this.adCloseTimer = null;
        this.closeEarnDialog();
      }, 900);
    }
    /** 读一次余额并落地到卡片（成功返回读数；失败返回 null，不动已有读数） */
    async readPoints() {
      const token = getAuthToken();
      if (!token) return null;
      const info = await fetchPoints(this.opts.apiBase, token);
      if (!info) return null;
      this.points = info;
      this.pointsState = "ready";
      this.refreshPointsRow();
      return info;
    }
    setEarnStatus(text, kind = "") {
      var _a;
      const el = (_a = this.adEl) == null ? void 0 : _a.querySelector('[data-role="earn-status"]');
      if (!el) return;
      el.textContent = text;
      el.className = `ua-earn-status${kind ? ` ua-earn-status-${kind}` : ""}`;
    }
    closeEarnDialog() {
      var _a, _b;
      this.stopEarnPolling();
      if (this.adFirstTimer !== null) {
        clearTimeout(this.adFirstTimer);
        this.adFirstTimer = null;
      }
      if (this.adCloseTimer !== null) {
        clearTimeout(this.adCloseTimer);
        this.adCloseTimer = null;
      }
      (_a = this.adEl) == null ? void 0 : _a.remove();
      this.adEl = null;
      (_b = this.adCleanup) == null ? void 0 : _b.call(this);
      this.adCleanup = null;
      this.adRedeemed = false;
      this.adBaseline = null;
    }
  };

  // src/web-component.ts
  var TAG = "user-avatar";
  var GLOBAL_KEY = "__USER_AVATAR_OPTIONS__";
  function readGlobal() {
    return window[GLOBAL_KEY];
  }
  function boolAttr(el, name, fallback) {
    const v = el.getAttribute(name);
    if (v === null) return fallback;
    return v === "" || v === "true" || v === "1";
  }
  function numAttr(el, name, fallback) {
    const v = el.getAttribute(name);
    if (v === null || v === "") return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }
  function resolvePortalEl(value) {
    if (typeof value !== "string" || value.trim() === "") return void 0;
    const v = value.trim();
    const id = v.startsWith("#") ? v.slice(1) : v;
    const byId = document.getElementById(id);
    if (byId) return byId;
    try {
      const found = document.querySelector(v);
      return found != null ? found : void 0;
    } catch {
      return void 0;
    }
  }
  var THEME_ATTRS = [
    ["theme-btn-bg", "btnBg"],
    ["theme-size", "size"],
    ["theme-accent", "accent"],
    ["theme-btn-border", "btnBorder"],
    ["theme-radius", "radius"],
    ["theme-bg", "bg"],
    ["theme-text", "text"],
    ["theme-sub-text", "subText"],
    ["theme-overlay", "overlay"],
    ["theme-danger", "danger"],
    ["theme-success", "success"]
  ];
  var UserAvatarElement = class extends HTMLElement {
    constructor() {
      super();
      this.widget = null;
      this.pollTimer = null;
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = styles_default;
      this.shadow.appendChild(style);
    }
    static get observedAttributes() {
      return [
        "api-base",
        "fixed",
        "offset",
        "size",
        "z-index",
        "portal",
        "portal-el",
        "points-qr-src",
        "login-required",
        ...THEME_ATTRS.map(([attr]) => attr)
      ];
    }
    /** 环境检查透传：供宿主组件（如 site-navbar）在无法直接 import 类时调用 */
    static check() {
      return UserAvatar.check();
    }
    connectedCallback() {
      this.mountWidget();
      if (UserAvatar.check() !== null) {
        this.startPolling();
      }
    }
    disconnectedCallback() {
      var _a;
      this.stopPolling();
      (_a = this.widget) == null ? void 0 : _a.unmount();
      this.widget = null;
    }
    attributeChangedCallback() {
      if (this.isConnected) {
        this.stopPolling();
        this.mountWidget();
        if (UserAvatar.check() !== null) this.startPolling();
      }
    }
    startPolling() {
      if (this.pollTimer) return;
      this.pollTimer = setInterval(() => {
        if (UserAvatar.check() === null) {
          this.stopPolling();
          this.mountWidget();
        }
      }, 400);
    }
    stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    }
    mountWidget() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.unmount();
      const error = UserAvatar.check();
      if (error) {
        console.warn(`[${TAG}] ${error}`);
      }
      this.widget = new UserAvatar(this.buildOptions(), this.shadow);
      this.widget.mount();
    }
    buildOptions() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const global = (_a = readGlobal()) != null ? _a : {};
      const props = (_b = this.props) != null ? _b : {};
      const get = (name) => this.getAttribute(name);
      const themeAttrs = {};
      for (const [attr, key] of THEME_ATTRS) {
        const v = get(attr);
        if (v !== null) themeAttrs[key] = v;
      }
      const attrs = {
        apiBase: (_c = get("api-base")) != null ? _c : void 0,
        fixed: get("fixed") !== null ? boolAttr(this, "fixed", true) : void 0,
        offset: (_d = get("offset")) != null ? _d : void 0,
        size: (_e = get("size")) != null ? _e : void 0,
        zIndex: get("z-index") !== null ? numAttr(this, "z-index", 12e3) : void 0,
        portal: get("portal") !== null ? boolAttr(this, "portal", true) : void 0,
        portalEl: resolvePortalEl((_f = get("portal-el")) != null ? _f : void 0),
        pointsQrSrc: (_g = get("points-qr-src")) != null ? _g : void 0,
        loginRequired: get("login-required") !== null ? boolAttr(this, "login-required", false) : void 0,
        theme: Object.keys(themeAttrs).length ? themeAttrs : void 0
      };
      return {
        ...compact(global),
        ...compact(attrs),
        ...compact(props),
        theme: { ...(_h = global.theme) != null ? _h : {}, ...(_i = attrs.theme) != null ? _i : {}, ...(_j = props.theme) != null ? _j : {} }
      };
    }
  };
  function compact(o) {
    const out = {};
    for (const [k, v] of Object.entries(o)) {
      if (v !== void 0) out[k] = v;
    }
    return out;
  }
  if (!customElements.get(TAG)) {
    customElements.define(TAG, UserAvatarElement);
  }
})();

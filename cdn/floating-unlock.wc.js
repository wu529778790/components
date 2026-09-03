/* @wu529778790/floating-unlock v0.1.0 */
"use strict";
(() => {
  // src/FloatingUnlock.ts
  var DEFAULT_TITLE = "\u5E2E\u5E2E\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u5427";
  var DEFAULT_CONTENT = "\u670D\u52A1\u5668\u53C8\u5FEB\u625B\u4E0D\u4F4F\u4E86\uFF0C\u770B\u4E2A\u5E7F\u544A\u5E2E\u670D\u52A1\u5668\u7EED\u4E2A\u547D\u5427\u3002\n\n\u626B\u7801\u8FDB\u5C0F\u7A0B\u5E8F\u770B\u5B8C\u89C6\u9891\uFF0C\u672C\u9875\u7ACB\u523B\u81EA\u52A8\u653E\u884C\uFF0C\u611F\u8C22\u7406\u89E3\uFF01";
  var DEFAULT_THEME = {
    bg: "#fff",
    accent: "#185fa5",
    radius: "16px",
    border: "rgba(0, 0, 0, 0.1)",
    overlay: "rgba(0, 0, 0, 0.4)",
    titleColor: "#1f1f1f",
    textColor: "#555"
  };
  var MIN_POLL_DELAY_MS = 15 * 1e3;
  var POLL_INTERVAL_MS = 2e3;
  var FloatingUnlock = class {
    constructor(options = {}, container = document.body) {
      this.mask = null;
      this.ticket = "";
      this.qrDataUrl = "";
      this.expiresAt = 0;
      this.status = "idle";
      this.unlockPromise = null;
      this.resolveUnlock = null;
      this.pollTimer = null;
      this.delayTimer = null;
      this.countdownTimer = null;
      this.destroyed = false;
      this.opts = this.resolve(options);
      this.container = container;
    }
    /** 当前状态 */
    getState() {
      return this.status;
    }
    /** 是否正在展示 */
    isOpen() {
      return this.mask !== null && this.mask.isConnected;
    }
    /**
     * 发起解锁。返回 Promise：
     *   resolve(true)  → 解锁成功，业务可继续
     *   resolve(false) → 失败/过期/出码失败，业务应中断
     */
    unlock() {
      if (this.unlockPromise) return this.unlockPromise;
      this.unlockPromise = new Promise((resolve) => {
        this.resolveUnlock = resolve;
        this.start();
      });
      return this.unlockPromise;
    }
    /** 关闭并销毁（解锁成功后由内部调用；外部一般无需调用） */
    close() {
      this.destroy();
    }
    /** 从页面移除并解绑 */
    destroy() {
      var _a;
      this.destroyed = true;
      this.stopPolling();
      this.stopCountdown();
      (_a = this.mask) == null ? void 0 : _a.remove();
      this.mask = null;
      this.unlockPromise = null;
      this.resolveUnlock = null;
      unlockBodyScroll();
    }
    // ==================== 内部实现 ====================
    resolve(options) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return {
        apiBase: ((_a = options.apiBase) != null ? _a : "https://wx-auth.shenzjd.com").replace(/\/+$/, ""),
        siteId: (_b = options.siteId) != null ? _b : "",
        title: (_c = options.title) != null ? _c : DEFAULT_TITLE,
        content: (_d = options.content) != null ? _d : DEFAULT_CONTENT,
        contentHtml: (_e = options.contentHtml) != null ? _e : "",
        width: (_f = options.width) != null ? _f : 380,
        zIndex: (_g = options.zIndex) != null ? _g : 1e4,
        theme: { ...DEFAULT_THEME, ...(_h = options.theme) != null ? _h : {} },
        onUnlocked: options.onUnlocked,
        onError: options.onError
      };
    }
    start() {
      this.render();
      this.setStatus("loading");
      void this.createTicket();
    }
    async createTicket() {
      try {
        const res = await fetch(`${this.opts.apiBase}/api/auth/mp-reward/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ siteId: this.opts.siteId || void 0 })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data.ticket || !data.qrDataUrl) throw new Error("create \u54CD\u5E94\u7F3A\u5C11 ticket/qrDataUrl");
        this.ticket = String(data.ticket);
        this.qrDataUrl = String(data.qrDataUrl);
        this.expiresAt = Date.now() + (Number(data.expiresIn) || 300) * 1e3;
        this.setStatus("waiting");
        this.showQr();
        this.startCountdown();
        this.delayTimer = setTimeout(() => this.startPolling(), MIN_POLL_DELAY_MS);
      } catch (error) {
        this.fail("create_failed", error instanceof Error ? error.message : "\u51FA\u7801\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
    }
    startPolling() {
      if (this.destroyed || this.status !== "waiting") return;
      this.stopPolling();
      this.pollTimer = setInterval(() => void this.poll(), POLL_INTERVAL_MS);
    }
    async poll() {
      if (this.destroyed || this.status !== "waiting" || !this.ticket) return;
      if (Date.now() >= this.expiresAt) {
        this.setStatus("expired");
        this.stopPolling();
        this.stopCountdown();
        return;
      }
      try {
        const res = await fetch(
          `${this.opts.apiBase}/api/auth/mp-reward/status?ticket=${encodeURIComponent(this.ticket)}`
        );
        if (!res.ok) {
          if (res.status >= 500 || res.status === 429) return;
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data.status === "unlocked") {
          this.succeed();
        } else if (data.status === "expired") {
          this.setStatus("expired");
          this.stopPolling();
          this.stopCountdown();
        }
      } catch {
      }
    }
    succeed() {
      var _a, _b;
      this.stopPolling();
      this.stopCountdown();
      this.setStatus("unlocked");
      (_b = (_a = this.opts).onUnlocked) == null ? void 0 : _b.call(_a, { ticket: this.ticket, siteId: this.opts.siteId });
      setTimeout(() => {
        var _a2;
        if (this.destroyed) return;
        (_a2 = this.resolveUnlock) == null ? void 0 : _a2.call(this, true);
        this.resolveUnlock = null;
        this.destroy();
      }, 600);
    }
    fail(code, message) {
      var _a, _b, _c;
      this.stopPolling();
      this.stopCountdown();
      (_b = (_a = this.opts).onError) == null ? void 0 : _b.call(_a, { code, message });
      (_c = this.resolveUnlock) == null ? void 0 : _c.call(this, false);
      this.resolveUnlock = null;
      this.destroy();
    }
    setStatus(status) {
      this.status = status;
      this.updateStatusUI();
    }
    stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    }
    stopCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    }
    startCountdown() {
      this.stopCountdown();
      const tick = () => {
        var _a;
        if (this.destroyed) return;
        const remain = Math.max(0, Math.ceil((this.expiresAt - Date.now()) / 1e3));
        const el = (_a = this.mask) == null ? void 0 : _a.querySelector(".fu-countdown");
        if (el) el.textContent = `\u4E8C\u7EF4\u7801 ${remain}s \u540E\u8FC7\u671F`;
        if (remain <= 0) this.stopCountdown();
      };
      tick();
      this.countdownTimer = setInterval(tick, 1e3);
    }
    showQr() {
      var _a, _b;
      const img = (_a = this.mask) == null ? void 0 : _a.querySelector(".fu-qr-img");
      const loading = (_b = this.mask) == null ? void 0 : _b.querySelector(".fu-loading");
      if (img) {
        img.src = this.qrDataUrl;
        img.style.display = "block";
      }
      if (loading) loading.style.display = "none";
    }
    render() {
      const { width, zIndex, theme } = this.opts;
      const mask = document.createElement("div");
      mask.className = "fu-mask";
      mask.style.zIndex = String(zIndex);
      mask.style.setProperty("--fu-overlay", theme.overlay);
      mask.style.setProperty("--fu-bg", theme.bg);
      mask.style.setProperty("--fu-accent", theme.accent);
      mask.style.setProperty("--fu-radius", theme.radius);
      mask.style.setProperty("--fu-border", theme.border);
      mask.style.setProperty("--fu-title-color", theme.titleColor);
      mask.style.setProperty("--fu-text-color", theme.textColor);
      mask.style.setProperty("--fu-width", `${width}px`);
      mask.innerHTML = `
      <div class="fu-modal" role="dialog" aria-modal="true" aria-label="${escapeAttr(this.opts.title)}">
        <p class="fu-title">${escapeHtml(this.opts.title)}</p>
        <div class="fu-content">${this.buildContent()}</div>
        <div class="fu-qr">
          <div class="fu-loading"><span class="fu-spinner"></span></div>
          <img class="fu-qr-img" alt="\u89E3\u9501\u4E8C\u7EF4\u7801" style="display:none" />
        </div>
        <div class="fu-status">
          <span class="fu-countdown"></span>
          <span class="fu-hint">\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u5185\u89C2\u770B\u89C6\u9891\u5373\u53EF\u89E3\u9501</span>
        </div>
        <div class="fu-expired" style="display:none">
          <div class="fu-expired-text">\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F</div>
          <button class="fu-btn" type="button">\u5237\u65B0\u4E8C\u7EF4\u7801</button>
        </div>
      </div>
    `;
      const refreshBtn = mask.querySelector(".fu-btn");
      refreshBtn == null ? void 0 : refreshBtn.addEventListener("click", () => this.refresh());
      this.container.appendChild(mask);
      this.mask = mask;
      lockBodyScroll();
    }
    refresh() {
      if (!this.mask) return;
      const expired = this.mask.querySelector(".fu-expired");
      const img = this.mask.querySelector(".fu-qr-img");
      const loading = this.mask.querySelector(".fu-loading");
      if (expired) expired.style.display = "none";
      if (img) img.style.display = "none";
      if (loading) loading.style.display = "flex";
      this.setStatus("loading");
      void this.createTicket();
    }
    buildContent() {
      if (this.opts.contentHtml) return this.opts.contentHtml;
      return escapeHtml(this.opts.content).replace(/\n/g, "<br>");
    }
    updateStatusUI() {
      if (!this.mask) return;
      const expired = this.mask.querySelector(".fu-expired");
      const countdown = this.mask.querySelector(".fu-countdown");
      const hint = this.mask.querySelector(".fu-hint");
      const img = this.mask.querySelector(".fu-qr-img");
      const loading = this.mask.querySelector(".fu-loading");
      if (this.status === "unlocked") {
        if (expired) expired.style.display = "none";
        if (countdown) countdown.textContent = "";
        if (hint) {
          hint.textContent = "\u2705 \u89E3\u9501\u6210\u529F\uFF0C\u5373\u5C06\u7EE7\u7EED\u2026";
          hint.style.color = "var(--fu-accent)";
        }
      } else if (this.status === "waiting") {
        if (expired) expired.style.display = "none";
        if (countdown) countdown.textContent = "";
        if (hint) {
          hint.textContent = "\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u5185\u89C2\u770B\u89C6\u9891\u5373\u53EF\u89E3\u9501";
          hint.style.color = "";
        }
        if (loading) loading.style.display = "none";
      } else if (this.status === "expired") {
        if (expired) expired.style.display = "flex";
        if (countdown) countdown.textContent = "";
        if (hint) hint.textContent = "";
        if (img) img.style.display = "none";
        if (loading) loading.style.display = "none";
      } else if (this.status === "loading") {
        if (expired) expired.style.display = "none";
        if (countdown) countdown.textContent = "";
        if (hint) {
          hint.textContent = "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026";
          hint.style.color = "";
        }
        if (img) img.style.display = "none";
        if (loading) loading.style.display = "flex";
      }
    }
  };
  var scrollLockCount = 0;
  var scrollLockState = null;
  function lockBodyScroll() {
    scrollLockCount += 1;
    if (scrollLockState) return;
    const body = document.body;
    const st = body.style;
    scrollLockState = {
      top: st.top,
      left: st.left,
      width: st.width,
      position: st.position,
      scrollY: window.scrollY
    };
    st.top = `-${scrollLockState.scrollY}px`;
    st.left = "0";
    st.width = "100%";
    st.position = "fixed";
  }
  function unlockBodyScroll() {
    if (scrollLockCount <= 0) return;
    scrollLockCount -= 1;
    if (scrollLockCount > 0 || !scrollLockState) return;
    const body = document.body;
    const st = body.style;
    const state = scrollLockState;
    scrollLockState = null;
    st.top = state.top;
    st.left = state.left;
    st.width = state.width;
    st.position = state.position;
    if (state.scrollY > 0) {
      requestAnimationFrame(() => window.scrollTo(0, state.scrollY));
    }
  }
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function escapeAttr(value) {
    return escapeHtml(value);
  }

  // src/styles.css
  var styles_default = '.fu-mask {\n  --fu-overlay: rgba(0, 0, 0, 0.4);\n  --fu-bg: #fff;\n  --fu-accent: #185fa5;\n  --fu-radius: 16px;\n  --fu-border: rgba(0, 0, 0, 0.1);\n  --fu-title-color: #1f1f1f;\n  --fu-text-color: #555;\n  --fu-width: 380px;\n\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  box-sizing: border-box;\n  background: var(--fu-overlay);\n  animation: fu-fade-in 0.18s ease;\n}\n\n.fu-modal {\n  position: relative;\n  box-sizing: border-box;\n  width: var(--fu-width);\n  max-width: 92vw;\n  max-height: 88vh;\n  overflow-y: auto;\n  padding: 28px 28px 24px;\n  background: var(--fu-bg);\n  border: 1px solid var(--fu-border);\n  border-radius: var(--fu-radius);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);\n  text-align: center;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    sans-serif;\n  line-height: 1.6;\n  animation: fu-rise-in 0.22s ease;\n}\n\n.fu-title {\n  margin: 0 0 12px;\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--fu-title-color);\n}\n\n.fu-content {\n  margin: 0 0 18px;\n  font-size: 13px;\n  color: var(--fu-text-color);\n}\n\n.fu-qr {\n  position: relative;\n  margin: 0 auto 14px;\n  width: 190px;\n  max-width: 100%;\n  min-height: 190px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.fu-qr-img {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n\n.fu-loading {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.fu-spinner {\n  width: 28px;\n  height: 28px;\n  border: 3px solid rgba(0, 0, 0, 0.1);\n  border-top-color: var(--fu-accent);\n  border-radius: 50%;\n  animation: fu-spin 0.8s linear infinite;\n}\n\n.fu-status {\n  margin: 0 0 6px;\n  font-size: 12px;\n  color: var(--fu-text-color);\n}\n\n.fu-countdown {\n  display: block;\n  margin-bottom: 4px;\n  font-size: 12px;\n  color: #999;\n}\n\n.fu-hint {\n  display: block;\n  font-size: 12px;\n  color: var(--fu-text-color);\n}\n\n.fu-expired {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  margin-top: 4px;\n}\n\n.fu-expired-text {\n  font-size: 14px;\n  color: var(--fu-text-color);\n}\n\n.fu-btn {\n  padding: 8px 24px;\n  border: none;\n  border-radius: 8px;\n  background: var(--fu-accent);\n  color: #fff;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: opacity 0.15s ease;\n}\n\n.fu-btn:hover {\n  opacity: 0.85;\n}\n\n@keyframes fu-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fu-rise-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes fu-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 480px) {\n  .fu-modal {\n    padding: 24px 20px 20px;\n  }\n\n  .fu-qr {\n    width: 160px;\n    min-height: 160px;\n  }\n}';

  // src/web-component.ts
  var TAG = "floating-unlock";
  var GLOBAL_KEY = "__FLOATING_UNLOCK_OPTIONS__";
  function readGlobal() {
    return window[GLOBAL_KEY];
  }
  function numAttr(el, name, fallback) {
    const v = el.getAttribute(name);
    if (v === null || v === "") return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }
  var THEME_ATTRS = [
    ["theme-bg", "bg"],
    ["theme-accent", "accent"],
    ["theme-radius", "radius"],
    ["theme-border", "border"],
    ["theme-overlay", "overlay"],
    ["theme-title-color", "titleColor"],
    ["theme-text-color", "textColor"]
  ];
  var FloatingUnlockElement = class extends HTMLElement {
    constructor() {
      super();
      this.widget = null;
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = styles_default;
      this.shadow.appendChild(style);
    }
    static get observedAttributes() {
      return [
        "api-base",
        "site-id",
        "title",
        "content",
        "content-html",
        "width",
        "z-index",
        ...THEME_ATTRS.map(([attr]) => attr)
      ];
    }
    disconnectedCallback() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.destroy();
      this.widget = null;
    }
    /**
     * 发起解锁。返回 Promise：
     *   resolve(true)  → 解锁成功，业务可继续
     *   resolve(false) → 失败/过期，业务应中断
     */
    unlock() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.destroy();
      this.widget = new FloatingUnlock(this.buildOptions(), this.shadow);
      return this.widget.unlock();
    }
    /** 关闭弹窗 */
    close() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.close();
    }
    buildOptions() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const global = (_a = readGlobal()) != null ? _a : {};
      const get = (name) => this.getAttribute(name);
      const theme = {};
      for (const [attr, key] of THEME_ATTRS) {
        const v = get(attr);
        if (v !== null) theme[key] = v;
      }
      return {
        ...global,
        apiBase: (_b = get("api-base")) != null ? _b : global.apiBase,
        siteId: (_c = get("site-id")) != null ? _c : global.siteId,
        title: (_d = get("title")) != null ? _d : global.title,
        content: (_e = get("content")) != null ? _e : global.content,
        contentHtml: (_f = get("content-html")) != null ? _f : global.contentHtml,
        width: numAttr(this, "width", (_g = global.width) != null ? _g : 380),
        zIndex: numAttr(this, "z-index", (_h = global.zIndex) != null ? _h : 1e4),
        theme: { ...(_i = global.theme) != null ? _i : {}, ...theme }
      };
    }
  };
  if (!customElements.get(TAG)) {
    customElements.define(TAG, FloatingUnlockElement);
  }
})();

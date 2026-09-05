/* @wu529778790/floating-unlock v0.1.3 */
"use strict";
(() => {
  // src/FloatingUnlock.ts
  var DEFAULT_QR_SRC = "https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/reward-unlock-qr.jpg";
  var DEFAULT_TITLE = "\u5E2E\u5E2E\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u5427";
  var DEFAULT_CONTENT = "\u670D\u52A1\u5668\u6210\u672C\u4E0D\u5C0F\uFF0C\u5982\u679C\u89C9\u5F97\u597D\u7528\uFF0C\u5FAE\u4FE1\u626B\u7801\u770B\u4E2A\u89C6\u9891\u652F\u6301\u4E00\u4E0B\u5427\u3002";
  var DEFAULT_HINT = "\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u5185\u89C2\u770B\u89C6\u9891\uFF08\u81EA\u613F\u652F\u6301\uFF0C\u968F\u65F6\u53EF\u5173\u95ED\uFF09";
  var BTN_DISMISS = "\u7B97\u4E86\uFF0C\u4E0B\u6B21\u5427";
  var BTN_SUPPORT = "\u6211\u5DF2\u7ECF\u770B\u89C6\u9891\uFF0C\u652F\u6301\u4F5C\u8005";
  var DEFAULT_THEME = {
    bg: "#fff",
    accent: "#185fa5",
    radius: "16px",
    border: "rgba(0, 0, 0, 0.1)",
    overlay: "rgba(0, 0, 0, 0.4)",
    titleColor: "#1f1f1f",
    textColor: "#555"
  };
  var FloatingUnlock = class {
    constructor(options = {}, container = document.body) {
      this.mask = null;
      this.status = "idle";
      this.escHandler = null;
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
     * 兼容旧版调用点：打开弹窗并立即返回成功（不再阻塞业务、不再产生票据）。
     * 新代码请直接用 show()。
     */
    unlock() {
      this.show();
      return Promise.resolve({ ok: true, ticket: null, grant: null });
    }
    /** 打开弹窗（重复调用幂等） */
    show() {
      if (this.destroyed || this.isOpen()) return;
      this.render();
      this.status = "open";
    }
    /** 关闭弹窗（可随时再 show() 打开） */
    close() {
      this.teardown();
    }
    /** 从页面移除并解绑，之后不可再 show() */
    destroy() {
      this.destroyed = true;
      this.teardown();
    }
    // ==================== 内部实现 ====================
    resolve(options) {
      var _a, _b, _c, _d, _e, _f, _g;
      return {
        qrSrc: (_a = options.qrSrc) != null ? _a : DEFAULT_QR_SRC,
        title: (_b = options.title) != null ? _b : DEFAULT_TITLE,
        content: (_c = options.content) != null ? _c : DEFAULT_CONTENT,
        contentHtml: (_d = options.contentHtml) != null ? _d : "",
        width: (_e = options.width) != null ? _e : 380,
        zIndex: (_f = options.zIndex) != null ? _f : 1e4,
        theme: { ...DEFAULT_THEME, ...(_g = options.theme) != null ? _g : {} }
      };
    }
    render() {
      var _a, _b, _c;
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
        <button class="fu-close" type="button" aria-label="\u5173\u95ED">\xD7</button>
        <p class="fu-title">${escapeHtml(this.opts.title)}</p>
        <div class="fu-content">${this.buildContent()}</div>
        <div class="fu-qr"><img class="fu-qr-img" alt="\u652F\u6301\u4E8C\u7EF4\u7801" src="${escapeAttr(this.opts.qrSrc)}" /></div>
        <div class="fu-hint">${escapeHtml(DEFAULT_HINT)}</div>
        <div class="fu-actions">
          <button class="fu-btn fu-btn-ghost" type="button">${escapeHtml(BTN_DISMISS)}</button>
          <button class="fu-btn fu-btn-primary" type="button">${escapeHtml(BTN_SUPPORT)}</button>
        </div>
      </div>
    `;
      (_a = mask.querySelector(".fu-close")) == null ? void 0 : _a.addEventListener("click", () => this.close());
      (_b = mask.querySelector(".fu-btn-ghost")) == null ? void 0 : _b.addEventListener("click", () => this.close());
      (_c = mask.querySelector(".fu-btn-primary")) == null ? void 0 : _c.addEventListener("click", () => this.close());
      mask.addEventListener("click", (e) => {
        if (e.target === mask) this.close();
      });
      this.escHandler = (e) => {
        if (e.key === "Escape") this.close();
      };
      document.addEventListener("keydown", this.escHandler);
      this.container.appendChild(mask);
      this.mask = mask;
      lockBodyScroll();
    }
    teardown() {
      var _a;
      if (this.escHandler) {
        document.removeEventListener("keydown", this.escHandler);
        this.escHandler = null;
      }
      (_a = this.mask) == null ? void 0 : _a.remove();
      this.mask = null;
      this.status = "idle";
      unlockBodyScroll();
    }
    buildContent() {
      if (this.opts.contentHtml) return this.opts.contentHtml;
      return escapeHtml(this.opts.content).replace(/\n/g, "<br>");
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
  var styles_default = '.fu-mask {\n  --fu-overlay: rgba(0, 0, 0, 0.4);\n  --fu-bg: #fff;\n  --fu-accent: #185fa5;\n  --fu-radius: 16px;\n  --fu-border: rgba(0, 0, 0, 0.1);\n  --fu-title-color: #1f1f1f;\n  --fu-text-color: #555;\n  --fu-width: 380px;\n\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  box-sizing: border-box;\n  background: var(--fu-overlay);\n  animation: fu-fade-in 0.18s ease;\n}\n\n.fu-modal {\n  position: relative;\n  box-sizing: border-box;\n  width: var(--fu-width);\n  max-width: 92vw;\n  max-height: 88vh;\n  overflow-y: auto;\n  padding: 28px 28px 24px;\n  background: var(--fu-bg);\n  border: 1px solid var(--fu-border);\n  border-radius: var(--fu-radius);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);\n  text-align: center;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    sans-serif;\n  line-height: 1.6;\n  animation: fu-rise-in 0.22s ease;\n}\n\n.fu-close {\n  position: absolute;\n  top: 10px;\n  right: 12px;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: none;\n  background: transparent;\n  color: #999;\n  font-size: 22px;\n  line-height: 1;\n  cursor: pointer;\n  border-radius: 8px;\n  transition: color 0.15s ease, background 0.15s ease;\n}\n\n.fu-close:hover {\n  color: var(--fu-accent);\n  background: rgba(0, 0, 0, 0.05);\n}\n\n.fu-title {\n  margin: 0 0 12px;\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--fu-title-color);\n}\n\n.fu-content {\n  margin: 0 0 18px;\n  font-size: 13px;\n  color: var(--fu-text-color);\n}\n\n.fu-qr {\n  margin: 0 auto 14px;\n  width: 190px;\n  max-width: 100%;\n}\n\n.fu-qr-img {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n\n.fu-hint {\n  display: block;\n  font-size: 12px;\n  color: var(--fu-text-color);\n}\n\n.fu-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.fu-btn {\n  flex: 1;\n  min-width: 0;\n  padding: 9px 8px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.4;\n  cursor: pointer;\n  transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease;\n  box-sizing: border-box;\n}\n\n.fu-btn-ghost {\n  border: 1px solid var(--fu-border);\n  background: transparent;\n  color: var(--fu-text-color);\n}\n\n.fu-btn-ghost:hover {\n  border-color: var(--fu-accent);\n  color: var(--fu-accent);\n}\n\n.fu-btn-primary {\n  border: none;\n  background: var(--fu-accent);\n  color: #fff;\n}\n\n.fu-btn-primary:hover {\n  opacity: 0.85;\n}\n\n@keyframes fu-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fu-rise-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@media (max-width: 480px) {\n  .fu-modal {\n    padding: 24px 20px 20px;\n  }\n\n  .fu-qr {\n    width: 160px;\n  }\n}\n';

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
        "qr-src",
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
     * 兼容旧版调用点：打开弹窗并立即 resolve（不再阻塞业务、不再产生票据）。
     * 新代码请直接用 show()。
     */
    unlock() {
      this.ensureWidget().show();
      return Promise.resolve({ ok: true, ticket: null, grant: null });
    }
    /** 打开弹窗 */
    show() {
      this.ensureWidget().show();
    }
    /** 关闭弹窗 */
    close() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.close();
    }
    ensureWidget() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.destroy();
      this.widget = new FloatingUnlock(this.buildOptions(), this.shadow);
      return this.widget;
    }
    buildOptions() {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const global = (_a = readGlobal()) != null ? _a : {};
      const get = (name) => this.getAttribute(name);
      const theme = {};
      for (const [attr, key] of THEME_ATTRS) {
        const v = get(attr);
        if (v !== null) theme[key] = v;
      }
      return {
        ...global,
        qrSrc: (_b = get("qr-src")) != null ? _b : global.qrSrc,
        title: (_c = get("title")) != null ? _c : global.title,
        content: (_d = get("content")) != null ? _d : global.content,
        contentHtml: (_e = get("content-html")) != null ? _e : global.contentHtml,
        width: numAttr(this, "width", (_f = global.width) != null ? _f : 380),
        zIndex: numAttr(this, "z-index", (_g = global.zIndex) != null ? _g : 1e4),
        theme: { ...(_h = global.theme) != null ? _h : {}, ...theme }
      };
    }
  };
  if (!customElements.get(TAG)) {
    customElements.define(TAG, FloatingUnlockElement);
  }
})();

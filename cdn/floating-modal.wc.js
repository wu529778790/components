/* @wu529778790/floating-modal v0.1.4 */
"use strict";
(() => {
  // src/FloatingModal.ts
  var DEFAULT_CONTENT = "\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002";
  var DEFAULT_QR = {
    src: "https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",
    alt: "\u8D5E\u8D4F\u7801"
  };
  var DEFAULT_THEME = {
    bg: "#fff",
    accent: "#185fa5",
    radius: "16px",
    border: "rgba(0, 0, 0, 0.1)",
    overlay: "rgba(0, 0, 0, 0.4)",
    titleColor: "#1f1f1f",
    textColor: "#555"
  };
  var FloatingModal = class {
    constructor(options = {}, container = document.body) {
      this.mask = null;
      this.closeBtn = null;
      this.timer = null;
      this.escHandler = null;
      this.handleClose = () => {
        this.close();
      };
      this.handleMaskClick = (e) => {
        if (e.target === this.mask) this.close();
      };
      this.opts = this.resolve(options);
      this.container = container;
      const show = () => this.render();
      if (this.opts.delay > 0) {
        this.timer = setTimeout(show, this.opts.delay);
      } else {
        show();
      }
    }
    /** 是否正在展示 */
    isOpen() {
      return this.mask !== null && this.mask.isConnected;
    }
    /** 展示 */
    show() {
      if (this.isOpen()) return;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.render();
    }
    /** 关闭并销毁 */
    close() {
      var _a, _b;
      this.destroy();
      (_b = (_a = this.opts).onClose) == null ? void 0 : _b.call(_a);
    }
    /** 从页面移除并解绑 */
    destroy() {
      var _a, _b;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.escHandler) {
        document.removeEventListener("keydown", this.escHandler);
        this.escHandler = null;
      }
      (_a = this.closeBtn) == null ? void 0 : _a.removeEventListener("click", this.handleClose);
      this.closeBtn = null;
      (_b = this.mask) == null ? void 0 : _b.remove();
      this.mask = null;
    }
    resolve(options) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const qr = (_a = options.qr) != null ? _a : DEFAULT_QR;
      return {
        title: (_b = options.title) != null ? _b : "\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",
        content: (_c = options.content) != null ? _c : DEFAULT_CONTENT,
        contentHtml: (_d = options.contentHtml) != null ? _d : "",
        qr: { src: qr.src, alt: (_e = qr.alt) != null ? _e : "\u8D5E\u8D4F\u7801" },
        width: (_f = options.width) != null ? _f : 380,
        maskClosable: (_g = options.maskClosable) != null ? _g : true,
        closeOnEsc: (_h = options.closeOnEsc) != null ? _h : true,
        showClose: (_i = options.showClose) != null ? _i : true,
        delay: (_j = options.delay) != null ? _j : 0,
        zIndex: (_k = options.zIndex) != null ? _k : 1e4,
        theme: { ...DEFAULT_THEME, ...(_l = options.theme) != null ? _l : {} },
        onClose: options.onClose
      };
    }
    render() {
      var _a;
      const { width, zIndex, theme, showClose, maskClosable } = this.opts;
      const mask = document.createElement("div");
      mask.className = "fm-mask";
      mask.style.zIndex = String(zIndex);
      mask.style.setProperty("--fm-overlay", theme.overlay);
      mask.style.setProperty("--fm-bg", theme.bg);
      mask.style.setProperty("--fm-accent", theme.accent);
      mask.style.setProperty("--fm-radius", theme.radius);
      mask.style.setProperty("--fm-border", theme.border);
      mask.style.setProperty("--fm-title-color", theme.titleColor);
      mask.style.setProperty("--fm-text-color", theme.textColor);
      mask.style.setProperty("--fm-width", `${width}px`);
      if (maskClosable) {
        mask.addEventListener("click", this.handleMaskClick);
      }
      mask.innerHTML = `
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${escapeAttr(this.opts.title)}">
        ${showClose ? `<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${CLOSE_SVG}</button>` : ""}
        <p class="fm-title">${escapeHtml(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `;
      this.closeBtn = mask.querySelector(".fm-close");
      (_a = this.closeBtn) == null ? void 0 : _a.addEventListener("click", this.handleClose);
      this.container.appendChild(mask);
      this.mask = mask;
      if (this.opts.closeOnEsc) {
        this.escHandler = (e) => {
          if (e.key === "Escape") this.close();
        };
        document.addEventListener("keydown", this.escHandler);
      }
    }
    buildContent() {
      if (this.opts.contentHtml) return this.opts.contentHtml;
      return escapeHtml(this.opts.content).replace(/\n/g, "<br>");
    }
    buildQR() {
      const { qr } = this.opts;
      return `
      <div class="fm-qr">
        <img class="fm-qr-img" src="${escapeAttr(qr.src)}" alt="${escapeAttr(qr.alt)}" loading="lazy" />
      </div>
    `;
    }
  };
  var CLOSE_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function escapeAttr(value) {
    return escapeHtml(value);
  }

  // src/styles.css
  var styles_default = '.fm-mask {\n  --fm-overlay: rgba(0, 0, 0, 0.4);\n  --fm-bg: #fff;\n  --fm-accent: #185fa5;\n  --fm-radius: 16px;\n  --fm-border: rgba(0, 0, 0, 0.1);\n  --fm-title-color: #1f1f1f;\n  --fm-text-color: #555;\n  --fm-width: 380px;\n\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  box-sizing: border-box;\n  background: var(--fm-overlay);\n  animation: fm-fade-in 0.18s ease;\n}\n\n.fm-modal {\n  position: relative;\n  box-sizing: border-box;\n  width: var(--fm-width);\n  max-width: 92vw;\n  max-height: 88vh;\n  overflow-y: auto;\n  padding: 28px 28px 24px;\n  background: var(--fm-bg);\n  border: 1px solid var(--fm-border);\n  border-radius: var(--fm-radius);\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);\n  text-align: center;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    sans-serif;\n  line-height: 1.6;\n  animation: fm-rise-in 0.22s ease;\n}\n\n.fm-close {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  padding: 0;\n  margin: 0;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(0, 0, 0, 0.35);\n  cursor: pointer;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n\n.fm-close:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.fm-title {\n  margin: 0 0 12px;\n  font-size: 17px;\n  font-weight: 500;\n  color: var(--fm-title-color);\n}\n\n.fm-content {\n  margin: 0 0 18px;\n  font-size: 13px;\n  color: var(--fm-text-color);\n}\n\n.fm-qr {\n  margin: 0 auto 14px;\n  width: 190px;\n  max-width: 100%;\n}\n\n.fm-qr-img {\n  display: block;\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n\n@keyframes fm-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fm-rise-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@media (max-width: 480px) {\n  .fm-modal {\n    padding: 24px 20px 20px;\n  }\n\n  .fm-qr {\n    width: 160px;\n  }\n}\n';

  // src/web-component.ts
  var TAG = "floating-modal";
  var GLOBAL_KEY = "__FLOATING_MODAL_OPTIONS__";
  var AUTO_FLAG = "__floatingModalAutoInjected__";
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
  var THEME_ATTRS = [
    ["theme-bg", "bg"],
    ["theme-accent", "accent"],
    ["theme-radius", "radius"],
    ["theme-border", "border"],
    ["theme-overlay", "overlay"],
    ["theme-title-color", "titleColor"],
    ["theme-text-color", "textColor"]
  ];
  var FloatingModalElement = class extends HTMLElement {
    constructor() {
      super();
      this.widget = null;
      this.raf = 0;
      this.shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = styles_default;
      this.shadow.appendChild(style);
    }
    static get observedAttributes() {
      return [
        "auto-show",
        "title",
        "content",
        "content-html",
        "qr-src",
        "qr-alt",
        "width",
        "mask-closable",
        "close-on-esc",
        "show-close",
        "delay",
        "z-index",
        ...THEME_ATTRS.map(([attr]) => attr)
      ];
    }
    connectedCallback() {
      this.renderSoon();
    }
    disconnectedCallback() {
      var _a;
      cancelAnimationFrame(this.raf);
      (_a = this.widget) == null ? void 0 : _a.destroy();
      this.widget = null;
    }
    attributeChangedCallback() {
      if (this.isConnected) this.renderSoon();
    }
    /** 手动展示弹窗（绕过 auto-show 检查，强制渲染） */
    show() {
      var _a, _b;
      if ((_a = this.widget) == null ? void 0 : _a.isOpen()) return;
      (_b = this.widget) == null ? void 0 : _b.destroy();
      this.widget = new FloatingModal(this.buildOptions(), this.shadow);
    }
    /** 关闭弹窗 */
    close() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.close();
    }
    render() {
      var _a;
      if (!this.isConnected) return;
      if (!boolAttr(this, "auto-show", true)) return;
      (_a = this.widget) == null ? void 0 : _a.destroy();
      this.widget = new FloatingModal(this.buildOptions(), this.shadow);
    }
    renderSoon() {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this.render());
    }
    buildOptions() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      const global = (_a = readGlobal()) != null ? _a : {};
      const get = (name) => this.getAttribute(name);
      const theme = {};
      for (const [attr, key] of THEME_ATTRS) {
        const v = get(attr);
        if (v !== null) theme[key] = v;
      }
      const qrSrc = get("qr-src");
      const qrAlt = get("qr-alt");
      const qr = qrSrc === null && qrAlt === null ? global.qr : {
        src: (_c = qrSrc != null ? qrSrc : (_b = global.qr) == null ? void 0 : _b.src) != null ? _c : "",
        alt: qrAlt != null ? qrAlt : (_d = global.qr) == null ? void 0 : _d.alt
      };
      return {
        ...global,
        title: (_e = get("title")) != null ? _e : global.title,
        content: (_f = get("content")) != null ? _f : global.content,
        contentHtml: (_g = get("content-html")) != null ? _g : global.contentHtml,
        qr,
        width: numAttr(this, "width", (_h = global.width) != null ? _h : 380),
        maskClosable: boolAttr(this, "mask-closable", (_i = global.maskClosable) != null ? _i : true),
        closeOnEsc: boolAttr(this, "close-on-esc", (_j = global.closeOnEsc) != null ? _j : true),
        showClose: boolAttr(this, "show-close", (_k = global.showClose) != null ? _k : true),
        delay: numAttr(this, "delay", (_l = global.delay) != null ? _l : 0),
        zIndex: numAttr(this, "z-index", (_m = global.zIndex) != null ? _m : 1e4),
        theme: { ...(_n = global.theme) != null ? _n : {}, ...theme }
      };
    }
  };
  function autoInit() {
    const doc = document.documentElement;
    if ((doc == null ? void 0 : doc.getAttribute("data-fm-auto")) === "false") return;
    if (document.querySelector(TAG)) return;
    if (window[AUTO_FLAG]) return;
    window[AUTO_FLAG] = true;
    const el = document.createElement(TAG);
    document.body.appendChild(el);
  }
  if (!customElements.get(TAG)) {
    customElements.define(TAG, FloatingModalElement);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }
})();

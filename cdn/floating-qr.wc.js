"use strict";
(() => {
  // src/FloatingQR.ts
  var DEFAULT_BLOCKS = {
    wechat: {
      src: "https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",
      title: "\u516C\u4F17\u53F7",
      desc: ""
    },
    donate: {
      src: "https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",
      title: "\u8D5E\u8D4F\u7801",
      desc: ""
    }
  };
  var DEFAULT_THEME = {
    bg: "rgba(255, 255, 255, 0.96)",
    accent: "#333",
    radius: "12px",
    border: "rgba(0, 0, 0, 0.1)"
  };
  var STORAGE_KEY = "floating-qr:closed";
  var MOBILE_QUERY = "(max-width: 767px)";
  function isMobile() {
    var _a, _b, _c;
    if (typeof window === "undefined") return false;
    return (_c = (_b = (_a = window.matchMedia) == null ? void 0 : _a.call(window, MOBILE_QUERY)) == null ? void 0 : _b.matches) != null ? _c : false;
  }
  function hasCloseMark() {
    if (typeof localStorage === "undefined") return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }
  function setCloseMark() {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
    }
  }
  var FloatingQR = class _FloatingQR {
    constructor(options = {}, container = document.body) {
      this.el = null;
      this.closeBtn = null;
      this.handleClose = () => {
        this.close();
      };
      this.opts = this.resolve(options);
      if (this.opts.hideOnMobile && isMobile()) {
        return;
      }
      if (this.opts.closePersistence && hasCloseMark()) {
        return;
      }
      this.render(container);
    }
    /** 是否已挂载到页面 */
    isMounted() {
      return this.el !== null && this.el.isConnected;
    }
    /** 关闭浮窗（完全移除）。默认不记住状态，刷新后重新出现 */
    close() {
      if (this.opts.closePersistence) {
        setCloseMark();
      }
      this.destroy();
    }
    /** 从页面移除并解绑 */
    destroy() {
      var _a, _b;
      (_a = this.closeBtn) == null ? void 0 : _a.removeEventListener("click", this.handleClose);
      this.closeBtn = null;
      (_b = this.el) == null ? void 0 : _b.remove();
      this.el = null;
    }
    /** 用新配置重渲染（会先销毁当前实例） */
    update(options) {
      this.destroy();
      const fresh = new _FloatingQR(options);
      this.opts.theme = fresh.opts.theme;
      this.opts.position = fresh.opts.position;
      this.opts.closePersistence = fresh.opts.closePersistence;
      this.opts.hideOnMobile = fresh.opts.hideOnMobile;
      this.opts.zIndex = fresh.opts.zIndex;
      this.opts.wechat = fresh.opts.wechat;
      this.opts.donate = fresh.opts.donate;
      this.el = fresh.el;
      this.closeBtn = fresh.closeBtn;
    }
    resolve(options) {
      var _a, _b, _c, _d, _e;
      const block = (b, key) => {
        var _a2, _b2, _c2;
        const def = DEFAULT_BLOCKS[key];
        return {
          src: (_a2 = b == null ? void 0 : b.src) != null ? _a2 : def.src,
          title: (_b2 = b == null ? void 0 : b.title) != null ? _b2 : def.title,
          desc: (_c2 = b == null ? void 0 : b.desc) != null ? _c2 : def.desc
        };
      };
      return {
        wechat: block(options.wechat, "wechat"),
        donate: block(options.donate, "donate"),
        position: (_a = options.position) != null ? _a : "right-bottom",
        closePersistence: (_b = options.closePersistence) != null ? _b : false,
        hideOnMobile: (_c = options.hideOnMobile) != null ? _c : true,
        zIndex: (_d = options.zIndex) != null ? _d : 9999,
        theme: { ...DEFAULT_THEME, ...(_e = options.theme) != null ? _e : {} }
      };
    }
    render(container = document.body) {
      var _a;
      const { wechat, donate, position, zIndex, theme } = this.opts;
      const root = document.createElement("div");
      root.className = "fq-widget";
      root.dataset.position = position;
      root.style.zIndex = String(zIndex);
      root.style.setProperty("--fq-bg", theme.bg);
      root.style.setProperty("--fq-accent", theme.accent);
      root.style.setProperty("--fq-radius", theme.radius);
      root.style.setProperty("--fq-border", theme.border);
      root.innerHTML = `
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${CLOSE_SVG}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${escapeAttr(wechat.src)}" alt="${escapeAttr(wechat.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${escapeHtml(wechat.title)}</p>
        ${wechat.desc ? `<p class="fq-desc">${escapeHtml(wechat.desc)}</p>` : ""}
      </div>
      <div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${escapeAttr(donate.src)}" alt="${escapeAttr(donate.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${escapeHtml(donate.title)}</p>
        ${donate.desc ? `<p class="fq-desc">${escapeHtml(donate.desc)}</p>` : ""}
      </div>
    `;
      this.closeBtn = root.querySelector(".fq-close");
      (_a = this.closeBtn) == null ? void 0 : _a.addEventListener("click", this.handleClose);
      container.appendChild(root);
      this.el = root;
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
  var styles_default = '.fq-widget {\n  --fq-bg: rgba(255, 255, 255, 0.96);\n  --fq-accent: #333;\n  --fq-radius: 12px;\n  --fq-border: rgba(0, 0, 0, 0.1);\n  --fq-offset: 16px;\n  --fq-width: 150px;\n\n  position: fixed;\n  z-index: 9999;\n  box-sizing: border-box;\n  width: var(--fq-width);\n  padding: 14px;\n  background: var(--fq-bg);\n  border: 1px solid var(--fq-border);\n  border-radius: var(--fq-radius);\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    sans-serif;\n  color: var(--fq-accent);\n  line-height: 1.5;\n}\n\n.fq-widget[data-position="right-bottom"] {\n  right: var(--fq-offset);\n  bottom: var(--fq-offset);\n}\n\n.fq-widget[data-position="right-top"] {\n  right: var(--fq-offset);\n  top: var(--fq-offset);\n}\n\n.fq-widget[data-position="left-bottom"] {\n  left: var(--fq-offset);\n  bottom: var(--fq-offset);\n}\n\n.fq-widget[data-position="left-top"] {\n  left: var(--fq-offset);\n  top: var(--fq-offset);\n}\n\n.fq-widget[data-position="right-center"] {\n  right: var(--fq-offset);\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.fq-widget[data-position="left-center"] {\n  left: var(--fq-offset);\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.fq-close {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  padding: 0;\n  margin: 0;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(0, 0, 0, 0.35);\n  cursor: pointer;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n\n.fq-close:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.fq-section {\n  text-align: center;\n}\n\n.fq-qr {\n  overflow: hidden;\n  border-radius: 4px;\n}\n\n.fq-img {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n\n.fq-label {\n  margin: 8px 0 0;\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--fq-accent);\n}\n\n.fq-desc {\n  margin: 2px 0 0;\n  font-size: 11px;\n  color: rgba(0, 0, 0, 0.45);\n}\n\n.fq-divider {\n  height: 1px;\n  margin: 10px 0;\n  background: var(--fq-border);\n}\n\n@media (max-width: 767px) {\n  .fq-widget {\n    width: 120px;\n    padding: 10px;\n  }\n}\n';

  // src/web-component.ts
  var TAG = "floating-qr";
  var GLOBAL_KEY = "__FLOATING_QR_OPTIONS__";
  var AUTO_FLAG = "__floatingQrAutoInjected__";
  var MOBILE_QUERY2 = "(max-width: 767px)";
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
    ["theme-border", "border"]
  ];
  var FloatingQRElement = class extends HTMLElement {
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
        "position",
        "close-persistence",
        "hide-on-mobile",
        "z-index",
        "wechat-src",
        "wechat-title",
        "wechat-desc",
        "donate-src",
        "donate-title",
        "donate-desc",
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
    /** 以当前属性 + 全局配置重建实例 */
    render() {
      var _a, _b, _c;
      if (!this.isConnected) return;
      const opts = this.buildOptions();
      if (opts.hideOnMobile && ((_b = (_a = window.matchMedia) == null ? void 0 : _a.call(window, MOBILE_QUERY2)) == null ? void 0 : _b.matches)) return;
      (_c = this.widget) == null ? void 0 : _c.destroy();
      this.widget = new FloatingQR(opts, this.shadow);
    }
    renderSoon() {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this.render());
    }
    buildOptions() {
      var _a, _b, _c, _d, _e, _f;
      const global = (_a = readGlobal()) != null ? _a : {};
      const get = (name) => this.getAttribute(name);
      const theme = {};
      for (const [attr, key] of THEME_ATTRS) {
        const v = get(attr);
        if (v !== null) theme[key] = v;
      }
      const block = (prefix, fallback) => {
        const src = get(`${prefix}-src`);
        const title = get(`${prefix}-title`);
        const desc = get(`${prefix}-desc`);
        if (src === null && title === null && desc === null) return fallback;
        const b = {};
        if (src !== null) b.src = src;
        if (title !== null) b.title = title;
        if (desc !== null) b.desc = desc;
        return b;
      };
      return {
        ...global,
        position: (_b = get("position")) != null ? _b : global.position,
        closePersistence: boolAttr(this, "close-persistence", (_c = global.closePersistence) != null ? _c : false),
        hideOnMobile: boolAttr(this, "hide-on-mobile", (_d = global.hideOnMobile) != null ? _d : true),
        zIndex: numAttr(this, "z-index", (_e = global.zIndex) != null ? _e : 9999),
        theme: { ...(_f = global.theme) != null ? _f : {}, ...theme },
        wechat: block("wechat", global.wechat),
        donate: block("donate", global.donate)
      };
    }
  };
  function autoInit() {
    const doc = document.documentElement;
    if ((doc == null ? void 0 : doc.getAttribute("data-fq-auto")) === "false") return;
    if (document.querySelector(TAG)) return;
    if (window[AUTO_FLAG]) return;
    window[AUTO_FLAG] = true;
    const el = document.createElement(TAG);
    document.body.appendChild(el);
  }
  if (!customElements.get(TAG)) {
    customElements.define(TAG, FloatingQRElement);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }
})();

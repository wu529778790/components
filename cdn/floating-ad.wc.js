/* @wu529778790/floating-ad v0.1.0 */
"use strict";
(() => {
  // src/FloatingAd.ts
  var DEFAULT_THEME = {
    bg: "rgba(255, 255, 255, 0.96)",
    accent: "#333",
    radius: "12px",
    border: "rgba(0, 0, 0, 0.1)"
  };
  var STORAGE_KEY = "floating-ad:closed";
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
  function isRenderableAd(ad) {
    var _a;
    return Boolean(ad && typeof ad === "object" && ((_a = ad.src) == null ? void 0 : _a.trim()));
  }
  function resolveOptions(options) {
    var _a, _b, _c, _d, _e, _f;
    const raw = Array.isArray(options.ads) ? options.ads : [];
    return {
      ads: raw.filter(isRenderableAd),
      position: (_a = options.position) != null ? _a : "left-center",
      closePersistence: (_b = options.closePersistence) != null ? _b : false,
      hideOnMobile: (_c = options.hideOnMobile) != null ? _c : true,
      zIndex: (_d = options.zIndex) != null ? _d : 9999,
      adLabel: options.adLabel === void 0 ? false : options.adLabel,
      width: Number.isFinite(options.width) ? Math.max(80, Number(options.width)) : 150,
      offset: Number.isFinite(options.offset) ? Math.max(0, Number(options.offset)) : 16,
      imageFit: options.imageFit === "contain" ? "contain" : "cover",
      imageSize: Number.isFinite(options.imageSize) ? Math.max(40, Number(options.imageSize)) : 120,
      theme: { ...DEFAULT_THEME, ...(_e = options.theme) != null ? _e : {} },
      themeOverrides: (_f = options.theme) != null ? _f : {},
      onClick: options.onClick
    };
  }
  var FloatingAd = class {
    constructor(options = {}, container = document.body) {
      this.el = null;
      this.closeBtn = null;
      /** 本次渲染的广告列表（与 DOM 上的 data-index 一一对应） */
      this.rendered = [];
      this.handleClose = () => {
        this.close();
      };
      this.handleImageError = (event) => {
        const img = event.target;
        if (!img || img.tagName !== "IMG" || !img.classList.contains("fa-img")) return;
        const media = img.closest(".fa-media");
        if (!media) return;
        media.classList.add("fa-media--failed");
        const item = media.closest(".fa-item");
        if (item && !item.querySelector(".fa-body")) item.classList.add("fa-item--failed");
      };
      this.handleItemClick = (event) => {
        var _a;
        if (!this.opts.onClick) return;
        const target = event.target;
        const item = (_a = target == null ? void 0 : target.closest) == null ? void 0 : _a.call(target, ".fa-item");
        if (!item) return;
        const index = Number(item.dataset.index);
        const ad = this.rendered[index];
        if (!ad) return;
        this.opts.onClick(ad, event);
      };
      this.opts = resolveOptions(options);
      this.container = container;
      if (this.opts.hideOnMobile && isMobile()) return;
      if (this.opts.closePersistence && hasCloseMark()) return;
      this.render();
    }
    /** 是否已挂载到页面 */
    isMounted() {
      return this.el !== null && this.el.isConnected;
    }
    /** 打开（已关闭后再次显示，忽略 localStorage 关闭标记） */
    open() {
      if (this.isMounted()) return;
      this.render();
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
      var _a, _b, _c, _d;
      (_a = this.closeBtn) == null ? void 0 : _a.removeEventListener("click", this.handleClose);
      this.closeBtn = null;
      (_b = this.el) == null ? void 0 : _b.removeEventListener("click", this.handleItemClick);
      (_c = this.el) == null ? void 0 : _c.removeEventListener("error", this.handleImageError, true);
      (_d = this.el) == null ? void 0 : _d.remove();
      this.el = null;
      this.rendered = [];
    }
    /** 用新配置重渲染（保留原容器） */
    update(options) {
      this.destroy();
      this.opts = resolveOptions(options);
      if (this.opts.hideOnMobile && isMobile()) return;
      if (this.opts.closePersistence && hasCloseMark()) return;
      this.render();
    }
    render() {
      var _a;
      const { ads, position, zIndex, themeOverrides, adLabel, width, offset, imageFit, imageSize } = this.opts;
      if (ads.length === 0) return;
      const root = document.createElement("div");
      root.className = "fa-widget";
      root.dataset.position = position;
      root.style.zIndex = String(zIndex);
      root.style.setProperty("--fa-width", `${width}px`);
      root.style.setProperty("--fa-offset", `${offset}px`);
      root.style.setProperty("--fa-img-fit", imageFit);
      root.style.setProperty("--fa-img-size", `${imageSize}px`);
      const overrides = [
        ["--fa-bg", themeOverrides.bg],
        ["--fa-accent", themeOverrides.accent],
        ["--fa-radius", themeOverrides.radius],
        ["--fa-border", themeOverrides.border]
      ];
      for (const [key, value] of overrides) {
        if (value !== void 0) root.style.setProperty(key, value);
      }
      const label = adLabel ? escapeHtml(String(adLabel)) : "";
      root.innerHTML = `
      <button class="fa-close" type="button" aria-label="\u5173\u95ED\u5E7F\u544A">${CLOSE_SVG}</button>
      ${ads.map((ad, index) => this.renderItem(ad, index, index === 0 ? label : "")).join('<div class="fa-divider" role="separator"></div>')}
    `;
      this.closeBtn = root.querySelector(".fa-close");
      (_a = this.closeBtn) == null ? void 0 : _a.addEventListener("click", this.handleClose);
      root.addEventListener("click", this.handleItemClick);
      root.addEventListener("error", this.handleImageError, true);
      this.rendered = ads;
      this.container.appendChild(root);
      this.el = root;
    }
    renderItem(ad, index, label) {
      var _a, _b;
      const media = `<span class="fa-media">
        <img class="fa-img" src="${escapeAttr(ad.src)}" alt="${escapeAttr((_b = (_a = ad.alt) != null ? _a : ad.title) != null ? _b : "")}" loading="lazy" decoding="async" />
        ${ad.badge ? `<span class="fa-tag">${escapeHtml(ad.badge)}</span>` : ""}
        ${label ? `<span class="fa-label">${label}</span>` : ""}
      </span>`;
      const body = ad.title || ad.desc ? `<span class="fa-body">
            ${ad.title ? `<span class="fa-title">${escapeHtml(ad.title)}</span>` : ""}
            ${ad.desc ? `<span class="fa-desc">${escapeHtml(ad.desc)}</span>` : ""}
          </span>` : "";
      const inner = `${media}${body}`;
      const href = ad.href ? safeHref(ad.href) : null;
      if (href) {
        const target = ad.target === "_self" ? "_self" : "_blank";
        const rel = target === "_blank" ? ' rel="noopener noreferrer nofollow sponsored"' : ' rel="nofollow sponsored"';
        return `<a class="fa-item" href="${escapeAttr(href)}" target="${target}"${rel} data-index="${index}">${inner}</a>`;
      }
      return `<div class="fa-item" data-index="${index}">${inner}</div>`;
    }
  };
  var CLOSE_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function safeHref(href) {
    const trimmed = href.trim();
    if (!trimmed) return null;
    const compact = trimmed.replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
    if (/^(javascript|data|vbscript|file):/.test(compact)) return null;
    return trimmed;
  }
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function escapeAttr(value) {
    return escapeHtml(value);
  }

  // src/styles.css
  var styles_default = '.fa-widget {\n  --fa-bg: rgba(255, 255, 255, 0.96);\n  --fa-accent: #333;\n  --fa-radius: 12px;\n  --fa-border: rgba(0, 0, 0, 0.1);\n  --fa-offset: 16px;\n  --fa-width: 150px;\n  --fa-img-size: 120px;\n  --fa-img-fit: cover;\n\n  position: fixed;\n  z-index: 9999;\n  box-sizing: border-box;\n  width: var(--fa-width);\n  padding: 15px;\n  background: var(--fa-bg);\n  border: 1px solid var(--fa-border);\n  border-radius: var(--fa-radius);\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    sans-serif;\n  color: var(--fa-accent);\n  line-height: 1.5;\n  color-scheme: light dark;\n  transition: box-shadow 0.2s ease;\n}\n\n.fa-widget:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);\n}\n\n.fa-widget[data-position="right-bottom"] {\n  right: var(--fa-offset);\n  bottom: var(--fa-offset);\n}\n\n.fa-widget[data-position="right-top"] {\n  right: var(--fa-offset);\n  top: var(--fa-offset);\n}\n\n.fa-widget[data-position="left-bottom"] {\n  left: var(--fa-offset);\n  bottom: var(--fa-offset);\n}\n\n.fa-widget[data-position="left-top"] {\n  left: var(--fa-offset);\n  top: var(--fa-offset);\n}\n\n.fa-widget[data-position="right-center"] {\n  right: var(--fa-offset);\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.fa-widget[data-position="left-center"] {\n  left: var(--fa-offset);\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.fa-close {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  padding: 0;\n  margin: 0;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  color: rgba(0, 0, 0, 0.35);\n  cursor: pointer;\n  transition: color 0.15s ease, opacity 0.15s ease;\n}\n\n.fa-close:hover {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n/* \u89E6\u5C4F\u8BBE\u5907\uFF08\u65E0 hover\uFF09\uFF1A\u5173\u95ED\u6309\u94AE\u5E38\u663E\uFF0C\u4FDD\u8BC1\u53EF\u5173\u95ED */\n.fa-close {\n  opacity: 1;\n}\n\n/* \u652F\u6301 hover \u7684\u8BBE\u5907\uFF08\u9F20\u6807\uFF09\uFF1A\u5E73\u65F6\u9690\u85CF\uFF0C\u60AC\u505C\u5361\u7247\u65F6\u6D6E\u73B0 */\n@media (hover: hover) and (pointer: fine) {\n  .fa-close {\n    opacity: 0;\n    pointer-events: none;\n  }\n  .fa-widget:hover .fa-close,\n  .fa-close:focus-visible {\n    opacity: 1;\n    pointer-events: auto;\n  }\n}\n\n/* \u300C\u5E7F\u544A\u300D\u6807\u8BC6\uFF1A\u538B\u5728\u9996\u56FE\u5DE6\u4E0A\u89D2\uFF0C\u4E0D\u5360\u6392\u7248\u884C\u9AD8\n   \uFF08\u300A\u5E7F\u544A\u6CD5\u300B\u8981\u6C42\u5E7F\u544A\u53EF\u8BC6\u522B\uFF0C\u6807\u8BC6\u4FDD\u7559\uFF0C\u4F46\u4E0D\u5FC5\u5355\u72EC\u5360\u4E00\u884C\uFF09 */\n.fa-label {\n  position: absolute;\n  top: 6px;\n  left: 6px;\n  z-index: 1;\n  display: inline-block;\n  font-size: 10px;\n  line-height: 1;\n  letter-spacing: 0.06em;\n  padding: 3px 5px;\n  border-radius: 4px;\n  background: rgba(0, 0, 0, 0.45);\n  color: rgba(255, 255, 255, 0.92);\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n  pointer-events: none;\n}\n\n.fa-item {\n  display: block;\n  text-decoration: none;\n  color: inherit;\n  border-radius: 8px;\n}\n\na.fa-item {\n  cursor: pointer;\n}\n\n/* \u56FE\u7247\u56FA\u5B9A\u65B9\u5F62\uFF08\u9ED8\u8BA4 120\xD7120\uFF0C\u4E0E\u53F3\u4FA7\u516C\u4F17\u53F7\u6D6E\u7A97\u7684\u4E8C\u7EF4\u7801\u5C3A\u5BF8\u4E00\u81F4\uFF09 */\n.fa-media {\n  position: relative;\n  display: block;\n  width: var(--fa-img-size, 120px);\n  height: var(--fa-img-size, 120px);\n  margin: 0 auto;\n  overflow: hidden;\n  border-radius: 8px;\n  background: rgba(0, 0, 0, 0.04);\n}\n\n.fa-img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: var(--fa-img-fit, cover);\n  transition: transform 0.25s ease;\n}\n\na.fa-item:hover .fa-img {\n  transform: scale(1.04);\n}\n\n/* \u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A\u9690\u85CF\u7A7A\u56FE\u6846\uFF0C\u53EA\u7559\u6587\u5B57\uFF1B\u8FDE\u6587\u5B57\u90FD\u6CA1\u6709\u5C31\u6574\u6761\u9690\u85CF */\n.fa-media--failed,\n.fa-item--failed {\n  display: none;\n}\n\n.fa-tag {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  padding: 1px 6px;\n  font-size: 10px;\n  line-height: 1.5;\n  border-radius: 999px;\n  background: var(--fa-accent);\n  color: var(--fa-bg);\n}\n\n.fa-body {\n  display: block;\n  margin-top: 8px;\n  text-align: left;\n}\n\n.fa-item > .fa-body:first-child {\n  margin-top: 0;\n}\n\n.fa-title {\n  display: block;\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--fa-accent);\n}\n\n.fa-desc {\n  display: block;\n  margin-top: 2px;\n  font-size: 11px;\n  color: rgba(0, 0, 0, 0.45);\n}\n\n.fa-divider {\n  height: 1px;\n  margin: 10px 0;\n  background: var(--fa-border);\n}\n\n@media (max-width: 767px) {\n  .fa-widget {\n    width: 120px;\n    padding: 10px;\n    --fa-img-size: 100px;\n  }\n}\n\n/* \u8DDF\u968F\u7CFB\u7EDF\u6DF1\u8272\u6A21\u5F0F \u2014\u2014 \u5FC5\u987B\u653E\u6587\u4EF6\u672B\u5C3E\uFF0C\u786E\u4FDD\u4F18\u5148\u7EA7\u9AD8\u4E8E\u4E0A\u9762\u7684\u6D45\u8272\u89C4\u5219\n   (\u4EC5\u5F71\u54CD\u9ED8\u8BA4\u503C\uFF1B\u7528\u6237\u663E\u5F0F\u8BBE\u7F6E\u7684 --fa-* inline \u53D8\u91CF\u4ECD\u4F18\u5148) */\n@media (prefers-color-scheme: dark) {\n  .fa-widget {\n    --fa-bg: rgba(28, 28, 30, 0.96);\n    --fa-accent: rgba(255, 255, 255, 0.92);\n    --fa-border: rgba(255, 255, 255, 0.14);\n    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);\n  }\n\n  .fa-widget:hover {\n    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.6);\n  }\n\n  .fa-media {\n    background: rgba(255, 255, 255, 0.06);\n  }\n\n  .fa-close {\n    color: rgba(255, 255, 255, 0.4);\n  }\n\n  .fa-close:hover {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .fa-desc {\n    color: rgba(255, 255, 255, 0.55);\n  }\n}\n';

  // src/web-component.ts
  var TAG = "floating-ad";
  var GLOBAL_KEY = "__FLOATING_AD_OPTIONS__";
  var AUTO_FLAG = "__floatingAdAutoInjected__";
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
  function parseAdsJson(raw) {
    if (raw === null) return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === "object") return [parsed];
    } catch {
    }
    return null;
  }
  function resolveAdLabel(raw, fallback) {
    if (raw === null) return fallback;
    const trimmed = raw.trim();
    if (!trimmed || trimmed === "true") return "\u5E7F\u544A";
    if (/^(false|none|off|0)$/i.test(trimmed)) return false;
    return trimmed;
  }
  var FloatingAdElement = class extends HTMLElement {
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
        "ad-label",
        "width",
        "offset",
        "image-fit",
        "image-size",
        "ad-src",
        "ad-title",
        "ad-desc",
        "ad-href",
        "ad-target",
        "ad-badge",
        "ads-json",
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
    /** 手动打开（关闭后再次显示） */
    open() {
      var _a, _b;
      if ((_a = this.widget) == null ? void 0 : _a.isMounted()) return;
      (_b = this.widget) == null ? void 0 : _b.destroy();
      this.widget = new FloatingAd(this.buildOptions(), this.shadow);
    }
    /** 关闭浮窗 */
    close() {
      var _a;
      (_a = this.widget) == null ? void 0 : _a.close();
    }
    /** 以当前属性 + 全局配置重建实例 */
    render() {
      var _a, _b, _c;
      if (!this.isConnected) return;
      const opts = this.buildOptions();
      if (opts.hideOnMobile && ((_b = (_a = window.matchMedia) == null ? void 0 : _a.call(window, MOBILE_QUERY2)) == null ? void 0 : _b.matches)) return;
      (_c = this.widget) == null ? void 0 : _c.destroy();
      this.widget = new FloatingAd(opts, this.shadow);
    }
    renderSoon() {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this.render());
    }
    buildOptions() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const global = (_a = readGlobal()) != null ? _a : {};
      const get = (name) => this.getAttribute(name);
      const theme = {};
      for (const [attr, key] of THEME_ATTRS) {
        const v = get(attr);
        if (v !== null) theme[key] = v;
      }
      const jsonAds = parseAdsJson(get("ads-json"));
      const single = this.readSingleAd();
      const ads = jsonAds != null ? jsonAds : single ? [single] : global.ads;
      const fit = get("image-fit");
      const imageFit = fit === "contain" || fit === "cover" ? fit : global.imageFit;
      return {
        ...global,
        ads,
        position: (_b = get("position")) != null ? _b : global.position,
        closePersistence: boolAttr(this, "close-persistence", (_c = global.closePersistence) != null ? _c : false),
        hideOnMobile: boolAttr(this, "hide-on-mobile", (_d = global.hideOnMobile) != null ? _d : true),
        zIndex: numAttr(this, "z-index", (_e = global.zIndex) != null ? _e : 9999),
        width: numAttr(this, "width", (_f = global.width) != null ? _f : 150),
        offset: numAttr(this, "offset", (_g = global.offset) != null ? _g : 16),
        imageFit,
        imageSize: numAttr(this, "image-size", (_h = global.imageSize) != null ? _h : 120),
        adLabel: resolveAdLabel(get("ad-label"), (_i = global.adLabel) != null ? _i : false),
        theme: { ...(_j = global.theme) != null ? _j : {}, ...theme }
      };
    }
    /** 单条广告的扁平静态属性（ad-src / ad-title / ...）；没有 ad-src 时返回 null */
    readSingleAd() {
      const src = this.getAttribute("ad-src");
      if (src === null || !src.trim()) return null;
      const title = this.getAttribute("ad-title");
      const desc = this.getAttribute("ad-desc");
      const href = this.getAttribute("ad-href");
      const badge = this.getAttribute("ad-badge");
      const target = this.getAttribute("ad-target");
      const item = { src };
      if (title !== null) item.title = title;
      if (desc !== null) item.desc = desc;
      if (href !== null) item.href = href;
      if (badge !== null) item.badge = badge;
      if (target === "_self" || target === "_blank") item.target = target;
      return item;
    }
  };
  function autoInit() {
    const doc = document.documentElement;
    if ((doc == null ? void 0 : doc.getAttribute("data-fa-auto")) === "false") return;
    if (document.querySelector(TAG)) return;
    if (window[AUTO_FLAG]) return;
    if (!readGlobal()) return;
    window[AUTO_FLAG] = true;
    const el = document.createElement(TAG);
    document.body.appendChild(el);
  }
  if (!customElements.get(TAG)) {
    customElements.define(TAG, FloatingAdElement);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }
})();

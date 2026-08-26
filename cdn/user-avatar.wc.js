/* @wu529778790/user-avatar v0.1.1 */
"use strict";
(() => {
  // src/wx-auth.ts
  function getWindowSdk() {
    if (typeof window !== "undefined") {
      return window.WxAuth;
    }
    return void 0;
  }

  // src/utils.ts
  var TOKEN_COOKIE = "wxauth-token";
  var LEGACY_COOKIE = "wxauth-openid";
  function getAuthToken() {
    const cookies = document.cookie.split("; ");
    for (const row of cookies) {
      if (row.startsWith(`${TOKEN_COOKIE}=`)) return row.slice(TOKEN_COOKIE.length + 1);
    }
    for (const row of cookies) {
      if (row.startsWith(`${LEGACY_COOKIE}=`)) return row.slice(LEGACY_COOKIE.length + 1);
    }
    return "";
  }
  function getRootDomain() {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return "";
    const parts = hostname.split(".");
    return parts.length >= 2 ? "." + parts.slice(-2).join(".") : "";
  }
  function deleteAuthCookies() {
    cleanupCookie(TOKEN_COOKIE);
    cleanupCookie(LEGACY_COOKIE);
  }
  function cleanupCookie(name) {
    const domainStr = getRootDomain() ? `;domain=${getRootDomain()}` : "";
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
  var CLOSE_ICON = '<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';
  var GITHUB_ICON = '<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>';

  // src/UserAvatar.ts
  var DEFAULT_THEME = {
    btnBg: "#ffffff",
    size: "2.5rem",
    accent: "#1f2328",
    btnBorder: "rgba(27, 31, 36, 0.12)",
    radius: "16px",
    bg: "#ffffff",
    text: "#1f2328",
    subText: "#656d76",
    overlay: "rgba(31, 35, 40, 0.45)",
    danger: "#dc2626",
    success: "#1a7f37"
  };
  var UserAvatar = class {
    constructor(options = {}, container = document.body) {
      this.user = null;
      this.menuEl = null;
      this.settingsEl = null;
      this.menuCleanup = null;
      this.settingsCleanup = null;
      this.githubMsgListener = null;
      this.saving = false;
      this.nicknameDraft = "";
      /** 窗口重新聚焦时刷新（登录弹窗 / OAuth 子窗关闭后切回自动同步头像） */
      this.onWindowFocus = () => {
        void this.fetchUser();
      };
      /** 页面从隐藏切回可见时刷新 */
      this.onVisibility = () => {
        if (document.visibilityState === "visible") void this.fetchUser();
      };
      this.container = container;
      this.opts = this.resolve(options);
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
      void this.fetchUser();
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
    /** 刷新用户信息（登录/绑定后外部可调用） */
    async refresh() {
      await this.fetchUser();
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
      var _a, _b, _c, _d, _e, _f;
      const sdk = (_a = options.sdk) != null ? _a : getWindowSdk();
      const apiBase = options.apiBase !== void 0 && options.apiBase !== "" ? options.apiBase : "https://wx-auth.shenzjd.com";
      return {
        sdk,
        apiBase,
        fixed: (_b = options.fixed) != null ? _b : true,
        offset: (_c = options.offset) != null ? _c : "1rem 1.5rem",
        size: (_d = options.size) != null ? _d : DEFAULT_THEME.size,
        zIndex: (_e = options.zIndex) != null ? _e : 12e3,
        theme: { ...DEFAULT_THEME, ...(_f = options.theme) != null ? _f : {} },
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
    // ==================== 登录 / 退出 ====================
    async triggerLogin() {
      var _a, _b;
      const sdk = this.opts.sdk;
      if (!sdk) {
        console.warn("[UserAvatar] \u672A\u627E\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK");
        return false;
      }
      const ok = await sdk.requireAuth();
      if (ok) {
        await this.fetchUser();
        if (this.user) (_b = (_a = this.opts).onLogin) == null ? void 0 : _b.call(_a, this.user);
      }
      return ok;
    }
    async logout() {
      var _a, _b, _c;
      (_a = this.opts.sdk) == null ? void 0 : _a.clearToken();
      deleteAuthCookies();
      this.user = null;
      this.closeMenu();
      this.closeSettings();
      this.render();
      (_c = (_b = this.opts).onLogout) == null ? void 0 : _c.call(_b);
    }
    // ==================== 数据 ====================
    async fetchUser() {
      const token = getAuthToken();
      if (!token) {
        this.user = null;
        this.render();
        return;
      }
      try {
        const base = this.opts.apiBase || window.location.origin;
        const res = await fetch(`${base}/api/auth/userinfo?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        this.user = data.authenticated && data.user ? data.user : null;
      } catch (e) {
        console.error("[UserAvatar] \u62C9\u53D6\u7528\u6237\u8BE6\u60C5\u5931\u8D25", e);
        this.user = null;
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
      try {
        const base = this.opts.apiBase || window.location.origin;
        const res = await fetch(`${base}/api/auth/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "set-nickname", nickname })
        });
        const data = await res.json();
        if (data.success) {
          this.setMsg("\u5DF2\u4FDD\u5B58");
          this.nicknameDraft = nickname;
          await this.fetchUser();
        } else {
          this.setMsg(data.message || "\u4FDD\u5B58\u5931\u8D25");
        }
      } catch (e) {
        console.error("[UserAvatar] \u4FDD\u5B58\u6635\u79F0\u5931\u8D25", e);
        this.setMsg("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      } finally {
        this.saving = false;
        this.updateSaveBtn();
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
          await this.fetchUser();
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
      this.menuEl = null;
      this.settingsEl = null;
      const pos = this.opts.fixed ? `position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}` : "";
      this.root.innerHTML = `
      <div class="ua-widget" style="${pos}">
        <button type="button" class="ua-avatar" aria-haspopup="true" aria-label="${this.user ? "\u6253\u5F00\u7528\u6237\u83DC\u5355" : "\u5FAE\u4FE1\u767B\u5F55"}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `;
      const btn = this.root.querySelector(".ua-avatar");
      btn.addEventListener("click", () => {
        if (this.user) this.toggleMenu();
        else void this.triggerLogin();
      });
      btn.addEventListener("mouseenter", () => {
        if (this.user && !this.menuEl) this.openMenu();
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
      if (!this.user) return USER_ICON_SVG;
      const src = this.user.headimgurl || ((_a = this.user.github) == null ? void 0 : _a.avatar) || "";
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
      const onDocDown = (e) => {
        if (!this.root.contains(e.target)) this.closeMenu();
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
      menu.addEventListener("mouseleave", () => this.closeMenu());
      (_a = menu.querySelector('[data-action="settings"]')) == null ? void 0 : _a.addEventListener("click", () => {
        this.openSettings();
      });
      (_b = menu.querySelector('[data-action="logout"]')) == null ? void 0 : _b.addEventListener("click", () => {
        void this.logout();
      });
      this.root.appendChild(menu);
      this.menuEl = menu;
    }
    closeMenu() {
      var _a, _b;
      (_a = this.menuEl) == null ? void 0 : _a.remove();
      this.menuEl = null;
      (_b = this.menuCleanup) == null ? void 0 : _b.call(this);
      this.menuCleanup = null;
    }
    // ==================== 设置弹窗 ====================
    openSettings() {
      const u = this.user;
      if (!u) return;
      this.closeMenu();
      this.closeSettings();
      this.nicknameDraft = u.nickname || "";
      const settings = document.createElement("div");
      settings.className = "ua-mask";
      settings.style.zIndex = String(this.opts.zIndex + 10);
      settings.innerHTML = this.buildSettingsHtml(u);
      this.settingsEl = settings;
      this.root.appendChild(settings);
      this.bindSettingsEvents(settings);
      const onMaskDown = (e) => {
        if (e.target === settings) this.closeSettings();
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
      const avatarSrc = u.headimgurl || ((_a = u.github) == null ? void 0 : _a.avatar);
      const bigAvatar = avatarSrc ? `<img class="ua-big-avatar" src="${escapeAttr(avatarSrc)}" alt="" referrerpolicy="no-referrer" />` : `<div class="ua-big-avatar ua-big-avatar-fallback">${escapeHtml((u.nickname || ((_b = u.github) == null ? void 0 : _b.login) || "?").charAt(0).toUpperCase())}</div>`;
      const githubBlock = u.github ? `
        <div class="ua-github-bound">
          <div class="ua-github-info">
            ${u.github.avatar ? `<img class="ua-gh-avatar" src="${escapeAttr(u.github.avatar)}" alt="@${escapeAttr(u.github.login)}" referrerpolicy="no-referrer" />` : `<div class="ua-gh-avatar ua-gh-avatar-fallback">${escapeHtml(u.github.login.charAt(0).toUpperCase())}</div>`}
            <div class="ua-gh-meta">
              <div class="ua-gh-login">@${escapeHtml(u.github.login)} <span class="ua-badge">\u5DF2\u7ED1\u5B9A</span></div>
              <div class="ua-gh-date">\u7ED1\u5B9A\u4E8E ${escapeHtml(new Date(u.github.boundAt).toLocaleDateString())}</div>
            </div>
          </div>
          <button type="button" class="ua-gh-unbind" data-action="unbind">\u89E3\u7ED1</button>
        </div>` : `
        <div class="ua-github-unbound">
          <p class="ua-gh-tip">\u7ED1\u5B9A GitHub \u8D26\u53F7\uFF0C\u7528\u4E8E\u8EAB\u4EFD\u8BC6\u522B\u4E0E\u540E\u7EED\u4E1A\u52A1\u5BF9\u63A5</p>
          <button type="button" class="ua-gh-bind" data-action="bind">${GITHUB_ICON}<span>\u7ED1\u5B9A GitHub</span></button>
        </div>`;
      return `
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="\u8BBE\u7F6E">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u8BBE\u7F6E</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${CLOSE_ICON}</button>
        </div>
        <div class="ua-dialog-body">
          <div class="ua-user-row">
            ${bigAvatar}
            <div class="ua-user-meta">
              <div class="ua-user-name">${escapeHtml(u.nickname || (u.github ? `@${u.github.login}` : "\u5FAE\u4FE1\u7528\u6237"))}</div>
              <div class="ua-user-sub">\u767B\u5F55\u4E8E ${escapeHtml(new Date(u.authenticatedAt || Date.now()).toLocaleString())}</div>
            </div>
          </div>

          <div class="ua-mono-row">
            <div class="ua-mono-label">\u5FAE\u4FE1 ID\uFF08openid\uFF09</div>
            <div class="ua-mono-value">${escapeHtml(u.openid || "-")}</div>
          </div>

          <div class="ua-section">
            <div class="ua-section-title">${GITHUB_ICON}<span>GitHub</span></div>
            ${githubBlock}
          </div>

          <div class="ua-section">
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
      (_a = this.settingsEl) == null ? void 0 : _a.remove();
      this.settingsEl = null;
      (_b = this.settingsCleanup) == null ? void 0 : _b.call(this);
      this.settingsCleanup = null;
    }
    setMsg(text) {
      var _a;
      const el = (_a = this.settingsEl) == null ? void 0 : _a.querySelector('[data-role="msg"]');
      if (!el) return;
      el.textContent = text;
      el.className = text === "\u5DF2\u4FDD\u5B58" ? "ua-msg ua-msg-ok" : text ? "ua-msg ua-msg-err" : "ua-msg";
    }
    updateSaveBtn() {
      var _a;
      const btn = (_a = this.settingsEl) == null ? void 0 : _a.querySelector('[data-action="save"]');
      if (btn) btn.textContent = this.saving ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58";
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
        void this.fetchUser().then(() => {
          var _a, _b, _c;
          if ((_a = this.user) == null ? void 0 : _a.github) (_c = (_b = this.opts).onGithubBound) == null ? void 0 : _c.call(_b, this.user);
        });
      };
      window.addEventListener("message", this.githubMsgListener);
    }
  };

  // src/styles.css
  var styles_default = '/* ============================================================\n   user-avatar \u7EC4\u4EF6\u6837\u5F0F\n   \u5168\u90E8\u4E3B\u9898\u901A\u8FC7 --ua-* CSS \u53D8\u91CF\u9A71\u52A8\uFF0C\u76F4\u63A5\u8986\u76D6\u53D8\u91CF\u5373\u53EF\u6362\u80A4\u3002\n   ============================================================ */\n\n.ua-root {\n  /* ===== \u4E3B\u9898\u53D8\u91CF\uFF08\u9ED8\u8BA4\u503C\uFF0C\u53EF\u5728\u4EFB\u610F\u7236\u7EA7\u8986\u76D6\uFF09 ===== */\n  --ua-btn-bg: #ffffff;\n  --ua-size: 2.5rem;\n  --ua-accent: #1f2328;\n  --ua-btn-border: rgba(27, 31, 36, 0.12);\n  --ua-radius: 16px;\n  --ua-bg: #ffffff;\n  --ua-text: #1f2328;\n  --ua-sub: #656d76;\n  --ua-overlay: rgba(31, 35, 40, 0.45);\n  --ua-danger: #dc2626;\n  --ua-success: #1a7f37;\n\n  /* \u56FE\u6807\u5C3A\u5BF8 */\n  --ua-icon: 1rem;\n\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",\n    sans-serif;\n  color-scheme: light dark;\n  line-height: 1.5;\n}\n\n.ua-root * {\n  box-sizing: border-box;\n}\n\n/* ==================== \u5934\u50CF\u6309\u94AE ==================== */\n\n.ua-widget {\n  position: relative;\n  display: inline-block;\n}\n\n.ua-avatar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: var(--ua-size);\n  height: var(--ua-size);\n  padding: 0;\n  border: 1px solid var(--ua-btn-border);\n  border-radius: 50%;\n  background: var(--ua-btn-bg);\n  color: var(--ua-sub);\n  cursor: pointer;\n  overflow: hidden;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);\n  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.1s ease;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ua-avatar:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n  border-color: var(--ua-accent);\n}\n\n.ua-avatar:active {\n  transform: scale(0.96);\n}\n\n.ua-avatar-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n\n.ua-avatar-fallback {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(135deg, var(--ua-accent), color-mix(in srgb, var(--ua-accent) 60%, #000));\n  color: #fff;\n  font-size: calc(var(--ua-size) * 0.45);\n  font-weight: 600;\n}\n\n.ua-icon {\n  width: var(--ua-icon);\n  height: var(--ua-icon);\n  flex-shrink: 0;\n}\n\n.ua-icon-user {\n  width: calc(var(--ua-size) * 0.5);\n  height: calc(var(--ua-size) * 0.5);\n}\n\n/* ==================== \u4E0B\u62C9\u83DC\u5355 ==================== */\n\n.ua-menu {\n  position: absolute;\n  top: calc(var(--ua-size) + 0.5rem);\n  right: 0;\n  min-width: 12rem;\n  background: var(--ua-bg);\n  border: 1px solid var(--ua-btn-border);\n  border-radius: var(--ua-radius);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n  overflow: hidden;\n  animation: ua-pop 0.16s ease;\n}\n\n@keyframes ua-pop {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n.ua-menu-user {\n  padding: 0.6rem 0.9rem;\n  background: color-mix(in srgb, var(--ua-accent) 6%, var(--ua-bg));\n  border-bottom: 1px solid var(--ua-btn-border);\n}\n\n.ua-menu-name {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--ua-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n}\n\n.ua-menu-item {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  width: 100%;\n  padding: 0.7rem 0.9rem;\n  border: none;\n  background: transparent;\n  color: var(--ua-text);\n  font-size: 0.875rem;\n  text-align: left;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n\n.ua-menu-item span {\n  flex: 1;\n}\n\n.ua-menu-item:hover {\n  background: color-mix(in srgb, var(--ua-text) 6%, var(--ua-bg));\n}\n\n.ua-menu-item-danger {\n  color: var(--ua-danger);\n  border-top: 1px solid var(--ua-btn-border);\n}\n\n.ua-menu-item-danger:hover {\n  background: color-mix(in srgb, var(--ua-danger) 8%, var(--ua-bg));\n}\n\n/* ==================== \u8BBE\u7F6E\u5F39\u7A97\uFF08\u906E\u7F69 + \u5BF9\u8BDD\u6846\uFF09 ==================== */\n\n.ua-mask {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: var(--ua-overlay);\n  backdrop-filter: blur(2px);\n  animation: ua-fade 0.18s ease;\n}\n\n@keyframes ua-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.ua-dialog {\n  width: 100%;\n  max-width: 26rem;\n  max-height: calc(100vh - 3rem);\n  overflow-y: auto;\n  background: var(--ua-bg);\n  border-radius: var(--ua-radius);\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);\n  animation: ua-up 0.2s ease;\n}\n\n@keyframes ua-up {\n  from {\n    opacity: 0;\n    transform: translateY(24px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n.ua-dialog-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid var(--ua-btn-border);\n}\n\n.ua-dialog-title {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--ua-text);\n}\n\n.ua-close {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  color: var(--ua-sub);\n  cursor: pointer;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n\n.ua-close:hover {\n  background: color-mix(in srgb, var(--ua-text) 8%, var(--ua-bg));\n  color: var(--ua-text);\n}\n\n.ua-dialog-body {\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n/* \u7528\u6237\u4FE1\u606F\u884C */\n.ua-user-row {\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n}\n\n.ua-big-avatar {\n  width: 3.5rem;\n  height: 3.5rem;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 1px solid var(--ua-btn-border);\n}\n\n.ua-big-avatar-fallback {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, var(--ua-accent), color-mix(in srgb, var(--ua-accent) 55%, #000));\n  color: #fff;\n  font-size: 1.35rem;\n  font-weight: 700;\n}\n\n.ua-user-meta {\n  min-width: 0;\n  flex: 1;\n}\n\n.ua-user-name {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--ua-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ua-user-sub {\n  font-size: 0.75rem;\n  color: var(--ua-sub);\n  margin-top: 0.15rem;\n}\n\n/* openid \u5C55\u793A */\n.ua-mono-row {\n  background: color-mix(in srgb, var(--ua-text) 5%, var(--ua-bg));\n  border-radius: calc(var(--ua-radius) * 0.6);\n  padding: 0.85rem 1rem;\n}\n\n.ua-mono-label {\n  font-size: 0.72rem;\n  color: var(--ua-sub);\n  margin-bottom: 0.35rem;\n}\n\n.ua-mono-value {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 0.82rem;\n  color: var(--ua-text);\n  background: var(--ua-bg);\n  border: 1px solid var(--ua-btn-border);\n  border-radius: 0.5rem;\n  padding: 0.45rem 0.6rem;\n  word-break: break-all;\n  user-select: all;\n}\n\n/* \u533A\u5757 */\n.ua-section {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.ua-section-title {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--ua-text);\n}\n\n.ua-section-title .ua-icon {\n  width: 16px;\n  height: 16px;\n  color: var(--ua-sub);\n}\n\n/* GitHub \u5DF2\u7ED1\u5B9A */\n.ua-github-bound {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.8rem;\n  background: color-mix(in srgb, var(--ua-text) 4%, var(--ua-bg));\n  border-radius: calc(var(--ua-radius) * 0.6);\n  padding: 0.7rem 0.9rem;\n}\n\n.ua-github-info {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  min-width: 0;\n}\n\n.ua-gh-avatar {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  border: 1px solid var(--ua-btn-border);\n}\n\n.ua-gh-avatar-fallback {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #24292f;\n  color: #fff;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n\n.ua-gh-meta {\n  min-width: 0;\n}\n\n.ua-gh-login {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--ua-text);\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.ua-badge {\n  font-size: 0.65rem;\n  font-weight: 500;\n  color: var(--ua-success);\n  background: color-mix(in srgb, var(--ua-success) 12%, var(--ua-bg));\n  border: 1px solid color-mix(in srgb, var(--ua-success) 30%, var(--ua-bg));\n  border-radius: 999px;\n  padding: 0.05rem 0.5rem;\n  flex-shrink: 0;\n}\n\n.ua-gh-date {\n  font-size: 0.72rem;\n  color: var(--ua-sub);\n  margin-top: 0.15rem;\n}\n\n.ua-gh-unbind {\n  flex-shrink: 0;\n  font-size: 0.75rem;\n  color: var(--ua-danger);\n  background: transparent;\n  border: 1px solid color-mix(in srgb, var(--ua-danger) 40%, var(--ua-bg));\n  border-radius: 0.5rem;\n  padding: 0.35rem 0.7rem;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n\n.ua-gh-unbind:hover {\n  background: color-mix(in srgb, var(--ua-danger) 8%, var(--ua-bg));\n}\n\n/* GitHub \u672A\u7ED1\u5B9A */\n.ua-github-unbound {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.ua-gh-tip {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--ua-sub);\n}\n\n.ua-gh-bind {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.65rem;\n  border: none;\n  border-radius: calc(var(--ua-radius) * 0.6);\n  background: #24292f;\n  color: #fff;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n\n.ua-gh-bind:hover {\n  background: #1a1f24;\n}\n\n.ua-gh-bind .ua-icon {\n  width: 18px;\n  height: 18px;\n}\n\n/* \u6635\u79F0\u7F16\u8F91 */\n.ua-nickname-row {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.ua-input {\n  flex: 1;\n  min-width: 0;\n  padding: 0.6rem 0.8rem;\n  font-size: 0.875rem;\n  color: var(--ua-text);\n  background: color-mix(in srgb, var(--ua-text) 4%, var(--ua-bg));\n  border: 1px solid var(--ua-btn-border);\n  border-radius: calc(var(--ua-radius) * 0.6);\n  outline: none;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n\n.ua-input:focus {\n  border-color: var(--ua-accent);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ua-accent) 22%, transparent);\n}\n\n.ua-input::placeholder {\n  color: var(--ua-sub);\n}\n\n.ua-save {\n  flex-shrink: 0;\n  padding: 0.6rem 1.1rem;\n  border: none;\n  border-radius: calc(var(--ua-radius) * 0.6);\n  background: var(--ua-accent);\n  color: #fff;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: filter 0.15s ease, transform 0.1s ease;\n}\n\n.ua-save:hover {\n  filter: brightness(1.05);\n}\n\n.ua-save:active {\n  transform: scale(0.97);\n}\n\n.ua-save:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.ua-msg {\n  min-height: 1.1em;\n  font-size: 0.75rem;\n}\n\n.ua-msg-ok {\n  color: var(--ua-success);\n}\n\n.ua-msg-err {\n  color: var(--ua-danger);\n}\n\n/* ==================== \u54CD\u5E94\u5F0F ==================== */\n\n@media (max-width: 480px) {\n  .ua-dialog {\n    max-width: 100%;\n  }\n}';

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
        ...THEME_ATTRS.map(([attr]) => attr)
      ];
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
      var _a, _b, _c, _d, _e, _f, _g;
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
        fixed: boolAttr(this, "fixed", (_c = global.fixed) != null ? _c : true),
        offset: (_d = get("offset")) != null ? _d : global.offset,
        size: (_e = get("size")) != null ? _e : global.size,
        zIndex: numAttr(this, "z-index", (_f = global.zIndex) != null ? _f : 12e3),
        theme: { ...(_g = global.theme) != null ? _g : {}, ...theme },
        onLogin: global.onLogin,
        onLogout: global.onLogout,
        onGithubBound: global.onGithubBound
      };
    }
  };
  if (!customElements.get(TAG)) {
    customElements.define(TAG, UserAvatarElement);
  }
})();

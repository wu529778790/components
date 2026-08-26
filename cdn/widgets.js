(()=>{var ne={wechat:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",title:"\u516C\u4F17\u53F7",desc:""},donate:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",title:"\u8D5E\u8D4F\u7801",desc:""}},oe={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},re=[{href:"https://t.me/shenzjd_com",icon:"tg",title:"Telegram"},{href:"https://github.com/wu529778790",icon:"github",title:"GitHub"},{href:"https://x.com/shenzujiudi",icon:"x",title:"X"}],$={tg:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.2c-1.2.5-1.1 2.2.1 2.6l4.3 1.4 1.6 5.2c.3 1.1 1.7 1.4 2.5.6l2.4-2.4 4.5 3.3c1 .7 2.4.2 2.7-1L21.9 4.6zM8.6 13.5l8.7-5.4c.1-.1.3.1.2.2l-6.8 6.7c-.2.2-.3.4-.4.7l-.5 2.6c0 .1-.2.1-.2 0l-.9-4.7c-.1-.1 0-.2 0-.1z"/></svg>',github:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.1 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1.1 16.1h1.7L8.1 4.7H6.3L16.4 19.1z"/></svg>'};function se(n,t){return n?$[n]?$[n]:/^[a-z][a-z0-9+.-]*:\/\//i.test(n)||n.startsWith("data:")?`<img class="fq-link-img" src="${m(n)}" alt="" loading="lazy" />`:n.includes("<")?n:g(n.slice(0,1)):g((t||"\u2022").slice(0,1))}var _="floating-qr:closed",ae="(max-width: 767px)";function le(){return typeof window>"u"?!1:window.matchMedia?.(ae)?.matches??!1}function de(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(_)==="1"}catch{return!1}}function ce(){if(!(typeof localStorage>"u"))try{localStorage.setItem(_,"1")}catch{}}var E=class n{constructor(t={},e=document.body){this.el=null;this.closeBtn=null;this.handleClose=()=>{this.close()};this.opts=this.resolve(t),!(this.opts.hideOnMobile&&le())&&(this.opts.closePersistence&&de()||this.render(e))}isMounted(){return this.el!==null&&this.el.isConnected}close(){this.opts.closePersistence&&ce(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.remove(),this.el=null}update(t){this.destroy();let e=new n(t);this.opts.theme=e.opts.theme,this.opts.themeOverrides=e.opts.themeOverrides,this.opts.position=e.opts.position,this.opts.closePersistence=e.opts.closePersistence,this.opts.hideOnMobile=e.opts.hideOnMobile,this.opts.zIndex=e.opts.zIndex,this.opts.wechat=e.opts.wechat,this.opts.donate=e.opts.donate,this.opts.links=e.opts.links,this.el=e.el,this.closeBtn=e.closeBtn}resolve(t){let e=(i,o)=>{let s=ne[o];return{src:i?.src??s.src,title:i?.title??s.title,desc:i?.desc??s.desc}};return{wechat:e(t.wechat,"wechat"),donate:e(t.donate,"donate"),position:t.position??"right-center",closePersistence:t.closePersistence??!1,hideOnMobile:t.hideOnMobile??!0,zIndex:t.zIndex??9999,theme:{...oe,...t.theme??{}},themeOverrides:t.theme??{},links:t.links??re}}render(t=document.body){let{wechat:e,donate:i,position:o,zIndex:s,themeOverrides:r,links:d}=this.opts,a=document.createElement("div");a.className="fq-widget",a.dataset.position=o,a.style.zIndex=String(s);let h=[["--fq-bg",r.bg],["--fq-accent",r.accent],["--fq-radius",r.radius],["--fq-border",r.border]];for(let[l,p]of h)p!==void 0&&a.style.setProperty(l,p);a.innerHTML=`
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${ue}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${m(e.src)}" alt="${m(e.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${g(e.title)}</p>
        ${e.desc?`<p class="fq-desc">${g(e.desc)}</p>`:""}
      </div>
      <div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${m(i.src)}" alt="${m(i.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${g(i.title)}</p>
        ${i.desc?`<p class="fq-desc">${g(i.desc)}</p>`:""}
      </div>
      ${d.length?`<div class="fq-links">${d.map(l=>`
        <a class="fq-link" href="${m(l.href)}" title="${m(l.title??"")}" target="_blank" rel="noopener noreferrer">${se(l.icon,l.title)}</a>`).join("")}
        </div>`:""}
    `,this.closeBtn=a.querySelector(".fq-close"),this.closeBtn?.addEventListener("click",this.handleClose),t.appendChild(a),this.el=a}},ue='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function g(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function m(n){return g(n)}var U=`.fq-widget {
  --fq-bg: rgba(255, 255, 255, 0.96);
  --fq-accent: #333;
  --fq-radius: 12px;
  --fq-border: rgba(0, 0, 0, 0.1);
  --fq-offset: 16px;
  --fq-width: 150px;

  position: fixed;
  z-index: 9999;
  box-sizing: border-box;
  width: var(--fq-width);
  padding: 14px;
  background: var(--fq-bg);
  border: 1px solid var(--fq-border);
  border-radius: var(--fq-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  color: var(--fq-accent);
  line-height: 1.5;
  color-scheme: light dark;
}

.fq-widget[data-position="right-bottom"] {
  right: var(--fq-offset);
  bottom: var(--fq-offset);
}

.fq-widget[data-position="right-top"] {
  right: var(--fq-offset);
  top: var(--fq-offset);
}

.fq-widget[data-position="left-bottom"] {
  left: var(--fq-offset);
  bottom: var(--fq-offset);
}

.fq-widget[data-position="left-top"] {
  left: var(--fq-offset);
  top: var(--fq-offset);
}

.fq-widget[data-position="right-center"] {
  right: var(--fq-offset);
  top: 50%;
  transform: translateY(-50%);
}

.fq-widget[data-position="left-center"] {
  left: var(--fq-offset);
  top: 50%;
  transform: translateY(-50%);
}

.fq-close {
  position: absolute;
  top: -2px;
  right: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: color 0.15s ease, opacity 0.15s ease;
}

.fq-close:hover {
  color: rgba(0, 0, 0, 0.7);
}

/* \u89E6\u5C4F\u8BBE\u5907\uFF08\u65E0 hover\uFF09\uFF1A\u5173\u95ED\u6309\u94AE\u5E38\u663E\uFF0C\u4FDD\u8BC1\u53EF\u5173\u95ED */
.fq-close {
  opacity: 1;
}

/* \u652F\u6301 hover \u7684\u8BBE\u5907\uFF08\u9F20\u6807\uFF09\uFF1A\u5E73\u65F6\u9690\u85CF\uFF0C\u60AC\u505C\u5361\u7247\u65F6\u6D6E\u73B0 */
@media (hover: hover) and (pointer: fine) {
  .fq-close {
    opacity: 0;
    pointer-events: none;
  }
  .fq-widget:hover .fq-close,
  .fq-close:focus-visible {
    opacity: 1;
    pointer-events: auto;
  }
}

.fq-section {
  text-align: center;
}

.fq-qr {
  overflow: hidden;
  border-radius: 4px;
}

.fq-img {
  display: block;
  width: 100%;
  height: auto;
}

.fq-label {
  margin: 8px 0 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--fq-accent);
}

.fq-desc {
  margin: 2px 0 0;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
}

.fq-divider {
  height: 1px;
  margin: 10px 0;
  background: var(--fq-border);
}

/* \u5E95\u90E8\u793E\u4EA4\u94FE\u63A5\uFF08Telegram / GitHub / X \u7B49\uFF09 */
.fq-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--fq-border);
}

.fq-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.45);
  text-decoration: none;
  transition: color 0.15s ease, background 0.15s ease;
}

.fq-link:hover {
  color: var(--fq-accent);
  background: rgba(0, 0, 0, 0.05);
}

.fq-link svg {
  display: block;
}

.fq-link-img {
  width: 16px;
  height: 16px;
}

.fq-link-txt {
  font-size: 12px;
  line-height: 1;
}

@media (max-width: 767px) {
  .fq-widget {
    width: 120px;
    padding: 10px;
  }
}

/* \u8DDF\u968F\u7CFB\u7EDF\u6DF1\u8272\u6A21\u5F0F \u2014\u2014 \u5FC5\u987B\u653E\u6587\u4EF6\u672B\u5C3E\uFF0C\u786E\u4FDD\u4F18\u5148\u7EA7\u9AD8\u4E8E\u4E0A\u9762\u7684\u6D45\u8272\u89C4\u5219
   (\u4EC5\u5F71\u54CD\u9ED8\u8BA4\u503C\uFF1B\u7528\u6237\u663E\u5F0F\u8BBE\u7F6E\u7684 --fq-* inline \u53D8\u91CF\u4ECD\u4F18\u5148) */
@media (prefers-color-scheme: dark) {
  .fq-widget {
    --fq-bg: rgba(28, 28, 30, 0.96);
    --fq-accent: rgba(255, 255, 255, 0.92);
    --fq-border: rgba(255, 255, 255, 0.14);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  }

  .fq-close {
    color: rgba(255, 255, 255, 0.4);
  }

  .fq-close:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .fq-desc {
    color: rgba(255, 255, 255, 0.55);
  }

  .fq-link {
    color: rgba(255, 255, 255, 0.5);
  }

  .fq-link:hover {
    color: var(--fq-accent);
    background: rgba(255, 255, 255, 0.08);
  }
}
`;var L="floating-qr",ge="__FLOATING_QR_OPTIONS__",P="__floatingQrAutoInjected__",me="(max-width: 767px)";function pe(){return window[ge]}function G(n,t,e){let i=n.getAttribute(t);return i===null?e:i===""||i==="true"||i==="1"}function fe(n,t,e){let i=n.getAttribute(t);if(i===null||i==="")return e;let o=Number(i);return Number.isFinite(o)?o:e}var N=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]];function ve(n){if(n===null)return null;let t=n.trim().toLowerCase();return t===""||t==="none"||t==="off"?[]:n.split(",").map(e=>e.trim()).filter(Boolean).map(e=>{let i=/github\.com/i.test(e)?"github":/t\.me/i.test(e)?"tg":/x\.com|twitter\.com/i.test(e)?"x":void 0;return{href:e,icon:i,title:i}})}var v=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=U,this.shadow.appendChild(e)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","wechat-src","wechat-title","wechat-desc","donate-src","donate-title","donate-desc","link-hrefs",...N.map(([e])=>e)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}render(){if(!this.isConnected)return;let e=this.buildOptions();e.hideOnMobile&&window.matchMedia?.(me)?.matches||(this.widget?.destroy(),this.widget=new E(e,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let e=pe()??{},i=a=>this.getAttribute(a),o={};for(let[a,h]of N){let l=i(a);l!==null&&(o[h]=l)}let s=(a,h)=>{let l=i(`${a}-src`),p=i(`${a}-title`),T=i(`${a}-desc`);if(l===null&&p===null&&T===null)return h;let k={};return l!==null&&(k.src=l),p!==null&&(k.title=p),T!==null&&(k.desc=T),k},r=i("link-hrefs"),d=ve(r);return{...e,position:i("position")??e.position,closePersistence:G(this,"close-persistence",e.closePersistence??!1),hideOnMobile:G(this,"hide-on-mobile",e.hideOnMobile??!0),zIndex:fe(this,"z-index",e.zIndex??9999),theme:{...e.theme??{},...o},wechat:s("wechat",e.wechat),donate:s("donate",e.donate),links:d??e.links}}};function Q(){if(document.documentElement?.getAttribute("data-fq-auto")==="false"||document.querySelector(L)||window[P])return;window[P]=!0;let t=document.createElement(L);document.body.appendChild(t)}customElements.get(L)||(customElements.define(L,v),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q):Q());var be="\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002",xe={src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",alt:"\u8D5E\u8D4F\u7801"},we={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},b=class{constructor(t={},e=document.body){this.mask=null;this.closeBtn=null;this.timer=null;this.escHandler=null;this.handleClose=()=>{this.close()};this.handleMaskClick=t=>{t.target===this.mask&&this.close()};this.opts=this.resolve(t),this.container=e;let i=()=>this.render();this.opts.delay>0?this.timer=setTimeout(i,this.opts.delay):i()}isOpen(){return this.mask!==null&&this.mask.isConnected}show(){this.isOpen()||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.render())}close(){this.destroy(),this.opts.onClose?.()}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.mask?.remove(),this.mask=null}resolve(t){let e=t.qr??xe;return{title:t.title??"\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",content:t.content??be,contentHtml:t.contentHtml??"",qr:{src:e.src,alt:e.alt??"\u8D5E\u8D4F\u7801"},width:t.width??380,maskClosable:t.maskClosable??!0,closeOnEsc:t.closeOnEsc??!0,showClose:t.showClose??!0,delay:t.delay??0,zIndex:t.zIndex??1e4,theme:{...we,...t.theme??{}},onClose:t.onClose}}render(){let{width:t,zIndex:e,theme:i,showClose:o,maskClosable:s}=this.opts,r=document.createElement("div");r.className="fm-mask",r.style.zIndex=String(e),r.style.setProperty("--fm-overlay",i.overlay),r.style.setProperty("--fm-bg",i.bg),r.style.setProperty("--fm-accent",i.accent),r.style.setProperty("--fm-radius",i.radius),r.style.setProperty("--fm-border",i.border),r.style.setProperty("--fm-title-color",i.titleColor),r.style.setProperty("--fm-text-color",i.textColor),r.style.setProperty("--fm-width",`${t}px`),s&&r.addEventListener("click",this.handleMaskClick),r.innerHTML=`
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${O(this.opts.title)}">
        ${o?`<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${ye}</button>`:""}
        <p class="fm-title">${C(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `,this.closeBtn=r.querySelector(".fm-close"),this.closeBtn?.addEventListener("click",this.handleClose),this.container.appendChild(r),this.mask=r,this.opts.closeOnEsc&&(this.escHandler=d=>{d.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler))}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:C(this.opts.content).replace(/\n/g,"<br>")}buildQR(){let{qr:t}=this.opts;return`
      <div class="fm-qr">
        <img class="fm-qr-img" src="${O(t.src)}" alt="${O(t.alt)}" loading="lazy" />
      </div>
    `}},ye='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function C(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function O(n){return C(n)}var j=`.fm-mask {
  --fm-overlay: rgba(0, 0, 0, 0.4);
  --fm-bg: #fff;
  --fm-accent: #185fa5;
  --fm-radius: 16px;
  --fm-border: rgba(0, 0, 0, 0.1);
  --fm-title-color: #1f1f1f;
  --fm-text-color: #555;
  --fm-width: 380px;

  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  background: var(--fm-overlay);
  animation: fm-fade-in 0.18s ease;
}

.fm-modal {
  position: relative;
  box-sizing: border-box;
  width: var(--fm-width);
  max-width: 92vw;
  max-height: 88vh;
  overflow-y: auto;
  padding: 28px 28px 24px;
  background: var(--fm-bg);
  border: 1px solid var(--fm-border);
  border-radius: var(--fm-radius);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  line-height: 1.6;
  animation: fm-rise-in 0.22s ease;
}

.fm-close {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.fm-close:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}

.fm-title {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 500;
  color: var(--fm-title-color);
}

.fm-content {
  margin: 0 0 18px;
  font-size: 13px;
  color: var(--fm-text-color);
}

.fm-qr {
  margin: 0 auto 14px;
  width: 190px;
  max-width: 100%;
}

.fm-qr-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

@keyframes fm-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fm-rise-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .fm-modal {
    padding: 24px 20px 20px;
  }

  .fm-qr {
    width: 160px;
  }
}
`;var M="floating-modal",Ee="__FLOATING_MODAL_OPTIONS__",W="__floatingModalAutoInjected__";function Le(){return window[Ee]}function q(n,t,e){let i=n.getAttribute(t);return i===null?e:i===""||i==="true"||i==="1"}function S(n,t,e){let i=n.getAttribute(t);if(i===null||i==="")return e;let o=Number(i);return Number.isFinite(o)?o:e}var D=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],x=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=j,this.shadow.appendChild(e)}static get observedAttributes(){return["auto-show","title","content","content-html","qr-src","qr-alt","width","mask-closable","close-on-esc","show-close","delay","z-index",...D.map(([e])=>e)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}show(){this.widget?.isOpen()||(this.widget?.destroy(),this.widget=new b(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){this.isConnected&&q(this,"auto-show",!0)&&(this.widget?.destroy(),this.widget=new b(this.buildOptions(),this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let e=Le()??{},i=a=>this.getAttribute(a),o={};for(let[a,h]of D){let l=i(a);l!==null&&(o[h]=l)}let s=i("qr-src"),r=i("qr-alt"),d=s===null&&r===null?e.qr:{src:s??e.qr?.src??"",alt:r??e.qr?.alt};return{...e,title:i("title")??e.title,content:i("content")??e.content,contentHtml:i("content-html")??e.contentHtml,qr:d,width:S(this,"width",e.width??380),maskClosable:q(this,"mask-closable",e.maskClosable??!0),closeOnEsc:q(this,"close-on-esc",e.closeOnEsc??!0),showClose:q(this,"show-close",e.showClose??!0),delay:S(this,"delay",e.delay??0),zIndex:S(this,"z-index",e.zIndex??1e4),theme:{...e.theme??{},...o}}}};function K(){if(document.documentElement?.getAttribute("data-fm-auto")==="false"||document.querySelector(M)||window[W])return;window[W]=!0;let t=document.createElement(M);document.body.appendChild(t)}customElements.get(M)||(customElements.define(M,x),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",K):K());function A(){if(typeof window<"u")return window.WxAuth}var z="wxauth-token",R="wxauth-openid";function w(){let n=document.cookie.split("; ");for(let t of n)if(t.startsWith(`${z}=`))return t.slice(z.length+1);for(let t of n)if(t.startsWith(`${R}=`))return t.slice(R.length+1);return""}function H(){let n=window.location.hostname;if(n==="localhost"||/^\d+\.\d+\.\d+\.\d+$/.test(n))return"";let t=n.split(".");return t.length>=2?"."+t.slice(-2).join("."):""}function V(){Y(z),Y(R)}function Y(n){let t=H()?`;domain=${H()}`:"",e=window.location.protocol==="https:"?";Secure":"";document.cookie=`${n}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${t}${e};SameSite=Strict`}function c(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function f(n){return c(n)}var B='<svg class="ua-icon-user" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>',J='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',X='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h4a1 1 0 110 2H4v12h4a1 1 0 110 2H4a1 1 0 01-1-1V3zm10.293 9.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293a1 1 0 000 1.414zM21 10a1 1 0 01-1-1v2a1 1 0 110 0v-2a1 1 0 011 0 1 1 0 010 1v-1h27a1 1 0 010 2H20a1 1 0 01-1-1v-2a1 1 0 010-1z" clip-rule="evenodd"/></svg>',Z='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',I='<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>';var ee={btnBg:"#ffffff",size:"2.5rem",accent:"#1f2328",btnBorder:"rgba(27, 31, 36, 0.12)",radius:"16px",bg:"#ffffff",text:"#1f2328",subText:"#656d76",overlay:"rgba(31, 35, 40, 0.45)",danger:"#dc2626",success:"#1a7f37"},u=class{constructor(t={},e=document.body){this.user=null;this.menuEl=null;this.settingsEl=null;this.menuCleanup=null;this.settingsCleanup=null;this.githubMsgListener=null;this.saving=!1;this.nicknameDraft="";this.container=e,this.opts=this.resolve(t),this.root=document.createElement("div"),this.root.className="ua-root"}static check(t){return t||A()?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(t){return this.root.isConnected?this:(t?t.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),this.fetchUser(),this)}unmount(){this.destroy()}async login(){return this.triggerLogin()}async refresh(){await this.fetchUser()}destroy(){this.closeMenu(),this.closeSettings(),this.githubMsgListener&&(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null),this.root.remove()}resolve(t){return{sdk:t.sdk??A(),apiBase:t.apiBase??"",fixed:t.fixed??!0,offset:t.offset??"1rem 1.5rem",size:t.size??ee.size,zIndex:t.zIndex??12e3,theme:{...ee,...t.theme??{}},onLogin:t.onLogin,onLogout:t.onLogout,onGithubBound:t.onGithubBound}}applyTheme(){let t=this.opts.theme,e=this.root.style;e.setProperty("--ua-btn-bg",t.btnBg),e.setProperty("--ua-size",t.size),e.setProperty("--ua-accent",t.accent),e.setProperty("--ua-btn-border",t.btnBorder),e.setProperty("--ua-radius",t.radius),e.setProperty("--ua-bg",t.bg),e.setProperty("--ua-text",t.text),e.setProperty("--ua-sub",t.subText),e.setProperty("--ua-overlay",t.overlay),e.setProperty("--ua-danger",t.danger),e.setProperty("--ua-success",t.success)}async triggerLogin(){let t=this.opts.sdk;if(!t)return console.warn("[UserAvatar] \u672A\u627E\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK"),!1;let e=await t.requireAuth();return e&&(await this.fetchUser(),this.user&&this.opts.onLogin?.(this.user)),e}async logout(){this.opts.sdk?.clearToken(),V(),this.user=null,this.closeMenu(),this.closeSettings(),this.render(),this.opts.onLogout?.()}async fetchUser(){let t=w();if(!t){this.user=null,this.render();return}try{let e=this.opts.apiBase||window.location.origin,o=await(await fetch(`${e}/api/auth/userinfo?token=${encodeURIComponent(t)}`)).json();this.user=o.authenticated&&o.user?o.user:null}catch(e){console.error("[UserAvatar] \u62C9\u53D6\u7528\u6237\u8BE6\u60C5\u5931\u8D25",e),this.user=null}this.render()}async saveNickname(){let t=w(),e=this.nicknameDraft.trim();if(t){if(e.length<2||e.length>20){this.setMsg("\u6635\u79F0\u9700\u4E3A 2-20 \u4E2A\u5B57\u7B26");return}if(!this.saving){this.saving=!0,this.updateSaveBtn(),this.setMsg("");try{let i=this.opts.apiBase||window.location.origin,s=await(await fetch(`${i}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,action:"set-nickname",nickname:e})})).json();s.success?(this.setMsg("\u5DF2\u4FDD\u5B58"),this.nicknameDraft=e,await this.fetchUser()):this.setMsg(s.message||"\u4FDD\u5B58\u5931\u8D25")}catch(i){console.error("[UserAvatar] \u4FDD\u5B58\u6635\u79F0\u5931\u8D25",i),this.setMsg("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}finally{this.saving=!1,this.updateSaveBtn()}}}}async unbindGithub(){let t=w();if(t)try{let e=this.opts.apiBase||window.location.origin,o=await(await fetch(`${e}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,action:"unbind-github"})})).json();o.success?await this.fetchUser():window.alert(o.message||"\u89E3\u7ED1\u5931\u8D25")}catch(e){console.error("[UserAvatar] \u89E3\u7ED1\u5931\u8D25",e),window.alert("\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}}render(){this.root.innerHTML="",this.menuEl=null,this.settingsEl=null;let t=this.opts.fixed?`position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}`:"";this.root.innerHTML=`
      <div class="ua-widget" style="${t}">
        <button type="button" class="ua-avatar" aria-haspopup="true" aria-label="${this.user?"\u6253\u5F00\u7528\u6237\u83DC\u5355":"\u5FAE\u4FE1\u767B\u5F55"}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `;let e=this.root.querySelector(".ua-avatar");e.addEventListener("click",()=>{this.user?this.toggleMenu():this.triggerLogin()}),e.addEventListener("mouseenter",()=>{this.user&&!this.menuEl&&this.openMenu()})}offsetTop(){let t=/^([^,\s]+)/.exec(this.opts.offset);return t?t[1]:"1rem"}offsetRight(){let t=/,\s*([^\s,]+)/.exec(this.opts.offset);if(t)return t[1];let e=this.opts.offset.trim().split(/\s+/);return e[1]??e[0]??"1.5rem"}buildAvatarInnerHtml(){if(!this.user)return B;let t=this.user.headimgurl||this.user.github?.avatar||"";if(t)return`<img class="ua-avatar-img" src="${f(t)}" alt="" referrerpolicy="no-referrer" />`;let e=this.user.nickname||this.user.github?.login||"\u5FAE\u4FE1\u7528\u6237";return`<span class="ua-avatar-fallback">${c(e.charAt(0).toUpperCase())}</span>`}toggleMenu(){this.menuEl?this.closeMenu():this.openMenu()}openMenu(){let t=this.user;if(!t||this.menuEl)return;this.closeSettings();let e=document.createElement("div");e.className="ua-menu",e.style.zIndex=String(this.opts.zIndex+1);let i=t.nickname||(t.github?`@${t.github.login}`:"\u5FAE\u4FE1\u7528\u6237");e.innerHTML=`
      <div class="ua-menu-user"><span class="ua-menu-name">${c(i)}</span></div>
      <button type="button" class="ua-menu-item" data-action="settings">${J}<span>\u8BBE\u7F6E</span></button>
      <button type="button" class="ua-menu-item ua-menu-item-danger" data-action="logout">${X}<span>\u9000\u51FA\u767B\u5F55</span></button>
    `;let o=r=>{this.root.contains(r.target)||this.closeMenu()},s=r=>{r.key==="Escape"&&this.closeMenu()};document.addEventListener("mousedown",o),document.addEventListener("keydown",s),this.menuCleanup=()=>{document.removeEventListener("mousedown",o),document.removeEventListener("keydown",s)},e.addEventListener("mouseleave",()=>this.closeMenu()),e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{this.openSettings()}),e.querySelector('[data-action="logout"]')?.addEventListener("click",()=>{this.logout()}),this.root.appendChild(e),this.menuEl=e}closeMenu(){this.menuEl?.remove(),this.menuEl=null,this.menuCleanup?.(),this.menuCleanup=null}openSettings(){let t=this.user;if(!t)return;this.closeMenu(),this.closeSettings(),this.nicknameDraft=t.nickname||"";let e=document.createElement("div");e.className="ua-mask",e.style.zIndex=String(this.opts.zIndex+10),e.innerHTML=this.buildSettingsHtml(t),this.settingsEl=e,this.root.appendChild(e),this.bindSettingsEvents(e);let i=s=>{s.target===e&&this.closeSettings()},o=s=>{s.key==="Escape"&&this.closeSettings()};document.addEventListener("mousedown",i),document.addEventListener("keydown",o),this.settingsCleanup=()=>{document.removeEventListener("mousedown",i),document.removeEventListener("keydown",o)}}buildSettingsHtml(t){let e=t.headimgurl||t.github?.avatar,i=e?`<img class="ua-big-avatar" src="${f(e)}" alt="" referrerpolicy="no-referrer" />`:`<div class="ua-big-avatar ua-big-avatar-fallback">${c((t.nickname||t.github?.login||"?").charAt(0).toUpperCase())}</div>`,o=t.github?`
        <div class="ua-github-bound">
          <div class="ua-github-info">
            ${t.github.avatar?`<img class="ua-gh-avatar" src="${f(t.github.avatar)}" alt="@${f(t.github.login)}" referrerpolicy="no-referrer" />`:`<div class="ua-gh-avatar ua-gh-avatar-fallback">${c(t.github.login.charAt(0).toUpperCase())}</div>`}
            <div class="ua-gh-meta">
              <div class="ua-gh-login">@${c(t.github.login)} <span class="ua-badge">\u5DF2\u7ED1\u5B9A</span></div>
              <div class="ua-gh-date">\u7ED1\u5B9A\u4E8E ${c(new Date(t.github.boundAt).toLocaleDateString())}</div>
            </div>
          </div>
          <button type="button" class="ua-gh-unbind" data-action="unbind">\u89E3\u7ED1</button>
        </div>`:`
        <div class="ua-github-unbound">
          <p class="ua-gh-tip">\u7ED1\u5B9A GitHub \u8D26\u53F7\uFF0C\u7528\u4E8E\u8EAB\u4EFD\u8BC6\u522B\u4E0E\u540E\u7EED\u4E1A\u52A1\u5BF9\u63A5</p>
          <button type="button" class="ua-gh-bind" data-action="bind">${I}<span>\u7ED1\u5B9A GitHub</span></button>
        </div>`;return`
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="\u8BBE\u7F6E">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u8BBE\u7F6E</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${Z}</button>
        </div>
        <div class="ua-dialog-body">
          <div class="ua-user-row">
            ${i}
            <div class="ua-user-meta">
              <div class="ua-user-name">${c(t.nickname||(t.github?`@${t.github.login}`:"\u5FAE\u4FE1\u7528\u6237"))}</div>
              <div class="ua-user-sub">\u767B\u5F55\u4E8E ${c(new Date(t.authenticatedAt||Date.now()).toLocaleString())}</div>
            </div>
          </div>

          <div class="ua-mono-row">
            <div class="ua-mono-label">\u5FAE\u4FE1 ID\uFF08openid\uFF09</div>
            <div class="ua-mono-value">${c(t.openid||"-")}</div>
          </div>

          <div class="ua-section">
            <div class="ua-section-title">${I}<span>GitHub</span></div>
            ${o}
          </div>

          <div class="ua-section">
            <div class="ua-section-title">${B}<span>\u8BBE\u7F6E\u540D\u5B57</span></div>
            <div class="ua-nickname-row">
              <input type="text" class="ua-input" maxlength="20" placeholder="2-20 \u4E2A\u5B57\u7B26" value="${f(this.nicknameDraft)}" />
              <button type="button" class="ua-save" data-action="save">\u4FDD\u5B58</button>
            </div>
            <div class="ua-msg" data-role="msg"></div>
          </div>
        </div>
      </div>
    `}bindSettingsEvents(t){let e=t.querySelector(".ua-input");e?.addEventListener("input",()=>{this.nicknameDraft=e.value,this.setMsg("")}),e?.addEventListener("keydown",i=>{i.key==="Enter"&&this.saveNickname()}),t.querySelector('[data-action="save"]')?.addEventListener("click",()=>{this.saveNickname()}),t.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.closeSettings()}),t.querySelector('[data-action="bind"]')?.addEventListener("click",()=>{this.startGithubBind()}),t.querySelector('[data-action="unbind"]')?.addEventListener("click",()=>{this.unbindGithub()})}closeSettings(){this.settingsEl?.remove(),this.settingsEl=null,this.settingsCleanup?.(),this.settingsCleanup=null}setMsg(t){let e=this.settingsEl?.querySelector('[data-role="msg"]');e&&(e.textContent=t,e.className=t==="\u5DF2\u4FDD\u5B58"?"ua-msg ua-msg-ok":t?"ua-msg ua-msg-err":"ua-msg")}updateSaveBtn(){let t=this.settingsEl?.querySelector('[data-action="save"]');t&&(t.textContent=this.saving?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58")}startGithubBind(){let t=w();if(!t){window.alert("\u8BF7\u5148\u5B8C\u6210\u5FAE\u4FE1\u767B\u5F55");return}let i=`${this.opts.apiBase||window.location.origin}/api/oauth/github/authorize?token=${encodeURIComponent(t)}`;window.open(i,"github-bind","width=720,height=720,menubar=no,toolbar=no,location=no,status=no"),!this.githubMsgListener&&(this.githubMsgListener=o=>{let s=o.data;!s||s.type!=="github-bound"||(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null,this.fetchUser().then(()=>{this.user?.github&&this.opts.onGithubBound?.(this.user)}))},window.addEventListener("message",this.githubMsgListener))}};var te=`/* ============================================================
   user-avatar \u7EC4\u4EF6\u6837\u5F0F
   \u5168\u90E8\u4E3B\u9898\u901A\u8FC7 --ua-* CSS \u53D8\u91CF\u9A71\u52A8\uFF0C\u76F4\u63A5\u8986\u76D6\u53D8\u91CF\u5373\u53EF\u6362\u80A4\u3002
   ============================================================ */

.ua-root {
  /* ===== \u4E3B\u9898\u53D8\u91CF\uFF08\u9ED8\u8BA4\u503C\uFF0C\u53EF\u5728\u4EFB\u610F\u7236\u7EA7\u8986\u76D6\uFF09 ===== */
  --ua-btn-bg: #ffffff;
  --ua-size: 2.5rem;
  --ua-accent: #1f2328;
  --ua-btn-border: rgba(27, 31, 36, 0.12);
  --ua-radius: 16px;
  --ua-bg: #ffffff;
  --ua-text: #1f2328;
  --ua-sub: #656d76;
  --ua-overlay: rgba(31, 35, 40, 0.45);
  --ua-danger: #dc2626;
  --ua-success: #1a7f37;

  /* \u56FE\u6807\u5C3A\u5BF8 */
  --ua-icon: 1rem;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  color-scheme: light dark;
  line-height: 1.5;
}

.ua-root * {
  box-sizing: border-box;
}

/* ==================== \u5934\u50CF\u6309\u94AE ==================== */

.ua-widget {
  position: relative;
  display: inline-block;
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
  padding: 1rem;
  background: var(--ua-overlay);
  backdrop-filter: blur(2px);
  animation: ua-fade 0.18s ease;
}

@keyframes ua-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.ua-dialog {
  width: 100%;
  max-width: 26rem;
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  background: var(--ua-bg);
  border-radius: var(--ua-radius);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  animation: ua-up 0.2s ease;
}

@keyframes ua-up {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
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
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--ua-btn-border);
}

.ua-dialog-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ua-text);
}

.ua-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--ua-sub);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.ua-close:hover {
  background: color-mix(in srgb, var(--ua-text) 8%, var(--ua-bg));
  color: var(--ua-text);
}

.ua-dialog-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* \u7528\u6237\u4FE1\u606F\u884C */
.ua-user-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.ua-big-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid var(--ua-btn-border);
}

.ua-big-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--ua-accent), color-mix(in srgb, var(--ua-accent) 55%, #000));
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
}

.ua-user-meta {
  min-width: 0;
  flex: 1;
}

.ua-user-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ua-user-sub {
  font-size: 0.75rem;
  color: var(--ua-sub);
  margin-top: 0.15rem;
}

/* openid \u5C55\u793A */
.ua-mono-row {
  background: color-mix(in srgb, var(--ua-text) 5%, var(--ua-bg));
  border-radius: calc(var(--ua-radius) * 0.6);
  padding: 0.85rem 1rem;
}

.ua-mono-label {
  font-size: 0.72rem;
  color: var(--ua-sub);
  margin-bottom: 0.35rem;
}

.ua-mono-value {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.82rem;
  color: var(--ua-text);
  background: var(--ua-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 0.5rem;
  padding: 0.45rem 0.6rem;
  word-break: break-all;
  user-select: all;
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
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ua-text);
}

.ua-section-title .ua-icon {
  width: 16px;
  height: 16px;
  color: var(--ua-sub);
}

/* GitHub \u5DF2\u7ED1\u5B9A */
.ua-github-bound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  background: color-mix(in srgb, var(--ua-text) 4%, var(--ua-bg));
  border-radius: calc(var(--ua-radius) * 0.6);
  padding: 0.7rem 0.9rem;
}

.ua-github-info {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}

.ua-gh-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid var(--ua-btn-border);
}

.ua-gh-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #24292f;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
}

.ua-gh-meta {
  min-width: 0;
}

.ua-gh-login {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ua-text);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ua-badge {
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--ua-success);
  background: color-mix(in srgb, var(--ua-success) 12%, var(--ua-bg));
  border: 1px solid color-mix(in srgb, var(--ua-success) 30%, var(--ua-bg));
  border-radius: 999px;
  padding: 0.05rem 0.5rem;
  flex-shrink: 0;
}

.ua-gh-date {
  font-size: 0.72rem;
  color: var(--ua-sub);
  margin-top: 0.15rem;
}

.ua-gh-unbind {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--ua-danger);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--ua-danger) 40%, var(--ua-bg));
  border-radius: 0.5rem;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.ua-gh-unbind:hover {
  background: color-mix(in srgb, var(--ua-danger) 8%, var(--ua-bg));
}

/* GitHub \u672A\u7ED1\u5B9A */
.ua-github-unbound {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ua-gh-tip {
  margin: 0;
  font-size: 0.8rem;
  color: var(--ua-sub);
}

.ua-gh-bind {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem;
  border: none;
  border-radius: calc(var(--ua-radius) * 0.6);
  background: #24292f;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.ua-gh-bind:hover {
  background: #1a1f24;
}

.ua-gh-bind .ua-icon {
  width: 18px;
  height: 18px;
}

/* \u6635\u79F0\u7F16\u8F91 */
.ua-nickname-row {
  display: flex;
  gap: 0.5rem;
}

.ua-input {
  flex: 1;
  min-width: 0;
  padding: 0.6rem 0.8rem;
  font-size: 0.875rem;
  color: var(--ua-text);
  background: color-mix(in srgb, var(--ua-text) 4%, var(--ua-bg));
  border: 1px solid var(--ua-btn-border);
  border-radius: calc(var(--ua-radius) * 0.6);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ua-input:focus {
  border-color: var(--ua-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ua-accent) 22%, transparent);
}

.ua-input::placeholder {
  color: var(--ua-sub);
}

.ua-save {
  flex-shrink: 0;
  padding: 0.6rem 1.1rem;
  border: none;
  border-radius: calc(var(--ua-radius) * 0.6);
  background: var(--ua-accent);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.1s ease;
}

.ua-save:hover {
  filter: brightness(1.05);
}

.ua-save:active {
  transform: scale(0.97);
}

.ua-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ua-msg {
  min-height: 1.1em;
  font-size: 0.75rem;
}

.ua-msg-ok {
  color: var(--ua-success);
}

.ua-msg-err {
  color: var(--ua-danger);
}

/* ==================== \u54CD\u5E94\u5F0F ==================== */

@media (max-width: 480px) {
  .ua-dialog {
    max-width: 100%;
  }
}`;var F="user-avatar",qe="__USER_AVATAR_OPTIONS__";function Te(){return window[qe]}function Ce(n,t,e){let i=n.getAttribute(t);return i===null?e:i===""||i==="true"||i==="1"}function Oe(n,t,e){let i=n.getAttribute(t);if(i===null||i==="")return e;let o=Number(i);return Number.isFinite(o)?o:e}var ie=[["theme-btn-bg","btnBg"],["theme-size","size"],["theme-accent","accent"],["theme-btn-border","btnBorder"],["theme-radius","radius"],["theme-bg","bg"],["theme-text","text"],["theme-sub-text","subText"],["theme-overlay","overlay"],["theme-danger","danger"],["theme-success","success"]],y=class extends HTMLElement{constructor(){super();this.widget=null;this.pollTimer=null;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=te,this.shadow.appendChild(e)}static get observedAttributes(){return["api-base","fixed","offset","size","z-index",...ie.map(([e])=>e)]}connectedCallback(){this.mountWidget(),u.check()!==null&&this.startPolling()}disconnectedCallback(){this.stopPolling(),this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&(this.stopPolling(),this.mountWidget(),u.check()!==null&&this.startPolling())}startPolling(){this.pollTimer||(this.pollTimer=setInterval(()=>{u.check()===null&&(this.stopPolling(),this.mountWidget())},400))}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}mountWidget(){this.widget?.unmount();let e=u.check();e&&console.warn(`[${F}] ${e}`),this.widget=new u(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let e=Te()??{},i=s=>this.getAttribute(s),o={};for(let[s,r]of ie){let d=i(s);d!==null&&(o[r]=d)}return{...e,apiBase:i("api-base")??e.apiBase,fixed:Ce(this,"fixed",e.fixed??!0),offset:i("offset")??e.offset,size:i("size")??e.size,zIndex:Oe(this,"z-index",e.zIndex??12e3),theme:{...e.theme??{},...o},onLogin:e.onLogin,onLogout:e.onLogout,onGithubBound:e.onGithubBound}}};customElements.get(F)||customElements.define(F,y);})();

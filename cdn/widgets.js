(()=>{var ke={wechat:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",title:"\u516C\u4F17\u53F7",desc:""},donate:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",title:"\u8D5E\u8D4F\u7801",desc:""}},Ee={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},Le=[{href:"https://t.me/shenzjd_com",icon:"tg",title:"Telegram"},{href:"https://github.com/wu529778790",icon:"github",title:"GitHub"},{href:"https://x.com/shenzujiudi",icon:"x",title:"X"}],X={tg:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.2c-1.2.5-1.1 2.2.1 2.6l4.3 1.4 1.6 5.2c.3 1.1 1.7 1.4 2.5.6l2.4-2.4 4.5 3.3c1 .7 2.4.2 2.7-1L21.9 4.6zM8.6 13.5l8.7-5.4c.1-.1.3.1.2.2l-6.8 6.7c-.2.2-.3.4-.4.7l-.5 2.6c0 .1-.2.1-.2 0l-.9-4.7c-.1-.1 0-.2 0-.1z"/></svg>',github:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.1 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1.1 16.1h1.7L8.1 4.7H6.3L16.4 19.1z"/></svg>'};function Te(a,e){return a?X[a]?X[a]:/^[a-z][a-z0-9+.-]*:\/\//i.test(a)||a.startsWith("data:")?`<img class="fq-link-img" src="${f(a)}" alt="" loading="lazy" />`:a.includes("<")?a:m(a.slice(0,1)):m((e||"\u2022").slice(0,1))}var Z="floating-qr:closed",Me="(max-width: 767px)";function Se(){return typeof window>"u"?!1:window.matchMedia?.(Me)?.matches??!1}function Ce(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(Z)==="1"}catch{return!1}}function Ae(){if(!(typeof localStorage>"u"))try{localStorage.setItem(Z,"1")}catch{}}var M=class a{constructor(e={},t=document.body){this.el=null;this.closeBtn=null;this.handleClose=()=>{this.close()};this.opts=this.resolve(e),!(this.opts.hideOnMobile&&Se())&&(this.opts.closePersistence&&Ce()||this.render(t))}isMounted(){return this.el!==null&&this.el.isConnected}close(){this.opts.closePersistence&&Ae(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.remove(),this.el=null}update(e){this.destroy();let t=new a(e);this.opts.theme=t.opts.theme,this.opts.themeOverrides=t.opts.themeOverrides,this.opts.position=t.opts.position,this.opts.closePersistence=t.opts.closePersistence,this.opts.hideOnMobile=t.opts.hideOnMobile,this.opts.zIndex=t.opts.zIndex,this.opts.wechat=t.opts.wechat,this.opts.donate=t.opts.donate,this.opts.links=t.opts.links,this.el=t.el,this.closeBtn=t.closeBtn}resolve(e){let t=(n,i)=>{let r=ke[i];return{src:n?.src??r.src,title:n?.title??r.title,desc:n?.desc??r.desc}};return{wechat:t(e.wechat,"wechat"),donate:t(e.donate,"donate"),position:e.position??"right-center",closePersistence:e.closePersistence??!1,hideOnMobile:e.hideOnMobile??!0,zIndex:e.zIndex??9999,theme:{...Ee,...e.theme??{}},themeOverrides:e.theme??{},links:e.links??Le}}render(e=document.body){let{wechat:t,donate:n,position:i,zIndex:r,themeOverrides:o,links:s}=this.opts,l=document.createElement("div");l.className="fq-widget",l.dataset.position=i,l.style.zIndex=String(r);let c=[["--fq-bg",o.bg],["--fq-accent",o.accent],["--fq-radius",o.radius],["--fq-border",o.border]];for(let[d,u]of c)u!==void 0&&l.style.setProperty(d,u);l.innerHTML=`
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${Oe}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${f(t.src)}" alt="${f(t.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${m(t.title)}</p>
        ${t.desc?`<p class="fq-desc">${m(t.desc)}</p>`:""}
      </div>
      <div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${f(n.src)}" alt="${f(n.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${m(n.title)}</p>
        ${n.desc?`<p class="fq-desc">${m(n.desc)}</p>`:""}
      </div>
      ${s.length?`<div class="fq-links">${s.map(d=>`
        <a class="fq-link" href="${f(d.href)}" title="${f(d.title??"")}" target="_blank" rel="noopener noreferrer">${Te(d.icon,d.title)}</a>`).join("")}
        </div>`:""}
    `,this.closeBtn=l.querySelector(".fq-close"),this.closeBtn?.addEventListener("click",this.handleClose),e.appendChild(l),this.el=l}},Oe='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function m(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function f(a){return m(a)}var ee=`.fq-widget {
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
`;var S="floating-qr",He="__FLOATING_QR_OPTIONS__",te="__floatingQrAutoInjected__",qe="(max-width: 767px)";function Re(){return window[He]}function ne(a,e,t){let n=a.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}function Be(a,e,t){let n=a.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}var ie=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]];function Ne(a){if(a===null)return null;let e=a.trim().toLowerCase();return e===""||e==="none"||e==="off"?[]:a.split(",").map(t=>t.trim()).filter(Boolean).map(t=>{let n=/github\.com/i.test(t)?"github":/t\.me/i.test(t)?"tg":/x\.com|twitter\.com/i.test(t)?"x":void 0;return{href:t,icon:n,title:n}})}var y=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=ee,this.shadow.appendChild(t)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","wechat-src","wechat-title","wechat-desc","donate-src","donate-title","donate-desc","link-hrefs",...ie.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}render(){if(!this.isConnected)return;let t=this.buildOptions();t.hideOnMobile&&window.matchMedia?.(qe)?.matches||(this.widget?.destroy(),this.widget=new M(t,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=Re()??{},n=l=>this.getAttribute(l),i={};for(let[l,c]of ie){let d=n(l);d!==null&&(i[c]=d)}let r=(l,c)=>{let d=n(`${l}-src`),u=n(`${l}-title`),p=n(`${l}-desc`);if(d===null&&u===null&&p===null)return c;let b={};return d!==null&&(b.src=d),u!==null&&(b.title=u),p!==null&&(b.desc=p),b},o=n("link-hrefs"),s=Ne(o);return{...t,position:n("position")??t.position,closePersistence:ne(this,"close-persistence",t.closePersistence??!1),hideOnMobile:ne(this,"hide-on-mobile",t.hideOnMobile??!0),zIndex:Be(this,"z-index",t.zIndex??9999),theme:{...t.theme??{},...i},wechat:r("wechat",t.wechat),donate:r("donate",t.donate),links:s??t.links}}};function ae(){if(document.documentElement?.getAttribute("data-fq-auto")==="false"||document.querySelector(S)||window[te])return;window[te]=!0;let e=document.createElement(S);document.body.appendChild(e)}customElements.get(S)||(customElements.define(S,y),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ae):ae());var Pe="\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002",Ie={src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",alt:"\u8D5E\u8D4F\u7801"},Fe={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},w=class{constructor(e={},t=document.body){this.mask=null;this.closeBtn=null;this.timer=null;this.escHandler=null;this.handleClose=()=>{this.close()};this.handleMaskClick=e=>{e.target===this.mask&&this.close()};this.opts=this.resolve(e),this.container=t;let n=()=>this.render();this.opts.delay>0?this.timer=setTimeout(n,this.opts.delay):n()}isOpen(){return this.mask!==null&&this.mask.isConnected}show(){this.isOpen()||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.render())}close(){this.destroy(),this.opts.onClose?.()}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.mask?.remove(),this.mask=null}resolve(e){let t=e.qr??Ie;return{title:e.title??"\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",content:e.content??Pe,contentHtml:e.contentHtml??"",qr:{src:t.src,alt:t.alt??"\u8D5E\u8D4F\u7801"},width:e.width??380,maskClosable:e.maskClosable??!0,closeOnEsc:e.closeOnEsc??!0,showClose:e.showClose??!0,delay:e.delay??0,zIndex:e.zIndex??1e4,theme:{...Fe,...e.theme??{}},onClose:e.onClose}}render(){let{width:e,zIndex:t,theme:n,showClose:i,maskClosable:r}=this.opts,o=document.createElement("div");o.className="fm-mask",o.style.zIndex=String(t),o.style.setProperty("--fm-overlay",n.overlay),o.style.setProperty("--fm-bg",n.bg),o.style.setProperty("--fm-accent",n.accent),o.style.setProperty("--fm-radius",n.radius),o.style.setProperty("--fm-border",n.border),o.style.setProperty("--fm-title-color",n.titleColor),o.style.setProperty("--fm-text-color",n.textColor),o.style.setProperty("--fm-width",`${e}px`),r&&o.addEventListener("click",this.handleMaskClick),o.innerHTML=`
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${I(this.opts.title)}">
        ${i?`<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${_e}</button>`:""}
        <p class="fm-title">${P(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `,this.closeBtn=o.querySelector(".fm-close"),this.closeBtn?.addEventListener("click",this.handleClose),this.container.appendChild(o),this.mask=o,this.opts.closeOnEsc&&(this.escHandler=s=>{s.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler))}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:P(this.opts.content).replace(/\n/g,"<br>")}buildQR(){let{qr:e}=this.opts;return`
      <div class="fm-qr">
        <img class="fm-qr-img" src="${I(e.src)}" alt="${I(e.alt)}" loading="lazy" />
      </div>
    `}},_e='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function P(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function I(a){return P(a)}var re=`.fm-mask {
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
`;var C="floating-modal",$e="__FLOATING_MODAL_OPTIONS__",oe="__floatingModalAutoInjected__";function Ge(){return window[$e]}function A(a,e,t){let n=a.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}function F(a,e,t){let n=a.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}var se=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],k=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=re,this.shadow.appendChild(t)}static get observedAttributes(){return["auto-show","title","content","content-html","qr-src","qr-alt","width","mask-closable","close-on-esc","show-close","delay","z-index",...se.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}show(){this.widget?.isOpen()||(this.widget?.destroy(),this.widget=new w(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){this.isConnected&&A(this,"auto-show",!0)&&(this.widget?.destroy(),this.widget=new w(this.buildOptions(),this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=Ge()??{},n=l=>this.getAttribute(l),i={};for(let[l,c]of se){let d=n(l);d!==null&&(i[c]=d)}let r=n("qr-src"),o=n("qr-alt"),s=r===null&&o===null?t.qr:{src:r??t.qr?.src??"",alt:o??t.qr?.alt};return{...t,title:n("title")??t.title,content:n("content")??t.content,contentHtml:n("content-html")??t.contentHtml,qr:s,width:F(this,"width",t.width??380),maskClosable:A(this,"mask-closable",t.maskClosable??!0),closeOnEsc:A(this,"close-on-esc",t.closeOnEsc??!0),showClose:A(this,"show-close",t.showClose??!0),delay:F(this,"delay",t.delay??0),zIndex:F(this,"z-index",t.zIndex??1e4),theme:{...t.theme??{},...i}}}};function le(){if(document.documentElement?.getAttribute("data-fm-auto")==="false"||document.querySelector(C)||window[oe])return;window[oe]=!0;let e=document.createElement(C);document.body.appendChild(e)}customElements.get(C)||(customElements.define(C,k),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le):le());function _(){if(typeof window<"u")return window.WxAuth}var O=`/* ============================================================
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
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  background: var(--ua-bg);
  border-radius: 20px;
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
  padding: 1.5rem 1.75rem 1.25rem;
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
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ===== \u7528\u6237\u4FE1\u606F\u5361\u7247 ===== */
.ua-profile-card {
  background: var(--ua-bg);
  border-radius: 16px;
  padding: 1.5rem;
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
  gap: 1.1rem;
}

.ua-big-avatar {
  width: 4rem;
  height: 4rem;
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
  font-size: 1.6rem;
  font-weight: 700;
}

.ua-profile-info {
  min-width: 0;
  flex: 1;
}

.ua-user-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.ua-user-sub {
  font-size: 0.8rem;
  color: var(--ua-sub);
  margin-top: 0.35rem;
}

/* ===== \u5B57\u6BB5\u7EC4 ===== */
.ua-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.ua-field-label {
  font-size: 0.8rem;
  color: var(--ua-sub);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* openid \u5C55\u793A */
.ua-mono-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.15rem;
  background: color-mix(in srgb, var(--ua-text) 4%, var(--ua-bg));
  border-radius: 12px;
  border: 1px solid var(--ua-btn-border);
}

.ua-mono-label {
  font-size: 0.78rem;
  color: var(--ua-sub);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.ua-mono-value {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "SF Mono", monospace;
  font-size: 0.85rem;
  color: var(--ua-text);
  word-break: break-all;
  user-select: all;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

/* \u533A\u5757 */
.ua-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ua-section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-section-title .ua-icon {
  width: 18px;
  height: 18px;
  color: #656d76;
}

/* GitHub \u5DF2\u7ED1\u5B9A */
.ua-github-bound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--ua-bg);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  border: 1px solid var(--ua-btn-border);
  transition: all 0.2s ease;
}

.ua-github-bound:hover {
  border-color: var(--ua-btn-border);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.ua-github-info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;
}

.ua-gh-avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--ua-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.ua-gh-avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #24292f 0%, #1a1f24 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
}

.ua-gh-meta {
  min-width: 0;
}

.ua-gh-login {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ua-text);
  display: flex;
  align-items: center;
  gap: 0.45rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ua-badge {
  font-size: 0.7rem;
  font-weight: 500;
  color: #16a34a;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 1px solid #86efac;
  border-radius: 999px;
  padding: 0.15rem 0.55rem;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.ua-gh-date {
  font-size: 0.75rem;
  color: var(--ua-sub);
  margin-top: 0.2rem;
}

.ua-gh-unbind {
  flex-shrink: 0;
  font-size: 0.8rem;
  color: var(--ua-danger);
  background: transparent;
  border: 1.5px solid light-dark(#fecaca, rgba(248, 81, 73, 0.45));
  border-radius: 10px;
  padding: 0.45rem 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 500;
}

.ua-gh-unbind:hover {
  background: light-dark(#fef2f2, rgba(248, 81, 73, 0.14));
  border-color: light-dark(#fca5a5, #f85149);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.15);
}

.ua-gh-unbind:active {
  transform: translateY(0) scale(0.98);
}

/* GitHub \u672A\u7ED1\u5B9A */
.ua-github-unbound {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem;
  background: var(--ua-bg);
  border-radius: 14px;
  border: 1px dashed var(--ua-btn-border);
}

.ua-gh-tip {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ua-sub);
  line-height: 1.5;
}

.ua-gh-bind {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #24292f 0%, #1a1f24 100%);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.ua-gh-bind::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ua-gh-bind:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(36, 41, 47, 0.35);
}

.ua-gh-bind:hover::before {
  opacity: 1;
}

.ua-gh-bind:active {
  transform: translateY(0) scale(0.98);
}

.ua-gh-bind .ua-icon {
  width: 20px;
  height: 20px;
}

/* \u6635\u79F0\u7F16\u8F91 */
.ua-nickname-row {
  display: flex;
  gap: 0.65rem;
  align-items: stretch;
}

.ua-input {
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
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
  min-width: 6.5rem;
  padding: 0.75rem 1.4rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.9rem;
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
  min-height: 1.2em;
  font-size: 0.8rem;
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
    max-height: calc(100vh - 2rem);
  }

  .ua-mask {
    padding: 1rem;
  }

  .ua-dialog-head {
    padding: 1.25rem 1.4rem 1rem;
  }

  .ua-dialog-body {
    padding: 1.35rem;
    gap: 1.25rem;
  }

  .ua-profile-card {
    padding: 1.25rem;
  }

  .ua-big-avatar {
    width: 3.5rem;
    height: 3.5rem;
  }
}`;var z="wxauth-token",H="wxauth-openid";function de(a){return!a||a.length<20?!1:/^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(a)}function E(){let a=document.cookie.split("; "),e=[],t=[];for(let i of a){let r=i.indexOf("=");if(r<0)continue;let o=i.slice(0,r).trim(),s=i.slice(r+1);o===z?e.push(s):o===H&&t.push(s)}return e.find(de)||e[0]||t.find(de)||t[0]||""}function U(){let a=window.location.hostname;if(a==="localhost"||/^\d+\.\d+\.\d+\.\d+$/.test(a))return"";let e=a.split(".");return e.length>=2?"."+e.slice(-2).join("."):""}function $(){v(z,!1),v(z,!0),v(H,!1),v(H,!0)}function ce(){let a=document.cookie.split("; ");for(let e of a){let t=e.indexOf("=");if(t<0)continue;let n=e.slice(0,t).trim();if(n!==z&&n!==H)continue;let i=e.slice(t+1);/^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(i)||(v(n,!1),v(n,!0))}}function v(a,e){let t=e&&U()?`;domain=${U()}`:"",n=window.location.protocol==="https:"?";Secure":"";document.cookie=`${a}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${t}${n};SameSite=Strict`}function h(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function x(a){return h(a)}var ue='<svg class="ua-icon-user" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>',he='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',pe='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h4a1 1 0 110 2H4v12h4a1 1 0 110 2H4a1 1 0 01-1-1V3zm10.293 9.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293a1 1 0 000 1.414zM21 10a1 1 0 01-1-1v2a1 1 0 110 0v-2a1 1 0 011 0 1 1 0 010 1v-1h27a1 1 0 010 2H20a1 1 0 01-1-1v-2a1 1 0 010-1z" clip-rule="evenodd"/></svg>',ge='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',G='<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>';var j={btnBg:"light-dark(#ffffff, #262a30)",size:"2.5rem",accent:"light-dark(#1f2328, #e6edf3)",btnBorder:"light-dark(rgba(27, 31, 36, 0.12), rgba(255, 255, 255, 0.14))",radius:"16px",bg:"light-dark(#ffffff, #1c1e22)",text:"light-dark(#1f2328, #e6edf3)",subText:"light-dark(#656d76, #8b949e)",overlay:"light-dark(rgba(31, 35, 40, 0.45), rgba(0, 0, 0, 0.6))",danger:"light-dark(#dc2626, #f85149)",success:"light-dark(#1a7f37, #3fb950)"},g=class{constructor(e={},t=document.body){this.user=null;this.status="checking";this.menuEl=null;this.settingsEl=null;this.menuCleanup=null;this.settingsCleanup=null;this.githubMsgListener=null;this.saving=!1;this.saveBtnTimer=null;this.nicknameDraft="";this.onWindowFocus=()=>{this.fetchUser()};this.onVisibility=()=>{document.visibilityState==="visible"&&this.fetchUser()};this.container=t,this.opts=this.resolve(e),ce(),this.root=document.createElement("div"),this.root.className="ua-root"}static check(e){return e||_()?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(e){return this.root.isConnected?this:(e?e.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),this.fetchUser(),window.addEventListener("focus",this.onWindowFocus),document.addEventListener("visibilitychange",this.onVisibility),this)}unmount(){this.destroy()}async login(){return this.triggerLogin()}async refresh(){await this.fetchUser()}destroy(){this.closeMenu(),this.closeSettings(),this.githubMsgListener&&(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null),window.removeEventListener("focus",this.onWindowFocus),document.removeEventListener("visibilitychange",this.onVisibility),this.root.remove()}resolve(e){let t=e.sdk??_(),n=e.apiBase!==void 0&&e.apiBase!==""?e.apiBase:"https://wx-auth.shenzjd.com";return{sdk:t,apiBase:n,fixed:e.fixed??!0,offset:e.offset??"1rem 1.5rem",size:e.size??j.size,zIndex:e.zIndex??12e3,portal:e.portal??!0,portalEl:e.portalEl,theme:{...j,...e.theme??{},size:e.size??e.theme?.size??j.size},onLogin:e.onLogin,onLogout:e.onLogout,onGithubBound:e.onGithubBound}}applyTheme(){let e=this.opts.theme,t=this.root.style;t.setProperty("--ua-btn-bg",e.btnBg),t.setProperty("--ua-size",e.size),t.setProperty("--ua-accent",e.accent),t.setProperty("--ua-btn-border",e.btnBorder),t.setProperty("--ua-radius",e.radius),t.setProperty("--ua-bg",e.bg),t.setProperty("--ua-text",e.text),t.setProperty("--ua-sub",e.subText),t.setProperty("--ua-overlay",e.overlay),t.setProperty("--ua-danger",e.danger),t.setProperty("--ua-success",e.success)}usePortal(){return this.opts.portal}getPortalRoot(){return this.opts.portalEl??document.body}appendOverlay(e){if(this.usePortal()){let t=this.opts.theme,n=e.style;n.setProperty("--ua-btn-bg",t.btnBg),n.setProperty("--ua-size",t.size),n.setProperty("--ua-accent",t.accent),n.setProperty("--ua-btn-border",t.btnBorder),n.setProperty("--ua-radius",t.radius),n.setProperty("--ua-bg",t.bg),n.setProperty("--ua-text",t.text),n.setProperty("--ua-sub",t.subText),n.setProperty("--ua-overlay",t.overlay),n.setProperty("--ua-danger",t.danger),n.setProperty("--ua-success",t.success);let i=document.createElement("style");i.setAttribute("data-ua-portal-style",""),i.textContent=O,e.appendChild(i),this.getPortalRoot().appendChild(e)}else this.root.appendChild(e)}async triggerLogin(){let e=this.opts.sdk;if(!e)return console.warn("[UserAvatar] \u672A\u627E\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK"),!1;let t=await e.requireAuth();return t&&(await this.fetchUser(),this.user&&this.opts.onLogin?.(this.user)),t}async logout(){let e=this.opts.sdk;e?.revoke?await e.revoke():(e?.clearToken(),$()),this.user=null,this.status="unauth",this.closeMenu(),this.closeSettings(),this.render(),this.opts.onLogout?.()}async fetchUser(){let e=E();if(!e){this.user=null,this.status="unauth",this.render();return}this.status!=="auth"&&(this.status="checking",this.render());let t=this.user;try{let n=this.opts.apiBase||window.location.origin,r=await(await fetch(`${n}/api/auth/userinfo?token=${encodeURIComponent(e)}`)).json();if(!r.authenticated){console.warn("[UserAvatar] token \u5DF2\u5931\u6548\uFF0C\u81EA\u52A8\u6E05\u7406\u672C\u5730\u51ED\u8BC1",r.error??""),$(),this.user=null,this.status="unauth",this.closeSettings(),this.render();return}if(this.user=r.user?r.user:null,this.status=this.user?"auth":"unauth",this.status==="auth"&&t&&JSON.stringify(t)===JSON.stringify(this.user))return}catch(n){console.error("[UserAvatar] \u62C9\u53D6\u7528\u6237\u8BE6\u60C5\u5931\u8D25",n),this.status!=="auth"&&(this.user=null,this.status="unauth")}this.render()}async saveNickname(){let e=E(),t=this.nicknameDraft.trim();if(!e)return;if(t.length<2||t.length>20){this.setMsg("\u6635\u79F0\u9700\u4E3A 2-20 \u4E2A\u5B57\u7B26");return}if(this.saving)return;this.saving=!0,this.updateSaveBtn(),this.setMsg("");let n=!1;try{let i=this.opts.apiBase||window.location.origin,o=await(await fetch(`${i}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,action:"set-nickname",nickname:t})})).json();o.success?(n=!0,this.nicknameDraft=t,await this.fetchUser()):this.setMsg(o.message||"\u4FDD\u5B58\u5931\u8D25")}catch(i){console.error("[UserAvatar] \u4FDD\u5B58\u6635\u79F0\u5931\u8D25",i),this.setMsg("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}finally{this.saving=!1,this.updateSaveBtn(n)}}async unbindGithub(){let e=E();if(e)try{let t=this.opts.apiBase||window.location.origin,i=await(await fetch(`${t}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,action:"unbind-github"})})).json();i.success?await this.fetchUser():window.alert(i.message||"\u89E3\u7ED1\u5931\u8D25")}catch(t){console.error("[UserAvatar] \u89E3\u7ED1\u5931\u8D25",t),window.alert("\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}}render(){this.root.innerHTML="",this.closeMenu();let e=this.opts.fixed?`position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}`:"",t=this.status==="checking",n=t?"ua-avatar ua-avatar-checking":this.status==="auth"?"ua-avatar":"ua-avatar ua-avatar-unauth";this.root.innerHTML=`
      <div class="ua-widget" style="${e}">
        <button type="button" class="${n}" aria-haspopup="true"${t?' aria-busy="true"':""} aria-label="${this.status==="auth"?"\u6253\u5F00\u7528\u6237\u83DC\u5355":t?"\u6B63\u5728\u68C0\u6D4B\u767B\u5F55\u72B6\u6001":"\u5FAE\u4FE1\u767B\u5F55"}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `;let i=this.root.querySelector(".ua-avatar"),r=this.root.querySelector(".ua-avatar-img");r&&(r.complete&&r.naturalWidth>0?r.classList.add("ua-img-loaded"):(i.classList.add("ua-avatar-loading-img"),r.addEventListener("load",()=>{r.classList.add("ua-img-loaded"),i.classList.remove("ua-avatar-loading-img")},{once:!0}),r.addEventListener("error",()=>{let o=this.user?.nickname||this.user?.github?.login||"\u5FAE",s=document.createElement("span");s.className="ua-avatar-fallback",s.textContent=o.charAt(0).toUpperCase(),r.replaceWith(s),i.classList.remove("ua-avatar-loading-img")},{once:!0}))),i.addEventListener("click",()=>{this.status!=="checking"&&(this.user?this.toggleMenu():this.triggerLogin())})}offsetTop(){let e=/^([^,\s]+)/.exec(this.opts.offset);return e?e[1]:"1rem"}offsetRight(){let e=/,\s*([^\s,]+)/.exec(this.opts.offset);if(e)return e[1];let t=this.opts.offset.trim().split(/\s+/);return t[1]??t[0]??"1.5rem"}buildAvatarInnerHtml(){if(this.status==="checking")return'<span class="ua-avatar-skeleton" aria-hidden="true"></span>';if(!this.user)return'<span class="ua-avatar-login">\u767B\u5F55</span>';let e=this.user.headimgurl||this.user.github?.avatar||"";if(e)return`<img class="ua-avatar-img" src="${x(e)}" alt="" referrerpolicy="no-referrer" />`;let t=this.user.nickname||this.user.github?.login||"\u5FAE\u4FE1\u7528\u6237";return`<span class="ua-avatar-fallback">${h(t.charAt(0).toUpperCase())}</span>`}toggleMenu(){this.menuEl?this.closeMenu():this.openMenu()}openMenu(){let e=this.user;if(!e||this.menuEl)return;this.closeSettings();let t=document.createElement("div");t.className="ua-menu",t.style.zIndex=String(this.opts.zIndex+1);let n=e.nickname||(e.github?`@${e.github.login}`:"\u5FAE\u4FE1\u7528\u6237");if(t.innerHTML=`
      <div class="ua-menu-user"><span class="ua-menu-name">${h(n)}</span></div>
      <button type="button" class="ua-menu-item" data-action="settings">${he}<span>\u8BBE\u7F6E</span></button>
      <button type="button" class="ua-menu-item ua-menu-item-danger" data-action="logout">${pe}<span>\u9000\u51FA\u767B\u5F55</span></button>
    `,this.usePortal()){let s=this.root.querySelector(".ua-avatar")?.getBoundingClientRect();s&&s.width>0?(t.style.position="fixed",t.style.top=`${s.bottom+8}px`,t.style.left="auto",t.style.right=`${Math.max(window.innerWidth-s.right,0)}px`,t.style.minWidth="12rem",t.style.maxWidth="min(20rem, calc(100vw - 2rem))",t.dataset.uaPortal="true"):this.usePortalMenuInlineFallback(t)}let i=o=>{let s=o.composedPath();!s.includes(this.root)&&!(this.menuEl&&s.includes(this.menuEl))&&this.closeMenu()},r=o=>{o.key==="Escape"&&this.closeMenu()};document.addEventListener("mousedown",i),document.addEventListener("keydown",r),this.menuCleanup=()=>{document.removeEventListener("mousedown",i),document.removeEventListener("keydown",r)},t.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{this.openSettings()}),t.querySelector('[data-action="logout"]')?.addEventListener("click",()=>{this.logout()}),this.appendOverlay(t),this.menuEl=t}usePortalMenuInlineFallback(e){e.style.position="absolute",e.style.top="",e.style.left="",e.style.right="0",e.style.minWidth="12rem",e.style.maxWidth="",this.root.appendChild(e)}closeMenu(){this.menuEl?.remove(),this.menuEl=null,this.menuCleanup?.(),this.menuCleanup=null}openSettings(){let e=this.user;if(!e)return;this.closeMenu(),this.closeSettings(),this.nicknameDraft=e.nickname||"";let t=document.createElement("div");t.className="ua-mask",t.style.zIndex=String(this.opts.zIndex+10),t.innerHTML=this.buildSettingsHtml(e),this.settingsEl=t,this.appendOverlay(t),this.bindSettingsEvents(t);let n=r=>{r.composedPath()[0]===t&&this.closeSettings()},i=r=>{r.key==="Escape"&&this.closeSettings()};document.addEventListener("mousedown",n),document.addEventListener("keydown",i),this.settingsCleanup=()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",i)}}buildSettingsHtml(e){let t=e.headimgurl||e.github?.avatar,n=t?`<img class="ua-big-avatar" src="${x(t)}" alt="" referrerpolicy="no-referrer" />`:`<div class="ua-big-avatar ua-big-avatar-fallback">${h((e.nickname||e.github?.login||"?").charAt(0).toUpperCase())}</div>`,i=e.github?`
        <div class="ua-github-bound">
          <div class="ua-github-info">
            ${e.github.avatar?`<img class="ua-gh-avatar" src="${x(e.github.avatar)}" alt="@${x(e.github.login)}" referrerpolicy="no-referrer" />`:`<div class="ua-gh-avatar ua-gh-avatar-fallback">${h(e.github.login.charAt(0).toUpperCase())}</div>`}
            <div class="ua-gh-meta">
              <div class="ua-gh-login">@${h(e.github.login)} <span class="ua-badge">\u5DF2\u7ED1\u5B9A</span></div>
              <div class="ua-gh-date">\u7ED1\u5B9A\u4E8E ${h(new Date(e.github.boundAt).toLocaleDateString())}</div>
            </div>
          </div>
          <button type="button" class="ua-gh-unbind" data-action="unbind">\u89E3\u7ED1</button>
        </div>`:`
        <div class="ua-github-unbound">
          <p class="ua-gh-tip">\u7ED1\u5B9A GitHub \u8D26\u53F7\uFF0C\u7528\u4E8E\u8EAB\u4EFD\u8BC6\u522B\u4E0E\u540E\u7EED\u4E1A\u52A1\u5BF9\u63A5</p>
          <button type="button" class="ua-gh-bind" data-action="bind">${G}<span>\u7ED1\u5B9A GitHub</span></button>
        </div>`;return`
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="\u8BBE\u7F6E">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u8BBE\u7F6E</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${ge}</button>
        </div>
        <div class="ua-dialog-body">
          <!-- \u7528\u6237\u4FE1\u606F\u5361\u7247 -->
          <div class="ua-profile-card">
            <div class="ua-profile-header">
              ${n}
              <div class="ua-profile-info">
                <div class="ua-user-name">${h(e.nickname||(e.github?`@${e.github.login}`:"\u5FAE\u4FE1\u7528\u6237"))}</div>
                <div class="ua-user-sub">\u767B\u5F55\u4E8E ${h(new Date(e.authenticatedAt||Date.now()).toLocaleString())}</div>
              </div>
            </div>
          </div>

          <!-- \u5FAE\u4FE1 ID -->
          <div class="ua-field-group">
            <label class="ua-field-label">\u5FAE\u4FE1 ID\uFF08openid\uFF09</label>
            <div class="ua-mono-value">${h(e.openid||"-")}</div>
          </div>

          <!-- GitHub \u7ED1\u5B9A -->
          <div class="ua-field-group">
            <div class="ua-section-title">${G}<span>GitHub</span></div>
            ${i}
          </div>

          <!-- \u8BBE\u7F6E\u540D\u5B57 -->
          <div class="ua-field-group">
            <div class="ua-section-title">${ue}<span>\u8BBE\u7F6E\u540D\u5B57</span></div>
            <div class="ua-nickname-row">
              <input type="text" class="ua-input" maxlength="20" placeholder="2-20 \u4E2A\u5B57\u7B26" value="${x(this.nicknameDraft)}" />
              <button type="button" class="ua-save" data-action="save">\u4FDD\u5B58</button>
            </div>
            <div class="ua-msg" data-role="msg"></div>
          </div>
        </div>
      </div>
    `}bindSettingsEvents(e){let t=e.querySelector(".ua-input");t?.addEventListener("input",()=>{this.nicknameDraft=t.value,this.setMsg("")}),t?.addEventListener("keydown",n=>{n.key==="Enter"&&this.saveNickname()}),e.querySelector('[data-action="save"]')?.addEventListener("click",()=>{this.saveNickname()}),e.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.closeSettings()}),e.querySelector('[data-action="bind"]')?.addEventListener("click",()=>{this.startGithubBind()}),e.querySelector('[data-action="unbind"]')?.addEventListener("click",()=>{this.unbindGithub()})}closeSettings(){this.saveBtnTimer!==null&&(clearTimeout(this.saveBtnTimer),this.saveBtnTimer=null),this.settingsEl?.remove(),this.settingsEl=null,this.settingsCleanup?.(),this.settingsCleanup=null}setMsg(e){let t=this.settingsEl?.querySelector('[data-role="msg"]');t&&(t.textContent=e,t.className=e?"ua-msg ua-msg-err":"ua-msg")}updateSaveBtn(e=!1){let t=this.settingsEl?.querySelector('[data-action="save"]');t&&(this.saveBtnTimer!==null&&(clearTimeout(this.saveBtnTimer),this.saveBtnTimer=null),t.disabled=this.saving,t.textContent=this.saving?"\u4FDD\u5B58\u4E2D\u2026":e?"\u5DF2\u4FDD\u5B58 \u2713":"\u4FDD\u5B58",e&&(this.saveBtnTimer=window.setTimeout(()=>{t.textContent="\u4FDD\u5B58",this.saveBtnTimer=null},2e3)))}startGithubBind(){let e=E();if(!e){window.alert("\u8BF7\u5148\u5B8C\u6210\u5FAE\u4FE1\u767B\u5F55");return}let n=`${this.opts.apiBase||window.location.origin}/api/oauth/github/authorize?token=${encodeURIComponent(e)}`;window.open(n,"github-bind","width=720,height=720,menubar=no,toolbar=no,location=no,status=no"),!this.githubMsgListener&&(this.githubMsgListener=i=>{let r=i.data;!r||r.type!=="github-bound"||(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null,this.fetchUser().then(()=>{this.user?.github&&this.opts.onGithubBound?.(this.user)}))},window.addEventListener("message",this.githubMsgListener))}};var W="user-avatar",We="__USER_AVATAR_OPTIONS__";function De(){return window[We]}function me(a,e,t){let n=a.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}function Qe(a,e,t){let n=a.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}function Ye(a){if(typeof a!="string"||a.trim()==="")return;let e=a.trim(),t=e.startsWith("#")?e.slice(1):e,n=document.getElementById(t);if(n)return n;try{return document.querySelector(e)??void 0}catch{return}}var fe=[["theme-btn-bg","btnBg"],["theme-size","size"],["theme-accent","accent"],["theme-btn-border","btnBorder"],["theme-radius","radius"],["theme-bg","bg"],["theme-text","text"],["theme-sub-text","subText"],["theme-overlay","overlay"],["theme-danger","danger"],["theme-success","success"]],L=class extends HTMLElement{constructor(){super();this.widget=null;this.pollTimer=null;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=O,this.shadow.appendChild(t)}static get observedAttributes(){return["api-base","fixed","offset","size","z-index","portal","portal-el",...fe.map(([t])=>t)]}static check(){return g.check()}connectedCallback(){this.mountWidget(),g.check()!==null&&this.startPolling()}disconnectedCallback(){this.stopPolling(),this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&(this.stopPolling(),this.mountWidget(),g.check()!==null&&this.startPolling())}startPolling(){this.pollTimer||(this.pollTimer=setInterval(()=>{g.check()===null&&(this.stopPolling(),this.mountWidget())},400))}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}mountWidget(){this.widget?.unmount();let t=g.check();t&&console.warn(`[${W}] ${t}`),this.widget=new g(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let t=De()??{},n=this.props??{},i=s=>this.getAttribute(s),r={};for(let[s,l]of fe){let c=i(s);c!==null&&(r[l]=c)}let o={apiBase:i("api-base")??void 0,fixed:i("fixed")!==null?me(this,"fixed",!0):void 0,offset:i("offset")??void 0,size:i("size")??void 0,zIndex:i("z-index")!==null?Qe(this,"z-index",12e3):void 0,portal:i("portal")!==null?me(this,"portal",!0):void 0,portalEl:Ye(i("portal-el")??void 0),theme:Object.keys(r).length?r:void 0};return{...D(t),...D(o),...D(n),theme:{...t.theme??{},...o.theme??{},...n.theme??{}}}}};function D(a){let e={};for(let[t,n]of Object.entries(a))n!==void 0&&(e[t]=n);return e}customElements.get(W)||customElements.define(W,L);var q=`/* ============================================================
  site-navbar \u7EC4\u4EF6\u6837\u5F0F
  \u5168\u90E8\u4E3B\u9898\u901A\u8FC7 --sn-* CSS \u53D8\u91CF\u9A71\u52A8\uFF0C\u76F4\u63A5\u8986\u76D6\u53D8\u91CF\u5373\u53EF\u6362\u80A4\u3002

  \u6DF1\u6D45\u8272\u81EA\u9002\u5E94\uFF1A
  - \u9ED8\u8BA4\u503C\u7528 light-dark(\u6D45\u8272, \u6DF1\u8272)\uFF0C\u989C\u8272\u968F\u5BBF\u4E3B\u9875\u9762\u58F0\u660E\u7684 color-scheme \u5207\u6362\uFF1A
    \u5BBF\u4E3B\u58F0\u660E color-scheme: light / dark \u65F6\u7EC4\u4EF6\u5BF9\u5E94\u4F7F\u7528\u6D45\u8272 / \u6DF1\u8272\u4E3B\u9898\uFF1B
    \u5BBF\u4E3B\u672A\u58F0\u660E\u65F6\u7EE7\u627F UA \u9ED8\u8BA4\uFF0C\u8DDF\u968F\u7CFB\u7EDF prefers-color-scheme\uFF1B
  - \u4E0D\u652F\u6301 light-dark() \u7684\u8001\u6D4F\u89C8\u5668\uFF0C\u7531\u4E0B\u65B9 @media (prefers-color-scheme: dark)
    \u515C\u5E95\u4E3A\u7EAF\u6DF1\u8272\u503C\uFF1B
  - \u7528\u6237\u663E\u5F0F\u4F20\u5165 theme / \u8986\u76D6 --sn-* \u53D8\u91CF\u65F6\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u4E0D\u968F\u7CFB\u7EDF\u53D8\u5316\u3002
  ============================================================ */

/* \u53D8\u91CF\u9ED8\u8BA4\u503C\u540C\u65F6\u4F5C\u7528\u4E8E .sn-root\uFF08shadow/\u666E\u901A DOM\uFF09\u4E0E .sn-mobile\uFF08portal \u5230
   body\uFF0C\u8131\u79BB .sn-root \u540E\u65E0\u6CD5\u7EE7\u627F\u5176\u53D8\u91CF\uFF0C\u987B\u81EA\u8EAB\u6301\u6709\u9ED8\u8BA4\u503C\uFF09 */
.sn-root,
.sn-mobile {
  /* ===== \u4E3B\u9898\u53D8\u91CF\uFF08\u9ED8\u8BA4\u503C\uFF0C\u53EF\u5728\u4EFB\u610F\u7236\u7EA7\u8986\u76D6\uFF09 ===== */
  --sn-primary: light-dark(#1f2328, #e6edf3); /* \u54C1\u724C / hover \u6587\u5B57 */
  --sn-secondary: light-dark(#656d76, #8b949e); /* \u9ED8\u8BA4\u94FE\u63A5\u6587\u5B57 */
  --sn-accent: light-dark(#1a6dff, #4d9fff); /* \u5F53\u524D\u7AD9\u9AD8\u4EAE */
  --sn-hover-bg: light-dark(rgba(31, 35, 40, 0.06), rgba(255, 255, 255, 0.08)); /* hover \u80CC\u666F\uFF08\u94FE\u63A5 hover \u5DF2\u6539\u4E3A\u7EAF\u6587\u5B57\u53D8\u8272\uFF0C\u73B0\u4EC5 hamburger \u6309\u94AE\u4F7F\u7528\uFF09 */
  --sn-bg: light-dark(rgba(255, 255, 255, 0.55), rgba(28, 31, 36, 0.55)); /* \u4FDD\u7559\u53D8\u91CF\uFF1A\u5F53\u524D\u7AD9\u9AD8\u4EAE\u5DF2\u6539\u4E3A\u7EAF\u6587\u5B57\u53D8\u8272\uFF0C\u4E0D\u518D\u4F7F\u7528\u80CC\u666F */
  --sn-border: light-dark(rgba(27, 31, 36, 0.14), rgba(255, 255, 255, 0.14)); /* \u8FB9\u6846 / \u5E95\u90E8\u5206\u9694\u7EBF */
  --sn-radius: 12px; /* \u94FE\u63A5\u5706\u89D2 */
  --sn-font-size: 0.875rem; /* \u94FE\u63A5\u5B57\u53F7\uFF0814px\uFF09 */
  --sn-gap: 0.125rem; /* \u94FE\u63A5\u95F4\u8DDD */
  --sn-pad-x: 1rem; /* \u5BFC\u822A\u5185\u5BB9\u5DE6\u53F3\u5185\u8FB9\u8DDD\uFF08logo / \u5934\u50CF\u4E0D\u8D34\u89C6\u53E3\u8FB9\u7F18\uFF09 */
  --sn-avatar-size: 2.2rem; /* \u5934\u50CF\u5BB9\u5668\u5C3A\u5BF8\uFF0C\u7EA6\u675F user-avatar \u4E0D\u8D85\u51FA\u5BFC\u822A\u680F */
  --sn-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
}

/* \u4E0D\u652F\u6301 light-dark() \u7684\u6D4F\u89C8\u5668\uFF1A\u6DF1\u8272\u7CFB\u7EDF\u4E0B\u7528\u7EAF\u6DF1\u8272\u503C\u515C\u5E95 */
@media (prefers-color-scheme: dark) {
  .sn-root,
  .sn-mobile {
    --sn-primary: #e6edf3;
    --sn-secondary: #8b949e;
    --sn-accent: #4d9fff;
    --sn-hover-bg: rgba(255, 255, 255, 0.08);
    --sn-bg: rgba(28, 31, 36, 0.55);
    --sn-border: rgba(255, 255, 255, 0.14);
  }
}

/* Web Component host\uFF1A\u81EA\u5B9A\u4E49\u5143\u7D20\u9ED8\u8BA4 display: inline\uFF08\u7C7B\u4F3C span\uFF09\uFF0C
   \u4F1A\u88AB\u7236\u7EA7\u884C\u6846 / baseline / line-height \u5F71\u54CD\uFF0C\u5728\u4E0D\u540C\u5BBF\u4E3B\u5E03\u5C40\u91CC\u53EF\u80FD
   \u4EA7\u751F\u5FAE\u5999\u5782\u76F4\u504F\u79FB\u3002\u8FD9\u91CC\u5F3A\u5236 block\uFF0C\u8BA9 host \u9AD8\u5EA6=\u5185\u5BB9\u9AD8\u5EA6\u3001\u5E03\u5C40\u66F4\u53EF\u63A7\u3002 */
:host {
  display: block;
}

.sn-root {
  position: relative;
  font-family: var(--sn-font-family);
  /* \u4E0D\u786C\u7F16\u7801 color-scheme\uFF1A\u7EE7\u627F\u5BBF\u4E3B\u9875\u9762\u58F0\u660E\u7684\u914D\u8272\u65B9\u6848\u3002
     \u5BBF\u4E3B\u58F0\u660E color-scheme: light / dark \u2192 \u7EC4\u4EF6\u5BF9\u5E94\u6D45\u8272 / \u6DF1\u8272\u4E3B\u9898\uFF1B
     \u5BBF\u4E3B\u672A\u58F0\u660E \u2192 \u7EE7\u627F UA \u9ED8\u8BA4\uFF0C\u8DDF\u968F\u7CFB\u7EDF prefers-color-scheme\u3002 */
  line-height: 1.5;
}

/* \u5E95\u90E8\u5206\u9694\u7EBF\uFF1A\u4F2A\u5143\u7D20\u6491\u6EE1\u6574\u4E2A\u89C6\u53E3\u5BBD\u5EA6\uFF08\u7EC4\u4EF6\u53EF\u80FD\u5D4C\u5728\u5E26\u5DE6\u53F3\u5185\u8FB9\u8DDD\u7684
   \u5BB9\u5668\u91CC\uFF0C\u76F4\u63A5\u7528 border-bottom \u4F1A\u88AB\u5BB9\u5668\u5BBD\u5EA6\u9650\u5236\u3001\u5230\u4E0D\u4E86\u4E24\u8FB9\uFF09 */
.sn-root::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: calc(50% - 50vw);
  width: 100vw;
  height: 1px;
  background: var(--sn-border);
  pointer-events: none;
}

.sn-root * {
  box-sizing: border-box;
}

.sn-root a {
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

/* ==================== \u5BFC\u822A\u680F ==================== */

.sn-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* \u5DE6\u53F3\u7559\u767D\uFF1Alogo / \u5934\u50CF\u4E0D\u8D34\u89C6\u53E3\u8FB9\u7F18\uFF1B\u5E95\u90E8\u5206\u9694\u7EBF\u662F ::after \u4F2A\u5143\u7D20\uFF0C
     \u4E0D\u53D7\u6B64 padding \u5F71\u54CD\uFF0C\u4F9D\u7136\u6491\u6EE1\u6574\u9875 */
  padding: 0 var(--sn-pad-x);
}

/* \u54C1\u724C\u533A */
.sn-brand {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  color: var(--sn-primary);
  white-space: nowrap;
  transition: color 0.3s ease;
}

.sn-brand-icon {
  display: inline-flex;
  align-items: center;
  font-size: 1.1em;
  line-height: 1;
}

/* \u54C1\u724C\u56FE\u7247 logo\uFF08\u5706\u89D2\u65B9\u5F62\u3001\u56FA\u5B9A\u5C3A\u5BF8\u3001\u9632\u6B62\u62C9\u53D8\u5F62\uFF09\uFF1A
 * \u7528\u5706\u89D2\u65B9\u5F62\u800C\u975E\u5706\u5F62\uFF0C\u4E0E\u53F3\u4FA7\u5706\u5F62\u5934\u50CF\u5F62\u6210\u300C\u65B9 vs \u5706\u300D\u7684\u5BF9\u6BD4\uFF0C
 * \u907F\u514D\u5DE6\u53F3\u4E24\u4E2A\u5706\u5BF9\u79F0\u91CD\u590D */
.sn-brand-img {
  width: 1.8em;
  height: 1.8em;
  border-radius: 25%;
  object-fit: cover;
  display: block;
}

.sn-brand:hover {
  color: var(--sn-accent);
}

/* \u94FE\u63A5\u7EC4\uFF1A\u7528\u7EDD\u5BF9\u5B9A\u4F4D\u5C45\u4E2D\u4E8E\u6574\u4E2A\u5BFC\u822A\u680F\uFF08\u89C6\u53E3\u4E2D\u5FC3\uFF09\uFF0C
   \u4E0D\u518D\u53D7\u54C1\u724C / \u5934\u50CF\u5BBD\u5EA6\u4E0D\u5BF9\u79F0\u5F71\u54CD\uFF0C\u4E0E\u4E0B\u65B9\u9875\u9762\u5185\u5BB9\uFF08\u5982\u516C\u544A\uFF09\u4E2D\u5FC3\u7EBF\u5BF9\u9F50 */
.sn-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sn-gap);
}

.sn-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--sn-radius);
  font-size: var(--sn-font-size);
  font-weight: 500;
  color: var(--sn-secondary);
  white-space: nowrap;
  transition: color 0.3s ease;
}

.sn-link-icon {
  font-size: 1.1em;
  line-height: 1;
}

/* hover \u4E0E\u5F53\u524D\u7AD9\u9AD8\u4EAE\u4E00\u81F4\uFF1A\u53EA\u505A\u6587\u5B57\u53D8\u8272\uFF0C\u4E0D\u52A0\u80CC\u666F */
.sn-link:hover {
  color: var(--sn-primary);
}

/* \u5F53\u524D\u7AD9\u9AD8\u4EAE\uFF1A\u53EA\u505A\u6587\u5B57\u53D8\u8272\uFF0C\u4E0D\u52A0\u80CC\u666F / \u63CF\u8FB9\u5708 */
.sn-link.sn-active {
  color: var(--sn-accent);
}

/* \u5934\u50CF\u533A\uFF1A\u56FA\u5B9A\u5C3A\u5BF8\u5BB9\u5668\uFF0C\u7EA6\u675F user-avatar \u7684\u5706\u5F62\u5934\u50CF\u4E0E\u5BFC\u822A\u680F\u534F\u8C03 */
.sn-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--sn-avatar-size);
  height: var(--sn-avatar-size);
  max-width: var(--sn-avatar-size);
  max-height: var(--sn-avatar-size);
  margin-left: auto;
}

/* ==================== \u79FB\u52A8\u7AEF hamburger ==================== */

.sn-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius);
  background: transparent;
  color: var(--sn-secondary);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.sn-toggle:hover {
  background: var(--sn-hover-bg);
  color: var(--sn-primary);
}

.sn-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* ==================== \u79FB\u52A8\u7AEF\u4E0B\u62C9\u83DC\u5355 ====================
   Portal \u6A21\u5F0F\u4E0B\u6302\u5230 body\uFF08\u8131\u79BB shadow DOM\uFF09\uFF0C\u7531 JS \u5199\u5165
   position: fixed + top/left/width\uFF0C\u7D27\u8D34\u5BFC\u822A\u680F\u4E0B\u65B9\u3002
   CSS \u53EA\u8D1F\u8D23\u5916\u89C2\uFF1A\u73BB\u7483\u80CC\u666F\u3001\u9634\u5F71\u3001\u5C42\u53E0\u4E0A\u4E0B\u6587\u7B49\u3002
   \u94FE\u63A5\u989C\u8272/\u53BB\u4E0B\u5212\u7EBF\u5FC5\u987B\u663E\u5F0F\u8BBE\u7F6E\uFF0C\u56E0\u4E3A .sn-root a \u9009\u62E9\u5668
   \u53EA\u5BF9 shadow DOM \u5185\u7684 <a> \u751F\u6548\uFF0Cportal \u51FA\u53BB\u540E\u4E0D\u751F\u6548\u3002
*/

.sn-mobile {
  /* \u5FC5\u987B\u59CB\u7EC8 fixed \u8131\u79BB\u6587\u6863\u6D41\uFF1A
   * position \u4E0D\u80FD\u4F9D\u8D56 JS \u6253\u5F00\u65F6\u624D\u8BBE\u7F6E\uFF08\u5426\u5219\u5173\u95ED\u65F6\u56DE\u5230 static\uFF0C
   * \u4F1A\u4EE5 display:flex \u5728 body \u672B\u5C3E\u6491\u51FA\u7A7A\u767D\uFF0C\u628A\u6B63\u5E38\u9875\u9762\u9876\u4E0B\u53BB\uFF09\u3002
   * fixed \u8BA9\u5B83\u5728\u4EFB\u4F55\u65F6\u523B\u90FD\u4E0D\u53C2\u4E0E\u5E03\u5C40\uFF1Btop/left/right \u7531 JS \u6253\u5F00\u65F6\u5199\u5165\u3002 */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.5rem;
  width: auto;
  /* portal \u5230 body \u540E\u7EE7\u627F body \u7684 color-scheme\uFF08\u5BBF\u4E3B\u58F0\u660E light/dark
     \u6216 UA \u9ED8\u8BA4\u8DDF\u968F\u7CFB\u7EDF\uFF09\uFF0Clight-dark() \u53D8\u91CF\u968F\u4E4B\u5207\u6362 */
  background: light-dark(rgba(255, 255, 255, 0.94), rgba(24, 26, 32, 0.94));
  border: 1px solid var(--sn-border);
  border-radius: calc(var(--sn-radius) + 4px);
  /* \u5F3A\u5316\u73BB\u7483\u6548\u679C\uFF1A
   * 1. \u9AD8\u4E0D\u900F\u660E\u80CC\u666F\uFF080.94\uFF09\u907F\u514D\u4E0E\u6D45\u8272\u9875\u9762\u80CC\u666F\u878D\u5408"\u9690\u5F62"
   * 2. saturate(180%) \u63D0\u5347\u80CC\u666F\u8272\u5F69\u9971\u548C\u5EA6\uFF0C\u73BB\u7483\u8D28\u611F\u66F4\u660E\u663E
   * 3. isolation: isolate \u521B\u5EFA\u72EC\u7ACB\u5806\u53E0\u4E0A\u4E0B\u6587\uFF0C\u9632\u6B62 backdrop-filter \u5728
   *    transform / contain \u7956\u5148\u4E0B\u6E32\u67D3\u8FB9\u754C\u5F02\u5E38
   * 4. translateZ(0) \u89E6\u53D1\u72EC\u7ACB GPU \u5408\u6210\u5C42 */
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  box-shadow:
    0 16px 48px rgba(15, 23, 42, 0.18),
    0 4px 12px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 light-dark(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.08));
  isolation: isolate;
  transform: translateY(-8px) translateZ(0);
  z-index: 11000;
  /* \u9ED8\u8BA4\u72B6\u6001\uFF1A\u900F\u660E + \u9690\u85CF\uFF0C\u4E3A\u6253\u5F00\u52A8\u753B\u51C6\u5907 */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform-origin: top right;
  transition:
    opacity 0.18s ease,
    transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0.18s ease;
}

.sn-mobile.sn-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) translateZ(0);
  /* \u6CE8\u610F\uFF1A\u5185\u8054 top/left/width \u7531 JS \u5728 updateMobilePosition \u4E2D\u5199\u5165\uFF0C
     \u6B64\u5904 transform \u4EC5\u505A\u4F4D\u79FB\uFF0C\u4E0D\u8986\u76D6 position */
  pointer-events: auto;
}

/* portal \u51FA\u53BB\u7684\u94FE\u63A5\u5FC5\u987B\u72EC\u7ACB\u8BBE\u7F6E\u989C\u8272\u548C\u53BB\u4E0B\u5212\u7EBF\uFF0C
   \u56E0\u4E3A .sn-root a \u9009\u62E9\u5668\u53EA\u5BF9 shadow DOM \u5185\u7684 <a> \u751F\u6548 */
.sn-mobile .sn-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: calc(var(--sn-radius) - 2px);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--sn-secondary);
  text-decoration: none;
  white-space: nowrap;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.sn-mobile .sn-link-icon {
  font-size: 1.05em;
  line-height: 1;
  width: 1.25em;
  text-align: center;
  flex-shrink: 0;
}

/* hover \u4E0E\u5F53\u524D\u7AD9\u9AD8\u4EAE\u4E00\u81F4\uFF1A\u53EA\u505A\u6587\u5B57\u53D8\u8272\uFF0C\u4E0D\u52A0\u80CC\u666F */
.sn-mobile .sn-link:hover {
  color: var(--sn-primary);
}

/* \u6309\u538B\u53CD\u9988\u53EA\u4FDD\u7559\u8F7B\u5FAE\u7F29\u653E\uFF0C\u4E0D\u52A0\u80CC\u666F */
.sn-mobile .sn-link:active {
  transform: scale(0.98);
}

/* \u5F53\u524D\u7AD9\u9AD8\u4EAE\uFF1A\u4E0E\u684C\u9762\u7AEF\u4E00\u81F4\uFF0C\u53EA\u505A\u6587\u5B57\u53D8\u8272 */
.sn-mobile .sn-link.sn-active {
  color: var(--sn-accent);
}

/* ==================== \u54CD\u5E94\u5F0F ==================== */

@media (max-width: 768px) {
  .sn-links {
    display: none;
  }
  .sn-toggle {
    display: inline-flex;
  }
}
`;function Ve(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Q(a){return Ve(a)}function be(a){return a.replace(/^www\./i,"")}function Y(a){try{let e=be(new URL(a,window.location.href).hostname),t=be(window.location.hostname);return!e||!t?null:e===t?"exact":t.endsWith("."+e)?"sub":null}catch{return null}}function St(a){return Y(a)!==null}var K='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>',ve='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';var Je=[{href:"https://shenzjd.com",label:"AI\u60C5\u62A5\u5C40",icon:"\u{1F3E0}"},{href:"https://panhub.shenzjd.com",label:"\u7F51\u76D8\u641C\u7D22",icon:"\u{1F50D}"},{href:"https://parse.shenzjd.com",label:"\u89C6\u9891\u89E3\u6790",icon:"\u{1F3AC}"},{href:"https://newshub.shenzjd.com",label:"\u70ED\u70B9\u805A\u5408",icon:"\u{1F4F0}"},{href:"https://navhub.shenzjd.com",label:"\u5BFC\u822A\u68EE\u6797",icon:"\u{1F9ED}"},{href:"https://bing.shenzjd.com",label:"\u5FC5\u5E94\u58C1\u7EB8",icon:"\u{1F5BC}\uFE0F"}],Xe={icon:'<img class="sn-brand-img" src="https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260701-180125-c1ub.webp" alt="\u795E\u65CF\u4E5D\u5E1D" />',text:"\u795E\u65CF\u4E5D\u5E1D"},xe="2.2rem",R="user-avatar",ye="https://unpkg.com/@wu529778790/user-avatar@latest/dist/user-avatar.wc.js",Ze=15e3,B=null;function et(a){return customElements.get(R)?Promise.resolve(!0):(B||(B=new Promise(e=>{let t=document.createElement("script");t.src=a||ye,t.async=!0,t.onload=()=>{let n=customElements.whenDefined(R).then(()=>!0,()=>!1),i=new Promise(r=>setTimeout(()=>r(!1),Ze));Promise.race([n,i]).then(e)},t.onerror=()=>e(!1),(document.head||document.documentElement).appendChild(t)})),B.then(e=>(e||(B=null),e)))}var tt={primary:"light-dark(#1f2328, #e6edf3)",secondary:"light-dark(#656d76, #8b949e)",accent:"light-dark(#1a6dff, #4d9fff)",hoverBg:"light-dark(rgba(31, 35, 40, 0.06), rgba(255, 255, 255, 0.08))",bg:"light-dark(rgba(255, 255, 255, 0.55), rgba(28, 31, 36, 0.55))",border:"light-dark(rgba(27, 31, 36, 0.14), rgba(255, 255, 255, 0.14))",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'},N=class{constructor(e={},t=document.body){this.avatarEl=null;this.toggleEl=null;this.mobileEl=null;this.mobileOpen=!1;this.onDocClick=e=>{if(!this.mobileOpen)return;let t=e.target;!this.root.contains(t)&&!(this.mobileEl&&this.mobileEl.contains(t))&&this.setMobileOpen(!1)};this.onKeyDown=e=>{e.key==="Escape"&&this.mobileOpen&&this.setMobileOpen(!1)};this.onResize=()=>{this.mobileOpen&&window.innerWidth>this.opts.breakpoint&&this.setMobileOpen(!1)};this.onScroll=()=>{this.mobileOpen&&this.updateMobilePosition()};this.container=t,this.opts=this.resolve(e),this.root=document.createElement("div"),this.root.className="sn-root"}static check(){let e=customElements.get(R);return e&&typeof e.check=="function"?e.check():window.WxAuth?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(e){return this.root.isConnected?this:(e?e.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),this)}unmount(){this.destroy()}destroy(){this.avatarEl?.remove(),this.avatarEl=null,this.mobileEl&&this.mobileEl.parentElement&&this.mobileEl.parentElement.removeChild(this.mobileEl),this.mobileEl=null,document.removeEventListener("click",this.onDocClick),document.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),window.removeEventListener("scroll",this.onScroll,!0),this.root.remove()}resolve(e){return{links:e.links??Je,brand:e.brand??Xe,avatar:e.avatar??!0,avatarOptions:{size:xe,...e.avatarOptions??{},theme:{size:xe,...e.avatarOptions?.theme??{}},fixed:!1},theme:{...tt,...e.theme??{}},breakpoint:e.breakpoint??768,portalEl:e.portalEl??document.body,onNavigate:e.onNavigate}}applyTheme(){let e=this.opts.theme,t=this.root.style;t.setProperty("--sn-primary",e.primary),t.setProperty("--sn-secondary",e.secondary),t.setProperty("--sn-accent",e.accent),t.setProperty("--sn-hover-bg",e.hoverBg),t.setProperty("--sn-bg",e.bg),t.setProperty("--sn-border",e.border),t.setProperty("--sn-radius",e.radius),t.setProperty("--sn-font-family",e.fontFamily)}render(){this.root.innerHTML="";let e=this.computeActiveHref(),t=document.createElement("div");t.className="sn-bar",this.opts.brand&&t.appendChild(this.renderBrand(this.opts.brand));let n=document.createElement("nav");n.className="sn-links";for(let s of this.opts.links)n.appendChild(this.renderLink(s,s.href===e));if(t.appendChild(n),this.opts.avatar){let s=document.createElement("div");s.className="sn-avatar",t.appendChild(s);let l=document.createElement(R),{src:c,...d}=this.opts.avatarOptions;l.props=d,s.appendChild(l),this.avatarEl=l,et(c).then(u=>{u||console.warn(`[site-navbar] <user-avatar> \u52A0\u8F7D\u5931\u8D25\uFF0C\u5934\u50CF\u672A\u6E32\u67D3\uFF1A${c||ye}`)})}let i=document.createElement("button");i.className="sn-toggle",i.type="button",i.setAttribute("aria-label","\u83DC\u5355"),i.setAttribute("aria-expanded","false"),i.innerHTML=K,i.addEventListener("click",s=>{s.stopPropagation(),this.setMobileOpen(!this.mobileOpen)}),t.appendChild(i),this.toggleEl=i,this.root.appendChild(t);let r=document.createElement("div");r.className="sn-mobile",r.setAttribute("role","menu"),r.setAttribute("aria-hidden","true");for(let s of this.opts.links)r.appendChild(this.renderLink(s,s.href===e));let o=document.createElement("style");o.setAttribute("data-sn-portal-styles",""),o.textContent=q,r.appendChild(o),this.opts.portalEl.appendChild(r),this.mobileEl=r,document.addEventListener("click",this.onDocClick),document.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),window.addEventListener("scroll",this.onScroll,!0)}renderBrand(e){let t=document.createElement("a");t.className="sn-brand";let n=e.href??window.location.origin;t.href=Q(n);try{new URL(n,window.location.href).origin===window.location.origin?t.target="_self":(t.target="_blank",t.rel="noopener noreferrer")}catch{t.target="_blank",t.rel="noopener noreferrer"}if(e.icon){let i=document.createElement("span");i.className="sn-brand-icon",i.innerHTML=e.icon,t.appendChild(i)}return e.text&&t.appendChild(document.createTextNode(e.text)),t}renderLink(e,t){let n=document.createElement("a");if(n.className="sn-link",n.href=Q(e.href),n.target="_blank",n.rel="noopener noreferrer",t&&n.classList.add("sn-active"),n.setAttribute("aria-current",t?"page":"false"),e.icon){let i=document.createElement("span");i.className="sn-link-icon",i.innerHTML=e.icon,n.appendChild(i)}return n.appendChild(document.createTextNode(e.label)),n.addEventListener("click",i=>this.opts.onNavigate?.(e,i)),n}computeActiveHref(){for(let e of this.opts.links)if(e.active===!0)return e.href;for(let e of this.opts.links)if(e.active!==!1&&Y(e.href)==="exact")return e.href;return null}setMobileOpen(e){this.mobileOpen=e,this.mobileEl&&(this.mobileEl.classList.toggle("sn-open",e),this.mobileEl.setAttribute("aria-hidden",String(!e)),e&&this.updateMobilePosition()),this.toggleEl&&(this.toggleEl.setAttribute("aria-expanded",String(e)),this.toggleEl.innerHTML=e?ve:K)}updateMobilePosition(){if(!this.mobileEl)return;let e=this.root.getBoundingClientRect(),t=this.mobileEl.style;t.position="fixed",t.top=`${Math.round(e.bottom+8)}px`,t.left="16px",t.right="16px",t.width="auto"}};var V="site-navbar",nt="__SITE_NAVBAR_OPTIONS__";function it(){return window[nt]}function at(a,e,t){let n=a.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}var we=[["theme-primary","primary"],["theme-secondary","secondary"],["theme-accent","accent"],["theme-hover-bg","hoverBg"],["theme-bg","bg"],["theme-border","border"],["theme-radius","radius"],["theme-font-family","fontFamily"]],T=class extends HTMLElement{constructor(){super();this.widget=null;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=q,this.shadow.appendChild(t)}static get observedAttributes(){return["brand","brand-icon","avatar","avatar-src","links",...we.map(([t])=>t)]}connectedCallback(){this.mountWidget()}disconnectedCallback(){this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.mountWidget()}mountWidget(){this.widget?.unmount(),this.widget=new N(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let t=it()??{},n=p=>this.getAttribute(p),i={};for(let[p,b]of we){let J=n(p);J!==null&&(i[b]=J)}let r=t.brand,o=n("brand");o!==null&&(r={...t.brand??{},text:o});let s=n("brand-icon");s!==null&&(r={...r??{},icon:s});let l=t.links,c=n("links");if(c!==null)try{let p=JSON.parse(c);Array.isArray(p)&&(l=p)}catch{}let d=t.avatarOptions,u=n("avatar-src");return u!==null&&(d={...d??{},src:u}),{...t,links:l,brand:r,avatar:at(this,"avatar",t.avatar??!0),avatarOptions:d,theme:{...t.theme??{},...i},onNavigate:t.onNavigate}}};function rt(){let a="data-sn-placeholder";if(document.getElementById(a))return;let e=document.createElement("style");e.id=a,e.textContent=`${V}:not(:defined) {
  display: block;
  height: var(--sn-navbar-height, 44px);
  box-sizing: border-box;
}`,(document.head||document.documentElement).appendChild(e)}customElements.get(V)||(rt(),customElements.define(V,T));})();

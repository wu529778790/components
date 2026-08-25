(()=>{var B={wechat:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",title:"\u516C\u4F17\u53F7",desc:""},donate:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",title:"\u8D5E\u8D4F\u7801",desc:""}},_={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},I=[{href:"https://t.me/shenzjd_com",icon:"tg",title:"Telegram"},{href:"https://github.com/wu529778790",icon:"github",title:"GitHub"},{href:"https://x.com/shenzujiudi",icon:"x",title:"X"}],M={tg:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.2c-1.2.5-1.1 2.2.1 2.6l4.3 1.4 1.6 5.2c.3 1.1 1.7 1.4 2.5.6l2.4-2.4 4.5 3.3c1 .7 2.4.2 2.7-1L21.9 4.6zM8.6 13.5l8.7-5.4c.1-.1.3.1.2.2l-6.8 6.7c-.2.2-.3.4-.4.7l-.5 2.6c0 .1-.2.1-.2 0l-.9-4.7c-.1-.1 0-.2 0-.1z"/></svg>',github:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.1 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1.1 16.1h1.7L8.1 4.7H6.3L16.4 19.1z"/></svg>'};function P(n,e){return n?M[n]?M[n]:/^[a-z][a-z0-9+.-]*:\/\//i.test(n)||n.startsWith("data:")?`<img class="fq-link-img" src="${u(n)}" alt="" loading="lazy" />`:n.includes("<")?n:h(n.slice(0,1)):h((e||"\u2022").slice(0,1))}var E="floating-qr:closed",$="(max-width: 767px)";function G(){return typeof window>"u"?!1:window.matchMedia?.($)?.matches??!1}function N(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(E)==="1"}catch{return!1}}function j(){if(!(typeof localStorage>"u"))try{localStorage.setItem(E,"1")}catch{}}var b=class n{constructor(e={},t=document.body){this.el=null;this.closeBtn=null;this.handleClose=()=>{this.close()};this.opts=this.resolve(e),!(this.opts.hideOnMobile&&G())&&(this.opts.closePersistence&&N()||this.render(t))}isMounted(){return this.el!==null&&this.el.isConnected}close(){this.opts.closePersistence&&j(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.remove(),this.el=null}update(e){this.destroy();let t=new n(e);this.opts.theme=t.opts.theme,this.opts.position=t.opts.position,this.opts.closePersistence=t.opts.closePersistence,this.opts.hideOnMobile=t.opts.hideOnMobile,this.opts.zIndex=t.opts.zIndex,this.opts.wechat=t.opts.wechat,this.opts.donate=t.opts.donate,this.opts.links=t.opts.links,this.el=t.el,this.closeBtn=t.closeBtn}resolve(e){let t=(o,r)=>{let l=B[r];return{src:o?.src??l.src,title:o?.title??l.title,desc:o?.desc??l.desc}};return{wechat:t(e.wechat,"wechat"),donate:t(e.donate,"donate"),position:e.position??"right-center",closePersistence:e.closePersistence??!1,hideOnMobile:e.hideOnMobile??!0,zIndex:e.zIndex??9999,theme:{..._,...e.theme??{}},links:e.links??I}}render(e=document.body){let{wechat:t,donate:o,position:r,zIndex:l,theme:i,links:c}=this.opts,s=document.createElement("div");s.className="fq-widget",s.dataset.position=r,s.style.zIndex=String(l),s.style.setProperty("--fq-bg",i.bg),s.style.setProperty("--fq-accent",i.accent),s.style.setProperty("--fq-radius",i.radius),s.style.setProperty("--fq-border",i.border),s.innerHTML=`
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${U}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${u(t.src)}" alt="${u(t.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${h(t.title)}</p>
        ${t.desc?`<p class="fq-desc">${h(t.desc)}</p>`:""}
      </div>
      <div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${u(o.src)}" alt="${u(o.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${h(o.title)}</p>
        ${o.desc?`<p class="fq-desc">${h(o.desc)}</p>`:""}
      </div>
      ${c.length?`<div class="fq-links">${c.map(a=>`
        <a class="fq-link" href="${u(a.href)}" title="${u(a.title??"")}" target="_blank" rel="noopener noreferrer">${P(a.icon,a.title)}</a>`).join("")}
        </div>`:""}
    `,this.closeBtn=s.querySelector(".fq-close"),this.closeBtn?.addEventListener("click",this.handleClose),e.appendChild(s),this.el=s}},U='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function h(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function u(n){return h(n)}var F=`.fq-widget {
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
  top: 6px;
  right: 6px;
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
  transition: background 0.15s ease, color 0.15s ease;
}

.fq-close:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
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
`;var v="floating-qr",D="__FLOATING_QR_OPTIONS__",O="__floatingQrAutoInjected__",K="(max-width: 767px)";function V(){return window[D]}function L(n,e,t){let o=n.getAttribute(e);return o===null?t:o===""||o==="true"||o==="1"}function X(n,e,t){let o=n.getAttribute(e);if(o===null||o==="")return t;let r=Number(o);return Number.isFinite(r)?r:t}var T=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]];function W(n){if(n===null)return null;let e=n.trim().toLowerCase();return e===""||e==="none"||e==="off"?[]:n.split(",").map(t=>t.trim()).filter(Boolean).map(t=>{let o=/github\.com/i.test(t)?"github":/(^|\.)t\.me/i.test(t)?"tg":/(^|\.)x\.com$|twitter\.com/i.test(t)?"x":void 0;return{href:t,icon:o,title:o}})}var m=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=F,this.shadow.appendChild(t)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","wechat-src","wechat-title","wechat-desc","donate-src","donate-title","donate-desc","link-hrefs",...T.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}render(){if(!this.isConnected)return;let t=this.buildOptions();t.hideOnMobile&&window.matchMedia?.(K)?.matches||(this.widget?.destroy(),this.widget=new b(t,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=V()??{},o=s=>this.getAttribute(s),r={};for(let[s,a]of T){let d=o(s);d!==null&&(r[a]=d)}let l=(s,a)=>{let d=o(`${s}-src`),y=o(`${s}-title`),k=o(`${s}-desc`);if(d===null&&y===null&&k===null)return a;let p={};return d!==null&&(p.src=d),y!==null&&(p.title=y),k!==null&&(p.desc=k),p},i=o("link-hrefs"),c=W(i);return{...t,position:o("position")??t.position,closePersistence:L(this,"close-persistence",t.closePersistence??!1),hideOnMobile:L(this,"hide-on-mobile",t.hideOnMobile??!0),zIndex:X(this,"z-index",t.zIndex??9999),theme:{...t.theme??{},...r},wechat:l("wechat",t.wechat),donate:l("donate",t.donate),links:c??t.links}}};function H(){if(document.documentElement?.getAttribute("data-fq-auto")==="false"||document.querySelector(v)||window[O])return;window[O]=!0;let e=document.createElement(v);document.body.appendChild(e)}customElements.get(v)||(customElements.define(v,m),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H());var J="\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002",Z={src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",alt:"\u8D5E\u8D4F\u7801"},tt={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},g=class{constructor(e={},t=document.body){this.mask=null;this.closeBtn=null;this.timer=null;this.escHandler=null;this.handleClose=()=>{this.close()};this.handleMaskClick=e=>{e.target===this.mask&&this.close()};this.opts=this.resolve(e),this.container=t;let o=()=>this.render();this.opts.delay>0?this.timer=setTimeout(o,this.opts.delay):o()}isOpen(){return this.mask!==null&&this.mask.isConnected}show(){this.isOpen()||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.render())}close(){this.destroy(),this.opts.onClose?.()}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.mask?.remove(),this.mask=null}resolve(e){let t=e.qr??Z;return{title:e.title??"\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",content:e.content??J,contentHtml:e.contentHtml??"",qr:{src:t.src,alt:t.alt??"\u8D5E\u8D4F\u7801"},width:e.width??380,maskClosable:e.maskClosable??!0,closeOnEsc:e.closeOnEsc??!0,showClose:e.showClose??!0,delay:e.delay??0,zIndex:e.zIndex??1e4,theme:{...tt,...e.theme??{}},onClose:e.onClose}}render(){let{width:e,zIndex:t,theme:o,showClose:r,maskClosable:l}=this.opts,i=document.createElement("div");i.className="fm-mask",i.style.zIndex=String(t),i.style.setProperty("--fm-overlay",o.overlay),i.style.setProperty("--fm-bg",o.bg),i.style.setProperty("--fm-accent",o.accent),i.style.setProperty("--fm-radius",o.radius),i.style.setProperty("--fm-border",o.border),i.style.setProperty("--fm-title-color",o.titleColor),i.style.setProperty("--fm-text-color",o.textColor),i.style.setProperty("--fm-width",`${e}px`),l&&i.addEventListener("click",this.handleMaskClick),i.innerHTML=`
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${R(this.opts.title)}">
        ${r?`<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${et}</button>`:""}
        <p class="fm-title">${q(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `,this.closeBtn=i.querySelector(".fm-close"),this.closeBtn?.addEventListener("click",this.handleClose),this.container.appendChild(i),this.mask=i,this.opts.closeOnEsc&&(this.escHandler=c=>{c.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler))}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:q(this.opts.content).replace(/\n/g,"<br>")}buildQR(){let{qr:e}=this.opts;return`
      <div class="fm-qr">
        <img class="fm-qr-img" src="${R(e.src)}" alt="${R(e.alt)}" loading="lazy" />
      </div>
    `}},et='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function q(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function R(n){return q(n)}var z=`.fm-mask {
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
`;var w="floating-modal",nt="__FLOATING_MODAL_OPTIONS__",A="__floatingModalAutoInjected__";function it(){return window[nt]}function x(n,e,t){let o=n.getAttribute(e);return o===null?t:o===""||o==="true"||o==="1"}function C(n,e,t){let o=n.getAttribute(e);if(o===null||o==="")return t;let r=Number(o);return Number.isFinite(r)?r:t}var S=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],f=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=z,this.shadow.appendChild(t)}static get observedAttributes(){return["auto-show","title","content","content-html","qr-src","qr-alt","width","mask-closable","close-on-esc","show-close","delay","z-index",...S.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}show(){this.widget?.isOpen()||(this.widget?.destroy(),this.widget=new g(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){this.isConnected&&x(this,"auto-show",!0)&&(this.widget?.destroy(),this.widget=new g(this.buildOptions(),this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=it()??{},o=s=>this.getAttribute(s),r={};for(let[s,a]of S){let d=o(s);d!==null&&(r[a]=d)}let l=o("qr-src"),i=o("qr-alt"),c=l===null&&i===null?t.qr:{src:l??t.qr?.src??"",alt:i??t.qr?.alt};return{...t,title:o("title")??t.title,content:o("content")??t.content,contentHtml:o("content-html")??t.contentHtml,qr:c,width:C(this,"width",t.width??380),maskClosable:x(this,"mask-closable",t.maskClosable??!0),closeOnEsc:x(this,"close-on-esc",t.closeOnEsc??!0),showClose:x(this,"show-close",t.showClose??!0),delay:C(this,"delay",t.delay??0),zIndex:C(this,"z-index",t.zIndex??1e4),theme:{...t.theme??{},...r}}}};function Q(){if(document.documentElement?.getAttribute("data-fm-auto")==="false"||document.querySelector(w)||window[A])return;window[A]=!0;let e=document.createElement(w);document.body.appendChild(e)}customElements.get(w)||(customElements.define(w,f),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q):Q());})();

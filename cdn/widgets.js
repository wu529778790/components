(()=>{var H={wechat:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",title:"\u516C\u4F17\u53F7",desc:""},donate:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",title:"\u8D5E\u8D4F\u7801",desc:""}},z={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},M="floating-qr:closed",Q="(max-width: 767px)";function B(){return typeof window>"u"?!1:window.matchMedia?.(Q)?.matches??!1}function _(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(M)==="1"}catch{return!1}}function I(){if(!(typeof localStorage>"u"))try{localStorage.setItem(M,"1")}catch{}}var b=class i{constructor(o={},t=document.body){this.el=null;this.closeBtn=null;this.handleClose=()=>{this.close()};this.opts=this.resolve(o),!(this.opts.hideOnMobile&&B())&&(this.opts.closePersistence&&_()||this.render(t))}isMounted(){return this.el!==null&&this.el.isConnected}close(){this.opts.closePersistence&&I(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.remove(),this.el=null}update(o){this.destroy();let t=new i(o);this.opts.theme=t.opts.theme,this.opts.position=t.opts.position,this.opts.closePersistence=t.opts.closePersistence,this.opts.hideOnMobile=t.opts.hideOnMobile,this.opts.zIndex=t.opts.zIndex,this.opts.wechat=t.opts.wechat,this.opts.donate=t.opts.donate,this.el=t.el,this.closeBtn=t.closeBtn}resolve(o){let t=(e,r)=>{let a=H[r];return{src:e?.src??a.src,title:e?.title??a.title,desc:e?.desc??a.desc}};return{wechat:t(o.wechat,"wechat"),donate:t(o.donate,"donate"),position:o.position??"right-bottom",closePersistence:o.closePersistence??!1,hideOnMobile:o.hideOnMobile??!0,zIndex:o.zIndex??9999,theme:{...z,...o.theme??{}}}}render(o=document.body){let{wechat:t,donate:e,position:r,zIndex:a,theme:n}=this.opts,s=document.createElement("div");s.className="fq-widget",s.dataset.position=r,s.style.zIndex=String(a),s.style.setProperty("--fq-bg",n.bg),s.style.setProperty("--fq-accent",n.accent),s.style.setProperty("--fq-radius",n.radius),s.style.setProperty("--fq-border",n.border),s.innerHTML=`
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${P}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${g(t.src)}" alt="${g(t.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${h(t.title)}</p>
        ${t.desc?`<p class="fq-desc">${h(t.desc)}</p>`:""}
      </div>
      <div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${g(e.src)}" alt="${g(e.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${h(e.title)}</p>
        ${e.desc?`<p class="fq-desc">${h(e.desc)}</p>`:""}
      </div>
    `,this.closeBtn=s.querySelector(".fq-close"),this.closeBtn?.addEventListener("click",this.handleClose),o.appendChild(s),this.el=s}},P='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function h(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function g(i){return h(i)}var E=`.fq-widget {
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

@media (max-width: 767px) {
  .fq-widget {
    width: 120px;
    padding: 10px;
  }
}
`;var v="floating-qr",G="__FLOATING_QR_OPTIONS__",O="__floatingQrAutoInjected__",N="(max-width: 767px)";function j(){return window[G]}function R(i,o,t){let e=i.getAttribute(o);return e===null?t:e===""||e==="true"||e==="1"}function U(i,o,t){let e=i.getAttribute(o);if(e===null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t}var C=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]],m=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=E,this.shadow.appendChild(t)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","wechat-src","wechat-title","wechat-desc","donate-src","donate-title","donate-desc",...C.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}render(){if(!this.isConnected)return;let t=this.buildOptions();t.hideOnMobile&&window.matchMedia?.(N)?.matches||(this.widget?.destroy(),this.widget=new b(t,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=j()??{},e=n=>this.getAttribute(n),r={};for(let[n,s]of C){let l=e(n);l!==null&&(r[s]=l)}let a=(n,s)=>{let l=e(`${n}-src`),c=e(`${n}-title`),d=e(`${n}-desc`);if(l===null&&c===null&&d===null)return s;let p={};return l!==null&&(p.src=l),c!==null&&(p.title=c),d!==null&&(p.desc=d),p};return{...t,position:e("position")??t.position,closePersistence:R(this,"close-persistence",t.closePersistence??!1),hideOnMobile:R(this,"hide-on-mobile",t.hideOnMobile??!0),zIndex:U(this,"z-index",t.zIndex??9999),theme:{...t.theme??{},...r},wechat:a("wechat",t.wechat),donate:a("donate",t.donate)}}};function F(){if(document.documentElement?.getAttribute("data-fq-auto")==="false"||document.querySelector(v)||window[O])return;window[O]=!0;let o=document.createElement(v);document.body.appendChild(o)}customElements.get(v)||(customElements.define(v,m),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",F):F());var Y="\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002",D={src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",alt:"\u8D5E\u8D4F\u7801"},K={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},u=class{constructor(o={},t=document.body){this.mask=null;this.closeBtn=null;this.timer=null;this.escHandler=null;this.handleClose=()=>{this.close()};this.handleMaskClick=o=>{o.target===this.mask&&this.close()};this.opts=this.resolve(o),this.container=t;let e=()=>this.render();this.opts.delay>0?this.timer=setTimeout(e,this.opts.delay):e()}isOpen(){return this.mask!==null&&this.mask.isConnected}show(){this.isOpen()||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.render())}close(){this.destroy(),this.opts.onClose?.()}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.mask?.remove(),this.mask=null}resolve(o){let t=o.qr??D;return{title:o.title??"\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",content:o.content??Y,contentHtml:o.contentHtml??"",qr:{src:t.src,alt:t.alt??"\u8D5E\u8D4F\u7801"},width:o.width??380,maskClosable:o.maskClosable??!0,closeOnEsc:o.closeOnEsc??!0,showClose:o.showClose??!0,delay:o.delay??0,zIndex:o.zIndex??1e4,theme:{...K,...o.theme??{}},onClose:o.onClose}}render(){let{width:o,zIndex:t,theme:e,showClose:r,maskClosable:a}=this.opts,n=document.createElement("div");n.className="fm-mask",n.style.zIndex=String(t),n.style.setProperty("--fm-overlay",e.overlay),n.style.setProperty("--fm-bg",e.bg),n.style.setProperty("--fm-accent",e.accent),n.style.setProperty("--fm-radius",e.radius),n.style.setProperty("--fm-border",e.border),n.style.setProperty("--fm-title-color",e.titleColor),n.style.setProperty("--fm-text-color",e.textColor),n.style.setProperty("--fm-width",`${o}px`),a&&n.addEventListener("click",this.handleMaskClick),n.innerHTML=`
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${q(this.opts.title)}">
        ${r?`<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${V}</button>`:""}
        <p class="fm-title">${x(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `,this.closeBtn=n.querySelector(".fm-close"),this.closeBtn?.addEventListener("click",this.handleClose),this.container.appendChild(n),this.mask=n,this.opts.closeOnEsc&&(this.escHandler=s=>{s.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler))}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:x(this.opts.content).replace(/\n/g,"<br>")}buildQR(){let{qr:o}=this.opts;return`
      <div class="fm-qr">
        <img class="fm-qr-img" src="${q(o.src)}" alt="${q(o.alt)}" loading="lazy" />
      </div>
    `}},V='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function x(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function q(i){return x(i)}var T=`.fm-mask {
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
`;var w="floating-modal",W="__FLOATING_MODAL_OPTIONS__",L="__floatingModalAutoInjected__";function X(){return window[W]}function y(i,o,t){let e=i.getAttribute(o);return e===null?t:e===""||e==="true"||e==="1"}function k(i,o,t){let e=i.getAttribute(o);if(e===null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t}var A=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],f=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=T,this.shadow.appendChild(t)}static get observedAttributes(){return["auto-show","title","content","content-html","qr-src","qr-alt","width","mask-closable","close-on-esc","show-close","delay","z-index",...A.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}show(){this.widget?.isOpen()||(this.widget?.destroy(),this.widget=new u(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){this.isConnected&&y(this,"auto-show",!0)&&(this.widget?.destroy(),this.widget=new u(this.buildOptions(),this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=X()??{},e=l=>this.getAttribute(l),r={};for(let[l,c]of A){let d=e(l);d!==null&&(r[c]=d)}let a=e("qr-src"),n=e("qr-alt"),s=a===null&&n===null?t.qr:{src:a??t.qr?.src??"",alt:n??t.qr?.alt};return{...t,title:e("title")??t.title,content:e("content")??t.content,contentHtml:e("content-html")??t.contentHtml,qr:s,width:k(this,"width",t.width??380),maskClosable:y(this,"mask-closable",t.maskClosable??!0),closeOnEsc:y(this,"close-on-esc",t.closeOnEsc??!0),showClose:y(this,"show-close",t.showClose??!0),delay:k(this,"delay",t.delay??0),zIndex:k(this,"z-index",t.zIndex??1e4),theme:{...t.theme??{},...r}}}};function S(){if(document.documentElement?.getAttribute("data-fm-auto")==="false"||document.querySelector(w)||window[L])return;window[L]=!0;let o=document.createElement(w);document.body.appendChild(o)}customElements.get(w)||(customElements.define(w,f),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",S):S());})();

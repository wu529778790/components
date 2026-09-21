(()=>{var je={wechat:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",title:"\u516C\u4F17\u53F7",desc:"\u5173\u6CE8\u516C\u4F17\u53F7\u9632\u5931\u8054"},donate:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/img.shenzjd.com-20260916-092907-oe86.png",title:"\u9886\u79EF\u5206",desc:"\u6BCF\u5929\u626B\u7801\u7B7E\u5230\u9886\u79EF\u5206"}},Qe={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},Ye=[{href:"https://t.me/shenzjd_com",icon:"tg",title:"Telegram"},{href:"https://github.com/wu529778790",icon:"github",title:"GitHub"},{href:"https://x.com/shenzujiudi",icon:"x",title:"X"}],de={tg:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.2c-1.2.5-1.1 2.2.1 2.6l4.3 1.4 1.6 5.2c.3 1.1 1.7 1.4 2.5.6l2.4-2.4 4.5 3.3c1 .7 2.4.2 2.7-1L21.9 4.6zM8.6 13.5l8.7-5.4c.1-.1.3.1.2.2l-6.8 6.7c-.2.2-.3.4-.4.7l-.5 2.6c0 .1-.2.1-.2 0l-.9-4.7c-.1-.1 0-.2 0-.1z"/></svg>',github:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.1 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1.1 16.1h1.7L8.1 4.7H6.3L16.4 19.1z"/></svg>'};function Ke(o,e){return o?de[o]?de[o]:/^[a-z][a-z0-9+.-]*:\/\//i.test(o)||o.startsWith("data:")?`<img class="fq-link-img" src="${v(o)}" alt="" loading="lazy" />`:o.includes("<")?o:b(o.slice(0,1)):b((e||"\u2022").slice(0,1))}var ce="floating-qr:closed",Ve="(max-width: 767px)";function Je(){return typeof window>"u"?!1:window.matchMedia?.(Ve)?.matches??!1}function Xe(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(ce)==="1"}catch{return!1}}function Ze(){if(!(typeof localStorage>"u"))try{localStorage.setItem(ce,"1")}catch{}}var R=class o{constructor(e={},t=document.body){this.el=null;this.closeBtn=null;this.handleClose=()=>{this.close()};this.opts=this.resolve(e),!(this.opts.hideOnMobile&&Je())&&(this.opts.closePersistence&&Xe()||this.render(t))}isMounted(){return this.el!==null&&this.el.isConnected}close(){this.opts.closePersistence&&Ze(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.remove(),this.el=null}update(e){this.destroy();let t=new o(e);this.opts.theme=t.opts.theme,this.opts.themeOverrides=t.opts.themeOverrides,this.opts.position=t.opts.position,this.opts.closePersistence=t.opts.closePersistence,this.opts.hideOnMobile=t.opts.hideOnMobile,this.opts.zIndex=t.opts.zIndex,this.opts.wechat=t.opts.wechat,this.opts.donate=t.opts.donate,this.opts.links=t.opts.links,this.el=t.el,this.closeBtn=t.closeBtn}resolve(e){let t=(n,i)=>{let r=je[i];return{src:n?.src??r.src,title:n?.title??r.title,desc:n?.desc??r.desc}};return{wechat:t(e.wechat,"wechat"),donate:t(e.donate,"donate"),position:e.position??"right-center",closePersistence:e.closePersistence??!1,hideOnMobile:e.hideOnMobile??!0,zIndex:e.zIndex??9999,theme:{...Qe,...e.theme??{}},themeOverrides:e.theme??{},links:e.links??Ye}}render(e=document.body){let{wechat:t,donate:n,position:i,zIndex:r,themeOverrides:a,links:s}=this.opts,l=document.createElement("div");l.className="fq-widget",l.dataset.position=i,l.style.zIndex=String(r);let c=[["--fq-bg",a.bg],["--fq-accent",a.accent],["--fq-radius",a.radius],["--fq-border",a.border]];for(let[d,u]of c)u!==void 0&&l.style.setProperty(d,u);l.innerHTML=`
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${et}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${v(t.src)}" alt="${v(t.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${b(t.title)}</p>
        ${t.desc?`<p class="fq-desc">${b(t.desc)}</p>`:""}
      </div>
      ${n?`<div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${v(n.src)}" alt="${v(n.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${b(n.title)}</p>
        ${n.desc?`<p class="fq-desc">${b(n.desc)}</p>`:""}
      </div>`:""}
      ${s.length?`<div class="fq-links">${s.map(d=>`
        <a class="fq-link" href="${v(d.href)}" title="${v(d.title??"")}" target="_blank" rel="noopener noreferrer">${Ke(d.icon,d.title)}</a>`).join("")}
        </div>`:""}
    `,this.closeBtn=l.querySelector(".fq-close"),this.closeBtn?.addEventListener("click",this.handleClose),e.appendChild(l),this.el=l}},et='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function b(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function v(o){return b(o)}var ue=`.fq-widget {
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
`;var P="floating-qr",nt="__FLOATING_QR_OPTIONS__",he="__floatingQrAutoInjected__",it="(max-width: 767px)";function ot(){return window[nt]}function pe(o,e,t){let n=o.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}function rt(o,e,t){let n=o.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}var me=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]];function at(o){if(o===null)return null;let e=o.trim().toLowerCase();return e===""||e==="none"||e==="off"?[]:o.split(",").map(t=>t.trim()).filter(Boolean).map(t=>{let n=/github\.com/i.test(t)?"github":/t\.me/i.test(t)?"tg":/x\.com|twitter\.com/i.test(t)?"x":void 0;return{href:t,icon:n,title:n}})}var E=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=ue,this.shadow.appendChild(t)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","wechat-src","wechat-title","wechat-desc","donate-src","donate-title","donate-desc","link-hrefs",...me.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}render(){if(!this.isConnected)return;let t=this.buildOptions();t.hideOnMobile&&window.matchMedia?.(it)?.matches||(this.widget?.destroy(),this.widget=new R(t,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=ot()??{},n=l=>this.getAttribute(l),i={};for(let[l,c]of me){let d=n(l);d!==null&&(i[c]=d)}let r=(l,c)=>{let d=n(`${l}-src`),u=n(`${l}-title`),h=n(`${l}-desc`);if(d===null&&u===null&&h===null)return c;let p={};return d!==null&&(p.src=d),u!==null&&(p.title=u),h!==null&&(p.desc=h),p},a=n("link-hrefs"),s=at(a);return{...t,position:n("position")??t.position,closePersistence:pe(this,"close-persistence",t.closePersistence??!1),hideOnMobile:pe(this,"hide-on-mobile",t.hideOnMobile??!0),zIndex:rt(this,"z-index",t.zIndex??9999),theme:{...t.theme??{},...i},wechat:r("wechat",t.wechat),donate:r("donate",t.donate),links:s??t.links}}};function ge(){if(document.documentElement?.getAttribute("data-fq-auto")==="false"||document.querySelector(P)||window[he])return;window[he]=!0;let e=document.createElement(P);document.body.appendChild(e)}customElements.get(P)||(customElements.define(P,E),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ge):ge());var st="\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002",lt={src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",alt:"\u8D5E\u8D4F\u7801"},dt={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},T=class{constructor(e={},t=document.body){this.mask=null;this.closeBtn=null;this.timer=null;this.escHandler=null;this.handleClose=()=>{this.close()};this.handleMaskClick=e=>{e.target===this.mask&&this.close()};this.opts=this.resolve(e),this.container=t;let n=()=>this.render();this.opts.delay>0?this.timer=setTimeout(n,this.opts.delay):n()}isOpen(){return this.mask!==null&&this.mask.isConnected}show(){this.isOpen()||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.render())}close(){this.destroy(),this.opts.onClose?.()}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.mask?.remove(),this.mask=null}resolve(e){let t=e.qr??lt;return{title:e.title??"\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",content:e.content??st,contentHtml:e.contentHtml??"",qr:{src:t.src,alt:t.alt??"\u8D5E\u8D4F\u7801"},width:e.width??380,maskClosable:e.maskClosable??!0,closeOnEsc:e.closeOnEsc??!0,showClose:e.showClose??!0,delay:e.delay??0,zIndex:e.zIndex??1e4,theme:{...dt,...e.theme??{}},onClose:e.onClose}}render(){let{width:e,zIndex:t,theme:n,showClose:i,maskClosable:r}=this.opts,a=document.createElement("div");a.className="fm-mask",a.style.zIndex=String(t),a.style.setProperty("--fm-overlay",n.overlay),a.style.setProperty("--fm-bg",n.bg),a.style.setProperty("--fm-accent",n.accent),a.style.setProperty("--fm-radius",n.radius),a.style.setProperty("--fm-border",n.border),a.style.setProperty("--fm-title-color",n.titleColor),a.style.setProperty("--fm-text-color",n.textColor),a.style.setProperty("--fm-width",`${e}px`),r&&a.addEventListener("click",this.handleMaskClick),a.innerHTML=`
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${Q(this.opts.title)}">
        ${i?`<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${ct}</button>`:""}
        <p class="fm-title">${j(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `,this.closeBtn=a.querySelector(".fm-close"),this.closeBtn?.addEventListener("click",this.handleClose),this.container.appendChild(a),this.mask=a,this.opts.closeOnEsc&&(this.escHandler=s=>{s.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler))}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:j(this.opts.content).replace(/\n/g,"<br>")}buildQR(){let{qr:e}=this.opts;return`
      <div class="fm-qr">
        <img class="fm-qr-img" src="${Q(e.src)}" alt="${Q(e.alt)}" loading="lazy" />
      </div>
    `}},ct='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function j(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Q(o){return j(o)}var fe=`.fm-mask {
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
`;var q="floating-modal",ht="__FLOATING_MODAL_OPTIONS__",be="__floatingModalAutoInjected__";function pt(){return window[ht]}function H(o,e,t){let n=o.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}function Y(o,e,t){let n=o.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}var ve=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],L=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=fe,this.shadow.appendChild(t)}static get observedAttributes(){return["auto-show","title","content","content-html","qr-src","qr-alt","width","mask-closable","close-on-esc","show-close","delay","z-index",...ve.map(([t])=>t)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}show(){this.widget?.isOpen()||(this.widget?.destroy(),this.widget=new T(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){this.isConnected&&H(this,"auto-show",!0)&&(this.widget?.destroy(),this.widget=new T(this.buildOptions(),this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let t=pt()??{},n=l=>this.getAttribute(l),i={};for(let[l,c]of ve){let d=n(l);d!==null&&(i[c]=d)}let r=n("qr-src"),a=n("qr-alt"),s=r===null&&a===null?t.qr:{src:r??t.qr?.src??"",alt:a??t.qr?.alt};return{...t,title:n("title")??t.title,content:n("content")??t.content,contentHtml:n("content-html")??t.contentHtml,qr:s,width:Y(this,"width",t.width??380),maskClosable:H(this,"mask-closable",t.maskClosable??!0),closeOnEsc:H(this,"close-on-esc",t.closeOnEsc??!0),showClose:H(this,"show-close",t.showClose??!0),delay:Y(this,"delay",t.delay??0),zIndex:Y(this,"z-index",t.zIndex??1e4),theme:{...t.theme??{},...i}}}};function xe(){if(document.documentElement?.getAttribute("data-fm-auto")==="false"||document.querySelector(q)||window[be])return;window[be]=!0;let e=document.createElement(q);document.body.appendChild(e)}customElements.get(q)||(customElements.define(q,L),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xe):xe());var mt="https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/reward-unlock-qr.jpg",gt="\u5E2E\u5E2E\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u5427",ft="\u670D\u52A1\u5668\u6210\u672C\u4E0D\u5C0F\uFF0C\u5982\u679C\u89C9\u5F97\u597D\u7528\uFF0C\u5FAE\u4FE1\u626B\u7801\u770B\u4E2A\u89C6\u9891\u652F\u6301\u4E00\u4E0B\u5427\u3002",nn="",bt="\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u5185\u89C2\u770B\u89C6\u9891",vt="\u4E0B\u6B21\u4E00\u5B9A",xt="\u770B\u5B8C\u5566\uFF0C\u652F\u6301\u4F5C\u8005",wt={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},B=class{constructor(e={},t=document.body){this.mask=null;this.status="idle";this.escHandler=null;this.destroyed=!1;this.opts=this.resolve(e),this.container=t}getState(){return this.status}isOpen(){return this.mask!==null&&this.mask.isConnected}unlock(){return this.show(),Promise.resolve({ok:!0,ticket:null,grant:null})}show(){this.destroyed||this.isOpen()||(this.render(),this.status="open")}close(){this.teardown()}destroy(){this.destroyed=!0,this.teardown()}resolve(e){return{qrSrc:e.qrSrc??mt,title:e.title??gt,content:e.content??ft,contentHtml:e.contentHtml??"",loadingText:e.loadingText??"",hint:e.hint??bt,dismissText:e.dismissText??vt,confirmText:e.confirmText??xt,hideActions:e.hideActions??!1,width:e.width??380,zIndex:e.zIndex??1e4,theme:{...wt,...e.theme??{}}}}render(){let{width:e,zIndex:t,theme:n}=this.opts,i=document.createElement("div");i.className="fu-mask",i.style.zIndex=String(t),i.style.setProperty("--fu-overlay",n.overlay),i.style.setProperty("--fu-bg",n.bg),i.style.setProperty("--fu-accent",n.accent),i.style.setProperty("--fu-radius",n.radius),i.style.setProperty("--fu-border",n.border),i.style.setProperty("--fu-title-color",n.titleColor),i.style.setProperty("--fu-text-color",n.textColor),i.style.setProperty("--fu-width",`${e}px`),i.innerHTML=`
      <div class="fu-modal" role="dialog" aria-modal="true" aria-label="${we(this.opts.title)}">
        <button class="fu-close" type="button" aria-label="\u5173\u95ED">\xD7</button>
        <p class="fu-title">${x(this.opts.title)}</p>
        ${this.opts.loadingText?`<div class="fu-loading"><span class="fu-spinner" aria-hidden="true"></span><span class="fu-loading-text">${x(this.opts.loadingText)}</span></div>`:""}
        ${this.opts.content?`<div class="fu-content">${this.buildContent()}</div>`:""}
        <div class="fu-qr"><img class="fu-qr-img" alt="\u652F\u6301\u4E8C\u7EF4\u7801" src="${we(this.opts.qrSrc)}" /></div>
        ${this.opts.hint?`<div class="fu-hint">${x(this.opts.hint)}</div>`:""}
        ${this.opts.hideActions?"":`<div class="fu-actions">
          <button class="fu-btn fu-btn-ghost" type="button">${x(this.opts.dismissText)}</button>
          <button class="fu-btn fu-btn-primary" type="button">${x(this.opts.confirmText)}</button>
        </div>`}
      </div>
    `,i.querySelector(".fu-close")?.addEventListener("click",()=>this.close()),i.querySelector(".fu-btn-ghost")?.addEventListener("click",()=>this.close()),i.querySelector(".fu-btn-primary")?.addEventListener("click",()=>this.close()),i.addEventListener("click",r=>{r.target===i&&this.close()}),this.escHandler=r=>{r.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler),this.container.appendChild(i),this.mask=i,yt()}teardown(){this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.mask?.remove(),this.mask=null,this.status="idle",kt()}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:x(this.opts.content).replace(/\n/g,"<br>")}},z=0,y=null;function yt(){if(z+=1,y)return;let e=document.body.style;y={top:e.top,left:e.left,width:e.width,position:e.position,scrollY:window.scrollY},e.top=`-${y.scrollY}px`,e.left="0",e.width="100%",e.position="fixed"}function kt(){if(z<=0||(z-=1,z>0||!y))return;let e=document.body.style,t=y;y=null,e.top=t.top,e.left=t.left,e.width=t.width,e.position=t.position,t.scrollY>0&&requestAnimationFrame(()=>window.scrollTo(0,t.scrollY))}function x(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function we(o){return x(o)}var ye=`.fu-mask {
  --fu-overlay: rgba(0, 0, 0, 0.4);
  --fu-bg: #fff;
  --fu-accent: #185fa5;
  --fu-radius: 16px;
  --fu-border: rgba(0, 0, 0, 0.1);
  --fu-title-color: #1f1f1f;
  --fu-text-color: #555;
  --fu-width: 380px;

  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  background: var(--fu-overlay);
  animation: fu-fade-in 0.18s ease;
}

.fu-modal {
  position: relative;
  box-sizing: border-box;
  width: var(--fu-width);
  max-width: 92vw;
  max-height: 88vh;
  overflow-y: auto;
  padding: 28px 28px 24px;
  background: var(--fu-bg);
  border: 1px solid var(--fu-border);
  border-radius: var(--fu-radius);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  line-height: 1.6;
  animation: fu-rise-in 0.22s ease;
}

.fu-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: #999;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
}

.fu-close:hover {
  color: var(--fu-accent);
  background: rgba(0, 0, 0, 0.05);
}

.fu-title {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 500;
  color: var(--fu-title-color);
}

.fu-content {
  margin: 0 0 18px;
  font-size: 13px;
  color: var(--fu-text-color);
}

/* loading \u63D0\u793A\u533A\uFF08spinner + \u6587\u6848\uFF09 */
.fu-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: -4px 0 14px;
  font-size: 13px;
  color: var(--fu-text-color);
}

.fu-loading-text {
  line-height: 1.2;
}

.fu-spinner {
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-top-color: var(--fu-accent);
  border-radius: 50%;
  animation: fu-spin 0.8s linear infinite;
}

@keyframes fu-spin {
  to {
    transform: rotate(360deg);
  }
}

.fu-qr {
  margin: 0 auto 14px;
  width: 190px;
  max-width: 100%;
}

.fu-qr-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.fu-hint {
  display: block;
  font-size: 12px;
  color: var(--fu-text-color);
}

.fu-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.fu-btn {
  flex: 1;
  min-width: 0;
  padding: 9px 8px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  box-sizing: border-box;
}

.fu-btn-ghost {
  border: 1px solid var(--fu-border);
  background: transparent;
  color: var(--fu-text-color);
}

.fu-btn-ghost:hover {
  border-color: var(--fu-accent);
  color: var(--fu-accent);
}

.fu-btn-primary {
  border: none;
  background: var(--fu-accent);
  color: #fff;
}

.fu-btn-primary:hover {
  opacity: 0.85;
}

@keyframes fu-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fu-rise-in {
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
  .fu-modal {
    padding: 24px 20px 20px;
  }

  .fu-qr {
    width: 160px;
  }
}
`;var ke="floating-unlock",Tt="__FLOATING_UNLOCK_OPTIONS__";function Lt(){return window[Tt]}function Ee(o,e,t){let n=o.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}var Te=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],S=class extends HTMLElement{constructor(){super();this.widget=null;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=ye,this.shadow.appendChild(t)}static get observedAttributes(){return["qr-src","title","content","content-html","loading-text","hint","btn-dismiss","btn-confirm","hide-actions","width","z-index",...Te.map(([t])=>t)]}disconnectedCallback(){this.widget?.destroy(),this.widget=null}unlock(){return this.ensureWidget().show(),Promise.resolve({ok:!0,ticket:null,grant:null})}show(){this.ensureWidget().show()}close(){this.widget?.close()}ensureWidget(){return this.widget?.destroy(),this.widget=new B(this.buildOptions(),this.shadow),this.widget}buildOptions(){let t=Lt()??{},n=r=>this.getAttribute(r),i={};for(let[r,a]of Te){let s=n(r);s!==null&&(i[a]=s)}return{...t,qrSrc:n("qr-src")??t.qrSrc,title:n("title")??t.title,content:n("content")??t.content,contentHtml:n("content-html")??t.contentHtml,loadingText:n("loading-text")??t.loadingText,hint:n("hint")??t.hint,dismissText:n("btn-dismiss")??t.dismissText,confirmText:n("btn-confirm")??t.confirmText,hideActions:this.hasAttribute("hide-actions")||t.hideActions===!0,width:Ee(this,"width",t.width??380),zIndex:Ee(this,"z-index",t.zIndex??1e4),theme:{...t.theme??{},...i}}}};customElements.get(ke)||customElements.define(ke,S);function K(){if(typeof window<"u")return window.WxAuth}var cn=8e3;function C(o,e=0){let t=Number(o);return Number.isFinite(t)?t:e}function Le(o,e){return`${(o||"").trim().replace(/\/+$/,"")||window.location.origin}${e}`}async function Se(o,e){let t=new AbortController,n=setTimeout(()=>t.abort(),8e3);try{let i=await fetch(o,{...e,signal:t.signal}),r=await i.json().catch(()=>null);return{ok:i.ok,status:i.status,data:r}}catch{return{ok:!1,status:0,data:null}}finally{clearTimeout(n)}}async function V(o,e){let t=await Se(Le(o,`/api/points/balance?token=${encodeURIComponent(e)}`),{method:"GET",headers:{accept:"application/json"}});return!t.ok||!t.data||t.data.error||!Number.isFinite(Number(t.data.balance))?null:{balance:C(t.data.balance),checkedIn:t.data.checkedIn===!0,adReward:C(t.data.adReward,10),checkinReward:C(t.data.checkinReward,10),adsRemaining:C(t.data.adsRemaining)}}async function Ce(o,e){let t=await Se(Le(o,"/api/points/checkin"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})});if(!t.ok||!t.data?.ok)return null;let n=Number(t.data.balance);return{granted:C(t.data.granted),balance:t.data.balance===null||t.data.balance===void 0||!Number.isFinite(n)?null:n}}var I=`/* ============================================================
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
  /* \u9AD8\u5EA6\u8D34\u8FD1\u89C6\u53E3\uFF0C\u4E3B\u4F53\u5185\u90E8\u7559\u51FA\u53EF\u6EDA\u52A8\u4F59\u91CF\uFF1B\u540C\u65F6\u8BA9\u5F39\u7A97\u5728\u684C\u9762\u7AEF\u4E5F\u4E0D\u8D85\u51FA */
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  background: var(--ua-bg);
  border-radius: 18px;
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
  /* \u7D27\u51D1\uFF1A\u6807\u9898\u5934\u90E8\u4E0A\u4E0B\u95F4\u8DDD\u4ECE ~44px \u538B\u7F29\u5230 ~36px */
  padding: 1.1rem 1.5rem 0.9rem;
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
  /* \u7D27\u51D1\uFF1A\u5DE6\u53F3\u4E0A\u4E0B padding \u51CF\u5C0F\u5230 1.1rem / 1.35rem\uFF1B\u533A\u5757\u95F4\u8DDD\u4ECE 1.5rem \u6536\u5230 0.85rem */
  padding: 1.1rem 1.35rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

/* ===== \u7528\u6237\u4FE1\u606F\u5361\u7247 ===== */
.ua-profile-card {
  background: var(--ua-bg);
  border-radius: 14px;
  /* \u7D27\u51D1\uFF1A\u5185\u8FB9\u8DDD 1.5rem \u2192 0.75rem / 0.9rem */
  padding: 0.75rem 0.9rem;
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
  /* \u7D27\u51D1\uFF1A\u5934\u50CF\u4E0E\u53F3\u4FA7\u4FE1\u606F\u95F4\u8DDD 1.1rem \u2192 0.9rem */
  gap: 0.9rem;
}

.ua-big-avatar {
  width: 3.5rem;
  height: 3.5rem;
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
  font-size: 1.4rem;
  font-weight: 700;
}

.ua-profile-info {
  min-width: 0;
  flex: 1;
  /* \u6587\u5B57\u6574\u7EC4\u9760\u53F3\uFF1A\u6635\u79F0\u4E0E\u5FBD\u6807\u53F3\u5BF9\u9F50\uFF0C\u4E0E\u660E\u4FE1\u7247\u533A\u53F3\u4FA7 OPENID \u547C\u5E94 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ua-user-name {
  max-width: 100%;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.ua-user-sub {
  font-size: 0.78rem;
  color: var(--ua-sub);
  margin-top: 0.25rem;
}

/* \u672C\u7AD9\u7B2C N \u4F4D\u7528\u6237\uFF08userSeq\uFF09\u5FBD\u6807 */
.ua-user-seq {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--ua-accent);
  background: color-mix(in srgb, var(--ua-text) 6%, transparent);
  border: 1px solid var(--ua-btn-border);
  border-radius: 999px;
  padding: 0.12rem 0.55rem;
  margin-top: 0.35rem;
  letter-spacing: 0.02em;
}

/* \u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u5DE6 = \u7F51\u7AD9\u54C1\u724C\u300C\u795E\u65CF\u4E5D\u5E1D\u300D\uFF0C\u53F3 = \u7528\u6237 OPENID
   \u6574\u4F53\u5DE6\u53F3\u4E24\u7AEF\u5BF9\u9F50\uFF0C\u7528\u6D45\u8272\u5185\u5D4C\u5E95 + dashed \u9876\u7EBF \u8425\u9020\u660E\u4FE1\u7247"\u6295\u9012\u4FE1\u606F\u533A"\u5C42\u6B21 */
.ua-profile-postcard {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.7rem;
  /* \u8D1F margin \u8BA9\u6D45\u5E95\u5EF6\u4F38\u5230\u5361\u7247\u5DE6\u53F3\u8FB9\u7F18\uFF0C\u4E0E\u5361\u7247\u5E95\u90E8\u5706\u89D2\u5BF9\u9F50 */
  margin: 0.7rem -0.9rem -0.75rem;
  padding: 0.6rem 0.9rem;
  /* \u660E\u663E\u53EF\u611F\u77E5\u7684\u6D45\u5E95\uFF1A\u4E0E\u4E0A\u65B9\u767D\u8272\u5934\u50CF\u533A\u660E\u786E\u5206\u5C42\uFF0C\u5F62\u6210\u300C\u660E\u4FE1\u7247\u6295\u9012\u680F\u300D */
  background: color-mix(in srgb, var(--ua-text) 7%, var(--ua-bg));
  border-top: 1px dashed var(--ua-btn-border);
  border-radius: 0 0 14px 14px;
  min-width: 0;
}

.ua-postcard-brand {
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-postcard-id {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "SF Mono", monospace;
  font-size: 0.74rem;
  color: var(--ua-sub);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  user-select: all;
  letter-spacing: 0.01em;
}

/* ===== \u5B57\u6BB5\u7EC4 ===== */
.ua-field-group {
  display: flex;
  flex-direction: column;
  /* \u7D27\u51D1\uFF1A\u5B57\u6BB5\u7EC4\u5185\u90E8\u95F4\u8DDD 0.85rem \u2192 0.45rem */
  gap: 0.45rem;
}

.ua-field-label {
  font-size: 0.78rem;
  color: var(--ua-sub);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
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
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-section-title .ua-icon {
  width: 16px;
  height: 16px;
  color: #656d76;
}

/* GitHub \u7ED1\u5B9A\uFF1A\u5355\u884C\u5DE6\u53F3\u7ED3\u6784
   \u5DE6\u4FA7\u56FA\u5B9A\uFF1AGitHub \u56FE\u6807 +\u300CGitHub\u300D\u6807\u9898\uFF1B
   \u53F3\u4FA7\u72B6\u6001\u533A\uFF1A\u672A\u7ED1\u5B9A \u2192\u300C\u7ED1\u5B9A GitHub\u300D\u6309\u94AE\uFF1B\u5DF2\u7ED1\u5B9A \u2192 GitHub \u540D\u5B57 + \u89E3\u7ED1\u6309\u94AE */
.ua-gh-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.5rem 0.85rem;
  background: var(--ua-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
}

.ua-gh-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  min-width: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-gh-title .ua-icon {
  width: 18px;
  height: 18px;
  color: #656d76;
  flex-shrink: 0;
}

/* \u53F3\u4FA7\u72B6\u6001\u533A\uFF1A\u540D\u5B57 / \u6309\u94AE */
.ua-gh-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.ua-gh-name {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ua-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ua-badge {
  font-size: 0.65rem;
  font-weight: 500;
  color: #16a34a;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border: 1px solid #86efac;
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

/* \u89E3\u7ED1\u5C0F\u6309\u94AE\uFF08\u5DF2\u7ED1\u5B9A\uFF09
   \u4E0E\u53F3\u4FA7\u300C\u5DF2\u7ED1\u5B9A\u300D\u7EFF\u8272 pill badge \u5171\u5904\u4E00\u884C\uFF1A
   - \u7528 pill \u5706\u89D2\uFF08999px\uFF09\u4E0E\u4E4B\u547C\u5E94\uFF0C\u907F\u514D\u65B9\u89D2\u6309\u94AE\u5728\u89C6\u89C9\u4E0A\u663E\u5F97\u7A81\u5140
   - \u9AD8\u5EA6\u6536\u7D27\u5230\u63A5\u8FD1 badge\uFF0C\u907F\u514D\u4E00\u884C\u5185\u5143\u7D20\u7EB5\u5411\u53C2\u5DEE
   - \u8FB9\u6846\u7528 color-mix + --ua-danger \u6D3E\u751F\uFF0C\u6D45/\u6DF1\u8272\u6A21\u5F0F\u81EA\u52A8\u9002\u914D */
.ua-gh-unbind {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--ua-danger);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--ua-danger) 32%, transparent);
  border-radius: 999px;
  padding: 0.18rem 0.62rem;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease;
}

.ua-gh-unbind:hover {
  background: color-mix(in srgb, var(--ua-danger) 10%, transparent);
  border-color: var(--ua-danger);
}

.ua-gh-unbind:active {
  background: color-mix(in srgb, var(--ua-danger) 18%, transparent);
  transform: scale(0.96);
}

.ua-gh-unbind:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ua-danger) 22%, transparent);
}

/* \u7ED1\u5B9A\u6309\u94AE\uFF08\u672A\u7ED1\u5B9A\uFF09 */
.ua-gh-bind {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0.32rem 0.75rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #24292f 0%, #1a1f24 100%);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ua-gh-bind .ua-icon {
  width: 15px;
  height: 15px;
}

.ua-gh-bind:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(36, 41, 47, 0.3);
}

.ua-gh-bind:active {
  transform: translateY(0) scale(0.98);
}

/* \u6635\u79F0\u7F16\u8F91 */
.ua-nickname-row {
  display: flex;
  gap: 0.55rem;
  align-items: stretch;
}

.ua-input {
  flex: 1;
  min-width: 0;
  /* \u7D27\u51D1\uFF1A\u8F93\u5165\u6846 padding 0.55rem 0.9rem \u2192 0.5rem 0.8rem */
  padding: 0.5rem 0.8rem;
  font-size: 0.86rem;
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
  min-width: 5.5rem;
  /* \u7D27\u51D1\uFF1A\u4FDD\u5B58\u6309\u94AE padding 0.55rem 1.2rem \u2192 0.5rem 1rem */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.86rem;
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
  min-height: 1em;
  font-size: 0.78rem;
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
    max-height: calc(100vh - 1.5rem);
  }

  .ua-mask {
    padding: 0.75rem;
  }

  .ua-dialog-head {
    padding: 0.95rem 1.25rem 0.8rem;
  }

  .ua-dialog-body {
    padding: 1.1rem 1.25rem 1rem;
    gap: 0.85rem;
  }

  .ua-profile-card {
    padding: 0.85rem 1rem;
  }

  .ua-big-avatar {
    width: 3.2rem;
    height: 3.2rem;
  }
}
/* ==================== \u9000\u51FA\u767B\u5F55\u4E8C\u6B21\u786E\u8BA4 ==================== */

/* \u5C0F\u4E00\u53F7\u7684\u5BF9\u8BDD\u6846\uFF08\u76F8\u5BF9\u8BBE\u7F6E\u5F39\u7A97\u7684 28rem\uFF09 */
.ua-confirm {
  max-width: 22rem;
}

.ua-confirm .ua-dialog-body {
  padding: 1.25rem 1.5rem 0.5rem;
}

.ua-confirm-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ua-text);
}

.ua-confirm-actions {
  display: flex;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
}

.ua-confirm-btn {
  flex: 1;
  padding: 0.7rem 1rem;
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
  background: var(--ua-btn-bg);
  color: var(--ua-text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ua-confirm-btn:hover {
  background: color-mix(in srgb, var(--ua-text) 8%, var(--ua-btn-bg));
}

.ua-confirm-btn-danger {
  border-color: transparent;
  background: var(--ua-danger);
  color: #fff;
}

.ua-confirm-btn-danger:hover {
  background: color-mix(in srgb, var(--ua-danger) 85%, #000);
}

/* ==================== \u79EF\u5206\uFF08wx-auth \u8D26\u672C\uFF09 ==================== */

/* \u4E0A\uFF1A\u6807\u9898 + \u4F59\u989D\uFF1B\u4E0B\uFF1A\u72B6\u6001\u6587\u6848 + \u52A8\u4F5C\u6309\u94AE\uFF08\u4E0E GitHub \u884C\u540C\u4E00\u5957\u5361\u7247\u8BED\u8A00\uFF09 */
.ua-points-card {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.6rem 0.85rem;
  background: var(--ua-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
}

.ua-points-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.ua-points-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  min-width: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ua-text);
  letter-spacing: -0.01em;
}

.ua-points-title .ua-icon {
  width: 18px;
  height: 18px;
  /* \u91D1\u5E01\u8272\uFF1A\u6D45/\u6DF1\u8272\u80CC\u666F\u4E0B\u90FD\u4FDD\u6301\u53EF\u8FA8\u8BC6\u7684\u91D1\u9EC4 */
  color: #d99b1f;
  flex-shrink: 0;
}

.ua-points-balance {
  display: inline-flex;
  align-items: baseline;
  gap: 0.2rem;
  min-width: 0;
}

.ua-points-num {
  /* inline-block\uFF1A\u4F59\u989D\u653E\u5927\u53CD\u9988\u9700\u8981\u5B83\u662F\u53EF\u53D8\u6362\u7684\u76D2 */
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--ua-text);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.ua-points-num-muted {
  color: var(--ua-sub);
  font-weight: 700;
}

/* \u4F59\u989D\u53D8\u5316\u53CD\u9988\uFF1A\u77ED\u4FC3\u653E\u5927 + \u53D8\u91D1\u8272\uFF08\u6570\u503C\u6084\u6084\u53D8\u4E86\u6CA1\u52A8\u9759\uFF1D\u50CF\u6CA1\u751F\u6548\uFF09 */
.ua-points-num-bump {
  animation: ua-points-bump 0.7s ease;
}

@keyframes ua-points-bump {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.28);
    color: #d99b1f;
  }
  100% {
    transform: scale(1);
  }
}

.ua-points-unit {
  font-size: 0.72rem;
  color: var(--ua-sub);
}

.ua-points-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.ua-points-hint {
  min-width: 0;
  font-size: 0.76rem;
  color: var(--ua-sub);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ua-points-hint-ok {
  color: var(--ua-success);
  font-weight: 600;
}

.ua-points-btns {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.ua-points-btn {
  padding: 0.28rem 0.7rem;
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  color: var(--ua-text);
  background: var(--ua-btn-bg);
  border: 1px solid var(--ua-btn-border);
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease;
}

.ua-points-btn:not(:disabled):hover {
  border-color: var(--ua-accent);
  background: color-mix(in srgb, var(--ua-text) 7%, var(--ua-bg));
}

.ua-points-btn:not(:disabled):active {
  transform: scale(0.97);
}

.ua-points-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ua-accent) 22%, transparent);
}

.ua-points-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ua-points-btn-primary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ua-points-btn-primary:not(:disabled):hover {
  border-color: transparent;
  background: linear-gradient(135deg, #5b6fd6 0%, #684094 100%);
}

/* ==================== \u770B\u5E7F\u544A\u8D5A\u79EF\u5206\uFF08\u5C0F\u7A0B\u5E8F\u7801\u5F39\u7A97\uFF09 ==================== */

.ua-earn {
  max-width: 22rem;
}

.ua-earn-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  padding: 1.1rem 1.4rem 1.4rem;
  text-align: center;
}

.ua-earn-sub {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--ua-sub);
}

.ua-earn-sub b {
  color: var(--ua-text);
}

.ua-earn-qr {
  width: 11rem;
  height: 11rem;
  padding: 0.35rem;
  /* \u4E8C\u7EF4\u7801\u6052\u767D\u5E95\uFF1A\u6DF1\u8272\u6A21\u5F0F\u4E5F\u4E0D\u53CD\u8272\uFF0C\u5426\u5219\u90E8\u5206\u673A\u578B\u626B\u4E0D\u51FA\u6765 */
  background: #fff;
  border: 1px solid var(--ua-btn-border);
  border-radius: 12px;
  object-fit: contain;
  box-sizing: content-box;
}

.ua-earn-status {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ua-sub);
}

.ua-earn-status-ok {
  color: var(--ua-success);
}

.ua-earn-status-err {
  color: var(--ua-danger);
}

/* \u7A84\u5C4F\uFF1A\u52A8\u4F5C\u6309\u94AE\u6362\u884C\uFF0C\u4E8C\u7EF4\u7801\u7565\u7F29 */
@media (max-width: 480px) {
  .ua-points-foot {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .ua-points-btns {
    width: 100%;
    justify-content: flex-end;
  }

  .ua-earn-qr {
    width: 9.5rem;
    height: 9.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ua-points-num-bump {
    animation: none;
  }
}
`;var N="wxauth-token",F="wxauth-openid";function Ae(o){return!o||o.length<20?!1:/^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(o)}function f(){let o=document.cookie.split("; "),e=[],t=[];for(let i of o){let r=i.indexOf("=");if(r<0)continue;let a=i.slice(0,r).trim(),s=i.slice(r+1);a===N?e.push(s):a===F&&t.push(s)}return e.find(Ae)||e[0]||t.find(Ae)||t[0]||""}function J(){let o=window.location.hostname;if(o==="localhost"||/^\d+\.\d+\.\d+\.\d+$/.test(o))return"";let e=o.split(".");return e.length>=2?"."+e.slice(-2).join("."):""}function X(){k(N,!1),k(N,!0),k(F,!1),k(F,!0)}function Me(){let o=document.cookie.split("; ");for(let e of o){let t=e.indexOf("=");if(t<0)continue;let n=e.slice(0,t).trim();if(n!==N&&n!==F)continue;let i=e.slice(t+1);/^[^.]+\.[0-9]+\.[0-9a-f]{64}$/.test(i)||(k(n,!1),k(n,!0))}}function k(o,e){let t=e&&J()?`;domain=${J()}`:"",n=window.location.protocol==="https:"?";Secure":"";document.cookie=`${o}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${t}${n};SameSite=Strict`}function m(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function A(o){return m(o)}var Oe='<svg class="ua-icon-user" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>',Re='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',Pe='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h4a1 1 0 110 2H4v12h4a1 1 0 110 2H4a1 1 0 01-1-1V3zm10.293 9.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293a1 1 0 000 1.414zM21 10a1 1 0 01-1-1v2a1 1 0 110 0v-2a1 1 0 011 0 1 1 0 010 1v-1h27a1 1 0 010 2H20a1 1 0 01-1-1v-2a1 1 0 010-1z" clip-rule="evenodd"/></svg>',qe='<svg class="ua-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>',_='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',U='<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>';var Z={btnBg:"light-dark(#ffffff, #262a30)",size:"2.5rem",accent:"light-dark(#1f2328, #e6edf3)",btnBorder:"light-dark(rgba(27, 31, 36, 0.12), rgba(255, 255, 255, 0.14))",radius:"16px",bg:"light-dark(#ffffff, #1c1e22)",text:"light-dark(#1f2328, #e6edf3)",subText:"light-dark(#656d76, #8b949e)",overlay:"light-dark(rgba(31, 35, 40, 0.45), rgba(0, 0, 0, 0.6))",danger:"light-dark(#dc2626, #f85149)",success:"light-dark(#1a7f37, #3fb950)"},Ct="https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/img.shenzjd.com-20260917-010529-5ck1.png",He=15e3,At=3e3,Mt=9e4,g=class{constructor(e={},t=document.body){this.user=null;this.status="checking";this.menuEl=null;this.settingsEl=null;this.menuCleanup=null;this.settingsCleanup=null;this.confirmEl=null;this.confirmCleanup=null;this.githubMsgListener=null;this.saving=!1;this.saveBtnTimer=null;this.nicknameDraft="";this.points=null;this.pointsState="idle";this.pointsBusy=!1;this.pointsTip="";this.pointsTipOk=!1;this.pointsBump=!1;this.pointsBumpTimer=null;this.pointsSeq=0;this.adEl=null;this.adCleanup=null;this.adFirstTimer=null;this.adPollTimer=null;this.adPolling=!1;this.adBaseline=null;this.adDeadline=0;this.adRedeemed=!1;this.adCloseTimer=null;this.silentRefreshThrottle=3e4;this.lastSilentRefreshAt=0;this.cachedUser=null;this.cachedAt=0;this.cachedToken="";this.userCacheTtl=6e4;this.silentRefresh=()=>{let e=Date.now();e-this.lastSilentRefreshAt<this.silentRefreshThrottle||(this.lastSilentRefreshAt=e,this.fetchUser())};this.onWindowFocus=()=>{this.silentRefresh()};this.onVisibility=()=>{document.visibilityState==="visible"&&this.silentRefresh()};this.container=t,this.opts=this.resolve(e),Me(),this.root=document.createElement("div"),this.root.className="ua-root"}static check(e){return e||K()?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(e){return this.root.isConnected?this:(e?e.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),this.fetchUser(!0),window.addEventListener("focus",this.onWindowFocus),document.addEventListener("visibilitychange",this.onVisibility),this)}unmount(){this.destroy()}async login(){return this.triggerLogin()}async refresh(){await this.fetchUser(!0)}destroy(){this.closeMenu(),this.closeSettings(),this.githubMsgListener&&(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null),window.removeEventListener("focus",this.onWindowFocus),document.removeEventListener("visibilitychange",this.onVisibility),this.root.remove()}resolve(e){let t=e.sdk??K(),n=e.apiBase!==void 0&&e.apiBase!==""?e.apiBase:"https://wx-auth.shenzjd.com";return{sdk:t,apiBase:n,fixed:e.fixed??!0,offset:e.offset??"1rem 1.5rem",size:e.size??Z.size,zIndex:e.zIndex??12e3,portal:e.portal??!0,portalEl:e.portalEl,theme:{...Z,...e.theme??{},size:e.size??e.theme?.size??Z.size},pointsQrSrc:e.pointsQrSrc?.trim()||Ct,loginRequired:e.loginRequired??!1,onLogin:e.onLogin,onLogout:e.onLogout,onGithubBound:e.onGithubBound}}applyTheme(){let e=this.opts.theme,t=this.root.style;t.setProperty("--ua-btn-bg",e.btnBg),t.setProperty("--ua-size",e.size),t.setProperty("--ua-accent",e.accent),t.setProperty("--ua-btn-border",e.btnBorder),t.setProperty("--ua-radius",e.radius),t.setProperty("--ua-bg",e.bg),t.setProperty("--ua-text",e.text),t.setProperty("--ua-sub",e.subText),t.setProperty("--ua-overlay",e.overlay),t.setProperty("--ua-danger",e.danger),t.setProperty("--ua-success",e.success)}usePortal(){return this.opts.portal}getPortalRoot(){return this.opts.portalEl??document.body}appendOverlay(e){if(this.usePortal()){let t=this.opts.theme,n=e.style;n.setProperty("--ua-btn-bg",t.btnBg),n.setProperty("--ua-size",t.size),n.setProperty("--ua-accent",t.accent),n.setProperty("--ua-btn-border",t.btnBorder),n.setProperty("--ua-radius",t.radius),n.setProperty("--ua-bg",t.bg),n.setProperty("--ua-text",t.text),n.setProperty("--ua-sub",t.subText),n.setProperty("--ua-overlay",t.overlay),n.setProperty("--ua-danger",t.danger),n.setProperty("--ua-success",t.success);let i=document.createElement("style");i.setAttribute("data-ua-portal-style",""),i.textContent=I,e.appendChild(i),this.getPortalRoot().appendChild(e)}else this.root.appendChild(e)}async triggerLogin(){let e=this.opts.sdk;if(!e)return console.warn("[UserAvatar] \u672A\u627E\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK"),!1;let t=await e.requireAuth({required:this.opts.loginRequired});return t&&(await this.fetchUser(!0),this.user&&this.opts.onLogin?.(this.user)),t}async logout(){let e=this.opts.sdk;e?.revoke?await e.revoke():(e?.clearToken(),X()),this.user=null,this.status="unauth",this.closeMenu(),this.closeSettings(),this.render(),this.opts.onLogout?.()}async fetchUser(e=!1){let t=f();if(!t){this.user=null,this.status="unauth",this.render();return}if(!e&&this.cachedUser&&this.cachedToken===t&&Date.now()-this.cachedAt<this.userCacheTtl){this.user=this.cachedUser,this.status="auth",this.render();return}this.status!=="auth"&&(this.status="checking",this.render());let n=this.user;try{let i=this.opts.apiBase||window.location.origin,a=await(await fetch(`${i}/api/auth/userinfo?token=${encodeURIComponent(t)}`)).json();if(!a.authenticated){console.warn("[UserAvatar] token \u5DF2\u5931\u6548\uFF0C\u81EA\u52A8\u6E05\u9664\u672C\u5730\u51ED\u8BC1",a.error??""),X(),this.user=null,this.status="unauth",this.cachedUser=null,this.cachedAt=0,this.cachedToken="",this.closeSettings(),this.render();return}if(this.user=a.user?a.user:null,this.status=this.user?"auth":"unauth",this.cachedUser=this.user,this.cachedAt=Date.now(),this.cachedToken=t,this.status==="auth"&&n&&JSON.stringify(n)===JSON.stringify(this.user))return}catch(i){console.error("[UserAvatar] \u62C9\u53D6\u7528\u6237\u8BE6\u60C5\u5931\u8D25",i),this.status!=="auth"&&(this.user=null,this.status="unauth")}this.render()}async saveNickname(){let e=f(),t=this.nicknameDraft.trim();if(!e)return;if(t.length<2||t.length>20){this.setMsg("\u6635\u79F0\u9700\u4E3A 2-20 \u4E2A\u5B57\u7B26");return}if(this.saving)return;this.saving=!0,this.updateSaveBtn(),this.setMsg("");let n=!1;try{let i=this.opts.apiBase||window.location.origin,a=await(await fetch(`${i}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,action:"set-nickname",nickname:t})})).json();a.success?(n=!0,this.nicknameDraft=t,await this.fetchUser(!0)):this.setMsg(a.message||"\u4FDD\u5B58\u5931\u8D25")}catch(i){console.error("[UserAvatar] \u4FDD\u5B58\u6635\u79F0\u5931\u8D25",i),this.setMsg("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}finally{this.saving=!1,this.updateSaveBtn(n)}}async unbindGithub(){let e=f();if(e)try{let t=this.opts.apiBase||window.location.origin,i=await(await fetch(`${t}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,action:"unbind-github"})})).json();i.success?(await this.fetchUser(!0),this.refreshGithubRow()):window.alert(i.message||"\u89E3\u7ED1\u5931\u8D25")}catch(t){console.error("[UserAvatar] \u89E3\u7ED1\u5931\u8D25",t),window.alert("\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}}render(){this.root.innerHTML="",this.closeMenu();let e=this.opts.fixed?`position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}`:"",t=this.status==="checking",n=t?"ua-avatar ua-avatar-checking":this.status==="auth"?"ua-avatar":"ua-avatar ua-avatar-unauth";this.root.innerHTML=`
      <div class="ua-widget" style="${e}">
        <button type="button" class="${n}" aria-haspopup="true"${t?' aria-busy="true"':""} aria-label="${this.status==="auth"?"\u6253\u5F00\u7528\u6237\u83DC\u5355":t?"\u6B63\u5728\u68C0\u6D4B\u767B\u5F55\u72B6\u6001":"\u5FAE\u4FE1\u767B\u5F55"}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `;let i=this.root.querySelector(".ua-avatar"),r=this.root.querySelector(".ua-avatar-img");r&&(r.complete&&r.naturalWidth>0?r.classList.add("ua-img-loaded"):(i.classList.add("ua-avatar-loading-img"),r.addEventListener("load",()=>{r.classList.add("ua-img-loaded"),i.classList.remove("ua-avatar-loading-img")},{once:!0}),r.addEventListener("error",()=>{let a=this.user?.nickname||this.user?.github?.login||"\u5FAE",s=document.createElement("span");s.className="ua-avatar-fallback",s.textContent=a.charAt(0).toUpperCase(),r.replaceWith(s),i.classList.remove("ua-avatar-loading-img")},{once:!0}))),i.addEventListener("click",()=>{this.status!=="checking"&&(this.user?this.toggleMenu():this.triggerLogin())})}offsetTop(){let e=/^([^,\s]+)/.exec(this.opts.offset);return e?e[1]:"1rem"}offsetRight(){let e=/,\s*([^\s,]+)/.exec(this.opts.offset);if(e)return e[1];let t=this.opts.offset.trim().split(/\s+/);return t[1]??t[0]??"1.5rem"}buildAvatarInnerHtml(){if(this.status==="checking")return'<span class="ua-avatar-skeleton" aria-hidden="true"></span>';if(!this.user)return'<span class="ua-avatar-login">\u767B\u5F55</span>';let e=this.user.avatarUrl||this.user.headimgurl||this.user.github?.avatar||"";if(e)return`<img class="ua-avatar-img" src="${A(e)}" alt="" referrerpolicy="no-referrer" />`;let t=this.user.nickname||this.user.github?.login||"\u5FAE\u4FE1\u7528\u6237";return`<span class="ua-avatar-fallback">${m(t.charAt(0).toUpperCase())}</span>`}toggleMenu(){this.menuEl?this.closeMenu():this.openMenu()}openMenu(){let e=this.user;if(!e||this.menuEl)return;this.closeSettings();let t=document.createElement("div");t.className="ua-menu",t.style.zIndex=String(this.opts.zIndex+1);let n=e.nickname||(e.github?`@${e.github.login}`:"\u5FAE\u4FE1\u7528\u6237");if(t.innerHTML=`
      <div class="ua-menu-user"><span class="ua-menu-name">${m(n)}</span></div>
      <button type="button" class="ua-menu-item" data-action="settings">${Re}<span>\u8BBE\u7F6E</span></button>
      <button type="button" class="ua-menu-item ua-menu-item-danger" data-action="logout">${Pe}<span>\u9000\u51FA\u767B\u5F55</span></button>
    `,this.usePortal()){let s=this.root.querySelector(".ua-avatar")?.getBoundingClientRect();s&&s.width>0?(t.style.position="fixed",t.style.top=`${s.bottom+8}px`,t.style.left="auto",t.style.right=`${Math.max(window.innerWidth-s.right,0)}px`,t.style.minWidth="12rem",t.style.maxWidth="min(20rem, calc(100vw - 2rem))",t.dataset.uaPortal="true"):this.usePortalMenuInlineFallback(t)}let i=a=>{let s=a.composedPath();!s.includes(this.root)&&!(this.menuEl&&s.includes(this.menuEl))&&this.closeMenu()},r=a=>{a.key==="Escape"&&this.closeMenu()};document.addEventListener("mousedown",i),document.addEventListener("keydown",r),this.menuCleanup=()=>{document.removeEventListener("mousedown",i),document.removeEventListener("keydown",r)},t.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{this.openSettings()}),t.querySelector('[data-action="logout"]')?.addEventListener("click",()=>{this.openLogoutConfirm()}),this.appendOverlay(t),this.menuEl=t}usePortalMenuInlineFallback(e){e.style.position="absolute",e.style.top="",e.style.left="",e.style.right="0",e.style.minWidth="12rem",e.style.maxWidth="",this.root.appendChild(e)}closeMenu(){this.menuEl?.remove(),this.menuEl=null,this.menuCleanup?.(),this.menuCleanup=null}openLogoutConfirm(){this.closeMenu(),this.closeConfirm();let e=document.createElement("div");e.className="ua-mask",e.style.zIndex=String(this.opts.zIndex+10),e.innerHTML=`
      <div class="ua-dialog ua-confirm" role="alertdialog" aria-modal="true" aria-label="\u9000\u51FA\u767B\u5F55">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u9000\u51FA\u767B\u5F55</h3>
          <button type="button" class="ua-close" data-action="cancel" aria-label="\u5173\u95ED">${_}</button>
        </div>
        <div class="ua-dialog-body">
          <p class="ua-confirm-text">\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417\uFF1F\u9000\u51FA\u540E\u9700\u8981\u91CD\u65B0\u767B\u5F55\u624D\u80FD\u7EE7\u7EED\u4F7F\u7528\u3002</p>
        </div>
        <div class="ua-confirm-actions">
          <button type="button" class="ua-confirm-btn" data-action="cancel">\u53D6\u6D88</button>
          <button type="button" class="ua-confirm-btn ua-confirm-btn-danger" data-action="confirm">\u9000\u51FA\u767B\u5F55</button>
        </div>
      </div>
    `,this.confirmEl=e,this.appendOverlay(e);let t=()=>this.closeConfirm();e.querySelector('[data-action="confirm"]')?.addEventListener("click",()=>{t(),this.logout()}),e.querySelectorAll('[data-action="cancel"]').forEach(r=>{r.addEventListener("click",t)});let n=r=>{r.composedPath()[0]===e&&t()},i=r=>{r.key==="Escape"&&t()};document.addEventListener("mousedown",n),document.addEventListener("keydown",i),this.confirmCleanup=()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",i)}}closeConfirm(){this.confirmEl?.remove(),this.confirmEl=null,this.confirmCleanup?.(),this.confirmCleanup=null}openSettings(){let e=this.user;if(!e)return;this.closeMenu(),this.closeSettings(),this.nicknameDraft=e.nickname||"",this.pointsTip="",this.pointsBump=!1;let t=document.createElement("div");t.className="ua-mask",t.style.zIndex=String(this.opts.zIndex+10),t.innerHTML=this.buildSettingsHtml(e),this.settingsEl=t,this.appendOverlay(t),this.bindSettingsEvents(t),this.bindPointsEvents(t),this.loadPoints();let n=r=>{r.composedPath()[0]===t&&this.closeSettings()},i=r=>{r.key==="Escape"&&this.closeSettings()};document.addEventListener("mousedown",n),document.addEventListener("keydown",i),this.settingsCleanup=()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",i)}}buildSettingsHtml(e){let t=e.avatarUrl||e.headimgurl||e.github?.avatar,n=t?`<img class="ua-big-avatar" src="${A(t)}" alt="" referrerpolicy="no-referrer" />`:`<div class="ua-big-avatar ua-big-avatar-fallback">${m((e.nickname||e.github?.login||"?").charAt(0).toUpperCase())}</div>`,i=this.buildGithubRowHtml(e),r=this.buildPointsCardHtml();return`
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="\u8BBE\u7F6E">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u8BBE\u7F6E</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${_}</button>
        </div>
        <div class="ua-dialog-body">
          <!-- \u7528\u6237\u4FE1\u606F\u5361\u7247\uFF08\u542B\u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u7AD9\u70B9\u54C1\u724C + \u7528\u6237 ID\uFF09 -->
          <div class="ua-profile-card">
            <div class="ua-profile-header">
              ${n}
              <div class="ua-profile-info">
                <div class="ua-user-name">${m(e.nickname||(e.github?`@${e.github.login}`:"\u5FAE\u4FE1\u7528\u6237"))}</div>
                ${typeof e.userSeq=="number"&&e.userSeq>0?`<div class="ua-user-seq">\u4F60\u662F\u672C\u7AD9\u7B2C ${e.userSeq} \u4F4D\u7528\u6237</div>`:""}
              </div>
            </div>
            <!-- \u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u5DE6 = \u7F51\u7AD9\u54C1\u724C\u300C\u795E\u65CF\u4E5D\u5E1D\u300D\uFF1B\u53F3 = \u7528\u6237 OPENID -->
            <div class="ua-profile-postcard">
              <span class="ua-postcard-brand">\u795E\u65CF\u4E5D\u5E1D</span>
              <span class="ua-postcard-id">${m(e.openid||"-")}</span>
            </div>
          </div>

          <!-- \u79EF\u5206\uFF08wx-auth \u8D26\u672C\uFF09\uFF1A\u4F59\u989D + \u4ECA\u65E5\u7B7E\u5230 + \u770B\u5E7F\u544A\u8D5A\u5206 -->
          ${r}

          <!-- GitHub \u7ED1\u5B9A\uFF1A\u5DE6\u53F3\u5355\u884C\uFF08\u5DE6\uFF1A\u56FE\u6807+\u6807\u9898\uFF1B\u53F3\uFF1A\u7ED1\u5B9A\u6309\u94AE / \u7528\u6237\u540D+\u89E3\u7ED1\uFF09 -->
          ${i}

          <!-- \u8BBE\u7F6E\u540D\u5B57 -->
          <div class="ua-field-group">
            <div class="ua-section-title">${Oe}<span>\u8BBE\u7F6E\u540D\u5B57</span></div>
            <div class="ua-nickname-row">
              <input type="text" class="ua-input" maxlength="20" placeholder="2-20 \u4E2A\u5B57\u7B26" value="${A(this.nicknameDraft)}" />
              <button type="button" class="ua-save" data-action="save">\u4FDD\u5B58</button>
            </div>
            <div class="ua-msg" data-role="msg"></div>
          </div>
        </div>
      </div>
    `}buildGithubRowHtml(e){return e.github?`
        <div class="ua-gh-row">
          <span class="ua-gh-title">${U}<b>GitHub</b></span>
          <div class="ua-gh-status">
            <span class="ua-gh-name">@${m(e.github.login)}<span class="ua-badge">\u5DF2\u7ED1\u5B9A</span></span>
            <button type="button" class="ua-gh-unbind" data-action="unbind">\u89E3\u7ED1</button>
          </div>
        </div>`:`
        <div class="ua-gh-row">
          <span class="ua-gh-title">${U}<b>GitHub</b></span>
          <div class="ua-gh-status">
            <button type="button" class="ua-gh-bind" data-action="bind">${U}<span>\u7ED1\u5B9A GitHub</span></button>
          </div>
        </div>`}refreshGithubRow(){if(!this.settingsEl||!this.user)return;let e=this.settingsEl.querySelector(".ua-gh-row");if(!e)return;let t=document.createElement("div");t.innerHTML=this.buildGithubRowHtml(this.user).trim();let n=t.firstElementChild;n&&(e.replaceWith(n),n.querySelector('[data-action="bind"]')?.addEventListener("click",()=>{this.startGithubBind()}),n.querySelector('[data-action="unbind"]')?.addEventListener("click",()=>{this.unbindGithub()}))}bindSettingsEvents(e){let t=e.querySelector(".ua-input");t?.addEventListener("input",()=>{this.nicknameDraft=t.value,this.setMsg("")}),t?.addEventListener("keydown",n=>{n.key==="Enter"&&this.saveNickname()}),e.querySelector('[data-action="save"]')?.addEventListener("click",()=>{this.saveNickname()}),e.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.closeSettings()}),e.querySelector('[data-action="bind"]')?.addEventListener("click",()=>{this.startGithubBind()}),e.querySelector('[data-action="unbind"]')?.addEventListener("click",()=>{this.unbindGithub()})}closeSettings(){this.saveBtnTimer!==null&&(clearTimeout(this.saveBtnTimer),this.saveBtnTimer=null),this.closeEarnDialog(),this.pointsBumpTimer!==null&&(clearTimeout(this.pointsBumpTimer),this.pointsBumpTimer=null),this.pointsBump=!1,this.pointsSeq++,this.settingsEl?.remove(),this.settingsEl=null,this.settingsCleanup?.(),this.settingsCleanup=null}setMsg(e){let t=this.settingsEl?.querySelector('[data-role="msg"]');t&&(t.textContent=e,t.className=e?"ua-msg ua-msg-err":"ua-msg")}updateSaveBtn(e=!1){let t=this.settingsEl?.querySelector('[data-action="save"]');t&&(this.saveBtnTimer!==null&&(clearTimeout(this.saveBtnTimer),this.saveBtnTimer=null),t.disabled=this.saving,t.textContent=this.saving?"\u4FDD\u5B58\u4E2D\u2026":e?"\u5DF2\u4FDD\u5B58 \u2713":"\u4FDD\u5B58",e&&(this.saveBtnTimer=window.setTimeout(()=>{t.textContent="\u4FDD\u5B58",this.saveBtnTimer=null},2e3)))}startGithubBind(){let e=f();if(!e){window.alert("\u8BF7\u5148\u5B8C\u6210\u5FAE\u4FE1\u767B\u5F55");return}let n=`${this.opts.apiBase||window.location.origin}/api/oauth/github/authorize?token=${encodeURIComponent(e)}`;window.open(n,"github-bind","width=720,height=720,menubar=no,toolbar=no,location=no,status=no"),!this.githubMsgListener&&(this.githubMsgListener=i=>{let r=i.data;!r||r.type!=="github-bound"||(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null,this.fetchUser(!0).then(()=>{this.refreshGithubRow(),this.user?.github&&this.opts.onGithubBound?.(this.user)}))},window.addEventListener("message",this.githubMsgListener))}buildPointsCardHtml(){let e=this.points,t=this.pointsState==="idle"||this.pointsState==="loading",n=this.pointsState==="error",i=e?.checkinReward??0,r=e?.adReward??0,a=t&&!e?'<span class="ua-points-num ua-points-num-muted">\xB7\xB7\xB7</span>':n&&!e?'<span class="ua-points-num ua-points-num-muted">\u2014</span>':`<span class="ua-points-num${this.pointsBump?" ua-points-num-bump":""}">${e?.balance??0}</span><span class="ua-points-unit">\u5206</span>`,s=this.pointsTip?this.pointsTip:e?.checkedIn?`\u4ECA\u65E5\u5DF2\u7B7E\u5230${i>0?` +${i}`:""}`:i>0?`\u6BCF\u65E5\u7B7E\u5230 +${i}`:"\u6BCF\u65E5\u7B7E\u5230\u9886\u79EF\u5206",l;if(t&&!e)l='<button type="button" class="ua-points-btn" disabled>\u8BFB\u53D6\u4E2D\u2026</button>';else if(n&&!e)l='<button type="button" class="ua-points-btn" data-action="points-retry">\u91CD\u8BD5</button>';else{let c=this.pointsBusy?" disabled":"";l=(e?.checkedIn?'<button type="button" class="ua-points-btn" disabled>\u4ECA\u65E5\u5DF2\u7B7E\u5230</button>':`<button type="button" class="ua-points-btn ua-points-btn-primary" data-action="checkin"${c}>\u7B7E\u5230${i>0?` +${i}`:""}</button>`)+`<button type="button" class="ua-points-btn" data-action="earn"${c}>\u770B\u5E7F\u544A${r>0?` +${r}`:""}</button>`}return`
      <div class="ua-points-card">
        <div class="ua-points-head">
          <span class="ua-points-title">${qe}<b>\u79EF\u5206</b></span>
          <span class="ua-points-balance">${a}</span>
        </div>
        <div class="ua-points-foot">
          <span class="ua-points-hint${this.pointsTip&&this.pointsTipOk?" ua-points-hint-ok":""}">${m(s)}</span>
          <span class="ua-points-btns">${l}</span>
        </div>
      </div>`}bindPointsEvents(e){e.querySelector('[data-action="checkin"]')?.addEventListener("click",()=>{this.doCheckin()}),e.querySelector('[data-action="earn"]')?.addEventListener("click",()=>{this.openEarnDialog()}),e.querySelector('[data-action="points-retry"]')?.addEventListener("click",()=>{this.loadPoints()})}refreshPointsRow(){if(!this.settingsEl)return;let e=this.settingsEl.querySelector(".ua-points-card");if(!e)return;let t=document.createElement("div");t.innerHTML=this.buildPointsCardHtml().trim();let n=t.firstElementChild;n&&(e.replaceWith(n),this.bindPointsEvents(n))}setPointsTip(e,t=!1){this.pointsTip=e,this.pointsTipOk=t}async loadPoints(){let e=f();if(!e)return;let t=++this.pointsSeq;this.points||(this.pointsState="loading",this.refreshPointsRow());let n=await V(this.opts.apiBase,e);t===this.pointsSeq&&(n?(this.points=n,this.pointsState="ready"):this.points?(this.pointsState="ready",this.setPointsTip("\u79EF\u5206\u5237\u65B0\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5")):this.pointsState="error",this.refreshPointsRow())}async doCheckin(){let e=f();if(!e||this.pointsBusy)return;this.pointsBusy=!0,this.setPointsTip(""),this.refreshPointsRow();let t=await Ce(this.opts.apiBase,e);this.pointsBusy=!1,this.settingsEl&&(t?t.granted>0?(this.applyPointsBalance(t.balance),this.points&&(this.points.checkedIn=!0),this.setPointsTip(`\u7B7E\u5230\u6210\u529F +${t.granted} \u79EF\u5206`,!0),this.bumpPoints()):(this.points&&(this.points.checkedIn=!0),this.setPointsTip("\u4ECA\u5929\u5DF2\u7ECF\u7B7E\u5230\u8FC7\u4E86",!0)):this.setPointsTip("\u7B7E\u5230\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"),this.refreshPointsRow())}applyPointsBalance(e){e===null||!Number.isFinite(e)||this.points&&(this.points={...this.points,balance:e})}bumpPoints(){this.pointsBump=!0,this.pointsBumpTimer!==null&&clearTimeout(this.pointsBumpTimer),this.pointsBumpTimer=window.setTimeout(()=>{this.pointsBumpTimer=null,this.pointsBump=!1,this.refreshPointsRow()},800)}openEarnDialog(){this.closeEarnDialog();let e=this.points?.adReward??0,t=Math.round(He/1e3),n=document.createElement("div");n.className="ua-mask",n.style.zIndex=String(this.opts.zIndex+20),n.innerHTML=`
      <div class="ua-dialog ua-earn" role="dialog" aria-modal="true" aria-label="\u770B\u5E7F\u544A\u8D5A\u79EF\u5206">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u770B\u5E7F\u544A\u8D5A\u79EF\u5206</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${_}</button>
        </div>
        <div class="ua-earn-body">
          <p class="ua-earn-sub">\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u91CC\u770B\u5B8C\u4E00\u4E2A\u6FC0\u52B1\u89C6\u9891${e>0?`\uFF0C<b>+${e} \u79EF\u5206</b>\u81EA\u52A8\u5230\u8D26`:"\uFF0C\u79EF\u5206\u81EA\u52A8\u5230\u8D26"}</p>
          <img class="ua-earn-qr" src="${A(this.opts.pointsQrSrc)}" alt="\u5C0F\u7A0B\u5E8F\u7801" />
          <div class="ua-earn-status" data-role="earn-status">\u770B\u5B8C\u5E7F\u544A\u7EA6 ${t} \u79D2\u540E\u81EA\u52A8\u5230\u8D26</div>
          <button type="button" class="ua-points-btn" data-action="earn-refresh">\u5237\u65B0\u79EF\u5206</button>
        </div>
      </div>
    `,this.adEl=n,this.adBaseline=this.points?this.points.balance:null,this.appendOverlay(n);let i=()=>this.closeEarnDialog();n.querySelector('[data-action="close"]')?.addEventListener("click",i),n.querySelector('[data-action="earn-refresh"]')?.addEventListener("click",()=>{this.checkEarnManually()});let r=s=>{s.composedPath()[0]===n&&i()},a=s=>{s.key==="Escape"&&i()};document.addEventListener("mousedown",r),document.addEventListener("keydown",a),this.adCleanup=()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",a)},this.adFirstTimer=window.setTimeout(()=>{this.adFirstTimer=null,this.adEl&&(this.setEarnStatus("\u6B63\u5728\u68C0\u6D4B\u79EF\u5206\u5230\u8D26\u2026"),this.startEarnPolling())},He)}startEarnPolling(){this.stopEarnPolling(),this.adDeadline=Date.now()+Mt,this.adPollTimer=window.setInterval(()=>{if(!this.adPolling){if(Date.now()>this.adDeadline){this.stopEarnPolling(),this.setEarnStatus("\u8FD8\u6CA1\u68C0\u6D4B\u5230\u5230\u8D26\uFF0C\u53EF\u70B9\u300C\u5237\u65B0\u79EF\u5206\u300D\u518D\u6838\u5BF9\u4E00\u6B21");return}this.checkEarnOnce()}},At)}stopEarnPolling(){this.adPollTimer!==null&&(clearInterval(this.adPollTimer),this.adPollTimer=null)}async checkEarnOnce(){if(this.adPolling||!this.adEl||this.adRedeemed)return!1;this.adPolling=!0;let e=null;try{e=await this.readPoints()}finally{this.adPolling=!1}return!this.adEl||!e?!1:this.maybeSettle(e)}async checkEarnManually(){if(!this.adEl||this.adRedeemed)return;let e=await this.readPoints();if(!this.adEl||!e){this.adEl&&this.setEarnStatus("\u79EF\u5206\u8BFB\u53D6\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5","err");return}this.maybeSettle(e)||this.setEarnStatus("\u8FD8\u6CA1\u68C0\u6D4B\u5230\u65B0\u7684\u79EF\u5206\u5230\u8D26\uFF0C\u770B\u5B8C\u5E7F\u544A\u518D\u70B9\u4E00\u6B21")}maybeSettle(e){return this.adRedeemed?!0:this.adBaseline===null?(this.adBaseline=e.balance,!1):e.balance<=this.adBaseline?!1:(this.settleEarn(e),!0)}settleEarn(e){if(this.adRedeemed)return;this.adRedeemed=!0,this.stopEarnPolling();let t=this.adBaseline===null?0:e.balance-this.adBaseline;this.setEarnStatus(t>0?`\u5DF2\u5230\u8D26 +${t} \u79EF\u5206`:"\u79EF\u5206\u5DF2\u5230\u8D26","ok"),this.setPointsTip(t>0?`\u770B\u5E7F\u544A +${t} \u79EF\u5206\u5DF2\u5230\u8D26`:"\u770B\u5E7F\u544A\u79EF\u5206\u5DF2\u5230\u8D26",!0),this.bumpPoints(),this.refreshPointsRow(),this.adCloseTimer=window.setTimeout(()=>{this.adCloseTimer=null,this.closeEarnDialog()},900)}async readPoints(){let e=f();if(!e)return null;let t=await V(this.opts.apiBase,e);return t?(this.points=t,this.pointsState="ready",this.refreshPointsRow(),t):null}setEarnStatus(e,t=""){let n=this.adEl?.querySelector('[data-role="earn-status"]');n&&(n.textContent=e,n.className=`ua-earn-status${t?` ua-earn-status-${t}`:""}`)}closeEarnDialog(){this.stopEarnPolling(),this.adFirstTimer!==null&&(clearTimeout(this.adFirstTimer),this.adFirstTimer=null),this.adCloseTimer!==null&&(clearTimeout(this.adCloseTimer),this.adCloseTimer=null),this.adEl?.remove(),this.adEl=null,this.adCleanup?.(),this.adCleanup=null,this.adRedeemed=!1,this.adBaseline=null}};var ee="user-avatar",Ot="__USER_AVATAR_OPTIONS__";function Rt(){return window[Ot]}function te(o,e,t){let n=o.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}function Pt(o,e,t){let n=o.getAttribute(e);if(n===null||n==="")return t;let i=Number(n);return Number.isFinite(i)?i:t}function qt(o){if(typeof o!="string"||o.trim()==="")return;let e=o.trim(),t=e.startsWith("#")?e.slice(1):e,n=document.getElementById(t);if(n)return n;try{return document.querySelector(e)??void 0}catch{return}}var ze=[["theme-btn-bg","btnBg"],["theme-size","size"],["theme-accent","accent"],["theme-btn-border","btnBorder"],["theme-radius","radius"],["theme-bg","bg"],["theme-text","text"],["theme-sub-text","subText"],["theme-overlay","overlay"],["theme-danger","danger"],["theme-success","success"]],M=class extends HTMLElement{constructor(){super();this.widget=null;this.pollTimer=null;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=I,this.shadow.appendChild(t)}static get observedAttributes(){return["api-base","fixed","offset","size","z-index","portal","portal-el","points-qr-src","login-required",...ze.map(([t])=>t)]}static check(){return g.check()}connectedCallback(){this.mountWidget(),g.check()!==null&&this.startPolling()}disconnectedCallback(){this.stopPolling(),this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&(this.stopPolling(),this.mountWidget(),g.check()!==null&&this.startPolling())}startPolling(){this.pollTimer||(this.pollTimer=setInterval(()=>{g.check()===null&&(this.stopPolling(),this.mountWidget())},400))}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}mountWidget(){this.widget?.unmount();let t=g.check();t&&console.warn(`[${ee}] ${t}`),this.widget=new g(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let t=Rt()??{},n=this.props??{},i=s=>this.getAttribute(s),r={};for(let[s,l]of ze){let c=i(s);c!==null&&(r[l]=c)}let a={apiBase:i("api-base")??void 0,fixed:i("fixed")!==null?te(this,"fixed",!0):void 0,offset:i("offset")??void 0,size:i("size")??void 0,zIndex:i("z-index")!==null?Pt(this,"z-index",12e3):void 0,portal:i("portal")!==null?te(this,"portal",!0):void 0,portalEl:qt(i("portal-el")??void 0),pointsQrSrc:i("points-qr-src")??void 0,loginRequired:i("login-required")!==null?te(this,"login-required",!1):void 0,theme:Object.keys(r).length?r:void 0};return{...ne(t),...ne(a),...ne(n),theme:{...t.theme??{},...a.theme??{},...n.theme??{}}}}};function ne(o){let e={};for(let[t,n]of Object.entries(o))n!==void 0&&(e[t]=n);return e}customElements.get(ee)||customElements.define(ee,M);var $=`/* ============================================================
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
`;function zt(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ie(o){return zt(o)}function Be(o){return o.replace(/^www\./i,"")}function oe(o){try{let e=Be(new URL(o,window.location.href).hostname),t=Be(window.location.hostname);return!e||!t?null:e===t?"exact":t.endsWith("."+e)?"sub":null}catch{return null}}function En(o){return oe(o)!==null}var re='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>',Ie='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';var Bt="https://unpkg.com/wx-auth-sdk@latest/dist/wx-auth.umd.js",ae=null,Ne=!1;function Fe(){if(!(typeof window>"u"))return window.WxAuth}function _e(o={}){let{src:e=Bt,enabled:t=!0,initOptions:n={silent:!0,required:!1},pollInterval:i=100,timeout:r=1e4,onReady:a,onError:s}=o;if(!t)return Promise.resolve(!1);let l=Fe();return l?(a?.(l),Promise.resolve(!0)):(ae||(ae=new Promise(c=>{It(e);let d=Date.now(),u=setInterval(()=>{let h=Fe();if(h){if(clearInterval(u),!Ne&&typeof h.init=="function")try{h.init(n),Ne=!0}catch(p){console.warn("[site-navbar] WxAuth.init \u8C03\u7528\u5931\u8D25",p)}a?.(h),c(!0)}else if(Date.now()-d>r){clearInterval(u);let p=`wx-auth-sdk \u52A0\u8F7D\u8D85\u65F6\uFF08${r}ms\uFF09`;console.warn(`[site-navbar] ${p}\uFF0C\u5934\u50CF\u767B\u5F55\u529F\u80FD\u4E0D\u53EF\u7528\uFF0C\u5BFC\u822A\u680F\u7167\u5E38\u6E32\u67D3`),s?.(p),c(!1)}},i)})),ae)}function It(o){if(typeof document>"u"||Array.from(document.querySelectorAll("script[data-wx-auth-sdk]")).some(n=>n.src===o))return;let t=document.createElement("script");t.src=o,t.async=!0,t.setAttribute("data-wx-auth-sdk",""),t.onerror=()=>{console.warn(`[site-navbar] wx-auth-sdk \u52A0\u8F7D\u5931\u8D25\uFF1A${o}\uFF0C\u5934\u50CF\u529F\u80FD\u4E0D\u53EF\u7528\uFF0C\u5BFC\u822A\u680F\u7167\u5E38\u6E32\u67D3`)},(document.head||document.documentElement).appendChild(t)}var Nt=[{href:"https://shenzjd.com",label:"AI\u60C5\u62A5\u5C40",icon:"\u{1F3E0}"},{href:"https://panhub.shenzjd.com",label:"\u7F51\u76D8\u641C\u7D22",icon:"\u{1F50D}"},{href:"https://parse.shenzjd.com",label:"\u89C6\u9891\u89E3\u6790",icon:"\u{1F3AC}"},{href:"https://h5.lot-ml.com/ProductEn/Index/3d58b4cfe8b560c8",label:"\u6D41\u91CF\u5361",icon:"\u{1F4F6}"},{href:"https://img.shenzjd.com/",label:"Git \u56FE\u5E8A",icon:"\u{1F4F7}"},{href:"https://navhub.shenzjd.com",label:"\u5BFC\u822A\u68EE\u6797",icon:"\u{1F9ED}"},{href:"https://freeimg.shenzjd.com/",label:"\u514D\u8D39\u751F\u56FE",icon:"\u{1F193}"}],Ft={icon:'<img class="sn-brand-img" src="https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260701-180125-c1ub.webp" alt="\u795E\u65CF\u4E5D\u5E1D" />',text:"\u795E\u65CF\u4E5D\u5E1D"},Ue="2.2rem",W="user-avatar",$e="https://unpkg.com/@wu529778790/user-avatar@latest/dist/user-avatar.wc.js",_t=15e3,G=null;function Ut(o){return customElements.get(W)?Promise.resolve(!0):(G||(G=new Promise(e=>{let t=document.createElement("script");t.src=o||$e,t.async=!0,t.onload=()=>{let n=customElements.whenDefined(W).then(()=>!0,()=>!1),i=new Promise(r=>setTimeout(()=>r(!1),_t));Promise.race([n,i]).then(e)},t.onerror=()=>e(!1),(document.head||document.documentElement).appendChild(t)})),G.then(e=>(e||(G=null),e)))}var $t={primary:"light-dark(#1f2328, #e6edf3)",secondary:"light-dark(#656d76, #8b949e)",accent:"light-dark(#1a6dff, #4d9fff)",hoverBg:"light-dark(rgba(31, 35, 40, 0.06), rgba(255, 255, 255, 0.08))",bg:"light-dark(rgba(255, 255, 255, 0.55), rgba(28, 31, 36, 0.55))",border:"light-dark(rgba(27, 31, 36, 0.14), rgba(255, 255, 255, 0.14))",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'},D=class{constructor(e={},t=document.body){this.avatarEl=null;this.toggleEl=null;this.mobileEl=null;this.mobileOpen=!1;this.onDocClick=e=>{if(!this.mobileOpen)return;let t=e.target;!this.root.contains(t)&&!(this.mobileEl&&this.mobileEl.contains(t))&&this.setMobileOpen(!1)};this.onKeyDown=e=>{e.key==="Escape"&&this.mobileOpen&&this.setMobileOpen(!1)};this.onResize=()=>{this.mobileOpen&&window.innerWidth>this.opts.breakpoint&&this.setMobileOpen(!1)};this.onScroll=()=>{this.mobileOpen&&this.updateMobilePosition()};this.container=t,this.opts=this.resolve(e),this.root=document.createElement("div"),this.root.className="sn-root"}static check(){let e=customElements.get(W);return e&&typeof e.check=="function"?e.check():window.WxAuth?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(e){return this.root.isConnected?this:(e?e.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),_e(this.opts.wxAuth),this)}unmount(){this.destroy()}destroy(){this.avatarEl?.remove(),this.avatarEl=null,this.mobileEl&&this.mobileEl.parentElement&&this.mobileEl.parentElement.removeChild(this.mobileEl),this.mobileEl=null,document.removeEventListener("click",this.onDocClick),document.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),window.removeEventListener("scroll",this.onScroll,!0),this.root.remove()}resolve(e){return{links:e.links??Nt,brand:e.brand??Ft,avatar:e.avatar??!0,avatarOptions:{size:Ue,...e.avatarOptions??{},theme:{size:Ue,...e.avatarOptions?.theme??{}},fixed:!1},theme:{...$t,...e.theme??{}},breakpoint:e.breakpoint??768,portalEl:e.portalEl??document.body,onNavigate:e.onNavigate,wxAuth:e.wxAuth??{}}}applyTheme(){let e=this.opts.theme,t=this.root.style;t.setProperty("--sn-primary",e.primary),t.setProperty("--sn-secondary",e.secondary),t.setProperty("--sn-accent",e.accent),t.setProperty("--sn-hover-bg",e.hoverBg),t.setProperty("--sn-bg",e.bg),t.setProperty("--sn-border",e.border),t.setProperty("--sn-radius",e.radius),t.setProperty("--sn-font-family",e.fontFamily)}render(){this.root.innerHTML="";let e=this.computeActiveHref(),t=document.createElement("div");t.className="sn-bar",this.opts.brand&&t.appendChild(this.renderBrand(this.opts.brand));let n=document.createElement("nav");n.className="sn-links";for(let s of this.opts.links)n.appendChild(this.renderLink(s,s.href===e));if(t.appendChild(n),this.opts.avatar){let s=document.createElement("div");s.className="sn-avatar",t.appendChild(s);let l=document.createElement(W),{src:c,...d}=this.opts.avatarOptions;l.props=d,s.appendChild(l),this.avatarEl=l,Ut(c).then(u=>{u||console.warn(`[site-navbar] <user-avatar> \u52A0\u8F7D\u5931\u8D25\uFF0C\u5934\u50CF\u672A\u6E32\u67D3\uFF1A${c||$e}`)})}let i=document.createElement("button");i.className="sn-toggle",i.type="button",i.setAttribute("aria-label","\u83DC\u5355"),i.setAttribute("aria-expanded","false"),i.innerHTML=re,i.addEventListener("click",s=>{s.stopPropagation(),this.setMobileOpen(!this.mobileOpen)}),t.appendChild(i),this.toggleEl=i,this.root.appendChild(t);let r=document.createElement("div");r.className="sn-mobile",r.setAttribute("role","menu"),r.setAttribute("aria-hidden","true");for(let s of this.opts.links)r.appendChild(this.renderLink(s,s.href===e));let a=document.createElement("style");a.setAttribute("data-sn-portal-styles",""),a.textContent=$,r.appendChild(a),this.opts.portalEl.appendChild(r),this.mobileEl=r,document.addEventListener("click",this.onDocClick),document.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),window.addEventListener("scroll",this.onScroll,!0)}renderBrand(e){let t=document.createElement("a");t.className="sn-brand";let n=e.href??window.location.origin;t.href=ie(n);try{new URL(n,window.location.href).origin===window.location.origin?t.target="_self":(t.target="_blank",t.rel="noopener noreferrer")}catch{t.target="_blank",t.rel="noopener noreferrer"}if(e.icon){let i=document.createElement("span");i.className="sn-brand-icon",i.innerHTML=e.icon,t.appendChild(i)}return e.text&&t.appendChild(document.createTextNode(e.text)),t}renderLink(e,t){let n=document.createElement("a");if(n.className="sn-link",n.href=ie(e.href),n.target="_blank",n.rel="noopener noreferrer",t&&n.classList.add("sn-active"),n.setAttribute("aria-current",t?"page":"false"),e.icon){let i=document.createElement("span");i.className="sn-link-icon",i.innerHTML=e.icon,n.appendChild(i)}return n.appendChild(document.createTextNode(e.label)),n.addEventListener("click",i=>this.opts.onNavigate?.(e,i)),n}computeActiveHref(){for(let e of this.opts.links)if(e.active===!0)return e.href;for(let e of this.opts.links)if(e.active!==!1&&oe(e.href)==="exact")return e.href;return null}setMobileOpen(e){this.mobileOpen=e,this.mobileEl&&(this.mobileEl.classList.toggle("sn-open",e),this.mobileEl.setAttribute("aria-hidden",String(!e)),e&&this.updateMobilePosition()),this.toggleEl&&(this.toggleEl.setAttribute("aria-expanded",String(e)),this.toggleEl.innerHTML=e?Ie:re)}updateMobilePosition(){if(!this.mobileEl)return;let e=this.root.getBoundingClientRect(),t=this.mobileEl.style;t.position="fixed",t.top=`${Math.round(e.bottom+8)}px`,t.left="16px",t.right="16px",t.width="auto"}};var se="site-navbar",Wt="__SITE_NAVBAR_OPTIONS__";function Gt(){return window[Wt]}function We(o,e,t){let n=o.getAttribute(e);return n===null?t:n===""||n==="true"||n==="1"}var Ge=[["theme-primary","primary"],["theme-secondary","secondary"],["theme-accent","accent"],["theme-hover-bg","hoverBg"],["theme-bg","bg"],["theme-border","border"],["theme-radius","radius"],["theme-font-family","fontFamily"]],O=class extends HTMLElement{constructor(){super();this.widget=null;this.shadow=this.attachShadow({mode:"open"});let t=document.createElement("style");t.textContent=$,this.shadow.appendChild(t)}static get observedAttributes(){return["brand","brand-icon","avatar","avatar-src","links","wx-auth-enabled",...Ge.map(([t])=>t)]}connectedCallback(){this.mountWidget()}disconnectedCallback(){this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.mountWidget()}mountWidget(){this.widget?.unmount(),this.widget=new D(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let t=Gt()??{},n=w=>this.getAttribute(w),i={};for(let[w,De]of Ge){let le=n(w);le!==null&&(i[De]=le)}let r=t.brand,a=n("brand");a!==null&&(r={...t.brand??{},text:a});let s=n("brand-icon");s!==null&&(r={...r??{},icon:s});let l=t.links,c=n("links");if(c!==null)try{let w=JSON.parse(c);Array.isArray(w)&&(l=w)}catch{}let d=t.avatarOptions,u=n("avatar-src");u!==null&&(d={...d??{},src:u});let h=t.wxAuth;return n("wx-auth-enabled")!==null&&(h={...h??{},enabled:We(this,"wx-auth-enabled",!0)}),{...t,links:l,brand:r,avatar:We(this,"avatar",t.avatar??!0),avatarOptions:d,wxAuth:h,theme:{...t.theme??{},...i},onNavigate:t.onNavigate}}};function Dt(){let o="data-sn-placeholder";if(document.getElementById(o))return;let e=document.createElement("style");e.id=o,e.textContent=`${se}:not(:defined) {
  display: block;
  height: var(--sn-navbar-height, 44px);
  box-sizing: border-box;
}`,(document.head||document.documentElement).appendChild(e)}customElements.get(se)||(Dt(),customElements.define(se,O));})();

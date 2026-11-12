(()=>{var nt={wechat:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/wp/1782738963299-5wrchz.jpg",title:"\u516C\u4F17\u53F7",desc:"\u5173\u6CE8\u516C\u4F17\u53F7\u9632\u5931\u8054"},donate:{src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260828-153016-d3e9.jpg",title:"\u5C0F\u7A0B\u5E8F",desc:""}},it={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},rt=[{href:"https://t.me/shenzjd_com",icon:"tg",title:"Telegram"},{href:"https://github.com/wu529778790",icon:"github",title:"GitHub"},{href:"https://x.com/shenzujiudi",icon:"x",title:"X"}],me={tg:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 10.2c-1.2.5-1.1 2.2.1 2.6l4.3 1.4 1.6 5.2c.3 1.1 1.7 1.4 2.5.6l2.4-2.4 4.5 3.3c1 .7 2.4.2 2.7-1L21.9 4.6zM8.6 13.5l8.7-5.4c.1-.1.3.1.2.2l-6.8 6.7c-.2.2-.3.4-.4.7l-.5 2.6c0 .1-.2.1-.2 0l-.9-4.7c-.1-.1 0-.2 0-.1z"/></svg>',github:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.1 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1.1 16.1h1.7L8.1 4.7H6.3L16.4 19.1z"/></svg>'};function ot(i,t){return i?me[i]?me[i]:/^[a-z][a-z0-9+.-]*:\/\//i.test(i)||i.startsWith("data:")?`<img class="fq-link-img" src="${b(i)}" alt="" loading="lazy" />`:i.includes("<")?i:f(i.slice(0,1)):f((t||"\u2022").slice(0,1))}var ge="floating-qr:closed",at="(max-width: 767px)";function st(){return typeof window>"u"?!1:window.matchMedia?.(at)?.matches??!1}function lt(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(ge)==="1"}catch{return!1}}function dt(){if(!(typeof localStorage>"u"))try{localStorage.setItem(ge,"1")}catch{}}var H=class i{constructor(t={},e=document.body){this.el=null;this.closeBtn=null;this.handleClose=()=>{this.close()};this.opts=this.resolve(t),!(this.opts.hideOnMobile&&st())&&(this.opts.closePersistence&&lt()||this.render(e))}isMounted(){return this.el!==null&&this.el.isConnected}close(){this.opts.closePersistence&&dt(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.remove(),this.el=null}update(t){this.destroy();let e=new i(t);this.opts.theme=e.opts.theme,this.opts.themeOverrides=e.opts.themeOverrides,this.opts.position=e.opts.position,this.opts.closePersistence=e.opts.closePersistence,this.opts.hideOnMobile=e.opts.hideOnMobile,this.opts.zIndex=e.opts.zIndex,this.opts.wechat=e.opts.wechat,this.opts.donate=e.opts.donate,this.opts.links=e.opts.links,this.el=e.el,this.closeBtn=e.closeBtn}resolve(t){let e=(n,r)=>{let o=nt[r];return{src:n?.src??o.src,title:n?.title??o.title,desc:n?.desc??o.desc}};return{wechat:e(t.wechat,"wechat"),donate:e(t.donate,"donate"),position:t.position??"right-center",closePersistence:t.closePersistence??!1,hideOnMobile:t.hideOnMobile??!0,zIndex:t.zIndex??9999,theme:{...it,...t.theme??{}},themeOverrides:t.theme??{},links:t.links??rt}}render(t=document.body){let{wechat:e,donate:n,position:r,zIndex:o,themeOverrides:a,links:l}=this.opts,s=document.createElement("div");s.className="fq-widget",s.dataset.position=r,s.style.zIndex=String(o);let c=[["--fq-bg",a.bg],["--fq-accent",a.accent],["--fq-radius",a.radius],["--fq-border",a.border]];for(let[d,h]of c)h!==void 0&&s.style.setProperty(d,h);s.innerHTML=`
      <button class="fq-close" type="button" aria-label="\u5173\u95ED\u6D6E\u7A97">${ct}</button>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${b(e.src)}" alt="${b(e.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${f(e.title)}</p>
        ${e.desc?`<p class="fq-desc">${f(e.desc)}</p>`:""}
      </div>
      ${n?`<div class="fq-divider" role="separator"></div>
      <div class="fq-section">
        <div class="fq-qr">
          <img class="fq-img" src="${b(n.src)}" alt="${b(n.title)}" loading="lazy" />
        </div>
        <p class="fq-label">${f(n.title)}</p>
        ${n.desc?`<p class="fq-desc">${f(n.desc)}</p>`:""}
      </div>`:""}
      ${l.length?`<div class="fq-links">${l.map(d=>`
        <a class="fq-link" href="${b(d.href)}" title="${b(d.title??"")}" target="_blank" rel="noopener noreferrer">${ot(d.icon,d.title)}</a>`).join("")}
        </div>`:""}
    `,this.closeBtn=s.querySelector(".fq-close"),this.closeBtn?.addEventListener("click",this.handleClose),t.appendChild(s),this.el=s}},ct='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function f(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function b(i){return f(i)}var fe=`.fq-widget {
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
`;var R="floating-qr",ht="__FLOATING_QR_OPTIONS__",be="__floatingQrAutoInjected__",pt="(max-width: 767px)";function mt(){return window[ht]}function ve(i,t,e){let n=i.getAttribute(t);return n===null?e:n===""||n==="true"||n==="1"}function gt(i,t,e){let n=i.getAttribute(t);if(n===null||n==="")return e;let r=Number(n);return Number.isFinite(r)?r:e}var xe=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]];function ft(i){if(i===null)return null;let t=i.trim().toLowerCase();return t===""||t==="none"||t==="off"?[]:i.split(",").map(e=>e.trim()).filter(Boolean).map(e=>{let n=/github\.com/i.test(e)?"github":/t\.me/i.test(e)?"tg":/x\.com|twitter\.com/i.test(e)?"x":void 0;return{href:e,icon:n,title:n}})}var k=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=fe,this.shadow.appendChild(e)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","wechat-src","wechat-title","wechat-desc","donate-src","donate-title","donate-desc","link-hrefs",...xe.map(([e])=>e)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}render(){if(!this.isConnected)return;let e=this.buildOptions();e.hideOnMobile&&window.matchMedia?.(pt)?.matches||(this.widget?.destroy(),this.widget=new H(e,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let e=mt()??{},n=s=>this.getAttribute(s),r={};for(let[s,c]of xe){let d=n(s);d!==null&&(r[c]=d)}let o=(s,c)=>{let d=n(`${s}-src`),h=n(`${s}-title`),u=n(`${s}-desc`);if(d===null&&h===null&&u===null)return c;let p={};return d!==null&&(p.src=d),h!==null&&(p.title=h),u!==null&&(p.desc=u),p},a=n("link-hrefs"),l=ft(a);return{...e,position:n("position")??e.position,closePersistence:ve(this,"close-persistence",e.closePersistence??!1),hideOnMobile:ve(this,"hide-on-mobile",e.hideOnMobile??!0),zIndex:gt(this,"z-index",e.zIndex??9999),theme:{...e.theme??{},...r},wechat:o("wechat",e.wechat),donate:o("donate",e.donate),links:l??e.links}}};function we(){if(document.documentElement?.getAttribute("data-fq-auto")==="false"||document.querySelector(R)||window[be])return;window[be]=!0;let t=document.createElement(R);document.body.appendChild(t)}customElements.get(R)||(customElements.define(R,k),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",we):we());var bt={bg:"rgba(255, 255, 255, 0.96)",accent:"#333",radius:"12px",border:"rgba(0, 0, 0, 0.1)"},ye="floating-ad:closed",vt="(max-width: 767px)";function Y(){return typeof window>"u"?!1:window.matchMedia?.(vt)?.matches??!1}function ke(){if(typeof localStorage>"u")return!1;try{return localStorage.getItem(ye)==="1"}catch{return!1}}function xt(){if(!(typeof localStorage>"u"))try{localStorage.setItem(ye,"1")}catch{}}function wt(i){return!!(i&&typeof i=="object"&&i.src?.trim())}function Ee(i){return{ads:(Array.isArray(i.ads)?i.ads:[]).filter(wt),position:i.position??(Y()?"left-bottom":"left-center"),closePersistence:i.closePersistence??!1,hideOnMobile:i.hideOnMobile??!1,zIndex:i.zIndex??9999,adLabel:i.adLabel===void 0?!1:i.adLabel,imageFit:i.imageFit==="contain"?"contain":"cover",sizeOverrides:{width:Number.isFinite(i.width)?Math.max(80,Number(i.width)):void 0,offset:Number.isFinite(i.offset)?Math.max(0,Number(i.offset)):void 0,imageSize:Number.isFinite(i.imageSize)?Math.max(40,Number(i.imageSize)):void 0},theme:{...bt,...i.theme??{}},themeOverrides:i.theme??{},onClick:i.onClick}}var T=class{constructor(t={},e=document.body){this.el=null;this.closeBtn=null;this.rendered=[];this.handleClose=()=>{this.close()};this.handleImageError=t=>{let e=t.target;if(!e||e.tagName!=="IMG"||!e.classList.contains("fa-img"))return;let n=e.closest(".fa-media");if(!n)return;n.classList.add("fa-media--failed");let r=n.closest(".fa-item");r&&!r.querySelector(".fa-body")&&r.classList.add("fa-item--failed")};this.handleItemClick=t=>{if(!this.opts.onClick)return;let n=t.target?.closest?.(".fa-item");if(!n)return;let r=Number(n.dataset.index),o=this.rendered[r];o&&this.opts.onClick(o,t)};this.opts=Ee(t),this.container=e,!(this.opts.hideOnMobile&&Y())&&(this.opts.closePersistence&&ke()||this.render())}isMounted(){return this.el!==null&&this.el.isConnected}open(){this.isMounted()||this.render()}close(){this.opts.closePersistence&&xt(),this.destroy()}destroy(){this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.el?.removeEventListener("click",this.handleItemClick),this.el?.removeEventListener("error",this.handleImageError,!0),this.el?.remove(),this.el=null,this.rendered=[]}update(t){this.destroy(),this.opts=Ee(t),!(this.opts.hideOnMobile&&Y())&&(this.opts.closePersistence&&ke()||this.render())}render(){let{ads:t,position:e,zIndex:n,themeOverrides:r,adLabel:o,imageFit:a,sizeOverrides:l}=this.opts;if(t.length===0)return;let s=document.createElement("div");s.className="fa-widget",s.dataset.position=e,s.style.zIndex=String(n),s.style.setProperty("--fa-img-fit",a),l.width!==void 0&&s.style.setProperty("--fa-width",`${l.width}px`),l.offset!==void 0&&s.style.setProperty("--fa-offset",`${l.offset}px`),l.imageSize!==void 0&&s.style.setProperty("--fa-img-size",`${l.imageSize}px`);let c=[["--fa-bg",r.bg],["--fa-accent",r.accent],["--fa-radius",r.radius],["--fa-border",r.border]];for(let[h,u]of c)u!==void 0&&s.style.setProperty(h,u);let d=o?E(String(o)):"";s.innerHTML=`
      <button class="fa-close" type="button" aria-label="\u5173\u95ED\u5E7F\u544A">${yt}</button>
      ${t.map((h,u)=>this.renderItem(h,u,u===0?d:"")).join('<div class="fa-divider" role="separator"></div>')}
    `,this.closeBtn=s.querySelector(".fa-close"),this.closeBtn?.addEventListener("click",this.handleClose),s.addEventListener("click",this.handleItemClick),s.addEventListener("error",this.handleImageError,!0),this.rendered=t,this.container.appendChild(s),this.el=s}renderItem(t,e,n){let r=`<span class="fa-media">
        <img class="fa-img" src="${K(t.src)}" alt="${K(t.alt??t.title??"")}" loading="lazy" decoding="async" />
        ${t.badge?`<span class="fa-tag">${E(t.badge)}</span>`:""}
        ${n?`<span class="fa-label">${n}</span>`:""}
      </span>`,o=t.title||t.desc?`<span class="fa-body">
            ${t.title?`<span class="fa-title">${E(t.title)}</span>`:""}
            ${t.desc?`<span class="fa-desc">${E(t.desc)}</span>`:""}
          </span>`:"",a=`${r}${o}`,l=t.href?kt(t.href):null;if(l){let s=t.target==="_self"?"_self":"_blank",c=s==="_blank"?' rel="noopener noreferrer nofollow sponsored"':' rel="nofollow sponsored"';return`<a class="fa-item" href="${K(l)}" target="${s}"${c} data-index="${e}">${a}</a>`}return`<div class="fa-item" data-index="${e}">${a}</div>`}},yt='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function kt(i){let t=i.trim();if(!t)return null;let e=t.replace(/[\s\u0000-\u001f]/g,"").toLowerCase();return/^(javascript|data|vbscript|file):/.test(e)?null:t}function E(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function K(i){return E(i)}var Te=`.fa-widget {
  --fa-bg: rgba(255, 255, 255, 0.96);
  --fa-accent: #333;
  --fa-radius: 12px;
  --fa-border: rgba(0, 0, 0, 0.1);
  --fa-offset: 16px;
  --fa-width: 150px;
  --fa-img-size: 120px;
  --fa-img-fit: cover;

  position: fixed;
  z-index: 9999;
  box-sizing: border-box;
  width: var(--fa-width);
  padding: 14px;
  background: var(--fa-bg);
  border: 1px solid var(--fa-border);
  border-radius: var(--fa-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  color: var(--fa-accent);
  line-height: 1.5;
  color-scheme: light dark;
  transition: box-shadow 0.2s ease;
}

.fa-widget:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.fa-widget[data-position="right-bottom"] {
  right: var(--fa-offset);
  bottom: var(--fa-offset);
}

.fa-widget[data-position="right-top"] {
  right: var(--fa-offset);
  top: var(--fa-offset);
}

.fa-widget[data-position="left-bottom"] {
  left: var(--fa-offset);
  bottom: var(--fa-offset);
}

.fa-widget[data-position="left-top"] {
  left: var(--fa-offset);
  top: var(--fa-offset);
}

.fa-widget[data-position="right-center"] {
  right: var(--fa-offset);
  top: 50%;
  transform: translateY(-50%);
}

.fa-widget[data-position="left-center"] {
  left: var(--fa-offset);
  top: 50%;
  transform: translateY(-50%);
}

.fa-close {
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

.fa-close:hover {
  color: rgba(0, 0, 0, 0.7);
}

/* \u89E6\u5C4F\u8BBE\u5907\uFF08\u65E0 hover\uFF09\uFF1A\u5173\u95ED\u6309\u94AE\u5E38\u663E\uFF0C\u4FDD\u8BC1\u53EF\u5173\u95ED */
.fa-close {
  opacity: 1;
}

/* \u652F\u6301 hover \u7684\u8BBE\u5907\uFF08\u9F20\u6807\uFF09\uFF1A\u5E73\u65F6\u9690\u85CF\uFF0C\u60AC\u505C\u5361\u7247\u65F6\u6D6E\u73B0 */
@media (hover: hover) and (pointer: fine) {
  .fa-close {
    opacity: 0;
    pointer-events: none;
  }
  .fa-widget:hover .fa-close,
  .fa-close:focus-visible {
    opacity: 1;
    pointer-events: auto;
  }
}

/* \u300C\u5E7F\u544A\u300D\u6807\u8BC6\uFF1A\u538B\u5728\u9996\u56FE\u5DE6\u4E0A\u89D2\uFF0C\u4E0D\u5360\u6392\u7248\u884C\u9AD8
   \uFF08\u300A\u5E7F\u544A\u6CD5\u300B\u8981\u6C42\u5E7F\u544A\u53EF\u8BC6\u522B\uFF0C\u6807\u8BC6\u4FDD\u7559\uFF0C\u4F46\u4E0D\u5FC5\u5355\u72EC\u5360\u4E00\u884C\uFF09 */
.fa-label {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 1;
  display: inline-block;
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.06em;
  padding: 3px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.45);
  color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  pointer-events: none;
}

.fa-item {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
}

a.fa-item {
  cursor: pointer;
}

/* \u56FE\u7247\u56FA\u5B9A\u65B9\u5F62\uFF08\u9ED8\u8BA4 120\xD7120\uFF0C\u4E0E\u53F3\u4FA7\u516C\u4F17\u53F7\u6D6E\u7A97\u7684\u4E8C\u7EF4\u7801\u5C3A\u5BF8\u4E00\u81F4\uFF09 */
.fa-media {
  position: relative;
  display: block;
  width: var(--fa-img-size, 120px);
  height: var(--fa-img-size, 120px);
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.04);
}

.fa-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: var(--fa-img-fit, cover);
  transition: transform 0.25s ease;
}

a.fa-item:hover .fa-img {
  transform: scale(1.04);
}

/* \u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A\u9690\u85CF\u7A7A\u56FE\u6846\uFF0C\u53EA\u7559\u6587\u5B57\uFF1B\u8FDE\u6587\u5B57\u90FD\u6CA1\u6709\u5C31\u6574\u6761\u9690\u85CF */
.fa-media--failed,
.fa-item--failed {
  display: none;
}

.fa-tag {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 1px 6px;
  font-size: 10px;
  line-height: 1.5;
  border-radius: 999px;
  background: var(--fa-accent);
  color: var(--fa-bg);
}

.fa-body {
  display: block;
  margin-top: 8px;
  text-align: left;
}

.fa-item > .fa-body:first-child {
  margin-top: 0;
}

.fa-title {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--fa-accent);
}

.fa-desc {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
}

.fa-divider {
  height: 1px;
  margin: 10px 0;
  background: var(--fa-border);
}

/* \u79FB\u52A8\u7AEF\uFF1A\u6BD4\u684C\u9762\u7565\u5C0F\u4E00\u53F7\uFF08\u5361\u7247 140 / \u56FE\u7247 112 / \u8DDD\u8FB9 12\uFF09\uFF0C\u7F3A\u7701\u843D\u5728\u5DE6\u4E0B\u89D2 */
@media (max-width: 767px) {
  .fa-widget {
    --fa-width: 140px;
    --fa-img-size: 112px;
    --fa-offset: 12px;
    padding: 13px;
  }

  /* \u89E6\u5C4F\u70B9\u6309\u533A\u57DF\u7A0D\u653E\u5927 */
  .fa-close {
    width: 24px;
    height: 24px;
  }
}

/* \u8DDF\u968F\u7CFB\u7EDF\u6DF1\u8272\u6A21\u5F0F \u2014\u2014 \u5FC5\u987B\u653E\u6587\u4EF6\u672B\u5C3E\uFF0C\u786E\u4FDD\u4F18\u5148\u7EA7\u9AD8\u4E8E\u4E0A\u9762\u7684\u6D45\u8272\u89C4\u5219
   (\u4EC5\u5F71\u54CD\u9ED8\u8BA4\u503C\uFF1B\u7528\u6237\u663E\u5F0F\u8BBE\u7F6E\u7684 --fa-* inline \u53D8\u91CF\u4ECD\u4F18\u5148) */
@media (prefers-color-scheme: dark) {
  .fa-widget {
    --fa-bg: rgba(28, 28, 30, 0.96);
    --fa-accent: rgba(255, 255, 255, 0.92);
    --fa-border: rgba(255, 255, 255, 0.14);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  }

  .fa-widget:hover {
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.6);
  }

  .fa-media {
    background: rgba(255, 255, 255, 0.06);
  }

  .fa-close {
    color: rgba(255, 255, 255, 0.4);
  }

  .fa-close:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .fa-desc {
    color: rgba(255, 255, 255, 0.55);
  }
}
`;var q="floating-ad",Tt="__FLOATING_AD_OPTIONS__",Ae="__floatingAdAutoInjected__",At="(max-width: 767px)";function Le(){return window[Tt]}function Se(i,t,e){let n=i.getAttribute(t);return n===null?e:n===""||n==="true"||n==="1"}function Lt(i,t,e){let n=i.getAttribute(t);if(n===null||n==="")return e;let r=Number(n);return Number.isFinite(r)?r:e}function V(i,t){let e=i.getAttribute(t);if(e===null||e==="")return;let n=Number(e);return Number.isFinite(n)?n:void 0}var Me=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"]];function St(i){if(i===null)return null;let t=i.trim();if(!t)return null;try{let e=JSON.parse(t);if(Array.isArray(e))return e;if(e&&typeof e=="object")return[e]}catch{}return null}function Mt(i,t){if(i===null)return t;let e=i.trim();return!e||e==="true"?"\u5E7F\u544A":/^(false|none|off|0)$/i.test(e)?!1:e}var A=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=Te,this.shadow.appendChild(e)}static get observedAttributes(){return["position","close-persistence","hide-on-mobile","z-index","ad-label","width","offset","image-fit","image-size","ad-src","ad-title","ad-desc","ad-href","ad-target","ad-badge","ads-json",...Me.map(([e])=>e)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}open(){this.widget?.isMounted()||(this.widget?.destroy(),this.widget=new T(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){if(!this.isConnected)return;let e=this.buildOptions();e.hideOnMobile&&window.matchMedia?.(At)?.matches||(this.widget?.destroy(),this.widget=new T(e,this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let e=Le()??{},n=d=>this.getAttribute(d),r={};for(let[d,h]of Me){let u=n(d);u!==null&&(r[h]=u)}let o=St(n("ads-json")),a=this.readSingleAd(),l=o??(a?[a]:e.ads),s=n("image-fit"),c=s==="contain"||s==="cover"?s:e.imageFit;return{...e,ads:l,position:n("position")??e.position,closePersistence:Se(this,"close-persistence",e.closePersistence??!1),hideOnMobile:Se(this,"hide-on-mobile",e.hideOnMobile??!1),zIndex:Lt(this,"z-index",e.zIndex??9999),width:V(this,"width")??e.width,offset:V(this,"offset")??e.offset,imageFit:c,imageSize:V(this,"image-size")??e.imageSize,adLabel:Mt(n("ad-label"),e.adLabel??!1),theme:{...e.theme??{},...r}}}readSingleAd(){let e=this.getAttribute("ad-src");if(e===null||!e.trim())return null;let n=this.getAttribute("ad-title"),r=this.getAttribute("ad-desc"),o=this.getAttribute("ad-href"),a=this.getAttribute("ad-badge"),l=this.getAttribute("ad-target"),s={src:e};return n!==null&&(s.title=n),r!==null&&(s.desc=r),o!==null&&(s.href=o),a!==null&&(s.badge=a),(l==="_self"||l==="_blank")&&(s.target=l),s}};function Oe(){if(document.documentElement?.getAttribute("data-fa-auto")==="false"||document.querySelector(q)||window[Ae]||!Le())return;window[Ae]=!0;let t=document.createElement(q);document.body.appendChild(t)}customElements.get(q)||(customElements.define(q,A),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Oe):Oe());var Ot="\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u625B\u4E0D\u4F4F\u4E86\uFF0C\u5982\u679C\u672C\u7AD9\u5BF9\u4F60\u6709\u7528\u5C31\u652F\u6301\u4E00\u4E0B\uFF0C\u8BA9\u5B83\u518D\u591A\u625B\u51E0\u5929\u3002",Ct={src:"https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260817-165134-105w.png",alt:"\u8D5E\u8D4F\u7801"},zt={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},L=class{constructor(t={},e=document.body){this.mask=null;this.closeBtn=null;this.timer=null;this.escHandler=null;this.handleClose=()=>{this.close()};this.handleMaskClick=t=>{t.target===this.mask&&this.close()};this.opts=this.resolve(t),this.container=e;let n=()=>this.render();this.opts.delay>0?this.timer=setTimeout(n,this.opts.delay):n()}isOpen(){return this.mask!==null&&this.mask.isConnected}show(){this.isOpen()||(this.timer&&(clearTimeout(this.timer),this.timer=null),this.render())}close(){this.destroy(),this.opts.onClose?.()}destroy(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.closeBtn?.removeEventListener("click",this.handleClose),this.closeBtn=null,this.mask?.remove(),this.mask=null}resolve(t){let e=t.qr??Ct;return{title:t.title??"\u5C0F\u6C34\u7BA1\u8BF7\u6C42\u652F\u63F4",content:t.content??Ot,contentHtml:t.contentHtml??"",qr:{src:e.src,alt:e.alt??"\u8D5E\u8D4F\u7801"},width:t.width??380,maskClosable:t.maskClosable??!0,closeOnEsc:t.closeOnEsc??!0,showClose:t.showClose??!0,delay:t.delay??0,zIndex:t.zIndex??1e4,theme:{...zt,...t.theme??{}},onClose:t.onClose}}render(){let{width:t,zIndex:e,theme:n,showClose:r,maskClosable:o}=this.opts,a=document.createElement("div");a.className="fm-mask",a.style.zIndex=String(e),a.style.setProperty("--fm-overlay",n.overlay),a.style.setProperty("--fm-bg",n.bg),a.style.setProperty("--fm-accent",n.accent),a.style.setProperty("--fm-radius",n.radius),a.style.setProperty("--fm-border",n.border),a.style.setProperty("--fm-title-color",n.titleColor),a.style.setProperty("--fm-text-color",n.textColor),a.style.setProperty("--fm-width",`${t}px`),o&&a.addEventListener("click",this.handleMaskClick),a.innerHTML=`
      <div class="fm-modal" role="dialog" aria-modal="true" aria-label="${X(this.opts.title)}">
        ${r?`<button class="fm-close" type="button" aria-label="\u5173\u95ED\u5F39\u7A97">${Ht}</button>`:""}
        <p class="fm-title">${J(this.opts.title)}</p>
        <div class="fm-content">${this.buildContent()}</div>
        ${this.buildQR()}
      </div>
    `,this.closeBtn=a.querySelector(".fm-close"),this.closeBtn?.addEventListener("click",this.handleClose),this.container.appendChild(a),this.mask=a,this.opts.closeOnEsc&&(this.escHandler=l=>{l.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler))}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:J(this.opts.content).replace(/\n/g,"<br>")}buildQR(){let{qr:t}=this.opts;return`
      <div class="fm-qr">
        <img class="fm-qr-img" src="${X(t.src)}" alt="${X(t.alt)}" loading="lazy" />
      </div>
    `}},Ht='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';function J(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function X(i){return J(i)}var Ce=`.fm-mask {
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
`;var F="floating-modal",qt="__FLOATING_MODAL_OPTIONS__",ze="__floatingModalAutoInjected__";function Ft(){return window[qt]}function I(i,t,e){let n=i.getAttribute(t);return n===null?e:n===""||n==="true"||n==="1"}function Z(i,t,e){let n=i.getAttribute(t);if(n===null||n==="")return e;let r=Number(n);return Number.isFinite(r)?r:e}var He=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],S=class extends HTMLElement{constructor(){super();this.widget=null;this.raf=0;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=Ce,this.shadow.appendChild(e)}static get observedAttributes(){return["auto-show","title","content","content-html","qr-src","qr-alt","width","mask-closable","close-on-esc","show-close","delay","z-index",...He.map(([e])=>e)]}connectedCallback(){this.renderSoon()}disconnectedCallback(){cancelAnimationFrame(this.raf),this.widget?.destroy(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.renderSoon()}show(){this.widget?.isOpen()||(this.widget?.destroy(),this.widget=new L(this.buildOptions(),this.shadow))}close(){this.widget?.close()}render(){this.isConnected&&I(this,"auto-show",!0)&&(this.widget?.destroy(),this.widget=new L(this.buildOptions(),this.shadow))}renderSoon(){cancelAnimationFrame(this.raf),this.raf=requestAnimationFrame(()=>this.render())}buildOptions(){let e=Ft()??{},n=s=>this.getAttribute(s),r={};for(let[s,c]of He){let d=n(s);d!==null&&(r[c]=d)}let o=n("qr-src"),a=n("qr-alt"),l=o===null&&a===null?e.qr:{src:o??e.qr?.src??"",alt:a??e.qr?.alt};return{...e,title:n("title")??e.title,content:n("content")??e.content,contentHtml:n("content-html")??e.contentHtml,qr:l,width:Z(this,"width",e.width??380),maskClosable:I(this,"mask-closable",e.maskClosable??!0),closeOnEsc:I(this,"close-on-esc",e.closeOnEsc??!0),showClose:I(this,"show-close",e.showClose??!0),delay:Z(this,"delay",e.delay??0),zIndex:Z(this,"z-index",e.zIndex??1e4),theme:{...e.theme??{},...r}}}};function Re(){if(document.documentElement?.getAttribute("data-fm-auto")==="false"||document.querySelector(F)||window[ze])return;window[ze]=!0;let t=document.createElement(F);document.body.appendChild(t)}customElements.get(F)||(customElements.define(F,S),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Re):Re());var It="https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/reward-unlock-qr.jpg",Nt="\u5E2E\u5E2E\u5C0F\u6C34\u7BA1\u670D\u52A1\u5668\u5427",Pt="\u670D\u52A1\u5668\u6210\u672C\u4E0D\u5C0F\uFF0C\u5982\u679C\u89C9\u5F97\u597D\u7528\uFF0C\u5FAE\u4FE1\u626B\u7801\u770B\u4E2A\u89C6\u9891\u652F\u6301\u4E00\u4E0B\u5427\u3002",Sn="",Bt="\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u5C0F\u7A0B\u5E8F\u5185\u89C2\u770B\u89C6\u9891",_t="\u4E0B\u6B21\u4E00\u5B9A",Ut="\u770B\u5B8C\u5566\uFF0C\u652F\u6301\u4F5C\u8005",$t={bg:"#fff",accent:"#185fa5",radius:"16px",border:"rgba(0, 0, 0, 0.1)",overlay:"rgba(0, 0, 0, 0.4)",titleColor:"#1f1f1f",textColor:"#555"},P=class{constructor(t={},e=document.body){this.mask=null;this.status="idle";this.escHandler=null;this.destroyed=!1;this.opts=this.resolve(t),this.container=e}getState(){return this.status}isOpen(){return this.mask!==null&&this.mask.isConnected}unlock(){return this.show(),Promise.resolve({ok:!0,ticket:null,grant:null})}show(){this.destroyed||this.isOpen()||(this.render(),this.status="open")}close(){this.teardown()}destroy(){this.destroyed=!0,this.teardown()}resolve(t){return{qrSrc:t.qrSrc??It,title:t.title??Nt,content:t.content??Pt,contentHtml:t.contentHtml??"",loadingText:t.loadingText??"",hint:t.hint??Bt,dismissText:t.dismissText??_t,confirmText:t.confirmText??Ut,hideActions:t.hideActions??!1,width:t.width??380,zIndex:t.zIndex??1e4,theme:{...$t,...t.theme??{}}}}render(){let{width:t,zIndex:e,theme:n}=this.opts,r=document.createElement("div");r.className="fu-mask",r.style.zIndex=String(e),r.style.setProperty("--fu-overlay",n.overlay),r.style.setProperty("--fu-bg",n.bg),r.style.setProperty("--fu-accent",n.accent),r.style.setProperty("--fu-radius",n.radius),r.style.setProperty("--fu-border",n.border),r.style.setProperty("--fu-title-color",n.titleColor),r.style.setProperty("--fu-text-color",n.textColor),r.style.setProperty("--fu-width",`${t}px`),r.innerHTML=`
      <div class="fu-modal" role="dialog" aria-modal="true" aria-label="${qe(this.opts.title)}">
        <button class="fu-close" type="button" aria-label="\u5173\u95ED">\xD7</button>
        <p class="fu-title">${v(this.opts.title)}</p>
        ${this.opts.loadingText?`<div class="fu-loading"><span class="fu-spinner" aria-hidden="true"></span><span class="fu-loading-text">${v(this.opts.loadingText)}</span></div>`:""}
        ${this.opts.content?`<div class="fu-content">${this.buildContent()}</div>`:""}
        <div class="fu-qr"><img class="fu-qr-img" alt="\u652F\u6301\u4E8C\u7EF4\u7801" src="${qe(this.opts.qrSrc)}" /></div>
        ${this.opts.hint?`<div class="fu-hint">${v(this.opts.hint)}</div>`:""}
        ${this.opts.hideActions?"":`<div class="fu-actions">
          <button class="fu-btn fu-btn-ghost" type="button">${v(this.opts.dismissText)}</button>
          <button class="fu-btn fu-btn-primary" type="button">${v(this.opts.confirmText)}</button>
        </div>`}
      </div>
    `,r.querySelector(".fu-close")?.addEventListener("click",()=>this.close()),r.querySelector(".fu-btn-ghost")?.addEventListener("click",()=>this.close()),r.querySelector(".fu-btn-primary")?.addEventListener("click",()=>this.close()),r.addEventListener("click",o=>{o.target===r&&this.close()}),this.escHandler=o=>{o.key==="Escape"&&this.close()},document.addEventListener("keydown",this.escHandler),this.container.appendChild(r),this.mask=r,Gt()}teardown(){this.escHandler&&(document.removeEventListener("keydown",this.escHandler),this.escHandler=null),this.mask?.remove(),this.mask=null,this.status="idle",Wt()}buildContent(){return this.opts.contentHtml?this.opts.contentHtml:v(this.opts.content).replace(/\n/g,"<br>")}},N=0,w=null;function Gt(){if(N+=1,w)return;let t=document.body.style;w={top:t.top,left:t.left,width:t.width,position:t.position,scrollY:window.scrollY},t.top=`-${w.scrollY}px`,t.left="0",t.width="100%",t.position="fixed"}function Wt(){if(N<=0||(N-=1,N>0||!w))return;let t=document.body.style,e=w;w=null,t.top=e.top,t.left=e.left,t.width=e.width,t.position=e.position,e.scrollY>0&&requestAnimationFrame(()=>window.scrollTo(0,e.scrollY))}function v(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qe(i){return v(i)}var Fe=`.fu-mask {
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
`;var Ie="floating-unlock",Dt="__FLOATING_UNLOCK_OPTIONS__";function Qt(){return window[Dt]}function Ne(i,t,e){let n=i.getAttribute(t);if(n===null||n==="")return e;let r=Number(n);return Number.isFinite(r)?r:e}var Pe=[["theme-bg","bg"],["theme-accent","accent"],["theme-radius","radius"],["theme-border","border"],["theme-overlay","overlay"],["theme-title-color","titleColor"],["theme-text-color","textColor"]],M=class extends HTMLElement{constructor(){super();this.widget=null;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=Fe,this.shadow.appendChild(e)}static get observedAttributes(){return["qr-src","title","content","content-html","loading-text","hint","btn-dismiss","btn-confirm","hide-actions","width","z-index",...Pe.map(([e])=>e)]}disconnectedCallback(){this.widget?.destroy(),this.widget=null}unlock(){return this.ensureWidget().show(),Promise.resolve({ok:!0,ticket:null,grant:null})}show(){this.ensureWidget().show()}close(){this.widget?.close()}ensureWidget(){return this.widget?.destroy(),this.widget=new P(this.buildOptions(),this.shadow),this.widget}buildOptions(){let e=Qt()??{},n=o=>this.getAttribute(o),r={};for(let[o,a]of Pe){let l=n(o);l!==null&&(r[a]=l)}return{...e,qrSrc:n("qr-src")??e.qrSrc,title:n("title")??e.title,content:n("content")??e.content,contentHtml:n("content-html")??e.contentHtml,loadingText:n("loading-text")??e.loadingText,hint:n("hint")??e.hint,dismissText:n("btn-dismiss")??e.dismissText,confirmText:n("btn-confirm")??e.confirmText,hideActions:this.hasAttribute("hide-actions")||e.hideActions===!0,width:Ne(this,"width",e.width??380),zIndex:Ne(this,"z-index",e.zIndex??1e4),theme:{...e.theme??{},...r}}}};customElements.get(Ie)||customElements.define(Ie,M);function ee(){if(typeof window<"u")return window.WxAuth}var B=`/* ============================================================
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
`;var _="wxauth-token",U="wxauth-openid",Be=/^[^.]+(?:\.w1)?\.[0-9]+\.[0-9a-f]{64}$/;function _e(i){return!i||i.length<20?!1:Be.test(i)}function O(){let i=document.cookie.split("; "),t=[],e=[];for(let r of i){let o=r.indexOf("=");if(o<0)continue;let a=r.slice(0,o).trim(),l=r.slice(o+1);a===_?t.push(l):a===U&&e.push(l)}return t.find(_e)||t[0]||e.find(_e)||e[0]||""}function te(){let i=window.location.hostname;if(i==="localhost"||/^\d+\.\d+\.\d+\.\d+$/.test(i))return"";let t=i.split(".");return t.length>=2?"."+t.slice(-2).join("."):""}function ne(){y(_,!1),y(_,!0),y(U,!1),y(U,!0)}function Ue(){let i=document.cookie.split("; ");for(let t of i){let e=t.indexOf("=");if(e<0)continue;let n=t.slice(0,e).trim();if(n!==_&&n!==U)continue;let r=t.slice(e+1);Be.test(r)||(y(n,!1),y(n,!0))}}function y(i,t){let e=t&&te()?`;domain=${te()}`:"",n=window.location.protocol==="https:"?";Secure":"";document.cookie=`${i}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${e}${n};SameSite=Strict`}function g(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $(i){return g(i)}var $e='<svg class="ua-icon-user" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>',Ge='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.533 1.533 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',We='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h4a1 1 0 110 2H4v12h4a1 1 0 110 2H4a1 1 0 01-1-1V3zm10.293 9.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293a1 1 0 000 1.414zM21 10a1 1 0 01-1-1v2a1 1 0 110 0v-2a1 1 0 011 0 1 1 0 010 1v-1h27a1 1 0 010 2H20a1 1 0 01-1-1v-2a1 1 0 010-1z" clip-rule="evenodd"/></svg>',ie='<svg class="ua-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',G='<svg class="ua-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" clip-rule="evenodd"/></svg>';var re={btnBg:"light-dark(#ffffff, #262a30)",size:"2.5rem",accent:"light-dark(#1f2328, #e6edf3)",btnBorder:"light-dark(rgba(27, 31, 36, 0.12), rgba(255, 255, 255, 0.14))",radius:"16px",bg:"light-dark(#ffffff, #1c1e22)",text:"light-dark(#1f2328, #e6edf3)",subText:"light-dark(#656d76, #8b949e)",overlay:"light-dark(rgba(31, 35, 40, 0.45), rgba(0, 0, 0, 0.6))",danger:"light-dark(#dc2626, #f85149)",success:"light-dark(#1a7f37, #3fb950)"},m=class{constructor(t={},e=document.body){this.user=null;this.status="checking";this.menuEl=null;this.settingsEl=null;this.menuCleanup=null;this.settingsCleanup=null;this.confirmEl=null;this.confirmCleanup=null;this.githubMsgListener=null;this.saving=!1;this.saveBtnTimer=null;this.nicknameDraft="";this.silentRefreshThrottle=3e4;this.lastSilentRefreshAt=0;this.cachedUser=null;this.cachedAt=0;this.cachedToken="";this.userCacheTtl=6e4;this.silentRefresh=()=>{let t=Date.now();t-this.lastSilentRefreshAt<this.silentRefreshThrottle||(this.lastSilentRefreshAt=t,this.fetchUser())};this.onWindowFocus=()=>{this.silentRefresh()};this.onVisibility=()=>{document.visibilityState==="visible"&&this.silentRefresh()};this.container=e,this.opts=this.resolve(t),Ue(),this.root=document.createElement("div"),this.root.className="ua-root"}static check(t){return t||ee()?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(t){return this.root.isConnected?this:(t?t.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),this.fetchUser(!0),window.addEventListener("focus",this.onWindowFocus),document.addEventListener("visibilitychange",this.onVisibility),this)}unmount(){this.destroy()}async login(){return this.triggerLogin()}async refresh(){await this.fetchUser(!0)}destroy(){this.closeMenu(),this.closeSettings(),this.githubMsgListener&&(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null),window.removeEventListener("focus",this.onWindowFocus),document.removeEventListener("visibilitychange",this.onVisibility),this.root.remove()}resolve(t){let e=t.sdk??ee(),n=t.apiBase!==void 0&&t.apiBase!==""?t.apiBase:"https://wx-auth.shenzjd.com";return{sdk:e,apiBase:n,fixed:t.fixed??!0,offset:t.offset??"1rem 1.5rem",size:t.size??re.size,zIndex:t.zIndex??12e3,portal:t.portal??!0,portalEl:t.portalEl,theme:{...re,...t.theme??{},size:t.size??t.theme?.size??re.size},loginRequired:t.loginRequired??!1,onLogin:t.onLogin,onLogout:t.onLogout,onGithubBound:t.onGithubBound}}applyTheme(){let t=this.opts.theme,e=this.root.style;e.setProperty("--ua-btn-bg",t.btnBg),e.setProperty("--ua-size",t.size),e.setProperty("--ua-accent",t.accent),e.setProperty("--ua-btn-border",t.btnBorder),e.setProperty("--ua-radius",t.radius),e.setProperty("--ua-bg",t.bg),e.setProperty("--ua-text",t.text),e.setProperty("--ua-sub",t.subText),e.setProperty("--ua-overlay",t.overlay),e.setProperty("--ua-danger",t.danger),e.setProperty("--ua-success",t.success)}usePortal(){return this.opts.portal}getPortalRoot(){return this.opts.portalEl??document.body}appendOverlay(t){if(this.usePortal()){let e=this.opts.theme,n=t.style;n.setProperty("--ua-btn-bg",e.btnBg),n.setProperty("--ua-size",e.size),n.setProperty("--ua-accent",e.accent),n.setProperty("--ua-btn-border",e.btnBorder),n.setProperty("--ua-radius",e.radius),n.setProperty("--ua-bg",e.bg),n.setProperty("--ua-text",e.text),n.setProperty("--ua-sub",e.subText),n.setProperty("--ua-overlay",e.overlay),n.setProperty("--ua-danger",e.danger),n.setProperty("--ua-success",e.success);let r=document.createElement("style");r.setAttribute("data-ua-portal-style",""),r.textContent=B,t.appendChild(r),this.getPortalRoot().appendChild(t)}else this.root.appendChild(t)}async triggerLogin(){let t=this.opts.sdk;if(!t)return console.warn("[UserAvatar] \u672A\u627E\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK"),!1;let e=await t.requireAuth({required:this.opts.loginRequired});return e&&(await this.fetchUser(!0),this.user&&this.opts.onLogin?.(this.user)),e}async logout(){let t=this.opts.sdk;t?.revoke?await t.revoke():(t?.clearToken(),ne()),this.user=null,this.status="unauth",this.closeMenu(),this.closeSettings(),this.render(),this.opts.onLogout?.()}async fetchUser(t=!1){let e=O();if(!e){this.user=null,this.status="unauth",this.render();return}if(!t&&this.cachedUser&&this.cachedToken===e&&Date.now()-this.cachedAt<this.userCacheTtl){this.user=this.cachedUser,this.status="auth",this.render();return}this.status!=="auth"&&(this.status="checking",this.render());let n=this.user;try{let r=this.opts.apiBase||window.location.origin,o=await fetch(`${r}/api/auth/userinfo?token=${encodeURIComponent(e)}`),a=await o.json();if(a.authenticated!==!0){let s=typeof a.error=="string"?a.error:void 0;if(s==="server_error"||s==="rate_limited"||o.status>=500||o.status===429){console.warn("[UserAvatar] userinfo \u77AC\u65F6\u5F02\u5E38\uFF0C\u4FDD\u7559\u767B\u5F55\u6001",s??`http ${o.status}`),this.status!=="auth"&&(this.user=null,this.status="unauth"),this.render();return}console.warn("[UserAvatar] token \u5DF2\u5931\u6548\uFF0C\u81EA\u52A8\u6E05\u9664\u672C\u5730\u51ED\u8BC1",s??""),ne(),this.user=null,this.status="unauth",this.cachedUser=null,this.cachedAt=0,this.cachedToken="",this.closeSettings(),this.render();return}let l=a.user;if(this.user=l??null,this.status=this.user?"auth":"unauth",this.cachedUser=this.user,this.cachedAt=Date.now(),this.cachedToken=e,this.status==="auth"&&n&&JSON.stringify(n)===JSON.stringify(this.user))return}catch(r){console.error("[UserAvatar] \u62C9\u53D6\u7528\u6237\u8BE6\u60C5\u5931\u8D25",r),this.status!=="auth"&&(this.user=null,this.status="unauth")}this.render()}async saveNickname(){let t=O(),e=this.nicknameDraft.trim();if(!t)return;if(e.length<2||e.length>20){this.setMsg("\u6635\u79F0\u9700\u4E3A 2-20 \u4E2A\u5B57\u7B26");return}if(this.saving)return;this.saving=!0,this.updateSaveBtn(),this.setMsg("");let n=!1;try{let r=this.opts.apiBase||window.location.origin,a=await(await fetch(`${r}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,action:"set-nickname",nickname:e})})).json();a.success?(n=!0,this.nicknameDraft=e,await this.fetchUser(!0)):this.setMsg(a.message||"\u4FDD\u5B58\u5931\u8D25")}catch(r){console.error("[UserAvatar] \u4FDD\u5B58\u6635\u79F0\u5931\u8D25",r),this.setMsg("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}finally{this.saving=!1,this.updateSaveBtn(n)}}async unbindGithub(){let t=O();if(t)try{let e=this.opts.apiBase||window.location.origin,r=await(await fetch(`${e}/api/auth/profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,action:"unbind-github"})})).json();r.success?(await this.fetchUser(!0),this.refreshGithubRow()):window.alert(r.message||"\u89E3\u7ED1\u5931\u8D25")}catch(e){console.error("[UserAvatar] \u89E3\u7ED1\u5931\u8D25",e),window.alert("\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}}render(){this.root.innerHTML="",this.closeMenu();let t=this.opts.fixed?`position:fixed;top:${this.offsetTop()};right:${this.offsetRight()};z-index:${this.opts.zIndex}`:"",e=this.status==="checking",n=e?"ua-avatar ua-avatar-checking":this.status==="auth"?"ua-avatar":"ua-avatar ua-avatar-unauth";this.root.innerHTML=`
      <div class="ua-widget" style="${t}">
        <button type="button" class="${n}" aria-haspopup="true"${e?' aria-busy="true"':""} aria-label="${this.status==="auth"?"\u6253\u5F00\u7528\u6237\u83DC\u5355":e?"\u6B63\u5728\u68C0\u6D4B\u767B\u5F55\u72B6\u6001":"\u5FAE\u4FE1\u767B\u5F55"}">
          ${this.buildAvatarInnerHtml()}
        </button>
      </div>
    `;let r=this.root.querySelector(".ua-avatar"),o=this.root.querySelector(".ua-avatar-img");o&&(o.complete&&o.naturalWidth>0?o.classList.add("ua-img-loaded"):(r.classList.add("ua-avatar-loading-img"),o.addEventListener("load",()=>{o.classList.add("ua-img-loaded"),r.classList.remove("ua-avatar-loading-img")},{once:!0}),o.addEventListener("error",()=>{let a=this.user?.nickname||this.user?.github?.login||"\u5FAE",l=document.createElement("span");l.className="ua-avatar-fallback",l.textContent=a.charAt(0).toUpperCase(),o.replaceWith(l),r.classList.remove("ua-avatar-loading-img")},{once:!0}))),r.addEventListener("click",()=>{this.status!=="checking"&&(this.user?this.toggleMenu():this.triggerLogin())})}offsetTop(){let t=/^([^,\s]+)/.exec(this.opts.offset);return t?t[1]:"1rem"}offsetRight(){let t=/,\s*([^\s,]+)/.exec(this.opts.offset);if(t)return t[1];let e=this.opts.offset.trim().split(/\s+/);return e[1]??e[0]??"1.5rem"}buildAvatarInnerHtml(){if(this.status==="checking")return'<span class="ua-avatar-skeleton" aria-hidden="true"></span>';if(!this.user)return'<span class="ua-avatar-login">\u767B\u5F55</span>';let t=this.user.avatarUrl||this.user.headimgurl||this.user.github?.avatar||"";if(t)return`<img class="ua-avatar-img" src="${$(t)}" alt="" referrerpolicy="no-referrer" />`;let e=this.user.nickname||this.user.github?.login||"\u5FAE\u4FE1\u7528\u6237";return`<span class="ua-avatar-fallback">${g(e.charAt(0).toUpperCase())}</span>`}toggleMenu(){this.menuEl?this.closeMenu():this.openMenu()}openMenu(){let t=this.user;if(!t||this.menuEl)return;this.closeSettings();let e=document.createElement("div");e.className="ua-menu",e.style.zIndex=String(this.opts.zIndex+1);let n=t.nickname||(t.github?`@${t.github.login}`:"\u5FAE\u4FE1\u7528\u6237");if(e.innerHTML=`
      <div class="ua-menu-user"><span class="ua-menu-name">${g(n)}</span></div>
      <button type="button" class="ua-menu-item" data-action="settings">${Ge}<span>\u8BBE\u7F6E</span></button>
      <button type="button" class="ua-menu-item ua-menu-item-danger" data-action="logout">${We}<span>\u9000\u51FA\u767B\u5F55</span></button>
    `,this.usePortal()){let l=this.root.querySelector(".ua-avatar")?.getBoundingClientRect();l&&l.width>0?(e.style.position="fixed",e.style.top=`${l.bottom+8}px`,e.style.left="auto",e.style.right=`${Math.max(window.innerWidth-l.right,0)}px`,e.style.minWidth="12rem",e.style.maxWidth="min(20rem, calc(100vw - 2rem))",e.dataset.uaPortal="true"):this.usePortalMenuInlineFallback(e)}let r=a=>{let l=a.composedPath();!l.includes(this.root)&&!(this.menuEl&&l.includes(this.menuEl))&&this.closeMenu()},o=a=>{a.key==="Escape"&&this.closeMenu()};document.addEventListener("mousedown",r),document.addEventListener("keydown",o),this.menuCleanup=()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",o)},e.querySelector('[data-action="settings"]')?.addEventListener("click",()=>{this.openSettings()}),e.querySelector('[data-action="logout"]')?.addEventListener("click",()=>{this.openLogoutConfirm()}),this.appendOverlay(e),this.menuEl=e}usePortalMenuInlineFallback(t){t.style.position="absolute",t.style.top="",t.style.left="",t.style.right="0",t.style.minWidth="12rem",t.style.maxWidth="",this.root.appendChild(t)}closeMenu(){this.menuEl?.remove(),this.menuEl=null,this.menuCleanup?.(),this.menuCleanup=null}openLogoutConfirm(){this.closeMenu(),this.closeConfirm();let t=document.createElement("div");t.className="ua-mask",t.style.zIndex=String(this.opts.zIndex+10),t.innerHTML=`
      <div class="ua-dialog ua-confirm" role="alertdialog" aria-modal="true" aria-label="\u9000\u51FA\u767B\u5F55">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u9000\u51FA\u767B\u5F55</h3>
          <button type="button" class="ua-close" data-action="cancel" aria-label="\u5173\u95ED">${ie}</button>
        </div>
        <div class="ua-dialog-body">
          <p class="ua-confirm-text">\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417\uFF1F\u9000\u51FA\u540E\u9700\u8981\u91CD\u65B0\u767B\u5F55\u624D\u80FD\u7EE7\u7EED\u4F7F\u7528\u3002</p>
        </div>
        <div class="ua-confirm-actions">
          <button type="button" class="ua-confirm-btn" data-action="cancel">\u53D6\u6D88</button>
          <button type="button" class="ua-confirm-btn ua-confirm-btn-danger" data-action="confirm">\u9000\u51FA\u767B\u5F55</button>
        </div>
      </div>
    `,this.confirmEl=t,this.appendOverlay(t);let e=()=>this.closeConfirm();t.querySelector('[data-action="confirm"]')?.addEventListener("click",()=>{e(),this.logout()}),t.querySelectorAll('[data-action="cancel"]').forEach(o=>{o.addEventListener("click",e)});let n=o=>{o.composedPath()[0]===t&&e()},r=o=>{o.key==="Escape"&&e()};document.addEventListener("mousedown",n),document.addEventListener("keydown",r),this.confirmCleanup=()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",r)}}closeConfirm(){this.confirmEl?.remove(),this.confirmEl=null,this.confirmCleanup?.(),this.confirmCleanup=null}openSettings(){let t=this.user;if(!t)return;this.closeMenu(),this.closeSettings(),this.nicknameDraft=t.nickname||"";let e=document.createElement("div");e.className="ua-mask",e.style.zIndex=String(this.opts.zIndex+10),e.innerHTML=this.buildSettingsHtml(t),this.settingsEl=e,this.appendOverlay(e),this.bindSettingsEvents(e);let n=o=>{o.composedPath()[0]===e&&this.closeSettings()},r=o=>{o.key==="Escape"&&this.closeSettings()};document.addEventListener("mousedown",n),document.addEventListener("keydown",r),this.settingsCleanup=()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",r)}}buildSettingsHtml(t){let e=t.avatarUrl||t.headimgurl||t.github?.avatar,n=e?`<img class="ua-big-avatar" src="${$(e)}" alt="" referrerpolicy="no-referrer" />`:`<div class="ua-big-avatar ua-big-avatar-fallback">${g((t.nickname||t.github?.login||"?").charAt(0).toUpperCase())}</div>`,r=this.buildGithubRowHtml(t);return`
      <div class="ua-dialog" role="dialog" aria-modal="true" aria-label="\u8BBE\u7F6E">
        <div class="ua-dialog-head">
          <h3 class="ua-dialog-title">\u8BBE\u7F6E</h3>
          <button type="button" class="ua-close" data-action="close" aria-label="\u5173\u95ED">${ie}</button>
        </div>
        <div class="ua-dialog-body">
          <!-- \u7528\u6237\u4FE1\u606F\u5361\u7247\uFF08\u542B\u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u7AD9\u70B9\u54C1\u724C + \u7528\u6237 ID\uFF09 -->
          <div class="ua-profile-card">
            <div class="ua-profile-header">
              ${n}
              <div class="ua-profile-info">
                <div class="ua-user-name">${g(t.nickname||(t.github?`@${t.github.login}`:"\u5FAE\u4FE1\u7528\u6237"))}</div>
                ${typeof t.userSeq=="number"&&t.userSeq>0?`<div class="ua-user-seq">\u4F60\u662F\u672C\u7AD9\u7B2C ${t.userSeq} \u4F4D\u7528\u6237</div>`:""}
              </div>
            </div>
            <!-- \u660E\u4FE1\u7247\u5E95\u90E8\uFF1A\u5DE6 = \u7F51\u7AD9\u54C1\u724C\u300C\u795E\u65CF\u4E5D\u5E1D\u300D\uFF1B\u53F3 = \u7528\u6237 OPENID -->
            <div class="ua-profile-postcard">
              <span class="ua-postcard-brand">\u795E\u65CF\u4E5D\u5E1D</span>
              <span class="ua-postcard-id">${g(t.openid||"-")}</span>
            </div>
          </div>

          <!-- GitHub \u7ED1\u5B9A\uFF1A\u5DE6\u53F3\u5355\u884C\uFF08\u5DE6\uFF1A\u56FE\u6807+\u6807\u9898\uFF1B\u53F3\uFF1A\u7ED1\u5B9A\u6309\u94AE / \u7528\u6237\u540D+\u89E3\u7ED1\uFF09 -->
          ${r}

          <!-- \u8BBE\u7F6E\u540D\u5B57 -->
          <div class="ua-field-group">
            <div class="ua-section-title">${$e}<span>\u8BBE\u7F6E\u540D\u5B57</span></div>
            <div class="ua-nickname-row">
              <input type="text" class="ua-input" maxlength="20" placeholder="2-20 \u4E2A\u5B57\u7B26" value="${$(this.nicknameDraft)}" />
              <button type="button" class="ua-save" data-action="save">\u4FDD\u5B58</button>
            </div>
            <div class="ua-msg" data-role="msg"></div>
          </div>
        </div>
      </div>
    `}buildGithubRowHtml(t){return t.github?`
        <div class="ua-gh-row">
          <span class="ua-gh-title">${G}<b>GitHub</b></span>
          <div class="ua-gh-status">
            <span class="ua-gh-name">@${g(t.github.login)}<span class="ua-badge">\u5DF2\u7ED1\u5B9A</span></span>
            <button type="button" class="ua-gh-unbind" data-action="unbind">\u89E3\u7ED1</button>
          </div>
        </div>`:`
        <div class="ua-gh-row">
          <span class="ua-gh-title">${G}<b>GitHub</b></span>
          <div class="ua-gh-status">
            <button type="button" class="ua-gh-bind" data-action="bind">${G}<span>\u7ED1\u5B9A GitHub</span></button>
          </div>
        </div>`}refreshGithubRow(){if(!this.settingsEl||!this.user)return;let t=this.settingsEl.querySelector(".ua-gh-row");if(!t)return;let e=document.createElement("div");e.innerHTML=this.buildGithubRowHtml(this.user).trim();let n=e.firstElementChild;n&&(t.replaceWith(n),n.querySelector('[data-action="bind"]')?.addEventListener("click",()=>{this.startGithubBind()}),n.querySelector('[data-action="unbind"]')?.addEventListener("click",()=>{this.unbindGithub()}))}bindSettingsEvents(t){let e=t.querySelector(".ua-input");e?.addEventListener("input",()=>{this.nicknameDraft=e.value,this.setMsg("")}),e?.addEventListener("keydown",n=>{n.key==="Enter"&&this.saveNickname()}),t.querySelector('[data-action="save"]')?.addEventListener("click",()=>{this.saveNickname()}),t.querySelector('[data-action="close"]')?.addEventListener("click",()=>{this.closeSettings()}),t.querySelector('[data-action="bind"]')?.addEventListener("click",()=>{this.startGithubBind()}),t.querySelector('[data-action="unbind"]')?.addEventListener("click",()=>{this.unbindGithub()})}closeSettings(){this.saveBtnTimer!==null&&(clearTimeout(this.saveBtnTimer),this.saveBtnTimer=null),this.settingsEl?.remove(),this.settingsEl=null,this.settingsCleanup?.(),this.settingsCleanup=null}setMsg(t){let e=this.settingsEl?.querySelector('[data-role="msg"]');e&&(e.textContent=t,e.className=t?"ua-msg ua-msg-err":"ua-msg")}updateSaveBtn(t=!1){let e=this.settingsEl?.querySelector('[data-action="save"]');e&&(this.saveBtnTimer!==null&&(clearTimeout(this.saveBtnTimer),this.saveBtnTimer=null),e.disabled=this.saving,e.textContent=this.saving?"\u4FDD\u5B58\u4E2D\u2026":t?"\u5DF2\u4FDD\u5B58 \u2713":"\u4FDD\u5B58",t&&(this.saveBtnTimer=window.setTimeout(()=>{e.textContent="\u4FDD\u5B58",this.saveBtnTimer=null},2e3)))}startGithubBind(){let t=O();if(!t){window.alert("\u8BF7\u5148\u5B8C\u6210\u5FAE\u4FE1\u767B\u5F55");return}let n=`${this.opts.apiBase||window.location.origin}/api/oauth/github/authorize?token=${encodeURIComponent(t)}`;window.open(n,"github-bind","width=720,height=720,menubar=no,toolbar=no,location=no,status=no"),!this.githubMsgListener&&(this.githubMsgListener=r=>{let o=r.data;!o||o.type!=="github-bound"||(window.removeEventListener("message",this.githubMsgListener),this.githubMsgListener=null,this.fetchUser(!0).then(()=>{this.refreshGithubRow(),this.user?.github&&this.opts.onGithubBound?.(this.user)}))},window.addEventListener("message",this.githubMsgListener))}};var oe="user-avatar",Kt="__USER_AVATAR_OPTIONS__";function Vt(){return window[Kt]}function ae(i,t,e){let n=i.getAttribute(t);return n===null?e:n===""||n==="true"||n==="1"}function Jt(i,t,e){let n=i.getAttribute(t);if(n===null||n==="")return e;let r=Number(n);return Number.isFinite(r)?r:e}function Xt(i){if(typeof i!="string"||i.trim()==="")return;let t=i.trim(),e=t.startsWith("#")?t.slice(1):t,n=document.getElementById(e);if(n)return n;try{return document.querySelector(t)??void 0}catch{return}}var je=[["theme-btn-bg","btnBg"],["theme-size","size"],["theme-accent","accent"],["theme-btn-border","btnBorder"],["theme-radius","radius"],["theme-bg","bg"],["theme-text","text"],["theme-sub-text","subText"],["theme-overlay","overlay"],["theme-danger","danger"],["theme-success","success"]],C=class extends HTMLElement{constructor(){super();this.widget=null;this.pollTimer=null;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=B,this.shadow.appendChild(e)}static get observedAttributes(){return["api-base","fixed","offset","size","z-index","portal","portal-el","login-required",...je.map(([e])=>e)]}static check(){return m.check()}connectedCallback(){this.mountWidget(),m.check()!==null&&this.startPolling()}disconnectedCallback(){this.stopPolling(),this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&(this.stopPolling(),this.mountWidget(),m.check()!==null&&this.startPolling())}startPolling(){this.pollTimer||(this.pollTimer=setInterval(()=>{m.check()===null&&(this.stopPolling(),this.mountWidget())},400))}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}mountWidget(){this.widget?.unmount();let e=m.check();e&&console.warn(`[${oe}] ${e}`),this.widget=new m(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let e=Vt()??{},n=this.props??{},r=l=>this.getAttribute(l),o={};for(let[l,s]of je){let c=r(l);c!==null&&(o[s]=c)}let a={apiBase:r("api-base")??void 0,fixed:r("fixed")!==null?ae(this,"fixed",!0):void 0,offset:r("offset")??void 0,size:r("size")??void 0,zIndex:r("z-index")!==null?Jt(this,"z-index",12e3):void 0,portal:r("portal")!==null?ae(this,"portal",!0):void 0,portalEl:Xt(r("portal-el")??void 0),loginRequired:r("login-required")!==null?ae(this,"login-required",!1):void 0,theme:Object.keys(o).length?o:void 0};return{...se(e),...se(a),...se(n),theme:{...e.theme??{},...a.theme??{},...n.theme??{}}}}};function se(i){let t={};for(let[e,n]of Object.entries(i))n!==void 0&&(t[e]=n);return t}customElements.get(oe)||customElements.define(oe,C);var W=`/* ============================================================
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
`;function en(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function le(i){return en(i)}function De(i){return i.replace(/^www\./i,"")}function de(i){try{let t=De(new URL(i,window.location.href).hostname),e=De(window.location.hostname);return!t||!e?null:t===e?"exact":e.endsWith("."+t)?"sub":null}catch{return null}}function Wn(i){return de(i)!==null}var ce='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>',Qe='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';var tn="https://unpkg.com/wx-auth-sdk@latest/dist/wx-auth.umd.js",ue=null,Ye=!1;function Ke(){if(!(typeof window>"u"))return window.WxAuth}function Ve(i={}){let{src:t=tn,enabled:e=!0,initOptions:n={silent:!0,required:!1},pollInterval:r=100,timeout:o=1e4,onReady:a,onError:l}=i;if(!e)return Promise.resolve(!1);let s=Ke();return s?(a?.(s),Promise.resolve(!0)):(ue||(ue=new Promise(c=>{nn(t);let d=Date.now(),h=setInterval(()=>{let u=Ke();if(u){if(clearInterval(h),!Ye&&typeof u.init=="function")try{u.init(n),Ye=!0}catch(p){console.warn("[site-navbar] WxAuth.init \u8C03\u7528\u5931\u8D25",p)}a?.(u),c(!0)}else if(Date.now()-d>o){clearInterval(h);let p=`wx-auth-sdk \u52A0\u8F7D\u8D85\u65F6\uFF08${o}ms\uFF09`;console.warn(`[site-navbar] ${p}\uFF0C\u5934\u50CF\u767B\u5F55\u529F\u80FD\u4E0D\u53EF\u7528\uFF0C\u5BFC\u822A\u680F\u7167\u5E38\u6E32\u67D3`),l?.(p),c(!1)}},r)})),ue)}function nn(i){if(typeof document>"u"||Array.from(document.querySelectorAll("script[data-wx-auth-sdk]")).some(n=>n.src===i))return;let e=document.createElement("script");e.src=i,e.async=!0,e.setAttribute("data-wx-auth-sdk",""),e.onerror=()=>{console.warn(`[site-navbar] wx-auth-sdk \u52A0\u8F7D\u5931\u8D25\uFF1A${i}\uFF0C\u5934\u50CF\u529F\u80FD\u4E0D\u53EF\u7528\uFF0C\u5BFC\u822A\u680F\u7167\u5E38\u6E32\u67D3`)},(document.head||document.documentElement).appendChild(e)}var rn=[{href:"https://www.shenzjd.com",label:"AI\u60C5\u62A5\u5C40",icon:"\u{1F3E0}"},{href:"https://panhub.shenzjd.com",label:"\u7F51\u76D8\u641C\u7D22",icon:"\u{1F50D}"},{href:"https://h5.lot-ml.com/ProductEn/Index/3d58b4cfe8b560c8",label:"\u6D41\u91CF\u5361",icon:"\u{1F4F6}"},{href:"https://tvbox.shenzjd.com/",label:"TVbox \u63A5\u53E3",icon:"\u{1F4FA}"},{href:"https://navhub.shenzjd.com",label:"\u5BFC\u822A\u68EE\u6797",icon:"\u{1F9ED}"},{href:"https://freeimg.shenzjd.com/",label:"\u514D\u8D39\u751F\u56FE",icon:"\u{1F193}"},{href:"https://portfolio.shenzjd.com/products",label:"\u66F4\u591A",icon:"\u2728"}],on={icon:'<img class="sn-brand-img" src="https://cdn.jsdmirror.com/gh/wu529778790/img.shenzjd.com@master/blog/imgx-20260701-180125-c1ub.webp" alt="\u795E\u65CF\u4E5D\u5E1D" />',text:"\u795E\u65CF\u4E5D\u5E1D"},Je="2.2rem",j="user-avatar",Xe="https://unpkg.com/@wu529778790/user-avatar@latest/dist/user-avatar.wc.js",an=15e3,D=null;function sn(i){return customElements.get(j)?Promise.resolve(!0):(D||(D=new Promise(t=>{let e=document.createElement("script");e.src=i||Xe,e.async=!0,e.onload=()=>{let n=customElements.whenDefined(j).then(()=>!0,()=>!1),r=new Promise(o=>setTimeout(()=>o(!1),an));Promise.race([n,r]).then(t)},e.onerror=()=>t(!1),(document.head||document.documentElement).appendChild(e)})),D.then(t=>(t||(D=null),t)))}var ln={primary:"light-dark(#1f2328, #e6edf3)",secondary:"light-dark(#656d76, #8b949e)",accent:"light-dark(#1a6dff, #4d9fff)",hoverBg:"light-dark(rgba(31, 35, 40, 0.06), rgba(255, 255, 255, 0.08))",bg:"light-dark(rgba(255, 255, 255, 0.55), rgba(28, 31, 36, 0.55))",border:"light-dark(rgba(27, 31, 36, 0.14), rgba(255, 255, 255, 0.14))",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'},Q=class{constructor(t={},e=document.body){this.avatarEl=null;this.toggleEl=null;this.mobileEl=null;this.mobileOpen=!1;this.onDocClick=t=>{if(!this.mobileOpen)return;let e=t.target;!this.root.contains(e)&&!(this.mobileEl&&this.mobileEl.contains(e))&&this.setMobileOpen(!1)};this.onKeyDown=t=>{t.key==="Escape"&&this.mobileOpen&&this.setMobileOpen(!1)};this.onResize=()=>{this.mobileOpen&&window.innerWidth>this.opts.breakpoint&&this.setMobileOpen(!1)};this.onScroll=()=>{this.mobileOpen&&this.updateMobilePosition()};this.container=e,this.opts=this.resolve(t),this.root=document.createElement("div"),this.root.className="sn-root"}static check(){let t=customElements.get(j);return t&&typeof t.check=="function"?t.check():window.WxAuth?null:"\u672A\u68C0\u6D4B\u5230\u5FAE\u4FE1\u8BA4\u8BC1 SDK\uFF08window.WxAuth\uFF09\uFF0C\u8BF7\u5148\u5F15\u5165 wx-auth-sdk \u5E76\u8C03\u7528 WxAuth.init()"}mount(t){return this.root.isConnected?this:(t?t.appendChild(this.root):this.container instanceof ShadowRoot?this.container.appendChild(this.root):this.container===document.body?document.body.appendChild(this.root):this.container.appendChild(this.root),this.applyTheme(),this.render(),Ve(this.opts.wxAuth),this)}unmount(){this.destroy()}destroy(){this.avatarEl?.remove(),this.avatarEl=null,this.mobileEl&&this.mobileEl.parentElement&&this.mobileEl.parentElement.removeChild(this.mobileEl),this.mobileEl=null,document.removeEventListener("click",this.onDocClick),document.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize),window.removeEventListener("scroll",this.onScroll,!0),this.root.remove()}resolve(t){return{links:t.links??rn,brand:t.brand??on,avatar:t.avatar??!0,avatarOptions:{size:Je,...t.avatarOptions??{},theme:{size:Je,...t.avatarOptions?.theme??{}},fixed:!1},theme:{...ln,...t.theme??{}},breakpoint:t.breakpoint??768,portalEl:t.portalEl??document.body,onNavigate:t.onNavigate,wxAuth:t.wxAuth??{}}}applyTheme(){let t=this.opts.theme,e=this.root.style;e.setProperty("--sn-primary",t.primary),e.setProperty("--sn-secondary",t.secondary),e.setProperty("--sn-accent",t.accent),e.setProperty("--sn-hover-bg",t.hoverBg),e.setProperty("--sn-bg",t.bg),e.setProperty("--sn-border",t.border),e.setProperty("--sn-radius",t.radius),e.setProperty("--sn-font-family",t.fontFamily)}render(){this.root.innerHTML="";let t=this.computeActiveHref(),e=document.createElement("div");e.className="sn-bar",this.opts.brand&&e.appendChild(this.renderBrand(this.opts.brand));let n=document.createElement("nav");n.className="sn-links";for(let l of this.opts.links)n.appendChild(this.renderLink(l,l.href===t));if(e.appendChild(n),this.opts.avatar){let l=document.createElement("div");l.className="sn-avatar",e.appendChild(l);let s=document.createElement(j),{src:c,...d}=this.opts.avatarOptions;s.props=d,l.appendChild(s),this.avatarEl=s,sn(c).then(h=>{h||console.warn(`[site-navbar] <user-avatar> \u52A0\u8F7D\u5931\u8D25\uFF0C\u5934\u50CF\u672A\u6E32\u67D3\uFF1A${c||Xe}`)})}let r=document.createElement("button");r.className="sn-toggle",r.type="button",r.setAttribute("aria-label","\u83DC\u5355"),r.setAttribute("aria-expanded","false"),r.innerHTML=ce,r.addEventListener("click",l=>{l.stopPropagation(),this.setMobileOpen(!this.mobileOpen)}),e.appendChild(r),this.toggleEl=r,this.root.appendChild(e);let o=document.createElement("div");o.className="sn-mobile",o.setAttribute("role","menu"),o.setAttribute("aria-hidden","true");for(let l of this.opts.links)o.appendChild(this.renderLink(l,l.href===t));let a=document.createElement("style");a.setAttribute("data-sn-portal-styles",""),a.textContent=W,o.appendChild(a),this.opts.portalEl.appendChild(o),this.mobileEl=o,document.addEventListener("click",this.onDocClick),document.addEventListener("keydown",this.onKeyDown),window.addEventListener("resize",this.onResize),window.addEventListener("scroll",this.onScroll,!0)}renderBrand(t){let e=document.createElement("a");e.className="sn-brand";let n=t.href??window.location.origin;e.href=le(n);try{new URL(n,window.location.href).origin===window.location.origin?e.target="_self":(e.target="_blank",e.rel="noopener noreferrer")}catch{e.target="_blank",e.rel="noopener noreferrer"}if(t.icon){let r=document.createElement("span");r.className="sn-brand-icon",r.innerHTML=t.icon,e.appendChild(r)}return t.text&&e.appendChild(document.createTextNode(t.text)),e}renderLink(t,e){let n=document.createElement("a");if(n.className="sn-link",n.href=le(t.href),n.target="_blank",n.rel="noopener noreferrer",e&&n.classList.add("sn-active"),n.setAttribute("aria-current",e?"page":"false"),t.icon){let r=document.createElement("span");r.className="sn-link-icon",r.innerHTML=t.icon,n.appendChild(r)}return n.appendChild(document.createTextNode(t.label)),n.addEventListener("click",r=>this.opts.onNavigate?.(t,r)),n}computeActiveHref(){for(let t of this.opts.links)if(t.active===!0)return t.href;for(let t of this.opts.links)if(t.active!==!1&&de(t.href)==="exact")return t.href;return null}setMobileOpen(t){this.mobileOpen=t,this.mobileEl&&(this.mobileEl.classList.toggle("sn-open",t),this.mobileEl.setAttribute("aria-hidden",String(!t)),t&&this.updateMobilePosition()),this.toggleEl&&(this.toggleEl.setAttribute("aria-expanded",String(t)),this.toggleEl.innerHTML=t?Qe:ce)}updateMobilePosition(){if(!this.mobileEl)return;let t=this.root.getBoundingClientRect(),e=this.mobileEl.style;e.position="fixed",e.top=`${Math.round(t.bottom+8)}px`,e.left="16px",e.right="16px",e.width="auto"}};var he="site-navbar",dn="__SITE_NAVBAR_OPTIONS__";function cn(){return window[dn]}function Ze(i,t,e){let n=i.getAttribute(t);return n===null?e:n===""||n==="true"||n==="1"}var et=[["theme-primary","primary"],["theme-secondary","secondary"],["theme-accent","accent"],["theme-hover-bg","hoverBg"],["theme-bg","bg"],["theme-border","border"],["theme-radius","radius"],["theme-font-family","fontFamily"]],z=class extends HTMLElement{constructor(){super();this.widget=null;this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=W,this.shadow.appendChild(e)}static get observedAttributes(){return["brand","brand-icon","avatar","avatar-src","links","wx-auth-enabled",...et.map(([e])=>e)]}connectedCallback(){this.mountWidget()}disconnectedCallback(){this.widget?.unmount(),this.widget=null}attributeChangedCallback(){this.isConnected&&this.mountWidget()}mountWidget(){this.widget?.unmount(),this.widget=new Q(this.buildOptions(),this.shadow),this.widget.mount()}buildOptions(){let e=cn()??{},n=x=>this.getAttribute(x),r={};for(let[x,tt]of et){let pe=n(x);pe!==null&&(r[tt]=pe)}let o=e.brand,a=n("brand");a!==null&&(o={...e.brand??{},text:a});let l=n("brand-icon");l!==null&&(o={...o??{},icon:l});let s=e.links,c=n("links");if(c!==null)try{let x=JSON.parse(c);Array.isArray(x)&&(s=x)}catch{}let d=e.avatarOptions,h=n("avatar-src");h!==null&&(d={...d??{},src:h});let u=e.wxAuth;return n("wx-auth-enabled")!==null&&(u={...u??{},enabled:Ze(this,"wx-auth-enabled",!0)}),{...e,links:s,brand:o,avatar:Ze(this,"avatar",e.avatar??!0),avatarOptions:d,wxAuth:u,theme:{...e.theme??{},...r},onNavigate:e.onNavigate}}};function un(){let i="data-sn-placeholder";if(document.getElementById(i))return;let t=document.createElement("style");t.id=i,t.textContent=`${he}:not(:defined) {
  display: block;
  height: var(--sn-navbar-height, 44px);
  box-sizing: border-box;
}`,(document.head||document.documentElement).appendChild(t)}customElements.get(he)||(un(),customElements.define(he,z));})();

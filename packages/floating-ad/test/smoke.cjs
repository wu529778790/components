// Minimal DOM stub to smoke-test the CJS build in Node
class El {
  constructor(tag) {
    this.tag = tag
    this.style = { setProperty() {} }
    this.dataset = {}
    this.listeners = {}
    this.isConnected = false
    this.children = []
  }
  addEventListener(evt, fn) { this.listeners[evt] = fn }
  removeEventListener() {}
  set innerHTML(v) {
    this._html = v
    if (v.includes('fa-close')) {
      this.closeBtn = new El('button')
    }
  }
  get innerHTML() { return this._html }
  querySelector(sel) {
    if (sel === '.fa-close') return this.closeBtn || null
    return null
  }
  appendChild(c) { this.children.push(c); c.isConnected = true }
  remove() { this.isConnected = false }
}

let lastAppended = null
global.document = {
  createElement: (t) => new El(t),
  body: { appendChild(el) { lastAppended = el; el.isConnected = true } }
}
global.window = global
global.matchMedia = () => ({ matches: false })
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] ?? null },
  setItem(k, v) { this.store[k] = String(v) }
}

const mod = require('../dist/index.umd.cjs')
const FA = mod.default || mod

let pass = 0
const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL:', msg); process.exit(1) }
  pass++
  console.log('ok -', msg)
}

// 1. 没有广告数据时不渲染空白卡片
const wEmpty = new FA()
assert(wEmpty.isMounted() === false, 'renders nothing without ads')
const wEmptyArr = new FA({ ads: [] })
assert(wEmptyArr.isMounted() === false, 'renders nothing with empty ads array')
// 只有空白字段的广告同样视为无效
const wBlank = new FA({ ads: [{ title: '  ' }] })
assert(wBlank.isMounted() === false, 'renders nothing for blank ad item')

// 2. 图片广告正常渲染并挂载
const w = new FA({
  ads: [{ src: 'ad.jpg', title: '云服务器特惠', desc: '首年 99 元', href: 'https://example.com' }]
})
assert(w.isMounted() === true, 'mounts with ad data')
assert(lastAppended !== null, 'appended to body')
assert(lastAppended.innerHTML.includes('ad.jpg'), 'ad image src rendered')
assert(lastAppended.innerHTML.includes('云服务器特惠'), 'ad title rendered')
assert(lastAppended.innerHTML.includes('首年 99 元'), 'ad desc rendered')
assert(lastAppended.innerHTML.includes('https://example.com'), 'ad href rendered')
assert(lastAppended.innerHTML.includes('fa-label'), 'default ad label rendered')
assert(lastAppended.innerHTML.includes('fa-head') === false, 'label does not take its own row')
assert(lastAppended.innerHTML.includes('target="_blank"'), 'default target is _blank')
assert(lastAppended.innerHTML.includes('nofollow'), 'external ad link is nofollow/sponsored')

// 3. 纯文字广告（不传 src）
const wText = new FA({ ads: [{ title: '周刊订阅', desc: '每周一封' }] })
assert(wText.isMounted() === true, 'text-only ad mounts')
assert(lastAppended.innerHTML.includes('fa-img') === false, 'text-only ad has no image')
assert(lastAppended.innerHTML.includes('fa-desc') === true, 'text-only ad renders desc')
assert(lastAppended.innerHTML.includes('<div class="fa-item"'), 'no-href ad renders as div')
assert(lastAppended.innerHTML.includes('fa-label-inline'), 'text-only ad inlines the label')

// 4. 多条广告 → 分隔线；角标、_self、关闭标识
const wMulti = new FA({
  ads: [
    { src: 'a.jpg', title: 'A', badge: '限时' },
    { title: 'B', href: '/b', target: '_self' }
  ],
  adLabel: false
})
assert(wMulti.isMounted(), 'multi ad mounts')
assert(lastAppended.innerHTML.includes('fa-divider'), 'divider between ads')
assert(lastAppended.innerHTML.includes('fa-tag'), 'badge rendered')
assert(lastAppended.innerHTML.includes('target="_self"'), '_self target respected')
assert(lastAppended.innerHTML.includes('fa-label') === false, 'adLabel:false hides label')

// 5. 主题 / 宽度写入 inline 变量
const wTheme = new FA({
  ads: [{ title: 'T' }],
  width: 200,
  offset: 24,
  imageHeight: 120,
  imageFit: 'contain',
  theme: { accent: '#e04040' }
})
assert(wTheme.isMounted(), 'themed ad mounts')
const root = lastAppended
assert(root.dataset.position === 'left-center', 'default position is left-center')
assert(root.style.zIndex === '9999', 'default z-index applied')

// 6. XSS：文案与属性转义
const wXss = new FA({
  ads: [{ title: '<img src=x onerror=alert(1)>', href: 'javascript:alert(1)' }]
})
const html = lastAppended.innerHTML
assert(html.includes('&lt;img src=x onerror=alert(1)&gt;'), 'title html escaped')
assert(html.includes('href="javascript:alert(1)"') === false, 'quote in href escaped (no raw href)')

// 7. close 默认不记住状态
w.close()
assert(w.isMounted() === false, 'close() unmounts')
assert(localStorage.getItem('floating-ad:closed') === null, 'no persistence by default')

// 8. closePersistence 写入 localStorage，下次构造不再渲染
const wP = new FA({ ads: [{ title: 'P' }], closePersistence: true })
assert(wP.isMounted(), 'persistent ad mounts')
wP.close()
assert(localStorage.getItem('floating-ad:closed') === '1', 'persistence writes mark')
const wP2 = new FA({ ads: [{ title: 'P' }], closePersistence: true })
assert(wP2.isMounted() === false, 'does not remount when close mark present')
// open() 可强制重新打开
wP2.open()
assert(wP2.isMounted() === true, 'open() re-mounts despite close mark')

// 9. update() 用新配置重渲染（容器不变）
wP2.update({ ads: [{ title: 'U1' }, { title: 'U2' }] })
assert(wP2.isMounted(), 'update re-mounts')
assert(lastAppended.innerHTML.includes('U1') && lastAppended.innerHTML.includes('U2'), 'update applies new ads')

// 10. 移动端隐藏
global.matchMedia = () => ({ matches: true })
const wMobile = new FA({ ads: [{ title: 'M' }], hideOnMobile: true })
assert(wMobile.isMounted() === false, 'hidden on mobile by default')
global.matchMedia = () => ({ matches: false })
const wMobile2 = new FA({ ads: [{ title: 'M' }], hideOnMobile: false })
assert(wMobile2.isMounted() === true, 'hideOnMobile:false still renders on mobile')

console.log(`\nAll ${pass} assertions passed.`)

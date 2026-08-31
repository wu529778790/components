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
    if (v.includes('fq-close')) {
      this.closeBtn = new El('button')
      this.closeBtn.clickHandler = () => {}
    }
  }
  get innerHTML() { return this._html }
  querySelector(sel) {
    if (sel === '.fq-close') return this.closeBtn || null
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
const FQ = mod.default || mod

let pass = 0
const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL:', msg); process.exit(1) }
  pass++
  console.log('ok -', msg)
}

// 1. constructor renders and mounts
const w = new FQ({
  wechat: { src: 'wx.png', title: '公众号' },
  donate: { src: 'dz.png' }
})
assert(w.isMounted() === true, 'mounts on construction')
assert(lastAppended !== null, 'appended to body')

// 2. defaults applied
assert(w.isMounted(), 'mounted')

// 3. close removes (default no persistence)
w.close()
assert(w.isMounted() === false, 'close() unmounts')
assert(localStorage.getItem('floating-qr:closed') === null, 'no persistence by default')

// 4. zero-config uses default wechat + mini-program (donate) images
const wZero = new FQ()
assert(wZero.isMounted(), 'zero-config mounts')
assert(lastAppended.innerHTML.includes('1782738963299-5wrchz.jpg'), 'default wechat QR used')
assert(lastAppended.innerHTML.includes('fq-divider'), 'donate section rendered by default')
assert(lastAppended.innerHTML.includes('imgx-20260828-153016-d3e9.jpg'), 'default mini-program QR used')

// 5. custom src overrides defaults
const wCustom = new FQ({ wechat: { src: 'custom-wx.png' }, donate: { src: 'custom-dz.png' } })
assert(wCustom.isMounted(), 'custom config mounts')
assert(lastAppended.innerHTML.includes('custom-wx.png'), 'custom wechat src used')
assert(lastAppended.innerHTML.includes('custom-dz.png'), 'custom donate src used')

// 6. closePersistence writes localStorage
const w2 = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  closePersistence: true
})
assert(w2.isMounted(), 'second instance mounts')
w2.close()
assert(localStorage.getItem('floating-qr:closed') === '1', 'persistence writes mark')

// 7. persistence skip on next construction
const w3 = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  closePersistence: true
})
assert(w3.isMounted() === false, 'does not remount when close mark present')

// 7.5 links render as share row (icons resolved, hrefs escaped)
const wLinks = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  links: [
    { href: 'https://t.me/shenzjd_com', icon: 'tg', title: 'Telegram' },
    { href: 'https://github.com/wu529778790', icon: 'github', title: 'GitHub' },
    { href: 'https://x.com/shenzujiudi', icon: 'x', title: 'X' }
  ]
})
const linksHtml = lastAppended.innerHTML
assert(linksHtml.includes('fq-links'), 'links row rendered')
assert(linksHtml.includes('https://t.me/shenzjd_com'), 'telegram href present')
assert(linksHtml.includes('https://github.com/wu529778790'), 'github href present')
assert(linksHtml.includes('https://x.com/shenzujiudi'), 'x href present')
assert(linksHtml.includes('fq-link-img') === false, 'builtin icon keys resolve to inline SVG')
// zero-config shows the default social links row
const wZero2 = new FQ()
assert(wZero2.isMounted() === true, 'zero-config mounts')
const zeroHtml = wZero2.el.innerHTML
assert(zeroHtml.includes('fq-links'), 'default links row rendered')
assert(zeroHtml.includes('https://t.me/shenzjd_com'), 'default telegram link present')
// explicit links: [] hides the row
const wNoLinks = new FQ({ links: [] })
assert(wNoLinks.isMounted() === true, 'no-links mounts')
assert(wNoLinks.el.innerHTML.includes('fq-links') === false, 'links: [] suppresses default row')

// 8. hideOnMobile skips render
global.matchMedia = () => ({ matches: true })
const w4 = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  hideOnMobile: true
})
assert(w4.isMounted() === false, 'hidden on mobile by default')
global.matchMedia = () => ({ matches: false })

console.log(`\nAll ${pass} assertions passed.`)

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

// 4. missing src throws
let threw = false
try { new FQ({ wechat: { src: '' }, donate: { src: 'x' } }) } catch { threw = true }
assert(threw, 'throws when wechat.src missing')

// 5. closePersistence writes localStorage
const w2 = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  closePersistence: true
})
assert(w2.isMounted(), 'second instance mounts')
w2.close()
assert(localStorage.getItem('floating-qr:closed') === '1', 'persistence writes mark')

// 6. persistence skip on next construction
const w3 = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  closePersistence: true
})
assert(w3.isMounted() === false, 'does not remount when close mark present')

// 7. hideOnMobile skips render
global.matchMedia = () => ({ matches: true })
const w4 = new FQ({
  wechat: { src: 'wx.png' },
  donate: { src: 'dz.png' },
  hideOnMobile: true
})
assert(w4.isMounted() === false, 'hidden on mobile by default')
global.matchMedia = () => ({ matches: false })

console.log(`\nAll ${pass} assertions passed.`)

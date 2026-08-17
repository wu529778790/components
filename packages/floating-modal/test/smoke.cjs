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
  removeEventListener(evt) { delete this.listeners[evt] }
  set innerHTML(v) {
    this._html = v
    if (v.includes('fm-close')) {
      this.closeBtn = new El('button')
      this.closeBtn.clickHandler = () => {}
    }
    if (v.includes('fm-modal')) this.modalEl = new El('div')
  }
  get innerHTML() { return this._html }
  querySelector(sel) {
    if (sel === '.fm-close') return this.closeBtn || null
    if (sel === '.fm-modal') return this.modalEl || null
    return null
  }
  appendChild(c) { this.children.push(c); c.isConnected = true }
  remove() { this.isConnected = false }
}

let lastAppended = null
global.document = {
  createElement: (t) => new El(t),
  body: { appendChild(el) { lastAppended = el; el.isConnected = true } },
  listeners: {},
  addEventListener(evt, fn) { this.listeners[evt] = fn },
  removeEventListener(evt) { delete this.listeners[evt] }
}
global.window = global
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] ?? null },
  setItem(k, v) { this.store[k] = String(v) }
}

const mod = require('../dist/index.umd.cjs')
const FM = mod.default || mod

let pass = 0
const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL:', msg); process.exit(1) }
  pass++
  console.log('ok -', msg)
}
const newEnv = () => {
  lastAppended = null
  global.localStorage.store = {}
}

// 1. defaults: mounts with sponsor copy + default QR
newEnv()
const m1 = new FM()
assert(m1.isOpen() === true, 'mounts on construction')
assert(lastAppended !== null, 'mask appended to body')
assert(lastAppended.innerHTML.includes('小水管请求支援'), 'default title used')
assert(lastAppended.innerHTML.includes('内容永远免费'), 'default content used')
assert(lastAppended.innerHTML.includes('imgx-20260817-165134-105w.png'), 'default QR used')
assert(lastAppended.innerHTML.includes('fm-hint'), 'hint shown for frequency 7')
assert(lastAppended.innerHTML.includes('关闭后 7 天'), 'hint text matches frequency')

// 2. close() unmounts + onClose callback
assert(document.listeners.keydown !== undefined, 'esc handler registered')
let closed = false
m1.close()
assert(m1.isOpen() === false, 'close() unmounts')
assert(document.listeners.keydown === undefined, 'esc handler removed after close')
assert(global.localStorage.store['floating-modal'] !== undefined, 'state written')

// 3. frequency=7: closed today -> does not auto-show
newEnv()
const m2 = new FM()
m2.close()
const m3 = new FM()
assert(m3.isOpen() === false, 'does not show again after close (7 days)')

// 4. frequency=daily: shows once per day
newEnv()
const m4 = new FM({ frequency: 'daily' })
assert(m4.isOpen() === true, 'daily: shows first time')
m4.close()
const m5 = new FM({ frequency: 'daily' })
assert(m5.isOpen() === false, 'daily: does not show again same day')

// 5. frequency=always: always shows
newEnv()
const m6 = new FM({ frequency: 'always' })
assert(m6.isOpen() === true, 'always: shows')
m6.close()
const m7 = new FM({ frequency: 'always' })
assert(m7.isOpen() === true, 'always: shows again even after close')

// 6. custom title/content/qr
newEnv()
const m8 = new FM({
  title: '站点公告',
  content: '第一行\n第二行',
  qr: { src: 'custom-qr.png', alt: '自定义' },
  frequency: 'always'
})
assert(m8.isOpen() === true, 'custom mounts')
assert(lastAppended.innerHTML.includes('站点公告'), 'custom title applied')
assert(lastAppended.innerHTML.includes('第一行<br>第二行'), 'newline converted to br')
assert(lastAppended.innerHTML.includes('custom-qr.png'), 'custom QR applied')

// 7. contentHtml passed through raw
newEnv()
const m9 = new FM({ contentHtml: '<b>加粗</b>', frequency: 'always' })
assert(lastAppended.innerHTML.includes('<b>加粗</b>'), 'contentHtml passthrough')

// 8. showClose=false hides the X button
newEnv()
const m10 = new FM({ showClose: false, frequency: 'always' })
assert(!lastAppended.innerHTML.includes('fm-close'), 'close button hidden when showClose=false')

// 9. mask click closes (maskClosable default)
newEnv()
const m11 = new FM({ frequency: 'always' })
lastAppended.listeners.click({ target: lastAppended })
assert(m11.isOpen() === false, 'mask click closes')

// 10. show() bypasses frequency
newEnv()
const m12 = new FM({ frequency: 'daily' })
m12.close()
m12.show()
assert(m12.isOpen() === true, 'show() bypasses frequency limit')

console.log(`\nAll ${pass} assertions passed.`)

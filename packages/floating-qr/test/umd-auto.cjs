// Smoke test for UMD auto-init: loading index.umd.js as a <script> should
// automatically create the widget, unless <html data-fq-auto="false">.
const fs = require('fs')
const vm = require('vm')
const path = require('path')

const UMD = fs.readFileSync(path.join(__dirname, '../dist/index.umd.js'), 'utf8')

function makeEnv({ fqAuto, setup }) {
  let lastAppended = null

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
    querySelector(sel) { return sel === '.fq-close' ? this.closeBtn || null : null }
    appendChild(c) { this.children.push(c); c.isConnected = true }
    remove() { this.isConnected = false }
  }

  const documentElement = {
    getAttribute(name) {
      if (name === 'data-fq-auto') return fqAuto === false ? 'false' : null
      return null
    }
  }

  const context = {
    console,
    matchMedia: () => ({ matches: false }),
    localStorage: {
      store: {},
      getItem(k) { return this.store[k] ?? null },
      setItem(k, v) { this.store[k] = String(v) }
    },
    document: {
      createElement: (t) => new El(t),
      body: { appendChild(el) { lastAppended = el; el.isConnected = true } },
      documentElement
    }
  }
  context.window = context

  if (setup) setup(context)
  vm.runInNewContext(UMD, context)
  return { context, get lastAppended() { return lastAppended } }
}

let pass = 0
const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL:', msg); process.exit(1) }
  pass++
  console.log('ok -', msg)
}

// 1. plain <script> load → widget appears automatically
const env1 = makeEnv({ fqAuto: undefined })
assert(typeof env1.context.FloatingQR === 'function', 'window.FloatingQR is a class')
assert(env1.lastAppended !== null, 'auto-initialized on script load')
assert(env1.lastAppended.className === 'fq-widget', 'appended element is the widget root')

// 2. guard: only auto-inits once
vm.runInNewContext(UMD, env1.context)
const appendedAfterReload = env1.lastAppended
const env2 = makeEnv({ fqAuto: undefined })
assert(env2.lastAppended !== null, 'fresh context auto-inits')
env1.context.window.__floatingQrAutoInit__ = true
vm.runInNewContext(UMD, env1.context)
assert(env1.lastAppended === appendedAfterReload, 'does not auto-init twice')

// 3. <html data-fq-auto="false"> → no auto widget
const env3 = makeEnv({ fqAuto: false })
assert(env3.lastAppended === null, 'data-fq-auto=false disables auto-init')
assert(typeof env3.context.FloatingQR === 'function', 'class still exposed when disabled')

// 4. manual usage still works when auto-init disabled
const w = new env3.context.FloatingQR()
assert(w.isMounted() === true, 'manual new FloatingQR() works after disable')

// 5. window.__FLOATING_QR_OPTIONS__ customizes the auto instance
const env5 = makeEnv({
  fqAuto: undefined,
  setup: (c) => {
    c.window.__FLOATING_QR_OPTIONS__ = {
      wechat: { title: '关注我' },
      donate: { title: '赞赏支持' }
    }
  }
})
assert(env5.lastAppended !== null, 'auto-inits with options')
assert(env5.lastAppended.innerHTML.includes('关注我'), 'custom wechat title applied')
assert(env5.lastAppended.innerHTML.includes('赞赏支持'), 'custom donate title applied')

console.log(`\nAll ${pass} assertions passed.`)

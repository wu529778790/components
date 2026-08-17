// Smoke test for UMD auto-init: loading index.umd.js as a <script> should
// automatically create the modal, unless <html data-fm-auto="false">.
const fs = require('fs')
const vm = require('vm')
const path = require('path')

const UMD = fs.readFileSync(path.join(__dirname, '../dist/index.umd.js'), 'utf8')

function makeEnv({ fmAuto, setup }) {
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
    removeEventListener(evt) { delete this.listeners[evt] }
    set innerHTML(v) {
      this._html = v
      if (v.includes('fm-close')) this.closeBtn = new El('button')
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

  const documentElement = {
    getAttribute(name) {
      if (name === 'data-fm-auto') return fmAuto === false ? 'false' : null
      return null
    }
  }

  const context = {
    console,
    setTimeout,
    clearTimeout,
    Date,
    JSON,
    localStorage: {
      store: {},
      getItem(k) { return this.store[k] ?? null },
      setItem(k, v) { this.store[k] = String(v) }
    },
    document: {
      createElement: (t) => new El(t),
      body: { appendChild(el) { lastAppended = el; el.isConnected = true } },
      documentElement,
      listeners: {},
      addEventListener(evt, fn) { this.listeners[evt] = fn },
      removeEventListener(evt) { delete this.listeners[evt] }
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

// 1. plain <script> load → modal appears automatically
const env1 = makeEnv({ fmAuto: undefined })
assert(typeof env1.context.FloatingModal === 'function', 'window.FloatingModal is a class')
assert(env1.lastAppended !== null, 'auto-initialized on script load')
assert(env1.lastAppended.className === 'fm-mask', 'appended element is the mask')

// 2. <html data-fm-auto="false"> → no auto modal
const env2 = makeEnv({ fmAuto: false })
assert(env2.lastAppended === null, 'data-fm-auto=false disables auto-init')
assert(typeof env2.context.FloatingModal === 'function', 'class still exposed when disabled')

// 3. manual usage works when auto-init disabled
const w = new env2.context.FloatingModal()
assert(w.isOpen() === true, 'manual new FloatingModal() works after disable')

// 4. window.__FLOATING_MODAL_OPTIONS__ customizes the auto instance
const env4 = makeEnv({
  fmAuto: undefined,
  setup: (c) => {
    c.window.__FLOATING_MODAL_OPTIONS__ = {
      title: '站点公告',
      content: '迁移通知'
    }
  }
})
assert(env4.lastAppended !== null, 'auto-inits with options')
assert(env4.lastAppended.innerHTML.includes('站点公告'), 'custom title applied')
assert(env4.lastAppended.innerHTML.includes('迁移通知'), 'custom content applied')

console.log(`\nAll ${pass} assertions passed.`)

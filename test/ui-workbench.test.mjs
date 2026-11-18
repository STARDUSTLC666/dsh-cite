import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { apply as applyCiteServer } from '../lib/index.js'

const CLIENT_BUNDLE = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')

function createMiniEnv({ withPrimitives = false, initialStyle = null, onApi } = {}) {
  const storage = new Map()
  if (initialStyle) storage.set('dsh-stardust:ui-style', initialStyle)
  const listeners = new Map()
  const syncedNodes = new Set()

  class FakeCustomEvent {
    constructor(type, init = {}) {
      this.type = type
      this.detail = init.detail
    }
  }

  const document = {
    baseURI: 'http://127.0.0.1:62041/',
    documentElement: {
      attrs: {},
      setAttribute(name, val) { this.attrs[name] = String(val) },
    },
    querySelectorAll(selector) {
      if (selector === '[data-dsh-portal-synced]') return [...syncedNodes]
      if (selector === '[data-dsh-portal-synced], [data-dsh-style]') return [...syncedNodes]
      return []
    },
    querySelector() { return null },
  }

  const win = {
    document,
    CustomEvent: FakeCustomEvent,
    localStorage: {
      getItem(k) { return storage.has(k) ? storage.get(k) : null },
      setItem(k, v) { storage.set(k, String(v)) },
      removeItem(k) { storage.delete(k) },
    },
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type).add(fn)
    },
    removeEventListener(type, fn) {
      listeners.get(type)?.delete(fn)
    },
    dispatchEvent(event) {
      for (const fn of [...(listeners.get(event.type) || [])]) fn(event)
      return true
    },
  }

  const states = new Map()
  const refs = new Map()
  const effects = []
  let activeOwner = 'root'
  let cursor = 0
  let refCursor = 0
  let idCounter = 0

  const React = {
    Fragment: Symbol.for('react.fragment'),
    createElement(type, props, ...children) {
      return { type, props: { ...(props || {}), children: children.flat(Infinity).filter(v => v !== null && v !== undefined && v !== false) } }
    },
    cloneElement(el, extra, ...children) {
      return {
        ...el,
        props: {
          ...(el.props || {}),
          ...(extra || {}),
          children: children.length ? children.flat(Infinity).filter(v => v !== null && v !== undefined && v !== false) : el.props?.children,
        },
      }
    },
    useState(initial) {
      const key = activeOwner + '#' + (cursor++)
      if (!states.has(key)) states.set(key, typeof initial === 'function' ? initial() : initial)
      const setState = next => {
        const prev = states.get(key)
        states.set(key, typeof next === 'function' ? next(prev) : next)
      }
      return [states.get(key), setState]
    },
    useRef(initial) {
      const key = activeOwner + '#' + (refCursor++)
      if (!refs.has(key)) refs.set(key, { current: initial })
      return refs.get(key)
    },
    useMemo(fn) { return fn() },
    useId() { return 'id-' + (++idCounter) },
    useEffect(fn) { effects.push(fn) },
    useLayoutEffect(fn) { effects.push(fn) },
  }

  const primitiveCalls = []
  const hostPrimitives = {
    Button: props => { primitiveCalls.push('Button'); return React.createElement('button', { 'data-host-button': props.variant, ...props }, props.icon, props.children) },
    Input: props => { primitiveCalls.push('Input'); return React.createElement('span', { 'data-host-input': 'true', className: props.className }, props.icon, React.createElement('input', props)) },
    Checkbox: props => { primitiveCalls.push('Checkbox'); return React.createElement('label', { 'data-host-checkbox': 'true', className: props.className }, React.createElement('input', { type: 'checkbox', checked: props.checked, disabled: props.disabled, onChange: e => props.onChange?.(Boolean(e?.target?.checked)) }), React.createElement('span', null, props.label)) },
    SegmentedControl: props => { primitiveCalls.push('SegmentedControl'); return React.createElement('div', { 'data-host-segmented': 'true', role: 'tablist', 'aria-label': props.label }, (props.options || []).map(o => React.createElement('button', { key: o.value, type: 'button', role: 'tab', 'aria-selected': o.value === props.value, disabled: props.disabled || o.disabled, onClick: () => props.onChange?.(o.value) }, o.label))) },
    Menu: props => { primitiveCalls.push('Menu'); return React.createElement('div', { 'data-host-menu-anchor': 'true' }, props.anchor, props.open ? React.createElement('div', { role: 'menu', 'data-host-menu': 'true' }, (props.items || []).map(it => React.createElement('button', { key: it.id, role: 'menuitemradio', onClick: () => props.onSelect?.(it.id) }, it.label)), props.children) : null) },
    Modal: props => { primitiveCalls.push('Modal'); return props.open ? React.createElement('div', { role: 'dialog', 'data-host-modal': 'true' }, props.children) : null },
  }

  let definition
  let client
  let primitivesRequestedAtLoad = false
  let allowPrimitivesNow = false
  let copiedClipboard = ''
  let focusedNode = null
  const popoverOpenedNodes = new Set()

  const sampleLibrary = {
    revision: 2,
    jobs: [],
    sources: [{ id: 'src-1', kind: 'bibtex', label: 'references.bib', importedAt: '2026-11-18T00:00:00Z', text: '@article{smith2026, title={Airy Design Systems}}' }],
    entries: [{
      id: 'entry-1',
      bibKey: 'smith2026',
      sourceIds: ['src-1'],
      warnings: [],
      crossref: null,
      work: {
        title: 'Airy Design Systems',
        doi: '10.1000/airy-2026',
        year: 2026,
        containerTitle: 'Journal of Interface Craft',
        authors: [{ family: 'Smith', given: 'Jane', name: '' }],
      },
    }],
  }

  runInNewContext(CLIENT_BUNDLE, {
    URL,
    AbortController,
    Event: FakeCustomEvent,
    CustomEvent: FakeCustomEvent,
    setTimeout,
    clearTimeout,
    setInterval: () => 1,
    clearInterval() {},
    document,
    navigator: {
      clipboard: {
        async writeText(val) { copiedClipboard = String(val) },
      },
    },
    fetch: async (_url, init) => {
      const body = init?.body ? JSON.parse(init.body) : { action: 'preferences' }
      if (!init?.body) return { ok: true, status: 200, json: async () => ({ hideWorkbench: false }) }
      if (typeof onApi === 'function') {
        const custom = await onApi(body, sampleLibrary)
        if (custom) return custom
      }
      if (body.action === 'list') return { ok: true, status: 200, json: async () => ({ ok: true, value: sampleLibrary }) }
      if (body.action === 'export') return { ok: true, status: 200, json: async () => ({ ok: true, value: { content: 'Smith, J. (2026). Airy Design Systems.' } }) }
      return { ok: true, status: 200, json: async () => ({ ok: true, value: sampleLibrary }) }
    },
    window: Object.assign(win, {
      __ModuleLoader__: {
        load(entry) {
          definition = entry
          client = entry.factory(name => {
            if (name === 'react') return React
            if (name === '@deepseek-ai/dsh-client-ui-primitives') {
              if (!allowPrimitivesNow) primitivesRequestedAtLoad = true
              if (withPrimitives) return hostPrimitives
              throw new Error('Primitives unavailable in standalone jsdom')
            }
            throw new Error('Unexpected dependency: ' + name)
          })
        },
      },
    }),
  })

  function materialize(vnode, ancestors = [], path = '0') {
    if (vnode === null || vnode === undefined || typeof vnode === 'boolean') return null
    if (typeof vnode === 'string' || typeof vnode === 'number') return String(vnode)
    if (Array.isArray(vnode)) return vnode.map((child, idx) => materialize(child, ancestors, path + '.' + idx)).filter(Boolean)
    if (typeof vnode.type === 'function') {
      const prevOwner = activeOwner
      const prevCursor = cursor
      const prevRefCursor = refCursor
      activeOwner = path + ':' + (vnode.type.name || 'anon')
      cursor = 0
      refCursor = 0
      try {
        return materialize(vnode.type(vnode.props || {}), ancestors, path)
      } finally {
        activeOwner = prevOwner
        cursor = prevCursor
        refCursor = prevRefCursor
      }
    }
    const attrs = {}
    for (const [k, v] of Object.entries(vnode.props || {})) {
      if (k !== 'children' && k !== 'ref' && v !== undefined) attrs[k] = v
    }
    const node = {
      tag: vnode.type === React.Fragment ? 'fragment' : String(vnode.type),
      attrs,
      children: [],
      setAttribute(name, val) {
        this.attrs[name] = String(val)
        if (name === 'data-dsh-portal-synced') syncedNodes.add(this)
      },
      hasAttribute(name) { return Object.hasOwn(this.attrs, name) },
      showPopover() { popoverOpenedNodes.add(this) },
      hidePopover() { popoverOpenedNodes.delete(this) },
      focus() { focusedNode = this },
      getBoundingClientRect() {
        return { left: 160, top: 44, width: 132, height: 30, right: 292, bottom: 74 }
      },
      querySelector(sel) {
        const matchSimple = el => {
          if (!el || typeof el !== 'object' || !el.attrs) return false
          for (const rawPart of String(sel).split(',')) {
            const part = rawPart.trim()
            if (!part) continue
            if (part.startsWith('.')) {
              const cls = String(el.attrs.className || '').split(/\s+/)
              if (cls.includes(part.slice(1))) return true
            } else if (part.startsWith('#')) {
              if (el.attrs.id === part.slice(1)) return true
            } else {
              const attrMatch = /^\[([^=\]]+)(?:=["']?([^"'\]]*)["']?)?\]$/.exec(part)
              if (attrMatch) {
                const [, attrName, attrVal] = attrMatch
                if (attrVal === undefined ? Object.hasOwn(el.attrs, attrName) : String(el.attrs[attrName]) === attrVal) return true
              }
            }
          }
          return false
        }
        return findNodes(this, matchSimple)[0] || null
      },
      closest(sel) {
        for (const item of [this, ...ancestors]) {
          if (sel.includes('[role="dialog"]') && item.attrs?.role === 'dialog') return item
          if (sel.includes('[role="menu"]') && item.attrs?.role === 'menu') return item
        }
        return null
      },
    }
    if (typeof vnode.props?.ref === 'function') {
      vnode.props.ref(node)
    } else if (vnode.props?.ref && typeof vnode.props.ref === 'object') {
      vnode.props.ref.current = node
    }
    const nextAncestors = [node, ...ancestors]
    node.children = (vnode.props?.children || []).map((child, idx) => materialize(child, nextAncestors, path + '/' + idx)).flat(Infinity).filter(Boolean)
    return node
  }

  const registrations = []
  const cleanups = []
  function flushEffects() {
    while (effects.length) {
      const fn = effects.shift()
      const cleanup = fn()
      if (typeof cleanup === 'function') cleanups.push(cleanup)
    }
  }

  return {
    definition,
    client,
    storage,
    win,
    primitiveCalls,
    get copiedClipboard() { return copiedClipboard },
    get focusedNode() { return focusedNode },
    resetFocusedNode() { focusedNode = null },
    get popoverOpenedNodes() { return popoverOpenedNodes },
    get primitivesRequestedAtLoad() { return primitivesRequestedAtLoad },
    async mountWorkbench(workbench = true, activeLocale = 'zh-CN') {
      allowPrimitivesNow = true
      const locale = { getSnapshot: () => ({ active: activeLocale }), subscribe: () => () => {} }
      client.apply({
        locale,
        get: () => locale,
        effect(fn) { return fn() },
        slots: {
          inject(_name, fn) { fn() },
          register(meta, component) { registrations.push({ meta, component }); return () => {} },
        },
      })
      await new Promise(r => setImmediate(r))
      const main = registrations.find(r => r.meta.name === (workbench ? 'main' : 'settings.section'))
      const render = () => {
        cursor = 0
        refCursor = 0
        idCounter = 0
        const tree = materialize(React.createElement(main.component, { locale, workbench }))
        flushEffects()
        return tree
      }
      let tree = render()
      await new Promise(r => setTimeout(r, 15))
      tree = render()
      await new Promise(r => setTimeout(r, 15))
      tree = render()
      return { tree, rerender: render, cleanup: () => cleanups.splice(0).forEach(fn => fn()) }
    },
  }
}

function findNodes(node, pred, acc = []) {
  if (!node || typeof node !== 'object') return acc
  if (pred(node)) acc.push(node)
  for (const child of node.children || []) {
    if (typeof child === 'object') findNodes(child, pred, acc)
  }
  return acc
}

function textOf(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  return (node.children || []).map(textOf).join('')
}

test('dsh-cite CSS bundle enforces Never-Too-Dark slate, 13 [data-dsh-style] presets, 8 [data-dsh-font] pairings, v3 layout primitives, clearances, icons and reduced-motion', async () => {
  const env = createMiniEnv({ withPrimitives: false })
  const mounted = await env.mountWorkbench(true, 'zh-CN')
  try {
    const cssText = findNodes(mounted.tree, n => n.tag === 'style').map(textOf).join('\n')
    assert.match(cssText, /body\[data-ds-dark-theme\] \[data-dsh-style="harness"\]/)
    assert.match(cssText, /--dsw-alias-bg-base:\s*#1f232b/)
    assert.match(cssText, /--dsw-alias-bg-layer-1:\s*#272c36/)
    for (const preset of ['harness', 'cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette']) {
      assert.ok(cssText.includes(`[data-dsh-style="${preset}"]`), `missing preset ${preset}`)
    }
    for (const fontId of ['songkai', 'fangsong', 'poster', 'retro98', 'serif', 'arcade', 'modern']) {
      assert.ok(cssText.includes(`[data-dsh-font="${fontId}"]`), `missing font rule ${fontId}`)
    }
    assert.match(cssText, /\.dsh-style-switcher/)
    assert.match(cssText, /\.dsh-font-trigger/)
    assert.match(cssText, /\.dsh-header/)
    assert.match(cssText, /\.dsh-tab-indicator/)
    assert.match(cssText, /\.dsh-split-resizer/)
    assert.match(cssText, /\.dsh-skeleton/)
    assert.match(cssText, /\.dsh-row-actions/)
    assert.match(cssText, /\[data-dsh-serif\]/)
    assert.match(cssText, /\.dsh-pixel-cursor/)
    assert.match(cssText, /translate:\s*1px 1px !important/)
    assert.match(cssText, /box-shadow:\s*2px 2px 0px #1e2826/)
    assert.match(cssText, /--dsh-frame-top-clearance/)
    assert.match(cssText, /--dsh-frame-leading-clearance/)
    assert.match(cssText, /\[data-window-drag-exclude\]/)
    assert.match(cssText, /@media \(prefers-reduced-motion: reduce\)/)
    assert.match(CLIENT_BUNDLE, /__stardustUpdatesFooter\(React, 'dsh-cite'\)/)
  } finally {
    mounted.cleanup()
  }
})

test('dsh-cite renders in standalone fallback mode, syncs all 13 styles + 8 fonts, exposes v3 header/resizer/skeleton/quick-actions, and stamps portaled dialogs', async () => {
  const env = createMiniEnv({ withPrimitives: false })
  assert.equal(env.primitivesRequestedAtLoad, false, 'must never eagerly require host primitives at load time')
  assert.equal(env.client.__internals.DSH_STYLES.length, 13)
  assert.equal(env.client.__internals.DSH_FONTS.length, 8)
  assert.equal(env.client.__internals.DSH_DEFAULT_FONT, 'arcade')

  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    assert.equal(root.attrs['data-dsh-style'], 'harness')
    assert.equal(root.attrs['data-dsh-font'], 'arcade')
    assert.equal(root.attrs['data-main'], 'true')

    // Verify unified 48px single-row header, sliding tab indicator, and materiality hooks
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-header')).length === 1)
    assert.ok(findNodes(root, n => String(n.attrs?.className || '').includes('dsh-tab-indicator')).length === 1)
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-tab-panel')).length === 1)
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-serif')).length >= 2)
    assert.ok(findNodes(root, n => String(n.attrs?.className || '').includes('dsh-pixel-cursor')).length >= 1)

    // Verify DshSplitResizer keyboard resize + double-click reset + localStorage persistence
    const resizer = findNodes(root, n => n.attrs?.role === 'separator' && Object.hasOwn(n.attrs || {}, 'data-dsh-resizer'))[0]
    assert.ok(resizer, 'DshSplitResizer must render in CiteLibrary')
    assert.equal(resizer.attrs['aria-valuenow'], 320)
    resizer.attrs.onKeyDown({ key: 'ArrowRight', preventDefault() {} })
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.role === 'separator')[0].attrs['aria-valuenow'], 336)
    assert.equal(env.storage.get('dsh-cite:list-width'), '336')
    findNodes(root, n => n.attrs?.role === 'separator')[0].attrs.onDoubleClick()
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.role === 'separator')[0].attrs['aria-valuenow'], 320)

    // Verify row hover quick-action bar quick copy
    const quickCopyBtn = findNodes(root, n => n.attrs?.['data-cite-quick-copy'] === 'entry-1')[0]
    assert.ok(quickCopyBtn, 'Row hover quick-copy button must render')
    await quickCopyBtn.attrs.onClick()
    root = mounted.rerender()
    await new Promise(r => setTimeout(r, 15))
    root = mounted.rerender()
    assert.match(env.copiedClipboard, /Airy Design Systems/)

    // Verify SVG icon micro-animation markers exist on buttons
    const icons = findNodes(root, n => n.tag === 'svg' && n.attrs['data-dsh-icon'])
    const iconNames = new Set(icons.map(n => n.attrs['data-dsh-icon']))
    for (const expected of ['book', 'plus', 'down', 'search', 'refresh', 'copy', 'file']) {
      assert.ok(iconNames.has(expected), 'missing data-dsh-icon=' + expected)
    }

    // Verify card & row motion hooks, and row checkbox renders no visible duplicate label text
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs, 'data-dsh-card')).length >= 3)
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs, 'data-dsh-row')).length >= 1)
    const rowCheck = findNodes(root, n => String(n.attrs?.className || '').includes('cite-reference-check'))[0]
    assert.ok(rowCheck, 'row checkbox container should exist')
    assert.equal(textOf(rowCheck).trim(), '', 'hiddenLabel row checkbox must not render duplicate visible title text')
    const rowCheckInput = findNodes(rowCheck, n => n.tag === 'input' && n.attrs?.type === 'checkbox')[0]
    assert.match(String(rowCheckInput?.attrs?.['aria-label'] || ''), /Select reference/)

    // Switch across all 13 styles via StyleSwitcher & verify localStorage + CustomEvent sync
    for (const preset of ['cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette', 'harness']) {
      const trigger = findNodes(root, n => n.attrs.id === 'cite-style-switcher')[0]
      assert.ok(trigger, 'style switcher trigger must exist')
      trigger.attrs.onClick()
      root = mounted.rerender()
      const items = findNodes(root, n => n.attrs.role === 'menuitemradio')
      assert.equal(items.length, 13)
      const index = env.client.__internals.DSH_STYLES.findIndex(s => s.id === preset)
      items[index].attrs.onClick()
      root = mounted.rerender()
      assert.equal(root.attrs['data-dsh-style'], preset)
      assert.equal(env.storage.get('dsh-stardust:ui-style'), preset)
    }

    // Switch across all 8 font pairings via FontSwitcher & verify localStorage + CustomEvent sync
    for (const fontId of ['auto', 'songkai', 'fangsong', 'poster', 'retro98', 'serif', 'modern', 'arcade']) {
      const fontTrigger = findNodes(root, n => n.attrs.id === 'cite-style-switcher-font')[0]
      assert.ok(fontTrigger, 'font switcher trigger must exist')
      fontTrigger.attrs.onClick()
      root = mounted.rerender()
      const items = findNodes(root, n => n.attrs.role === 'menuitemradio')
      assert.equal(items.length, 8)
      const index = env.client.__internals.DSH_FONTS.findIndex(f => f.id === fontId)
      items[index].attrs.onClick()
      root = mounted.rerender()
      assert.equal(root.attrs['data-dsh-font'], fontId)
      assert.equal(env.storage.get('dsh-stardust:ui-font'), fontId)
    }

    // External dsh-stardust-style and dsh-stardust-font events update the workbench and any open portaled dialog
    const rawBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('Raw source'))[0]
    assert.ok(rawBtn, 'Raw source modal trigger should render for entry with saved source')
    rawBtn.attrs.onClick()
    root = mounted.rerender()

    const dialog = findNodes(root, n => n.attrs.role === 'dialog')[0]
    assert.ok(dialog, 'Fallback Modal dialog should open')
    assert.equal(dialog.attrs['data-dsh-style'], 'harness')
    assert.equal(dialog.attrs['data-dsh-font'], 'arcade')
    assert.equal(dialog.attrs['data-window-drag-exclude'], '')

    env.win.localStorage.setItem('dsh-stardust:ui-style', 'pixel8bit')
    env.win.dispatchEvent(new env.win.CustomEvent('dsh-stardust-style', { detail: { style: 'pixel8bit' } }))
    env.win.localStorage.setItem('dsh-stardust:ui-font', 'songkai')
    env.win.dispatchEvent(new env.win.CustomEvent('dsh-stardust-font', { detail: { font: 'songkai' } }))
    root = mounted.rerender()
    const updatedDialog = findNodes(root, n => n.attrs.role === 'dialog')[0]
    assert.equal(root.attrs['data-dsh-style'], 'pixel8bit')
    assert.equal(root.attrs['data-dsh-font'], 'songkai')
    assert.equal(updatedDialog.attrs['data-dsh-style'], 'pixel8bit')
    assert.equal(updatedDialog.attrs['data-dsh-font'], 'songkai')

    // Copy citation button triggers check pop (`data-copied="true"`)
    const copyBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('Copy citation'))[0]
    assert.ok(copyBtn)
    await copyBtn.attrs.onClick()
    root = mounted.rerender()
    const popped = findNodes(root, n => n.attrs['data-copied'] === 'true')[0]
    assert.ok(popped, 'Copied button should expose data-copied="true" for check pop animation')
    assert.match(env.copiedClipboard, /Airy Design Systems/)

    // Switch to Import & Export tabs and verify SegmentedControl fallbacks
    const tabs = findNodes(root, n => n.attrs.role === 'tab')
    tabs.find(t => textOf(t).includes('Import')).attrs.onClick()
    root = mounted.rerender()
    const kindTabs = findNodes(root, n => n.attrs.role === 'tab' && textOf(n).includes('BibTeX'))
    assert.ok(kindTabs.length >= 1, 'Import input kind SegmentedControl fallback should render')
  } finally {
    mounted.cleanup()
  }
})

test('dsh-cite integrates host @deepseek-ai/dsh-client-ui-primitives when available and syncs portaled Modal', async () => {
  const env = createMiniEnv({ withPrimitives: true, initialStyle: 'claude' })
  assert.equal(env.primitivesRequestedAtLoad, false)
  const mounted = await env.mountWorkbench(true, 'zh-CN')
  try {
    let root = mounted.tree
    assert.equal(root.attrs['data-dsh-style'], 'claude')
    for (const primitive of ['Button', 'Input', 'Checkbox', 'Menu']) {
      assert.ok(env.primitiveCalls.includes(primitive), 'expected host primitive ' + primitive)
    }

    // Open StyleSwitcher Menu in host mode and verify HostMenuWithStyle stamps data-dsh-style + data-window-drag-exclude
    const switcher = findNodes(root, n => n.attrs.id === 'cite-style-switcher')[0]
    switcher.attrs.onClick()
    root = mounted.rerender()
    const hostMenu = findNodes(root, n => n.attrs['data-host-menu'] === 'true')[0]
    assert.ok(hostMenu)
    assert.equal(hostMenu.attrs['data-dsh-style'], 'claude')
    assert.equal(hostMenu.attrs['data-dsh-font'], 'arcade')
    assert.equal(hostMenu.attrs['data-window-drag-exclude'], '')

    // Open Raw source Modal and verify createOverlaySyncRef stamps data-dsh-style + data-dsh-font + data-window-drag-exclude onto host Modal dialog
    const rawBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('原始输入'))[0]
    rawBtn.attrs.onClick()
    root = mounted.rerender()
    assert.ok(env.primitiveCalls.includes('Modal'))
    const hostModal = findNodes(root, n => n.attrs['data-host-modal'] === 'true')[0]
    assert.ok(hostModal)
    assert.equal(hostModal.attrs['data-dsh-style'], 'claude')
    assert.equal(hostModal.attrs['data-dsh-font'], 'arcade')
    assert.equal(hostModal.attrs['data-window-drag-exclude'], '')

    // Switch to Import tab to verify host SegmentedControl
    const importTab = findNodes(root, n => n.attrs.role === 'tab' && textOf(n).includes('导入预览'))[0]
    importTab.attrs.onClick()
    mounted.rerender()
    assert.ok(env.primitiveCalls.includes('SegmentedControl'))
  } finally {
    mounted.cleanup()
  }
})

test('Cordis 4 ctx.effect unload disposer cleans up registered Cite tools and routes without ctx.on("dispose")', () => {
  let activeTools = 0
  let activeRoutes = 0
  const effects = []
  applyCiteServer({
    tools: {
      register() {
        activeTools++
        return () => { activeTools-- }
      },
    },
    effect(fn) {
      const cleanup = fn()
      if (typeof cleanup === 'function') effects.push(cleanup)
    },
    inject(names, cb) {
      if (names[0] === 'connection') {
        cb({
          effect(fn) {
            const cleanup = fn()
            if (typeof cleanup === 'function') effects.push(cleanup)
          },
          connection: {
            fetch: {
              register() {
                activeRoutes++
                return () => { activeRoutes-- }
              },
            },
          },
        })
      }
    },
  }, {})
  assert.equal(activeTools, 6)
  assert.equal(activeRoutes, 2)
  for (const dispose of effects.splice(0).reverse()) dispose()
  assert.equal(activeTools, 0)
  assert.equal(activeRoutes, 0)
})

test('dsh-cite CoachmarkTour (? Tour), inline prompt copy, sample filler, DOI-check-to-import handoff, label htmlFor, and remove confirmation work end-to-end', async () => {
  const apiCalls = []
  let simulateConflictOnce = true
  const env = createMiniEnv({
    withPrimitives: false,
    onApi: async (body, sampleLibrary) => {
      apiCalls.push(body)
      if (body.action === 'check') {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            value: {
              count: 2,
              results: [
                { doi: '10.1038/nature14539', ok: true, title: 'Deep learning' },
                { doi: '10.1000/bad-doi', ok: false, error: 'DOI 在 Crossref 中不存在：10.1000/bad-doi', errorEn: 'DOI not found in Crossref: 10.1000/bad-doi' },
              ],
            },
          }),
        }
      }
      if ((body.action ?? body.operation) === 'remove') {
        if (simulateConflictOnce) {
          simulateConflictOnce = false
          return {
            ok: false,
            status: 409,
            json: async () => ({
              ok: false,
              message: '文献库已在另一窗口更新，未执行删除。请刷新文献库后重新确认。',
              messageEn: 'The library changed elsewhere, so nothing was removed. Refresh the library and confirm again.',
            }),
          }
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            value: { revision: sampleLibrary.revision + 1, entries: [], sources: [], removed: 1, removedIds: [body.id] },
          }),
        }
      }
      return null
    },
  })

  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    const cssText = findNodes(root, n => n.tag === 'style').map(textOf).join('\n')
    assert.match(cssText, /\[popover\]:is\(:popover-open,\s*\.\\:popover-open\)\s*\{\s*display:\s*block;\s*\}/)
    assert.match(cssText, /\.cite-tour-card\[data-side="bottom"\]\s*>\s*\.cite-tour-arrow/)
    assert.match(cssText, /box-shadow:\s*4px 4px 0px #1e2826/)

    // Static workflow <details> box is completely removed
    assert.equal(findNodes(root, n => String(n.attrs?.className || '').includes('cite-workflow-guide')).length, 0)

    // 1. First-visit 280ms auto-open does NOT steal focus, and closes if a modal opens
    env.resetFocusedNode()
    await new Promise(r => setTimeout(r, 310))
    root = mounted.rerender()
    let tourCard = findNodes(root, n => n.attrs?.['data-tour-card'])[0]
    assert.ok(tourCard, 'CoachmarkTour auto-opens after 280ms on first visit')
    assert.equal(env.focusedNode, null, 'auto-opened tour must not hijack focus')

    // Opening a modal dialog automatically dismisses the auto-tour
    findNodes(root, n => n.tag === 'button' && textOf(n) === 'Remove')[0].attrs.onClick()
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.['data-tour-card']).length, 0, 'auto-tour closes when modal opens')
    findNodes(root, n => n.tag === 'button' && textOf(n) === 'Cancel')[0].attrs.onClick()
    root = mounted.rerender()

    // 2. Manual "? Tour" trigger in topbar focuses [data-tour-next], renders spotlight + directional arrow, steps 1->4, and persists 'done'
    const tourTrigger = findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-cite-tour-trigger'))[0]
    assert.ok(tourTrigger, 'topbar "? Tour" button must render')
    assert.equal(tourTrigger.attrs['aria-haspopup'], undefined, 'trigger must not set aria-haspopup')
    assert.equal(tourTrigger.attrs['aria-expanded'], false)

    tourTrigger.attrs.onClick()
    root = mounted.rerender()
    root = mounted.rerender() // flush measured spotlight layout
    assert.equal(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-cite-tour-trigger'))[0].attrs['aria-expanded'], true)

    const tourLayer = findNodes(root, n => n.attrs?.['data-cite-tour'])[0]
    assert.equal(tourLayer.attrs.popover, 'manual', 'tour layer promoted via setAttribute("popover", "manual")')
    assert.ok(env.popoverOpenedNodes.size >= 1, 'showPopover() called on tour layer')
    assert.ok(findNodes(tourLayer, n => n.attrs?.['data-tour-spotlight'])[0], 'spotlight cutout rendered around target')

    tourCard = findNodes(tourLayer, n => n.attrs?.['data-tour-card'])[0]
    assert.equal(tourCard.attrs.role, 'dialog')
    assert.equal(tourCard.attrs['aria-modal'], 'false')
    assert.match(textOf(tourCard), /1 \/ 4/)
    assert.ok(findNodes(tourCard, n => n.attrs?.['data-tour-arrow'])[0], 'directional arrow [data-tour-arrow] rendered')
    assert.ok(env.focusedNode && Object.hasOwn(env.focusedNode.attrs || {}, 'data-tour-next'), 'manual open focuses [data-tour-next]')

    // Step 2: DOI verification + inline 1-click prompt copy
    findNodes(tourCard, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    tourCard = findNodes(root, n => n.attrs?.['data-tour-card'])[0]
    assert.match(textOf(tourCard), /2 \/ 4/)
    const inlineCopyBtn = findNodes(tourCard, n => n.attrs?.['data-copy-prompt'] === 'Verify this paper’s DOI and metadata, then import it into my citation library')[0]
    assert.ok(inlineCopyBtn, 'Step 2 renders inline 1-click prompt copy button')
    await inlineCopyBtn.attrs.onClick()
    root = mounted.rerender()
    assert.equal(env.copiedClipboard, 'Verify this paper’s DOI and metadata, then import it into my citation library')

    // Step 3 -> Step 4 -> Finish ('Done') persists localStorage['dsh-cite.tour.v1'] = 'done' and restores focus
    findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    assert.match(textOf(findNodes(root, n => n.attrs?.['data-tour-card'])[0]), /3 \/ 4/)

    findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    tourCard = findNodes(root, n => n.attrs?.['data-tour-card'])[0]
    assert.match(textOf(tourCard), /4 \/ 4/)
    assert.match(textOf(tourCard), /Done/)

    findNodes(tourCard, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    await new Promise(r => setTimeout(r, 10))
    assert.equal(findNodes(root, n => n.attrs?.['data-tour-card']).length, 0, 'tour closes on Done')
    assert.equal(env.storage.get('dsh-cite.tour.v1'), 'done', 'completion persisted under dsh-cite.tour.v1')
    assert.ok(env.focusedNode && Object.hasOwn(env.focusedNode.attrs || {}, 'data-cite-tour-trigger'), 'focus restored to trigger button')

    // Verify all <label> elements on Library tab have explicit htmlFor matching an id
    const checkLabels = treeRoot => {
      const ids = new Set(findNodes(treeRoot, n => Boolean(n.attrs?.id)).map(n => n.attrs.id))
      for (const lbl of findNodes(treeRoot, n => n.tag === 'label')) {
        assert.ok(lbl.attrs.htmlFor, 'every <label> must have explicit htmlFor')
        assert.ok(ids.has(lbl.attrs.htmlFor), 'label htmlFor=' + lbl.attrs.htmlFor + ' must match a control id')
      }
    }
    checkLabels(root)

    // 3. Import tab: Fill sample BibTeX / DOI populates input in 1 click
    findNodes(root, n => n.attrs.role === 'tab' && textOf(n).includes('Import'))[0].attrs.onClick()
    root = mounted.rerender()
    checkLabels(root)
    const sampleBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('Fill sample BibTeX / DOI'))[0]
    assert.ok(sampleBtn, 'Fill sample BibTeX / DOI button should exist')
    sampleBtn.attrs.onClick()
    root = mounted.rerender()
    const importTextarea = findNodes(root, n => n.tag === 'textarea')[0]
    assert.match(importTextarea.attrs.value, /10\.1038\/nature14539/)

    // 4. DOI Check tab: Send to Import preview carries verified DOIs into Import tab
    findNodes(root, n => n.attrs.role === 'tab' && textOf(n).includes('DOI check'))[0].attrs.onClick()
    root = mounted.rerender()
    checkLabels(root)
    const checkTextarea = findNodes(root, n => n.tag === 'textarea')[0]
    checkTextarea.attrs.onChange({ target: { value: 'Draft refs: 10.1038/nature14539 and 10.1000/bad-doi' } })
    root = mounted.rerender()
    const checkForm = findNodes(root, n => n.tag === 'form')[0]
    await checkForm.attrs.onSubmit({ preventDefault() {} })
    root = mounted.rerender()
    const handoffBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('Send to Import preview'))[0]
    assert.ok(handoffBtn, 'Send to Import preview button must render when valid DOIs are found')
    handoffBtn.attrs.onClick()
    root = mounted.rerender()
    const prefilledTextarea = findNodes(root, n => n.tag === 'textarea')[0]
    assert.equal(prefilledTextarea.attrs.value, '10.1038/nature14539', 'only verified DOIs are pre-filled in Import')

    // 5. Library tab: Remove opens confirmation modal, handles 409 conflict, refreshes, and deletes
    findNodes(root, n => n.attrs.role === 'tab' && textOf(n).includes('Library'))[0].attrs.onClick()
    root = mounted.rerender()
    const removeBtn = findNodes(root, n => n.tag === 'button' && textOf(n) === 'Remove')[0]
    assert.ok(removeBtn, 'Remove button must render in CiteInspector')
    removeBtn.attrs.onClick()
    root = mounted.rerender()
    let modal = findNodes(root, n => n.attrs.role === 'dialog')[0]
    assert.ok(modal, 'Remove confirmation modal must open before deleting')
    assert.match(textOf(modal), /Airy Design Systems/)

    const confirmBtn = findNodes(modal, n => n.tag === 'button' && textOf(n).includes('Confirm remove'))[0]
    await confirmBtn.attrs.onClick()
    root = mounted.rerender()
    modal = findNodes(root, n => n.attrs.role === 'dialog')[0]
    assert.match(textOf(modal), /nothing was removed/i, '409 revision conflict should surface in confirmation dialog')

    const refreshConflictBtn = findNodes(modal, n => n.tag === 'button' && textOf(n).includes('Refresh library'))[0]
    assert.ok(refreshConflictBtn)
    await refreshConflictBtn.attrs.onClick()
    root = mounted.rerender()
    modal = findNodes(root, n => n.attrs.role === 'dialog')[0]
    const retryConfirmBtn = findNodes(modal, n => n.tag === 'button' && textOf(n).includes('Confirm remove'))[0]
    await retryConfirmBtn.attrs.onClick()
    root = mounted.rerender()

    assert.equal(findNodes(root, n => n.attrs.role === 'dialog').length, 0, 'modal closes after confirmed removal')
    assert.match(textOf(root), /Your library is empty/)
    const removePayloads = apiCalls.filter(c => (c.action ?? c.operation) === 'remove')
    assert.equal(removePayloads.length, 2)
    assert.equal(removePayloads[0].operation, 'remove')
    assert.equal(removePayloads[0].id, 'entry-1')
    assert.equal(removePayloads[0].citekey, 'smith2026')
    assert.equal(removePayloads[0].expectedRevision, 2)
  } finally {
    mounted.cleanup()
  }
})

test('dsh-cite renders DshSkeleton shimmer placeholders during pending DOI check', async () => {
  let resolveCheck
  const env = createMiniEnv({
    withPrimitives: false,
    onApi: async body => {
      if (body.action === 'check') {
        return new Promise(resolve => { resolveCheck = resolve })
      }
      return null
    },
  })
  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    findNodes(root, n => n.attrs.role === 'tab' && textOf(n).includes('DOI check'))[0].attrs.onClick()
    root = mounted.rerender()
    findNodes(root, n => n.tag === 'textarea')[0].attrs.onChange({ target: { value: '10.1038/nature14539' } })
    root = mounted.rerender()
    const pendingCheck = findNodes(root, n => n.tag === 'form')[0].attrs.onSubmit({ preventDefault() {} })
    root = mounted.rerender()

    const skeletons = findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-skeleton'))
    assert.ok(skeletons.length >= 2, 'DshSkeleton should render while DOI check is running')
    assert.ok(findNodes(root, n => n.attrs?.role === 'status' && n.attrs?.['aria-label'] === 'Checking DOIs…').length >= 1)

    resolveCheck({ ok: true, status: 200, json: async () => ({ ok: true, value: { count: 1, results: [{ doi: '10.1038/nature14539', ok: true, title: 'Deep learning' }] } }) })
    await pendingCheck
    root = mounted.rerender()
    assert.match(textOf(root), /Deep learning/)
  } finally {
    mounted.cleanup()
  }
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { apply as applyCiteServer, CitationWorkbench, resolveConfig } from '../lib/index.js'

const CLIENT_BUNDLE = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')

function createMiniEnv({ withPrimitives = false, initialStyle = null, initialLibrary = null, onApi } = {}) {
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

  const rawSourceStore = new Map([
    ['src-1', { id: 'src-1', kind: 'bibtex', label: 'references.bib', createdAt: '2026-11-18T00:00:00Z', text: '@article{smith2026, title={Airy Design Systems}}' }],
  ])

  const sampleLibrary = initialLibrary || {
    revision: 2,
    jobs: [],
    // Matches real CitationWorkbench summary() output: sources omit raw text until fetched via action: 'source'.
    sources: [{ id: 'src-1', kind: 'bibtex', label: 'references.bib', createdAt: '2026-11-18T00:00:00Z' }],
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
      if (body.action === 'source') {
        const ids = Array.isArray(body.ids) ? body.ids : [body.id]
        const found = ids.map(id => rawSourceStore.get(id)).filter(Boolean)
        return { ok: true, status: 200, json: async () => ({ ok: true, value: { ...(found.length === 1 ? { source: found[0] } : {}), sources: found } }) }
      }
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
    const nodeListeners = new Map()
    const node = {
      tag: vnode.type === React.Fragment ? 'fragment' : String(vnode.type),
      attrs,
      children: [],
      _listeners: nodeListeners,
      addEventListener(type, fn, opts) {
        if (!nodeListeners.has(type)) nodeListeners.set(type, [])
        nodeListeners.get(type).push({ fn, opts })
      },
      removeEventListener(type, fn) {
        const list = nodeListeners.get(type)
        if (!list) return
        const idx = list.findIndex(item => item.fn === fn)
        if (idx >= 0) list.splice(idx, 1)
      },
      dispatchEvent(event) {
        for (const item of [...(nodeListeners.get(event.type) || [])]) item.fn(event)
        return true
      },
      contains(target) {
        if (target === this) return true
        return this.children.some(child => typeof child === 'object' && child?.contains?.(target))
      },
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
    assert.match(cssText, /\.cite-constellation/)
    assert.match(cssText, /\.cite-starfield/)
    assert.match(cssText, /\.cite-filament/)
    assert.match(cssText, /\.cite-node\[data-active="true"\]/)
    assert.match(cssText, /scale\(1\.06\)/)
    assert.match(cssText, /\.cite-capsule/)
    assert.match(cssText, /\.cite-zettelkasten/)
    assert.match(cssText, /max-inline-size:\s*420px/)
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
  assert.equal(env.client.__internals.DSH_DEFAULT_FONT, 'auto')

  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    assert.equal(root.attrs['data-dsh-style'], 'harness')
    assert.equal(root.attrs['data-dsh-font'], 'auto')
    assert.equal(root.attrs['data-main'], 'true')

    // Verify unified 48px single-row header, sliding tab indicator, and default Spatial Constellation view
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-header')).length === 1)
    assert.ok(findNodes(root, n => String(n.attrs?.className || '').includes('dsh-tab-indicator')).length === 1)
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-tab-panel')).length === 1)
    assert.ok(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-dsh-serif')).length >= 2)
    assert.ok(findNodes(root, n => n.attrs?.['data-cite-view'] === 'graph').length === 1, 'Spatial Constellation must be the default landing view')
    assert.ok(findNodes(root, n => n.attrs?.['data-cite-node'] === 'entry-1').length === 1, 'orbital node renders on default starfield')
    assert.ok(findNodes(root, n => String(n.attrs?.className || '').includes('cite-zettelkasten')).length === 1, 'Floating Zettelkasten HUD renders by default')

    // Switch to classic List view via topbar 星图 / 列表 toggle and verify classic 3-column list remains 100% intact
    const listToggleBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['data-view-mode'] === 'list')[0]
    assert.ok(listToggleBtn, 'Topbar List toggle button must render')
    listToggleBtn.attrs.onClick()
    root = mounted.rerender()
    assert.ok(findNodes(root, n => n.attrs?.['data-cite-view'] === 'list').length === 1)
    assert.ok(findNodes(root, n => String(n.attrs?.className || '').includes('dsh-pixel-cursor')).length >= 1)

    // Verify DshSplitResizer keyboard resize + double-click reset + localStorage persistence
    const resizer = findNodes(root, n => n.attrs?.role === 'separator' && Object.hasOwn(n.attrs || {}, 'data-dsh-resizer'))[0]
    assert.ok(resizer, 'DshSplitResizer must render in CiteLibrary list view')
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
    await new Promise(r => setTimeout(r, 15))
    root = mounted.rerender()

    const dialog = findNodes(root, n => n.attrs.role === 'dialog')[0]
    assert.ok(dialog, 'Fallback Modal dialog should open')
    assert.equal(dialog.attrs['data-dsh-style'], 'harness')
    assert.equal(dialog.attrs['data-dsh-font'], 'arcade')
    assert.equal(dialog.attrs['data-window-drag-exclude'], '')
    assert.match(textOf(dialog), /@article\{smith2026, title=\{Airy Design Systems\}\}/, 'Raw source modal must fetch and render raw source text on demand')
    const copySourceBtn = findNodes(dialog, n => n.tag === 'button' && textOf(n).includes('Copy source'))[0]
    assert.ok(copySourceBtn, 'Copy source button must render after raw source text loads')
    await copySourceBtn.attrs.onClick()
    assert.equal(env.copiedClipboard, '@article{smith2026, title={Airy Design Systems}}')

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
    assert.ok(findNodes(root, n => n.attrs?.['data-cite-view'] === 'graph').length === 1, 'default host view is constellation')
    for (const primitive of ['Button', 'Input', 'Menu', 'SegmentedControl']) {
      assert.ok(env.primitiveCalls.includes(primitive), 'expected host primitive ' + primitive)
    }

    // Switch to classic List view to verify host Checkbox primitive too
    const listToggleBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['data-view-mode'] === 'list')[0]
    listToggleBtn.attrs.onClick()
    root = mounted.rerender()
    assert.ok(env.primitiveCalls.includes('Checkbox'), 'expected host primitive Checkbox in list view')

    // Switch back to Constellation view to verify host Menu & Modal from Constellation HUD
    const graphToggleBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['data-view-mode'] === 'graph')[0]
    graphToggleBtn.attrs.onClick()
    root = mounted.rerender()

    // Open StyleSwitcher Menu in host mode and verify HostMenuWithStyle stamps data-dsh-style + data-window-drag-exclude
    const switcher = findNodes(root, n => n.attrs.id === 'cite-style-switcher')[0]
    switcher.attrs.onClick()
    root = mounted.rerender()
    const hostMenu = findNodes(root, n => n.attrs['data-host-menu'] === 'true')[0]
    assert.ok(hostMenu)
    assert.equal(hostMenu.attrs['data-dsh-style'], 'claude')
    assert.equal(hostMenu.attrs['data-dsh-font'], 'auto')
    assert.equal(hostMenu.attrs['data-window-drag-exclude'], '')

    // Open Raw source Modal and verify createOverlaySyncRef stamps data-dsh-style + data-dsh-font + data-window-drag-exclude onto host Modal dialog
    const rawBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('原始输入'))[0]
    rawBtn.attrs.onClick()
    root = mounted.rerender()
    assert.ok(env.primitiveCalls.includes('Modal'))
    const hostModal = findNodes(root, n => n.attrs['data-host-modal'] === 'true')[0]
    assert.ok(hostModal)
    assert.equal(hostModal.attrs['data-dsh-style'], 'claude')
    assert.equal(hostModal.attrs['data-dsh-font'], 'auto')
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
    assert.equal(tourCard.attrs['data-tour-card'], 'capsule')
    assert.match(textOf(tourCard), /1 \/ 4/)
    assert.ok(findNodes(tourCard, n => n.attrs?.['data-tour-arrow'])[0], 'directional arrow [data-tour-arrow] rendered')
    assert.ok(env.focusedNode && Object.hasOwn(env.focusedNode.attrs || {}, 'data-tour-next'), 'manual open focuses [data-tour-next]')

    // Step 2: Draggable constellation node & live filaments + inline 1-click prompt copy
    findNodes(tourCard, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    root = mounted.rerender()
    tourCard = findNodes(root, n => n.attrs?.['data-tour-card'])[0]
    assert.equal(tourCard.attrs['data-tour-card'], 'orbit')
    assert.ok(findNodes(root, n => n.attrs?.['data-tour-spotlight'] === 'orbit')[0], 'Step 2 spotlight highlights orbital node')
    assert.match(textOf(tourCard), /2 \/ 4/)
    const inlineCopyBtn = findNodes(tourCard, n => n.attrs?.['data-copy-prompt'] === 'Verify this paper’s DOI and metadata, then import it into my citation library')[0]
    assert.ok(inlineCopyBtn, 'Step 2 renders inline 1-click prompt copy button')
    await inlineCopyBtn.attrs.onClick()
    root = mounted.rerender()
    assert.equal(env.copiedClipboard, 'Verify this paper’s DOI and metadata, then import it into my citation library')

    // Step 3 (Zettelkasten HUD) -> Step 4 (StyleSwitcher + FontSwitcher) -> Finish ('Done') persists localStorage['dsh-cite.tour.v1'] = 'done' and restores focus
    findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.['data-tour-card'])[0].attrs['data-tour-card'], 'zettelkasten')
    assert.ok(findNodes(root, n => n.attrs?.['data-tour-spotlight'] === 'zettelkasten')[0], 'Step 3 spotlight highlights Zettelkasten HUD')
    assert.match(textOf(findNodes(root, n => n.attrs?.['data-tour-card'])[0]), /3 \/ 4/)

    findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-tour-next'))[0].attrs.onClick()
    root = mounted.rerender()
    root = mounted.rerender()
    tourCard = findNodes(root, n => n.attrs?.['data-tour-card'])[0]
    assert.equal(tourCard.attrs['data-tour-card'], 'appearance')
    assert.ok(findNodes(root, n => n.attrs?.['data-tour-spotlight'] === 'appearance')[0], 'Step 4 spotlight highlights StyleSwitcher + FontSwitcher')
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

test('Spatial Citation Constellation deterministic layout produces zero overlaps for 1, 8, 25, and 50 papers at 1440x900', () => {
  const env = createMiniEnv({ withPrimitives: false })
  const { computeConstellationEdges, computeConstellationLayout } = env.client.__internals
  assert.equal(typeof computeConstellationEdges, 'function')
  assert.equal(typeof computeConstellationLayout, 'function')

  for (const count of [1, 8, 25, 50]) {
    const entries = Array.from({ length: count }, (_, idx) => ({
      id: 'paper-' + String(idx + 1).padStart(3, '0'),
      bibKey: 'author' + (2015 + (idx % 12)) + '_' + idx,
      sourceIds: ['src-1'],
      warnings: idx % 5 === 0 ? ['missing_doi'] : [],
      crossref: idx % 3 === 0 ? { doi: '10.1000/p-' + idx, fetchedAt: '2026-11-18T00:00:00Z', filled: [], conflicts: [] } : null,
      work: {
        title: 'Constellation Paper #' + (idx + 1),
        doi: idx % 5 === 0 ? '' : '10.1000/p-' + idx,
        year: 2015 + (idx % 12),
        containerTitle: ['Nature', 'NeurIPS', 'CHI', 'Science'][idx % 4],
        authors: [{ family: ['LeCun', 'Vaswani', 'Hinton', 'Bengio', 'Lovelace'][idx % 5], given: 'A', name: '' }],
      },
    }))
    const { edges } = computeConstellationEdges(entries)
    const layoutA = computeConstellationLayout(entries, edges, { width: 1440, height: 820 })
    const layoutB = computeConstellationLayout(entries, edges, { width: 1440, height: 820 })
    assert.deepEqual(layoutA.positions, layoutB.positions, `layout must be deterministic for N=${count}`)

    const list = entries.map(e => ({ id: e.id, ...layoutA.positions[e.id] }))
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const dx = Math.abs(list[i].x - list[j].x)
        const dy = Math.abs(list[i].y - list[j].y)
        const overlaps = dx < layoutA.nodeWidth && dy < layoutA.nodeHeight
        assert.equal(overlaps, false, `overlap detected for N=${count} between ${list[i].id} and ${list[j].id} (dx=${dx}, dy=${dy})`)
      }
    }
  }

  // Verify 8-paper constellation stays 100% clear of floating top-left capsule, bottom-right Zettelkasten HUD (~420x440), and bottom-left legend pill on both 1160x840 (sidebar open) and 1440x820
  const demo8 = Array.from({ length: 8 }, (_, idx) => ({
    id: 'demo-' + (idx + 1),
    bibKey: 'paper201' + idx,
    sourceIds: ['src-1'],
    warnings: idx < 2 ? ['missing_doi'] : [],
    crossref: idx >= 2 ? { doi: '10.1000/d-' + idx, fetchedAt: '2026-11-18T00:00:00Z', filled: [], conflicts: [] } : null,
    work: {
      title: 'Demo Constellation Paper ' + (idx + 1),
      doi: idx < 2 ? '' : '10.1000/d-' + idx,
      year: 2016 + (idx % 5),
      containerTitle: ['CVPR', 'NeurIPS', 'NAACL'][idx % 3],
      authors: [{ family: ['Vaswani', 'Devlin', 'He', 'Dosovitskiy', 'Brown', 'Huang', 'Radford', 'Kaiming'][idx], given: 'A', name: '' }],
    },
  }))
  const { edges: demoEdges } = computeConstellationEdges(demo8)
  for (const vp of [{ width: 1160, height: 840 }, { width: 1440, height: 820 }]) {
    const layout = computeConstellationLayout(demo8, demoEdges, vp)
    const halfW = layout.nodeWidth / 2
    const halfH = layout.nodeHeight / 2
    const rects = [
      { name: 'capsule', left: 0, top: 0, right: 436, bottom: 188 },
      { name: 'zettelkasten', left: layout.stageWidth - 448, top: layout.stageHeight - 460, right: layout.stageWidth, bottom: layout.stageHeight },
      { name: 'legend', left: 0, top: layout.stageHeight - 64, right: 412, bottom: layout.stageHeight },
    ]
    for (const entry of demo8) {
      const pos = layout.positions[entry.id]
      for (const rect of rects) {
        const hit = (pos.x + halfW > rect.left) && (pos.x - halfW < rect.right) && (pos.y + halfH > rect.top) && (pos.y - halfH < rect.bottom)
        assert.equal(hit, false, `node ${entry.id} at (${pos.x},${pos.y}) overlaps ${rect.name} HUD on ${vp.width}x${vp.height}`)
      }
    }
  }
})

test('Spatial Citation Constellation renders SVG filaments, pointer drag (setPointerCapture), node focus/dimming, search highlights, quality filters, and Zettelkasten metadata editing', async () => {
  const apiCalls = []
  let multiLibrary = {
    revision: 4,
    jobs: [],
    sources: [{ id: 'src-1', kind: 'bibtex', label: 'constellation.bib', createdAt: '2026-11-18T00:00:00Z' }],
    entries: [
      {
        id: 'p-1',
        bibKey: 'lecun2015deep',
        sourceIds: ['src-1'],
        warnings: [],
        crossref: { doi: '10.1038/nature14539', fetchedAt: '2026-11-18T00:00:00Z', filled: [], conflicts: [] },
        work: {
          title: 'Deep learning',
          doi: '10.1038/nature14539',
          year: 2015,
          containerTitle: 'Nature',
          type: 'journal-article',
          authors: [{ family: 'LeCun', given: 'Yann', name: '' }, { family: 'Bengio', given: 'Yoshua', name: '' }],
        },
      },
      {
        id: 'p-2',
        bibKey: 'vaswani2017attention',
        sourceIds: ['src-1'],
        warnings: ['missing_doi'],
        crossref: null,
        work: {
          title: 'Attention Is All You Need',
          doi: '',
          year: 2017,
          containerTitle: 'NeurIPS',
          type: 'proceedings-article',
          authors: [{ family: 'Vaswani', given: 'Ashish', name: '' }],
        },
      },
      {
        id: 'p-3',
        bibKey: 'shannon1948math',
        sourceIds: ['src-1'],
        warnings: [],
        crossref: null,
        work: {
          title: 'A Mathematical Theory of Communication',
          doi: '10.1002/j.1538-7305.1948.tb01338.x',
          year: 1948,
          containerTitle: 'Bell System Technical Journal',
          type: 'journal-article',
          authors: [{ family: 'Shannon', given: 'Claude', name: '' }],
        },
      },
    ],
  }

  const env = createMiniEnv({
    withPrimitives: false,
    initialLibrary: multiLibrary,
    onApi: async body => {
      apiCalls.push(body)
      if (body.action === 'list') {
        return { ok: true, status: 200, json: async () => ({ ok: true, value: multiLibrary }) }
      }
      if (body.action === 'update') {
        multiLibrary = {
          ...multiLibrary,
          revision: multiLibrary.revision + 1,
          entries: multiLibrary.entries.map(e => (
            e.id === body.id ? { ...e, bibKey: body.bibKey || e.bibKey, work: { ...e.work, ...body.work } } : e
          )),
        }
        return { ok: true, status: 200, json: async () => ({ ok: true, value: multiLibrary }) }
      }
      if (body.action === 'export') {
        return { ok: true, status: 200, json: async () => ({ ok: true, value: { content: body.kind === 'bibtex' ? '@article{lecun2015deep, title={Deep learning}}' : '[1] LeCun Y, Bengio Y. Deep learning[J]. Nature, 2015.' } }) }
      }
      return null
    },
  })

  const mounted = await env.mountWorkbench(true, 'zh-CN')
  try {
    let root = mounted.tree
    assert.ok(findNodes(root, n => n.attrs?.['data-cite-view'] === 'graph').length === 1)

    // 1. Verify SVG filaments link era neighbors (p-1 2015 <-> p-2 2017) while unrelated p-3 (1948) is dimmed to opacity 0.38
    const filaments = findNodes(root, n => n.tag === 'path' && String(n.attrs?.className || '').includes('cite-filament'))
    assert.ok(filaments.length >= 1, 'SVG relationship filaments must render')
    const p1Node = findNodes(root, n => n.attrs?.['data-cite-node'] === 'p-1')[0]
    const p2Node = findNodes(root, n => n.attrs?.['data-cite-node'] === 'p-2')[0]
    const p3Node = findNodes(root, n => n.attrs?.['data-cite-node'] === 'p-3')[0]
    assert.equal(p1Node.attrs['data-active'], 'true')
    assert.match(textOf(p1Node), /✦/)
    const p1AuthorSpan = findNodes(p1Node, n => String(n.attrs?.className || '').includes('cite-node-author'))[0]
    const p1YearSpan = findNodes(p1Node, n => String(n.attrs?.className || '').includes('cite-node-year'))[0]
    assert.ok(p1AuthorSpan && p1YearSpan, 'node header must separate truncatable author and non-shrinking year spans')
    assert.match(textOf(p1YearSpan), /2015/)
    assert.equal(p2Node.attrs['data-neighbor'], 'true')
    assert.equal(p2Node.attrs.style.opacity, 1)
    assert.equal(p3Node.attrs['data-dimmed'], 'true')
    assert.equal(p3Node.attrs.style.opacity, 0.38)
    assert.ok(filaments.some(f => f.attrs['data-active'] === 'true'), 'active filament connected to selected node glows')

    // 2. Real Direct Manipulation: drag p-1 via setPointerCapture & verify node + SVG filament update in real time
    const beforeLeft = parseInt(p1Node.attrs.style.left, 10)
    const beforeTop = parseInt(p1Node.attrs.style.top, 10)
    const beforePath = filaments[0].attrs.d
    let capturedId = null
    let releasedId = null
    const mockTarget = {
      setPointerCapture(id) { capturedId = id },
      releasePointerCapture(id) { releasedId = id },
    }
    p1Node.attrs.onPointerDown({ button: 0, pointerId: 7, clientX: 300, clientY: 250, currentTarget: mockTarget, stopPropagation() {} })
    p1Node.attrs.onPointerMove({ pointerId: 7, clientX: 390, clientY: 310, currentTarget: mockTarget })
    root = mounted.rerender()
    const draggedP1 = findNodes(root, n => n.attrs?.['data-cite-node'] === 'p-1')[0]
    assert.equal(capturedId, 7, 'setPointerCapture must be invoked on node pointerdown')
    assert.equal(parseInt(draggedP1.attrs.style.left, 10), beforeLeft + 90)
    assert.equal(parseInt(draggedP1.attrs.style.top, 10), beforeTop + 60)
    const updatedPath = findNodes(root, n => n.tag === 'path' && String(n.attrs?.className || '').includes('cite-filament'))[0].attrs.d
    assert.notEqual(updatedPath, beforePath, 'SVG relationship filament path must track dragged node in real time')
    draggedP1.attrs.onPointerUp({ pointerId: 7, currentTarget: mockTarget })
    root = mounted.rerender()
    assert.equal(releasedId, 7)

    // 3. Instant search highlights matching node on starfield
    const searchInput = findNodes(root, n => n.tag === 'input' && n.attrs?.type === 'search')[0]
    searchInput.attrs.onChange({ target: { value: 'Shannon' } })
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.['data-cite-node'] === 'p-3')[0].attrs['data-search-match'], 'true')
    assert.match(textOf(root), /匹配 1 \/ 3/)
    searchInput.attrs.onChange({ target: { value: '' } })
    root = mounted.rerender()

    // 4. Quality filter pill ('有字段缺失') filters to p-2
    const missingPill = findNodes(root, n => n.tag === 'button' && String(n.attrs?.className || '').includes('cite-pill-filter') && textOf(n).includes('有字段缺失'))[0]
    assert.ok(missingPill)
    missingPill.attrs.onClick()
    root = mounted.rerender()
    assert.equal(findNodes(root, n => Object.hasOwn(n.attrs || {}, 'data-cite-node')).length, 1)
    assert.ok(findNodes(root, n => n.attrs?.['data-cite-node'] === 'p-2').length === 1)

    // Reset filter to 全部 and verify Zettelkasten HUD 4 primary actions + Metadata Editor modal
    findNodes(root, n => n.tag === 'button' && String(n.attrs?.className || '').includes('cite-pill-filter') && textOf(n).includes('全部'))[0].attrs.onClick()
    root = mounted.rerender()
    const zettel = findNodes(root, n => String(n.attrs?.className || '').includes('cite-zettelkasten'))[0]
    assert.ok(zettel)
    for (const label of ['复制引文', '复制 BibTeX', 'Crossref 补全', '编辑元数据']) {
      assert.ok(findNodes(zettel, n => n.tag === 'button' && textOf(n).includes(label)).length >= 1, 'missing Zettelkasten button ' + label)
    }

    // Open 编辑元数据 modal, verify labels, update title, and save
    const editBtn = findNodes(zettel, n => n.tag === 'button' && textOf(n).includes('编辑元数据'))[0]
    editBtn.attrs.onClick()
    root = mounted.rerender()
    const dialog = findNodes(root, n => n.attrs?.role === 'dialog')[0]
    assert.ok(dialog, 'Metadata editor modal should open')
    const ids = new Set(findNodes(dialog, n => Boolean(n.attrs?.id)).map(n => n.attrs.id))
    for (const lbl of findNodes(dialog, n => n.tag === 'label')) {
      assert.ok(lbl.attrs.htmlFor && ids.has(lbl.attrs.htmlFor), 'every metadata editor label must match a control id')
    }
    const titleInput = findNodes(dialog, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-title'))[0]
    assert.ok(titleInput)
    titleInput.attrs.onChange({ target: { value: 'Deep learning (2nd ed.)' } })
    root = mounted.rerender()
    const saveMetaBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('保存元数据'))[0]
    await saveMetaBtn.attrs.onClick({ preventDefault() {} })
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.role === 'dialog').length, 0, 'Metadata editor modal closes after save')
    const updateCall = apiCalls.find(c => c.action === 'update')
    assert.ok(updateCall, 'action: update must be called')
    assert.equal(updateCall.work.title, 'Deep learning (2nd ed.)')
    assert.match(textOf(findNodes(root, n => String(n.attrs?.className || '').includes('cite-zettelkasten'))[0]), /Deep learning \(2nd ed\.\)/)
  } finally {
    mounted.cleanup()
  }
})

test('Raw source modal loads real text from CitationWorkbench backend (end-to-end) and metadata editor exposes all backend workTypes', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-cite-ui-e2e-'))
  const wb = new CitationWorkbench(resolveConfig({ timeoutMs: 2000 }), dir)
  t.after(async () => {
    wb.dispose()
    await rm(dir, { recursive: true, force: true })
  })

  const rawBibtex = '@incollection{chap2026,title={Chapter on Spatial Libraries},author={Chen, Lin},booktitle={Handbook of Knowledge Tools},year={2026},doi={10.1000/chap-2026}}'
  const preview = await wb.preview({ kind: 'bibtex', text: rawBibtex, label: 'chapters.bib' })
  await wb.import(preview.id, [0])

  const listed = await wb.list()
  assert.equal(listed.sources.length, 1)
  assert.equal(listed.sources[0].text, undefined, 'real backend list() strips source.text')

  const requestedActions = []
  const env = createMiniEnv({
    withPrimitives: false,
    onApi: async body => {
      requestedActions.push(body.action)
      const res = await wb.fetch(new Request('http://127.0.0.1:62041/api/dsh-cite/library', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' },
        body: JSON.stringify(body),
      }))
      const data = await res.json()
      return { ok: res.ok, status: res.status, json: async () => data }
    },
  })

  const mounted = await env.mountWorkbench(true, 'zh-CN')
  try {
    let root = mounted.tree
    const rawBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('原始输入'))[0]
    assert.ok(rawBtn, '原始输入 button must render from Zettelkasten card')
    rawBtn.attrs.onClick()
    root = mounted.rerender()
    await new Promise(r => setTimeout(r, 25))
    root = mounted.rerender()

    assert.ok(requestedActions.includes('source'), 'opening Raw source modal must call backend action: source')
    const dialog = findNodes(root, n => n.attrs?.role === 'dialog')[0]
    assert.ok(dialog, 'Raw source dialog must render')
    assert.match(textOf(dialog), /Chapter on Spatial Libraries/)
    assert.ok(textOf(dialog).includes(rawBibtex), 'Raw source dialog must display exact raw BibTeX from backend')
    const copyBtn = findNodes(dialog, n => n.tag === 'button' && textOf(n).includes('复制原文'))[0]
    assert.ok(copyBtn, '复制原文 button must render once backend returns raw text')
    await copyBtn.attrs.onClick()
    assert.equal(env.copiedClipboard, rawBibtex)

    // Close Raw source modal and verify Metadata Editor includes all backend workTypes (incl. book-chapter)
    const doneBtn = findNodes(dialog, n => n.tag === 'button' && textOf(n).includes('完成'))[0]
    doneBtn.attrs.onClick()
    root = mounted.rerender()

    const editBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('编辑元数据'))[0]
    assert.ok(editBtn)
    editBtn.attrs.onClick()
    root = mounted.rerender()
    const editDialog = findNodes(root, n => n.attrs?.role === 'dialog')[0]
    assert.ok(editDialog)
    const select = findNodes(editDialog, n => n.tag === 'select')[0]
    assert.ok(select)
    assert.equal(select.attrs.value, 'book-chapter')
    const optionValues = new Set(findNodes(select, n => n.tag === 'option').map(o => o.attrs.value))
    for (const expectedType of ['journal-article', 'proceedings-article', 'proceedings', 'book', 'monograph', 'edited-book', 'book-chapter', 'report', 'dissertation', 'dataset', 'patent', 'standard', 'posted-content', 'other']) {
      assert.ok(optionValues.has(expectedType), 'missing workType option: ' + expectedType)
    }
  } finally {
    mounted.cleanup()
  }
})

test('Constellation scales cleanly to 500 papers with zero overlaps, binds non-passive wheel zoom, exposes filament hit-testing, and Mica Fluent removes Retro 98 bevel', async () => {
  const env = createMiniEnv({ withPrimitives: false })
  const { computeConstellationEdges, computeConstellationLayout } = env.client.__internals

  // 100 and 500 papers all within 2 years (previously caused O(N^2) 4s freeze and 13 overlaps at N=500)
  for (const count of [100, 500]) {
    const dense = Array.from({ length: count }, (_, idx) => ({
      id: 'dense-' + String(idx + 1).padStart(4, '0'),
      bibKey: 'p' + idx,
      sourceIds: ['src-1'],
      warnings: [],
      crossref: null,
      work: {
        title: 'Dense Paper ' + (idx + 1),
        doi: '10.1000/dense-' + idx,
        year: 2024 + (idx % 2),
        containerTitle: ['NeurIPS', 'ICML', 'ICLR'][idx % 3],
        authors: [{ family: 'Author' + (idx % 10), given: 'A', name: '' }],
      },
    }))
    const { edges } = computeConstellationEdges(dense)
    assert.ok(edges.length > 0 && edges.length <= 280, `edge count must stay bounded for N=${count}, got ${edges.length}`)
    assert.ok(edges.some(e => e.kind === 'author'), 'shared-author edges must be prioritized')

    const layout = computeConstellationLayout(dense, edges, { width: 1440, height: 820 })
    for (let i = 0; i < dense.length; i++) {
      for (let j = i + 1; j < dense.length; j++) {
        const a = layout.positions[dense[i].id]
        const b = layout.positions[dense[j].id]
        const overlaps = Math.abs(a.x - b.x) < layout.nodeWidth && Math.abs(a.y - b.y) < layout.nodeHeight
        assert.equal(overlaps, false, `overlap in ${count}-paper constellation between ${dense[i].id} and ${dense[j].id}`)
      }
    }
  }

  // Mount workbench and verify non-passive wheel listener, trackpad damping, filament pointer-events, Center button, and Mica Fluent CSS fix
  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    const cssText = findNodes(root, n => n.tag === 'style').map(textOf).join('\n')
    assert.doesNotMatch(cssText, /\[data-dsh-style="win98"\]\s*:is\(\.cite-node[^}]*2px outset #ffffff/, 'Mica Fluent (win98) must not apply legacy Retro 98 bevel to Constellation cards')
    assert.match(cssText, /\.cite-workbench\s+\.cite-filament\s*\{[^}]*pointer-events:\s*visibleStroke/, 'SVG filaments must enable visibleStroke pointer-events so <title> tooltips work')

    const starfield = findNodes(root, n => n.attrs?.['data-tour'] === 'cite-starfield')[0]
    assert.ok(starfield, 'starfield must render')
    assert.equal(starfield.attrs.onWheel, undefined, 'starfield must not use synthetic passive onWheel')
    const wheelBindings = starfield._listeners.get('wheel') || []
    assert.equal(wheelBindings.length, 1, 'starfield must bind native wheel listener via addEventListener')
    assert.equal(wheelBindings[0].opts?.passive, false, 'native wheel listener must be { passive: false }')

    let prevented = false
    starfield.dispatchEvent({ type: 'wheel', deltaY: -120, deltaMode: 0, clientX: 220, clientY: 60, preventDefault() { prevented = true }, target: { closest: () => null } })
    root = mounted.rerender()
    assert.equal(prevented, true)
    assert.match(textOf(root), /110%/)

    // Tiny trackpad deltaY ticks must zoom gently instead of jumping to 155%
    for (let i = 0; i < 4; i++) {
      starfield.dispatchEvent({ type: 'wheel', deltaY: -5, deltaMode: 0, preventDefault() {}, target: { closest: () => null } })
    }
    root = mounted.rerender()
    assert.doesNotMatch(textOf(root), /155%/, 'trackpad micro-ticks must not slam zoom to max')

    // Wheel inside Zettelkasten card must NOT hijack card scroll
    prevented = false
    starfield.dispatchEvent({ type: 'wheel', deltaY: -120, deltaMode: 0, preventDefault() { prevented = true }, target: { closest: sel => sel.includes('.cite-zettelkasten') ? {} : null } })
    assert.equal(prevented, false)

    const centerBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['aria-label'] === 'Center active node')[0]
    assert.ok(centerBtn, 'Center active node button must render')
  } finally {
    mounted.cleanup()
  }
})

test('Metadata editor validates year, supports isbn/language, preserves draft across 409 refresh, and inspector resolves Crossref conflicts + Export copies all', async () => {
  const apiCalls = []
  let failOnce409 = true
  let state = {
    revision: 3,
    jobs: [],
    sources: [{ id: 'src-1', kind: 'bibtex', label: 'refs.bib', createdAt: '2026-11-26T00:00:00Z' }],
    entries: [
      {
        id: 'e-1',
        bibKey: 'alpha2024',
        sourceIds: ['src-1'],
        warnings: [],
        crossref: {
          doi: '10.1000/alpha',
          fetchedAt: '2026-11-26T00:00:00Z',
          filled: ['year'],
          conflicts: [{ field: 'title', local: 'Local Alpha Title', crossref: 'Official Crossref Alpha Title' }],
        },
        work: {
          title: 'Local Alpha Title',
          doi: '10.1000/alpha',
          year: 2024,
          containerTitle: 'Nature',
          type: 'journal-article',
          isbn: '',
          language: 'en',
          authors: [{ family: 'Smith', given: 'Jane', name: '' }],
        },
      },
      {
        id: 'e-2',
        bibKey: 'beta2026',
        sourceIds: ['src-1'],
        warnings: [],
        crossref: null,
        work: {
          title: 'Beta Newer Paper',
          doi: '10.1000/beta',
          year: 2026,
          containerTitle: 'Science',
          type: 'journal-article',
          isbn: '',
          language: 'en',
          authors: [{ family: 'Adams', given: 'Alan', name: '' }],
        },
      },
    ],
  }

  const env = createMiniEnv({
    withPrimitives: false,
    initialLibrary: state,
    onApi: async body => {
      apiCalls.push(body)
      if (body.action === 'list') {
        return { ok: true, status: 200, json: async () => ({ ok: true, value: state }) }
      }
      if (body.action === 'update') {
        if (failOnce409 && body.work?.isbn) {
          failOnce409 = false
          state = { ...state, revision: state.revision + 1 }
          return {
            ok: false,
            status: 409,
            json: async () => ({
              ok: false,
              message: '文献库已在另一窗口更新，未保存元数据修改。请刷新文献库后重试。',
              messageEn: 'The library changed elsewhere, so metadata edits were not saved. Refresh the library and try again.',
            }),
          }
        }
        state = {
          ...state,
          revision: state.revision + 1,
          entries: state.entries.map(e => {
            if (e.id !== body.id) return e
            const nextWork = { ...e.work, ...body.work }
            const nextCrossref = e.crossref
              ? { ...e.crossref, conflicts: e.crossref.conflicts.filter(c => nextWork[c.field] !== c.crossref) }
              : null
            return { ...e, bibKey: body.bibKey || e.bibKey, work: nextWork, crossref: nextCrossref }
          }),
        }
        return { ok: true, status: 200, json: async () => ({ ok: true, value: state }) }
      }
      if (body.action === 'export') {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            value: { content: body.kind === 'bibtex' ? '@article{alpha2024}\n\n@article{beta2026}' : '[1] Smith. Local Alpha Title.\n\n[2] Adams. Beta Newer Paper.' },
          }),
        }
      }
      return null
    },
  })

  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    // 1. Metadata Editor: invalid year rejected without API call; isbn/language edited; 409 refresh keeps unsaved draft!
    findNodes(root, n => n.tag === 'button' && textOf(n).includes('Edit metadata'))[0].attrs.onClick()
    root = mounted.rerender()
    let dialog = findNodes(root, n => n.attrs?.role === 'dialog')[0]
    assert.ok(dialog)

    const yearInput = findNodes(dialog, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-year'))[0]
    const isbnInput = findNodes(dialog, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-isbn'))[0]
    const langInput = findNodes(dialog, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-language'))[0]
    assert.ok(yearInput && isbnInput && langInput, 'metadata editor must include year, isbn, and language inputs')

    yearInput.attrs.onChange({ target: { value: '202x' } })
    root = mounted.rerender()
    await findNodes(root, n => n.tag === 'button' && textOf(n).includes('Save metadata'))[0].attrs.onClick({ preventDefault() {} })
    root = mounted.rerender()
    assert.equal(apiCalls.filter(c => c.action === 'update').length, 0, 'invalid year must block submit instead of zeroing')
    assert.match(textOf(findNodes(root, n => n.attrs?.role === 'dialog')[0]), /1 and 9999/)

    // Fix year & enter isbn -> first save gets 409 -> Refresh library preserves isbn draft -> retry save succeeds!
    findNodes(root, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-year'))[0].attrs.onChange({ target: { value: '2025' } })
    findNodes(root, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-isbn'))[0].attrs.onChange({ target: { value: '978-0-12-345678-9' } })
    root = mounted.rerender()
    await findNodes(root, n => n.tag === 'button' && textOf(n).includes('Save metadata'))[0].attrs.onClick({ preventDefault() {} })
    root = mounted.rerender()
    const refreshBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('Refresh library'))[0]
    assert.ok(refreshBtn, '409 conflict must present Refresh library button')
    await refreshBtn.attrs.onClick()
    root = mounted.rerender()
    const preservedIsbn = findNodes(root, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-isbn'))[0]
    assert.equal(preservedIsbn.attrs.value, '978-0-12-345678-9', 'Refresh after 409 must preserve unsaved metadata edits')
    await findNodes(root, n => n.tag === 'button' && textOf(n).includes('Save metadata'))[0].attrs.onClick({ preventDefault() {} })
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.role === 'dialog').length, 0, 'modal closes after retry save succeeds')

    // 2. Switch to List view, test sorting & 1-click Crossref conflict "Use" button
    findNodes(root, n => n.tag === 'button' && n.attrs?.['data-view-mode'] === 'list')[0].attrs.onClick()
    root = mounted.rerender()
    const sortSelect = findNodes(root, n => n.tag === 'select' && String(n.attrs?.className || '').includes('cite-sort-select'))[0]
    assert.ok(sortSelect, 'List view sort select must render')
    sortSelect.attrs.onChange({ target: { value: 'year-desc' } })
    root = mounted.rerender()
    const rowsAfterSort = findNodes(root, n => n.tag === 'li' && String(n.attrs?.className || '').includes('cite-reference-row'))
    assert.match(textOf(rowsAfterSort[0]), /Beta Newer Paper/, 'year-desc sort puts 2026 entry first')

    // Select e-1 and click "Use" on the Crossref title conflict
    findNodes(root, n => n.tag === 'button' && String(n.attrs?.className || '').includes('cite-reference-button') && textOf(n).includes('Local Alpha Title'))[0].attrs.onClick({ currentTarget: {} })
    root = mounted.rerender()
    const applyBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['data-apply-crossref-field'] === 'title')[0]
    assert.ok(applyBtn, 'Crossref conflict row must render 1-click Use button')
    await applyBtn.attrs.onClick()
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.['data-apply-crossref-field'] === 'title').length, 0, 'resolved conflict disappears after applying Crossref value')
    assert.match(textOf(root), /Official Crossref Alpha Title/)

    // 3. Switch to Export tab and test 1-click Copy all for References & BibTeX
    findNodes(root, n => n.attrs?.role === 'tab' && textOf(n).includes('Export'))[0].attrs.onClick()
    root = mounted.rerender()
    const copyRefsBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['data-export-copy'] === 'references')[0]
    const copyBibBtn = findNodes(root, n => n.tag === 'button' && n.attrs?.['data-export-copy'] === 'bibtex')[0]
    assert.ok(copyRefsBtn && copyBibBtn, 'Export tab must render 1-click Copy all buttons')
    await copyRefsBtn.attrs.onClick()
    assert.match(env.copiedClipboard, /Beta Newer Paper/)
    await copyBibBtn.attrs.onClick()
    assert.match(env.copiedClipboard, /@article\{beta2026\}/)
  } finally {
    mounted.cleanup()
  }
})

test('Import preview supports Select all valid / Deselect all & .bib drag-and-drop, and DOI check copies failed DOIs', async () => {
  const env = createMiniEnv({
    withPrimitives: false,
    onApi: async body => {
      if (body.action === 'preview') {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            value: {
              id: 'prev-1',
              revision: 2,
              label: 'dropped.bib',
              rows: [
                { index: 0, key: 'ok1', work: { title: 'Paper One', authors: [], year: 2024, doi: '10.1000/ok1' }, warnings: [], selectedDefault: true },
                { index: 1, key: 'cand', work: { title: 'Possible Dup', authors: [], year: 2024, doi: '' }, warnings: ['missing_doi'], candidate: true, selectedDefault: false },
                { index: 2, key: 'dup', work: { title: 'Existing', authors: [], year: 2024, doi: '10.1000/dup' }, warnings: [], duplicate: 'library', selectedDefault: false },
              ],
            },
          }),
        }
      }
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
                { doi: '10.1000/missing-one', ok: false, error: 'DOI 在 Crossref 中不存在：10.1000/missing-one', errorEn: 'DOI not found in Crossref: 10.1000/missing-one' },
              ],
            },
          }),
        }
      }
      return null
    },
  })

  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    // 1. Import tab: plain text drop is NOT intercepted; drag-and-drop .bib file -> Preview -> Select all valid / Deselect all
    findNodes(root, n => n.attrs?.role === 'tab' && textOf(n).includes('Import'))[0].attrs.onClick()
    root = mounted.rerender()
    const importForm = findNodes(root, n => n.tag === 'form')[0]
    let textDropPrevented = false
    importForm.attrs.onDrop({
      preventDefault() { textDropPrevented = true },
      dataTransfer: { types: ['text/plain'], files: [] },
    })
    assert.equal(textDropPrevented, false, 'plain text drops must not be intercepted by the .bib drop zone')

    await importForm.attrs.onDrop({
      preventDefault() {},
      dataTransfer: { types: ['Files'], files: [{ name: 'dropped.bib', size: 128, async text() { return '@article{ok1,title={Paper One},year={2024}}' } }] },
    })
    root = mounted.rerender()
    assert.match(findNodes(root, n => n.tag === 'textarea')[0].attrs.value, /Paper One/)

    await findNodes(root, n => n.tag === 'form')[0].attrs.onSubmit({ preventDefault() {} })
    root = mounted.rerender()
    assert.match(textOf(root), /Selected 1\/3/)

    const selectAllBtn = findNodes(root, n => n.tag === 'button' && Object.hasOwn(n.attrs || {}, 'data-preview-select-all'))[0]
    assert.ok(selectAllBtn)
    selectAllBtn.attrs.onClick()
    root = mounted.rerender()
    assert.match(textOf(root), /Selected 2\/3/, 'Select all valid selects candidate rows while skipping exact duplicates')

    const clearBtn = findNodes(root, n => n.tag === 'button' && Object.hasOwn(n.attrs || {}, 'data-preview-clear'))[0]
    assert.ok(clearBtn)
    clearBtn.attrs.onClick()
    root = mounted.rerender()
    assert.match(textOf(root), /Selected 0\/3/)

    // 2. DOI Check tab: Copy failed DOIs copies only failed DOIs
    findNodes(root, n => n.attrs?.role === 'tab' && textOf(n).includes('DOI check'))[0].attrs.onClick()
    root = mounted.rerender()
    findNodes(root, n => n.tag === 'textarea')[0].attrs.onChange({ target: { value: '10.1038/nature14539 10.1000/missing-one' } })
    root = mounted.rerender()
    await findNodes(root, n => n.tag === 'form')[0].attrs.onSubmit({ preventDefault() {} })
    root = mounted.rerender()
    const copyFailedBtn = findNodes(root, n => n.tag === 'button' && textOf(n).includes('Copy failed DOIs'))[0]
    assert.ok(copyFailedBtn, 'Copy failed DOIs button must render when any lookup fails')
    await copyFailedBtn.attrs.onClick()
    assert.equal(env.copiedClipboard, '10.1000/missing-one')
  } finally {
    mounted.cleanup()
  }
})

test('Constellation Zettelkasten resolves Crossref conflicts in 1 click, List sort pushes blank authors last, and 409 refresh handles failures & deleted entries', async () => {
  let failRefreshOnce = false
  let deleteOnRefresh = false
  let state = {
    revision: 5,
    jobs: [],
    sources: [{ id: 'src-1', kind: 'bibtex', label: 'refs.bib', createdAt: '2026-11-26T00:00:00Z' }],
    entries: [
      {
        id: 'c-1',
        bibKey: 'noauthor2024',
        sourceIds: ['src-1'],
        warnings: ['missing_authors'],
        crossref: {
          doi: '10.1000/c1',
          fetchedAt: '2026-11-26T00:00:00Z',
          filled: [],
          conflicts: [{ field: 'title', local: 'Draft Title', crossref: 'Verified Title' }],
        },
        work: { title: 'Draft Title', doi: '10.1000/c1', year: 2024, containerTitle: 'Nature', type: 'journal-article', authors: [] },
      },
      {
        id: 'c-2',
        bibKey: 'adams2025',
        sourceIds: ['src-1'],
        warnings: [],
        crossref: null,
        work: { title: 'Adams Study', doi: '10.1000/c2', year: 2025, containerTitle: 'Science', type: 'journal-article', authors: [{ family: 'Adams', given: 'Alan', name: '' }] },
      },
    ],
  }

  const env = createMiniEnv({
    withPrimitives: false,
    initialLibrary: state,
    onApi: async body => {
      if (body.action === 'list') {
        if (failRefreshOnce) {
          failRefreshOnce = false
          return { ok: false, status: 500, json: async () => ({ ok: false, message: '网络错误', messageEn: 'Temporary list failure.' }) }
        }
        if (deleteOnRefresh) {
          deleteOnRefresh = false
          state = { ...state, revision: state.revision + 1, entries: state.entries.filter(e => e.id !== 'c-1') }
        }
        return { ok: true, status: 200, json: async () => ({ ok: true, value: state }) }
      }
      if (body.action === 'update') {
        if (body.work?.publisher === 'Trigger409') {
          return { ok: false, status: 409, json: async () => ({ ok: false, message: '冲突', messageEn: 'The library changed elsewhere, so metadata edits were not saved. Refresh the library and try again.' }) }
        }
        state = {
          ...state,
          revision: state.revision + 1,
          entries: state.entries.map(e => {
            if (e.id !== body.id) return e
            const nextWork = { ...e.work, ...body.work }
            const nextCrossref = e.crossref
              ? { ...e.crossref, conflicts: e.crossref.conflicts.filter(c => nextWork[c.field] !== c.crossref) }
              : null
            return { ...e, work: nextWork, crossref: nextCrossref }
          }),
        }
        return { ok: true, status: 200, json: async () => ({ ok: true, value: state }) }
      }
      return null
    },
  })

  const mounted = await env.mountWorkbench(true, 'en-US')
  try {
    let root = mounted.tree
    // 1. Constellation Zettelkasten card shows Crossref conflict badge & 1-click Use button
    const zettel = findNodes(root, n => String(n.attrs?.className || '').includes('cite-zettelkasten'))[0]
    assert.match(textOf(zettel), /1 diff/)
    assert.match(textOf(zettel), /Crossref differences \(1\)/)
    const zettelApplyBtn = findNodes(zettel, n => n.tag === 'button' && n.attrs?.['data-apply-crossref-field'] === 'title')[0]
    assert.ok(zettelApplyBtn, 'Zettelkasten card must expose 1-click Use for Crossref conflicts')
    await zettelApplyBtn.attrs.onClick()
    root = mounted.rerender()
    assert.match(textOf(findNodes(root, n => String(n.attrs?.className || '').includes('cite-zettelkasten'))[0]), /Verified Title/)
    assert.equal(findNodes(root, n => n.attrs?.['data-apply-crossref-field'] === 'title').length, 0)

    // 2. Metadata editor 409 -> failed refresh keeps conflict UI & shows error inside modal -> next refresh sees deleted entry & closes modal with notice
    findNodes(root, n => n.tag === 'button' && textOf(n).includes('Edit metadata'))[0].attrs.onClick()
    root = mounted.rerender()
    findNodes(root, n => n.tag === 'input' && String(n.attrs?.id || '').endsWith('-publisher'))[0].attrs.onChange({ target: { value: 'Trigger409' } })
    root = mounted.rerender()
    await findNodes(root, n => n.tag === 'button' && textOf(n).includes('Save metadata'))[0].attrs.onClick({ preventDefault() {} })
    root = mounted.rerender()

    failRefreshOnce = true
    await findNodes(root, n => n.tag === 'button' && textOf(n).includes('Refresh library'))[0].attrs.onClick()
    root = mounted.rerender()
    let dialog = findNodes(root, n => n.attrs?.role === 'dialog')[0]
    assert.ok(dialog, 'modal stays open after failed refresh')
    assert.match(textOf(dialog), /Temporary list failure/, 'refresh error must appear inside the modal')
    assert.ok(findNodes(dialog, n => n.tag === 'button' && textOf(n).includes('Refresh library')).length === 1, 'conflict refresh button remains available on refresh failure')

    deleteOnRefresh = true
    await findNodes(dialog, n => n.tag === 'button' && textOf(n).includes('Refresh library'))[0].attrs.onClick()
    root = mounted.rerender()
    assert.equal(findNodes(root, n => n.attrs?.role === 'dialog').length, 0, 'modal closes cleanly when entry was removed in another window')
    assert.match(textOf(root), /removed in another window/i)

    // 3. List view sort by author puts entries with missing authors LAST, not first
    state = {
      ...state,
      entries: [
        { id: 'u-1', bibKey: 'blank', sourceIds: ['src-1'], warnings: ['missing_authors'], crossref: null, work: { title: 'No Author Paper', doi: '', year: 2024, containerTitle: '', type: 'other', authors: [] } },
        { id: 'u-2', bibKey: 'adams', sourceIds: ['src-1'], warnings: [], crossref: null, work: { title: 'Adams Paper', doi: '', year: 2025, containerTitle: '', type: 'other', authors: [{ family: 'Adams', given: 'Alan', name: '' }] } },
      ],
    }
    findNodes(root, n => n.tag === 'button' && n.attrs?.['data-view-mode'] === 'list')[0].attrs.onClick()
    root = mounted.rerender()
    await findNodes(root, n => n.tag === 'button' && n.attrs?.['aria-label'] === 'Refresh library')[0].attrs.onClick()
    root = mounted.rerender()
    findNodes(root, n => n.tag === 'select' && String(n.attrs?.className || '').includes('cite-sort-select'))[0].attrs.onChange({ target: { value: 'author' } })
    root = mounted.rerender()
    const sortedRows = findNodes(root, n => n.tag === 'li' && String(n.attrs?.className || '').includes('cite-reference-row'))
    assert.match(textOf(sortedRows[0]), /Adams Paper/, 'author A-Z sort must put authored entries ahead of blank-author entries')
    assert.match(textOf(sortedRows[1]), /No Author Paper/)
  } finally {
    mounted.cleanup()
  }
})

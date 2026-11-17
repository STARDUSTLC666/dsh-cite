/* DeepSeek Harness (>=0.2.2-rc.3) Unified Style Switcher & Safe Host Primitives.
 * Vendored from _dsh-design-system/style-switcher.js as classic script (no ESM exports)
 * so @stardustlc/dsh-updates/build acorn script parser succeeds without extra bundlers.
 */
const DSH_STYLE_STORAGE_KEY = 'dsh-stardust:ui-style';
const DSH_STYLE_EVENT = 'dsh-stardust-style';
const DSH_DEFAULT_STYLE = 'harness';

const DSH_STYLES = Object.freeze([
  Object.freeze({
    id: 'harness',
    zh: '原生清透',
    zhShort: '原生',
    en: 'Native Airy',
    enShort: 'Native',
    swatch: '#4176e6',
    surface: '#f8fafc',
  }),
  Object.freeze({
    id: 'cream',
    zh: '米白纸感',
    zhShort: '米白色',
    en: 'Warm Cream',
    enShort: 'Cream',
    swatch: '#9e5829',
    surface: '#faf7f0',
  }),
  Object.freeze({
    id: 'claude',
    zh: 'Claude 暖书卷',
    zhShort: 'Claude风',
    en: 'Claude Warmth',
    enShort: 'Claude',
    swatch: '#c96442',
    surface: '#f5f4ed',
  }),
  Object.freeze({
    id: 'pixel8bit',
    zh: '8-Bit 像素',
    zhShort: '8-Bit像素',
    en: 'Bright 8-Bit',
    enShort: '8-Bit',
    swatch: '#2e7d5b',
    surface: '#f4f6e8',
  }),
  Object.freeze({
    id: 'mint',
    zh: '晴空薄荷',
    zhShort: '薄荷',
    en: 'Airy Mint',
    enShort: 'Mint',
    swatch: '#0f766e',
    surface: '#f5fafb',
  }),
]);

const DSH_VALID_STYLE_IDS = new Set(DSH_STYLES.map(preset => preset.id));
const DSH_MEMORY_STYLE = { current: DSH_DEFAULT_STYLE };
const DSH_STYLE_SUBSCRIBERS = new Set();

function resolveDshWindow(win) {
  if (win && typeof win === 'object') return win;
  return typeof window !== 'undefined' ? window : null;
}

function normalizeDshStyle(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return DSH_VALID_STYLE_IDS.has(key) ? key : DSH_DEFAULT_STYLE;
}

function getDshStylePreset(value) {
  const id = normalizeDshStyle(value);
  return DSH_STYLES.find(preset => preset.id === id) || DSH_STYLES[0];
}

function readDshStyle(win) {
  const target = resolveDshWindow(win);
  if (!target) return DSH_MEMORY_STYLE.current;
  try {
    const raw = target.localStorage?.getItem(DSH_STYLE_STORAGE_KEY);
    if (raw !== null && raw !== undefined) {
      const normalized = normalizeDshStyle(raw);
      DSH_MEMORY_STYLE.current = normalized;
      return normalized;
    }
  } catch {
    // Restricted storage: fall back to in-memory style.
  }
  return DSH_MEMORY_STYLE.current || DSH_DEFAULT_STYLE;
}

function syncPortaledOverlays(style, doc) {
  const normalized = normalizeDshStyle(style);
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc || typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced]')) {
    el.setAttribute('data-dsh-style', normalized);
    if (!el.hasAttribute('data-window-drag-exclude')) {
      el.setAttribute('data-window-drag-exclude', '');
    }
  }
}

function writeDshStyle(nextStyle, win) {
  const normalized = normalizeDshStyle(nextStyle);
  DSH_MEMORY_STYLE.current = normalized;
  const target = resolveDshWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_STYLE_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledOverlays(normalized, target.document);
    if (typeof target.dispatchEvent === 'function') {
      try {
        const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEventCtor(DSH_STYLE_EVENT, { detail: { style: normalized } }));
        } else if (typeof Event === 'function') {
          const ev = new Event(DSH_STYLE_EVENT);
          ev.detail = { style: normalized };
          target.dispatchEvent(ev);
        }
      } catch {
        // Ignore synthetic event errors in minimal VM environments.
      }
    }
  }
  for (const notify of DSH_STYLE_SUBSCRIBERS) {
    try { notify(normalized); } catch {}
  }
  return normalized;
}

function subscribeDshStyle(onChange, win) {
  if (typeof onChange !== 'function') return () => {};
  DSH_STYLE_SUBSCRIBERS.add(onChange);
  const target = resolveDshWindow(win);
  if (!target || typeof target.addEventListener !== 'function') {
    return () => { DSH_STYLE_SUBSCRIBERS.delete(onChange); };
  }
  const onCustom = event => {
    const next = normalizeDshStyle(event?.detail?.style ?? readDshStyle(target));
    DSH_MEMORY_STYLE.current = next;
    syncPortaledOverlays(next, target.document);
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_STYLE_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshStyle(event?.newValue ?? readDshStyle(target));
    DSH_MEMORY_STYLE.current = next;
    syncPortaledOverlays(next, target.document);
    onChange(next);
  };
  target.addEventListener(DSH_STYLE_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    DSH_STYLE_SUBSCRIBERS.delete(onChange);
    target.removeEventListener(DSH_STYLE_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

function useDshStyle(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshStyle(win), next => writeDshStyle(next, win)];
  }
  const [style, setStyleState] = React.useState(() => readDshStyle(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshStyle(win);
      setStyleState(prev => (prev === current ? prev : current));
      syncPortaledOverlays(current, resolveDshWindow(win)?.document);
      return subscribeDshStyle(next => {
        setStyleState(prev => (prev === next ? prev : next));
      }, win);
    }, [win]);
  }
  const setStyle = next => {
    const resolved = typeof next === 'function' ? next(style) : next;
    const applied = writeDshStyle(resolved, win);
    setStyleState(applied);
    return applied;
  };
  return [style, setStyle];
}

function createOverlaySyncRef(style) {
  const normalized = normalizeDshStyle(style);
  return node => {
    if (!node || typeof node.setAttribute !== 'function') return;
    node.setAttribute('data-dsh-style', normalized);
    node.setAttribute('data-window-drag-exclude', '');
    node.setAttribute('data-dsh-portal-synced', 'true');
    if (typeof node.closest === 'function') {
      const overlay = node.closest('[role="dialog"], [role="alertdialog"], [role="menu"], dialog');
      if (overlay && typeof overlay.setAttribute === 'function') {
        overlay.setAttribute('data-dsh-style', normalized);
        overlay.setAttribute('data-window-drag-exclude', '');
        overlay.setAttribute('data-dsh-portal-synced', 'true');
      }
    }
  };
}

const DSH_ICON_PATHS = Object.freeze({
  book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
  calendar: ['M4 6h16v14H4z', 'M8 3v4M16 3v4M4 10h16'],
  mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
  inbox: ['M4 13 6 5h12l2 8v6H4z', 'M4 13h5l1 3h4l1-3h5'],
  send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
  rss: ['M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M4 11a9 9 0 0 1 9 9', 'M4 5a15 15 0 0 1 15 15'],
  slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
  shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
  layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
  play: ['m7 5 12 7-12 7Z'],
  video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
  search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
  plus: ['M12 5v14M5 12h14'],
  refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
  settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
  close: ['m6 6 12 12M18 6 6 18'],
  left: ['m14 5-7 7 7 7'],
  right: ['m10 5 7 7-7 7'],
  down: ['m5 9 7 7 7-7'],
  filter: ['M4 5h16M7 12h10M10 19h4'],
  download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
  upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
  copy: ['M9 9h10v11H9z', 'M5 15H4V4h10v1'],
  external: ['M14 4h6v6', 'M10 14 20 4', 'M18 13v6H5V6h6'],
  file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
  folder: ['M3 5h7l2 3h9v12H3z'],
  edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
  trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
  more: ['M5 12h.01M12 12h.01M19 12h.01'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
  check: ['m5 12 4 4L19 6'],
  quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
  star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
  reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
  link: ['M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11 4.9', 'M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L13 19.1'],
  lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3M12 14v3'],
  clip: ['m8 13 6-6a2.5 2.5 0 0 1 3.5 3.5l-7 7a4 4 0 0 1-5.7-5.7l8-8a5 5 0 0 1 7.1 7.1l-8 8'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  image: ['M3 4h18v16H3z', 'm3 17 6-6 5 5 2-2 5 5M16 8h.01'],
  palette: ['M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-2.2-4-4-9-4Z', 'M7.5 10.5h.01M10.5 7.5h.01M14.5 7.5h.01'],
  sparkles: ['m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z', 'M19 15v4M17 17h4'],
  sparkle: ['m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z', 'M19 15v4M17 17h4'],
  diff: ['M12 4v16', 'M4 8h5M6.5 5.5v5M4 16h5', 'M15 8h5M15 16h5'],
  moon: ['M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z'],
});

function renderDshIcon(React, { name = 'file', size = 16, paths = DSH_ICON_PATHS, spinning = false, ...props } = {}) {
  const h = React.createElement;
  const segments = paths[name] || DSH_ICON_PATHS[name] || DSH_ICON_PATHS.file;
  return h(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.65,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      focusable: 'false',
      'data-dsh-icon': name,
      'data-spinning': spinning ? 'true' : undefined,
      ...props,
    },
    segments.map((d, index) => h('path', { key: index, d })),
  );
}

const DSH_PRIMITIVES_CACHE = new WeakMap();

function resolveHostPrimitives(React, requireFn) {
  if (typeof requireFn === 'function' && DSH_PRIMITIVES_CACHE.has(requireFn)) {
    return DSH_PRIMITIVES_CACHE.get(requireFn);
  }
  const h = React.createElement;
  let host = null;
  if (typeof requireFn === 'function') {
    try {
      host = requireFn('@deepseek-ai/dsh-client-ui-primitives') || null;
    } catch {
      host = null;
    }
  }

  function FallbackButton({ variant = 'ghost', size = 'md', icon, className, children, type = 'button', ...rest }) {
    const cls = ['dsh-btn', 'dsh-btn-' + variant, 'dsh-btn-' + size, className].filter(Boolean).join(' ');
    return h(
      'button',
      { type, className: cls, ...rest },
      icon != null ? h('span', { className: 'dsh-fallback-btn-icon' }, icon) : null,
      children,
    );
  }

  function FallbackInput({ icon, className, ...rest }) {
    const cls = ['dsh-fallback-input-wrap', className].filter(Boolean).join(' ');
    return h(
      'span',
      { className: cls },
      icon != null ? h('span', { className: 'dsh-fallback-input-icon' }, icon) : null,
      h('input', rest),
    );
  }

  function FallbackCheckbox({ checked = false, onChange, label, disabled = false, title, className, ...rest }) {
    return h(
      'label',
      { className: ['dsh-checkbox-label', className].filter(Boolean).join(' '), title },
      h('input', {
        type: 'checkbox',
        checked: Boolean(checked),
        disabled,
        'aria-label': rest['aria-label'] || (typeof label === 'string' ? label : undefined),
        onChange: event => onChange?.(typeof event === 'boolean' ? event : Boolean(event?.target?.checked)),
        ...rest,
      }),
      label != null ? h('span', null, label) : null,
    );
  }

  function FallbackSwitch({ checked = false, onChange, label, disabled = false, title, className }) {
    return h(
      'button',
      {
        type: 'button',
        role: 'switch',
        'aria-checked': Boolean(checked),
        'aria-label': label,
        title,
        disabled,
        className,
        onClick: () => { if (!disabled) onChange?.(!checked); },
      },
      h('span', null),
    );
  }

  function FallbackSegmentedControl({ id, value, options = [], onChange, label, disabled = false, className }) {
    function handleKeys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event?.key)) return;
      event.preventDefault?.();
      const enabled = options.map((opt, idx) => ({ opt, idx })).filter(item => !item.opt.disabled);
      if (!enabled.length) return;
      const pos = Math.max(0, enabled.findIndex(item => item.idx === index));
      const nextItem = event.key === 'Home'
        ? enabled[0]
        : event.key === 'End'
          ? enabled[enabled.length - 1]
          : enabled[(pos + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
      if (nextItem && !disabled) {
        onChange?.(nextItem.opt.value);
        event.currentTarget?.parentElement?.querySelectorAll('[role="tab"]')?.[nextItem.idx]?.focus?.();
      }
    }
    return h(
      'div',
      { role: 'tablist', 'aria-label': label, className: ['dsh-segmented-fallback', className].filter(Boolean).join(' ') },
      options.map((opt, index) => {
        const selected = opt.value === value;
        return h(
          'button',
          {
            key: opt.value,
            id: id ? id + '-' + opt.value : undefined,
            type: 'button',
            role: 'tab',
            title: opt.title,
            'aria-selected': selected,
            tabIndex: selected ? 0 : -1,
            disabled: disabled || Boolean(opt.disabled),
            onClick: () => {
              if (!disabled && !opt.disabled && opt.value !== value) onChange?.(opt.value);
            },
            onKeyDown: event => handleKeys(event, index),
          },
          opt.label,
        );
      }),
    );
  }

  function FallbackSegmentedTabs({ label, value, onChange, items = [], className }) {
    function handleKeys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event?.key)) return;
      event.preventDefault?.();
      if (!items.length) return;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const target = items[next];
      if (target) {
        onChange?.(target.value);
        event.currentTarget?.parentElement?.querySelectorAll('[role="tab"]')?.[next]?.focus?.();
      }
    }
    return h(
      'div',
      { role: 'tablist', 'aria-label': label, className: ['dsh-segmented-fallback', className].filter(Boolean).join(' ') },
      items.map((item, index) => {
        const selected = item.value === value;
        return h(
          'button',
          {
            key: item.value,
            id: item.id,
            type: 'button',
            role: 'tab',
            'aria-selected': selected,
            tabIndex: selected ? 0 : -1,
            onClick: () => { if (item.value !== value) onChange?.(item.value); },
            onKeyDown: event => handleKeys(event, index),
          },
          item.label,
        );
      }),
    );
  }

  function FallbackMenuSurface({ className, children, ...rest }) {
    return h('div', { className, ...rest }, children);
  }

  function FallbackPill({ active, className, children, ...rest }) {
    return h(
      'button',
      {
        type: 'button',
        'data-active': active ? 'true' : undefined,
        className: ['dsh-pill-fallback', className].filter(Boolean).join(' '),
        ...rest,
      },
      children,
    );
  }

  function FallbackTag({ tone, className, children, ...rest }) {
    return h(
      'span',
      {
        'data-tone': tone || undefined,
        className: ['dsh-tag-fallback', className].filter(Boolean).join(' '),
        ...rest,
      },
      children,
    );
  }

  function FallbackDiffBlock({ diffs = [] }) {
    return h(
      'div',
      { className: 'dsh-diff-fallback' },
      diffs.map((item, index) =>
        h(
          'section',
          { key: item.path || index },
          h('strong', null, item.path),
          item.oldText ? h('pre', { 'data-diff': 'old' }, '- ' + item.oldText) : null,
          item.newText ? h('pre', { 'data-diff': 'new' }, '+ ' + item.newText) : null,
        ),
      ),
    );
  }

  function renderPortalSyncNode(styleValue) {
    const syncStyle = normalizeDshStyle(styleValue ?? readDshStyle());
    return h('span', {
      key: '__dsh_portal_sync__',
      ref: createOverlaySyncRef(syncStyle),
      hidden: true,
      'aria-hidden': 'true',
      'data-dsh-style': syncStyle,
    });
  }

  function FallbackMenu({
    open = false,
    anchor,
    items = [],
    children,
    selectedId,
    onSelect,
    onClose,
    footer,
    className,
    listClassName,
    dshStyle,
  }) {
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    return h(
      'div',
      { className: ['dsh-style-fallback-wrap', className].filter(Boolean).join(' ') },
      anchor,
      open
        ? h(
            'div',
            {
              role: 'menu',
              'data-dsh-style': style,
              'data-window-drag-exclude': '',
              'data-dsh-portal-synced': 'true',
              className: ['dsh-style-fallback-menu', listClassName].filter(Boolean).join(' '),
              onKeyDown: event => {
                if (event?.key === 'Escape') {
                  event.stopPropagation?.();
                  onClose?.();
                }
              },
            },
            items.map(item =>
              h(
                'button',
                {
                  key: item.id,
                  type: 'button',
                  role: 'menuitemradio',
                  'aria-checked': item.id === selectedId,
                  disabled: Boolean(item.disabled),
                  className: 'dsh-style-fallback-item',
                  onClick: () => {
                    if (!item.disabled) {
                      onSelect?.(item.id);
                      onClose?.();
                    }
                  },
                },
                h('span', null, item.label),
                item.id === selectedId ? h('span', { 'aria-hidden': 'true' }, '✓') : null,
              ),
            ),
            children,
            footer,
          )
        : null,
    );
  }

  function FallbackModal({
    open = true,
    onClose,
    title,
    closeLabel = 'Close',
    children,
    footer,
    className,
    contentClassName,
    onKeyDownCapture,
    headless = false,
    dshStyle,
  }) {
    if (!open) return null;
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    return h(
      'div',
      {
        className: 'dsh-fallback-modal-root',
        role: 'presentation',
        'data-dsh-style': style,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        onKeyDownCapture: event => {
          onKeyDownCapture?.(event);
          if (!event?.defaultPrevented && event?.key === 'Escape') {
            onClose?.();
          }
        },
      },
      h('div', { className: 'dsh-fallback-modal-mask', 'aria-hidden': 'true', onClick: onClose }),
      h(
        'div',
        {
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': title,
          tabIndex: -1,
          'data-dsh-style': style,
          'data-window-drag-exclude': '',
          'data-dsh-portal-synced': 'true',
          className: ['dsh-fallback-modal-dialog', className].filter(Boolean).join(' '),
        },
        headless
          ? children
          : h(
              React.Fragment || 'div',
              null,
              h(
                'header',
                null,
                h('h2', null, title),
                h('button', { type: 'button', 'aria-label': closeLabel, onClick: onClose }, '×'),
              ),
              h('div', { className: contentClassName }, children),
              footer ? h('footer', null, footer) : null,
            ),
      ),
    );
  }

  const WrappedMenu = host?.Menu
    ? function HostMenuWithStyle({ dshStyle, children, ...menuProps }) {
        if (!menuProps.open) {
          return children !== undefined ? h(host.Menu, menuProps, children) : h(host.Menu, menuProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle);
        return children !== undefined && children !== null
          ? h(host.Menu, menuProps, children, syncNode)
          : h(host.Menu, menuProps, syncNode);
      }
    : FallbackMenu;

  const WrappedModal = host?.Modal
    ? function HostModalWithStyle({ dshStyle, children, ...modalProps }) {
        if (!modalProps.open) {
          return children !== undefined ? h(host.Modal, modalProps, children) : h(host.Modal, modalProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle);
        return children !== undefined && children !== null
          ? h(host.Modal, modalProps, children, syncNode)
          : h(host.Modal, modalProps, syncNode);
      }
    : FallbackModal;

  const resolved = {
    ...(host || {}),
    isFallback: !host,
    Button: host?.Button || FallbackButton,
    Input: host?.Input || FallbackInput,
    Checkbox: host?.Checkbox || FallbackCheckbox,
    Switch: host?.Switch || FallbackSwitch,
    SegmentedControl: host?.SegmentedControl || FallbackSegmentedControl,
    SegmentedTabs: host?.SegmentedTabs || FallbackSegmentedTabs,
    MenuSurface: host?.MenuSurface || FallbackMenuSurface,
    Pill: host?.Pill || FallbackPill,
    Tag: host?.Tag || FallbackTag,
    DiffBlock: host?.DiffBlock || FallbackDiffBlock,
    Menu: WrappedMenu,
    Modal: WrappedModal,
  };
  if (typeof requireFn === 'function') {
    DSH_PRIMITIVES_CACHE.set(requireFn, resolved);
  }
  return resolved;
}

function createStyleSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  return function StyleSwitcher({
    style: controlledStyle,
    onChange,
    lang = 'zh',
    id = 'dsh-style-switcher',
    compact = false,
    disabled = false,
    align = 'end',
    className,
    formatOptionLabel,
    formatTriggerLabel,
    formatAriaLabel,
  } = {}) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const [open, setOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshStylePreset(activeStyle);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = typeof formatAriaLabel === 'function'
      ? formatAriaLabel(preset, isZh)
      : (isZh ? '界面风格：' + preset.zh : 'UI style: ' + preset.en);
    const visibleText = typeof formatTriggerLabel === 'function'
      ? formatTriggerLabel(preset, compact, isZh)
      : (compact ? (isZh ? preset.zhShort : preset.enShort) : (isZh ? preset.zh : preset.en));
    const items = DSH_STYLES.map(option => ({
      id: option.id,
      label: typeof formatOptionLabel === 'function'
        ? formatOptionLabel(option, isZh)
        : (isZh ? option.zh + ' (' + option.enShort + ')' : option.en),
    }));
    const selectStyle = nextId => {
      const applied = writeDshStyle(nextId);
      setSyncedStyle(applied);
      onChange?.(applied);
      setOpen(false);
    };

    return h(
      'div',
      {
        className: ['dsh-style-switcher', className].filter(Boolean).join(' '),
        'data-window-drag-exclude': '',
      },
      h(P.Menu, {
        open: open && !disabled,
        selectedId: activeStyle,
        dshStyle: activeStyle,
        items,
        align,
        portal: !P.isFallback,
        autoFocus: true,
        minWidthFromAnchor: true,
        onClose: () => setOpen(false),
        onSelect: selectStyle,
        anchor: h(
          P.Button,
          {
            id,
            variant: 'outline',
            size: 'sm',
            disabled,
            className: 'dsh-style-trigger',
            'aria-label': triggerLabel,
            'aria-haspopup': 'menu',
            'aria-expanded': Boolean(open && !disabled),
            title: triggerLabel,
            onClick: () => setOpen(prev => !prev),
            onKeyDown: event => {
              if (!open && (event?.key === 'ArrowDown' || event?.key === 'ArrowUp')) {
                event.preventDefault?.();
                setOpen(true);
              }
            },
          },
          h('span', {
            className: 'dsh-style-swatch',
            'aria-hidden': 'true',
            style: { '--dsh-swatch-color': preset.swatch },
          }),
          h('span', { className: 'dsh-style-label' }, visibleText),
          renderDshIcon(React, { name: 'down', size: 14 }),
        ),
      }),
    );
  };
}

// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
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
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
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
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesFooter(React, name) {
  return React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, __stardustUpdatesFooter(React, name));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // Transitive Suite rows identify the migration entry in existing workbenches.
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && row.enabled);
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 3, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < 3 && !record.upgrading) {
    // The first loaded participant may still own a pre-footer client. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 3; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, deferredUntil: 0, ignoredVersion: null };
  const rowFor = name => state?.rows.find(row => row.name === name);
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), ['check', 'check-when-due'].includes(body.action) ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发布信息已变化，本次未安装。请重新检查。', 'Release metadata changed. Nothing was installed; check again.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('先将 Suite 组件迁移为独立安装。', 'Convert Suite components to independent installations first.'),
      'suite-hmr-required': t('切换安装方式需要宿主启用热重载。', 'Converting Suite requires Host hot reload.'),
      'suite-inventory-changed': t('套件与独立插件的安装状态或 Loader 条目不一致，请在原生插件详情检查。', 'Suite and standalone bundle inventory or Loader entries differ. Review native plugin details.'),
      'suite-stage-failed': t('切换安装方式时宿主报告失败，请在插件管理中查看详情。', 'The Host reported a conversion failure. See native plugin management for details.'),
      'suite-recovery-required': t('Suite 的上次切换等待恢复。', 'The previous Suite conversion needs recovery.'),
      'suite-recovery-unreadable': t('Suite 恢复记录无法读取，请在原生插件管理中检查已安装组件。', 'The Suite recovery record is unreadable. Check the installed bundles in native plugin management.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
      'version-mismatch': t('宿主装入的版本与目标不同。请重新检查版本和软件源策略。', 'The installed version differs from the target. Check the release and registry policy.'),
      'unexpected-package': t('宿主装入的包或版本与目标不同。请检查版本和软件源策略。', 'The installed package or version differed from the target. Check the release and registry policy.'),
      'version-unconfirmed': t('尚未确认新版已加载，请在插件详情中检查当前版本。', 'The new version could not be confirmed. Check the installed version in plugin details.'),
      'build-blocked': t('构建脚本等待批准。请查看原生插件管理中的安装提示。', 'Build scripts await approval. Review the install details in native plugin management.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    if (job.mode === 'migration') {
      return ({
        complete: t('Suite 已切换为独立安装', 'Suite components are now installed independently'),
        'restart-required': t('切换配置已保存，等待重启', 'Conversion saved. Restart Harness to finish'),
        restored: t('切换失败，已恢复 Suite', 'Conversion failed; Suite restored'),
        'restore-failed': t('恢复 Suite 失败', 'Suite recovery failed'),
        cancelled: t('已取消切换', 'Conversion cancelled'),
        failed: t('切换失败', 'Conversion failed'),
      })[job.state] || ({
        checking: t('正在核对 Suite 组件', 'Checking Suite components'),
        installing: t('正在准备独立插件', 'Preparing independent bundles'),
        applying: t('正在切换加载方式', 'Switching bundle activation'),
        restoring: t('正在恢复 Suite', 'Restoring Suite'),
      })[job.phase];
    }
    if (job.state === 'installing') {
      const phase = ({
        checking: t('宿主正在检查版本', 'Host checking release'),
        removing: t('正在卸载旧版', 'Unloading the previous version'),
        applying: t('正在加载新版', 'Loading the new version'),
        restoring: t('正在恢复旧版', 'Restoring the previous version'),
      })[job.phase];
      if (phase) return phase;
    }
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  function FooterFrame({ name, label, subtitle, actions, children }) {
    return h('section', { className: 'dshw plugin-updates-footer', 'data-plugin-update-footer': name, 'aria-label': label + t(' · 版本与更新', ' · Version and updates') },
      h('style', null, W.styles),
      h('style', null, '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:28px;padding-top:18px;border-top:1px solid var(--dsw-alias-border-l3,#e5e7eb);min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px}.plugin-updates-footer h2{font-size:14px;line-height:22px;margin:0;font-weight:600}.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere;margin:4px 0}.plugin-updates-footer .updates-options{margin-top:12px}.plugin-updates-footer .updates-options>summary{cursor:pointer;font-size:12px;line-height:22px;color:var(--dsw-alias-label-secondary,#657080)}.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:4px}.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;padding:14px 0 0}.plugin-updates-footer .updates-note{margin:5px 0 0;font-size:12px;line-height:1.6}.plugin-updates-footer>.w-section{margin:10px 0 0;padding:0;border:0}.plugin-updates-footer .w-toolbar{margin-top:10px!important}.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}.plugin-updates-footer .w-switch-track{flex-shrink:0}.plugin-updates-footer .updates-notes{margin-top:12px;padding:12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:10px}.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:240px;overflow:auto;font:12px/1.7 ui-monospace,monospace}.plugin-updates-footer .w-overlay{z-index:1002}@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}'),
      h('div', { className: 'updates-head' }, h('div', null, h('h2', null, t('版本与更新', 'Version and updates')), h('p', { className: 'updates-subtitle w-muted' }, subtitle)), actions), children);
  }
  function Panel({ name }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false);
    const row = rowFor(name), target = name, prefs = preferences(name);
    const suiteEntry = !!row?.bundledBy || (name === '@stardustlc/dsh-suite' && row?.enabled);
    const managed = row?.sourceKind === 'registry' && !suiteEntry;
    const latestJob = snapshot?.job;
    const job = latestJob?.name === name || latestJob?.mode === 'migration' && (latestJob.requestedName === name || suiteEntry && activeJob()) ? latestJob : null;
    useEffect(() => {
      if (managed && prefs.checkEnabled) void api({ action: 'check-when-due', name }).then(refresh).catch(() => {});
    }, [name, managed, prefs.checkEnabled]);
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      await perform(async () => {
        try {
          await heartbeat();
          const started = await api(request);
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
        } finally { manualOperation = false; notify(); }
      });
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (!snapshot) return h(W.Status, null, t('正在读取更新状态…', 'Loading update status…'));
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy);
    const busy = working || activeJob() || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known
      || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const installLocked = busy || unconfirmed || !!snapshot.suiteRecovery;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const canMigrate = snapshot.suiteMigration && !installLocked && !snapshot.pendingRestart;
    const canRecover = snapshot.suiteRecovery?.version && snapshot.suiteMigration && !busy && !snapshot.pendingRestart;
    const showUpdate = managed && row.available;
    const canConfirm = showUpdate && row.release.version === selectedVersion && !installLocked && !row.loadError;
    function progress() {
      if (!job) return null;
      const result = job.outcome?.result;
      const reason = job.reason || (result?.pendingBuilds || result?.failureKind === 'build-blocked' ? 'build-blocked' : result?.error?.code);
      const canCancel = activeJob() && !['applying', 'restoring'].includes(job.phase);
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁', ' · Automatic patch') : '')),
        job.total && activeJob() && h('p', { className: 'w-muted' }, job.completed + ' / ' + job.total),
        reason && h(W.Status, { tone: 'error' }, message(reason)),
        canCancel && h(W.Button, { disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消', 'Cancel')));
    }
    function windowControls() {
      if (!(snapshot.pages.clients || []).some(client => !client.fresh)) return null;
      return h('div', null,
        h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows'))),
        dialog === 'windows' && h(W.Dialog, { title: t('断开的窗口都已关闭？', 'Are the disconnected windows closed?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
          h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm'))))));
    }
    function recoveryControls() {
      if (!snapshot.suiteRecovery) return null;
      if (snapshot.suiteRecovery.restartRequired) return h(W.Status, null, t('请重启 Harness。下次启动时会核对独立插件是否已加载。', 'Restart Harness. It will verify that the individual plugins loaded at startup.'));
      return h('div', null,
        h(W.Status, null, snapshot.suiteRecovery.awaitingVerification
          ? t('正在核对独立插件的加载状态。若仍有插件无法加载，可以恢复 Suite。', 'Checking the individual plugins. Recover Suite if any still fail to load.')
          : message(snapshot.suiteRecovery.error || 'suite-recovery-required')),
        snapshot.suiteRecovery.version && h(W.Button, { disabled: !canRecover, onClick: () => setDialog('recovery') }, t('恢复 Suite', 'Recover Suite')),
        dialog === 'recovery' && h(W.Dialog, { title: t('恢复上次 Suite 切换？', 'Recover the previous Suite conversion?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
          h('div', { className: 'w-stack' },
            h('p', null, t('Harness 会核对当前组件状态，并按需恢复切换前的安装方式。', 'Harness checks the current component state and recovers the previous installation if needed.')),
            h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
              h(W.Button, { variant: 'primary', disabled: !canRecover, onClick: () => runOperation({ action: 'recover-suite', name, confirmation: 'restore-previous-suite' }) }, t('确认恢复', 'Recover'))))));
    }
    if (!row) return recoveryControls() || progress() || h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? row.labelEn : row.label;
    if (suiteEntry) return h(FooterFrame, { name, label: title, subtitle: name + ' · ' + row.version, actions: h(W.Button, { variant: 'primary', disabled: !canMigrate, onClick: () => setDialog('migration') }, t('切换为独立安装', 'Use independent installations')) },
      h(W.Status, null, snapshot.suiteMigration ? t('组件随 Suite 安装。切换后即可单独更新。', 'These components are installed by Suite. Convert them for per-plugin updates.') : message('suite-hmr-required')),
      (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      snapshot.pendingRestart && h(W.Status, null, message('restart-required')),
      error && h(W.Status, { tone: 'error' }, message(error)),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      windowControls(),
      recoveryControls(),
      progress(),
      dialog === 'migration' && h(W.Dialog, { title: t('将 Suite 组件切换为独立安装？', 'Convert Suite components to independent installations?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
        h('div', { className: 'w-stack' }, h('p', null, t('Harness 会卸载旧 Suite 包，以当前版本登记各组件并恢复配置。切换期间组件会暂时卸载。', 'Harness removes the old Suite bundle and registers the components independently at the same versions with their existing settings. The components unload during the conversion.')),
          h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { variant: 'primary', disabled: !canMigrate, onClick: () => runOperation({ action: 'migrate-suite', name, confirmation: 'convert-suite-to-independent-bundles' }) }, t('确认切换', 'Convert installations'))))));
    const status = row.sourceKind !== 'registry' ? t('请通过原安装方式更新', 'Update through the original installation method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error. Check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed. Try again') : row.release && !row.release.compatible ? 'v' + row.release.version + ' · ' + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : row.available ? (prefs.ignoredVersion === row.release.version ? t('已忽略提醒，仍可手动更新', 'Reminder ignored. Manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet');
    const checkButton = variant => h(W.Button, { variant, icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : t('检查更新', 'Check for updates'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setSelectedVersion(row.release.version); setDialog('install'); } }, t('更新至 v', 'Update to v') + row.release.version)
      : managed ? checkButton() : null;
    return h(FooterFrame, { name, label: title, subtitle: name + ' · ' + row.version, actions: primary },
      h('section', { className: 'w-section' },
        h('p', { className: 'w-muted updates-note' }, status),
        showUpdate && row.blockedRelease && h('p', { className: 'w-muted updates-note' }, 'v' + row.blockedRelease.version + ' · ' + requirement(row.blockedRelease) + (row.blockedRelease.required ? ' (' + row.blockedRelease.required + ')' : '')),
        !row.enabled && h('p', { className: 'w-muted' }, t('当前已停用。', 'Currently disabled.')),
        row.checkedAt && h('p', { className: 'w-muted updates-note' }, t('上次检查 ', 'Last checked ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN')),
        h('div', { className: 'w-toolbar' },
          showUpdate && checkButton('ghost'),
          row.release && h(W.Button, { variant: 'ghost', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          showUpdate && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          showUpdate && prefs.ignoredVersion !== row.release.version && h(W.Button, { variant: 'ghost', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')))),
      notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') }, h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')), loadingNotes ? h('p', null, t('正在读取…', 'Loading…')) : notes?.text ? h('pre', null, notes.text) : h('p', null, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')), notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog'))),
      h('details', { className: 'updates-options' }, h('summary', null, t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? t('自动安装：开', 'Install: on') : t('自动安装：关', 'Install: off')), h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，后台每 15 分钟检查。', 'On by default. Checks run every 15 minutes.'))),
        h('div', null, h(W.Switch, { label: t('空闲时自动安装这个插件的补丁', 'Install patches for this plugin while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || row.sourceKind !== 'registry', onChange: event => event.target.checked ? setDialog('automatic') : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅空闲且没有未保存修改时安装兼容补丁。其他插件的开关不变。', 'Off by default. Explicitly enable compatible patches while idle with no unsaved changes. Other plugins’ settings stay unchanged.'))))),
      error && h(W.Status, { tone: 'error' }, message(error)), snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有更新等待手动重启后生效。你可以继续工作，自动安装已暂停。', 'Some updates need a manual restart. Continue your work; automatic installation is paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')), (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      prefs.deferredUntil > Date.now() && h(W.Status, null, t('此插件已推迟提醒和自动安装 24 小时，仍可手动更新。', 'Reminders and automatic installation for this plugin are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      recoveryControls(),
      progress(),
      ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? t('允许这个插件自动安装补丁？', 'Allow automatic patches for this plugin?') : t('确认更新此插件', 'Confirm this plugin update'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
        dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), h('p', null, t('你正在主动启用这个插件的自动安装。只处理兼容的稳定补丁；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for this plugin. Only compatible stable patches qualify; running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('不会自动重启 DSH，其他插件不会跟着开启。可随时关闭。', 'DSH will not restart automatically, and other plugins will not be enabled for automatic updates. Turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true }, 'enable-idle-patch-updates')); } }, t('允许此插件自动安装补丁', 'Allow patches for this plugin')))) :
        h('div', { className: 'w-stack' }, h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
          h('p', null, selectedVersion === row.release?.version ? t('Harness 会重新加载此插件。需要重启时，更新区会显示宿主结果。', 'Harness reloads this plugin. If a restart is needed, it appears in the update result.') : message('check-first')),
          h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
            h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))))
    );
  }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name }) : null;
  }
  function Reminder() {
    useSnapshot();
    const row = state?.rows.find(row => { const prefs = preferences(row.name); return row.available && !row.updating && !row.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release.version && !notified.has(row.name + '@' + row.release.version); });
    if (!row && !legacyHint) return null;
    let Toast; try { Toast = require('@deepseek-ai/dsh-client-ui-primitives').Toast; } catch { return null; }
    if (!Toast) return null;
    const hint = legacyHint, key = hint ? 'legacy-' + hint : row.name + '@' + row.release.version;
    return h(Toast, { key, text: hint ? hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.') : (language() === 'en' ? row.labelEn : row.label) + t('有新版本，可在页面底部查看。', ' has an update. Review it at the bottom of its page.'), icon: h(W.Icon, { name: 'refresh', size: 18 }), holdMs: 7000, onDone: () => { if (hint) legacyHint = null; else notified.add(key); notify(); } });
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'stardustlc.plugin-update-reminder' }, Reminder));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: Panel, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!rowFor(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
// Generated from templates/client.js, templates/panels/ and templates/workbench-ui.js. Edit the sources.
(function () {
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

/* DSH workbench UI v2 (>=0.2.2-rc.3). MIT.
 * Vendored into each plugin: lazy @deepseek-ai/dsh-client-ui-primitives resolution
 * with semantic HTML fallbacks for standalone jsdom/node:vm tests.
 */
function createWorkbenchUI(React, requireFn) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');

  function Icon({ name = 'file', size = 20, spinning = false, ...props }) {
    return renderDshIcon(React, { name, size, spinning, ...props });
  }

  function Button({ children, icon, spinning = false, variant, className, ...props }) {
    const P = resolveHostPrimitives(React, requireFn);
    const mappedVariant = variant === 'danger' ? 'ghost' : (variant || 'outline');
    return h(
      P.Button,
      {
        type: 'button',
        variant: mappedVariant,
        size: props.size || 'sm',
        ...props,
        className: cx('w-button', variant && 'w-' + variant, className),
        icon: icon ? h(Icon, { name: icon, size: 16, spinning }) : undefined,
      },
      children,
    );
  }

  function IconButton({ label, icon, spinning = false, variant = 'ghost', ...props }) {
    return h(Button, {
      ...props,
      variant,
      icon,
      spinning,
      className: cx('w-icon-button', props.className),
      'aria-label': label,
      title: label,
    });
  }

  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, style: styleProp, ...props }) {
    const [syncedStyle] = useDshStyle(React);
    const activeStyle = normalizeDshStyle(styleProp ?? syncedStyle);
    return h(
      'section',
      {
        ...props,
        ref: rootRef,
        className: cx('dshw', 'w-page', className),
        'data-main': workbench ? 'true' : 'false',
        'data-dsh-style': activeStyle,
      },
      h(Styles, { key: 'styles' }),
      h(
        'header',
        { className: 'w-page-header' },
        h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null),
        actions ? h('div', { className: 'w-header-actions' }, actions) : null,
      ),
      h('div', { className: 'w-body' }, children),
    );
  }

  function Tabs({ items, value, onChange, label, children }) {
    const id = typeof useId === 'function' ? useId() : 'w-tabs';
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h(
      'div',
      { className: 'w-tabs-layout' },
      h(
        'div',
        { className: 'w-tabs', role: 'tablist', 'aria-label': label },
        items.map((item, index) =>
          h(
            'button',
            {
              type: 'button',
              role: 'tab',
              key: item.id,
              id: id + '-' + item.id,
              'aria-selected': active === item.id,
              tabIndex: active === item.id ? 0 : -1,
              onClick: () => onChange(item.id),
              onKeyDown: event => keys(event, index),
            },
            item.label,
            item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null,
          ),
        ),
      ),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children),
    );
  }

  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h(
      'div',
      {
        className: cx('dshw', 'w-status', 'w-status-' + tone, className),
        role: tone === 'error' ? 'alert' : 'status',
        'aria-live': tone === 'error' ? 'assertive' : 'polite',
      },
      h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }),
      h('div', null, children),
    );
  }

  function Empty({ title, children, action, icon = 'file' }) {
    return h(
      'div',
      { className: 'dshw w-empty' },
      h(Styles, { key: 'styles' }),
      h(Icon, { name: icon, size: 32 }),
      h('h2', null, title),
      children ? h('div', { className: 'w-muted' }, children) : null,
      action ? h('div', { className: 'w-toolbar' }, action) : null,
    );
  }

  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h(
      'div',
      { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail),
    );
  }

  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h(
      'div',
      { className: cx('w-row', active && 'w-selected', className), 'data-dsh-row': '', 'data-selected': active ? 'true' : 'false' },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h(
        'button',
        { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null,
      ),
    );
  }

  function Search({ label, value, onChange, className, ...props }) {
    const id = typeof useId === 'function' ? useId() : undefined;
    const P = resolveHostPrimitives(React, requireFn);
    return h(P.Input, {
      type: 'search',
      id,
      'aria-label': label,
      placeholder: label,
      value,
      onChange,
      icon: h(Icon, { name: 'search', size: 15 }),
      className: cx('w-search', className),
      ...props,
    });
  }

  function Switch({ label, checked, onChange, disabled }) {
    const P = resolveHostPrimitives(React, requireFn);
    if (!P.isFallback && P.Switch) {
      return h(
        'div',
        { className: 'w-switch-label' },
        h('span', null, label),
        h(P.Switch, {
          label,
          checked: Boolean(checked),
          disabled,
          onChange: next => onChange?.(typeof next === 'boolean' ? { target: { checked: next }, checked: next } : next),
        }),
      );
    }
    return h(
      'label',
      { className: 'w-switch-label' },
      h('span', null, label),
      h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }),
      h('span', { className: 'w-switch-track', 'aria-hidden': true }),
    );
  }

  function Dialog({ title, children, onClose, closeLabel = 'Close', className, busy = false, footer, style: styleProp }) {
    const [syncedStyle] = useDshStyle(React);
    const activeStyle = normalizeDshStyle(styleProp ?? syncedStyle);
    const titleId = typeof useId === 'function' ? useId() : 'w-dialog-title';
    const P = resolveHostPrimitives(React, requireFn);
    const close = () => { if (!busy) onClose?.(); };
    return h(
      P.Modal,
      {
        open: true,
        dshStyle: activeStyle,
        headless: true,
        title,
        closeLabel,
        onClose: close,
        backdropBlur: false,
        className: cx('w-modal', className),
      },
      h(
        'section',
        {
          ref: createOverlaySyncRef(activeStyle),
          className: cx('dshw', 'w-dialog', className),
          'data-dsh-style': activeStyle,
          'data-window-drag-exclude': '',
          'aria-labelledby': titleId,
        },
        h(
          'header',
          { className: 'w-dialog-header' },
          h('h2', { id: titleId }, title),
          h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: close }),
        ),
        h('div', { className: 'w-dialog-body', 'aria-busy': busy || undefined }, children),
        footer ? h('footer', { className: 'w-dialog-footer' }, footer) : null,
      ),
    );
  }

  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }

  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-base,#ffffff);--w-soft:var(--dsw-alias-bg-layer-1,#f7f9fc);--w-layer-2:var(--dsw-alias-bg-layer-2,#eef2f7);--w-text:var(--dsw-alias-label-primary,#1b2230);--w-muted:var(--dsw-alias-label-secondary,#5b667a);--w-border:var(--dsw-alias-border-l2,#e2e7f0);--w-accent:var(--dsw-alias-state-business-primary,#4176e6);--w-selected:color-mix(in oklab,var(--w-accent) 12%,var(--w-bg));--w-primary:var(--dsw-alias-button-primary-fill,#4176e6);--w-on-primary:var(--dsw-alias-button-primary-ink,#ffffff);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:20px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px);padding:6px 10px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:34px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:15px;height:15px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:2px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:var(--dsw-radius-sm,8px)}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0;transition:transform .18s ease}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:var(--dsw-radius-sm,8px);padding:12px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:var(--dsw-radius-xs,5px);padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:6px;background:var(--w-bg);border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px);padding:6px 11px;min-height:30px;line-height:1.4;font-size:13px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--dsw-alias-interactive-bg-hover,var(--w-soft))}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--dsw-alias-button-primary-hover,var(--w-primary));opacity:.95}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:30px;min-width:30px;padding:6px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:10px 12px;margin:10px 0;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px);background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warn-label,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;width:100%;max-width:580px;padding:40px 24px;margin:auto;min-height:240px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:18px}.w-empty .w-muted{font-size:13px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:6px;border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-sm,8px);padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search input{border:0!important;background:transparent!important;padding:6px 0!important;min-height:30px;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-modal{width:min(620px,100%);max-height:calc(100dvh - 32px);padding:0;border:0;background:transparent;box-shadow:none;overflow:visible}.w-dialog{width:100%;max-height:inherit;display:flex;flex-direction:column;min-height:0;background:var(--dsw-alias-bg-overlay,var(--w-bg));color:var(--w-text);border:var(--dsh-control-border-width,1px) solid var(--w-border);border-radius:var(--dsw-radius-md,12px);box-shadow:var(--dsw-elevation-prominent,0 18px 50px rgba(15,23,42,.18));overflow:clip}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:14px 18px;border-bottom:var(--dsh-control-border-width,1px) solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:16px;font-weight:650}.w-dialog-body{overflow:auto;overscroll-behavior:contain;padding:16px 18px;min-height:0}.w-dialog-footer{display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:12px 18px;border-top:var(--dsh-control-border-width,1px) solid var(--w-border);flex-shrink:0}
@container dsh-workbench (max-width:1000px){.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:20px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-dialog-header,.w-dialog-body{padding:14px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}}
@media(prefers-reduced-motion:reduce){.dshw summary:after,.w-switch-track,.w-switch-track:before{transition:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

// Editable browser entry. Build with node scripts/build-client.mjs.
window.__ModuleLoader__.load(__stardustUpdatesWrap({
  id: 'dsh-cite',
  factory: require => {
    const React = require('react');
    const { useEffect, useMemo, useRef, useState } = React;
    const h = React.createElement;
    // Lazy host primitives: never call require('@deepseek-ai/dsh-client-ui-primitives') eagerly at load time.
    const hostPrimitives = () => resolveHostPrimitives(React, require);
    const StyleSwitcher = createStyleSwitcherComponent(React, require);
    const W = createWorkbenchUI(React, require);
const CITE_WORKBENCH_CSS = "/* ==========================================================================\n * DeepSeek Harness (>=0.2.2-rc.3) Unified Workbench Themes & Motion System\n * Vendored from _dsh-design-system/themes-and-motion.css for standalone builds.\n *\n * Design Principles:\n * 1. NEVER TOO DARK: Airy daylight defaults; when host `body[data-ds-dark-theme]`\n *    is active under `harness`, soften to breathable slate (#1f232b / #272c36),\n *    never pitch black (#000 / #090a0f / #151517).\n * 2. 5 SWITCHABLE PRESETS via `[data-dsh-style]`:\n *    - `harness`   (原生清透 / Native Airy)\n *    - `cream`     (米白纸感 / Warm Cream)\n *    - `claude`    (Claude 暖书卷 / Claude Warmth)\n *    - `pixel8bit` (8-Bit 像素 / Bright 8-Bit)\n *    - `mint`      (晴空薄荷 / Airy Mint)\n * 3. PORTALED OVERLAY SYNC: Selectors match both `[data-dsh-style=\"...\"]` roots\n *    AND portaled `[role=\"dialog\"]` / `[role=\"menu\"]` containers carrying or\n *    wrapping `[data-dsh-style=\"...\"]`.\n * 4. COMPOSITOR MOTION & ICON MICRO-ANIMATIONS with full `prefers-reduced-motion`\n *    and `forced-colors` compliance.\n * ========================================================================== */\n\n/* --------------------------------------------------------------------------\n * 1. Motion Timing & Base Token Fallbacks (Standalone + Host Safe)\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n  --dsh-ease-out: cubic-bezier(0.22, 1, 0.36, 1);\n  --dsh-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  /* Standard cubic-bezier fallback before linear() physics spring */\n  --dsh-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --dsh-motion-fast: 140ms;\n  --dsh-motion-base: 200ms;\n  --dsh-motion-dialog: 220ms;\n  --dsh-control-border-width: 0.5px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);\n  --dsh-card-hover-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);\n}\n\n@supports (transition-timing-function: linear(0, 1)) {\n  :where([data-dsh-style]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n    --dsh-ease-spring: linear(\n      0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%,\n      1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%,\n      1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1\n    );\n  }\n}\n\n/* Electron / macOS 0.2.2+ window-drag-regions rule:\n * Exclude ONLY the visible overlay owner box itself (never `[data-window-drag-exclude] *`,\n * so scrolled/clipped descendants cannot register offscreen no-drag rects over headers). */\n[data-window-drag-exclude] {\n  -webkit-app-region: no-drag;\n}\n\n/* --------------------------------------------------------------------------\n * 2. Preset 1: `harness` — 原生清透 / Native Airy\n *    - Daylight: crisp airy white & mist slate; defers to host tokens when set,\n *      with bright standalone fallbacks for tests/previews.\n *    - Host Dark (`body[data-ds-dark-theme]`): softened breathable slate\n *      (`#1f232b` / `#272c36`), overriding DSH's near-black `#151517`.\n * -------------------------------------------------------------------------- */\n:where(body:not([data-ds-dark-theme])) [data-dsh-style=\"harness\"],\n:where(body:not([data-ds-dark-theme])) :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  color-scheme: light;\n  accent-color: var(--dsw-alias-state-business-primary, #4176e6);\n}\n\n/* Standalone fallbacks when host ui-theme stylesheet is not mounted (e.g. jsdom / preview) */\n:root:not([data-dsh-host-tokens]) :where([data-dsh-style=\"harness\"], [role=\"dialog\"][data-dsh-style=\"harness\"], [role=\"menu\"][data-dsh-style=\"harness\"]) {\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 8px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n}\n\nbody:not([data-ds-dark-theme]) [data-dsh-style=\"harness\"] {\n  --dsh-surface-spotlight: rgba(65, 118, 230, 0.06);\n}\n\n/* NEVER TOO DARK: Soft breathable slate when host dark mode is active in `harness` mode */\nbody[data-ds-dark-theme] [data-dsh-style=\"harness\"],\nbody[data-ds-dark-theme] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  color-scheme: dark;\n  accent-color: #7aaaff;\n  --dsw-alias-bg-base: #1f232b;\n  --dsw-alias-bg-layer-1: #272c36;\n  --dsw-alias-bg-layer-2: #2f3542;\n  --dsw-alias-bg-layer-3: #373e4d;\n  --dsw-alias-bg-overlay: #2a303c;\n  --dsw-alias-bg-module-platform: #2c323e;\n  --dsw-alias-settings-card-fill: #262b35;\n  --dsw-alias-settings-card-stroke: rgba(226, 232, 240, 0.12);\n  --dsw-specific-menu: rgba(39, 44, 54, 0.96);\n  --dsw-alias-border-l1: rgba(226, 232, 240, 0.09);\n  --dsw-alias-border-l2: rgba(226, 232, 240, 0.15);\n  --dsw-alias-border-l3: rgba(226, 232, 240, 0.22);\n  --dsw-alias-border-l4: rgba(226, 232, 240, 0.28);\n  --dsw-alias-label-primary: #eef2f7;\n  --dsw-alias-label-secondary: #b6c0cf;\n  --dsw-alias-label-tertiary: #8d98ab;\n  --dsw-alias-label-dimmed: #737e91;\n  --dsw-alias-brand-primary: #7aaaff;\n  --dsw-alias-brand-text: #eef2f7;\n  --dsw-alias-state-business-primary: #7aaaff;\n  --dsw-alias-state-business-tertiary: rgba(122, 170, 255, 0.16);\n  --dsw-alias-link: #8bb6ff;\n  --dsw-alias-button-primary-fill: #5b8def;\n  --dsw-alias-button-primary-hover: #6f9cf4;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(226, 232, 240, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(226, 232, 240, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(122, 170, 255, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.16);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-label: #fcd34d;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.15);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.15);\n  --dsw-elevation-soft: 0 2px 8px rgba(10, 14, 22, 0.22);\n  --dsw-elevation-panel: 0 4px 16px rgba(10, 14, 22, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.12);\n  --dsw-elevation-prominent: 0 14px 38px rgba(10, 14, 22, 0.42), 0 0 0 1px rgba(226, 232, 240, 0.16);\n  --dsh-button-hover-shadow: 0 2px 8px rgba(10, 14, 22, 0.25);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(10, 14, 22, 0.32);\n  --dsh-surface-spotlight: rgba(122, 170, 255, 0.10);\n}\n\n/* --------------------------------------------------------------------------\n * 3. Preset 2: `cream` — 米白纸感 / Warm Cream\n *    (#FAF7F0 / #F3EFE4 paper surfaces, #2B2620 ink, warm amber/sand accents)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"cream\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"cream\"], :has([data-dsh-style=\"cream\"])) {\n  color-scheme: light;\n  accent-color: #9e5829;\n  --dsw-alias-bg-base: #faf7f0;\n  --dsw-alias-bg-layer-1: #f3efe4;\n  --dsw-alias-bg-layer-2: #eae3d3;\n  --dsw-alias-bg-layer-3: #e0d7c3;\n  --dsw-alias-bg-overlay: #fcfaf4;\n  --dsw-alias-bg-module-platform: #efe9da;\n  --dsw-alias-settings-card-fill: #f5f1e6;\n  --dsw-alias-settings-card-stroke: #dfd5be;\n  --dsw-specific-menu: rgba(252, 250, 244, 0.97);\n  --dsw-alias-border-l1: #e6dec8;\n  --dsw-alias-border-l2: #d4c8ae;\n  --dsw-alias-border-l3: #c0b193;\n  --dsw-alias-border-l4: #ad9c7c;\n  --dsw-alias-label-primary: #2b2620;\n  --dsw-alias-label-secondary: #655b4e;\n  --dsw-alias-label-tertiary: #857968;\n  --dsw-alias-label-dimmed: #9c907f;\n  --dsw-alias-brand-primary: #9e5829;\n  --dsw-alias-brand-text: #2b2620;\n  --dsw-alias-state-business-primary: #a65e2e;\n  --dsw-alias-state-business-tertiary: rgba(166, 94, 46, 0.13);\n  --dsw-alias-link: #934e20;\n  --dsw-alias-button-primary-fill: #9e5829;\n  --dsw-alias-button-primary-hover: #86481e;\n  --dsw-alias-button-primary-ink: #fffdf9;\n  --dsw-alias-interactive-bg-hover: rgba(108, 84, 50, 0.075);\n  --dsw-alias-interactive-bg-active: rgba(166, 94, 46, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(166, 94, 46, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 56, 44, 0.11);\n  --dsw-alias-state-error-primary: #b9382c;\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-label: #8c3d08;\n  --dsw-alias-state-warn-tertiary: #fdefd6;\n  --dsw-alias-state-success-primary: #2a6f4e;\n  --dsw-alias-state-success-tertiary: rgba(42, 111, 78, 0.13);\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 13px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-soft: 0 1px 4px rgba(68, 52, 32, 0.06);\n  --dsw-elevation-panel: 0 3px 12px rgba(68, 52, 32, 0.07), 0 0 0 1px rgba(180, 164, 138, 0.35);\n  --dsw-elevation-prominent: 0 14px 34px rgba(68, 52, 32, 0.14), 0 2px 6px rgba(68, 52, 32, 0.06), 0 0 0 1px rgba(180, 164, 138, 0.42);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(84, 62, 34, 0.09);\n  --dsh-card-hover-shadow: 0 8px 20px rgba(84, 62, 34, 0.10);\n  --dsh-surface-spotlight: rgba(166, 94, 46, 0.08);\n}\n\n/* --------------------------------------------------------------------------\n * 4. Preset 3: `claude` — Claude 暖书卷 / Claude Warmth\n *    (#F5F4ED / #ECE9DF parchment, #C96442 terracotta accent, editorial warmth)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"claude\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) {\n  color-scheme: light;\n  accent-color: #c96442;\n  --dsw-alias-bg-base: #f5f4ed;\n  --dsw-alias-bg-layer-1: #ece9df;\n  --dsw-alias-bg-layer-2: #e3dfd2;\n  --dsw-alias-bg-layer-3: #d8d3c3;\n  --dsw-alias-bg-overlay: #faf9f4;\n  --dsw-alias-bg-module-platform: #e7e3d6;\n  --dsw-alias-settings-card-fill: #efece2;\n  --dsw-alias-settings-card-stroke: #dad5c6;\n  --dsw-specific-menu: rgba(250, 249, 244, 0.97);\n  --dsw-alias-border-l1: #e2ded0;\n  --dsw-alias-border-l2: #d0cbc0;\n  --dsw-alias-border-l3: #bcb6a7;\n  --dsw-alias-border-l4: #a69f8f;\n  --dsw-alias-label-primary: #1f1e1b;\n  --dsw-alias-label-secondary: #5d5a51;\n  --dsw-alias-label-tertiary: #7b776c;\n  --dsw-alias-label-dimmed: #948f83;\n  --dsw-alias-brand-primary: #c96442;\n  --dsw-alias-brand-text: #1f1e1b;\n  --dsw-alias-state-business-primary: #c96442;\n  --dsw-alias-state-business-tertiary: rgba(201, 100, 66, 0.14);\n  --dsw-alias-link: #b35030;\n  --dsw-alias-button-primary-fill: #c96442;\n  --dsw-alias-button-primary-hover: #b25232;\n  --dsw-alias-button-primary-ink: #faf9f5;\n  --dsw-alias-interactive-bg-hover: rgba(31, 30, 27, 0.055);\n  --dsw-alias-interactive-bg-active: rgba(201, 100, 66, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(201, 100, 66, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(180, 48, 42, 0.11);\n  --dsw-alias-state-error-primary: #b4302a;\n  --dsw-alias-state-warn-primary: #b85d19;\n  --dsw-alias-state-warn-label: #8c430c;\n  --dsw-alias-state-warn-tertiary: #f7e8d6;\n  --dsw-alias-state-success-primary: #2d6a4f;\n  --dsw-alias-state-success-tertiary: rgba(45, 106, 79, 0.13);\n  --dsw-radius-xs: 7px;\n  --dsw-radius-sm: 10px;\n  --dsw-radius-md: 14px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-soft: 0 1px 4px rgba(31, 30, 27, 0.05);\n  --dsw-elevation-panel: 0 3px 14px rgba(31, 30, 27, 0.06), 0 0 0 1px rgba(145, 139, 126, 0.28);\n  --dsw-elevation-prominent: 0 16px 38px rgba(31, 30, 27, 0.13), 0 2px 8px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.34);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(31, 30, 27, 0.08);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(31, 30, 27, 0.09);\n  --dsh-surface-spotlight: rgba(201, 100, 66, 0.08);\n}\n\n/* Subtle editorial serif warmth on primary workbench/dialog headings in Claude preset */\n[data-dsh-style=\"claude\"] :where(header h1, .cite-brand, [data-dsh-editorial-heading]),\n:where([role=\"dialog\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) header h2 {\n  font-family: \"Iowan Old Style\", \"Georgia\", \"Songti SC\", \"Noto Serif SC\", var(--dsw-font-family, serif);\n  letter-spacing: -0.01em;\n}\n\n/* --------------------------------------------------------------------------\n * 5. Preset 4: `pixel8bit` — 8-Bit 像素 / Bright 8-Bit\n *    (#F4F6E8 / #E7EED2 pastel arcade, #1E2826 ink, #2E7D5B & #D95B43 accents,\n *     0px radius, 2px solid crisp borders, 2px 2px 0 pixel shadow,\n *     stepped translate(1px, 1px) press — bright & legible!)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"pixel8bit\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  color-scheme: light;\n  accent-color: #2e7d5b;\n  --dsw-alias-bg-base: #f4f6e8;\n  --dsw-alias-bg-layer-1: #e7eed2;\n  --dsw-alias-bg-layer-2: #dbe5c0;\n  --dsw-alias-bg-layer-3: #cedaad;\n  --dsw-alias-bg-overlay: #f9fbf0;\n  --dsw-alias-bg-module-platform: #e2ebc9;\n  --dsw-alias-settings-card-fill: #edf2dc;\n  --dsw-alias-settings-card-stroke: #1e2826;\n  --dsw-specific-menu: #f9fbf0;\n  --dsw-alias-border-l1: #7e9478;\n  --dsw-alias-border-l2: #1e2826;\n  --dsw-alias-border-l3: #1e2826;\n  --dsw-alias-border-l4: #1e2826;\n  --dsw-alias-label-primary: #1e2826;\n  --dsw-alias-label-secondary: #3d514c;\n  --dsw-alias-label-tertiary: #58706a;\n  --dsw-alias-label-dimmed: #6e857f;\n  --dsw-alias-brand-primary: #2e7d5b;\n  --dsw-alias-brand-text: #1e2826;\n  --dsw-alias-state-business-primary: #2e7d5b;\n  --dsw-alias-state-business-tertiary: rgba(46, 125, 91, 0.18);\n  --dsw-alias-link: #226448;\n  --dsw-alias-button-primary-fill: #2e7d5b;\n  --dsw-alias-button-primary-hover: #24674a;\n  --dsw-alias-button-primary-ink: #f4f6e8;\n  --dsw-alias-interactive-bg-hover: #dfe9c4;\n  --dsw-alias-interactive-bg-active: #cfe0ad;\n  --dsw-alias-interactive-bg-hover-accent: rgba(46, 125, 91, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(217, 91, 67, 0.18);\n  --dsw-alias-state-error-primary: #d95b43;\n  --dsw-alias-state-warn-primary: #c47614;\n  --dsw-alias-state-warn-label: #7a4808;\n  --dsw-alias-state-warn-tertiary: #f6e7b4;\n  --dsw-alias-state-success-primary: #2e7d5b;\n  --dsw-alias-state-success-tertiary: rgba(46, 125, 91, 0.16);\n  --dsh-pixel-accent-secondary: #d95b43;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-soft: 2px 2px 0px #1e2826;\n  --dsw-elevation-panel: 3px 3px 0px #1e2826;\n  --dsw-elevation-prominent: 4px 4px 0px #1e2826;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 2px 2px 0px #1e2826;\n  --dsh-button-hover-shadow: 3px 3px 0px #1e2826;\n  --dsh-card-hover-shadow: 4px 4px 0px #1e2826;\n  --dsh-surface-spotlight: rgba(46, 125, 91, 0.12);\n}\n\n/* Crisp 0px corners, 2px solid borders, and arcade shadows in `pixel8bit` */\n[data-dsh-style=\"pixel8bit\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], [data-dsh-panel]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border-width: 2px;\n  border-color: #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  border: 2px solid #1e2826 !important;\n  box-shadow: 4px 4px 0px #1e2826 !important;\n  backdrop-filter: none;\n}\n\n[data-dsh-style=\"pixel8bit\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  border-block-end-color: #d95b43;\n  border-block-end-width: 3px;\n}\n\n/* --------------------------------------------------------------------------\n * 6. Preset 5: `mint` — 晴空薄荷 / Airy Mint\n *    (#F5FAFB / #EAF3F6 breeze surfaces, #0F766E teal & #0284C7 sky accents)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"mint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"mint\"], :has([data-dsh-style=\"mint\"])) {\n  color-scheme: light;\n  accent-color: #0f766e;\n  --dsw-alias-bg-base: #f5fafb;\n  --dsw-alias-bg-layer-1: #eaf3f6;\n  --dsw-alias-bg-layer-2: #dcebf0;\n  --dsw-alias-bg-layer-3: #cce1e8;\n  --dsw-alias-bg-overlay: #fafdff;\n  --dsw-alias-bg-module-platform: #e3eff3;\n  --dsw-alias-settings-card-fill: #eef6f8;\n  --dsw-alias-settings-card-stroke: #c7dde5;\n  --dsw-specific-menu: rgba(250, 253, 255, 0.97);\n  --dsw-alias-border-l1: #d5e6ec;\n  --dsw-alias-border-l2: #bdd5de;\n  --dsw-alias-border-l3: #9ec0cd;\n  --dsw-alias-border-l4: #7faab9;\n  --dsw-alias-label-primary: #132a2e;\n  --dsw-alias-label-secondary: #426067;\n  --dsw-alias-label-tertiary: #628088;\n  --dsw-alias-label-dimmed: #7c98a0;\n  --dsw-alias-brand-primary: #0f766e;\n  --dsw-alias-brand-text: #132a2e;\n  --dsw-alias-state-business-primary: #0f766e;\n  --dsw-alias-state-business-tertiary: rgba(15, 118, 110, 0.13);\n  --dsw-alias-link: #0284c7;\n  --dsw-alias-button-primary-fill: #0f766e;\n  --dsw-alias-button-primary-hover: #0d635c;\n  --dsw-alias-button-primary-ink: #f5fafb;\n  --dsw-alias-interactive-bg-hover: rgba(15, 118, 110, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(15, 118, 110, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(2, 132, 199, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(200, 50, 64, 0.11);\n  --dsw-alias-state-error-primary: #c83240;\n  --dsw-alias-state-warn-primary: #b4690e;\n  --dsw-alias-state-warn-label: #864c07;\n  --dsw-alias-state-warn-tertiary: #fdf1d6;\n  --dsw-alias-state-success-primary: #0f766e;\n  --dsw-alias-state-success-tertiary: rgba(15, 118, 110, 0.13);\n  --dsh-mint-sky-accent: #0284c7;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-soft: 0 1px 4px rgba(15, 76, 92, 0.06);\n  --dsw-elevation-panel: 0 3px 12px rgba(15, 76, 92, 0.07), 0 0 0 1px rgba(127, 170, 185, 0.28);\n  --dsw-elevation-prominent: 0 14px 34px rgba(15, 76, 92, 0.13), 0 2px 6px rgba(15, 76, 92, 0.05), 0 0 0 1px rgba(127, 170, 185, 0.34);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(15, 118, 110, 0.11);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(2, 132, 199, 0.10);\n  --dsh-surface-spotlight: rgba(2, 132, 199, 0.08);\n}\n\n/* --------------------------------------------------------------------------\n * 7. Interactive Dynamics: Tactile Button Physics & Active States\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"], a.cite-download),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n  translate: 0px 0px;\n  scale: 1;\n  transition-property: background-color, border-color, color, box-shadow, opacity, translate, scale;\n  transition-duration: var(--dsh-motion-fast);\n  transition-timing-function: var(--dsh-ease-out);\n}\n\n/* Visible active style on open menu triggers (per `menu` guidance) */\n:where([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  @media (hover: hover) {\n    :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]):not(.cite-reference-button), .dsh-btn, a.cite-download):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: 0px -0.5px;\n    }\n\n    [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not(.cite-reference-button), .dsh-btn, a.cite-download):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 3px 3px 0px #1e2826;\n      transition-timing-function: steps(2, end);\n      transition-duration: 70ms;\n    }\n  }\n\n  /* Tactile spring press on non-pixel themes */\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"switch\"]):not(.cite-reference-button), [role=\"button\"], a.cite-download):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    scale: 0.965;\n    translate: 0px 0.5px;\n    transition-duration: 80ms;\n  }\n\n  /* Stepped 8-Bit arcade press (`translate(1px, 1px)` + crisp 1px pixel shadow) */\n  [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]):not(.cite-reference-button), .dsh-btn, a.cite-download):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 1px 1px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #1e2826 !important;\n    transition-timing-function: steps(2, end);\n    transition-duration: 50ms;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 8. Small-Button SVG Icon Micro-Animations\n *    Works automatically with `svg[data-dsh-icon=\"<name>\"]` or `svg[data-icon=\"<name>\"]`\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"], summary, a) svg,\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary, a) svg {\n  translate: 0px 0px;\n  rotate: 0deg;\n  scale: 1;\n  transform-origin: center;\n}\n\n@keyframes dsh-icon-spin {\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes dsh-icon-wiggle {\n  0% { rotate: 0deg; }\n  25% { rotate: -12deg; }\n  55% { rotate: 10deg; }\n  80% { rotate: -5deg; }\n  100% { rotate: 0deg; }\n}\n\n@keyframes dsh-icon-pop {\n  0% { scale: 1; }\n  45% { scale: 1.26; }\n  75% { scale: 0.94; }\n  100% { scale: 1; }\n}\n\n@keyframes dsh-icon-bounce {\n  0%, 100% { translate: 0px 0px; }\n  45% { translate: 0px 2.5px; }\n  75% { translate: 0px -1px; }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], summary, a) svg,\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary, a) svg {\n    transition:\n      translate var(--dsh-motion-base) var(--dsh-ease-spring),\n      rotate 240ms var(--dsh-ease-spring),\n      scale var(--dsh-motion-base) var(--dsh-ease-spring);\n  }\n\n  /* 1) `down` / chevron: 180deg flip on `[aria-expanded=\"true\"]` or `details[open]` */\n  :where([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"], details[open] > summary) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n    rotate: 180deg;\n  }\n\n  /* 2) `refresh` / `sync`: smooth 180deg spin on hover, continuous spin when busy */\n  :where([data-dsh-style]) :where(button, [role=\"button\"])[aria-busy=\"true\"] :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"]),\n  :where([data-dsh-style]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-icon=\"refresh\"])[data-spinning=\"true\"] {\n    animation: dsh-icon-spin 0.85s linear infinite;\n  }\n\n  @media (hover: hover) {\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-dsh-icon=\"reload\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"], svg[data-icon=\"reload\"]) {\n      rotate: 180deg;\n    }\n\n    /* 3) `plus` / `close`: crisp 90deg turn */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"plus\"], svg[data-dsh-icon=\"add\"], svg[data-dsh-icon=\"close\"], svg[data-dsh-icon=\"x\"], svg[data-icon=\"plus\"], svg[data-icon=\"add\"], svg[data-icon=\"close\"], svg[data-icon=\"x\"]) {\n      rotate: 90deg;\n    }\n\n    /* 4) `send` / `external` / `link`: forward/diagonal glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], a):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"send\"], svg[data-dsh-icon=\"external\"], svg[data-dsh-icon=\"link\"], svg[data-icon=\"send\"], svg[data-icon=\"external\"], svg[data-icon=\"link\"]) {\n      translate: 2px -1.5px;\n    }\n\n    /* 5) `reply` / `left` / `undo`: leading glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"reply\"], svg[data-dsh-icon=\"left\"], svg[data-dsh-icon=\"undo\"], svg[data-icon=\"reply\"], svg[data-icon=\"left\"], svg[data-icon=\"undo\"]) {\n      translate: -2px 0px;\n    }\n\n    /* 6) `right` / `play`: trailing nudge & pulse */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"right\"], svg[data-icon=\"right\"]) {\n      translate: 2px 0px;\n    }\n\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"play\"], svg[data-icon=\"play\"]) {\n      translate: 1.5px 0px;\n      scale: 1.14;\n    }\n\n    /* 7) `trash` / `delete`: tactile warning wiggle */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"trash\"], svg[data-dsh-icon=\"delete\"], svg[data-icon=\"trash\"], svg[data-icon=\"delete\"]) {\n      animation: dsh-icon-wiggle 360ms var(--dsh-ease-in-out);\n    }\n\n    /* 8) `star` / `check` / `copy` / `bookmark`: spring pop */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-dsh-icon=\"bookmark\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"], svg[data-icon=\"bookmark\"]) {\n      scale: 1.18;\n    }\n\n    /* 9) `download` / `export` / `upload`: vertical bounce */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], a):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"download\"], svg[data-dsh-icon=\"export\"], svg[data-dsh-icon=\"upload\"], svg[data-icon=\"download\"], svg[data-icon=\"export\"], svg[data-icon=\"upload\"]) {\n      animation: dsh-icon-bounce 420ms var(--dsh-ease-out);\n    }\n\n    /* 10) `palette` / `sparkles` / `sparkle` / `edit`: playful tilt */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"palette\"], svg[data-dsh-icon=\"sparkles\"], svg[data-dsh-icon=\"sparkle\"], svg[data-dsh-icon=\"edit\"], svg[data-icon=\"palette\"], svg[data-icon=\"sparkles\"], svg[data-icon=\"edit\"]) {\n      rotate: -12deg;\n      scale: 1.08;\n    }\n\n    /* Closed chevron gentle downward cue on hover */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"])[aria-expanded=\"false\"]:hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n      translate: 0px 1.5px;\n    }\n  }\n\n  /* Pop feedback when toggled into active/pressed/checked/copied state */\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where([aria-pressed=\"true\"], [aria-checked=\"true\"], [data-active=\"true\"], [data-copied=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"]) {\n    animation: dsh-icon-pop 300ms var(--dsh-ease-spring);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 9. Tabs, Interactive Rows, Cards & Top-Layer Dialog/Popover Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) [role=\"tablist\"] {\n  scrollbar-width: thin;\n}\n\n:where([data-dsh-style]) [role=\"tab\"] {\n  position: relative;\n}\n\n/* Non-color border indicator on selected tabs (WCAG 1.4.1 + Forced Colors safe) */\n:where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  content: \"\";\n  position: absolute;\n  inset-inline: 6px;\n  inset-block-end: 0;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary, currentColor);\n  pointer-events: none;\n}\n\n/* Interactive workbench cards & list rows */\n:where([data-dsh-style]) :where([data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: 0px 0px;\n  transition:\n    background-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    border-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    box-shadow var(--dsh-motion-base) var(--dsh-ease-out),\n    translate var(--dsh-motion-base) var(--dsh-ease-out);\n}\n\n@media (hover: hover) and (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where([data-dsh-card], .dsh-card):hover {\n    translate: 0px -1.5px;\n    box-shadow: var(--dsh-card-hover-shadow);\n  }\n\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 4px 4px 0px #1e2826;\n  }\n\n  :where([data-dsh-style]) :where([data-dsh-row], .dsh-row):hover:not([data-selected=\"true\"]):not([aria-selected=\"true\"]):not([data-active=\"true\"]) {\n    background-color: var(--dsh-surface-spotlight, var(--dsw-alias-interactive-bg-hover));\n  }\n}\n\n/* Modal / Dialog & Popover Top-Layer Entrance + Scroll Containment */\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n  overscroll-behavior: contain;\n  opacity: 1;\n  transition-property: opacity, scale, translate, display, overlay;\n  transition-duration: var(--dsh-motion-dialog);\n  transition-timing-function: var(--dsh-ease-out);\n  /* Separate declaration after transition so older parsers never drop transitions */\n  transition-behavior: allow-discrete;\n}\n\n@starting-style {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: 1;\n    translate: 0px 0px;\n  }\n\n  @starting-style {\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n      scale: 0.965;\n      translate: 0px 6px;\n    }\n  }\n}\n\ndialog[open]::backdrop {\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n\n/* --------------------------------------------------------------------------\n * 10. Unified Header Style Switcher & Standalone Fallback Controls\n * -------------------------------------------------------------------------- */\n.dsh-style-switcher {\n  display: inline-flex;\n  align-items: center;\n  flex: none;\n}\n\n.dsh-style-trigger.dsh-style-trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 28px;\n  padding-inline: 8px;\n  width: auto;\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 500;\n  color: var(--dsw-alias-label-secondary, #5b667a);\n  background: var(--dsw-alias-bg-layer-1, #f7f9fc);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  border-radius: var(--dsw-radius-sm, 8px);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n@media (hover: hover) {\n  .dsh-style-trigger.dsh-style-trigger:hover:not(:disabled) {\n    color: var(--dsw-alias-label-primary, #1b2230);\n    background: var(--dsw-alias-interactive-bg-hover, #eef2f7);\n  }\n}\n\n.dsh-style-swatch {\n  display: inline-block;\n  flex: none;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  corner-shape: round;\n  background: var(--dsh-swatch-color, var(--dsw-alias-state-business-primary, #4176e6));\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-style-swatch {\n  border-radius: 0px !important;\n  corner-shape: square;\n  box-shadow: 1px 1px 0px #1e2826;\n}\n\n.dsh-style-fallback-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsh-style-fallback-menu {\n  position: absolute;\n  inset-block-start: calc(100% + 4px);\n  inset-inline-end: 0;\n  z-index: 2147483001;\n  display: grid;\n  gap: 2px;\n  min-width: 168px;\n  padding: 4px;\n  background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base, #ffffff));\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  border-radius: var(--dsw-radius-md, 12px);\n  box-shadow: var(--dsw-elevation-prominent, 0 12px 32px rgba(15, 23, 42, 0.14));\n}\n\n.dsh-style-fallback-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  min-height: 28px;\n  padding: 4px 8px;\n  border: 0;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: transparent;\n  color: var(--dsw-alias-label-primary, #1b2230);\n  font: inherit;\n  font-size: 12px;\n  text-align: start;\n  cursor: pointer;\n}\n\n.dsh-style-fallback-item[aria-checked=\"true\"] {\n  background: var(--dsw-alias-interactive-bg-active, rgba(65, 118, 230, 0.12));\n  font-weight: 600;\n}\n\n@media (hover: hover) {\n  .dsh-style-fallback-item:hover:not(:disabled) {\n    background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.05));\n  }\n}\n\n.dsh-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  min-height: 28px;\n  padding: 4px 10px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  border-radius: var(--dsw-radius-sm, 8px);\n  background: var(--dsw-alias-bg-base, #ffffff);\n  color: var(--dsw-alias-label-primary, #1b2230);\n  font: inherit;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n.dsh-btn-ghost {\n  background: transparent;\n  border-color: transparent;\n}\n\n.dsh-btn-primary {\n  background: var(--dsw-alias-button-primary-fill, #4176e6);\n  border-color: var(--dsw-alias-button-primary-fill, #4176e6);\n  color: var(--dsw-alias-button-primary-ink, #ffffff);\n}\n\n.dsh-fallback-btn-icon,\n.dsh-fallback-input-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n}\n\n.dsh-fallback-input-wrap {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-width: 0;\n  min-height: 30px;\n  padding-inline: 8px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  border-radius: var(--dsw-radius-sm, 8px);\n  background: var(--dsw-alias-bg-base, #ffffff);\n}\n\n.dsh-fallback-input-wrap > input {\n  flex: 1 1 auto;\n  min-width: 0;\n  border: 0 !important;\n  background: transparent !important;\n  padding: 4px 0 !important;\n  outline: none;\n  color: inherit;\n  font: inherit;\n}\n\n.dsh-checkbox-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  cursor: pointer;\n}\n\n.dsh-checkbox-icon > span {\n  position: absolute;\n  inline-size: 1px;\n  block-size: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n\n.dsh-segmented-fallback {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  padding: 2px;\n  border-radius: var(--dsw-radius-sm, 8px);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  background: var(--dsw-alias-bg-layer-2, #eef2f7);\n  max-width: 100%;\n  overflow-x: auto;\n}\n\n.dsh-segmented-fallback > button {\n  flex: 1 1 auto;\n  min-height: 26px;\n  padding: 3px 9px;\n  border: 0;\n  border-radius: max(4px, calc(var(--dsw-radius-sm, 8px) - 2px));\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #5b667a);\n  font: inherit;\n  font-size: 12px;\n  font-weight: 500;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.dsh-segmented-fallback > button[aria-selected=\"true\"],\n.dsh-segmented-fallback > button[aria-checked=\"true\"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  color: var(--dsw-alias-label-primary, #1b2230);\n  box-shadow: var(--dsw-elevation-soft, 0 1px 3px rgba(15, 23, 42, 0.08));\n  font-weight: 600;\n}\n\n.dsh-pill-fallback {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 8px;\n  border-radius: 999px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  background: var(--dsw-alias-bg-layer-1, #f7f9fc);\n  color: var(--dsw-alias-label-secondary, #5b667a);\n  font: inherit;\n  font-size: 11.5px;\n  cursor: pointer;\n}\n\n.dsh-pill-fallback[data-active=\"true\"],\n.dsh-pill-fallback[aria-pressed=\"true\"] {\n  background: var(--dsw-alias-button-primary-fill, #4176e6);\n  border-color: var(--dsw-alias-button-primary-fill, #4176e6);\n  color: var(--dsw-alias-button-primary-ink, #ffffff);\n}\n\n.dsh-tag-fallback {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 1px 7px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-bg-layer-2, #eef2f7);\n  color: var(--dsw-alias-label-secondary, #5b667a);\n  font-size: 11px;\n  font-weight: 500;\n}\n\n.dsh-tag-fallback[data-tone=\"success\"] {\n  color: var(--dsw-alias-state-success-primary, #1f7a4c);\n  background: var(--dsw-alias-state-success-tertiary, rgba(31, 122, 76, 0.12));\n}\n\n.dsh-tag-fallback[data-tone=\"warning\"] {\n  color: var(--dsw-alias-state-warn-label, #8c4b08);\n  background: var(--dsw-alias-state-warn-tertiary, rgba(180, 83, 9, 0.14));\n}\n\n.dsh-tag-fallback[data-tone=\"danger\"] {\n  color: var(--dsw-alias-state-error-primary, #b9382c);\n  background: var(--dsw-alias-interactive-bg-hover-danger, rgba(185, 56, 44, 0.12));\n}\n\n.dsh-tag-fallback[data-tone=\"info\"] {\n  color: var(--dsw-alias-state-business-primary, #4176e6);\n  background: var(--dsw-alias-state-business-tertiary, rgba(65, 118, 230, 0.12));\n}\n\n/* Fallback Modal & Menu Chrome (when host `@deepseek-ai/dsh-client-ui-primitives` is absent) */\n.dsh-fallback-modal-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  display: grid;\n  place-items: center;\n  padding: 16px;\n}\n\n.dsh-fallback-modal-mask {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.32);\n}\n\n.dsh-fallback-modal-dialog {\n  position: relative;\n  z-index: 1;\n  width: min(580px, calc(100dvw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: clip;\n  display: flex;\n  flex-direction: column;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2, #e2e7f0);\n  border-radius: var(--dsw-radius-md, 12px);\n  background: var(--dsw-alias-bg-layer-1, #f8fafc);\n  color: var(--dsw-alias-label-primary, #1f232b);\n  box-shadow: var(--dsw-elevation-prominent, 0 16px 40px rgba(15, 23, 42, 0.2));\n}\n\n/* --------------------------------------------------------------------------\n * 11. Accessibility: Reduced Motion & Windows High Contrast (Forced Colors)\n * -------------------------------------------------------------------------- */\n@media (prefers-reduced-motion: reduce) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], a.cite-download, [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n    translate: none !important;\n    scale: none !important;\n    transition-property: background-color, border-color, color, opacity;\n    transition-duration: 90ms;\n  }\n\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], summary, a) svg {\n    animation: none !important;\n    transition: none !important;\n    translate: none !important;\n    rotate: none !important;\n    scale: none !important;\n  }\n\n  /* Short, non-spatial fade only for top-layer dialogs under reduced motion */\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: none !important;\n    translate: none !important;\n    transition-duration: 100ms;\n  }\n}\n\n@media (forced-colors: active) {\n  :where([data-dsh-style]) :where(button, input, select, textarea),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], :has([data-dsh-style])) {\n    border: 1px solid ButtonText;\n  }\n\n  :where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n    border-block-end: 3px solid Highlight;\n  }\n}\n\n.cite-workbench.dshw {\n  --cite-base: var(--dsw-alias-bg-base, #ffffff);\n  --cite-layer: var(--dsw-alias-bg-layer-1, #f7f9fc);\n  --cite-control: var(--dsw-alias-bg-layer-2, #eef2f7);\n  --cite-ink: var(--dsw-alias-label-primary, #1b2230);\n  --cite-secondary: var(--dsw-alias-label-secondary, #5b667a);\n  --cite-line: var(--dsw-alias-border-l2, #e2e7f0);\n  --cite-subtle-line: var(--dsw-alias-border-l1, #ebf0f6);\n  --cite-accent: var(--dsw-alias-state-business-primary, #4176e6);\n  --cite-hover: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.045));\n  --cite-active: var(--dsw-alias-interactive-bg-active, rgba(65, 118, 230, 0.11));\n  --cite-primary: var(--dsw-alias-button-primary-fill, #4176e6);\n  --cite-on-primary: var(--dsw-alias-button-primary-ink, #ffffff);\n  --cite-mono: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Consolas, monospace);\n  --cite-radius-sm: var(--dsw-radius-sm, 8px);\n  --cite-radius-md: var(--dsw-radius-md, 12px);\n  container: cite-workbench / inline-size;\n  inline-size: 100%;\n  min-inline-size: 0;\n  min-block-size: 0;\n  box-sizing: border-box;\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.5;\n  color: var(--cite-ink);\n  background: var(--cite-base);\n}\n\n.cite-workbench[data-main=\"true\"] {\n  block-size: 100%;\n  padding-block-start: var(--dsh-frame-top-clearance, 0px);\n  padding-inline-start: var(--dsh-frame-leading-clearance, 0px);\n}\n\n.cite-workbench[data-main=\"false\"] {\n  block-size: min(680px, 76dvh);\n  min-block-size: 320px;\n  padding: 0;\n}\n\n.cite-workbench * {\n  box-sizing: border-box;\n}\n\n.cite-workbench .cite-shell {\n  display: grid;\n  grid-template:\n    \"brand tabs import\" auto\n    \"panel panel panel\" minmax(0, 1fr)\n    / max-content minmax(0, 1fr) max-content;\n  align-items: center;\n  column-gap: 12px;\n  block-size: 100%;\n  background: var(--cite-base);\n}\n\n.cite-workbench[data-main=\"false\"] .cite-shell {\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  overflow: clip;\n}\n\n.cite-workbench .cite-brand {\n  grid-area: brand;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 0 14px;\n  font-size: 14px;\n  line-height: 1.3;\n  font-weight: 650;\n  white-space: nowrap;\n}\n\n.cite-workbench .cite-brand-icon {\n  display: grid;\n  place-items: center;\n  inline-size: 25px;\n  block-size: 25px;\n  border-radius: var(--dsw-radius-xs, 7px);\n  color: var(--cite-on-primary);\n  background: var(--cite-primary);\n}\n\n.cite-workbench .cite-header-actions {\n  grid-area: import;\n  justify-self: end;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 7px 14px 7px 0;\n}\n\n.cite-workbench .w-tabs-layout {\n  display: contents;\n}\n\n.cite-workbench .w-tabs {\n  grid-area: tabs;\n  justify-self: start;\n  flex-wrap: nowrap;\n  max-inline-size: 100%;\n  gap: 2px;\n  margin: 7px 0;\n  padding: 3px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  border-radius: calc(var(--cite-radius-sm) + 2px);\n  background: var(--cite-control);\n}\n\n.cite-workbench .w-tabs > button {\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  min-inline-size: 0;\n  min-block-size: 28px;\n  border: 0;\n  border-radius: var(--cite-radius-sm);\n  padding: 4px 11px;\n  color: var(--cite-secondary);\n  font-size: 12px;\n  line-height: 1.3;\n  font-weight: 500;\n  white-space: nowrap;\n}\n\n.cite-workbench .w-tabs > button[aria-selected=\"true\"] {\n  color: var(--cite-ink);\n  background: var(--cite-base);\n  box-shadow: var(--dsw-elevation-soft, 0 1px 3px rgba(15, 23, 42, 0.08));\n  font-weight: 600;\n}\n\n.cite-workbench .w-tabs .w-count {\n  min-inline-size: 0;\n  padding: 0 4px;\n  border-radius: 999px;\n  color: var(--cite-secondary);\n  background: color-mix(in oklab, var(--cite-ink) 7%, transparent);\n  font: 10px/1.45 var(--cite-mono);\n}\n\n.cite-workbench .w-tabs > button[aria-selected=\"true\"] .w-count {\n  color: var(--cite-accent);\n  background: color-mix(in oklab, var(--cite-accent) 14%, transparent);\n}\n\n.cite-workbench .w-tab-panel {\n  grid-area: panel;\n  display: flex;\n  flex-direction: column;\n  min-block-size: 0;\n  min-inline-size: 0;\n  block-size: 100%;\n  overflow: hidden;\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n}\n\n.cite-workbench .w-tab-panel > [data-plugin-update-footer=\"dsh-cite\"] {\n  flex: 0 0 auto;\n  padding: 10px 16px;\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench :is(button, a, input, select, textarea, summary):focus-visible {\n  outline: 2px solid var(--cite-accent);\n  outline-offset: 2px;\n}\n\n.cite-workbench :is(.cite-reference-button, .cite-filter, .w-tabs > button):focus-visible {\n  outline-offset: -2px;\n}\n\n.cite-workbench .cite-button {\n  flex: 0 0 auto;\n  min-block-size: 30px;\n  padding-inline: 10px;\n  font-size: 12px;\n  line-height: 1.3;\n  border-radius: var(--cite-radius-sm);\n}\n\n.cite-workbench .cite-button-primary {\n  background: var(--cite-primary);\n  border-color: var(--cite-primary);\n  color: var(--cite-on-primary);\n}\n\n.cite-workbench .cite-button-danger {\n  color: var(--dsw-alias-state-error-primary, #b9382c);\n}\n\n.cite-workbench .cite-icon-button {\n  inline-size: 30px;\n  min-inline-size: 30px;\n  padding-inline: 0;\n  justify-content: center;\n}\n\n.cite-workbench .cite-input-wrap {\n  width: 100%;\n  min-width: 0;\n  min-height: 32px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-input-wrap input {\n  min-width: 0;\n  font-size: 12.5px;\n  line-height: 1.5;\n}\n\n.cite-workbench .cite-segmented {\n  width: 100%;\n}\n\n.cite-workbench .cite-checkbox {\n  min-width: 0;\n  color: inherit;\n}\n\n.cite-workbench :is(.cite-actions, .cite-chips) {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  min-inline-size: 0;\n  gap: 5px;\n}\n\n.cite-workbench .cite-chip {\n  display: inline-block;\n  max-inline-size: 100%;\n  padding: 2px 6px;\n  border-radius: var(--dsw-radius-xs, 5px);\n  background: var(--cite-control);\n  color: var(--cite-secondary);\n  font: 10.5px/1.45 var(--cite-mono);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-chip.accent {\n  color: var(--cite-accent);\n  background: var(--dsw-alias-interactive-bg-hover-accent, color-mix(in oklab, var(--cite-accent) 13%, transparent));\n}\n\n.cite-workbench .cite-chip.warn {\n  color: var(--dsw-alias-state-warn-label, #8c4b08);\n  background: var(--dsw-alias-state-warn-tertiary, rgba(180, 83, 9, 0.14));\n}\n\n.cite-workbench .cite-chip.success {\n  color: var(--dsw-alias-state-success-primary, #1f7a4c);\n  background: var(--dsw-alias-state-success-tertiary, rgba(31, 122, 76, 0.12));\n}\n\n.cite-workbench :is(.cite-chip.danger, .cite-error-text) {\n  color: var(--dsw-alias-state-error-primary, #b9382c);\n}\n\n.cite-workbench :is(.cite-muted, .cite-label) {\n  color: var(--cite-secondary);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.cite-workbench :is(.cite-mono, code) {\n  font-family: var(--cite-mono);\n}\n\n.cite-workbench .cite-label {\n  display: block;\n  margin-block: 0 5px;\n  font-size: 11.5px;\n  font-weight: 550;\n}\n\n.cite-workbench .cite-field {\n  display: block;\n  inline-size: 100%;\n  min-block-size: 32px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  padding: 6px 9px;\n  background: var(--cite-base);\n  color: var(--cite-ink);\n  font-size: 12.5px;\n  line-height: 1.5;\n}\n\n.cite-workbench textarea.cite-field {\n  resize: vertical;\n  min-block-size: 108px;\n}\n\n.cite-workbench :is(.cite-picker-wrap, .cite-picker, .cite-picker-button) {\n  inline-size: 100%;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-picker-button {\n  justify-content: space-between;\n  text-align: start;\n  background: var(--cite-base);\n  border-radius: var(--cite-radius-sm);\n}\n\n.cite-workbench :is(input[type=\"checkbox\"], input[type=\"radio\"], progress) {\n  accent-color: var(--cite-accent);\n}\n\n.cite-workbench :is(input[type=\"checkbox\"], input[type=\"radio\"]) {\n  flex: 0 0 auto;\n  inline-size: 15px;\n  block-size: 15px;\n  margin: 0;\n}\n\n.cite-workbench .cite-library {\n  display: grid;\n  flex: 1 1 auto;\n  min-block-size: 0;\n  grid-template-columns: clamp(168px, 18cqi, 236px) clamp(252px, 28cqi, 356px) minmax(0, 1fr);\n}\n\n.cite-workbench :is(.cite-rail, .cite-list, .cite-inspector) {\n  min-inline-size: 0;\n  min-block-size: 0;\n}\n\n.cite-workbench .cite-rail {\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 12px 10px;\n  border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-style-box {\n  margin-block-end: 12px;\n  padding: 10px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-filters {\n  display: grid;\n  gap: 3px;\n}\n\n.cite-workbench .cite-filters > h2 {\n  margin: 4px 8px;\n  font-size: 11px;\n  font-weight: 600;\n}\n\n.cite-workbench .cite-filter {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 6px;\n  min-block-size: 32px;\n  padding: 6px 9px;\n  border: 0;\n  border-radius: var(--cite-radius-sm);\n  color: var(--cite-secondary);\n  background: transparent;\n  font: inherit;\n  line-height: 1.35;\n  text-align: start;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-filter[aria-pressed=\"true\"] {\n  color: var(--cite-ink);\n  background: var(--cite-active);\n  font-weight: 600;\n}\n\n.cite-workbench .cite-count {\n  color: var(--cite-secondary);\n  font: 11px/1.45 var(--cite-mono);\n}\n\n.cite-workbench :is(.cite-list, .cite-inspector) {\n  display: flex;\n  flex-direction: column;\n}\n\n.cite-workbench .cite-list {\n  border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-inspector {\n  background: var(--cite-base);\n}\n\n.cite-workbench :is(.cite-searchbar, .cite-inspector-bar, .cite-selection) {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  min-block-size: 44px;\n  padding: 6px 12px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n}\n\n.cite-workbench .cite-searchbar > :first-child {\n  flex: 1 1 auto;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-searchbar input {\n  min-inline-size: 0;\n  font-size: 12px;\n}\n\n.cite-workbench.dshw .cite-searchbar .cite-search input {\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  background: transparent;\n}\n\n.cite-workbench .cite-searchbar input::placeholder {\n  color: var(--dsw-alias-label-tertiary, var(--cite-secondary));\n}\n\n.cite-workbench :is(.cite-inspector-bar, .cite-selection) {\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n\n.cite-workbench .cite-selection {\n  gap: 2px 5px;\n  min-block-size: 0;\n  padding-block: 4px;\n  border-color: var(--cite-subtle-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-selection .cite-button {\n  min-block-size: 26px;\n  padding-inline: 6px;\n  font-size: 11.5px;\n}\n\n.cite-workbench :is(.cite-list-scroll, .cite-inspector-scroll, .cite-subpage) {\n  flex: 1 1 auto;\n  min-block-size: 0;\n  min-inline-size: 0;\n  overflow: auto;\n  overscroll-behavior: contain;\n}\n\n.cite-workbench :is(.cite-list-loading, .cite-inspector-empty) {\n  margin: auto;\n  padding: 28px 18px;\n  color: var(--cite-secondary);\n  text-align: center;\n}\n\n.cite-workbench .cite-list .w-empty {\n  gap: 9px;\n  min-block-size: 220px;\n  padding: 28px 16px;\n}\n\n.cite-workbench .cite-list .w-empty h2 {\n  font-size: 15px;\n  line-height: 1.4;\n}\n\n.cite-workbench .cite-list .w-empty .w-muted {\n  font-size: 12px;\n}\n\n.cite-workbench :is(.cite-reference-list, .cite-plain-list) {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.cite-workbench .cite-reference-row {\n  position: relative;\n  display: flex;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n}\n\n.cite-workbench .cite-reference-row[data-active=\"true\"] {\n  background: var(--cite-active);\n}\n\n.cite-workbench .cite-reference-row[data-active=\"true\"]::before {\n  content: \"\";\n  position: absolute;\n  inset-block: 6px;\n  inset-inline-start: 0;\n  inline-size: 3px;\n  border-radius: 2px;\n  background: var(--cite-accent);\n  pointer-events: none;\n}\n\n.cite-workbench .cite-reference-check {\n  display: flex;\n  align-items: flex-start;\n  padding: 14px 5px 8px 12px;\n}\n\n.cite-workbench .cite-reference-button {\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n  gap: 3px;\n  min-inline-size: 0;\n  border: 0;\n  padding: 10px 12px 10px 5px;\n  background: transparent;\n  color: var(--cite-ink);\n  font: inherit;\n  text-align: start;\n  cursor: pointer;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-reference-meta {\n  color: var(--cite-secondary);\n  font-size: 11.5px;\n  line-height: 1.45;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.cite-workbench .cite-reference-button .cite-chips {\n  gap: 4px;\n  margin-block-start: 3px;\n}\n\n.cite-workbench .cite-more {\n  margin: 10px 12px;\n}\n\n.cite-workbench .cite-selection-footer {\n  padding: 8px 12px;\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-inspector-bar {\n  padding-inline: 16px;\n}\n\n.cite-workbench .cite-inspector-bar > .cite-chips {\n  max-inline-size: 100%;\n}\n\n.cite-workbench .cite-crossref {\n  color: var(--cite-accent);\n}\n\n.cite-workbench .cite-back {\n  display: none;\n}\n\n.cite-workbench .cite-inspector-scroll {\n  padding: 16px 22px 24px;\n}\n\n.cite-workbench .cite-card {\n  padding: 13px 15px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  background: var(--cite-layer);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-card + .cite-card,\n.cite-workbench .cite-subpage-inner > form + .cite-card {\n  margin-block-start: 12px;\n}\n\n.cite-workbench .cite-card p {\n  margin-block: 0;\n}\n\n.cite-workbench .cite-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px 9px;\n  margin-block-end: 8px;\n}\n\n.cite-workbench .cite-card-header > h3 {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.45;\n  font-weight: 600;\n}\n\n.cite-workbench :is(.cite-formatted, .cite-code),\n.w-dialog .cite-code {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  margin: 0;\n  padding: 10px 12px;\n  border-radius: var(--cite-radius-sm, 8px);\n  background: var(--cite-base, var(--w-bg));\n}\n\n.cite-workbench .cite-formatted {\n  border-inline-start: 3px solid var(--cite-accent);\n  font: inherit;\n  line-height: 1.65;\n}\n\n.cite-workbench .cite-code,\n.w-dialog .cite-code {\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line, var(--w-border));\n  color: var(--cite-secondary, var(--w-muted));\n  font: 11.5px/1.55 var(--cite-mono, ui-monospace, monospace);\n}\n\n.w-dialog .cite-source-entry + .cite-source-entry {\n  margin-block-start: 14px;\n}\n\n.cite-workbench :is(.cite-metadata, .cite-form-grid) {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px 12px;\n  margin: 0;\n}\n\n.cite-workbench .cite-field-wide {\n  grid-column: 1 / -1;\n}\n\n.cite-workbench .cite-metadata dd {\n  margin: 0;\n  min-block-size: 30px;\n  padding: 5px 9px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  background: var(--cite-base);\n  font-size: 12px;\n  white-space: pre-wrap;\n}\n\n.cite-workbench .cite-differences {\n  border: 1px solid var(--dsw-alias-state-warn-primary, var(--cite-line));\n}\n\n.cite-workbench .cite-diff-table {\n  inline-size: 100%;\n  margin-block-start: 8px;\n  border-collapse: collapse;\n  table-layout: fixed;\n  font-size: 12px;\n}\n\n.cite-workbench .cite-diff-table :is(th, td) {\n  padding: 6px 7px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  vertical-align: top;\n  text-align: start;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-diff-table th:first-child {\n  inline-size: 24%;\n}\n\n.cite-workbench .cite-diff-table td:nth-child(2) {\n  background: var(--cite-control);\n}\n\n.cite-workbench .cite-subpage {\n  padding: 22px 20px 36px;\n}\n\n.cite-workbench .cite-subpage-inner {\n  max-inline-size: 840px;\n  margin-inline: auto;\n}\n\n.cite-workbench .cite-subpage h2 {\n  margin: 0 0 4px;\n  font-size: 17px;\n  line-height: 1.45;\n  font-weight: 650;\n}\n\n.cite-workbench .cite-description {\n  margin: 0 0 16px;\n  color: var(--cite-secondary);\n  font-size: 12.5px;\n}\n\n.cite-workbench .cite-card :is(.cite-form-note, .cite-metadata-note, .cite-export-sample) {\n  margin-block-start: 10px;\n}\n\n.cite-workbench .cite-provenance > summary {\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-provenance[open] > summary {\n  margin-block-end: 8px;\n}\n\n.cite-workbench .cite-conflict {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n\n.cite-workbench .cite-plain-list > li {\n  padding-block: 8px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-plain-list > li:last-child {\n  border-block-end: 0;\n  padding-block-end: 0;\n}\n\n.cite-workbench .cite-preview-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n}\n\n.cite-workbench .cite-preview-content {\n  min-inline-size: 0;\n  flex: 1 1 auto;\n}\n\n.cite-workbench .cite-preview-meta {\n  display: block;\n  color: var(--cite-secondary);\n  font-size: 12px;\n}\n\n.cite-workbench .cite-preview-row .cite-chips {\n  margin-block-start: 4px;\n}\n\n.cite-workbench :is(.cite-result-row, .cite-message-body, .cite-job-header) {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.cite-workbench .cite-download {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  min-block-size: 30px;\n  padding: 4px 10px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  color: var(--cite-ink);\n  background: var(--cite-base);\n  text-decoration: none;\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.cite-workbench .cite-download[data-primary=\"true\"] {\n  color: var(--cite-on-primary);\n  background: var(--cite-primary);\n  border-color: var(--cite-primary);\n}\n\n.cite-workbench[data-dsh-style=\"pixel8bit\"] .cite-download {\n  border: 2px solid #1e2826;\n  border-radius: 0px !important;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n.cite-workbench .cite-feedback {\n  flex: 0 0 auto;\n  max-block-size: 33%;\n  overflow: auto;\n  padding: 6px 12px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-feedback .cite-message {\n  align-items: center;\n  margin: 0;\n  padding: 4px 8px;\n}\n\n.cite-workbench .cite-message > div {\n  flex: 1;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-job {\n  font-size: 12px;\n}\n\n.cite-workbench .cite-job p {\n  margin: 0;\n}\n\n.cite-workbench .cite-job > progress {\n  display: block;\n  inline-size: 100%;\n  block-size: 8px;\n}\n\n.cite-workbench .cite-job summary {\n  width: fit-content;\n  cursor: pointer;\n  color: var(--cite-accent);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .cite-workbench :is(.cite-subpage, .cite-inspector-scroll) {\n    opacity: 1;\n    translate: 0px 0px;\n    transition: opacity 180ms var(--dsh-ease-out, ease-out), translate 200ms var(--dsh-ease-out, ease-out);\n  }\n\n  @starting-style {\n    .cite-workbench :is(.cite-subpage, .cite-inspector-scroll) {\n      opacity: 0;\n      translate: 0px 4px;\n    }\n  }\n\n  @media (hover: hover) {\n    .cite-workbench .cite-reference-row {\n      translate: 0px 0px;\n      transition: background-color 140ms var(--dsh-ease-out, ease-out), translate 180ms var(--dsh-ease-out, ease-out);\n    }\n\n    .cite-workbench:not([data-dsh-style=\"pixel8bit\"]) .cite-reference-row:hover {\n      translate: 2px 0px;\n    }\n  }\n}\n\n@media (hover: hover) {\n  .cite-workbench .w-tabs > button:hover {\n    color: var(--cite-ink);\n  }\n\n  .cite-workbench :is(.cite-filter, .cite-download):hover {\n    background: var(--cite-hover);\n  }\n\n  .cite-workbench .cite-download[data-primary=\"true\"]:hover {\n    background: var(--dsw-alias-button-primary-hover, var(--cite-primary));\n  }\n}\n\n@container cite-workbench (max-width: 860px) {\n  .cite-workbench .cite-library {\n    grid-template-columns: minmax(0, 1fr);\n    grid-template-rows: auto minmax(0, 1fr);\n  }\n\n  .cite-workbench .cite-rail {\n    overflow: visible;\n    padding: 8px 10px;\n    border-inline-end: 0;\n    border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  }\n\n  .cite-workbench .cite-style-box {\n    display: grid;\n    grid-template-columns: auto minmax(120px, 1fr);\n    align-items: center;\n    gap: 8px;\n    padding: 0;\n    margin: 0 0 6px;\n    border: 0;\n    box-shadow: none;\n    background: transparent;\n  }\n\n  .cite-workbench .cite-style-box .cite-label {\n    margin: 0;\n  }\n\n  .cite-workbench .cite-filters {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .cite-workbench .cite-filters > h2,\n  .cite-workbench .cite-library[data-open=\"false\"] .cite-inspector,\n  .cite-workbench .cite-library[data-open=\"true\"] :is(.cite-rail, .cite-list) {\n    display: none;\n  }\n\n  .cite-workbench .cite-filter {\n    font-size: 11.5px;\n  }\n\n  .cite-workbench .cite-list {\n    border-inline-end: 0;\n  }\n\n  .cite-workbench .cite-library[data-open=\"true\"] .cite-inspector {\n    grid-row: 1 / -1;\n  }\n\n  .cite-workbench .cite-back {\n    display: inline-flex;\n    align-self: flex-start;\n    margin: 5px 8px;\n  }\n\n  .cite-workbench .cite-inspector-bar {\n    padding-inline: 10px;\n    border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  }\n\n  .cite-workbench .cite-inspector-scroll {\n    padding-inline: 12px;\n  }\n}\n\n@container cite-workbench (max-width: 660px) {\n  .cite-workbench .cite-shell {\n    grid-template:\n      \"brand import\" auto\n      \"tabs tabs\" auto\n      \"panel panel\" minmax(0, 1fr)\n      / minmax(0, 1fr) max-content;\n  }\n\n  .cite-workbench .w-tabs {\n    justify-self: stretch;\n    margin: 0 10px 7px;\n  }\n\n  .cite-workbench .w-tabs > button {\n    flex: 1 1 auto;\n    padding-inline: 6px;\n    min-block-size: 32px;\n  }\n\n  .cite-workbench .cite-subpage {\n    padding: 15px 12px 24px;\n  }\n}\n\n@container cite-workbench (max-width: 420px) {\n  .cite-workbench :is(.cite-metadata, .cite-form-grid) {\n    grid-template-columns: minmax(0, 1fr);\n  }\n\n  .cite-workbench .cite-card {\n    padding: 10px;\n  }\n}\n";
function CiteButton({ className = '', children, variant = 'outline', icon, spinning = false, type = 'button', ...props }) {
  const P = hostPrimitives();
  const mappedVariant = variant === 'danger' ? 'ghost' : variant;
  const classes = [
    'cite-button',
    variant === 'primary' && 'cite-button-primary',
    variant === 'danger' && 'cite-button-danger',
    className,
  ].filter(Boolean).join(' ');
  return h(P.Button, {
    type,
    ...props,
    'aria-busy': spinning ? 'true' : props['aria-busy'],
    className: classes,
    variant: mappedVariant,
    size: 'sm',
    icon: icon ? h(W.Icon, { name: icon, size: 15, spinning }) : undefined,
  }, children);
}

function CiteIconButton({ label, className = '', ...props }) {
  return h(CiteButton, {
    ...props,
    variant: 'ghost',
    className: ('cite-icon-button ' + className).trim(),
    'aria-label': label,
    title: label,
  });
}

function CiteInput({ className = '', icon, ...props }) {
  const P = hostPrimitives();
  return h(P.Input, {
    ...props,
    className: ('cite-input-wrap ' + className).trim(),
    icon: icon ? h(W.Icon, { name: icon, size: 15 }) : undefined,
  });
}

function CiteCheckbox({ label, hiddenLabel = false, checked, disabled, onChange, className = '', title, ...props }) {
  const P = hostPrimitives();
  return h(P.Checkbox, {
    ...props,
    checked: Boolean(checked),
    disabled,
    label,
    title: title || (hiddenLabel && typeof label === 'string' ? label : undefined),
    className: ['cite-checkbox', hiddenLabel && 'dsh-checkbox-icon', className].filter(Boolean).join(' '),
    onChange: next => onChange?.(typeof next === 'boolean' ? next : Boolean(next?.target?.checked)),
  });
}

function CiteSegmented({ id, label, value, options, onChange, disabled = false, className = '' }) {
  const P = hostPrimitives();
  return h(P.SegmentedControl, {
    id,
    label,
    value,
    options,
    disabled,
    onChange,
    className: ('cite-segmented ' + className).trim(),
  });
}

function CitePicker({ id, label, value, options, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [uiStyle] = useDshStyle(React);
  const P = hostPrimitives();
  const current = options.find(option => option.id === value) || options[0];
  return h('div', { className: 'cite-picker-wrap', 'data-window-drag-exclude': '' },
    h(P.Menu, {
      open: Boolean(open && !disabled),
      dshStyle: uiStyle,
      portal: !P.isFallback,
      compact: true,
      autoFocus: true,
      minWidthFromAnchor: true,
      className: 'cite-picker',
      anchor: h(CiteButton, {
        id,
        disabled,
        className: 'cite-picker-button',
        'aria-label': label + ' · ' + (current?.label || ''),
        'aria-haspopup': 'menu',
        'aria-expanded': Boolean(open && !disabled),
        onClick: () => setOpen(prev => !prev),
        onKeyDown: event => {
          if (!open && (event?.key === 'ArrowDown' || event?.key === 'ArrowUp')) {
            event.preventDefault?.();
            setOpen(true);
          }
        },
      }, h('span', { ref: open ? createOverlaySyncRef(uiStyle) : undefined }, current?.label || ''), h(W.Icon, { name: 'down', size: 13 })),
      items: options,
      selectedId: value,
      onClose: () => setOpen(false),
      onSelect: nextId => { setOpen(false); onChange(nextId); },
    }),
  );
}

const citationStyles = [
  { id: 'gb-t-7714', label: 'GB/T 7714' },
  { id: 'apa', label: 'APA' },
  { id: 'mla', label: 'MLA' },
  { id: 'chicago', label: 'Chicago' },
];

const styleLabel = id => citationStyles.find(option => option.id === id)?.label || id;
const authorName = author => author.name || [author.family, author.given].filter(Boolean).join(' ');
const authors = work => work.authors.map(authorName).join(', ');

const fieldNames = {
  title: ['标题', 'Title'], authors: ['作者', 'Authors'], year: ['年份', 'Year'],
  containerTitle: ['期刊 / 文集', 'Journal / collection'], publisher: ['出版社', 'Publisher'],
  type: ['文献类型', 'Type'], volume: ['卷', 'Volume'], issue: ['期', 'Issue'],
  page: ['页码', 'Pages'], language: ['语言', 'Language'],
  url: ['URL', 'URL'], isbn: ['ISBN', 'ISBN'],
};

const warningLabels = {
  missing_title: ['缺少标题', 'Missing title'],
  missing_authors: ['缺少作者', 'Missing authors'],
  missing_year: ['缺少年份', 'Missing year'],
  missing_doi: ['缺少 DOI', 'Missing DOI'],
  long_citation_key: ['引用键过长，导出将使用短键', 'Long citation key; export uses a shorter key'],
};

const fieldName = (key, t) => t(...(fieldNames[key] || [key, key]));
const warningLabel = (code, t) => t(...(warningLabels[code] || [code, code]));
const valueText = value => Array.isArray(value)
  ? value.map(item => item && typeof item === 'object' ? authorName(item) : String(item ?? '')).join(', ')
  : String(value ?? '');

function CiteChip({ tone = '', children, ...props }) {
  return h('span', { ...props, className: ('cite-chip ' + tone).trim() }, children);
}

function CiteCard({ title, actions, children, className = '' }) {
  return h('section', { className: ('cite-card ' + className).trim(), 'data-dsh-card': '' },
    h('header', { className: 'cite-card-header' }, h('h3', null, title), actions),
    children,
  );
}

function CiteSubpage({ title, description, children }) {
  return h('div', { className: 'cite-subpage' },
    h('div', { className: 'cite-subpage-inner' },
      h('h2', { 'data-dsh-editorial-heading': '' }, title),
      description ? h('p', { className: 'cite-description' }, description) : null,
      children,
    ),
  );
}

function CiteMessage({ tone, children, onClose, t }) {
  return h(W.Status, { tone, className: 'cite-message' },
    h('div', { className: 'cite-message-body' }, h('span', null, children),
      h(CiteIconButton, { icon: 'close', label: t('关闭消息', 'Dismiss message'), onClick: onClose }),
    ),
  );
}

function useCitationOutput({ kind, id, style, lang, revision }) {
  const key = JSON.stringify([kind, id, style, lang, revision]);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    api({ action: 'export', kind, ids: [id], style, lang }, lang, controller.signal)
      .then(value => {
        if (!controller.signal.aborted) setResult({ key, content: value.content.trim() });
      })
      .catch(error => {
        if (!controller.signal.aborted) setResult({ key, error: error.message });
      });
    return () => controller.abort();
  }, [key]);
  return id && result?.key === key ? result : {};
}

function CiteOutput({ output, label, code = false, t }) {
  if (output.error) return h(W.Status, { tone: 'error' }, output.error);
  if (!output.content) return h('p', { className: 'cite-muted', role: 'status' }, t('正在生成…', 'Formatting…'));
  return h('pre', { className: code ? 'cite-code' : 'cite-formatted', 'aria-label': label }, output.content);
}

function CiteEnrichment({ t, job, busy, onCancel, onDismiss }) {
  const running = job.state === 'running';
  const status = {
    running: t('正在从 Crossref 补全', 'Fetching from Crossref'),
    done: t('Crossref 补全完成', 'Crossref enrichment complete'),
    failed: t('补全失败', 'Enrichment failed'),
    cancelled: t('补全已取消', 'Enrichment cancelled'),
  }[job.state];
  const failed = job.results.filter(row => !row.ok).length;
  return h('section', { className: 'cite-job', 'aria-label': t('补全进度', 'Enrichment progress') },
    h('div', { className: 'cite-job-header' },
      h('div', { role: job.state === 'failed' ? 'alert' : 'status' },
        h('strong', null, status),
        h('span', { className: 'cite-muted' }, ' · ' + job.completed + '/' + job.total),
        job.state === 'done' ? h('span', { className: 'cite-muted' },
          t(' · 已保存 ' + job.saved + ' 条，失败 ' + failed + ' 条', ' · Saved ' + job.saved + ', failed ' + failed),
        ) : null,
        job.message ? h('p', null, t(job.message, job.messageEn || 'Enrichment could not be completed.')) : null,
      ),
      running
        ? h(CiteButton, { variant: 'ghost', onClick: onCancel, disabled: busy }, t('取消补全', 'Cancel enrichment'))
        : h(CiteIconButton, { icon: 'close', label: t('关闭补全结果', 'Dismiss enrichment results'), onClick: onDismiss }),
    ),
    running ? h('progress', { max: job.total || 1, value: job.completed, 'aria-label': t('补全进度', 'Enrichment progress') }) : null,
    job.results.length ? h('details', { className: 'cite-job-results' },
      h('summary', null, t('查看每条结果', 'Show individual results')),
      h('ul', { className: 'cite-plain-list' }, job.results.map(row =>
        h('li', { key: row.id },
          h('code', null, row.doi || t('没有 DOI', 'No DOI')),
          h('p', { className: row.ok ? 'cite-muted' : 'cite-error-text' }, row.ok
            ? row.filled.length ? t('补全：', 'Filled: ') + row.filled.map(key => fieldName(key, t)).join(', ') : t('无需补全', 'No empty fields filled')
            : t(row.error, row.errorEn || 'Lookup failed. Check the DOI or retry.')),
          row.conflicts?.length ? h('p', { className: 'cite-muted' },
            t('有 ' + row.conflicts.length + ' 项差异，已保留本地值。', row.conflicts.length + ' differences. Local values were retained.'),
          ) : null,
        ),
      )),
    ) : null,
  );
}

function CiteImport({
  t, locked, kind, text, label, preview, chosen, dirty, conflict,
  changeImport, upload, onPreview, onChoose, onRetry, onSave, onBack,
}) {
  const id = typeof React.useId === 'function' ? React.useId() : 'cite-import';
  const file = useRef(null);
  const inputLabel = t('DOI / BibTeX 输入', 'DOI / BibTeX input');
  const noInput = !text.trim();
  const chosenRows = new Set(chosen);
  return h(CiteSubpage, {
    title: t('DOI / BibTeX 导入预览与去重', 'DOI / BibTeX import and deduplication'),
    description: t('先在本地检查重复和缺失字段，再勾选要保存的文献。', 'Review duplicates and missing fields locally, then select entries to save.'),
  },
    h('form', { onSubmit: event => { event.preventDefault(); if (!locked && !noInput && !conflict) onPreview(); } },
      h(CiteCard, {
        title: t('批量输入', 'Batch input'),
        actions: h('div', { className: 'cite-actions' },
          h(CiteButton, { icon: 'upload', disabled: locked, onClick: () => file.current?.click() }, t('上传 .bib', 'Upload .bib')),
          h(CiteButton, { variant: 'primary', type: 'submit', icon: 'search', disabled: locked || noInput || conflict }, t('本地预览', 'Local preview')),
        ),
      },
        h('div', { className: 'cite-form-grid' },
          h('div', null,
            h('span', { className: 'cite-label' }, t('输入类型', 'Input type')),
            h(CiteSegmented, {
              id: id + '-kind',
              label: t('输入类型', 'Input type'),
              value: kind,
              disabled: locked,
              options: [
                { value: 'doi', label: t('DOI 列表', 'DOI list') },
                { value: 'bibtex', label: 'BibTeX / BibLaTeX' },
              ],
              onChange: value => changeImport({ kind: value }),
            }),
          ),
          h('div', null,
            h('label', { className: 'cite-label', htmlFor: id + '-source' }, t('来源名称（可选）', 'Source name (optional)')),
            h(CiteInput, {
              id: id + '-source',
              value: label,
              maxLength: 160,
              disabled: locked,
              placeholder: t('例如：开题参考文献', 'e.g. Manuscript draft'),
              onChange: event => changeImport({ label: event.target.value }),
            }),
          ),
          h('div', { className: 'cite-field-wide' },
            h('label', { className: 'cite-label', htmlFor: id + '-text' }, inputLabel),
            h('textarea', {
              id: id + '-text', className: 'cite-field cite-mono', rows: 7, value: text, disabled: locked,
              spellCheck: false, onChange: event => changeImport({ text: event.target.value }),
              placeholder: kind === 'doi'
                ? '10.1038/nature12345\nhttps://doi.org/10.1145/3368089.3409749'
                : '@article{key,\n  title={Your title},\n  author={Family, Given},\n  year={2026}\n}',
            }),
          ),
          h('input', { hidden: true, ref: file, type: 'file', accept: '.bib', onChange: upload }),
        ),
        h('p', { className: 'cite-muted cite-form-note' }, t('每批最多 256 KiB、100 条，文献库最多 500 条。', 'Up to 256 KiB and 100 entries per batch, and 500 entries per library.')),
        dirty ? h('p', { className: 'cite-muted' }, t('输入尚未保存入库，切页时会保留。', 'Unsaved input is retained when switching tabs.')) : null,
      ),
    ),
    conflict ? h(W.Status, { tone: 'error' },
      h('div', { className: 'cite-conflict' },
        h('span', null, t('文献库已在别处更新。当前输入已保留，请重新预览后保存。', 'The library changed elsewhere. Preview the retained input again before saving.')),
        h(CiteButton, { icon: 'refresh', disabled: locked || noInput, onClick: onRetry }, t('重新预览当前输入', 'Preview current input again')),
      ),
    ) : null,
    preview ? h(CiteCard, {
      title: t('导入预览', 'Import preview'),
      actions: h('div', { className: 'cite-actions' },
        h(CiteButton, { variant: 'ghost', icon: 'left', disabled: locked || conflict, onClick: onBack }, t('返回输入', 'Back to input')),
        h(CiteButton, {
          variant: 'primary', icon: 'check', disabled: locked || conflict || chosen.length === 0, onClick: onSave,
        }, t('保存所选 ', 'Save selected ') + chosen.length),
      ),
    },
      h('p', { className: 'cite-muted', role: 'status' }, preview.label + ' · ' + t('已选 ', 'Selected ') + chosen.length + '/' + preview.rows.length),
      h('ul', { className: 'cite-plain-list' }, preview.rows.map(row => h('li', { key: row.index, 'data-dsh-row': '' },
        h('div', { className: 'cite-preview-row' },
          h(CiteCheckbox, {
            checked: chosenRows.has(row.index),
            disabled: locked || !!row.error || !!row.duplicate,
            hiddenLabel: true,
            label: t('保存预览条目 ', 'Save preview entry ') + (row.index + 1),
            onChange: checked => onChoose(checked ? [...chosen, row.index] : chosen.filter(index => index !== row.index)),
          }),
          h('span', { className: 'cite-preview-content' },
            h('strong', null, row.work?.title || row.work?.doi || row.key),
            row.work ? h('span', { className: 'cite-preview-meta' }, [authors(row.work), row.work.year, row.work.doi].filter(Boolean).join(' · ')) : null,
            h('span', { className: 'cite-chips' },
              row.duplicate ? h(CiteChip, { tone: 'warn' }, row.duplicate === 'library'
                ? t('DOI 已在库中', 'DOI already saved') : t('同批 DOI 重复', 'Repeated DOI in this batch')) : null,
              row.candidate ? h(CiteChip, { tone: 'warn' }, t('可能重复，请核对', 'Possible duplicate')) : null,
              row.warnings.map(code => h(CiteChip, { key: code, tone: 'warn' }, warningLabel(code, t))),
              row.error ? h(CiteChip, { tone: 'danger' }, t(row.error, row.errorEn || 'Invalid reference. Check the input.')) : null,
            ),
          ),
        ),
      ))),
    ) : null,
  );
}

function CiteCheck({ t, lang, text, report, onReport, onChange }) {
  const id = typeof React.useId === 'function' ? React.useId() : 'cite-check';
  const request = useRef(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => () => {
    request.current?.abort();
    request.current = null;
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (!text.trim() || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    onReport(null);
    setRunning(true);
    setError('');
    setCancelled(false);
    try {
      const result = await api({ action: 'check', text }, lang, controller.signal);
      if (!controller.signal.aborted) onReport(result);
    } catch (err) {
      if (!controller.signal.aborted) setError(err.message);
    } finally {
      if (request.current === controller) {
        request.current = null;
        setRunning(false);
      }
    }
  }

  function cancel() {
    request.current?.abort();
    request.current = null;
    setRunning(false);
    setCancelled(true);
  }

  const pass = report?.results.filter(row => row.ok).length || 0;
  return h(CiteSubpage, {
    title: t('文稿 DOI 核查', 'Manuscript DOI check'),
    description: t('从文稿或参考文献列表中提取 DOI，并通过 Crossref 查看登记结果。', 'Extract DOIs from a manuscript or reference list and check their Crossref records.'),
  },
    h('form', { onSubmit: submit },
      h(CiteCard, {
        title: t('核查输入', 'Text to check'),
        actions: running ? h(CiteButton, { icon: 'close', onClick: cancel }, t('取消核查', 'Cancel check'))
          : h(CiteButton, {
            variant: 'primary', type: 'submit', icon: 'check', disabled: !text.trim(),
          }, t('核查 DOI', 'Check DOIs')),
      },
        h('label', { className: 'cite-label', htmlFor: id }, t('含 DOI 的文本', 'Text containing DOIs')),
        h('textarea', {
          id, className: 'cite-field cite-mono', rows: 7, value: text, disabled: running, spellCheck: false,
          placeholder: t('粘贴文稿中的参考文献，或 DOI 列表…', 'Paste references from your manuscript or a list of DOIs…'),
          onChange: event => { onChange(event.target.value); setError(''); setCancelled(false); },
        }),
        h('p', { className: 'cite-muted cite-form-note' }, t('按首次出现的顺序核查前 50 个唯一 DOI。只将提取出的 DOI 发给 Crossref。',
          'Checks the first 50 unique DOIs in order of appearance. Sends only extracted DOIs to Crossref.')),
        running ? h('p', { className: 'cite-muted', role: 'status' }, t('正在核查 DOI…', 'Checking DOIs…')) : null,
        cancelled ? h('p', { className: 'cite-muted', role: 'status' }, t('已取消核查。', 'DOI check cancelled.')) : null,
        error ? h(W.Status, { tone: 'error' }, error) : null,
      ),
    ),
    report ? h(CiteCard, { title: t('核查结果', 'Check results') },
      h('p', { className: 'cite-muted', role: 'status' }, report.count
        ? t('共 ' + report.count + ' 个 DOI，查到 ' + pass + ' 个。',
          'Found ' + pass + ' of ' + report.count + ' DOIs.')
        : t('输入中未提取到 DOI。', 'No DOIs were found in the input.')),
      h('ul', { className: 'cite-plain-list' }, report.results.map(row => h('li', { key: row.doi, className: 'cite-result-row', 'data-dsh-row': '' },
        h('div', null, h('code', null, row.doi),
          h('p', { className: 'cite-muted' }, row.ok ? row.title || t('未提供标题', 'Title unavailable') : t(row.error, row.errorEn)),
        ),
        h(CiteChip, { tone: row.ok ? 'success' : 'warn' }, row.ok ? t('已查到', 'Found') : t('查询失败', 'Lookup failed')),
      ))),
    ) : null,
  );
}

function CiteExport({ t, lang, entries, selected, style, setStyle, revision, scope, onScope }) {
  const id = typeof React.useId === 'function' ? React.useId() : 'cite-export';
  const selectedIds = new Set(selected);
  const picked = entries.filter(entry => selectedIds.has(entry.id));
  const effectiveScope = scope === 'selected' && picked.length ? 'selected' : 'all';
  const scoped = effectiveScope === 'selected' ? picked : entries;
  const preview = useCitationOutput({ kind: 'references', id: scoped[0]?.id, style, lang, revision });
  const checks = ['title', 'authors', 'year'].map(field => ({
    field, missing: scoped.filter(entry => entry.warnings.includes('missing_' + field)).length,
  }));
  const hasMissing = checks.some(check => check.missing > 0);
  const scopedIds = effectiveScope === 'selected' ? picked.map(entry => entry.id) : undefined;
  const items = [
    { kind: 'references', label: t('参考文献文本', 'Reference text'), detail: styleLabel(style) + ' · .txt', ids: scopedIds },
    { kind: 'bibtex', label: 'BibTeX', detail: '.bib', ids: scopedIds },
    { kind: 'backup', label: t('完整备份', 'Full backup'), detail: t('全库及原始导入来源', 'Entire library with original sources') + ' · .json' },
  ];

  return h(CiteSubpage, {
    title: t('引文导出与来源备份', 'Citation export and source backup'),
    description: t('选择导出范围和格式，下载参考文献或备份完整文献库。', 'Choose a scope and format to download citations or back up the library.'),
  },
    h(CiteCard, { title: t('导出前检查', 'Before you export') },
      h('div', { className: 'cite-form-grid' },
        h('div', null,
          h('span', { className: 'cite-label' }, t('导出范围', 'Export scope')),
          h(CiteSegmented, {
            id: id + '-scope',
            label: t('导出范围', 'Export scope'),
            value: effectiveScope,
            options: [
              { value: 'all', label: t('全部文献', 'Entire library') + ' · ' + entries.length },
              { value: 'selected', label: t('仅所选', 'Selected only') + ' · ' + picked.length, disabled: !picked.length },
            ],
            onChange: onScope,
          }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: id + '-style' }, t('引文格式', 'Citation format')),
          h(CitePicker, { id: id + '-style', label: t('引文格式', 'Citation format'), value: style, options: citationStyles, onChange: setStyle }),
        ),
      ),
      h('div', { className: 'cite-chips cite-form-note' }, checks.map(({ field, missing }) =>
        h(CiteChip, { key: field, tone: missing ? 'warn' : '' },
          t('缺' + fieldName(field, t) + ' ' + missing + ' 条', missing + ' missing ' + fieldName(field, t).toLowerCase())),
      )),
      hasMissing ? h('p', { className: 'cite-muted cite-form-note' }, t('含缺失字段的文献仍可导出，提交前请核对。',
        'Entries with missing fields can still be exported. Review them before submission.')) : null,
      scoped.length ? h('div', { className: 'cite-export-sample' },
        h('h4', { className: 'cite-label' }, t('首条引文预览', 'First citation preview')),
        h(CiteOutput, { output: preview, label: t('引文预览', 'Citation preview'), t }),
      ) : h('p', { className: 'cite-muted cite-form-note' }, t('当前范围没有文献。可在引文库勾选条目，或切换到全部文献。',
        'This scope is empty. Select entries in the library or choose the entire library.')),
    ),
    h(CiteCard, { title: t('下载', 'Downloads') },
      h('ul', { className: 'cite-plain-list cite-downloads' }, items.map(item => {
        const available = item.kind === 'backup' ? entries.length > 0 : scoped.length > 0;
        return h('li', { key: item.kind, className: 'cite-result-row', 'data-dsh-row': '' },
          h('div', null, h('strong', null, item.label), h('p', { className: 'cite-muted' }, item.detail)),
          available ? h('a', {
            className: 'cite-download',
            'data-primary': String(item.kind === 'backup'),
            href: download(item.kind, style, lang, item.ids),
            download: '',
            'aria-label': t('下载 ', 'Download ') + item.label,
          }, h(W.Icon, { name: 'download', size: 15 }), t('下载', 'Download')) : null,
        );
      })),
    ),
  );
}

function referenceTitle(entry, t) {
  return entry.work.title || entry.work.doi || t('无标题', 'Untitled');
}

function CiteLibrary({
  entries, sources, revision, t, lang, uiStyle, loading, loaded, locked, running,
  selected, setSelected, style, setStyle, copiedKey,
  filter, search, limit, activeId, setActiveId, onSearch, onFilter, onMore, onRefresh, onImport, enrich, copy,
}) {
  const [openedId, setOpenedId] = useState('');
  const lastRow = useRef(null);
  const root = useRef(null);
  const pickerId = typeof React.useId === 'function' ? React.useId() : 'cite-style-picker';
  const { indexed, missing, enriched } = useMemo(() => {
    const indexed = entries.map(entry => {
      const byline = authors(entry.work);
      const { title, doi, year, containerTitle } = entry.work;
      return {
        entry, byline,
        query: [title, byline, doi, year, entry.bibKey, containerTitle].join(' ').toLowerCase(),
      };
    });
    return {
      indexed,
      missing: entries.filter(entry => entry.warnings.length).length,
      enriched: entries.filter(entry => entry.crossref).length,
    };
  }, [entries]);
  const filters = [
    { id: 'all', label: t('全部文献', 'All references'), count: entries.length },
    { id: 'missing', label: t('有字段缺失', 'Missing fields'), count: missing },
    { id: 'enriched', label: t('已查询 Crossref', 'Crossref checked'), count: enriched },
  ];
  const query = search.trim().toLowerCase();
  const matches = indexed.filter(({ entry, query: haystack }) => {
    if (filter === 'missing' && !entry.warnings.length) return false;
    if (filter === 'enriched' && !entry.crossref) return false;
    return haystack.includes(query);
  });
  const visible = matches.slice(0, limit);
  const active = (visible.find(({ entry }) => entry.id === activeId) || visible[0])?.entry;
  const open = !!active && active.id === openedId;
  const selectedIds = new Set(selected);
  const canEnrichSelected = entries.some(entry => selectedIds.has(entry.id) && entry.work.doi);
  const searchLabel = t('搜索 DOI、标题、作者或引用键', 'Search DOI, title, author or citation key');

  useEffect(() => {
    if (!open) return;
    const back = root.current?.querySelector('.cite-back');
    if (back?.getClientRects?.().length) back.focus({ preventScroll: true });
  }, [open, openedId]);

  function back() {
    setOpenedId('');
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => lastRow.current?.focus({ preventScroll: true }));
    }
  }

  function changeFilter(value) {
    onFilter(value);
    setOpenedId('');
  }

  function changeSearch(event) {
    onSearch(event.target.value);
    setOpenedId('');
  }

  return h('div', { ref: root, className: 'cite-library', 'data-open': String(open) },
    h('aside', { className: 'cite-rail', 'aria-label': t('文献库筛选', 'Library filters') },
      h('div', { className: 'cite-style-box', 'data-dsh-card': '' },
        h('label', { className: 'cite-label', htmlFor: pickerId }, t('引文格式', 'Citation format')),
        h(CitePicker, { id: pickerId, label: t('引文格式', 'Citation format'), value: style, options: citationStyles, onChange: setStyle }),
      ),
      h('div', { className: 'cite-filters', role: 'group', 'aria-label': t('按文献状态筛选', 'Filter by reference status') },
        h('h2', { className: 'cite-label' }, t('馆藏与质量筛选', 'Collection and status')),
        filters.map(item => h('button', {
          key: item.id, type: 'button', className: 'cite-filter', 'aria-pressed': filter === item.id,
          onClick: () => changeFilter(item.id),
        }, h('span', null, item.label), h('span', { className: 'cite-count' }, item.count))),
      ),
    ),
    h('section', { className: 'cite-list', 'aria-label': t('文献列表', 'Reference list'), 'aria-busy': loading },
      h('div', { className: 'cite-searchbar' },
        h(CiteInput, {
          className: 'cite-search',
          type: 'search',
          'aria-label': searchLabel,
          placeholder: searchLabel + '…',
          value: search,
          onChange: changeSearch,
          icon: 'search',
        }),
        h(CiteIconButton, {
          icon: 'refresh',
          spinning: Boolean(loading || running),
          label: t('刷新文献库', 'Refresh library'),
          disabled: locked,
          onClick: onRefresh,
        }),
      ),
      entries.length ? h('div', { className: 'cite-selection' },
        h('span', { className: 'cite-muted', role: 'status' },
          t(matches.length + ' 条 · 已选 ' + selected.length, matches.length + ' results · ' + selected.length + ' selected'),
        ),
        h('div', { className: 'cite-actions' },
          h(CiteButton, {
            variant: 'ghost', disabled: locked || !visible.length,
            onClick: () => setSelected(visible.slice(0, 100).map(({ entry }) => entry.id)),
          }, t('选择可见项', 'Select visible')),
          selected.length ? h(CiteButton, { variant: 'ghost', icon: 'close', disabled: locked, onClick: () => setSelected([]) },
            t('清空选择', 'Clear selection'),
          ) : null,
        ),
      ) : null,
      h('div', { className: 'cite-list-scroll' },
        loading ? h('p', { className: 'cite-list-loading', role: 'status' }, t('正在读取文献库…', 'Loading library…'))
          : !loaded ? h(W.Empty, {
            title: t('暂时无法读取文献库', 'Could not load the library'),
            action: h(CiteButton, { icon: 'refresh', disabled: locked, onClick: onRefresh }, t('重新加载', 'Reload')),
          })
          : entries.length === 0 ? h(W.Empty, {
            icon: 'book', title: t('文献库为空', 'Your library is empty'),
            action: h(CiteButton, { variant: 'primary', icon: 'plus', onClick: onImport }, t('导入文献', 'Import references')),
          }, t('从 DOI 列表或 BibTeX 开始。', 'Start with a DOI list or a BibTeX file.'))
          : matches.length === 0 ? h(W.Empty, {
            icon: 'search', title: t('没有匹配的文献', 'No matching references'),
            action: h(CiteButton, { icon: 'close', onClick: () => { changeFilter('all'); onSearch(''); } }, t('清空筛选', 'Clear filters')),
          }) : h('ul', { className: 'cite-reference-list' }, visible.map(({ entry, byline }) => h(CiteReferenceRow, {
            key: entry.id, entry, byline, active: entry.id === active?.id, checked: selectedIds.has(entry.id),
            disabled: locked || (selected.length >= 100 && !selectedIds.has(entry.id)), t,
            onOpen: event => {
              lastRow.current = event.currentTarget;
              setActiveId(entry.id);
              setOpenedId(entry.id);
            },
            onSelect: checked => setSelected(checked ? [...selected, entry.id] : selected.filter(id => id !== entry.id)),
          }))),
        visible.length < matches.length ? h(CiteButton, { className: 'cite-more', onClick: onMore },
          t('再显示 50 条', 'Show 50 more'),
        ) : null,
      ),
      selected.length ? h('div', { className: 'cite-selection-footer' }, h(CiteButton, {
        icon: 'refresh', spinning: Boolean(running), disabled: locked || !canEnrichSelected, onClick: () => enrich(selected),
      }, t('从 Crossref 补全所选', 'Enrich selection from Crossref'))) : null,
    ),
    h('section', { className: 'cite-inspector', 'aria-label': t('文献详情', 'Reference details') },
      open ? h(CiteButton, { className: 'cite-back', icon: 'left', variant: 'ghost', onClick: back }, t('返回文献列表', 'Back to references')) : null,
      active
        ? h(CiteInspector, {
          key: active.id, entry: active, sources, style, uiStyle, lang, revision, locked, running, copiedKey, enrich, copy, t,
        })
        : h('p', { className: 'cite-inspector-empty' }, t('选择文献以查看引文与元数据。', 'Select a reference to view its citation and metadata.')),
    ),
  );
}

function CiteReferenceRow({ entry, byline, active, checked, disabled, t, onOpen, onSelect }) {
  const title = referenceTitle(entry, t);
  const { work, bibKey, warnings, crossref } = entry;
  const meta = [byline, work.year, work.containerTitle].filter(Boolean).join(' · ');
  return h('li', {
    className: 'cite-reference-row',
    'data-dsh-row': '',
    'data-selected': String(Boolean(active)),
    'data-active': String(Boolean(active)),
  },
    h('div', { className: 'cite-reference-check' }, h(CiteCheckbox, {
      checked,
      disabled,
      hiddenLabel: true,
      label: t('选择文献 ', 'Select reference ') + title,
      onChange: onSelect,
    })),
    h('button', { type: 'button', className: 'cite-reference-button', 'aria-pressed': active, onClick: onOpen },
      h('strong', null, title),
      meta ? h('span', { className: 'cite-reference-meta' }, meta) : null,
      h('span', { className: 'cite-chips' },
        bibKey ? h(CiteChip, { tone: 'accent' }, '@' + bibKey) : null,
        work.doi ? h(CiteChip, null, 'DOI ' + work.doi) : null,
        warnings.length ? h(CiteChip, { tone: 'warn', title: warnings.map(code => warningLabel(code, t)).join(' · ') }, t('字段缺失', 'Missing fields')) : null,
        crossref ? h(CiteChip, { tone: 'success' }, t('已查询 Crossref', 'Crossref checked')) : null,
      ),
    ),
  );
}

function CiteInspector({ entry, sources, style, uiStyle, lang, revision, locked, running, copiedKey, enrich, copy, t }) {
  const [sourceOpen, setSourceOpen] = useState(false);
  const { id, work, bibKey, warnings, crossref } = entry;
  const citation = useCitationOutput({ kind: 'references', id, style, lang, revision });
  const bibtex = useCitationOutput({ kind: 'bibtex', id, lang, revision });
  const matchedSources = entry.sourceIds.map(sourceId => sources.find(source => source.id === sourceId)).filter(Boolean);
  const sourceLabels = entry.sourceIds.map(sourceId => sources.find(source => source.id === sourceId)?.label || sourceId);
  const citationLabel = styleLabel(style);
  const volumePages = [work.year, work.volume && t('卷 ', 'Vol. ') + work.volume,
    work.issue && t('期 ', 'No. ') + work.issue, work.page && t('页 ', 'pp. ') + work.page].filter(Boolean).join(' · ');
  const fields = [
    { label: t('引用键', 'Citation key'), value: bibKey, code: true },
    { label: 'DOI', value: work.doi, code: true },
    { label: t('标题', 'Title'), value: work.title, wide: true },
    { label: t('作者', 'Authors'), value: authors(work), wide: true },
    { label: t('期刊 / 文集', 'Journal / collection'), value: work.containerTitle },
    { label: t('年份 / 卷期 / 页码', 'Year / volume / pages'), value: volumePages },
  ];
  const provenance = [
    { label: t('导入来源', 'Import sources'), value: sourceLabels.join(' · '), wide: true },
    ...['publisher', 'isbn', 'url', 'language'].filter(key => work[key]).map(key => ({
      label: fieldName(key, t), value: work[key], wide: key === 'url',
    })),
  ];
  const crossrefHint = work.doi
    ? t('向 Crossref 查询 DOI，仅补空字段。', 'Looks up the DOI in Crossref and fills empty fields.')
    : t('此文献没有 DOI。', 'This reference has no DOI.');

  return h(React.Fragment, null,
    h('div', { className: 'cite-inspector-bar' },
      h('div', { className: 'cite-chips' },
        bibKey ? h(CiteChip, { tone: 'accent' }, '@' + bibKey) : null,
        sourceLabels[0] ? h(CiteChip, { title: sourceLabels.join(' · ') }, sourceLabels[0]) : null,
      ),
      h('div', { className: 'cite-actions' },
        h(CiteButton, {
          className: 'cite-crossref',
          icon: 'refresh',
          spinning: Boolean(running),
          disabled: locked || !work.doi,
          title: crossrefHint,
          onClick: () => enrich([id]),
        }, t('Crossref 补全', 'Enrich from Crossref')),
        h(CiteButton, {
          icon: copiedKey === 'citation' ? 'check' : 'copy',
          'data-copied': copiedKey === 'citation' ? 'true' : undefined,
          disabled: !citation.content,
          onClick: () => copy(citation.content, t('引文', 'citation'), 'citation'),
        }, copiedKey === 'citation' ? t('已复制引文', 'Copied citation') : t('复制引文', 'Copy citation')),
        h(CiteButton, {
          icon: copiedKey === 'bibtex' ? 'check' : 'copy',
          'data-copied': copiedKey === 'bibtex' ? 'true' : undefined,
          disabled: !bibtex.content,
          onClick: () => copy(bibtex.content, 'BibTeX', 'bibtex'),
        }, copiedKey === 'bibtex' ? t('已复制 BibTeX', 'Copied BibTeX') : t('复制 BibTeX', 'Copy BibTeX')),
        matchedSources.length ? h(CiteButton, {
          variant: 'ghost',
          icon: 'file',
          'aria-haspopup': 'dialog',
          onClick: () => setSourceOpen(true),
        }, t('原始输入', 'Raw source')) : null,
      ),
    ),
    h('div', { className: 'cite-inspector-scroll' },
      h(CiteCard, {
        title: t(citationLabel + ' 引文预览', citationLabel + ' citation preview'),
        actions: h('span', { className: 'cite-muted' }, t('提交前请核对引用要求', 'Check submission requirements')),
      }, h(CiteOutput, { output: citation, label: t('引文预览', 'Citation preview'), t })),
      crossref?.conflicts?.length ? h(CiteCard, { className: 'cite-differences', title: t('Crossref 字段差异', 'Crossref differences') },
        h('p', { className: 'cite-muted' }, t('存在差异的字段已保留本地值。', 'Local values were retained for fields with differences.')),
        h('table', { className: 'cite-diff-table' },
          h('thead', null, h('tr', null,
            h('th', { scope: 'col' }, t('字段', 'Field')),
            h('th', { scope: 'col' }, t('本地值', 'Local value')),
            h('th', { scope: 'col' }, 'Crossref'),
          )),
          h('tbody', null, crossref.conflicts.map(item => h('tr', { key: item.field },
            h('th', { scope: 'row' }, fieldName(item.field, t)),
            h('td', null, valueText(item.local)),
            h('td', null, valueText(item.crossref)),
          ))),
        ),
      ) : null,
      h(CiteCard, { title: t('文献元数据', 'Bibliographic metadata') },
        h(CiteMetadata, { fields, t }),
        warnings.length ? h('div', { className: 'cite-chips cite-metadata-note' },
          warnings.map(code => h(CiteChip, { key: code, tone: 'warn' }, warningLabel(code, t))),
        ) : null,
      ),
      h(CiteCard, { title: t('BibTeX 条目', 'BibTeX entry') }, h(CiteOutput, { output: bibtex, label: 'BibTeX', code: true, t })),
      h('details', { className: 'cite-card cite-provenance', 'data-dsh-card': '' },
        h('summary', null, t('来源与补全记录', 'Sources and enrichment history')),
        h(CiteMetadata, { fields: provenance, t }),
        crossref ? h('p', { className: 'cite-muted cite-metadata-note' },
          t('Crossref 查询于 ', 'Crossref checked ') + new Date(crossref.fetchedAt).toLocaleString(lang)
            + (crossref.filled?.length ? ' · ' + t('补全 ', 'Filled ') + crossref.filled.map(key => fieldName(key, t)).join(', ') : ''),
        ) : null,
      ),
    ),
    sourceOpen ? h(W.Dialog, {
      style: uiStyle,
      title: t('原始导入来源', 'Original import source'),
      closeLabel: t('关闭', 'Close'),
      onClose: () => setSourceOpen(false),
      footer: h(CiteButton, { onClick: () => setSourceOpen(false) }, t('完成', 'Done')),
    }, matchedSources.map(source => h('section', { key: source.id, className: 'cite-source-entry' },
      h('div', { className: 'cite-card-header' },
        h('strong', null, source.label || source.id),
        source.text ? h(CiteButton, {
          icon: copiedKey === 'source-' + source.id ? 'check' : 'copy',
          'data-copied': copiedKey === 'source-' + source.id ? 'true' : undefined,
          onClick: () => copy(source.text, t('原始输入', 'raw source'), 'source-' + source.id),
        }, copiedKey === 'source-' + source.id ? t('已复制', 'Copied') : t('复制原文', 'Copy source')) : null,
      ),
      h('pre', { className: 'cite-code' }, source.text || t('无原文记录', 'No raw text recorded')),
    ))) : null,
  );
}

function CiteMetadata({ fields, t }) {
  return h('dl', { className: 'cite-metadata' }, fields.map(field => h('div', {
    key: field.label, className: field.wide ? 'cite-field-wide' : undefined,
  }, h('dt', { className: 'cite-label' }, field.label),
  h('dd', { className: field.code ? 'cite-mono' : undefined }, field.value || t('未提供', 'Not provided')))));
}


    const route = 'api/dsh-cite/library';
    const emptyLibrary = { revision: 0, entries: [], sources: [] };
    const pageSize = 50;
    let draft = {
      kind: 'doi', text: '', label: '', preview: null, chosen: [],
      selected: [], style: 'gb-t-7714', dirty: false, conflict: false,
    };

    function language(locale) {
      return String(locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
    }

    async function api(body, lang, signal) {
      const response = await fetch(new URL(route, document.baseURI), {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' },
        body: JSON.stringify(body),
        signal,
      });
      let data;
      try {
        data = await response.json();
      } catch {
        signal?.throwIfAborted();
        throw new Error(lang === 'en'
          ? 'Could not read the library response. Check whether DSH restarted, then retry.'
          : '无法读取文献库响应，请检查 DSH 是否已重启。');
      }
      if (!response.ok || !data.ok) {
        const error = new Error(lang === 'en'
          ? data.messageEn || 'The operation could not be completed. Check the input or refresh and retry.'
          : data.message || '操作未完成。');
        error.status = response.status;
        throw error;
      }
      return data.value;
    }

    function download(kind, style, lang, ids) {
      const url = new URL(route, document.baseURI);
      url.searchParams.set('kind', kind);
      url.searchParams.set('style', style);
      url.searchParams.set('lang', lang);
      if (ids?.length) url.searchParams.set('ids', ids.join(','));
      return url.href;
    }

    function Workbench({ locale, workbench = false } = {}) {
      const [lang, setLang] = useState(() => language(locale));
      const [uiStyle, setUiStyle] = useDshStyle(React);
      const [activeTab, setActiveTab] = useState('library');
      const [library, setLibrary] = useState(null);
      const [job, setJob] = useState(null);
      const [loading, setLoading] = useState(true);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const [notice, setNotice] = useState('');
      const [copiedKey, setCopiedKey] = useState('');
      const [search, setSearch] = useState('');
      const [filter, setFilter] = useState('all');
      const [limit, setLimit] = useState(pageSize);
      const [activeId, setActiveId] = useState('');
      const [exportScope, setExportScope] = useState(() => draft.selected.length ? 'selected' : 'all');
      const [checkText, setCheckText] = useState('');
      const [checkReport, setCheckReport] = useState(null);
      const [form, setForm] = useState(draft);
      const { kind, text, label, preview, chosen, selected, style, dirty, conflict } = form;

      const busyRef = useRef(false);
      const dirtyRef = useRef(dirty);
      const copyTimerRef = useRef(null);
      const t = (zh, en) => lang === 'en' ? en : zh;
      const jobId = job?.id;
      const running = job?.state === 'running';
      const locked = loading || busy || running;

      const updateForm = values => setForm(old => ({ ...old, ...values }));
      const setSelected = ids => updateForm({ selected: ids });
      const setStyle = value => updateForm({ style: value });

      // Update protection: dsh-cite
      __stardustUpdatesGuard(React, "dsh-cite", { dirty, busy: locked, retainOnClose: true });

      useEffect(() => () => {
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      }, []);
      useEffect(() => {
        const update = () => setLang(language(locale));
        update();
        return locale?.subscribe?.(update);
      }, [locale]);
      useEffect(() => {
        draft = form;
        dirtyRef.current = dirty;
      }, [form, dirty]);
      useEffect(() => {
        if (typeof window?.addEventListener !== 'function') return;
        function warn(event) {
          if (!dirtyRef.current) return;
          event.preventDefault();
          event.returnValue = '';
        }
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
      }, []);

      async function refresh(signal) {
        const state = await api({ action: 'list' }, lang, signal);
        if (signal?.aborted) return;
        const ids = new Set(state.entries.map(entry => entry.id));
        setLibrary(state);
        setForm(old => ({ ...old, selected: old.selected.filter(id => ids.has(id)) }));
        setJob(old => state.jobs.find(item => item.state === 'running')
          || state.jobs.find(item => item.id === old?.id)
          || state.jobs.at(-1) || null);
      }

      useEffect(() => {
        const controller = new AbortController();
        refresh(controller.signal)
          .catch(err => { if (!controller.signal.aborted) setError(err.message); })
          .finally(() => { if (!controller.signal.aborted) setLoading(false); });
        return () => controller.abort();
      }, []);
      useEffect(() => {
        if (!running) return;
        const controller = new AbortController();
        let polling = false;
        const timer = setInterval(async () => {
          if (polling) return;
          polling = true;
          try {
            const next = await api({ action: 'job', job: jobId }, lang, controller.signal);
            if (controller.signal.aborted) return;
            if (next.state !== 'running') {
              await refresh(controller.signal).catch(err => {
                if (!controller.signal.aborted) setError(err.message);
              });
            }
            if (!controller.signal.aborted) setJob(next);
          } catch (err) {
            if (!controller.signal.aborted) {
              setError(err.message);
              setJob(null);
            }
          } finally {
            polling = false;
          }
        }, 1000);
        return () => { clearInterval(timer); controller.abort(); };
      }, [jobId, running, lang]);

      async function perform(action, importing = false) {
        if (busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        setError('');
        setNotice('');
        try {
          await action();
        } catch (err) {
          if (importing && err.status === 409) updateForm({ conflict: true });
          else setError(err.message);
        } finally {
          busyRef.current = false;
          setBusy(false);
        }
      }

      function changeImport(values) {
        updateForm({ ...values, dirty: true, preview: null, chosen: [], conflict: false });
        setError('');
        setNotice('');
      }

      async function parse() {
        const result = await api({ action: 'preview', kind, text, label }, lang);
        updateForm({
          preview: result,
          chosen: result.rows.filter(row => row.selectedDefault).map(row => row.index),
          conflict: false,
        });
      }

      const { entries, sources, revision } = library || emptyLibrary;
      async function save() {
        const oldIds = new Set(entries.map(entry => entry.id));
        const result = await api({ action: 'import', preview: preview.id, selection: chosen }, lang);
        const imported = result.entries.filter(entry => !oldIds.has(entry.id)).map(entry => entry.id);
        setLibrary(result);
        updateForm({ preview: null, chosen: [], selected: imported, dirty: false, conflict: false });
        setActiveId(imported[0] || '');
        setFilter('all');
        setSearch('');
        const firstImported = result.entries.findIndex(entry => entry.id === imported[0]);
        setLimit(Math.max(pageSize, Math.ceil((firstImported + 1) / pageSize) * pageSize));
        setActiveTab('library');
        setNotice(t('已保存 ' + chosen.length + ' 条文献，原始输入已纳入完整备份。',
          'Saved ' + chosen.length + ' references. The full backup includes the original input.'));
      }

      function enrich(ids) {
        return perform(async () => setJob(await api({ action: 'enrich', ids, revision }, lang)));
      }

      async function upload(event) {
        const input = event.currentTarget;
        const file = input.files?.[0];
        input.value = '';
        if (!file) return;
        await perform(async () => {
          if (!/\.bib$/i.test(file.name)) throw new Error(t('请选择 .bib 文件。', 'Choose a .bib file.'));
          if (file.size > 256 * 1024) throw new Error(t('文件超过 256 KiB，请拆分导入。', 'File exceeds 256 KiB. Split it before importing.'));
          changeImport({ kind: 'bibtex', text: await file.text(), label: file.name.slice(0, 160) });
        });
      }

      async function copy(value, format, key = '') {
        try {
          await navigator.clipboard.writeText(value);
          setError('');
          setNotice(t('已复制' + format + '。', 'Copied ' + format + '.'));
          if (key) {
            setCopiedKey(key);
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
            copyTimerRef.current = setTimeout(() => setCopiedKey(''), 1400);
          }
        } catch {
          setNotice('');
          setError(t('无法访问剪贴板，请从预览中手动复制。', 'Clipboard access is unavailable. Copy from the preview.'));
        }
      }

      const tabs = [
        { id: 'library', label: t('引文库', 'Library'), count: library ? entries.length : undefined },
        { id: 'import', label: t('导入预览', 'Import') },
        { id: 'check', label: t('DOI 核查', 'DOI check') },
        { id: 'export', label: t('导出备份', 'Export') },
      ];
      const onImport = () => setActiveTab('import');

      let panel;
      switch (activeTab) {
        case 'import':
          panel = h(CiteImport, {
            t, locked, kind, text, label, preview, chosen, dirty, conflict, changeImport, upload,
            onPreview: () => perform(parse),
            onRetry: () => perform(async () => { await refresh(); await parse(); }),
            onSave: () => perform(save, true),
            onChoose: indices => updateForm({ chosen: indices }),
            onBack: () => updateForm({ preview: null, chosen: [], conflict: false }),
          });
          break;
        case 'check':
          panel = h(CiteCheck, {
            t, lang, text: checkText, report: checkReport, onReport: setCheckReport,
            onChange: value => { setCheckText(value); setCheckReport(null); },
          });
          break;
        case 'export':
          panel = h(CiteExport, {
            t, lang, entries, selected, style, setStyle, revision, scope: exportScope, onScope: setExportScope,
          });
          break;
        default:
          panel = h(CiteLibrary, {
            t, lang, uiStyle, entries, sources, revision, loading, loaded: !!library, locked, running,
            selected, setSelected, style, setStyle, copiedKey,
            filter, search, limit, activeId, setActiveId, onImport, enrich, copy,
            onSearch: value => { setSearch(value); setActiveId(''); setLimit(pageSize); },
            onFilter: value => { setFilter(value); setActiveId(''); setLimit(pageSize); },
            onMore: () => setLimit(n => n + pageSize),
            onRefresh: () => perform(refresh),
          });
      }

      return h('section', {
        className: 'dshw cite-workbench',
        'data-main': String(Boolean(workbench)),
        'data-dsh-style': uiStyle,
      },
        h(W.Styles),
        h('style', null, CITE_WORKBENCH_CSS),
        h('div', { className: 'cite-shell' },
          h('h1', { className: 'cite-brand' }, h('span', { className: 'cite-brand-icon' }, h(W.Icon, { name: 'book', size: 15 })), 'dsh-cite'),
          h('div', { className: 'cite-header-actions' },
            h(StyleSwitcher, {
              style: uiStyle,
              onChange: setUiStyle,
              lang,
              compact: true,
              id: 'cite-style-switcher',
            }),
            h(CiteButton, {
              className: 'cite-quick-import', variant: 'primary', icon: 'plus', onClick: onImport,
            }, t('导入 DOI / BibTeX', 'Import DOI / BibTeX')),
          ),
          h(W.Tabs, { label: t('引文工作台', 'Citation workbench'), items: tabs, value: activeTab, onChange: setActiveTab },
            error || notice || job ? h('div', { className: 'cite-feedback' },
              error ? h(CiteMessage, { tone: 'error', onClose: () => setError(''), t }, error) : null,
              notice ? h(CiteMessage, { tone: 'success', onClose: () => setNotice(''), t }, notice) : null,
              job ? h(CiteEnrichment, {
                t, job, busy, onDismiss: () => setJob(null),
                onCancel: () => perform(async () => { await api({ action: 'cancel', job: job.id }, lang); }),
              }) : null,
            ) : null,
            panel,
            workbench && typeof __stardustUpdatesFooter === 'function'
              ? __stardustUpdatesFooter(React, 'dsh-cite') : null,
          ),
        ),
      );
    }

    function apply(ctx) {
      let locale;
      try {
        locale = ctx.get?.('locale') || ctx.locale;
      } catch {}
      const label = () => language(locale) === 'en' ? 'Reference library' : '引文库';

      ctx.effect(() => {
        let live = true;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        function register() {
          if (live) W.register(ctx, { id: 'dsh-cite.workbench', label, icon: 'book', component: Workbench, inject: () => ({ locale }), order: 64 });
        }
        fetch(new URL('api/dsh-cite/preferences', document.baseURI), { credentials: 'same-origin', signal: controller.signal })
          .then(response => {
            if (!response.ok) throw new Error('Unavailable preferences');
            return response.json();
          })
          .then(value => { if (value.hideWorkbench !== true) register(); })
          .catch(register)
          .finally(() => clearTimeout(timer));
        return () => { live = false; clearTimeout(timer); controller.abort(); };
      }, 'dsh-cite: workbench visibility');

      ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section', id: 'dsh-cite', order: 64, label, inject: () => ({ locale }),
      }, Workbench));
    }

    return {
      inject: ['slots', 'locale'],
      apply,
      __internals: {
        DSH_STYLES,
        DSH_STYLE_STORAGE_KEY,
        DSH_STYLE_EVENT,
        DSH_DEFAULT_STYLE,
        normalizeDshStyle,
        readDshStyle,
        writeDshStyle,
        subscribeDshStyle,
      },
    };
  },
},{"name":"dsh-cite","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.9.0","label":"引文库","labelEn":"Citations","suiteComponent":true,"sectionIds":["dsh-cite"],"iconData":"data:image/webp;base64,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"}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();

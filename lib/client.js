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
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suiteUpdating = next.job?.name === '@stardustlc/dsh-suite' && ['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state);
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && (row.enabled || suiteUpdating));
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
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 11, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < 11 && !record.upgrading) {
    // An earlier loaded participant may still own an older client revision. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 11; pools.set(root, shared);
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
  const { useState, useEffect, useRef } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const REPOS = { 'dsh-calendar': 'dsh-calendar', 'dsh-cite': 'dsh-cite', 'dsh-code-security': 'dsh-code-security', 'dsh-codex-port': 'dsh-codex-port', 'deepseek-computer-use': 'deepseek-computer-use', 'dsh-dingtalk': 'dsh-dingtalk', '@stardustlc/dsh-docker': 'dsh-docker', '@stardustlc/dsh-dream': 'dsh-dream', 'dsh-email': 'dsh-email', 'dsh-ffmpeg': 'dsh-ffmpeg', 'dsh-flakefinder': 'dsh-flakefinder', 'dsh-hyperframes': 'dsh-hyperframes', 'dsh-minimal-ptc': 'dsh-minimal-ptc', 'dsh-ppt': 'dsh-ppt', 'dsh-remotion': 'dsh-remotion', '@stardustlc/dsh-review': 'dsh-review', 'dsh-rss': 'dsh-rss', 'dsh-slack': 'dsh-slack', 'dsh-sql': 'dsh-sql', '@stardustlc/dsh-suite': 'dsh-suite', 'dsh-voice': 'dsh-voice' };
  const repoUrl = pkg => Object.hasOwn(REPOS, pkg) ? 'https://github.com/STARDUSTLC666/' + REPOS[pkg] : null;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, autoScope: 'compatible', deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
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
  const STALE_CHECK_MS = 30 * 60 * 1000, STALE_RETRY_MS = 5 * 60 * 1000, staleChecks = new Map(), staleInFlight = new Set();
  function refreshIfStale(row) {
    if (!alive || !row || row.sourceKind !== 'registry' || row.bundledBy || !row.available || row.updating) return;
    const now = Date.now();
    if (row.checkedAt && now - row.checkedAt <= STALE_CHECK_MS) return;
    if (staleInFlight.has(row.name) || now - (staleChecks.get(row.name) ?? -Infinity) < STALE_RETRY_MS) return;
    staleChecks.set(row.name, now);
    staleInFlight.add(row.name);
    void (async () => {
      try { await api({ action: 'check', name: row.name }); await refresh(); }
      catch { /* Offline or transient errors stay silent and throttled by staleChecks. */ }
      finally { staleInFlight.delete(row.name); }
    })();
  }
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
      'release-changed': t('发现更新的发布版本（或发布信息已更新），已刷新至最新状态，请再次确认安装。', 'A newer release or updated metadata was found and refreshed; confirm again to install.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
      'version-mismatch': t('宿主装入的版本与目标不同。请重新检查版本和软件源策略。', 'The installed version differs from the target. Check the release and registry policy.'),
      'unexpected-package': t('宿主装入的包或版本与目标不同。请检查版本和软件源策略。', 'The installed package or version differed from the target. Check the release and registry policy.'),
      'version-unconfirmed': t('尚未确认新版已加载，请在插件详情中检查当前版本。', 'The new version could not be confirmed. Check the installed version in plugin details.'),
      'build-blocked': t('构建脚本等待批准。请查看原生插件管理中的安装提示。', 'Build scripts await approval. Review the install details in native plugin management.'),
      'bundle-in-use': t('宿主暂时无法热卸载旧版（通常因本轮刚更新过其他共用底层依赖的插件，内存路径待刷新；或同时启用了包含此组件的组合包）：直接手动重启一次 DSH 即可继续更新，无需逐个停用插件。', 'The host cannot hot-unload the previous version right now (usually because another plugin sharing dependencies was updated earlier in this session, or a bundle containing this component is also active): restart DSH once and retry without disabling plugins one by one.'),
      'already-installed': t('该包已在当前配置中，请刷新或重启 DSH 后查看当前版本。', 'This package is already present in the profile; refresh or restart DSH to inspect its version.'),
      'incompatible-version': t('目标版本与当前运行的 DSH 版本不兼容。', 'The target version is incompatible with the running DSH version.'),
      'stop-profile': t('当前配置未启用热重载，需关闭 DSH 后再通过命令行更新。', 'This profile runs without hot reload; stop DSH and update via CLI.'),
      'not-removable': t('此内置或受保护插件不支持在此处移除替换。', 'This built-in or protected bundle cannot be replaced here.'),
      'pkg-network': t('连接 npm 源时网络中断，请稍后重试。', 'Network error reaching the package registry. Retry shortly.'),
      'pkg-timeout': t('包管理器请求超时，请检查网络后重试。', 'Package manager request timed out. Check your connection and retry.'),
      'pkg-not-found': t('未找到目标版本或已被源撤回，请重新检查更新。', 'Target release was not found on the registry. Check again.'),
      'pkg-no-matching-version': t('没有匹配当前兼容性要求的已发布版本。', 'No published version matches the compatibility constraints.'),
      'pkg-integrity': t('下载包的完整性校验未通过，已放弃安装，请重试。', 'Package integrity verification failed. Installation aborted; retry.'),
      'pkg-disk-full': t('磁盘空间不足，请清理后重试。', 'Disk space is full. Free disk space and retry.'),
      'pkg-permission': t('无权写入当前 profile 目录，请检查文件权限。', 'Permission denied writing to this profile directory.'),
      'pkg-pnpm-missing': t('未检测到可用的 pnpm，请在环境或宿主插件设置中检查。', 'pnpm is unavailable to the host package manager.'),
      'operation-error': t('宿主包管理器未能完成操作，可在原生「插件」详情页点击更新查看完整日志。', 'Host package manager did not complete the operation. Retry from native plugin details to inspect logs.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  function reasonOf(job) {
    if (!job) return null;
    if (job.reason) return job.reason;
    const res = job.outcome?.result;
    if (res?.pendingBuilds || res?.failureKind === 'build-blocked') return 'build-blocked';
    if (res?.failureKind && ['network', 'timeout', 'not-found', 'no-matching-version', 'integrity', 'pnpm-missing', 'disk-full', 'permission'].includes(res.failureKind)) return 'pkg-' + res.failureKind;
    return res?.error?.code || null;
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
  const FOOTER_CSS = '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:16px;padding-top:14px;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}'
    + '.dshw.plugin-updates-footer.is-inline{display:block!important;width:100%!important;max-width:100%!important;margin-block:auto 0!important;margin-inline:0!important;padding:6px 14px!important;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));background:var(--dsw-alias-bg-layer-1,var(--w-soft,#f7f8fa));font-size:12px;line-height:1.45}'
    + '.plugin-updates-footer .updates-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 12px;min-block-size:28px;min-width:0}'
    + '.plugin-updates-footer .updates-bar-info,.plugin-updates-footer .updates-bar-actions,.plugin-updates-footer .updates-head-actions,.plugin-updates-footer .updates-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;min-width:0}'
    + '.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 12px}'
    + '.plugin-updates-footer .updates-compact-bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px 12px}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options{margin-top:0;min-width:0}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options[open]{flex:1 1 100%}'
    + '.plugin-updates-footer h2{font-size:13.5px;line-height:1.4;margin:0;font-weight:600}'
    + '.plugin-updates-footer .updates-pill{display:inline-flex;align-items:center;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-pill.is-accent{background:color-mix(in srgb,var(--w-accent,#4f6bdb) 14%,transparent);color:var(--w-accent,#4f6bdb)}'
    + '.plugin-updates-footer .updates-pill.is-error{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#ad3636) 14%,transparent);color:var(--dsw-alias-state-error-primary,#ad3636)}'
    + '.plugin-updates-footer .updates-mono,.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere;margin:0}'
    + '.plugin-updates-footer .updates-badge{padding:1px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-meta-line,.plugin-updates-footer .updates-note{margin:3px 0 0;font-size:12px;line-height:1.55}'
    + '.plugin-updates-footer .updates-inline-msg.is-error{color:var(--dsw-alias-state-error-primary,#ad3636);font-size:12px}'
    + '.plugin-updates-footer .w-button.is-sm{min-block-size:26px;min-inline-size:26px;min-height:26px;padding:3px 9px;font-size:12px;gap:5px;border-radius:6px}'
    + '.plugin-updates-footer .updates-options{margin-top:8px}'
    + '.plugin-updates-footer .updates-options>summary{cursor:pointer;display:inline-flex;align-items:center;gap:0.55ch;min-block-size:24px;font-size:12px;line-height:1.5;font-weight:500;color:var(--dsw-alias-label-secondary,#657080);list-style:none}'
    + '.plugin-updates-footer .updates-options>summary:after{display:none}'
    + '.plugin-updates-footer .updates-options>summary::before{content:"";inline-size:6px;block-size:6px;flex-shrink:0;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;rotate:-45deg}'
    + '.plugin-updates-footer .updates-options>summary:dir(rtl)::before{rotate:135deg}'
    + '.plugin-updates-footer .updates-options[open]>summary::before{rotate:45deg}'
    + '.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer details::details-content{interpolate-size:allow-keywords;overflow:clip;contain:layout}'
    + '.plugin-updates-footer details:not([open])::details-content{block-size:0}'
    + '.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;padding:10px 0 2px}'
    + '.plugin-updates-footer>.w-section{margin:8px 0 0;padding:0;border:0}'
    + '.plugin-updates-footer .w-toolbar{margin-top:8px!important}'
    + '.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}'
    + '.plugin-updates-footer .w-switch-track{flex-shrink:0}'
    + '.plugin-updates-footer .updates-notes{margin-top:8px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:8px;background:var(--dsw-alias-bg-base,var(--w-bg,#fff))}'
    + '.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;overflow:auto;margin:6px 0;padding:10px;font:12px/1.65 ui-monospace,monospace}'
    + '.plugin-updates-footer .updates-notes pre code{font:inherit;background:transparent;padding:0}'
    + '.plugin-updates-footer .updates-links{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;margin-top:10px;padding-top:8px;border-top:1px dashed var(--dsw-alias-border-l3,#e5e7eb);font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-links a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;min-block-size:24px;gap:4px}'
    + '.plugin-updates-footer .updates-links a:hover{color:var(--dsw-alias-label-primary,#202124);text-decoration:underline}'
    + '.plugin-updates-footer .updates-links a:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer .w-overlay{z-index:1002}'
    + '.plugin-updates-footer .updates-auto-nudge{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:6px;font-size:12px;color:var(--dsw-alias-label-secondary,#657080)}'
    + '@media(pointer:coarse){.plugin-updates-footer .w-button.is-sm{min-block-size:32px;min-height:32px;padding:5px 11px}}'
    + '@media(prefers-reduced-motion:no-preference){.plugin-updates-footer .updates-options>summary::before{transition:rotate .18s ease}.plugin-updates-footer details::details-content{transition:block-size .22s ease,content-visibility .22s ease allow-discrete}}'
    + '@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}';
  function FooterFrame({ name, label, inline = false, supplement = false, head, children }) {
    return h('section', { className: 'dshw plugin-updates-footer' + (inline ? ' is-inline' : ''), 'data-plugin-update-footer': name, 'aria-label': label + (supplement ? t(' · 自动更新与反馈', ' · Auto-update and feedback') : t(' · 版本与更新', ' · Version and updates')) },
      h('style', null, W.styles),
      h('style', null, FOOTER_CSS),
      head, children);
  }
  function Panel({ name, inline = false }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenActiveJob = useRef ? useRef(null) : { current: null };
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    if (job && ['verifying', 'installing', 'cancelling'].includes(job.state)) seenActiveJob.current = job.id;
    const panelStaleTarget = !!snapshot && !!row && !!original && (!inline || (row.sourceKind === 'registry' && row.available && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release?.version));
    useEffect(() => { if (panelStaleTarget && !activeJob()) refreshIfStale(row); }, [panelStaleTarget, row?.name, row?.available, row?.checkedAt]);
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { staleChecks.set(target, Date.now()); await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      setError(''); setWorking(true);
      try {
        try {
          await heartbeat();
          const started = await api(request);
          seenActiveJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
          await refresh();
        } finally { manualOperation = false; notify(); }
      } catch (err) {
        setError(err.message);
        if (request.action === 'install' && ['check-first', 'release-changed'].includes(err?.message)) {
          staleChecks.set(target, Date.now());
          await api({ action: 'check', name: target }).catch(() => {});
        }
        await refresh().catch(() => {});
      } finally { setWorking(false); }
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (inline && (!snapshot || !row || !original)) return null;
    if (!snapshot) return h('p', { className: 'dshw w-muted' }, t('正在读取更新状态…', 'Loading update status…'));
    if (!row || !original) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const staleWindows = (snapshot.pages.clients || []).some(client => !client.fresh);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy);
    const installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known
      || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const managed = row.sourceKind === 'registry';
    const showUpdate = managed && row.available;
    const deferred = prefs.deferredUntil > Date.now();
    const ignored = !!row.release?.version && prefs.ignoredVersion === row.release.version;
    const actionableUpdate = showUpdate && !deferred && !ignored;
    const canConfirm = showUpdate && row.release?.version === selectedVersion && !installLocked && !row.loadError;
    const isSuite = target === '@stardustlc/dsh-suite';
    const jobResult = job?.outcome?.result;
    const jobReason = reasonOf(job);
    const jobActiveThis = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canCancel = jobActiveThis && !['applying', 'restoring'].includes(job.phase);
    const jobAttentionThis = !!job && ['restart-required', 'restored', 'restore-failed', 'unknown', 'failed'].includes(job.state) && (unconfirmed || dismissedJobId !== job.id);
    const jobJustCompleted = !!job && job.state === 'complete' && seenActiveJob.current === job.id && dismissedJobId !== job.id;
    const canSuggestAuto = !!job && job.state === 'complete' && !jobReason && job.mode !== 'automatic' && (!prefs.autoInstall || prefs.autoScope !== 'compatible') && managed && !snapshot.preferenceError && dismissedJobId !== job.id;
    const inlineJobVisible = jobActiveThis || jobAttentionThis || jobJustCompleted;
    if (inline && !actionableUpdate && !inlineJobVisible && !working && !checking && !error && !dialog && !notesOpen) return null;
    const notesSection = notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') },
      h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')),
      loadingNotes ? h('p', { className: 'w-muted updates-note' }, t('正在读取…', 'Loading…'))
        : notes?.text ? h('pre', { tabIndex: 0, role: 'region', 'aria-label': t('更新记录内容', 'Release notes content') }, h('code', null, notes.text))
        : h('p', { className: 'w-muted updates-note' }, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')),
      notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog')));
    const windowsDialog = dialog === 'windows' && h(W.Dialog, { title: t('断开的窗口都已关闭？', 'Are the disconnected windows closed?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))));
    const confirmDialog = ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? (isSuite ? t('允许 Suite 空闲时自动热更新？', 'Allow idle automatic updates for Suite?') : t('允许这个插件空闲时自动热更新？', 'Allow idle automatic updates for this plugin?')) : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), isSuite && h('p', null, t('此处设置作用于 Suite 整包（包含 18 个组件）。独立安装的其他插件不受影响。', 'This setting applies to the whole Suite (including its 18 components). Other independently installed plugins are unaffected.')), h('p', null, t('你正在主动启用自动安装。只处理通过当前 DSH 与 Node 兼容性校验的稳定版本（含功能小版本与补丁，跨主版本仍需手动确认）；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for compatible stable releases (minor and patch updates matching this DSH and Node runtime; major upgrades still require manual confirmation). Running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('支持热更新时原地重载，不会自动重启 DSH；其他插件不会跟着开启，可随时关闭。', 'Hot-reloads in place when supported and never restarts DSH automatically. Other plugins remain unchanged; turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true, autoScope: 'compatible' }, 'enable-idle-compatible-updates')); } }, t('允许空闲自动热更新', 'Allow idle automatic updates')))) :
      h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
        h('p', null, selectedVersion === row.release?.version ? t('Harness 会热更新并重新加载；需要手动重启时，更新区会显示宿主结果，停用状态会保留。', 'Harness hot-updates and reloads in place. If a manual restart is needed, it appears in the update result; disabled status is preserved.') : (showUpdate && row.release?.version ? message('release-changed') : message('check-first'))),
        h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          showUpdate && row.release?.version && row.release.version !== selectedVersion
            ? h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: () => { setError(''); setSelectedVersion(row.release.version); } }, t('更新为 v', 'Use v') + row.release.version)
            : h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name: target, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))));
    const checkButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : isSuite ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates'));
    const recheckButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : t('重新检查', 'Check again'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setError(''); if (job && !jobActiveThis && !unconfirmed) setDismissedJobId(job.id); setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('更新 Suite 至 v', 'Update Suite to v') : t('更新至 v', 'Update to v')) + row.release.version)
      : managed ? checkButton() : null;
    if (inline) {
      const lockHint = unconfirmed ? message('operation-unconfirmed')
        : snapshot.updaterRestart ? message('restart-required')
        : snapshot.preferenceError ? message('preferences-unreadable')
        : (snapshot.pages.dirty || ownPage.dirty) ? t('请先保存修改后再更新', 'Save changes before updating')
        : (snapshot.activity.busy || pageBusy) ? t('当前任务或对话框结束后可更新', 'Finish active task or dialog to update')
        : (!snapshot.activity.known || !snapshot.pages.known) ? t('等待窗口状态确认', 'Waiting for window confirmation')
        : '';
      return h(FooterFrame, { name, label: title, inline: true, head: h('div', { className: 'updates-bar' },
        h('div', { className: 'updates-bar-info' },
          inlineJobVisible
            ? h(React.Fragment, null,
              h('span', { className: 'updates-pill' + (jobActiveThis ? ' is-accent' : ['failed', 'restore-failed', 'unknown', 'restored'].includes(job.state) ? ' is-error' : '') }, jobLabel(job)),
              job.to && h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + job.from + ' → ' + job.to),
              jobReason && h('span', { className: 'updates-inline-msg is-error' }, message(jobReason)))
            : actionableUpdate ? h(React.Fragment, null,
              h('span', { className: 'updates-pill is-accent' }, isSuite ? t('Suite 新版本', 'Suite update') : t('有新版本', 'Update available')),
              h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + 'v' + row.version + ' → v' + row.release.version),
              lockHint && h('span', { className: 'w-muted' }, '· ' + lockHint)) : null,
          error && h('span', { className: 'updates-inline-msg is-error', role: 'alert' }, message(error))),
        h('div', { className: 'updates-bar-actions' },
          staleWindows && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDialog('windows') }, t('确认已关闭窗口', 'Confirm closed windows')),
          canCancel && h(W.Button, { className: 'is-sm', disabled: job?.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && error === 'check-first' && managed && recheckButton(actionableUpdate ? 'ghost' : 'primary'),
          !jobActiveThis && actionableUpdate && row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版', 'Ignore')),
          !jobActiveThis && actionableUpdate && primary,
          !jobActiveThis && !actionableUpdate && canSuggestAuto && h(W.Button, { variant: 'primary', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
          !jobActiveThis && !actionableUpdate && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => { setError(''); setNotesOpen(false); if (job) setDismissedJobId(job.id); } }, t('关闭', 'Dismiss')))) },
        notesSection, windowsDialog, confirmDialog);
    }
    function progress() {
      if (!job || (!jobActiveThis && !unconfirmed && dismissedJobId === job.id)) return null;
      if (job.state === 'complete' && !jobReason) {
        return job.to ? h('div', null,
          h('p', { className: 'w-muted updates-note' }, '✓ ' + jobLabel(job) + ' · ' + job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
          canSuggestAuto && h('div', { className: 'updates-auto-nudge' },
            h('span', null, t('以后有兼容新版本时，需要空闲自动热更新吗？', 'Auto-install future compatible updates while idle?')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭', 'Dismiss')))) : null;
      }
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
        job.state === 'restart-required' && jobResult?.restartReason === 'package-moved' && h('p', { className: 'w-muted updates-note' }, t('新版已就绪；因多个独立插件共用底层依赖，请先手动重启一次 DSH 生效后再继续更新其他插件。', 'Installed; because standalone plugins share dependencies, restart DSH once before updating additional plugins.')),
        jobReason && h(W.Status, { tone: 'error' }, message(jobReason)),
        h('div', { className: 'updates-bar-actions', style: { marginTop: '6px' } },
          canCancel && h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭提示', 'Dismiss'))));
    }
    function windowControls() {
      if (!staleWindows) return null;
      return h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { className: 'is-sm', onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows')));
    }
    const incompatibleText = row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : '';
    const optionsSection = h('details', { className: 'updates-options' },
      h('summary', null, !original.bundledBy ? t('自动更新与提醒', 'Auto-update & reminders') : t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? (prefs.autoScope === 'compatible' ? t('空闲自动热更新：兼容版', 'Idle auto-update: compatible') : t('空闲自动热更新：仅补丁', 'Idle auto-update: patches')) : t('空闲自动热更新：关', 'Idle auto-update: off')),
      h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: isSuite ? t('自动检查 Suite 整包更新', 'Automatically check Suite updates') : t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每 6 小时最多一次。只影响这个安装包，关闭后仍可手动检查。', 'On by default, at most every 6 hours. This affects only this bundle; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: isSuite ? t('空闲时自动热更新 Suite 兼容版本', 'Auto-install compatible Suite updates while idle') : t('空闲时自动热更新兼容版本', 'Auto-install compatible updates while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => event.target.checked ? (setError(''), setDialog('automatic')) : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅在空闲且无未保存修改时热更新兼容稳定版（含功能小版本与补丁，不含跨主版本）。其他插件的开关不变。', 'Off by default. Explicitly enable compatible stable updates (minor and patch, excluding major) while idle with no unsaved changes. Other plugins’ settings stay unchanged.')), prefs.autoInstall && prefs.autoScope !== 'compatible' && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('升级为包含兼容功能小版本', 'Include compatible minor updates')))));
    const errorStatus = error && h(W.Status, { tone: 'error' }, error === 'check-first' && managed ? h('div', { className: 'updates-bar-actions' }, h('span', null, message(error)), recheckButton('ghost')) : message(error));
    const linksNav = (() => {
      const ownRepo = repoUrl(original.name), suiteRepo = repoUrl('@stardustlc/dsh-suite'), starRepo = isSuite ? suiteRepo : ownRepo;
      if (!ownRepo && !starRepo) return null;
      return h('nav', { className: 'updates-links', 'aria-label': t('开源仓库与反馈', 'Repository and feedback') },
        starRepo && h('a', { href: starRepo, target: '_blank', rel: 'noreferrer noopener' }, isSuite ? t('★ 觉得好用？在 GitHub 给 dsh-suite 点个 Star', '★ Useful? Star dsh-suite on GitHub') : t('★ 觉得好用？在 GitHub 点个 Star', '★ Useful? Star on GitHub')),
        ownRepo && h('a', { href: ownRepo + '/issues', target: '_blank', rel: 'noreferrer noopener' }, t('提交建议 / 问题反馈', 'Feedback & issues')),
        isSuite && original.name !== '@stardustlc/dsh-suite' && ownRepo && h('a', { href: ownRepo, target: '_blank', rel: 'noreferrer noopener' }, t('组件仓库', 'Component repo')),
        !isSuite && suiteRepo && h('a', { href: suiteRepo, target: '_blank', rel: 'noreferrer noopener' }, t('了解 dsh-suite（18 合 1 组合包）', 'Explore dsh-suite (18-in-1 bundle)')));
    })();
    if (!original.bundledBy) {
      // Native bundle detail pages in DSH already render their own Version & Source sections
      // ("重新检查", version list & "更新" button). Keep only non-duplicative auto-update preferences,
      // inline changelog notes, compatibility/error diagnostics, and GitHub feedback links here.
      return h(FooterFrame, { name, label: title, supplement: true, head: h('div', { className: 'updates-compact-bar' },
        optionsSection,
        (row.release || (showUpdate && (!deferred || !ignored))) && h('div', { className: 'updates-head-actions' },
          row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('推迟提醒 24h', 'Snooze 24h')),
          showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版提醒', 'Mute reminder')))) },
        notesSection,
        incompatibleText && h(W.Status, null, incompatibleText),
        errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
        snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停，建议先重启一次 DSH 再继续更新其他共用依赖的插件。', 'An update awaits a manual restart; idle auto-updates are paused. Restart DSH once before updating other plugins that share dependencies.')),
        prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
        (prefs.autoInstall || jobActiveThis) && windowControls(),
        jobActiveThis && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
        jobActiveThis && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
        deferred && h('p', { className: 'w-muted updates-note' }, t('已推迟此插件的工作台更新提示 24 小时。', 'Workbench update notices for this plugin are snoozed for 24 hours.')),
        unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
        progress(),
        linksNav,
        windowsDialog, confirmDialog
      );
    }
    const status = !managed ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : incompatibleText || (row.available ? (ignored ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet'));
    return h(FooterFrame, { name, label: title, head: h('div', { className: 'updates-head' },
      h('div', null,
        h('div', { className: 'updates-title-row' }, h('h2', null, t('随 Suite 整包管理', 'Managed via Suite bundle')), h('span', { className: 'updates-mono updates-badge' }, original.name + ' · v' + original.version)),
        h('p', { className: 'w-muted updates-meta-line' }, status, row.checkedAt ? ' · ' + t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN') : ''),
        h('p', { className: 'updates-version updates-note' }, target + ' · v' + row.version, row.release?.version && row.release.version !== row.version ? ' → v' + row.release.version : '')),
      h('div', { className: 'updates-head-actions' },
        showUpdate && checkButton('ghost'),
        row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
        showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')),
        primary)) },
      notesSection,
      optionsSection,
      errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停。', 'An update awaits a manual restart; idle auto-updates are paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (showUpdate || jobActiveThis) && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (showUpdate || jobActiveThis) && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      deferred && h(W.Status, null, t('已推迟 Suite 提醒和自动安装 24 小时，仍可手动更新。', 'Suite reminders and automatic installation are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      progress(),
      linksNav,
      windowsDialog, confirmDialog
    );
  }
  function InlineFooter({ name }) { return h(Panel, { name, inline: true }); }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name, inline: false }) : null;
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
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
  const client = { t, Footer: InlineFooter, NativeFooter, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (!footer) return false; footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); return true; }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
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
/**
 * DeepSeek Harness (>=0.2.2-rc.3) Unified Style Switcher, Layout & Motion Primitives v3
 * Shared across STARDUSTLC666 workbench plugins:
 *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,
 *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes
 *
 * Zero external runtime imports: accepts `React` and optional `require` so this
 * module can be bundled via esbuild IIFE or inlined into classic DSH client
 * scripts without requiring `react` in plugin `node_modules` or triggering
 * eager UI `require()` calls during `window.__ModuleLoader__.load`.
 */

const DSH_STYLE_STORAGE_KEY = 'dsh-stardust:ui-style';
const DSH_STYLE_EVENT = 'dsh-stardust-style';
const DSH_DEFAULT_STYLE = 'harness';

const DSH_FONT_STORAGE_KEY = 'dsh-stardust:ui-font';
const DSH_FONT_EVENT = 'dsh-stardust-font';
const DSH_DEFAULT_FONT = 'arcade';

const DSH_FONTS = Object.freeze([
  Object.freeze({
    id: 'arcade',
    zh: '幼圆等宽（默认）',
    zhShort: '幼圆',
    en: 'YouYuan Mono (Default)',
    enShort: 'YouYuan',
  }),
  Object.freeze({
    id: 'auto',
    zh: '跟随风格专属字',
    zhShort: '专属字',
    en: 'Match Style Font',
    enShort: 'Style Font',
  }),
  Object.freeze({
    id: 'songkai',
    zh: '中宋+楷书',
    zhShort: '中宋楷',
    en: 'Song + Kai',
    enShort: 'Song+Kai',
  }),
  Object.freeze({
    id: 'fangsong',
    zh: '工程仿宋',
    zhShort: '仿宋',
    en: 'Blueprint FangSong',
    enShort: 'FangSong',
  }),
  Object.freeze({
    id: 'poster',
    zh: '重磅画报黑',
    zhShort: '画报黑',
    en: 'Poster Sans',
    enShort: 'Poster',
  }),
  Object.freeze({
    id: 'retro98',
    zh: '千禧新宋',
    zhShort: '新宋98',
    en: 'Retro 98 SimSun',
    enShort: 'Retro 98',
  }),
  Object.freeze({
    id: 'serif',
    zh: '思源书宋',
    zhShort: '书宋',
    en: 'Book Serif',
    enShort: 'Serif',
  }),
  Object.freeze({
    id: 'modern',
    zh: '现代思源黑',
    zhShort: '思源黑',
    en: 'Modern Sans',
    enShort: 'Modern',
  }),
]);

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
    zh: '8-Bit 掌机',
    zhShort: '8-Bit',
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
  Object.freeze({
    id: 'glass',
    zh: '晴昼琉璃',
    zhShort: '琉璃',
    en: 'Daylight Glass',
    enShort: 'Glass',
    swatch: '#4f6df5',
    surface: '#f3f7ff',
  }),
  Object.freeze({
    id: 'eink',
    zh: '护眼墨水屏',
    zhShort: '墨水屏',
    en: 'E-Ink Paper',
    enShort: 'E-Ink',
    swatch: '#171716',
    surface: '#f2f1ec',
  }),
  Object.freeze({
    id: 'blueprint',
    zh: '工程晒图',
    zhShort: '晒图',
    en: 'Blueprint',
    enShort: 'Blueprint',
    swatch: '#0d3b66',
    surface: '#eaf3fb',
  }),
  Object.freeze({
    id: 'risograph',
    zh: '波普孔版',
    zhShort: '孔版',
    en: 'Riso Zine',
    enShort: 'Riso',
    swatch: '#ff3e7f',
    surface: '#faf6ee',
  }),
  Object.freeze({
    id: 'win98',
    zh: '千禧复古',
    zhShort: '复古98',
    en: 'Retro 98',
    enShort: 'Retro 98',
    swatch: '#1b4f9c',
    surface: '#dcdcdc',
  }),
  Object.freeze({
    id: 'songhui',
    zh: '宋韵朱砂',
    zhShort: '宋韵',
    en: 'Song Xuan',
    enShort: 'Song',
    swatch: '#b83b2a',
    surface: '#f7f3e8',
  }),
  Object.freeze({
    id: 'frutiger',
    zh: '晴空水晶',
    zhShort: '水晶',
    en: 'Aqua Gloss',
    enShort: 'Aqua',
    swatch: '#0ea5e9',
    surface: '#eaf7ff',
  }),
  Object.freeze({
    id: 'gazette',
    zh: '铅字晨报',
    zhShort: '晨报',
    en: 'Gazette',
    enShort: 'Gazette',
    swatch: '#9b1c1c',
    surface: '#f6f3ec',
  }),
]);

const VALID_STYLE_IDS = new Set(DSH_STYLES.map(preset => preset.id));
const VALID_FONT_IDS = new Set(DSH_FONTS.map(preset => preset.id));

function resolveWindow(win) {
  if (win && typeof win === 'object') return win;
  return typeof window !== 'undefined' ? window : null;
}

function resolveReact(explicitReact) {
  if (explicitReact && typeof explicitReact.createElement === 'function') return explicitReact;
  if (typeof globalThis !== 'undefined' && globalThis.React && typeof globalThis.React.createElement === 'function') {
    return globalThis.React;
  }
  return null;
}

function clampNumber(value, min, max) {
  const lo = Number.isFinite(min) ? min : 0;
  const hi = Number.isFinite(max) ? Math.max(lo, max) : lo;
  const num = Number(value);
  if (!Number.isFinite(num)) return lo;
  return Math.min(hi, Math.max(lo, num));
}

function normalizeDshStyle(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return VALID_STYLE_IDS.has(key) ? key : DSH_DEFAULT_STYLE;
}

function getDshStylePreset(value) {
  const id = normalizeDshStyle(value);
  return DSH_STYLES.find(preset => preset.id === id) || DSH_STYLES[0];
}

function readDshStyle(win) {
  const target = resolveWindow(win);
  if (!target) return DSH_DEFAULT_STYLE;
  try {
    const raw = target.localStorage?.getItem(DSH_STYLE_STORAGE_KEY);
    return normalizeDshStyle(raw);
  } catch {
    return DSH_DEFAULT_STYLE;
  }
}

function normalizeDshFont(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return VALID_FONT_IDS.has(key) ? key : DSH_DEFAULT_FONT;
}

function getDshFontPreset(value) {
  const id = normalizeDshFont(value);
  return DSH_FONTS.find(preset => preset.id === id) || DSH_FONTS[0];
}

function readDshFont(win) {
  const target = resolveWindow(win);
  if (!target) return DSH_DEFAULT_FONT;
  try {
    const raw = target.localStorage?.getItem(DSH_FONT_STORAGE_KEY);
    return normalizeDshFont(raw);
  } catch {
    return DSH_DEFAULT_FONT;
  }
}

/**
 * Stamps `[data-dsh-style]`, `[data-dsh-font]`, and `[data-window-drag-exclude]` onto
 * any currently open portaled `[role="dialog"]` / `[role="menu"]` surfaces in
 * `document.body` that were synced via `createOverlaySyncRef` or carry
 * `[data-dsh-portal-synced]`, plus `[data-dsh-font]` onto `document.documentElement`.
 */
function syncPortaledOverlays(style, doc, font) {
  const normalized = normalizeDshStyle(style);
  const normalizedFont = normalizeDshFont(font ?? readDshFont());
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) return;
  if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
    targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
  }
  if (typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced]')) {
    el.setAttribute('data-dsh-style', normalized);
    el.setAttribute('data-dsh-font', normalizedFont);
    if (!el.hasAttribute('data-window-drag-exclude')) {
      el.setAttribute('data-window-drag-exclude', '');
    }
  }
}

function syncPortaledFont(font, doc) {
  const normalizedFont = normalizeDshFont(font);
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) return;
  if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
    targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
  }
  if (typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced], [data-dsh-style]')) {
    el.setAttribute('data-dsh-font', normalizedFont);
  }
}

function writeDshStyle(nextStyle, win) {
  const normalized = normalizeDshStyle(nextStyle);
  const target = resolveWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_STYLE_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledOverlays(normalized, target.document, readDshFont(target));
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
  return normalized;
}

function writeDshFont(nextFont, win) {
  const normalized = normalizeDshFont(nextFont);
  const target = resolveWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_FONT_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledFont(normalized, target.document);
    if (typeof target.dispatchEvent === 'function') {
      try {
        const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEventCtor(DSH_FONT_EVENT, { detail: { font: normalized } }));
        } else if (typeof Event === 'function') {
          const ev = new Event(DSH_FONT_EVENT);
          ev.detail = { font: normalized };
          target.dispatchEvent(ev);
        }
      } catch {
        // Ignore synthetic event errors in minimal VM environments.
      }
    }
  }
  return normalized;
}

function subscribeDshStyle(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshStyle(event?.detail?.style ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document, readDshFont(target));
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_STYLE_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshStyle(event?.newValue ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document, readDshFont(target));
    onChange(next);
  };
  target.addEventListener(DSH_STYLE_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_STYLE_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

function subscribeDshFont(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshFont(event?.detail?.font ?? readDshFont(target));
    syncPortaledFont(next, target.document);
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_FONT_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshFont(event?.newValue ?? readDshFont(target));
    syncPortaledFont(next, target.document);
    onChange(next);
  };
  target.addEventListener(DSH_FONT_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_FONT_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

/**
 * React hook returning `[style, setStyle]`, synced across plugins, tabs, and
 * portaled dialogs via `localStorage['dsh-stardust:ui-style']` + `dsh-stardust-style`.
 * Safe in minimal VM registration tests where `React.useState` may be absent.
 */
function useDshStyle(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshStyle(win), next => writeDshStyle(next, win)];
  }
  const [style, setStyleState] = React.useState(() => readDshStyle(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshStyle(win);
      setStyleState(prev => (prev === current ? prev : current));
      syncPortaledOverlays(current, resolveWindow(win)?.document, readDshFont(win));
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

/**
 * React hook returning `[font, setFont]`, synced via `localStorage['dsh-stardust:ui-font']`
 * + `dsh-stardust-font` and applied via `[data-dsh-font]`.
 */
function useDshFont(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshFont(win), next => writeDshFont(next, win)];
  }
  const [font, setFontState] = React.useState(() => readDshFont(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshFont(win);
      setFontState(prev => (prev === current ? prev : current));
      syncPortaledFont(current, resolveWindow(win)?.document);
      return subscribeDshFont(next => {
        setFontState(prev => (prev === next ? prev : next));
      }, win);
    }, [win]);
  }
  const setFont = next => {
    const resolved = typeof next === 'function' ? next(font) : next;
    const applied = writeDshFont(resolved, win);
    setFontState(applied);
    return applied;
  };
  return [font, setFont];
}

/**
 * Callback ref for elements rendered inside host `@deepseek-ai/dsh-client-ui-primitives`
 * `Modal` or `Menu` portals (`createPortal(..., document.body)`).
 * Host `Modal` and `Menu` do not spread arbitrary `data-*` props onto their outer
 * `<div role="dialog">` / `<div role="menu">` wrapper, so attaching this ref to an
 * inner header/body wrapper promotes `data-dsh-style`, `data-dsh-font`, and
 * `data-window-drag-exclude` onto the portaled overlay frame itself.
 */
function createOverlaySyncRef(style, font) {
  const normalized = normalizeDshStyle(style);
  const normalizedFont = normalizeDshFont(font ?? readDshFont());
  return node => {
    if (!node || typeof node.setAttribute !== 'function') return;
    node.setAttribute('data-dsh-style', normalized);
    node.setAttribute('data-dsh-font', normalizedFont);
    node.setAttribute('data-window-drag-exclude', '');
    node.setAttribute('data-dsh-portal-synced', 'true');
    if (typeof node.closest === 'function') {
      const overlay = node.closest('[role="dialog"], [role="alertdialog"], [role="menu"], dialog');
      if (overlay) {
        overlay.setAttribute('data-dsh-style', normalized);
        overlay.setAttribute('data-dsh-font', normalizedFont);
        overlay.setAttribute('data-window-drag-exclude', '');
        overlay.setAttribute('data-dsh-portal-synced', 'true');
      }
    }
  };
}

/**
 * Shared crisp 24x24 stroke icons for workbench headers, buttons, and micro-animations.
 */
const DSH_ICON_PATHS = Object.freeze({
  mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
  inbox: ['M4 13 6 5h12l2 8v6H4z', 'M4 13h5l1 3h4l1-3h5'],
  send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
  search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
  plus: ['M12 5v14M5 12h14'],
  refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
  close: ['m6 6 12 12M18 6 6 18'],
  left: ['m14 5-7 7 7 7'],
  right: ['m10 5 7 7-7 7'],
  down: ['m5 9 7 7 7-7'],
  download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
  file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
  folder: ['M3 5h7l2 3h9v12H3z'],
  edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
  trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
  check: ['m5 12 4 4L19 6'],
  star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
  reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
  lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3M12 14v3'],
  clip: ['m8 13 6-6a2.5 2.5 0 0 1 3.5 3.5l-7 7a4 4 0 0 1-5.7-5.7l8-8a5 5 0 0 1 7.1 7.1l-8 8'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  image: ['M3 4h18v16H3z', 'm3 17 6-6 5 5 2-2 5 5M16 8h.01'],
  copy: ['M9 9h10v11H9z', 'M5 15H4V4h10v1'],
  external: ['M14 4h6v6', 'M10 14 20 4', 'M18 13v6H5V6h6'],
  link: ['M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11 4.9', 'M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L13 19.1'],
  play: ['m7 5 12 7-12 7Z'],
  palette: ['M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-2.2-4-4-9-4Z', 'M7.5 10.5h.01M10.5 7.5h.01M14.5 7.5h.01'],
  sparkles: ['m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z', 'M19 15v4M17 17h4'],
  calendar: ['M4 6h16v14H4z', 'M8 3v4M16 3v4M4 10h16'],
  shield: ['M12 3 5 6v6c0 5 3.4 8.3 7 9 3.6-.7 7-4 7-9V6Z'],
  rss: ['M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M4 11a9 9 0 0 1 9 9', 'M4 5a15 15 0 0 1 15 15'],
  grip: ['M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01'],
});

function renderDshIcon(React, { name = 'file', size = 16, paths = DSH_ICON_PATHS, ...props } = {}) {
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
      ...props,
    },
    segments.map((d, index) => h('path', { key: index, d })),
  );
}

/**
 * Measures the active `[role="tab"][aria-selected="true"]` inside a `[role="tablist"]`
 * and drives CSS variables `--dsh-tab-x` / `--dsh-tab-w` for `.dsh-tab-indicator`.
 * Falls back cleanly to static `::after` border underline when layout is unavailable (jsdom)
 * or under `@media (forced-colors: active)`.
 */
function useSlidingTabIndicator(React, activeValue, options = {}) {
  const tablistRef = typeof React?.useRef === 'function' ? React.useRef(null) : { current: null };
  const [metrics, setMetrics] = typeof React?.useState === 'function'
    ? React.useState({ x: 0, width: 0, ready: false })
    : [{ x: 0, width: 0, ready: false }, () => {}];

  const syncIndicator = () => {
    const list = tablistRef.current;
    if (!list || typeof list.querySelector !== 'function') return;
    const activeTab = list.querySelector('[role="tab"][aria-selected="true"]');
    if (!activeTab) {
      list.setAttribute?.('data-indicator-ready', 'false');
      setMetrics(prev => (prev.ready ? { x: 0, width: 0, ready: false } : prev));
      return;
    }
    let x = typeof activeTab.offsetLeft === 'number' ? activeTab.offsetLeft : 0;
    let width = typeof activeTab.offsetWidth === 'number' ? activeTab.offsetWidth : 0;
    if (!width && typeof activeTab.getBoundingClientRect === 'function' && typeof list.getBoundingClientRect === 'function') {
      const tabRect = activeTab.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      if (tabRect && listRect && tabRect.width > 0) {
        width = tabRect.width;
        x = tabRect.left - listRect.left + (list.scrollLeft || 0);
      }
    }
    const ready = width > 0;
    if (list.style && typeof list.style.setProperty === 'function') {
      list.style.setProperty('--dsh-tab-x', `${Math.round(x)}px`);
      list.style.setProperty('--dsh-tab-w', `${Math.round(width)}px`);
    }
    list.setAttribute?.('data-indicator-ready', ready ? 'true' : 'false');
    setMetrics(prev => (
      prev.x === Math.round(x) && prev.width === Math.round(width) && prev.ready === ready
        ? prev
        : { x: Math.round(x), width: Math.round(width), ready }
    ));
  };

  const effectHook = typeof React?.useLayoutEffect === 'function'
    ? React.useLayoutEffect
    : (typeof React?.useEffect === 'function' ? React.useEffect : null);

  if (effectHook) {
    const deps = Array.isArray(options?.deps) ? [activeValue, ...options.deps] : [activeValue];
    effectHook(() => {
      syncIndicator();
      const list = tablistRef.current;
      const win = resolveWindow(options?.win);
      let ro = null;
      if (list && typeof win?.ResizeObserver === 'function') {
        try {
          ro = new win.ResizeObserver(() => syncIndicator());
          ro.observe(list);
        } catch {
          ro = null;
        }
      }
      if (win && typeof win.addEventListener === 'function') {
        win.addEventListener('resize', syncIndicator);
      }
      return () => {
        ro?.disconnect?.();
        if (win && typeof win.removeEventListener === 'function') {
          win.removeEventListener('resize', syncIndicator);
        }
      };
    }, deps);
  }

  const indicatorStyle = {
    '--dsh-tab-x': `${metrics.x}px`,
    '--dsh-tab-w': `${metrics.width}px`,
  };

  return {
    tablistRef,
    ready: metrics.ready,
    indicatorStyle,
    tablistProps: {
      ref: tablistRef,
      'data-dsh-tablist': '',
      'data-indicator-ready': metrics.ready ? 'true' : 'false',
    },
    indicatorProps: {
      className: 'dsh-tab-indicator',
      'aria-hidden': 'true',
      style: indicatorStyle,
    },
    syncIndicator,
  };
}

/**
 * Resizable split-pane hook with `localStorage` persistence, clamping, reset,
 * and ready-to-spread `resizerProps` for `DshSplitResizer`.
 */
function useResizableSplit(
  React,
  { key, initial = 320, min = 220, max = 560, orientation = 'vertical', reverse = false, win } = {},
) {
  const clampedInitial = clampNumber(initial, min, max);
  const readStored = () => {
    const target = resolveWindow(win);
    if (!key || !target) return clampedInitial;
    try {
      const raw = target.localStorage?.getItem(key);
      if (raw == null || raw === '') return clampedInitial;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? clampNumber(parsed, min, max) : clampedInitial;
    } catch {
      return clampedInitial;
    }
  };

  const writeStored = nextSize => {
    const clamped = Math.round(clampNumber(nextSize, min, max));
    const target = resolveWindow(win);
    if (key && target) {
      try {
        target.localStorage?.setItem(key, String(clamped));
      } catch {
        // Ignore restricted storage errors.
      }
    }
    return clamped;
  };

  const hasHooks = Boolean(React && typeof React.useState === 'function');
  const [size, setSizeState] = hasHooks ? React.useState(() => readStored()) : [readStored(), () => {}];
  const [isDragging, setIsDragging] = hasHooks ? React.useState(false) : [false, () => {}];

  const setSize = next => {
    const resolved = typeof next === 'function' ? next(size) : next;
    const applied = writeStored(resolved);
    setSizeState(applied);
    return applied;
  };

  const reset = () => {
    const applied = writeStored(clampedInitial);
    setSizeState(applied);
    return applied;
  };

  return {
    size,
    width: size,
    setSize,
    reset,
    isDragging,
    setIsDragging,
    paneStyle: { '--dsh-split-size': `${size}px` },
    resizerProps: {
      value: size,
      initial: clampedInitial,
      min,
      max,
      orientation,
      reverse,
      onChange: setSize,
      onReset: reset,
      onDraggingChange: setIsDragging,
    },
  };
}

function renderDshSplitResizer(
  React,
  {
    value = 320,
    initial,
    min = 220,
    max = 560,
    orientation = 'vertical',
    reverse = false,
    step = 16,
    label = 'Resize pane',
    onChange,
    onReset,
    onDraggingChange,
    className,
    style,
    ...rest
  } = {},
) {
  const R = resolveReact(React);
  if (!R) return null;
  const h = R.createElement;
  const dragRef = typeof R.useRef === 'function' ? R.useRef(null) : { current: null };
  const [dragging, setDragging] = typeof R.useState === 'function' ? R.useState(false) : [false, () => {}];

  const isHorizontal = orientation === 'horizontal';
  const clampedValue = Math.round(clampNumber(value, min, max));

  const setDragActive = active => {
    setDragging(active);
    onDraggingChange?.(active);
  };

  const cleanupWindowListeners = () => {
    const drag = dragRef.current;
    if (drag?.cleanup) {
      drag.cleanup();
    }
    dragRef.current = null;
  };

  if (typeof R.useEffect === 'function') {
    R.useEffect(() => cleanupWindowListeners, []);
  }

  const updateFromClientPos = (clientX, clientY) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rawDelta = isHorizontal ? (clientY - drag.startY) : (clientX - drag.startX);
    const delta = reverse ? -rawDelta : rawDelta;
    const next = Math.round(clampNumber(drag.startValue + delta, min, max));
    onChange?.(next);
  };

  const handlePointerDown = event => {
    if (event?.button !== undefined && event.button !== 0) return;
    event?.preventDefault?.();
    const targetEl = event?.currentTarget;
    const pointerId = event?.pointerId;
    const startX = Number(event?.clientX ?? 0);
    const startY = Number(event?.clientY ?? 0);

    cleanupWindowListeners();

    let captured = false;
    if (targetEl && typeof targetEl.setPointerCapture === 'function' && pointerId !== undefined) {
      try {
        targetEl.setPointerCapture(pointerId);
        captured = true;
      } catch {
        captured = false;
      }
    }

    const win = resolveWindow();
    let cleanup = null;
    if (!captured && win && typeof win.addEventListener === 'function') {
      const onWinMove = moveEvent => updateFromClientPos(Number(moveEvent.clientX ?? 0), Number(moveEvent.clientY ?? 0));
      const onWinUp = () => {
        cleanupWindowListeners();
        setDragActive(false);
      };
      win.addEventListener('pointermove', onWinMove);
      win.addEventListener('mousemove', onWinMove);
      win.addEventListener('pointerup', onWinUp);
      win.addEventListener('mouseup', onWinUp);
      win.addEventListener('pointercancel', onWinUp);
      cleanup = () => {
        win.removeEventListener('pointermove', onWinMove);
        win.removeEventListener('mousemove', onWinMove);
        win.removeEventListener('pointerup', onWinUp);
        win.removeEventListener('mouseup', onWinUp);
        win.removeEventListener('pointercancel', onWinUp);
      };
    }

    dragRef.current = { startX, startY, startValue: clampedValue, pointerId, captured, cleanup };
    setDragActive(true);
  };

  const handlePointerMove = event => {
    if (!dragRef.current) return;
    updateFromClientPos(Number(event?.clientX ?? 0), Number(event?.clientY ?? 0));
  };

  const handlePointerEnd = event => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.captured && event?.currentTarget && typeof event.currentTarget.releasePointerCapture === 'function' && drag.pointerId !== undefined) {
      try {
        event.currentTarget.releasePointerCapture(drag.pointerId);
      } catch {
        // Ignore release errors when pointer already detached.
      }
    }
    cleanupWindowListeners();
    setDragActive(false);
  };

  const handleKeyDown = event => {
    const key = event?.key;
    const deltaStep = event?.shiftKey ? step * 2 : step;
    const dir = reverse ? -1 : 1;
    let next = null;
    if ((!isHorizontal && key === 'ArrowLeft') || (isHorizontal && key === 'ArrowUp')) {
      next = clampNumber(clampedValue - deltaStep * dir, min, max);
    } else if ((!isHorizontal && key === 'ArrowRight') || (isHorizontal && key === 'ArrowDown')) {
      next = clampNumber(clampedValue + deltaStep * dir, min, max);
    } else if (key === 'Home') {
      next = min;
    } else if (key === 'End') {
      next = max;
    }
    if (next !== null) {
      event?.preventDefault?.();
      onChange?.(Math.round(next));
    }
  };

  const handleDoubleClick = () => {
    if (typeof onReset === 'function') {
      onReset();
    } else if (initial !== undefined) {
      onChange?.(Math.round(clampNumber(initial, min, max)));
    }
  };

  return h('div', {
    ...rest,
    role: 'separator',
    tabIndex: 0,
    'aria-orientation': orientation,
    'aria-label': label,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': clampedValue,
    'data-dsh-resizer': '',
    'data-dragging': dragging ? 'true' : 'false',
    'data-window-drag-exclude': '',
    className: ['dsh-split-resizer', className].filter(Boolean).join(' '),
    style,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
    onLostPointerCapture: handlePointerEnd,
    onKeyDown: handleKeyDown,
    onDoubleClick: handleDoubleClick,
  });
}

function createSplitResizerComponent(React) {
  return function DshSplitResizerWithReact(props) {
    return renderDshSplitResizer(React, props);
  };
}

function DshSplitResizer(props = {}) {
  const { React: explicitReact, ...rest } = props;
  return renderDshSplitResizer(resolveReact(explicitReact), rest);
}

/**
 * Theme-tinted shimmer skeleton helper (`DshSkeleton` / `createSkeletonComponent` / `renderDshSkeleton`).
 * Honors `prefers-reduced-motion: reduce` and `eink` zero-distraction mode automatically via CSS.
 */
function renderDshSkeleton(
  React,
  {
    variant = 'text',
    lines = 3,
    width,
    height,
    radius,
    animated = true,
    label,
    className,
    style,
    ...rest
  } = {},
) {
  const R = resolveReact(React);
  if (!R) return null;
  const h = R.createElement;
  const a11yProps = label
    ? { role: 'status', 'aria-busy': 'true', 'aria-label': label }
    : { 'aria-hidden': 'true' };

  const baseBar = (barWidth, barHeight, key) =>
    h('span', {
      key,
      className: 'dsh-skeleton',
      'data-dsh-skeleton': variant,
      'data-animated': animated ? 'true' : 'false',
      style: {
        width: barWidth ?? width,
        height: barHeight ?? height,
        borderRadius: radius,
      },
    });

  if (variant === 'circle') {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', 'dsh-skeleton-circle', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'circle',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height, ...style },
    });
  }

  if (variant === 'rect') {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'rect',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height: height ?? '80px', borderRadius: radius, ...style },
    });
  }

  if (variant === 'row') {
    return h(
      'div',
      {
        ...a11yProps,
        ...rest,
        className: ['dsh-skeleton-row', className].filter(Boolean).join(' '),
        style,
      },
      h('span', {
        className: 'dsh-skeleton dsh-skeleton-circle',
        'data-dsh-skeleton': 'circle',
        'data-animated': animated ? 'true' : 'false',
      }),
      h(
        'div',
        { className: 'dsh-skeleton-group' },
        baseBar('58%', '12px', 'r1'),
        baseBar('84%', '10px', 'r2'),
      ),
    );
  }

  if (variant === 'card') {
    return h(
      'div',
      {
        ...a11yProps,
        ...rest,
        className: ['dsh-skeleton-card', className].filter(Boolean).join(' '),
        style,
      },
      baseBar('46%', '14px', 'c1'),
      baseBar('100%', '11px', 'c2'),
      baseBar('74%', '11px', 'c3'),
    );
  }

  const count = Math.max(1, Math.round(Number(lines) || 1));
  if (count === 1) {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'text',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height, borderRadius: radius, ...style },
    });
  }

  const bars = [];
  for (let i = 0; i < count; i += 1) {
    const isLast = i === count - 1;
    bars.push(baseBar(isLast ? '68%' : '100%', height, `l-${i}`));
  }
  return h(
    'div',
    {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton-group', className].filter(Boolean).join(' '),
      style,
    },
    bars,
  );
}

function createSkeletonComponent(React) {
  return function DshSkeletonWithReact(props) {
    return renderDshSkeleton(React, props);
  };
}

function DshSkeleton(props = {}) {
  const { React: explicitReact, ...rest } = props;
  return renderDshSkeleton(resolveReact(explicitReact), rest);
}

/**
 * Lazily resolves `@deepseek-ai/dsh-client-ui-primitives` on render and supplies
 * semantic, accessible HTML fallbacks when running in standalone `jsdom` or `node:vm`
 * tests where host UI primitives are not mounted.
 *
 * IMPORTANT: Call ONLY inside component render paths — never eagerly inside
 * `window.__ModuleLoader__.load({ factory })` or `apply(ctx)`.
 */
const DSH_PRIMITIVES_CACHE = new WeakMap();
let fallbackControlSeq = 0;

function resolveHostPrimitives(React, requireFn) {
  const h = React.createElement;
  let host = null;
  if (typeof requireFn === 'function') {
    try {
      host = requireFn('@deepseek-ai/dsh-client-ui-primitives') || null;
    } catch {
      host = null;
    }
  }

  // Keep component types stable while still discovering host changes on render.
  let primitivesByHost = DSH_PRIMITIVES_CACHE.get(React);
  if (!primitivesByHost) {
    primitivesByHost = new Map();
    DSH_PRIMITIVES_CACHE.set(React, primitivesByHost);
  }
  const cached = primitivesByHost.get(host);
  if (cached) return cached;

  function FallbackButton({ variant = 'ghost', size = 'md', icon, className, children, type = 'button', ...rest }) {
    const cls = ['dsh-btn', `dsh-btn-${variant}`, `dsh-btn-${size}`, className].filter(Boolean).join(' ');
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

  function FallbackCheckbox({ id, checked = false, onChange, label, disabled = false, title, className, ...rest }) {
    const inputId = id || (typeof React.useId === 'function' ? React.useId() : 'dsh-chk-' + (++fallbackControlSeq));
    return h(
      'label',
      { htmlFor: inputId, className: ['dsh-checkbox-label', className].filter(Boolean).join(' '), title },
      h('input', {
        id: inputId,
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
            id: id ? `${id}-${opt.value}` : undefined,
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

  function renderPortalSyncNode(styleValue, fontValue) {
    const syncStyle = normalizeDshStyle(styleValue ?? readDshStyle());
    const syncFont = normalizeDshFont(fontValue ?? readDshFont());
    return h('span', {
      key: '__dsh_portal_sync__',
      ref: createOverlaySyncRef(syncStyle, syncFont),
      hidden: true,
      'aria-hidden': 'true',
      'data-dsh-style': syncStyle,
      'data-dsh-font': syncFont,
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
    dshFont,
  }) {
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    const font = normalizeDshFont(dshFont ?? readDshFont());
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
              'data-dsh-font': font,
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
            items.map(item => {
              const stylePreset = VALID_STYLE_IDS.has(item.id) ? getDshStylePreset(item.id) : null;
              return h(
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
                h(
                  'span',
                  { className: 'dsh-style-fallback-item-leading' },
                  stylePreset
                    ? h('span', {
                        className: 'dsh-style-swatch',
                        'aria-hidden': 'true',
                        style: { '--dsh-swatch-color': stylePreset.swatch },
                      })
                    : null,
                  h('span', null, item.label),
                ),
                item.id === selectedId ? h('span', { 'aria-hidden': 'true' }, '✓') : null,
              );
            }),
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
    dshFont,
  }) {
    if (!open) return null;
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    const font = normalizeDshFont(dshFont ?? readDshFont());
    return h(
      'div',
      {
        className: 'dsh-fallback-modal-root',
        role: 'presentation',
        'data-dsh-style': style,
        'data-dsh-font': font,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        onKeyDownCapture,
        // Let nested menus/editors consume Escape before the enclosing dialog.
        onKeyDown: event => {
          if (!event?.defaultPrevented && event?.key === 'Escape') {
            event.stopPropagation?.();
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
          'data-dsh-font': font,
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
    ? function HostMenuWithStyle({ dshStyle, dshFont, children, ...menuProps }) {
        if (!menuProps.open) {
          return children !== undefined ? h(host.Menu, menuProps, children) : h(host.Menu, menuProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle, dshFont);
        return children !== undefined && children !== null
          ? h(host.Menu, menuProps, children, syncNode)
          : h(host.Menu, menuProps, syncNode);
      }
    : FallbackMenu;

  const WrappedModal = host?.Modal
    ? function HostModalWithStyle({ dshStyle, dshFont, children, ...modalProps }) {
        if (!modalProps.open) {
          return children !== undefined ? h(host.Modal, modalProps, children) : h(host.Modal, modalProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle, dshFont);
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
  primitivesByHost.set(host, resolved);
  return resolved;
}

/**
 * Compact standalone Font Pairing Switcher (`FontSwitcher`), synced via
 * `localStorage['dsh-stardust:ui-font']` + `dsh-stardust-font` and `[data-dsh-font]`.
 */
function createFontSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  return function FontSwitcher({
    font: controlledFont,
    style: controlledStyle,
    onChange,
    lang = 'zh',
    id = 'dsh-font-switcher',
    compact = true,
    disabled = false,
    align = 'end',
    className,
    open: controlledOpen,
    onOpenChange,
  } = {}) {
    const [syncedFont, setSyncedFont] = useDshFont(React);
    const [syncedStyle] = useDshStyle(React);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const [internalOpen, setInternalOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const open = controlledOpen !== undefined ? Boolean(controlledOpen) : internalOpen;
    const setOpen = next => {
      const resolved = typeof next === 'function' ? next(open) : Boolean(next);
      if (controlledOpen === undefined) setInternalOpen(resolved);
      onOpenChange?.(resolved);
    };
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshFontPreset(activeFont);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = isZh ? `字体搭配：${preset.zh}` : `Font pairing: ${preset.en}`;
    const visibleText = compact
      ? (isZh ? preset.zhShort : preset.enShort)
      : (isZh ? preset.zh : preset.en);
    const items = DSH_FONTS.map(option => ({
      id: option.id,
      label: isZh ? `${option.zh} (${option.enShort})` : `${option.en}`,
    }));
    const selectFont = nextId => {
      const applied = writeDshFont(nextId);
      setSyncedFont(applied);
      onChange?.(applied);
      setOpen(false);
    };

    return h(P.Menu, {
      open: open && !disabled,
      selectedId: activeFont,
      dshStyle: activeStyle,
      dshFont: activeFont,
      items,
      align,
      portal: !P.isFallback,
      autoFocus: true,
      minWidthFromAnchor: true,
      className,
      onClose: () => setOpen(false),
      onSelect: selectFont,
      anchor: h(
        P.Button,
        {
          id,
          variant: 'outline',
          size: 'sm',
          disabled,
          className: 'dsh-font-trigger',
          'aria-label': triggerLabel,
          'aria-haspopup': 'menu',
          'aria-expanded': Boolean(open && !disabled),
          title: triggerLabel,
          onClick: () => setOpen(prev => !prev),
          onKeyDown: event => {
            if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
              event.preventDefault?.();
              setOpen(true);
            }
          },
        },
        h('span', { className: 'dsh-font-glyph', 'aria-hidden': 'true' }, isZh ? '字' : 'Aa'),
        h('span', { className: 'dsh-font-label' }, visibleText),
        renderDshIcon(React, { name: 'down', size: 13 }),
      ),
    });
  };
}

/**
 * Ready-made 13-preset Style Switcher + compact Font Pairing Switcher (`StyleSwitcher`).
 * Renders the style menu trigger with a live color swatch alongside the compact
 * font-pairing trigger (`showFontSwitcher = true` by default), syncing via
 * `localStorage['dsh-stardust:ui-style']` / `['dsh-stardust:ui-font']` and custom events.
 */
function createStyleSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  const FontSwitcher = createFontSwitcherComponent(React, requireFn);
  return function StyleSwitcher({
    style: controlledStyle,
    font: controlledFont,
    onChange,
    onFontChange,
    showFontSwitcher = true,
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
    const [syncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const [open, setOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const [fontOpen, setFontOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshStylePreset(activeStyle);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = typeof formatAriaLabel === 'function'
      ? formatAriaLabel(preset, isZh)
      : (isZh ? `界面风格：${preset.zh}` : `UI style: ${preset.en}`);
    const visibleText = typeof formatTriggerLabel === 'function'
      ? formatTriggerLabel(preset, compact, isZh)
      : (compact ? (isZh ? preset.zhShort : preset.enShort) : (isZh ? preset.zh : preset.en));
    const items = DSH_STYLES.map(option => ({
      id: option.id,
      label: typeof formatOptionLabel === 'function'
        ? formatOptionLabel(option, isZh)
        : (isZh ? `${option.zh} (${option.enShort})` : `${option.en}`),
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
        dshFont: activeFont,
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
            onClick: () => {
              setFontOpen(false);
              setOpen(prev => !prev);
            },
            onKeyDown: event => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault?.();
                setFontOpen(false);
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
      showFontSwitcher
        ? h(FontSwitcher, {
            id: `${id}-font`,
            font: controlledFont,
            style: activeStyle,
            onChange: onFontChange,
            lang,
            compact: true,
            disabled,
            align,
            open: fontOpen && !disabled,
            onOpenChange: next => {
              if (next) setOpen(false);
              setFontOpen(next);
            },
          })
        : null,
    );
  };
}

/* DSH workbench UI v2 (>=0.2.2-rc.3). MIT.
 * Vendored into each plugin: lazy @deepseek-ai/dsh-client-ui-primitives resolution
 * with semantic HTML fallbacks for standalone jsdom/node:vm tests.
 */
function createWorkbenchUI(React, requireFn) {
  const h = React.createElement;
  const { useEffect, useId, useRef, useState } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');

  const tourSessionDone = new Set();
  function readTourDone(storageKey) {
    if (tourSessionDone.has(storageKey)) return true;
    try {
      return typeof window !== 'undefined' && window.localStorage?.getItem(storageKey) === 'done';
    } catch {
      return false;
    }
  }
  function writeTourDone(storageKey) {
    tourSessionDone.add(storageKey);
    try {
      if (typeof window !== 'undefined') window.localStorage?.setItem(storageKey, 'done');
    } catch { /* ignore */ }
  }
  function computeTourLayout(target, preferredSide, cardEl) {
    const vw = (typeof window !== 'undefined' && window.innerWidth) || 1280;
    const vh = (typeof window !== 'undefined' && window.innerHeight) || 800;
    const cw = cardEl?.offsetWidth || 320;
    const ch = cardEl?.offsetHeight || 196;
    const pad = 5;
    const gap = 12;
    const raw = target?.getBoundingClientRect?.();
    if (!target) {
      return {
        spotlight: null,
        side: 'center',
        left: Math.max(12, Math.round((vw - cw) / 2)),
        top: Math.max(12, Math.round((vh - ch) / 2)),
        arrowX: 28,
        arrowY: 24,
      };
    }
    const hasBox = Boolean(raw && (raw.width > 0 || raw.height > 0));
    const rect = hasBox ? raw : { left: 120, top: 72, width: 140, height: 32 };
    const spotlight = {
      left: Math.round(rect.left - pad),
      top: Math.round(rect.top - pad),
      width: Math.round(rect.width + pad * 2),
      height: Math.round(rect.height + pad * 2),
    };
    const spaceBottom = vh - spotlight.top - spotlight.height;
    const spaceTop = spotlight.top;
    const spaceRight = vw - spotlight.left - spotlight.width;
    const spaceLeft = spotlight.left;
    let side = preferredSide || 'bottom';
    if (side === 'right' && spaceRight < cw + gap + 12) {
      side = spaceBottom >= ch + gap + 12 ? 'bottom' : spaceLeft >= cw + gap + 12 ? 'left' : 'top';
    } else if (side === 'left' && spaceLeft < cw + gap + 12) {
      side = spaceRight >= cw + gap + 12 ? 'right' : 'bottom';
    } else if (side === 'bottom' && spaceBottom < ch + gap + 12 && spaceTop > spaceBottom) {
      side = 'top';
    } else if (side === 'top' && spaceTop < ch + gap + 12 && spaceBottom > spaceTop) {
      side = 'bottom';
    }
    let left = spotlight.left;
    let top = spotlight.top + spotlight.height + gap;
    if (side === 'top') top = spotlight.top - ch - gap;
    else if (side === 'right') { left = spotlight.left + spotlight.width + gap; top = spotlight.top; }
    else if (side === 'left') { left = spotlight.left - cw - gap; top = spotlight.top; }
    left = Math.round(Math.max(12, Math.min(vw - cw - 12, left)));
    top = Math.round(Math.max(12, Math.min(vh - ch - 12, top)));
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return {
      spotlight,
      side,
      left,
      top,
      arrowX: Math.round(Math.max(18, Math.min(cw - 18, centerX - left))),
      arrowY: Math.round(Math.max(18, Math.min(ch - 18, centerY - top))),
    };
  }

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

  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, style: styleProp, font: fontProp, ...props }) {
    const [syncedStyle] = useDshStyle(React);
    const [syncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(styleProp ?? syncedStyle);
    const activeFont = normalizeDshFont(fontProp ?? syncedFont);
    return h(
      'section',
      {
        ...props,
        ref: rootRef,
        className: cx('dshw', 'w-page', className),
        'data-main': workbench ? 'true' : 'false',
        'data-dsh-style': activeStyle,
        'data-dsh-font': activeFont,
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
    const tabsIndicator = useSlidingTabIndicator(React, active, { deps: [items.length] });
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
        { className: 'w-tabs dsh-tablist dsh-tablist-pill', role: 'tablist', 'aria-label': label, ...tabsIndicator.tablistProps },
        items.map((item, index) =>
          h(
            'button',
            {
              type: 'button',
              role: 'tab',
              key: item.id,
              id: id + '-' + item.id,
              'data-tab-id': item.id,
              'aria-selected': active === item.id,
              tabIndex: active === item.id ? 0 : -1,
              onClick: () => onChange(item.id),
              onKeyDown: event => keys(event, index),
            },
            item.label,
            item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null,
          ),
        ),
        h('span', tabsIndicator.indicatorProps),
      ),
      h('div', {
        key: active,
        className: 'w-tab-panel dsh-tab-panel',
        'data-dsh-tab-panel': '',
        id: id + '-panel',
        role: 'tabpanel',
        'aria-labelledby': id + '-' + active,
      }, children),
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

  function Dialog({ title, children, onClose, closeLabel = 'Close', className, busy = false, footer, style: styleProp, font: fontProp }) {
    const [syncedStyle] = useDshStyle(React);
    const [syncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(styleProp ?? syncedStyle);
    const activeFont = normalizeDshFont(fontProp ?? syncedFont);
    const titleId = typeof useId === 'function' ? useId() : 'w-dialog-title';
    const P = resolveHostPrimitives(React, requireFn);
    const close = () => { if (!busy) onClose?.(); };
    return h(
      P.Modal,
      {
        open: true,
        dshStyle: activeStyle,
        dshFont: activeFont,
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
          ref: createOverlaySyncRef(activeStyle, activeFont),
          className: cx('dshw', 'w-dialog', className),
          'data-dsh-style': activeStyle,
          'data-dsh-font': activeFont,
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

  function CoachmarkTour({ rootRef, steps = [], step = 0, manual = false, style = 'harness', font, lang = 'zh', activeKey = '', layout: rawLayout, setLayout, onStep, onClose, onCopyPrompt }) {
    const activeStyle = normalizeDshStyle(style);
    const activeFont = normalizeDshFont(font ?? readDshFont());
    const layerRef = useRef ? useRef(null) : { current: null };
    const cardRef = useRef ? useRef(null) : { current: null };
    const nextBtnRef = useRef ? useRef(null) : { current: null };
    const copyTimerRef = useRef ? useRef(null) : { current: null };
    const lastStatusRef = useRef ? useRef('') : { current: '' };
    const [copied, setCopied] = useState ? useState(false) : [false, () => {}];
    const [statusMsg, setStatusMsg] = useState ? useState('') : ['', () => {}];
    const titleId = (typeof useId === 'function' ? useId() : 'dsh-cite-tour') + '-title';
    const isEn = String(lang).startsWith('en');
    const l = (zh, en) => (isEn ? en : zh);
    const current = steps[Math.max(0, Math.min(steps.length - 1, step))] || {};
    const layout = rawLayout && typeof rawLayout === 'object' && rawLayout.side
      ? rawLayout
      : { spotlight: null, side: current.side || 'bottom', left: 24, top: 76, arrowX: 28, arrowY: 24 };

    useEffect?.(() => {
      const node = layerRef.current;
      if (!node) return undefined;
      try {
        node.setAttribute?.('popover', 'manual');
        node.showPopover?.();
      } catch { /* ignore */ }
      return () => {
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        try { node.hidePopover?.(); } catch { /* ignore */ }
      };
    }, []);

    useEffect?.(() => {
      setCopied(false);
      setStatusMsg('');
    }, [step]);

    useEffect?.(() => {
      function safeQuery(scope, selector) {
        if (!scope || typeof scope.querySelector !== 'function' || !selector) return null;
        if (selector.startsWith('#') && !/[\s>+~,\[]/.test(selector)) {
          const rawId = selector.slice(1);
          const escaped = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
            ? '#' + CSS.escape(rawId)
            : (/[:"\\]/.test(rawId) ? '[id="' + rawId.replace(/["\\]/g, '\\$&') + '"]' : selector);
          try {
            return scope.querySelector(escaped);
          } catch {
            try { return scope.querySelector(selector); } catch { return null; }
          }
        }
        try {
          return scope.querySelector(selector);
        } catch {
          return null;
        }
      }
      function measure() {
        const scope = rootRef?.current || (typeof document !== 'undefined' ? document : null);
        if (!scope || typeof scope.querySelector !== 'function') return;
        const target = safeQuery(scope, current.selector) || safeQuery(scope, current.fallback);
        setLayout?.(computeTourLayout(target, current.side, cardRef.current));
      }
      measure();
      const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(measure) : null;
      if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
        return () => { if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf); };
      }
      window.addEventListener('resize', measure, { passive: true });
      window.addEventListener('scroll', measure, true);
      return () => {
        if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure, true);
      };
    }, [step, activeKey, current.selector, current.fallback, current.side]);

    useEffect?.(() => {
      if (!manual) return;
      (nextBtnRef.current || cardRef.current?.querySelector?.('[data-tour-next]'))?.focus?.();
    }, [manual, step]);

    async function handleCopy() {
      if (!current.prompt || !onCopyPrompt) return;
      const ok = await onCopyPrompt(current.prompt);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      let msg = ok !== false ? l('已复制指令', 'Copied prompt') : l('复制失败', 'Copy failed');
      if (msg === lastStatusRef.current) msg += '\u00A0';
      lastStatusRef.current = msg;
      setCopied(ok !== false);
      setStatusMsg(msg);
      copyTimerRef.current = setTimeout(() => {
        setCopied(false);
        setStatusMsg('');
      }, 1800);
    }

    const isLast = step >= steps.length - 1;
    function finish() { onClose?.(manual); }
    function onKeyDown(event) {
      if (event.isComposing || event.nativeEvent?.isComposing) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); finish(); }
      else if (event.key === 'ArrowRight' && !isLast) { event.preventDefault(); onStep?.(step + 1, true); }
      else if (event.key === 'ArrowLeft' && step > 0) { event.preventDefault(); onStep?.(step - 1, true); }
    }

    return h('div', {
      ref: layerRef,
      className: 'dshw cite-tour-layer',
      'data-dsh-style': activeStyle,
      'data-dsh-font': activeFont,
      'data-cite-tour': current.id || String(step),
      'data-window-drag-exclude': '',
    },
      layout.spotlight
        ? h('div', {
            className: 'cite-tour-spotlight',
            'data-tour-spotlight': current.id || String(step),
            'aria-hidden': 'true',
            style: {
              left: layout.spotlight.left + 'px',
              top: layout.spotlight.top + 'px',
              width: layout.spotlight.width + 'px',
              height: layout.spotlight.height + 'px',
            },
          })
        : h('div', { className: 'cite-tour-backdrop-fallback', 'aria-hidden': 'true' }),
      h('div', {
        ref: cardRef,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-labelledby': titleId,
        tabIndex: -1,
        onKeyDown,
        className: 'cite-tour-card',
        'data-side': layout.side,
        'data-tour-card': current.id || String(step),
        style: {
          left: layout.left + 'px',
          top: layout.top + 'px',
          '--arrow-x': layout.arrowX + 'px',
          '--arrow-y': layout.arrowY + 'px',
        },
      },
        h('span', { className: 'cite-tour-arrow', 'data-tour-arrow': layout.side, 'aria-hidden': 'true' }),
        h('div', { className: 'cite-tour-head' },
          h('div', { className: 'cite-tour-step-meta' },
            h('span', { className: 'cite-tour-step-badge' }, (step + 1) + ' / ' + steps.length),
            h('span', { className: 'cite-tour-dots', 'aria-hidden': 'true' },
              steps.map((item, idx) => h('span', { key: item.id || idx, className: 'cite-tour-dot', 'data-active': idx === step ? 'true' : undefined })))),
          h('button', { type: 'button', className: 'cite-tour-skip', onClick: finish }, l('跳过', 'Skip'))),
        h('h2', { id: titleId, className: 'cite-tour-title' }, current.title),
        h('p', { className: 'cite-tour-desc' }, current.desc),
        current.prompt ? h('div', { className: 'cite-tour-inline-action' },
          h(Button, {
            variant: 'outline',
            icon: copied ? 'check' : 'copy',
            'data-copy-prompt': current.prompt,
            'data-copied': copied ? 'true' : undefined,
            onClick: () => { void handleCopy(); },
          }, copied ? l('已复制', 'Copied') : (current.promptLabel || l('复制对话指令', 'Copy prompt'))),
          h('span', { className: 'cite-copy-status', role: 'status' }, statusMsg)) : null,
        h('div', { className: 'cite-tour-footer' },
          step > 0
            ? h(Button, { variant: 'ghost', onClick: () => onStep?.(step - 1, true), 'data-tour-prev': '' }, l('上一步', 'Back'))
            : h('span', null),
          h('div', { className: 'cite-tour-nav' },
            h(Button, {
              ref: nextBtnRef,
              variant: 'primary',
              'data-tour-next': '',
              onClick: () => (isLast ? finish() : onStep?.(step + 1, true)),
            }, isLast ? l('完成引导', 'Done') : l('下一步', 'Next'))))));
  }

  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }

  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-base,#ffffff);--w-soft:var(--dsw-alias-bg-layer-1,#f7f9fc);--w-layer-2:var(--dsw-alias-bg-layer-2,#eef2f7);--w-text:var(--dsw-alias-label-primary,#1b2230);--w-muted:var(--dsw-alias-label-secondary,#5b667a);--w-border:var(--dsw-alias-border-l2,#e2e7f0);--w-accent:var(--dsw-alias-state-business-primary,#4176e6);--w-selected:color-mix(in oklab,var(--w-accent) 12%,var(--w-bg));--w-primary:var(--dsw-alias-button-primary-fill,#4176e6);--w-on-primary:var(--dsw-alias-button-primary-ink,#ffffff);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-body,var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif));min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
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
  const SplitResizer = createSplitResizerComponent(React);
  const Skeleton = createSkeletonComponent(React);
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, SplitResizer, Skeleton, Row, Search, Switch, Dialog, CoachmarkTour, computeTourLayout, readTourDone, writeTourDone, Styles, register, styles };
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
const CITE_WORKBENCH_CSS = "/* ==========================================================================\n * DeepSeek Harness (>=0.2.2-rc.3) Unified Workbench Themes & Motion System v3\n * Shared across STARDUSTLC666 workbench plugins:\n *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,\n *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes\n *\n * Design Principles:\n * 1. NEVER TOO DARK: Airy daylight defaults; when host `body[data-ds-dark-theme]`\n *    is active under `harness`, soften to breathable slate (#1f232b / #272c36),\n *    never pitch black (#000 / #090a0f / #151517).\n * 2. 13 SWITCHABLE PRESETS via `[data-dsh-style]` + 8 FONT PAIRINGS via `[data-dsh-font]`:\n *    - `harness`   (原生清透 / Native Airy)\n *    - `cream`     (米白纸感 / Warm Cream — stacked paper, dashed rows, bookmark tab)\n *    - `claude`    (Claude 暖书卷 / Claude Warmth — editorial serif, paper grain, borderless cards)\n *    - `pixel8bit` (8-Bit 掌机 / Bright 8-Bit — dot-matrix header, 2px borders, ▶ cursor, pixel progress)\n *    - `mint`      (晴空薄荷 / Airy Mint)\n *    - `glass`     (晴昼琉璃 / Daylight Glass — pastel aurora mesh, frosted blur, specular inner rim)\n *    - `eink`      (护眼墨水屏 / E-Ink Paper — matte warm paper, #171716 ink, 60ms snappy transitions)\n *    - `blueprint` (工程晒图 / Blueprint — cyanotype grid, Prussian #0d3b66 ink, safety-orange #e05a2b, `+` ticks)\n *    - `risograph` (波普孔版 / Riso Zine — halftone header, 2px #18181b outlines, #ff3e7f/#2563eb offset shadows)\n *    - `win98`     (千禧复古 / Retro 98 — Platinum silver 3D raised/sunken bevels, royal-blue titlebar accent)\n *    - `songhui`   (宋韵朱砂 / Song Xuan — gold-flecked Xuan paper, 3px double #b83b2a masthead, seal stamps)\n *    - `frutiger`  (晴空水晶 / Aqua Gloss — sky-aqua gradient, glossy specular 999px aqua pills)\n *    - `gazette`   (铅字晨报 / Gazette — warm newsprint, 4px double #161514 masthead, 1px column rules, #9b1c1c seal)\n *    - Dual-layer Chinese + Latin typography per preset + independent `[data-dsh-font]` overrides\n *      (`auto`, `songkai`, `fangsong`, `poster`, `retro98`, `serif`, `arcade`, `modern`)\n * 3. SHARED v3 LAYOUT & MOTION PRIMITIVES:\n *    - Unified 48px Single-Row Header (`.dsh-header`) + compact `.dsh-style-switcher` + `.dsh-font-trigger`\n *    - Sliding Tab Indicator (`.dsh-tablist` + `.dsh-tab-indicator`) + 140ms Panel Enter\n *    - Resizable Split Pane (`.dsh-split-pane`, `.dsh-split-resizer`, <760px auto-stack)\n *    - Theme-Tinted Shimmer Skeleton (`.dsh-skeleton`)\n *    - Row Hover Quick-Action Bar (`.dsh-row-actions`)\n *    - Calm Compact Update Strip (`[data-plugin-update-footer]`)\n * 4. PORTALED OVERLAY SYNC + `prefers-reduced-motion` + `forced-colors` compliance.\n * ========================================================================== */\n\n/* --------------------------------------------------------------------------\n * 1. Motion Timing & Base Token Fallbacks (Standalone + Host Safe)\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]),\n:where([data-dsh-portal-synced]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n  --dsh-ease-out: cubic-bezier(0.22, 1, 0.36, 1);\n  --dsh-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  /* Standard cubic-bezier fallback before linear() physics spring */\n  --dsh-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --dsh-motion-fast: 140ms;\n  --dsh-motion-base: 200ms;\n  --dsh-motion-dialog: 220ms;\n  --dsh-control-border-width: 0.5px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsh-serif-font: \"Palatino Linotype\", Georgia, \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", \"STSong\", \"华文宋体\", serif;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n@supports (transition-timing-function: linear(0, 1)) {\n  :where([data-dsh-style]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n    --dsh-ease-spring: linear(\n      0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%,\n      1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%,\n      1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1\n    );\n  }\n}\n\n/* Electron / macOS 0.2.2+ window-drag-regions rule:\n * Exclude ONLY the visible overlay owner box itself (never `[data-window-drag-exclude] *`,\n * so scrolled/clipped descendants cannot register offscreen no-drag rects over headers). */\n[data-window-drag-exclude] {\n  -webkit-app-region: no-drag;\n}\n\n/* --------------------------------------------------------------------------\n * 2. Preset 1: `harness` — 原生清透 / Native Airy\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"harness\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:where(body:not([data-ds-dark-theme])) [data-dsh-style=\"harness\"],\n:where(body:not([data-ds-dark-theme])) :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style=\"harness\"]) {\n  color-scheme: light;\n  accent-color: var(--dsw-alias-state-business-primary, #4176e6);\n}\n\n/* Standalone fallbacks when host ui-theme stylesheet is not mounted (e.g. jsdom / preview) */\n:root:not([data-dsh-host-tokens]) [data-dsh-style=\"harness\"] {\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 8px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n}\n\nbody:not([data-ds-dark-theme]) [data-dsh-style=\"harness\"] {\n  --dsh-surface-spotlight: rgba(65, 118, 230, 0.06);\n}\n\n/* NEVER TOO DARK: Soft breathable slate when host dark mode is active in `harness` mode */\nbody[data-ds-dark-theme] [data-dsh-style=\"harness\"],\nbody[data-ds-dark-theme] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  color-scheme: dark;\n  accent-color: #7aaaff;\n  --dsw-alias-bg-base: #1f232b;\n  --dsw-alias-bg-layer-1: #272c36;\n  --dsw-alias-bg-layer-2: #2f3542;\n  --dsw-alias-bg-layer-3: #373e4d;\n  --dsw-alias-bg-overlay: #2a303c;\n  --dsw-alias-bg-module-platform: #2c323e;\n  --dsw-alias-settings-card-fill: #262b35;\n  --dsw-alias-settings-card-stroke: rgba(226, 232, 240, 0.12);\n  --dsw-specific-menu: rgba(39, 44, 54, 0.96);\n  --dsw-alias-border-l1: rgba(226, 232, 240, 0.09);\n  --dsw-alias-border-l2: rgba(226, 232, 240, 0.15);\n  --dsw-alias-border-l3: rgba(226, 232, 240, 0.22);\n  --dsw-alias-border-l4: rgba(226, 232, 240, 0.28);\n  --dsw-alias-label-primary: #eef2f7;\n  --dsw-alias-label-secondary: #b6c0cf;\n  --dsw-alias-label-tertiary: #8d98ab;\n  --dsw-alias-label-dimmed: #737e91;\n  --dsw-alias-brand-primary: #7aaaff;\n  --dsw-alias-brand-text: #eef2f7;\n  --dsw-alias-state-business-primary: #7aaaff;\n  --dsw-alias-state-business-tertiary: rgba(122, 170, 255, 0.16);\n  --dsw-alias-link: #8bb6ff;\n  --dsw-alias-button-primary-fill: #5b8def;\n  --dsw-alias-button-primary-hover: #6f9cf4;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(226, 232, 240, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(226, 232, 240, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(122, 170, 255, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.16);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-label: #fcd34d;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.15);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-elevation-panel: 0 4px 16px rgba(10, 14, 22, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.12);\n  --dsw-elevation-prominent: 0 14px 38px rgba(10, 14, 22, 0.42), 0 0 0 1px rgba(226, 232, 240, 0.16);\n  --dsh-button-hover-shadow: 0 2px 8px rgba(10, 14, 22, 0.25);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(10, 14, 22, 0.32);\n  --dsh-surface-spotlight: rgba(122, 170, 255, 0.10);\n}\n\n/* --------------------------------------------------------------------------\n * 3. Preset 2: `cream` — 米白纸感 / Warm Cream (Deepened Materiality)\n *    - Stacked-paper double-edge card shadow\n *    - Dashed notebook row dividers\n *    - Warm bookmark-style active tab accent\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"cream\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"cream\"], :has([data-dsh-style=\"cream\"])) {\n  color-scheme: light;\n  accent-color: #9e5829;\n  --dsw-alias-bg-base: #faf7f0;\n  --dsw-alias-bg-layer-1: #f3efe4;\n  --dsw-alias-bg-layer-2: #eae3d3;\n  --dsw-alias-bg-layer-3: #e0d7c3;\n  --dsw-alias-bg-overlay: #fcfaf4;\n  --dsw-alias-bg-module-platform: #efe9da;\n  --dsw-alias-settings-card-fill: #fdfbf6;\n  --dsw-alias-settings-card-stroke: #d4c8ae;\n  --dsw-specific-menu: rgba(252, 250, 244, 0.97);\n  --dsw-alias-border-l1: #e6dec8;\n  --dsw-alias-border-l2: #d4c8ae;\n  --dsw-alias-border-l3: #c0b193;\n  --dsw-alias-border-l4: #ad9c7c;\n  --dsw-alias-label-primary: #2b2620;\n  --dsw-alias-label-secondary: #655b4e;\n  --dsw-alias-label-tertiary: #857968;\n  --dsw-alias-label-dimmed: #9c907f;\n  --dsw-alias-brand-primary: #9e5829;\n  --dsw-alias-brand-text: #2b2620;\n  --dsw-alias-state-business-primary: #a65e2e;\n  --dsw-alias-state-business-tertiary: rgba(166, 94, 46, 0.13);\n  --dsw-alias-link: #934e20;\n  --dsw-alias-button-primary-fill: #9e5829;\n  --dsw-alias-button-primary-hover: #86481e;\n  --dsw-alias-button-primary-ink: #fffdf9;\n  --dsw-alias-interactive-bg-hover: rgba(108, 84, 50, 0.075);\n  --dsw-alias-interactive-bg-active: rgba(166, 94, 46, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(166, 94, 46, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 56, 44, 0.11);\n  --dsw-alias-state-error-primary: #b9382c;\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-label: #8c3d08;\n  --dsw-alias-state-warn-tertiary: #fdefd6;\n  --dsw-alias-state-success-primary: #2a6f4e;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 13px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.42);\n  --dsw-elevation-prominent: 0 14px 34px rgba(68, 52, 32, 0.14), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.48);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(84, 62, 34, 0.09);\n  --dsh-card-shadow: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1;\n  --dsh-card-hover-shadow: 0 4px 10px rgba(68, 52, 32, 0.10), 4px 4px 0 #e2d7be;\n  --dsh-surface-spotlight: rgba(166, 94, 46, 0.08);\n  --dsh-font-display: \"Trebuchet MS\", \"STKaiti\", \"华文楷体\", \"Noto Serif SC SemiBold\", serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"cream\"] :where([data-dsh-card], .dsh-card) {\n  border-color: var(--dsw-alias-border-l2);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n[data-dsh-style=\"cream\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px dashed var(--dsw-alias-border-l2);\n}\n\n[data-dsh-style=\"cream\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: rgba(158, 88, 41, 0.10);\n  color: #7d4119;\n  box-shadow: inset 0 2px 0 rgba(158, 88, 41, 0.22);\n}\n\n[data-dsh-style=\"cream\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  border-block-end-color: #9e5829;\n  border-block-end-width: 2.5px;\n}\n\n/* --------------------------------------------------------------------------\n * 4. Preset 3: `claude` — Claude 暖书卷 / Claude Warmth (Deepened Materiality)\n *    - Editorial serif on headings, reader/detail titles & card titles (`[data-dsh-serif]`)\n *    - Subtle warm paper texture\n *    - Soft borderless surface cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"claude\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) {\n  color-scheme: light;\n  accent-color: #c96442;\n  --dsw-alias-bg-base: #f5f4ed;\n  --dsw-alias-bg-layer-1: #ece9df;\n  --dsw-alias-bg-layer-2: #e3dfd2;\n  --dsw-alias-bg-layer-3: #d8d3c3;\n  --dsw-alias-bg-overlay: #faf9f4;\n  --dsw-alias-bg-module-platform: #e7e3d6;\n  --dsw-alias-settings-card-fill: #faf9f4;\n  --dsw-alias-settings-card-stroke: transparent;\n  --dsw-specific-menu: rgba(250, 249, 244, 0.97);\n  --dsw-alias-border-l1: #e4e0d3;\n  --dsw-alias-border-l2: #d5d0c3;\n  --dsw-alias-border-l3: #c1bbb0;\n  --dsw-alias-border-l4: #aba495;\n  --dsw-alias-label-primary: #1f1e1b;\n  --dsw-alias-label-secondary: #5d5a51;\n  --dsw-alias-label-tertiary: #7b776c;\n  --dsw-alias-label-dimmed: #948f83;\n  --dsw-alias-brand-primary: #c96442;\n  --dsw-alias-brand-text: #1f1e1b;\n  --dsw-alias-state-business-primary: #c96442;\n  --dsw-alias-state-business-tertiary: rgba(201, 100, 66, 0.14);\n  --dsw-alias-link: #b35030;\n  --dsw-alias-button-primary-fill: #c96442;\n  --dsw-alias-button-primary-hover: #b25232;\n  --dsw-alias-button-primary-ink: #faf9f5;\n  --dsw-alias-interactive-bg-hover: rgba(31, 30, 27, 0.055);\n  --dsw-alias-interactive-bg-active: rgba(201, 100, 66, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(201, 100, 66, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(180, 48, 42, 0.11);\n  --dsw-alias-state-error-primary: #b4302a;\n  --dsw-alias-state-warn-primary: #b85d19;\n  --dsw-alias-state-warn-label: #8c430c;\n  --dsw-alias-state-warn-tertiary: #f7e8d6;\n  --dsw-alias-state-success-primary: #2d6a4f;\n  --dsw-radius-xs: 7px;\n  --dsw-radius-sm: 10px;\n  --dsw-radius-md: 14px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: 0 2px 12px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.18);\n  --dsw-elevation-prominent: 0 16px 38px rgba(31, 30, 27, 0.13), 0 2px 8px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.24);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(31, 30, 27, 0.08);\n  --dsh-card-shadow: 0 1px 3px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.13);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(31, 30, 27, 0.08), 0 0 0 1px rgba(145, 139, 126, 0.20);\n  --dsh-surface-spotlight: rgba(201, 100, 66, 0.08);\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Subtle warm paper grain texture */\n[data-dsh-style=\"claude\"] {\n  background-color: var(--dsw-alias-bg-base);\n  background-image:\n    radial-gradient(rgba(31, 30, 27, 0.024) 0.75px, transparent 0),\n    linear-gradient(180deg, rgba(255, 253, 247, 0.45), rgba(236, 233, 223, 0.25));\n  background-size: 16px 16px, 100% 100%;\n}\n\n/* Soft borderless surface cards */\n[data-dsh-style=\"claude\"] :where([data-dsh-card], .dsh-card) {\n  background: var(--dsw-alias-settings-card-fill);\n  border-color: transparent;\n  box-shadow: var(--dsh-card-shadow);\n}\n\n/* Editorial display font applied to workbench headings, reader/detail titles & card titles (overrideable via [data-dsh-font]) */\n[data-dsh-style=\"claude\"] :where(\n  header h1,\n  [data-dsh-editorial-heading],\n  [data-dsh-serif],\n  [data-dsh-card] :is(h2, h3, .dsh-card-title),\n  .dsh-card :is(h2, h3, .dsh-card-title),\n  [data-dsh-reader] :is(h1, h2),\n  .dsh-reader :is(h1, h2)\n),\n:where([role=\"dialog\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) header h2 {\n  font-family: var(--dsh-font-display);\n  font-weight: var(--dsh-display-weight, 700);\n  letter-spacing: var(--dsh-display-tracking, -0.01em);\n}\n\n/* --------------------------------------------------------------------------\n * 5. Preset 4: `pixel8bit` — 8-Bit 掌机 / Bright 8-Bit (Deepened Materiality)\n *    - 1px dot-matrix header pattern (`6px 6px`)\n *    - 2px solid #1e2826 borders + 2px 2px 0 pixel shadows\n *    - Animated `▶` active row cursor + stepped pixel progress helper\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"pixel8bit\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  color-scheme: light;\n  accent-color: #2e7d5b;\n  --dsw-alias-bg-base: #f4f6e8;\n  --dsw-alias-bg-layer-1: #e7eed2;\n  --dsw-alias-bg-layer-2: #dbe5c0;\n  --dsw-alias-bg-layer-3: #cedaad;\n  --dsw-alias-bg-overlay: #f9fbf0;\n  --dsw-alias-bg-module-platform: #e2ebc9;\n  --dsw-alias-settings-card-fill: #edf2dc;\n  --dsw-alias-settings-card-stroke: #1e2826;\n  --dsw-specific-menu: #f9fbf0;\n  --dsw-alias-border-l1: #7e9478;\n  --dsw-alias-border-l2: #1e2826;\n  --dsw-alias-border-l3: #1e2826;\n  --dsw-alias-border-l4: #1e2826;\n  --dsw-alias-label-primary: #1e2826;\n  --dsw-alias-label-secondary: #3d514c;\n  --dsw-alias-label-tertiary: #58706a;\n  --dsw-alias-label-dimmed: #6e857f;\n  --dsw-alias-brand-primary: #2e7d5b;\n  --dsw-alias-brand-text: #1e2826;\n  --dsw-alias-state-business-primary: #2e7d5b;\n  --dsw-alias-state-business-tertiary: rgba(46, 125, 91, 0.18);\n  --dsw-alias-link: #226448;\n  --dsw-alias-button-primary-fill: #2e7d5b;\n  --dsw-alias-button-primary-hover: #24674a;\n  --dsw-alias-button-primary-ink: #f4f6e8;\n  --dsw-alias-interactive-bg-hover: #dfe9c4;\n  --dsw-alias-interactive-bg-active: #cfe0ad;\n  --dsw-alias-interactive-bg-hover-accent: rgba(46, 125, 91, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(217, 91, 67, 0.18);\n  --dsw-alias-state-error-primary: #d95b43;\n  --dsw-alias-state-warn-primary: #c47614;\n  --dsw-alias-state-warn-label: #7a4808;\n  --dsw-alias-state-warn-tertiary: #f6e7b4;\n  --dsw-alias-state-success-primary: #2e7d5b;\n  --dsh-pixel-accent-secondary: #d95b43;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-panel: 2px 2px 0px #1e2826;\n  --dsw-elevation-prominent: 4px 4px 0px #1e2826;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 2px 2px 0px #1e2826;\n  --dsh-button-hover-shadow: 3px 3px 0px #1e2826;\n  --dsh-card-shadow: 2px 2px 0px #1e2826;\n  --dsh-card-hover-shadow: 4px 4px 0px #1e2826;\n  --dsh-surface-spotlight: rgba(46, 125, 91, 0.12);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.03em;\n  --dsh-body-tracking: 0.03em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Subtle 1px dot-matrix header pattern (`6px 6px`) */\n[data-dsh-style=\"pixel8bit\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background-color: var(--dsw-alias-bg-layer-1);\n  background-image: radial-gradient(rgba(30, 40, 38, 0.14) 1px, transparent 0);\n  background-size: 6px 6px;\n  border-block-end: 2px solid #1e2826;\n}\n\n/* Crisp 0px corners, 2px solid borders, and arcade shadows in `pixel8bit` */\n[data-dsh-style=\"pixel8bit\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border-width: 2px;\n  border-color: #1e2826;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  border: 2px solid #1e2826 !important;\n  box-shadow: 4px 4px 0px #1e2826 !important;\n  backdrop-filter: none;\n}\n\n[data-dsh-style=\"pixel8bit\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"pixel8bit\"] .dsh-tab-indicator {\n  border-block-end-color: #d95b43;\n  border-block-end-width: 3px;\n}\n\n/* Animated `▶` active row cursor (`[data-dsh-row][data-active=\"true\"]` or `.dsh-pixel-cursor`) */\n.dsh-pixel-cursor {\n  display: none;\n  flex: none;\n  font-size: 10px;\n  line-height: 1;\n  color: var(--dsh-pixel-accent-secondary, #d95b43);\n}\n\n@keyframes dsh-pixel-cursor-nudge {\n  0%, 100% { translate: 0px 0px; }\n  50% { translate: 2px 0px; }\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  box-shadow: inset 3px 0 0 #d95b43;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]):not(:has(.dsh-pixel-cursor))::before {\n  content: \"▶\";\n  display: inline-block;\n  flex: none;\n  margin-inline-end: 6px;\n  font-size: 10px;\n  line-height: 1;\n  color: #d95b43;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-pixel-cursor {\n  display: inline-flex;\n  align-items: center;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]):not(:has(.dsh-pixel-cursor))::before,\n  [data-dsh-style=\"pixel8bit\"] :where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-pixel-cursor {\n    animation: dsh-pixel-cursor-nudge 760ms steps(2, end) infinite;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 6. Preset 5: `mint` — 晴空薄荷 / Airy Mint\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"mint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"mint\"], :has([data-dsh-style=\"mint\"])) {\n  color-scheme: light;\n  accent-color: #0f766e;\n  --dsw-alias-bg-base: #f5fafb;\n  --dsw-alias-bg-layer-1: #eaf3f6;\n  --dsw-alias-bg-layer-2: #dcebf0;\n  --dsw-alias-bg-layer-3: #cce1e8;\n  --dsw-alias-bg-overlay: #fafdff;\n  --dsw-alias-bg-module-platform: #e3eff3;\n  --dsw-alias-settings-card-fill: #eef6f8;\n  --dsw-alias-settings-card-stroke: #c7dde5;\n  --dsw-specific-menu: rgba(250, 253, 255, 0.97);\n  --dsw-alias-border-l1: #d5e6ec;\n  --dsw-alias-border-l2: #bdd5de;\n  --dsw-alias-border-l3: #9ec0cd;\n  --dsw-alias-border-l4: #7faab9;\n  --dsw-alias-label-primary: #132a2e;\n  --dsw-alias-label-secondary: #426067;\n  --dsw-alias-label-tertiary: #628088;\n  --dsw-alias-label-dimmed: #7c98a0;\n  --dsw-alias-brand-primary: #0f766e;\n  --dsw-alias-brand-text: #132a2e;\n  --dsw-alias-state-business-primary: #0f766e;\n  --dsw-alias-state-business-tertiary: rgba(15, 118, 110, 0.13);\n  --dsw-alias-link: #0284c7;\n  --dsw-alias-button-primary-fill: #0f766e;\n  --dsw-alias-button-primary-hover: #0d635c;\n  --dsw-alias-button-primary-ink: #f5fafb;\n  --dsw-alias-interactive-bg-hover: rgba(15, 118, 110, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(15, 118, 110, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(2, 132, 199, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(200, 50, 64, 0.11);\n  --dsw-alias-state-error-primary: #c83240;\n  --dsw-alias-state-warn-primary: #b4690e;\n  --dsw-alias-state-warn-label: #864c07;\n  --dsw-alias-state-warn-tertiary: #fdf1d6;\n  --dsw-alias-state-success-primary: #0f766e;\n  --dsh-mint-sky-accent: #0284c7;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 3px 12px rgba(15, 76, 92, 0.07), 0 0 0 1px rgba(127, 170, 185, 0.28);\n  --dsw-elevation-prominent: 0 14px 34px rgba(15, 76, 92, 0.13), 0 2px 6px rgba(15, 76, 92, 0.05), 0 0 0 1px rgba(127, 170, 185, 0.34);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(15, 118, 110, 0.11);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(2, 132, 199, 0.10);\n  --dsh-surface-spotlight: rgba(2, 132, 199, 0.08);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* --------------------------------------------------------------------------\n * 7. Preset 6: `glass` — 晴昼琉璃 / Daylight Glass (NEW!)\n *    - Pastel aurora daylight mesh background over `#f3f7ff`\n *    - Frosted translucent glass surfaces (`rgba(255,255,255,0.70)`, blur(14px) saturate(140%))\n *    - Crisp white specular inner border (`inset 0 1px 0 rgba(255,255,255,0.9)`)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"glass\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n  color-scheme: light;\n  accent-color: #4f6df5;\n  --dsw-alias-bg-base: #f3f7ff;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.70);\n  --dsw-alias-bg-layer-2: rgba(240, 245, 255, 0.78);\n  --dsw-alias-bg-layer-3: rgba(226, 236, 255, 0.84);\n  --dsw-alias-bg-overlay: rgba(255, 255, 255, 0.84);\n  --dsw-alias-bg-module-platform: rgba(244, 248, 255, 0.76);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.70);\n  --dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.82);\n  --dsw-specific-menu: rgba(255, 255, 255, 0.86);\n  --dsw-alias-border-l1: rgba(148, 173, 219, 0.24);\n  --dsw-alias-border-l2: rgba(132, 159, 212, 0.34);\n  --dsw-alias-border-l3: rgba(114, 144, 204, 0.46);\n  --dsw-alias-border-l4: rgba(96, 128, 196, 0.56);\n  --dsw-alias-label-primary: #172033;\n  --dsw-alias-label-secondary: #4b5973;\n  --dsw-alias-label-tertiary: #6b7994;\n  --dsw-alias-label-dimmed: #8895ae;\n  --dsw-alias-brand-primary: #4f6df5;\n  --dsw-alias-brand-text: #172033;\n  --dsw-alias-state-business-primary: #4f6df5;\n  --dsw-alias-state-business-tertiary: rgba(79, 109, 245, 0.14);\n  --dsw-alias-link: #3b59e2;\n  --dsw-alias-button-primary-fill: #4f6df5;\n  --dsw-alias-button-primary-hover: #3f5de3;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(79, 109, 245, 0.08);\n  --dsw-alias-interactive-bg-active: rgba(79, 109, 245, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(14, 165, 233, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 56, 82, 0.12);\n  --dsw-alias-state-error-primary: #d13850;\n  --dsw-alias-state-warn-primary: #c06a12;\n  --dsw-alias-state-warn-label: #8a4a09;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.18);\n  --dsw-alias-state-success-primary: #15805d;\n  --dsw-radius-xs: 8px;\n  --dsw-radius-sm: 11px;\n  --dsw-radius-md: 15px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 18px rgba(59, 92, 168, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.72);\n  --dsw-elevation-prominent: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 16px 40px rgba(59, 92, 168, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.80);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 3px 10px rgba(79, 109, 245, 0.12);\n  --dsh-card-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 16px rgba(59, 92, 168, 0.07);\n  --dsh-card-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.96), 0 10px 26px rgba(59, 92, 168, 0.12);\n  --dsh-surface-spotlight: rgba(79, 109, 245, 0.08);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"glass\"] {\n  background-color: #f3f7ff;\n  background-image:\n    radial-gradient(64% 58% at 12% 8%, rgba(125, 211, 252, 0.30) 0%, transparent 65%),\n    radial-gradient(58% 52% at 88% 14%, rgba(196, 181, 253, 0.28) 0%, transparent 65%),\n    radial-gradient(60% 55% at 52% 96%, rgba(153, 246, 228, 0.24) 0%, transparent 68%);\n}\n\n[data-dsh-style=\"glass\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n  background: rgba(255, 255, 255, 0.70);\n  -webkit-backdrop-filter: blur(14px) saturate(140%);\n  backdrop-filter: blur(14px) saturate(140%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 4px 16px rgba(59, 92, 168, 0.07);\n}\n\n@supports not (backdrop-filter: blur(1px)) {\n  [data-dsh-style=\"glass\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n    background: rgba(255, 255, 255, 0.92);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 8. Preset 7: `eink` — 护眼墨水屏 / E-Ink Paper (NEW!)\n *    - Warm matte e-paper (`#F2F1EC` base, `#EAE8E1` layer, `#F7F6F2` card)\n *    - High-contrast `#171716` charcoal ink, crisp `1px solid #9E9C93` rules\n *    - `2px–4px` sharp corners, ultra-snappy `60ms` transitions, zero chromatic distraction\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"eink\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"eink\"], :has([data-dsh-style=\"eink\"])) {\n  color-scheme: light;\n  accent-color: #171716;\n  --dsw-alias-bg-base: #f2f1ec;\n  --dsw-alias-bg-layer-1: #eae8e1;\n  --dsw-alias-bg-layer-2: #e1dfd6;\n  --dsw-alias-bg-layer-3: #d6d3c9;\n  --dsw-alias-bg-overlay: #f7f6f2;\n  --dsw-alias-bg-module-platform: #eae8e1;\n  --dsw-alias-settings-card-fill: #f7f6f2;\n  --dsw-alias-settings-card-stroke: #9e9c93;\n  --dsw-specific-menu: #f7f6f2;\n  --dsw-alias-border-l1: #c5c2b8;\n  --dsw-alias-border-l2: #9e9c93;\n  --dsw-alias-border-l3: #78766e;\n  --dsw-alias-border-l4: #54534d;\n  --dsw-alias-label-primary: #171716;\n  --dsw-alias-label-secondary: #484742;\n  --dsw-alias-label-tertiary: #66645d;\n  --dsw-alias-label-dimmed: #807e76;\n  --dsw-alias-brand-primary: #171716;\n  --dsw-alias-brand-text: #171716;\n  --dsw-alias-state-business-primary: #171716;\n  --dsw-alias-state-business-tertiary: rgba(23, 23, 22, 0.10);\n  --dsw-alias-link: #171716;\n  --dsw-alias-button-primary-fill: #171716;\n  --dsw-alias-button-primary-hover: #2f2f2c;\n  --dsw-alias-button-primary-ink: #f7f6f2;\n  --dsw-alias-interactive-bg-hover: rgba(23, 23, 22, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(23, 23, 22, 0.12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(23, 23, 22, 0.08);\n  --dsw-alias-interactive-bg-hover-danger: rgba(23, 23, 22, 0.10);\n  --dsw-alias-state-error-primary: #2d2c28;\n  --dsw-alias-state-warn-primary: #45443e;\n  --dsw-alias-state-warn-label: #171716;\n  --dsw-alias-state-warn-tertiary: #e6e4db;\n  --dsw-alias-state-success-primary: #242422;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 3px;\n  --dsw-radius-md: 4px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 0 0 1px #9e9c93;\n  --dsw-elevation-prominent: 0 2px 0 #9e9c93, 0 0 0 1px #78766e;\n  --dsh-control-border-width: 1px;\n  --dsh-motion-fast: 60ms;\n  --dsh-motion-base: 60ms;\n  --dsh-motion-dialog: 60ms;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: none;\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: none;\n  --dsh-surface-spotlight: rgba(23, 23, 22, 0.06);\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"eink\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 1px solid #9e9c93;\n  box-shadow: none;\n}\n\n[data-dsh-style=\"eink\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px solid #c5c2b8;\n}\n\n[data-dsh-style=\"eink\"] :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: none !important;\n  scale: none !important;\n  transition-duration: 60ms;\n}\n\n/* --------------------------------------------------------------------------\n * 9. Preset 8: `blueprint` — 工程晒图 / Blueprint (NEW!)\n *    - Light cyanotype drafting paper (`#eaf3fb`) + dual millimeter grid (`24px` + `6px`)\n *    - Prussian engineering blue (`#0d3b66`) ink & `1px solid #1b5e8a` crisp rules\n *    - Industrial safety-orange (`#e05a2b`) primary accent + technical monospace\n *    - Tiny `+` crosshair registration ticks on cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"blueprint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"blueprint\"], :has([data-dsh-style=\"blueprint\"])) {\n  color-scheme: light;\n  accent-color: #e05a2b;\n  --dsw-alias-bg-base: #eaf3fb;\n  --dsw-alias-bg-layer-1: #f4f9fe;\n  --dsw-alias-bg-layer-2: #dfeef9;\n  --dsw-alias-bg-layer-3: #cfe3f4;\n  --dsw-alias-bg-overlay: #f7fbff;\n  --dsw-alias-bg-module-platform: #e3f0fa;\n  --dsw-alias-settings-card-fill: rgba(244, 249, 254, 0.92);\n  --dsw-alias-settings-card-stroke: #1b5e8a;\n  --dsw-specific-menu: rgba(247, 251, 255, 0.98);\n  --dsw-alias-border-l1: rgba(27, 94, 138, 0.28);\n  --dsw-alias-border-l2: #1b5e8a;\n  --dsw-alias-border-l3: #0d3b66;\n  --dsw-alias-border-l4: #092b4c;\n  --dsw-alias-label-primary: #0d3b66;\n  --dsw-alias-label-secondary: #1d4e78;\n  --dsw-alias-label-tertiary: #3b6f99;\n  --dsw-alias-label-dimmed: #5b89ad;\n  --dsw-alias-brand-primary: #e05a2b;\n  --dsw-alias-brand-text: #0d3b66;\n  --dsw-alias-state-business-primary: #e05a2b;\n  --dsw-alias-state-business-tertiary: rgba(224, 90, 43, 0.14);\n  --dsw-alias-link: #0d3b66;\n  --dsw-alias-button-primary-fill: #e05a2b;\n  --dsw-alias-button-primary-hover: #c94b20;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(27, 94, 138, 0.08);\n  --dsw-alias-interactive-bg-active: rgba(224, 90, 43, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(224, 90, 43, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 45, 38, 0.12);\n  --dsw-alias-state-error-primary: #b92d26;\n  --dsw-alias-state-warn-primary: #c05614;\n  --dsw-alias-state-warn-label: #7c3408;\n  --dsw-alias-state-warn-tertiary: #fce9d8;\n  --dsw-alias-state-success-primary: #156d5b;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 0 0 1px #1b5e8a;\n  --dsw-elevation-prominent: 0 8px 24px rgba(13, 59, 102, 0.14), 0 0 0 1px #1b5e8a;\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 0 #1b5e8a;\n  --dsh-card-shadow: 0 0 0 1px #1b5e8a;\n  --dsh-card-hover-shadow: 0 3px 0 #1b5e8a;\n  --dsh-surface-spotlight: rgba(27, 94, 138, 0.09);\n  --dsh-font-display: \"Cascadia Mono SemiBold\", \"Cascadia Mono\", \"STZhongsong\", \"华文中宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-body: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.02em;\n  --dsh-body-tracking: 0.02em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"blueprint\"] {\n  background-color: #eaf3fb;\n  background-image:\n    linear-gradient(to right, rgba(18, 78, 120, 0.09) 1px, transparent 1px),\n    linear-gradient(to bottom, rgba(18, 78, 120, 0.09) 1px, transparent 1px),\n    linear-gradient(to right, rgba(18, 78, 120, 0.045) 1px, transparent 1px),\n    linear-gradient(to bottom, rgba(18, 78, 120, 0.045) 1px, transparent 1px);\n  background-size: 24px 24px, 24px 24px, 6px 6px, 6px 6px;\n}\n\n[data-dsh-style=\"blueprint\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(244, 249, 254, 0.90);\n  border-block-end: 1px solid #1b5e8a;\n}\n\n[data-dsh-style=\"blueprint\"] :where([data-dsh-card], .dsh-card) {\n  position: relative;\n  border: 1px solid #1b5e8a;\n  background: rgba(244, 249, 254, 0.92);\n}\n\n[data-dsh-style=\"blueprint\"] :where([data-dsh-card], .dsh-card):not([role=\"tab\"])::after {\n  content: \"+\";\n  position: absolute;\n  inset-block-start: 4px;\n  inset-inline-end: 6px;\n  font-family: ui-monospace, \"Cascadia Mono\", Menlo, Consolas, monospace;\n  font-size: 11px;\n  line-height: 1;\n  color: #e05a2b;\n  opacity: 0.78;\n  pointer-events: none;\n}\n\n[data-dsh-style=\"blueprint\"] :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 1px solid #1b5e8a;\n}\n\n/* --------------------------------------------------------------------------\n * 10. Preset 9: `risograph` — 波普孔版 / Riso Zine (NEW!)\n *     - Warm printmaking paper (`#faf6ee`), bold `2px solid #18181b` outlines\n *     - Vibrant offset hard shadows (`3px 3px 0 #18181b` buttons, `4px 4px 0 #2563eb`/`#ff3e7f` cards/dialogs)\n *     - Subtle halftone dot pattern (`7px 7px`) on header\n *     - Electric pink `#ff3e7f` & marker-yellow `#fde047` accents + `translate(2px, 2px)` shadow-collapse press\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"risograph\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) {\n  color-scheme: light;\n  accent-color: #ff3e7f;\n  --dsw-alias-bg-base: #faf6ee;\n  --dsw-alias-bg-layer-1: #f5efe2;\n  --dsw-alias-bg-layer-2: #ede4d1;\n  --dsw-alias-bg-layer-3: #e3d7be;\n  --dsw-alias-bg-overlay: #fffdf7;\n  --dsw-alias-bg-module-platform: #f5efe2;\n  --dsw-alias-settings-card-fill: #fffdf7;\n  --dsw-alias-settings-card-stroke: #18181b;\n  --dsw-specific-menu: #fffdf7;\n  --dsw-alias-border-l1: #d4cbb8;\n  --dsw-alias-border-l2: #18181b;\n  --dsw-alias-border-l3: #18181b;\n  --dsw-alias-border-l4: #18181b;\n  --dsw-alias-label-primary: #18181b;\n  --dsw-alias-label-secondary: #3f3f46;\n  --dsw-alias-label-tertiary: #52525b;\n  --dsw-alias-label-dimmed: #71717a;\n  --dsw-alias-brand-primary: #ff3e7f;\n  --dsw-alias-brand-text: #18181b;\n  --dsw-alias-state-business-primary: #ff3e7f;\n  --dsw-alias-state-business-tertiary: rgba(255, 62, 127, 0.14);\n  --dsw-alias-link: #2563eb;\n  --dsw-alias-button-primary-fill: #ff3e7f;\n  --dsw-alias-button-primary-hover: #e62e6d;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(253, 224, 71, 0.38);\n  --dsw-alias-interactive-bg-active: #fde047;\n  --dsw-alias-interactive-bg-hover-accent: rgba(37, 99, 235, 0.14);\n  --dsw-alias-interactive-bg-hover-danger: rgba(255, 62, 127, 0.18);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-warn-primary: #ca8a04;\n  --dsw-alias-state-warn-label: #713f12;\n  --dsw-alias-state-warn-tertiary: #fef08a;\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-radius-xs: 3px;\n  --dsw-radius-sm: 4px;\n  --dsw-radius-md: 6px;\n  --dsw-radius-lg: 8px;\n  --dsw-radius-xl: 10px;\n  --dsw-elevation-panel: 4px 4px 0px #2563eb;\n  --dsw-elevation-prominent: 4px 4px 0px #ff3e7f;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 3px 3px 0px #18181b;\n  --dsh-button-hover-shadow: 4px 4px 0px #2563eb;\n  --dsh-card-shadow: 4px 4px 0px #2563eb;\n  --dsh-card-hover-shadow: 5px 5px 0px #ff3e7f;\n  --dsh-surface-spotlight: rgba(253, 224, 71, 0.35);\n  --dsh-font-display: Impact, \"Arial Black\", \"Noto Sans SC Black\", \"SimHei\", \"黑体\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC Medium\", \"Noto Sans SC\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 900;\n  --dsh-display-tracking: -0.02em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"risograph\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background-color: #fffdf7;\n  background-image: radial-gradient(rgba(255, 62, 127, 0.15) 1px, transparent 0);\n  background-size: 7px 7px;\n  border-block-end: 2px solid #18181b;\n}\n\n[data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #18181b;\n  box-shadow: 3px 3px 0px #18181b;\n}\n\n[data-dsh-style=\"risograph\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 2px solid #18181b;\n  box-shadow: 4px 4px 0px #2563eb;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) {\n  border: 2px solid #18181b !important;\n  box-shadow: 4px 4px 0px #ff3e7f !important;\n}\n\n[data-dsh-style=\"risograph\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: #fde047;\n  color: #18181b;\n  font-weight: 700;\n}\n\n[data-dsh-style=\"risograph\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"risograph\"] .dsh-tab-indicator {\n  border-block-end-color: #ff3e7f;\n  border-block-end-width: 3px;\n}\n\n/* --------------------------------------------------------------------------\n * 11. Preset 10: `win98` — 千禧复古 / Retro 98 (NEW!)\n *     - Classic bright Platinum/Win98 silver-gray (`#dcdcdc` / `#e4e4e4`, `#ffffff` wells)\n *     - Authentic 3D beveled raised borders flipping to sunken bevels on `:active` / `[aria-selected=\"true\"]`\n *     - `0px` sharp corners + royal-blue (`#1b4f9c` -> `#3b82c4`) header accent\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"win98\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) {\n  color-scheme: light;\n  accent-color: #1b4f9c;\n  --dsw-alias-bg-base: #dcdcdc;\n  --dsw-alias-bg-layer-1: #e4e4e4;\n  --dsw-alias-bg-layer-2: #d0d0d0;\n  --dsw-alias-bg-layer-3: #c0c0c0;\n  --dsw-alias-bg-overlay: #e4e4e4;\n  --dsw-alias-bg-module-platform: #d4d4d4;\n  --dsw-alias-settings-card-fill: #ffffff;\n  --dsw-alias-settings-card-stroke: #808080;\n  --dsw-specific-menu: #dcdcdc;\n  --dsw-alias-border-l1: #b8b8b8;\n  --dsw-alias-border-l2: #808080;\n  --dsw-alias-border-l3: #5a5a5a;\n  --dsw-alias-border-l4: #222222;\n  --dsw-alias-label-primary: #111111;\n  --dsw-alias-label-secondary: #333333;\n  --dsw-alias-label-tertiary: #555555;\n  --dsw-alias-label-dimmed: #767676;\n  --dsw-alias-brand-primary: #1b4f9c;\n  --dsw-alias-brand-text: #111111;\n  --dsw-alias-state-business-primary: #1b4f9c;\n  --dsw-alias-state-business-tertiary: rgba(27, 79, 156, 0.14);\n  --dsw-alias-link: #0b3c88;\n  --dsw-alias-button-primary-fill: #1b4f9c;\n  --dsw-alias-button-primary-hover: #245cb0;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(27, 79, 156, 0.09);\n  --dsw-alias-interactive-bg-active: rgba(27, 79, 156, 0.16);\n  --dsw-alias-interactive-bg-hover-accent: rgba(59, 130, 196, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.13);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-warn-primary: #9a5b08;\n  --dsw-alias-state-warn-label: #6e3f04;\n  --dsw-alias-state-warn-tertiary: #fef3c7;\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-panel: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n  --dsw-elevation-prominent: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a, 4px 4px 12px rgba(0, 0, 0, 0.18);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n  --dsh-button-hover-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n  --dsh-card-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;\n  --dsh-card-hover-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;\n  --dsh-surface-spotlight: rgba(27, 79, 156, 0.10);\n  --dsh-font-display: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-body: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-mono: \"Fixedsys\", Consolas, \"Courier New\", \"SimSun\", \"宋体\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"win98\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n/* Raised 3D bevel buttons */\n[data-dsh-style=\"win98\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 0;\n  background-color: #dcdcdc;\n  box-shadow: inset 1.5px 1.5px 0 #ffffff, inset -1.5px -1.5px 0 #5a5a5a, inset 2.5px 2.5px 0 #f4f4f4, inset -2.5px -2.5px 0 #9a9a9a;\n}\n\n/* Keep primary buttons royal blue with 3D bevel */\n[data-dsh-style=\"win98\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {\n  background-color: #1b4f9c;\n  color: #ffffff;\n  box-shadow: inset 1.5px 1.5px 0 #6ca0e8, inset -1.5px -1.5px 0 #0d2b57, inset 2.5px 2.5px 0 #4a82d1, inset -2.5px -2.5px 0 #143c78;\n}\n\n/* Sunken 3D bevel on active / pressed / selected controls */\n[data-dsh-style=\"win98\"] :where(button, [role=\"button\"]):is(:active, [aria-pressed=\"true\"], [aria-expanded=\"true\"]):not(:disabled):not([aria-disabled=\"true\"]),\n[data-dsh-style=\"win98\"] [role=\"tab\"][aria-selected=\"true\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) :where(button, [role=\"button\"]):is(:active, [aria-pressed=\"true\"]):not(:disabled):not([aria-disabled=\"true\"]) {\n  translate: 0px 0px !important;\n  scale: 1 !important;\n  background-color: #e4e4e4;\n  box-shadow: inset 1.5px 1.5px 0 #5a5a5a, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #9a9a9a, inset -2.5px -2.5px 0 #f4f4f4 !important;\n}\n\n/* Sunken white list/card/input wells */\n[data-dsh-style=\"win98\"] :where([data-dsh-card], .dsh-card, input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border: 0;\n  background: #ffffff;\n  box-shadow: inset 1.5px 1.5px 0 #808080, inset -1.5px -1.5px 0 #ffffff, inset 2.5px 2.5px 0 #5a5a5a, inset -2.5px -2.5px 0 #dcdcdc;\n}\n\n/* Bright Win98 Platinum raised toolbar header with iconic royal-blue titlebar stripe */\n[data-dsh-style=\"win98\"] :where(.dsh-header, [data-dsh-header], .pageHeader, .dsh-wb-header, .topbar) {\n  background: linear-gradient(180deg, #ececec 0%, #dcdcdc 100%) !important;\n  color: #111111;\n  border-block-start: 3px solid #1b4f9c !important;\n  border-block-end: 2px solid #808080;\n  box-shadow: inset 0 1px 0 #ffffff, inset 0 -1px 0 #808080;\n}\n\n[data-dsh-style=\"win98\"] .dsh-header-badge {\n  background: linear-gradient(90deg, #1b4f9c 0%, #3b82c4 100%);\n  color: #ffffff;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) header {\n  background: linear-gradient(90deg, #1b4f9c 0%, #3b82c4 100%);\n  color: #ffffff;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) header h2 {\n  color: #ffffff;\n}\n\n/* --------------------------------------------------------------------------\n * 12. Preset 11: `songhui` — 宋韵朱砂 / Song Xuan (NEW!)\n *     - Warm gold-flecked Xuan paper (`#f7f3e8`, subtle `18px` gold-dust radial dots)\n *     - Double cinnabar masthead border (`3px double #b83b2a`)\n *     - Cinnabar seal-stamp primary buttons (`#b83b2a` with `#fbf9f2` ink, `2px` crisp corners)\n *     - Classical Songti / serif typography\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"songhui\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"songhui\"], :has([data-dsh-style=\"songhui\"])) {\n  color-scheme: light;\n  accent-color: #b83b2a;\n  --dsw-alias-bg-base: #f7f3e8;\n  --dsw-alias-bg-layer-1: #f0ead9;\n  --dsw-alias-bg-layer-2: #e7dec8;\n  --dsw-alias-bg-layer-3: #dcd0b4;\n  --dsw-alias-bg-overlay: #fbf9f2;\n  --dsw-alias-bg-module-platform: #ede6d4;\n  --dsw-alias-settings-card-fill: #fbf9f2;\n  --dsw-alias-settings-card-stroke: #d4c4a2;\n  --dsw-specific-menu: #fbf9f2;\n  --dsw-alias-border-l1: #e4dac2;\n  --dsw-alias-border-l2: #cfbda0;\n  --dsw-alias-border-l3: #b8a382;\n  --dsw-alias-border-l4: #9d8765;\n  --dsw-alias-label-primary: #252019;\n  --dsw-alias-label-secondary: #5c5142;\n  --dsw-alias-label-tertiary: #7d705e;\n  --dsw-alias-label-dimmed: #998c79;\n  --dsw-alias-brand-primary: #b83b2a;\n  --dsw-alias-brand-text: #252019;\n  --dsw-alias-state-business-primary: #b83b2a;\n  --dsw-alias-state-business-tertiary: rgba(184, 59, 42, 0.12);\n  --dsw-alias-link: #9e2f20;\n  --dsw-alias-button-primary-fill: #b83b2a;\n  --dsw-alias-button-primary-hover: #9f3021;\n  --dsw-alias-button-primary-ink: #fbf9f2;\n  --dsw-alias-interactive-bg-hover: rgba(184, 59, 42, 0.065);\n  --dsw-alias-interactive-bg-active: rgba(184, 59, 42, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(184, 59, 42, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(184, 59, 42, 0.15);\n  --dsw-alias-state-error-primary: #a62b1c;\n  --dsw-alias-state-warn-primary: #9c6216;\n  --dsw-alias-state-warn-label: #704309;\n  --dsw-alias-state-warn-tertiary: #f7ecd1;\n  --dsw-alias-state-success-primary: #2e664b;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 2px 10px rgba(66, 52, 32, 0.06), 0 0 0 1px #cfbda0;\n  --dsw-elevation-prominent: 0 12px 30px rgba(66, 52, 32, 0.14), 0 0 0 1px #b8a382;\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(184, 59, 42, 0.12);\n  --dsh-card-shadow: 0 1px 2px rgba(66, 52, 32, 0.05);\n  --dsh-card-hover-shadow: 0 6px 16px rgba(66, 52, 32, 0.09);\n  --dsh-surface-spotlight: rgba(184, 59, 42, 0.07);\n  --dsh-font-display: \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", \"SimSun\", \"宋体\", serif;\n  --dsh-font-body: \"Palatino Linotype\", \"STKaiti\", \"华文楷体\", \"KaiTi\", \"楷体\", \"Noto Serif SC\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"STFangsong\", \"华文仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.04em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Gold-flecked Xuan paper */\n[data-dsh-style=\"songhui\"] {\n  background-color: #f7f3e8;\n  background-image:\n    radial-gradient(rgba(196, 152, 64, 0.18) 1px, transparent 0),\n    radial-gradient(rgba(196, 152, 64, 0.11) 0.75px, transparent 0);\n  background-size: 18px 18px, 29px 29px;\n  background-position: 0 0, 9px 7px;\n}\n\n/* Double cinnabar masthead border */\n[data-dsh-style=\"songhui\"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(251, 249, 242, 0.90);\n  border-block-end: 3px double #b83b2a;\n}\n\n/* Cinnabar seal-stamp primary buttons & badge */\n[data-dsh-style=\"songhui\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  background: #b83b2a;\n  color: #fbf9f2;\n  border-color: #9e2f20;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(251, 249, 242, 0.28);\n}\n\n/* --------------------------------------------------------------------------\n * 13. Preset 12: `frutiger` — 晴空水晶 / Aqua Gloss (NEW!)\n *     - Bright Frutiger Aero sky-aqua gradient (`#eaf7ff` -> `#f4fbff`)\n *     - Glossy upper-half specular aqua pill buttons (`linear-gradient` + `inset 0 1.5px 0`)\n *     - Pill `999px` control radius + luminous translucent cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"frutiger\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) {\n  color-scheme: light;\n  accent-color: #0284c7;\n  --dsw-alias-bg-base: #eaf7ff;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.78);\n  --dsw-alias-bg-layer-2: rgba(232, 246, 255, 0.86);\n  --dsw-alias-bg-layer-3: rgba(209, 236, 255, 0.90);\n  --dsw-alias-bg-overlay: rgba(248, 253, 255, 0.93);\n  --dsw-alias-bg-module-platform: rgba(232, 246, 255, 0.84);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.82);\n  --dsw-alias-settings-card-stroke: rgba(56, 189, 248, 0.44);\n  --dsw-specific-menu: rgba(248, 253, 255, 0.95);\n  --dsw-alias-border-l1: rgba(56, 189, 248, 0.26);\n  --dsw-alias-border-l2: rgba(14, 165, 233, 0.36);\n  --dsw-alias-border-l3: rgba(2, 132, 199, 0.48);\n  --dsw-alias-border-l4: rgba(3, 105, 161, 0.58);\n  --dsw-alias-label-primary: #0c2b45;\n  --dsw-alias-label-secondary: #275373;\n  --dsw-alias-label-tertiary: #487596;\n  --dsw-alias-label-dimmed: #6c96b5;\n  --dsw-alias-brand-primary: #0284c7;\n  --dsw-alias-brand-text: #0c2b45;\n  --dsw-alias-state-business-primary: #0284c7;\n  --dsw-alias-state-business-tertiary: rgba(14, 165, 233, 0.16);\n  --dsw-alias-link: #0369a1;\n  --dsw-alias-button-primary-fill: #0284c7;\n  --dsw-alias-button-primary-hover: #0369a1;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(14, 165, 233, 0.10);\n  --dsw-alias-interactive-bg-active: rgba(14, 165, 233, 0.18);\n  --dsw-alias-interactive-bg-hover-accent: rgba(56, 189, 248, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 56, 82, 0.13);\n  --dsw-alias-state-error-primary: #c83244;\n  --dsw-alias-state-warn-primary: #c06a12;\n  --dsw-alias-state-warn-label: #8a4a09;\n  --dsw-alias-state-warn-tertiary: #fef0d6;\n  --dsw-alias-state-success-primary: #0f766e;\n  --dsw-radius-xs: 10px;\n  --dsw-radius-sm: 999px;\n  --dsw-radius-md: 18px;\n  --dsw-radius-lg: 22px;\n  --dsw-radius-xl: 26px;\n  --dsw-elevation-panel: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 6px 20px rgba(14, 165, 233, 0.12), 0 0 0 1px rgba(56, 189, 248, 0.36);\n  --dsw-elevation-prominent: inset 0 1.5px 0 rgba(255, 255, 255, 0.95), 0 16px 38px rgba(14, 165, 233, 0.18), 0 0 0 1px rgba(56, 189, 248, 0.44);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 2px 6px rgba(14, 165, 233, 0.12);\n  --dsh-button-hover-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.96), 0 4px 12px rgba(2, 132, 199, 0.22);\n  --dsh-card-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 6px 20px rgba(14, 165, 233, 0.10);\n  --dsh-card-hover-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.98), 0 10px 26px rgba(2, 132, 199, 0.16);\n  --dsh-surface-spotlight: rgba(14, 165, 233, 0.10);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"frutiger\"] {\n  background-color: #eaf7ff;\n  background-image:\n    radial-gradient(60% 48% at 15% 6%, rgba(125, 211, 252, 0.34) 0%, transparent 65%),\n    linear-gradient(180deg, #eaf7ff 0%, #f4fbff 55%, #e5f5fe 100%);\n}\n\n[data-dsh-style=\"frutiger\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border-radius: 999px;\n  border: 1px solid rgba(14, 165, 233, 0.42);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 244, 255, 0.88) 49%, rgba(204, 236, 255, 0.92) 51%, rgba(235, 249, 255, 0.96) 100%);\n  box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.92), 0 2px 6px rgba(14, 165, 233, 0.12);\n}\n\n[data-dsh-style=\"frutiger\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  border-radius: 999px;\n  border: 1px solid #0284c7;\n  color: #ffffff;\n  background: linear-gradient(180deg, #7dd3fc 0%, #0ea5e9 48%, #0284c7 52%, #38bdf8 100%);\n  box-shadow: inset 0 1.5px 0 rgba(255, 255, 255, 0.88), 0 3px 10px rgba(2, 132, 199, 0.24);\n}\n\n[data-dsh-style=\"frutiger\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]) {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 250, 255, 0.78) 100%);\n  -webkit-backdrop-filter: blur(10px) saturate(130%);\n  backdrop-filter: blur(10px) saturate(130%);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n/* --------------------------------------------------------------------------\n * 14. Preset 13: `gazette` — 铅字晨报 / Gazette\n *     - Warm newsprint base (`#f6f3ec`), `#ede8dd` layer, `#faf8f3` card, `#161514` ink\n *     - `4px double #161514` masthead border on `.pageHeader` / `.dsh-header`\n *     - Crisp `1px solid #161514` column rules, `0px–2px` editorial corners\n *     - `#9b1c1c` crimson seal/editorial accent & high-contrast ink buttons\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"gazette\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) {\n  color-scheme: light;\n  accent-color: #9b1c1c;\n  --dsw-alias-bg-base: #f6f3ec;\n  --dsw-alias-bg-layer-1: #ede8dd;\n  --dsw-alias-bg-layer-2: #e3dccd;\n  --dsw-alias-bg-layer-3: #d6cebc;\n  --dsw-alias-bg-overlay: #faf8f3;\n  --dsw-alias-bg-module-platform: #ebe5d8;\n  --dsw-alias-settings-card-fill: #faf8f3;\n  --dsw-alias-settings-card-stroke: #161514;\n  --dsw-specific-menu: #faf8f3;\n  --dsw-alias-border-l1: #cec6b6;\n  --dsw-alias-border-l2: #161514;\n  --dsw-alias-border-l3: #161514;\n  --dsw-alias-border-l4: #161514;\n  --dsw-alias-label-primary: #161514;\n  --dsw-alias-label-secondary: #43403c;\n  --dsw-alias-label-tertiary: #635f59;\n  --dsw-alias-label-dimmed: #827d75;\n  --dsw-alias-brand-primary: #9b1c1c;\n  --dsw-alias-brand-text: #161514;\n  --dsw-alias-state-business-primary: #9b1c1c;\n  --dsw-alias-state-business-tertiary: rgba(155, 28, 28, 0.12);\n  --dsw-alias-link: #9b1c1c;\n  --dsw-alias-button-primary-fill: #161514;\n  --dsw-alias-button-primary-hover: #2d2b28;\n  --dsw-alias-button-primary-ink: #faf8f3;\n  --dsw-alias-interactive-bg-hover: rgba(22, 21, 20, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(155, 28, 28, 0.11);\n  --dsw-alias-interactive-bg-hover-accent: rgba(155, 28, 28, 0.10);\n  --dsw-alias-interactive-bg-hover-danger: rgba(155, 28, 28, 0.14);\n  --dsw-alias-state-error-primary: #9b1c1c;\n  --dsw-alias-state-warn-primary: #9a5b08;\n  --dsw-alias-state-warn-label: #6e3f04;\n  --dsw-alias-state-warn-tertiary: #f6ead2;\n  --dsw-alias-state-success-primary: #1f5c3a;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 1px;\n  --dsw-radius-md: 2px;\n  --dsw-radius-lg: 2px;\n  --dsw-radius-xl: 2px;\n  --dsw-elevation-panel: 0 1px 0 #161514, 0 0 0 1px #161514;\n  --dsw-elevation-prominent: 3px 3px 0 #161514, 0 0 0 1px #161514;\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 0 #161514;\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: 2px 2px 0 #161514;\n  --dsh-surface-spotlight: rgba(155, 28, 28, 0.06);\n  --dsh-font-display: Garamond, Georgia, \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"Courier New\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"gazette\"] {\n  background-color: #f6f3ec;\n}\n\n/* Broadsheet 4px double masthead border */\n[data-dsh-style=\"gazette\"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: #faf8f3;\n  border-block-end: 4px double #161514;\n}\n\n/* Crisp 1px solid #161514 column rules & editorial cards */\n[data-dsh-style=\"gazette\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  background: #faf8f3;\n  border: 1px solid #161514;\n  border-radius: 2px;\n  box-shadow: none;\n}\n\n[data-dsh-style=\"gazette\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px solid #161514;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-split-leading {\n  border-inline-end: 1px solid #161514;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-split-resizer::before {\n  background: #161514;\n}\n\n/* 0px–2px editorial corners, crimson seal accent & high-contrast ink buttons */\n[data-dsh-style=\"gazette\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 1px solid #161514;\n  border-radius: 1px;\n}\n\n[data-dsh-style=\"gazette\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {\n  background: #161514;\n  color: #faf8f3;\n  border-color: #161514;\n}\n\n[data-dsh-style=\"gazette\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary):hover:not(:disabled) {\n  background: #9b1c1c;\n  border-color: #9b1c1c;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-header-badge {\n  background: #9b1c1c;\n  color: #faf8f3;\n  border-radius: 1px;\n}\n\n[data-dsh-style=\"gazette\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"gazette\"] .dsh-tab-indicator {\n  border-block-end-color: #9b1c1c;\n  border-block-end-width: 2.5px;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) {\n  border: 1px solid #161514 !important;\n  border-radius: 2px !important;\n}\n\n/* --------------------------------------------------------------------------\n * 14b. Independent `[data-dsh-font]` Overrides & Dual-Layer Typography Rules\n *      When `data-dsh-font=\"auto\"` (or unset), each `[data-dsh-style]` uses its\n *      own Windows-verified Chinese + Latin signature font stack.\n * -------------------------------------------------------------------------- */\n:root[data-dsh-font=\"songkai\"] [data-dsh-style],\n:root[data-dsh-font=\"songkai\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"songkai\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"songkai\"],\n[data-dsh-portal-synced][data-dsh-font=\"songkai\"] {\n  --dsh-font-display: \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", \"SimSun\", \"宋体\", serif;\n  --dsh-font-body: \"Palatino Linotype\", \"STKaiti\", \"华文楷体\", \"KaiTi\", \"楷体\", \"Noto Serif SC\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"STFangsong\", \"华文仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.04em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"fangsong\"] [data-dsh-style],\n:root[data-dsh-font=\"fangsong\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"fangsong\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"fangsong\"],\n[data-dsh-portal-synced][data-dsh-font=\"fangsong\"] {\n  --dsh-font-display: \"Cascadia Mono SemiBold\", \"Cascadia Mono\", \"STZhongsong\", \"华文中宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-body: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.02em;\n  --dsh-body-tracking: 0.02em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"poster\"] [data-dsh-style],\n:root[data-dsh-font=\"poster\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"poster\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"poster\"],\n[data-dsh-portal-synced][data-dsh-font=\"poster\"] {\n  --dsh-font-display: Impact, \"Arial Black\", \"Noto Sans SC Black\", \"SimHei\", \"黑体\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC Medium\", \"Noto Sans SC\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 900;\n  --dsh-display-tracking: -0.02em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"retro98\"] [data-dsh-style],\n:root[data-dsh-font=\"retro98\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"retro98\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"retro98\"],\n[data-dsh-portal-synced][data-dsh-font=\"retro98\"] {\n  --dsh-font-display: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-body: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-mono: \"Fixedsys\", Consolas, \"Courier New\", \"SimSun\", \"宋体\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"serif\"] [data-dsh-style],\n:root[data-dsh-font=\"serif\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"serif\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"serif\"],\n[data-dsh-portal-synced][data-dsh-font=\"serif\"] {\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"arcade\"] [data-dsh-style],\n:root[data-dsh-font=\"arcade\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"arcade\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"arcade\"],\n[data-dsh-portal-synced][data-dsh-font=\"arcade\"] {\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"modern\"] [data-dsh-style],\n:root[data-dsh-font=\"modern\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"modern\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"modern\"],\n[data-dsh-portal-synced][data-dsh-font=\"modern\"] {\n  --dsh-font-display: \"Source Sans 3\", \"Segoe UI\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Segoe UI\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Dual-layer body typography application (workbench + form controls + portaled menus/modals) */\n:where([data-dsh-style], [data-dsh-portal-synced]),\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(button, input, select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(button, input, select, textarea) {\n  font-family: var(--dsh-font-body);\n  letter-spacing: var(--dsh-body-tracking, normal);\n}\n\n/* Dual-layer display typography application (headings, tabs, header title, editorial titles) */\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(\n  h1,\n  h2,\n  h3,\n  [role=\"tab\"],\n  .dsh-header-title,\n  [data-dsh-serif],\n  [data-dsh-editorial-heading],\n  [data-dsh-card] :is(h2, h3, .dsh-card-title),\n  .dsh-card :is(h2, h3, .dsh-card-title),\n  [data-dsh-reader] :is(h1, h2),\n  .dsh-reader :is(h1, h2)\n),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(h1, h2, h3, header h2, [role=\"tab\"], [data-dsh-serif]) {\n  font-family: var(--dsh-font-display);\n  font-weight: var(--dsh-display-weight, 700);\n  letter-spacing: var(--dsh-display-tracking, normal);\n}\n\n/* Monospace code typography */\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(code, pre, kbd, samp),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(code, pre, kbd, samp) {\n  font-family: var(--dsh-font-mono);\n}\n\n/* --------------------------------------------------------------------------\n * 11. Interactive Dynamics: Tactile Button Physics & Active States\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n  /* Identity transforms prevent mid-interaction stacking-context shifts */\n  translate: 0px 0px;\n  scale: 1;\n  transition-property: background-color, border-color, color, box-shadow, opacity, translate, scale;\n  transition-duration: var(--dsh-motion-fast);\n  transition-timing-function: var(--dsh-ease-out);\n}\n\n/* Visible active style on open menu triggers */\n:where([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  @media (hover: hover) {\n    :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: 0px -0.5px;\n    }\n\n    [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 3px 3px 0px #1e2826;\n      transition-timing-function: steps(2, end);\n      transition-duration: 70ms;\n    }\n\n    [data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 4px 4px 0px #2563eb;\n    }\n  }\n\n  /* Tactile spring press on standard themes */\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    scale: 0.965;\n    translate: 0px 0.5px;\n    transition-duration: 80ms;\n  }\n\n  /* Stepped 8-Bit arcade press (`translate(1px, 1px)` + crisp 1px pixel shadow) */\n  [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 1px 1px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #1e2826 !important;\n    transition-timing-function: steps(2, end);\n    transition-duration: 50ms;\n  }\n\n  /* Risograph shadow-collapse button press (`translate(2px, 2px)`) */\n  [data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 2px 2px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #18181b !important;\n    transition-duration: 60ms;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 12. Small-Button SVG Icon Micro-Animations\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n  translate: 0px 0px;\n  rotate: 0deg;\n  scale: 1;\n  transform-origin: center;\n}\n\n@keyframes dsh-icon-spin {\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes dsh-icon-wiggle {\n  0% { rotate: 0deg; }\n  25% { rotate: -12deg; }\n  55% { rotate: 10deg; }\n  80% { rotate: -5deg; }\n  100% { rotate: 0deg; }\n}\n\n@keyframes dsh-icon-pop {\n  0% { scale: 1; }\n  45% { scale: 1.26; }\n  75% { scale: 0.94; }\n  100% { scale: 1; }\n}\n\n@keyframes dsh-icon-bounce {\n  0%, 100% { translate: 0px 0px; }\n  45% { translate: 0px 2.5px; }\n  75% { translate: 0px -1px; }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n    transition:\n      translate var(--dsh-motion-base) var(--dsh-ease-spring),\n      rotate 240ms var(--dsh-ease-spring),\n      scale var(--dsh-motion-base) var(--dsh-ease-spring);\n  }\n\n  /* 1) `down` / chevron: 180deg flip on `[aria-expanded=\"true\"]` or `details[open]` */\n  :where([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"], details[open] > summary) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n    rotate: 180deg;\n  }\n\n  /* 2) `refresh` / `sync`: smooth 180deg spin on hover, continuous spin when busy */\n  :where([data-dsh-style]) :where(button, [role=\"button\"])[aria-busy=\"true\"] :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"]),\n  :where([data-dsh-style]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-icon=\"refresh\"])[data-spinning=\"true\"] {\n    animation: dsh-icon-spin 0.85s linear infinite;\n  }\n\n  @media (hover: hover) {\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-dsh-icon=\"reload\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"], svg[data-icon=\"reload\"]) {\n      rotate: 180deg;\n    }\n\n    /* 3) `plus` / `close`: crisp 90deg turn */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"plus\"], svg[data-dsh-icon=\"add\"], svg[data-dsh-icon=\"close\"], svg[data-dsh-icon=\"x\"], svg[data-icon=\"plus\"], svg[data-icon=\"add\"], svg[data-icon=\"close\"], svg[data-icon=\"x\"]) {\n      rotate: 90deg;\n    }\n\n    /* 4) `send` / `external` / `link`: forward/diagonal glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], a):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"send\"], svg[data-dsh-icon=\"external\"], svg[data-dsh-icon=\"link\"], svg[data-icon=\"send\"], svg[data-icon=\"external\"], svg[data-icon=\"link\"]) {\n      translate: 2px -1.5px;\n    }\n\n    /* 5) `reply` / `left` / `undo`: leading glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"reply\"], svg[data-dsh-icon=\"left\"], svg[data-dsh-icon=\"undo\"], svg[data-icon=\"reply\"], svg[data-icon=\"left\"], svg[data-icon=\"undo\"]) {\n      translate: -2px 0px;\n    }\n\n    /* 6) `right` / `play`: trailing nudge & pulse */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"right\"], svg[data-icon=\"right\"]) {\n      translate: 2px 0px;\n    }\n\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"play\"], svg[data-icon=\"play\"]) {\n      translate: 1.5px 0px;\n      scale: 1.14;\n    }\n\n    /* 7) `trash` / `delete`: tactile warning wiggle */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"trash\"], svg[data-dsh-icon=\"delete\"], svg[data-icon=\"trash\"], svg[data-icon=\"delete\"]) {\n      animation: dsh-icon-wiggle 360ms var(--dsh-ease-in-out);\n    }\n\n    /* 8) `star` / `check` / `copy` / `bookmark`: spring pop */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-dsh-icon=\"bookmark\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"], svg[data-icon=\"bookmark\"]) {\n      scale: 1.18;\n    }\n\n    /* 9) `download` / `export`: vertical bounce */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"download\"], svg[data-dsh-icon=\"export\"], svg[data-icon=\"download\"], svg[data-icon=\"export\"]) {\n      animation: dsh-icon-bounce 420ms var(--dsh-ease-out);\n    }\n\n    /* 10) `palette` / `sparkles` / `edit`: playful tilt */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"palette\"], svg[data-dsh-icon=\"sparkles\"], svg[data-dsh-icon=\"edit\"], svg[data-icon=\"palette\"], svg[data-icon=\"sparkles\"], svg[data-icon=\"edit\"]) {\n      rotate: -12deg;\n      scale: 1.08;\n    }\n\n    /* Closed chevron gentle downward cue on hover */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"])[aria-expanded=\"false\"]:hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n      translate: 0px 1.5px;\n    }\n  }\n\n  /* Pop feedback when toggled into active/pressed/checked state */\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where([aria-pressed=\"true\"], [aria-checked=\"true\"], [data-active=\"true\"], [data-copied=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"]) {\n    animation: dsh-icon-pop 300ms var(--dsh-ease-spring);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 13. v3 Layout Primitives: Unified 48px Single-Row Header\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  min-height: 48px;\n  padding: 6px 14px;\n  flex: none;\n  min-width: 0;\n  background: var(--dsw-alias-bg-base);\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n}\n\n.dsh-header-leading {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.dsh-header-brand {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n  flex: none;\n  white-space: nowrap;\n}\n\n.dsh-header-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  width: 24px;\n  height: 24px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-button-primary-fill, #4176e6);\n  color: var(--dsw-alias-button-primary-ink, #ffffff);\n}\n\n.dsh-header-title {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: var(--dsh-display-weight, 650);\n  line-height: 1.25;\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n}\n\n.dsh-header-tabs {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.dsh-header-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: none;\n  white-space: nowrap;\n}\n\n@container (max-width: 759px) {\n  :where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {\n    flex-wrap: wrap;\n    padding-block: 6px;\n  }\n\n  .dsh-header-leading {\n    flex-wrap: wrap;\n    gap: 6px 10px;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 14. v3 Tabs: Sliding Indicator + 140ms `@starting-style` Panel Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where([role=\"tablist\"], .dsh-tablist) {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  min-width: 0;\n  overflow-x: auto;\n  scrollbar-width: thin;\n}\n\n:where([data-dsh-style]) [role=\"tab\"] {\n  position: relative;\n  flex: none;\n  white-space: nowrap;\n}\n\n/* Static fallback underline when sliding indicator is not active (or in forced-colors) */\n:where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  content: \"\";\n  position: absolute;\n  inset-inline: 6px;\n  inset-block-end: 0;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  pointer-events: none;\n}\n\n[data-dsh-style] :where([data-dsh-tablist][data-indicator-ready=\"true\"], .dsh-tablist[data-indicator-ready=\"true\"]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  opacity: 0;\n}\n\n.dsh-tab-indicator {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-end: 0;\n  height: 2px;\n  width: var(--dsh-tab-w, 0px);\n  translate: var(--dsh-tab-x, 0px) 0px;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  border-radius: 2px 2px 0 0;\n  pointer-events: none;\n  opacity: 0;\n  transition:\n    translate 180ms var(--dsh-ease-out),\n    width 180ms var(--dsh-ease-out),\n    opacity 120ms ease-out;\n}\n\n[data-indicator-ready=\"true\"] > .dsh-tab-indicator {\n  opacity: 1;\n}\n\n.dsh-tablist-pill > .dsh-tab-indicator {\n  inset-block: 3px;\n  height: auto;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-interactive-bg-active);\n  z-index: 0;\n}\n\n.dsh-tablist-pill > [role=\"tab\"] {\n  z-index: 1;\n}\n\n[data-dsh-style=\"eink\"] .dsh-tab-indicator {\n  transition-duration: 60ms;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-tab-indicator {\n  border-radius: 0px !important;\n  transition-timing-function: steps(4, end);\n}\n\n/* 140ms `@starting-style` + keyframe fade-in for active tab panels */\n@keyframes dsh-tab-panel-enter {\n  from {\n    opacity: 0;\n    translate: 0px 4px;\n  }\n  to {\n    opacity: 1;\n    translate: 0px 0px;\n  }\n}\n\n:where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {\n  opacity: 1;\n  translate: 0px 0px;\n  transition:\n    opacity 140ms var(--dsh-ease-out),\n    translate 140ms var(--dsh-ease-out);\n  animation: dsh-tab-panel-enter 140ms var(--dsh-ease-out);\n}\n\n@starting-style {\n  :where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {\n    opacity: 0;\n    translate: 0px 4px;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 15. v3 Resizable Split Pane (`.dsh-split-pane` + `.dsh-split-resizer`)\n *     - Pointer-capture drag + double-click reset + ArrowLeft/ArrowRight\n *     - Auto-stack fallback below 760px container/viewport width\n * -------------------------------------------------------------------------- */\n.dsh-split-pane {\n  display: flex;\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n  width: 100%;\n}\n\n.dsh-split-leading {\n  flex: none;\n  min-width: 0;\n  min-height: 0;\n  width: var(--dsh-split-size, 320px);\n}\n\n.dsh-split-trailing {\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n}\n\n.dsh-split-resizer {\n  position: relative;\n  flex: none;\n  width: 9px;\n  min-height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: col-resize;\n  touch-action: none;\n  user-select: none;\n  background: transparent;\n  outline: none;\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"] {\n  width: 100%;\n  height: 9px;\n  min-height: 9px;\n  cursor: row-resize;\n}\n\n.dsh-split-resizer::before {\n  content: \"\";\n  width: 1px;\n  height: 100%;\n  background: var(--dsw-alias-border-l2);\n  transition:\n    width 120ms var(--dsh-ease-out),\n    background-color 120ms var(--dsh-ease-out);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]::before {\n  width: 100%;\n  height: 1px;\n}\n\n.dsh-split-resizer::after {\n  content: \"\";\n  position: absolute;\n  width: 3px;\n  height: 28px;\n  border-radius: 999px;\n  background: var(--dsw-alias-border-l3);\n  opacity: 0;\n  transition:\n    opacity 120ms var(--dsh-ease-out),\n    background-color 120ms var(--dsh-ease-out);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]::after {\n  width: 28px;\n  height: 3px;\n}\n\n.dsh-split-resizer:hover::before,\n.dsh-split-resizer:focus-visible::before,\n.dsh-split-resizer[data-dragging=\"true\"]::before {\n  width: 2px;\n  background: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]:is(:hover, :focus-visible, [data-dragging=\"true\"])::before {\n  width: 100%;\n  height: 2px;\n}\n\n.dsh-split-resizer:is(:hover, :focus-visible, [data-dragging=\"true\"])::after {\n  opacity: 1;\n  background: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-split-resizer:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary);\n  outline-offset: -2px;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-split-resizer::before {\n  width: 2px;\n  background: #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-split-resizer::after {\n  border-radius: 0px;\n}\n\n@container (max-width: 759px) {\n  .dsh-split-pane {\n    flex-direction: column;\n    overflow-y: auto;\n  }\n\n  .dsh-split-leading {\n    width: 100% !important;\n    max-width: 100%;\n    flex: none;\n  }\n\n  .dsh-split-resizer {\n    display: none;\n  }\n}\n\n@media (max-width: 759px) {\n  .dsh-split-pane {\n    flex-direction: column;\n    overflow-y: auto;\n  }\n\n  .dsh-split-leading {\n    width: 100% !important;\n    max-width: 100%;\n    flex: none;\n  }\n\n  .dsh-split-resizer {\n    display: none;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 16. v3 Theme-Tinted Shimmer Skeleton & Pixel Progress Helpers\n * -------------------------------------------------------------------------- */\n@keyframes dsh-skeleton-shimmer {\n  0% { background-position: 100% 0; }\n  100% { background-position: -100% 0; }\n}\n\n.dsh-skeleton-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n}\n\n.dsh-skeleton {\n  display: block;\n  width: 100%;\n  height: 12px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background-color: var(--dsw-alias-bg-layer-2, #e5e7eb);\n  background-image: linear-gradient(\n    90deg,\n    var(--dsw-alias-bg-layer-2, #e5e7eb) 0%,\n    color-mix(in oklab, var(--dsw-alias-bg-overlay, #ffffff) 82%, var(--dsw-alias-state-business-primary, #4176e6) 18%) 48%,\n    var(--dsw-alias-bg-layer-2, #e5e7eb) 100%\n  );\n  background-size: 220% 100%;\n  background-position: 100% 0;\n}\n\n.dsh-skeleton-circle {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex: none;\n}\n\n.dsh-skeleton-card {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px 14px;\n  border-radius: var(--dsw-radius-md, 12px);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n}\n\n.dsh-skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"eink\"])) .dsh-skeleton[data-animated=\"true\"] {\n    animation: dsh-skeleton-shimmer 1.35s var(--dsh-ease-in-out) infinite;\n  }\n\n  [data-dsh-style=\"pixel8bit\"] .dsh-skeleton[data-animated=\"true\"] {\n    border-radius: 0px !important;\n    border: 1px solid #1e2826;\n    animation-timing-function: steps(4, end);\n  }\n}\n\n[data-dsh-style=\"eink\"] .dsh-skeleton {\n  background-image: none;\n  border: 1px solid #c5c2b8;\n}\n\n/* Stepped pixel progress helper */\n.dsh-progress {\n  position: relative;\n  width: 100%;\n  height: 6px;\n  overflow: clip;\n  border-radius: 999px;\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.dsh-progress-bar {\n  height: 100%;\n  width: var(--dsh-progress-value, 0%);\n  border-radius: inherit;\n  background: var(--dsw-alias-state-business-primary);\n  transition: width 200ms var(--dsh-ease-out);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-progress {\n  height: 10px;\n  border-radius: 0px !important;\n  border: 2px solid #1e2826;\n  background: var(--dsw-alias-bg-layer-1);\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-progress-bar {\n  border-radius: 0px !important;\n  background: repeating-linear-gradient(\n    90deg,\n    #2e7d5b 0px,\n    #2e7d5b 6px,\n    #24674a 6px,\n    #24674a 8px\n  );\n  transition-timing-function: steps(8, end);\n}\n\n/* --------------------------------------------------------------------------\n * 17. v3 Interactive Cards, Rows, Quick-Action Bar & Top-Layer Dialog Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where([data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: 0px 0px;\n  transition:\n    background-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    border-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    box-shadow var(--dsh-motion-base) var(--dsh-ease-out),\n    translate var(--dsh-motion-base) var(--dsh-ease-out);\n}\n\n/* Row Hover Quick-Action Bar (`.dsh-row-actions`) */\n.dsh-row-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex: none;\n  translate: 0px 0px;\n  transition:\n    opacity var(--dsh-motion-fast) var(--dsh-ease-out),\n    translate var(--dsh-motion-fast) var(--dsh-ease-out);\n}\n\n@media (hover: hover) {\n  :where([data-dsh-row], .dsh-row) .dsh-row-actions:not([data-always-visible=\"true\"]) {\n    opacity: 0;\n    translate: 4px 0px;\n    pointer-events: none;\n  }\n\n  :where([data-dsh-row], .dsh-row):is(:hover, :focus-within, [data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-row-actions {\n    opacity: 1;\n    translate: 0px 0px;\n    pointer-events: auto;\n  }\n}\n\n@media (hover: hover) and (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"win98\"]):not([data-dsh-style=\"risograph\"])) :where([data-dsh-card], .dsh-card):hover {\n    translate: 0px -1.5px;\n    box-shadow: var(--dsh-card-hover-shadow);\n  }\n\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 4px 4px 0px #1e2826;\n  }\n\n  [data-dsh-style=\"risograph\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 5px 5px 0px #ff3e7f;\n  }\n\n  :where([data-dsh-style]) :where([data-dsh-row], .dsh-row):hover:not([data-selected=\"true\"]):not([aria-selected=\"true\"]):not([data-active=\"true\"]) {\n    background-color: var(--dsh-surface-spotlight, var(--dsw-alias-interactive-bg-hover));\n  }\n}\n\n/* Modal / Dialog & Popover Top-Layer Entrance + Scroll Containment */\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n  overscroll-behavior: contain;\n  opacity: 1;\n  transition-property: opacity, scale, translate, display, overlay;\n  transition-duration: var(--dsh-motion-dialog);\n  transition-timing-function: var(--dsh-ease-out);\n  /* Separate declaration after transition so older parsers never drop transitions */\n  transition-behavior: allow-discrete;\n}\n\n@starting-style {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: 1;\n    translate: 0px 0px;\n  }\n\n  @starting-style {\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n      scale: 0.965;\n      translate: 0px 6px;\n    }\n  }\n}\n\ndialog[open]::backdrop {\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n\n/* --------------------------------------------------------------------------\n * 18. v3 Calm Compact Update Strip (`[data-plugin-update-footer]`)\n *     Keeps `@stardustlc/dsh-updates` footer compact at bottom without\n *     crushing or cutting off `flex: 1` split-pane columns.\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) [data-plugin-update-footer] {\n  flex: none;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 32px;\n  margin: 0;\n  padding: 6px 14px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px 12px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n}\n\n:where([data-dsh-style]) [data-plugin-update-footer] :where(button, a) {\n  min-height: 24px;\n  font-size: 11.5px;\n}\n\n:where([data-dsh-style]) [data-show-updates=\"false\"] [data-plugin-update-footer] {\n  display: none;\n}\n\n/* --------------------------------------------------------------------------\n * 19. Unified Header Style & Font Switcher Chrome (`.dsh-style-switcher`)\n * -------------------------------------------------------------------------- */\n.dsh-style-switcher {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  flex: none;\n  white-space: nowrap;\n}\n\n.dsh-style-trigger.dsh-style-trigger,\n.dsh-font-trigger.dsh-font-trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 28px;\n  height: 28px;\n  padding-inline: 8px;\n  width: auto;\n  flex-shrink: 0;\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 500;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-sm, 8px);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.dsh-font-trigger.dsh-font-trigger {\n  gap: 5px;\n  padding-inline: 7px;\n}\n\n.dsh-font-glyph {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  min-width: 16px;\n  height: 16px;\n  padding-inline: 3px;\n  border-radius: var(--dsw-radius-xs, 4px);\n  background: var(--dsw-alias-state-business-tertiary, rgba(65, 118, 230, 0.12));\n  color: var(--dsw-alias-state-business-primary, var(--dsw-alias-label-primary));\n  font-family: var(--dsh-font-display);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.dsh-style-label,\n.dsh-font-label {\n  white-space: nowrap;\n  line-height: 1;\n}\n\n@media (hover: hover) {\n  .dsh-style-trigger.dsh-style-trigger:hover:not(:disabled),\n  .dsh-font-trigger.dsh-font-trigger:hover:not(:disabled) {\n    color: var(--dsw-alias-label-primary);\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.dsh-style-swatch {\n  display: inline-block;\n  flex: none;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  corner-shape: round;\n  background: var(--dsh-swatch-color, var(--dsw-alias-state-business-primary));\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-style-swatch {\n  border-radius: 0px !important;\n  corner-shape: square;\n  box-shadow: 1px 1px 0px #1e2826;\n}\n\n.dsh-style-fallback-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsh-style-fallback-menu {\n  position: absolute;\n  inset-block-start: calc(100% + 4px);\n  inset-inline-end: 0;\n  z-index: 2147483001;\n  display: grid;\n  gap: 2px;\n  min-width: 186px;\n  max-height: min(420px, 70dvh);\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 4px;\n  background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base));\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-md, 12px);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n.dsh-style-fallback-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  min-height: 28px;\n  padding: 4px 8px;\n  border: 0;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  font-size: 12px;\n  text-align: start;\n  cursor: pointer;\n}\n\n.dsh-style-fallback-item-leading {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n}\n\n.dsh-style-fallback-item[aria-checked=\"true\"] {\n  background: var(--dsw-alias-interactive-bg-active);\n  font-weight: 600;\n}\n\n@media (hover: hover) {\n  .dsh-style-fallback-item:hover:not(:disabled) {\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n/* Fallback Modal & Menu Chrome (when host `@deepseek-ai/dsh-client-ui-primitives` is absent) */\n.dsh-fallback-modal-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  display: grid;\n  place-items: center;\n  padding: 16px;\n}\n\n.dsh-fallback-modal-mask {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.36);\n}\n\n.dsh-fallback-modal-dialog {\n  position: relative;\n  z-index: 1;\n  max-width: min(560px, calc(100dvw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: clip;\n  display: flex;\n  flex-direction: column;\n  border-radius: var(--dsw-radius-md, 12px);\n  background: var(--dsw-alias-bg-layer-1, #f8fafc);\n  color: var(--dsw-alias-label-primary, #1f232b);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n/* --------------------------------------------------------------------------\n * 20. Accessibility: Reduced Motion & Windows High Contrast (Forced Colors)\n * -------------------------------------------------------------------------- */\n@media (prefers-reduced-motion: reduce) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row, .dsh-row-actions, .dsh-tab-panel, [data-dsh-tab-panel]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n    translate: none !important;\n    scale: none !important;\n    animation: none !important;\n    transition-property: background-color, border-color, color, opacity;\n    transition-duration: 90ms;\n  }\n\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], summary) svg,\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row)::before,\n  [data-dsh-style=\"pixel8bit\"] .dsh-pixel-cursor {\n    animation: none !important;\n    transition: none !important;\n    translate: none !important;\n    scale: none !important;\n  }\n\n  .dsh-tab-indicator {\n    transition-property: opacity;\n    transition-duration: 90ms;\n  }\n\n  .dsh-skeleton {\n    animation: none !important;\n    background-image: none;\n  }\n\n  /* Short, non-spatial fade only for top-layer dialogs under reduced motion */\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: none !important;\n    translate: none !important;\n    transition-duration: 100ms;\n  }\n}\n\n@media (forced-colors: active) {\n  :where([data-dsh-style]) :where(button, input, select, textarea, [data-dsh-card], .dsh-card),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], :has([data-dsh-style])) {\n    border: 1px solid ButtonText;\n  }\n\n  :where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n    opacity: 1 !important;\n    border-block-end: 3px solid Highlight;\n  }\n\n  .dsh-tab-indicator {\n    background: transparent !important;\n    border-block-end: 3px solid Highlight;\n  }\n\n  .dsh-split-resizer::before,\n  .dsh-split-resizer::after {\n    background: ButtonText;\n  }\n\n  .dsh-skeleton {\n    border: 1px solid GrayText;\n    background: Canvas;\n  }\n}\n\n.cite-workbench.dshw {\n  --cite-base: var(--dsw-alias-bg-base, #ffffff);\n  --cite-layer: var(--dsw-alias-bg-layer-1, #f7f9fc);\n  --cite-control: var(--dsw-alias-bg-layer-2, #eef2f7);\n  --cite-ink: var(--dsw-alias-label-primary, #1b2230);\n  --cite-secondary: var(--dsw-alias-label-secondary, #5b667a);\n  --cite-line: var(--dsw-alias-border-l2, #e2e7f0);\n  --cite-subtle-line: var(--dsw-alias-border-l1, #ebf0f6);\n  --cite-accent: var(--dsw-alias-state-business-primary, #4176e6);\n  --cite-hover: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.045));\n  --cite-active: var(--dsw-alias-interactive-bg-active, rgba(65, 118, 230, 0.11));\n  --cite-primary: var(--dsw-alias-button-primary-fill, #4176e6);\n  --cite-on-primary: var(--dsw-alias-button-primary-ink, #ffffff);\n  --cite-mono: var(--dsh-font-mono, var(--ds-font-family-code, ui-monospace, SFMono-Regular, Consolas, monospace));\n  --cite-radius-sm: var(--dsw-radius-sm, 8px);\n  --cite-radius-md: var(--dsw-radius-md, 12px);\n  container: cite-workbench / inline-size;\n  inline-size: 100%;\n  min-inline-size: 0;\n  min-block-size: 0;\n  box-sizing: border-box;\n  font-family: var(--dsh-font-body, inherit);\n  font-size: 13px;\n  line-height: 1.5;\n  color: var(--cite-ink);\n  background: var(--cite-base);\n}\n\n.cite-workbench[data-main=\"true\"] {\n  block-size: 100%;\n  padding-block-start: var(--dsh-frame-top-clearance, 0px);\n  padding-inline-start: var(--dsh-frame-leading-clearance, 0px);\n}\n\n.cite-workbench[data-main=\"false\"] {\n  block-size: min(680px, 76dvh);\n  min-block-size: 320px;\n  padding: 0;\n}\n\n.cite-workbench * {\n  box-sizing: border-box;\n}\n\n.cite-workbench .cite-shell {\n  display: flex;\n  flex-direction: column;\n  block-size: 100%;\n  min-block-size: 0;\n  background: transparent;\n}\n\n.cite-workbench[data-main=\"false\"] .cite-shell {\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  overflow: clip;\n}\n\n.cite-workbench .cite-header {\n  min-block-size: 48px;\n}\n\n.cite-workbench .cite-brand {\n  margin: 0;\n  font-size: 13.5px;\n  line-height: 1.25;\n  font-weight: 650;\n  white-space: nowrap;\n}\n\n.cite-workbench .cite-brand-icon {\n  display: grid;\n  place-items: center;\n  inline-size: 24px;\n  block-size: 24px;\n  border-radius: var(--dsw-radius-xs, 7px);\n  color: var(--cite-on-primary);\n  background: var(--cite-primary);\n}\n\n.cite-workbench .cite-header-actions {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  gap: 6px;\n  margin: 0;\n}\n\n.cite-workbench .w-tabs-layout {\n  display: contents;\n}\n\n.cite-workbench .w-tabs {\n  position: relative;\n  flex-wrap: nowrap;\n  max-inline-size: 100%;\n  gap: 2px;\n  margin: 0;\n  padding: 3px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  border-radius: calc(var(--cite-radius-sm) + 2px);\n  background: var(--cite-control);\n}\n\n.cite-workbench .w-tabs > button {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  min-inline-size: 0;\n  min-block-size: 28px;\n  border: 0;\n  border-radius: var(--cite-radius-sm);\n  padding: 4px 11px;\n  color: var(--cite-secondary);\n  font-size: 12px;\n  line-height: 1.3;\n  font-weight: 500;\n  white-space: nowrap;\n}\n\n.cite-workbench .w-tabs > button[aria-selected=\"true\"] {\n  color: var(--cite-ink);\n  background: var(--cite-base);\n  box-shadow: var(--dsw-elevation-soft, 0 1px 3px rgba(15, 23, 42, 0.08));\n  font-weight: 600;\n}\n\n.cite-workbench .w-tabs[data-indicator-ready=\"true\"] > button[aria-selected=\"true\"] {\n  background: transparent;\n  box-shadow: none;\n}\n\n.cite-workbench .w-tabs > .dsh-tab-indicator {\n  inset-block: 3px;\n  height: auto;\n  border-radius: var(--cite-radius-sm);\n  background: var(--cite-base);\n  box-shadow: var(--dsw-elevation-soft, 0 1px 3px rgba(15, 23, 42, 0.08));\n}\n\n.cite-workbench[data-dsh-style=\"cream\"] .w-tabs > .dsh-tab-indicator {\n  background: rgba(158, 88, 41, 0.11);\n  box-shadow: inset 0 2px 0 rgba(158, 88, 41, 0.22);\n}\n\n.cite-workbench[data-dsh-style=\"pixel8bit\"] .w-tabs > .dsh-tab-indicator {\n  border-radius: 0px !important;\n  border-block-end: 3px solid #d95b43;\n}\n\n.cite-workbench .w-tabs .w-count {\n  min-inline-size: 0;\n  padding: 0 4px;\n  border-radius: 999px;\n  color: var(--cite-secondary);\n  background: color-mix(in oklab, var(--cite-ink) 7%, transparent);\n  font: 10px/1.45 var(--cite-mono);\n}\n\n.cite-workbench .w-tabs > button[aria-selected=\"true\"] .w-count {\n  color: var(--cite-accent);\n  background: color-mix(in oklab, var(--cite-accent) 14%, transparent);\n}\n\n.cite-workbench .w-tab-panel,\n.cite-workbench .cite-panel-body {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  min-block-size: 0;\n  min-inline-size: 0;\n  overflow: hidden;\n}\n\n.cite-workbench .cite-shell > [data-plugin-update-footer=\"dsh-cite\"] {\n  flex: 0 0 auto;\n}\n\n.cite-workbench :is(button, a, input, select, textarea, summary):focus-visible {\n  outline: 2px solid var(--cite-accent);\n  outline-offset: 2px;\n}\n\n.cite-workbench :is(.cite-reference-button, .cite-filter, .w-tabs > button):focus-visible {\n  outline-offset: -2px;\n}\n\n.cite-workbench .cite-button {\n  flex: 0 0 auto;\n  min-block-size: 30px;\n  padding-inline: 10px;\n  font-size: 12px;\n  line-height: 1.3;\n  border-radius: var(--cite-radius-sm);\n}\n\n.cite-workbench .cite-button-primary {\n  background: var(--cite-primary);\n  border-color: var(--cite-primary);\n  color: var(--cite-on-primary);\n}\n\n.cite-workbench .cite-button-danger {\n  color: var(--dsw-alias-state-error-primary, #b9382c);\n}\n\n.cite-workbench .cite-icon-button {\n  inline-size: 30px;\n  min-inline-size: 30px;\n  padding-inline: 0;\n  justify-content: center;\n}\n\n.cite-workbench .cite-input-wrap {\n  width: 100%;\n  min-width: 0;\n  min-height: 32px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-input-wrap input {\n  min-width: 0;\n  font-size: 12.5px;\n  line-height: 1.5;\n}\n\n.cite-workbench .cite-segmented {\n  width: 100%;\n}\n\n.cite-workbench .cite-checkbox {\n  min-width: 0;\n  color: inherit;\n}\n\n.cite-workbench :is(.cite-actions, .cite-chips) {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  min-inline-size: 0;\n  gap: 5px;\n}\n\n.cite-workbench .cite-chip {\n  display: inline-block;\n  max-inline-size: 100%;\n  padding: 2px 6px;\n  border-radius: var(--dsw-radius-xs, 5px);\n  background: var(--cite-control);\n  color: var(--cite-secondary);\n  font: 10.5px/1.45 var(--cite-mono);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-chip.accent {\n  color: var(--cite-accent);\n  background: var(--dsw-alias-interactive-bg-hover-accent, color-mix(in oklab, var(--cite-accent) 13%, transparent));\n}\n\n.cite-workbench .cite-chip.warn {\n  color: var(--dsw-alias-state-warn-label, #8c4b08);\n  background: var(--dsw-alias-state-warn-tertiary, rgba(180, 83, 9, 0.14));\n}\n\n.cite-workbench .cite-chip.success {\n  color: var(--dsw-alias-state-success-primary, #1f7a4c);\n  background: var(--dsw-alias-state-success-tertiary, rgba(31, 122, 76, 0.12));\n}\n\n.cite-workbench :is(.cite-chip.danger, .cite-error-text) {\n  color: var(--dsw-alias-state-error-primary, #b9382c);\n}\n\n.cite-workbench :is(.cite-muted, .cite-label) {\n  color: var(--cite-secondary);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.cite-workbench :is(.cite-mono, code) {\n  font-family: var(--cite-mono);\n}\n\n.cite-workbench .cite-label {\n  display: block;\n  margin-block: 0 5px;\n  font-size: 11.5px;\n  font-weight: 550;\n}\n\n.cite-workbench .cite-field {\n  display: block;\n  inline-size: 100%;\n  min-block-size: 32px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  padding: 6px 9px;\n  background: var(--cite-base);\n  color: var(--cite-ink);\n  font-size: 12.5px;\n  line-height: 1.5;\n}\n\n.cite-workbench textarea.cite-field {\n  resize: vertical;\n  min-block-size: 108px;\n}\n\n.cite-workbench :is(.cite-picker-wrap, .cite-picker, .cite-picker-button) {\n  inline-size: 100%;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-picker-button {\n  justify-content: space-between;\n  text-align: start;\n  background: var(--cite-base);\n  border-radius: var(--cite-radius-sm);\n}\n\n.cite-workbench :is(input[type=\"checkbox\"], input[type=\"radio\"], progress) {\n  accent-color: var(--cite-accent);\n}\n\n.cite-workbench :is(input[type=\"checkbox\"], input[type=\"radio\"]) {\n  flex: 0 0 auto;\n  inline-size: 15px;\n  block-size: 15px;\n  margin: 0;\n}\n\n.cite-workbench .cite-library {\n  display: flex;\n  flex: 1 1 auto;\n  min-block-size: 0;\n  min-inline-size: 0;\n  inline-size: 100%;\n}\n\n.cite-workbench :is(.cite-rail, .cite-list, .cite-inspector) {\n  min-inline-size: 0;\n  min-block-size: 0;\n}\n\n.cite-workbench .cite-rail {\n  flex: 0 0 auto;\n  inline-size: clamp(168px, 18cqi, 228px);\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 12px 10px;\n  border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-style-box {\n  margin-block-end: 12px;\n  padding: 10px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-filters {\n  display: grid;\n  gap: 3px;\n}\n\n.cite-workbench .cite-filters > h2 {\n  margin: 4px 8px;\n  font-size: 11px;\n  font-weight: 600;\n}\n\n.cite-workbench .cite-filter {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 6px;\n  min-block-size: 32px;\n  padding: 6px 9px;\n  border: 0;\n  border-radius: var(--cite-radius-sm);\n  color: var(--cite-secondary);\n  background: transparent;\n  font: inherit;\n  line-height: 1.35;\n  text-align: start;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-filter[aria-pressed=\"true\"] {\n  color: var(--cite-ink);\n  background: var(--cite-active);\n  font-weight: 600;\n}\n\n.cite-workbench .cite-count {\n  color: var(--cite-secondary);\n  font: 11px/1.45 var(--cite-mono);\n}\n\n.cite-workbench :is(.cite-list, .cite-inspector) {\n  display: flex;\n  flex-direction: column;\n}\n\n.cite-workbench .cite-list {\n  flex: 0 0 auto;\n  inline-size: min(var(--dsh-split-size, 320px), max(220px, calc(100% - 236px - 320px)));\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-inspector {\n  flex: 1 1 auto;\n  min-inline-size: 0;\n  background: var(--cite-base);\n}\n\n.cite-workbench:is([data-dsh-style=\"glass\"], [data-dsh-style=\"claude\"], [data-dsh-style=\"blueprint\"], [data-dsh-style=\"risograph\"], [data-dsh-style=\"songhui\"], [data-dsh-style=\"frutiger\"]) :is(.cite-list, .cite-inspector, .cite-feedback) {\n  background: transparent;\n}\n\n.cite-workbench :is(.cite-searchbar, .cite-inspector-bar, .cite-selection) {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  min-block-size: 44px;\n  padding: 6px 12px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n}\n\n.cite-workbench .cite-searchbar > :first-child {\n  flex: 1 1 auto;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-searchbar input {\n  min-inline-size: 0;\n  font-size: 12px;\n}\n\n.cite-workbench.dshw .cite-searchbar .cite-search input {\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  background: transparent;\n}\n\n.cite-workbench .cite-searchbar input::placeholder {\n  color: var(--dsw-alias-label-tertiary, var(--cite-secondary));\n}\n\n.cite-workbench :is(.cite-inspector-bar, .cite-selection) {\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n\n.cite-workbench .cite-selection {\n  gap: 2px 5px;\n  min-block-size: 0;\n  padding-block: 4px;\n  border-color: var(--cite-subtle-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-selection .cite-button {\n  min-block-size: 26px;\n  padding-inline: 6px;\n  font-size: 11.5px;\n}\n\n.cite-workbench :is(.cite-list-scroll, .cite-inspector-scroll, .cite-subpage) {\n  flex: 1 1 auto;\n  min-block-size: 0;\n  min-inline-size: 0;\n  overflow: auto;\n  overscroll-behavior: contain;\n}\n\n.cite-workbench :is(.cite-list-loading, .cite-inspector-empty) {\n  margin: auto;\n  padding: 28px 18px;\n  color: var(--cite-secondary);\n  text-align: center;\n}\n\n.cite-workbench .cite-skeleton-wrap {\n  display: grid;\n  gap: 10px;\n  margin: 0;\n  padding: 12px;\n  text-align: start;\n}\n\n.cite-workbench .cite-list .w-empty {\n  gap: 9px;\n  min-block-size: 220px;\n  padding: 28px 16px;\n}\n\n.cite-workbench .cite-list .w-empty h2 {\n  font-size: 15px;\n  line-height: 1.4;\n}\n\n.cite-workbench .cite-list .w-empty .w-muted {\n  font-size: 12px;\n}\n\n.cite-workbench :is(.cite-reference-list, .cite-plain-list) {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.cite-workbench .cite-reference-row {\n  position: relative;\n  display: flex;\n  align-items: center;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n}\n\n.cite-workbench[data-dsh-style=\"cream\"] .cite-reference-row {\n  border-block-end: 1px dashed var(--dsw-alias-border-l2);\n}\n\n.cite-workbench .cite-reference-row[data-active=\"true\"] {\n  background: var(--cite-active);\n}\n\n.cite-workbench .cite-reference-row[data-active=\"true\"]::before {\n  content: \"\";\n  position: absolute;\n  inset-block: 6px;\n  inset-inline-start: 0;\n  inline-size: 3px;\n  border-radius: 2px;\n  background: var(--cite-accent);\n  pointer-events: none;\n}\n\n.cite-workbench[data-dsh-style=\"pixel8bit\"] .cite-reference-row[data-active=\"true\"]::before {\n  background: #d95b43;\n  border-radius: 0;\n}\n\n.cite-workbench .cite-reference-check {\n  display: flex;\n  align-self: flex-start;\n  align-items: flex-start;\n  padding: 14px 5px 8px 12px;\n}\n\n.cite-workbench .cite-reference-button {\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n  gap: 3px;\n  min-inline-size: 0;\n  border: 0;\n  padding: 10px 6px 10px 5px;\n  background: transparent;\n  color: var(--cite-ink);\n  font: inherit;\n  text-align: start;\n  cursor: pointer;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-reference-title-line {\n  display: flex;\n  align-items: baseline;\n  gap: 5px;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-row-actions {\n  padding: 6px 8px 6px 2px;\n}\n\n.cite-workbench .cite-detail-title {\n  margin: 0 0 12px;\n  font-size: 18px;\n  line-height: 1.35;\n  font-weight: 650;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-reference-meta {\n  color: var(--cite-secondary);\n  font-size: 11.5px;\n  line-height: 1.45;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.cite-workbench .cite-reference-button .cite-chips {\n  gap: 4px;\n  margin-block-start: 3px;\n}\n\n.cite-workbench .cite-more {\n  margin: 10px 12px;\n}\n\n.cite-workbench .cite-selection-footer {\n  padding: 8px 12px;\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-inspector-bar {\n  padding-inline: 16px;\n}\n\n.cite-workbench .cite-inspector-bar > .cite-chips {\n  max-inline-size: 100%;\n}\n\n.cite-workbench .cite-crossref {\n  color: var(--cite-accent);\n}\n\n.cite-workbench .cite-back {\n  display: none;\n}\n\n.cite-workbench .cite-inspector-scroll {\n  padding: 16px 22px 24px;\n}\n\n.cite-workbench .cite-card {\n  padding: 13px 15px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  background: var(--cite-layer);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-card + .cite-card,\n.cite-workbench .cite-subpage-inner > form + .cite-card {\n  margin-block-start: 12px;\n}\n\n.cite-workbench .cite-card p {\n  margin-block: 0;\n}\n\n.cite-workbench .cite-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px 9px;\n  margin-block-end: 8px;\n}\n\n.cite-workbench .cite-card-header > h3 {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.45;\n  font-weight: 600;\n}\n\n.cite-workbench :is(.cite-formatted, .cite-code),\n.w-dialog .cite-code {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  margin: 0;\n  padding: 10px 12px;\n  border-radius: var(--cite-radius-sm, 8px);\n  background: var(--cite-base, var(--w-bg));\n}\n\n.cite-workbench .cite-formatted {\n  border-inline-start: 3px solid var(--cite-accent);\n  font: inherit;\n  line-height: 1.65;\n}\n\n.cite-workbench .cite-code,\n.w-dialog .cite-code {\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line, var(--w-border));\n  color: var(--cite-secondary, var(--w-muted));\n  font: 11.5px/1.55 var(--cite-mono, ui-monospace, monospace);\n}\n\n.w-dialog .cite-source-entry + .cite-source-entry {\n  margin-block-start: 14px;\n}\n\n.cite-workbench :is(.cite-metadata, .cite-form-grid) {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  align-items: start;\n  gap: 10px 12px;\n  margin: 0;\n}\n\n.cite-workbench .cite-field-wide {\n  grid-column: 1 / -1;\n}\n\n.cite-workbench .cite-metadata dd {\n  margin: 0;\n  min-block-size: 30px;\n  padding: 5px 9px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  background: var(--cite-base);\n  font-size: 12px;\n  white-space: pre-wrap;\n}\n\n.cite-workbench .cite-differences {\n  border: 1px solid var(--dsw-alias-state-warn-primary, var(--cite-line));\n}\n\n.cite-workbench .cite-diff-table {\n  inline-size: 100%;\n  margin-block-start: 8px;\n  border-collapse: collapse;\n  table-layout: fixed;\n  font-size: 12px;\n}\n\n.cite-workbench .cite-diff-table :is(th, td) {\n  padding: 6px 7px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  vertical-align: top;\n  text-align: start;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-diff-table th:first-child {\n  inline-size: 24%;\n}\n\n.cite-workbench .cite-diff-table td:nth-child(2) {\n  background: var(--cite-control);\n}\n\n.cite-workbench .cite-subpage {\n  padding: 22px 20px 36px;\n}\n\n.cite-workbench .cite-subpage-inner {\n  max-inline-size: 840px;\n  margin-inline: auto;\n}\n\n.cite-workbench .cite-subpage h2 {\n  margin: 0 0 4px;\n  font-size: 17px;\n  line-height: 1.45;\n  font-weight: 650;\n}\n\n.cite-workbench .cite-description {\n  margin: 0 0 16px;\n  color: var(--cite-secondary);\n  font-size: 12.5px;\n}\n\n.cite-workbench .cite-card :is(.cite-form-note, .cite-metadata-note, .cite-export-sample) {\n  margin-block-start: 10px;\n}\n\n.cite-workbench .cite-provenance > summary {\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-provenance[open] > summary {\n  margin-block-end: 8px;\n}\n\n.cite-workbench .cite-conflict {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n\n.cite-workbench .cite-plain-list > li {\n  padding-block: 8px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-plain-list > li:last-child {\n  border-block-end: 0;\n  padding-block-end: 0;\n}\n\n.cite-workbench .cite-preview-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n}\n\n.cite-workbench .cite-preview-content {\n  min-inline-size: 0;\n  flex: 1 1 auto;\n}\n\n.cite-workbench .cite-preview-meta {\n  display: block;\n  color: var(--cite-secondary);\n  font-size: 12px;\n}\n\n.cite-workbench .cite-preview-row .cite-chips {\n  margin-block-start: 4px;\n}\n\n.cite-workbench :is(.cite-result-row, .cite-message-body, .cite-job-header) {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.cite-workbench .cite-download {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  min-block-size: 30px;\n  padding: 4px 10px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-sm);\n  color: var(--cite-ink);\n  background: var(--cite-base);\n  text-decoration: none;\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.cite-workbench .cite-download[data-primary=\"true\"] {\n  color: var(--cite-on-primary);\n  background: var(--cite-primary);\n  border-color: var(--cite-primary);\n}\n\n.cite-workbench[data-dsh-style=\"pixel8bit\"] .cite-download {\n  border: 2px solid #1e2826;\n  border-radius: 0px !important;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n.cite-workbench .cite-feedback {\n  flex: 0 0 auto;\n  max-block-size: 33%;\n  overflow: auto;\n  padding: 6px 12px;\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  background: var(--cite-base);\n}\n\n.cite-workbench .cite-feedback .cite-message {\n  align-items: center;\n  margin: 0;\n  padding: 4px 8px;\n}\n\n.cite-workbench .cite-message > div {\n  flex: 1;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-job {\n  font-size: 12px;\n}\n\n.cite-workbench .cite-job p {\n  margin: 0;\n}\n\n.cite-workbench .cite-job > progress,\n.cite-workbench .cite-job-progress {\n  display: block;\n  inline-size: 100%;\n  margin-block-start: 6px;\n}\n\n.cite-workbench .cite-sr-only {\n  position: absolute;\n  clip-path: inset(50%);\n  overflow: hidden;\n  inline-size: 1px;\n  block-size: 1px;\n  margin: -1px;\n  padding: 0;\n  border: 0;\n  white-space: nowrap;\n}\n\n.cite-workbench .cite-tour-trigger {\n  font-weight: 600;\n}\n\n.cite-tour-layer {\n  --tour-accent: var(--dsw-alias-state-business-primary, #4176e6);\n  --tour-bg: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base, #ffffff));\n  --tour-ink: var(--dsw-alias-label-primary, #1b2230);\n  --tour-muted: var(--dsw-alias-label-secondary, #5b667a);\n  --tour-border: var(--dsw-alias-border-l2, #d8e0ec);\n  --tour-radius: var(--dsw-radius-md, 12px);\n  position: fixed;\n  inset: 0;\n  inline-size: 100%;\n  block-size: 100%;\n  max-inline-size: none;\n  max-block-size: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  overflow: visible;\n  pointer-events: none;\n  z-index: 2147483000;\n  color: var(--tour-ink);\n  font: 13px/1.55 var(--dsh-font-body, var(--ds-font-family-ui, system-ui, -apple-system, \"Segoe UI\", \"Microsoft YaHei\", sans-serif));\n}\n\n.cite-tour-layer[popover]:is(:popover-open, .\\:popover-open) {\n  display: block;\n}\n\n.cite-tour-layer[data-dsh-style=\"pixel8bit\"] {\n  --tour-radius: 0px;\n}\n\n.cite-tour-spotlight {\n  position: fixed;\n  pointer-events: none;\n  border-radius: calc(var(--tour-radius) * 0.75 + 2px);\n  box-shadow:\n    0 0 0 2px var(--tour-accent),\n    0 0 0 5px color-mix(in oklab, var(--tour-accent) 22%, transparent),\n    0 0 0 9999px rgba(15, 23, 42, 0.26);\n}\n\n.cite-tour-backdrop-fallback {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  background: rgba(15, 23, 42, 0.24);\n}\n\n.cite-tour-card {\n  position: fixed;\n  inset: auto;\n  margin: 0;\n  inline-size: min(324px, calc(100dvw - 24px));\n  max-block-size: calc(100dvh - 24px);\n  padding: 13px 15px 12px;\n  border: 1px solid var(--tour-border);\n  border-radius: var(--tour-radius);\n  background: var(--tour-bg);\n  color: var(--tour-ink);\n  box-shadow: var(--dsw-elevation-prominent, 0 16px 40px rgba(15, 23, 42, 0.18));\n  pointer-events: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.cite-tour-layer[data-dsh-style=\"pixel8bit\"] .cite-tour-card {\n  border: 2px solid #1e2826;\n  border-radius: 0px;\n  box-shadow: 4px 4px 0px #1e2826;\n}\n\n.cite-tour-arrow {\n  position: absolute;\n  inline-size: 10px;\n  block-size: 10px;\n  background: var(--tour-bg);\n  transform: rotate(45deg);\n  pointer-events: none;\n}\n\n.cite-tour-card[data-side=\"bottom\"] > .cite-tour-arrow {\n  top: -6px;\n  left: calc(var(--arrow-x, 28px) - 5px);\n  border-top: 1px solid var(--tour-border);\n  border-left: 1px solid var(--tour-border);\n}\n\n.cite-tour-card[data-side=\"top\"] > .cite-tour-arrow {\n  bottom: -6px;\n  left: calc(var(--arrow-x, 28px) - 5px);\n  border-bottom: 1px solid var(--tour-border);\n  border-right: 1px solid var(--tour-border);\n}\n\n.cite-tour-card[data-side=\"right\"] > .cite-tour-arrow {\n  left: -6px;\n  top: calc(var(--arrow-y, 24px) - 5px);\n  border-bottom: 1px solid var(--tour-border);\n  border-left: 1px solid var(--tour-border);\n}\n\n.cite-tour-card[data-side=\"left\"] > .cite-tour-arrow {\n  right: -6px;\n  top: calc(var(--arrow-y, 24px) - 5px);\n  border-top: 1px solid var(--tour-border);\n  border-right: 1px solid var(--tour-border);\n}\n\n.cite-tour-card[data-side=\"center\"] > .cite-tour-arrow {\n  display: none;\n}\n\n.cite-tour-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.cite-tour-step-meta {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.cite-tour-step-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 1px 7px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 650;\n  font-variant-numeric: tabular-nums;\n  background: color-mix(in oklab, var(--tour-accent) 14%, transparent);\n  color: var(--tour-accent);\n}\n\n.cite-tour-dots {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.cite-tour-dot {\n  inline-size: 6px;\n  block-size: 6px;\n  border-radius: 999px;\n  background: var(--tour-border);\n}\n\n.cite-tour-dot[data-active=\"true\"] {\n  inline-size: 14px;\n  background: var(--tour-accent);\n}\n\n.cite-tour-skip {\n  min-block-size: 24px;\n  min-inline-size: 24px;\n  padding: 2px 6px;\n  border: 0;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: transparent;\n  color: var(--tour-muted);\n  font: inherit;\n  font-size: 11.5px;\n  cursor: pointer;\n}\n\n.cite-tour-skip:hover {\n  color: var(--tour-ink);\n  background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.05));\n}\n\n.cite-tour-title {\n  margin: 0 !important;\n  font-size: 14px !important;\n  line-height: 1.38 !important;\n  font-weight: 650 !important;\n}\n\n.cite-tour-desc {\n  margin: 0 !important;\n  font-size: 12.5px;\n  line-height: 1.55;\n  color: var(--tour-muted);\n}\n\n.cite-tour-inline-action {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 6px;\n  padding-block-start: 2px;\n}\n\n.cite-tour-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-block-start: 2px;\n  padding-block-start: 8px;\n  border-block-start: 0.5px solid var(--tour-border);\n}\n\n.cite-tour-nav {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-inline-start: auto;\n}\n\n.cite-copy-status {\n  color: var(--dsw-alias-state-success-primary, #1f7a4c);\n  font-size: 11.5px;\n  opacity: 1;\n}\n\n.cite-copy-status:empty {\n  opacity: 0;\n}\n\n@media (pointer: coarse) {\n  .cite-tour-skip {\n    min-block-size: 32px;\n    padding: 4px 10px;\n  }\n}\n\n.w-dialog .cite-remove-lead {\n  margin-block: 0 8px;\n}\n\n.w-dialog .cite-remove-list {\n  margin-block: 0 10px;\n}\n\n.w-dialog .cite-remove-note {\n  margin-block: 8px 0;\n}\n\n.cite-workbench .cite-job summary {\n  width: fit-content;\n  cursor: pointer;\n  color: var(--cite-accent);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .cite-tour-spotlight {\n    transition:\n      top 0.24s cubic-bezier(0.22, 1, 0.36, 1),\n      left 0.24s cubic-bezier(0.22, 1, 0.36, 1),\n      width 0.24s cubic-bezier(0.22, 1, 0.36, 1),\n      height 0.24s cubic-bezier(0.22, 1, 0.36, 1);\n  }\n  .cite-tour-card {\n    transition: top 0.22s cubic-bezier(0.22, 1, 0.36, 1), left 0.22s cubic-bezier(0.22, 1, 0.36, 1);\n  }\n  .cite-tour-dot {\n    transition: inline-size 0.18s ease, background-color 0.18s ease;\n  }\n  .cite-copy-status {\n    transition: opacity 150ms ease-out;\n  }\n  .cite-workbench :is(.cite-subpage, .cite-inspector-scroll) {\n    opacity: 1;\n    translate: 0px 0px;\n    transition: opacity 180ms var(--dsh-ease-out, ease-out), translate 200ms var(--dsh-ease-out, ease-out);\n  }\n\n  @starting-style {\n    .cite-workbench :is(.cite-subpage, .cite-inspector-scroll) {\n      opacity: 0;\n      translate: 0px 4px;\n    }\n  }\n\n  @media (hover: hover) {\n    .cite-workbench .cite-reference-row {\n      translate: 0px 0px;\n      transition: background-color 140ms var(--dsh-ease-out, ease-out), translate 180ms var(--dsh-ease-out, ease-out);\n    }\n\n    .cite-workbench:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]) .cite-reference-row:hover {\n      translate: 2px 0px;\n    }\n  }\n}\n\n@media (hover: hover) {\n  .cite-workbench .w-tabs > button:hover {\n    color: var(--cite-ink);\n  }\n\n  .cite-workbench :is(.cite-filter, .cite-download):hover {\n    background: var(--cite-hover);\n  }\n\n  .cite-workbench .cite-download[data-primary=\"true\"]:hover {\n    background: var(--dsw-alias-button-primary-hover, var(--cite-primary));\n  }\n}\n\n@container cite-workbench (max-width: 860px) {\n  .cite-workbench .cite-header-actions {\n    flex-wrap: wrap;\n  }\n\n  .cite-workbench .cite-library {\n    flex-direction: column;\n  }\n\n  .cite-workbench .cite-rail {\n    inline-size: 100%;\n    overflow: visible;\n    padding: 8px 10px;\n    border-inline-end: 0;\n    border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  }\n\n  .cite-workbench .cite-list {\n    inline-size: 100% !important;\n    flex: 1 1 auto;\n    border-inline-end: 0;\n  }\n\n  .cite-workbench .cite-resizer {\n    display: none;\n  }\n\n  .cite-workbench .cite-style-box {\n    display: grid;\n    grid-template-columns: auto minmax(120px, 1fr);\n    align-items: center;\n    gap: 8px;\n    padding: 0;\n    margin: 0 0 6px;\n    border: 0;\n    box-shadow: none;\n    background: transparent;\n  }\n\n  .cite-workbench .cite-style-box .cite-label {\n    margin: 0;\n  }\n\n  .cite-workbench .cite-filters {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n    align-items: start;\n  }\n\n  .cite-workbench .cite-filters > h2,\n  .cite-workbench .cite-library[data-open=\"false\"] .cite-inspector,\n  .cite-workbench .cite-library[data-open=\"true\"] :is(.cite-rail, .cite-list) {\n    display: none;\n  }\n\n  .cite-workbench .cite-filter {\n    font-size: 11.5px;\n  }\n\n  .cite-workbench .cite-library[data-open=\"true\"] .cite-inspector {\n    flex: 1 1 auto;\n  }\n\n  .cite-workbench .cite-back {\n    display: inline-flex;\n    align-self: flex-start;\n    margin: 5px 8px;\n  }\n\n  .cite-workbench .cite-inspector-bar {\n    padding-inline: 10px;\n    border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  }\n\n  .cite-workbench .cite-inspector-scroll {\n    padding-inline: 12px;\n  }\n}\n\n@container cite-workbench (max-width: 660px) {\n  .cite-workbench .cite-header {\n    padding-inline: 10px;\n  }\n\n  .cite-workbench .w-tabs {\n    justify-self: stretch;\n  }\n\n  .cite-workbench .w-tabs > button {\n    flex: 1 1 auto;\n    padding-inline: 6px;\n    min-block-size: 32px;\n  }\n\n  .cite-workbench .cite-subpage {\n    padding: 15px 12px 24px;\n  }\n}\n\n@container cite-workbench (max-width: 420px) {\n  .cite-workbench :is(.cite-metadata, .cite-form-grid) {\n    grid-template-columns: minmax(0, 1fr);\n  }\n\n  .cite-workbench .cite-card {\n    padding: 10px;\n  }\n}\n\n/* ==========================================================================\n * Spatial Citation Constellation Canvas («文献引力星图画布»)\n * ========================================================================== */\n\n.cite-workbench .cite-topbar-view-switch {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  padding: 2px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n  border-radius: var(--cite-radius-sm);\n  background: var(--cite-control);\n  flex-shrink: 0;\n}\n\n.cite-workbench .cite-topbar-view-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-block-size: 24px;\n  padding: 2px 9px;\n  border: 0;\n  border-radius: calc(var(--cite-radius-sm) - 2px);\n  background: transparent;\n  color: var(--cite-secondary);\n  font-size: 11.5px;\n  line-height: 1.25;\n  font-weight: 500;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-topbar-view-btn[aria-pressed=\"true\"] {\n  background: var(--cite-base);\n  color: var(--cite-ink);\n  font-weight: 600;\n  box-shadow: var(--dsw-elevation-soft, 0 1px 2px rgba(15, 23, 42, 0.08));\n}\n\n.cite-workbench .cite-constellation {\n  position: relative;\n  flex: 1 1 auto;\n  display: flex;\n  min-block-size: 0;\n  min-inline-size: 0;\n  inline-size: 100%;\n  overflow: hidden;\n  border: 0;\n}\n\n.cite-workbench .cite-starfield {\n  position: relative;\n  flex: 1 1 auto;\n  inline-size: 100%;\n  block-size: 100%;\n  min-block-size: 420px;\n  overflow: hidden;\n  cursor: grab;\n  user-select: none;\n  touch-action: none;\n  background-color: var(--cite-layer);\n  background-image: radial-gradient(circle, color-mix(in oklab, var(--cite-ink) 16%, transparent) 1px, transparent 1px);\n  background-size: 24px 24px;\n}\n\n.cite-workbench .cite-constellation[data-dragging=\"true\"] .cite-starfield {\n  cursor: grabbing;\n}\n\n.cite-workbench .cite-starfield-halo {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(ellipse 64% 56% at 48% 44%, color-mix(in oklab, var(--cite-accent) 13%, transparent), transparent 70%),\n    radial-gradient(circle at 82% 84%, color-mix(in oklab, var(--cite-accent) 7%, transparent), transparent 46%);\n}\n\n.cite-workbench .cite-constellation-stage {\n  position: absolute;\n  inset-block-start: 0;\n  inset-inline-start: 0;\n  transform-origin: 0 0;\n}\n\n.cite-workbench .cite-filaments {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: visible;\n}\n\n.cite-workbench .cite-filament {\n  fill: none;\n  stroke: color-mix(in oklab, var(--cite-ink) 34%, transparent);\n  stroke-width: 1.25;\n  stroke-linecap: round;\n  opacity: 0.44;\n}\n\n.cite-workbench .cite-filament[data-dimmed=\"true\"] {\n  opacity: 0.14;\n}\n\n.cite-workbench .cite-filament[data-active=\"true\"] {\n  stroke: var(--cite-accent);\n  stroke-width: 2.3;\n  opacity: 0.94;\n  filter: drop-shadow(0 0 6px color-mix(in oklab, var(--cite-accent) 46%, transparent));\n}\n\n.cite-workbench .cite-filament[data-edge-kind=\"author\"][data-active=\"true\"] {\n  stroke-width: 2.75;\n}\n\n.cite-workbench .cite-node {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-content: center;\n  gap: 3px;\n  padding: 9px 11px;\n  border: 1px solid color-mix(in oklab, var(--cite-line) 94%, var(--cite-ink) 6%);\n  border-radius: var(--cite-radius-md);\n  background: color-mix(in oklab, var(--cite-base) 95%, transparent);\n  backdrop-filter: blur(8px);\n  color: var(--cite-ink);\n  text-align: start;\n  cursor: grab;\n  user-select: none;\n  touch-action: none;\n  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);\n  z-index: 2;\n}\n\n.cite-workbench .cite-node[data-neighbor=\"true\"] {\n  z-index: 4;\n  border-color: color-mix(in oklab, var(--cite-accent) 52%, var(--cite-line));\n  box-shadow:\n    0 0 0 1px color-mix(in oklab, var(--cite-accent) 18%, transparent),\n    0 6px 18px rgba(15, 23, 42, 0.08);\n}\n\n.cite-workbench .cite-node[data-active=\"true\"] {\n  z-index: 6;\n  border-color: var(--cite-accent);\n  box-shadow:\n    0 0 0 2px color-mix(in oklab, var(--cite-accent) 28%, transparent),\n    0 12px 30px color-mix(in oklab, var(--cite-accent) 22%, rgba(15, 23, 42, 0.14));\n}\n\n.cite-workbench .cite-node[data-search-match=\"true\"] {\n  z-index: 7;\n  border-color: var(--cite-accent);\n  box-shadow:\n    0 0 0 3px color-mix(in oklab, var(--cite-accent) 28%, transparent),\n    0 10px 24px rgba(15, 23, 42, 0.12);\n}\n\n.cite-workbench .cite-node[data-dragging=\"true\"] {\n  z-index: 10;\n  cursor: grabbing;\n  transition: none !important;\n}\n\n.cite-workbench .cite-node-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n  min-inline-size: 0;\n  font-size: 10.5px;\n  line-height: 1.25;\n  color: var(--cite-secondary);\n}\n\n.cite-workbench .cite-node-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex: 1 1 auto;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-node-author {\n  flex: 0 1 auto;\n  min-inline-size: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.cite-workbench .cite-node-year {\n  flex: 0 0 auto;\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n\n.cite-workbench .cite-node-star {\n  flex: 0 0 auto;\n  font-size: 9px;\n  line-height: 1;\n  color: var(--cite-accent);\n}\n\n.cite-workbench .cite-node[data-status=\"success\"] .cite-node-star {\n  color: var(--dsw-alias-state-success-primary, #1f7a4c);\n}\n\n.cite-workbench .cite-node[data-status=\"warn\"] .cite-node-star {\n  color: var(--dsw-alias-state-warn-primary, #d97706);\n}\n\n.cite-workbench .cite-node[data-active=\"true\"] .cite-node-star {\n  color: var(--cite-accent);\n  font-size: 12px;\n}\n\n.cite-workbench .cite-node-key {\n  flex: 0 2 auto;\n  min-inline-size: 0;\n  max-inline-size: 64px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 10px;\n  color: var(--cite-accent);\n  opacity: 0.85;\n}\n\n.cite-workbench .cite-node-title {\n  font-size: 12px;\n  line-height: 1.32;\n  font-weight: 620;\n  color: var(--cite-ink);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-node-foot {\n  font-size: 10.5px;\n  line-height: 1.3;\n  color: var(--cite-secondary);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n/* Top-Left Floating Control Capsule */\n.cite-workbench .cite-capsule {\n  position: absolute;\n  inset-block-start: 16px;\n  inset-inline-start: 16px;\n  z-index: 12;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  inline-size: min(432px, calc(100% - 32px));\n  padding: 10px 12px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: calc(var(--cite-radius-md) + 2px);\n  background: color-mix(in oklab, var(--dsw-alias-bg-overlay, var(--cite-base)) 92%, transparent);\n  backdrop-filter: blur(12px);\n  box-shadow: var(--dsw-elevation-panel, 0 8px 26px rgba(15, 23, 42, 0.09));\n}\n\n.cite-workbench .cite-capsule-row {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-view-toggle {\n  flex: 0 1 auto;\n  inline-size: auto;\n  min-inline-size: 0;\n}\n\n.cite-workbench .cite-capsule-picker {\n  flex: 1 1 108px;\n  min-inline-size: 98px;\n}\n\n.cite-workbench .cite-capsule-search {\n  flex: 1 1 auto;\n  min-inline-size: 0;\n}\n\n.cite-workbench.dshw .cite-capsule-search .cite-search input {\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  background: transparent;\n}\n\n.cite-workbench .cite-capsule-filters {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n\n.cite-workbench .cite-pill-filter {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  min-block-size: 25px;\n  padding: 2px 9px;\n  border: var(--dsh-control-border-width, 0.5px) solid transparent;\n  border-radius: 999px;\n  background: var(--cite-control);\n  color: var(--cite-secondary);\n  font-size: 11.5px;\n  line-height: 1.3;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-pill-filter[aria-pressed=\"true\"] {\n  background: var(--cite-active);\n  color: var(--cite-ink);\n  border-color: color-mix(in oklab, var(--cite-accent) 44%, transparent);\n  font-weight: 600;\n}\n\n.cite-workbench .cite-pill-reset {\n  margin-inline-start: auto;\n  color: var(--cite-accent);\n  background: transparent;\n  border-color: color-mix(in oklab, var(--cite-accent) 34%, transparent);\n}\n\n/* Bottom-Left Constellation Legend & Zoom Pill */\n.cite-workbench .cite-constellation-legend {\n  position: absolute;\n  inset-block-end: 16px;\n  inset-inline-start: 16px;\n  z-index: 11;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 5px 10px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: 999px;\n  background: color-mix(in oklab, var(--dsw-alias-bg-overlay, var(--cite-base)) 90%, transparent);\n  backdrop-filter: blur(10px);\n  color: var(--cite-secondary);\n  font-size: 11px;\n  line-height: 1.35;\n  box-shadow: var(--dsw-elevation-soft, 0 2px 10px rgba(15, 23, 42, 0.06));\n}\n\n.cite-workbench .cite-legend-stat {\n  font-weight: 600;\n  color: var(--cite-ink);\n  font-variant-numeric: tabular-nums;\n}\n\n.cite-workbench .cite-zoom-controls {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding-inline-start: 6px;\n  border-inline-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n}\n\n.cite-workbench .cite-zoom-btn {\n  display: inline-grid;\n  place-items: center;\n  inline-size: 20px;\n  block-size: 20px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: var(--cite-control);\n  color: var(--cite-ink);\n  font-size: 13px;\n  line-height: 1;\n  cursor: pointer;\n}\n\n.cite-workbench .cite-zoom-readout {\n  min-inline-size: 36px;\n  text-align: center;\n  font-size: 10.5px;\n  font-variant-numeric: tabular-nums;\n}\n\n/* Center Empty / Loading State over Starfield */\n.cite-workbench .cite-constellation-empty {\n  position: absolute;\n  inset-block-start: 50%;\n  inset-inline-start: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n  inline-size: min(380px, calc(100% - 32px));\n  padding: 18px 20px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-radius: var(--cite-radius-md);\n  background: color-mix(in oklab, var(--dsw-alias-bg-overlay, var(--cite-base)) 95%, transparent);\n  backdrop-filter: blur(12px);\n  box-shadow: var(--dsw-elevation-panel, 0 12px 32px rgba(15, 23, 42, 0.1));\n}\n\n.cite-workbench .cite-constellation-empty .w-empty {\n  min-block-size: 0;\n  padding: 8px 4px;\n}\n\n/* Bottom-Right Floating Zettelkasten Index Card HUD */\n.cite-workbench .cite-zettelkasten {\n  position: absolute;\n  inset-block-end: 16px;\n  inset-inline-end: 16px;\n  z-index: 12;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-inline-size: 420px;\n  inline-size: min(420px, calc(100% - 32px));\n  max-block-size: calc(100% - 172px);\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 13px 15px 12px;\n  border: var(--dsh-control-border-width, 0.5px) solid var(--cite-line);\n  border-block-start: 3px solid var(--cite-accent);\n  border-radius: var(--cite-radius-md);\n  background: color-mix(in oklab, var(--dsw-alias-bg-overlay, var(--cite-base)) 96%, transparent);\n  backdrop-filter: blur(14px);\n  box-shadow: var(--dsw-elevation-prominent, 0 14px 36px rgba(15, 23, 42, 0.14));\n}\n\n.cite-workbench .cite-zettel-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 6px;\n}\n\n.cite-workbench .cite-zettelkasten[data-collapsed=\"true\"] .cite-zettel-collapse svg {\n  transform: rotate(180deg);\n}\n\n.cite-workbench .cite-zettel-title {\n  margin: 0;\n  font-size: 15px;\n  line-height: 1.38;\n  font-weight: 650;\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-zettel-meta {\n  margin: 0;\n  font-size: 12px;\n  line-height: 1.45;\n  color: var(--cite-secondary);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-zettel-doi {\n  margin: -4px 0 0;\n  font-size: 11px;\n  color: var(--cite-accent);\n  overflow-wrap: anywhere;\n}\n\n.cite-workbench .cite-zettel-preview {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.cite-workbench .cite-zettel-preview .cite-label {\n  margin: 0;\n}\n\n.cite-workbench .cite-zettel-preview .cite-formatted {\n  max-block-size: 98px;\n  overflow: auto;\n  padding: 8px 10px;\n  font-size: 12px;\n  line-height: 1.55;\n  background: var(--cite-layer);\n}\n\n.cite-workbench .cite-zettel-actions {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 6px;\n}\n\n.cite-workbench .cite-zettel-actions .cite-button {\n  inline-size: 100%;\n  justify-content: center;\n}\n\n.cite-workbench .cite-zettel-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n  padding-block-start: 6px;\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--cite-subtle-line);\n}\n\n.cite-workbench .cite-zettel-footer .cite-button {\n  min-block-size: 26px;\n  font-size: 11.5px;\n}\n\n.w-dialog .cite-meta-form {\n  display: block;\n}\n\n/* Theme-specific Constellation Materiality (13 Presets) */\n.cite-workbench[data-dsh-style=\"pixel8bit\"] :is(.cite-node, .cite-capsule, .cite-zettelkasten, .cite-constellation-legend, .cite-constellation-empty, .cite-topbar-view-switch, .cite-pill-filter) {\n  border-radius: 0px !important;\n  border: 2px solid #1e2826;\n  box-shadow: 3px 3px 0px #1e2826;\n  backdrop-filter: none;\n}\n\n.cite-workbench[data-dsh-style=\"pixel8bit\"] .cite-topbar-view-btn {\n  border-radius: 0px !important;\n}\n\n.cite-workbench[data-dsh-style=\"risograph\"] :is(.cite-node, .cite-capsule, .cite-zettelkasten) {\n  border: 2px solid #18181b;\n  box-shadow: 3px 3px 0px color-mix(in oklab, var(--cite-accent) 42%, #18181b);\n  backdrop-filter: none;\n}\n\n.cite-workbench[data-dsh-style=\"eink\"] :is(.cite-node, .cite-capsule, .cite-zettelkasten, .cite-constellation-legend) {\n  backdrop-filter: none;\n  box-shadow: none;\n  border-width: 1px;\n}\n\n.cite-workbench[data-dsh-style=\"blueprint\"] .cite-starfield {\n  background-image:\n    linear-gradient(to right, color-mix(in oklab, var(--cite-accent) 13%, transparent) 1px, transparent 1px),\n    linear-gradient(to bottom, color-mix(in oklab, var(--cite-accent) 13%, transparent) 1px, transparent 1px);\n  background-size: 28px 28px;\n}\n\n.cite-workbench[data-dsh-style=\"win98\"] :is(.cite-node, .cite-capsule, .cite-zettelkasten) {\n  border-radius: 0px;\n  border: 2px outset #ffffff;\n  backdrop-filter: none;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .cite-workbench .cite-node {\n    transition:\n      opacity 180ms var(--dsh-ease-out, ease-out),\n      transform 180ms var(--dsh-ease-out, ease-out),\n      border-color 150ms ease,\n      box-shadow 180ms var(--dsh-ease-out, ease-out);\n  }\n\n  .cite-workbench .cite-node[data-active=\"true\"] {\n    transform: translate(-50%, -50%) scale(1.06);\n  }\n\n  .cite-workbench .cite-filament {\n    transition: stroke 160ms ease, opacity 180ms ease, stroke-width 160ms ease;\n  }\n\n  .cite-workbench .cite-zettel-collapse svg {\n    transition: transform 160ms var(--dsh-ease-out, ease-out);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .cite-workbench :is(.cite-node, .cite-filament, .cite-zettelkasten, .cite-capsule, .cite-constellation-stage) {\n    scale: none !important;\n    animation: none !important;\n    transition-property: background-color, border-color, color, opacity;\n    transition-duration: 90ms;\n  }\n\n  .cite-workbench .cite-node[data-active=\"true\"] {\n    transform: translate(-50%, -50%);\n  }\n}\n\n@media (hover: hover) {\n  .cite-workbench .cite-topbar-view-btn:hover,\n  .cite-workbench .cite-pill-filter:hover,\n  .cite-workbench .cite-zoom-btn:hover {\n    color: var(--cite-ink);\n    background: var(--cite-hover);\n  }\n\n  .cite-workbench .cite-node:hover:not([data-active=\"true\"]) {\n    border-color: color-mix(in oklab, var(--cite-accent) 60%, var(--cite-line));\n  }\n}\n\n@container cite-workbench (max-width: 860px) {\n  .cite-workbench .cite-legend-hint {\n    display: none;\n  }\n}\n\n@container cite-workbench (max-width: 640px) {\n  .cite-workbench .cite-constellation-legend {\n    display: none;\n  }\n\n  .cite-workbench .cite-zettelkasten {\n    max-block-size: 52%;\n  }\n\n  .cite-workbench .cite-zettel-actions {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n";
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
  const ariaLabel = props['aria-label'] || (hiddenLabel && typeof label === 'string' ? label : undefined);
  return h(P.Checkbox, {
    ...props,
    checked: Boolean(checked),
    disabled,
    label: hiddenLabel ? undefined : label,
    'aria-label': ariaLabel,
    title: title || ariaLabel,
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
  const [uiFont] = useDshFont(React);
  const P = hostPrimitives();
  const current = options.find(option => option.id === value) || options[0];
  return h('div', { className: 'cite-picker-wrap', 'data-window-drag-exclude': '' },
    h(P.Menu, {
      open: Boolean(open && !disabled),
      dshStyle: uiStyle,
      dshFont: uiFont,
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
      }, h('span', { ref: open ? createOverlaySyncRef(uiStyle, uiFont) : undefined }, current?.label || ''), h(W.Icon, { name: 'down', size: 13 })),
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
  { id: 'ieee', label: 'IEEE' },
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
    h('header', { className: 'cite-card-header' }, h('h3', { 'data-dsh-serif': '' }, title), actions),
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
  if (!output.content) return h(W.Skeleton, { variant: 'text', lines: 2, label: t('正在生成…', 'Formatting…') });
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
  const pct = job.total ? Math.min(100, Math.round((job.completed / job.total) * 100)) : 0;
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
    running ? h('div', {
      className: 'dsh-progress cite-job-progress',
      role: 'progressbar',
      'aria-label': t('补全进度', 'Enrichment progress'),
      'aria-valuemin': 0,
      'aria-valuemax': job.total || 1,
      'aria-valuenow': job.completed,
    }, h('div', { className: 'dsh-progress-bar', style: { '--dsh-progress-value': pct + '%' } })) : null,
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

function formatAuthorsInput(work) {
  return (work?.authors || []).map(author => {
    if (author.name) return author.name;
    if (author.family && author.given) return author.family + ', ' + author.given;
    return author.family || author.given || '';
  }).filter(Boolean).join('; ');
}

function parseAuthorsInput(raw) {
  return String(raw || '')
    .split(/[;\n]+/)
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      if (part.includes(',')) {
        const [family, ...rest] = part.split(',');
        return { family: family.trim(), given: rest.join(',').trim(), name: '' };
      }
      return { family: '', given: '', name: part };
    });
}

function CiteMetadataEditorModal({ entry, revision, uiStyle, uiFont, lang, locked, onClose, onSaved, onRefresh, t }) {
  const fieldId = typeof React.useId === 'function' ? React.useId() : 'cite-meta-edit';
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [conflict, setConflict] = useState(false);
  const [draftWork, setDraftWork] = useState(() => ({
    bibKey: entry.bibKey || '',
    title: entry.work.title || '',
    authorsText: formatAuthorsInput(entry.work),
    year: entry.work.year ? String(entry.work.year) : '',
    containerTitle: entry.work.containerTitle || '',
    type: entry.work.type || 'journal-article',
    volume: entry.work.volume || '',
    issue: entry.work.issue || '',
    page: entry.work.page || '',
    doi: entry.work.doi || '',
    publisher: entry.work.publisher || '',
    url: entry.work.url || '',
  }));

  const setField = (key, value) => setDraftWork(prev => ({ ...prev, [key]: value }));

  async function submit(event) {
    event?.preventDefault?.();
    if (saving || locked) return;
    setSaving(true);
    setErr('');
    setConflict(false);
    try {
      const parsedYear = draftWork.year.trim() ? Number.parseInt(draftWork.year.trim(), 10) : 0;
      const workPatch = {
        title: draftWork.title.trim(),
        authors: parseAuthorsInput(draftWork.authorsText),
        year: Number.isInteger(parsedYear) && parsedYear > 0 && parsedYear <= 9999 ? parsedYear : 0,
        containerTitle: draftWork.containerTitle.trim(),
        type: draftWork.type || 'other',
        volume: draftWork.volume.trim(),
        issue: draftWork.issue.trim(),
        page: draftWork.page.trim(),
        doi: draftWork.doi.trim(),
        publisher: draftWork.publisher.trim(),
        url: draftWork.url.trim(),
      };
      const nextState = await api({
        action: 'update',
        id: entry.id,
        expectedRevision: revision,
        bibKey: draftWork.bibKey.trim() || entry.bibKey || 'work',
        work: workPatch,
      }, lang);
      onSaved(nextState);
    } catch (error) {
      setConflict(error?.status === 409);
      setErr(error?.message || t('无法保存元数据。', 'Could not save metadata.'));
    } finally {
      setSaving(false);
    }
  }

  const workTypes = [
    { value: 'journal-article', label: t('期刊论文 (journal-article)', 'Journal article') },
    { value: 'proceedings-article', label: t('会议论文 (proceedings-article)', 'Conference paper') },
    { value: 'proceedings', label: t('会议论文集 (proceedings)', 'Conference proceedings') },
    { value: 'book', label: t('专著 (book)', 'Book') },
    { value: 'monograph', label: t('专著 / 单行本 (monograph)', 'Monograph') },
    { value: 'edited-book', label: t('编著 (edited-book)', 'Edited book') },
    { value: 'book-chapter', label: t('图书章节 (book-chapter)', 'Book chapter') },
    { value: 'report', label: t('研究报告 (report)', 'Report') },
    { value: 'dissertation', label: t('学位论文 (dissertation)', 'Dissertation') },
    { value: 'dataset', label: t('数据集 (dataset)', 'Dataset') },
    { value: 'patent', label: t('专利 (patent)', 'Patent') },
    { value: 'standard', label: t('标准 (standard)', 'Standard') },
    { value: 'posted-content', label: t('预印本 / 网络资源 (posted-content)', 'Preprint / online') },
    { value: 'other', label: t('其他 (other)', 'Other') },
  ];
  if (draftWork.type && !workTypes.some(item => item.value === draftWork.type)) {
    workTypes.push({ value: draftWork.type, label: draftWork.type });
  }

  return h(W.Dialog, {
    style: uiStyle,
    font: uiFont,
    busy: saving,
    className: 'cite-meta-dialog',
    title: t('编辑文献元数据', 'Edit reference metadata'),
    closeLabel: t('关闭', 'Close'),
    onClose: () => { if (!saving) onClose(); },
    footer: h('div', { className: 'cite-actions' },
      h(CiteButton, { variant: 'outline', disabled: saving, onClick: onClose }, t('取消', 'Cancel')),
      conflict && onRefresh
        ? h(CiteButton, {
          variant: 'primary',
          icon: 'refresh',
          disabled: saving,
          onClick: async () => { setConflict(false); setErr(''); await onRefresh(); },
        }, t('刷新文献库', 'Refresh library'))
        : h(CiteButton, {
          variant: 'primary',
          icon: 'check',
          disabled: saving || locked,
          onClick: submit,
        }, t('保存元数据', 'Save metadata')),
    ),
  },
    err ? h(W.Status, { tone: 'error' }, err) : null,
    h('form', { className: 'cite-meta-form', onSubmit: submit },
      h('div', { className: 'cite-form-grid' },
        h('div', { className: 'cite-field-wide' },
          h('label', { className: 'cite-label', htmlFor: fieldId + '-title' }, t('标题', 'Title')),
          h(CiteInput, { id: fieldId + '-title', value: draftWork.title, disabled: saving, onChange: e => setField('title', e.target.value) }),
        ),
        h('div', { className: 'cite-field-wide' },
          h('label', { className: 'cite-label', htmlFor: fieldId + '-authors' }, t('作者（用分号 ; 分隔，支持 姓, 名）', 'Authors (separate with ; e.g. Family, Given)')),
          h(CiteInput, { id: fieldId + '-authors', value: draftWork.authorsText, disabled: saving, onChange: e => setField('authorsText', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-year' }, t('年份', 'Year')),
          h(CiteInput, { id: fieldId + '-year', value: draftWork.year, disabled: saving, placeholder: '2026', onChange: e => setField('year', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-type' }, t('文献类型', 'Type')),
          h('select', {
            id: fieldId + '-type',
            className: 'cite-field',
            value: draftWork.type,
            disabled: saving,
            onChange: e => setField('type', e.target.value),
          }, workTypes.map(item => h('option', { key: item.value, value: item.value }, item.label))),
        ),
        h('div', { className: 'cite-field-wide' },
          h('label', { className: 'cite-label', htmlFor: fieldId + '-venue' }, t('期刊 / 会议 / 文集', 'Journal / conference / collection')),
          h(CiteInput, { id: fieldId + '-venue', value: draftWork.containerTitle, disabled: saving, onChange: e => setField('containerTitle', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-volume' }, t('卷', 'Volume')),
          h(CiteInput, { id: fieldId + '-volume', value: draftWork.volume, disabled: saving, onChange: e => setField('volume', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-issue' }, t('期', 'Issue')),
          h(CiteInput, { id: fieldId + '-issue', value: draftWork.issue, disabled: saving, onChange: e => setField('issue', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-page' }, t('页码', 'Pages')),
          h(CiteInput, { id: fieldId + '-page', value: draftWork.page, disabled: saving, onChange: e => setField('page', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-bibkey' }, t('引用键', 'Citation key')),
          h(CiteInput, { id: fieldId + '-bibkey', className: 'cite-mono', value: draftWork.bibKey, disabled: saving, onChange: e => setField('bibKey', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-doi' }, 'DOI'),
          h(CiteInput, { id: fieldId + '-doi', className: 'cite-mono', value: draftWork.doi, disabled: saving, onChange: e => setField('doi', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-publisher' }, t('出版社', 'Publisher')),
          h(CiteInput, { id: fieldId + '-publisher', value: draftWork.publisher, disabled: saving, onChange: e => setField('publisher', e.target.value) }),
        ),
        h('div', { className: 'cite-field-wide' },
          h('label', { className: 'cite-label', htmlFor: fieldId + '-url' }, 'URL'),
          h(CiteInput, { id: fieldId + '-url', className: 'cite-mono', value: draftWork.url, disabled: saving, onChange: e => setField('url', e.target.value) }),
        ),
      ),
    ),
  );
}

function useRawSources({ entryId, sourceIds, lang, revision, attempt }) {
  const ids = Array.isArray(sourceIds) ? sourceIds.filter(Boolean) : [];
  const key = JSON.stringify([entryId || '', ids, lang, revision, attempt]);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (!ids.length) return;
    const controller = new AbortController();
    const payload = ids.length === 1
      ? { action: 'source', id: ids[0] }
      : { action: 'source', ids };
    api(payload, lang, controller.signal)
      .then(value => {
        if (controller.signal.aborted) return;
        const list = Array.isArray(value?.sources)
          ? value.sources
          : (value?.source ? [value.source] : []);
        const byId = {};
        for (const item of list) {
          if (item && item.id) byId[item.id] = item;
        }
        setResult({ key, byId, error: '' });
      })
      .catch(error => {
        if (!controller.signal.aborted) setResult({ key, byId: {}, error: error.message });
      });
    return () => controller.abort();
  }, [key]);
  if (!ids.length) return { loading: false, byId: {}, error: '' };
  if (result?.key === key) return { loading: false, byId: result.byId, error: result.error };
  return { loading: true, byId: {}, error: '' };
}

function CiteRawSourceModal({ entry, sources, revision, uiStyle, uiFont, lang, copiedKey, copy, onClose, t }) {
  const [attempt, setAttempt] = useState(0);
  const matchedSources = (entry?.sourceIds || [])
    .map(sourceId => sources.find(source => source.id === sourceId) || { id: sourceId, label: sourceId })
    .filter(Boolean);
  const missingIds = matchedSources
    .filter(source => typeof source.text !== 'string')
    .map(source => source.id);
  const rawState = useRawSources({ entryId: entry?.id, sourceIds: missingIds, lang, revision, attempt });

  return h(W.Dialog, {
    style: uiStyle,
    font: uiFont,
    title: t('原始导入来源', 'Original import source'),
    closeLabel: t('关闭', 'Close'),
    onClose,
    footer: h(CiteButton, { onClick: onClose }, t('完成', 'Done')),
  },
    rawState.loading
      ? h('div', { role: 'status', 'aria-busy': 'true', 'aria-label': t('正在读取原始输入…', 'Loading original source…') },
        h(W.Skeleton, { variant: 'text', lines: 3, label: t('正在读取原始输入…', 'Loading original source…') }),
      )
      : rawState.error
        ? h('div', { className: 'cite-source-error' },
          h(W.Status, { tone: 'error' }, rawState.error),
          h(CiteButton, { icon: 'refresh', onClick: () => setAttempt(n => n + 1) }, t('重试', 'Retry')),
        )
        : matchedSources.length
          ? matchedSources.map(source => {
            const resolved = rawState.byId[source.id] || source;
            const rawText = typeof resolved.text === 'string' ? resolved.text : '';
            return h('section', { key: source.id, className: 'cite-source-entry' },
              h('div', { className: 'cite-card-header' },
                h('strong', null, resolved.label || source.label || source.id),
                rawText ? h(CiteButton, {
                  icon: copiedKey === 'source-' + source.id ? 'check' : 'copy',
                  'data-copied': copiedKey === 'source-' + source.id ? 'true' : undefined,
                  onClick: () => copy(rawText, t('原始输入', 'raw source'), 'source-' + source.id),
                }, copiedKey === 'source-' + source.id ? t('已复制', 'Copied') : t('复制原文', 'Copy source')) : null,
              ),
              h('pre', { className: 'cite-code' }, rawText || t('无原文记录', 'No raw text recorded')),
            );
          })
          : h('p', { className: 'cite-muted' }, t('无原文记录', 'No raw text recorded')),
  );
}

function normalizeAuthorToken(author) {
  if (!author) return '';
  const full = (author.name || [author.family, author.given].filter(Boolean).join(' ')).trim().toLowerCase();
  return full.replace(/\s+/g, ' ');
}

function hashString(input) {
  let hash = 2166136261;
  const text = String(input || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function computeConstellationEdges(entries) {
  const prepared = entries.map(entry => {
    const work = entry.work || {};
    const authorNames = new Set();
    const authorFamilies = new Set();
    for (const au of work.authors || []) {
      const full = normalizeAuthorToken(au);
      if (full) authorNames.add(full);
      const fam = String(au.family || '').trim().toLowerCase();
      if (fam.length >= 2) authorFamilies.add(fam);
    }
    const venue = String(work.containerTitle || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const year = Number(work.year) || 0;
    const cluster = entry.crossref ? 'enriched' : (entry.warnings?.length ? 'missing' : 'complete');
    return { entry, authorNames, authorFamilies, venue, year, cluster };
  });

  const edges = [];
  const connectedSet = new Set();
  const degree = new Map(entries.map(e => [e.id, 0]));

  for (let i = 0; i < prepared.length; i++) {
    for (let j = i + 1; j < prepared.length; j++) {
      const a = prepared[i];
      const b = prepared[j];

      let sharedAuthor = '';
      for (const name of a.authorNames) {
        if (b.authorNames.has(name)) {
          sharedAuthor = name;
          break;
        }
      }
      if (!sharedAuthor) {
        for (const fam of a.authorFamilies) {
          if (b.authorFamilies.has(fam)) {
            sharedAuthor = fam;
            break;
          }
        }
      }
      const sameVenue = Boolean(a.venue && b.venue && a.venue === b.venue);
      const sameEra = Boolean(a.year > 0 && b.year > 0 && Math.abs(a.year - b.year) <= 2);

      if (sharedAuthor || sameVenue || sameEra) {
        const kind = sharedAuthor ? 'author' : sameVenue ? 'venue' : 'era';
        const weight = sharedAuthor ? 4 : sameVenue ? 3 : 2;
        const pairKey = a.entry.id + '__' + b.entry.id;
        connectedSet.add(pairKey);
        degree.set(a.entry.id, (degree.get(a.entry.id) || 0) + 1);
        degree.set(b.entry.id, (degree.get(b.entry.id) || 0) + 1);
        edges.push({
          id: pairKey,
          source: a.entry.id,
          target: b.entry.id,
          kind,
          weight,
          detail: sharedAuthor || (sameVenue ? a.entry.work.containerTitle : String(a.year)),
        });
      }
    }
  }

  for (let i = 0; i < prepared.length; i++) {
    const a = prepared[i];
    if ((degree.get(a.entry.id) || 0) >= 2) continue;
    for (let j = 0; j < prepared.length; j++) {
      if (i === j) continue;
      const b = prepared[j];
      if (a.cluster !== b.cluster) continue;
      const key1 = a.entry.id + '__' + b.entry.id;
      const key2 = b.entry.id + '__' + a.entry.id;
      if (connectedSet.has(key1) || connectedSet.has(key2)) continue;
      connectedSet.add(key1);
      degree.set(a.entry.id, (degree.get(a.entry.id) || 0) + 1);
      degree.set(b.entry.id, (degree.get(b.entry.id) || 0) + 1);
      edges.push({
        id: key1,
        source: a.entry.id,
        target: b.entry.id,
        kind: 'cluster',
        weight: 1,
        detail: a.cluster,
      });
      if ((degree.get(a.entry.id) || 0) >= 2) break;
    }
  }

  const adjacency = new Map(entries.map(e => [e.id, new Set()]));
  for (const edge of edges) {
    adjacency.get(edge.source)?.add(edge.target);
    adjacency.get(edge.target)?.add(edge.source);
  }

  return { edges, adjacency };
}

function computeConstellationLayout(entries, edges, viewport = { width: 1200, height: 740 }) {
  const count = entries.length;
  const viewW = Math.max(420, Number(viewport?.width) || 1200);
  const viewH = Math.max(420, Number(viewport?.height) || 740);
  const compact = count > 24;
  const nodeWidth = compact ? 186 : 220;
  const nodeHeight = compact ? 66 : 78;
  const minSepX = nodeWidth + (compact ? 16 : 24);
  const minSepY = nodeHeight + (compact ? 16 : 22);

  if (count === 0) {
    return { positions: {}, stageWidth: viewW, stageHeight: viewH, nodeWidth, nodeHeight };
  }

  const padX = Math.ceil(nodeWidth / 2) + 24;
  const padY = Math.ceil(nodeHeight / 2) + 24;
  const halfW = nodeWidth / 2;
  const halfH = nodeHeight / 2;
  const aspect = Math.max(1.25, viewW / Math.max(1, viewH));
  const requiredUsableArea = count * minSepX * minSepY * 2.15;

  let stageWidth = viewW;
  let stageHeight = viewH;
  const currentUsable = Math.max(1, stageWidth - padX * 2) * Math.max(1, stageHeight - padY * 2);
  if (currentUsable < requiredUsableArea) {
    const neededW = Math.ceil(Math.sqrt(requiredUsableArea * aspect)) + padX * 2;
    const neededH = Math.ceil(Math.sqrt(requiredUsableArea / aspect)) + padY * 2;
    stageWidth = Math.max(viewW, neededW);
    stageHeight = Math.max(viewH, neededH);
  }

  const usableW = Math.max(minSepX * 2, stageWidth - padX * 2);
  const usableH = Math.max(minSepY * 2, stageHeight - padY * 2);

  // Order entries deterministically by semantic cluster so related works orbit together.
  const ordered = [...entries].sort((a, b) => {
    const ca = a.crossref ? 0 : a.warnings?.length ? 2 : 1;
    const cb = b.crossref ? 0 : b.warnings?.length ? 2 : 1;
    if (ca !== cb) return ca - cb;
    const ya = Number(a.work?.year) || 0;
    const yb = Number(b.work?.year) || 0;
    if (ya !== yb) return yb - ya;
    const va = String(a.work?.containerTitle || '');
    const vb = String(b.work?.containerTitle || '');
    if (va !== vb) return va.localeCompare(vb);
    return String(a.id).localeCompare(String(b.id));
  });

  const hudClearance = count <= 14 && stageWidth >= 900 && stageHeight >= 600;
  const hudRects = hudClearance
    ? [
      // Top-left Floating Control Capsule + safe margin
      { left: 0, top: 0, right: 456, bottom: 196 },
      // Bottom-right Floating Zettelkasten Index Card HUD + safe margin
      { left: stageWidth - 456, top: stageHeight - 468, right: stageWidth, bottom: stageHeight },
      // Bottom-left Legend & Zoom Pill + safe margin
      { left: 0, top: stageHeight - 72, right: 420, bottom: stageHeight },
    ]
    : [];

  const cx = stageWidth * (hudClearance ? 0.44 : 0.5);
  const cy = stageHeight * (hudClearance ? 0.44 : 0.49);
  const goldenAngle = 2.399963229728653;
  const radiusX = Math.max(minSepX * 1.15, usableW * 0.44);
  const radiusY = Math.max(minSepY * 1.25, usableH * 0.42);

  const nodes = ordered.map((entry, idx) => {
    if (count === 1) {
      return { id: entry.id, x: Math.round(cx), y: Math.round(cy) };
    }
    const jitter = ((hashString(entry.id) % 100) / 100 - 0.5) * 0.16;
    const angle = idx * goldenAngle + jitter;
    const norm = Math.sqrt((idx + 0.65) / count);
    return {
      id: entry.id,
      x: cx + Math.cos(angle) * radiusX * norm,
      y: cy + Math.sin(angle) * radiusY * norm,
    };
  });

  const byId = new Map(nodes.map(n => [n.id, n]));
  const clamp = node => {
    node.x = Math.max(padX, Math.min(stageWidth - padX, node.x));
    node.y = Math.max(padY, Math.min(stageHeight - padY, node.y));
  };

  function resolveHudOverlap(node, rect, strength = 1) {
    const nLeft = node.x - halfW;
    const nRight = node.x + halfW;
    const nTop = node.y - halfH;
    const nBottom = node.y + halfH;
    if (nRight <= rect.left || nLeft >= rect.right || nBottom <= rect.top || nTop >= rect.bottom) {
      return false;
    }
    const candidates = [];
    if (rect.left - halfW >= padX) {
      candidates.push({ dx: (rect.left - halfW) - node.x, dy: 0, cost: Math.abs((rect.left - halfW) - node.x) });
    }
    if (rect.right + halfW <= stageWidth - padX) {
      candidates.push({ dx: (rect.right + halfW) - node.x, dy: 0, cost: Math.abs((rect.right + halfW) - node.x) });
    }
    if (rect.top - halfH >= padY) {
      candidates.push({ dx: 0, dy: (rect.top - halfH) - node.y, cost: Math.abs((rect.top - halfH) - node.y) });
    }
    if (rect.bottom + halfH <= stageHeight - padY) {
      candidates.push({ dx: 0, dy: (rect.bottom + halfH) - node.y, cost: Math.abs((rect.bottom + halfH) - node.y) });
    }
    if (!candidates.length) return false;
    candidates.sort((a, b) => a.cost - b.cost);
    const best = candidates[0];
    node.x += best.dx * strength;
    node.y += best.dy * strength;
    return true;
  }

  // Iterative force relaxation: edge gravity + non-overlap repulsion + HUD clearance.
  const iterations = Math.min(96, 40 + count * 2);

  for (let iter = 0; iter < iterations; iter++) {
    // 1. Gentle attraction along relationship filaments
    for (const edge of edges) {
      const a = byId.get(edge.source);
      const b = byId.get(edge.target);
      if (!a || !b) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ideal = edge.kind === 'author' ? minSepX * 1.15 : minSepX * 1.38;
      if (dist > ideal) {
        const pull = (dist - ideal) * (0.01 + edge.weight * 0.003);
        const fx = (dx / dist) * pull;
        const fy = (dy / dist) * pull;
        a.x += fx;
        a.y += fy;
        b.x -= fx;
        b.y -= fy;
      }
    }

    // 2. Gentle center gravity
    for (const node of nodes) {
      node.x += (cx - node.x) * 0.007;
      node.y += (cy - node.y) * 0.007;
    }

    // 3. Hard axis-aligned non-overlap separation
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        if (dx === 0 && dy === 0) {
          const theta = ((i * 7 + j * 13) % 360) * (Math.PI / 180);
          dx = Math.cos(theta) * 2;
          dy = Math.sin(theta) * 2;
        }
        const ox = minSepX - Math.abs(dx);
        const oy = minSepY - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (ox * minSepY < oy * minSepX) {
            const sign = dx >= 0 ? 1 : -1;
            const push = ox * 0.52;
            a.x -= sign * push;
            b.x += sign * push;
          } else {
            const sign = dy >= 0 ? 1 : -1;
            const push = oy * 0.52;
            a.y -= sign * push;
            b.y += sign * push;
          }
        }
      }
    }

    // 4. Keep nodes cleanly clear of floating capsules & Zettelkasten HUD
    if (hudClearance) {
      for (const node of nodes) {
        for (const rect of hudRects) resolveHudOverlap(node, rect, 0.72);
      }
    }

    for (const node of nodes) clamp(node);
  }

  // Final guaranteed overlap-free + HUD-clear sweep
  for (let pass = 0; pass < 110; pass++) {
    let collided = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const ox = minSepX - Math.abs(dx);
        const oy = minSepY - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          collided = true;
          if (ox * minSepY < oy * minSepX) {
            const sign = dx >= 0 ? 1 : -1;
            a.x -= sign * (ox * 0.55 + 1);
            b.x += sign * (ox * 0.55 + 1);
          } else {
            const sign = dy >= 0 ? 1 : -1;
            a.y -= sign * (oy * 0.55 + 1);
            b.y += sign * (oy * 0.55 + 1);
          }
          clamp(a);
          clamp(b);
        }
      }
    }
    if (hudClearance && pass < 90) {
      for (const node of nodes) {
        for (const rect of hudRects) {
          if (resolveHudOverlap(node, rect, 1)) {
            collided = true;
            clamp(node);
          }
        }
      }
    }
    if (!collided) break;
    if (pass === 44 || pass === 80) {
      stageWidth += Math.round(minSepX * 1.1);
      stageHeight += Math.round(minSepY * 1.1);
    }
  }

  const positions = {};
  for (const node of nodes) {
    positions[node.id] = { x: Math.round(node.x), y: Math.round(node.y) };
  }
  return { positions, stageWidth, stageHeight, nodeWidth, nodeHeight };
}

function filamentPath(a, b, edgeId) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const nx = -dy / dist;
  const ny = dx / dist;
  const dir = hashString(edgeId) % 2 === 0 ? 1 : -1;
  const curve = Math.min(34, Math.max(10, dist * 0.11)) * dir;
  const cx = Math.round(mx + nx * curve);
  const cy = Math.round(my + ny * curve);
  return 'M ' + Math.round(a.x) + ' ' + Math.round(a.y) + ' Q ' + cx + ' ' + cy + ' ' + Math.round(b.x) + ' ' + Math.round(b.y);
}

function CiteZettelkastenHud({
  entry, sources, style, lang, revision, locked, running, copiedKey,
  neighborCount, enrich, copy, onEditMetadata, onOpenRawSource, onRequestRemove, t,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { id, work, bibKey, warnings, crossref } = entry;
  const citation = useCitationOutput({ kind: 'references', id, style, lang, revision });
  const bibtex = useCitationOutput({ kind: 'bibtex', id, lang, revision });
  const matchedSources = entry.sourceIds.map(sourceId => sources.find(source => source.id === sourceId)).filter(Boolean);
  const authorLine = authors(work) || t('佚名作者', 'Unknown authors');
  const venueLine = [work.year || '', work.containerTitle || work.publisher || ''].filter(Boolean).join(' · ');

  return h('aside', {
    className: 'cite-zettelkasten',
    'data-collapsed': String(collapsed),
    'data-dsh-card': '',
    'data-tour': 'cite-zettelkasten-hud',
    'aria-label': t('文献索引卡片', 'Zettelkasten reference card'),
  },
    h('div', { className: 'cite-zettel-top' },
      h('div', { className: 'cite-chips' },
        bibKey ? h(CiteChip, { tone: 'accent' }, '@' + bibKey) : null,
        crossref
          ? h(CiteChip, { tone: 'success' }, t('已查询 Crossref', 'Crossref checked'))
          : warnings.length
            ? h(CiteChip, { tone: 'warn', title: warnings.map(code => warningLabel(code, t)).join(' · ') }, t('有字段缺失', 'Missing fields'))
            : h(CiteChip, null, t('字段完整', 'Complete')),
        h(CiteChip, null, t('关联 ' + neighborCount + ' 篇', neighborCount + (neighborCount === 1 ? ' link' : ' links'))),
      ),
      h(CiteIconButton, {
        icon: 'down',
        className: 'cite-zettel-collapse',
        label: collapsed ? t('展开索引卡', 'Expand card') : t('收起索引卡', 'Collapse card'),
        'aria-expanded': !collapsed,
        onClick: () => setCollapsed(prev => !prev),
      }),
    ),
    h('h2', { className: 'cite-zettel-title', 'data-dsh-serif': '' }, referenceTitle(entry, t)),
    !collapsed ? h(React.Fragment, null,
      h('p', { className: 'cite-zettel-meta' },
        h('span', null, authorLine),
        venueLine ? h('span', { className: 'cite-zettel-sep' }, ' · ' + venueLine) : null,
      ),
      work.doi ? h('p', { className: 'cite-zettel-doi cite-mono' }, 'DOI ' + work.doi) : null,
      h('div', { className: 'cite-zettel-preview' },
        h('div', { className: 'cite-zettel-preview-head' },
          h('span', { className: 'cite-label' }, styleLabel(style) + ' ' + t('引文预览', 'citation preview')),
        ),
        h(CiteOutput, { output: citation, label: t('引文预览', 'Citation preview'), t }),
      ),
      h('div', { className: 'cite-zettel-actions', 'data-tour': 'cite-copy-actions' },
        h(CiteButton, {
          variant: 'primary',
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
        h(CiteButton, {
          className: 'cite-crossref',
          icon: 'refresh',
          spinning: Boolean(running),
          disabled: locked || !work.doi,
          title: work.doi ? t('向 Crossref 查询 DOI，仅补空字段。', 'Looks up the DOI in Crossref and fills empty fields.') : t('此文献没有 DOI。', 'This reference has no DOI.'),
          onClick: () => enrich([id]),
        }, t('Crossref 补全', 'Enrich from Crossref')),
        h(CiteButton, {
          icon: 'edit',
          disabled: locked,
          'aria-haspopup': 'dialog',
          onClick: () => onEditMetadata(entry),
        }, t('编辑元数据', 'Edit metadata')),
      ),
      matchedSources.length || onRequestRemove ? h('div', { className: 'cite-zettel-footer' },
        matchedSources.length ? h(CiteButton, {
          variant: 'ghost',
          icon: 'file',
          'aria-haspopup': 'dialog',
          onClick: () => onOpenRawSource(entry),
        }, t('原始输入', 'Raw source')) : h('span', null),
        onRequestRemove ? h(CiteButton, {
          variant: 'danger',
          icon: 'trash',
          disabled: locked,
          'aria-haspopup': 'dialog',
          onClick: () => onRequestRemove([id]),
        }, t('删除', 'Remove')) : null,
      ) : null,
    ) : null,
  );
}

function CiteConstellation({
  entries, sources, revision, t, lang, uiStyle, uiFont, loading, loaded, locked, running,
  style, setStyle, copiedKey, filter, search, activeId, setActiveId,
  viewMode, setViewMode, onSearch, onFilter, onRefresh, onImport, enrich, copy, onRequestRemove, onEditMetadata, onOpenRawSource,
}) {
  const starfieldRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const pickerId = typeof React.useId === 'function' ? React.useId() : 'cite-constellation-style';
  const searchId = typeof React.useId === 'function' ? React.useId() : 'cite-constellation-search';

  const [viewport, setViewport] = useState({ width: 1200, height: 740 });
  const [nodePositions, setNodePositions] = useState({});
  const [draggingId, setDraggingId] = useState('');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = starfieldRef.current;
    if (!el || typeof el.getBoundingClientRect !== 'function') return undefined;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect && rect.width >= 200 && rect.height >= 200) {
        setViewport(prev => (
          Math.abs(prev.width - rect.width) < 4 && Math.abs(prev.height - rect.height) < 4
            ? prev
            : { width: Math.round(rect.width), height: Math.round(rect.height) }
        ));
      }
    };
    updateSize();
    if (typeof ResizeObserver === 'function') {
      const ro = new ResizeObserver(updateSize);
      ro.observe(el);
      return () => ro.disconnect();
    }
    return undefined;
  }, []);

  const { indexed, missingCount, enrichedCount } = useMemo(() => {
    const indexed = entries.map(entry => {
      const byline = authors(entry.work);
      const { title, doi, year, containerTitle } = entry.work;
      return {
        entry,
        byline,
        query: [title, byline, doi, year, entry.bibKey, containerTitle].join(' ').toLowerCase(),
      };
    });
    return {
      indexed,
      missingCount: entries.filter(entry => entry.warnings.length).length,
      enrichedCount: entries.filter(entry => entry.crossref).length,
    };
  }, [entries]);

  const filteredItems = useMemo(() => indexed.filter(({ entry }) => {
    if (filter === 'missing' && !entry.warnings.length) return false;
    if (filter === 'enriched' && !entry.crossref) return false;
    return true;
  }), [indexed, filter]);

  const visibleEntries = useMemo(() => filteredItems.map(item => item.entry), [filteredItems]);
  const query = search.trim().toLowerCase();
  const matchedSearchIds = useMemo(() => {
    if (!query) return null;
    const set = new Set();
    for (const item of filteredItems) {
      if (item.query.includes(query)) set.add(item.entry.id);
    }
    return set;
  }, [filteredItems, query]);

  const { edges, adjacency } = useMemo(() => computeConstellationEdges(visibleEntries), [visibleEntries]);
  const layout = useMemo(() => computeConstellationLayout(visibleEntries, edges, viewport), [visibleEntries, edges, viewport]);

  const effectivePositions = useMemo(() => {
    const next = {};
    for (const entry of visibleEntries) {
      next[entry.id] = nodePositions[entry.id] || layout.positions[entry.id] || { x: 240, y: 200 };
    }
    return next;
  }, [visibleEntries, nodePositions, layout.positions]);

  const activeEntry = useMemo(() => {
    if (!visibleEntries.length) return null;
    const exact = visibleEntries.find(e => e.id === activeId);
    if (exact && (!matchedSearchIds || matchedSearchIds.has(exact.id))) return exact;
    if (matchedSearchIds && matchedSearchIds.size > 0) {
      const firstMatch = visibleEntries.find(e => matchedSearchIds.has(e.id));
      if (firstMatch) return firstMatch;
    }
    return exact || visibleEntries[0];
  }, [visibleEntries, activeId, matchedSearchIds]);

  const selectedId = activeEntry?.id || '';
  const connectedNeighbors = selectedId ? (adjacency.get(selectedId) || new Set()) : new Set();

  function beginNodeDrag(entry, event) {
    if (event?.button !== undefined && event.button !== 0) return;
    event?.stopPropagation?.();
    const pos = effectivePositions[entry.id] || { x: 240, y: 200 };
    dragRef.current = {
      kind: 'node',
      id: entry.id,
      pointerId: event?.pointerId,
      startX: Number(event?.clientX ?? 0),
      startY: Number(event?.clientY ?? 0),
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
    suppressClickRef.current = false;
    try {
      if (event?.currentTarget?.setPointerCapture && event?.pointerId !== undefined) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    } catch { /* ignore capture failure */ }
  }

  function moveDrag(event) {
    const drag = dragRef.current;
    if (!drag) return;
    const clientX = Number(event?.clientX ?? 0);
    const clientY = Number(event?.clientY ?? 0);
    const dx = (clientX - drag.startX) / zoom;
    const dy = (clientY - drag.startY) / zoom;
    if (Math.hypot(dx, dy) > 3) {
      drag.moved = true;
      suppressClickRef.current = true;
    }
    if (drag.kind === 'node') {
      if (!draggingId) setDraggingId(drag.id);
      const halfW = Math.ceil(layout.nodeWidth / 2) + 12;
      const halfH = Math.ceil(layout.nodeHeight / 2) + 12;
      const nx = Math.round(Math.max(halfW, Math.min(layout.stageWidth - halfW, drag.originX + dx)));
      const ny = Math.round(Math.max(halfH, Math.min(layout.stageHeight - halfH, drag.originY + dy)));
      setNodePositions(prev => ({ ...prev, [drag.id]: { x: nx, y: ny } }));
    } else if (drag.kind === 'pan') {
      setPan({ x: Math.round(drag.originX + (clientX - drag.startX)), y: Math.round(drag.originY + (clientY - drag.startY)) });
    }
  }

  function endDrag(event) {
    const drag = dragRef.current;
    if (!drag) return;
    try {
      if (event?.currentTarget?.releasePointerCapture && drag.pointerId !== undefined) {
        event.currentTarget.releasePointerCapture(drag.pointerId);
      }
    } catch { /* ignore */ }
    if (drag.kind === 'node' && !drag.moved) {
      setActiveId(drag.id);
    }
    dragRef.current = null;
    setDraggingId('');
  }

  function beginPan(event) {
    if (event?.button !== undefined && event.button !== 0) return;
    if (event?.target?.closest?.('.cite-node, .cite-capsule, .cite-zettelkasten, .cite-constellation-legend, .cite-constellation-empty')) return;
    dragRef.current = {
      kind: 'pan',
      pointerId: event?.pointerId,
      startX: Number(event?.clientX ?? 0),
      startY: Number(event?.clientY ?? 0),
      originX: pan.x,
      originY: pan.y,
      moved: false,
    };
    try {
      if (event?.currentTarget?.setPointerCapture && event?.pointerId !== undefined) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    } catch { /* ignore */ }
  }

  function adjustZoom(delta) {
    setZoom(prev => Math.max(0.65, Math.min(1.45, Math.round((prev + delta) * 100) / 100)));
  }

  function resetConstellationView() {
    setNodePositions({});
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }

  const filters = [
    { id: 'all', label: t('全部', 'All'), count: entries.length },
    { id: 'missing', label: t('有字段缺失', 'Missing fields'), count: missingCount },
    { id: 'enriched', label: t('已查询 Crossref', 'Crossref checked'), count: enrichedCount },
  ];
  const searchLabel = t('搜索星图中的标题、作者、DOI…', 'Search title, author, DOI…');

  return h('div', {
    className: 'cite-constellation',
    'data-cite-view': 'graph',
    'data-dragging': draggingId ? 'true' : 'false',
  },
    h('div', {
      ref: starfieldRef,
      className: 'cite-starfield',
      'data-tour': 'cite-starfield',
      onPointerDown: beginPan,
      onPointerMove: moveDrag,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
      h('div', { className: 'cite-starfield-halo', 'aria-hidden': 'true' }),
      h('div', {
        className: 'cite-constellation-stage',
        style: {
          width: layout.stageWidth + 'px',
          height: layout.stageHeight + 'px',
          transform: 'translate(' + pan.x + 'px, ' + pan.y + 'px) scale(' + zoom + ')',
        },
      },
        h('svg', {
          className: 'cite-filaments',
          width: layout.stageWidth,
          height: layout.stageHeight,
          viewBox: '0 0 ' + layout.stageWidth + ' ' + layout.stageHeight,
          'aria-hidden': 'true',
        },
          edges.map(edge => {
            const p1 = effectivePositions[edge.source];
            const p2 = effectivePositions[edge.target];
            if (!p1 || !p2) return null;
            const isActive = Boolean(selectedId && (edge.source === selectedId || edge.target === selectedId));
            const isDimmed = Boolean(selectedId && !isActive);
            return h('path', {
              key: edge.id,
              className: 'cite-filament',
              'data-edge-kind': edge.kind,
              'data-active': String(isActive),
              'data-dimmed': String(isDimmed),
              d: filamentPath(p1, p2, edge.id),
              strokeDasharray: isActive ? undefined : '4 5',
            });
          }),
        ),
        visibleEntries.map(entry => {
          const pos = effectivePositions[entry.id] || { x: 240, y: 200 };
          const isActive = entry.id === selectedId;
          const isNeighbor = Boolean(selectedId && !isActive && connectedNeighbors.has(entry.id));
          const isSearchMatch = Boolean(matchedSearchIds && matchedSearchIds.has(entry.id));
          const isSearchMismatch = Boolean(matchedSearchIds && !matchedSearchIds.has(entry.id));
          const isDimmed = isSearchMismatch || Boolean(selectedId && !isActive && !isNeighbor);
          const firstAu = entry.work.authors?.[0];
          const shortAuthor = firstAu ? (firstAu.family || firstAu.name || firstAu.given || '') : t('佚名', 'Anon');
          const statusTone = entry.crossref ? 'success' : (entry.warnings?.length ? 'warn' : 'ready');

          return h('button', {
            key: entry.id,
            type: 'button',
            className: 'cite-node',
            'data-cite-node': entry.id,
            'data-tour': isActive ? 'cite-constellation-node' : undefined,
            'data-active': String(isActive),
            'data-neighbor': String(isNeighbor),
            'data-dimmed': String(isDimmed),
            'data-search-match': isSearchMatch ? 'true' : undefined,
            'data-dragging': draggingId === entry.id ? 'true' : undefined,
            'data-status': statusTone,
            'aria-pressed': isActive,
            style: {
              left: pos.x + 'px',
              top: pos.y + 'px',
              width: layout.nodeWidth + 'px',
              minHeight: layout.nodeHeight + 'px',
              opacity: isDimmed ? 0.38 : 1,
            },
            onPointerDown: event => beginNodeDrag(entry, event),
            onPointerMove: event => { event?.stopPropagation?.(); moveDrag(event); },
            onPointerUp: event => { event?.stopPropagation?.(); endDrag(event); },
            onPointerCancel: event => { event?.stopPropagation?.(); endDrag(event); },
            onClick: () => {
              if (suppressClickRef.current) {
                suppressClickRef.current = false;
                return;
              }
              setActiveId(entry.id);
            },
          },
            h('span', { className: 'cite-node-head' },
              h('span', { className: 'cite-node-badge' },
                h('span', { className: 'cite-node-star', 'aria-hidden': 'true' }, isActive ? '✦' : '●'),
                h('span', { className: 'cite-node-author' }, shortAuthor),
                entry.work.year ? h('span', { className: 'cite-node-year' }, '· ' + entry.work.year) : null,
              ),
              entry.bibKey ? h('span', { className: 'cite-node-key cite-mono' }, '@' + entry.bibKey) : null,
            ),
            h('strong', { className: 'cite-node-title', 'data-dsh-serif': '' }, referenceTitle(entry, t)),
            h('span', { className: 'cite-node-foot' },
              entry.work.containerTitle || (entry.work.doi ? 'DOI ' + entry.work.doi : t('待补全元数据', 'Local metadata')),
            ),
          );
        }),
      ),
      h('section', {
        className: 'cite-capsule',
        'data-dsh-card': '',
        'data-tour': 'cite-constellation-capsule',
        'aria-label': t('星图控制台', 'Constellation controls'),
      },
        h('div', { className: 'cite-capsule-row' },
          h(CiteSegmented, {
            id: 'cite-capsule-view-toggle',
            label: t('视图切换', 'View mode'),
            value: viewMode,
            className: 'cite-view-toggle',
            options: [
              { value: 'graph', label: t('星图', 'Constellation') },
              { value: 'list', label: t('列表', 'List') },
            ],
            onChange: setViewMode,
          }),
          h('div', { className: 'cite-capsule-picker', 'data-tour': 'cite-format-picker' },
            h('label', { className: 'cite-sr-only', htmlFor: pickerId }, t('引文格式', 'Citation format')),
            h(CitePicker, {
              id: pickerId,
              label: t('引文格式', 'Citation format'),
              value: style,
              options: citationStyles,
              onChange: setStyle,
            }),
          ),
        ),
        h('div', { className: 'cite-capsule-row' },
          h('div', { className: 'cite-capsule-search' },
            h('label', { className: 'cite-sr-only', htmlFor: searchId }, searchLabel),
            h(CiteInput, {
              id: searchId,
              className: 'cite-search',
              type: 'search',
              'aria-label': searchLabel,
              placeholder: searchLabel,
              value: search,
              onChange: event => onSearch(event.target.value),
              icon: 'search',
            }),
          ),
          matchedSearchIds ? h(CiteChip, { tone: matchedSearchIds.size ? 'accent' : 'warn' },
            t('匹配 ' + matchedSearchIds.size + ' / ' + visibleEntries.length, matchedSearchIds.size + ' / ' + visibleEntries.length + ' match'),
          ) : null,
          h(CiteIconButton, {
            icon: 'refresh',
            spinning: Boolean(loading || running),
            label: t('刷新文献库', 'Refresh library'),
            disabled: locked,
            onClick: onRefresh,
          }),
        ),
        h('div', { className: 'cite-capsule-filters', role: 'group', 'aria-label': t('按文献状态筛选', 'Filter by reference status') },
          filters.map(item => h('button', {
            key: item.id,
            type: 'button',
            className: 'cite-pill-filter',
            'aria-pressed': filter === item.id,
            onClick: () => onFilter(item.id),
          }, h('span', null, item.label), h('span', { className: 'cite-count' }, item.count))),
          Object.keys(nodePositions).length || pan.x !== 0 || pan.y !== 0 || zoom !== 1
            ? h('button', {
              type: 'button',
              className: 'cite-pill-filter cite-pill-reset',
              onClick: resetConstellationView,
            }, t('重置星图', 'Reset orbit'))
            : null,
        ),
      ),
      visibleEntries.length ? h('div', { className: 'cite-constellation-legend', 'aria-label': t('星图图例与缩放', 'Constellation legend and zoom') },
        h('span', { className: 'cite-legend-stat' },
          t(visibleEntries.length + ' 篇文献 · ' + edges.length + ' 条引力线', visibleEntries.length + ' papers · ' + edges.length + ' filaments'),
        ),
        h('span', { className: 'cite-legend-hint' }, t('拖拽节点可自由编排星图', 'Drag any node to arrange')),
        h('div', { className: 'cite-zoom-controls' },
          h('button', { type: 'button', className: 'cite-zoom-btn', 'aria-label': t('缩小星图', 'Zoom out'), onClick: () => adjustZoom(-0.15) }, '−'),
          h('span', { className: 'cite-zoom-readout cite-mono' }, Math.round(zoom * 100) + '%'),
          h('button', { type: 'button', className: 'cite-zoom-btn', 'aria-label': t('放大星图', 'Zoom in'), onClick: () => adjustZoom(0.15) }, '+'),
        ),
      ) : null,
      loading ? h('div', { className: 'cite-constellation-empty cite-skeleton-wrap', role: 'status', 'aria-busy': 'true', 'aria-label': t('正在读取文献库…', 'Loading library…') },
        [0, 1, 2].map(idx => h(W.Skeleton, { key: idx, variant: 'row' })),
      )
        : !loaded ? h('div', { className: 'cite-constellation-empty' }, h(W.Empty, {
          title: t('暂时无法读取文献库', 'Could not load the library'),
          action: h(CiteButton, { icon: 'refresh', disabled: locked, onClick: onRefresh }, t('重新加载', 'Reload')),
        }))
        : entries.length === 0 ? h('div', { className: 'cite-constellation-empty' }, h(W.Empty, {
          icon: 'book',
          title: t('文献库为空', 'Your library is empty'),
          action: h(CiteButton, { variant: 'primary', icon: 'plus', onClick: onImport }, t('导入文献', 'Import references')),
        }, t('从 DOI 列表或 BibTeX 开始点亮文献星图。', 'Start with a DOI list or a BibTeX file to populate the constellation.')))
        : visibleEntries.length === 0 ? h('div', { className: 'cite-constellation-empty' }, h(W.Empty, {
          icon: 'search',
          title: t('当前筛选下没有文献', 'No references in this filter'),
          action: h(CiteButton, { icon: 'close', onClick: () => { onFilter('all'); onSearch(''); } }, t('显示全部文献', 'Show all references')),
        }))
        : null,
      activeEntry ? h(CiteZettelkastenHud, {
        key: activeEntry.id,
        entry: activeEntry,
        sources,
        style,
        lang,
        revision,
        locked,
        running,
        copiedKey,
        neighborCount: connectedNeighbors.size,
        enrich,
        copy,
        onEditMetadata,
        onOpenRawSource,
        onRequestRemove,
        t,
      }) : null,
    ),
  );
}

const CITE_SAMPLE_DOI = '10.1038/nature14539\n10.1145/3368089.3409749';
const CITE_SAMPLE_BIBTEX = [
  '@article{lecun2015deep,',
  '  title={Deep learning},',
  '  author={LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey},',
  '  journal={Nature},',
  '  volume={521},',
  '  number={7553},',
  '  pages={436--444},',
  '  year={2015},',
  '  doi={10.1038/nature14539}',
  '}',
  '',
  '@inproceedings{vaswani2017attention,',
  '  title={Attention Is All You Need},',
  '  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki},',
  '  booktitle={Advances in Neural Information Processing Systems},',
  '  year={2017}',
  '}',
].join('\n');

function CiteImport({
  t, locked, kind, text, label, preview, chosen, dirty, conflict,
  changeImport, upload, onPreview, onChoose, onRetry, onSave, onBack,
}) {
  const id = typeof React.useId === 'function' ? React.useId() : 'cite-import';
  const file = useRef(null);
  const inputLabel = t('DOI / BibTeX 输入', 'DOI / BibTeX input');
  const noInput = !text.trim();
  const chosenRows = new Set(chosen);
  function fillSample() {
    changeImport({
      kind,
      text: kind === 'bibtex' ? CITE_SAMPLE_BIBTEX : CITE_SAMPLE_DOI,
      label: t('示例文献', 'Sample references'),
    });
  }
  return h(CiteSubpage, {
    title: t('DOI / BibTeX 导入预览与去重', 'DOI / BibTeX import and deduplication'),
    description: t('先在本地检查重复和缺失字段，再勾选要保存的文献。', 'Review duplicates and missing fields locally, then select entries to save.'),
  },
    h('form', { onSubmit: event => { event.preventDefault(); if (!locked && !noInput && !conflict) onPreview(); } },
      h(CiteCard, {
        title: t('批量输入', 'Batch input'),
        actions: h('div', { className: 'cite-actions' },
          h(CiteButton, { icon: 'sparkles', disabled: locked, onClick: fillSample }, t('填入示例 DOI / BibTeX', 'Fill sample BibTeX / DOI')),
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
          h('label', { className: 'cite-sr-only', htmlFor: id + '-file' }, t('上传 BibTeX 文件', 'Upload BibTeX file')),
          h('input', { id: id + '-file', hidden: true, ref: file, type: 'file', accept: '.bib', onChange: upload }),
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

function CiteCheck({ t, lang, text, report, onReport, onChange, onSendToImport }) {
  const id = typeof React.useId === 'function' ? React.useId() : 'cite-check';
  const request = useRef(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => () => {
    if (typeof request.current?.abort === 'function') request.current.abort();
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

  const validDois = report ? report.results.filter(row => row.ok).map(row => row.doi) : [];
  const pass = validDois.length;
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
        running ? h('div', { className: 'cite-skeleton-wrap' },
          h(W.Skeleton, { variant: 'card', label: t('正在核查 DOI…', 'Checking DOIs…') }),
          h(W.Skeleton, { variant: 'row' }),
        ) : null,
        cancelled ? h('p', { className: 'cite-muted', role: 'status' }, t('已取消核查。', 'DOI check cancelled.')) : null,
        error ? h(W.Status, { tone: 'error' }, error) : null,
      ),
    ),
    report ? h(CiteCard, {
      title: t('核查结果', 'Check results'),
      actions: pass > 0 && onSendToImport ? h(CiteButton, {
        variant: 'primary',
        icon: 'right',
        onClick: () => onSendToImport(validDois),
      }, t('送入导入预览', 'Send to Import preview') + ' (' + pass + ')') : null,
    },
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
  entries, sources, revision, t, lang, uiStyle, uiFont, loading, loaded, locked, running,
  selected, setSelected, style, setStyle, copiedKey, viewMode = 'graph', setViewMode,
  filter, search, limit, activeId, setActiveId, onSearch, onFilter, onMore, onRefresh, onImport,
  enrich, copy, onRequestRemove, onModalOpen, onEditMetadata, onOpenRawSource,
}) {
  const [openedId, setOpenedId] = useState('');
  const lastRow = useRef(null);
  const root = useRef(null);
  const pickerId = typeof React.useId === 'function' ? React.useId() : 'cite-style-picker';
  const searchId = typeof React.useId === 'function' ? React.useId() : 'cite-library-search';
  const listId = typeof React.useId === 'function' ? React.useId() : 'cite-list-pane';
  const split = useResizableSplit(React, {
    key: 'dsh-cite:list-width',
    initial: 320,
    min: 220,
    max: 520,
  });
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

  async function quickCopy(entry) {
    try {
      const value = await api({ action: 'export', kind: 'references', ids: [entry.id], style, lang }, lang);
      const text = String(value?.content || '').trim() || referenceTitle(entry, t);
      await copy(text, t('引文', 'citation'), 'row-' + entry.id);
    } catch {
      await copy(entry.work.doi || referenceTitle(entry, t), t('引文', 'citation'), 'row-' + entry.id);
    }
  }

  function quickInspect(entry) {
    setActiveId(entry.id);
    setOpenedId(entry.id);
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        const target = root.current?.querySelector?.('.cite-detail-title, .cite-back');
        if (target) {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      });
    }
  }

  if (viewMode === 'graph') {
    return h(CiteConstellation, {
      entries, sources, revision, t, lang, uiStyle, uiFont, loading, loaded, locked, running,
      style, setStyle, copiedKey, filter, search, activeId, setActiveId,
      viewMode, setViewMode, onSearch, onFilter, onRefresh, onImport, enrich, copy,
      onRequestRemove, onEditMetadata, onOpenRawSource,
    });
  }

  return h('div', {
    ref: root,
    className: 'cite-library dsh-split-pane',
    'data-cite-view': 'list',
    'data-open': String(open),
    style: split.paneStyle,
  },
    h('aside', { className: 'cite-rail', 'aria-label': t('文献库筛选', 'Library filters') },
      h('div', { className: 'cite-style-box', 'data-dsh-card': '', 'data-tour': 'cite-format-picker' },
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
    h('section', { id: listId, className: 'cite-list dsh-split-leading', 'aria-label': t('文献列表', 'Reference list'), 'aria-busy': loading },
      h('div', { className: 'cite-searchbar' },
        h('div', { className: 'cite-search-field' },
          h('label', { className: 'cite-sr-only', htmlFor: searchId }, searchLabel),
          h(CiteInput, {
            id: searchId,
            className: 'cite-search',
            type: 'search',
            'aria-label': searchLabel,
            placeholder: searchLabel + '…',
            value: search,
            onChange: changeSearch,
            icon: 'search',
          }),
        ),
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
        loading ? h('div', { className: 'cite-list-loading cite-skeleton-wrap', role: 'status', 'aria-busy': 'true', 'aria-label': t('正在读取文献库…', 'Loading library…') },
          [0, 1, 2, 3].map(idx => h(W.Skeleton, { key: idx, variant: 'row' })),
        )
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
            copied: copiedKey === 'row-' + entry.id,
            disabled: locked || (selected.length >= 100 && !selectedIds.has(entry.id)), t,
            onOpen: event => {
              lastRow.current = event.currentTarget;
              setActiveId(entry.id);
              setOpenedId(entry.id);
            },
            onSelect: checked => setSelected(checked ? [...selected, entry.id] : selected.filter(id => id !== entry.id)),
            onQuickCopy: () => quickCopy(entry),
            onQuickInspect: () => quickInspect(entry),
          }))),
        visible.length < matches.length ? h(CiteButton, { className: 'cite-more', onClick: onMore },
          t('再显示 50 条', 'Show 50 more'),
        ) : null,
      ),
      selected.length ? h('div', { className: 'cite-selection-footer' },
        h('div', { className: 'cite-actions' },
          h(CiteButton, {
            icon: 'refresh', spinning: Boolean(running), disabled: locked || !canEnrichSelected, onClick: () => enrich(selected),
          }, t('从 Crossref 补全所选', 'Enrich selection from Crossref')),
          onRequestRemove ? h(CiteButton, {
            variant: 'danger',
            icon: 'trash',
            disabled: locked,
            'aria-haspopup': 'dialog',
            onClick: () => onRequestRemove(selected),
          }, t('删除所选', 'Remove selected') + ' (' + selected.length + ')') : null,
        ),
      ) : null,
    ),
    h(W.SplitResizer, {
      ...split.resizerProps,
      'aria-controls': listId,
      label: t('调整文献列表宽度', 'Resize reference list pane'),
      className: 'cite-resizer',
    }),
    h('section', { className: 'cite-inspector dsh-split-trailing', 'aria-label': t('文献详情', 'Reference details') },
      open ? h(CiteButton, { className: 'cite-back', icon: 'left', variant: 'ghost', onClick: back }, t('返回文献列表', 'Back to references')) : null,
      active
        ? h(CiteInspector, {
          key: active.id, entry: active, sources, style, uiStyle, uiFont, lang, revision, locked, running, copiedKey,
          enrich, copy, onRequestRemove, onModalOpen, onEditMetadata, onOpenRawSource, t,
        })
        : h('p', { className: 'cite-inspector-empty' }, t('选择文献以查看引文与元数据。', 'Select a reference to view its citation and metadata.')),
    ),
  );
}

function CiteReferenceRow({ entry, byline, active, checked, copied, disabled, t, onOpen, onSelect, onQuickCopy, onQuickInspect }) {
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
      h('span', { className: 'cite-reference-title-line' },
        h('span', { className: 'dsh-pixel-cursor', 'aria-hidden': 'true' }, '▶'),
        h('strong', { 'data-dsh-serif': '' }, title),
      ),
      meta ? h('span', { className: 'cite-reference-meta' }, meta) : null,
      h('span', { className: 'cite-chips' },
        bibKey ? h(CiteChip, { tone: 'accent' }, '@' + bibKey) : null,
        work.doi ? h(CiteChip, null, 'DOI ' + work.doi) : null,
        warnings.length ? h(CiteChip, { tone: 'warn', title: warnings.map(code => warningLabel(code, t)).join(' · ') }, t('字段缺失', 'Missing fields')) : null,
        crossref ? h(CiteChip, { tone: 'success' }, t('已查询 Crossref', 'Crossref checked')) : null,
      ),
    ),
    h('div', { className: 'dsh-row-actions cite-row-actions' },
      h(CiteIconButton, {
        icon: copied ? 'check' : 'copy',
        'data-copied': copied ? 'true' : undefined,
        'data-cite-quick-copy': entry.id,
        label: copied ? t('已复制引文', 'Copied citation') : t('快速复制引文', 'Quick copy citation'),
        onClick: onQuickCopy,
      }),
      h(CiteIconButton, {
        icon: 'right',
        'data-cite-quick-inspect': entry.id,
        label: t('查看详情', 'Inspect reference'),
        onClick: onQuickInspect,
      }),
    ),
  );
}

function CiteInspector({ entry, sources, style, uiStyle, uiFont, lang, revision, locked, running, copiedKey, enrich, copy, onRequestRemove, onModalOpen, onEditMetadata, onOpenRawSource, t }) {
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
      h('div', { className: 'cite-actions', 'data-tour': 'cite-copy-actions' },
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
        onEditMetadata ? h(CiteButton, {
          icon: 'edit',
          disabled: locked,
          'aria-haspopup': 'dialog',
          onClick: () => onEditMetadata(entry),
        }, t('编辑元数据', 'Edit metadata')) : null,
        matchedSources.length ? h(CiteButton, {
          variant: 'ghost',
          icon: 'file',
          'aria-haspopup': 'dialog',
          onClick: () => {
            if (onOpenRawSource) onOpenRawSource(entry);
            else { onModalOpen?.(); setSourceOpen(true); }
          },
        }, t('原始输入', 'Raw source')) : null,
        onRequestRemove ? h(CiteButton, {
          variant: 'danger',
          icon: 'trash',
          disabled: locked,
          'aria-haspopup': 'dialog',
          onClick: () => onRequestRemove([id]),
        }, t('删除', 'Remove')) : null,
      ),
    ),
    h('div', { className: 'cite-inspector-scroll' },
      h('h2', { className: 'cite-detail-title', 'data-dsh-serif': '' }, referenceTitle(entry, t)),
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
    sourceOpen ? h(CiteRawSourceModal, {
      key: entry.id + ':' + revision,
      entry,
      sources,
      revision,
      uiStyle,
      uiFont,
      lang,
      copiedKey,
      copy,
      onClose: () => setSourceOpen(false),
      t,
    }) : null,
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
      const [uiFont, setUiFont] = useDshFont(React);
      const [activeTab, setActiveTab] = useState('library');
      const [viewMode, setViewMode] = useState('graph');
      const [library, setLibrary] = useState(null);
      const [job, setJob] = useState(null);
      const [loading, setLoading] = useState(true);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const [notice, setNotice] = useState('');
      const [copiedKey, setCopiedKey] = useState('');
      const [removeModal, setRemoveModal] = useState(null);
      const [editModalEntry, setEditModalEntry] = useState(null);
      const [rawSourceEntry, setRawSourceEntry] = useState(null);
      const [tour, setTour] = useState({ open: false, step: 0, manual: false });
      const [tourLayout, setTourLayout] = useState(null);
      const [search, setSearch] = useState('');
      const [filter, setFilter] = useState('all');
      const [limit, setLimit] = useState(pageSize);
      const [activeId, setActiveId] = useState('');
      const [exportScope, setExportScope] = useState(() => draft.selected.length ? 'selected' : 'all');
      const [checkText, setCheckText] = useState('');
      const [checkReport, setCheckReport] = useState(null);
      const [form, setForm] = useState(draft);
      const { kind, text, label, preview, chosen, selected, style, dirty, conflict } = form;

      const rootRef = useRef(null);
      const triggerRef = useRef(null);
      const modalOpenRef = useRef(false);
      modalOpenRef.current = Boolean(removeModal || editModalEntry || rawSourceEntry);
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
      __stardustUpdatesGuard(React, "dsh-cite", { dirty, busy: locked || Boolean(removeModal || editModalEntry), retainOnClose: true });

      useEffect(() => () => {
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      }, []);
      useEffect(() => {
        if (!workbench || W.readTourDone('dsh-cite.tour.v1')) return undefined;
        const timer = setTimeout(() => {
          if (!W.readTourDone('dsh-cite.tour.v1') && !modalOpenRef.current) {
            setTour({ open: true, step: 0, manual: false });
          }
        }, 280);
        return () => clearTimeout(timer);
      }, [workbench]);
      useEffect(() => {
        if ((removeModal || editModalEntry || rawSourceEntry) && tour.open) {
          setTour(prev => ({ ...prev, open: false }));
        }
      }, [removeModal, editModalEntry, rawSourceEntry]);
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

      async function writeClipboardText(value) {
        const P = hostPrimitives();
        if (typeof P?.writeClipboard === 'function') {
          await P.writeClipboard(value);
          return;
        }
        await navigator.clipboard.writeText(value);
      }

      async function copy(value, format, key = '') {
        try {
          await writeClipboardText(value);
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

      function closeTour(restoreFocus = false) {
        W.writeTourDone('dsh-cite.tour.v1');
        setTour(prev => ({ ...prev, open: false }));
        if (restoreFocus) {
          setTimeout(() => {
            (triggerRef.current || rootRef.current?.querySelector?.('[data-cite-tour-trigger]'))?.focus?.();
          }, 0);
        }
      }

      async function copyTourPrompt(value) {
        try {
          await writeClipboardText(value);
          setError('');
          setNotice(t('已复制对话指令，可直接粘贴到聊天框。', 'Copied prompt — paste it into chat.'));
          return true;
        } catch {
          setNotice('');
          setError(t('无法访问剪贴板，请手动复制。', 'Clipboard access is unavailable.'));
          return false;
        }
      }

      const tourSteps = [
        {
          id: 'capsule',
          selector: '[data-tour="cite-constellation-capsule"]',
          fallback: '[data-cite-topbar-view-toggle]',
          side: 'right',
          title: t('星图控制台与「星图 / 列表」切换', 'Constellation controls & view toggle'),
          desc: t('默认以「文献引力星图」呈现整库文献；在此切换 GB/T 7714 / APA / IEEE / MLA / Chicago 引文格式、即时高亮搜索节点、按质量筛选，或一键切回经典三栏「列表」视图。', 'Explore your library in the Spatial Citation Constellation by default—switch GB/T 7714 / APA / IEEE / MLA / Chicago styles, highlight matching nodes on the starfield, filter by quality, or toggle to the classic 3-pane List view in 1 click.'),
        },
        {
          id: 'orbit',
          selector: '[data-tour="cite-constellation-node"]',
          fallback: '[data-tour="cite-starfield"]',
          side: 'bottom',
          title: t('拖拽编排节点与自动引力连线', 'Draggable nodes & relationship filaments'),
          desc: t('任意文献节点均可自由拖拽排布，SVG 引力连线实时追踪同作者、同刊物、同期（±2 年）与 Crossref 聚类关联；点击节点即点亮 ✦ 光晕与邻居。也可复制指令让助手核验并导入：', 'Drag any orbital node across the starfield while curved SVG filaments track shared authors, venues, eras (±2y), and Crossref clusters live. Click a node to highlight ✦ neighbors—or copy this chat prompt to verify & import:'),
          prompt: t('帮我核验这篇论文的 DOI 与真实元数据并导入引文库', 'Verify this paper’s DOI and metadata, then import it into my citation library'),
          promptLabel: t('复制核验导入指令', 'Copy verify & import prompt'),
        },
        {
          id: 'zettelkasten',
          selector: '[data-tour="cite-zettelkasten-hud"]',
          fallback: '[data-tour="cite-copy-actions"]',
          side: 'left',
          title: t('悬浮卡片盒：一键复制、补全与编辑', 'Floating Zettelkasten card: copy, enrich & edit'),
          desc: t('右下角悬浮索引卡实时渲染选中论文的标准引文预览，一键完成「复制引文」「复制 BibTeX」「Crossref 补全」与「编辑元数据」，也可直接查看原始输入或安全删除。', 'The bottom-right Zettelkasten card previews formatted citations live with 1-click Copy citation, Copy BibTeX, Enrich from Crossref, and Edit metadata—plus Raw source inspection and safe removal.'),
        },
        {
          id: 'appearance',
          selector: '.dsh-style-switcher',
          fallback: '#cite-style-switcher',
          side: 'bottom',
          title: t('13 套工作台风格、8 套字体与导入/导出', '13 visual styles, 8 fonts & batch Import / Export'),
          desc: t('右上角可随时切换 13 套明亮护眼风格与 8 套字体搭配（跨插件同步）；也可通过「导入 DOI / BibTeX」「DOI 核查」「导出备份」完成批量去重入库与完整来源存档。', 'Switch among 13 daylight-friendly workbench styles and 8 font pairings (synced across plugins), or use Import DOI / BibTeX, DOI check, and Export in the topbar for batch workflows and full backups.'),
        },
      ];

      const removeEntries = removeModal
        ? removeModal.ids.map(id => entries.find(entry => entry.id === id)).filter(Boolean)
        : [];

      async function confirmRemove() {
        if (!removeModal || busyRef.current) return;
        const targetIds = removeModal.ids;
        const single = targetIds.length === 1 ? entries.find(entry => entry.id === targetIds[0]) : null;
        busyRef.current = true;
        setBusy(true);
        setError('');
        setNotice('');
        try {
          const payload = targetIds.length === 1
            ? { action: 'remove', operation: 'remove', id: targetIds[0], ...(single?.bibKey ? { citekey: single.bibKey } : {}), expectedRevision: revision }
            : { action: 'remove', operation: 'remove', ids: targetIds, expectedRevision: revision };
          const result = await api(payload, lang);
          const removedSet = new Set(targetIds);
          setLibrary(result);
          updateForm({ selected: selected.filter(id => !removedSet.has(id)) });
          if (removedSet.has(activeId)) setActiveId(result.entries[0]?.id || '');
          setRemoveModal(null);
          setNotice(t(
            '已从文献库删除 ' + targetIds.length + ' 条文献。',
            'Removed ' + targetIds.length + (targetIds.length === 1 ? ' reference from the library.' : ' references from the library.'),
          ));
        } catch (err) {
          setRemoveModal(old => old ? { ...old, conflict: err.status === 409, error: err.message } : null);
        } finally {
          busyRef.current = false;
          setBusy(false);
        }
      }

      async function refreshAfterRemoveConflict() {
        if (!removeModal || busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        try {
          const state = await api({ action: 'list' }, lang);
          const validIds = new Set(state.entries.map(entry => entry.id));
          setLibrary(state);
          setForm(old => ({ ...old, selected: old.selected.filter(id => validIds.has(id)) }));
          const remaining = removeModal.ids.filter(id => validIds.has(id));
          setRemoveModal(remaining.length ? { ids: remaining, conflict: false, error: '' } : null);
        } catch (err) {
          setRemoveModal(old => old ? { ...old, error: err.message } : null);
        } finally {
          busyRef.current = false;
          setBusy(false);
        }
      }

      const tabs = [
        { id: 'library', label: t('引文库', 'Library'), count: library ? entries.length : undefined },
        { id: 'import', label: t('导入预览', 'Import') },
        { id: 'check', label: t('DOI 核查', 'DOI check') },
        { id: 'export', label: t('导出备份', 'Export') },
      ];
      const tabId = typeof React.useId === 'function' ? React.useId() : 'cite-tabs';
      const tabsIndicator = useSlidingTabIndicator(React, activeTab, { deps: [lang, library ? entries.length : 0] });
      function onTabKeyDown(event, index) {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        const node = event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[next];
        setActiveTab(tabs[next].id);
        node?.focus?.();
      }
      const onImport = () => setActiveTab('import');
      const onRequestRemove = ids => {
        setTour(prev => (prev.open ? { ...prev, open: false } : prev));
        setRemoveModal({ ids: [...ids], conflict: false, error: '' });
      };

      const onEditMetadata = entry => {
        setTour(prev => (prev.open ? { ...prev, open: false } : prev));
        setEditModalEntry(entry);
      };
      const onOpenRawSource = entry => {
        setTour(prev => (prev.open ? { ...prev, open: false } : prev));
        setRawSourceEntry(entry);
      };
      const switchLibraryView = nextView => {
        setViewMode(nextView);
        if (activeTab !== 'library') setActiveTab('library');
      };

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
            onSendToImport: validDois => {
              changeImport({
                kind: 'doi',
                text: validDois.join('\n'),
                label: t('DOI 核查通过', 'Verified DOIs'),
              });
              setActiveTab('import');
              setNotice(t(
                '已将 ' + validDois.length + ' 个核查通过的 DOI 送入导入区，点击「本地预览」即可去重入库。',
                'Pre-filled ' + validDois.length + ' verified DOIs in Import. Click Local preview to check duplicates.',
              ));
            },
          });
          break;
        case 'export':
          panel = h(CiteExport, {
            t, lang, entries, selected, style, setStyle, revision, scope: exportScope, onScope: setExportScope,
          });
          break;
        default:
          panel = h(CiteLibrary, {
            t, lang, uiStyle, uiFont, entries, sources, revision, loading, loaded: !!library, locked, running,
            selected, setSelected, style, setStyle, copiedKey, viewMode, setViewMode,
            filter, search, limit, activeId, setActiveId, onImport, enrich, copy, onRequestRemove,
            onEditMetadata, onOpenRawSource,
            onModalOpen: () => setTour(prev => (prev.open ? { ...prev, open: false } : prev)),
            onSearch: value => { setSearch(value); setActiveId(''); setLimit(pageSize); },
            onFilter: value => { setFilter(value); setActiveId(''); setLimit(pageSize); },
            onMore: () => setLimit(n => n + pageSize),
            onRefresh: () => perform(refresh),
          });
      }

      return h('section', {
        ref: rootRef,
        className: 'dshw cite-workbench',
        'data-main': String(Boolean(workbench)),
        'data-dsh-style': uiStyle,
        'data-dsh-font': uiFont,
      },
        h(W.Styles),
        h('style', null, CITE_WORKBENCH_CSS),
        h('div', { className: 'cite-shell' },
          h('header', { className: 'dsh-header cite-header', 'data-dsh-header': '' },
            h('div', { className: 'dsh-header-leading' },
              h('div', { className: 'dsh-header-brand cite-brand' },
                h('span', { className: 'dsh-header-badge cite-brand-icon', 'aria-hidden': 'true' }, h(W.Icon, { name: 'book', size: 14 })),
                h('h1', { className: 'dsh-header-title' }, 'dsh-cite'),
              ),
              h('div', { className: 'dsh-header-tabs' },
                h('div', {
                  className: 'w-tabs dsh-tablist dsh-tablist-pill',
                  role: 'tablist',
                  'aria-label': t('引文工作台', 'Citation workbench'),
                  ...tabsIndicator.tablistProps,
                },
                  tabs.map((item, index) => h('button', {
                    type: 'button',
                    role: 'tab',
                    key: item.id,
                    id: tabId + '-' + item.id,
                    'data-tab-id': item.id,
                    'aria-selected': activeTab === item.id,
                    tabIndex: activeTab === item.id ? 0 : -1,
                    onClick: () => setActiveTab(item.id),
                    onKeyDown: event => onTabKeyDown(event, index),
                  },
                    item.label,
                    item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null,
                  )),
                  h('span', tabsIndicator.indicatorProps),
                ),
              ),
            ),
            h('div', { className: 'dsh-header-actions cite-header-actions' },
              h('div', {
                className: 'cite-topbar-view-switch',
                role: 'group',
                'aria-label': t('星图或列表视图', 'Constellation or list view'),
                'data-cite-topbar-view-toggle': '',
              },
                h('button', {
                  type: 'button',
                  className: 'cite-topbar-view-btn',
                  'data-view-mode': 'graph',
                  'aria-pressed': activeTab === 'library' && viewMode === 'graph',
                  onClick: () => switchLibraryView('graph'),
                }, t('星图', 'Constellation')),
                h('button', {
                  type: 'button',
                  className: 'cite-topbar-view-btn',
                  'data-view-mode': 'list',
                  'aria-pressed': activeTab === 'library' && viewMode === 'list',
                  onClick: () => switchLibraryView('list'),
                }, t('列表', 'List')),
              ),
              h(CiteButton, {
                ref: triggerRef,
                variant: 'ghost',
                className: 'cite-tour-trigger',
                'data-tour-trigger': '',
                'data-cite-tour-trigger': '',
                'aria-label': t('使用引导', 'Interactive guide'),
                'aria-expanded': tour.open,
                title: t('使用引导', 'Interactive guide'),
                onClick: () => (tour.open ? closeTour(true) : setTour({ open: true, step: 0, manual: true })),
              }, t('? 引导', '? Tour')),
              h(StyleSwitcher, {
                style: uiStyle,
                font: uiFont,
                onChange: setUiStyle,
                onFontChange: setUiFont,
                showFontSwitcher: true,
                lang,
                compact: true,
                id: 'cite-style-switcher',
              }),
              h(CiteButton, {
                className: 'cite-quick-import', variant: 'primary', icon: 'plus', onClick: onImport,
              }, t('导入 DOI / BibTeX', 'Import DOI / BibTeX')),
            ),
          ),
          h('div', {
            key: activeTab,
            className: 'w-tab-panel dsh-tab-panel cite-panel-body',
            'data-dsh-tab-panel': '',
            id: tabId + '-panel',
            role: 'tabpanel',
            'aria-labelledby': tabId + '-' + activeTab,
          },
            error || notice || job ? h('div', { className: 'cite-feedback' },
              error ? h(CiteMessage, { tone: 'error', onClose: () => setError(''), t }, error) : null,
              notice ? h(CiteMessage, { tone: 'success', onClose: () => setNotice(''), t }, notice) : null,
              job ? h(CiteEnrichment, {
                t, job, busy, onDismiss: () => setJob(null),
                onCancel: () => perform(async () => { await api({ action: 'cancel', job: job.id }, lang); }),
              }) : null,
            ) : null,
            panel,
          ),
          workbench && typeof __stardustUpdatesFooter === 'function'
            ? __stardustUpdatesFooter(React, 'dsh-cite') : null,
        ),
        tour.open && !removeModal && !editModalEntry && !rawSourceEntry ? h(W.CoachmarkTour, {
          rootRef,
          steps: tourSteps,
          step: tour.step,
          manual: tour.manual,
          style: uiStyle,
          font: uiFont,
          lang,
          activeKey: activeTab + ':' + viewMode,
          layout: tourLayout,
          setLayout: setTourLayout,
          onStep: (nextStep, isManual) => setTour({ open: true, step: nextStep, manual: Boolean(isManual) }),
          onClose: closeTour,
          onCopyPrompt: copyTourPrompt,
        }) : null,
        editModalEntry ? h(CiteMetadataEditorModal, {
          key: editModalEntry.id + ':' + revision,
          entry: editModalEntry,
          revision,
          uiStyle,
          uiFont,
          lang,
          locked,
          onClose: () => setEditModalEntry(null),
          onRefresh: () => perform(refresh),
          onSaved: nextState => {
            setLibrary(nextState);
            setEditModalEntry(null);
            setNotice(t('已保存文献元数据修改。', 'Saved reference metadata updates.'));
          },
          t,
        }) : null,
        rawSourceEntry ? h(CiteRawSourceModal, {
          key: rawSourceEntry.id + ':' + revision,
          entry: rawSourceEntry,
          sources,
          revision,
          uiStyle,
          uiFont,
          lang,
          copiedKey,
          copy,
          onClose: () => setRawSourceEntry(null),
          t,
        }) : null,
        removeModal ? h(W.Dialog, {
          style: uiStyle,
          font: uiFont,
          busy,
          title: removeModal.ids.length === 1 ? t('确认删除文献', 'Remove reference?') : t('确认删除所选文献', 'Remove selected references?'),
          closeLabel: t('关闭', 'Close'),
          onClose: () => { if (!busy) setRemoveModal(null); },
          footer: h('div', { className: 'cite-actions' },
            h(CiteButton, { variant: 'outline', disabled: busy, onClick: () => setRemoveModal(null) }, t('取消', 'Cancel')),
            removeModal.conflict
              ? h(CiteButton, { variant: 'primary', icon: 'refresh', disabled: busy, onClick: refreshAfterRemoveConflict }, t('刷新文献库', 'Refresh library'))
              : h(CiteButton, { variant: 'danger', icon: 'trash', disabled: locked, onClick: confirmRemove }, t('确认删除', 'Confirm remove')),
          ),
        },
          removeModal.error ? h(W.Status, { tone: 'error' }, removeModal.error) : null,
          h('p', { className: 'cite-remove-lead' }, removeModal.ids.length === 1
            ? t('将从本地文献库移除以下文献：', 'This reference will be removed from your local library:')
            : t('将从本地文献库移除所选 ' + removeModal.ids.length + ' 条文献：', 'These ' + removeModal.ids.length + ' selected references will be removed from your local library:')),
          removeEntries.length ? h('ul', { className: 'cite-plain-list cite-remove-list' },
            removeEntries.slice(0, 5).map(entry => h('li', { key: entry.id },
              h('strong', null, referenceTitle(entry, t)),
              h('div', { className: 'cite-chips' },
                entry.bibKey ? h(CiteChip, { tone: 'accent' }, '@' + entry.bibKey) : null,
                entry.work.doi ? h(CiteChip, null, 'DOI ' + entry.work.doi) : null,
              ),
            )),
            removeEntries.length > 5 ? h('li', { className: 'cite-muted' },
              t('…以及其余 ' + (removeEntries.length - 5) + ' 条文献', '…and ' + (removeEntries.length - 5) + ' more'),
            ) : null,
          ) : null,
          h('p', { className: 'cite-muted cite-remove-note' }, t(
            '删除后不会修改你的原始外部文件；如需完整存档，可先在「导出备份」下载全库备份。',
            'Removing entries does not alter external files. Download a full backup in Export first if you want an archive.',
          )),
        ) : null,
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
        DSH_FONTS,
        DSH_FONT_STORAGE_KEY,
        DSH_FONT_EVENT,
        DSH_DEFAULT_FONT,
        normalizeDshFont,
        readDshFont,
        writeDshFont,
        subscribeDshFont,
        computeConstellationEdges,
        computeConstellationLayout,
      },
    };
  },
},{"name":"dsh-cite","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.12.3","label":"引文库","labelEn":"Citations","suiteComponent":true,"sectionIds":["dsh-cite"],"iconData":"data:image/webp;base64,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"}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();

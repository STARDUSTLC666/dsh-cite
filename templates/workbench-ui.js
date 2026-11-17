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

// Editable browser entry. Build with node scripts/build-client.mjs.
window.__ModuleLoader__.load({
  id: 'dsh-cite',
  factory: require => {
    const React = require('react');
    const { useEffect, useMemo, useRef, useState } = React;
    const h = React.createElement;
    const W = createWorkbenchUI(React);

    let primitives;
    try {
      primitives = require('@deepseek-ai/dsh-client-ui-primitives');
    } catch {
      // The shared styles and standard form controls support partial hosts.
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
      const [activeTab, setActiveTab] = useState('library');
      const [library, setLibrary] = useState(null);
      const [job, setJob] = useState(null);
      const [loading, setLoading] = useState(true);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const [notice, setNotice] = useState('');
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
      const t = (zh, en) => lang === 'en' ? en : zh;
      const jobId = job?.id;
      const running = job?.state === 'running';
      const locked = loading || busy || running;

      const updateForm = values => setForm(old => ({ ...old, ...values }));
      const setSelected = ids => updateForm({ selected: ids });
      const setStyle = value => updateForm({ style: value });

      // Update protection: dsh-cite
      __stardustUpdatesGuard(React, "dsh-cite", { dirty, busy: locked, retainOnClose: true });

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
              // Keep the job's real result visible even if the library refresh fails.
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

      async function copy(value, format) {
        try {
          await navigator.clipboard.writeText(value);
          setError('');
          setNotice(t('已复制' + format + '。', 'Copied ' + format + '.'));
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
            t, lang, entries, sources, revision, loading, loaded: !!library, locked, selected, setSelected, style, setStyle,
            filter, search, limit, activeId, setActiveId, onImport, enrich, copy,
            onSearch: value => { setSearch(value); setActiveId(''); setLimit(pageSize); },
            onFilter: value => { setFilter(value); setActiveId(''); setLimit(pageSize); },
            onMore: () => setLimit(n => n + pageSize),
            onRefresh: () => perform(refresh),
          });
      }

      return h('section', { className: 'dshw cite-workbench', 'data-main': workbench },
        h(W.Styles),
        h('style', null, CITE_WORKBENCH_CSS),
        h('div', { className: 'cite-shell' },
          h('h1', { className: 'cite-brand' }, h('span', { className: 'cite-brand-icon' }, h(W.Icon, { name: 'book', size: 15 })), 'dsh-cite'),
          h(CiteButton, {
            className: 'cite-quick-import', variant: 'primary', icon: 'plus', onClick: onImport,
          }, t('导入 DOI / BibTeX', 'Import DOI / BibTeX')),
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

    return { inject: ['slots', 'locale'], apply };
  },
});

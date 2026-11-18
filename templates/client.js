// Editable browser entry. Build with node scripts/build-client.mjs.
window.__ModuleLoader__.load({
  id: 'dsh-cite',
  factory: require => {
    const React = require('react');
    const { useEffect, useMemo, useRef, useState } = React;
    const h = React.createElement;
    // Lazy host primitives: never call require('@deepseek-ai/dsh-client-ui-primitives') eagerly at load time.
    const hostPrimitives = () => resolveHostPrimitives(React, require);
    const StyleSwitcher = createStyleSwitcherComponent(React, require);
    const W = createWorkbenchUI(React, require);

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
      const [library, setLibrary] = useState(null);
      const [job, setJob] = useState(null);
      const [loading, setLoading] = useState(true);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState('');
      const [notice, setNotice] = useState('');
      const [copiedKey, setCopiedKey] = useState('');
      const [removeModal, setRemoveModal] = useState(null);
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
      modalOpenRef.current = Boolean(removeModal);
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
      __stardustUpdatesGuard(React, "dsh-cite", { dirty, busy: locked || Boolean(removeModal), retainOnClose: true });

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
        if (removeModal && tour.open) {
          setTour(prev => ({ ...prev, open: false }));
        }
      }, [removeModal]);
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
          id: 'import',
          selector: '.cite-quick-import',
          fallback: '[data-tab-id="import"]',
          side: 'bottom',
          title: t('导入 DOI / BibTeX 文献', 'Import DOI / BibTeX references'),
          desc: t('点击这里或切换到「导入预览」，批量粘贴 DOI 列表、上传 .bib 或一键填入示例，先在本地去重再保存。', 'Click here or open Import to paste DOIs, upload .bib, or fill a sample—deduplicating locally before saving.'),
        },
        {
          id: 'check',
          selector: '[data-tab-id="check"]',
          fallback: '.w-tabs',
          side: 'bottom',
          title: t('核验 DOI 与补全元数据', 'Verify DOIs & enrich metadata'),
          desc: t('在「DOI 核查」检验文稿引文真伪并一键送入导入预览；也可点击下方按钮复制指令发给助手：', 'Verify manuscript DOIs against Crossref in DOI check and send valid ones to Import—or copy this chat prompt:'),
          prompt: t('帮我核验这篇论文的 DOI 与真实元数据并导入引文库', 'Verify this paper’s DOI and metadata, then import it into my citation library'),
          promptLabel: t('复制核验导入指令', 'Copy verify & import prompt'),
        },
        {
          id: 'style',
          selector: '[data-tour="cite-format-picker"]',
          fallback: '#cite-style-switcher',
          side: 'right',
          title: t('切换引文体例（GB/T 7714 / APA）', 'Switch citation styles (GB/T 7714 / APA)'),
          desc: t('随时切换 GB/T 7714、APA、MLA、Chicago 引文格式，右上角还可切换 13 套明亮护眼工作台风格与字体搭配。', 'Switch between GB/T 7714, APA, MLA, and Chicago formats anytime, plus 13 daylight-friendly workbench styles & font pairings.'),
        },
        {
          id: 'export',
          selector: '[data-tab-id="export"]',
          fallback: '[data-tour="cite-copy-actions"]',
          side: 'bottom',
          title: t('一键生成引用与导出参考文献列表', 'Copy citations & export bibliography'),
          desc: t('在文献详情栏一键复制单条标准引文或 BibTeX，或打开「导出备份」批量下载参考文献列表与原始来源备份。', 'Copy formatted citations or BibTeX from the details bar, or open Export to download bibliographies and full backups.'),
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
            t, lang, uiStyle, entries, sources, revision, loading, loaded: !!library, locked, running,
            selected, setSelected, style, setStyle, copiedKey,
            filter, search, limit, activeId, setActiveId, onImport, enrich, copy, onRequestRemove,
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
        tour.open && !removeModal ? h(W.CoachmarkTour, {
          rootRef,
          steps: tourSteps,
          step: tour.step,
          manual: tour.manual,
          style: uiStyle,
          font: uiFont,
          lang,
          activeKey: activeTab,
          layout: tourLayout,
          setLayout: setTourLayout,
          onStep: (nextStep, isManual) => setTour({ open: true, step: nextStep, manual: Boolean(isManual) }),
          onClose: closeTour,
          onCopyPrompt: copyTourPrompt,
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
      },
    };
  },
});

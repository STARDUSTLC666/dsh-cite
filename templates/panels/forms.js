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

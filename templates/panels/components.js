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
    isbn: entry.work.isbn || '',
    language: entry.work.language || '',
    url: entry.work.url || '',
  }));

  const setField = (key, value) => setDraftWork(prev => ({ ...prev, [key]: value }));

  async function submit(event) {
    event?.preventDefault?.();
    if (saving || locked) return;
    const rawYear = draftWork.year.trim();
    let parsedYear = 0;
    if (rawYear !== '') {
      if (!/^\d{1,4}$/.test(rawYear)) {
        setErr(t('年份须为 1–9999 的整数（或留空）。', 'Year must be a whole number between 1 and 9999 (or blank).'));
        return;
      }
      parsedYear = Number.parseInt(rawYear, 10);
      if (parsedYear <= 0 || parsedYear > 9999) {
        setErr(t('年份须为 1–9999 的整数（或留空）。', 'Year must be a whole number between 1 and 9999 (or blank).'));
        return;
      }
    }
    setSaving(true);
    setErr('');
    setConflict(false);
    try {
      const workPatch = {
        title: draftWork.title.trim(),
        authors: parseAuthorsInput(draftWork.authorsText),
        year: parsedYear,
        containerTitle: draftWork.containerTitle.trim(),
        type: draftWork.type || 'other',
        volume: draftWork.volume.trim(),
        issue: draftWork.issue.trim(),
        page: draftWork.page.trim(),
        doi: draftWork.doi.trim(),
        publisher: draftWork.publisher.trim(),
        isbn: draftWork.isbn.trim(),
        language: draftWork.language.trim(),
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
          onClick: async () => {
            setSaving(true);
            setErr('');
            try {
              await onRefresh();
              setConflict(false);
            } catch (error) {
              setErr(error?.message || t('无法刷新文献库。', 'Could not refresh the library.'));
            } finally {
              setSaving(false);
            }
          },
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
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-isbn' }, 'ISBN'),
          h(CiteInput, { id: fieldId + '-isbn', className: 'cite-mono', value: draftWork.isbn, disabled: saving, placeholder: '978-...', onChange: e => setField('isbn', e.target.value) }),
        ),
        h('div', null,
          h('label', { className: 'cite-label', htmlFor: fieldId + '-language' }, t('语言', 'Language')),
          h(CiteInput, { id: fieldId + '-language', value: draftWork.language, disabled: saving, placeholder: 'en / zh', onChange: e => setField('language', e.target.value) }),
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

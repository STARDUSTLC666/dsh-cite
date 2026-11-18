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

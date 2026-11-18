function referenceTitle(entry, t) {
  return entry.work.title || entry.work.doi || t('无标题', 'Untitled');
}

function CiteLibrary({
  entries, sources, revision, t, lang, uiStyle, loading, loaded, locked, running,
  selected, setSelected, style, setStyle, copiedKey,
  filter, search, limit, activeId, setActiveId, onSearch, onFilter, onMore, onRefresh, onImport, enrich, copy, onRequestRemove, onModalOpen,
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

  return h('div', {
    ref: root,
    className: 'cite-library dsh-split-pane',
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
          key: active.id, entry: active, sources, style, uiStyle, lang, revision, locked, running, copiedKey, enrich, copy, onRequestRemove, onModalOpen, t,
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

function CiteInspector({ entry, sources, style, uiStyle, lang, revision, locked, running, copiedKey, enrich, copy, onRequestRemove, onModalOpen, t }) {
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
        matchedSources.length ? h(CiteButton, {
          variant: 'ghost',
          icon: 'file',
          'aria-haspopup': 'dialog',
          onClick: () => { onModalOpen?.(); setSourceOpen(true); },
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

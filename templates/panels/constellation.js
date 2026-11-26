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
  const compactGraph = entries.length > 15;

  if (!compactGraph) {
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
        const yearGap = a.year > 0 && b.year > 0 ? Math.abs(a.year - b.year) : 99;
        const sameEra = yearGap <= 2;

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
  } else {
    // Use inverted author/venue/year buckets with bounded local windows so dense
    // libraries up to 500 papers compute priority-ranked filaments in O(N).
    const maxDegree = entries.length > 80 ? 3 : entries.length > 35 ? 4 : 5;
    const maxEdges = Math.min(240, Math.max(48, entries.length * 3));
    const bestByPair = new Map();
    const recordCandidate = (i, j, kind, weight, score, detail) => {
      const lo = i < j ? i : j;
      const hi = i < j ? j : i;
      const pairIdx = lo * prepared.length + hi;
      const existing = bestByPair.get(pairIdx);
      if (existing && existing.score >= score) return;
      const a = prepared[lo];
      const b = prepared[hi];
      bestByPair.set(pairIdx, {
        id: a.entry.id + '__' + b.entry.id,
        source: a.entry.id,
        target: b.entry.id,
        kind,
        weight,
        score,
        detail,
      });
    };

    const authorBuckets = new Map();
    const venueBuckets = new Map();
    const yearBuckets = new Map();
    for (let i = 0; i < prepared.length; i++) {
      const item = prepared[i];
      for (const name of item.authorNames) {
        let bucket = authorBuckets.get(name);
        if (!bucket) { bucket = []; authorBuckets.set(name, bucket); }
        bucket.push(i);
      }
      for (const fam of item.authorFamilies) {
        const key = 'fam:' + fam;
        let bucket = authorBuckets.get(key);
        if (!bucket) { bucket = []; authorBuckets.set(key, bucket); }
        bucket.push(i);
      }
      if (item.venue) {
        let bucket = venueBuckets.get(item.venue);
        if (!bucket) { bucket = []; venueBuckets.set(item.venue, bucket); }
        bucket.push(i);
      }
      if (item.year > 0) {
        let bucket = yearBuckets.get(item.year);
        if (!bucket) { bucket = []; yearBuckets.set(item.year, bucket); }
        bucket.push(i);
      }
    }

    const authorWindow = maxDegree + 6;
    for (const [token, bucket] of authorBuckets) {
      if (bucket.length < 2) continue;
      const label = token.startsWith('fam:') ? token.slice(4) : token;
      const score = token.startsWith('fam:') ? 390 : 400;
      for (let aIdx = 0; aIdx < bucket.length; aIdx++) {
        const end = Math.min(bucket.length, aIdx + 1 + authorWindow);
        for (let bIdx = aIdx + 1; bIdx < end; bIdx++) {
          recordCandidate(bucket[aIdx], bucket[bIdx], 'author', 4, score, label);
        }
      }
    }

    const venueWindow = maxDegree + 4;
    for (const bucket of venueBuckets.values()) {
      if (bucket.length < 2) continue;
      const venueLabel = prepared[bucket[0]].entry.work.containerTitle;
      for (let aIdx = 0; aIdx < bucket.length; aIdx++) {
        const end = Math.min(bucket.length, aIdx + 1 + venueWindow);
        for (let bIdx = aIdx + 1; bIdx < end; bIdx++) {
          recordCandidate(bucket[aIdx], bucket[bIdx], 'venue', 3, 300, venueLabel);
        }
      }
    }

    const eraWindow = maxDegree + 2;
    for (const [year, bucket] of yearBuckets) {
      for (let aIdx = 0; aIdx < bucket.length; aIdx++) {
        const end = Math.min(bucket.length, aIdx + 1 + eraWindow);
        for (let bIdx = aIdx + 1; bIdx < end; bIdx++) {
          recordCandidate(bucket[aIdx], bucket[bIdx], 'era', 2, 200, String(year));
        }
      }
      for (const gap of [1, 2]) {
        const nextBucket = yearBuckets.get(year + gap);
        if (!nextBucket) continue;
        const score = 200 - gap * 20;
        for (let aIdx = 0; aIdx < bucket.length; aIdx++) {
          const limit = Math.min(nextBucket.length, eraWindow);
          for (let bIdx = 0; bIdx < limit; bIdx++) {
            recordCandidate(bucket[aIdx], nextBucket[bIdx], 'era', 2, score, String(year));
          }
        }
      }
    }

    const candidates = [...bestByPair.values()];
    candidates.sort((left, right) => {
      if (left.score !== right.score) return right.score - left.score;
      if (left.source !== right.source) return left.source < right.source ? -1 : 1;
      return left.target < right.target ? -1 : left.target > right.target ? 1 : 0;
    });
    for (const edge of candidates) {
      if (edges.length >= maxEdges) break;
      const degA = degree.get(edge.source) || 0;
      const degB = degree.get(edge.target) || 0;
      const cap = edge.kind === 'author' ? maxDegree + 2 : maxDegree;
      if (degA >= cap || degB >= cap) continue;
      connectedSet.add(edge.id);
      degree.set(edge.source, degA + 1);
      degree.set(edge.target, degB + 1);
      edges.push({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        kind: edge.kind,
        weight: edge.weight,
        detail: edge.detail,
      });
    }
  }

  const minClusterDegree = entries.length > 40 ? 1 : 2;
  const maxTotalEdges = compactGraph ? Math.min(280, Math.max(64, entries.length * 3 + 20)) : Infinity;
  for (let i = 0; i < prepared.length; i++) {
    if (edges.length >= maxTotalEdges) break;
    const a = prepared[i];
    if ((degree.get(a.entry.id) || 0) >= minClusterDegree) continue;
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
      if ((degree.get(a.entry.id) || 0) >= minClusterDegree || edges.length >= maxTotalEdges) break;
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
  const areaFactor = count > 150 ? 2.6 : 2.15;
  const requiredUsableArea = count * minSepX * minSepY * areaFactor;

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

  // Exact spatial-hash grid for O(N) collision checks when count > 24.
  // Because cellW === minSepX and cellH === minSepY, any colliding pair must
  // reside within the 3x3 cell neighborhood.
  const useGrid = count > 24;
  function separatePair(i, j, pushFactor, extraPush, doClamp) {
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
        const push = ox * pushFactor + extraPush;
        a.x -= sign * push;
        b.x += sign * push;
      } else {
        const sign = dy >= 0 ? 1 : -1;
        const push = oy * pushFactor + extraPush;
        a.y -= sign * push;
        b.y += sign * push;
      }
      if (doClamp) {
        clamp(a);
        clamp(b);
      }
      return true;
    }
    return false;
  }

  function sweepNonOverlap(pushFactor, extraPush, doClamp) {
    let collided = false;
    if (!useGrid) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (separatePair(i, j, pushFactor, extraPush, doClamp)) collided = true;
        }
      }
      return collided;
    }
    const grid = new Map();
    const cellX = new Int32Array(nodes.length);
    const cellY = new Int32Array(nodes.length);
    for (let i = 0; i < nodes.length; i++) {
      const gx = Math.floor(nodes[i].x / minSepX);
      const gy = Math.floor(nodes[i].y / minSepY);
      cellX[i] = gx;
      cellY[i] = gy;
      const key = gy * 100003 + gx;
      let bucket = grid.get(key);
      if (!bucket) { bucket = []; grid.set(key, bucket); }
      bucket.push(i);
    }
    for (let i = 0; i < nodes.length; i++) {
      const gx = cellX[i];
      const gy = cellY[i];
      for (let dy = -1; dy <= 1; dy++) {
        const rowOffset = (gy + dy) * 100003;
        for (let dx = -1; dx <= 1; dx++) {
          const bucket = grid.get(rowOffset + gx + dx);
          if (!bucket) continue;
          for (let k = 0; k < bucket.length; k++) {
            const j = bucket[k];
            if (j <= i) continue;
            if (separatePair(i, j, pushFactor, extraPush, doClamp)) collided = true;
          }
        }
      }
    }
    return collided;
  }

  // Iterative force relaxation: edge gravity + non-overlap repulsion + HUD clearance.
  const iterations = count > 160 ? 28 : count > 80 ? 40 : Math.min(96, 40 + count * 2);

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
    sweepNonOverlap(0.52, 0, false);

    // 4. Keep nodes cleanly clear of floating capsules & Zettelkasten HUD
    if (hudClearance) {
      for (const node of nodes) {
        for (const rect of hudRects) resolveHudOverlap(node, rect, 0.72);
      }
    }

    for (const node of nodes) clamp(node);
  }

  // Final guaranteed overlap-free + HUD-clear sweep
  const maxSweepPasses = count > 150 ? 180 : 110;
  for (let pass = 0; pass < maxSweepPasses; pass++) {
    let collided = sweepNonOverlap(0.55, 1, true);
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
    if (pass === 44 || pass === 80 || pass === 115 || pass === 145) {
      stageWidth += Math.round(minSepX * 1.25);
      stageHeight += Math.round(minSepY * 1.25);
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
  neighborCount, enrich, copy, onEditMetadata, onOpenRawSource, onRequestRemove, onApplyCrossrefField, t,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { id, work, bibKey, warnings, crossref } = entry;
  const citation = useCitationOutput({ kind: 'references', id, style, lang, revision });
  const bibtex = useCitationOutput({ kind: 'bibtex', id, lang, revision });
  const matchedSources = entry.sourceIds.map(sourceId => sources.find(source => source.id === sourceId)).filter(Boolean);
  const authorLine = authors(work) || t('佚名作者', 'Unknown authors');
  const venueLine = [work.year || '', work.containerTitle || work.publisher || ''].filter(Boolean).join(' · ');
  const conflictList = crossref?.conflicts || [];

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
        conflictList.length
          ? h(CiteChip, { tone: 'warn' }, t(conflictList.length + ' 项差异', conflictList.length + (conflictList.length === 1 ? ' diff' : ' diffs')))
          : null,
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
      conflictList.length ? h('details', { className: 'cite-zettel-conflicts' },
        h('summary', null, t('Crossref 字段差异 (' + conflictList.length + ')', 'Crossref differences (' + conflictList.length + ')')),
        h('ul', { className: 'cite-plain-list cite-zettel-conflict-list' }, conflictList.map(item => h('li', { key: item.field, className: 'cite-zettel-conflict-row' },
          h('div', { className: 'cite-zettel-conflict-body' },
            h('strong', null, fieldName(item.field, t)),
            h('span', { className: 'cite-muted' }, valueText(item.crossref)),
          ),
          onApplyCrossrefField ? h(CiteButton, {
            variant: 'outline',
            icon: 'check',
            disabled: locked,
            'data-apply-crossref-field': item.field,
            onClick: () => onApplyCrossrefField(entry, item),
          }, t('采用', 'Use')) : null,
        ))),
      ) : null,
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
  viewMode, setViewMode, onSearch, onFilter, onRefresh, onImport, enrich, copy, onRequestRemove, onEditMetadata, onOpenRawSource, onApplyCrossrefField,
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
    const halfW = Math.ceil(layout.nodeWidth / 2) + 12;
    const halfH = Math.ceil(layout.nodeHeight / 2) + 12;
    for (const entry of visibleEntries) {
      const manual = nodePositions[entry.id];
      if (manual) {
        next[entry.id] = {
          x: Math.round(Math.max(halfW, Math.min(layout.stageWidth - halfW, manual.x))),
          y: Math.round(Math.max(halfH, Math.min(layout.stageHeight - halfH, manual.y))),
        };
      } else {
        next[entry.id] = layout.positions[entry.id] || { x: 240, y: 200 };
      }
    }
    return next;
  }, [visibleEntries, nodePositions, layout.positions, layout.nodeWidth, layout.nodeHeight, layout.stageWidth, layout.stageHeight]);

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
  const lastSearchFocusRef = useRef('');

  function centerOnEntry(entryId) {
    const pos = effectivePositions[entryId];
    if (!pos) return;
    const targetX = Math.round(viewport.width * 0.46 - pos.x * zoom);
    const targetY = Math.round(viewport.height * 0.46 - pos.y * zoom);
    setPan({ x: targetX, y: targetY });
  }

  useEffect(() => {
    if (!query || !selectedId || !matchedSearchIds?.has(selectedId)) {
      lastSearchFocusRef.current = '';
      return;
    }
    const token = query + ':' + selectedId;
    if (lastSearchFocusRef.current === token) return;
    lastSearchFocusRef.current = token;
    const pos = effectivePositions[selectedId];
    if (!pos) return;
    const screenX = pos.x * zoom + pan.x;
    const screenY = pos.y * zoom + pan.y;
    if (screenX < 90 || screenX > viewport.width - 90 || screenY < 90 || screenY > viewport.height - 90) {
      centerOnEntry(selectedId);
    }
  }, [query, selectedId, matchedSearchIds, effectivePositions, viewport.width, viewport.height, zoom, pan.x, pan.y]);

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
    setZoom(prev => Math.max(0.55, Math.min(1.55, Math.round((prev + delta) * 100) / 100)));
  }

  const wheelHandlerRef = useRef(null);
  wheelHandlerRef.current = event => {
    if (event?.target?.closest?.('.cite-zettelkasten, .cite-capsule, .cite-constellation-empty')) return;
    const rawDy = Number(event?.deltaY ?? 0);
    if (!rawDy) return;
    event?.preventDefault?.();
    const modeScale = event?.deltaMode === 1 ? 24 : event?.deltaMode === 2 ? 240 : 1;
    const normalizedDy = rawDy * modeScale;
    const step = Math.max(-0.12, Math.min(0.12, -normalizedDy * 0.00085));
    const nextZoom = Math.max(0.55, Math.min(1.55, Math.round((zoom + step) * 1000) / 1000));
    if (nextZoom === zoom) return;
    const el = starfieldRef.current;
    const rect = el && typeof el.getBoundingClientRect === 'function' ? el.getBoundingClientRect() : null;
    if (rect && rect.width > 0 && Number.isFinite(event?.clientX) && Number.isFinite(event?.clientY)) {
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      const stageX = (px - pan.x) / zoom;
      const stageY = (py - pan.y) / zoom;
      setPan({ x: Math.round(px - stageX * nextZoom), y: Math.round(py - stageY * nextZoom) });
    }
    setZoom(nextZoom);
  };

  useEffect(() => {
    const el = starfieldRef.current;
    if (!el || typeof el.addEventListener !== 'function') return undefined;
    const onNativeWheel = event => wheelHandlerRef.current?.(event);
    el.addEventListener('wheel', onNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', onNativeWheel);
  }, []);

  function filamentLabel(edge) {
    if (edge.kind === 'author') return t('同作者：' + edge.detail, 'Shared author: ' + edge.detail);
    if (edge.kind === 'venue') return t('同刊物：' + edge.detail, 'Same venue: ' + edge.detail);
    if (edge.kind === 'era') return t('同期文献（' + edge.detail + ' ±2 年）', 'Same era (' + edge.detail + ' ±2y)');
    return t('文献状态聚类', 'Status cluster');
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
              strokeDasharray: isActive ? undefined : (edge.kind === 'author' ? '6 4' : '4 5'),
            }, h('title', null, filamentLabel(edge)));
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
          selectedId ? h('button', {
            type: 'button',
            className: 'cite-zoom-btn cite-zoom-fit',
            'aria-label': t('居中选中节点', 'Center active node'),
            title: t('居中选中节点', 'Center active node'),
            onClick: () => centerOnEntry(selectedId),
          }, '◎') : null,
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
        onApplyCrossrefField,
        t,
      }) : null,
    ),
  );
}

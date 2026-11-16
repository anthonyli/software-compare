// SPDX-License-Identifier: Apache-2.0
// Normalize once per index, rather than rebuilding a large string on every keypress.
export function normalizeSearch(value) {
  return String(value ?? '').normalize('NFKC').toLowerCase().replace(/\s+/gu, ' ').trim();
}

export function prepareSearchIndex(items) {
  return items.map(item => {
    const name = normalizeSearch(`${item.name || ''} ${item.name_en || ''}`);
    const category = normalizeSearch(`${item.category_name || ''} ${item.category_name_en || ''}`);
    const description = normalizeSearch(`${item.summary || ''} ${item.summary_en || ''} ${item.search_description || ''}`);
    const other = normalizeSearch(`${item.pricing_model || ''} ${item.pricing_model_en || ''} ${item.open_source ? '开源 open source oss' : ''}`);
    return { item, name, category, description, other,
      words: [...new Set(`${name} ${category} ${description}`.match(/[a-z0-9]+/g) || [])] };
  });
}

// At most one insertion/deletion/substitution or adjacent transposition.
// Only Latin words >=4 chars qualify; short names and Chinese remain substring matches.
export function oneEditAway(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === Math.min(a.length, b.length)) return true;
  if (a.length === b.length) {
    return a.slice(i + 1) === b.slice(i + 1) ||
      (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
  }
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

export function searchCatalog(index, query, limit = 12) {
  const normalized = normalizeSearch(query);
  if (!normalized || normalized.length > 200) return [];
  const tokens = [...new Set(normalized.split(' '))];
  return index.map(entry => {
    let score = 0;
    for (const token of tokens) {
      if (entry.name === token || entry.name.startsWith(token)) continue;
      if (entry.name.includes(token)) { score += 1; continue; }
      if (entry.category.includes(token)) { score += 2; continue; }
      if (entry.description.includes(token)) { score += 3; continue; }
      if (entry.other.includes(token)) { score += 4; continue; }
      if (/^[a-z]{4,32}$/.test(token) && entry.words.some(word => word.length >= 4 && oneEditAway(token, word))) {
        score += 10; continue;
      }
      return null;
    }
    return { item: entry.item, score };
  }).filter(Boolean).sort((a, b) => a.score - b.score || a.item.name.localeCompare(b.item.name, 'zh-CN'))
    .slice(0, limit).map(entry => entry.item);
}

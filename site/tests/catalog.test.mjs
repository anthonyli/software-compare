import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root = new URL('../../', import.meta.url);
const read = file => JSON.parse(fs.readFileSync(new URL(file, root), 'utf8'));
const categories = [...read('data.json').categories, ...fs.readdirSync(new URL('categories/', root)).filter(f => f.endsWith('.json')).map(f => read(`categories/${f}`))];
const added = ['ai-assistants','local-ai','image-editors','vector-graphics','photo-management','desktop-publishing','ai-coding','ai-image-workflows','animation-3d','animation-2d','compositing','database-clients','api-clients'];
const slug = c => c.category_slug || c.id;
const config = fs.readFileSync(new URL('site/src/config.ts', root), 'utf8');
const translations = read('site/src/i18n/content-en.json');
test('catalog category and product routes are unique', () => {
 assert.equal(new Set(categories.map(slug)).size, categories.length);
 for (const c of categories) {
  assert.match(slug(c), /^[a-z0-9-]+$/);
  const ids = c.products.map(p => p.id);
  assert.equal(new Set(ids).size, ids.length, slug(c));
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
 }
});
test('new categories have navigation and sourced complete comparison data', () => {
 for (const id of added) {
  const c = categories.find(c => slug(c) === id);
  assert(c, id); assert(config.includes(`"${id}"`)); assert(c.products.length > 0);
  assert.equal(c.collected_at, '2026-11-13');
  const keys = c.features.map(f => f.key); assert.equal(new Set(keys).size, keys.length);
  for (const p of c.products) {
   assert(p.sources.length > 0);
   for (const url of [p.official_url,...p.sources]) assert.match(url, /^https?:\/\//);
   assert.equal(typeof p.open_source, 'boolean'); assert(p.platforms.length > 0); assert(p.license);
   assert.deepEqual(Object.keys(p.features).sort(), [...keys].sort(), p.id);
   for (const f of Object.values(p.features)) assert(['yes','no','partial','paid','unknown','na'].includes(f.value));
  }
 }
});
test('new catalog text has English translations', () => {
 const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
 const newCats = categories.filter(c => added.includes(slug(c)));
 const recorders = categories.find(c => slug(c) === 'screen-recorders').products.filter(p => ['focusee','screen-studio'].includes(p.id));
 for (const text of strings([...newCats,...recorders]).filter(s => /[\u4e00-\u9fff]/.test(s))) assert(translations[text], `Missing English: ${text}`);
});
test('requested screen recorders have complete feature rows', () => {
 const c = categories.find(c => slug(c) === 'screen-recorders');
 for (const id of ['focusee','screen-studio']) {
  const items = c.products.filter(p => p.id === id); assert.equal(items.length, 1);
  assert.equal(items[0].collected_at, '2026-11-13');
  assert.deepEqual(Object.keys(items[0].features).sort(), c.feature_keys.map(f => f.key).sort());
 }
});

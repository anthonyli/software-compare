import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../../', import.meta.url);
const read = (p) => JSON.parse(readFileSync(new URL(p, root), 'utf8'));
const categoryDir = new URL('categories/', root);
const assetDir = new URL('site/public/product-logos/', root);
const sources = read('site/src/lib/product-logo-sources.json');

test('product logos map to catalog IDs and small local WebP assets with sources', () => {
  const categories = [
    ...read('data.json').categories,
    ...readdirSync(categoryDir).filter((f) => f.endsWith('.json')).map((f) => read(`categories/${f}`)),
  ];
  const ids = new Set(categories.flatMap((c) => c.products.map((p) => p.id)));
  const names = Object.keys(sources);
  assert.deepEqual(readdirSync(assetDir).sort(), names.map((id) => `${id}.webp`).sort());
  for (const [id, source] of Object.entries(sources)) {
    assert.match(id, /^[a-z0-9-]+$/);
    assert.ok(ids.has(id), `Unrecognized product ID: ${id}`);
    const url = new URL(source);
    assert.equal(url.protocol, 'https:');
    assert.ok(!url.username && !url.password);
    const data = readFileSync(new URL(`${id}.webp`, assetDir));
    assert.ok(data.length >= 20 && data.length <= 24 * 1024, id);
    assert.equal(data.toString('ascii', 0, 4), 'RIFF', id);
    assert.equal(data.toString('ascii', 8, 12), 'WEBP', id);
  }
});

test('the eight first-batch RSS readers retain their sourced logos', () => {
  const ids = new Set(read('categories/rss-readers.json').products.map((p) => p.id));
  for (const id of ['capy-reader', 'fluent-reader', 'freshrss', 'miniflux', 'netnewswire', 'newsboat', 'newsflash', 'rss-guard']) {
    assert.ok(ids.has(id) && Object.hasOwn(sources, id), id);
  }
  // Later catalog entries can use the initials fallback until their logos are available.
});

test('the four first-batch browsers have their own sourced logos', () => {
  const ids = new Set(read('categories/browsers.json').products.map((p) => p.id));
  for (const id of ['brave', 'dia', 'ego-lite', 'helium']) {
    assert.ok(ids.has(id) && Object.hasOwn(sources, id), id);
  }
});

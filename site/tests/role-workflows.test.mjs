import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../../', import.meta.url);
const read = (file) => JSON.parse(readFileSync(new URL(file, root), 'utf8'));

test('role workflows define three bilingual paths to real catalog comparison and product URLs', () => {
  const roles = read('site/src/lib/role-workflows.json');
  assert.deepEqual(roles.map((r) => r.slug), ['indie-developer', 'content-creator', 'privacy-first']);
  const categories = new Map();
  for (const c of [
    ...read('data.json').categories,
    ...readdirSync(new URL('categories/', root)).filter((f) => f.endsWith('.json')).map((f) => read(`categories/${f}`)),
  ]) {
    const slug = c.category_slug || c.id || c.slug;
    if (!categories.has(slug)) categories.set(slug, new Set(c.products.map((p) => p.id)));
  }
  const bilingual = (text) => {
    assert.match(text.zh, /[\u4e00-\u9fff]/);
    assert.match(text.en, /[A-Za-z]/);
    assert.doesNotMatch(text.en, /[\u4e00-\u9fff]/);
  };
  for (const role of roles) {
    bilingual(role.title);
    bilingual(role.description);
    assert.equal(role.steps.length, 3);
    assert.equal(new Set(role.steps.map((s) => s.category)).size, role.steps.length);
    for (const step of role.steps) {
      bilingual(step.title);
      bilingual(step.decision);
      assert.equal(step.products.length, 2);
      assert.equal(new Set(step.products).size, 2);
      for (const id of step.products) {
        assert.ok(categories.get(step.category)?.has(id), `${role.slug}/${step.category}/${id}`);
      }
    }
  }
});

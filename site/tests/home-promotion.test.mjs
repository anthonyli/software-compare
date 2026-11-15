import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../src/components/HomePromotion.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function run(count, random, exists = true) {
  let placement = -1;
  const promo = { hidden: true, removed: false, remove() { this.removed = true; } };
  const groups = Array.from({ length: count }, (_, i) => ({ append(el) { assert.equal(el, promo); placement = i; } }));
  vm.runInNewContext(script, { document: { getElementById: () => exists ? promo : null, querySelectorAll: () => groups }, Math: { random: () => random, floor: Math.floor } });
  return { promo, placement };
}
test('promotion chooses only category grids and varies with each visit', () => {
  for (const [random, expected] of [[0, 0], [.5, 2], [.99999, 4]]) {
    const result = run(5, random);
    assert.equal(result.placement, expected);
    assert.equal(result.promo.hidden, false);
  }
});
test('disabled promotion and no groups leave no placeholder', () => {
  assert.equal(run(5, 0, false).placement, -1);
  for (const count of [0]) { const result = run(count, 0); assert.equal(result.placement, -1); assert.equal(result.promo.removed, true); }
  assert.match(source, /enabled &&/);
  assert.match(source, /\.home-promotion\[hidden\]\s*\{\s*display: none/);
});

test('one category group still receives the promotion', () => { assert.equal(run(1, .9).placement, 0); });

test('promotion branding and explicit safe new-tab link', () => {
  assert.match(source, />PageOn /);
  assert.doesNotMatch(source, /Pageon/);
  assert.match(source, /href="https:\/\/pageon.cc" target="_blank" rel="sponsored noopener noreferrer"/);
  assert.doesNotMatch(script, /window\.open|location|setTimeout/);
});

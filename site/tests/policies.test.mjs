import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const file = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const privacy = file('../src/pages/privacy.astro');
const terms = file('../src/pages/terms.astro');
const layout = file('../src/layouts/Layout.astro');
test('policies have bilingual sections, navigation, update date and private contact', () => {
  for (const page of [privacy, terms]) {
    assert.match(page, /data-policy-date/);
    assert.match(page, /mailto:anthonyli1021@gmail.com/);
    assert.doesNotMatch(page, /data-policy-draft|awaiting maintainer confirmation/);
    assert.match(page, /<h1/);
    assert.match(page, /zh=\{section.zh\} en=\{section.en\}/);
    assert.match(page, /href="\/privacy\/"/);
    assert.match(page, /href="\/terms\/"/);
  }
  assert.match(layout, /data-policy-links/);
  assert.match(layout, /data-private-contact/);
  assert.match(privacy, /do not send passwords, full cookies, identity documents/);
  assert.match(layout, /href="\/privacy\/"/);
  assert.match(layout, /href="\/terms\/"/);
});
test('privacy documents actual storage and limits, rather than promising zero collection', () => {
  for (const text of ['compare_voter', '365', 'compare-lang', 'compare-view', 'compare-votes-changed', 'HMAC', 'Cloudflare D1', 'Web Analytics', 'search-index.json', 'sponsored noopener noreferrer']) assert.ok(privacy.includes(text), text);
  assert.match(privacy, /even before a like is clicked/);
  assert.match(privacy, /does not automatically delete old server-side votes/);
  assert.match(privacy, /not a private channel/);
  assert.match(privacy, /not necessarily immediately at expiry/);
  assert.match(privacy, /No automatic retention expiry/);
  assert.match(privacy, /have not been verified from source code/);
  assert.match(file('../worker/index.js'), /const COOKIE = 'compare_voter'/);
  assert.match(file('../worker/index.js'), /const YEAR = 365/);
});
test('terms separate open-source code from third-party rights and promotions', () => {
  for (const text of ['Apache License 2.0', 'PageOn', 'Promotion', 'not a guarantee', 'not a software vendor', 'applicable law']) assert.ok(terms.includes(text), text);
});

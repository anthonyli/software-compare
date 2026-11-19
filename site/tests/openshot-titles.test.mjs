import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('OpenShot basic titles are supported by official documentation without inferred adjacent capabilities', () => {
  const data = JSON.parse(readFileSync(new URL('../../categories/video-editors.json', import.meta.url)));
  const rows = data.products.filter(product => product.id === 'openshot');
  assert.equal(rows.length, 1);
  const product = rows[0];
  assert.deepEqual(product.features.titles, { value: 'yes' });
  assert(product.sources.includes('https://www.openshot.org/files/user-guide/titles.html'));
  assert(product.sources.includes('https://support.openshot.org/support/solutions/articles/43000625551-how-do-i-add-text-to-a-video-in-openshot-'));
  for (const key of ['proxy', 'gpu_accel']) assert.equal(product.features[key].value, 'unknown');
});

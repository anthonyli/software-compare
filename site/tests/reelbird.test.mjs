import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL('../../'+path,import.meta.url),'utf8');

test('Reelbird keeps local-only export and optional public-link upload separate',()=>{
  const category=JSON.parse(read('data.json')).categories.find(c=>c.id==='screen-recorders');
  const p=category.products.find(p=>p.id==='reelbird');
  assert.deepEqual(Object.keys(p.features),category.feature_keys.map(f=>f.key));
  assert.equal(p.license,'MIT');
  assert.deepEqual(p.platforms,['macOS']);
  assert.match(p.free_tier_limits,/Apple 芯片、macOS 15\+/);
  assert.equal(p.features.free_no_watermark.value,'yes');
  assert.match(p.features.cloud_share.note,/编辑前上传；持链接者可看.*保留原链接/);
  assert.equal(p.features.livestream.value,'unknown');
  assert.equal(p.features.rec_4k_60fps.value,'unknown');
  assert.match(p.price_summary,/USD 5\/月，未核实当前结账价/);
  const line=read('screen-recorders.csv').split(/\r?\n/).find(l=>l.includes(',Reelbird,'));
  assert(line?.includes(p.features.cloud_share.note));
  assert(line?.includes(p.price_summary));
  const en=JSON.parse(read('site/src/i18n/content-en.json'));
  assert.match(en[p.features.cloud_share.note],/uploads before editing; anyone with the link can view/);
  assert.match(en[p.features.free_no_watermark.note],/locally with no watermark/);
});

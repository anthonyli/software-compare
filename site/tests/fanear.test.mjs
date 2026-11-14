import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/ai-memory.json',import.meta.url)));
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
test('FanEar separates free app from optional provider charges and cloud data paths',()=>{
 const p=c.products.find(p=>p.id==='fanear');
 assert(p); assert.equal(p.open_source,false); assert.equal(p.github_url,null);
 assert.match(p.price_summary,/无会员、订阅和内购/);assert.match(p.price_summary,/服务商规则付费/);
 assert.match(p.free_tier_limits,/iOS 17\+/);assert.match(p.free_tier_limits,/watchOS 10\+/);assert.match(p.free_tier_limits,/默认 iCloud/);
 assert.match(p.free_tier_limits,/云转写发录音/);assert.match(p.free_tier_limits,/单独删除/);
 assert.equal(p.features.local_pipeline.value,'partial');assert.equal(p.features.speaker_labels.value,'partial');
 assert(p.sources.includes('https://fanear.fandao.dev/privacy/'));
 for(const k of ['name','license','pricing_model','summary','price_summary','free_tier_limits'])assert(en[p[k]],k);
});

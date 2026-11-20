import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('Transmission scheduling is limited to alternate bandwidth limits',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8'));
 const p=c.products.find(p=>p.id==='transmission');
 const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.schedule.value,'partial');
 assert.match(p.features.schedule.note,/按时段和星期/);
 assert.match(en[p.features.schedule.note],/disabled by default/);
 assert.match(en[p.features.schedule.note],/does not imply scheduled start or stop/);
 assert.equal(p.features.rss.value,'unknown');
 assert.equal(p.features.speed_limit.value,'yes');
 assert(p.sources.includes('https://github.com/transmission/transmission/blob/4.0.6/docs/Editing-Configuration-Files.md#scheduling'));
});

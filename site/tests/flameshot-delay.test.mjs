import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Flameshot delayed capture cites official command examples',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='flameshot');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.delay_timer,{value:'yes'});
 assert(p.sources.includes('https://github.com/flameshot-org/flameshot#usage'));
 for(const k of ['cloud_share','history'])assert.equal(p.features[k].value,'unknown');
});

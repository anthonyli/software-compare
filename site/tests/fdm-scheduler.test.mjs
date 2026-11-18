import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8')).products.find(p=>p.id==='fdm');
test('FDM scheduling is verified without inferring remote execution',()=>{
 assert.deepEqual(p.features.schedule,{value:'yes'});
 assert(p.sources.includes('https://www.freedownloadmanager.org/features.htm'));
 assert(p.sources.includes('https://www.freedownloadmanager.org/landing.htm?from=b_si_version'));
 assert.deepEqual(p.platforms,['Windows','macOS','Linux']);
 for(const k of ['rss','remote_webui']) assert.equal(p.features[k].value,'unknown');
 assert.equal(p.open_source,false);
 assert.equal(p.prices[0].price,'免费');
});

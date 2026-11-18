import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8')).products.find(p=>p.id==='mega');
test('MEGA documents file version recovery without expanding unrelated capabilities',()=>{
 assert.deepEqual(p.features.versions,{value:'yes'});
 assert(p.sources.includes('https://apps.apple.com/gb/app/mega-encrypted-cloud-storage/id706857885'));
 for(const key of ['conflict','block_level','ignore_rules']) assert.equal(p.features[key].value,'unknown');
});

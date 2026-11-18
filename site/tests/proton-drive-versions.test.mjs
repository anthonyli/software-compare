import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8')).products.find(p=>p.id==='proton-drive');
test('Proton Drive documents file version recovery without expanding unrelated capabilities',()=>{
 assert.deepEqual(p.features.versions,{value:'yes'});
 assert(p.sources.includes('https://proton.me/support/version-history'));
 for(const key of ['selective','conflict','block_level','ignore_rules']) assert.equal(p.features[key].value,'unknown');
});

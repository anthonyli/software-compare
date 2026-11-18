import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8')).products.find(p=>p.id==='resilio-sync');
test('Resilio filename conflicts are partial, not automatic content merging',()=>{
 assert.deepEqual(p.features.conflict,{value:'partial',note:'.Conflict'});
 assert(p.sources.includes('https://help.resilio.com/hc/en-us/articles/204753629-Conflict-files-in-Sync'));
 assert.deepEqual(p.features.versions,{value:'partial',note:'.sync/Archive'});
 assert.equal(p.free_tier_limits,'未知。');
});

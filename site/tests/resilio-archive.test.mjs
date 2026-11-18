import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8')).products.find(p=>p.id==='resilio-sync');
test('Resilio Archive is partial rather than universal file version recovery',()=>{
 assert.deepEqual(p.features.versions,{value:'partial',note:'.sync/Archive'});
 assert(p.sources.includes('https://help.resilio.com/hc/en-us/articles/204754239-Using-Archive-for-file-versioning-and-restoring-deleted-files'));
 assert.equal(p.free_tier_limits,'未知。');
});

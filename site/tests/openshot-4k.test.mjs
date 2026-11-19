import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='openshot');
test('OpenShot documents 4K output profiles separately from preview and GPU support',()=>{
 assert.deepEqual(p.features.export_4k,{value:'yes'});
 assert(p.sources.includes('https://www.openshot.org/static/files/user-guide/export.html'));
 assert(p.sources.includes('https://www.openshot.org/static/files/user-guide/profiles.html'));
 for(const key of ['proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.features.titles,{value:'yes'});
});

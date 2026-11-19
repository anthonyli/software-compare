import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='pitivi');
test('Pitivi title editing is documented without inferring rendering acceleration',()=>{
 assert.deepEqual(p.features.titles,{value:'yes'});
 assert(p.sources.includes('https://www.pitivi.org/manual/mainwindow.html'));
 assert.deepEqual(p.platforms,['Linux']);
 for(const key of ['color_grade','chroma_key','export_4k','gpu_accel'])assert.equal(p.features[key].value,'unknown');
});

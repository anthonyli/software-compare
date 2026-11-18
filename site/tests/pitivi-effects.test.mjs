import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='pitivi');
test('Pitivi effects have official evidence without inferring specific effects or acceleration',()=>{
 assert.deepEqual(p.features.effects,{value:'yes'});
 assert(p.sources.includes('https://www.pitivi.org/manual/usingeffects.html'));
 assert(p.sources.includes('https://www.pitivi.org/manual/transitions.html'));
 assert.deepEqual(p.platforms,['Linux']);
 for(const k of ['color_grade','chroma_key','proxy','export_4k','gpu_accel'])assert.equal(p.features[k].value,'unknown');
});

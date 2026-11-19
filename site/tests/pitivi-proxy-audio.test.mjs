import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='pitivi');
test('Pitivi documents proxy editing and concurrent audio mixing',()=>{
 for(const key of ['proxy','audio_mix']) assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://www.pitivi.org/tour/'));
 assert(p.sources.includes('https://www.pitivi.org/manual/importing.html'));
 for(const key of ['color_grade','chroma_key','export_4k','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.platforms,['Linux']);
});

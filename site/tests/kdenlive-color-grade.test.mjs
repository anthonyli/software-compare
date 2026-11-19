import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='kdenlive');
test('Kdenlive color grading is documented without inferring export resolution or GPU acceleration',()=>{
 assert.deepEqual(p.features.color_grade,{value:'yes'});
 assert(p.sources.includes('https://docs.kdenlive.org/en/effects_and_filters/video_effects/color_image_correction.html'));
 assert.deepEqual(p.platforms,['Windows','macOS','Linux']);
 for(const key of ['gpu_accel'])assert.equal(p.features[key].value,'unknown');
});

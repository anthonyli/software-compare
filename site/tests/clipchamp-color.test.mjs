import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='clipchamp');
test('Clipchamp supports basic color adjustment without implying premium or professional workflows',()=>{
 assert.deepEqual(p.features.color_grade,{value:'yes'});
 for(const source of ['https://support.microsoft.com/en-us/clipchamp/how-to-change-the-color-of-a-video','https://clipchamp.com/en/video-enhancer/']) assert(p.sources.includes(source));
 for(const key of ['keyframes','proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.features.export_4k.value,'paid');
});

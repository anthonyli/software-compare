import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='clipchamp');
test('Clipchamp documents video effects without inferring keyframes or paid entitlements',()=>{
 assert.deepEqual(p.features.effects,{value:'yes'});
 assert(p.sources.includes('https://support.microsoft.com/en-us/clipchamp/how-to-add-special-effects-to-videos'));
 for(const key of ['color_grade','keyframes','proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.features.chroma_key,{value:'yes'});
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='clipchamp');
test('Clipchamp 4K export requires plan entitlement, unlike importing 4K media',()=>{
 assert.deepEqual(p.features.export_4k,{value:'paid'});
 assert(p.sources.includes('https://clipchamp.com/en/pricing/'));
 assert(p.sources.includes('https://support.microsoft.com/en-us/clipchamp/4k-video-support-in-clipchamp'));
 for(const key of ['color_grade','keyframes','proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 for(const key of ['effects','chroma_key','audio_mix']) assert.deepEqual(p.features[key],{value:'yes'});
});

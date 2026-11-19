import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='clipchamp');
test('Clipchamp documents multiple audio tracks and level control without inferring advanced routing',()=>{
 assert.deepEqual(p.features.audio_mix,{value:'yes'});
 assert(p.sources.includes('https://clipchamp.com/en/blog/add-audio-video-online/'));
 for(const key of ['color_grade','keyframes','proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 for(const key of ['effects','chroma_key']) assert.deepEqual(p.features[key],{value:'yes'});
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='flowblade');
test('Flowblade documents effects, keyframes, grading and chroma key',()=>{
 for(const key of ['color_grade','effects','keyframes','chroma_key']) assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://jliljebl.github.io/flowblade/features.html'));
 assert(p.sources.includes('https://jliljebl.github.io/flowblade/webhelp/filtering.html'));
 for(const key of ['export_4k','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.features.proxy,{value:'yes'});
});

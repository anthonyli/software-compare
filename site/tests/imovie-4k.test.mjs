import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='imovie');
test('iMovie documents 4K export without inferring proxy or GPU support',()=>{
 assert.deepEqual(p.features.export_4k,{value:'yes'});
 assert(p.sources.includes('https://support.apple.com/en-ie/102276'));
 for(const key of ['keyframes','proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.features.titles.value,'yes');
});

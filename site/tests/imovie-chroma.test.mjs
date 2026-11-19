import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='imovie');
test('iMovie green and blue screen compositing is documented for Apple platforms',()=>{
 assert.deepEqual(p.features.chroma_key,{value:'yes'});
 assert(p.sources.includes('https://support.apple.com/en-us/102308'));
 for(const key of ['keyframes','proxy','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.platforms,['macOS','iOS']);
});

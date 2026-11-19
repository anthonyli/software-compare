import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='clipchamp');
test('Clipchamp documents a free chroma key effect without inferring other entitlements',()=>{
 assert.deepEqual(p.features.chroma_key,{value:'yes'});
 assert(p.sources.includes('https://clipchamp.com/en/features/green-screen-video-editor/'));
 assert(p.sources.includes('https://support.microsoft.com/en-gb/clipchamp/how-to-use-the-green-screen-effect-in-clipchamp'));
 for(const key of ['color_grade','keyframes','proxy','export_4k','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.platforms,['Windows','Web']);
});

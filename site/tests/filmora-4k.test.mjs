import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='filmora');
test('Filmora desktop 4K export is verified on paid plans, not a universal free entitlement',()=>{
 assert.deepEqual(p.features.export_4k,{value:'paid'});
 for(const source of ['https://filmora.wondershare.com/shop/buy/buy-video-editor.html', 'https://filmora.wondershare.com/shop/buy/buy-mac-video-editor.html', 'https://support.wondershare.com/how-tos/filmora/i-clearly-changed-the-resolution-to-4k-on-the-right-side-of-the-export-panel-why-is-the-exported-video-still-in-1080p.html']) assert(p.sources.includes(source));
 assert.deepEqual(p.features.export_4k,{value:'paid'});
 assert.equal(p.features.gpu_accel.value,'unknown');
 for(const key of ['proxy','keyframes']) assert.equal(p.features[key].value,'yes');
});

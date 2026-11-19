import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='filmora');
test('Filmora desktop proxy workflow does not imply export or GPU entitlements',()=>{
 assert.deepEqual(p.features.proxy,{value:'yes'});
 for(const source of ['https://filmora.wondershare.com/guide/proxy-video-editing.html','https://filmora.wondershare.com/guide-mac/working-with-proxy.html']) assert(p.sources.includes(source));
 for(const key of ['export_4k','gpu_accel']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.open_source,false);
});

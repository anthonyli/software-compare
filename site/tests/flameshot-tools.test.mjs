import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='flameshot');
test('Flameshot picker and screenshot history are explicitly documented',()=>{
 for(const key of ['color_picker','history']) assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://flameshot.org/docs/guide/key-bindings/'));
 for(const key of ['window_capture','cloud_share']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.latest_release,'15.0.0');
});

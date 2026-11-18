import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='shottr');
test('Shottr window capture and floating pins have explicit official evidence',()=>{
 for(const key of ['window_capture','pin_to_screen']) assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://shottr.cc'));
 for(const key of ['delay_timer','color_picker']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.platforms,['macOS']); assert.equal(p.latest_release,'1.10.0');
 assert.match(p.free_tier_limits,/商业使用需购买授权/);
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='greenshot');
test('Greenshot delay and editor color picker are explicitly documented',()=>{
 for(const key of ['delay_timer','color_picker']) assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://getgreenshot.org/help/'));
 for(const key of ['ocr','pin_to_screen','history']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.platforms,['Windows']);
});

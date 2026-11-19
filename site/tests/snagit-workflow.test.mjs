import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='snagit');
test('Snagit delay and screenshot library are explicitly documented',()=>{
 for(const key of ['delay_timer','history']) assert.deepEqual(p.features[key],{value:'yes'});
 assert.equal(p.features.ocr.value,'yes');
 assert(p.sources.includes('https://www.techsmith.com/snagit/features/'));
 for(const key of ['pin_to_screen','color_picker']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.latest_release,'未知');
});

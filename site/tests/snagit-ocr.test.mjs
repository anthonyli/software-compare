import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Snagit OCR retains Windows licensing version thresholds',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='snagit');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.ocr.value,'yes');assert.match(p.features.ocr.note,/2026\.1\.1、2025\.4\.2、2024\.3\.7/);assert.match(en[p.features.ocr.note],/legacy Windows OCR engine/);for(const k of ['pin_to_screen','color_picker'])assert.equal(p.features[k].value,'unknown');assert(p.sources.includes('https://support.techsmith.com/hc/en-us/articles/45409168722445-Issues-With-Grab-Text-or-Other-OCR-Functions-Such-as-Edit-Text-or-Smart-Redact'));
});

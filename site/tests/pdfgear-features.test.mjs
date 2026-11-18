import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='pdfgear');
for(const key of ['annotate','ocr','form_fill'])test(`PDFgear ${key} is verified with explicit Windows scope`,()=>{
 assert.deepEqual(p.features[key],{value:'yes',note:'Windows'});
 assert(p.sources.includes('https://www.pdfgear.com/pdfgear-for-windows/index.htm'));
 assert(p.sources.includes('https://www.pdfgear.com/windows-user-guide/fill-out-pdf-form.htm'));
});

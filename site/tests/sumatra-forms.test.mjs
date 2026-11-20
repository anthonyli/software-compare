import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('Sumatra forms support remains limited to Windows 3.7 pre-release',()=>{
 const c=JSON.parse(fs.readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url),'utf8'));const p=c.products.find(p=>p.id==='sumatra-pdf');const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
 assert.equal(p.features.form_fill.value,'partial');assert.match(p.features.form_fill.note,/Windows 3.7 预发布/);assert.match(en[p.features.form_fill.note],/stable download is still 3.6.1/);assert.equal(p.latest_release,'3.6.1');assert.equal(p.features.encrypt.value,'unknown');assert(p.sources.includes('https://www.sumatrapdfreader.org/docs/Fill-PDF-forms'));
});

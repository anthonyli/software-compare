import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='libreoffice');
test('LibreOffice supports digital signing of existing PDFs',()=>{
 assert.deepEqual(p.features.sign,{value:'yes'});
 assert(p.sources.includes('https://help.libreoffice.org/latest/en-US/text/shared/01/signexistingpdf.html'));
 for(const key of ['merge_split','form_fill','compress']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.features.edit_text.value,'partial');
});

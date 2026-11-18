import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('LibreOffice PDF protection cites export security, not inferred forms',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='libreoffice');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.encrypt,{value:'yes'});
 assert(p.sources.includes('https://help.libreoffice.org/latest/en-US/text/shared/01/ref_pdf_export_security.html'));
 for(const k of ['form_fill','compress'])assert.equal(p.features[k].value,'unknown');
});

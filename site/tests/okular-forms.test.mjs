import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Okular forms and annotation have stable handbook evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='okular');assert.equal(rows.length,1);const p=rows[0];
 for(const k of ['form_fill','annotate'])assert.deepEqual(p.features[k],{value:'yes'});
 for(const name of ['forms','annotations'])assert(p.sources.includes('https://docs.kde.org/stable_kf6/en/okular/okular/'+name+'.html'));
 assert.equal(p.features.edit_text.value,'no');for(const k of ['encrypt'])assert.equal(p.features[k].value,'unknown');
});

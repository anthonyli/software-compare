import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Audition batch capability cites current desktop save documentation',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/audio-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='adobe-audition');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.batch,{value:'yes'});
 assert(p.sources.includes('https://helpx.adobe.com/audition/desktop/saving-and-exporting/saving-exporting-files1.html'));
 assert.equal(p.open_source,false);assert.equal(p.features.midi.value,'no');
});

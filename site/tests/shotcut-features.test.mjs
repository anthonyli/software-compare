import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Shotcut documented keyframes chroma key and proxy preserve GPU uncertainty',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/video-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='shotcut');assert.equal(rows.length,1);const p=rows[0];
 for(const k of ['keyframes','chroma_key','proxy'])assert.deepEqual(p.features[k],{value:'yes'});
 assert(p.sources.includes('https://shotcut.org/features/'));assert.equal(p.features.gpu_accel.value,'unknown');
});

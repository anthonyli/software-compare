import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/archivers.json',import.meta.url),'utf8')).products.find(p=>p.id==='ark');
const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url),'utf8'));
test('Ark ISO is verified for unpacking, not full read-write support',()=>{
 assert.deepEqual(p.features.iso,{value:'partial',note:'Unpack 包含 ISO'});
 assert.equal(en[p.features.iso.note],'Unpack includes ISO');
 assert(p.sources.includes('https://github.com/KDE/ark/blob/adce1ae0b77cb369b1aa835102d1e986cfdae66d/plugins/libarchive/kerfuffle_libarchive_readonly.json.cmake'));
 assert.equal(p.features.encryption.value,'unknown');assert.equal(p.features.split.value,'unknown');
});

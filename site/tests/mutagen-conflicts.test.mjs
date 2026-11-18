import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/file-sync.json',import.meta.url),'utf8')).products.find(p=>p.id==='mutagen');
test('Mutagen documents conflict detection and resolution without expanding other capabilities',()=>{
 assert.deepEqual(p.features.conflict,{value:'yes'});
 assert(p.sources.includes('https://mutagen.io/documentation/synchronization/'));
 assert.equal(p.features.e2e_encrypt.value,'unknown');
 assert.equal(p.features.versions.value,'no');
 assert.equal(p.features.mobile.value,'no');
});

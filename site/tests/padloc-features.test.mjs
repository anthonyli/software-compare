import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='padloc');
test('Padloc has browser extensions and paid hosted authenticator',()=>{
 assert.deepEqual(p.features.browser_extension,{value:'yes'});
 assert.deepEqual(p.features.totp,{value:'paid'});
 assert(p.sources.includes('https://padloc.app'));
 for(const key of ['autofill','passkeys','emergency_access','breach_monitoring']) assert.equal(p.features[key].value,'unknown');
});

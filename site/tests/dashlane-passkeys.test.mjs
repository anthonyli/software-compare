import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='dashlane');
test('Dashlane external-service passkeys are verified without changing unrelated unknowns',()=>{
 assert.deepEqual(p.features.passkeys,{value:'yes'});
 assert(p.sources.includes('https://support.dashlane.com/hc/en-us/articles/7888558064274-Passkeys-in-Dashlane'));
 assert.equal(p.features.totp.value,'yes');
 assert.equal(p.features.emergency_access.value,'unknown');
 assert.equal(p.features.password_sharing.value,'yes');
});

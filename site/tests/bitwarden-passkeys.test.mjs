import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='bitwarden');
test('Bitwarden external-service passkeys are verified without changing unrelated unknowns',()=>{
 assert.deepEqual(p.features.passkeys,{value:'yes'});
 assert(p.sources.includes('https://bitwarden.com/help/storing-passkeys/'));
 assert.equal(p.features.totp.value,'paid');
 assert.equal(p.features.emergency_access.value,'paid');
 assert.equal(p.features.password_sharing.value,'unknown');
});

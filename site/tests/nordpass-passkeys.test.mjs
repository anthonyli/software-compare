import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='nordpass');
test('NordPass external-service passkeys are verified without expanding other capabilities',()=>{
 assert.deepEqual(p.features.passkeys,{value:'yes'});
 assert(p.sources.includes('https://support.nordpass.com/hc/en-us/articles/12984678202641-Passkeys-FAQs'));
 assert.equal(p.features.totp.value,'unknown');
 assert.equal(p.features.emergency_access.value,'paid');
 assert.equal(p.features.self_host.value,'no');
});

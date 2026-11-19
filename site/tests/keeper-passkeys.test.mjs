import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='keeper');
test('Keeper external-service passkeys are verified without expanding other capabilities',()=>{
 assert.deepEqual(p.features.passkeys,{value:'yes'});
 assert(p.sources.includes('https://help.keeper.io/article/268-what-is-a-passkey-and-how-does-keeper-support-them'));
 assert.equal(p.features.totp.value,'yes');
 assert.equal(p.features.emergency_access.value,'unknown');
 assert.equal(p.features.self_host.value,'unknown');
});

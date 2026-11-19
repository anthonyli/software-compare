import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='keeper');
test('Keeper generates stored-login TOTP without expanding other claims',()=>{
 assert.deepEqual(p.features.totp,{value:'yes'});
 assert(p.sources.includes('https://help.keeper.io/article/189-how-do-i-set-up-two-factor-codes-for-my-various-websites'));
 assert(p.sources.includes('https://www.keepersecurity.com/legal/terms-of-use/'));
 assert.equal(p.features.password_sharing.value,'unknown');
 assert.equal(p.features.emergency_access.value,'unknown');
 assert.equal(p.features.breach_monitoring.value,'paid');
});

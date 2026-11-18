import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='enpass');
test('Enpass generates TOTP without expanding passkey or sharing claims',()=>{
 assert.deepEqual(p.features.totp,{value:'yes'});
 assert(p.sources.includes('https://help.enpass.io/personal/latest/all/using-enpass-for-2fa-authentication-codes'));
 assert.equal(p.features.passkeys.value,'unknown');assert.equal(p.features.password_sharing.value,'unknown');
 assert.equal(p.open_source,false);assert.equal(p.features.self_host.value,'partial');
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='authpass');
test('AuthPass generates TOTP codes without expanding passkey or browser-extension claims',()=>{
 assert.deepEqual(p.features.totp,{value:'yes'});
 assert(p.sources.includes('https://authpass.app/articles/time-based-one-time-tokens-for-2nd-factor-otpauth/'));
 assert(p.sources.includes('https://github.com/authpass/authpass/releases/tag/v1.9.9'));
 assert.equal(p.features.passkeys.value,'unknown');assert.equal(p.features.browser_extension.value,'unknown');
 assert.equal(p.features.emergency_access.value,'no');
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='passbolt');
test('Passbolt generates TOTP codes without expanding passkey or desktop claims',()=>{
 assert.deepEqual(p.features.totp,{value:'yes'});
 for(const path of ['mobile/totp-mobile/','browser/create-resource/'])assert(p.sources.includes(`https://www.passbolt.com/docs/user/basic-features/${path}`));
 assert.equal(p.features.passkeys.value,'unknown');assert.equal(p.features.desktop_app.value,'unknown');
});

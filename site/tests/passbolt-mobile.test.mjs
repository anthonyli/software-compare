import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='passbolt');
test('Passbolt mobile availability is verified without expanding other features',()=>{
 assert.deepEqual(p.features.mobile_app,{value:'yes'});
 assert(p.platforms.includes('Android'));assert(p.platforms.includes('iOS'));
 for(const suffix of ['', 'android/', 'ios/'])assert(p.sources.includes(`https://www.passbolt.com/docs/user/quickstart/mobile/${suffix}`));
 assert.equal(p.features.desktop_app.value,'unknown');assert.equal(p.features.passkeys.value,'unknown');
});

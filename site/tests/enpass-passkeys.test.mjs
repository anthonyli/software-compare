import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='enpass');
test('Enpass documents stored passkeys without expanding sharing or emergency access',()=>{
 assert.deepEqual(p.features.passkeys,{value:'yes'});
 assert(p.sources.includes('https://help.enpass.io/personal/latest/all/creating-storing-passkeys'));
 assert(p.sources.includes('https://help.enpass.io/personal/latest/all/auto-filling-passwords-passkeys-and-more'));
 assert.equal(p.features.password_sharing.value,'unknown');assert.equal(p.features.emergency_access.value,'unknown');
 assert.equal(p.open_source,false);assert.equal(p.features.self_host.value,'partial');
});

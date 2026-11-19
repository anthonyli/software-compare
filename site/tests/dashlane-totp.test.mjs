import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='dashlane');
test('Dashlane generates stored-login TOTP without expanding emergency access',()=>{
 assert.deepEqual(p.features.totp,{value:'yes'});
 assert(p.sources.includes('https://support.dashlane.com/hc/en-us/articles/18408732026258-Turn-on-2FA-for-a-login-stored-in-Dashlane'));
 assert.equal(p.features.emergency_access.value,'unknown');
 assert.equal(p.features.passkeys.value,'yes');
 assert.equal(p.open_source,false);
});

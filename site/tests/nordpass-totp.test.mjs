import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='nordpass');
test('NordPass integrated TOTP belongs to paid plans',()=>{
 assert.deepEqual(p.features.totp,{value:'paid'});
 assert(p.sources.includes('https://support.nordpass.com/hc/en-us/articles/8061258237585-How-to-use-NordPass-Authenticator'));
 assert(p.sources.includes('https://support.nordpass.com/hc/en-us/articles/360006700458-Premium-vs-Free-version-of-NordPass'));
 assert.equal(p.features.breach_monitoring.value,'unknown');
 assert.deepEqual(p.features.passkeys,{value:'yes'});
});

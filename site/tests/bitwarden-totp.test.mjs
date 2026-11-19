import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='bitwarden');
test('Bitwarden integrated code generation requires a paid entitlement',()=>{
 assert.deepEqual(p.features.totp,{value:'paid'});
 assert(p.sources.includes('https://bitwarden.com/help/integrated-authenticator/'));
 for(const feature of ['password_sharing','breach_monitoring']) assert.equal(p.features[feature].value,'unknown');
 assert.deepEqual(p.features.passkeys,{value:'yes'});
});

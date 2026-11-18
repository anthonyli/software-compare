import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='1password');
test('1Password breach checking is verified without changing unrelated unknowns',()=>{
 assert.deepEqual(p.features.breach_monitoring,{value:'yes'});
 assert(p.sources.includes('https://support.1password.com/watchtower/'));
 assert(p.sources.includes('https://support.1password.com/watchtower-privacy/'));
 assert.equal(p.features.emergency_access.value,'unknown');
 assert.equal(p.features.self_host.value,'no');
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='nordpass');
test('NordPass sharing and emergency setup require paid entitlement',()=>{
 for(const key of ['password_sharing','emergency_access']) assert.deepEqual(p.features[key],{value:'paid'});
 assert(p.sources.includes('https://support.nordpass.com/hc/en-us/articles/360017660077-Managing-access-levels-in-NordPass'));
 assert(p.sources.includes('https://support.nordpass.com/hc/en-us/articles/5691777958929-How-to-give-Emergency-Access-in-NordPass'));
 for(const key of ['breach_monitoring']) assert.equal(p.features[key].value,'unknown');
 assert.deepEqual(p.features.passkeys,{value:'yes'});
});

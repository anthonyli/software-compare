import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8')).products.find(p=>p.id==='padloc');
test('Padloc provides an official self-hosted server and web app path',()=>{
 assert.deepEqual(p.features.self_host,{value:'yes'});
 assert(p.sources.includes('https://docs.padloc.app/guides/self-host/'));
 assert(p.sources.includes('https://github.com/padloc/padloc/blob/main/docs/examples/hosting/docker/basic/README.md'));
 assert.deepEqual(p.features.totp,{value:'paid'});
 for(const key of ['autofill','passkeys','emergency_access','breach_monitoring']) assert.equal(p.features[key].value,'unknown');
});

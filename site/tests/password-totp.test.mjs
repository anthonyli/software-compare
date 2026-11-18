import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(new URL('../../categories/password-managers.json',import.meta.url),'utf8'));
for(const [id,source] of [
 ['gopass','https://github.com/gopasspw/gopass/blob/83f0487de897753118e3dba65ef99a457e9874e3/docs/commands/otp.md'],
 ['keeweb','https://github.com/keeweb/keeweb/blob/dfc6201285ec1dfecd2e8f80363d82811e75bc6d/app/scripts/util/data/otp.js']
])test(`${id} TOTP generation is supported by immutable official evidence`,()=>{
 const p=data.products.find(p=>p.id===id);assert.deepEqual(p.features.totp,{value:'yes'});assert(p.sources.includes(source));
 assert.equal(p.pricing_model,'完全免费');assert.equal(p.features.emergency_access.value,'no');
});

import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/transactional-email.json',import.meta.url),'utf8'));
const s=c.products.find(p=>p.id==='sendgrid');
test('SendGrid trial is time limited, cardless and separate from marketing',()=>{
 assert.equal(s.pricing_model,'免费试用');assert.equal(s.features.cardless.value,'yes');assert.equal(s.features.approval.value,'unknown');
 assert.match(s.features.quota.note,/一次 60 天.*注册.*100.*UTC.*不是月度 3,000/);
 assert.match(s.features.overflow.note,/Maximum credits exceeded.*UTC.*到期需升级 Email API/);
 assert.match(s.free_tier_limits,/Marketing Campaigns.*独立/);assert.match(s.features.domains.note,/必须验证发件身份/);
});

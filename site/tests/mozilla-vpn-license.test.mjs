import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('Mozilla VPN records the verified client project license without making service free',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../../categories/vpn-clients.json',import.meta.url),'utf8'));
 const product=data.products.find(p=>p.id==='mozilla-vpn');
 assert.equal(product.license,'MPL-2.0（含其他开源许可组件）');
 assert.equal(product.open_source,true);
 assert.equal(product.pricing_model,'订阅');
 assert(product.sources.includes('https://github.com/mozilla-mobile/mozilla-vpn-client/blob/cb5f9990d68f80c4b5e4b6124ec5bf472bfdd751/LICENSE.md'));
});

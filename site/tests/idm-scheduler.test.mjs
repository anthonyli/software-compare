import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8')).products.find(p=>p.id==='idm');
test('IDM queue scheduling is verified without inferring price, RSS or remote execution',()=>{
 assert.deepEqual(p.features.schedule,{value:'yes'});
 assert(p.sources.includes('https://www.internetdownloadmanager.com/support/idm-scheduler/idm_scheduler.html'));
 assert.deepEqual(p.platforms,['Windows']);
 assert.equal(p.features.rss.value,'unknown');
 assert.equal(p.features.remote_webui.value,'no');
 assert.equal(p.prices[0].price,'未知');
 assert.match(p.free_tier_limits,/未在本次核实/);
});

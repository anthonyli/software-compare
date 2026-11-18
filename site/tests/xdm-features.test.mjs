import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8')).products.find(p=>p.id==='xdm');
test('XDM scheduling and speed limiting are verified without extending other capabilities',()=>{
 for(const key of ['schedule','speed_limit']) assert.deepEqual(p.features[key],{value:'yes'});
 for(const url of ['https://xtremedownloadmanager.com/guide/schedule-downloads/','https://xtremedownloadmanager.com/help/slow-downloads/']) assert(p.sources.includes(url));
 for(const key of ['bittorrent','rss']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.features.remote_webui.value,'no');
 assert.deepEqual(p.platforms,['Windows','macOS','Linux']);
 assert.equal(p.latest_release,'9.0.9');
});

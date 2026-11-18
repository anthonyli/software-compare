import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8')).products.find(p=>p.id==='fdm');
test('FDM traffic controls and official browser integration are verified without broadening other capabilities',()=>{
 for(const key of ['speed_limit','browser_ext']) assert.deepEqual(p.features[key],{value:'yes'});
 for(const url of ['https://www.freedownloadmanager.org/features.htm','https://www.freedownloadmanager.org/landing.htm?from=b_si_version','https://addons.mozilla.org/en-US/firefox/addon/free-download-manager-addon/']) assert(p.sources.includes(url));
 for(const key of ['ed2k','stream_m3u8','video_site','rss','remote_webui']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.features.schedule.value,'yes');
 assert.deepEqual(p.platforms,['Windows','macOS','Linux']);
 assert.equal(p.open_source,false);
});

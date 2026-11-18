import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8')).products.find(p=>p.id==='gopeed');
test('Gopeed ED2K and official browser integration are verified for the recorded release',()=>{
 for(const key of ['ed2k','browser_ext']) assert.deepEqual(p.features[key],{value:'yes'});
 for(const url of ['https://github.com/GopeedLab/gopeed/blob/v1.9.3/README.md','https://github.com/GopeedLab/browser-extension','https://gopeed.com/docs']) assert(p.sources.includes(url));
 for(const key of ['stream_m3u8','video_site','schedule','speed_limit','rss']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.features.remote_webui.value,'partial');
 assert.equal(p.latest_release,'1.9.3');
 assert.equal(p.license,'GPL-3.0');
});

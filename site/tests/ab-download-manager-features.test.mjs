import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/downloaders.json',import.meta.url),'utf8')).products.find(p=>p.id==='ab-download-manager');
const base='https://github.com/amir1376/ab-download-manager/blob/b1d067c9b3c2f069c3b75fae631da9bd1793191e/';
for(const [key,path] of [['schedule','downloader/core/src/commonMain/kotlin/ir/amirab/downloader/queue/DownloadQueue.kt'],['speed_limit','desktop/app/src/main/kotlin/com/abdownloadmanager/desktop/ui/configurable/comon/renderer/ToggleableSpeedLimitConfigurableRenderer.kt']])test('AB Download Manager verified '+key,()=>{
 assert.deepEqual(p.features[key],{value:'yes'});assert(p.sources.includes(base+path));
 assert.equal(p.features.bittorrent.value,'unknown');assert.equal(p.features.rss.value,'unknown');
});

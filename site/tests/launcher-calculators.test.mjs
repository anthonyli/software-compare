import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/launchers.json',import.meta.url),'utf8'));
for(const [id,source] of [['flow-launcher','https://github.com/Flow-Launcher/Flow.Launcher/blob/9fe822b398ad9541a1a35fb1c688a006a27f2f9d/README.md#calculator'],['ulauncher','https://github.com/Ulauncher/Ulauncher/blob/b243dd00a97cffff803f64d127f46e9fde9b13d1/ulauncher/search/calc/CalcMode.py']])test(`${id} calculator is verified with official fixed evidence`,()=>{
 const p=c.products.find(p=>p.id===id);assert.deepEqual(p.features.calculator,{value:'yes'});assert(p.sources.includes(source));
});

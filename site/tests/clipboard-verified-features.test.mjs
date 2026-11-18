import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(new URL('../../categories/clipboard-managers.json',import.meta.url),'utf8'));
for(const [id,key,source] of [
 ['maccy','rich_clipboard','https://github.com/p0deje/Maccy/blob/7c1644bfbed1dd0d703ecdbaf4a1b9a3a1d0b295/Maccy/Clipboard.swift'],
 ['ditto','history_search','https://github.com/sabrogden/Ditto/blob/81a667c790f5a6c9b6b63f187eb75e79bf159670/src/QPasteWnd.cpp']
])test(`${id} has verified ${key} with immutable official evidence`,()=>{
 const p=data.products.find(p=>p.id===id);assert.deepEqual(p.features[key],{value:'yes'});assert(p.sources.includes(source));
});

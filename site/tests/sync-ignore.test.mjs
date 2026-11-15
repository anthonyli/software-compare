import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Seafile and ownCloud ignore rules cite desktop documentation without guessing other features',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/file-sync.json',import.meta.url)));
 const sources={seafile:'https://help.seafile.com/syncing_client/excluding_files/',owncloud:'https://doc.owncloud.com/desktop/7.1/using.html'};
 for(const [id,url] of Object.entries(sources)){
  const matches=d.products.filter(x=>x.id===id);assert.equal(matches.length,1);
  assert.deepEqual(matches[0].features.ignore_rules,{value:'yes'});assert(matches[0].sources.includes(url));
 }
 const own=d.products.find(x=>x.id==='owncloud');assert.equal(own.features.block_level.value,'unknown');assert.equal(own.features.e2e_encrypt.value,'unknown');
});

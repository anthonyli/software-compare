import {test} from 'node:test';
import assert from 'node:assert/strict';
import {repositoryKey,syncRepositories,loadRepositories} from '../../scripts/sync-github.mjs';
const now='2026-11-13T02:00:00.000Z';
const repo={stargazers_count:42,archived:false,pushed_at:'2026-11-12T01:00:00Z'};
const release={tag_name:'v2.0',published_at:'2026-11-12T20:00:00Z',draft:false,prerelease:false};
const previous={last_success_at:'2026-11-12T02:00:00Z',repositories:{'a/b':{status:'ok',synced_at:'2026-11-12T02:00:00Z',repository:{stars:10,archived:true,pushed_at:null},release:{tag:'v1',published_at:now},repo_etag:'r1',release_etag:'v1'}}};
const run=(fetchImpl,extra={})=>syncRepositories({repositories:['a/b'],previous,now,fetchImpl,delayMs:0,sleep:async()=>{},...extra});
test('only official GitHub repository URLs are accepted',()=>{
 assert.equal(repositoryKey('https://github.com/ShareX/ShareX/'),'sharex/sharex');
 for(const url of ['https://github.com.evil/a/b','https://github.com/a/b/tree/main','javascript:alert(1)']) assert.equal(repositoryKey(url),null);
});
test('repository sources load and deduplicate across categories',async()=>{
 const repos=await loadRepositories(new URL('../../',import.meta.url).pathname);
 assert(repos.length>100);assert.equal(repos.filter(r=>r==='sharex/sharex').length,1);
});
test('successful run updates validated facts and timestamps',async()=>{
 const result=await run(async url=>Response.json(url.endsWith('/latest')?release:repo));
 assert.equal(result.snapshot.repositories['a/b'].repository.stars,42);
 assert.equal(result.snapshot.repositories['a/b'].release.tag,'v2.0');
 assert.equal(result.snapshot.last_success_at,now);
 assert.deepEqual(result.summary,{total:1,succeeded:1,pending:0});
 assert.equal(previous.repositories['a/b'].repository.stars,10);
});
test('304 preserves facts and sends both conditional headers',async()=>{
 const headers=[];
 const result=await run(async(url,options)=>{headers.push(options.headers['If-None-Match']);return new Response(null,{status:304});});
 assert.deepEqual(headers,['r1','v1']);
 assert.equal(result.snapshot.repositories['a/b'].repository.stars,10);
 assert.equal(result.snapshot.repositories['a/b'].synced_at,now);
});
test('missing Release is not treated as stopped maintenance',async()=>{
 const result=await run(async url=>url.endsWith('/latest')?new Response(null,{status:404}):Response.json(repo));
 assert.equal(result.snapshot.repositories['a/b'].release,null);
 assert.equal(result.snapshot.repositories['a/b'].status,'ok');
 assert(!('maintenance_status' in result.snapshot.repositories['a/b']));
});
test('repository 404 and invalid schema retain last confirmed values',async()=>{
 for(const response of [()=>new Response(null,{status:404}),()=>Response.json({...repo,stargazers_count:'42'})]) {
  const result=await run(async()=>response());
  const entry=result.snapshot.repositories['a/b'];
  assert.equal(entry.status,'pending');assert.equal(entry.repository.stars,10);assert.equal(entry.synced_at,previous.repositories['a/b'].synced_at);
  assert.equal(result.snapshot.last_success_at,previous.last_success_at);
 }
});
test('release failure does not partially overwrite a repository snapshot',async()=>{
 const result=await run(async url=>url.endsWith('/latest')?new Response(null,{status:500}):Response.json(repo));
 assert.equal(result.snapshot.repositories['a/b'].repository.stars,10);
 assert.equal(result.snapshot.repositories['a/b'].status,'pending');
});
test('rate limits stop further network calls and preserve old data',async()=>{
 let calls=0;
 const result=await run(async()=>{calls++;return new Response(null,{status:429});},{repositories:['a/b','c/d']});
 assert.equal(calls,1);assert.equal(result.summary.pending,2);
 assert.equal(result.snapshot.repositories['a/b'].repository.stars,10);
 assert.equal(result.snapshot.repositories['c/d'].status,'pending');
});

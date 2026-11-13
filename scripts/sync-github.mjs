import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export function repositoryKey(value) {
  try {
    const url = new URL(value);
    const parts = url.pathname.replace(/\/$/,'').replace(/\.git$/,'').split('/').filter(Boolean);
    if (url.protocol!=='https:' || url.hostname!=='github.com' || parts.length!==2 || !parts.every(x=>/^[\w.-]+$/.test(x))) return null;
    return parts.join('/').toLowerCase();
  } catch { return null; }
}

export async function loadRepositories(root) {
  const data = JSON.parse(await fs.readFile(path.join(root,'data.json'),'utf8'));
  const categories = [...data.categories];
  for (const file of (await fs.readdir(path.join(root,'categories'))).filter(x=>x.endsWith('.json')).sort()) {
    categories.push(JSON.parse(await fs.readFile(path.join(root,'categories',file),'utf8')));
  }
  const repos = new Set();
  for (const cat of categories) for (const product of cat.products) {
    if (!product.github_url) continue;
    const repo = repositoryKey(product.github_url);
    if (!repo) throw new Error(`Invalid GitHub source for ${product.id}`);
    repos.add(repo);
  }
  return [...repos].sort();
}

function validDate(value) { return typeof value==='string' && Number.isFinite(Date.parse(value)); }
function normalizeRepo(data) {
  if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count<0 || typeof data.archived!=='boolean' || (data.pushed_at!==null && !validDate(data.pushed_at))) throw new Error('Unexpected repository response');
  return {stars:data.stargazers_count, archived:data.archived, pushed_at:data.pushed_at};
}
function normalizeRelease(data) {
  if (typeof data.tag_name!=='string' || !data.tag_name || !validDate(data.published_at) || data.draft!==false || data.prerelease!==false) throw new Error('Unexpected release response');
  return {tag:data.tag_name, published_at:data.published_at};
}

export async function syncRepositories({repositories, previous, token, fetchImpl=fetch, now=new Date().toISOString(), delayMs=250, sleep=ms=>new Promise(r=>setTimeout(r,ms))}) {
  const next = {schema_version:1, last_attempt_at:now, last_success_at:previous.last_success_at || null, repositories:{}};
  let succeeded=0, blocked=false;
  async function request(endpoint, etag, cached, normalize, allow404=false) {
    const headers = {Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'software-compare-sync'};
    if (token) headers.Authorization=`Bearer ${token}`;
    if (etag && cached!==undefined) headers['If-None-Match']=etag;
    let response;
    for (let attempt=0;attempt<3;attempt++) {
      try {
        response = await fetchImpl(`https://api.github.com/repos/${endpoint}`,{headers,signal:AbortSignal.timeout(20000)});
      } catch (error) {
        if(attempt===2) throw new Error('GitHub network request failed');
        await sleep(1000*(attempt+1)); continue;
      }
      if (response.status===429 || response.status===403 || response.status===401) {
        blocked=true;
        throw new Error(`GitHub access/rate limit (${response.status}); retry on next run`);
      }
      if (response.status<500 || attempt===2) break;
      await sleep(1000*(attempt+1));
    }
    if (response.status===304) {
      if(cached===undefined) throw new Error('Missing cached response for 304');
      return {value:cached,etag};
    }
    if (allow404 && response.status===404) return {value:null,etag:null};
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    return {value:normalize(await response.json()),etag:response.headers.get('etag')};
  }
  for (const repo of repositories) {
    const old=previous.repositories?.[repo] || {};
    try {
      if(blocked) throw new Error('Deferred after GitHub access/rate limit');
      const info=await request(repo,old.repo_etag,old.repository,normalizeRepo);
      await sleep(delayMs);
      // A 404 is treated as no GitHub Release only after the repository was read successfully.
      const release=await request(`${repo}/releases/latest`,old.release_etag,old.release,normalizeRelease,true);
      next.repositories[repo]={status:'ok',checked_at:now,synced_at:now,source:`https://api.github.com/repos/${repo}`,repository:info.value,release:release.value,repo_etag:info.etag,release_etag:release.etag};
      succeeded++;
    } catch(error) {
      next.repositories[repo]={...old,status:'pending',checked_at:now,error:error.message,source:`https://api.github.com/repos/${repo}`};
    }
    if(!blocked) await sleep(delayMs);
  }
  if(succeeded===repositories.length && repositories.length>0) next.last_success_at=now;
  return {snapshot:next,summary:{total:repositories.length,succeeded,pending:repositories.length-succeeded}};
}

async function main() {
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
  const file=path.join(root,'github-data.json');
  const previous=JSON.parse(await fs.readFile(file,'utf8'));
  const repositories=await loadRepositories(root);
  const result=await syncRepositories({repositories,previous,token:process.env.GITHUB_TOKEN || process.env.GH_TOKEN});
  if(!process.argv.includes('--dry-run')) {
    await fs.writeFile(file+'.tmp',JSON.stringify(result.snapshot,null,2)+'\n');
    await fs.rename(file+'.tmp',file);
  }
  console.log(JSON.stringify(result.summary));
  for (const [repo,entry] of Object.entries(result.snapshot.repositories)) {
    if(entry.status==='pending') console.warn(`${repo}: ${entry.error}`);
  }
  if(process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,`GitHub sync: ${result.summary.succeeded}/${result.summary.total} succeeded; ${result.summary.pending} pending verification. Existing values were retained for failures.\n`);
  // Partial snapshots are still useful and must be published; surface failures without discarding them.
  if(result.summary.pending) console.warn('Some repositories require verification; see github-data.json.');
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) await main();

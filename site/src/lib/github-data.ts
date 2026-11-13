import snapshotData from '../../../github-data.json';

export type GitHubEntry = {
  status: 'ok' | 'pending';
  checked_at: string;
  synced_at?: string;
  repository?: {stars:number; archived:boolean; pushed_at:string|null};
  release?: {tag:string; published_at:string}|null;
};
export const githubSnapshot = snapshotData as {
  last_attempt_at:string|null;
  last_success_at:string|null;
  repositories:Record<string,GitHubEntry>;
};
export function githubEntry(url:string|null):GitHubEntry|null {
  if(!url) return null;
  try {
    const parsed=new URL(url);
    if(parsed.hostname!=='github.com') return null;
    const key=parsed.pathname.replace(/^\//,'').replace(/\/$/,'').replace(/\.git$/,'').toLowerCase();
    return githubSnapshot.repositories[key] || null;
  } catch {return null;}
}
export function syncTime(value:string):string {
  return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(value));
}

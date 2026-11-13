type Vote={id:string;count:number;liked:boolean};
const buttons=[...document.querySelectorAll<HTMLButtonElement>('[data-vote-id]')];
const ids=[...new Set(buttons.map(b=>b.dataset.voteId!))];
const votes=new Map<string,Vote>();
const busy=new Set<string>();
let errorKey='', loading=false;
const isEn=()=>document.documentElement.lang==='en';
const messages:Record<string,[string,string]>={
  load:['点赞数据暂时不可用；社区人气排序尚未加载。','Likes are unavailable; community ranking has not loaded.'],
  save:['点赞未确认成功，请重试。','Your vote could not be confirmed. Please retry.'],
  limited:['操作太频繁，请稍后重试。','Too many requests. Please try again later.'],
  session:['浏览器身份已失效，请重试加载后再点赞。','Your browser session expired. Reload likes, then try again.'],
};
function render() {
  for(const button of buttons) {
    const id=button.dataset.voteId!, vote=votes.get(id);
    button.disabled=!vote || busy.has(id) || loading;
    button.setAttribute('aria-pressed',String(vote?.liked || false));
    button.setAttribute('aria-busy',String(busy.has(id)));
    button.querySelector('[data-vote-label]')!.textContent=isEn() ? (vote?.liked ? 'Liked' : 'Like') : (vote?.liked ? '已点赞' : '点赞');
    button.querySelector('[data-vote-count]')!.textContent=vote ? vote.count.toLocaleString(isEn()?'en-US':'zh-CN') : '—';
    button.setAttribute('aria-label',isEn() ? `${vote?.liked?'Unlike':'Like'} ${button.dataset.productName}${vote ? `, ${vote.count} likes` : ''}` : `${vote?.liked?'取消对':'为'} ${button.dataset.productName} 点赞${vote ? `，${vote.count} 票` : ''}`);
  }
  document.querySelectorAll<HTMLElement>('[data-vote-status]').forEach(el=>{
    el.hidden=!errorKey;
    el.querySelector('[data-vote-message]')!.textContent=errorKey ? messages[errorKey][isEn()?1:0] : '';
    (el.querySelector('[data-vote-retry]') as HTMLButtonElement).disabled=loading;
  });
}
function update(next:Vote[]) {
  for(const vote of next) votes.set(vote.id,vote);
  document.querySelectorAll<HTMLElement>('[data-product-id]').forEach(el=>{
    const vote=votes.get(el.dataset.productId!);
    if(vote) el.dataset.likes=String(vote.count);
  });
  render();
  window.dispatchEvent(new CustomEvent('compare-votes'));
}
function validVote(value:unknown):value is Vote {
  const v=value as Vote;
  return !!v && ids.includes(v.id) && Number.isSafeInteger(v.count) && v.count>=0 && typeof v.liked==='boolean';
}
async function load() {
  if(loading || busy.size || !ids.length) return;
  loading=true;render();
  try {
    const all:Vote[]=[];
    for(let i=0;i<ids.length;i+=80) {
      const batch=ids.slice(i,i+80);
      const response=await fetch(`/api/votes?ids=${encodeURIComponent(batch.join(','))}`,{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(15000)});
      if(!response.ok) throw new Error(response.status===429?'limited':'load');
      const data=await response.json();
      if(!Array.isArray(data.votes) || data.votes.length!==batch.length || !data.votes.every(validVote) || !batch.every(id=>data.votes.some((v:Vote)=>v.id===id))) throw new Error('load');
      all.push(...data.votes);
    }
    errorKey='';update(all);
  } catch(error) {errorKey=error instanceof Error && error.message==='limited' ? 'limited' : 'load';}
  finally {loading=false;render();}
}
buttons.forEach(button=>button.addEventListener('click',async()=>{
  const id=button.dataset.voteId!, current=votes.get(id);
  if(!current || busy.has(id)) return;
  const hadFocus=document.activeElement===button;
  busy.add(id);errorKey='';render();
  try {
    const response=await fetch('/api/votes',{method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,liked:!current.liked}),signal:AbortSignal.timeout(15000)});
    if(!response.ok) throw new Error(response.status===429?'limited':response.status===401?'session':'save');
    const data=await response.json();
    if(!validVote(data.vote) || data.vote.id!==id) throw new Error('save');
    update([data.vote]);
    try {localStorage.setItem('compare-votes-changed',String(Date.now()));} catch {}
  } catch(error) {errorKey=error instanceof Error && messages[error.message] ? error.message : 'save';}
  finally {
    busy.delete(id);render();
    if(hadFocus && (document.activeElement===document.body || document.activeElement===button)) button.focus({preventScroll:true});
  }
}));
document.querySelectorAll('[data-vote-retry]').forEach(el=>el.addEventListener('click',()=>load()));
window.addEventListener('compare-lang',render);
window.addEventListener('storage',e=>{if(e.key==='compare-votes-changed') void load();});
window.addEventListener('focus',()=>void load());
void load();

// Anonymous votes are browser identities, not verified people.
const COOKIE = 'compare_voter';
const YEAR = 365 * 24 * 60 * 60;
const encoder = new TextEncoder();

function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers: {
    'Cache-Control': 'private, no-store', 'Vary': 'Cookie',
    'X-Content-Type-Options': 'nosniff', ...headers,
  }});
}
async function key(secret) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), {name:'HMAC', hash:'SHA-256'}, false, ['sign','verify']);
}
async function sign(secret, message) {
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', await key(secret), encoder.encode(message)));
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}
async function identity(request, secret) {
  const token = request.headers.get('Cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);
  if (!token) return null;
  const [id, issued, signature, extra] = token.split('.');
  if (extra || !/^[\da-f-]{36}$/.test(id || '') || !/^\d+$/.test(issued || '') || !/^[\da-f]{64}$/.test(signature || '')) return null;
  const age = Math.floor(Date.now()/1000) - Number(issued);
  if (age < 0 || age >= YEAR) return null;
  const bytes = Uint8Array.from(signature.match(/../g), hex=>parseInt(hex,16));
  return await crypto.subtle.verify('HMAC', await key(secret), bytes, encoder.encode(`voter:${id}.${issued}`)) ? id : null;
}
async function createIdentity(url, secret) {
  const id = crypto.randomUUID();
  const value = `${id}.${Math.floor(Date.now()/1000)}`;
  const signature = await sign(secret, `voter:${value}`);
  return { id, cookie: `${COOKIE}=${value}.${signature}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${YEAR}${url.protocol==='https:' ? '; Secure' : ''}` };
}
async function allow(request, env, kind, limit, seconds) {
  const now = Math.floor(Date.now()/1000);
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const bucket = await sign(env.COOKIE_SECRET, `${kind}:${Math.floor(now/seconds)}:${ip}`);
  const result = await env.DB.batch([
    env.DB.prepare('DELETE FROM vote_rate_limits WHERE expires_at < ?').bind(now),
    env.DB.prepare(`INSERT INTO vote_rate_limits(bucket,hits,expires_at) VALUES(?,1,?)
      ON CONFLICT(bucket) DO UPDATE SET hits=hits+1 WHERE hits < ? RETURNING hits`).bind(bucket, now+seconds, limit),
  ]);
  return result[1].results.length > 0;
}
async function readVotes(db, ids, voter) {
  const placeholders = ids.map(()=>'?').join(',');
  const { results } = await db.prepare(`SELECT c.product_id, c.total,
    EXISTS(SELECT 1 FROM votes v WHERE v.product_id=c.product_id AND v.voter_id=?) AS liked
    FROM vote_counts c WHERE c.product_id IN (${placeholders})`).bind(voter || '', ...ids).all();
  const byId = new Map(results.map(r=>[r.product_id, {id:r.product_id, count:r.total, liked:!!r.liked}]));
  return ids.map(id=>byId.get(id) || {id, count:0, liked:false});
}
async function readBody(request) {
  if (!request.body) throw new Error('empty body');
  const reader = request.body.getReader();
  let text = '', size = 0;
  const decoder = new TextDecoder();
  while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 1024) { await reader.cancel(); throw new Error('body too large'); }
    text += decoder.decode(value, {stream:true});
  }
  return JSON.parse(text + decoder.decode());
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (url.pathname !== '/api/votes') return json({error:'not_found'},404);
    if (!['GET','PUT'].includes(request.method)) return json({error:'method_not_allowed'},405,{Allow:'GET, PUT'});
    if (!env.DB || !env.COOKIE_SECRET || env.COOKIE_SECRET.length < 32) return json({error:'not_configured'},503);
    if (request.headers.get('Sec-Fetch-Site') === 'cross-site') return json({error:'cross_origin'},403);
    if (request.method==='PUT' && request.headers.get('Origin')!==url.origin) return json({error:'cross_origin'},403);
    try {
      const catalogResponse = await env.ASSETS.fetch(new URL('/vote-catalog.json',url));
      if (!catalogResponse.ok) return json({error:'catalog_unavailable'},503);
      const catalog = await catalogResponse.json();
      const known = new Set(catalog.ids);
      let voter = await identity(request,env.COOKIE_SECRET);
      if (request.method==='GET') {
        const ids = [...new Set((url.searchParams.get('ids') || '').split(','))];
        if (!ids.length || ids.length>80 || ids.some(id=>!known.has(id))) return json({error:'invalid_products'},400);
        const headers = {};
        if (!voter) {
          if (!await allow(request,env,'session',30,3600)) return json({error:'rate_limited'},429,{'Retry-After':'3600'});
          const session = await createIdentity(url,env.COOKIE_SECRET);
          voter = session.id;
          headers['Set-Cookie'] = session.cookie;
        }
        return json({votes:await readVotes(env.DB,ids,voter)},200,headers);
      }
      if (!voter) return json({error:'session_required'},401);
      if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'invalid_content_type'},415);
      let body;
      try { body = await readBody(request); } catch { return json({error:'invalid_body'},400); }
      if (!body || !known.has(body.id) || typeof body.liked!=='boolean') return json({error:'invalid_vote'},400);
      if (!await allow(request,env,'vote',30,60)) return json({error:'rate_limited'},429,{'Retry-After':'60'});
      // Desired state is idempotent; retries never increment an existing vote.
      const mutation = body.liked
        ? env.DB.prepare('INSERT OR IGNORE INTO votes(product_id,voter_id,created_at) VALUES(?,?,?)').bind(body.id,voter,Date.now())
        : env.DB.prepare('DELETE FROM votes WHERE product_id=? AND voter_id=?').bind(body.id,voter);
      await mutation.run();
      return json({vote:(await readVotes(env.DB,[body.id],voter))[0]});
    } catch (error) {
      console.error('Vote API failed', error instanceof Error ? error.message : 'unknown error');
      return json({error:'temporarily_unavailable'},503);
    }
  },
};

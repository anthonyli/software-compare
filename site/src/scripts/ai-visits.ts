// Each tab keeps its first AI referral while the visitor compares products.
const storageKey = "compare-ai-visit";
const exclusionKey = "compare-exclude-analytics";
const idleLimit = 30 * 60 * 1000;
const providers: Record<string, string> = {
  "chatgpt.com": "chatgpt", "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity", "www.perplexity.ai": "perplexity",
  "claude.ai": "claude", "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot", "chat.deepseek.com": "deepseek",
  "www.doubao.com": "doubao", "doubao.com": "doubao",
  "kimi.com": "kimi", "www.kimi.com": "kimi", "kimi.moonshot.cn": "kimi",
  "yuanbao.tencent.com": "yuanbao",
};
type Action = "filtered" | "opened_product" | "visited_official";
interface Visit {
  id: string;
  source: string;
  landing: string;
  lastActive: number;
  actions: Action[];
}

function track() {
  const url = new URL(location.href);
  if (url.searchParams.get("compare_test") === "1") {
    sessionStorage.setItem(exclusionKey, "1");
    sessionStorage.removeItem(storageKey);
  }
  if (sessionStorage.getItem(exclusionKey) || navigator.doNotTrack === "1") return;

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const arrival = !navigation || navigation.type === "navigate";
  const referrer = document.referrer ? new URL(document.referrer) : null;
  const internal = referrer?.origin === location.origin;
  const utm = url.searchParams.get("utm_source")?.trim().toLowerCase() || "";
  const fromDomain = (host: string) => Object.hasOwn(providers, host) ? providers[host] : null;
  const source = fromDomain(utm) || Object.values(providers).find(name => name === utm)
    || (referrer && fromDomain(referrer.hostname));
  // Use the static canonical path only. The query, fragment and referring URL stay in the tab.
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const landing = canonical && new URL(canonical.href).pathname;
  const raw = sessionStorage.getItem(storageKey);
  let visit: Visit | null = raw && JSON.parse(raw);
  if (visit && Date.now() - visit.lastActive >= idleLimit) visit = null;
  if (arrival && !internal && (source || referrer || utm)) {
    visit = source && landing && landing !== "/404/" ? {
      id: crypto.randomUUID(), source, landing, lastActive: Date.now(), actions: [],
    } : null;
  }
  if (!visit) {
    sessionStorage.removeItem(storageKey);
    return;
  }

  const active = visit;
  function save() {
    active.lastActive = Date.now();
    sessionStorage.setItem(storageKey, JSON.stringify(active));
  }
  function send() {
    // Cumulative flags let the next navigation or action repair a failed or reordered write.
    void fetch("/api/ai-visits", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: active.id, source: active.source, landing: active.landing, actions: active.actions }),
      keepalive: true, credentials: "omit", referrerPolicy: "origin",
    }).catch(() => {});
  }
  function record(action: Action) {
    const saved = sessionStorage.getItem(storageKey);
    const current: Visit | null = saved && JSON.parse(saved);
    if (!current || current.id !== active.id || Date.now() - current.lastActive >= idleLimit) return;
    // A previous document may be restored from the back/forward cache.
    active.actions = current.actions;
    const isNew = !active.actions.includes(action);
    if (isNew) active.actions.push(action);
    save();
    if (isNew) send();
  }

  if (arrival && internal && url.pathname.startsWith("/p/") && !active.actions.includes("opened_product")) {
    active.actions.push("opened_product");
  }
  save();
  send();
  document.addEventListener("change", event => {
    const target = event.target;
    if (target instanceof Element && target.closest("#guide-filters, #filters") && !target.matches('[name="sort"]')) {
      record("filtered");
    }
  });
  function trackLink(event: MouseEvent) {
    if (event.type === "auxclick" && event.button !== 1) return;
    const link = event.target instanceof Element && event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    if (link.hasAttribute("data-selection-official")) record("visited_official");
    else if (link.origin === location.origin && link.pathname.startsWith("/p/")) record("opened_product");
  }
  document.addEventListener("click", trackLink, true);
  document.addEventListener("auxclick", trackLink, true);
}

try { track(); } catch { /* Browsing also works when tab storage is unavailable. */ }

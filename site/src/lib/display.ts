// SPDX-License-Identifier: Apache-2.0
import type { Price, Product } from "./load-data";
import { ui, tr, type Locale } from "../i18n";
import { pricingEn, maintenanceEn } from "../i18n/labels";

const LEAK =
  /WebFetch|\bcurl\b|\bworker\b|本轮|抓取|本机访问|本机官方|published_at|pushed_at|stargazers_count|github_stars|NOASSERTION|本次未|本次抓取|本次读取|本次核|本次打开|精确 SPDX|反爬|没抓到|没抓全|未读到|未采集|未核完|未核到|未核对|未能解析|未能提取|未能把 SKU|摘录中|打开政策全文|打开发行说明|逐项打开|逐条核对|Cloudflare 拦截/i;

export const PRICE_CAVEAT = ui.zh.caveat;
export const PRICE_CAVEAT_EN = ui.en.caveat;

/** 去掉采集过程用语，只保留给读者看的句子。 */
export function cleanPublicText(input: string | null | undefined): string {
  if (!input) return "";
  let s = String(input);

  s = s.replace(/因反爬未能完整核实/g, "未能完整核实");
  s = s.replace(/这次没抓到/g, "未能从官网确认");
  s = s.replace(/这次没抓全/g, "未能从官网完整确认");
  s = s.replace(/官网这次未能从官网确认/g, "未能从官网确认");
  s = s.replace(/官网营销页本次无法解析/g, "未能从官网确认公开说明");
  s = s.replace(/本次没能打开官网定价说明/g, "未能从官网确认定价说明");
  s = s.replace(/这次没能打开价目页，不能写死价格/g, "未能从官网确认价格");
  s = s.replace(/这次没能打开价目页/g, "未能从官网确认价目");
  s = s.replace(/这次没在官网公开页里找到/g, "未能在官网公开页中确认");
  s = s.replace(/本次没能从官网文本中读出/g, "未能从官网确认");
  s = s.replace(/这次没能从 Adobe 页面读出准确价格/g, "未能从 Adobe 页面确认准确价格");
  s = s.replace(/这次没能从/g, "未能从");
  s = s.replace(/本次没能从/g, "未能从");
  s = s.replace(/本次无法解析/g, "未能从官网确认");
  s = s.replace(/未打开功能页确认/g, "未能从功能页确认");

  s = s.replace(
    /GitHub\s+(?:tag\s+\S+[，,]?\s*)?published_at\s+\S+[，,]?已转换(?:为\s*Asia\/Shanghai)?[^。；]*/gi,
    "",
  );
  s = s.replace(/published_at\s+\S+[^。；]*/gi, "");
  s = s.replace(/pushed_at\s+\S+[^。；]*/gi, "");
  s = s.replace(/stargazers_count\s*=\s*\d+[^。；]*/gi, "");
  s = s.replace(/GitHub 返回 NOASSERTION[^。；]*/g, "");
  s = s.replace(/NOASSERTION[^。；]*/g, "");
  s = s.replace(
    /[（(][^）)]*(?:WebFetch|抓取|本轮|本机|curl|worker|复核账期|页面未写明|published_at|NOASSERTION|本次未|本次读取|本次核)[^）)]*[）)]/gi,
    "",
  );

  const parts = s.split(/([。！？；，,\n])/);
  let out = "";
  for (const part of parts) {
    if (/^[。！？；，,\n]$/.test(part)) {
      if (out && !/[。！？；，,\n]$/.test(out)) out += part;
      continue;
    }
    if (!part.trim()) continue;
    if (LEAK.test(part)) continue;
    out += part;
  }

  out = out
    .replace(/^[，,；、]+/, "")
    .replace(/[，,；、]+([。！？]|$)/g, "$1")
    .replace(/（\s*）/g, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[。]{2,}/g, "。")
    .replace(/^\s*[；，,、]+/, "")
    .trim();
  return out;
}

export function parseCurrency(raw: string | null | undefined): {
  code: string | null;
  symbol: string;
  messy: boolean;
} {
  const text = (raw || "").trim();
  if (!text) return { code: null, symbol: "", messy: false };
  const messy = LEAK.test(text) || /未写明|需复核/.test(text);
  const u = text.toUpperCase();
  if (/(SGD|新加坡|S\$)/.test(u)) return { code: "SGD", symbol: "S$", messy };
  if (/(CNY|RMB|人民币|¥|￥)/.test(u) && !/USD|EUR|SGD/.test(u.replace(/CNY|RMB|人民币|¥|￥/g, "")))
    return { code: "CNY", symbol: "¥", messy };
  if (/(EUR|欧元|€)/.test(u)) return { code: "EUR", symbol: "€", messy };
  if (/(USD|美元|\$)/.test(u) || /^USD\b/.test(u)) return { code: "USD", symbol: "$", messy };
  if (/^[A-Z]{3}$/.test(text)) return { code: text, symbol: `${text} `, messy };
  return { code: null, symbol: "", messy: true };
}

export function parsePeriod(raw: string | null | undefined, locale: Locale = "zh"): string | null {
  if (!raw) return null;
  const t = raw.trim().toLowerCase();
  if (!t || t === "—" || t === "不适用" || t === "n/a") return null;
  const L = ui[locale];
  if (t === "lifetime" || t === "once" || t.includes("买断") || t.includes("永久") || t.includes("one-time") || t.includes("lifetime")) return L.lifetime;
  if (t === "month" || t === "monthly" || t.startsWith("month") || t.includes("月")) return L.perMonth;
  if (t === "year" || t === "yearly" || t.startsWith("year") || t.includes("年")) return L.perYear;
  if (LEAK.test(raw)) {
    if (t.includes("year") || t.includes("年")) return L.perYear;
    if (t.includes("month") || t.includes("月")) return L.perMonth;
    return null;
  }
  const cleaned = cleanPublicText(raw);
  return cleaned ? (locale === "en" ? tr(cleaned) : cleaned) : null;
}

export function formatAmount(price: string | number | null, locale: Locale = "zh"): string | null {
  if (price == null || price === "") return null;
  const raw = String(price).trim();
  if (!raw || raw === "—") return null;
  if (/未知/.test(raw) || /^unknown$/i.test(raw)) return locale === "en" ? ui.en.featUnknown : "未知";
  if (raw === "免费" || raw === "0" || /^free$/i.test(raw)) return ui[locale].free;
  if (!/^[-+]?\d+(\.\d+)?$/.test(raw.replace(/,/g, ""))) {
    const cleaned = cleanPublicText(raw) || raw;
    return locale === "en" ? tr(cleaned) : cleaned;
  }
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n)) return raw;
  if (Number.isInteger(n) || Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return n.toFixed(2);
}

export type PriceRowView = {
  plan: string;
  amount: string;
  currency: string;
  period: string;
  note: string;
  short: string;
  isFree: boolean;
  isPaid: boolean;
};

export function formatPriceRow(pr: Price, locale: Locale = "zh"): PriceRowView {
  const cur = parseCurrency(pr.currency);
  const period = parsePeriod(pr.period, locale);
  const amount = formatAmount(pr.price, locale);
  const L = ui[locale];
  const isFree = amount === L.free;
  const isUnknown = !amount || amount === "未知" || amount === L.featUnknown;
  const isPaid = !isFree && !isUnknown;
  let short = amount || "—";
  if (isPaid) {
    if (period === L.lifetime) short = `${cur.symbol}${amount} ${L.lifetime}`;
    else if (period) short = `${cur.symbol}${amount}/${period}`;
    else short = `${cur.symbol}${amount}`;
  } else if (isFree) {
    short = L.free;
  } else if (isUnknown) {
    short = L.unknownPrice;
  }
  const plan = cleanPublicText(pr.plan) || pr.plan;
  const note = cleanPublicText(pr.note);
  return {
    plan: locale === "en" ? tr(plan) : plan,
    amount: isPaid ? `${cur.symbol}${amount}` : amount || "—",
    currency: cur.code || (isFree || isUnknown ? "—" : "—"),
    period: period || "—",
    note: locale === "en" ? tr(note) : note,
    short,
    isFree,
    isPaid,
  };
}

export type PriceDisplay = {
  cell: string;
  tableCell: string;
  summary: string;
  caveat: string;
  rows: PriceRowView[];
};

export function formatPriceDisplay(p: Product, locale: Locale = "zh"): PriceDisplay {
  const rows = (p.prices || []).map((r) => formatPriceRow(r, locale));
  const summaryZh = cleanPublicText(p.price_summary);
  const summary = locale === "en" ? tr(summaryZh) : summaryZh;
  const paid = rows.filter((r) => r.isPaid);
  const hasFree = rows.some((r) => r.isFree);
  const L = ui[locale];
  const modelZh = p.pricing_model || "未知";
  const model = locale === "en" ? pricingEn(modelZh) || modelZh : modelZh;
  let cell = model;
  // Collected price rows are samples, not proof that every plan is free.
  if (p.pricing_model === "完全免费") {
    cell = L.fullyFree;
  } else if (p.pricing_model === "免费增值" || (hasFree && paid.length > 0 && modelZh === "未知")) {
    cell = L.freemium;
  } else if (paid.length) {
    cell = locale === "en"
      ? (paid.length > 1 ? `${L.from} ${paid[0].short}` : paid[0].short)
      : paid[0].short + (paid.length > 1 ? " 起" : "");
  } else if (rows.some((r) => r.short === L.unknownPrice) || /未知/.test(p.pricing_model || "")) {
    cell = modelZh && modelZh !== "未知" ? `${model} · ${L.unknownPrice}` : L.unknownPrice;
  }
  let tableCell = cell;
  if (cell.includes(L.unknownPrice) || cell.includes("价格未知")) {
    tableCell = modelZh && modelZh !== "未知" ? model : "—";
  } else if (cell === "未知" || cell === L.featUnknown) {
    tableCell = "—";
  }
  return { cell, tableCell, summary, caveat: L.caveat, rows };
}

/** @deprecated use formatPriceDisplay */
export function formatPriceCell(p: Product): string {
  return formatPriceDisplay(p).cell;
}


export function isUnknownish(v: string | null | undefined): boolean {
  if (v == null) return true;
  const t = String(v).trim();
  return !t || t === "—" || t === "-" || t === "未知" || t === "不适用";
}

/** 表格中仅在停更/归档等异常状态时展示；隐藏「未知」，也不标记「活跃」。 */
export function maintenanceWarning(
  p: { maintenance_status?: string | null; archived?: boolean | null },
): string | null {
  if (p.archived) return "已归档";
  const s = (p.maintenance_status || "").trim();
  if (!s || s === "未知" || s === "活跃") return null;
  return s;
}

const HOST_NAMES: Record<string, string> = {
  "github.com": "GitHub",
  "gitlab.com": "GitLab",
  "gitlab.gnome.org": "GNOME GitLab",
  "invent.kde.org": "KDE Invent",
  "code.videolan.org": "VideoLAN",
  "sourceforge.net": "SourceForge",
  "git.ffmpeg.org": "FFmpeg",
  "git.libreoffice.org": "LibreOffice",
};

/** 来源链接的短标签：主机名或「GitHub · org/repo」，避免展示整段 URL。 */
export function sourceLinkLabel(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "github.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        return `GitHub · ${parts[0]}/${parts[1].replace(/\.git$/, "")}`;
      }
      return "GitHub";
    }
    if (host.endsWith("sourceforge.net")) return "SourceForge";
    if (HOST_NAMES[host]) return HOST_NAMES[host];
    return host;
  } catch {
    return url.length > 48 ? `${url.slice(0, 46)}…` : url;
  }
}

export function formatHeroPrice(p: Product, locale: Locale = "zh"): string {
  const d = formatPriceDisplay(p, locale);
  const L = ui[locale];
  if (p.pricing_model === "完全免费" || d.cell === L.fullyFree || d.cell === "完全免费") return L.fullyFree;
  const paid = d.rows.filter((r) => r.isPaid);
  const modelZh = p.pricing_model && p.pricing_model !== "未知" ? p.pricing_model : "";
  const model = locale === "en" && modelZh ? pricingEn(modelZh) || modelZh : modelZh;
  if (paid.length) {
    const amt = locale === "en"
      ? (paid.length > 1 ? `${L.from} ${paid[0].short}` : paid[0].short)
      : paid[0].short + (paid.length > 1 ? " 起" : "");
    return model && model !== paid[0].short ? `${model} · ${amt}` : amt;
  }
  return model;
}

// SPDX-License-Identifier: Apache-2.0
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categoryGroups, siteConfig } from "../config";

export type FeatureDef = { key: string; label: string };
export type FeatureVal = { value: string; note: string };
export type Price = {
  plan: string;
  price: string | number | null;
  currency: string | null;
  period: string | null;
  note: string;
};

export type Product = {
  id: string;
  name: string;
  official_url: string | null;
  github_url: string | null;
  source_url: string | null;
  source_repo_url: string | null;
  source_repo_label: string | null;
  source_host_note: string | null;
  platforms: string[];
  open_source: boolean;
  license: string | null;
  pricing_model: string;
  price_summary: string;
  prices: Price[];
  free_tier_limits: string | null;
  github_stars: number | null;
  latest_release: string | null;
  latest_release_date: string | null;
  latest_release_date_note: string | null;
  maintenance_status: string | null;
  summary: string;
  features: Record<string, FeatureVal>;
  sources: string[];
  archived: boolean | null;
  last_push_at: string | null;
  collected_at: string;
  category_slug: string;
  category_name: string;
  href: string;
};

export type Category = {
  slug: string;
  name: string;
  collected_at: string;
  timezone: string;
  features: FeatureDef[];
  products: Product[];
  notes: string | null;
  groupId: string;
  groupName: string;
  href: string;
};

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

const KNOWN_GROUPS = new Map<string, { id: string; name: string }>();
for (const g of categoryGroups) {
  for (const slug of g.slugs) KNOWN_GROUPS.set(slug, { id: g.id, name: g.name });
}

function asStr(v: unknown, fallback = ""): string {
  if (v == null) return fallback;
  return String(v);
}

function asStrOrNull(v: unknown): string | null {
  if (v == null || v === "") return null;
  return String(v);
}

function normalizeFeatures(
  raw: unknown,
): Record<string, FeatureVal> {
  const out: Record<string, FeatureVal> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (v && typeof v === "object" && "value" in (v as object)) {
      const o = v as { value?: unknown; note?: unknown };
      out[k] = { value: asStr(o.value, "unknown"), note: asStr(o.note) };
    } else if (typeof v === "string") {
      out[k] = { value: v, note: "" };
    } else {
      out[k] = { value: "unknown", note: "" };
    }
  }
  return out;
}

function normalizeFeatureDefs(raw: unknown): FeatureDef[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const o = item as { key?: unknown; label?: unknown };
      if (!o.key) return null;
      return { key: String(o.key), label: asStr(o.label, String(o.key)) };
    })
    .filter(Boolean) as FeatureDef[];
}

function normalizePrices(raw: unknown): Price[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const o = (item || {}) as Record<string, unknown>;
    return {
      plan: asStr(o.plan, "方案"),
      price: o.price == null ? null : (o.price as string | number),
      currency: o.currency == null ? null : String(o.currency),
      period: o.period == null ? null : String(o.period),
      note: asStr(o.note),
    };
  });
}

function normalizeProduct(
  raw: Record<string, unknown>,
  cat: { slug: string; name: string; collected_at: string },
): Product {
  const id = asStr(raw.id);
  return {
    id,
    name: asStr(raw.name, id),
    official_url: asStrOrNull(raw.official_url),
    github_url: asStrOrNull(raw.github_url),
    source_url: asStrOrNull(raw.source_url) || asStrOrNull(raw.source_repo_url),
    source_repo_url: asStrOrNull(raw.source_repo_url) || asStrOrNull(raw.source_url),
    source_repo_label: asStrOrNull(raw.source_repo_label),
    source_host_note: asStrOrNull(raw.source_host_note),
    platforms: Array.isArray(raw.platforms)
      ? raw.platforms.map((x) => String(x))
      : [],
    open_source: Boolean(raw.open_source),
    license: asStrOrNull(raw.license),
    pricing_model: asStr(raw.pricing_model, "未知"),
    price_summary: asStr(raw.price_summary),
    prices: normalizePrices(raw.prices),
    free_tier_limits: asStrOrNull(raw.free_tier_limits),
    github_stars:
      typeof raw.github_stars === "number" && Number.isFinite(raw.github_stars)
        ? raw.github_stars
        : null,
    latest_release: asStrOrNull(raw.latest_release),
    latest_release_date: asStrOrNull(raw.latest_release_date),
    latest_release_date_note: asStrOrNull(raw.latest_release_date_note),
    maintenance_status: asStrOrNull(raw.maintenance_status),
    summary: asStr(raw.summary),
    features: normalizeFeatures(raw.features),
    sources: Array.isArray(raw.sources)
      ? raw.sources.map((x) => String(x)).filter(Boolean)
      : [],
    archived: typeof raw.archived === "boolean" ? raw.archived : null,
    last_push_at: asStrOrNull(raw.last_push_at),
    collected_at: asStr(raw.collected_at, cat.collected_at),
    category_slug: cat.slug,
    category_name: cat.name,
    href: `/p/${cat.slug}/${id}/`,
  };
}

function normalizeCategory(raw: Record<string, unknown>, fileHint: string): Category {
  const slug = asStr(raw.category_slug || raw.id || raw.slug);
  if (!slug) throw new Error(`Category in ${fileHint} is missing a slug/id`);
  const name = asStr(raw.category_name_zh || raw.name || slug);
  const collected_at = asStr(
    raw.collected_at,
    siteConfig.collectedAt,
  );
  const timezone = asStr(
    raw.collected_at_timezone || raw.timezone,
    siteConfig.timezone,
  );
  const features = normalizeFeatureDefs(raw.features || raw.feature_keys);
  const group = KNOWN_GROUPS.get(slug) || { id: "other", name: "其他" };
  const notes =
    typeof raw.notes === "string"
      ? raw.notes
      : raw.notes != null
        ? JSON.stringify(raw.notes)
        : null;
  const productsRaw = Array.isArray(raw.products) ? raw.products : [];
  const products = productsRaw.map((p, i) => {
    if (!p || typeof p !== "object") {
      throw new Error(`Bad product at index ${i} in ${slug}`);
    }
    return normalizeProduct(p as Record<string, unknown>, {
      slug,
      name,
      collected_at,
    });
  });
  return {
    slug,
    name,
    collected_at,
    timezone,
    features,
    products,
    notes,
    groupId: group.id,
    groupName: group.name,
    href: `/c/${slug}/`,
  };
}

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

let cached: { categories: Category[]; issues: string[] } | null = null;

export function loadCatalog(): { categories: Category[]; issues: string[] } {
  if (cached) return cached;
  const issues: string[] = [];
  const bySlug = new Map<string, Category>();

  const dataPath = path.join(ROOT, "data.json");
  if (fs.existsSync(dataPath)) {
    const data = readJson(dataPath) as Record<string, unknown>;
    const list = Array.isArray(data.categories) ? data.categories : [];
    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      const cat = normalizeCategory(item as Record<string, unknown>, "data.json");
      if (bySlug.has(cat.slug)) {
        issues.push(`重复品类 slug：${cat.slug}（data.json 覆盖已有条目）`);
      }
      bySlug.set(cat.slug, cat);
    }
  } else {
    issues.push("未找到 data.json");
  }

  const dir = path.join(ROOT, "categories");
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
    for (const file of files) {
      const full = path.join(dir, file);
      try {
        const raw = readJson(full) as Record<string, unknown>;
        const cat = normalizeCategory(raw, file);
        if (bySlug.has(cat.slug)) {
          issues.push(`重复品类 slug：${cat.slug}（${file} 与已有数据冲突，已跳过文件）`);
          continue;
        }
        bySlug.set(cat.slug, cat);
      } catch (err) {
        issues.push(`读取 ${file} 失败：${(err as Error).message}`);
      }
    }
  } else {
    issues.push("未找到 categories 目录");
  }

  const known = new Set(categoryGroups.flatMap((g) => g.slugs));
  for (const slug of bySlug.keys()) {
    if (!known.has(slug)) {
      issues.push(`品类 ${slug} 未列入首页分组，已归入「其他」`);
    }
  }
  for (const slug of known) {
    if (!bySlug.has(slug)) {
      issues.push(`首页分组引用了尚未载入的品类：${slug}`);
    }
  }

  const categories = [...bySlug.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "zh-CN"),
  );
  cached = { categories, issues };
  return cached;
}

export function getCategory(slug: string): Category | undefined {
  return loadCatalog().categories.find((c) => c.slug === slug);
}

export function getProduct(
  categorySlug: string,
  id: string,
): { category: Category; product: Product } | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const product = category.products.find((p) => p.id === id);
  if (!product) return undefined;
  return { category, product };
}

export function allProducts(): Product[] {
  return loadCatalog().categories.flatMap((c) => c.products);
}


const HOST_LABELS: Record<string, string> = {
  "sourceforge.net": "SourceForge",
  "github.com": "GitHub",
  "gitlab.com": "GitLab",
  "gitlab.gnome.org": "GitLab",
  "invent.kde.org": "KDE Invent",
  "code.videolan.org": "VideoLAN",
  "git.ffmpeg.org": "git.ffmpeg.org",
  "git.libreoffice.org": "git.libreoffice.org",
};

export function sourceHostLabel(url: string, label?: string | null): string {
  if (label) {
    const inner = label.match(/[（(]([^）)]+)[）)]/);
    if (inner) return inner[1];
    if (!/^官方源码/.test(label)) return label;
  }
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (HOST_LABELS[host]) return HOST_LABELS[host];
    if (host.endsWith(".sourceforge.net") || host === "sourceforge.net") return "SourceForge";
    if (host.endsWith(".github.com") || host === "github.com") return "GitHub";
    if (host.includes("gitlab")) return "GitLab";
    return host;
  } catch {
    return label || "源码";
  }
}

/** 没有 GitHub 链接、但有其他源码仓库时，返回「源码 · 主机」按钮数据。 */
export function sourceRepoButton(
  product: Pick<Product, "github_url" | "source_repo_url" | "source_url" | "source_repo_label">,
): { url: string; label: string } | null {
  if (product.github_url) return null;
  const url = product.source_repo_url || product.source_url;
  if (!url) return null;
  return { url, label: `源码 · ${sourceHostLabel(url, product.source_repo_label)}` };
}

export function formatStars(n: number | null, locale: "zh" | "en" = "zh"): string {
  if (n == null) return "—";
  if (locale === "en") {
    if (n >= 1_000_000) {
      const v = n / 1_000_000;
      return `${Number.isInteger(v) ? v : v.toFixed(1)}M`;
    }
    if (n >= 10_000) {
      const v = n / 1_000;
      return `${Number.isInteger(v) ? v : v.toFixed(1)}k`;
    }
    return n.toLocaleString("en-US");
  }
  if (n >= 10000) {
    const v = n / 10000;
    return Number.isInteger(v) ? `${v} 万` : `${v.toFixed(1)} 万`;
  }
  return n.toLocaleString("zh-CN");
}

export function formatPriceCell(p: Product): string {
  if (p.price_summary) {
    // keep short for table
    const first = p.prices[0];
    if (first && first.price != null && first.price !== "") {
      const price = String(first.price);
      if (price === "免费" || price === "0") {
        if (p.pricing_model === "完全免费") return "完全免费";
        if (p.pricing_model === "免费增值") return "免费增值";
        return p.pricing_model || "免费";
      }
      if (price === "未知") return `${p.pricing_model} · 价格未知`;
      const cur =
        first.currency === "USD"
          ? "$"
          : first.currency === "CNY" || first.currency === "RMB"
            ? "¥"
            : first.currency === "EUR"
              ? "€"
              : first.currency === "SGD"
                ? "S$"
                : first.currency
                  ? `${first.currency} `
                  : "";
      const period =
        first.period && first.period !== "lifetime" && first.period !== "once"
          ? `/${periodLabel(first.period)}`
          : first.period === "lifetime" || first.period === "once"
            ? " 买断"
            : "";
      return `${cur}${price}${period}`;
    }
  }
  return p.pricing_model || "未知";
}

function periodLabel(period: string): string {
  if (period === "month" || period === "monthly") return "月";
  if (period === "year" || period === "year（同上，需复核账期）" || period.startsWith("year"))
    return "年";
  return period;
}

export function featClass(value: string): string {
  const v = (value || "unknown").toLowerCase();
  if (v === "yes") return "feat-yes";
  if (v === "no") return "feat-no";
  if (v === "partial") return "feat-partial";
  if (v === "paid") return "feat-paid";
  if (v === "na") return "feat-na";
  return "feat-unknown";
}

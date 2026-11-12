// SPDX-License-Identifier: Apache-2.0
import contentEn from "./content-en.json";
import {
  categoryNames,
  groupNames,
  featureColumns,
  pricingModels,
  maintenanceStatuses,
  platforms,
  sourceLabels,
} from "./labels";
import { ui, type Locale, type UiKey, fill } from "./ui";

export type { Locale, UiKey };
export { ui, fill };
export * from "./labels";

const CONTENT = contentEn as Record<string, string>;

const byZh: Record<string, string> = {};
for (const rec of Object.values(categoryNames)) byZh[rec.zh] = rec.en;
for (const rec of Object.values(groupNames)) byZh[rec.zh] = rec.en;
for (const rec of Object.values(featureColumns)) byZh[rec.zh] = rec.en;
Object.assign(byZh, pricingModels, maintenanceStatuses, platforms, sourceLabels);

/** English for a Chinese (or already-English) display string. Never invents facts. */
export function tr(zh: string | null | undefined): string {
  if (zh == null) return "";
  const s = String(zh);
  if (!s) return "";
  if (Object.prototype.hasOwnProperty.call(CONTENT, s)) return CONTENT[s];
  if (Object.prototype.hasOwnProperty.call(byZh, s)) return byZh[s];
  if (!/[\u4e00-\u9fff]/.test(s)) return s;
  return s;
}

export function uiT(key: UiKey, locale: Locale, vars?: Record<string, string | number>): string {
  const template = ui[locale][key] ?? ui.zh[key];
  return vars ? fill(template, vars) : template;
}

export function uiPair(key: UiKey, vars?: Record<string, string | number>): { zh: string; en: string } {
  return { zh: uiT(key, "zh", vars), en: uiT(key, "en", vars) };
}

export const STORAGE_KEY = "compare-lang";

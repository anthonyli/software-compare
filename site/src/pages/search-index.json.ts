// SPDX-License-Identifier: Apache-2.0
import type { APIRoute } from "astro";
import { loadCatalog } from "../lib/load-data";
import { cleanPublicText } from "../lib/display";
import { tr, catPair, pricingEn } from "../i18n";

export const prerender = true;

export const GET: APIRoute = () => {
  const products = loadCatalog().categories.flatMap((c) =>
    c.products.map((p) => {
      const summary = cleanPublicText(p.summary) || p.category_name;
      const names = catPair(c.slug, p.category_name);
      return {
        name: p.name,
        summary,
        summary_en: tr(summary) || names.en,
        category_name: names.zh,
        category_name_en: names.en,
        href: p.href,
        pricing_model: p.pricing_model,
        pricing_model_en: pricingEn(p.pricing_model) || p.pricing_model,
        open_source: p.open_source,
      };
    }),
  );
  return new Response(JSON.stringify({ products }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};

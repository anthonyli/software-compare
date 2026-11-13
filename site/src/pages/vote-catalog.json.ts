import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/load-data';

export const GET: APIRoute = () => {
  const names = new Map<string,string>();
  for (const category of loadCatalog().categories) {
    for (const product of category.products) {
      if (!/^[a-z0-9-]+$/.test(product.id)) throw new Error(`Invalid vote ID: ${product.id}`);
      if (names.has(product.id) && names.get(product.id)!==product.name) throw new Error(`Conflicting vote ID: ${product.id}`);
      names.set(product.id,product.name);
    }
  }
  return Response.json({ids:[...names.keys()].sort()});
};

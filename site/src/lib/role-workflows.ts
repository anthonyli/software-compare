// SPDX-License-Identifier: Apache-2.0
import definitions from "./role-workflows.json";
import { loadCatalog } from "./load-data";

export const roleWorkflows = definitions;

export function loadRoleWorkflows() {
  const categories = new Map(loadCatalog().categories.map((category) => [category.slug, category]));
  return roleWorkflows.map((role) => ({
    ...role,
    steps: role.steps.map((step) => {
      const category = categories.get(step.category);
      if (!category) throw new Error(`Unknown category ${step.category} in workflow ${role.slug}`);
      const products = new Map(category.products.map((product) => [product.id, product]));
      return {
        ...step,
        category,
        products: step.products.map((id) => {
          const product = products.get(id);
          if (!product) throw new Error(`Unknown product ${id} in workflow ${role.slug}/${step.category}`);
          return product;
        }),
      };
    }),
  }));
}

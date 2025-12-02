/**
 * translation controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::translation.translation",
  ({ strapi }) => ({
    async find(ctx) {
      // Get the single type entry
      const entity = await strapi
        .service("api::translation.translation")
        .find(ctx.query);

      // Sanitize using Strapi helper
      const sanitized = await this.sanitizeOutput(entity, ctx) as any;
 
      // Helper to transform {columns, rows} → { key: value }
      const transformSection = (section) => {
        if (!section || !Array.isArray(section.rows)) return {};

        return section.rows.reduce((acc, row) => {
          const [key, value] = row;
          if (key && key.trim() !== "") acc[key] = value;
          return acc;
        }, {});
      };
 
      const result = {};
      sanitized.pages_list?.forEach((page:string) => {
        result[page] = transformSection(sanitized[page]);
      });

      return { data: result };
    },
  })
);

// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Fix documentation persistence by modifying the generated index.html
    const fs = require('fs');
    const path = require('path');
    
    const docPath = path.join(__dirname, 'extensions', 'documentation', 'public', 'index.html');
    
    if (fs.existsSync(docPath)) {
      let html = fs.readFileSync(docPath, 'utf8');
      
      // Check if persistAuthorization is already present at the right level
      if (!html.includes('persistAuthorization: true,\n        url:')) {
        // Add persistAuthorization before the url property
        html = html.replace(
          /const ui = SwaggerUIBundle\(\{\n\s+url:/,
          'const ui = SwaggerUIBundle({\n        persistAuthorization: true,\n        url:'
        );
        
        fs.writeFileSync(docPath, html, 'utf8');
        strapi.log.info('Documentation: persistAuthorization enabled');
      }
    }
    
    try {
      // Dynamic import to avoid issues if file doesn't exist yet
      const { seedData } = require('./scripts/seed');
      await seedData(strapi);
    } catch (error) {
      console.warn('Could not run seed script:', error);
    }
  },
};

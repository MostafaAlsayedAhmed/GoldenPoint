import path from 'path';
import fs from 'fs';

export default (plugin) => {
  plugin.controllers.documentation.index = async (ctx, next) => {
    try {
      const { major, minor, patch } = ctx.params;
      const documentationService = strapi.plugin('documentation').service('documentation');
      
      const version = major && minor && patch 
        ? `${major}.${minor}.${patch}` 
        : documentationService.getDocumentationVersion();

      // Construct path to the documentation file
      // Try to use strapi.dirs if available, otherwise fallback to process.cwd()
      const extensionsDir = strapi.dirs?.app?.extensions || path.join(process.cwd(), 'src', 'extensions');
      const openAPISpecsPath = path.join(extensionsDir, 'documentation', 'documentation', version, 'full_documentation.json');

      if (!fs.existsSync(openAPISpecsPath)) {
        return ctx.notFound('Documentation not found');
      }

      const documentation = fs.readFileSync(openAPISpecsPath, 'utf8');
      const spec = JSON.stringify(JSON.parse(documentation));
      const backendUrl = strapi.config.server.url;

      const html = `<!-- HTML for static distribution bundle build --><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title> API Documentation </title>
    <link rel="stylesheet" type="text/css" href="${backendUrl}/plugins/documentation/swagger-ui.css">
    <link rel="icon" type="image/png" href="${backendUrl}/plugins/documentation/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="${backendUrl}/plugins/documentation/favicon-16x16.png" sizes="16x16">
    <style>
      :root {
        --primary-color: #c0a062; /* GoldenPoint Gold */
        --header-bg: #1a1a1a;
        --header-text: #ffffff;
      }
      
      html {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        background: #fafafa;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .docs-header {
        background-color: var(--header-bg);
        color: var(--header-text);
        padding: 1rem 2rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .header-logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .header-nav a {
        color: #fff;
        text-decoration: none;
        margin-left: 20px;
        font-size: 0.9rem;
        opacity: 0.8;
        transition: opacity 0.2s;
      }

      .header-nav a:hover {
        opacity: 1;
        color: var(--primary-color);
      }

      .main-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px;
      }
      
      /* Custom overrides for Swagger UI to match theme */
      .swagger-ui .topbar { display: none; } /* Hide default topbar */
      .swagger-ui .info .title small { background: var(--primary-color); }
    </style>
  </head>

  <body>
    <header class="docs-header">
      <a href="/" class="header-logo">
        GoldenPoint API
      </a>
      <nav class="header-nav">
        <a href="/admin" target="_blank">Admin Panel</a>
        <a href="/" target="_blank">Website</a>
      </nav>
    </header>

    <main class="main-container">
      <div id="swagger-ui"></div>
    </main>

    <script class="custom-swagger-ui">
      // You can add any custom JS here
      console.log('Custom JS running on documentation page');
      
      window.onload = function() {
        const ui = SwaggerUIBundle({
          url: "https://petstore.swagger.io/v2/swagger.json",
          spec: ${spec},
          dom_id: '#swagger-ui',
          docExpansion: "none",
          deepLinking: true,
          persistAuthorization: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset,
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl,
          ],
          layout: "StandaloneLayout",
        });

        window.ui = ui;
      }
    </script>

    <script src="${backendUrl}/plugins/documentation/swagger-ui-bundle.js"></script>
    <script src="${backendUrl}/plugins/documentation/swagger-ui-standalone-preset.js"></script>
  </body>
</html>
`;

      ctx.body = html;
    } catch (e) {
      strapi.log.error(e);
      ctx.badRequest(e.message);
    }
  };

  return plugin;
};

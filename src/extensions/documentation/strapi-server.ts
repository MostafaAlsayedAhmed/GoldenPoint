export default (plugin) => {
  // Intercept the documentation route to modify the HTML response
  const originalRegister = plugin.register;
  
  plugin.register = function(params) {
    if (originalRegister) {
      originalRegister.call(this, params);
    }
    
    // Hook into the documentation rendering
    const { strapi } = params;
    
    // Create middleware to modify documentation HTML
    strapi.server.router.use('/documentation/:version', async (ctx, next) => {
      await next();
      
      if (ctx.response.type === 'text/html' && ctx.body && typeof ctx.body === 'string') {
        // Inject persistAuthorization into the SwaggerUIBundle configuration
        ctx.body = ctx.body.replace(
          /const ui = SwaggerUIBundle\(\{/,
          'const ui = SwaggerUIBundle({\n        persistAuthorization: true,'
        );
      }
    });
  };
  
  return plugin;
};

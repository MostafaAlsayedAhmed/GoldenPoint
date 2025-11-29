export default () => ({
  i18n: {
    enabled: true,
    config: {
      locales: ['ar', 'en'],
      defaultLocale: 'ar',
    },
  },
  documentation: {
    enabled: true,
    config: {
      servers: [{ url: '/' }],
      'x-strapi-config': {
        swaggerUI: {
          persistAuthorization: true,
        },
      },
    },
  },
});

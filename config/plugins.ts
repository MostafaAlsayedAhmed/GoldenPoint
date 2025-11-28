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
      'x-strapi-config': {
        swaggerUI: {
          persistAuthorization: true,
        },
      },
    },
  },
});

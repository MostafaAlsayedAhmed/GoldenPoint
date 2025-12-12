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
        restrictedAccess: false,
        swaggerUI: {
          persistAuthorization: true,
        },
      },
    },
  },
});

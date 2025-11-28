import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::homepage-manager.homepage-manager', {
  only: ['find'],
});

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::market-category.market-category', {
  only: ['find', 'findOne'],
});

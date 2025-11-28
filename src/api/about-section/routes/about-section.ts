import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::about-section.about-section', {
  only: ['find', 'findOne'],
});

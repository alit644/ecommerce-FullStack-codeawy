/**
 * dashboard-stat router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::dashboard-stat.dashboard-stat');
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/dashboard-stat',
      handler: 'dashboard-stat.getProductCategoryStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
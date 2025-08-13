/**
 * dashboard-stat controller
 */
"use strict";

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::dashboard-stat.dashboard-stat"
);

module.exports = ({ strapi }) => ({
  async getProductCategoryStats(ctx) {
    try {
      // احصل على عدد المنتجات
      const productsCount = await strapi
        .documents("api::product.product")
        .count();
      // احصل على عدد الأصناف
      const categoriesCount = await strapi
        .documents("api::category.category")
        .count();

      // order احصل على الطلبات
      const ordersCount = await strapi.documents("api::order.order").count();

      const orders = await strapi.documents("api::order.order").findMany({
        filters: {
          statuss: { $ne: "cancelled" }, // استثناء الطلبات الملغاة إذا رغبت
        },
        fields: ["totalPrice"],
        pagination: { pageSize: 1000 }, // عدل حسب الحاجة
      });

      // جمع الأسعار
      const totalPrice = orders.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
      );

      // جلب اخر 5 منتجات تم اضافتها جديد
      const latestProducts = await strapi
        .documents("api::product.product")
        .findMany({
          sort: { createdAt: "desc" },
          limit: 5,
           populate: ["category","thumbnail"],
        });

      ctx.body = {
        products: productsCount,
        categories: categoriesCount,
        orders: ordersCount,
        totalPrice: totalPrice.toFixed(2), // تنسيق السعر إلى رقم عشري
        latestProducts: latestProducts,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});

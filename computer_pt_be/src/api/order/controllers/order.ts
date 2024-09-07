/**
 * order controller
 */
import utils from "@strapi/utils";
import { factories } from '@strapi/strapi'
const TRANSPORT_FEE = process.env.TRANSPORT_FEE || 0;
const { ApplicationError, ValidationError, ForbiddenError } = utils.errors;

export default factories.createCoreController('api::order.order', ({strapi}) => ({
  async create(ctx) {
    try {
      const body = ctx.request.body.data;
      const { items, voucher } = ctx.request.body.data;
      delete body.items;
      let errors = [];
      let total = 0;
      if (items.length === 0) {
        throw new ValidationError("items is required");
      }
      let discount = 0;

      await Promise.all(items.map(async (item) => {
        const productDetail = await strapi.entityService.findOne("api::product.product", item.product_id);
        if (!productDetail) {
          errors.push(item.product_detail_id);
        }
        if (productDetail) {
          total += (Number(( Number(productDetail.promotion_price) === 0 || !productDetail.promotion_price) ? productDetail.price : productDetail.promotion_price ) || 0) * item.quantity;
        }
      }));

      total += Number(TRANSPORT_FEE);
      body.total = total - discount;
      body.transport_fee = Number(TRANSPORT_FEE);

      if (errors.length > 0) {
        throw new ValidationError(`product_detail_id: ${errors} not found`);
      }
      const order = await strapi.entityService.create("api::order.order", {
        data: {
          ...body
        }
      });

      items.map(async(item)=> {
        const productDetail = await strapi.entityService.findOne("api::product.product", item.product_id);
        await strapi.entityService.create("api::order-detail.order-detail", {
          data: {
            order: order.id,
            product: {
              id: productDetail.id
            },
            quantity: item.quantity,
            unit_price: (Number(productDetail.promotion_price) === 0 || !productDetail.promotion_price) ? productDetail.price: Number(productDetail.promotion_price),
          }
        });
      });
      return {
        order: order
      };
    } catch (e) {
      strapi.log.error(`An error occurred in create: ${e.message}`);
      return ctx.badRequest(e.message);
    }
  },





}));

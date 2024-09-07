export default {
  async afterCreate(event) {
    const { result, params } = event;
    let { id, promotion_price, price } = result;

    if (!promotion_price || promotion_price === 0) {
      await strapi.entityService.update("api::product.product", id, {
        data: {
          promotion_price: price,
        },
      });
    }
    // do something to the result;
  },
  async afterFindOne(event) {
    const { result } = event;
    let { id } = result;
    await strapi.db
      .connection("products")
      .where({ id: id })
      .increment("total_view", 1);
  },
};

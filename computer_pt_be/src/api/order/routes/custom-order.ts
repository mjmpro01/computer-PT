export default {
  routes: [
    {
      method: "POST",
      path: "/create_payment_url",
      handler: "order.createPaymentUrl",
    },
    {
      method: "GET",
      path: "/vnpay_return",
      handler: "order.vnpayReturn",
    },
  ],
};

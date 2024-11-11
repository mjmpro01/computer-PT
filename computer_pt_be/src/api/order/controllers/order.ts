/**
 * order controller
 */
import utils from "@strapi/utils";
import { factories } from '@strapi/strapi'
const TRANSPORT_FEE = process.env.TRANSPORT_FEE || 0;
const { ApplicationError, ValidationError, ForbiddenError } = utils.errors;
import moment from "moment-timezone";
import querystring from "qs";
import crypto from "crypto";
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

  async createPaymentUrl(ctx) {
    try {
      process.env.TZ = "Asia/Ho_Chi_Minh";

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let ipAddr =
        ctx?.request?.headers["x-forwarded-for"] ||
        ctx?.request?.connection?.remoteAddress ||
        ctx?.request?.socket?.remoteAddress ||
        ctx?.request?.connection?.socket?.remoteAddress;
      let configData: {
        vnp_TmnCode: any;
        vnp_HashSecret: any;
        vnp_Url: any;
        vnp_ReturnUrl: any;
        ip_address: any;
      } = strapi.config.get("config");
      let tmnCode = configData.vnp_TmnCode;
      let secretKey = configData.vnp_HashSecret;
      let vnpUrl = configData.vnp_Url;
      let returnUrl = configData.vnp_ReturnUrl;
      let orderId = ctx.request.body.order_code;
      const order = await strapi.entityService.findMany("api::order.order", {
        filters: {
          order_code: orderId,
        },
      });
      if (!order) {
        throw new ValidationError(
          `order code is not valid with id: ${orderId}`
        );
      }
      strapi.log.info(`Start create VNPAY url with order code: ${orderId}`);
      const amount: number = Number(order[0].total);
      let bankCode = ctx.request.body.bankCode;
      let locale = ctx.request.body.language;
      if (!locale) {
        locale = "vn";
      }
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma don hang:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode) {
        vnp_Params["vnp_BankCode"] = bankCode;
      }
      vnp_Params = strapi.services["api::order.order"].sortObject(vnp_Params);
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      return {
        url: vnpUrl,
      };
    } catch (e) {
      throw new ApplicationError(e, `Internal server`);
    }
  },
  async vnpayReturn(ctx) {
    try {
      const vnp_Params = ctx.request.query;
      const rspCode = vnp_Params["vnp_ResponseCode"];
      const secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      const sortedParams =
        strapi.services["api::order.order"].sortObject(vnp_Params);

      const configData: {
        vnp_TmnCode: any;
        vnp_HashSecret: any;
        success_page: string;
        fail_page: string;
      } = strapi.config.get("config");
      const tmnCode = configData.vnp_TmnCode;
      const secretKey = configData.vnp_HashSecret;

      const signData = querystring.stringify(sortedParams, { encode: false });
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac
        .update(Buffer.from(signData, "utf-8"))
        .digest("hex");
      const order = await strapi.entityService.findMany("api::order.order", {
        filters: {
          order_code: vnp_Params?.vnp_TxnRef,
        },
      });
      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        if (
          order.length > 0 &&
          Number(order[0].total) === Number(vnp_Params?.vnp_Amount) / 100 &&
          rspCode === "00"
        ) {
          strapi.log.info(
            `VNPAY return status with order_code ${order[0].id}: SUCCESS `
          );
          ctx.response.redirect(
            `${configData.success_page}/${order[0].id}?status_code=${vnp_Params?.vnp_TransactionStatus}`
          );
        } else {
          strapi.log.info(
            `VNPAY return status with order_code ${order[0].id}: FAIL(${vnp_Params?.vnp_TransactionStatus})`
          );
          await strapi.entityService.update("api::order.order", order[0].id, {
            data: {
              status: "Huỷ",
            },
          });
          ctx.response.redirect(
            `${configData.fail_page}/${order[0].id}?status_code=${vnp_Params?.vnp_TransactionStatus}`
          );
        }
      } else {
        strapi.log.info(
          `VNPAY return status: FAIL(${vnp_Params?.vnp_TransactionStatus})`
        );
        await strapi.entityService.update("api::order.order", order[0].id, {
          data: {
            status: "Huỷ",
          },
        });
        ctx.response.redirect(
          `${configData.fail_page}/${order[0].id}?status_code=${vnp_Params?.vnp_TransactionStatus}`
        );
      }
    } catch (e) {
      throw new ApplicationError(e, `Internal server`);
    }
  },
  async ipn(ctx) {
    try {
      const vnp_Params = ctx.request.query;

      let ipAddr =
        ctx?.request?.headers["x-forwarded-for"] ||
        ctx?.request?.connection?.remoteAddress ||
        ctx?.request?.socket?.remoteAddress ||
        ctx?.request?.connection?.socket?.remoteAddress;

      strapi.log.info(`ipAddr call IPN: ${ipAddr}`);
      const secureHash = vnp_Params["vnp_SecureHash"];
      const rspCode = vnp_Params["vnp_ResponseCode"];
      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      const sortedParams =
        strapi.services["api::order.order"].sortObject(vnp_Params);

      const configData: {
        vnp_TmnCode: any;
        vnp_HashSecret: any;
        success_page: string;
        fail_page: string;
      } = strapi.config.get("config");

      const mapping = strapi.config.get("mapping");
      const tmnCode = configData.vnp_TmnCode;
      const secretKey = configData.vnp_HashSecret;

      const signData = querystring.stringify(sortedParams, { encode: false });
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac
        .update(Buffer.from(signData, "utf-8"))
        .digest("hex");
      let checkOrderId = false;
      let transaction;
      let checkAmount = false;
      let paymentStatus = "0";

      const order = await strapi.entityService.findMany("api::order.order", {
        filters: {
          order_code: vnp_Params?.vnp_TxnRef,
        },
      });

      if (order.length > 0) {
        checkOrderId = true;
        // transaction = await strapi.entityService.findMany(
        //   "api::transaction-history.transaction-history",
        //   {
        //     filters: {
        //       order: {
        //         id: order[0]?.id,
        //       },
        //     },
        //   }
        // );

        if (
          Number(order[0]?.total) ===
          Number(vnp_Params["vnp_Amount"]) / 100
        ) {
          checkAmount = true;
        }

        if (transaction[0].status === "Thành công") {
          paymentStatus = "2";
        }
      }

      if (secureHash === signed) {
        if (checkOrderId) {
          if (checkAmount) {
            if (paymentStatus === "0") {
              if (rspCode == "00") {
                //thanh cong
                //paymentStatus = '1'
                // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                // await strapi.entityService.update(
                //   "api::transaction-history.transaction-history",
                //   transaction[0].id,
                //   {
                //     data: {
                //       status: "Thành công",
                //       status_code: rspCode,
                //       description_code: mapping[rspCode],
                //       IP: ipAddr,
                //     },
                //   }
                // );

                strapi.log.info(
                  `IPN with id ${vnp_Params?.vnp_TxnRef} return status: SUCCESS`
                );

                return { RspCode: "00", Message: "Success" };
              } else {
                //that bai
                //paymentStatus = '2'
                // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                // await strapi.entityService.update(
                //   "api::transaction-history.transaction-history",
                //   transaction[0].id,
                //   {
                //     data: {
                //       status: "Thất bại",
                //       status_code: rspCode,
                //       description_code: mapping[rspCode],
                //       IP: ipAddr,
                //     },
                //   }
                // );
                // ``await strapi.entityService.update(
                //   "api::order.order",
                //   order[0].id,
                //   {
                //     data: {
                //       payment_method: "Thanh toán khi nhận hàng",
                //     },
                //   }
                // );``
                strapi.log.info(
                  `IPN with id ${vnp_Params?.vnp_TxnRef} return status: FAIL(00)`
                );
                return { RspCode: "00", Message: "Success" };
              }
            } else {
              strapi.log.info(
                `IPN with id ${vnp_Params?.vnp_TxnRef} return status: FAIL(02)`
              );
              return { Message: "Order already confirmed", RspCode: "02" };
            }
          } else {
            strapi.log.info(
              `IPN with id ${vnp_Params?.vnp_TxnRef} return status: FAIL(04)`
            );
            return { RspCode: "04", Message: "Amount invalid" };
          }
        } else {
          strapi.log.info(
            `IPN with id ${vnp_Params?.vnp_TxnRef} return status: FAIL(01)`
          );
          return { RspCode: "01", Message: "Order not found" };
        }
      } else {
        strapi.log.info(
          `IPN with id ${vnp_Params?.vnp_TxnRef} return status: FAIL(97)`
        );
        return { Message: "Invalid Checksum", RspCode: "97" };
      }
    } catch (e) {
      strapi.log.error(`ERROR[IPN]: 99`);
      return { Message: "Unknow error", RspCode: "99" };
    }
  },





}));

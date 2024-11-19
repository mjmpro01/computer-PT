import { PaymentRequestType } from "@/types/request/payment";
import urls from "../utils/constants/urls";
import axiosClient from "@/api/axiosClient";

const paymentApis = {
  post: (payment: PaymentRequestType) => {
    return axiosClient.post(urls.PAYMENT_CRATE, payment);
  },
};

export default paymentApis;

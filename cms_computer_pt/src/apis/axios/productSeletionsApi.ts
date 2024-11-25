import { ProductSeletionRequestType } from "../../types/request/productSeletions";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const productSeletionsApi = {
  create(payload: ProductSeletionRequestType) {
    return axiosInstance.post(`${urls.PRODUCT_SELETIONS}`, { data: payload });
  },
  update(payload: ProductSeletionRequestType, id: number) {
    return axiosInstance.put(`${urls.PRODUCT_SELETIONS}/${id}`, {
      data: payload,
    });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.PRODUCT_SELETIONS}/${id}`);
  },
};

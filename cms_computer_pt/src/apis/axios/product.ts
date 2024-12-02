import { ProductRequestType } from "../../types/request/product";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const productApi = {
  create(payload: ProductRequestType) {
    return axiosInstance.post(`${urls.PRODUCTS}`, { data: payload });
  },
  update(payload: ProductRequestType, id: number) {
    return axiosInstance.put(`${urls.PRODUCTS}/${id}`, { data: payload });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.PRODUCTS}/${id}`);
  },
};

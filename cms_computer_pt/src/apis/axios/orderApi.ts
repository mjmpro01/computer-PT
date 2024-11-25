import { OrdersType } from "../../types/commom/orders";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const orderApi = {
  update(payload: OrdersType, id: number) {
    return axiosInstance.put(`${urls.ORDERS}/${id}`, {
      data: payload,
    });
  },
};

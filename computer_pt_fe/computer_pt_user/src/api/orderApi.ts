/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { OrderType } from "@/types/reponse/order";

const orderApi = {
  async create(payload: any) {
    try {
      const res = await axiosClient.post<any>(`${urls.ORDERS}`, payload);

      return res?.data;
    } catch (error) {
      console.error("Order error:", error);
      throw error;
    }
  },
  async getAll(id: number, status: string) {
    try {
      const res = await axiosClient.get<BaseResponse<BaseData<OrderType>[]>>(
        `${urls.ORDERS}?filters[user]=${id}&populate=deep,4&sort=id:ASC${
          status === "all" ? "" : `&filters[status]=${status}`
        }`
      );

      return res?.data;
    } catch (error) {
      console.error("Order error:", error);
      throw error;
    }
  },
  async getById(id: number) {
    try {
      const res = await axiosClient.get<BaseResponse<BaseData<OrderType>>>(
        `${urls.ORDERS}/${id}?populate=*`
      );

      return res?.data;
    } catch (error) {
      console.error("Order error:", error);
      throw error;
    }
  },
};

export default orderApi;

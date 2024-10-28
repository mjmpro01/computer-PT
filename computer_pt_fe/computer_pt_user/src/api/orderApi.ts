/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";

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
};

export default orderApi;

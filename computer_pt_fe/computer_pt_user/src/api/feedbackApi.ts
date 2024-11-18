/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";

const feedbackApi = {
  async create(payload: any) {
    try {
      const res = await axiosClient.post<any>(`${urls.FEEDBACKS}`, payload);

      return res?.data;
    } catch (error) {
      console.error("FEEDBACKS error:", error);
      throw error;
    }
  },
};

export default feedbackApi;

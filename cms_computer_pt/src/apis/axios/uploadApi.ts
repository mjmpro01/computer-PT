/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

const uploadApi = {
  async upload(file: File) {
    console.log(file);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axiosInstance.post<any>(`${urls.UPLOAD}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res?.data;
    } catch (error) {
      console.error("UPLOAD error:", error);
      throw error;
    }
  },
};

export default uploadApi;

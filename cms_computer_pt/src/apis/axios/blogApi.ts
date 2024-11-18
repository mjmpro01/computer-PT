import { BlogRequestType } from "../../types/request/blog";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const blogApi = {
  create(payload: BlogRequestType) {
    return axiosInstance.post(`${urls.BLOGS}`, { data: payload });
  },
  update(payload: BlogRequestType, id: number) {
    return axiosInstance.put(`${urls.BLOGS}/${id}`, {
      data: payload,
    });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.BLOGS}/${id}`);
  },
};

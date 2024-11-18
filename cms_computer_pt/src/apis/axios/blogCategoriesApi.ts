import { BlogCategoryType } from "../../types/commom/blog";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const blogCategoriesAPi = {
  create(payload: BlogCategoryType) {
    return axiosInstance.post(`${urls.BLOG_CATEGORIES}`, { data: payload });
  },
  update(payload: BlogCategoryType, id: number) {
    return axiosInstance.put(`${urls.BLOG_CATEGORIES}/${id}`, {
      data: payload,
    });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.BLOG_CATEGORIES}/${id}`);
  },
};

import { CategoriesRequestType } from "../../types/request/categories";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const categoriesApi = {
  create(payload: CategoriesRequestType) {
    return axiosInstance.post(`${urls.CATEGORIES}`, { data: payload });
  },
  update(payload: CategoriesRequestType, id: number) {
    return axiosInstance.put(`${urls.CATEGORIES}/${id}`, { data: payload });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.CATEGORIES}/${id}`);
  },
};

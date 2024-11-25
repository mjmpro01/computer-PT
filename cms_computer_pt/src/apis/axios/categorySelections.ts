import { CategorySelectionsRequestType } from "../../types/request/categorySelections";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const categorySelectionsApi = {
  create(payload: CategorySelectionsRequestType) {
    return axiosInstance.post(`${urls.CATEGORY_SELECTIONS}`, { data: payload });
  },
  update(payload: CategorySelectionsRequestType, id: number) {
    return axiosInstance.put(`${urls.CATEGORY_SELECTIONS}/${id}`, {
      data: payload,
    });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.CATEGORY_SELECTIONS}/${id}`);
  },
};

import { UserRequestType } from "../../types/request/user";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const userApi = {
  create(payload: UserRequestType) {
    return axiosInstance.post(
      `${urls.AUTH}/${urls.LOCAL}/${urls.REGISTER}`,
      payload
    );
  },
  update(payload: UserRequestType, id: number) {
    return axiosInstance.put(`${urls.USERS}/${id}`, { data: payload });
  },
  delete(id: number) {
    return axiosInstance.delete(`${urls.USERS}/${id}`);
  },
};

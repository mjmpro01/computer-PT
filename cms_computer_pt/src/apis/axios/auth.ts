import { LoginRequestType } from "../../types/request/login";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const authApi = {
  login(payload: LoginRequestType) {
    return axiosInstance.post(`${urls.AUTH}/${urls?.LOCAL}`, payload);
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { LoginType, RegisterType } from "@/types/request/auth";
import { LoginResponseType } from "@/types/reponse/auth";
import { UserType } from "@/types/common/user";

const authApi = {
  async register(payload: RegisterType) {
    try {
      const res = await axiosClient.post<RegisterType>(
        `${urls.AUTH}/${urls.LOCAL}/${urls.REGISTER}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  async login(payload: LoginType) {
    try {
      const res = await axiosClient.post<LoginResponseType>(
        `${urls.AUTH}/${urls.LOCAL}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  async update(payload: any, id: number) {
    try {
      const res = await axiosClient.put<LoginResponseType>(
        `${urls.USERS}/${id}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  async getMe() {
    try {
      const res = await axiosClient.get<UserType>(`${urls.USERS}/${urls.ME}`);

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default authApi;

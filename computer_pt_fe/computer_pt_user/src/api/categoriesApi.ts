/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { CategoriesType } from "@/types/common/categories";

const categoriesApi = {
  async getAll() {
    try {
      const res = await axiosClient.get<
        BaseResponse<BaseData<CategoriesType>[]>
      >(`${urls.CATEGORIES}?populate=deep,3`);

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default categoriesApi;

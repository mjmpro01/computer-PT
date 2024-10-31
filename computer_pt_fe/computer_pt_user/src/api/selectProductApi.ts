import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { SeletionProductsType } from "@/types/common/seletProducts";

const selectProductApi = {
  async getAll() {
    try {
      const res = await axiosClient.get<
        BaseResponse<BaseData<SeletionProductsType>[]>
      >(`${urls.PRODUCT_SELETIONS}?populate=deep,3&sort=id:ASC`);

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default selectProductApi;

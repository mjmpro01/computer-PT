/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";

const productApi = {
  async getAll() {
    try {
      const res = await axiosClient.get<BaseResponse<BaseData<ProductType>[]>>(
        `${urls.PRODUCTS}?populate=deep,3`
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  async getBySlug(slug: string) {
    try {
      const res = await axiosClient.get<BaseResponse<BaseData<ProductType>>>(
        `${urls.SLUGIFY}/${urls.SLUGS}/${urls.PRODUCT}/${slug}?populate=deep,3`
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default productApi;

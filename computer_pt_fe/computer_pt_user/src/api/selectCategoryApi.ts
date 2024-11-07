import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { CategorySelectionType } from "@/types/reponse/selectCategory";

const selectCategoryApi = {
  async get(slug: string) {
    try {
      const res = await axiosClient.get<
        BaseResponse<BaseData<CategorySelectionType>[]>
      >(
        `${urls.CATEGORY_SELECTIONS}?filters[category][slug]=${slug}&populate=deep,4`
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default selectCategoryApi;

import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { BlogType } from "@/types/reponse/blog";

const blogsApi = {
  async getAll() {
    try {
      const res = await axiosClient.get<BaseResponse<BaseData<BlogType>[]>>(
        `${urls.BLOGS}?populate=deep,3`
      );

      return res?.data;
    } catch (error) {
      console.error("Blogs error:", error);
      throw error;
    }
  },
  async getBySlug(slug: string) {
    try {
      const res = await axiosClient.get<BaseResponse<BaseData<BlogType>>>(
        `${urls.SLUGIFY}/${urls.SLUGS}/${urls.BLOG}/${slug}?populate=deep,3`
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default blogsApi;

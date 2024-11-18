import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { BlogCategoryType } from "../../types/commom/blog";

export const useFetchBlogCategories = () => {
  const { data, error, mutate } = useSWR<
    BaseResponse<BaseData<BlogCategoryType>[]>
  >(`${urls.BLOG_CATEGORIES}?populate=*&sort=id:DESC`, fetcher);

  return {
    data,
    error,
    mutate,
  };
};

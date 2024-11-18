import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { BlogType } from "../../types/commom/blog";

export const useFetchBlog = () => {
  const { data, error, mutate } = useSWR<BaseResponse<BaseData<BlogType>[]>>(
    `${urls.BLOGS}?populate=*&sort=id:DESC`,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
};

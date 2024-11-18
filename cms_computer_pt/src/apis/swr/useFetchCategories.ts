import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { CategoriesType } from "../../types/commom/categories";

export const useFetchCategories = () => {
  const { data, error, mutate } = useSWR<
    BaseResponse<BaseData<CategoriesType>[]>
  >(`${urls.CATEGORIES}?populate=*&sort=id:DESC`, fetcher);

  return {
    data,
    error,
    mutate,
  };
};

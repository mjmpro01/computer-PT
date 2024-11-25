import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { ProductSeletionsType } from "../../types/commom/productSeletions";

export const useFetchProductSelection = () => {
  const { data, error, mutate } = useSWR<
    BaseResponse<BaseData<ProductSeletionsType>[]>
  >(`${urls.PRODUCT_SELETIONS}?populate=*&sort=id:DESC`, fetcher);

  return {
    data,
    error,
    mutate,
  };
};

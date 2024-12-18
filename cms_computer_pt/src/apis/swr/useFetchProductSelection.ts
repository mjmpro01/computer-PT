import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { ProductSeletionsType } from "../../types/commom/productSeletions";

interface productSelectionProps {
  page: number;
}
export const useFetchProductSelection = ({ page }: productSelectionProps) => {
  const { data, error, mutate } = useSWR<
    BaseResponse<BaseData<ProductSeletionsType>[]>
  >(
    `${urls.PRODUCT_SELETIONS}?populate=*&sort=id:DESC&pagination[pageSize]=10&pagination[page]=${page}`,
    fetcher
  );

  const pagination = data?.meta?.pagination;
  return {
    data,
    error,
    mutate,
    pagination,
  };
};

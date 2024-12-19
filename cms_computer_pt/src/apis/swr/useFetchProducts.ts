import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { ProductType } from "../../types/commom/product";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";

interface ProductProps {
  page?: number;
}
export const useFetchProducts = ({ page }: ProductProps) => {
  const { data, error, mutate } = useSWR<BaseResponse<BaseData<ProductType>[]>>(
    `${urls.PRODUCTS}?populate=*&sort=id:ASC&pagination[pageSize]=10&pagination[page]=${page}`,
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

export const useFetchProductsNopaging = () => {
  const { data, error, mutate } = useSWR<BaseResponse<BaseData<ProductType>[]>>(
    `${urls.PRODUCTS}?populate=*&sort=id:ASC`,
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

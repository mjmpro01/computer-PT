import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { OrdersType } from "../../types/commom/orders";

interface OrdersProps {
  page?: number;
}
export const useFetchOrders = ({ page }: OrdersProps) => {
  const { data, error, mutate } = useSWR<BaseResponse<BaseData<OrdersType>[]>>(
    `${urls.ORDERS}?populate=deep,6&sort=id:DESC&pagination[pageSize]=10&pagination[page]=${page}`,
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

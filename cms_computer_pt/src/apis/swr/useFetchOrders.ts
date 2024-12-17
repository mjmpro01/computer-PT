import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { OrdersType } from "../../types/commom/orders";

export const useFetchOrders = () => {
  const { data, error, mutate } = useSWR<BaseResponse<BaseData<OrdersType>[]>>(
    `${urls.ORDERS}?populate=deep,6&sort=id:DESC`,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
};

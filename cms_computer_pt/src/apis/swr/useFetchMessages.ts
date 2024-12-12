import useSWR from "swr";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { MessageType } from "../../types/commom/message";
import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";

export const useFetchMessages = (query?: string) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR<
    BaseResponse<BaseData<MessageType>[]>
  >(`${urls.MESSAGES}?${query}`, fetcher, { revalidateOnFocus: false });

  const sortData = data?.data.sort((a, b) => a.id - b.id);
  const pagination = data?.meta?.pagination;
  return {
    data: sortData || [],
    error,
    mutate,
    pagination,
    isLoading,
    isValidating,
  };
};

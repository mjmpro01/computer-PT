import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { RoomChatType } from "../../types/commom/roomChat";
import useSWR from "swr";

export const useFetchRoomChats = (query?: string) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR<
    BaseResponse<BaseData<RoomChatType>[]>
  >(`${urls.ROOM_CHATS}?${query}`, fetcher, {
    refreshInterval: 1000 * 60,
  });
  const pagination = data?.meta?.pagination;
  return {
    data: data?.data || [],
    error,
    mutate,
    pagination,
    isLoading,
    isValidating,
  };
};

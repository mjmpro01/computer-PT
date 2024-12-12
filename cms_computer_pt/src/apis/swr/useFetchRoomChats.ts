import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { RoomChatType } from "../../types/commom/roomChat";
import useSWR from "swr";

export const useFetchRoomChats = (query?: string) => {
  const { data, error, mutate, isLoading } = useSWR<
    BaseResponse<BaseData<RoomChatType>[]>
  >(`${urls.ROOM_CHATS}?${query}`, fetcher, {
    refreshInterval: 2 * 60 * 1000,
  });
  const pagination = data?.meta?.pagination;
  return {
    data: data?.data || [],
    error,
    mutate,
    pagination,
    isLoading,
  };
};

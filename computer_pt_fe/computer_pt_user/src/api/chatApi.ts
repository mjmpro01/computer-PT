import urls from "@/utils/constants/urls";
import axiosClient from "./axiosClient";
import { RoomChatResponseType } from "@/types/reponse/roomChat";
import { BaseResponse } from "@/types/base/baseResponse";
import { BaseData } from "@/types/base/baseData";
import { MessageResponseType } from "@/types/reponse/message";

const chatApi = {
  getUserRoom(user_id: number) {
    return axiosClient.get<BaseResponse<BaseData<RoomChatResponseType>[]>>(
      `${urls.ROOM_CHATS}?filters[user]=${user_id}`
    );
  },

  //   getAllRooms() {
  //     return axiosClient.get<RoomChatResponseType[]>(urls.GET_ALL_ROOMS);
  //   },

  getMessages(queryString?: string) {
    return axiosClient.get<BaseResponse<BaseData<MessageResponseType>[]>>(
      `${urls.MESSAGES}?${queryString}`
    );
  },
};
export default chatApi;

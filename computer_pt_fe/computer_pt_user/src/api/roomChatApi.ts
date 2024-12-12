import axiosClient from "@/api/axiosClient";
import { roomChatRequestType } from "@/types/request/roomChat";
import urls from "@/utils/constants/urls";

export const roomChatApi = {
  create(payload: roomChatRequestType) {
    return axiosClient.post(`${urls.ROOM_CHATS}`, {
      data: payload,
    });
  },
  update(payload: roomChatRequestType, id: number) {
    return axiosClient.put(`${urls.ROOM_CHATS}/${id}`, {
      data: payload,
    });
  },
};

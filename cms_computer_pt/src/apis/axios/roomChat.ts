import { roomChatRequestType } from "../../types/request/roomChat";
import urls from "../../utils/constants/urls";
import axiosInstance from "./axiosInstance";

export const roomChatApi = {
  create(payload: roomChatRequestType) {
    return axiosInstance.post(`${urls.ROOM_CHATS}`, {
      data: payload,
    });
  },
  update(payload: roomChatRequestType, id: number) {
    return axiosInstance.put(`${urls.ROOM_CHATS}/${id}`, {
      data: payload,
    });
  },
};

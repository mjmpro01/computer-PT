import { BaseData } from "../base/baseData";
import { UserType } from "./user";

export type RoomChatType = {
  room_id: string;
  user: {
    data: BaseData<UserType>;
  };
  seen_status: boolean;
  createdAt: string;
  updatedAt: string;
};

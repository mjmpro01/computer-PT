import { UserType } from "@/types/common/user";

export type RoomChatResponseType = {
  room_id: string;
  user: UserType;
  seen_status: boolean;
  createdAt: string;
  updatedAt: string;
};

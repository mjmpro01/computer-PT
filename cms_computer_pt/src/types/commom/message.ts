import { BaseData } from "../base/baseData";
import { AvatarType } from "./product";
import { RoomChatType } from "./roomChat";
import { UserType } from "./user";

export type MessageType = {
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: { data: BaseData<UserType> };
  media: { data: BaseData<AvatarType>[] };
  //   mentionedProduct: { data: BaseData<BaseProductData> };
  room: {
    data: BaseData<RoomChatType>;
  };
};

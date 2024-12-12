import { BaseData } from "@/types/base/baseData";
import { AvatarType } from "@/types/common/product";
import { UserType } from "@/types/common/user";
import { RoomChatResponseType } from "@/types/reponse/roomChat";

export type MessageResponseType = {
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: { data: BaseData<UserType> };
  media: { data: BaseData<AvatarType>[] };
  //   mentionedProduct: { data: BaseData<BaseProductData> };
  room: {
    data: BaseData<RoomChatResponseType>;
  };
};

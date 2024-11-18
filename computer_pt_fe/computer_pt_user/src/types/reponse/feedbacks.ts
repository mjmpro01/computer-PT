import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import { UserType } from "@/types/common/user";

export type FeedBackType = {
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  product: { data: BaseData<ProductType> };
  user: { data: BaseData<UserType> };
};

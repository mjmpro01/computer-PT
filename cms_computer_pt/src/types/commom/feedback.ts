import { BaseData } from "../base/baseData";
import { ProductType } from "./product";
import { UserType } from "./user";

export type FeedbackType = {
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    data: BaseData<UserType>;
  };
  product: {
    data: BaseData<ProductType>;
  };
};

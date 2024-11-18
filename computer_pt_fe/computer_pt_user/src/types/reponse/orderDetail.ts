import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import { OrderType } from "@/types/reponse/order";

export type OrderDetailType = {
  unit_price: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: { data: BaseData<ProductType> };
  order: { data: OrderType };
};

import { BaseData } from "../base/baseData";
import { ProductType } from "../common/product";
import { UserType } from "../common/user";

export type OrderDetailType = {
  unit_price: string;
  quantity: 1;
  createdAt: string;
  updatedAt: string;
  product: { data: BaseData<ProductType> };
};
export type OrderType = {
  customer_email: string;
  customer_full_name: string;
  customer_phone: string;
  shipping_address: string;
  shipping_method: string;
  payment_method: string;
  total: string;
  status: string;
  transport_fee: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  order_details: { data: BaseData<OrderDetailType>[] };
};

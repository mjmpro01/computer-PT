import { BaseData } from "../base/baseData";
import { ProductType } from "./product";
import { UserType } from "./user";

export type OrderDetailType = {
  unit_price: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: { data: BaseData<ProductType> };
};
export type OrdersType = {
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
  order_code: string;
  user: {
    data: BaseData<UserType>;
  };
  order_details: {
    data: BaseData<OrderDetailType>[];
  };
};

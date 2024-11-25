import { BaseData } from "../base/baseData";
import { ProductType } from "./product";

export type ProductSeletionsType = {
  name: string;
  is_price_range: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: {
    data: BaseData<ProductType>[];
  };
};

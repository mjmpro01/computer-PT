import { BaseData } from "../base/baseData";
import { ProductType } from "./product";

export type CategoriesType = {
  name: string;
  level: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  chid: {
    data: [];
  };
  parent: {
    data: null;
  };
  products: {
    data: BaseData<ProductType>[];
  };
};

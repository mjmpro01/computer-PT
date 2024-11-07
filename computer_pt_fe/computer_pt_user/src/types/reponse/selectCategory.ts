import { BaseData } from "../base/baseData";
import { CategoriesType } from "../common/categories";
import { SeletionProductsType } from "../common/seletProducts";

export type CategorySelectionType = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: { data: BaseData<CategoriesType> };
  product_seletions: { data: BaseData<SeletionProductsType>[] };
};

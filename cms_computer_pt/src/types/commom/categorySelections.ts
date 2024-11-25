import { BaseData } from "../base/baseData";
import { CategoriesType } from "./categories";
import { ProductSeletionsType } from "./productSeletions";

export type CategorySelectionsType = {
  category: BaseData<CategoriesType>;
  product_seletions: { data: BaseData<ProductSeletionsType>[] };
  name: string;
  createdAt: string;
};

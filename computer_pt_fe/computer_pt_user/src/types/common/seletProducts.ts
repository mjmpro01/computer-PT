import { ProductType } from "./product";

export type SeletionProductsType = {
  name: string;
  is_price_range: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: {
    data: ProductType[];
  };
};

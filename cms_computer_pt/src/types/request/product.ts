import { Content } from "../commom/content";

export type ProductRequestType = {
  name: string;
  promotion_price: string;
  price: string;
  avatar: number;
  gallery: number[];
  categories: number[];
  description: Content[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the base type for data wrapping
import { BaseData } from "../base/baseData";

// Define the Avatar type
export type AvatarType = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small: ImageFormatType;
    medium: ImageFormatType;
    thumbnail: ImageFormatType;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
};

// Define the image format type
export type ImageFormatType = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

// Define the product type
export type ProductType = {
  name: string;
  promotion_price: string;
  price: string;
  product_code: string;
  total_purchase: number;
  total_view: number;
  specifications: string | null;
  description: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  rating: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  avatar: { data: BaseData<AvatarType> };
  gallery: { data: BaseData<AvatarType>[] };
};

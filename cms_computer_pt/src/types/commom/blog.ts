import { BaseData } from "../base/baseData";

export type BlogCategoryType = {
  name?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};
export type BlogCategoryResponse = {
  data: BaseData<BlogCategoryType>;
};

export type BlogType = {
  title: string;
  blog_category: BlogCategoryResponse;
  content: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  avatar: {
    data: BaseData<ImageType>;
  };
};
type ImageType = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
};

type ImageFormat = {
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

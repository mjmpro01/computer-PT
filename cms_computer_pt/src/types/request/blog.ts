import { Content } from "../commom/content";

export type BlogRequestType = {
  title: string;
  avatar: { id: number };
  content: Content[];
  blog_category: number;
};

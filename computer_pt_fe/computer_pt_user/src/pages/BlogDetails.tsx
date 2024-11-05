/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import blogsApi from "@/api/blogsApi";
import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { BlogType } from "@/types/reponse/blog";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const [blog, setBlog] = useState<BaseData<BlogType>>();
  const { slug } = useParams();
  console.log(blog);

  interface TextContent {
    type: "text";
    text: string;
  }

  interface LinkContent {
    type: "link";
    url: string;
    children: Content[];
  }

  interface HeadingContent {
    type: "heading";
    level: number;
    children: Content[];
  }

  interface ImageContent {
    type: "image";
    image: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
    };
  }

  interface ParagraphContent {
    type: "paragraph";
    children: Content[];
  }

  type Content =
    | TextContent
    | LinkContent
    | HeadingContent
    | ImageContent
    | ParagraphContent;

  const formatText = (item: any): React.ReactNode => {
    if (typeof item === "string") {
      return item;
    }

    switch (item.type) {
      case "text":
        return <span className="text-justify text-[1.4rem]">{item.text}</span>;
      case "link":
        return (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4C4CFC] text-justify text-[1.4rem]"
          >
            {item.children.map((child: Content, index: number) => (
              <React.Fragment key={index}>{formatText(child)}</React.Fragment>
            ))}
          </a>
        );
      case "heading":
        const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag className="text-justify text-[1.8rem] font-bold">
            {item.children.map((child: Content, index: number) => (
              <React.Fragment key={index}>{formatText(child)}</React.Fragment>
            ))}
          </HeadingTag>
        );
      case "image":
        return (
          <div className="w-full flex justify-center items-center">
            <img src={item.image.url} alt={item.image.name} loading="lazy" />
          </div>
        );
      case "paragraph":
        return (
          <p className="mb-[32px] text-justify text-[1.4rem]">
            {item.children.map((child: Content, index: number) => (
              <React.Fragment key={index}>{formatText(child)}</React.Fragment>
            ))}
          </p>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        await blogsApi
          .getBySlug(slug)
          .then((res) => {
            if (res) {
              setBlog(res?.data);
            }
          })
          .catch((errors) => console.log(errors));
      }
    };
    fetchBlog();
  }, [slug]);
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <div
        className="h-[35rem]"
        style={{
          backgroundImage: `url(${baseUrl}${blog?.attributes?.avatar?.data?.attributes?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="flex items-center justify-center">
        <div className="px-[8rem] h-full w-full max-w-[1440px] bg-white flex flex-col gap-[2.4rem] mt-[2.4rem] py-[5rem]">
          <h3 className="font-bold text-[2rem] underline text-[#2443C7] text-center cursor-pointer">
            {blog?.attributes?.blog_category?.data?.attributes?.name}
          </h3>
          <h2 className="font-bold text-[3.2rem] text-center">
            {blog?.attributes?.title}
          </h2>
          <div className="mt-[2.4rem] px-[16rem]">
            {blog?.attributes?.content.map((item, index) => (
              <div key={index}>{formatText(item)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;

/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import productApi from "@/api/productApi";
import images from "@/assets/images";
import InfoTable from "@/components/common/InfoTable";
// import SwiperProduct from "@/components/common/SwiperProduct";
import BlockProduct from "@/components/pages/ProductDetail/BlockProduct";
import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const slug = currentUrl.split("/").pop();
  const [product, setProduct] = useState<BaseData<ProductType>>();
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
    if (slug) {
      const fetchProduct = async () => {
        await productApi
          .getBySlug(slug)
          .then((res) => {
            if (res) {
              setProduct(res?.data);
            }
          })
          .then((error) => console.log(error));
      };
      fetchProduct();
    }
  }, [slug]);

  return (
    <div className="flex flex-col items-center bg-[#F8F8FC] min-h-[100vh]">
      <div className="max-w-[1440px] w-full px-[8rem]">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
            },
            {
              title: "Chi tiết sản phẩm",
            },
          ]}
          className="my-[1.2rem]"
        />
        <div className="flex gap-[1.2rem]">
          {product && <BlockProduct product={product} />}
          <div className="w-[40%] flex flex-col gap-[1.2rem]">
            <div className="flex items-center gap-[0.4rem] bg-white rounded-[0.4rem]">
              <img
                src={images.logo}
                alt="image"
                className="size-[7rem] object-cover"
              />
              <p className="text-[1.6rem] font-medium hover:text-[#1435C3] cursor-pointer duration-300">
                Công ty cổ phân thương mại dịch vụ Computer P&T
              </p>
            </div>
            <div className="bg-white rounded-[0.4rem] p-[1rem]">
              <h3 className="text-[1.4rem] font-bold">Chính sách bán hàng</h3>
              <ul className="flex flex-col gap-[0.8rem] mt-[1.2rem]">
                <li>
                  Miễn phí giao hàng cho đơn hàng từ 5 triệu{" "}
                  <span className="text-[#1435C3]">Xem chi tiết</span>
                </li>
                <li>Cam kết hàng chính hãng 100% </li>
                <li>Đổi trả trong vòng 10 ngày</li>
                <li>
                  Miễn phí giao hàng cho đơn hàng từ 5 triệu{" "}
                  <span className="text-[#1435C3]">Xem chi tiết</span>
                </li>
                <li>
                  Gói dịch vụ bảo hành/ Sửa chữa tận nơi{" "}
                  <span className="text-[#1435C3]">Xem chi tiết</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-[2.4rem] bg-white p-[2rem] flex gap-[1.2rem]">
          <div className="flex-1">
            <h3 className="text-[2.4rem] font-bold">Mô tả sản phẩm</h3>
            <div>
              {product?.attributes?.description?.map((item, index) => (
                <div key={index}>{formatText(item)}</div>
              ))}
            </div>
          </div>
          <div className="w-[30%]">
            <InfoTable />
          </div>
        </div>
        {/* <SwiperProduct /> */}
      </div>
    </div>
  );
}

export default ProductDetails;

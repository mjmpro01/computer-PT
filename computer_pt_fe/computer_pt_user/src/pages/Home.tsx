import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CategoriesContent from "@/components/common/CategoriesContent";

import images from "@/assets/images";
import SwiperProduct from "@/components/common/SwiperProduct";
import { useEffect, useState } from "react";
import { BaseData } from "@/types/base/baseData";
import categoriesApi from "@/api/categoriesApi";
import { CategoriesType } from "@/types/common/categories";
import socket from "@/api/socket";
import { getUserProfile } from "@/utils/functions/getUser";

const Home = () => {
  const [categories, setCategories] = useState<BaseData<CategoriesType>[]>([]);
  const dataUser = getUserProfile();
  useEffect(() => {
    const fetchCategories = async () => {
      await categoriesApi
        .getAll()
        .then((res) => {
          if (res) {
            setCategories(res?.data);
          }
        })
        .catch((error) => console.log(error));
    };
    fetchCategories();
  }, []);

  const banners = [
    {
      name: "banner-1",
      image: images.banner1,
    },
    {
      name: "banner-2",
      image: images.banner2,
    },
    {
      name: "banner-3",
      image: images.banner3,
    },
    {
      name: "banner-4",
      image: images.banner4,
    },
  ];
  return (
    <>
      <div className="h-[40rem]">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-[50rem] w-full"
        >
          {banners.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-center">
        <div className="min-h-[100vh] pt-[7rem] w-full max-w-[1440px] px-[8rem] flex flex-col gap-[2.4rem]">
          <CategoriesContent />
          {categories?.length > 0 &&
            categories.map(
              (item, index) =>
                item?.attributes?.products?.data?.length > 0 && (
                  <SwiperProduct categories={item} key={index} />
                )
            )}
        </div>
      </div>
    </>
  );
};

export default Home;

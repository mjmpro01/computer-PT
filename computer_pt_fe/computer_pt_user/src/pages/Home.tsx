/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Home = () => {
  const [categories, setCategories] = useState<BaseData<CategoriesType>[]>([]);
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
  return (
    <>
      <div className="h-[40rem]">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-[50rem] w-full"
        >
          <SwiperSlide>
            <img
              src={images.banner1}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={images.banner2}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={images.banner3}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={images.banner4}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex items-center justify-center">
        <div className="min-h-[100vh] pt-[7rem] w-full max-w-[1440px] px-[8rem] flex flex-col gap-[2.4rem]">
          <CategoriesContent />
          {categories?.length > 0 &&
            categories?.map((item, index) => (
              <SwiperProduct categories={item} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

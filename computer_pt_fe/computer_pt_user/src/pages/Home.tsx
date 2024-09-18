import ProductComp from "@/components/common/ProductComp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CategoriesContent from "@/components/common/CategoriesContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import images from "@/assets/images";
const Home = () => {
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
        <div className="min-h-[100vh] pt-[7rem] w-full max-w-[1440px] px-[8rem]">
          <CategoriesContent />
          <div className="bg-[#1435C3] p-[1rem] flex flex-col gap-[0.8rem]">
            <div className="flex items-center justify-between pb-[1rem] text-white border-b-[0.2rem]">
              <h3 className="text-[2rem] font-bold uppercase">Màn hình</h3>
              <div className="flex items-center gap-[0.4rem] cursor-pointer">
                <p className="text-[1.6rem]">Xem tất cả</p>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[1.4rem]"
                />
              </div>
            </div>
            <div>
              <Swiper
                slidesPerView={5}
                spaceBetween={5}
                speed={600}
                parallax={true}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className="pb-[1rem]"
              >
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductComp />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

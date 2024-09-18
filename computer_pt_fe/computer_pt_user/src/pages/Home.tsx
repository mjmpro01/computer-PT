import ProductComp from "@/components/common/ProductComp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Home = () => {
  return (
    <div className="">
      <Swiper
        slidesPerView={5}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
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
  );
};

export default Home;

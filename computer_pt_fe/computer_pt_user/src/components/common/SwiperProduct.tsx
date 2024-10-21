import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductComp from "./ProductComp";
import { BaseData } from "@/types/base/baseData";
import { CategoriesType } from "@/types/common/categories";

interface SwiperProductProps {
  categories: BaseData<CategoriesType>;
}
function SwiperProduct({ categories }: SwiperProductProps) {
  return (
    <div className="bg-white p-[1rem] flex flex-col gap-[0.8rem]">
      <div className="flex items-center justify-between pb-[1rem] text-black">
        <h3 className="text-[2rem] font-bold uppercase">
          {categories?.attributes?.name}
        </h3>
        <div className="flex items-center gap-[0.4rem] cursor-pointer">
          <p className="text-[1.6rem]">Xem tất cả</p>
          <FontAwesomeIcon icon={faChevronRight} className="text-[1.4rem]" />
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
          {categories?.attributes?.products?.data?.length > 0 &&
            categories?.attributes?.products?.data?.map((product, index) => (
              <SwiperSlide>
                <ProductComp product={product} key={index} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperProduct;

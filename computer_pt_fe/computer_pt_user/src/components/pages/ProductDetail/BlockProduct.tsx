import { Button } from "antd";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import { formatMoney } from "@/utils/functions/formatMoney";
import baseUrl from "@/types/base/baseUrl";

interface BlockProductProps {
  product: BaseData<ProductType>;
}
function BlockProduct({ product }: BlockProductProps) {
  const [thumbsSwiper] = useState(null);
  const price = Number(product?.attributes?.price);
  const promotionPrice = Number(product?.attributes?.promotion_price);

  const percentDecrease =
    promotionPrice > 0 && promotionPrice !== price
      ? Math.round(((price - promotionPrice) / price) * 100)
      : 0;

  return (
    <div className="grid grid-cols-2 gap-[1.2rem] bg-white rounded-[0.4rem] p-[2rem] h-[60rem]">
      <div className="">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 size-[40rem]"
        >
          {product?.attributes?.gallery?.data?.length > 0 &&
            product?.attributes?.gallery?.data?.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={`${baseUrl}${item?.attributes?.url}`} />
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          // onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper size-[40rem]"
        >
          {product?.attributes?.gallery?.data?.length > 0 &&
            product?.attributes?.gallery?.data?.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={`${baseUrl}${item?.attributes?.url}`} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex flex-col gap-[2.4rem]">
        <div>
          <p className="text-[2.4rem] font-bold">{product?.attributes?.name}</p>
          <div className="flex items-center gap-[0.8rem]">
            {/* <p className="text-[1.4rem] text-[#82869E]">
              Thương hiệu{" "}
              <span className="text-[#1435C3] cursor-pointer">XIGMATEK</span>
            </p> */}
            {/* <span>|</span> */}
            <p className="text-[1.4rem] text-[#82869E]">
              SKU: {product?.attributes?.product_code}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[2rem] font-bold text-[#1435C3]">
            {price !== promotionPrice && promotionPrice > 0
              ? formatMoney(promotionPrice)
              : formatMoney(price)}
          </p>
          {price !== promotionPrice && promotionPrice > 0 && (
            <p className="text-[#82869E] text-[1.2rem]">
              <span className="line-through">{formatMoney(price)}</span>{" "}
              <span className="text-[#1435C3]">
                -{percentDecrease !== 0 && percentDecrease}%
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-[0.4rem] py-[2.4rem] border-t border-b">
          <Button className="text-white bg-[#1435C3] h-[4rem] rounded-[0.4rem]">
            Mua ngay
          </Button>
          <Button className="text-[#1435C3] border-[#1435C3] h-[4rem] rounded-[0.4rem]">
            Thêm vào giỏ hàng
          </Button>
        </div>

        <div>
          <h3 className="text-[1.4rem] font-bold">Khuyến mãi liên quan</h3>
          <ul className="flex flex-col gap-[0.4rem] list-disc mt-[1.2rem]">
            <li className="text-[1.2rem]">
              Giảm thêm đến 500.000 VNĐ khi thanh toán qua thẻ tín dụng
              Sacombank{" "}
              <span className="text-[#1435C3] cursor-pointer">
                Xem chi tiết
              </span>
            </li>
            <li className="text-[1.2rem]">
              Giảm thêm đến 500.000 VNĐ khi thanh toán qua thẻ tín dụng
              Sacombank{" "}
              <span className="text-[#1435C3] cursor-pointer">
                Xem chi tiết
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BlockProduct;

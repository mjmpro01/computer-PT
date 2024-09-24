import { Button } from "antd";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
function BlockProduct() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="grid grid-cols-2 gap-[1.2rem] bg-white rounded-[0.4rem] p-[2rem] h-[60rem]">
      <div className="">
        {/* <img
          src="https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w500-rw"
          alt="product"
          className="size-[40rem]"
        /> */}
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 size-[40rem]"
        >
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/dtCI4VZfX1bgckXIUsmxqk9g2qI8cWlJGKq2ZzOYDOHiamEyDNfL6WM-ZuKU1w3dGybcOFjZweilDzZhZTO-bgqed3fiEeuh=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/524ECX45QDszZVaFlWQsYUmIxSCWkFK1UT52BwDn56VTooNL5DrDKWluMMwITBU2gRuTQRlTsX5NRA4144OrspWcMbjXAPk=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/rYcWhRD4NaoqWqsICjt0Cpp5n-zY2gsm14EQYlC2ELNdN055hF8dau93Qd62N2717P5-uXkZgHrw0JJPjVldC6bPK6AD6cdL=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/9dXjDp0v79QO7K5GU93Wkt4SN-a-Sg2GITe3-3M-Kd-XD-5lvsui8rM2xBB8dOfw_tT6n0db3IqGIqgzKwv8wNArlbVXEw9Ftw=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/4fKU00SfH5_tu_HKcI8Y8ytF-gGAuUUcy366-UZI62UJ-27BUUoKc4-iZ80YiSJfCk5PLbJCMwp1ucCRnTEl6eJBwiCNJsav=w500-rw" />
          </SwiperSlide>
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
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/dtCI4VZfX1bgckXIUsmxqk9g2qI8cWlJGKq2ZzOYDOHiamEyDNfL6WM-ZuKU1w3dGybcOFjZweilDzZhZTO-bgqed3fiEeuh=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/524ECX45QDszZVaFlWQsYUmIxSCWkFK1UT52BwDn56VTooNL5DrDKWluMMwITBU2gRuTQRlTsX5NRA4144OrspWcMbjXAPk=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/rYcWhRD4NaoqWqsICjt0Cpp5n-zY2gsm14EQYlC2ELNdN055hF8dau93Qd62N2717P5-uXkZgHrw0JJPjVldC6bPK6AD6cdL=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/9dXjDp0v79QO7K5GU93Wkt4SN-a-Sg2GITe3-3M-Kd-XD-5lvsui8rM2xBB8dOfw_tT6n0db3IqGIqgzKwv8wNArlbVXEw9Ftw=w500-rw" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://lh3.googleusercontent.com/4fKU00SfH5_tu_HKcI8Y8ytF-gGAuUUcy366-UZI62UJ-27BUUoKc4-iZ80YiSJfCk5PLbJCMwp1ucCRnTEl6eJBwiCNJsav=w500-rw" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-col gap-[2.4rem]">
        <div>
          <p className="text-[2.4rem] font-bold">
            Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090
          </p>
          <div className="flex items-center gap-[0.8rem]">
            <p className="text-[1.4rem] text-[#82869E]">
              Thương hiệu{" "}
              <span className="text-[#1435C3] cursor-pointer">XIGMATEK</span>
            </p>
            <span>|</span>
            <p className="text-[1.4rem] text-[#82869E]">SKU: 240603475</p>
          </div>
        </div>
        <div>
          <p className="text-[2rem] font-bold text-[#1435C3]">839.000₫</p>
          <p className="text-[#82869E] text-[1.2rem]">
            <span className="line-through">839.000₫</span>{" "}
            <span className="text-[#1435C3]">-11%</span>
          </p>
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

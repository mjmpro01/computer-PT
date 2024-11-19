import { Link, useParams } from "react-router-dom";
import paths from "../utils/constants/paths";
import { useEffect } from "react";
import useCartStore from "@/stores/useCartStore";
import images from "@/assets/images";
import { Image } from "antd";

export default function OrderSuccess() {
  const { id } = useParams();
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [id]);
  return (
    <div className="md:container md:max-w-[140rem] md:mx-auto mt-[6.8rem] h-[calc(100vh-20rem)]">
      <section className="section__heading mx-4 my-8 md:mx-[120px]">
        <div className="section__heading-title text-[12px] text-[#484848] text-center md:text-[16px] font-normal md:text-center">
          <div className="flex items-center justify-center">
            <p className="section__heading-status--order my-0 text-[#484848] md:text-[#899AE2] font-bold md:font-light text-center">
              Đặt hàng thành công.
            </p>
          </div>
          <p>
            Đơn hàng đang chờ xử lý, theo dõi chi tiết{" "}
            <Link
              to={`${paths.PROFILE}/${paths.ORDERS}`}
              className=" underline text-[#899AE2]"
            >
              tại đây
            </Link>{" "}
            bạn nhé!
          </p>
          <div className="section__order-continue-shopping text-center w-full md:block hidden mt-5">
            <Link
              to={paths.HOME}
              className="text-[#899AE2] underline text-[14px]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center">
        {" "}
        <Image
          src={images.success}
          alt="not-found"
          preview={false}
          width={400}
        />
      </div>
      <section className="section__order mx-4 my-8 md:mx-[120px]">
        {/* <div className="section__order-products md:block hidden">
          {dataOrder?.attributes?.order_details?.data?.map((detail, index) => (
            <ProductComp
              product={detail?.attributes?.product?.data}
              key={index}
            />
          ))}
        </div> */}
        {/* <div className="section__order-information my-8 md:mx-0 md:block hidden">
          <div className="section__order-information-quantity md:text-[14px]">
            Số lượng:{" "}
            <span className="font-bold">{totalQuantity} sản phẩm</span>
          </div>
          <div className="section__order-information-price md:text-[14px]">
            Tổng cộng:{" "}
            <span className="font-bold text-[16px] md:text-[20px]">
              {formatMoney(Number(dataOrder?.attributes?.total))}
            </span>
          </div>
        </div> */}
        <div className="section__order-continue-shopping text-center w-full md:hidden">
          <Link
            to={paths.HOME}
            className="text-[#899AE2] underline text-[14px]"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>
    </div>
  );
}

import images from "@/assets/images";
import { Button } from "antd";

function CartHeader() {
  const cart = [];
  if (cart.length === 0) {
    return (
      <div className="flex flex-col gap-[2.4rem] items-center w-[35rem] min-h-[35rem]">
        <div className="flex flex-col gap-[1.2rem] items-center">
          <img
            src={images.emptyCart}
            alt="empty cart"
            className="size-[15rem] object-cover"
          />
          <span>Giỏ hàng chưa có sản phẩm nào</span>
        </div>
        <Button className="text-white bg-[#1435C3] h-[4rem]">
          Mua sắm ngay
        </Button>
      </div>
    );
  }

  return <div className="w-[35rem] min-h-[35rem]"></div>;
}

export default CartHeader;

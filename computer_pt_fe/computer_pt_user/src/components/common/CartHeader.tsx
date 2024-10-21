import images from "@/assets/images";
import { Button } from "antd";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import paths from "@/utils/constants/paths";
import useCartStore from "@/stores/useCartStore";

function CartHeader() {
  const navigate = useNavigate();
  const { items } = useCartStore();

  if (items.length === 0) {
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

  return (
    <div className="w-[35rem] flex flex-col justify-between gap-[2.4rem]">
      <div className="flex flex-col gap-[1.2rem]">
        {items.map((item) => (
          <CartProduct key={item.id} cartItem={item} />
        ))}
      </div>
      <Button
        className="bg-[#1435C3] text-white"
        onClick={() => navigate(paths.CART)}
      >
        Xem giỏ hàng
      </Button>
    </div>
  );
}

export default CartHeader;

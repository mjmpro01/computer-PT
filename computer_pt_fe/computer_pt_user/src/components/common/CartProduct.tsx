import baseUrl from "@/types/base/baseUrl";
import { CartItem } from "@/types/common/cart";
import { formatMoney } from "@/utils/functions/formatMoney";

interface CartProductProps {
  cartItem: CartItem;
}
function CartProduct({ cartItem }: CartProductProps) {
  return (
    <div className="flex gap-[0.8rem]">
      <img
        src={`${baseUrl}${cartItem?.avatar}`}
        alt="image"
        className="size-[7rem] object-cover"
      />
      <div className="flex flex-col">
        <p className="text-[1.4rem] font-medium line-clamp-1">
          {cartItem?.name}
        </p>
        <p className="text-[1.2rem] text-[#808080]">
          Số lượng: {cartItem?.quantity}
        </p>
        <p className="text-[1.6rem] font-bold">
          {Number(cartItem?.promotionPrice) > 0
            ? formatMoney(Number(cartItem.promotionPrice))
            : formatMoney(Number(cartItem?.price))}
        </p>
      </div>
    </div>
  );
}

export default CartProduct;

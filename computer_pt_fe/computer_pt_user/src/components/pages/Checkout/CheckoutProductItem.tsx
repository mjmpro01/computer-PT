import baseUrl from "@/types/base/baseUrl";
import { CartItem } from "@/types/common/cart";
import { formatMoney } from "@/utils/functions/formatMoney";

interface CheckoutProductItemProps {
  cartItem: CartItem;
}
function CheckoutProductItem({ cartItem }: CheckoutProductItemProps) {
  const price = Number(cartItem?.price);
  const promotionPrice = Number(cartItem?.promotionPrice);
  return (
    <div className="flex gap-[0.8rem] items-center">
      <div className="w-[6.24rem] h-[6.24rem]">
        <img
          src={`${baseUrl}${cartItem?.avatar}`}
          alt="image"
          className="w-[6.24rem] h-[6.24rem] object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-[1.4rem] hover:text-[#0d6efd] duration-300 cursor-pointer line-clamp-1">
          {cartItem?.name}
        </p>
        <p className="text-[1.2rem] text-[#82869e]">
          Số lượng {cartItem?.quantity}
        </p>
        <p className="text-[1.4rem] font-bold">
          {price > promotionPrice && promotionPrice > 0
            ? formatMoney(Number(cartItem?.promotionPrice))
            : formatMoney(price)}
        </p>
        {cartItem?.promotionPrice !== "0" &&
          cartItem?.promotionPrice !== cartItem?.price && (
            <p className="text-[1.2rem] text-[#828693] line-through">
              {formatMoney(Number(cartItem?.price))}
            </p>
          )}
      </div>
    </div>
  );
}

export default CheckoutProductItem;

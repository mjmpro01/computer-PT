/* eslint-disable react-hooks/exhaustive-deps */
import icons from "@/assets/icons";
import baseUrl from "@/types/base/baseUrl";
import { CartItem } from "@/types/common/cart";
import { formatMoney } from "@/utils/functions/formatMoney";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import useCartStore from "@/stores/useCartStore";

interface CartItemProps {
  cartItem: CartItem;
  isSelected: boolean; // New prop to determine if item is selected
  onCheckboxChange: (id: number) => void; // New prop for checkbox change handling
}

const CartItemComponent: React.FC<CartItemProps> = ({
  cartItem,
  isSelected,
  onCheckboxChange,
}) => {
  const { addItem, removeItem } = useCartStore();
  const [count, setCount] = useState<number>(cartItem?.quantity);
  const promotionPrice = Number(cartItem?.promotionPrice);
  const price = Number(cartItem?.price);

  const totalPrice =
    promotionPrice > 0 ? promotionPrice * count : price * count;

  useEffect(() => {
    if (count !== cartItem.quantity) {
      const updatedCartItem = { ...cartItem, quantity: count };
      addItem(updatedCartItem);
    }
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      removeItem(cartItem.id);
    }
  }, [count]);

  return (
    <div className="bg-white grid grid-cols-[5%_50%_10%_25%_10%] p-[1rem]">
      <Checkbox
        checked={isSelected}
        onChange={() => onCheckboxChange(cartItem.id)}
      />
      <div className="flex items-center gap-[0.4rem]">
        <div className="size-[6.4rem]">
          <img
            src={`${baseUrl}${cartItem?.avatar}`}
            className="w-full h-full"
          />
        </div>
        <div>
          <p className="text-[1.3rem]">{cartItem?.name}</p>
          <p className="text-[#82869e] text-[1.2rem]">SKU:123123231</p>
        </div>
      </div>
      <div className="flex flex-col gap-[0.2rem]">
        <p className="text-[1.6rem] font-bold">{formatMoney(price)}</p>
        {promotionPrice > 0 && (
          <p className="text-[1.3rem] line-through text-[#82869e]">
            {formatMoney(promotionPrice)}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-[0.4rem]">
        <button
          onClick={() => {
            if (count > 1) {
              setCount(count - 1);
            }
          }}
          className={`size-[1.6rem] ${count === 1 && "cursor-not-allowed"}`}
          disabled={count === 1}
        >
          <img src={icons.minus} alt="minus-icon" />
        </button>
        <span className="text-[1.3rem] p-[0.6rem]">{count}</span>
        <button onClick={() => setCount(count + 1)} className="size-[1.6rem]">
          <img src={icons.plus} alt="plus-icon" />
        </button>
      </div>
      <div>
        <p className="text-[1.6rem] font-bold">{formatMoney(totalPrice)}</p>
      </div>
    </div>
  );
};

export default CartItemComponent;

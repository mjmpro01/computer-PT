import icons from "@/assets/icons";
import userBuildPcStore from "@/stores/useBuildPcStrore";
import baseUrl from "@/types/base/baseUrl";
import { BuildPCType } from "@/types/common/buildPC";
import { formatMoney } from "@/utils/functions/formatMoney";
import { Image } from "antd";
import { useState, useEffect } from "react";

interface ProductBuildProps {
  product: BuildPCType;
  onRemove: () => void;
}

function ProductBuild({ product, onRemove }: ProductBuildProps) {
  const { updateProductQuantity } = userBuildPcStore();
  const [quantity, setQuantity] = useState<number>(1);
  const price = Number(product?.price);
  const promotionPrice = Number(product?.promotionPrice);
  const totalPrice =
    promotionPrice > 0 && promotionPrice < price
      ? formatMoney(promotionPrice * quantity)
      : formatMoney(price * quantity);

  useEffect(() => {
    updateProductQuantity(product.id, quantity);
  }, [quantity, product.id, updateProductQuantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="px-[2rem] flex gap-[1.2rem]">
      <div className="w-[6rem] h-[6rem]">
        <Image
          src={`${baseUrl}${product?.avatar}`}
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[50rem]">
        <p className="text-[1.4rem] font-bold truncate">{product?.name}</p>
        <p className="text-[1.2rem] text-[#99999] font-medium truncate">
          SKU: {`product-${product?.id}`}
        </p>
      </div>
      <div className="flex items-center gap-[1.2rem]">
        <p className="font-medium text-[1.2rem]">
          {promotionPrice > 0 && promotionPrice < price
            ? formatMoney(promotionPrice)
            : formatMoney(price)}
        </p>
        <p className="font-medium text-[1.2rem]">x</p>
        <div className="bg-[#F8F8FC] rounded-[0.4rem] w-[5rem] border-black border-[0.1rem] overflow-hidden p-[0.2rem]">
          <input
            type="number"
            className="w-full bg-transparent focus-within:outline-none"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </div>
        <p className="font-medium text-[1.2rem]">=</p>
        <p className="font-medium text-[1.2rem]">{totalPrice}</p>
        <button className="w-[2.4rem] h-[2.4rem]" onClick={onRemove}>
          <img src={icons.trash} alt="icon" />
        </button>
      </div>
    </div>
  );
}

export default ProductBuild;

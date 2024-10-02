import icons from "@/assets/icons";
import { Image } from "antd";
import { useState } from "react";

function ProductBuild() {
  const [quantity, setQuantity] = useState<number>(1);
  const price = 21990000;

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
          src="https://lh3.googleusercontent.com/2n6AmF7YzgI1yRunu8acH4ZWKR-S-cINiL8IT3zSBBOzJ96nbqaOV1gJcC4vVVW6rboqnQSMgR-M2VWy6vQU4QW3jmd7dchE=w500-rw"
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[50rem]">
        <p className="text-[1.4rem] font-bold truncate">
          Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM
          12GB/GeForce RTX 3050/512GB SSD/ Windows 11)
        </p>
        <p className="text-[1.2rem] text-[#99999] font-medium truncate">
          Bảo hành: 36 tháng
        </p>
        <p className="text-[1.2rem] text-[#99999] font-medium truncate">
          SKU: 12312312321
        </p>
      </div>
      <div className="flex items-center gap-[1.2rem]">
        <p className="font-medium text-[1.2rem]">
          {price.toLocaleString("vi-VN")}đ
        </p>
        <p className="font-medium text-[1.2rem]">x</p>
        <div className="bg-[#F8F8FC] rounded-[0.4rem] w-[5rem] border-black border-[0.1rem] overflow-hidden p-[0.2rem]">
          <input
            type="number"
            className="w-full bg-transparent focus-within:outline-none"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <p className="font-medium text-[1.2rem]">=</p>
        <p className="font-medium text-[1.2rem]">
          {(price * quantity).toLocaleString("vi-VN")}đ
        </p>
        <button className="w-[2.4rem] h-[2.4rem]">
          <img src={icons.trash} alt="icon" />
        </button>
      </div>
    </div>
  );
}

export default ProductBuild;

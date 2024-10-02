import icons from "@/assets/icons";
import { Checkbox } from "antd";
import { useState } from "react";

function CartItem() {
  const [count, setCount] = useState<number>(1);
  return (
    <div className="bg-white grid grid-cols-[5%_50%_10%_25%_10%] p-[1rem]">
      <Checkbox></Checkbox>
      <div className="flex items-center gap-[0.4rem]">
        <div className="size-[6.4rem]">
          <img
            src="https://lh3.googleusercontent.com/UE9L3DwlVtE3pZnCwR29zgrf_SjHNOdopT3sunQbPWvIdYB3NYNanTkL-g9YNubL65chw7m1j4z7mEs53g=w500-rw"
            className="w-full h-full"
          />
        </div>
        <div>
          <p className="text-[1.3rem]">
            Ổ cứng SSD Kingston A400 240GB Sata 3 (SA400S37/240G)
          </p>
          <p className="text-[#82869e] text-[1.2rem]">SKU:123123231</p>
          <p className="text-[#82869e] text-[1.2rem]">240gb,Đen</p>
        </div>
      </div>
      <div className="flex flex-col gap-[0.2rem]">
        <p className="text-[1.6rem] font-bold">640.000đ</p>
        <p className="text-[1.3rem] line-through text-[#82869e]">740.000đ</p>
      </div>
      <div className="flex items-center justify-center gap-[0.4rem]">
        <button
          onClick={() => {
            if (count === 1) {
              return;
            } else {
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
        <p className="text-[1.6rem] font-bold">640.000đ</p>
      </div>
    </div>
  );
}

export default CartItem;

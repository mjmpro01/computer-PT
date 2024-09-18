import { Button } from "antd";

function ProductComp() {
  return (
    <div className="h-[45rem] flex flex-col p-[1rem] border rounded-[0.4rem]">
      <div className="">
        <div className="relative h-[35%]">
          <img
            src="https://lh3.googleusercontent.com/2n6AmF7YzgI1yRunu8acH4ZWKR-S-cINiL8IT3zSBBOzJ96nbqaOV1gJcC4vVVW6rboqnQSMgR-M2VWy6vQU4QW3jmd7dchE=w500-rw"
            alt="image"
            className="h-full w-full object-cover"
          />

          <div className="absolute p-[0.5rem_1rem] bg-gradient-to-br from-[#aa20ff] to-[#413EFF] z-10 rounded-[0.4rem] bottom-[10%] left-[1%]">
            <p className="text-white text-[1.2rem] font-bold">Tiết kiệm</p>
            <p className="text-white text-[1.2rem] font-bold">3.000.000đ</p>
          </div>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className="text-[1.4rem] font-medium uppercase text-[#82869e]">
            Lenovo
          </p>
          <p className="text-[1.2rem] line-clamp-3 text-[#434657]">
            Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM
            12GB/GeForce RTX 3050/512GB SSD/ Windows 11)
          </p>
          <p className="text-[1.6rem] font-bold text-[#1435C3]">21.990.000đ</p>
          <div className="flex items-center gap-[0.4rem]">
            <p className="text-[1.4rem] text-[#ccc] line-through">
              21.990.000đ
            </p>
            <span className="text-[1.4rem] text-[#1435C3]">-10%</span>
          </div>
        </div>
      </div>
      <Button className="w-full h-[4.2rem] text-[#1435C3] border-[#1435C3] rounded-[0.4rem]">
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
}

export default ProductComp;

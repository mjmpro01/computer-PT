import CartItem from "@/components/pages/Cart/CartItem";
import { Breadcrumb, Button, Checkbox } from "antd";

function Cart() {
  const items = 5;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
            },
            {
              title: "Giỏ hàng",
              href: "",
            },
          ]}
        />
      </div>
      <div className="px-[8rem] h-full w-full max-w-[1440px] mt-[2.4rem]">
        <div className="flex justify-between mb-[1.2rem] w-[70%]">
          <h2 className="text-[2.4rem] font-bold text-[#333333]">Giỏ hàng</h2>
          <button className="text-[1.4rem] text-[#7dd2eb]">Xóa tất cả</button>
        </div>
        <div className="flex gap-[2.4rem]">
          <div className="w-[70%]">
            <div className="w-full">
              <div className="bg-white border-b h-[5rem] grid grid-cols-[5%_50%_10%_25%_10%] items-center p-[1rem]">
                <Checkbox></Checkbox>
                <p className="text-[1.5rem] font-bold uppercase">
                  Công ty computer P&T
                </p>
                <p className="text-[1.3rem] text-center">Đơn giá</p>
                <p className="text-[1.3rem] text-center">Số lượng</p>
                <p className="text-[1.3rem] text-center">Thành tiền</p>
              </div>
              {items > 0 ? (
                <>
                  <CartItem />
                  <CartItem />
                  <CartItem />
                  <CartItem />
                </>
              ) : (
                <>
                  <p></p>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 bg-white p-[2rem] flex flex-col gap-[1.2rem] h-fit">
            <h2 className="text-[1.6rem] font-bold">Thanh toán</h2>
            <div className="flex items-center justify-between">
              <p className="text-[#333333] text-[1.5rem]">Tổng tạm tính</p>
              <p className="text-[#333333] text-[1.5rem]">669.000₫</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#333333] text-[1.5rem]">Thành tiền</p>
              <p className="text-[1.5rem] text-[#1435c3] font-bold">669.000₫</p>
            </div>
            <p className="text-[1.3rem] text-[#82869E] font-medium text-end">
              (Đã bao gồm VAT)
            </p>
            <Button className="bg-[#1453c3] h-[4rem] uppercase text-[1.4rem] text-white">
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

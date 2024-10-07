import AddressFrom from "@/components/pages/Checkout/AddressForm";
import CheckoutProductItem from "@/components/pages/Checkout/CheckoutProductItem";
import paths from "@/utils/constants/paths";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <div className="grid grid-cols-[70%_30%] mt-[2.4rem] gap-[0.8rem]">
          <AddressFrom />
          <div className="bg-white p-[1rem]">
            <div className="flex items-center justify-between">
              <h3 className="text-[1.6rem] font-bold">Thông tin đơn hàng</h3>
              <button
                className="text-[1.4rem] text-[#0d6efd]"
                onClick={() => navigate(paths.CART)}
              >
                Chỉnh sửa
              </button>
            </div>
            <div className="mt-[1.2rem] flex flex-col gap-[1.2rem]">
              <CheckoutProductItem />
              <CheckoutProductItem />
              <CheckoutProductItem />
            </div>
            <div className="mt-[2.4rem]">
              <div className="flex flex-col gap-[0.4rem]">
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Tổng tạm tính</p>
                  <p className="text-[1.4rem] font-bold">669.000</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Phí vận chuyển</p>
                  <p className="text-[1.4rem] font-bold">25.000</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Thành tiền</p>
                  <p className="text-[1.6rem] font-bold text-[#eb2101]">
                    25.000
                  </p>
                </div>
                <Button
                  className="h-[4rem] bg-[#1435C3] rounded-[0.4rem] mt-[2.4rem]"
                  type="primary"
                >
                  Thanh toán
                </Button>
                <button className="text-[1.4rem] text-justify mt-[1.2rem]">
                  Nhấn "Thanh toán" đồng nghĩa với việc bạn đọc và đồng ý tuân
                  theo{" "}
                  <span className="text-[#0d6efd]">
                    Điều khoản và Điều kiện
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

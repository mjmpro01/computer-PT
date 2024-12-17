/* eslint-disable react-hooks/exhaustive-deps */
import authApi from "@/api/authApi";
import orderApi from "@/api/orderApi";
import paymentApis from "@/api/paymentApi";
import AddressFrom from "@/components/pages/Checkout/AddressForm";
import CheckoutProductItem from "@/components/pages/Checkout/CheckoutProductItem";
import useCartStore from "@/stores/useCartStore";
import { UserType } from "@/types/common/user";
import paths from "@/utils/constants/paths";
import { formatMoney } from "@/utils/functions/formatMoney";
import { getAccessToken, getUserProfile } from "@/utils/functions/getUser";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, getTotalQuantity, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalQuantity = getTotalQuantity();
  const SHIPPING_FEE = 30000;
  const profile = getUserProfile();
  const token = getAccessToken();
  const [user, setUser] = useState<UserType>();
  const [isUpdate, setIsUpdate] = useState<number>(0);
  const [payment, setPayment] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      navigate(paths.LOGIN);
    }
  }, []);
  useEffect(() => {
    const fetchMe = async () => {
      await authApi
        .getMe()
        .then((res) => {
          if (res) {
            setUser(res);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchMe();
  }, [isUpdate]);
  const handleOrder = async () => {
    if (!profile?.address) {
      toast.error("Vui lòng hoàn tất thông tin địa chỉ giao hàng để tiếp tục");
    }
    const newData = items?.map((item) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
    const data = {
      customer_email: user?.email || profile?.email,
      customer_full_name: user?.fullname || profile?.fullname,
      customer_phone: user?.phone || profile?.phone,
      shipping_address: user?.address || profile?.address,
      shipping_method: "Giao hàng qua đối tác",
      payment_method: payment === 1 ? "COD" : "VNPAY",
      items: newData,
      user: user?.id || profile?.id,
    };

    const res = await orderApi.create({ data });
    if (res) {
      console.log(res);
      if (payment === 1) {
        toast.success("Đặt hàng thành công!");
        clearCart();
        navigate(`${paths.PROFILE}/${paths.ORDERS}`);
        return;
      } else if (payment === 0) {
        try {
          const resPayment = await paymentApis.post({
            order_code: res?.order?.order_code,
          });
          console.log(resPayment);
          if (resPayment) {
            window.location.replace(resPayment?.data?.url);
          }
        } catch (error) {
          console.log(error);
          if (axios.isAxiosError(error)) {
            toast.error(
              `Thanh toán qua VN PAY thất bại: ${error?.response?.data?.error?.message}`
            );
          } else {
            toast.error(`Thanh toán qua VN PAY thất bại: ${error}`);
          }
        }
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <div className="grid grid-cols-[70%_30%] mt-[2.4rem] gap-[0.8rem]">
          <AddressFrom
            setUpdate={() => setIsUpdate(isUpdate + 1)}
            payment={payment}
            setPayment={setPayment}
          />
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
              {items?.length > 0 &&
                items?.map((item, index) => (
                  <CheckoutProductItem key={index} cartItem={item} />
                ))}
            </div>
            <div className="mt-[2.4rem]">
              <div className="flex flex-col gap-[0.4rem]">
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Tổng tạm tính</p>
                  <p className="text-[1.4rem] font-bold">
                    {formatMoney(totalPrice)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Số lượng sản phẩm</p>
                  <p className="text-[1.4rem] font-bold">{totalQuantity}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Phí vận chuyển</p>
                  <p className="text-[1.4rem] font-bold">
                    {formatMoney(SHIPPING_FEE)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[1.4rem]">Thành tiền</p>
                  <p className="text-[1.6rem] font-bold text-[#eb2101]">
                    {formatMoney(totalPrice + SHIPPING_FEE)}
                  </p>
                </div>
                <Button
                  className="h-[4rem] bg-[#1435C5] rounded-[0.4rem] mt-[2.4rem]"
                  type="primary"
                  onClick={handleOrder}
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

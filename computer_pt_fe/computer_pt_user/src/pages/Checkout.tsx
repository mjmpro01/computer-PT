import orderApi from "@/api/orderApi";
import AddressFrom from "@/components/pages/Checkout/AddressForm";
import CheckoutProductItem from "@/components/pages/Checkout/CheckoutProductItem";
import useCartStore from "@/stores/useCartStore";
import paths from "@/utils/constants/paths";
import { formatMoney } from "@/utils/functions/formatMoney";
import { getUserProfile } from "@/utils/functions/getUser";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, getTotalQuantity, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalQuantity = getTotalQuantity();
  const SHIPPING_FEE = 30000;
  const profile = getUserProfile();
  const handleOrder = async () => {
    const newData = items?.map((item) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
    const data = {
      customer_email: profile?.email,
      customer_full_name: profile?.fullname,
      customer_phone: profile?.phone,
      shipping_address: profile?.address,
      shipping_method: "Giao hàng qua đối tác",
      payment_method: "COD",
      items: newData,
      user: profile?.id,
    };
    await orderApi
      .create({ data })
      .then((res) => {
        if (res) {
          toast.success("Đặt hàng thành công");
          clearCart();
          navigate("/");
        }
      })
      .catch(() => toast.error("Đặt hàng không thành công"));
  };
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
                  className="h-[4rem] bg-[#B562A3] rounded-[0.4rem] mt-[2.4rem]"
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

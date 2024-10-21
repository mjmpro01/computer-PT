import CartItemComponent from "@/components/pages/Cart/CartItem";
import useCartStore from "@/stores/useCartStore";
import paths from "@/utils/constants/paths";
import { Breadcrumb, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox"; // Import the CheckboxChangeEvent type
import images from "@/assets/images";
import { formatMoney } from "@/utils/functions/formatMoney";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const { items, removeItem, getTotalPrice, getTotalQuantity } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalQuantity = getTotalQuantity();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  // Handle checkbox toggle
  const handleCheckboxChange = (id: number) => {
    const updatedSelectedIds = new Set(selectedIds);
    if (updatedSelectedIds.has(id)) {
      updatedSelectedIds.delete(id);
    } else {
      updatedSelectedIds.add(id);
    }
    setSelectedIds(updatedSelectedIds);
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allIds = items.map((item) => item.id);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  // Handle delete action
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) {
      toast.error("Chọn sản phẩm để xóa");
      return;
    }
    selectedIds.forEach((id) => removeItem(id));
    setSelectedIds(new Set());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <Breadcrumb
          items={[{ title: "Trang chủ" }, { title: "Giỏ hàng", href: "" }]}
        />
      </div>
      <div className="px-[8rem] h-full w-full max-w-[1440px] mt-[2.4rem]">
        <div className="flex justify-between mb-[1.2rem] w-[70%]">
          <h2 className="text-[2.4rem] font-bold text-[#333333]">Giỏ hàng</h2>
          <button
            className="text-[1.4rem] text-[#7dd2eb]"
            onClick={handleDeleteSelected}
          >
            Xóa đã chọn
          </button>
        </div>
        <div className="flex gap-[2.4rem]">
          <div className="w-[70%]">
            <div className="w-full">
              <div className="bg-white border-b h-[5rem] grid grid-cols-[5%_50%_10%_25%_10%] items-center p-[1rem]">
                <Checkbox onChange={handleSelectAll}></Checkbox>
                <p className="text-[1.5rem] font-bold uppercase">
                  Công ty computer P&T
                </p>
                <p className="text-[1.3rem] text-center">Đơn giá</p>
                <p className="text-[1.3rem] text-center">Số lượng</p>
                <p className="text-[1.3rem] text-center">Thành tiền</p>
              </div>
              {items.length > 0 ? (
                items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    cartItem={item}
                    isSelected={selectedIds.has(item.id)}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center flex-col gap-[2.4rem] bg-white p-[2rem]">
                  <img
                    src={images.emptyCart}
                    alt="empty-cart"
                    className="size-[20rem]"
                  />
                  <p className="text-[2rem] font-medium">
                    Giỏ hàng chưa có sản phẩm nào
                  </p>
                  <Button
                    type="primary"
                    className="h-[4rem] bg-[#1453C3]"
                    onClick={() => navigate("/")}
                  >
                    Mua sắm ngay
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 bg-white p-[2rem] flex flex-col gap-[1.2rem] h-fit">
            <h2 className="text-[1.6rem] font-bold">Thanh toán</h2>
            {/* Total price and payment details go here */}
            <div className="flex items-center justify-between">
              <p className="text-[1.4rem]">Số lượng</p>
              <p className="text-[1.4rem]">{totalQuantity}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[1.4rem]">Tạm tính</p>
              <p className="text-[1.4rem] text-[#1453c3] font-bold">
                {formatMoney(totalPrice)}
              </p>
            </div>
            <Button
              className="bg-[#1453c3] h-[4rem] uppercase text-[1.4rem] text-white"
              onClick={() => navigate(paths.CHECKOUT)}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

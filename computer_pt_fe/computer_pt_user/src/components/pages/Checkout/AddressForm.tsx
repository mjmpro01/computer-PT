import icons from "@/assets/icons";
import { useState } from "react";
import ModalAdress from "./ModalAddress";

function AddressFrom() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white p-[1rem] flex flex-col gap-[1.2rem]">
      <h3 className="text-[1.6rem] font-bold">Thông tin nhận hàng</h3>
      <button
        className="w-[30rem] h-[8rem] border-[#ccc] border-[0.1rem] rounded-[0.4rem] flex items-center justify-center gap-[0.8rem]"
        onClick={showModal}
      >
        <img src={icons.plus} alt="plus-icon" />
        <p className="text-[1.6rem]">Thêm địa chỉ</p>
      </button>
      <h3 className="text-[1.6rem] font-bold">Phương thức giao hàng</h3>
      <button className="flex flex-col gap-[1.2rem] w-[30rem] h-[8rem] border-[#ccc] border-[0.1rem] rounded-[0.4rem] p-[1rem]">
        <p className="text-[1.6rem]">Giao hàng tiêu chuẩn</p>
        <p className="text-[1.8rem] font-bold">25.000đ</p>
      </button>
      <form className=""></form>
      <ModalAdress
        open={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default AddressFrom;

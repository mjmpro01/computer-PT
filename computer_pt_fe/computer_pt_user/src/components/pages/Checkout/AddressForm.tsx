import icons from "@/assets/icons";
import { useState } from "react";
import ModalAdress from "./ModalAddress";
import { Radio } from "antd";
import { getUserProfile } from "@/utils/functions/getUser";

function AddressFrom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<number>(0);
  const profile = getUserProfile();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const methods = [
    {
      title: "Thanh toán VNPAY-QR",
      description: "Thanh toán qua Internet Banking, Visa, Master, JCB",
    },
    {
      title: "Thanh toán khi nhận hàng",
      description: "",
    },
  ];
  return (
    <div className="bg-white p-[1rem] flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <h2 className="text-[1.8rem] font-bold m-0">Thông tin nhận hàng</h2>
        <div className="grid grid-cols-2 items-center gap-[1.2rem]">
          <button
            className="min-h-[8rem] border-[#1435C5] border-[0.1rem] rounded-[0.4rem] flex flex-col gap-[0.2rem] p-[1rem]"
            onClick={showModal}
          >
            <h3 className="text-[1.6rem] font-bold">{profile?.fullname}</h3>
            <p className="text-[1.4rem] m-0">{profile?.phone}</p>
            <p className="text-[1.4rem] m-0">{profile?.address}</p>
          </button>
          {!profile?.address && (
            <button
              className="min-h-[11.46rem] border-[#ccc] border-[0.1rem] rounded-[0.4rem] flex items-center justify-center gap-[0.8rem]"
              onClick={showModal}
            >
              <img src={icons.plus} alt="plus-icon" />
              <p className="text-[1.6rem]">Thêm địa chỉ</p>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h2 className="text-[1.8rem] font-bold m-0">Phương thức giao hàng</h2>
        <div className="flex items-center justify-between">
          <Radio checked>Phí giao hàng tiêu chuẩn</Radio>
          <p className="text-[1.6rem] font-bold">30.000đ</p>
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <h2 className="text-[1.8rem] font-bold m-0">Phương thức thanh toán</h2>
        <div className="grid grid-cols-2 gap-[1.2rem]">
          {methods?.map((item, index) => (
            <button
              className={`flex gap-[1.2rem] h-[8rem] border-[0.1rem] rounded-[0.4rem] p-[1rem]  ${
                selectedMethod === index ? "border-[#1435C5]" : "border-[#ccc]"
              }`}
              key={index}
              onClick={() => setSelectedMethod(index)}
            >
              <div className="flex flex-col items-start">
                <p className="text-[1.6rem] font-bold">{item?.title}</p>
                <p className="text-[1.4rem] text-[#82869e]">
                  {item?.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ModalAdress
        open={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default AddressFrom;

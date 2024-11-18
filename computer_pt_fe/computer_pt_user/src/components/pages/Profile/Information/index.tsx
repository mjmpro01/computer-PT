import { getUserProfile } from "@/utils/functions/getUser";
import { Button } from "antd";
import ModalAdress from "../../Checkout/ModalAddress";
import { useState } from "react";

function Information() {
  const profile = getUserProfile();
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
    <>
      <div className="flex flex-col gap-[2.4rem]">
        <h3 className="text-[2rem] font-semibold text-center">
          Thông tin địa chỉ
        </h3>
        <div className="flex flex-col gap-[0.8rem] border border-[#B562A3] rounded-[0.8rem] p-[1rem]">
          <h3 className="text-[1.6rem] font-bold">{profile?.fullname}</h3>
          <h3 className="text-[1.4rem]">Email: {profile?.email}</h3>
          <h3 className="text-[1.4rem]">Số điện thoại: {profile?.phone}</h3>
          <h3 className="text-[1.4rem]">Địa chỉ: {profile?.address}</h3>
        </div>
        <div className="flex justify-end">
          <Button
            className="border-[#B562A3] text-[#B562A3] w-[20rem] h-[4rem]"
            onClick={showModal}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>
      <ModalAdress
        open={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
}

export default Information;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import InputComponent from "@/components/common/InputComponent";
import SelectComponent from "@/components/common/SelectComponent";
import { Button, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";

interface ModalAdressProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
function ModalAdress({ open, handleOk, handleCancel }: ModalAdressProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
  };
  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[1.2rem]"
        >
          <h2 className="text-[2rem] font-bold mb-[2.4rem]">
            Thông tin người nhận hàng
          </h2>
          <InputComponent
            isRequired
            name="name"
            control={control}
            label="Họ tên"
            placeholder="Họ tên"
            // rules={formValidation.email}
            // errors={errors.email}
          />
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <InputComponent
              isRequired
              name="phone"
              control={control}
              label="Số điện thoại"
              placeholder="Số điện thoại"
              // rules={formValidation.email}
            />
            <InputComponent
              isRequired
              name="email"
              control={control}
              label="Email"
              placeholder="Email"
              // rules={formValidation.email}
            />
          </div>
          <h2 className="text-[2rem] font-bold mb-[2.4rem]">
            Địa chỉ nhận hàng
          </h2>
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <SelectComponent
              containerClasName="w-full"
              control={control}
              label="Tỉnh, thành phố"
              name="role"
              // options={roles}
            />
            <SelectComponent
              containerClasName="w-full"
              control={control}
              label="Quận huyện"
              name="role"
              // options={roles}
            />
          </div>
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <SelectComponent
              containerClasName="w-full"
              control={control}
              label="Xã phường"
              name="role"
              // options={roles}
            />
            <InputComponent
              isRequired
              name="address"
              control={control}
              label="Địa chỉ cụ thể"
              placeholder="Địa chỉ cụ thể"
              // rules={formValidation.email}
            />
          </div>

          <div className="flex items-center justify-end gap-[1.2rem] mt-[2.4rem]">
            <Button className="h-[4rem] border-[#1435C3] text-[#1435C3]">
              Hủy bỏ
            </Button>
            <Button className="h-[4rem] bg-[#1435C3]" type="primary">
              Lưu địa chỉ
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ModalAdress;

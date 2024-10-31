/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from "@/api/authApi";
import InputComponent from "@/components/common/InputComponent";
import SelectComponent from "@/components/common/SelectComponent";
import { formValidation } from "@/utils/constants/formValidation";
import { getUserProfile } from "@/utils/functions/getUser";
import { splitAddress } from "@/utils/functions/splitAddress";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ModalAdressProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
interface AddressFrom {
  fullname: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  address: string;
}
function ModalAdress({ open, handleOk, handleCancel }: ModalAdressProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressFrom>();
  const profile = getUserProfile();

  const onSubmit: SubmitHandler<AddressFrom> = async (data) => {
    const newData = {
      ...data,
      address: `${data?.address}, ${data?.city}, ${data?.district}, ${data?.ward}`,
    };

    if (profile) {
      await authApi
        .update(newData, profile?.id)
        .then((res) => {
          if (res) {
            localStorage.setItem("profile", JSON.stringify(res));

            toast.success("Cập nhật địa chỉ thành công");
            handleOk();
          }
        })
        .catch(() => toast.error("Cập nhật địa chỉ không thành công"));
    }
  };

  const [listCity, setListCity] = useState<any>([]);
  const [city, district] = watch(["city", "district", "ward"]);
  const _distric = listCity?.filter((n: any) => n?.Name === city) as any[];
  const _ward = _distric?.[0]?.Districts?.filter(
    (n: any) => n.Name === district
  );
  useEffect(() => {
    const addressData = splitAddress(profile?.address);
    setValue("email", profile?.email);
    setValue("fullname", profile?.fullname);
    setValue("phone", profile?.phone);
    setValue("city", addressData?.province);
    setValue("district", addressData?.district);
    setValue("ward", addressData?.ward);
    setValue("address", addressData?.street);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
        .then((response) => response.json())
        .then((data) => {
          setListCity(data);
        });
    };

    fetchData();
  }, []);
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
            name="fullname"
            control={control}
            label="Họ tên"
            placeholder="Họ tên"
            rules={formValidation.fullName}
            errors={errors.fullname}
          />
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <InputComponent
              isRequired
              name="phone"
              control={control}
              label="Số điện thoại"
              placeholder="Số điện thoại"
              rules={formValidation.phone}
              errors={errors.phone}
            />
            <InputComponent
              isRequired
              name="email"
              control={control}
              label="Email"
              placeholder="Email"
              rules={formValidation.email}
              errors={errors.email}
              disabled
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
              name="city"
              isRequired
              options={(() => {
                const outputValue: { value: number; label: number }[] = [];
                listCity.forEach((element: any) => {
                  outputValue.push({
                    value: element?.Name,
                    label: element?.Name,
                  });
                });

                return outputValue;
              })()}
            />
            <SelectComponent
              containerClasName="w-full"
              control={control}
              label="Quận, huyện"
              name="district"
              isRequired
              options={(() => {
                const outputValue: { value: number; label: number }[] = [];
                const listDistrict = listCity?.filter(
                  (n: any) => n.Name === city
                ) as any[];
                listDistrict?.[0]?.Districts?.forEach((element: any) => {
                  outputValue.push({
                    value: element.Name,
                    label: element.Name,
                  });
                });

                return outputValue;
              })()}
            />
          </div>
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <SelectComponent
              containerClasName="w-full"
              control={control}
              label="Xã, phường"
              name="ward"
              isRequired
              options={(() => {
                const outputValue: { value: number; label: number }[] = [];

                _ward?.[0]?.Wards?.forEach((element: any) => {
                  outputValue.push({
                    value: element.Name,
                    label: element.Name,
                  });
                });

                return outputValue;
              })()}
            />
            <InputComponent
              isRequired
              name="address"
              control={control}
              label="Địa chỉ cụ thể"
              placeholder="Địa chỉ cụ thể"
              rules={formValidation.address}
            />
          </div>

          <div className="flex items-center justify-end gap-[1.2rem] mt-[2.4rem]">
            <Button
              className="h-[4rem] border-[#1435C3] text-[#1435C3]"
              htmlType="button"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
            <Button
              className="h-[4rem] bg-[#1435C3]"
              type="primary"
              htmlType="submit"
            >
              Lưu địa chỉ
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ModalAdress;

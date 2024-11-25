/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import { BaseData } from "../../types/base/baseData";
import { OrdersType } from "../../types/commom/orders";
import InputCustomComponent from "../common/InputCustomComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import SelectComponent from "../common/SelectCustomConponent";
import { orderApi } from "../../apis/axios/orderApi";
import { toast } from "sonner";

interface OrderFormProps {
  order: BaseData<OrdersType>;
  mutate: () => void;
}
function OrderForm({ order, mutate }: OrderFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrdersType>();

  useEffect(() => {
    setValue("customer_email", order?.attributes?.customer_email);
    setValue("customer_full_name", order?.attributes?.customer_full_name);
    setValue("customer_phone", order?.attributes?.customer_phone);
    setValue("shipping_address", order?.attributes?.shipping_address);
    setValue("shipping_method", order?.attributes?.shipping_method);
    setValue("payment_method", order?.attributes?.payment_method);

    setValue("status", order?.attributes?.status);
    setValue("total", order?.attributes?.total);
    setValue("transport_fee", order?.attributes?.transport_fee);
  }, [order?.id]);
  const options = [
    {
      label: "Chờ xác nhận",
      value: "Chờ xác nhận",
    },
    {
      label: "Xác nhận",
      value: "Xác nhận",
    },
    {
      label: "Đang xử lý",
      value: "Đang xử lý",
    },
    {
      label: "Đang giao hàng",
      value: "Đang giao hàng",
    },
    {
      label: "Giao hàng thành công",
      value: "Giao hàng thành công",
    },
    {
      label: "Hủy",
      value: "Hủy",
    },
  ];
  const onSubmit: SubmitHandler<OrdersType> = async (data) => {
    await orderApi
      .update(data, order?.id)
      .then((res) => {
        if (res) {
          toast.success("Cập nhật đơn hàng thành công");
          mutate();
        }
      })
      .catch(() => toast.error("Cập nhật đơn hàng thất bại"));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px]"
    >
      <h2 className="text-[16px] font-medium">Thông tin khách hàng</h2>
      <div className="grid grid-cols-2 gap-[12px]">
        <InputCustomComponent
          control={control}
          label="Email"
          placeholder="Nhập Email"
          name="customer_email"
          isRequired
          errors={errors.customer_email}
          disabled
        />
        <InputCustomComponent
          control={control}
          label="Tên khách hàng"
          placeholder="Tên khách hàng"
          name="customer_full_name"
          isRequired
          errors={errors.customer_full_name}
          disabled
        />
      </div>
      <div className="grid grid-cols-2 gap-[12px]">
        <InputCustomComponent
          control={control}
          label="Số điện thoại"
          placeholder="Số điện thoại"
          name="customer_phone"
          isRequired
          errors={errors.customer_phone}
          disabled
        />

        <InputCustomComponent
          control={control}
          label="Địa chỉ"
          placeholder="Địa chỉ"
          name="shipping_address"
          isRequired
          errors={errors.shipping_address}
          disabled
        />
      </div>
      <div className="grid grid-cols-2 gap-[12px]">
        <InputCustomComponent
          control={control}
          label="Phương thức giao hàng"
          placeholder="Phương thức giao hàng"
          name="shipping_method"
          isRequired
          errors={errors.shipping_method}
          disabled
        />

        <InputCustomComponent
          control={control}
          label="Phương thức thanh toán"
          placeholder="Phương thức thanh toán"
          name="payment_method"
          isRequired
          errors={errors.payment_method}
          disabled
        />
      </div>
      <InputCustomComponent
        control={control}
        label="Phí vận chuyển"
        placeholder="Phí vận chuyển"
        name="transport_fee"
        isRequired
        errors={errors.transport_fee}
      />
      <InputCustomComponent
        control={control}
        label="Tổng tiền"
        placeholder="Tổng tiền"
        name="total"
        isRequired
        errors={errors.total}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Trạng thái đơn hàng"
        name="status"
        isRequired
        errors={errors.status}
        options={options}
      />
      <Button htmlType="submit" type="primary" className="h-[40px]">
        Cập nhật
      </Button>
    </form>
  );
}

export default OrderForm;

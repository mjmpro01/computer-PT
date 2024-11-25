/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import SelectComponent from "../common/SelectCustomConponent";
import InputCustomComponent from "../common/InputCustomComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSeletionRequestType } from "../../types/request/productSeletions";
import { useFetchProducts } from "../../apis/swr/useFetchProducts";
import { productSeletionsApi } from "../../apis/axios/productSeletionsApi";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { BaseData } from "../../types/base/baseData";
import { ProductSeletionsType } from "../../types/commom/productSeletions";

interface ProductSelectionFormProps {
  handleOk: () => void;
  productSelection: BaseData<ProductSeletionsType>;
}
function ProductSelectionForm({
  handleOk,
  productSelection,
}: ProductSelectionFormProps) {
  const [page, setPage] = useState<number>(1);
  const { data, pagination } = useFetchProducts();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductSeletionRequestType>();

  useEffect(() => {
    setValue("name", productSelection?.attributes?.name);
    setValue(
      "is_price_range",
      productSelection?.attributes?.is_price_range ? "true" : "false"
    );
    setValue(
      "products",
      productSelection?.attributes?.products?.data?.map((item) => item?.id)
    );
  }, [productSelection?.id]);
  const onSubmit: SubmitHandler<ProductSeletionRequestType> = async (data) => {
    const newData = {
      ...data,
      is_price_range: data?.is_price_range === "true",
    };
    await productSeletionsApi
      .create(newData)
      .then((res) => {
        if (res) {
          toast.success("Lưu thành công");
          reset();
          handleOk();
        }
      })
      .catch(() => toast.error("Lưu thất bại"));
  };

  const handlePopUpScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e && e.currentTarget) {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        page < (pagination?.pageCount || 1)
      ) {
        setPage(page + 1);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px]"
    >
      <InputCustomComponent
        control={control}
        label="Tên danh mục"
        placeholder="Tên danh mục"
        name="name"
        isRequired
        errors={errors.name}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Trạng thái đơn hàng"
        name="is_price_range"
        isRequired
        errors={errors.is_price_range}
        options={[
          {
            label: "Khoảng giá",
            value: "true",
          },
          {
            label: "Tiêu chí",
            value: "false",
          },
        ]}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Sản phẩm (Có thể chọn nhiều)"
        name="products"
        isRequired
        mode="multiple"
        onPopupScroll={handlePopUpScroll}
        options={data?.data?.map((item) => ({
          label: item?.attributes?.name,
          value: item?.id,
        }))}
      />
      <Button htmlType="submit" type="primary" className="h-[40px]">
        Lưu
      </Button>
    </form>
  );
}

export default ProductSelectionForm;

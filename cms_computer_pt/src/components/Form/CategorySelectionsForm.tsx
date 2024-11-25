/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import SelectComponent from "../common/SelectCustomConponent";
import InputCustomComponent from "../common/InputCustomComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { CategorySelectionsRequestType } from "../../types/request/categorySelections";
import { useFetchCategories } from "../../apis/swr/useFetchCategories";
import { useFetchProductSelection } from "../../apis/swr/useFetchProductSelection";
import { categorySelectionsApi } from "../../apis/axios/categorySelections";
import { toast } from "sonner";
import { BaseData } from "../../types/base/baseData";
import { CategorySelectionsType } from "../../types/commom/categorySelections";
import { useEffect } from "react";

interface CategorySelectionsFormProps {
  handleOk: () => void;
  category_selections?: BaseData<CategorySelectionsType>;
}
function CategorySelectionsForm({
  handleOk,
  category_selections,
}: CategorySelectionsFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategorySelectionsRequestType>();

  useEffect(() => {
    setValue("name", category_selections?.attributes?.name || "");
    setValue("category", category_selections?.attributes?.category?.id || 0);
    setValue(
      "product_seletions",
      category_selections?.attributes?.product_seletions?.data?.map(
        (item) => item?.id
      ) || []
    );
  }, [category_selections?.id]);
  const { data: dataCate } = useFetchCategories();
  const { data: productData } = useFetchProductSelection();
  const onSubmit: SubmitHandler<CategorySelectionsRequestType> = async (
    data
  ) => {
    console.log(data);
    if (category_selections?.id) {
      await categorySelectionsApi
        .update(data, category_selections?.id)
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            handleOk();
          }
        });
    } else {
      await categorySelectionsApi.create(data).then((res) => {
        if (res) {
          toast.success("Lưu thành công");
          reset();
          handleOk();
        }
      });
    }
  };

  return (
    <>
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
          label="Danh mục sản phẩm (categories)"
          name="category"
          isRequired
          options={dataCate?.data?.map((item) => ({
            label: item?.attributes?.name,
            value: item?.id,
          }))}
        />
        <SelectComponent
          containerClasName="w-full"
          control={control}
          label="Danh mục sản phẩm (product_selections)"
          name="product_seletions"
          isRequired
          mode="multiple"
          options={productData?.data?.map((item) => ({
            label: item?.attributes?.name,
            value: item?.id,
          }))}
        />
        <Button htmlType="submit" type="primary" className="h-[40px]">
          Lưu
        </Button>
      </form>
    </>
  );
}

export default CategorySelectionsForm;

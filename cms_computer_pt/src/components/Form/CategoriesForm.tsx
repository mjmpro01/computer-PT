/* eslint-disable react-hooks/exhaustive-deps */
import { SubmitHandler, useForm } from "react-hook-form";
import InputCustomComponent from "../common/InputCustomComponent";
import SelectComponent from "../common/SelectCustomConponent";
import { Button } from "antd";
import { CategoriesRequestType } from "../../types/request/categories";
import { BaseData } from "../../types/base/baseData";
import { CategoriesType } from "../../types/commom/categories";
import { categoriesApi } from "../../apis/axios/categories";
import { toast } from "sonner";
import { useEffect } from "react";

interface CategoriesFormProps {
  onMutate: () => void;
  categories?: BaseData<CategoriesType>[];
  category?: BaseData<CategoriesType> | null;
  isEdit?: boolean;
}
function CategoriesForm({
  onMutate,
  categories,
  category,
  isEdit,
}: CategoriesFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoriesRequestType>();

  useEffect(() => {
    if (category) {
      setValue("name", category?.attributes?.name);
      setValue("level", category?.attributes?.level);
      setValue("parent", category?.attributes?.parent?.data?.id);
      setValue(
        "chid",
        category?.attributes?.chid?.data?.map((item) => item?.id)
      );
    }
  }, [category?.id]);
  const onSubmit: SubmitHandler<CategoriesRequestType> = async (data) => {
    if (isEdit && category) {
      await categoriesApi
        .update(data, category?.id)
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            onMutate();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
      await categoriesApi
        .create(data)
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            onMutate();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    }
  };
  const options =
    categories?.map((item) => ({
      label: item?.attributes?.name,
      value: item?.id,
    })) || [];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px]"
    >
      <InputCustomComponent
        control={control}
        label="Tên danh mục"
        placeholder="Nhập Tên danh mục"
        name="name"
        isRequired
        errors={errors.name}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Cấp danh mục"
        name="level"
        isRequired
        // rules={formValidation.serviceType}
        errors={errors.level}
        options={[
          {
            label: "LEVEL_1",
            value: "LEVEL_1",
          },
          {
            label: "LEVEL_2",
            value: "LEVEL_2",
          },
          {
            label: "LEVEL_3",
            value: "LEVEL_3",
          },
          {
            label: "LEVEL_4",
            value: "LEVEL_4",
          },
          {
            label: "LEVEL_5",
            value: "LEVEL_5",
          },
        ]}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Danh mục cha"
        name="parent"
        errors={errors.parent}
        options={options}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Danh mục con"
        name="chid"
        mode="multiple"
        options={options}
      />
      <Button htmlType="submit" type="primary" className="h-[40px]">
        Lưu
      </Button>
    </form>
  );
}

export default CategoriesForm;

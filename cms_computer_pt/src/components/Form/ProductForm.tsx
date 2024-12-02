/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputCustomComponent from "../common/InputCustomComponent";
import ReactQuillComponent from "../common/ReactQuill";
import SelectComponent from "../common/SelectCustomConponent";
import UploadCustom from "../common/Upload";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductRequestType } from "../../types/request/product";
import { Button } from "antd";
import { productApi } from "../../apis/axios/product";
import { toast } from "sonner";
import { useFetchCategories } from "../../apis/swr/useFetchCategories";
import { BaseData } from "../../types/base/baseData";
import { ProductType } from "../../types/commom/product";
import { convertContentToHtml } from "./BlogForm";

interface ProductFormProps {
  handleOk: () => void;
  product?: BaseData<ProductType>;
  isEdit: boolean;
}
function ProductForm({ handleOk, product, isEdit }: ProductFormProps) {
  const [editorValue, setEditorValue] = useState<string>("");
  const [avatarId, setAvatarId] = useState<number>(0);
  const [avatarIds, setAvatarIds] = useState<number[]>([]);
  const { data } = useFetchCategories();
  const options = data?.data?.map((item) => ({
    label: item?.attributes?.name,
    value: item?.id,
  }));
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductRequestType>();
  const onSubmit: SubmitHandler<ProductRequestType> = async (data) => {
    const newData = {
      ...data,
      avatar: avatarId,
      gallery: avatarIds,
      description: editorValue,
    };
    if (!isEdit) {
      await productApi
        .create(newData)
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            reset();
            setEditorValue("");
            handleOk();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
      if (product) {
        await productApi
          .update(newData, product?.id)
          .then((res) => {
            if (res) {
              toast.success("Lưu thành công");
              reset();
              setEditorValue("");
              handleOk();
            }
          })
          .catch(() => toast.error("Lưu thất bại"));
      }
    }
  };
  useEffect(() => {
    setValue("name", product?.attributes?.name || "");
    setValue("promotion_price", product?.attributes?.promotion_price || "");
    setValue("price", product?.attributes?.price || "");
    setValue(
      "categories",
      product?.attributes?.categories?.data?.map((item) => item?.id) || []
    );
    setAvatarId(product?.attributes?.avatar?.data?.id || 0);
    setAvatarIds(
      product?.attributes?.gallery?.data?.map((item) => item?.id) || []
    );
    const htmlContent = convertContentToHtml(
      product?.attributes?.description || []
    );
    setEditorValue(htmlContent);
  }, [product?.id]);
  const handleSetAvatarId = (id: number) => {
    setAvatarIds((prevIds) => [...prevIds, id]);
  };
  return (
    <div>
      <h2 className="text-[20px] font-bold text-center">Thêm sản phẩm mới</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[12px]"
      >
        <InputCustomComponent
          control={control}
          label="Tên sản phẩm"
          placeholder="Nhập Tên sản phẩm"
          name="name"
          isRequired
          errors={errors.name}
        />
        <div className="grid grid-cols-2 gap-[12px]">
          <InputCustomComponent
            control={control}
            label="Giá khuyến mãi"
            placeholder="Nhập Giá khuyến mãi"
            name="promotion_price"
            type="number"
            isRequired
            errors={errors.promotion_price}
          />
          <InputCustomComponent
            control={control}
            label="Giá sản phẩm"
            placeholder="Nhập Giá sản phẩm"
            name="price"
            type="number"
            isRequired
            errors={errors.price}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <h4 className="text-[14px]">Ảnh đại diện</h4>
          <UploadCustom setId={setAvatarId} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <h4 className="text-[14px]">Bộ sưu tập</h4>
          <UploadCustom setId={handleSetAvatarId} />
        </div>
        <SelectComponent
          containerClasName="w-full"
          control={control}
          label="Danh mục sản phẩm"
          name="categories"
          options={options}
          mode="multiple"
        />
        <ReactQuillComponent
          label="Mô tả"
          setCurrentValue={handleEditorChange}
          currentValue={editorValue}
        />
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;

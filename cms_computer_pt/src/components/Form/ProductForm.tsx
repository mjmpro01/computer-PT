/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputCustomComponent from "../common/InputCustomComponent";
import ReactQuillComponent from "../common/ReactQuill";
import SelectComponent from "../common/SelectCustomConponent";
import UploadCustom from "../common/Upload";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductRequestType } from "../../types/request/product";
import { Button, Image } from "antd";
import { productApi } from "../../apis/axios/product";
import { toast } from "sonner";
import { useFetchCategories } from "../../apis/swr/useFetchCategories";
import { BaseData } from "../../types/base/baseData";
import { ProductType } from "../../types/commom/product";
import { convertContentToHtml } from "./BlogForm";
import baseUrl from "../../types/base/baseUrl";
import { DeleteOutlined } from "@ant-design/icons";

interface ProductFormProps {
  handleOk: () => void;
  product?: BaseData<ProductType>;
  isEdit: boolean;
  mutate: () => void;
}

function ProductForm({ handleOk, product, isEdit, mutate }: ProductFormProps) {
  const [editorValue, setEditorValue] = useState<string>("");
  const [avatarId, setAvatarId] = useState<number>(0); // ID của ảnh đại diện
  const [avatarIds, setAvatarIds] = useState<number[]>([]); // Mảng ID ảnh bộ sưu tập
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
      avatar: avatarId, // ID ảnh đại diện
      gallery: avatarIds, // Mảng ảnh bộ sưu tập
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
              mutate();
              toast.success("Lưu thành công");
              setEditorValue("");
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

  // Hàm xóa ảnh đại diện
  const handleRemoveAvatar = () => {
    setAvatarId(0);
  };

  // Hàm xóa ảnh bộ sưu tập
  const handleRemoveGallery = (id: number) => {
    setAvatarIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
  };

  const handleSetAvatarId = (id: number) => {
    setAvatarId(id);
  };

  const handleSetGalleryId = (id: number) => {
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

        {/* Preview ảnh đại diện */}
        <div className="flex flex-col gap-[8px]">
          <h4 className="text-[14px]">Ảnh đại diện</h4>
          <div className="flex items-center gap-[10px]">
            <UploadCustom setId={handleSetAvatarId} />
          </div>
        </div>
        {product?.attributes?.avatar?.data?.id === avatarId && (
          <div className="relative w-[100px] h-[100px] flex items-center justify-center group">
            <Image
              src={`${baseUrl}${product?.attributes?.avatar?.data?.attributes?.url}`}
              alt="avatar"
              preview={false}
            />
            <button
              className="absolute top-0 right-0 text-white bg-red-500 rounded-full size-[20px] text-[12px] group-hover:opacity-100 opacity-0 group-hover:duration-300 transition-all"
              onClick={handleRemoveAvatar}
              type="button"
            >
              <DeleteOutlined />
            </button>
          </div>
        )}

        {/* Preview bộ sưu tập ảnh */}
        {avatarIds.length > 0 && (
          <div className="flex flex-col gap-[8px]">
            <h4 className="text-[14px]">Bộ sưu tập</h4>
            <div className="flex gap-[12px]">
              {avatarIds.map((id) => (
                <div
                  key={id}
                  className="relative w-[100px] h-[100px] flex items-center justify-center group"
                >
                  <Image
                    src={`${baseUrl}${
                      product?.attributes?.gallery?.data?.find(
                        (item) => item.id === id
                      )?.attributes?.url
                    }`}
                    alt="gallery-image"
                    preview={false}
                    className={`${product?.attributes?.gallery?.data?.find((item) => item.id === id)?.attributes?.url ? "block" : "hidden"} other-classes`}
                  />
                  <button
                    className="absolute top-0 right-0 text-white bg-red-500 rounded-full size-[20px] text-[12px] group-hover:opacity-100 opacity-0 group-hover:duration-300 transition-all"
                    onClick={() => handleRemoveGallery(id)}
                    type="button"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>
            <UploadCustom setId={handleSetGalleryId} />
          </div>
        )}

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

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image } from "antd";
import SelectComponent from "../common/SelectCustomConponent";
import InputCustomComponent from "../common/InputCustomComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSeletionRequestType } from "../../types/request/productSeletions";
import { useFetchProducts } from "../../apis/swr/useFetchProducts";
import { productSeletionsApi } from "../../apis/axios/productSeletionsApi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { BaseData } from "../../types/base/baseData";
import { ProductSeletionsType } from "../../types/commom/productSeletions";
import { CiSearch } from "react-icons/ci";
import { ProductType } from "../../types/commom/product";
import baseUrl from "../../types/base/baseUrl";
import { FaTrash } from "react-icons/fa6";
interface ProductSelectionFormProps {
  handleOk: () => void;
  productSelection?: BaseData<ProductSeletionsType>;
}
function ProductSelectionForm({
  handleOk,
  productSelection,
}: ProductSelectionFormProps) {
  const { data } = useFetchProducts();
  const [query, setQuery] = useState<string>("");
  const [filterData, setFilterData] = useState<BaseData<ProductType>[]>([]);
  const [selected, setSelected] = useState<BaseData<ProductType>[]>([]);

  useEffect(() => {
    const filter =
      data?.data?.filter((item) => item?.attributes?.name.includes(query)) ||
      [];
    setFilterData(filter);
  }, [query?.length > 0]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductSeletionRequestType>();

  useEffect(() => {
    setValue("name", productSelection?.attributes?.name || "");
    setValue(
      "is_price_range",
      productSelection?.attributes?.is_price_range ? "true" : "false"
    );
    setSelected(productSelection?.attributes?.products?.data || []);
  }, [productSelection?.id]);
  const handleAddProduct = (product: BaseData<ProductType>) => {
    const check = selected?.some((item) => item?.id === product?.id);
    if (!check) setSelected((prev) => [...prev, product]);
    setQuery("");
  };
  const handleRemoveProduct = (product: BaseData<ProductType>) => {
    const find = selected?.filter((item) => item?.id !== product?.id);
    setSelected(find);
  };
  const onSubmit: SubmitHandler<ProductSeletionRequestType> = async (data) => {
    const newData = {
      ...data,
      products: selected?.map((item) => item?.id) || [],
      is_price_range: data?.is_price_range === "true",
    };
    if (productSelection?.id) {
      await productSeletionsApi
        .update(newData, productSelection?.id)
        .then((res) => {
          if (res) {
            toast.success("Lưu thành công");
            handleOk();
          }
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px]"
    >
      <InputCustomComponent
        control={control}
        label="Tên tiêu chí"
        placeholder="Tên tiêu chí"
        name="name"
        isRequired
        errors={errors.name}
      />
      <SelectComponent
        containerClasName="w-full"
        control={control}
        label="Loại tiêu chí"
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

      <div className="flex flex-col gap-[12px] min-h-[300px] relative">
        <h3 className="font-semibold">Sản phẩm (Nhập để tìm)</h3>
        <div className="flex items-center gap-[10px] border p-[10px] rounded-[4px]">
          <input
            placeholder="Nhập sản phẩm cần tìm"
            className="flex-1 focus-within:outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CiSearch />
        </div>
        {query?.length > 0 && (
          <div className="flex flex-col gap-[24px] absolute top-[30%] border shadow-md rounded-[10px] left-0 right-0 p-[10px] bg-white z-10">
            {filterData?.length > 0 &&
              filterData?.map((item, index) => (
                <div
                  className="flex items-center gap-[10px] cursor-pointer hover:bg-[#f1f1f1]"
                  key={index}
                  onClick={() => handleAddProduct(item)}
                >
                  <div className="size-[50px] overflow-hidden">
                    <Image
                      src={`${baseUrl}${item?.attributes?.avatar?.data?.attributes?.url}`}
                      alt="image"
                      preview={false}
                    />
                  </div>
                  <p>{item?.attributes?.name}</p>
                </div>
              ))}
          </div>
        )}
        <div className="flex flex-col gap-[10px]">
          {selected?.length > 0 &&
            selected.map((item, index) => (
              <div
                key={index}
                className="bg-[#f1f1f1] flex items-center gap-[10px] w-fit rounded-[10px] border p-[10px]"
              >
                {/* <div className="size-[50px] overflow-hidden">
                  <Image
                    src={`${baseUrl}${item?.attributes?.avatar?.data?.attributes?.url}`}
                    alt="image"
                    preview={false}
                  />
                </div> */}
                <p>{item.attributes?.name}</p>
                <button
                  className="text-red-600"
                  onClick={() => handleRemoveProduct(item)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
        </div>
      </div>
      <Button htmlType="submit" type="primary" className="h-[40px]">
        Lưu
      </Button>
    </form>
  );
}

export default ProductSelectionForm;

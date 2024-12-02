/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Image, Modal, Table } from "antd";
import { useFetchProducts } from "../../apis/swr/useFetchProducts";
import { ProductType } from "../../types/commom/product";
import baseUrl from "../../types/base/baseUrl";
import { BaseData } from "../../types/base/baseData";
import { useMemo, useState } from "react";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../utils/functions/filterBaseData";
import SearchCustom from "../../components/common/SearchCustom";
import ProductForm from "../../components/Form/ProductForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { productApi } from "../../apis/axios/product";
import { toast } from "sonner";

function Products() {
  const { data, mutate } = useFetchProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [product, setProduct] = useState<BaseData<ProductType>>();

  const filterFields: NestedFieldPath[] = [
    "product_code",
    "name",
    "price",
    "promotion_price",
  ];

  const filteredData = useMemo(() => {
    return data ? filterDataByNestedField(data?.data, query, filterFields) : [];
  }, [data, query, filterFields]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    mutate();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: ["attributes", "product_code"],
      key: "product_code",
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      render: (_: any, record: BaseData<ProductType>) => (
        <div className="flex gap-[12px] items-center">
          <Avatar
            src={`${baseUrl}${record?.attributes?.avatar?.data?.attributes?.url}`}
            alt="avatar"
            size={50}
          />
          <span>{record?.attributes?.name}</span>
        </div>
      ),
    },
    {
      title: "Bộ sưu tập",
      key: "attributes",
      render: (_: any, record: BaseData<ProductType>) => (
        <>
          {record?.attributes?.gallery?.data?.length > 0 ? (
            record?.attributes?.gallery?.data
              ?.slice(0, 1)
              ?.map((item, index) => (
                <div className="flex items-center gap-[12px]">
                  <Image
                    src={`${baseUrl}${item?.attributes?.url}`}
                    alt="avatar"
                    width={40}
                    key={index}
                  />
                  <span>
                    +{record?.attributes?.gallery?.data?.length - 1} ảnh
                  </span>
                </div>
              ))
          ) : (
            <p>-</p>
          )}
        </>
      ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: ["attributes", "price"],
      key: "price",
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: ["attributes", "promotion_price"],
      key: "price",
    },
    {
      title: "Đánh giá",
      dataIndex: ["attributes", "rating"],
      key: "rating",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<ProductType>) => (
        <div className="flex gap-[8px]">
          <button
            className="text-blue-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
            <p>Sửa</p>
          </button>
          <button
            className="text-red-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleDelete(record)}
          >
            <DeleteOutlined />
            <p>Xóa</p>
          </button>
        </div>
      ),
    },
  ];
  const handleEdit = (record: BaseData<ProductType>) => {
    setIsEdit(true);
    setProduct(record);
    showModal();
  };

  const handleDelete = async (record: BaseData<ProductType>) => {
    await productApi
      .delete(record?.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
  };

  return (
    <>
      <div className="p-[10px] flex flex-col gap-[24px]">
        <h2 className="text-[20px] font-bold">Danh sách sản phẩm</h2>
        <div className="flex justify-between">
          <div>
            <SearchCustom
              setValue={setQuery}
              value={query}
              className="w-[300px]"
            />
          </div>
          <Button
            className="w-[200px] h-[30px]"
            type="primary"
            onClick={showModal}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Table dataSource={filteredData} columns={columns} />
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <ProductForm handleOk={handleOk} product={product} isEdit={isEdit} />
      </Modal>
    </>
  );
}

export default Products;

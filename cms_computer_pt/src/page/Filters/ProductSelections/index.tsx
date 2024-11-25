/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Table, Tag } from "antd";

import { formatDate } from "../../../utils/functions/formatDate";
import { useFetchProductSelection } from "../../../apis/swr/useFetchProductSelection";
import { BaseData } from "../../../types/base/baseData";
import { ProductType } from "../../../types/commom/product";
import { ProductSeletionsType } from "../../../types/commom/productSeletions";
import { useMemo, useState } from "react";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../../utils/functions/filterBaseData";
import SearchCustom from "../../../components/common/SearchCustom";
import ProductSelectionForm from "../../../components/Form/ProductSelectionsFrom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { productSeletionsApi } from "../../../apis/axios/productSeletionsApi";
import { toast } from "sonner";

function ProductSelection() {
  const { data, mutate } = useFetchProductSelection();
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<BaseData<ProductSeletionsType>>();

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
  const filterFields: NestedFieldPath[] = ["name"];

  const filteredData = useMemo(() => {
    return data ? filterDataByNestedField(data?.data, query, filterFields) : [];
  }, [data, query, filterFields]);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: ["attributes", "name"],
      key: "name",
    },
    {
      title: "Loại danh mục",
      dataIndex: ["attributes", "is_price_range"],
      key: "name",
      render: (text: boolean) => (
        <Tag color={text ? "green" : "blue"}>
          {text ? "Khoảng giá" : "Tiêu chí"}
        </Tag>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: ["attributes", "products", "data"],
      key: "products",
      render: (products: BaseData<ProductType>[]) => (
        <div className="flex flex-col gap-[8px]">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="mb-2">
                <strong>{item.attributes.name}</strong>{" "}
                {/* Display product name */}
                <p>Mã sản phẩm: {item.attributes.product_code}</p>{" "}
              </div>
            ))
          ) : (
            <p>Không có sản phẩm</p> // Show message if no products
          )}
        </div>
      ),
    },

    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: BaseData<ProductSeletionsType>) => {
        const day = record?.attributes?.createdAt;
        return <p>{day ? formatDate(day) : "N/A"}</p>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<ProductSeletionsType>) => (
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
  const handleDelete = async (record: BaseData<ProductSeletionsType>) => {
    await productSeletionsApi
      .delete(record.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
  };
  const handleEdit = (record: BaseData<ProductSeletionsType>) => {
    setEditData(record);
    showModal();
  };
  return (
    <>
      <div className="p-[10px] flex flex-col gap-[24px]">
        <h2 className="text-[20px] font-bold">
          Danh sách danh mục sản phẩm được chọn
        </h2>
        <div className="flex items-center justify-between">
          <SearchCustom
            setValue={setQuery}
            value={query}
            className="w-[300px]"
          />
          <Button
            className="w-[200px] h-[30px]"
            type="primary"
            onClick={showModal}
          >
            Thêm danh mục
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
        <ProductSelectionForm handleOk={handleOk} productSelection={editData} />
      </Modal>
    </>
  );
}

export default ProductSelection;

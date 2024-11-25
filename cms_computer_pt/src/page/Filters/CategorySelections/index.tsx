/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Table } from "antd";

import { formatDate } from "../../../utils/functions/formatDate";
import { BaseData } from "../../../types/base/baseData";
import { useMemo, useState } from "react";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../../utils/functions/filterBaseData";
import SearchCustom from "../../../components/common/SearchCustom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useFetchCategoriesSelections } from "../../../apis/swr/useFetchCategoriesSelections";
import { CategorySelectionsType } from "../../../types/commom/categorySelections";
import { categorySelectionsApi } from "../../../apis/axios/categorySelections";
import CategorySelectionsForm from "../../../components/Form/CategorySelectionsForm";

function CategoriesSelections() {
  const { data, mutate } = useFetchCategoriesSelections();
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<BaseData<CategorySelectionsType>>();

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
      title: "Tên danh mục sản phẩm",
      key: "name",
      render: (record: BaseData<CategorySelectionsType>) => (
        <p>{record?.attributes?.name}</p>
      ),
    },
    {
      title: "Danh mục sản phẩm",
      key: "product_seletions",
      render: (product_seletions: BaseData<CategorySelectionsType>) => (
        <div className="flex flex-col gap-[8px]">
          {product_seletions?.attributes?.product_seletions?.data?.length >
          0 ? (
            product_seletions?.attributes?.product_seletions?.data?.map(
              (item, index) => <p key={index}>{item?.attributes?.name}</p>
            )
          ) : (
            <p>Không có danh mục</p>
          )}
        </div>
      ),
    },

    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: BaseData<CategorySelectionsType>) => {
        const day = record?.attributes?.createdAt;
        return <p>{day ? formatDate(day) : "N/A"}</p>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<CategorySelectionsType>) => (
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
  const handleDelete = async (record: BaseData<CategorySelectionsType>) => {
    await categorySelectionsApi
      .delete(record.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
  };
  const handleEdit = (record: BaseData<CategorySelectionsType>) => {
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
        <CategorySelectionsForm
          handleOk={handleOk}
          category_selections={editData}
        />
      </Modal>
    </>
  );
}

export default CategoriesSelections;

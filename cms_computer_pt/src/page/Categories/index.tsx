/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table, Tag } from "antd";
import { useFetchCategories } from "../../apis/swr/useFetchCategories";
import { BaseData } from "../../types/base/baseData";
import { CategoriesType } from "../../types/commom/categories";
import { useMemo, useState } from "react";
import CategoriesForm from "../../components/Form/CategoriesForm";
import { categoriesApi } from "../../apis/axios/categories";
import { toast } from "sonner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../utils/functions/filterBaseData";
import SearchCustom from "../../components/common/SearchCustom";

function Categories() {
  const { data, mutate } = useFetchCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<BaseData<CategoriesType>>();
  const [query, setQuery] = useState<string>("");

  const filterFields: NestedFieldPath[] = ["name", "level"];

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
      title: "Tên danh mục",
      dataIndex: ["attributes", "name"],
      key: "name",
    },
    {
      title: "Cấp danh mục",
      dataIndex: ["attributes", "level"],
      key: "level",
    },
    {
      title: "Danh mục con",
      dataIndex: ["attributes", "child"],
      key: "child",
      render: (_: any, record: BaseData<CategoriesType>) => (
        <div className="flex flex-col gap-[4px]">
          {record?.attributes?.chid?.data?.length > 0 ? (
            record?.attributes?.chid?.data?.map((item, index) => (
              <Tag key={index} color="green" className="w-fit">
                {item?.attributes?.name}
              </Tag>
            ))
          ) : (
            <p>-</p>
          )}
        </div>
      ),
    },
    {
      title: "Danh mục cha",
      dataIndex: ["attributes", "parent"],
      key: "parent",
      render: (_: any, record: BaseData<CategoriesType>) => (
        <div className="flex gap-[4px] items-center">
          {record?.attributes?.parent?.data ? (
            <p>{record?.attributes?.parent?.data?.attributes?.name}</p>
          ) : (
            <p>-</p>
          )}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<CategoriesType>) => (
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
  const handleEdit = (record: BaseData<CategoriesType>) => {
    setIsEdit(true);
    setCategory(record);
    showModal();
  };

  const handleDelete = async (record: BaseData<CategoriesType>) => {
    await categoriesApi
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
        <h2 className="text-[20px] font-bold">Danh sách danh mục sản phẩm</h2>
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
            Thêm danh mục
          </Button>
        </div>
        <Table dataSource={filteredData} columns={columns} />
      </div>
      <Modal
        title="Danh mục sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <CategoriesForm
          isEdit={isEdit}
          category={category || null}
          categories={data?.data || []}
          onMutate={handleOk}
        />
      </Modal>
    </>
  );
}

export default Categories;

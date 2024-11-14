/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import { useFetchBlogCategories } from "../../apis/swr/useFetchBlogCategories";
import { useEffect, useState } from "react";
import InputCustomComponent from "../../components/common/InputCustomComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { BlogCategoryType } from "../../types/commom/blog";
import { blogCategoriesAPi } from "../../apis/axios/blogCategoriesApi";
import { toast } from "sonner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BaseData } from "../../types/base/baseData";

function BlogCategories() {
  const { data, mutate } = useFetchBlogCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<BaseData<BlogCategoryType>>();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogCategoryType>();
  useEffect(() => {
    if (category) {
      setValue("name", category?.attributes?.name);
    }
  }, [category?.id]);
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
      title: "Đường dẫn",
      dataIndex: ["attributes", "slug"],
      key: "slug",
      render: (text: string) => <p>{text ? text : "-"}</p>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<BlogCategoryType>) => (
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

  const handleEdit = (record: BaseData<BlogCategoryType>) => {
    setIsEdit(true);
    setCategory(record);
    showModal();
  };

  const handleDelete = async (record: BaseData<BlogCategoryType>) => {
    await blogCategoriesAPi
      .delete(record?.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
  };

  const onSubmit: SubmitHandler<BlogCategoryType> = async (data) => {
    if (isEdit && category) {
      await blogCategoriesAPi
        .update(data, category?.id)
        .then(() => {
          toast.success("Lưu thành công");
          reset();
          handleOk();
        })
        .catch(() => toast.error("Lưu thất bại"));
    } else {
      await blogCategoriesAPi
        .create(data)
        .then(() => {
          toast.success("Lưu thành công");
          reset();
          handleOk();
        })
        .catch(() => toast.error("Lưu thất bại"));
    }
  };
  return (
    <>
      <div className="p-[10px]">
        <h2 className="text-[20px] font-bold">Danh sách danh mục sản phẩm</h2>
        <div className="flex justify-between">
          <div></div>
          <Button
            className="w-[200px] h-[30px]"
            type="primary"
            onClick={showModal}
          >
            Thêm danh mục
          </Button>
        </div>
        <Table dataSource={data?.data} columns={columns} />
      </div>
      <Modal
        title="Danh mục bài viết"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
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
          <Button htmlType="submit" type="primary" className="h-[40px]">
            Lưu
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default BlogCategories;

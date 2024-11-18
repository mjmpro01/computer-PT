/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { BlogCategoryType } from "../../types/commom/blog";
import { blogCategoriesAPi } from "../../apis/axios/blogCategoriesApi";
import { toast } from "sonner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BaseData } from "../../types/base/baseData";
import { useFetchBlog } from "../../apis/swr/useFetchBlog";
import BlogForm from "../../components/Form/BlogForm";
import { useFetchBlogCategories } from "../../apis/swr/useFetchBlogCategories";
import { blogApi } from "../../apis/axios/blogApi";

function Blog() {
  const { data: dataBlog, mutate } = useFetchBlog();
  const { data: dataCate } = useFetchBlogCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      title: "Tiêu đề bài viết",
      dataIndex: ["attributes", "title"],
      key: "name",
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: ["attributes", "title"],
      key: "name",
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
    showModal();
  };

  const handleDelete = async (record: BaseData<BlogCategoryType>) => {
    await blogApi
      .delete(record?.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
  };

  return (
    <>
      <div className="p-[10px]">
        <h2 className="text-[20px] font-bold">Danh sách bài viết</h2>
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
        <Table dataSource={dataBlog?.data} columns={columns} />
      </div>
      <Modal
        title="Danh mục bài viết"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <BlogForm
          onMutate={mutate}
          categories={dataCate?.data || []}
          category={null}
          isEdit={false}
        />
      </Modal>
    </>
  );
}

export default Blog;

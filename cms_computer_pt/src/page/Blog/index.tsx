/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Button, Image, Modal, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFetchBlog } from "../../apis/swr/useFetchBlog";
import { useFetchBlogCategories } from "../../apis/swr/useFetchBlogCategories";
import BlogForm from "../../components/Form/BlogForm";
import { blogApi } from "../../apis/axios/blogApi";
import { toast } from "sonner";
import { BaseData } from "../../types/base/baseData";
import { BlogType } from "../../types/commom/blog";
import baseUrl from "../../types/base/baseUrl";
import SearchCustom from "../../components/common/SearchCustom";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../utils/functions/filterBaseData";

function Blog() {
  const { data: dataBlog, mutate } = useFetchBlog();
  const { data: dataCate } = useFetchBlogCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<BaseData<BlogType> | null>(null);
  const [query, setQuery] = useState<string>("");

  const filterFields: NestedFieldPath[] = [
    "title",
    "content",
    ["blog_category", "name"],
  ];

  const filteredData = useMemo(() => {
    return dataBlog
      ? filterDataByNestedField(dataBlog?.data, query, filterFields)
      : [];
  }, [dataBlog, query, filterFields]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null); // Clear edit data on close
  };

  const handleEdit = (record: BaseData<BlogType>) => {
    setEditData(record); // Set the data to be edited
    showModal();
  };

  const handleDelete = async (record: BaseData<BlogType>) => {
    await blogApi
      .delete(record.id)
      .then(() => {
        toast.success("Xóa thành công");
        mutate();
      })
      .catch(() => toast.error("Xóa thất bại"));
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
      key: "title",
    },
    {
      title: "Ảnh bài viết",
      key: "avatar",
      render: (record: BaseData<BlogType>) => {
        const imageUrl = `${baseUrl}${record.attributes.avatar.data.attributes.url}`;
        return (
          <Image
            src={imageUrl}
            alt="Avatar"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        );
      },
    },
    {
      title: "Danh mục",
      key: "category",
      render: (record: BaseData<BlogType>) => (
        <p>{record.attributes.blog_category?.data?.attributes?.name || ""}</p>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<BlogType>) => (
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

  return (
    <div className="p-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-bold">Danh sách bài viết</h2>
      <div className="flex justify-between">
        <div>
          <SearchCustom
            setValue={setQuery}
            value={query}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <Button
            className="w-[150px] h-[40px]"
            type="primary"
            onClick={() => window.location.reload()}
          >
            Làm mới
          </Button>
          <Button
            className="w-[150px] h-[40px]"
            type="primary"
            onClick={showModal}
          >
            Thêm bài viết
          </Button>
        </div>
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Modal
        title={editData ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={900}
      >
        <BlogForm
          onMutate={mutate}
          categories={dataCate?.data || []}
          category={editData?.attributes?.blog_category || null}
          isEdit={!!editData}
          editData={editData}
        />
      </Modal>
    </div>
  );
}

export default Blog;

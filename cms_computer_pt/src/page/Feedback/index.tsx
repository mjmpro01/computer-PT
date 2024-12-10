/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Tag } from "antd";
import { useMemo, useState } from "react";

import { useFetchFeedBacks } from "../../apis/swr/useFetchFeedbacks";
import { BaseData } from "../../types/base/baseData";
import { formatDate } from "../../utils/functions/formatDate";
import SearchCustom from "../../components/common/SearchCustom";
import { FeedbackType } from "../../types/commom/feedback";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../utils/functions/filterBaseData";
import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { feedbackApi } from "../../apis/axios/feedbacks";
import { toast } from "sonner";

function Feedbacks() {
  const { data, mutate } = useFetchFeedBacks();
  const [query, setQuery] = useState<string>("");

  const filterFields: NestedFieldPath[] = [
    "comment",
    "rating",
    ["user", "fullname"],
  ];

  const filteredData = useMemo(() => {
    return data ? filterDataByNestedField(data.data, query, filterFields) : [];
  }, [data, query, filterFields]);

  const columns = [
    {
      title: "Người dùng",
      key: "user",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record.attributes.user.data.attributes.fullname}</p>
      ),
    },
    {
      title: "Chất lượng",
      key: "rating",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record.attributes.rating}/5</p>
      ),
    },
    {
      title: "Bình luận",
      key: "comment",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record.attributes.comment}</p>
      ),
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record.attributes.product.data.attributes.name}</p>
      ),
    },
    {
      title: "Trạng thái",
      key: "is_deleted",
      render: (record: BaseData<FeedbackType>) => (
        <Tag color={record.attributes.is_deleted ? "red" : "green"}>
          {record.attributes.is_deleted !== null && record.attributes.is_deleted
            ? "Đã ẩn"
            : "Đang hiển thị"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: BaseData<FeedbackType>) => (
        <p>{formatDate(record.attributes.createdAt)}</p>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<FeedbackType>) => (
        <div className="flex gap-[8px]">
          <button
            className="text-blue-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleHide(record)}
          >
            <EyeInvisibleOutlined />
            <p>
              {record?.attributes?.is_deleted
                ? "Hiển thị bình luận"
                : "Ẩn bình luận"}
            </p>
          </button>
          <button
            className="text-red-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleDelete(record?.id)}
          >
            <DeleteOutlined />
            <p>Xóa</p>
          </button>
        </div>
      ),
    },
  ];
  const handleHide = async (record: BaseData<FeedbackType>) => {
    const newData = {
      is_deleted: record?.attributes?.is_deleted ? false : true,
    };
    await feedbackApi.hide(newData, record?.id).then((res) => {
      if (res) {
        toast.success("Ẩn bình luận thành công");
        mutate();
      } else {
        toast.error("Ẩn bình luận thất bại");
      }
    });
  };

  const handleDelete = async (id: number) => {
    await feedbackApi.delete(id).then((res) => {
      if (res) {
        toast.success("Ẩn bình luận thành công");
        mutate();
      } else {
        toast.error("Ẩn bình luận thất bại");
      }
    });
  };
  return (
    <div className="p-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-bold">Danh sách feedback</h2>
      <SearchCustom
        setValue={setQuery}
        value={query}
        className="max-w-[300px]"
      />
      <Table dataSource={filteredData} columns={columns} />
    </div>
  );
}

export default Feedbacks;

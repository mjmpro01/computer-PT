/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "antd";
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

function Feedbacks() {
  const { data } = useFetchFeedBacks();
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
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: BaseData<FeedbackType>) => (
        <p>{formatDate(record.attributes.createdAt)}</p>
      ),
    },
  ];

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

import { Table } from "antd";
import { useFetchFeedBacks } from "../../apis/swr/useFetchFeedbacks";
import { BaseData } from "../../types/base/baseData";
import { FeedbackType } from "../../types/commom/feedback";
import { formatDate } from "../../utils/functions/formatDate";

function Feedbacks() {
  const { data } = useFetchFeedBacks();

  console.log(data?.data);
  const columns = [
    {
      title: "Người dùng",
      key: "name",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record?.attributes.user.data.attributes.fullname}</p>
      ),
    },
    {
      title: "Chất lượng",
      key: "name",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record?.attributes?.rating}/5</p>
      ),
    },
    {
      title: "Chất lượng",
      key: "name",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record?.attributes?.comment}</p>
      ),
    },
    {
      title: "Sản phẩm",
      key: "name",
      render: (record: BaseData<FeedbackType>) => (
        <p>{record?.attributes?.product?.data?.attributes?.name}</p>
      ),
    },
    {
      title: "Ngày tạo",
      key: "name",
      render: (record: BaseData<FeedbackType>) => (
        <p>{formatDate(record?.attributes?.createdAt)}</p>
      ),
    },
  ];
  return (
    <div className="p-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-bold">Danh sách feedback</h2>
      <div className="flex justify-between">
        <div></div>
      </div>
      <Table dataSource={data?.data} columns={columns} />;
    </div>
  );
}

export default Feedbacks;

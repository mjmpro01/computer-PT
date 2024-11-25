import { Table } from "antd";

import { useFetchUser } from "../../apis/swr/useFetchUser";
import { formatDate } from "../../utils/functions/formatDate";
import { UserType } from "../../types/commom/user";

function Customers() {
  const { data } = useFetchUser();
  console.log(data);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: UserType) => {
        const day = record?.createdAt;
        return <p>{day ? formatDate(day) : "N/A"}</p>;
      },
    },
  ];
  return (
    <div className="p-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-bold">Danh sách khách hàng</h2>

      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Customers;

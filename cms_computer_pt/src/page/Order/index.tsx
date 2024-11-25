/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Tag } from "antd";
import { BaseData } from "../../types/base/baseData";
import { FeedbackType } from "../../types/commom/feedback";
import { formatDate } from "../../utils/functions/formatDate";
import { useFetchOrders } from "../../apis/swr/useFetchOrders";
import { OrdersType } from "../../types/commom/orders";
import { formatMoney } from "../../utils/functions/formatMoney";
import {
  filterDataByNestedField,
  NestedFieldPath,
} from "../../utils/functions/filterBaseData";
import { useMemo, useState } from "react";
import SearchCustom from "../../components/common/SearchCustom";

function Orders() {
  const { data } = useFetchOrders();
  const [query, setQuery] = useState<string>("");

  const filterFields: NestedFieldPath[] = [
    "order_code",
    "customer_email",
    "customer_full_name",
    "customer_phone",
    "shipping_address",
    "payment_method",
    "shipping_method",
  ];

  const filteredData = useMemo(() => {
    return data ? filterDataByNestedField(data.data, query, filterFields) : [];
  }, [data, query, filterFields]);
  const columns = [
    {
      title: "Mã đơn hàng",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.order_code}</p>
      ),
    },
    {
      title: "Email",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.customer_email}</p>
      ),
    },
    {
      title: "Họ và tên",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.customer_full_name}</p>
      ),
    },
    {
      title: "Số điện thoại",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.customer_phone}</p>
      ),
    },
    {
      title: "Địa chỉ giao",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.shipping_address}</p>
      ),
    },
    {
      title: "Phương thức thanh toán",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.payment_method}</p>
      ),
    },
    {
      title: "Phương thức giao hàng",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{record?.attributes?.shipping_method}</p>
      ),
    },
    {
      title: "Trạng thái",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <Tag color="green">{record?.attributes?.status}</Tag>
      ),
    },
    {
      title: "Phí giao hàng",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{formatMoney(Number(record?.attributes?.transport_fee))}</p>
      ),
    },
    {
      title: "Tổng tiền",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <p>{formatMoney(Number(record?.attributes?.total))}</p>
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
      <h2 className="text-[20px] font-bold">Danh sách đơn hàng</h2>
      <SearchCustom
        setValue={setQuery}
        value={query}
        className="max-w-[300px]"
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        scroll={{ x: "max-content" }}
      />
      ;
    </div>
  );
}

export default Orders;

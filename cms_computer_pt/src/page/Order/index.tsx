/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Image, Modal, Table, Tag } from "antd";
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
import OrderForm from "../../components/Form/OrderForm";
import { EditOutlined } from "@ant-design/icons";
import baseUrl from "../../types/base/baseUrl";

function Orders() {
  const { data, mutate } = useFetchOrders();
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<BaseData<OrdersType>>();

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
  const statusColors: { [key: string]: string } = {
    "Chờ xác nhận": "blue",
    "Xác nhận": "cyan",
    "Đang xử lý": "orange",
    "Đang giao hàng": "gold",
    "Giao hàng thành công": "green",
    Hủy: "red",
  };
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
      title: "Sản phẩm",
      key: "name",
      render: (record: BaseData<OrdersType>) => (
        <div className="flex flex-col gap-[12px]">
          {record?.attributes?.order_details?.data?.map((item, index) => {
            const avatarUrl =
              item?.attributes?.product?.data?.attributes?.avatar?.data
                ?.attributes?.url;
            const productName =
              item?.attributes?.product?.data?.attributes?.name;

            if (!avatarUrl || !productName) return null;

            return (
              <div className="flex items-center gap-[8px]" key={index}>
                <Image
                  src={`${baseUrl}${avatarUrl}`}
                  alt={productName}
                  width={50}
                  height={50}
                />
                <p>{productName}</p>
              </div>
            );
          })}
        </div>
      ),
    },

    {
      title: "Trạng thái",
      key: "status",
      render: (record: BaseData<OrdersType>) => {
        const status = record?.attributes?.status;
        const color = statusColors[status] || "default";
        return <Tag color={color}>{status}</Tag>;
      },
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
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: BaseData<OrdersType>) => (
        <div className="flex gap-[8px]">
          <button
            className="text-blue-500 hover:underline flex items-center gap-[4px]"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
            <p>Sửa</p>
          </button>
        </div>
      ),
    },
  ];
  const handleEdit = (record: BaseData<OrdersType>) => {
    setEditData(record);
    showModal();
  };
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
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {editData && <OrderForm order={editData} mutate={handleOk} />}
      </Modal>
    </div>
  );
}

export default Orders;

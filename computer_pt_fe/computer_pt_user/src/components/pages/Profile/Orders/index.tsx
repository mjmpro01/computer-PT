import { Tabs, TabsProps } from "antd";
import OrderItem from "../OrderItem";
import { useEffect, useState } from "react";
import orderApi from "@/api/orderApi";
import { getUserProfile } from "@/utils/functions/getUser";
import { BaseData } from "@/types/base/baseData";
import { OrderType } from "@/types/reponse/order";

function Orders() {
  const [orders, setOrders] = useState<BaseData<OrderType>[]>([]);
  const [status, setStatus] = useState<string>("all");
  const profile = getUserProfile();

  const onChange = (key: string) => {
    setStatus(key);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await orderApi
        .getAll(profile?.id, status)
        .then((res) => {
          if (res) {
            setOrders(res?.data);
          }
        })
        .catch((errors) => console.log(errors));
    };
    fetchOrders();
  }, [profile?.id, status]);
  const ListOrder = () => {
    return (
      <div className="flex flex-col gap-[1.2rem]">
        {orders?.length > 0 &&
          [...orders]
            .reverse()
            .map((order, index) => <OrderItem order={order} key={index} />)}
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả",
      children: <ListOrder />,
    },
    {
      key: "Chờ xác nhận",
      label: "Chờ xác nhận",
      children: <ListOrder />,
    },
    {
      key: "Xác nhận",
      label: "Xác nhận",
      children: <ListOrder />,
    },
    {
      key: "Đang xử lý",
      label: "Đang xử lý",
      children: <ListOrder />,
    },
    {
      key: "Đang giao hàng",
      label: "Đang giao hàng",
      children: <ListOrder />,
    },
    {
      key: "Giao hàng thành công",
      label: "Giao hàng thành công",
      children: <ListOrder />,
    },
    {
      key: "Huỷ",
      label: "Huỷ",
      children: <ListOrder />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Orders;

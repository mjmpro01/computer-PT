import { Avatar, Button, Image, Modal, Table } from "antd";
import { useFetchProducts } from "../../apis/swr/useFetchProducts";
import { ProductType } from "../../types/commom/product";
import baseUrl from "../../types/base/baseUrl";
import { BaseData } from "../../types/base/baseData";
import { useState } from "react";

function Products() {
  const { data } = useFetchProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: ["attributes", "product_code"],
      key: "product_code",
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      render: (_: any, record: BaseData<ProductType>) => (
        <div className="flex gap-[12px] items-center">
          <Avatar
            src={`${baseUrl}${record?.attributes?.avatar?.data?.attributes?.url}`}
            alt="avatar"
            size={50}
          />
          <span>{record?.attributes?.name}</span>
        </div>
      ),
    },
    {
      title: "Bộ sưu tập",
      key: "attributes",
      render: (_: any, record: BaseData<ProductType>) => (
        <>
          {record?.attributes?.gallery?.data?.length > 0 ? (
            record?.attributes?.gallery?.data
              ?.slice(0, 1)
              ?.map((item, index) => (
                <div className="flex items-center gap-[12px]">
                  <Image
                    src={`${baseUrl}${item?.attributes?.url}`}
                    alt="avatar"
                    width={40}
                    key={index}
                  />
                  <span>
                    +{record?.attributes?.gallery?.data?.length - 1} ảnh
                  </span>
                </div>
              ))
          ) : (
            <p>-</p>
          )}
        </>
      ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: ["attributes", "price"],
      key: "price",
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: ["attributes", "promotion_price"],
      key: "price",
    },
    {
      title: "Đánh giá",
      dataIndex: ["attributes", "rating"],
      key: "rating",
    },
  ];

  return (
    <>
      <div className="p-[10px] flex flex-col gap-[24px]">
        <h2 className="text-[20px] font-bold">Danh sách sản phẩm</h2>
        <div className="flex justify-between">
          <div></div>
          <Button
            className="w-[200px] h-[30px]"
            type="primary"
            onClick={showModal}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Table
          dataSource={data?.data.map((item: any) => ({
            ...item,
            key: item.id,
          }))}
          columns={columns}
        />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Products;

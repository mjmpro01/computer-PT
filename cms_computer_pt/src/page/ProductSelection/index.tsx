import { Table, Tag } from "antd";

import { formatDate } from "../../utils/functions/formatDate";
import { useFetchProductSelection } from "../../apis/swr/useFetchProductSelection";
import { BaseData } from "../../types/base/baseData";
import { ProductType } from "../../types/commom/product";
import { ProductSeletionsType } from "../../types/commom/productSeletions";

function ProductSelection() {
  const { data } = useFetchProductSelection();
  console.log(data);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: ["attributes", "name"],
      key: "name",
    },
    {
      title: "Loại danh mục",
      dataIndex: ["attributes", "is_price_range"],
      key: "name",
      render: (text: boolean) => (
        <Tag color={text ? "green" : "blue"}>
          {text ? "Khoảng giá" : "Tiêu chí"}
        </Tag>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: ["attributes", "products", "data"],
      key: "products",
      render: (products: BaseData<ProductType>[]) => (
        <div className="flex flex-col gap-[8px]">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="mb-2">
                <strong>{item.attributes.name}</strong>{" "}
                {/* Display product name */}
                <p>Mã sản phẩm: {item.attributes.product_code}</p>{" "}
              </div>
            ))
          ) : (
            <p>Không có sản phẩm</p> // Show message if no products
          )}
        </div>
      ),
    },

    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (record: BaseData<ProductSeletionsType>) => {
        const day = record?.attributes?.createdAt;
        return <p>{day ? formatDate(day) : "N/A"}</p>;
      },
    },
  ];
  return (
    <div className="p-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-bold">Danh sách danh mục</h2>

      <Table dataSource={data?.data} columns={columns} />
    </div>
  );
}

export default ProductSelection;
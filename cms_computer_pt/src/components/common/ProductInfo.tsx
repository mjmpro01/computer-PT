import { Avatar } from "antd";
import { BaseData } from "../../types/base/baseData";
import { ProductType } from "../../types/commom/product";
import baseUrl from "../../types/base/baseUrl";

interface ProductInfoProps {
  product: BaseData<ProductType>;
}
function ProductInfo({ product }: ProductInfoProps) {
  console.log(product);
  return (
    <div className="flex items-center gap-[4px]">
      <Avatar
        src={`${baseUrl}${product?.attributes?.avatar?.data?.attributes?.url}`}
        size={50}
      />
      <span className="w-[200px] truncate">{product?.attributes?.name}</span>
    </div>
  );
}

export default ProductInfo;

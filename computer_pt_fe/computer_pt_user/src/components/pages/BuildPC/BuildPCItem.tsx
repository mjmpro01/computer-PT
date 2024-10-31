import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { ProductType } from "@/types/common/product";
import { formatMoney } from "@/utils/functions/formatMoney";
import { Button, Image } from "antd";

interface BuildPCItemProps {
  product: BaseData<ProductType>;
  onAdd: () => void;
}
function BuildPCItem({ product, onAdd }: BuildPCItemProps) {
  const promotionPrice = Number(product?.attributes?.promotion_price);
  const price = Number(product?.attributes?.price);
  return (
    <div className="flex items-center gap-[2rem]">
      <div className="w-[10rem] h-[10rem]">
        <Image
          src={`${baseUrl}${product?.attributes?.avatar?.data?.attributes?.url}`}
          alt="product"
          className="w-full h-full object-cover"
          preview={false}
        />
      </div>
      <div className="w-[60%]">
        <h3 className="text-[1.6rem] font-bold truncate">
          {product?.attributes?.name}
        </h3>
        <p className="text-[1.6rem] text-[#1230B0] font-bold">
          {promotionPrice < price && promotionPrice > 0
            ? formatMoney(promotionPrice)
            : formatMoney(price)}
        </p>
        {promotionPrice < price && promotionPrice > 0 && (
          <p className="text-[1.4rem] text-[#999] line-through">
            {formatMoney(price)}
          </p>
        )}
      </div>
      <Button
        type="primary"
        className="bg-[#1230B0] rounded-[0.4rem]"
        onClick={onAdd}
      >
        Thêm vào cấu hình
      </Button>
    </div>
  );
}

export default BuildPCItem;

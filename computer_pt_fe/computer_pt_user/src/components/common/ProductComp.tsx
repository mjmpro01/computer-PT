import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { ProductType } from "@/types/common/product";
import paths from "@/utils/constants/paths";
import { addToCart } from "@/utils/functions/addToCart";
import { formatMoney } from "@/utils/functions/formatMoney";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface ProductCompProps {
  product: BaseData<ProductType>;
}
function ProductComp({ product }: ProductCompProps) {
  const navigate = useNavigate();
  const promotionPrice = Number(product?.attributes?.promotion_price);
  const price = Number(product?.attributes?.price);
  const decreseaPercent =
    promotionPrice > 0
      ? Math.round(((price - promotionPrice) / promotionPrice) * 100)
      : 0;
  const totalAmountDecrease = promotionPrice > 0 ? price - promotionPrice : 0;

  const handleAddToCart = (item: ProductCompProps) => {
    const data = {
      id: item?.product?.id,
      name: item?.product?.attributes?.name,
      price: item?.product?.attributes?.price,
      promotionPrice: item?.product?.attributes?.promotion_price,
      slug: item?.product?.attributes?.slug,
      avatar: item?.product?.attributes?.avatar?.data?.attributes?.url,
      quantity: 1,
    };
    addToCart(data);
    toast.success("Thêm vào giỏ hàng thành công");
  };
  return (
    <div className="h-[35rem] flex flex-col p-[1rem] border rounded-[0.4rem] bg-white">
      <div className="relative h-[50%]">
        <img
          src={`${baseUrl}${product?.attributes?.avatar?.data?.attributes?.url}`}
          alt="image"
          className="h-full w-full object-cover"
        />

        {totalAmountDecrease !== 0 && (
          <div className="absolute p-[0.5rem_1rem] bg-gradient-to-br from-[#aa20ff] to-[#413EFF] z-10 rounded-[0.4rem] bottom-[10%] left-[1%]">
            <p className="text-white text-[1.2rem] font-bold">Tiết kiệm</p>
            <p className="text-white text-[1.2rem] font-bold">
              {formatMoney(totalAmountDecrease)}
            </p>
          </div>
        )}
      </div>
      <div className="flex-grow flex flex-col gap-[0.8rem]">
        {/* <p className="text-[1.4rem] font-medium uppercase text-[#82869e]">
          Lenovo
        </p> */}
        <p
          className="text-[1.2rem] line-clamp-3 text-[#434657] cursor-pointer"
          onClick={() =>
            navigate(`${paths.PRODUCTS}/${product?.attributes?.slug}`)
          }
        >
          {product?.attributes?.name}
        </p>
        <div className="flex flex-col gap-[0.1rem]">
          <p className="text-[1.6rem] font-bold text-[#1435C5]">
            {promotionPrice > 0 && promotionPrice !== price
              ? formatMoney(promotionPrice)
              : formatMoney(price)}
          </p>
          {promotionPrice > 0 && (
            <div className="flex items-center gap-[0.4rem]">
              <p className="text-[1.4rem] text-[#ccc] line-through">
                {formatMoney(price)}
              </p>
              <span className="text-[1.4rem] text-[#1435C5]">
                -{decreseaPercent}%
              </span>
            </div>
          )}
        </div>
      </div>
      <Button
        className="mt-auto w-full h-[4.2rem] text-[#1435C5] border-[#1435C5] rounded-[0.4rem]"
        onClick={() => handleAddToCart({ product })}
      >
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
}

export default ProductComp;

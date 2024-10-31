import icons from "@/assets/icons";
import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { OrderType } from "@/types/reponse/order";
import { formatMoney } from "@/utils/functions/formatMoney";
import { Image } from "antd";

interface OrderItemProps {
  order: BaseData<OrderType>;
}

function OrderItem({ order }: OrderItemProps) {
  const totalAmount = order?.attributes?.order_details?.data?.reduce(
    (total, product) =>
      total +
      Number(product?.attributes?.unit_price) *
        Number(product?.attributes?.quantity),
    0
  );

  return (
    <div className="min-h-[10rem] border rounded-[0.8rem] p-[1rem]">
      <div className="flex justify-between gap-[1rem] pb-[1rem]">
        <div className="flex items-center gap-[0.8rem]">
          <Image src={icons.bag} alt="icon-truck" preview={false} width={20} />
          <p className="text-[1.2rem] text-[#1435C3] font-bold uppercase">
            {order?.attributes?.order_details?.data?.length} sản phẩm
          </p>
        </div>
        <div className="flex items-center gap-[1.2rem]">
          <div className="flex items-center gap-[0.8rem]">
            <Image
              src={icons.truck}
              alt="icon-truck"
              preview={false}
              width={20}
            />
            <p className="text-[1.2rem] text-[#1435C3] font-bold uppercase">
              Giao hàng qua đối tác
            </p>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <Image
              src={icons.box}
              alt="icon-truck"
              preview={false}
              width={20}
            />
            <p className="text-[1.2rem] text-green-600 font-bold uppercase">
              {order?.attributes?.status}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-[1rem] w-[100%]">
          {order?.attributes?.order_details?.data?.length > 0 &&
            order?.attributes?.order_details?.data?.map((product, index) => (
              <div className="flex items-center" key={index}>
                <div className="w-[15%]">
                  <Image
                    src={`${baseUrl}${product?.attributes?.product?.data?.attributes?.avatar?.data?.attributes?.url}`}
                    alt=""
                    preview={false}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[85%]">
                  <h3 className="text-[1.6rem] font-medium truncate">
                    {product?.attributes?.product?.data?.attributes?.name}
                  </h3>
                  <p className="text-[1.4rem] text-[#1435C3] font-bold">
                    {formatMoney(Number(product?.attributes?.unit_price))}
                  </p>
                  <p className="text-[1.4rem] text-[#999]">
                    x{product?.attributes?.quantity}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-end">
          <span className="text-[2rem] font-bold text-[#1435C3]">
            Tổng tiền: {formatMoney(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;

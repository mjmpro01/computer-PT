import { useState } from "react";
import icons from "@/assets/icons";
import FeedbackModal from "@/components/pages/Profile/FeedbackModal";
import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { OrderType } from "@/types/reponse/order";
import { formatMoney } from "@/utils/functions/formatMoney";
import { Button, Image, Modal } from "antd";
import { useFeedbackStore } from "@/stores/useFeedbackStore";
import orderApi from "@/api/orderApi";
import { toast } from "sonner";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Feedback modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Cancel confirmation modal

  const { feedbackIds, addFeedbackId } = useFeedbackStore();

  const isReviewed = feedbackIds.includes(order?.id?.toString());

  const showFeedbackModal = () => {
    setIsModalOpen(true);
  };

  const handleFeedbackOk = () => {
    if (order?.id) {
      addFeedbackId(order.id.toString());
    }
    setIsModalOpen(false);
  };

  const handleFeedbackCancel = () => {
    setIsModalOpen(false);
  };

  // Cancel order modal handlers
  const showCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelOk = async () => {
    setIsCancelModalOpen(false);
    const newData = {
      status: "Huỷ",
    };
    const res = await orderApi.cancel(order?.id, newData);
    if (res) {
      toast.success("Hủy đơn hàng thành công");
    } else {
      toast.error("Hủy đơn hàng thất bại");
    }
  };

  const handleCancelCancel = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <div className="min-h-[10rem] border rounded-[0.8rem] p-[1rem]">
        <div className="flex justify-between gap-[1rem] pb-[1rem]">
          <div className="flex items-center gap-[0.8rem]">
            <Image
              src={icons.bag}
              alt="icon-truck"
              preview={false}
              width={20}
            />
            <p className="text-[1.2rem] text-[#1435C5] font-bold uppercase">
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
              <p className="text-[1.2rem] text-[#1435C5] font-bold uppercase">
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
                    <p className="text-[1.4rem] text-[#1435C5] font-bold">
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
            <span className="text-[2rem] font-bold text-[#1435C5]">
              Tổng tiền: {formatMoney(totalAmount)}
            </span>
          </div>
        </div>

        {/* Button to show cancel modal if order status is 'Chờ xác nhận' */}
        {order?.attributes?.status === "Chờ xác nhận" && (
          <div className="flex justify-end mt-[2.4rem] pt-[1rem] border-t">
            <Button
              className="h-[4rem] border-[#1435C5] text-[#1435C5]"
              onClick={showCancelModal}
            >
              Hủy đặt
            </Button>
          </div>
        )}

        {/* Button to show feedback modal if order is delivered and not reviewed */}
        {order?.attributes?.status === "Giao hàng thành công" &&
          !isReviewed && (
            <div className="flex justify-end mt-[2.4rem] pt-[1rem] border-t">
              <Button
                className="h-[4rem] border-[#1435C5] text-[#1435C5]"
                onClick={showFeedbackModal}
              >
                Đánh giá sản phẩm
              </Button>
            </div>
          )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        open={isModalOpen}
        handleOk={handleFeedbackOk}
        handleCancel={handleFeedbackCancel}
        products={order?.attributes?.order_details?.data || []}
        orderId={order?.id}
      />

      {/* Cancel Confirmation Modal */}
      <Modal
        title="Xác nhận hủy đặt"
        open={isCancelModalOpen}
        onOk={handleCancelOk}
        onCancel={handleCancelCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </>
  );
}

export default OrderItem;

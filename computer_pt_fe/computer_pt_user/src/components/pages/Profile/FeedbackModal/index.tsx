/* eslint-disable @typescript-eslint/no-unused-vars */
import feedbackApi from "@/api/feedbackApi";
import TextAreaComponent from "@/components/common/TextArea";
import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { OrderDetailType } from "@/types/reponse/order";
import { getUserProfile } from "@/utils/functions/getUser";
import { Button, Image, Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { toast } from "sonner";
interface FeedbackModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  products: BaseData<OrderDetailType>[];
}
interface FeedbackRequestProps {
  rating: string;
  comment: string;
}
function FeedbackModal({
  open,
  handleCancel,
  handleOk,
  products,
}: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const profile = getUserProfile();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackRequestProps>();
  const onSubmit: SubmitHandler<FeedbackRequestProps> = async (data) => {
    const productIds = products?.map(
      (item) => item?.attributes?.product?.data?.id
    );

    if (!productIds || productIds.length === 0) {
      toast.error("Không có sản phẩm nào để đánh giá");
      return;
    }

    const feedbackPromises = productIds.map((productId) => {
      const newData = {
        data: {
          comment: data?.comment,
          rating,
          user: profile?.id,
          product: productId,
        },
      };

      return feedbackApi
        .create(newData)
        .then(() => {
          toast.success(`Đánh giá sản phẩm ${productId} thành công`);
          reset();
          handleOk();
        })
        .catch(() => {
          toast.error(`Đánh giá sản phẩm ${productId} thất bại`);
        });
    });

    try {
      await Promise.all(feedbackPromises);
      toast.success("Tất cả đánh giá đã hoàn tất");
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình đánh giá");
      console.log(error);
    }
  };

  const ratingChanged = (newRating: number) => {
    console.log(newRating);
    setRating(newRating);
  };
  return (
    <div>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <h2 className="text-[2rem] font-bold text-center">Đánh giá sản phẩm</h2>
        <div className="flex flex-col gap-[10px] py-[20px] border-b">
          {products?.length > 0 &&
            products?.map((item, index) => (
              <div key={index} className="flex items-center gap-[0.8rem]">
                <Image
                  src={`${baseUrl}${item?.attributes?.product?.data?.attributes?.avatar?.data?.attributes?.url}`}
                  width={100}
                />
                <span className="line-clamp-1">
                  {item?.attributes?.product?.data?.attributes?.name}
                </span>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[8px] items-center justify-center py-[20px]">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <span className="text-[14px]">Đánh giá cho chúng tôi nhé !</span>
          </div>
          <TextAreaComponent
            name="comment"
            label="Mô tả sản phẩm"
            control={control}
            placeholder="Mô tả sản phẩm"
          />
          <Button
            htmlType="submit"
            type="primary"
            className="h-[40px] mt-[24px] w-full bg-[#1435C5]"
          >
            Đánh giá
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default FeedbackModal;

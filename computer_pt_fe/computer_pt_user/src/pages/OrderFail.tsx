import images from "@/assets/images";
import { Image } from "antd";

export default function OrderFail() {
  return (
    <div className="md:container md:max-w-[140rem] md:mx-auto mt-[6.8rem] h-[calc(100vh-20rem)]">
      <section className="section__heading mx-4 my-8 md:mx-[120px]">
        <div className="section__heading-title text-[12px] text-[#484848] text-center md:text-[16px] font-normal md:text-center">
          <h3 className="section__heading-status--order font-bold my-0 text-red-700">
            Đặt hàng không thành công
          </h3>
        </div>
      </section>
      <div className="flex items-center justify-center">
        {" "}
        <Image
          src={images.notFound}
          alt="not-found"
          preview={false}
          width={400}
        />
      </div>
      <section className="section__order mx-4 my-8 md:mx-[120px]">
        <div className="section__order-continue-shopping flex justify-center items-center">
          <div className="w-[30rem]"></div>
        </div>
      </section>

      {/* <section className="section__history-watched mx-4 my-8 md:mx-[120px]">
        <HistoryComponent
          productsHistory={JSON.parse(
            localStorage.getItem("productWatched") || "[]"
          )}
        />
      </section> */}
    </div>
  );
}

import productApi from "@/api/productApi";
import images from "@/assets/images";
import InfoTable from "@/components/common/InfoTable";
// import SwiperProduct from "@/components/common/SwiperProduct";
import BlockProduct from "@/components/pages/ProductDetail/BlockProduct";
import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const slug = currentUrl.split("/").pop();
  const [product, setProduct] = useState<BaseData<ProductType>>();
  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        await productApi
          .getBySlug(slug)
          .then((res) => {
            if (res) {
              setProduct(res?.data);
            }
          })
          .then((error) => console.log(error));
      };
      fetchProduct();
    }
  }, []);
  return (
    <div className="flex flex-col items-center bg-[#F8F8FC] min-h-[100vh]">
      <div className="max-w-[1440px] w-full px-[8rem]">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
            },
            {
              title: "Chi tiết sản phẩm",
            },
          ]}
          className="my-[1.2rem]"
        />
        <div className="flex gap-[1.2rem]">
          {product && <BlockProduct product={product} />}
          <div className="w-[30%] flex flex-col gap-[1.2rem]">
            <div className="flex items-center gap-[0.4rem] bg-white rounded-[0.4rem]">
              <img
                src={images.logo}
                alt="image"
                className="size-[7rem] object-cover"
              />
              <p className="text-[1.6rem] font-medium hover:text-[#1435C3] cursor-pointer duration-300">
                Công ty cổ phân thương mại dịch vụ Computer P&T
              </p>
            </div>
            <div className="bg-white rounded-[0.4rem] p-[1rem]">
              <h3 className="text-[1.4rem] font-bold">Chính sách bán hàng</h3>
              <ul>
                <li>Miễn phí giao hàng cho đơn hàng từ 5 triệu</li>
                <li>Miễn phí giao hàng cho đơn hàng từ 5 triệu</li>
                <li>Miễn phí giao hàng cho đơn hàng từ 5 triệu</li>
                <li>Miễn phí giao hàng cho đơn hàng từ 5 triệu</li>
                <li>Miễn phí giao hàng cho đơn hàng từ 5 triệu</li>
                <li>Miễn phí giao hàng cho đơn hàng từ 5 triệu</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-[2.4rem] bg-white p-[2rem] flex gap-[1.2rem]">
          <div className="flex-1">
            <h3 className="text-[2.4rem] font-bold">Mô tả sản phẩm</h3>
            <p className="text-[1.2rem]">
              Case Xigmatek Alphard M 3GF là mẫu case dành cho máy tính được sản
              xuất bởi thương hiệu nổi tiếng XIGMATEK. Case có thiết kế đẹp,
              không gian bên trong lớn, khả năng tương thích lớn, đáp ứng tốt
              nhu cầu người dùng. Thiết kế hiện đại, độc đáo của Case Xigmatek
              Alphard M 3GF Mặt kính đẹp mắt và cứng cáp Case Xigmatek Alphard M
              3GF sở hữu thiết kế độc đáo với mặt trước và mặt bên hông được làm
              bằng kính cường lực chắc chắn, giúp khoe trọn nội thất bên trong
              case. Case có màu đen cá tính, mang đến vẻ hiện đại và tinh tế.
            </p>
            <img src="https://storage.googleapis.com/teko-gae.appspot.com/media/image/2024/8/29/b8f65ad4-1f39-4e0c-9085-fb3829f98617/image.png" />
          </div>
          <div className="w-[30%]">
            <InfoTable />
          </div>
        </div>
        {/* <SwiperProduct /> */}
      </div>
    </div>
  );
}

export default ProductDetails;

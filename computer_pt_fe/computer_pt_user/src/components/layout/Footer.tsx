import images from "@/assets/images";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons/faCcVisa";
import {
  faClock,
  faMoneyBill,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterComponent = () => {
  const headers = [
    "Hỗ trợ khách hàng",
    "Chính sách mua hàng",
    "Thông tin P&T",
    "Cộng đồng P&T",
    "Email liên hệ",
  ];
  const content1 = [
    "Thẻ ưu đãi",
    "Hướng dẫn mua online",
    "Ưa đãi dành cho doanh nghiệp",
    "Chính sách trả góp",
    "Dịch vụ sửa chữa",
  ];

  const payments = [
    {
      icon: <FontAwesomeIcon icon={faQrcode} />,
      name: "QR Code",
    },
    {
      icon: <FontAwesomeIcon icon={faMoneyBill} />,
      name: "Tiền mặt",
    },
    {
      icon: <FontAwesomeIcon icon={faClock} />,
      name: "Trả góp",
    },
    {
      icon: <FontAwesomeIcon icon={faCcVisa} />,
      name: "Internet Banking",
    },
  ];
  return (
    <div className="bottom-0 w-full h-[50rem] flex flex-col items-center justify-center border-t-[#B562A3] border-t-[0.3rem] bg-white">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <ul className="grid grid-cols-5 gap-[0.8rem] mt-[2.4rem]">
          {headers.map((item, index) => (
            <li key={index} className="text-[1.4rem] font-bold">
              {item}
            </li>
          ))}
        </ul>

        {/* content  */}
        <div className="grid grid-cols-5 gap-[0.8rem] mt-[2.4rem]">
          <ul className="grid grid-cols-1 gap-[0.8rem]">
            {content1.map((item, index) => (
              <li key={index} className="text-[1.4rem]">
                {item}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-1 gap-[0.8rem]">
            {content1.map((item, index) => (
              <li key={index} className="text-[1.4rem]">
                {item}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-1 gap-[0.8rem]">
            {content1.map((item, index) => (
              <li key={index} className="text-[1.4rem]">
                {item}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-1 gap-[0.8rem]">
            {content1.map((item, index) => (
              <li key={index} className="text-[1.4rem]">
                {item}
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-1 gap-[0.8rem]">
            {content1.map((item, index) => (
              <li key={index} className="text-[1.4rem]">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-[2.4rem]">
            <h2 className="text-[1.4rem] font-bold">Phương thức thanh toán</h2>
            <ul className="flex items-center gap-[0.8rem]">
              {payments.map((item, index) => (
                <li key={index} className="flex flex-col items-center">
                  <span className="text-[2.4rem] text-[#808080]">
                    {item?.icon}
                  </span>
                  <span className="text-[1.2rem]">{item?.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-[2.4rem]">
            <h2 className="text-[1.4rem] font-bold">
              Danh sách ngân hàng thanh toán online
            </h2>
            <img
              src={images.vnPay}
              alt="icon"
              className="h-[4rem] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="h-[25rem] bg-[#E9EDF2] w-full flex justify-center p-[2rem]">
        <div className="max-w-[1440px] w-full mx-auto px-[8rem] grid grid-cols-3 gap-[0.8rem]">
          <div>
            <h3 className="text-[1.4rem] font-bold uppercase">
              Công ty cổ phần thương mại - dịch vụ computer P&T
            </h3>
            <ul className="flex flex-col gap-[0.4rem] mt-[2.4rem]">
              <li>
                © 1997 - 2020 Công Ty Cổ Phần Thương Mại - Dịch Vụ Computer P&T
              </li>
              <li>
                Giấy chứng nhận đăng ký doanh nghiệp: 0304998358 do Sở KH-ĐT
                TP.HCM cấp lần đầu ngày 30 tháng 05 năm 2007
              </li>
              <li>
                Website computer-pt.vn thuộc quyền sở hữu của Công ty Cổ phần
                Thương Mại - Dịch Vụ Computer P&T và được phát triển bởi Teko.
              </li>
            </ul>
          </div>

          <div>
            <div></div>
            <ul className="flex flex-col gap-[0.4rem] mt-[2.4rem]">
              <li>
                <p className="text-[1.2rem] font-bold">Địa chỉ trụ sở chính:</p>
                <span>
                  Tầng 5, Số 117-119-121 Nguyễn Du, Phường Bến Thành, Quận 1,
                  Thành Phố Hồ Chí Minh
                </span>
              </li>
              <li>
                <p className="text-[1.2rem] font-bold">
                  Văn phòng điều hành miền Bắc:
                </p>
                <span>
                  Tầng 2, Số 47 Phố Thái Hà, Phường Trung Liệt, Quận Đống Đa,
                  Thành phố Hà Nội
                </span>
              </li>
              <li>
                <p className="text-[1.2rem] font-bold">
                  Văn phòng điều hành miền Nam:
                </p>
                <span>
                  677/2A Điện Biên Phủ, Phường 25 , Quận Bình Thạnh , TP. Hồ Chí
                  Minh
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[0.8rem] mt-[2.4rem]">
            <img
              src={images.bct}
              alt="images"
              className="h-[4.864rem] w-[12.8rem]"
            />
            <img src={images.dmca} alt="images" className="h-[4rem] w-[8rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;

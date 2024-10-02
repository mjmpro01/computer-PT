import images from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faComputer,
  faList,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import CategoriesComponent from "../common/Categories";
import CartHeader from "../common/CartHeader";
import paths from "@/utils/constants/paths";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const user = false;
  const navigate = useNavigate();
  return (
    <div className="border-b fixed w-full flex items-center justify-center bg-white z-50">
      <div className="max-w-[1440px] px-[8rem] h-[7rem] w-full flex justify-between items-center">
        <div className="flex items-center gap-[0.8rem]">
          <img
            src={images.logo}
            alt="logo"
            className="w-[5rem] h-[5rem] object-cover"
          />
          <p className="text-black text-[2rem] font-medium">Computer P&T</p>
        </div>
        <div className="flex items-center gap-[1.2rem] flex-1 px-[4rem]">
          <Popover
            content={<CategoriesComponent />}
            trigger="click"
            placement="bottomLeft"
          >
            <div className="flex items-center gap-[0.8rem] text-[1.2rem] text-[#808080] border rounded-[0.4rem] p-[1rem] h-[3rem] cursor-pointer hover:bg-[rgba(0,0,0,0.1)] duration-300">
              <FontAwesomeIcon icon={faList} />
              <p className="text-[#808080] text-[1.2rem] font-medium">
                Danh mục sản phẩm
              </p>
            </div>
          </Popover>
          <div className="flex-1 bg-[#F5F5F5] h-[3.2rem] border rounded-[0.4rem] flex items-center gap-[0.8rem] p-[0.8rem_1rem] text-[1.4rem]">
            <input
              className="h-full flex-1 bg-transparent focus:outline-none"
              placeholder="Nhập từ khóa tìm kiếm"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="font-normal cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-[1.2rem]">
          <div
            className="group flex items-center cursor-pointer flex-col"
            onClick={() => navigate(paths.BUILD_PC)}
          >
            <FontAwesomeIcon
              icon={faComputer}
              className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
            />
            <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">
              Xây dựng cấu hình
            </p>
          </div>

          <Popover
            content={<CartHeader />}
            trigger="hover"
            placement="bottomRight"
          >
            <div className="group flex items-center cursor-pointer flex-col">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
              />
              <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">
                Giỏ hàng (0)
              </p>
            </div>
          </Popover>
          <div className="group flex items-center cursor-pointer flex-col">
            <FontAwesomeIcon
              icon={faUser}
              className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
            />
            <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">
              {user ? "Gia Phúc" : "Đăng nhập/ Đăng ký"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

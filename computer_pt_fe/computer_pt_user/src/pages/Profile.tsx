import { useState } from "react"; // Import useState để quản lý tab
import images from "@/assets/images";
import paths from "@/utils/constants/paths";
import { getUserProfile } from "@/utils/functions/getUser";
import {
  faClipboardCheck,
  faLocationArrow,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Information from "@/components/pages/Profile/Infomation";
import Orders from "@/components/pages/Profile/Orders";
import Address from "@/components/pages/Profile/Address";

function Profile() {
  const profile = getUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [activeTab, setActiveTab] = useState(currentPath);

  const tabs = [
    {
      title: "Thông tin tài khoản",
      icons: faUser,
      path: paths.INFORMATION,
      content: <Information />,
    },
    {
      title: "Quản lý đơn hàng",
      icons: faClipboardCheck,
      path: paths.ORDERS,
      content: <Orders />,
    },
    {
      title: "Quản lý địa chỉ",
      icons: faLocationArrow,
      path: paths.ADDRESS,
      content: <Address />,
    },
  ];

  const renderContent = () => {
    const activeTabData = tabs.find(
      (tab) => `${paths.PROFILE}/${tab.path}` === activeTab
    );
    return activeTabData ? activeTabData.content : null;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px] mt-[2.4rem]">
        <div className="flex gap-[1rem] bg-white p-[1rem] min-h-[50rem]">
          <div className="w-[25%] border-r">
            <div className="flex items-center gap-[1rem] pl-[4rem]">
              <Avatar src={images.user} alt="avatar" size={50} />
              <div className="flex flex-col">
                <span className="text-[1.4rem]"> Tài khoản của </span>
                <span className="font-bold text-[1.6rem]">
                  {profile?.fullname || profile?.email}
                </span>
              </div>
            </div>
            <ul className="mt-[2.4rem] pl-[6rem] flex flex-col gap-[2.4rem]">
              {tabs.map((item, index) => (
                <li key={index}>
                  <button
                    className={`flex items-center gap-[1.2rem] group`}
                    onClick={() => {
                      navigate(`${paths.PROFILE}/${item?.path}`);
                      setActiveTab(`${paths.PROFILE}/${item?.path}`);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icons}
                      className={`text-[2rem] ${
                        activeTab === `${paths.PROFILE}/${item.path}`
                          ? "text-[#1435C3]"
                          : "text-[rgba(156,156,156,0.87)]"
                      } group-hover:text-[#1435C3] duration-300`}
                    />
                    <span
                      className={`text-[1.4rem] ${
                        activeTab === `${paths.PROFILE}/${item.path}`
                          ? "text-[#1435C3]"
                          : "text-[rgba(156,156,156,0.87)]"
                      } group-hover:text-[#1435C3] duration-300`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 p-[2rem]">
            {/* Hiển thị nội dung của tab */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

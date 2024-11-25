import { Avatar, Image, Popover } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import paths from "../../utils/constants/paths";
import images from "../../assets/images";
import variables from "../../utils/constants/variables";
import { getUserProfile } from "../../utils/functions/getUser";
import icons from "../../assets/icons";

interface SidebarItemProps {
  title: string;
  path: string;
  group?: string | null;
  icons: string;
}

function Sidebar() {
  const colspan = false;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const profile = getUserProfile();
  const [selectedSideBar, setSelectedSideBar] = useState<string>(currentPath);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Manage open/close state of groups
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const handleLogOut = () => {
    localStorage.removeItem(variables.ACCESS_TOKEN);
    localStorage.removeItem(variables.PROFILE);
    navigate(paths.LOGIN);
    toast.success("Đăng xuất thành công");
  };

  // Toggle group open/close state
  const toggleGroup = (group: string | null) => {
    const key = group || "default";
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const PopoverContent = () => {
    return (
      <div className="min-w-[200px]">
        <ul className="flex flex-col gap-[10px] w-full">
          <li>
            <button
              className="flex items-center gap-[10px] w-full hover:bg-gray-100 duration-300 p-[5px] rounded-[10px]"
              onClick={handleLogOut}
            >
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const sidebars: SidebarItemProps[] = [
    {
      group: null,
      title: "Danh mục bài viết",
      path: paths.BLOG_CATEGORY,
      icons: icons.book,
    },
    {
      group: null,
      title: "Danh mục sản phẩm",
      path: paths.PRODUCT_CATEGORY,
      icons: icons.grid,
    },
    {
      group: null,
      title: "Quản lý feedbacks",
      path: paths.FEEDBACK,
      icons: icons.pen,
    },
    {
      group: null,
      title: "Quản lý đơn hàng",
      path: paths.ORDERS,
      icons: icons.clipBoard,
    },
    {
      group: null,
      title: "Quản lý khách hàng",
      path: paths.CUSTOMERS,
      icons: icons.user,
    },
    {
      group: null,
      title: "Quản lý bộ lọc",
      path: paths.FILTERS,
      icons: icons.filter,
    },
    { group: null, title: "Bài viết", path: paths.BLOGS, icons: icons.book },
    { group: null, title: "Sản phẩm", path: paths.PRODUCTS, icons: icons.cpu },
    { group: null, title: "Chat", path: paths.CHAT, icons: icons.chat },
  ];

  return (
    <div
      className={`${
        colspan
          ? "w-[70px] overflow-hidden duration-300"
          : "w-[270px] duration-300"
      } bg-white rounded-tr-[10px] rounded-br-[10px] border border-gray-300 shadow-lg`}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-[10px] p-[10px] border-b bg-gray-50">
            <div className="flex items-center gap-[10px] whitespace-nowrap">
              <Image
                src={images.logo}
                alt="logo"
                preview={false}
                width={50}
                height={50}
                className="rounded-[10px]"
              />
              <div className={`flex flex-col ${colspan ? "hidden" : "block"}`}>
                <h3 className="text-[18px] font-bold m-0 text-[#1435C5]">
                  Computer P&T
                </h3>
              </div>
            </div>
          </div>

          <ul className="flex flex-col mt-2">
            {Array.from(new Set(sidebars.map((item) => item.group))).map(
              (group) => (
                <li key={group || "default"}>
                  {group && (
                    <button
                      className="whitespace-nowrap p-[10px] flex items-center gap-[10px] font-medium w-full hover:bg-gray-100 duration-300 rounded-lg"
                      onClick={() => toggleGroup(group)}
                    >
                      <p>{group}</p>
                    </button>
                  )}
                  {(openGroups[group || "default"] || !group) && (
                    <ul className={`${group ? "ml-[20px]" : ""}`}>
                      {sidebars
                        .filter((item) => item.group === group)
                        .map((sidebar, index) => (
                          <li key={index}>
                            <button
                              className={`whitespace-nowrap py-[10px] flex items-center gap-[10px] pl-[10px] ${
                                selectedSideBar === sidebar.path
                                  ? "border-r-[#1435C5] border-r-[5px] text-[#1435C5] font-bold bg-[#edf0ff]"
                                  : "font-medium hover:bg-gray-100"
                              } w-full duration-300`}
                              onClick={() => {
                                setSelectedSideBar(sidebar.path);
                                navigate(sidebar.path);
                              }}
                            >
                              <img src={sidebar?.icons} alt="icon" width={20} />
                              {!colspan && (
                                <p className="px-[10px] text-[16px]">
                                  {sidebar.title}
                                </p>
                              )}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="relative flex items-center gap-[8px] justify-between whitespace-nowrap p-[10px] w-full bg-gray-50 border-t">
          <Popover
            content={PopoverContent}
            trigger="click"
            placement="topLeft"
            open={isOpen}
          >
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center cursor-pointer w-full">
                <Avatar src={images.user} size={50} />
                <span className="text-[16px] font-medium w-[60%] truncate">
                  {profile?.fullname || profile?.email}
                </span>
              </div>
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

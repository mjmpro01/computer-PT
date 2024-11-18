import { Avatar, Image, Popover } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import paths from "../../utils/constants/paths";
import icons from "../../assets/icons";
import images from "../../assets/images";
import variables from "../../utils/constants/variables";
import { getUserProfile } from "../../utils/functions/getUser";

interface SidebarItemProps {
  title: string;
  icon: string;
  path: string;
  activeIcon: string;
  group?: string | null;
}

// interface SidebarProps {
//   // colspan?: boolean;
//   // setColSpan?: () => void;
// }

function Sidebar() {
  const colspan = false;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const profile = getUserProfile();
  const [selectedSideBar, setSelectedSideBar] = useState<string>(currentPath);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Quản lý trạng thái mở/đóng của các nhóm
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const handleLogOut = () => {
    localStorage.removeItem(variables.ACCESS_TOKEN);
    localStorage.removeItem(variables.PROFILE);
    navigate(paths.LOGIN);
    toast.success("Đăng xuất thành công");
  };

  // Toggle trạng thái mở/đóng của nhóm
  const toggleGroup = (group: string | null) => {
    const key = group || "default"; // Sử dụng "default" cho null hoặc undefined
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
              className="flex items-center gap-[10px] w-full hover:bg-[rgba(0,0,0,0.1)] duration-300 p-[5px] rounded-[10px]"
              onClick={handleLogOut}
            >
              <img src={icons.logOut} alt="log-out-icon" width={20} />
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>
    );
  };

  // Danh sách sidebar phẳng với nhóm
  const sidebars: SidebarItemProps[] = [
    {
      group: "Quản lý bài viết",
      title: "Bài viết",
      path: paths.BLOGS,
      icon: images.blog,
      activeIcon: images.blog,
    },
    {
      group: "Quản lý bài viết",
      title: "Danh mục bài viết",
      path: paths.BLOG_CATEGORY,
      icon: images.category,
      activeIcon: images.category,
    },
    {
      group: "Quản lý sản phẩm",
      title: "Sản phẩm",
      path: paths.PRODUCTS,
      icon: images.computer,
      activeIcon: images.computer,
    },
    {
      group: "Quản lý sản phẩm",
      title: "Danh mục sản phẩm",
      path: paths.PRODUCT_CATEGORY,
      icon: images.category,
      activeIcon: images.category,
    },
    {
      group: null,
      title: "Trang chủ",
      path: paths.HOME,
      icon: images.home,
      activeIcon: images.home,
    },
  ];

  return (
    <div
      className={`${
        colspan
          ? "w-[70px] overflow-hidden duration-300"
          : "w-[270px] duration-300"
      } rounded-tr-[10px] rounded-br-[10px] border-[#cccc] border`}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-[10px] p-[10px] border-b">
            <div className="flex items-center gap-[10px] whitespace-nowrap">
              <Image
                src={images.logo}
                alt="logo"
                preview={false}
                width={50}
                height={50}
                className="rounded-[10px]"
              />
              <div
                className={`flex flex-col ${
                  colspan ? "hidden" : "whitespace-nowrap block"
                }`}
              >
                <h3 className="text-[18px] font-bold m-0 text-[#B562A3]">
                  Computer P&T
                </h3>
              </div>
            </div>
            {/* {!colspan && (
              <button className="p-[10px]" onClick={setColSpan}>
                <img
                  src={icons.ChevronDown}
                  alt="toggle-icon"
                  className="rotate-90"
                />
              </button>
            )} */}
          </div>

          <ul className="flex flex-col">
            {/* Nhóm các mục theo group */}
            {Array.from(new Set(sidebars.map((item) => item.group))).map(
              (group) => (
                <li key={group || "default"}>
                  {group && (
                    <button
                      className="whitespace-nowrap p-[10px] flex items-center gap-[10px] font-bold w-full hover:bg-[#f9e0f2] duration-300"
                      onClick={() => toggleGroup(group)}
                    >
                      <p>{group}</p>
                      <img
                        src={icons.ChevronDown}
                        alt="toggle-group-icon"
                        className={`ml-auto ${
                          openGroups[group || "default"]
                            ? "rotate-0"
                            : "rotate-[180deg]"
                        } duration-300`}
                      />
                    </button>
                  )}
                  {/* Hiển thị các mục trong nhóm nếu nhóm đang mở */}
                  {(openGroups[group || "default"] || !group) && (
                    <ul className={`${group ? "ml-[20px]" : ""}`}>
                      {sidebars
                        .filter((item) => item.group === group)
                        .map((sidebar, index) => (
                          <li key={index}>
                            <button
                              className={`whitespace-nowrap p-[10px] flex items-center gap-[10px] ${
                                selectedSideBar === sidebar.path
                                  ? "border-r-[#B562A3] border-r-[5px] text-[#B562A3] font-bold bg-[#f9e0f2]"
                                  : "font-normal"
                              } w-full hover:bg-[#f9e0f2] duration-300`}
                              onClick={() => {
                                setSelectedSideBar(sidebar.path);
                                navigate(sidebar.path);
                              }}
                            >
                              <img
                                src={
                                  selectedSideBar === sidebar.path
                                    ? sidebar.activeIcon
                                    : sidebar.icon
                                }
                                alt="icon-sidebar"
                                className="w-[20px] h-[20px]"
                              />
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
        <div className="fixed bottom-0 flex items-center gap-[8px] justify-between whitespace-nowrap p-[10px] w-[270px]">
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
                {!colspan && (
                  <span className="text-[16px] font-medium w-[60%] truncate">
                    {profile?.fullname || profile?.email}
                  </span>
                )}
              </div>
              {!colspan && (
                <button className="p-[10px]">
                  <img
                    src={icons.ChevronDown}
                    alt="arrow-icon"
                    className={`${
                      isOpen ? "rotate-0" : "rotate-[180deg]"
                    } duration-300`}
                  />
                </button>
              )}
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

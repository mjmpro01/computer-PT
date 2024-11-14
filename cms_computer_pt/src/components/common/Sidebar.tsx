import { Avatar, Image, Popover, Tooltip } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// import ModalUser from "./ModalUser";
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
  selected?: string;
  onSelected?: () => void;
}

interface SidebarProps {
  colspan?: boolean;
  setColSpan?: () => void;
}
function Sidebar({ colspan, setColSpan }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const profile = getUserProfile();
  const [selectedSideBar, setSelectedSideBar] = useState<string>(currentPath);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogOut = () => {
    localStorage.removeItem(variables.ACCESS_TOKEN);
    localStorage.removeItem(variables.PROFILE);
    navigate(paths.LOGIN);
    toast.success("Đăng xuất thành công");
  };

  const SidebarItem = ({
    title,
    icon,
    selected,
    onSelected,
    activeIcon,
    path,
    children,
  }: SidebarItemProps & { children?: SidebarItemProps[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = selected === path;

    return (
      <div className="w-full">
        <button
          className={`whitespace-nowrap p-[10px] flex items-center gap-[10px] ${
            isActive
              ? "border-r-[#B562A3] border-r-[5px] text-[#B562A3] font-bold"
              : "font-normal"
          } w-full hover:bg-[#f9e0f2] duration-300`}
          onClick={() => {
            if (!children && onSelected) {
              onSelected();
              navigate(path);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Tooltip title={title} placement="right">
            <div className="relative w-[20px] h-[20px]">
              <img
                src={icon}
                alt="icon-sidebar"
                className={`absolute top-0 left-[50%] right-[50%] w-full h-full transition-opacity duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={activeIcon}
                alt="active-icon-sidebar"
                className={`absolute top-0 left-[50%] right-[50%] w-full h-full transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </Tooltip>
          {!colspan && (
            <p
              className={`px-[10px] text-[16px] ${isActive ? "font-bold" : "font-normal"}`}
            >
              {title}
            </p>
          )}
          {children && (
            <button
              className="ml-auto p-[5px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={icons.ChevronDown}
                alt="toggle-icon"
                className={`${isOpen ? "rotate-0" : "rotate-[180deg]"} duration-300`}
              />
            </button>
          )}
        </button>
        {isOpen && children && (
          <ul className="ml-[20px]">
            {children.map((child, index) => (
              <li key={index}>
                <SidebarItem
                  {...child}
                  selected={selected}
                  onSelected={onSelected}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const PopoverContent = () => {
    return (
      <div className="min-w-[200px]">
        <ul className="flex flex-col gap-[10px] w-full">
          {/* <li>
            <button
              className="flex items-center gap-[10px] w-full hover:bg-[rgba(0,0,0,0.1)] duration-300 p-[5px] rounded-[10px]"
              // onClick={showModal}
            >
              <img src={icons.user} alt="log-out-icon" width={20} />
              <span>Thông tin cá nhân</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-[10px] w-full hover:bg-[rgba(0,0,0,0.1)] duration-300 p-[5px] rounded-[10px]"
              // onClick={() => navigate(paths.CHANGE_PASSWORD)}
            >
              <img src={icons.key} alt="log-out-icon" width={20} />
              <span>Đổi mật khẩu</span>
            </button>
          </li> */}
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
  const sidebars = [
    {
      title: "Trang chủ",
      icon: images.home,
      path: paths.HOME,
      activeIcon: images.home,
    },
    {
      title: "Quản lý bài viết",
      icon: images.blog,
      activeIcon: images.blog,
      children: [
        {
          title: "Bài viết",
          path: paths.BLOGS,
          icon: images.blog,
          activeIcon: images.blog,
        },
        {
          title: "Danh mục bài viết",
          path: paths.BLOG_CATEGORY,
          icon: images.category,
          activeIcon: images.category,
        },
      ],
    },
    {
      title: "Quản lý sản phẩm",
      icon: images.computer,
      activeIcon: images.computer,
      children: [
        {
          title: "Sản phẩm",
          path: paths.PRODUCTS,
          icon: images.computer,
          activeIcon: images.computer,
        },
        {
          title: "Danh mục sản phẩm",
          path: paths.PRODUCT_CATEGORY,
          icon: images.category,
          activeIcon: images.category,
        },
      ],
    },
  ];

  return (
    <>
      <div
        className={`${colspan ? "w-[70px] overflow-hidden duration-300" : "w-[270px] duration-300"} rounded-tr-[10px] rounded-br-[10px] border-[#cccc] border`}
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
                  className={`flex flex-col ${colspan ? "hidden" : "whitespace-nowrap block"}`}
                >
                  <h3 className="text-[18px] font-bold m-0 text-[#B562A3]">
                    Computer P&T
                  </h3>
                </div>
              </div>
              {!colspan && (
                <button className="p-[10px]" onClick={setColSpan}>
                  <img
                    src={icons.ChevronDown}
                    alt="log-out-icon"
                    className="rotate-90"
                  />
                </button>
              )}
            </div>

            <ul className="flex flex-col">
              {sidebars?.map((sidebar, index) => (
                <li key={index}>
                  <SidebarItem
                    activeIcon={sidebar?.activeIcon}
                    title={sidebar?.title}
                    icon={sidebar?.icon}
                    path={sidebar?.path || ""}
                    children={sidebar?.children}
                    onSelected={() => {
                      if (sidebar?.path) {
                        setSelectedSideBar(sidebar.path);
                      }
                    }}
                    selected={selectedSideBar}
                  />
                </li>
              ))}
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
                      className={`${isOpen ? "rotate-0" : "rotate-[180deg]"} duration-300`}
                    />
                  </button>
                )}
              </button>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

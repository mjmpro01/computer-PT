import { Outlet } from "react-router-dom";

import Sidebar from "../common/Sidebar";

const RootLayout = () => {
  return (
    <>
      <div className="flex w-full relative">
        <Sidebar />
        {/* {colSpan && (
          <button
            className="p-[5px] absolute top-[2.8%] left-[3.5%] bg-white rounded-full"
            onClick={() => setColSpan(!colSpan)}
          >
            <img
              src={icons.ChevronDown}
              alt="log-out-icon"
              className="rotate-[-90deg]"
            />
          </button>
        )} */}
        <div className="flex-1 bg-[#F8F8FC]">
          <div className="h-[100vh] overflow-y-auto relative">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default RootLayout;

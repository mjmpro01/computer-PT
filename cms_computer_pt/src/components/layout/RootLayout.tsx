import { Outlet } from "react-router-dom";

import Sidebar from "../common/Sidebar";

const RootLayout = () => {
  return (
    <>
      <div className="flex w-full relative">
        <Sidebar />
        <div className="h-[100vh] overflow-y-auto relative flex-1 bg-[#F8F8FC]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;

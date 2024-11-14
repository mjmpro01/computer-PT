import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../common/Sidebar";
import icons from "../../assets/icons";

const RootLayout = () => {
  const [colSpan, setColSpan] = useState<boolean>(false);
  return (
    <>
      <div className="flex w-full relative">
        <Sidebar colspan={colSpan} setColSpan={() => setColSpan(!colSpan)} />
        {colSpan && (
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
        )}
        <div className="flex-1">
          <div className="h-[100vh] overflow-y-auto relative">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default RootLayout;

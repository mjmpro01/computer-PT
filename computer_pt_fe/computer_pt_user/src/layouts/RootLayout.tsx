import FooterComponent from "@/components/layout/Footer";
import HeaderComponent from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export type RootLayoutContextType = {
  setIsLoadingDone: (isLoadingDone: boolean) => void;
};

export default function RootLayout() {
  return (
    <div className="container-fluid p-0 flex flex-col min-h-screen relative bg-[#F8F8FC]">
      <HeaderComponent />
      <div className="pt-[7rem] min-h-[100vh]">
        <Outlet

        //   context={{ setIsLoadingDone } satisfies RootLayoutContextType}
        />
      </div>
      <FooterComponent />
    </div>
  );
}

// export function useRootLayoutContext() {
//   return useOutletContext<RootLayoutContextType>();
// }

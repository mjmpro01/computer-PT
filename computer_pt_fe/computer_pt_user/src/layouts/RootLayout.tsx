import FooterComponent from "@/components/layout/Footer";
import HeaderComponent from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export type RootLayoutContextType = {
  setIsLoadingDone: (isLoadingDone: boolean) => void;
};

export default function RootLayout() {
  return (
    <div className="container-fluid p-0 flex flex-col min-h-screen relative">
      <HeaderComponent />
      <div className="flex items-center justify-center">
        <div className="min-h-[100vh] pt-[7rem] w-full max-w-[1440px] px-[8rem]">
          <Outlet

          //   context={{ setIsLoadingDone } satisfies RootLayoutContextType}
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

// export function useRootLayoutContext() {
//   return useOutletContext<RootLayoutContextType>();
// }

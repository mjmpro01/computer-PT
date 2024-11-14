import images from "@/assets/images";
import FooterComponent from "@/components/layout/Footer";
import HeaderComponent from "@/components/layout/Header";
import { Image } from "antd";
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
      <a
        href="https://www.facebook.com/phuctran0211?locale=vi_VN"
        className="fixed bottom-[5%] right-[2%] bg-white p-[1rem] shadow-md rounded-[0.8rem] border-[0.1rem] border-[#3333] w-[18rem] cursor-pointer"
      >
        <div className="flex items-center gap-[0.8rem]">
          <Image src={images.zalo} alt="zalo" preview={false} width={30} />
          <div>
            <p className="text-[1.4rem] font-medium text-[#B562A3]">
              Chat Zalo
            </p>
            <p className="text-[1.4rem] font-medium text-[#B562A3]">
              (8h - 22h30)
            </p>
          </div>
        </div>
      </a>
      <a
        href="https://www.facebook.com/phuctran0211?locale=vi_VN"
        className="fixed bottom-[15%] right-[2%] bg-white p-[1rem] shadow-md rounded-[0.8rem] border-[0.1rem] border-[#3333] w-[18rem] cursor-pointer"
      >
        <div className="flex items-center gap-[0.8rem]">
          <Image src={images.messenger} alt="zalo" preview={false} width={30} />
          <div>
            <p className="text-[1.4rem] font-medium text-[#B562A3]">
              Chat Messenger
            </p>
            <p className="text-[1.4rem] font-medium text-[#B562A3]">
              (8h - 22h30)
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

// export function useRootLayoutContext() {
//   return useOutletContext<RootLayoutContextType>();
// }

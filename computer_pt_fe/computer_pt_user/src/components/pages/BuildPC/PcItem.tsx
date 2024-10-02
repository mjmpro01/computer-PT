import ProductBuild from "@/components/common/ProductBuild";
import { Button } from "antd";

function PcItem() {
  const selected = true;
  return (
    <div className="h-[10rem] bg-white grid grid-cols-[30%_70%] border items-center justify-center shadow-sm">
      <div className="w-full border-r-[0.1rem] h-full flex items-center p-[2rem]">
        <p className="text-[1.6rem] font-bold uppercase">1.Cpu - Bộ vi xử lý</p>
      </div>
      <div className="w-full">
        {selected ? (
          <>
            <ProductBuild />
          </>
        ) : (
          <Button className="text-[#1435C3] border-[#a7a8ad] w-[20rem] h-[4rem]">
            Chọn thiết bị
          </Button>
        )}
      </div>
    </div>
  );
}

export default PcItem;

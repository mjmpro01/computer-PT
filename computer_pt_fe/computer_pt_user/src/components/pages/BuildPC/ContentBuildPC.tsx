import { Button } from "antd";
import PcItem from "./PcItem";

function ContentBuildPC() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button className="h-[4rem] bg-[#1435C3] text-white">Làm mới</Button>
        <p className="text-[1.6rem] font-bold text-red-600">
          Chi phí dự tính: 6.990.000 đ
        </p>
      </div>
      <div className="my-[2.4rem] flex flex-col gap-[0.4rem]">
        <PcItem />
        <PcItem />
        <PcItem />
        <PcItem />
        <PcItem />
      </div>
    </div>
  );
}

export default ContentBuildPC;

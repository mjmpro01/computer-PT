import ContentBuildPC from "@/components/pages/BuildPC/ContentBuildPC";
import { Tabs, TabsProps } from "antd";

function BuildPC() {
  const items: TabsProps["items"] = [
    { key: "1", label: "Cấu hình 1", children: <ContentBuildPC /> },
    { key: "2", label: "Cấu hình 2", children: <ContentBuildPC /> },
    { key: "3", label: "Cấu hình 3", children: <ContentBuildPC /> },
    { key: "4", label: "Cấu hình 4", children: <ContentBuildPC /> },
    { key: "5", label: "Cấu hình 5", children: <ContentBuildPC /> },
    { key: "6", label: "Cấu hình 6", children: <ContentBuildPC /> },
  ];
  return (
    <div className="flex items-center justify-center mt-[2.4rem]">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <div>
          <h2 className="text-center font-bold text-[2rem] my-[2.4rem]">
            Build PC - Xây dựng cấu hình máy tính PC giá rẻ chuẩn nhất
          </h2>
          <p className="text-[1.6rem] font-bold">
            Chọn linh kiện xây dựng cấu hình - Tự build PC
          </p>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          indicator={{ size: (origin) => origin - 20, align: "center" }}
        />
      </div>
    </div>
  );
}

export default BuildPC;

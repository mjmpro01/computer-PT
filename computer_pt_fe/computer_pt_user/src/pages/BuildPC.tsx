import ContentBuildPC from "@/components/pages/BuildPC/ContentBuildPC";

function BuildPC() {
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

        <ContentBuildPC />
      </div>
    </div>
  );
}

export default BuildPC;

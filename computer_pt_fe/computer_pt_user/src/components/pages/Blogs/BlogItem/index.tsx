interface BlogItemProps {
  type: "text-thumbnail" | "horizontal" | "vertical";
}
function BlogItem({ type }: BlogItemProps) {
  if (type === "text-thumbnail") {
    return (
      <button className="relative rounded-[0.4rem] overflow-hidden h-[40rem] w-full">
        <img
          src="https://vatvostudio.vn/wp-content/uploads/2024/10/Apple-ra-mat-MacBook-Pro-voi-chip-M4-Pro.jpg"
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <div className="bg-[#F94144] p-[0.4rem] absolute top-[4%] left-[2%] rounded-[0.4rem]">
          <p className="text-[1.2rem] font-bold text-white">Tin tức</p>
        </div>
        <div className="p-[1rrem] absolute bottom-[10%] left-[5%] right-[5%]">
          <h3 className="text-[2rem] font-semibold text-white text-justify">
            Apple ra mắt MacBook Pro với chip M4 Pro và M4 Max: RAM từ 24GB, hỗ
            trợ Thunderbolt 5, giá từ 49,99 triệu đồng
          </h3>
        </div>
      </button>
    );
  }
  if (type === "vertical") {
    return (
      <button className="rounded-[0.4rem] flex flex-col gap-[1.2rem]">
        <div className="h-[20rem] w-full relative">
          <img
            src="https://vatvostudio.vn/wp-content/uploads/2024/10/Apple-ra-mat-MacBook-Pro-voi-chip-M4-Pro.jpg"
            alt="avatar"
            className="w-full h-full object-cover rounded-[0.8rem]"
          />
          <div className="bg-[#F94144] p-[0.4rem] absolute top-[4%] left-[2%] rounded-[0.4rem]">
            <p className="text-[1.2rem] font-bold text-white">Tin tức</p>
          </div>
        </div>
        <div>
          <h3 className="text-[1.6rem] font-semibold text-justify">
            Apple ra mắt MacBook Pro với chip M4 Pro và M4 Max: RAM từ 24GB, hỗ
            trợ Thunderbolt 5, giá từ 49,99 triệu đồng
          </h3>
          <p className="text-[1.2rem] text-[#00000066] text-start">
            2 days ago
          </p>
        </div>
      </button>
    );
  }
  if (type === "horizontal") {
    return (
      <button className="rounded-[0.4rem] flex gap-[1.2rem]">
        <div className="h-[20rem] w-[30rem] relative">
          <img
            src="https://vatvostudio.vn/wp-content/uploads/2024/10/Apple-ra-mat-MacBook-Pro-voi-chip-M4-Pro.jpg"
            alt="avatar"
            className="w-full h-full object-cover rounded-[0.8rem]"
          />
          <div className="bg-[#F94144] p-[0.4rem] absolute top-[4%] left-[2%] rounded-[0.4rem]">
            <p className="text-[1.2rem] font-bold text-white">Tin tức</p>
          </div>
        </div>
        <div>
          <h3 className="text-[1.6rem] font-semibold text-justify">
            Apple ra mắt MacBook Pro với chip M4 Pro và M4 Max: RAM từ 24GB, hỗ
            trợ Thunderbolt 5, giá từ 49,99 triệu đồng
          </h3>
          <p className="text-[1.2rem] text-[#00000066] text-start">
            2 days ago
          </p>
        </div>
      </button>
    );
  }
}

export default BlogItem;

import { BaseData } from "@/types/base/baseData";
import baseUrl from "@/types/base/baseUrl";
import { BlogType } from "@/types/reponse/blog";
import paths from "@/utils/constants/paths";
import { useNavigate } from "react-router-dom";

interface BlogItemProps {
  type: "text-thumbnail" | "horizontal" | "vertical";
  blog: BaseData<BlogType>;
}
function BlogItem({ type, blog }: BlogItemProps) {
  const navigate = useNavigate();
  if (type === "text-thumbnail") {
    return (
      <button
        className="relative rounded-[0.4rem] overflow-hidden h-[40rem] w-full"
        onClick={() => navigate(`/${paths.BLOGS}/${blog?.attributes?.slug}`)}
      >
        <img
          src={`${baseUrl}${blog?.attributes?.avatar?.data?.attributes?.url}`}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <div className="bg-[#F94144] p-[0.4rem] absolute top-[4%] left-[2%] rounded-[0.4rem]">
          <p className="text-[1.2rem] font-bold text-white">
            {blog?.attributes?.blog_category?.data?.attributes?.name ||
              "Unknown"}
          </p>
        </div>
        <div className="p-[1rem] absolute bottom-[10%] left-[5%] right-[5%] bg-white/50 backdrop-blur-md rounded-lg">
          <h3 className="text-[2rem] font-semibold text-[#333] text-justify">
            {blog?.attributes?.title}
          </h3>
        </div>
      </button>
    );
  }
  if (type === "vertical") {
    return (
      <button
        className="rounded-[0.4rem] flex flex-col gap-[1.2rem]"
        onClick={() => navigate(`/${paths.BLOGS}/${blog?.attributes?.slug}`)}
      >
        <div className="h-[20rem] w-full relative">
          <img
            src={`${baseUrl}${blog?.attributes?.avatar?.data?.attributes?.url}`}
            alt="avatar"
            className="w-full h-full object-cover rounded-[0.8rem]"
          />
          <div className="bg-[#F94144] p-[0.4rem] absolute top-[4%] left-[2%] rounded-[0.4rem]">
            <p className="text-[1.2rem] font-bold text-white">
              {blog?.attributes?.blog_category?.data?.attributes?.name ||
                "Unknown"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-[1.6rem] font-semibold text-justify">
            {blog?.attributes?.title}
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
      <button
        className="rounded-[0.4rem] flex gap-[1.2rem]"
        onClick={() => navigate(`/${paths.BLOGS}/${blog?.attributes?.slug}`)}
      >
        <div className="h-[20rem] w-[30rem] relative">
          <img
            src={`${baseUrl}${blog?.attributes?.avatar?.data?.attributes?.url}`}
            alt="avatar"
            className="w-full h-full object-cover rounded-[0.8rem]"
          />
          <div className="bg-[#F94144] p-[0.4rem] absolute top-[4%] left-[2%] rounded-[0.4rem]">
            <p className="text-[1.2rem] font-bold text-white">
              {blog?.attributes?.blog_category?.data?.attributes?.name ||
                "Unknown"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-[1.6rem] font-semibold text-justify">
            {blog?.attributes?.title}
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

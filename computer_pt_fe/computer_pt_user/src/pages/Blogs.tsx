import BlogItem from "@/components/pages/Blogs/BlogItem";

function Blogs() {
  return (
    <div className="flex justify-between items-center">
      <div className="max-w-[1440px] px-[8rem] h-[7rem] mx-auto mt-[2.4rem] min-h-[100vh]">
        <div className="flex flex-col gap-[1.2rem]">
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <BlogItem type="text-thumbnail" />
            <BlogItem type="text-thumbnail" />
          </div>
          <div className="grid grid-cols-3 gap-[1.2rem]">
            <BlogItem type="vertical" />
            <BlogItem type="vertical" />
            <BlogItem type="vertical" />
          </div>

          <div className="flex flex-col gap-[1.2rem]">
            <BlogItem type="horizontal" />
            <BlogItem type="horizontal" />
            <BlogItem type="horizontal" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;

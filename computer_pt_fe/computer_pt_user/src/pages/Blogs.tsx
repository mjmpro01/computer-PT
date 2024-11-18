import blogsApi from "@/api/blogsApi";
import FooterComponent from "@/components/layout/Footer";
import HeaderComponent from "@/components/layout/Header";
import BlogItem from "@/components/pages/Blogs/BlogItem";
import { BaseData } from "@/types/base/baseData";
import { BlogType } from "@/types/reponse/blog";
import { useEffect, useState } from "react";

function Blogs() {
  const [blogs, setBlogs] = useState<BaseData<BlogType>[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      await blogsApi
        ?.getAll()
        .then((res) => {
          if (res) {
            console.log(res);
            setBlogs(res?.data);
          }
        })
        .catch((errors) => console.log(errors));
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <HeaderComponent />

      {/* Nội dung chính */}
      <div className="flex-grow pt-[6rem] my-[2.4rem]">
        {blogs?.length === 0 ? (
          <div>
            <p className="">Chưa có bài viết</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="max-w-[1440px] px-[8rem] h-full mx-auto mt-[2.4rem]">
              <div className="flex flex-col gap-[1.2rem]">
                <div className="grid grid-cols-2 gap-[1.2rem]">
                  {blogs?.length > 0 &&
                    blogs
                      ?.slice(0, 2)
                      .map((blog, index) => (
                        <BlogItem
                          type="text-thumbnail"
                          key={index}
                          blog={blog}
                        />
                      ))}
                </div>
                <div className="grid grid-cols-3 gap-[1.2rem]">
                  {blogs?.length > 0 &&
                    blogs
                      ?.slice(2, 5)
                      .map((blog, index) => (
                        <BlogItem type="vertical" key={index} blog={blog} />
                      ))}
                </div>

                <div className="flex flex-col gap-[1.2rem] mt-[2.4rem]">
                  {blogs?.length > 0 &&
                    blogs
                      ?.slice(6, 10)
                      .map((blog, index) => (
                        <BlogItem type="horizontal" key={index} blog={blog} />
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default Blogs;

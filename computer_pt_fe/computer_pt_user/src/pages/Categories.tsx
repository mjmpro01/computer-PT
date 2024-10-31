import selectProductApi from "@/api/selectProductApi";
import { BaseData } from "@/types/base/baseData";
import { SeletionProductsType } from "@/types/common/seletProducts";
import { useEffect, useState } from "react";

function Categories() {
  const [seletProducts, setSeletProducts] = useState<
    BaseData<SeletionProductsType>[]
  >([]);
  useEffect(() => {
    const fetchSelectProducts = async () => {
      await selectProductApi
        .getAll()
        .then((res) => {
          if (res) {
            setSeletProducts(res?.data);
          }
        })
        .catch((errors) => console.log(errors));
    };
    fetchSelectProducts();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px]">
        <div className="bg-white rounded-[0.4rem] p-[2rem] flex flex-col gap-[2.4rem]">
          <div className="flex gap-[1rem]">
            <h3 className="text-[1.6rem] font-medium w-[15rem]">Khoảng giá:</h3>
            <ul className="flex flex-wrap items-center gap-[1rem]">
              {seletProducts?.length > 0 &&
                seletProducts?.map((item, index) => (
                  <li
                    className="text-[1.6rem] bg-[#F8F8F8] rounded-[0.4rem] border p-[0.5rem_1rem] text-nowrap cursor-pointer"
                    key={index}
                  >
                    {item?.attributes?.name}
                  </li>
                ))}
            </ul>
          </div>
          <h3 className="text-[1.6rem] font-medium w-[15rem]">
            Chọn tiêu chí:
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Categories;

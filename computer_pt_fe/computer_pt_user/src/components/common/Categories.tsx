import categoriesApi from "@/api/categoriesApi";
import { BaseData } from "@/types/base/baseData";
import { CategoriesType } from "@/types/common/categories";
import paths from "@/utils/constants/paths";
import variables from "@/utils/constants/variables";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoriesComponent() {
  const [categories, setCategories] = useState<BaseData<CategoriesType>[]>([]);
  const [selectedCategories, setSelectedCategories] =
    useState<BaseData<CategoriesType>>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      await categoriesApi
        .getAll()
        .then((res) => {
          if (res) {
            setCategories(res?.data);
          }
        })
        .catch((errors) => console.log(errors));
    };
    fetchCategories();
  }, []);
  const category_lv1 = categories.filter(
    (item) => item?.attributes?.level === variables.LEVEL_1
  );
  return (
    <div className="min-w-[80rem] min-h-[30rem] flex gap-[1.2rem]">
      <ul className="flex flex-col gap-[1.2rem] w-[15rem] border-r">
        {category_lv1?.length > 0 &&
          category_lv1.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-[0.8rem] cursor-pointer"
            >
              {item?.attributes?.level === variables?.LEVEL_1 && (
                <span
                  className={`text-[1.6rem] font-medium hover:text-[#B562A3] duration-300 ${
                    selectedCategories?.id === item?.id ? "text-[#B562A3]" : ""
                  }`}
                  onClick={() => setSelectedCategories(item)}
                >
                  {item?.attributes?.name}
                </span>
              )}
            </li>
          ))}
      </ul>
      <div className="px-[1rem]">
        <ul className="grid grid-cols-4 gap-[1.2rem]">
          {selectedCategories &&
            selectedCategories?.attributes?.chid?.data?.map((item, index) => (
              <li key={index} className="flex flex-col gap-[0.8rem]">
                <span className="font-medium">{item?.attributes?.name}</span>
                {item?.attributes?.chid?.data?.length > 0 &&
                  item?.attributes?.chid?.data?.map((item3, index3) => (
                    <span
                      key={index3}
                      className="text-[1.2rem] hover:text-[#B562A3] duration-300 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `${paths.CATEGORIES}/${item3?.attributes?.slug}`
                        )
                      }
                    >
                      {item3?.attributes?.name}
                    </span>
                  ))}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesComponent;

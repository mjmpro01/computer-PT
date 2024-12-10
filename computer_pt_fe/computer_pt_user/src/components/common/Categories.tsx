import categoriesApi from "@/api/categoriesApi";
import { BaseData } from "@/types/base/baseData";
import { CategoriesType } from "@/types/common/categories";
import paths from "@/utils/constants/paths";
import variables from "@/utils/constants/variables";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoriesComponent() {
  const [categories, setCategories] = useState<BaseData<CategoriesType>[]>([]);
  const [hoveredCategory, setHoveredCategory] =
    useState<BaseData<CategoriesType> | null>(null);
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

  const handleMouseEnterCategory = (category: BaseData<CategoriesType>) => {
    setHoveredCategory(category);
  };

  return (
    <div className="min-w-[80rem] min-h-[30rem] flex gap-[1.2rem]">
      {/* Wrapper for both parent category and subcategories */}
      <div
        className="flex gap-[1.2rem]"
        onMouseEnter={() => setHoveredCategory(hoveredCategory)} // Keep subcategories visible if within the wrapper
        // onMouseLeave={handleMouseLeaveCategory} // Hide subcategories if the mouse leaves the entire wrapper
      >
        {/* Parent categories */}
        <ul className="flex flex-col gap-[1.2rem] w-[15rem] border-r">
          {category_lv1?.length > 0 &&
            category_lv1.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-[0.8rem] cursor-pointer"
                onMouseEnter={() => handleMouseEnterCategory(item)} // Hover to show subcategories
                // onMouseLeave={handleMouseLeaveCategory} // Leave to hide subcategories
                onClick={() =>
                  navigate(`${paths.CATEGORIES}/${item?.attributes?.slug}`)
                }
              >
                {item?.attributes?.level === variables?.LEVEL_1 && (
                  <span
                    className={`text-[1.6rem] font-medium hover:text-[#1435C5] duration-300 ${
                      hoveredCategory?.id === item?.id ? "text-[#1435C5]" : ""
                    }`}
                  >
                    {item?.attributes?.name}
                  </span>
                )}
              </li>
            ))}
        </ul>

        {/* Subcategories */}
        <div className="px-[1rem] relative">
          <ul className="grid grid-cols-4 gap-[1.2rem]">
            {hoveredCategory &&
              hoveredCategory?.attributes?.chid?.data?.length > 0 &&
              hoveredCategory?.attributes?.chid?.data?.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col gap-[0.8rem]"
                  // onMouseEnter={() => setHoveredCategory(item)} // Hover over subcategory
                  // onMouseLeave={handleMouseLeaveCategory} // Leave subcategory to hide
                >
                  <span
                    className="font-medium hover:text-[#1435C5] cursor-pointer"
                    onClick={() =>
                      navigate(`${paths.CATEGORIES}/${item?.attributes?.slug}`)
                    }
                  >
                    {item?.attributes?.name}
                  </span>
                  {item?.attributes?.chid?.data?.length > 0 &&
                    item?.attributes?.chid?.data?.map((item3, index3) => (
                      <span
                        key={index3}
                        className="text-[1.2rem] hover:text-[#1435C5] duration-300 cursor-pointer"
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
    </div>
  );
}

export default CategoriesComponent;

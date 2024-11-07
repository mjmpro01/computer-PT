/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import PcItem from "./PcItem";
import { useEffect, useState } from "react";
import { BaseData } from "@/types/base/baseData";
import { CategoriesType } from "@/types/common/categories";
import categoriesApi from "@/api/categoriesApi";
import variables from "@/utils/constants/variables";
import useCartStore from "@/stores/useCartStore";
import { formatMoney } from "@/utils/functions/formatMoney";
import userBuildPcStore from "@/stores/useBuildPcStrore";

function ContentBuildPC() {
  const [categories, setCategories] = useState<BaseData<CategoriesType>[]>([]);
  const { items: buildItems, calculateTotal, setItems } = userBuildPcStore();
  const { addItem } = useCartStore();

  const total = calculateTotal();

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

  const handleAddBuildToCart = () => {
    buildItems.forEach((item) => {
      const { idCategory, ...cartItem } = item;
      addItem(cartItem);
    });

    localStorage.removeItem("buildConfig");
    setItems([]);
    window.location.reload();
  };

  const category_lv1 = categories.filter(
    (item) => item?.attributes?.level === variables.LEVEL_1
  );

  return (
    <div className="mt-[2.4rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <Button
            className="h-[4rem] bg-[#1435C3] text-white"
            onClick={() => window.location.reload()}
          >
            Làm mới
          </Button>
          <Button
            className="h-[4rem] bg-[#1435C3] text-white"
            onClick={handleAddBuildToCart} // Use handler to add build to cart and clear storage
          >
            Thêm cấu hình vào giỏ hàng
          </Button>
        </div>
        <p className="text-[1.6rem] font-bold text-red-600">
          Chi phí dự tính: {formatMoney(total)}
        </p>
      </div>
      <div className="my-[2.4rem] flex flex-col gap-[0.4rem]">
        {category_lv1?.length > 0 &&
          category_lv1.map((category, index) =>
            category?.attributes?.level === variables?.LEVEL_1 ? (
              <PcItem category={category} key={index} index={index + 1} />
            ) : null
          )}
      </div>
    </div>
  );
}

export default ContentBuildPC;

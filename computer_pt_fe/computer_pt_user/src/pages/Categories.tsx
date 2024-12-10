import categoriesApi from "@/api/categoriesApi";
import selectCategoryApi from "@/api/selectCategoryApi";
import selectProductApi from "@/api/selectProductApi";
import ProductComp from "@/components/common/ProductComp";
import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import { SeletionProductsType } from "@/types/common/seletProducts";
import { CategorySelectionType } from "@/types/reponse/selectCategory";
import { splitCategories } from "@/utils/functions/splitCategories";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Categories() {
  const [seletProducts, setSeletProducts] = useState<
    BaseData<CategorySelectionType>[]
  >([]);
  const [productCategory, setProductCategory] = useState<
    BaseData<ProductType>[]
  >([]);
  const [id1, setID1] = useState<number | null>();
  const [id2, setID2] = useState<number | null>();
  const [selectedRangePrice1, setSelectedRangePrice1] =
    useState<BaseData<SeletionProductsType> | null>(null);
  const [selectedRangePrice2, setSelectedRangePrice2] =
    useState<BaseData<SeletionProductsType> | null>(null);
  const { slug } = useParams();

  const filterData = () => {
    if (selectedRangePrice1 && selectedRangePrice2) {
      // Khi cả 2 selectedRangePrice đều có giá trị, lọc giữa chúng
      return selectedRangePrice1?.attributes?.products?.data?.filter((item1) =>
        selectedRangePrice2?.attributes?.products?.data?.some(
          (item2) => item2?.id === item1?.id
        )
      );
    } else if (selectedRangePrice1) {
      // Nếu chỉ có selectedRangePrice1, trả về tất cả sản phẩm từ selectedRangePrice1
      return selectedRangePrice1?.attributes?.products?.data;
    } else if (selectedRangePrice2) {
      // Nếu chỉ có selectedRangePrice2, trả về tất cả sản phẩm từ selectedRangePrice2
      return selectedRangePrice2?.attributes?.products?.data;
    }
    return []; // Trả về mảng rỗng nếu không có giá trị nào được chọn
  };

  const filterData1 = filterData();

  useEffect(() => {
    const fetchSelectCategory = async () => {
      if (slug) {
        await selectCategoryApi
          .get(slug)
          .then((res) => {
            if (res) {
              setSeletProducts(res?.data);
              console.log(res?.data);
            }
          })
          .catch((errors) => console.log(errors));
      }
    };
    const fetchProductCategory = async () => {
      if (slug) {
        await categoriesApi
          .getBySlug(slug)
          .then((res) => {
            if (res) {
              setProductCategory(res?.data?.attributes?.products?.data);
            }
          })
          .catch((errors) => console.log(errors));
      }
    };
    const fetchProductByID = async () => {
      if (id1) {
        await selectProductApi
          .getById(id1)
          .then((res) => {
            if (res) {
              setSelectedRangePrice1(res?.data);
            }
          })
          .catch((errors) => console.log(errors));
      }
    };
    const fetchProductByID2 = async () => {
      if (id2) {
        await selectProductApi
          .getById(id2)
          .then((res) => {
            if (res) {
              setSelectedRangePrice2(res?.data);
            }
          })
          .catch((errors) => console.log(errors));
      }
    };
    fetchProductByID2();
    fetchProductByID();
    fetchProductCategory();
    fetchSelectCategory();
  }, [slug, id1, id2]);

  const lastesData =
    filterData1 && filterData1?.length > 0 ? filterData1 : productCategory;
  return (
    <div className="flex items-center justify-center">
      <div className="px-[8rem] h-full w-full max-w-[1440px] flex flex-col gap-[2.4rem]">
        <div className="bg-white rounded-[0.4rem] p-[2rem] flex flex-col gap-[2.4rem]">
          <div className="grid grid-cols-[15%_80%] gap-[1rem]">
            <h3 className="text-[1.6rem] font-medium w-[15rem]">Khoảng giá:</h3>
            <ul className="flex flex-wrap items-center gap-[1rem]">
              {seletProducts?.length > 0 &&
                seletProducts?.[0]?.attributes?.product_seletions?.data?.map(
                  (item, index) =>
                    item?.attributes?.is_price_range && (
                      <li
                        className={`text-[1.6rem] bg-[#F8F8F8] rounded-[0.4rem] border p-[0.5rem_1rem] text-nowrap cursor-pointer ${
                          id1 === item?.id
                            ? "bg-[#F8F8F8] text-[#1435C5] border-[#1435C5]"
                            : "bg-[#F8F8F8]"
                        }`}
                        key={index}
                        onClick={() => setID1(item?.id)}
                      >
                        {splitCategories(item?.attributes?.name)}
                      </li>
                    )
                )}
            </ul>
          </div>
          <div className="grid grid-cols-[15%_80%] gap-[1rem]">
            <h3 className="text-[1.6rem] font-medium w-[15rem]">Tiêu chí:</h3>
            <ul className="flex flex-wrap items-center gap-[1rem]">
              {seletProducts?.length > 0 &&
                seletProducts?.[0]?.attributes?.product_seletions?.data?.map(
                  (item, index) =>
                    !item?.attributes?.is_price_range && (
                      <li
                        className={`text-[1.6rem] bg-[#F8F8F8] rounded-[0.4rem] border p-[0.5rem_1rem] text-nowrap cursor-pointer ${
                          id2 === item?.id
                            ? "bg-[#F8F8F8] text-[#1435C5] border-[#1435C5]"
                            : "bg-[#F8F8F8]"
                        }`}
                        key={index}
                        onClick={() => setID2(item?.id)}
                      >
                        {splitCategories(item?.attributes?.name)}
                      </li>
                    )
                )}
            </ul>
          </div>
          <div className="grid grid-cols-[15%_80%]">
            <h3 className="text-[1.6rem] font-medium w-[15rem]">Tiêu chí:</h3>
            <div className="flex items-center gap-[1.2rem]">
              {selectedRangePrice1 && (
                <p className="bg-[#F8F8F8] text-[1.4rem] w-fit rounded-[0.4rem] border p-[0.5rem_1rem]">
                  {splitCategories(selectedRangePrice1?.attributes?.name)}
                </p>
              )}
              {selectedRangePrice2 && (
                <p className="bg-[#F8F8F8] text-[1.4rem] w-fit rounded-[0.4rem] border p-[0.5rem_1rem]">
                  {splitCategories(selectedRangePrice2?.attributes?.name)}
                </p>
              )}
              <Button
                className="w-[200px] bg-[#1435C5]"
                type="primary"
                onClick={() => {
                  setID1(null);
                  setID2(null);
                  setSelectedRangePrice1(null);
                  setSelectedRangePrice2(null);
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white p-[2rem] rounded-[0.4rem] grid grid-cols-5 gap-[1rem]">
          {lastesData &&
            lastesData?.length > 0 &&
            lastesData?.map((item, index) => (
              <ProductComp product={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;

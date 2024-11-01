import images from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faComputer,
  faList,
  faMagnifyingGlass,
  faNewspaper,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Image, Popover } from "antd";
import CategoriesComponent from "../common/Categories";
import CartHeader from "../common/CartHeader";
import paths from "@/utils/constants/paths";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/stores/useCartStore";
import { getUserProfile } from "@/utils/functions/getUser";
import { useEffect, useState } from "react";
import { BaseData } from "@/types/base/baseData";
import { ProductType } from "@/types/common/product";
import productApi from "@/api/productApi";
import baseUrl from "@/types/base/baseUrl";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  const { getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();
  const [products, setProducts] = useState<BaseData<ProductType>[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<
    BaseData<ProductType>[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await productApi
        .getAll()
        .then((res) => {
          if (res) {
            setProducts(res?.data);
          }
        })
        .catch((errors) => console.log(errors));
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      const results = products.filter((product) =>
        product.attributes.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (slug: string) => {
    navigate(`${paths.PRODUCTS}/${slug}`);
    setQuery("");
    setFilteredProducts([]);
  };
  const handleNavigate = () => {
    if (profile?.id) {
      navigate(`${paths.PROFILE}/${paths.INFORMATION}`);
    } else {
      navigate(paths.LOGIN);
    }
  };

  return (
    <div className="border-b fixed w-full flex items-center justify-center bg-white z-50">
      <div className="max-w-[1440px] px-[8rem] h-[7rem] w-full flex justify-between items-center">
        <div
          className="flex items-center gap-[0.8rem] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={images.logo}
            alt="logo"
            className="w-[5rem] h-[5rem] object-cover"
          />
          <p className="text-black text-[2rem] font-medium">Computer P&T</p>
        </div>

        <div className="flex items-center gap-[1.2rem] flex-1 px-[4rem] relative">
          <Popover
            content={<CategoriesComponent />}
            trigger="click"
            placement="bottomLeft"
          >
            <div className="flex items-center gap-[0.8rem] text-[1.2rem] text-[#808080] border rounded-[0.4rem] p-[1rem] h-[4rem] cursor-pointer hover:bg-[rgba(0,0,0,0.1)] duration-300">
              <FontAwesomeIcon icon={faList} />
              <p className="text-[#808080] text-[1.2rem] font-medium">
                Danh mục sản phẩm
              </p>
            </div>
          </Popover>

          <Popover
            content={
              <div className="max-h-[20rem] overflow-y-auto w-[53rem]">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      handleProductClick(product?.attributes?.slug)
                    }
                    className="p-[1rem] hover:bg-gray-100 cursor-pointer flex items-center gap-[1rem]"
                  >
                    <Image
                      src={`${baseUrl}${product?.attributes?.avatar?.data?.attributes?.url}`}
                      alt="product-image"
                      className="w-[5rem] h-[5rem]"
                      preview={false}
                    />
                    <p className="text-[1.4rem] line-clamp-2">
                      {product?.attributes?.name}
                    </p>
                  </div>
                ))}
              </div>
            }
            trigger="click"
            open={filteredProducts?.length > 0}
          >
            <div className="flex-1 bg-[#F5F5F5] h-[4.2rem] border rounded-[0.4rem] flex items-center gap-[0.8rem] p-[0.8rem_1rem] text-[1.4rem] relative">
              <input
                className="h-full flex-1 bg-transparent focus:outline-none"
                placeholder="Bạn đang tìm sản phẩm gì"
                value={query}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="font-normal cursor-pointer"
              />
            </div>
          </Popover>
        </div>

        <div className="flex items-center gap-[1.2rem]">
          <div
            className="group flex items-center cursor-pointer flex-col"
            onClick={() => navigate(paths.BUILD_PC)}
          >
            <FontAwesomeIcon
              icon={faComputer}
              className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
            />
            <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">
              Xây dựng cấu hình
            </p>
          </div>

          <Popover
            content={<CartHeader />}
            trigger="hover"
            placement="bottomRight"
          >
            <div className="group flex items-center cursor-pointer flex-col">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
              />
              <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">{` Giỏ hàng (${totalQuantity})`}</p>
            </div>
          </Popover>
          <div
            className="group flex items-center cursor-pointer flex-col"
            onClick={() => navigate(paths.BLOGS)}
          >
            <FontAwesomeIcon
              icon={faNewspaper}
              className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
            />
            <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">
              Tin tức công nghệ
            </p>
          </div>
          <div
            className="group flex items-center cursor-pointer flex-col"
            onClick={handleNavigate}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="font-normal text-[2rem] text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300"
            />
            <p className="text-[1.2rem] font-medium text-[#808080] group-hover:text-[#1435C5] group-hover:duration-300">
              {profile?.id
                ? profile?.fullname || profile?.email
                : "Đăng nhập/ Đăng ký"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

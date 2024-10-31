import icons from "@/assets/icons";
import ProductBuild from "@/components/common/ProductBuild";
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import BuildPCItem from "./BuildPCItem";
import { BaseData } from "@/types/base/baseData";
import { CategoriesType } from "@/types/common/categories";
import userBuildPcStore from "@/stores/useBuildPcStrore";
import { BuildPCType } from "@/types/common/buildPC";

interface PcItemProps {
  category: BaseData<CategoriesType>;
  index: number;
}

function PcItem({ category, index }: PcItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<BuildPCType | null>(
    null
  );
  const { items, addProduct, removeProduct } = userBuildPcStore();

  // Set initial selected product if it exists in the store
  useEffect(() => {
    const existingProduct = items.find(
      (item) => item.idCategory === category.id
    );
    if (existingProduct) {
      setSelectedProduct(existingProduct);
    }
  }, [items, category.id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectProduct = (product: BuildPCType) => {
    setSelectedProduct(product);

    const existingProduct = items.find(
      (item) => item.idCategory === category.id
    );
    if (existingProduct) {
      removeProduct(existingProduct.id);
    }

    addProduct(product);
    handleOk();
  };

  const handleRemoveProduct = () => {
    if (selectedProduct) {
      removeProduct(selectedProduct.id);
      setSelectedProduct(null);
    }
  };

  const filteredProducts = category?.attributes?.products?.data?.filter(
    (item) =>
      item?.attributes?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h-[10rem] bg-white grid grid-cols-[30%_70%] border items-center justify-center shadow-sm">
        <div className="w-full border-r-[0.1rem] h-full flex items-center p-[2rem]">
          <p className="text-[1.6rem] font-bold uppercase">
            {`${index}. ${category?.attributes?.name}`}
          </p>
        </div>
        <div className="w-full">
          {selectedProduct !== null ? (
            <>
              <ProductBuild
                product={selectedProduct}
                onRemove={handleRemoveProduct}
              />
            </>
          ) : (
            <div className="flex items-center justify-center">
              <Button
                className="text-[#1435C3] border-[#a7a8ad] w-[20rem] h-[4rem]"
                onClick={showModal}
              >
                Chọn thiết bị
              </Button>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
        closable={false}
        rootClassName="modal-select"
        width={800}
      >
        <div className="bg-[#1435C3] p-[1rem_2rem] flex items-center justify-between">
          <h2 className="text-[2rem] font-bold text-white">Chọn linh kiện</h2>
          <div className="bg-white rounded-[0.4rem] flex items-center gap-[1rem] p-[0.5rem_1rem] w-[50rem]">
            <input
              placeholder="Bạn cần tìm linh kiện gì?"
              className="flex-1 bg-transparent focus-within:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={icons.search} alt="search-icon" />
          </div>
          <button onClick={handleCancel}>
            <img src={icons.xIcon} alt="x-icon" />
          </button>
        </div>
        <div
          className={`min-h-[30rem] p-[1rem] ${
            filteredProducts?.length > 0
              ? ""
              : "flex items-center justify-center"
          }`}
        >
          {filteredProducts?.length > 0 ? (
            <div className="flex flex-col gap-[1rem]">
              {filteredProducts.map((item, itemIndex) => (
                <BuildPCItem
                  product={item}
                  key={itemIndex}
                  onAdd={() =>
                    handleSelectProduct({
                      idCategory: category?.id,
                      price: item?.attributes?.price,
                      promotionPrice: item?.attributes?.promotion_price,
                      avatar: item?.attributes?.avatar?.data?.attributes?.url,
                      quantity: 1,
                      slug: item?.attributes?.slug,
                      name: item?.attributes?.name,
                      id: item?.id,
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-[1.6rem]">
              Không có sản phẩm phù hợp
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default PcItem;

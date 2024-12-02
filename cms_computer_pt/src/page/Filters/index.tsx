import { Tabs, TabsProps } from "antd";
import ProductSelection from "./ProductSelections";
import CategoriesSelections from "./CategorySelections";

function Filters() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Danh mục tiêu chí",
      children: <ProductSelection />,
    },
    {
      key: "2",
      label: "Danh mục phân loại",
      children: <CategoriesSelections />,
    },
  ];
  return (
    <div className="p-[10px]">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Filters;

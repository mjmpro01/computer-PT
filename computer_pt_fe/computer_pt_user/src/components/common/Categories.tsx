import { faDesktop, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategoriesComponent() {
  const categories = [
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      name: "Màn hình",
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      name: "Bàn phím",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      name: "Link kiện PC",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      name: "Thiết bị văn phòng",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      name: "PC",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      name: "PC",
    },
  ];
  return (
    <div className="min-w-[50rem] min-h-[30rem]">
      <ul className="flex gap-[2.4rem]">
        {categories.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-[0.8rem] cursor-pointer"
          >
            <span>{item?.icon}</span>
            <span className="text-[1.4rem] font-medium hover:text-[#1435C3] duration-300">
              {item?.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesComponent;

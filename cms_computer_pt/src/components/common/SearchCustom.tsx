import icons from "../../assets/icons";

interface SearchCustomProps {
  value: string;
  setValue: (input: string) => void;
  className?: string;
}
function SearchCustom({ value, setValue, className }: SearchCustomProps) {
  const handleClear = () => {
    setValue("");
  };
  return (
    <div
      className={`flex items-center gap-[4px] p-[10px] rounded-[4px] border relative  bg-white ${className}`}
    >
      <button className="w-[20px] h-[20px]">
        <img src={icons.search} alt="icon-search" />
      </button>
      <input
        placeholder="Tìm kiếm..."
        className="h-full w-full focus-within:outline-none bg-transparent"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== "" && (
        <button
          className="w-[18px] h-[18px] absolute top-[27%] right-[1%]"
          onClick={handleClear}
        >
          <img src={icons.x} alt="icon-search" />
        </button>
      )}
    </div>
  );
}

export default SearchCustom;

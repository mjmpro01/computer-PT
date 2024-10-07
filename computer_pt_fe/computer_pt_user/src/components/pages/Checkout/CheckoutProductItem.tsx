function CheckoutProductItem() {
  return (
    <div className="flex gap-[0.8rem] items-center">
      <div className="size-[6.24rem]">
        <img
          src="https://lh3.googleusercontent.com/UE9L3DwlVtE3pZnCwR29zgrf_SjHNOdopT3sunQbPWvIdYB3NYNanTkL-g9YNubL65chw7m1j4z7mEs53g=rw"
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-[1.4rem] hover:text-[#0d6efd] duration-300 cursor-pointer line-clamp-1">
          Ổ cứng SSD Kingston A400 240GB Sata 3 (SA400S37/240G)
        </p>
        <p className="text-[1.2rem] text-[#82869e]">240GB, Đen</p>
        <p className="text-[1.2rem] text-[#82869e]">Số lượng 1</p>
        <p className="text-[1.4rem] font-bold">669.000đ</p>
        <p className="text-[1.2rem] text-[#828693] line-through">919.000₫</p>
      </div>
    </div>
  );
}

export default CheckoutProductItem;

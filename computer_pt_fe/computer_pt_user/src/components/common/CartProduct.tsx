function CartProduct() {
  return (
    <div className="flex gap-[0.8rem]">
      <img
        src="https://lh3.googleusercontent.com/H_IYdCggl7PzlnWqNw2m6xlhYoN_Xps-t5UTXML5zRqaB5Z7peaAajgntlaolhNoPHhj2BBXmnFbN8ejVhfJ8ssFl2uLbvuw=w230-rw"
        alt="image"
        className="size-[7rem] object-cover"
      />
      <div className="flex flex-col">
        <p className="text-[1.4rem] font-medium line-clamp-1">
          Laptop Acer Gaming Aspire 7 A715-76G-59MW (i5-12450H) (Đen)
        </p>
        <p className="text-[1.2rem] text-[#808080]">Số lượng: 1</p>
        <p className="text-[1.6rem] font-bold">700.000đ</p>
      </div>
    </div>
  );
}

export default CartProduct;

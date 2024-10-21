import useCartStore from "@/stores/useCartStore";
import { CartItem } from "@/types/common/cart";

export const addToCart = (item: CartItem) => {
  const addItem = useCartStore.getState().addItem;

  addItem(item);

  const currentCart = useCartStore.getState().items;
  localStorage.setItem("cart", JSON.stringify(currentCart));
};

import { create } from "zustand";
import { CartItem } from "@/types/common/cart";
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const useCartStore = create<CartState>((set) => {
  const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      return JSON.parse(storedCart) as CartItem[];
    }
    return [];
  };

  const initialItems = loadCartFromStorage();

  set({ items: initialItems });

  return {
    items: initialItems,

    addItem: (item: CartItem): void => {
      set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);

        if (existingItem) {
          const updatedItems = state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );

          localStorage.setItem("cart", JSON.stringify(updatedItems));

          return { items: updatedItems };
        } else {
          const newItems = [...state.items, { ...item, quantity: 1 }];

          localStorage.setItem("cart", JSON.stringify(newItems));

          return { items: newItems };
        }
      });
    },

    removeItem: (id: number): void =>
      set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
      }),

    clearCart: (): void => {
      set({ items: [] });
      localStorage.removeItem("cart");
    },

    getTotalPrice: (): number => {
      const { items } = useCartStore.getState();
      return items.reduce((total: number, item: CartItem) => {
        const price =
          Number(item.promotionPrice) > 0
            ? Number(item.promotionPrice)
            : Number(item.price);
        return total + price * item.quantity;
      }, 0);
    },

    getTotalQuantity: (): number => {
      const { items } = useCartStore.getState();
      return items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },
  };
});

export default useCartStore;

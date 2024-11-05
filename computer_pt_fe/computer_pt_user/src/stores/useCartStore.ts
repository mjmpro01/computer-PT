import { create } from "zustand";
import { CartItem } from "@/types/common/cart";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  decrementItem: (id: number) => void; // New decrement function
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const useCartStore = create<CartState>((set) => {
  const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
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

    decrementItem: (id: number): void => {
      set((state) => {
        const updatedItems = state.items
          .map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0); // Filter out items with 0 quantity

        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return { items: updatedItems };
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
      return items.reduce((total, item) => {
        const price =
          Number(item.promotionPrice) > 0
            ? Number(item.promotionPrice)
            : Number(item.price);
        return total + price * item.quantity;
      }, 0);
    },

    getTotalQuantity: (): number => {
      const { items } = useCartStore.getState();
      return items.reduce((total, item) => total + item.quantity, 0);
    },
  };
});

export default useCartStore;

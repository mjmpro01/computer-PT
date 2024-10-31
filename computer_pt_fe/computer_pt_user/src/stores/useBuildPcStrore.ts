import { create } from "zustand";
import { BuildPCType } from "@/types/common/buildPC";

interface BuildPCState {
  items: BuildPCType[];
  addProduct: (product: BuildPCType) => void;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  calculateTotal: () => number;
  setItems: (items: BuildPCType[]) => void; // New method to set/reset items
}

// Load data from localStorage
const loadInitialState = (): BuildPCType[] => {
  try {
    const savedState = localStorage.getItem("pc-config");
    return savedState ? JSON.parse(savedState) : [];
  } catch (error) {
    console.error("Failed to load from localStorage", error);
    return [];
  }
};

const userBuildPcStore = create<BuildPCState>((set) => ({
  items: loadInitialState(),

  addProduct: (product: BuildPCType) =>
    set((state) => {
      const updatedItems = [...state.items, product];
      localStorage.setItem("pc-config", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  removeProduct: (productId: number) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("pc-config", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  updateProductQuantity: (productId: number, quantity: number) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("pc-config", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),

  calculateTotal: (): number => {
    return userBuildPcStore
      .getState()
      .items.reduce((total: number, item: BuildPCType) => {
        const priceToUse: number =
          item.promotionPrice &&
          Number(item.promotionPrice) > 0 &&
          item.promotionPrice < item.price
            ? Number(item.promotionPrice)
            : Number(item.price);

        return total + priceToUse * item.quantity;
      }, 0);
  },

  setItems: (items: BuildPCType[]) => {
    // Sets the items and updates localStorage
    localStorage.setItem("pc-config", JSON.stringify(items));
    set({ items });
  },
}));

// Subscribe to changes and save to localStorage
userBuildPcStore.subscribe((state) => {
  localStorage.setItem("pc-config", JSON.stringify(state.items));
});

export default userBuildPcStore;

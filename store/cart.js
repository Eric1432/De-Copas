import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false,

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            String(item.id) === String(product.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true,
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
        isOpen: true,
      };
    }),

  increaseQty: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

    decreaseQty: (productId) =>
      set((state) => ({
        cart: state.cart
          .map((item) =>
            String(item.id) === String(productId)
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0), 
      })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => String(item.id) !== String(productId)
      ),
    })),

  clearCart: () => set({ cart: [] }),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));

import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false, // controla si el sidebar está abierto

  // Agregar producto o aumentar cantidad
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
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
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQty: (productId) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // 👉 NUEVO: para que funcione el tacho de basura
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));

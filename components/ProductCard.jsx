"use client";

import { useCartStore } from "@/store/cart";

export default function ProductCard({ product }) {
  const { id, name, price, image } = product;

  const addToCart = useCartStore((s) => s.addToCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const cart = useCartStore((s) => s.cart);

  // Ver si el producto ya está en el carrito
  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  // Precio total del producto
  const totalPrice = quantity * price;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all border border-gray-200">
      
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-contain mb-4"
      />

      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

      {/* Precio unitario */}
      <p className="text-gray-700 text-sm mb-2">
        Precio unidad:{" "}
        <span className="font-semibold text-gray-900">
          ${price.toLocaleString("es-AR")}
        </span>
      </p>

      {/* --- CONTADOR + TOTAL --- */}
      {quantity > 0 ? (
        <div className="flex items-center justify-between mt-4">

          {/* Contador */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQty(id)}
              className="w-9 h-9 rounded-lg border border-gray-400 flex items-center justify-center hover:bg-gray-200 active:scale-95"
            >
              <span className="text-lg font-bold text-gray-700">−</span>
            </button>

            <span className="w-7 text-center font-semibold text-gray-900">
              {quantity}
            </span>

            <button
              onClick={() => increaseQty(id)}
              className="w-9 h-9 rounded-lg border border-gray-400 flex items-center justify-center hover:bg-gray-200 active:scale-95"
            >
              <span className="text-lg font-bold text-gray-700">+</span>
            </button>
          </div>

          {/* Total del producto */}
          <p className="font-bold text-gray-900 text-lg">
            ${totalPrice.toLocaleString("es-AR")}
          </p>

        </div>
      ) : (
        // Botón agregar
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition active:scale-95"
        >
          Agregar
        </button>
      )}
    </div>
  );
}

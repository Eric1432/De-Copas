"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";

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
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all border border-gray-200 flex flex-col">

      {/* Imagen */}
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* Contenido fijo con altura mínima para alinear botones */}
      <div className="flex-1 flex flex-col justify-between min-h-[5rem]">
        <div>
          {/* Nombre */}
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

          {/* Precio unitario */}
          <p className="text-gray-700 text-sm mt-1">
            Precio unidad:{" "}
            <span className="font-semibold text-gray-900">
              ${price.toLocaleString("es-AR")}
            </span>
          </p>
        </div>

        {/* Contador + Total o Botón Agregar */}
        {quantity > 0 ? (
          <div className="flex items-center justify-between mt-4">
            {/* Contador */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(id)}
                className="w-8 h-8 md:w-9 md:h-9 rounded-lg border flex items-center justify-center hover:bg-gray-200 active:scale-95"
              >
                <span className="text-base md:text-lg font-bold text-gray-700">−</span>
              </button>
              <span className="w-6 md:w-7 text-center font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => increaseQty(id)}
                className="w-8 h-8 md:w-9 md:h-9 rounded-lg border flex items-center justify-center hover:bg-gray-200 active:scale-95"
              >
                <span className="text-base md:text-lg font-bold text-gray-700">+</span>
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
            onClick={() => addToCart({ ...product, quantity: 1, img: product.image })}
            className="w-full mt-4 bg-gray-900 text-white py-2 text-xs md:py-3 md:text-sm rounded-lg hover:bg-black transition active:scale-95"
          >
            Agregar
          </button>
        )}
      </div>
    </div>
  );
}

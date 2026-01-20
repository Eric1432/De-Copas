"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { id, name, price, image } = product;

  const addToCart = useCartStore((s) => s.addToCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const cart = useCartStore((s) => s.cart);

  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;
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

      {/* Contenido */}
      <div className="flex-1 flex flex-col justify-between min-h-[7rem]">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-700 text-sm mt-1">
            Precio unidad:{" "}
            <span className="font-semibold text-gray-900">
              ${price.toLocaleString("es-AR")}
            </span>
          </p>
        </div>

        {quantity > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">

            {/* Contador */}
            <div className="inline-flex items-center border border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => decreaseQty(id)}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center 
                           hover:bg-gray-200 active:scale-95 rounded-l-lg transition cursor-pointer select-none"
              >
                <span className="text-base md:text-lg font-bold text-gray-700">−</span>
              </button>

              <span className="w-8 text-center text-sm md:text-base font-semibold text-gray-900">
                {quantity}
              </span>

              <button
                onClick={() => increaseQty(id)}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center 
                           hover:bg-gray-200 active:scale-95 rounded-r-lg transition cursor-pointer select-none"
              >
                <span className="text-base md:text-lg font-bold text-gray-700">+</span>
              </button>
            </div>

            {/* Total del producto */}
            <p className="font-bold text-gray-900 text-lg text-right sm:text-left">
              ${totalPrice.toLocaleString("es-AR")}
            </p>

          </div>
        ) : (
          <button
            onClick={() =>
              addToCart({ ...product, quantity: 1, img: product.image })
            }
            className="w-full mt-4 bg-gray-900 text-white py-2 text-xs md:py-3 md:text-sm rounded-lg hover:bg-black transition active:scale-95 cursor-pointer"
          >
            Agregar
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";

const products = [
  { id: 1, name: "Fernet branca + Coca Cola", price: 14500, img: "/images/bebidas/fernet-mas-coca.webp" },
  { id: 2, name: "Gancia + Sprite", price: 3200, img: "/images/bebidas/gancia-sprite.webp" },
  { id: 3, name: "Campari + jugo", price: 8900, img: "/images/bebidas/campari-cepita.webp" },
  { id: 4, name: "Gin + Tonica", price: 4800, img: "/images/bebidas/gin-tonica.webp" },
];

export default function FeaturedProducts() {

  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <section className="bg-gray-200 py-10 md:py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
        Combos
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-50 rounded-xl p-4 shadow-sm md:hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Imagen */}
            <div className="relative w-full aspect-square bg-white rounded-lg mb-3">
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-widht: 768px) 100vw, (max-width: 200px) 50vw 25vw"
                className="object-contain p-3"
              />
            </div>

            {/* Título */}
            <p className="font-semibold text-gray-900 leading-snug min-h-[2.5rem] text-sm md:text-base">
              {p.name}
            </p>

            {/* Precio */}
            <p className="text-[#8A1C1C] text-base md:text-lg font-bold mt-2">
              ${p.price.toLocaleString("es-AR")}
            </p>

            {/* Botón */}
            <button 
            onClick={() => addToCart({...p, quantity: 1})}
            className="mt-auto w-full bg-black text-white py-3 text-sm rounded-lg hover:bg-gray-800 transition cursor-pointer">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

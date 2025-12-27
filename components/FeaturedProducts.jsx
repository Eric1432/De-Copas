"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";


const products = [
  { id: 1, name: "Stella Artois 1l", price: 14500, img: "/images/cervezas/stella-litro.avif" },
  { id: 2, name: "Pack 1890", price: 3200, img: "/images/cervezas/1890.avif" },
  
  { id: 3, name: "Fond de Cave Reserva", price: 8900, img: "/images/vinos/fond-de-cave-reserva.avif" },
  { id: 4, name: "Coca Cola 2,25l", price: 4800, img: "/images/bebidas/coca-cola-2-25.avif" },
];

export default function FeaturedProducts() {

  const addToCart = useCartStore((s) => s.addToCart);
  return (
    <section className="bg-gray-300 py-10 md:py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
        Productos destacados
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
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
            <p className="text-[#8A1C1C] text-base md:text-lg font-bold mt-1">
              ${p.price.toLocaleString("es-AR")}
            </p>

            {/* Botón */}
            <button 
            onClick={() => addToCart({...p, quantity: 1})}
            className="mt-auto w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

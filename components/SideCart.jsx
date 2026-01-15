"use client";

import { useCartStore } from "@/store/cart";
import { X } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";

export default function SideCart() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.cart) ?? [];

  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeItem = useCartStore((s) => s.removeFromCart);

  const total = items.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.price),
    0
  );

  const handleCheckout = async () => {
    try {
      const mpItems = items.map((item) => ({
        title: item.name,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
      }));

      const res = await fetch("/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: mpItems }),
      });

      const data = await res.json();

      if (data.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}`;
      } else {
        alert("Error al generar la preferencia");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeCart}
    >
      {/* DRAWER */}
      <div
        className={`absolute right-0 top-0 h-full w-[380px] bg-white shadow-xl transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Tus productos ({items.length} ítems)
          </h2>
          <button onClick={closeCart}>
            <X size={22} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex flex-col overflow-y-auto h-[70vh] px-6">
          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-10">Carrito vacío</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-5 border-b border-gray-200"
            >
              {/* IMAGEN */}
              <div className="relative w-20 h-24 flex-shrink-0 border border-gray-200 bg-white">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 leading-snug">
                  {item.name}
                </p>

                <p className="text-[#8A1C1C] font-medium mt-1">
                  ${Number(item.price).toLocaleString("es-AR")}
                </p>

                {/* CONTADOR */}
                <div className="inline-flex items-center border border-gray-400 mt-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-xl text-gray-500 hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="w-10 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* TOTAL + DELETE */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-600 hover:text-black"
                >
                  <FiTrash2 size={18} />
                </button>

                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-4">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total estimado</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

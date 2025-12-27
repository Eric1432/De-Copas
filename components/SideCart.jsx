"use client";

import { useCartStore } from "@/store/cart";
import { X } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";

export default function SideCart() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.cart) ?? [];

  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeItem = useCartStore((s) => s.removeFromCart);

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={closeCart}
    >
      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-[380px] bg-white shadow-xl p-6 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Tu carrito</h2>
          <button onClick={closeCart}>
            <X size={26} className="text-gray-800" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex flex-col gap-4 overflow-y-auto h-[70vh] pr-1">
          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-10">Carrito vacío</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm"
            >
              {/* IMAGE */}
              <img
                src={item.img}
                className="w-16 h-16 object-contain"
                alt={item.name}
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 leading-tight">
                  {item.name}
                </p>

                {/* Precio unitario (bordó suave + menos grueso) */}
                <p className="text-[#8A1C1C] font-medium mt-1">
                  ${item.price.toLocaleString("es-AR")}
                </p>

                {/* Cantidad label */}
                <p className="text-gray-700 mt-1">Cantidad: {item.quantity}</p>

                {/* Controles */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-10 h-10 rounded-md border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <span className="text-lg font-bold text-gray-700">−</span>
                  </button>

                  <span className="w-4 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-10 h-10 rounded-md border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <span className="text-lg font-bold text-gray-700">+</span>
                  </button>
                </div>
              </div>

              {/* TOTAL Y TRASH */}
              <div className="flex flex-col items-end justify-between">
                {/* Total por producto (bordó suave + menos grueso) */}
                <p className="font-medium text-[#8A1C1C]">
                  ${(item.price * item.quantity).toLocaleString("es-AR")}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-black hover:text-gray-700"
                >
                  <FiTrash2 size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold text-gray-900 mb-3">
            <span>Total:</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>

          {/* Botón finalizar compra */}
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700 transition">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

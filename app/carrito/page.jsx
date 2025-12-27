"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart) ?? [];
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);

  const [total, setTotal] = useState(0);

  // Calculamos total directamente desde `cart` — más robusto
  useEffect(() => {
    const totalCalc = (cart || []).reduce(
      (acc, item) => acc + (item.quantity || 0) * Number(item.price || 0),
      0
    );
    setTotal(totalCalc);
  }, [cart]);

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-6">Añadí productos para verlos aquí.</p>
          <Link href="/cervezas" className="inline-block bg-gray-900 text-white px-4 py-2 rounded">
            Ir a Cervezas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Lista de items */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Carrito</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600">${Number(item.price).toLocaleString("es-AR")}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 rounded border flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 rounded border flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <div className="ml-4">
                  <p className="font-semibold">
                    ${(item.quantity * item.price).toLocaleString("es-AR")}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-600 mt-1"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button onClick={() => clearCart()} className="text-sm text-gray-600">
              Vaciar carrito
            </button>
            <p className="text-sm text-gray-600">{cart.length} productos</p>
          </div>
        </div>

        {/* Resumen / checkout */}
        <aside className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Resumen</h3>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${total.toLocaleString("es-AR")}</span>
          </div>

          <p className="text-sm text-gray-500 mb-6">Envío y descuentos se verán al finalizar la compra.</p>
          <button
          type="button"
          onClick={async () => {
            console.log("Carrito antes de pagar:", cart);

    try {
      const res = await fetch("/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar la preferencia de pago");
      }
    } catch (err) {
      console.error("Error al llamar API:", err);
      alert("Ocurrió un error, intenta nuevamente.");
    }
  }}
  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
>
  Finalizar y pagar
</button>


        </aside>
      </div>
    </div>
  );
}

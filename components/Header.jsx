"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";



export default function Header() {
    const [open, setOpen] = useState(false);

    // 🛠️ Garantizamos que siempre sea un array
    const cart = useCartStore((state) => state.cart) ?? [];
    const openCart = useCartStore((state) => state.openCart);

    // 🛠️ Previene errores si cart no está hidratado
    const totalQty = Array.isArray(cart)
        ? cart.reduce((acc, item) => acc + item.quantity, 0)
        : 0;

    const nav = [
        { label: "Vinos", href: "/vinos" },
        { label: "Espumantes", href: "/espumantes" },
        { label: "Aperitivos", href: "/aperitivos" },
        { label: "Cervezas", href: "/cervezas" },
        { label: "Bebidas", href: "/bebidas" },
    ];

    return (
        <header className="w-full bg-black text-white sticky top-0 z-50 border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                <Link href="/" className="text-3xl sm:text-4xl font-bold hover:text-gray-300 transition title">
                    De Copas
                </Link>

                {/* DESKTOP MENU */}
                <nav className="hidden md:flex items-center gap-6">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-gray-300 transition">
                            {item.label}
                        </Link>
                    ))}

                    {/* CARRITO DESKTOP */}
                    <button
                        onClick={openCart}
                        className="relative hover:text-gray-300 transition"
                    >
                        <ShoppingCart size={24} />
                        {totalQty > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                                {totalQty}
                            </span>
                        )}
                    </button>
                </nav>

                {/* MOBILE MENU BUTTON */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
  <nav className="md:hidden bg-black text-white px-6 pt-12 pb-16 flex flex-col gap-10">
    {nav.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setOpen(false)}
        className="text-xl font-semibold uppercase tracking-wide text-gray-300 hover:text-white transition"
      >
        {item.label}
      </Link>
    ))}

    {/* CARRITO MOBILE */}
    <div className="pt-10">
      <button
        onClick={() => {
          setOpen(false);
          openCart();
        }}
        className="flex items-center gap-3 text-gray-300 hover:text-white transition"
      >
        <ShoppingCart size={24} />
        <span className="uppercase tracking-wide">Carrito</span>
      </button>
    </div>
  </nav>
)}

        </header>
    );
}

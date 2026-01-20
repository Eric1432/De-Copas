"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react"; 
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart) ?? [];
  const openCart = useCartStore((state) => state.openCart);

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

  const sortedNav = [...nav].sort((a, b) =>
    a.label.localeCompare(b.label, "es")
  );

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,   
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,   
        ease: "easeIn",
      },
    },
  };
  

  return (
    <header className="w-full bg-black text-white sticky top-0 z-50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        <Link href="/">
          <motion.div
            className="text-3xl sm:text-4xl font-bold title hover:text-gray-300 cursor-pointer flex"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {"De Copas".split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={item}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </Link>

        {/* Menu desktop */}
        <motion.nav
          className="hidden md:flex items-center gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {sortedNav.map((link) => (
            <motion.div key={link.href} variants={item}>
              <Link href={link.href} className="hover:text-gray-300 transition">
                {link.label}
              </Link>
            </motion.div>
          ))}

          <motion.div variants={item}>
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
          </motion.div>
        </motion.nav>

        {/* Botón mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden bg-black text-white px-6 pt-12 pb-16 flex flex-col gap-10"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {sortedNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xl font-semibold uppercase tracking-wide text-gray-300 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Carrito mobile */}
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
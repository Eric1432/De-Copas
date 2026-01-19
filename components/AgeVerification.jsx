"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AgeVerification({ children }) {
  const [isAdult, setIsAdult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const confirmed = localStorage.getItem("isAdult");
    if (confirmed === "true") setIsAdult(true);
  }, []);

  const handleYes = () => {
    localStorage.setItem("isAdult", "true");
    setIsAdult(true);
  };

  const handleNo = () => {
    router.push("https://www.google.com");
  };

  if (isAdult) return children;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Fondo transparente + blur de la página */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-1">De Copas</h1>
        <p className="text-gray-700 mb-6">Almacén de bebidas</p>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          ¿Eres mayor de 18 años?
        </h2>

        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={handleYes}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Sí
          </button>
          <button
            onClick={handleNo}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            No
          </button>
        </div>

        <p className="text-gray-600 text-sm">
          Debes ser mayor de 18 años para entrar a la página.
        </p>
      </motion.div>
    </div>
  );
}

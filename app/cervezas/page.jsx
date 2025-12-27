"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { cervezas } from "@/mock/cervezas";
import { Search } from "lucide-react";

export default function CervezasPage() {
  const [search, setSearch] = useState("");

  const filtered = cervezas.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-10">

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 max-w-6xl mx-auto">
        Cervezas
      </h1>

      {/* Buscador estilizado */}
      <div className="max-w-6xl mx-auto">
        <div className="
          bg-white 
          border border-gray-300 
          rounded-xl 
          px-5 py-3 
          flex items-center gap-3 
          shadow-sm 
          transition 
          focus-within:border-gray-400 
          focus-within:shadow-md
        ">
          <Search size={22} className="text-gray-400" />

          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
        {filtered.map((item) => (
          <ProductCard key={item.id} product={item} onAdd={() => {}} />
        ))}
      </div>
    </div>
  );
}

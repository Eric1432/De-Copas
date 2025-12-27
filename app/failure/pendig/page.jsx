"use client";

import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] px-4">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">Pago pendiente</h1>
      <p className="text-gray-700 mb-6 text-center">
        Tu pago está pendiente de confirmación. En breve se actualizará el estado.
      </p>
      <Link
        href="/"
        className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

"use client";

import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function LocationSection() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
        ¿Dónde encontrarnos?
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        {/* Mapa de Google */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.932089201083!2d-57.57288562368137!3d-38.025362646161526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de9202653853%3A0xe82fa013a250958b!2sDellepiane%20426%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1765926357873!5m2!1ses!2sar"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Texto / Información */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Nuestro local</h3>

            <div className="flex items-start mb-4">
              <FaMapMarkerAlt className="text-[#8A1C1C] mt-1 mr-3" />
              <p className="text-gray-700 text-lg">
                <strong>Dellepiane 426, Mar del Plata, Argentina</strong>
              </p>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Te esperamos en nuestro local para disfrutar de tus bebidas favoritas.
            </p>

            <div className="flex items-start">
              <FaClock className="text-[#8A1C1C] mt-1 mr-3" />
              <div className="text-gray-800 font-semibold text-lg leading-relaxed">
                <p>Lunes a Sabados:</p>
                <p>10:00hs a 13:30hs y de 17hs a 20:30hs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

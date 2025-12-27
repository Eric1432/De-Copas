import { SiInstagram, SiFacebook, SiWhatsapp } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-neutral-300 mt-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 text-center md:text-left">

        {/* Logo*/}
        <div className="mb-8 md:mb-0 mx-auto md:mx-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">De Copas</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
            Bebidas seleccionadas, calidad garantizada y atención personalizada
            para cada ocasión.
          </p>

          {/* REDES */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition transform hover:scale-110 animate-fadeIn"
            >
              <SiInstagram size={18} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition transform hover:scale-110 animate-fadeIn"
            >
              <SiFacebook size={18} />
            </a>
          </div>
        </div>

        {/* MENÚ RÁPIDO */}
        <div className="mb-8 md:mb-0 mx-auto md:mx-0">
          <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 tracking-wide">
            Categorías
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li><Link href="/vinos" className="hover:text-white transition">Vinos</Link></li>
            <li><Link href="/cervezas" className="hover:text-white transition">Cervezas</Link></li>
            <li><Link href="/espumantes" className="hover:text-white transition">Espumantes</Link></li>
            <li><Link href="/aperitivos" className="hover:text-white transition">Aperitivos</Link></li>
            <li><Link href="/bebidas" className="hover:text-white transition">Bebidas</Link></li>
          </ul>
        </div>

        {/* HORARIOS */}
        <div className="mb-8 md:mb-0 mx-auto md:mx-0">
          <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 tracking-wide">
            Horarios
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-400">
            Lunes a Sabados<br />
            <span className="text-neutral-200">10:00hs a 13:30hs <br /> 17hs a 20:30hs</span>
            <br />
          </p>
        </div>

        {/* CONTACTO */}
        <div className="mb-8 md:mb-0 mx-auto md:mx-0">
          <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 tracking-wide">
            Contacto
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 mb-3">
            📍 Dellepiane 426<br />
            Mar del Plata, Argentina
          </p>
          <p className="text-sm text-neutral-400 mb-3">
            📞 +54 223 4210160
          </p>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="border-t border-neutral-800 py-6 text-center">
        <p className="text-xs sm:text-sm text-neutral-500">
          © {new Date().getFullYear()} De Copas — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

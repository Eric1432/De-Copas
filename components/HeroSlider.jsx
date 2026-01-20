"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroScroll() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[70vh] md:h-[90vh] overflow-hidden">
      <motion.div 
        style={{ y, scale: 1.1 }} 
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/slides/imagen-1.jpg"
          alt="De Copas - Selección de Vinos"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" className="group inline-block cursor-pointer">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-wide title group-hover:scale-105 transition-transform duration-300">
              De Copas
            </h1>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-xl"
        >
          Vinos, espumantes y bebidas para cada ocasión
        </motion.p>
      </div>
    </section>
  );
}
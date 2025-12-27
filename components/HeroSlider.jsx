"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function HeroScroll() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });


  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] md:h-[90vh] overflow-hidden"
    >
      {/* Imagen */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/slides/imagen-1.jpg"
          alt="De Copas"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-wide title"
        >
          De Copas
        </motion.h1>

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

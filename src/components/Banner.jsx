import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // Asegurate de tener instalada la librería lucide-react

const Banner = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Manejar movimiento del mouse
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    });
  }, []); 

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={!isMobile ? handleMouseMove : null}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/video4.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Capa de oscurecimiento */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Contenido animado */}
      <motion.div
        className="relative z-10 text-center text-white max-w-xl px-6 py-8 rounded-xl shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          transform: !isMobile
            ? `translate(${mousePos.x}px, ${mousePos.y}px)`
            : 'none',
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Transformá tus espacios
        </h2>
        <p className="text-lg mb-6">
          Diseños únicos en cortinas y toldos para tu hogar
        </p>

        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-blue-600/70 hover:bg-blue-700 transition px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-xl"
        >
        ¡Solucitá Presupuesto!
        </motion.a>
      </motion.div>

      {/* Botón scroll hacia abajo */}
      <motion.a
        href="#servicios"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        initial={{ y: 0 }}
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <ChevronDown size={36} className="opacity-80 hover:opacity-100 transition" />
      </motion.a>
    </section>
  );
};

export default Banner;
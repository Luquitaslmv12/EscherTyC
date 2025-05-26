import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const proyectos = [
  "/ProyectosRecientes/3.jpg",
  "/ProyectosRecientes/4.jpg",
  "/ProyectosRecientes/5.jpg",
  "/ProyectosRecientes/8.jpg",
  "/ProyectosRecientes/12.jpg",
  "/ProyectosRecientes/25.jpg",
];

const Proyectos = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeModal = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : proyectos.length - 1));
  const showNext = () =>
    setSelectedIndex((prev) => (prev < proyectos.length - 1 ? prev + 1 : 0));

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section id="proyectos" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10">
          Algunos de nuestros trabajos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proyectos.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Proyecto ${index + 1}`}
              className="rounded-lg shadow-lg w-full h-64 object-cover cursor-pointer"
              loading="lazy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Botón cerrar (fuera de imagen) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-6 right-6 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-50"
            >
              <X size={24} />
            </button>

            {/* Flecha izquierda (fuera de imagen) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-20 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-50"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Flecha derecha (fuera de imagen) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-50"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              className="relative max-w-4xl w-full px-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={proyectos[selectedIndex]}
                alt={`Proyecto ampliado`}
                className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Proyectos;

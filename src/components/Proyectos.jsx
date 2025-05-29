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
  "/ProyectosRecientes/26.jpg",
  "/ProyectosRecientes/27.jpg",
  "/ProyectosRecientes/28.jpg",
  "/ProyectosRecientes/29.jpg",
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const Proyectos = () => {
  const width = useWindowWidth();

  const total = proyectos.length;

  // Cantidad visible según ancho
  let VISIBLE_COUNT = 6;
  if (width < 640) VISIBLE_COUNT = 1; // móvil
  else if (width < 1024) VISIBLE_COUNT = 3; // tablet
  else VISIBLE_COUNT = 6; // desktop

  // Estados
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [groupIndex, setGroupIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Cuando mostramos varias imágenes agrupadas (tablet y desktop)
  const totalGroups = Math.ceil(total / VISIBLE_COUNT);

  // Obtiene las imágenes visibles según grupo
  const getVisibleImages = (group) => {
    const start = group * VISIBLE_COUNT;
    const images = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const index = start + i;
      if (index < total)
        images.push({ src: proyectos[index], realIndex: index });
    }
    return images;
  };

  // Para móvil, las imágenes visibles es solo la que corresponde a groupIndex
  const visibleImages =
    VISIBLE_COUNT === 1
      ? [{ src: proyectos[groupIndex], realIndex: groupIndex }]
      : getVisibleImages(groupIndex);

  const prevGroup = () => {
    setDirection(-1);
    setGroupIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };

  const nextGroup = () => {
    setDirection(1);
    setGroupIndex((prev) => (prev === totalGroups - 1 ? 0 : prev + 1));
  };

  const goToGroup = (idx) => {
    if (idx === groupIndex) return;
    setDirection(idx > groupIndex ? 1 : -1);
    setGroupIndex(idx);
  };

  const closeModal = () => setSelectedIndex(null);

  const showPrev = () => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const showNext = () => {
    setDirection(1);
    setSelectedIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

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
        <h3 className="text-4xl font-bold text-center mb-12">
          Algunos de nuestros trabajos
        </h3>

        <div className="flex items-center justify-center mb-4 relative">
          {/* Mostrar flechas solo si NO es móvil */}
          {VISIBLE_COUNT !== 1 && (
            <button
              onClick={prevGroup}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
              aria-label="Mostrar imágenes anteriores"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div
            className={`overflow-hidden w-full max-w-6xl ${
              VISIBLE_COUNT === 1 ? "touch-pan-x" : ""
            }`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={groupIndex + "-" + VISIBLE_COUNT}
                className={`grid gap-6 ${
                  VISIBLE_COUNT === 1
                    ? "grid-cols-1"
                    : VISIBLE_COUNT === 3
                    ? "grid-cols-3"
                    : "grid-cols-6"
                }`}
                style={{
                  display: "grid",
                  gridAutoFlow: VISIBLE_COUNT === 1 ? "column" : "initial",
                  gridAutoColumns: VISIBLE_COUNT === 1 ? "100%" : "auto",
                }}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                drag={VISIBLE_COUNT === 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={
                  VISIBLE_COUNT === 1
                    ? (e, { offset, velocity }) => {
                        const swipe = offset.x * velocity.x;
                        if (swipe > 100) {
                          prevGroup();
                        } else if (swipe < -100) {
                          nextGroup();
                        }
                      }
                    : undefined
                }
              >
                {visibleImages.map(({ src, realIndex }) => (
                  <motion.img
                    key={realIndex}
                    src={src}
                    alt={`Proyecto ${realIndex + 1}`}
                    className={`rounded-lg shadow-lg cursor-pointer ${
                      VISIBLE_COUNT === 1
                        ? "w-full h-auto max-h-[400px] object-contain"
                        : "w-full h-64 object-cover"
                    }`}
                    loading="lazy"
                    whileHover={VISIBLE_COUNT === 1 ? {} : { scale: 1.03 }}
                    onClick={() => setSelectedIndex(realIndex)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mostrar flechas solo si NO es móvil */}
          {VISIBLE_COUNT !== 1 && (
            <button
              onClick={nextGroup}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 z-10"
              aria-label="Mostrar imágenes siguientes"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        <div className="flex justify-center space-x-3">
          {Array.from({ length: totalGroups }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToGroup(idx)}
              className={`w-4 h-4 rounded-full ${
                idx === groupIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
              aria-label={`Ir al grupo ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-6 right-6 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-50"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-20 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-50"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-50"
            >
              <ChevronRight size={24} />
            </button>

            <div className="relative w-full max-w-7xl max-h-[90vh]">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.img
                  key={selectedIndex}
                  src={proyectos[selectedIndex]}
                  alt={`Proyecto ${selectedIndex + 1} ampliado`}
                  className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;

                    if (swipe < -500) {
                      setDirection(1);
                      setSelectedIndex((prev) =>
                        prev < total - 1 ? prev + 1 : 0
                      );
                    } else if (swipe > 500) {
                      setDirection(-1);
                      setSelectedIndex((prev) =>
                        prev > 0 ? prev - 1 : total - 1
                      );
                    }
                  }}
                />
              </AnimatePresence>

              <div className="absolute bottom-4 left-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full select-none">
                Imagen {selectedIndex + 1} de {total}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Proyectos;

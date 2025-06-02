import React from "react";
import { motion } from "framer-motion";
import { Home, Scissors, Wrench, Lightbulb, Eye } from "lucide-react";

/* const servicios = [
  { icon: <Scissors size={40} />, titulo: "Confección a medida" },
  { icon: <Wrench size={40} />, titulo: "Instalación profesional" },
  { icon: <Home size={40} />, titulo: "Asesoramiento personalizado" },
  { icon: <Lightbulb size={40} />, titulo: "Diseños personalizados" },
]; */

const serviciosConImagen = [
  {
    img: "/fotos/10.jpg",
    titulo: "Toldos",
    descripcion: "Protección solar con estilo",
    tipos: ["Brazo invisible", "Punto recto", "Dos Aguas", "Vertical"]
  },
  {
    img: "/fotos/5.jpg",
    titulo: "Cortinas",
    descripcion: "Ambientes modernos",
    tipos: ["Roller", "Eclipce", "Venecianas", "Bandas Verticales"]
  },
];

const Servicios = () => {
  return (
    <section id="servicios" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
           Productos y Servicios
        </h2>

        {/* Servicios con imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {serviciosConImagen.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                loading="lazy"
                src={servicio.img}
                alt={`Imagen de ${servicio.titulo}`}
                className="w-full h-100 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />

              {/* Título encima */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 rounded-t-2xl">
                <h4 className="font-semibold text-2xl text-white text-center drop-shadow-lg">
                  {servicio.titulo}
                </h4>
              </div>

              {/* Botón e ícono en hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center px-6 text-center space-y-4 z-10">
                <Eye className="text-white animate-pulse" size={40} />
                <p className="text-white text-sm">{servicio.descripcion}</p>
                <button
                  onClick={() =>
                    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-gray-800 font-medium px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow"
                >
                  Ver más
                </button>
              </div>

              {/* Tipos visibles SIEMPRE */}
              {/* <div className="absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-md rounded-b-2xl p-3 shadow-lg z-20">
                <p className="text-m font-semibold text-white mb-2 text-center">Modelos más comercializados</p>
                <ul className="grid grid-cols-2 gap-2 text-s text-white text-center">
                  {servicio.tipos.map((tipo, i) => (
                    <li key={i} className="bg-black/30 px-2 py-1 rounded-md">
                      {tipo}
                    </li>
                  ))}
                </ul>
              </div> */}
            </motion.div>
          ))}
        </div>

        {/* Servicios con íconos */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group backdrop-blur-md bg-gradient-to-br from-blue-200/20 via-white/30 to-blue-400/80 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white/40 p-4 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <div className="text-blue-500">{servicio.icon}</div>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-gray-600 drop-shadow-sm group-hover:text-white transition-colors duration-300">
                {servicio.titulo}
              </h4>
            </motion.div>
          ))}
        </div>*/}
      </div> 
    </section>
  );
};

export default Servicios;

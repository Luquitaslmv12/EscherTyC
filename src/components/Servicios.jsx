import React from "react";
import { motion } from "framer-motion";
import { Home, Scissors, Truck, Lightbulb } from "lucide-react";

const servicios = [
  { icon: <Scissors size={40} />, titulo: "Confección a medida" },
  { icon: <Truck size={40} />, titulo: "Instalación profesional" },
  { icon: <Home size={40} />, titulo: "Asesoramiento en decoración" },
  { icon: <Lightbulb size={40} />, titulo: "Diseños personalizados" },
];

const Servicios = () => {
  return (
    <section
      id="servicios"
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Nuestros Servicios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md bg-white/30 border border-white/50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center text-blue-700 mb-4">
                {servicio.icon}
              </div>
              <h4 className="font-semibold text-lg text-gray-800">
                {servicio.titulo}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;

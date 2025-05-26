import React from 'react';
import { motion } from 'framer-motion';
import { Home, Scissors, Truck, Lightbulb } from 'lucide-react';

const servicios = [
  { icon: <Scissors />, titulo: "Confección a medida" },
  { icon: <Truck />, titulo: "Instalación profesional" },
  { icon: <Home />, titulo: "Asesoramiento en decoración" },
  { icon: <Lightbulb />, titulo: "Diseños personalizados" },
];

const Servicios = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10">Nuestros Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center text-blue-600 mb-4">{servicio.icon}</div>
              <h4 className="font-semibold text-lg">{servicio.titulo}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Servicios;
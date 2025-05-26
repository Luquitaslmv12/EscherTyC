import React from 'react';
import { motion } from 'framer-motion';

const proyectos = [
  "/assets/proyecto1.jpg",
  "/assets/proyecto2.jpg",
  "/assets/proyecto3.jpg"
];

const Proyectos = () => {
  return (
    <section id="proyectos" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10">Proyectos Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proyectos.map((src, index) => (
            <motion.img 
              key={index} 
              src={src} 
              alt="Proyecto" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
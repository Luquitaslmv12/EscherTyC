import React from 'react';
import { motion } from 'framer-motion';

const testimonios = [
  { nombre: "María G.", texto: "Las cortinas quedaron hermosas, ¡excelente atención!" },
  { nombre: "Carlos R.", texto: "Rápidos, responsables y con muy buenos precios." },
];

const Testimonios = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-10">Lo que dicen nuestros clientes</h3>
        <div className="space-y-6">
          {testimonios.map((t, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <p className="italic">“{t.texto}”</p>
              <p className="mt-2 font-bold">- {t.nombre}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
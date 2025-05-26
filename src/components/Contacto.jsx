import React from 'react';
import { motion } from 'framer-motion';

const Contacto = () => {
  return (
    <section id="contacto" className="py-20">
      <div className="max-w-xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10">Contactanos</h3>
        <motion.form className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }}
        >
          <input type="text" placeholder="Tu nombre" className="w-full border p-2 rounded" required />
          <input type="email" placeholder="Tu email" className="w-full border p-2 rounded" required />
          <textarea placeholder="Tu mensaje" className="w-full border p-2 rounded" rows="5" required></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Enviar</button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contacto;
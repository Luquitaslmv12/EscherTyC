import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/video4.mp4" type="video/mp4" />
       
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      <motion.div 
        className="relative z-10 text-center text-white max-w-xl px-6 py-8 bg-black/50 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-extrabold mb-4">Transformá tus espacios</h2>
        <p className="text-lg mb-6">Diseños únicos en cortinas y decoración para tu hogar</p>
        <a href="#contacto" className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full font-semibold">
          ¡Contactanos!
        </a>
      </motion.div>
    </section>
  );
};

export default Banner;
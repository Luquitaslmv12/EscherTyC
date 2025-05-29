import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-400/80 to-gray-800/80 text-white shadow-lg z-50">
      <div className="max-w-auto mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          Cortinas y Toldos ESCHER
        </h1>
        <div className="space-x-6 hidden md:flex">
          <nav className="flex gap-6 text-white text-lg font-medium">
            <a href="#servicios" className="relative group">
              Servicios
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#proyectos" className="relative group">
              Proyectos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonios" className="relative group">
              Testimonios
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contacto" className="relative group">
              Contacto
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#presupuesto" className="relative group">
              Presupuestos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        </div>
        <button
          className="md:hidden cursor-pointer"
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gradient-to-r from-gray-400/20 to-gray-600/30 px-4 pb-4 flex flex-col space-y-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a
              href="#servicios"
              className="hover:text-yellow-300 transition"
              onClick={toggleMenu}
            >
              Servicios
            </a>
            <a
              href="#proyectos"
              className="hover:text-yellow-300 transition"
              onClick={toggleMenu}
            >
              Proyectos
            </a>
            <a
              href="#testimonios"
              className="hover:text-yellow-300 transition"
              onClick={toggleMenu}
            >
              Testimonios
            </a>
            <a
              href="#contacto"
              className="hover:text-yellow-300 transition"
              onClick={toggleMenu}
            >
              Contacto
            </a>
            <a
              href="#presupuestos"
              className="hover:text-yellow-300 transition"
              onClick={toggleMenu}
            >
              Presupuestos
            </a>
          </motion.div>
          
        )}
        
      </AnimatePresence>
      
    </nav>
    
  );
};

export default Navbar;

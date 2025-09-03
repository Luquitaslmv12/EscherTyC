import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Función para detectar la visibilidad de las secciones durante el scroll
  const handleScroll = () => {
    const sections = ["servicios", "cortinas", "toldos", "testimonios", "presupuesto"];
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        // Verifica si la sección está dentro de la ventana del navegador
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
          setActiveSection(id);
          // Cambia la URL sin recargar la página
          window.history.pushState(null, "", `#${id}`);
        }
      }
    });
  };

  useEffect(() => {
    // Agregar evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Llamar a handleScroll al cargar la página por si hay una sección visible
    handleScroll();

    // Limpiar el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para manejar el click en enlaces
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Clase para link activo
  const linkClass = (id) =>
    `relative group ${
      activeSection === id ? "text-blue-500 font-semibold" : "text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-400/80 to-gray-800/80 text-white shadow-lg z-50">
      <div className="max-w-auto mx-auto px-4 py-3 flex justify-between items-center">
        <img
          src="/LogoMarca.png"
          alt="Logo ESCHER"
          className="h-15 w-60 object-contain"
        />
        <div className="space-x-6 hidden md:flex">
          <nav className="flex gap-6 text-lg font-medium">
            <a href="#servicios" className={linkClass("servicios")}>
              Servicios
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#cortinas" className={linkClass("cortinas")}>
              Cortinas
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#toldos" className={linkClass("toldos")}>
              Toldos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonios" className={linkClass("testimonios")}>
              Testimonios
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#presupuesto" className={linkClass("presupuesto")}>
              Presupuestos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        </div>
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menú móvil con max-height para evitar saltos */}
      <div
        className={`md:hidden bg-gradient-to-r from-gray-400/20 to-gray-600/30 px-4 pb-4 flex flex-col space-y-3 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <a
          href="#servicios"
          className="hover:text-blue-500 transition text-lg"
          onClick={handleLinkClick}
        >
          Servicios
        </a>
        <a
          href="#cortinas"
          className="hover:text-blue-500 transition text-lg"
          onClick={handleLinkClick}
        >
          Cortinas
        </a>
        <a
          href="#toldos"
          className="hover:text-blue-500 transition text-lg"
          onClick={handleLinkClick}
        >
          Toldos
        </a>
        <a
          href="#testimonios"
          className="hover:text-blue-500 transition text-lg"
          onClick={handleLinkClick}
        >
          Testimonios
        </a>
        <a
          href="#presupuesto"
          className="hover:text-blue-500 transition text-lg"
          onClick={handleLinkClick}
        >
          Presupuestos
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

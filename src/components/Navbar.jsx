import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Observar secciones para actualizar estado activo
  useEffect(() => {
    const sections = ["servicios", "proyectos", "testimonios", "presupuestos"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-50% 0px -40% 0px",
        threshold: 0.3,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Función para manejar click en enlaces
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
            <a href="#proyectos" className={linkClass("proyectos")}>
              Proyectos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonios" className={linkClass("testimonios")}>
              Testimonios
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#presupuesto" className={linkClass("presupuestos")}>
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
          href="#proyectos"
          className="hover:text-blue-500 transition text-lg"
          onClick={handleLinkClick}
        >
          Proyectos
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

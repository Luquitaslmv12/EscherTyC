import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sections = ["servicios", "cortinas", "toldos", "testimonios", "presupuesto"];

  const handleScroll = () => {
    let closestSection = "";
    let minDistance = Infinity;

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3); // umbral top 1/3
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = id;
        }
      }
    });

    if (closestSection && closestSection !== activeSection) {
      setActiveSection(closestSection);
      window.history.replaceState(null, "", `#${closestSection}`);
    }
  };

  useEffect(() => {
    let throttleTimeout = null;

    const throttledScroll = () => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        handleScroll();
        throttleTimeout = null;
      }, 100); // throttle 100ms
    };

    window.addEventListener("scroll", throttledScroll);
    handleScroll(); // detectar sección inicial

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [activeSection]);

  const handleLinkClick = () => setIsOpen(false);

  const linkClass = (id) =>
    `relative group ${activeSection === id ? "text-blue-500 font-semibold" : "text-white"}`;

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-400/80 to-gray-800/80 text-white shadow-lg z-50">
      <div className="max-w-auto mx-auto px-4 py-3 flex justify-between items-center">
        <img src="/LogoMarca.png" alt="Logo ESCHER" className="h-15 w-60 object-contain" />
        <div className="space-x-6 hidden md:flex">
          <nav className="flex gap-6 text-lg font-medium">
            {sections.map((id) => (
              <a key={id} href={`#${id}`} className={linkClass(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
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

      <div
        className={`md:hidden bg-gradient-to-r from-gray-400/20 to-gray-600/30 px-4 pb-4 flex flex-col space-y-3 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="hover:text-blue-500 transition text-lg"
            onClick={handleLinkClick}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

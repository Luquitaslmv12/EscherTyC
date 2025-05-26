import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Contacto - Izquierda */}
        <div className="md:w-1/3 flex flex-col space-y-4 text-sm md:text-base text-center md:text-left">
          <h3 className="text-lg font-semibold mb-8">Contacto</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <FaEnvelope
              className="text-blue-300"
              size={18}
              aria-hidden="true"
            />
            <a
              href="mailto:contacto@eschercortinas.com"
              className="hover:underline focus:underline focus:outline-none"
            >
              contacto@eschercortinas.com
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <FaPhone className="text-gray-500" size={18} aria-hidden="true" />
            <a
              href="tel:+5403447422222"
              className="hover:underline focus:underline focus:outline-none"
            >
              +54 11 1234 5678
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <FaMapMarkerAlt
              className="text-red-500"
              size={18}
              aria-hidden="true"
            />
            <span>Av. Pres. Juan Domingo Perón 137 - Colón, Entre Ríos</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <FaWhatsapp
              className="text-green-400"
              size={18}
              aria-hidden="true"
            />
            <a>+54 11 1234 5678</a>
          </div>
        </div>

        {/* Ubicación - Centro */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <h3 className="mb-2 text-lg font-semibold">Nuestra Ubicación</h3>
          <div className="w-full aspect-w-16 aspect-h-9 rounded overflow-hidden shadow-lg max-w-md">
            <iframe
              title="Ubicación Escher Cortinas y Toldos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.319950582183!2d-58.1471717234807!3d-32.22255053568686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ae331ca7c9409d%3A0x4dde6c04620d5de7!2sEscher%20-%20Cortinas%20y%20Toldos!5e0!3m2!1ses!2sar!4v1748286969270!5m2!1ses!2sar"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Redes Sociales - Derecha */}
        <div className="md:w-1/3 flex flex-col items-center md:items-center space-y-4 text-center md:text-center">
          <h3 className="text-lg font-semibold mb-6">Redes Sociales</h3>
          <div className="flex space-x-6 mb-30">
            <a
              href="https://facebook.com/eschercortinas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebookF size={28} />
            </a>
            <a
              href="https://instagram.com/eschercortinas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 hover:text-pink-800 transition-colors duration-300"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://twitter.com/eschercortinas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
            >
              <FaTwitter size={28} />
            </a>
          </div>
          <p className="mt-4 text-xs md:text-sm text-gray-400">
            &copy; 2025 Escher Cortinas y Toldos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

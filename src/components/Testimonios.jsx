import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonios = [
  {
    nombre: "M Viollaz.",
    texto:
      "Excelente atención, variedad de productos de calidad a buen precio.",
    foto: "/fotos/maria.jpg",
  },
  {
    nombre: "A Biancardi.",
    texto:
      "Muy lindas cortinas. Muy buena atencion.",
    foto: "/fotos/maria.jpg",
  },
  {
    nombre: "P Nauschuetz.",
    texto:
      "Buena atención. Solucionaron lo que necesitaba. Productos excelentes.",
    foto: "/fotos/maria.jpg",
  },
  {
    nombre: "H Hugartemendia",
    texto: "Excelente como siempre!! Muy buena calidad de productos 💯.",
    foto: "/fotos/maria.jpg",
  },
  {
    nombre: "H Wic",
    texto: "Excelente atención y surtido, los mejores de la zona",
    foto: "/fotos/maria.jpg",
  },
];

const Testimonios = () => {
  return (
    <section 
      className="py-20 "
      aria-labelledby="testimonios-title"
      id="testimonios"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 id="testimonios-title" className="text-4xl font-bold mb-12">
          Testimonios de nuestros Clientes
        </h3>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonios.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                {/* <img
                  src={t.foto}
                  alt={`Foto de ${t.nombre}`}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-100 shadow"
                /> */}
                <div className="flex text-yellow-400 mb-2 justify-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <blockquote className="italic text-lg">“{t.texto}”</blockquote>
                <cite className="mt-4 font-semibold not-italic text-blue-700">
                  - {t.nombre}
                </cite>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonios;

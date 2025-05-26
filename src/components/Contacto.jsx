import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const phoneNumber = "549112345678"; // sin espacios ni signos
  const defaultMessage = "Hola, quiero hacer una consulta sobre cortinas.";

  const getWhatsAppLink = () => {
    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    const params = new URLSearchParams({
      phone: phoneNumber,
      text: defaultMessage,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          setName("");
          setEmail("");
          setMessage("");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setError(
            "Ocurrió un error al enviar el mensaje. Intenta nuevamente."
          );
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => setSent(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  const labelVariants = {
    active: {
      top: -10,
      left: 44,
      fontSize: "0.75rem",
      color: "#3B82F6",
    },
    inactive: {
      top: 12,
      left: 44,
      fontSize: "1rem",
      color: "#9CA3AF",
    },
  };

  return (
    <section id="contacto" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
        max-w-2xl mx-auto p-6
        bg-gradient-to-br from-gray-50 to-white
        rounded-2xl
        shadow-lg
        transition-shadow transform duration-300
        hover:shadow-2xl my-10
      "
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Contáctame
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Nombre */}
          <div className="relative">
            <motion.label
              htmlFor="from_name"
              animate={name ? "active" : "inactive"}
              variants={labelVariants}
              transition={{ duration: 0.2 }}
              className="absolute bg-gray-50 px-1 pointer-events-none z-10"
            >
              Nombre
            </motion.label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <User className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 outline-none bg-transparent text-base pl-1"
                aria-label="Nombre"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="relative">
            <motion.label
              htmlFor="reply_to"
              animate={email ? "active" : "inactive"}
              variants={labelVariants}
              transition={{ duration: 0.2 }}
              className="absolute bg-gray-50 px-1 pointer-events-none z-10"
            >
              Correo Electrónico
            </motion.label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="text-gray-500 w-5 h-5" />
              <input
                type="email"
                id="reply_to"
                name="reply_to"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 outline-none bg-transparent text-base pl-1"
                aria-label="Correo Electrónico"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="relative">
            <motion.label
              htmlFor="message"
              animate={message ? "active" : "inactive"}
              variants={{
                active: {
                  top: -10,
                  left: 44,
                  fontSize: "0.75rem",
                  color: "#3B82F6",
                },
                inactive: {
                  top: 12,
                  left: 44,
                  fontSize: "1rem",
                  color: "#9CA3AF",
                },
              }}
              transition={{ duration: 0.2 }}
              className="absolute bg-gray-50 px-1 pointer-events-none z-10"
            >
              Mensaje
            </motion.label>
            <div className="flex items-start gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <MessageSquare className="text-gray-500 w-5 h-5 mt-1" />
              <textarea
                id="message"
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="flex-1 outline-none bg-transparent resize-none text-base pl-1"
                aria-label="Mensaje"
              />
            </div>
          </div>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
            aria-label="Enviar mensaje por WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.001 2.002c-5.523 0-10 4.477-10 10 0 1.777.472 3.442 1.375 4.929L2 22l5.201-1.354A9.935 9.935 0 0012 22c5.523 0 10-4.477 10-10s-4.477-9.998-10-9.998zm.002 17.997a7.93 7.93 0 01-4.013-1.102l-.288-.17-3.084.802.827-3.006-.188-.309a7.928 7.928 0 01-1.227-4.31c0-4.41 3.59-8.002 8.013-8.002 4.42 0 8.01 3.592 8.01 8.002 0 4.42-3.59 8.002-8.01 8.002zm4.39-5.848c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94c-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.26 1.03.42 1.38.54.58.18 1.1.16 1.52.1.46-.08 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
            </svg>
          </a>

          {/* Botón */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              disabled={loading || sent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </motion.div>

          {/* Mensaje de éxito o error */}
          {sent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-center font-medium mt-4"
            >
              ¡Mensaje enviado con éxito!
            </motion.p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center font-medium mt-4"
            >
              {error}
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

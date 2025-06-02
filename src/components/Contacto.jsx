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


  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
          setError("Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
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
    <section id="contacto" className="py-20 relative">
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
          Contacto
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
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="relative">
            <motion.label
              htmlFor="message"
              animate={message ? "active" : "inactive"}
              variants={labelVariants}
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
              />
            </div>
          </div>

          {/* Botón Enviar */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
            <button
              type="submit"
              disabled={loading || sent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </motion.div>

          {/* Mensajes de estado */}
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
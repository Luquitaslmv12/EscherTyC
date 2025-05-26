import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
  User,
  Mail,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const Contacto = () => {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback(null);

    emailjs
      .sendForm(
        "service_imy84wl",
        "template_l9cvzpn",
        e.target,
        "onJd4b7yydxzDcOZ4"
      )
      .then(() => {
        setSending(false);
        setFeedback({
          tipo: "success",
          mensaje: "¡Mensaje enviado con éxito!",
        });
        e.target.reset();
      })
      .catch(() => {
        setSending(false);
        setFeedback({
          tipo: "error",
          mensaje: "Error al enviar el mensaje. Intenta de nuevo.",
        });
      });
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const campos = [
    {
      name: "user_name",
      label: "Nombre",
      icon: <User className="text-gray-600" />,
      type: "text",
    },
    {
      name: "user_email",
      label: "Email",
      icon: <Mail className="text-gray-600" />,
      type: "email",
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-xl mx-auto px-4">
        <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Contáctanos
        </h3>

        <motion.form
          onSubmit={handleSubmit}
          className="relative group space-y-6 bg-gray-400/10 backdrop-blur-lg border border-gray-500/30 p-8 rounded-xl shadow-[0_4px_60px_rgba(156,163,175,0.3)] overflow-hidden transition duration-300 hover:shadow-[0_0_60px_rgba(156,163,175,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brillo animado */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/30 to-white/10 blur-lg rotate-6 group-hover:animate-pulseShine" />
          </div>

          {campos.map((campo) => (
            <div key={campo.name} className="relative">
              <div className="absolute left-3 top-3.5">{campo.icon}</div>
              <input
                type={campo.type}
                name={campo.name}
                placeholder=" "
                className="w-full pl-10 pt-5 pb-2 border border-gray-300/50 rounded-md peer bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={sending}
              />
              <label className="absolute left-10 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                {campo.label}
              </label>
            </div>
          ))}

          <div className="relative">
            <div className="absolute left-3 top-3.5">
              <MessageCircle className="text-gray-600" />
            </div>
            <textarea
              name="message"
              placeholder=" "
              className="w-full pl-10 pt-5 pb-2 border border-gray-300/50 rounded-md peer bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
              disabled={sending}
            ></textarea>
            <label className="absolute left-10 top-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              Mensaje
            </label>
          </div>

          <button
            type="submit"
            className={`w-full relative overflow-hidden bg-blue-600 text-white py-3 rounded-md font-semibold transition-all duration-300 group hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] flex justify-center items-center ${
              sending ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={sending}
          >
            {sending && (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
                viewBox="0 0 24 24"
              />
            )}
            {sending ? "Enviando..." : "Enviar"}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          </button>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium mt-4
                ${
                  feedback.tipo === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {feedback.tipo === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}
              <span>{feedback.mensaje}</span>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contacto;

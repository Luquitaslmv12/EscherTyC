import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { Mail, User, Ruler, Phone } from "lucide-react";

const Presupuesto = () => {
  const form = useRef();
  const messageInputRef = useRef(); // ✅ MOVER AQUÍ
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alto, setAlto] = useState("");
  const [ancho, setAncho] = useState("");
  const [tipo, setTipo] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const message = `Presupuesto: (Alto: ${alto} cm, Ancho: ${ancho} cm, Tipo: ${tipo}) - Contacto: ${telefono}`;
    if (messageInputRef.current) {
      messageInputRef.current.value = message;
    }

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
          setTelefono("");
          setAlto("");
          setAncho("");
          setTipo("");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setError("Error al enviar. Intenta nuevamente.");
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

  return (
    <section id="presupuesto" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-2xl mx-auto p-6
          bg-gradient-to-b from-sky-100 to-white
          rounded-2xl shadow-lg
          transition-shadow transform duration-300
          hover:shadow-2xl my-10 w-full
        "
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Solicitar Presupuesto
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Nombre */}
          <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
            <User className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              name="from_name"
              placeholder="Nombre"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          {/* Telefono */}
          <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
            <Phone className="text-gray-500 w-5 h-5" />
            <input
              type="number"
              name="telefono"
              placeholder="Telefono"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
            <Mail className="text-gray-500 w-5 h-5" />
            <input
              type="email"
              name="reply_to"
              placeholder="Correo Electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          {/* Alto */}
          <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
            <Ruler className="text-gray-500 w-5 h-5" />
            <input
              type="number"
              placeholder="Alto (cm)"
              required
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          {/* Ancho */}
          <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
            <Ruler className="text-gray-500 w-5 h-5" />
            <input
              type="number"
              placeholder="Ancho (cm)"
              required
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          {/* Tipo */}
          <div className="border rounded-xl px-4 py-3">
            <label className="block text-sm font-semibold mb-2">Tipo</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipo"
                  value="Cortina"
                  checked={tipo === "Cortina"}
                  onChange={() => setTipo("Cortina")}
                />
                Cortina
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tipo"
                  value="Toldo"
                  checked={tipo === "Toldo"}
                  onChange={() => setTipo("Toldo")}
                />
                Toldo
              </label>
            </div>
          </div>

          {/* Campo oculto con el mensaje */}
          <input type="hidden" name="message" ref={messageInputRef} />

          {/* Botón */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <button
              type="submit"
              disabled={loading || sent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar Presupuesto"}
            </button>
          </motion.div>

          {/* Mensajes */}
          {sent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-center font-medium mt-4"
            >
              ¡Presupuesto enviado con éxito!
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
};

export default Presupuesto;
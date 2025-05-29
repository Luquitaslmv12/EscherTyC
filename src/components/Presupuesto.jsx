import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { Mail, User, Ruler, Phone } from "lucide-react";

const Presupuesto = () => {
  const form = useRef();
  const messageInputRef = useRef();
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
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Solicitar Presupuesto
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 bg-gradient-to-b from-sky-100 to-white rounded-2xl shadow-lg p-6"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
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

              <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
                <Phone className="text-gray-500 w-5 h-5" />
                <input
                  type="number"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="flex-1 outline-none bg-transparent"
                />
              </div>

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

              <input type="hidden" name="message" ref={messageInputRef} />

              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <button
                  type="submit"
                  disabled={loading || sent}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar Presupuesto"}
                </button>
              </motion.div>

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

          {/* IMAGEN + TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex flex-col items-center"
          >
            <p className="text-2xl font-bold text-center mb-12 text-gray-800">
              Cómo medir tu ventana!
            </p>
            <img
              src="/fotos/ventana.jpeg"
              alt="Ejemplo de instalación"
              className="max-w-full max-h-[480px] object-contain rounded-xl shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Presupuesto;

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "5493447413069";
  const defaultMessage = "Hola, quiero hacer una consulta.";

  const getWhatsAppLink = () => {
    const isMobile = /iPhone|Android|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    const params = new URLSearchParams({
      phone: phoneNumber,
      text: defaultMessage,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <motion.a
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
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
    </motion.a>
  );
}
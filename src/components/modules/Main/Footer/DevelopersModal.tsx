import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface Developer {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  telegram: string;
}

interface DevelopersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const developers: Developer[] = [
  {
    name: "حامد سپهرنیا",
    role: "Backend Developer",
    image: "",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me",
  },
  {
    name: "معین کاملان",
    role: "Frontend Developer",
    image: "",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me",
  },
];

function DevelopersModal({ isOpen, onClose }: DevelopersModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay با backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* مدال */}
          <motion.div
            className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary/95 to-accent px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-estedad-bold text-xl">
                تیم توسعه
              </h2>
              <motion.button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="بستن"
              >
                <i className="fas fa-times text-sm"></i>
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {developers.map((developer, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-4">
                      <motion.div
                        className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {developer.image ? (
                          <img
                            src={developer.image}
                            alt={developer.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        ) : (
                          <i className="fas fa-code text-primary text-4xl"></i>
                        )}
                      </motion.div>
                      <h3 className="text-gray-800 font-estedad-bold text-lg mb-1">
                        {developer.name}
                      </h3>
                      <p className="text-gray-600 font-estedad-medium text-sm">
                        {developer.role}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mt-6">
                      <motion.a
                        href={developer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="GitHub"
                      >
                        <i className="fab fa-github text-lg"></i>
                      </motion.a>
                      <motion.a
                        href={developer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="LinkedIn"
                      >
                        <i className="fab fa-linkedin-in text-lg"></i>
                      </motion.a>
                      <motion.a
                        href={developer.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Telegram"
                      >
                        <i className="fab fa-telegram-plane text-lg"></i>
                      </motion.a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DevelopersModal;


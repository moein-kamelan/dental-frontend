import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface Developer {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  telegram: string;
  phone: string;
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
    github: "https://github.com/hamedsepehrnia",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me/hamesep",
    phone: "+989991232006",
  },
  {
    name: "معین کاملان",
    role: "Frontend Developer",
    image: "/images/moein.jpg",
    github: "https://github.com/moein-kamelan",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me/Moeink80",
    phone: "+989031357262",
  },
];

function DevelopersModal({ isOpen, onClose }: DevelopersModalProps) {
  // تابع برای فرمت کردن شماره تلفن
  const formatPhoneNumber = (phone: string): string => {
    // حذف همه فاصله‌ها و + از ابتدا
    const cleaned = phone.replace(/\s/g, "").replace(/^\+/, "");
    
    // اگر با 98 شروع می‌شود
    if (cleaned.startsWith("98") && cleaned.length === 12) {
      const rest = cleaned.slice(2); // حذف 98
      // فرمت: +98 XXX XXX XXXX
      if (rest.length === 10) {
        const part1 = rest.slice(0, 3);
        const part2 = rest.slice(3, 6);
        const part3 = rest.slice(6);
        return `+98 ${part1} ${part2} ${part3}`;
      }
    }
    return phone;
  };

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
            <div className="bg-gradient-to-r from-primary via-primary/95 to-accent px-4 py-3 flex items-center justify-between">
              <h2 className="text-white font-estedad-bold text-lg">
                تیم توسعه
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                aria-label="بستن"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {developers.map((developer, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-3">
                      <div
                        className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 mb-3 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative"
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
                          <i className="fas fa-code text-primary text-3xl"></i>
                        )}
                      </div>
                      <h3 className="text-gray-800 font-estedad-bold text-base mb-0.5">
                        {developer.name}
                      </h3>
                      <p className="text-gray-600 font-estedad-medium text-xs mb-1">
                        {developer.role}
                      </p>
                      <a
                        href={`tel:${developer.phone.replace(/\s/g, "")}`}
                        className="text-primary font-estedad-medium text-sm hover:underline"
                        dir="ltr"
                      >
                        {formatPhoneNumber(developer.phone)}
                      </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mt-4">
                      <a
                        href={developer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                        aria-label="GitHub"
                      >
                        <i className="fab fa-github text-lg"></i>
                      </a>
                      <a
                        href={developer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <i className="fab fa-linkedin-in text-lg"></i>
                      </a>
                      <a
                        href={developer.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                        aria-label="Telegram"
                      >
                        <i className="fab fa-telegram-plane text-lg"></i>
                      </a>
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


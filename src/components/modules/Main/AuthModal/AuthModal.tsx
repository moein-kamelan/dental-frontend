import React, { useEffect, useState } from "react";
import { useAuthModal } from "../../../../contexts/useAuthModal";
import Signin from "../../../../pages/Auth/Signin/Signin";
import { AnimatePresence, motion } from "motion/react";

function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();
  const [isWide, setIsWide] = useState(false);

  // Reset isWide when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsWide(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
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
  }, [isOpen, closeModal]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeOut", // Custom cubic-bezier for smoother animation
          }}
        >
          {/* Overlay با backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeOut", // Custom cubic-bezier for smoother animation
            }}
          />

          {/* مدال */}
          <motion.div
            className={`relative z-10 w-full ${isWide ? "max-w-4xl" : "max-w-md"} rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto auth-modal-scrollbar scroll-smooth bg-white`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.8,
            }}
          >
            {/* Soft Yellow Glow */}
            <div
              className="absolute inset-0 z-0 rounded-3xl"
              style={{
                backgroundImage: `radial-gradient(circle at top center, #FFF991 0%, transparent 95%)`,
                opacity: 0.6,
                mixBlendMode: "multiply",
              }}
            />
            {/* دکمه بستن */}
            <motion.button
              onClick={closeModal}
              className="absolute top-5 left-5 z-20 flex items-center justify-center w-9 h-9 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
              aria-label="بستن"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <i className="fas fa-times text-sm text-gray-600 group-hover:text-gray-800 transition-colors"></i>
            </motion.button>

            {/* محتوای فرم */}
            <div className="relative z-10">
              <Signin onClose={closeModal} onWideChange={setIsWide} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;

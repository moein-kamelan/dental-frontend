import React, { useEffect } from "react";
import { useAuthModal } from "../../../../contexts/useAuthModal";
import Signin from "../../../../pages/Auth/Signin/Signin";
import { AnimatePresence, motion } from "motion/react";

function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();

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
            className="relative z-10 w-full max-w-md bg-gray-100 ring-2 border-dark rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto auth-modal-scrollbar scroll-smooth"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
          >
            {/* دکمه بستن */}
            <motion.button
              onClick={closeModal}
              className="absolute top-4 right-6 z-20 flex items-center justify-center rounded-full size-10 bg-accent hover:bg-secondary transition-colors"
              aria-label="بستن"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <i className="fas fa-times text-2xl text-white"></i>
            </motion.button>

            {/* محتوای فرم */}
            <Signin onClose={closeModal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;

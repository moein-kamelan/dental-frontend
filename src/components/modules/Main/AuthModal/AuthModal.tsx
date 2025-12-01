import React, { useEffect } from "react";
import { useAuthModal } from "../../../../contexts/useAuthModal";
import Signin from "../../../../pages/Auth/Signin/Signin";

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

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay با backdrop blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />

      {/* مدال */}
      <div className="relative z-10 w-full max-w-md bg-gray-100 ring-2 border-dark rounded-3xl shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto auth-modal-scrollbar scroll-smooth">
        {/* دکمه بستن */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 z-20 flex items-center justify-center rounded-full size-10 bg-accent hover:bg-secondary transition-colors"
          aria-label="بستن"
        >
          <i className="fas fa-times text-2xl text-white"></i>
        </button>

        {/* محتوای فرم */}
        <Signin onClose={closeModal} />
      </div>
    </div>
  );
}

export default AuthModal;

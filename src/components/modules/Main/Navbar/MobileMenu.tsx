import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/typedHooks";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearCsrfToken } from "../../../../redux/slices/csrfSlice";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { AxiosError } from "axios";
import { useGetSettings } from "../../../../services/useSettings";
import { useLogout } from "../../../../services/useAuth";
import { useAuthModal } from "../../../../contexts/useAuthModal";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";
import { getImageUrl } from "../../../../utils/helpers";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: settings, isLoading: isSettingsLoading } = useGetSettings();
  const { mutateAsync: logout } = useLogout();
  const { openModal } = useAuthModal();
  const { openModal: openAppointmentModal } = useAppointmentModal();

  // Close user menu dropdown when user logs out
  useEffect(() => {
    if (!user) {
      setIsUserMenuOpen(false);
    }
  }, [user]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsUserMenuOpen(false);
      await logout();
      dispatch(clearUser());
      dispatch(clearCsrfToken());
      showSuccessToast("خروج موفقیت‌آمیز بود");
      navigate("/home", { replace: true });
      onClose();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        typeof err.response?.data === "object" && err.response?.data?.message
          ? err.response.data.message
          : "خطا در خروج از حساب. لطفاً دوباره تلاش کنید.";
      showErrorToast(errorMessage);
      console.error("خطا در خروج:", error);
    }
  };

  const handleLinkClick = () => {
    onClose();
    setIsUserMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay with blur */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[280px] sm:w-80 max-w-[90vw] bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
          >
            <div className="border-b border-gray-200 bg-white shrink-0">
              <div className="flex items-center justify-between p-3 sm:p-4">
                <NavLink
                  to="/home"
                  onClick={handleLinkClick}
                  className="w-32 sm:w-40 shrink-0"
                >
                  {isSettingsLoading ? (
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    <img
                      src={
                        settings?.data?.settings?.logo
                          ? getImageUrl(settings.data.settings.logo)
                          : "/images/main-logo.png"
                      }
                      alt="logo"
                      className="w-full object-contain"
                    />
                  )}
                </NavLink>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-100 text-dark hover:text-accent transition-all duration-200 active:scale-95"
                  aria-label="بستن منو"
                >
                  <i className="fas fa-times text-lg sm:text-xl"></i>
                </button>
              </div>

              {/* User Info Section - Below Logo */}
              {user && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="relative">
                      <img
                        src={
                          user.profileImage
                            ? getImageUrl(user.profileImage)
                            : user.gender === "FEMALE"
                            ? "/images/female-user.jpeg"
                            : "/images/male-user.jpeg"
                        }
                        alt="profile"
                        className="w-9 h-9 rounded-full object-fill ring-2 ring-gray-100 group-hover:ring-accent/30 transition-all duration-200"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-right flex-1 min-w-0">
                      <p className="text-sm font-semibold text-dark leading-tight truncate" style={{ fontFamily: 'var(--font-vazir)' }}>
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <i
                      className={`fas fa-chevron-down text-gray-400 text-xs transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {/* User Menu Dropdown */}
                  <div
                    className={`mt-2 sm:mt-3 bg-gray-50 rounded-lg p-2 space-y-0.5 sm:space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      isUserMenuOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <NavLink
                      to="/dashboard/profile"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-sm transition-colors rounded active:scale-[0.98] ${
                          isActive
                            ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                            : "text-dark hover:bg-accent/10 hover:text-accent"
                        }`
                      }
                    >
                      <div className="w-5 flex items-center justify-center shrink-0">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <span>پروفایل من</span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/turns"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-sm transition-colors rounded active:scale-[0.98] ${
                          isActive
                            ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                            : "text-dark hover:bg-accent/10 hover:text-accent"
                        }`
                      }
                    >
                      <div className="w-5 flex items-center justify-center shrink-0">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <span>نوبت‌ها</span>
                    </NavLink>

                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors rounded active:scale-[0.98]"
                      >
                        <div className="w-5 flex items-center justify-center shrink-0">
                          <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <span>خروج از حساب</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Button if not logged in */}
              {!user && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                  <button
                    onClick={() => {
                      openModal();
                      onClose();
                    }}
                    className="main-btn flex items-center justify-center gap-2 w-full text-sm sm:text-base py-2.5 sm:py-3 active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center">
                      <i className="fas fa-user"></i>
                    </div>
                    <span>ورود / ثبت نام</span>
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-y-auto flex-1 pb-20 auth-modal-scrollbar">
              <nav className="py-3 sm:py-4">
                <ul className="space-y-0.5 sm:space-y-1">
                  <li>
                    <NavLink
                      to="/home"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      خانه
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about-us"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      درباره ما
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/services"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      خدمات
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      وبلاگ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/become-doctor"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      همکاری با ما
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/doctors"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      معرفی پزشکان
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors active:scale-[0.98] ${
                          isActive
                            ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                            : "text-dark"
                        }`
                      }
                    >
                      تماس با ما
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 border-t border-gray-200 mt-3 sm:mt-4">
                <button
                  onClick={() => {
                    openAppointmentModal();
                    onClose();
                  }}
                  className="main-btn block text-center w-full text-sm sm:text-base py-2.5 sm:py-3 active:scale-[0.98]"
                >
                  دریافت نوبت
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;

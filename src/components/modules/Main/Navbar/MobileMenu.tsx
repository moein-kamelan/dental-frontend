import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/typedHooks";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearCsrfToken } from "../../../../redux/slices/csrfSlice";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { AxiosError } from "axios";
import { useGetSettings } from "../../../../services/useSettings";
import { useLogout } from "../../../../services/useAuth";
import { useLoginModal } from "../../../../contexts/LoginModalContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: settings } = useGetSettings();
  const { mutateAsync: logout } = useLogout();
  const { openModal } = useLoginModal();
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
      await logout();
      dispatch(clearUser());
      dispatch(clearCsrfToken());
      showSuccessToast("خروج موفقیت‌آمیز بود");
      navigate("/home" , { replace: true });
      setIsUserMenuOpen(false);
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
    setIsPagesOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* Overlay with blur */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 bg-white shrink-0">
          <div className="flex items-center justify-between p-4">
            <NavLink to="/home" onClick={handleLinkClick} className="w-40">
              <img
                src={
                  settings?.data?.settings?.logo
                    ? `http://localhost:4000${settings.data.settings.logo}`
                    : "/images/Logo_1.png"
                }
                alt="logo"
                className="w-full object-contain"
              />
            </NavLink>
            <button
              onClick={onClose}
              className="text-dark text-2xl hover:text-accent transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* User Info Section - Below Logo */}
          {user && (
            <div className="px-4 pb-4">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-linear-to-r from-accent/10 to-primary/10 border border-accent/20 hover:from-accent/20 hover:to-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm">
                  {user.firstName?.[0] || "U"}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-iran-sans-bold text-dark">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 font-iran-sans-light">
                    {user.phoneNumber}
                  </p>
                  {user.role && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-accent/10 text-accent rounded">
                      {user.role === "PATIENT"
                        ? "بیمار"
                        : user.role === "ADMIN"
                        ? "مدیر"
                        : user.role}
                    </span>
                  )}
                </div>
                <i
                  className={`fas fa-chevron-down text-accent transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              {/* User Menu Dropdown */}
              <div
                className={`mt-3 bg-gray-50 rounded-lg p-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isUserMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <NavLink
                  to="/dashboard/profile"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded ${
                      isActive
                        ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                        : "text-dark hover:bg-accent/10 hover:text-accent"
                    }`
                  }
                >
                  <i className="fas fa-user-circle w-5 text-center"></i>
                  <span>پروفایل من</span>
                </NavLink>
                <NavLink
                  to="/dashboard/turns"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded ${
                      isActive
                        ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                        : "text-dark hover:bg-accent/10 hover:text-accent"
                    }`
                  }
                >
                  <i className="fas fa-calendar-alt w-5 text-center"></i>
                  <span>نوبت‌ها</span>
                </NavLink>
                <NavLink
                  to="/dashboard/upcoming-meeting"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded ${
                      isActive
                        ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                        : "text-dark hover:bg-accent/10 hover:text-accent"
                    }`
                  }
                >
                  <i className="fas fa-clock w-5 text-center"></i>
                  <span>نوبت‌های آینده</span>
                </NavLink>
                <NavLink
                  to="/dashboard/messages"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded ${
                      isActive
                        ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                        : "text-dark hover:bg-accent/10 hover:text-accent"
                    }`
                  }
                >
                  <i className="fas fa-envelope w-5 text-center"></i>
                  <span>پیام‌ها</span>
                </NavLink>
                <NavLink
                  to="/dashboard/meeting-history"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded ${
                      isActive
                        ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                        : "text-dark hover:bg-accent/10 hover:text-accent"
                    }`
                  }
                >
                  <i className="fas fa-history w-5 text-center"></i>
                  <span>تاریخچه نوبت‌ها</span>
                </NavLink>

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors rounded"
                  >
                    <i className="fas fa-sign-out-alt w-5 text-center"></i>
                    <span>خروج از حساب</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login Button if not logged in */}
          {!user && (
            <div className="px-4 pb-4">
              <button
                onClick={() => {
                  openModal();
                  onClose();
                }}
                className="main-btn flex items-center justify-center gap-2 w-full"
              >
                <i className="fas fa-user"></i>
                <span>ورود / ثبت نام</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto flex-1 pb-20">
          {/* Navigation Links */}
          <nav className="py-4">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/home"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
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
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors text-nowrap ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
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
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors text-nowrap ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
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
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors text-nowrap ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
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
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors text-nowrap ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
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
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors text-nowrap ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
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
                    `block px-6 py-3 text-dark font-iran-sans-bold hover:bg-accent/10 hover:text-accent transition-colors ${
                      isActive
                        ? "text-accent bg-accent/10 border-r-4 border-r-accent"
                        : ""
                    }`
                  }
                >
                  تماس با ما
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Search and Appointment Button */}
          <div className="px-6 py-4 space-y-3 border-t border-gray-200 mt-4">
            <NavLink
              to=""
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-accent text-xl py-2"
            >
              <i className="fa fa-search"></i>
              <span className="text-base font-iran-sans-bold">جستجو</span>
            </NavLink>
            <NavLink
              to=""
              onClick={handleLinkClick}
              className="main-btn block text-center w-full"
            >
              دریافت نوبت
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;

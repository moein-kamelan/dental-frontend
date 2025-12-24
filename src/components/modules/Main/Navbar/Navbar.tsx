import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/typedHooks";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearCsrfToken } from "../../../../redux/slices/csrfSlice";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { AxiosError } from "axios";
import MobileMenu from "./MobileMenu";
import { useGetSettings } from "../../../../services/useSettings";
import { useLogout } from "../../../../services/useAuth";
import { useAuthModal } from "../../../../contexts/useAuthModal";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";
import { getImageUrl } from "../../../../utils/helpers";

function Navbar() {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: settings, isLoading: isSettingsLoading } = useGetSettings();
  const { mutateAsync: logout } = useLogout();
  const { openModal } = useAuthModal();
  const { openModal: openAppointmentModal } = useAppointmentModal();

  // Close dropdown when user logs out
  useEffect(() => {
    if (!user) {
      setIsDropdownOpen(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      await logout();
      dispatch(clearUser());
      dispatch(clearCsrfToken());
      showSuccessToast("خروج موفقیت‌آمیز بود");
      navigate("/home", { replace: true });
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
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md h-16 sm:h-18 md:h-[76px] w-full">
      <div className="container mx-auto px-3 sm:px-4 h-full">
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4 h-full">
          <NavLink
            to={"/home"}
            className="w-32 sm:w-40 md:w-48 h-10 sm:h-12 md:h-16 flex items-center justify-center shrink-0"
          >
            {isSettingsLoading ? (
              <div className="h-full w-full bg-gray-200 animate-pulse rounded" />
            ) : (
              <img
                src={
                  settings?.data?.settings?.logo
                    ? getImageUrl(settings.data.settings.logo)
                    : "/images/main-logo.png"
                }
                alt="logo"
                className="h-full w-full object-contain"
              />
            )}
          </NavLink>

          <div className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-3 lg:gap-4 xl:gap-5 lg:text-xs xl:text-base font-iran-sans-bold ">
              <li className="text-nowrap">
                <NavLink
                  to={"/home"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  خانه
                </NavLink>
              </li>
              <li className="text-nowrap">
                <NavLink
                  to={"/about-us"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  درباره ما
                </NavLink>
              </li>
              <li className="text-nowrap">
                <NavLink
                  to={"/services"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  خدمات
                </NavLink>
              </li>

              <li className="text-nowrap">
                <NavLink
                  to={"/blog"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  وبلاگ
                </NavLink>
              </li>
              <li className="text-nowrap">
                <NavLink
                  to={"/doctors"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  معرفی پزشکان
                </NavLink>
              </li>
              <li className="text-nowrap">
                <NavLink
                  to={"/become-doctor"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  عضویت در کادر درمان
                </NavLink>
              </li>
              <li className="text-nowrap">
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  تماس با ما
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button
                onClick={openAppointmentModal}
                className="main-btn no-hover-effect lg:text-xs xl:text-sm text-nowrap"
              >
                دریافت نوبت
              </button>

              {/* User Menu - Modern & Minimalist */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
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
                    <div className="text-right hidden xl:block">
                      <p className="text-sm font-semibold text-dark leading-tight" style={{ fontFamily: 'var(--font-vazir)' }}>
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <i
                      className={`fas fa-chevron-down text-gray-400 text-xs transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {/* Dropdown Menu - Luxury & Minimalist */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-60 backdrop-blur-sm">
                      {/* User Info Header - Compact */}
                      <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user.profileImage
                                ? getImageUrl(user.profileImage)
                                : user.gender === "FEMALE"
                                ? "/images/female-user.jpeg"
                                : "/images/male-user.jpeg"
                            }
                            alt="profile"
                            className="w-10 h-10 rounded-full object-fill ring-2 ring-accent/20"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-dark truncate" style={{ fontFamily: 'var(--font-vazir)' }}>
                          {user.firstName} {user.lastName}
                        </p>
                        {user.role && (
                              <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-accent/10 text-accent rounded-lg font-medium" style={{ fontFamily: 'var(--font-vazir)' }}>
                            {user.role === "PATIENT"
                              ? "بیمار"
                              : user.role === "ADMIN"
                              ? "مدیر"
                              : user.role}
                          </span>
                        )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items - Clean */}
                      <nav className="py-1.5">
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) => {
                            const isProfileActive =
                              isActive ||
                              location.pathname.startsWith(
                                "/dashboard/profile"
                              );
                            return `flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                              isProfileActive
                                ? "bg-accent/5 text-accent font-semibold"
                                : "text-gray-700 hover:bg-gray-50 hover:text-accent"
                            }`;
                          }}
                          style={{ fontFamily: 'var(--font-vazir)' }}
                        >
                          <i className={`fas fa-user-circle text-sm ${location.pathname.startsWith("/dashboard/profile") ? "text-accent" : "text-gray-400"}`}></i>
                          <span>پروفایل من</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/turns"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? "bg-accent/5 text-accent font-semibold"
                                : "text-gray-700 hover:bg-gray-50 hover:text-accent"
                            }`
                          }
                          style={{ fontFamily: 'var(--font-vazir)' }}
                        >
                          <i className={`fas fa-calendar-alt text-sm ${location.pathname === "/dashboard/turns" ? "text-accent" : "text-gray-400"}`}></i>
                          <span>نوبت‌ها</span>
                        </NavLink>
                      </nav>

                      {/* Logout Button - Separated */}
                      <div className="border-t border-gray-100 pt-1.5 pb-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-lg mx-1"
                          style={{ fontFamily: 'var(--font-vazir)' }}
                        >
                          <i className="fas fa-sign-out-alt text-sm"></i>
                          <span>خروج از حساب</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="main-btn no-hover-effect flex items-center gap-2 text-nowrap lg:text-xs xl:text-sm"
                >
                  <i className="fas fa-user"></i>
                  <span>ورود / ثبت نام</span>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg hover:bg-accent/10 text-dark hover:text-accent transition-all duration-200 active:scale-95"
            aria-label="باز کردن منو"
          >
            <i className="fas fa-bars text-xl sm:text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}

export default Navbar;

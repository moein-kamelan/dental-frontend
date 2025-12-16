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

          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center lg:gap-6 xl:gap-8 gap-8 lg:text-xs xl:text-base font-iran-sans-bold ">
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
                  همکاری با ما
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
              <NavLink
                to={""}
                className="text-gray-600 hover:text-accent text-xl"
              >
                <i className="fa fa-search"></i>
              </NavLink>
              <button
                onClick={openAppointmentModal}
                className="main-btn lg:text-xs xl:text-sm text-nowrap"
              >
                دریافت نوبت
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-4 p-2 rounded-lg bg-linear-to-r from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 transition-all duration-300 border border-accent/20 hover:border-accent/40"
                  >
                    <img
                      src={
                        user.profileImage
                          ? getImageUrl(user.profileImage)
                          : user.gender === "FEMALE"
                          ? "/images/female-user.jpeg"
                          : "/images/male-user.jpeg"
                      }
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <div className="text-right">
                      <p className="text-sm font-iran-sans-bold text-dark">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 font-iran-sans-light">
                        {user.phoneNumber}
                      </p>
                    </div>
                    <i
                      className={`fas fa-chevron-down text-accent transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60 transform transition-all duration-200 ease-out opacity-100 translate-y-0">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-iran-sans-bold text-dark">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user.phoneNumber}
                        </p>
                        {user.role && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                            {user.role === "PATIENT"
                              ? "بیمار"
                              : user.role === "ADMIN"
                              ? "مدیر"
                              : user.role}
                          </span>
                        )}
                      </div>

                      <nav className="py-2">
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) => {
                            const isProfileActive =
                              isActive ||
                              location.pathname.startsWith(
                                "/dashboard/profile"
                              );
                            return `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isProfileActive
                                ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                                : "text-dark hover:bg-accent/10 hover:text-accent"
                            }`;
                          }}
                        >
                          <i className="fas fa-user-circle w-5 text-center"></i>
                          <span>پروفایل من</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/turns"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
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
                          to="/dashboard/messages"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                                : "text-dark hover:bg-accent/10 hover:text-accent"
                            }`
                          }
                        >
                          <i className="fas fa-envelope w-5 text-center"></i>
                          <span>پیام‌ها</span>
                        </NavLink>
                      </nav>

                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <i className="fas fa-sign-out-alt w-5 text-center"></i>
                          <span>خروج از حساب</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="main-btn flex items-center gap-2 text-nowrap lg:text-xs xl:text-sm"
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

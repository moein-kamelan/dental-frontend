import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../redux/typedHooks";
import { clearUser } from "../../../../redux/slices/userSlice";
import { axiosInstance } from "../../../../utils/axios";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { AxiosError } from "axios";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      await axiosInstance.post("/auth/logout");
      dispatch(clearUser());
      showSuccessToast("خروج موفقیت‌آمیز بود");
      navigate("/home");
      setIsDropdownOpen(false);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      // فقط پیام خطا نشان می‌دهیم و کاربر را نگه می‌داریم
      // اگر session واقعاً منقضی شده باشد، fetchUser در App.tsx آن را handle می‌کند
      const errorMessage =
        typeof err.response?.data === "object" && err.response?.data?.message
          ? err.response.data.message
          : "خطا در خروج از حساب. لطفاً دوباره تلاش کنید.";

      showErrorToast(errorMessage);
      console.error("خطا در خروج:", error);
    }
  };
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-[76px] ">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between py-4 h-full">
          <NavLink to={"/home"} className="w-40">
            <img
              src="../../../../../public/images/Logo_1.png"
              alt="logo"
              className="w-full"
            />
          </NavLink>

          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-iran-sans-bold">
              <li>
                <NavLink
                  to={"/home"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  خانه
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about-us"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  درباره ما
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/services"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  خدمات
                </NavLink>
              </li>
         
              <li>
                <NavLink
                  to={"/blog"}
                  className={({ isActive }) =>
                    isActive ? "text-accent" : "text-dark hover:text-accent"
                  }
                >
                  وبلاگ
                </NavLink>
              </li>
              <li>
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
              <NavLink to={""} className="main-btn  ">
                نوبت دکتر
              </NavLink>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 transition-all duration-300 border border-accent/20 hover:border-accent/40"
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm">
                      {user.firstName?.[0] || "U"}
                    </div>
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
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[60] transform transition-all duration-200 ease-out opacity-100 translate-y-0">
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
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
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
                          to="/dashboard/upcoming-meeting"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
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
                        <NavLink
                          to="/dashboard/meeting-history"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? "bg-accent/20 text-accent font-iran-sans-bold border-r-2 border-r-accent"
                                : "text-dark hover:bg-accent/10 hover:text-accent"
                            }`
                          }
                        >
                          <i className="fas fa-history w-5 text-center"></i>
                          <span>تاریخچه نوبت‌ها</span>
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
                <NavLink
                  to="/auth/sign-in"
                  className="main-btn flex items-center gap-2"
                >
                  <i className="fas fa-user"></i>
                  <span>ورود / ثبت نام</span>
                </NavLink>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-dark text-2xl hover:text-accent transition-colors"
          >
            <i className="fas fa-bars"></i>
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

import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/typedHooks";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearCsrfToken } from "../../../../redux/slices/csrfSlice";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastify";
import { getImageUrl } from "../../../../utils/helpers";
import type { AxiosError } from "axios";
import { useAdminDashboardHeader } from "../../../../contexts/useAdminDashboardHeader";
import { useLogout } from "../../../../services/useAuth";

function AdminDashBaordHeader({
  title,
  backButton,
}: {
  title?: string;
  backButton?: boolean;
}) {
  const { data: user } = useAppSelector((state) => state.user);
  const { isSidebarOpen, toggleSidebar } = useAdminDashboardHeader();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: logout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <div className="relative pb-6 mb-8">
      <div className="flex flex-col lg:flex-row  justify-between max-lg:items-start flex-wrap gap-x-2.5 gap-y-4">
        <div className="flex items-center gap-3">
          {/* دکمه باز/بسته کردن سایدبار */}
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-10 h-10 bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 group"
            aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
          >
            <i
              className={`fas fa-bars transition-transform duration-300 ${
                isSidebarOpen ? "rotate-90" : ""
              } group-hover:scale-110`}
            ></i>
          </button>
          {backButton ? (
            <button
              className="purple-btn flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-right"></i> <span>بازگشت</span>
            </button>
          ) : (
            <h2 className="text-xl  font-estedad-semibold relative inline-block group">
              <span className="relative z-10 bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                {title}
              </span>
            </h2>
          )}
        </div>
        <div className="flex items-center max-lg:flex-wrap gap-y-2.5  space-x-4 ">
          {/* <button className="size-10 flex items-center justify-center shadow-sm bg-gray-50 hover:bg-gray-300 rounded-full">
            <i className="fas fa-bell text-gray-600 "></i>
          </button> */}

          {/* <!-- Profile Dropdown --> */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center   gap-5 bg-gray-50 hover:bg-gray-300  py-2 px-4 rounded-lg transition  shadow-sm"
            >
              <img
                src={
                  user?.profileImage
                    ? getImageUrl(user.profileImage)
                    : user?.gender === "FEMALE"
                    ? "/images/female-user.jpeg"
                    : "/images/male-user.jpeg"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col  ">
                <span className="text-dark text-sm lg:text-lg font-iran-yekan-bold">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className=" font-iran-yekan-medium text-paragray">
                  {user?.role === "ADMIN"
                    ? "مدیر"
                    : user?.role === "SECRETARY"
                    ? "منشی"
                    : "بیمار"}
                </span>
              </div>
              <i
                className={`fas fa-chevron-down text-gray-600 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 overflow-hidden">
                <NavLink
                  to={"/admin/profile-management"}
                  onClick={() => setIsDropdownOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                      isActive
                        ? "bg-linear-to-r from-purple-50 to-purple-100 border-r-4 border-purple-500 text-purple-700"
                        : "text-gray-700"
                    }`
                  }
                >
                  <i
                    className={`fas fa-user ${
                      location.pathname === "/admin/profile-management"
                        ? "text-purple-500"
                        : "text-gray-500"
                    }`}
                  ></i>
                  <p className="font-iran-yekan-medium">پروفایل</p>
                </NavLink>
                <NavLink
                  to={"/admin/settings"}
                  onClick={() => setIsDropdownOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                      isActive
                        ? "bg-linear-to-r from-purple-50 to-purple-100 border-r-4 border-purple-500 text-purple-700"
                        : "text-gray-700"
                    }`
                  }
                >
                  <i
                    className={`fas fa-cog ${
                      location.pathname === "/admin/settings"
                        ? "text-purple-500"
                        : "text-gray-500"
                    }`}
                  ></i>
                  <p className="font-iran-yekan-medium">تنظیمات</p>
                </NavLink>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={async () => {
                    try {
                      await logout();
                      dispatch(clearUser());
                      dispatch(clearCsrfToken());
                      setIsDropdownOpen(false);
                      showSuccessToast("خروج موفقیت‌آمیز بود");
                      navigate("/admin-login", { replace: true });
                    } catch (error) {
                      const err = error as AxiosError<{ message?: string }>;

                      const errorMessage =
                        typeof err.response?.data === "object" &&
                        err.response?.data?.message
                          ? err.response.data.message
                          : "خطا در خروج از حساب. لطفاً دوباره تلاش کنید.";

                      showErrorToast(errorMessage);
                      console.error("خطا در خروج:", error);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-500 hover:text-red-600"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="font-iran-yekan-medium">خروج</span>
                </button>
              </div>
            )}
          </div>

          {/* دکمه بازگشت به صفحه اصلی */}
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-sm lg:text-base"
          >
            <i className="fas fa-home group-hover:scale-110 transition-transform duration-200"></i>
            <span className="font-iran-yekan-medium">صفحه اصلی</span>
            <i className="fas fa-arrow-left mr-auto group-hover:translate-x-[-4px] transition-all duration-200"></i>
          </button>
        </div>
      </div>

      {/* Border با gradient زیبا */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"></div>
      {/* دایره‌های تزئینی در ابتدا و انتهای border */}
      <div className="absolute bottom-0 left-0 w-3 h-3 -translate-x-1/2 translate-y-1/2 bg-linear-to-r from-purple-400 to-purple-600 rounded-full shadow-md shadow-purple-500/50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 translate-x-1/2 translate-y-1/2 bg-linear-to-r from-purple-400 to-purple-600 rounded-full shadow-md shadow-purple-500/50"></div>
    </div>
  );
}

export default AdminDashBaordHeader;

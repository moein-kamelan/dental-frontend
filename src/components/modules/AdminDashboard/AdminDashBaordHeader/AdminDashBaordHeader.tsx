import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/typedHooks";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearCsrfToken } from "../../../../redux/slices/csrfSlice";
import { axiosInstance } from "../../../../utils/axios";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastify";
import type { AxiosError } from "axios";

function AdminDashBaordHeader({
  title,
  backButton,
}: {
  title?: string;
  backButton?: boolean;
}) {
  const { data: user } = useAppSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  if (!title && !backButton) {
    return null;
  }
  return (
    <div className="relative pb-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {backButton ? (
          <button
            className="purple-btn flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-right"></i> <span>بازگشت</span>
          </button>
        ) : (
          <h2 className="text-xl md:text-2xl font-estedad-semibold relative inline-block group">
            <span className="relative z-10 bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              {title}
            </span>
          </h2>
        )}
        <div className="flex items-center  space-x-4 ">
          {/* <button className="size-10 flex items-center justify-center shadow-sm bg-gray-50 hover:bg-gray-300 rounded-full">
            <i className="fas fa-bell text-gray-600 "></i>
          </button> */}

          {/* <!-- Profile Dropdown --> */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center  gap-4 bg-gray-50 hover:bg-gray-300  py-2 px-5 rounded-lg transition  shadow-sm"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col ml-6 ">
                <span className="text-dark text-lg font-iran-yekan-bold">
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
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <i className="fas fa-user text-gray-500"></i>
                  <span className="text-dark font-iran-yekan-medium">
                    پروفایل
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <i className="fas fa-cog text-gray-500"></i>
                  <Link
                    onClick={() => setIsDropdownOpen(false)}
                    to={"/admin/settings"}
                    className="text-dark font-iran-yekan-medium"
                  >
                    تنظیمات
                  </Link>
                </button>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={async () => {
                    await axiosInstance.post("/auth/logout");
                    try {
                      dispatch(clearUser());
                      dispatch(clearCsrfToken());
                      setIsDropdownOpen(false);
                      showSuccessToast("خروج موفقیت‌آمیز بود");
                      navigate("/home");
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
            className="flex items-center gap-2 bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group hover:from-purple-500 hover:via-purple-600 hover:to-purple-700"
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

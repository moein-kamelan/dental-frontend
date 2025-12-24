import { motion } from "motion/react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../redux/typedHooks";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useRef, useState, type ChangeEvent } from "react";
import {
  useLogout,
  useUpdateProfileWithImage,
} from "../../../services/useAuth";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import type { AxiosError } from "axios";
import { clearCsrfToken } from "../../../redux/slices/csrfSlice";
import { getImageUrl } from "../../../utils/helpers";
function Dashboard() {
  const user = useAppSelector((state) => state.user.data);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: updateProfile } = useUpdateProfileWithImage();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // بررسی نوع فایل
    if (!file.type.startsWith("image/")) {
      showErrorToast("لطفاً یک فایل تصویری انتخاب کنید");
      return;
    }

    // بررسی حجم فایل (مثلاً 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("حجم فایل نباید بیشتر از 5 مگابایت باشد");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await updateProfile(formData);

      // آپدیت Redux با اطلاعات جدید کاربر
      if (response?.data?.user) {
        const updatedUser = {
          ...response.data.user,
          role: user?.role || response.data.user.role,
        };
        dispatch(setUser(updatedUser));
      }

      showSuccessToast("عکس پروفایل با موفقیت به‌روزرسانی شد");

      // ریست کردن input برای امکان انتخاب مجدد همان فایل
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        typeof err.response?.data === "object" && err.response?.data?.message
          ? err.response.data.message
          : "خطا در آپلود عکس. لطفاً دوباره تلاش کنید.";
      showErrorToast(errorMessage);
      console.error("خطا در آپلود عکس:", error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <Breadcrumb />

      <section className="pt-2 pb-4 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* <!-- Sidebar --> */}

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="bg-[linear-gradient(45deg,_#E8F4F4_0%,_rgba(212,232,232,0.85)_28.13%,_rgba(245,232,212,0.90)_79.75%,_#FAF0E0_100%)]
 rounded-xl shadow-sm p-4 mb-3 text-center "
              >
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <img
                    src={
                      user?.profileImage
                        ? getImageUrl(user.profileImage)
                        : user?.gender === "FEMALE"
                        ? "/images/female-user.jpeg"
                        : "/images/male-user.jpeg"
                    }
                    alt="user"
                    className="w-full h-full rounded-full object-fill"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                  <label
                    htmlFor="profile_photo"
                    className={`absolute bottom-0 left-0 w-8 h-8 bg-white hover:bg-primary rounded-full flex items-center justify-center hover:text-white cursor-pointer transition shadow-sm ${
                      isUploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <i className="fas fa-camera text-xs"></i>
                  </label>
                  <input
                    id="profile_photo"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isUploading}
                  />
                </div>
                <h4 className="text-dark font-estedad-verybold text-lg mb-1">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="text-paragray font-estedad-light text-xs">
                  {user?.phoneNumber}
                </p>
              </div>

              {/* <!-- Dashboard Menu --> */}
              <div className="">
                <ul className="space-y-2">
                  <li className="border border-[#1b1d1f14] overflow-hidden rounded-xl">
                    <NavLink
                      to={"/dashboard/profile"}
                      className={({ isActive }) => {
                        const isProfileActive =
                          isActive ||
                          location.pathname.startsWith("/dashboard/profile");
                        return ` ${
                          isProfileActive &&
                          "text-white bg-primary hover:bg-primary hover:text-white"
                        } flex items-center justify-between py-2.5 px-4 bg-[#d4af370d] hover:bg-gray-100 transition text-dark font-estedad-semibold text-sm`;
                      }}
                    >
                      <span>پروفایل من</span>
                      <i className="fas fa-angle-left text-xs"></i>
                    </NavLink>
                  </li>
                  <li className="border border-[#1b1d1f14] overflow-hidden rounded-xl">
                    <NavLink
                      to={"/dashboard/turns"}
                      className={({ isActive }) =>
                        ` ${
                          isActive &&
                          "text-white bg-primary hover:bg-primary hover:text-white"
                        } flex items-center justify-between py-2.5 px-4 bg-[#d4af370d] hover:bg-gray-100 transition text-dark font-estedad-semibold text-sm`
                      }
                    >
                      <span>نوبت ها</span>
                      <i className="fas fa-angle-left text-xs"></i>
                    </NavLink>
                  </li>
                  <li className="border border-[#1b1d1f14] overflow-hidden rounded-xl">
                    <button
                      onClick={async () => {
                        await logout();
                        console.log("hello");

                        dispatch(clearUser());
                        dispatch(clearCsrfToken());
                        navigate("/home", { replace: true });
                      }}
                      className="flex items-center justify-between py-2.5 px-4 bg-secondary/80 hover:bg-secondary text-white transition w-full text-sm"
                    >
                      <span>خروج</span>
                      <i className="fas fa-angle-left text-xs"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;

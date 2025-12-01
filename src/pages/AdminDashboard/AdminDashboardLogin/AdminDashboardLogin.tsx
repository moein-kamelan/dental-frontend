import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAdminLogin } from "../../../services/useAuth";
import { showSuccessToast } from "../../../utils/toastify";
import { useAppDispatch } from "../../../redux/typedHooks";
import { fetchUser } from "../../../redux/slices/userSlice";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import { formatPhoneNumber } from "../../../validators/phoneNumberValidator";

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("شماره تلفن الزامی است")
    .test("is-valid-phone", "شماره تلفن معتبر نیست", (value) => {
      try {
        formatPhoneNumber(value);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }),
  password: Yup.string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

const AdminDashboardLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useAdminLogin();

  const handleSubmit = async (values: {
    phoneNumber: string;
    password: string;
  }) => {
    try {
      const result = await loginMutation.mutateAsync({
        phoneNumber: values.phoneNumber,
        password: values.password,
      });

      if (result.success) {
        showSuccessToast("ورود موفقیت‌آمیز بود");
        // دریافت اطلاعات کاربر برای update کردن state
        await dispatch(fetchUser());
        // هدایت به داشبورد ادمین
        navigate("/admin");
      }
    } catch (error) {
      // خطا در mutation handle می‌شود
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-500 to-purple-400 flex items-center justify-center p-4 font-estedad-medium">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 ">
        {/* بخش راست - فرم لاگین */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* لوگو */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-linear-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src="/images/admin-logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    // اگر لوگو وجود نداشت، یک آیکون نمایش داده می‌شود
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const placeholder =
                      target.parentElement?.querySelector(".logo-placeholder");
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = "flex";
                    }
                  }}
                />
                <div className="logo-placeholder hidden items-center justify-center text-white">
                  <i className="fas fa-cube text-4xl"></i>
                </div>
              </div>
            </div>

            {/* عنوان */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-estedad-verybold text-dark mb-2">
                ورود به پنل مدیریت
              </h1>
              <p className="text-paragray font-estedad-medium">
                فقط مدیر و منشی می‌توانند وارد شوند
              </p>
            </div>

            {/* فرم */}
            <Formik
              initialValues={{
                phoneNumber: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await handleSubmit(values);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  {/* شماره تلفن */}
                  <CustomInput
                    inputType="phone"
                    beforeIcon="fa-phone"
                    labelText="شماره تلفن"
                    placeholder="09123456789"
                    requiredText={true}
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? formik.errors.phoneNumber
                        : null
                    }
                  />

                  {/* رمز عبور */}
                  <CustomInput
                    inputType="password"
                    beforeIcon="fa-lock"
                    labelText="رمز عبور"
                    placeholder="رمز عبور خود را وارد کنید"
                    requiredText={true}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-paragray hover:text-purple-600 transition-colors z-10"
                    style={{ top: "calc(50% + 12px)" }}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>

                  {/* دکمه ورود */}
                  <button
                    type="submit"
                    disabled={loginMutation.isPending || !formik.isValid}
                    className="w-full  bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full font-estedad-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loginMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>در حال ورود...</span>
                      </>
                    ) : (
                      <>
                        <span>ورود</span>
                        <i className="fas fa-arrow-left"></i>
                      </>
                    )}
                  </button>
                </form>
              )}
            </Formik>

            {/* اطلاعات اضافی */}
            <div className="mt-6 text-center">
              <p className="text-sm text-paragray font-estedad-medium">
                در صورت فراموشی رمز عبور، با مدیر سیستم تماس بگیرید
              </p>
            </div>
          </div>
        </div>

        {/* بخش چپ - تصویر */}
        <div className="hidden md:flex items-center justify-center ">
          <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
            {/* جای عکس - کاربر می‌تواند بعداً عکس را اضافه کند */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/images/admin-login.png"
                alt="Admin Login"
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  // اگر عکس وجود نداشت، یک placeholder نمایش داده می‌شود
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const placeholder =
                    target.parentElement?.querySelector(".placeholder");
                  if (placeholder) {
                    (placeholder as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div className="placeholder hidden flex-col items-center justify-center text-white/80">
                <i className="fas fa-image text-6xl mb-4"></i>
                <p className="text-lg font-estedad-semibold">جای عکس</p>
                <p className="text-sm mt-2">
                  عکس را در مسیر /images/admin-login-image.jpg قرار دهید
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLogin;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomInput from "../../../../components/modules/CustomInput/CustomInput";
import { useAppDispatch, useAppSelector } from "../../../../redux/typedHooks";
import { formatPhoneNumber } from "../../../../validators/phoneNumberValidator";
import { FormikDevTool } from "formik-devtools";
import { useUpdateProfile } from "../../../../hooks/useAuth";
import { showSuccessToast } from "../../../../utils/toastify";
import { setUser } from "../../../../redux/slices/userSlice";

function ProfileEdit() {
  const user = useAppSelector((state) => state.user.data);
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: any) => {
    try {
      const response = await updateProfile(values);
      showSuccessToast("اطلاعات با موفقیت ثبت شد");
      dispatch(setUser(response.data.user));
      navigate("/dashboard/profile");
    } catch (error) {
      // Error handling is done by the mutation's onError callback
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <h5 className="text-2xl font-bold">ویرایش اطلاعات پروفایل</h5>
        <Link
          to="/dashboard/profile"
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition"
        >
          انصراف
        </Link>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          phoneNumber: user?.phoneNumber || "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          firstName: Yup.string().max(
            20,
            "نام نمیتواند بیشتر از 20 کاراکتر باشد"
          ),
          lastName: Yup.string().max(
            30,
            "نام خانوادگی نمیتواند بیشتر از 30 کاراکتر باشد"
          ),
          phoneNumber: Yup.string().test(
            "is-valid-phone",
            "شماره موبایل معتبر نمیباشد",
            (value) => {
              try {
                formatPhoneNumber(value);
                return true;
              } catch (error) {
                console.log(error);
                return false;
              }
            }
          ),
        })}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <FormikDevTool />
              <div className="grid md:grid-cols-2 gap-6">
                <CustomInput
                  labelText="نام"
                  placeholder="نام خود را وارد کنید"
                  maxLength={20}
                  {...formik.getFieldProps("firstName")}
                  errorMessage={
                    formik.touched.firstName && formik.errors.firstName
                      ? typeof formik.errors.firstName === "string"
                        ? formik.errors.firstName
                        : "نام الزامی است"
                      : null
                  }
                />
                <CustomInput
                  labelText="نام خانوادگی"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  {...formik.getFieldProps("lastName")}
                  errorMessage={
                    formik.touched.lastName && formik.errors.lastName
                      ? typeof formik.errors.lastName === "string"
                        ? formik.errors.lastName
                        : "نام خانوادگی الزامی است"
                      : null
                  }
                  maxLength={30}
                />
                <CustomInput
                  inputType="phone"
                  labelText="شماره همراه"
                  placeholder="شماره همراه خود را وارد کنید"
                  {...formik.getFieldProps("phoneNumber")}
                  errorMessage={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? typeof formik.errors.phoneNumber === "string"
                        ? formik.errors.phoneNumber
                        : "شماره تلفن الزامی است"
                      : null
                  }
                />

                {/* <div>
            <label className="block text-dark font-semibold mb-2"
              >ایمیل</label
            >
            <input
              type="email"
              placeholder="Company@gmail.com"
              className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-dark font-semibold mb-2"
              >وزن (کیلوگرم)</label
            >
            <input
              type="text"
              placeholder="۶۶"
              className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-dark font-semibold mb-2"
              >جنسیت</label
            >
            <input
              type="text"
              placeholder="مرد"
              className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-dark font-semibold mb-2">سن</label>
            <input
              type="text"
              placeholder="۳۵"
              className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-dark font-semibold mb-2"
              >آدرس</label
            >
            <input
              type="text"
              placeholder="کازرون. خیابان نهضت"
              className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
            />
          </div> */}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full bg-primary text-white px-8 py-4 rounded-full hover:bg-tertiary transition font-semibold flex items-center justify-center min-h-[48px] ${
                  isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? (
                  <div className="btn-loader"></div>
                ) : (
                  "ذخیره تغییرات"
                )}
              </button>
            </form>
          );
        }}
      </Formik>

      {/* <div className="mt-12 pt-8 border-t">
        <h5 className="text-2xl font-bold mb-6">تغییر رمز عبور</h5>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-dark font-semibold mb-2"
                >رمز عبور قبلی</label
              >
              <input
                type="password"
                placeholder="پسوورد قبلی"
                className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-dark font-semibold mb-2"
                >رمز عبور جدید</label
              >
              <input
                type="password"
                placeholder="پسوورد جدید"
                className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-dark font-semibold mb-2"
              >تکرار رمز عبور</label
            >
            <input
              type="password"
              placeholder="تکرار پسوورد"
              className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white px-8 py-4 rounded-full hover:bg-tertiary transition font-semibold"
          >
            تغییر رمز عبور
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default ProfileEdit;

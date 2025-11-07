import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CustomInput from "../../../../components/modules/CustomInput/CustomInput";
import { useAppSelector } from "../../../../redux/typedHooks";

function ProfileEdit() {
  const { user } = useAppSelector((state) => state.user.data);

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
        initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
    
        }}
        onSubmit={() => {}}
        validationSchema={Yup.object({
           firstName: Yup.string(),
           lastName: Yup.string(),
           phoneNumber: Yup.string(),
          })}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <CustomInput
                  labelText="نام"
                  placeholder="نام خود را وارد کنید"
                  {...formik.getFieldProps("firstName")}
                  errorMessage={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : null
                  }
                />
                <CustomInput
                  labelText="نام خانوادگی"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  {...formik.getFieldProps("lastName")}
                  errorMessage={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : null
                  }
                />
                <CustomInput
                  labelText="نام"
                  placeholder="نام خود را وارد کنید"
                  {...formik.getFieldProps("phoneNumber")}
                  errorMessage={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? formik.errors.phoneNumber
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
                className="w-full bg-primary text-white px-8 py-4 rounded-full hover:bg-tertiary transition font-semibold"
              >
                ذخیره تغییرات
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

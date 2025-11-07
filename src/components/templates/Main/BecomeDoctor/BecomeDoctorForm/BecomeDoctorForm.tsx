import { Formik } from "formik";
import React from "react";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import * as Yup from "yup";
function BecomeDoctorForm() {
  return (
    <div className="lg:mt-0 mt-8">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          documents: [],
          information: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("نام الزامی است"),
          lastName: Yup.string().required("نام خانوادگی الزامی است"),
          email: Yup.string()
            .email("ایمیل معتبر نیست")
            .required("ایمیل الزامی است"),
          phone: Yup.string().required("شماره الزامی است"),
          documents: Yup.array()
            .min(1, "حداقل یک مدرک الزامی است")
            .required("مدارک الزامی است"),
          information: Yup.string().required("اطلاعات الزامی است"),
        })}
        onSubmit={() => {}}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="section-border p-6 md:p-8"
            >
              <h2 className="main-header ">ثبت نام دکتر</h2>

              <CustomInput
                labelText="نام"
                placeholder="نام را وارد کنید"
                {...formik.getFieldProps("firstName")}
                errorMessage={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : null
                }
              />

              <CustomInput
                labelText="نام خانوادگی"
                placeholder="نام خانوادگی را وارد کنید"
                {...formik.getFieldProps("lastName")}
                errorMessage={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : null
                }
              />

              <CustomInput
                labelText="ایمیل"
                placeholder="example@gmail.com"
                {...formik.getFieldProps("email")}
                errorMessage={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />
              <CustomInput
                labelText="شماره"
                placeholder="شماره را وارد کنید"
                {...formik.getFieldProps("phone")}
                errorMessage={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : null
                }
              />

              <CustomInput
                inputType="file"
                labelText="آپلود مدارک"
                placeholder="آپلود مدارک"

            {...formik.getFieldProps("documents")}
            errorMessage={
              formik.touched.documents && formik.errors.documents
                ? formik.errors.documents
                : null
            }
              />

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  اطلاعات پزشک
                </label>
                <textarea
                  rows={4}
                  placeholder="توضیحات لازم را وارد نمایید.."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                ></textarea>
              </div>

              <div>
                <div className="flex items-start gap-2 mb-4">
                  <input
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    className="mt-1 w-4 h-4 text-secondary -300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="flexCheckDefault"
                    className="text-gray-700 text-sm"
                  >
                    شما با دوستان ما موافقت می کنید
                    <a
                      href="privacy.html"
                      className="text-secondary -blue-800 underline"
                    >
                      سیاست حفظ حریم خصوصی
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="main-btn"
                >
                  دکتر شوید
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default BecomeDoctorForm;

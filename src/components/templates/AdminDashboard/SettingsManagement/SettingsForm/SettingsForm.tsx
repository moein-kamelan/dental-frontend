import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../../components/modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/modules/CustomTextArea/CustomTextArea";
import {
  useGetSettings,
  useUpdateSettings,
  type Settings,
} from "../../../../../services/useSettings";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";

const validationSchema = Yup.object({
  siteName: Yup.string(),
  siteTitle: Yup.string(),
  description: Yup.string(),
  logo: Yup.string(),
  email: Yup.string().email("ایمیل معتبر نیست"),
  phoneNumber: Yup.string(),
  address: Yup.string(),
  instagram: Yup.string().url("لینک معتبر نیست"),
  telegram: Yup.string().url("لینک معتبر نیست"),
  whatsapp: Yup.string(),
  twitter: Yup.string().url("لینک معتبر نیست"),
  linkedin: Yup.string().url("لینک معتبر نیست"),
  facebook: Yup.string().url("لینک معتبر نیست"),
  youtube: Yup.string().url("لینک معتبر نیست"),
  workingHours: Yup.string(),
  aboutUsImage: Yup.string().nullable(),
  aboutUsVideo: Yup.string().nullable(),
  contactUsImage: Yup.string().nullable(),
  contactUsVideo: Yup.string().nullable(),
});

function SettingsForm() {
  const queryClient = useQueryClient();
  const { data: settingsData, isLoading } = useGetSettings();
  const { mutateAsync: updateSettings } = useUpdateSettings();

  const settings = settingsData?.data?.settings;

  const handleSubmit = async (values: Partial<Settings>) => {
    try {
      await updateSettings(values);
      showSuccessToast("تنظیمات با موفقیت به‌روزرسانی شد");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی تنظیمات رخ داد";
      showErrorToast(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        siteName: settings?.siteName || "",
        siteTitle: settings?.siteTitle || "",
        description: settings?.description || "",
        logo: settings?.logo || "",
        email: settings?.email || "",
        phoneNumber: settings?.phoneNumber || "",
        address: settings?.address || "",
        instagram: settings?.instagram || "",
        telegram: settings?.telegram || "",
        whatsapp: settings?.whatsapp || "",
        twitter: settings?.twitter || "",
        linkedin: settings?.linkedin || "",
        facebook: settings?.facebook || "",
        youtube: settings?.youtube || "",
        workingHours: settings?.workingHours || "",
        aboutUsImage: settings?.aboutUsImage || "",
        aboutUsVideo: settings?.aboutUsVideo || "",
        contactUsImage: settings?.contactUsImage || "",
        contactUsVideo: settings?.contactUsVideo || "",
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* اطلاعات اصلی سایت */}
          <div className="bg-white/50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-lg font-estedad-semibold text-dark mb-4">
              اطلاعات اصلی سایت
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="نام سایت"
                placeholder="نام سایت را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("siteName")}
                errorMessage={
                  formik.touched.siteName && formik.errors.siteName
                    ? formik.errors.siteName
                    : null
                }
              />

              <CustomInput
                labelText="عنوان سایت"
                placeholder="عنوان سایت را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("siteTitle")}
                errorMessage={
                  formik.touched.siteTitle && formik.errors.siteTitle
                    ? formik.errors.siteTitle
                    : null
                }
              />

              <CustomInput
                labelText="لوگو"
                placeholder="آدرس لوگو را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("logo")}
                errorMessage={
                  formik.touched.logo && formik.errors.logo
                    ? formik.errors.logo
                    : null
                }
              />

              <CustomInput
                labelText="ایمیل"
                placeholder="ایمیل را وارد کنید"
                inputType="email"
                className="bg-white"
                optional
                {...formik.getFieldProps("email")}
                errorMessage={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />

              <CustomInput
                labelText="شماره تماس"
                placeholder="شماره تماس را وارد کنید"
                inputType="phone"
                className="bg-white"
                optional
                {...formik.getFieldProps("phoneNumber")}
                errorMessage={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null
                }
              />

              <CustomInput
                labelText="ساعات کاری"
                placeholder="ساعات کاری را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("workingHours")}
                errorMessage={
                  formik.touched.workingHours && formik.errors.workingHours
                    ? formik.errors.workingHours
                    : null
                }
              />
            </div>

            <CustomTextArea
              labelText="توضیحات"
              placeholder="توضیحات سایت را وارد کنید"
              rows={4}
              className="bg-white mt-4"
              optional
              {...formik.getFieldProps("description")}
              errorMessage={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />

            <CustomInput
              labelText="آدرس"
              placeholder="آدرس را وارد کنید"
              className="bg-white mt-4"
              optional
              {...formik.getFieldProps("address")}
              errorMessage={
                formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : null
              }
            />
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="bg-white/50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-lg font-estedad-semibold text-dark mb-4">
              شبکه‌های اجتماعی
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="اینستاگرام"
                placeholder="لینک اینستاگرام را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("instagram")}
                errorMessage={
                  formik.touched.instagram && formik.errors.instagram
                    ? formik.errors.instagram
                    : null
                }
              />

              <CustomInput
                labelText="تلگرام"
                placeholder="لینک تلگرام را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("telegram")}
                errorMessage={
                  formik.touched.telegram && formik.errors.telegram
                    ? formik.errors.telegram
                    : null
                }
              />

              <CustomInput
                labelText="واتساپ"
                placeholder="شماره واتساپ را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("whatsapp")}
                errorMessage={
                  formik.touched.whatsapp && formik.errors.whatsapp
                    ? formik.errors.whatsapp
                    : null
                }
              />

              <CustomInput
                labelText="توییتر"
                placeholder="لینک توییتر را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("twitter")}
                errorMessage={
                  formik.touched.twitter && formik.errors.twitter
                    ? formik.errors.twitter
                    : null
                }
              />

              <CustomInput
                labelText="لینکدین"
                placeholder="لینک لینکدین را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("linkedin")}
                errorMessage={
                  formik.touched.linkedin && formik.errors.linkedin
                    ? formik.errors.linkedin
                    : null
                }
              />

              <CustomInput
                labelText="فیسبوک"
                placeholder="لینک فیسبوک را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("facebook")}
                errorMessage={
                  formik.touched.facebook && formik.errors.facebook
                    ? formik.errors.facebook
                    : null
                }
              />

              <CustomInput
                labelText="یوتیوب"
                placeholder="لینک یوتیوب را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("youtube")}
                errorMessage={
                  formik.touched.youtube && formik.errors.youtube
                    ? formik.errors.youtube
                    : null
                }
              />
            </div>
          </div>

          {/* تصاویر و ویدیوها */}
          <div className="bg-white/50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-lg font-estedad-semibold text-dark mb-4">
              تصاویر و ویدیوها
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="تصویر صفحه درباره ما"
                placeholder="آدرس تصویر را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("aboutUsImage")}
                errorMessage={
                  formik.touched.aboutUsImage && formik.errors.aboutUsImage
                    ? formik.errors.aboutUsImage
                    : null
                }
              />

              <CustomInput
                labelText="ویدیو صفحه درباره ما"
                placeholder="آدرس ویدیو را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("aboutUsVideo")}
                errorMessage={
                  formik.touched.aboutUsVideo && formik.errors.aboutUsVideo
                    ? formik.errors.aboutUsVideo
                    : null
                }
              />

              <CustomInput
                labelText="تصویر صفحه تماس با ما"
                placeholder="آدرس تصویر را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("contactUsImage")}
                errorMessage={
                  formik.touched.contactUsImage && formik.errors.contactUsImage
                    ? formik.errors.contactUsImage
                    : null
                }
              />

              <CustomInput
                labelText="ویدیو صفحه تماس با ما"
                placeholder="آدرس ویدیو را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("contactUsVideo")}
                errorMessage={
                  formik.touched.contactUsVideo && formik.errors.contactUsVideo
                    ? formik.errors.contactUsVideo
                    : null
                }
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="purple-btn flex items-center gap-2"
              disabled={formik.isSubmitting}
            >
              ذخیره تنظیمات
              {formik.isSubmitting && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SettingsForm;

import React, { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../../components/modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/modules/CustomTextArea/CustomTextArea";
import TextEditor from "../../../../../components/modules/AdminDashboard/TextEditor/TextEditor";
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
  logo: Yup.mixed().nullable(),
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
  aboutUsImage: Yup.mixed().nullable(),
  aboutUsVideo: Yup.mixed().nullable(),
  aboutUsContent: Yup.string(),
  contactUsImage: Yup.mixed().nullable(),
  contactUsVideo: Yup.mixed().nullable(),
  becomeDoctorContent: Yup.string(),
});

function SettingsForm() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const aboutUsImageInputRef = useRef<HTMLInputElement>(null);
  const aboutUsVideoInputRef = useRef<HTMLInputElement>(null);
  const contactUsImageInputRef = useRef<HTMLInputElement>(null);
  const contactUsVideoInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: settingsData, isLoading } = useGetSettings();
  const { mutateAsync: updateSettings } = useUpdateSettings();

  const settings = settingsData?.data?.settings;

  const isFile = (value: unknown): value is File => {
    return value instanceof File;
  };

  type FormValues = Omit<Partial<Settings>, 'logo' | 'aboutUsImage' | 'aboutUsVideo' | 'contactUsImage' | 'contactUsVideo'> & { 
    logo?: File | null;
    aboutUsImage?: File | null;
    aboutUsVideo?: File | null;
    contactUsImage?: File | null;
    contactUsVideo?: File | null;
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      // Check if any file is uploaded
      const logoFile = values.logo;
      const aboutUsImageFile = values.aboutUsImage;
      const aboutUsVideoFile = values.aboutUsVideo;
      const contactUsImageFile = values.contactUsImage;
      const contactUsVideoFile = values.contactUsVideo;
      
      const hasLogoFile = logoFile && isFile(logoFile) && logoFile.size > 0;
      const hasAboutUsImageFile = aboutUsImageFile && isFile(aboutUsImageFile) && aboutUsImageFile.size > 0;
      const hasAboutUsVideoFile = aboutUsVideoFile && isFile(aboutUsVideoFile) && aboutUsVideoFile.size > 0;
      const hasContactUsImageFile = contactUsImageFile && isFile(contactUsImageFile) && contactUsImageFile.size > 0;
      const hasContactUsVideoFile = contactUsVideoFile && isFile(contactUsVideoFile) && contactUsVideoFile.size > 0;
      const hasAnyFile = hasLogoFile || hasAboutUsImageFile || hasAboutUsVideoFile || hasContactUsImageFile || hasContactUsVideoFile;
      
      if (hasAnyFile) {
        // Use FormData if there's any file
        const formData = new FormData();
        
        if (values.siteName !== undefined) formData.append("siteName", values.siteName);
        if (values.siteTitle !== undefined) formData.append("siteTitle", values.siteTitle);
        if (values.description !== undefined) formData.append("description", values.description);
        
        if (hasLogoFile && isFile(logoFile)) {
          formData.append("logo", logoFile);
        } else if (values.logo === null || values.logo === undefined) {
          // Keep existing logo if not changed
          if (settings?.logo) {
            formData.append("logo", settings.logo);
          }
        }
        
        if (values.email !== undefined) formData.append("email", values.email);
        if (values.phoneNumber !== undefined) formData.append("phoneNumber", values.phoneNumber);
        if (values.address !== undefined) formData.append("address", values.address);
        if (values.instagram !== undefined) formData.append("instagram", values.instagram);
        if (values.telegram !== undefined) formData.append("telegram", values.telegram);
        if (values.whatsapp !== undefined) formData.append("whatsapp", values.whatsapp);
        if (values.twitter !== undefined) formData.append("twitter", values.twitter);
        if (values.linkedin !== undefined) formData.append("linkedin", values.linkedin);
        if (values.facebook !== undefined) formData.append("facebook", values.facebook);
        if (values.youtube !== undefined) formData.append("youtube", values.youtube);
        if (values.workingHours !== undefined) formData.append("workingHours", values.workingHours);
        if (values.aboutUsContent !== undefined) formData.append("aboutUsContent", values.aboutUsContent);
        if (values.becomeDoctorContent !== undefined) formData.append("becomeDoctorContent", values.becomeDoctorContent);
        
        if (hasAboutUsImageFile && isFile(aboutUsImageFile)) {
          formData.append("aboutUsImage", aboutUsImageFile);
        } else if (values.aboutUsImage === null || values.aboutUsImage === undefined) {
          // Keep existing image if not changed
          if (settings?.aboutUsImage) {
            formData.append("aboutUsImage", settings.aboutUsImage);
          }
        }
        
        if (hasAboutUsVideoFile && isFile(aboutUsVideoFile)) {
          formData.append("aboutUsVideo", aboutUsVideoFile);
        } else if (values.aboutUsVideo === null || values.aboutUsVideo === undefined) {
          // Keep existing video if not changed
          if (settings?.aboutUsVideo) {
            formData.append("aboutUsVideo", settings.aboutUsVideo);
          }
        }
        
        if (hasContactUsImageFile && isFile(contactUsImageFile)) {
          formData.append("contactUsImage", contactUsImageFile);
        } else if (values.contactUsImage === null || values.contactUsImage === undefined) {
          // Keep existing image if not changed
          if (settings?.contactUsImage) {
            formData.append("contactUsImage", settings.contactUsImage);
          }
        }
        
        if (hasContactUsVideoFile && isFile(contactUsVideoFile)) {
          formData.append("contactUsVideo", contactUsVideoFile);
        } else if (values.contactUsVideo === null || values.contactUsVideo === undefined) {
          // Keep existing video if not changed
          if (settings?.contactUsVideo) {
            formData.append("contactUsVideo", settings.contactUsVideo);
          }
        }
        
        await updateSettings(formData);
      } else {
        // Use regular JSON if no file
        const updateData: Partial<Settings> = {};
        
        // Add other values
        if (values.siteName !== undefined) updateData.siteName = values.siteName;
        if (values.siteTitle !== undefined) updateData.siteTitle = values.siteTitle;
        if (values.description !== undefined) updateData.description = values.description;
        if (values.email !== undefined) updateData.email = values.email;
        if (values.phoneNumber !== undefined) updateData.phoneNumber = values.phoneNumber;
        if (values.address !== undefined) updateData.address = values.address;
        if (values.instagram !== undefined) updateData.instagram = values.instagram;
        if (values.telegram !== undefined) updateData.telegram = values.telegram;
        if (values.whatsapp !== undefined) updateData.whatsapp = values.whatsapp;
        if (values.twitter !== undefined) updateData.twitter = values.twitter;
        if (values.linkedin !== undefined) updateData.linkedin = values.linkedin;
        if (values.facebook !== undefined) updateData.facebook = values.facebook;
        if (values.youtube !== undefined) updateData.youtube = values.youtube;
        if (values.workingHours !== undefined) updateData.workingHours = values.workingHours;
        if (values.aboutUsContent !== undefined) updateData.aboutUsContent = values.aboutUsContent;
        if (values.becomeDoctorContent !== undefined) updateData.becomeDoctorContent = values.becomeDoctorContent;
        
        await updateSettings(updateData);
      }
      
      showSuccessToast("تنظیمات با موفقیت به‌روزرسانی شد");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      
      setTimeout(() => {
        if (logoInputRef.current) logoInputRef.current.value = "";
        if (aboutUsImageInputRef.current) aboutUsImageInputRef.current.value = "";
        if (aboutUsVideoInputRef.current) aboutUsVideoInputRef.current.value = "";
        if (contactUsImageInputRef.current) contactUsImageInputRef.current.value = "";
        if (contactUsVideoInputRef.current) contactUsVideoInputRef.current.value = "";
      }, 0);
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
    <Formik<FormValues>
      initialValues={{
        siteName: settings?.siteName || "",
        siteTitle: settings?.siteTitle || "",
        description: settings?.description || "",
        logo: null,
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
        aboutUsImage: null,
        aboutUsVideo: null,
        aboutUsContent: settings?.aboutUsContent || "",
        contactUsImage: null,
        contactUsVideo: null,
        becomeDoctorContent: settings?.becomeDoctorContent || "",
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

            <div className="mt-4">
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                لوگو
              </label>
              {settings?.logo && (
                <div className="mb-4 mr-4">
                  <img
                    src={`http://localhost:4000${settings.logo}`}
                    alt="لوگوی سایت"
                    className="w-32 h-32 rounded-lg object-cover border-2 border-main-border-color"
                  />
                  <p className="text-sm text-paragray mt-2 mb-2">
                    لوگوی فعلی (برای تغییر، لوگوی جدید انتخاب کنید)
                  </p>
                </div>
              )}
              <CustomInput
                ref={logoInputRef}
                inputType="file"
                labelText=""
                placeholder="لوگو را انتخاب کنید"
                className="bg-white mr-4"
                name="logo"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0] || null;
                  formik.setFieldValue("logo", file);
                }}
                errorMessage={
                  formik.touched.logo && formik.errors.logo
                    ? formik.errors.logo
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
              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  تصویر صفحه درباره ما
                </label>
                {settings?.aboutUsImage && (
                  <div className="mb-4 mr-4">
                    <img
                      src={`http://localhost:4000${settings.aboutUsImage}`}
                      alt="تصویر درباره ما"
                      className="w-32 h-32 rounded-lg object-cover border-2 border-main-border-color"
                    />
                    <p className="text-sm text-paragray mt-2 mb-2">
                      تصویر فعلی (برای تغییر، تصویر جدید انتخاب کنید)
                    </p>
                  </div>
                )}
                <CustomInput
                  ref={aboutUsImageInputRef}
                  inputType="file"
                  labelText=""
                  placeholder="تصویر را انتخاب کنید"
                  className="bg-white mr-4"
                  name="aboutUsImage"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("aboutUsImage", file);
                  }}
                  errorMessage={
                    formik.touched.aboutUsImage && formik.errors.aboutUsImage
                      ? formik.errors.aboutUsImage
                      : null
                  }
                />
              </div>

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  ویدیو صفحه درباره ما
                </label>
                {settings?.aboutUsVideo && (
                  <div className="mb-4 mr-4">
                    <video
                      src={`http://localhost:4000${settings.aboutUsVideo}`}
                      controls
                      className="w-full max-w-md rounded-lg border-2 border-main-border-color"
                    >
                      مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                    </video>
                    <p className="text-sm text-paragray mt-2 mb-2">
                      ویدیوی فعلی (برای تغییر، ویدیوی جدید انتخاب کنید)
                    </p>
                  </div>
                )}
                <CustomInput
                  ref={aboutUsVideoInputRef}
                  inputType="file"
                  labelText=""
                  placeholder="ویدیو را انتخاب کنید"
                  className="bg-white mr-4"
                  name="aboutUsVideo"
                  accept="video/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("aboutUsVideo", file);
                  }}
                  errorMessage={
                    formik.touched.aboutUsVideo && formik.errors.aboutUsVideo
                      ? formik.errors.aboutUsVideo
                      : null
                  }
                />
              </div>

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  تصویر صفحه تماس با ما
                </label>
                {settings?.contactUsImage && (
                  <div className="mb-4 mr-4">
                    <img
                      src={`http://localhost:4000${settings.contactUsImage}`}
                      alt="تصویر تماس با ما"
                      className="w-32 h-32 rounded-lg object-cover border-2 border-main-border-color"
                    />
                    <p className="text-sm text-paragray mt-2 mb-2">
                      تصویر فعلی (برای تغییر، تصویر جدید انتخاب کنید)
                    </p>
                  </div>
                )}
                <CustomInput
                  ref={contactUsImageInputRef}
                  inputType="file"
                  labelText=""
                  placeholder="تصویر را انتخاب کنید"
                  className="bg-white mr-4"
                  name="contactUsImage"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("contactUsImage", file);
                  }}
                  errorMessage={
                    formik.touched.contactUsImage && formik.errors.contactUsImage
                      ? formik.errors.contactUsImage
                      : null
                  }
                />
              </div>

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  ویدیو صفحه تماس با ما
                </label>
                {settings?.contactUsVideo && (
                  <div className="mb-4 mr-4">
                    <video
                      src={`http://localhost:4000${settings.contactUsVideo}`}
                      controls
                      className="w-full max-w-md rounded-lg border-2 border-main-border-color"
                    >
                      مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                    </video>
                    <p className="text-sm text-paragray mt-2 mb-2">
                      ویدیوی فعلی (برای تغییر، ویدیوی جدید انتخاب کنید)
                    </p>
                  </div>
                )}
                <CustomInput
                  ref={contactUsVideoInputRef}
                  inputType="file"
                  labelText=""
                  placeholder="ویدیو را انتخاب کنید"
                  className="bg-white mr-4"
                  name="contactUsVideo"
                  accept="video/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("contactUsVideo", file);
                  }}
                  errorMessage={
                    formik.touched.contactUsVideo && formik.errors.contactUsVideo
                      ? formik.errors.contactUsVideo
                      : null
                  }
                />
              </div>
            </div>
          </div>

          {/* محتوای صفحه درباره ما */}
          <div className="bg-white/50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-lg font-estedad-semibold text-dark mb-4">
              محتوای صفحه درباره ما
            </h3>
            <TextEditor
              value={formik.values.aboutUsContent || ""}
              onChange={(value) => formik.setFieldValue("aboutUsContent", value)}
              labelText="محتوای صفحه"
              placeholder="محتوای صفحه درباره ما را اینجا وارد کنید..."
              errorMessage={
                formik.touched.aboutUsContent && formik.errors.aboutUsContent
                  ? formik.errors.aboutUsContent
                  : null
              }
            />
          </div>

          {/* محتوای صفحه دکتر شوید */}
          <div className="bg-white/50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-lg font-estedad-semibold text-dark mb-4">
              محتوای صفحه دکتر شوید
            </h3>
            <TextEditor
              value={formik.values.becomeDoctorContent || ""}
              onChange={(value) => formik.setFieldValue("becomeDoctorContent", value)}
              labelText="محتوای صفحه"
              placeholder="محتوای صفحه دکتر شوید را اینجا وارد کنید..."
              errorMessage={
                formik.touched.becomeDoctorContent && formik.errors.becomeDoctorContent
                  ? formik.errors.becomeDoctorContent
                  : null
              }
            />
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

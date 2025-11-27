import { motion } from "motion/react";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { formatPhoneNumber } from "../../../../../validators/phoneNumberValidator";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import { useCreateContactMessage } from "../../../../../services/useContact";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastify";
import { useGetSettings } from "../../../../../services/useSettings";

function ContactForm() {
  const { mutateAsync: createContactMessage, isPending } =
    useCreateContactMessage();
  const { data: settingsData } = useGetSettings();
  const settings = settingsData?.data?.settings;

  const contactUsImage = settings?.contactUsImage
    ? `http://localhost:4000${settings.contactUsImage}`
    : "/images/contact_img.jpg";

  const contactUsVideo = settings?.contactUsVideo;
  const contactUsVideoUrl = contactUsVideo
    ? contactUsVideo.startsWith("http") 
      ? contactUsVideo 
      : `http://localhost:4000${contactUsVideo}`
    : null;
  const isContactUsVideoEmbed = contactUsVideo?.startsWith("http") && (contactUsVideo.includes("youtube.com") || contactUsVideo.includes("vimeo.com") || contactUsVideo.includes("embed"));

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    },
    resetForm: () => void
  ) => {
    try {
      console.log(values);
      await createContactMessage(values);
      showSuccessToast("پیام شما با موفقیت ارسال شد");
      resetForm();
    } catch (error) {
      console.log(error);
      showErrorToast("خطایی رخ داده است");
    }
  };

  return (
    <section className="py-12 overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 overflow-x-hidden">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-estedad-bold text-dark mb-3">
            تماس با ما
          </h2>
          <p className="text-paragray text-base md:text-lg max-w-2xl mx-auto">
            ما آماده پاسخگویی به سوالات و پیشنهادات شما هستیم
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Media Section - More Compact */}
            <motion.div
              className="lg:sticky lg:top-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {contactUsVideoUrl ? (
                  isContactUsVideoEmbed ? (
                    <div className="rounded-2xl overflow-hidden aspect-video">
                      <iframe
                        src={contactUsVideoUrl}
                        className="w-full h-full min-h-[300px]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden aspect-video">
                      <video
                        src={contactUsVideoUrl}
                        controls
                        className="w-full h-full min-h-[300px] object-cover"
                      >
                        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                      </video>
                    </div>
                  )
                ) : (
                  <img
                    src={contactUsImage}
                    alt="contact"
                    className="w-full h-full object-cover aspect-video"
                  />
                )}
              </div>
            </motion.div>

            {/* Form Section - Compact Card Design */}
            <motion.div
              className=""
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-2xl font-estedad-bold text-dark mb-2">
                    پیام خود را ارسال کنید
                  </h3>
                  <p className="text-sm text-paragray">
                    فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم
                  </p>
                </div>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                  }}
                  onSubmit={(values, { resetForm }) =>
                    handleSubmit(values, resetForm)
                  }
                  validationSchema={Yup.object({
                    name: Yup.string().required("نام الزامی است"),
                    email: Yup.string().email("ایمیل معتبر نیست"),
                    phone: Yup.string()
                      .required("شماره الزامی است")
                      .test(
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
                    subject: Yup.string().required("موضوع الزامی است"),
                    message: Yup.string()
                      .required("پیام الزامی است")
                      .min(10, "پیام باید حداقل 10 کاراکتر باشد"),
                  })}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <CustomInput
                            placeholder="نام"
                            requiredText
                            {...formik.getFieldProps("name")}
                            errorMessage={
                              formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : null
                            }
                          />
                          <CustomInput
                            placeholder="ایمیل آدرس"
                            optional
                            inputType="email"
                            {...formik.getFieldProps("email")}
                            errorMessage={
                              formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : null
                            }
                          />
                          <CustomInput
                            placeholder="شماره موبایل"
                            requiredText
                            inputType="phone"
                            {...formik.getFieldProps("phone")}
                            errorMessage={
                              formik.touched.phone && formik.errors.phone
                                ? formik.errors.phone
                                : null
                            }
                          />
                          <CustomInput
                            placeholder="موضوع"
                            requiredText
                            {...formik.getFieldProps("subject")}
                            errorMessage={
                              formik.touched.subject && formik.errors.subject
                                ? formik.errors.subject
                                : null
                            }
                          />
                          <CustomTextArea
                            placeholder="پیام"
                            rows={4}
                            requiredText
                            className="col-span-2 min-h-[120px] w-full"
                            {...formik.getFieldProps("message")}
                            errorMessage={
                              formik.touched.message && formik.errors.message
                                ? formik.errors.message
                                : null
                            }
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full main-btn mt-6"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <div className="btn-loader"></div>
                          ) : (
                            "ارسال پیام"
                          )}
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;

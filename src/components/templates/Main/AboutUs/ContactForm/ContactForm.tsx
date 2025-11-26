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

function ContactForm({ clinics }): any {
  const { mutateAsync: createContactMessage, isPending } =
    useCreateContactMessage();

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
    <section className="py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className=""
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <div className="">
              <img
                src="images/contact_img.jpg"
                alt="contact"
                className="rounded-2xl max-lg:w-7/10 mx-auto max-h-[450px]"
              />
            </div>
          </motion.div>

          <motion.div
            className=""
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <div className=" ">
              <h2 className="text-3xl font-bold text-dark mb-8">
                پیام خود را ارسال کنید
              </h2>

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
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-2">
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
                          rows={5}
                          requiredText
                          className="col-span-2 min-h-[100px] w-full"
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
                        className="max-md:w-full main-btn"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <div className="btn-loader"></div>
                        ) : (
                          "ارسال کنید"
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
    </section>
  );
}

export default ContactForm;

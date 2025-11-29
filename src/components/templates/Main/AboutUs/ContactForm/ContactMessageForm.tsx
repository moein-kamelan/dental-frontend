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

function ContactMessageForm() {
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
      await createContactMessage(values);
      showSuccessToast("پیام شما با موفقیت ارسال شد");
      resetForm();
    } catch (error) {
      console.log(error);
      showErrorToast("خطایی رخ داده است");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 h-full">
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-estedad-bold text-dark mb-2">
          پیام خود را ارسال کنید
        </h3>
        <p className="text-paragray text-sm md:text-base">
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
                className="min-h-[120px] w-full"
                {...formik.getFieldProps("message")}
                errorMessage={
                  formik.touched.message && formik.errors.message
                    ? formik.errors.message
                    : null
                }
              />

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
  );
}

export default ContactMessageForm;


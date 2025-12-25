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
import { useGetAllClinics } from "../../../../../services/useClinics";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import type { OptionType, Clinic } from "../../../../../types/types";
import { useMemo } from "react";

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

function ContactMessageForm() {
  const { mutateAsync: createContactMessage, isPending } =
    useCreateContactMessage();
  const { data: clinicsData } = useGetAllClinics(1, 100);

  const clinicOptions: OptionType[] = useMemo(
    () =>
      clinicsData?.data?.clinics?.map((clinic: Clinic) => ({
        value: clinic.id,
        label: clinic.name,
      })) || [],
    [clinicsData?.data?.clinics]
  );

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      clinicId: string | null;
    },
    resetForm: () => void
  ) => {
    try {
      await createContactMessage({
        name: values.name,
        email: values.email,
        phoneNumber: values.phone,
        subject: values.subject,
        message: values.message,
        clinicId: values.clinicId || null,
      });
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
          clinicId: null as string | null,
        }}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        validationSchema={Yup.object({
          name: Yup.string().required("نام الزامی است"),
          email: Yup.string().email("ایمیل معتبر نیست"),
          phone: Yup.string()
            .required("شماره الزامی است")
            .test("is-valid-phone", "شماره موبایل معتبر نمیباشد", (value) => {
              try {
                formatPhoneNumber(value);
                return true;
              } catch (error) {
                console.log(error);
                return false;
              }
            }),
          subject: Yup.string().required("موضوع الزامی است"),
          message: Yup.string()
            .required("پیام الزامی است")
            .min(10, "پیام باید حداقل 10 کاراکتر باشد"),
          clinicId: Yup.string().uuid().nullable(),
        })}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="md:grid xl:block  md:grid-cols-2  gap-6">
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
              <div>
        
                <Select<OptionType>
                  options={clinicOptions}
                  value={
                    clinicOptions.find(
                      (option) => option.value === formik.values.clinicId
                    ) || null
                  }
                  onChange={(selected) => {
                    formik.setFieldValue("clinicId", selected?.value || null);
                    formik.setFieldTouched("clinicId", true);
                  }}
                  onBlur={() => formik.setFieldTouched("clinicId", true)}
                  placeholder="کلینیک را انتخاب کنید (اختیاری)"
                  isClearable
                  components={{ DropdownIndicator }}
                  classNames={{
                    control: () =>
                      `!text-dark px-5 !min-h-[52px] !rounded-lg !border-2 !border-main-border-color !focus:outline-none h-full !cursor-pointer`,
                    option: ({ isFocused, isSelected }) =>
                      `px-3 py-2 cursor-pointer !text-lg border-r-6 ${
                        isSelected
                          ? "!bg-primary text-white !cursor-pointer"
                          : isFocused
                          ? "!text-secondary !cursor-pointer"
                          : "bg-white !cursor-pointer"
                      }`,
                    menu: () =>
                      "!mt-0 !rounded-t-none shadow-lg bg-white overflow-hidden",
                    placeholder: () => `!text-paragray font-estedad-light`,
                  }}
                />
                <div className="text-red-500 text-[10px] mr-4 mt-1 min-h-[20px]">
                  {formik.touched.clinicId && formik.errors.clinicId
                    ? formik.errors.clinicId
                    : null}
                </div>
              </div>
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
                className="main-btn group/btn relative flex items-center justify-center mt-6 col-span-2 justify-self-end"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="btn-loader"></div>
                ) : (
                  <>
                    <span className="group-hover/btn:translate-x-1 transition-all duration-200">ارسال پیام</span>
                    <i className="fas fa-arrow-left absolute left-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2 transition-all duration-200 text-sm"></i>
                  </>
                )}
              </button>
              </div>
 
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ContactMessageForm;

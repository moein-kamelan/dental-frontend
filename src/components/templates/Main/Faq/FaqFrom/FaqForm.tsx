
import React from 'react'
import { useCreateContactMessage } from '../../../../../hooks/useContact';
import { formatPhoneNumber } from '../../../../../validators/phoneNumberValidator';
import CustomInput from '../../../../modules/CustomInput/CustomInput';
import CustomTextArea from '../../../../modules/CustomTextArea/CustomTextArea';
import { showErrorToast, showSuccessToast } from '../../../../../utils/toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';

function FaqForm() {
  const { mutateAsync: createContactMessage , isPending } = useCreateContactMessage();
  
  
  const handleSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    subject: string;
      message: string;
  }, resetForm: () => void) => {
    try {
      console.log(values);
      await createContactMessage(values);
      showSuccessToast("پیام شما با موفقیت ارسال شد");
      resetForm();
    } catch (error) {
      console.log(error);
      showErrorToast("خطایی رخ داده است");
    }
  }
  
  return (
    <div className="lg:col-span-2">
        <Formik initialValues={{
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
              }} onSubmit={(values , {resetForm}) => handleSubmit(values , resetForm)} validationSchema={Yup.object({
                name: Yup.string().required("نام الزامی است"),
                email: Yup.string().email("ایمیل معتبر نیست"),
                phone: Yup.string().required("شماره الزامی است").test("is-valid-phone", "شماره موبایل معتبر نمیباشد", (value) => {
                  try {
                    formatPhoneNumber(value);
                    return true;
                  } catch (error) {
                    console.log(error);
                    return false;
                  }
                }),
                subject: Yup.string().required("موضوع الزامی است"),
                message: Yup.string().required("پیام الزامی است").min(10, "پیام باید حداقل 10 کاراکتر باشد"),
              })}>
                {(formik) => {
                  return(
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
          
                <button type="submit" className="max-md:w-full bg-primary main-btn" disabled={isPending}>
                  {isPending ? <div className="btn-loader"></div> : "ارسال درخواست"}
                </button>
              </form>

                  )
                }}
              </Formik>
  </div>
  )
}

export default FaqForm

import React, { useEffect, useRef, useState, type FormEvent } from "react";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import { usePostOtpRequest, usePostOtpVerify } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Formik, type FormikProps, type FormikValues } from "formik";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../utils/helpers";
import { AnimatePresence, motion } from "motion/react";
import { showErrorToast, showSuccessToast } from "../../../utils/toastify";
import {FormikDevTool} from 'formik-devtools';
function Signin() {
  const phoneNumber = useRef<string>("");
  const [codeExpireTime, setCodeExpireTime] = useState<number>(60);
  const [authStep, setAuthStep] = useState<number>(1);

  const navigate = useNavigate();
  const { mutateAsync: requestOtp, isSuccess: susseccRequestOtp } =
    usePostOtpRequest();
  const { mutateAsync: verifyOtp, isSuccess: susseccVerifyOtp } =
    usePostOtpVerify();

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const length = 5;
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index?: number, formik?: any) => {
    const codeArray = formik.values.code.split("");
    codeArray[index!] = value.slice(-1);
    formik.setFieldValue("code", codeArray.join(""));
       if (!formik.touched.code) {
    formik.setFieldTouched("code", true);
  }

    if (value && index! < length - 1) {
      inputsRef.current[index! + 1].focus();
    }

    // if (newOtp.every((v) => v !== "")) {
    //   handleSubmitVerifyForm(newOtp.join(""));
    // }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index?: number,
    formik?: any
  ) => {
    const codeArray = formik.values.code.split("");

    if (e.key === "Backspace" && !codeArray[index!] && index! > 0) {
      inputsRef.current[index! - 1].focus();
    }
  };

  const handleSubmitRequestForm = async (value: FormikValues) => {
    if (
      codeExpireTime &&
      authStep === 1 &&
      phoneNumber.current === value.phoneNumber
    ) {
      setAuthStep(2);
      return;
    }
    const response = await requestOtp(phoneNumber.current || value.phoneNumber);
    console.log("response:", response);
    phoneNumber.current = value.phoneNumber;
    setIsNewUser(response.data.isNewUser);
    setAuthStep(2);
    setCodeExpireTime(60);
    const timer = setInterval(() => {
      setCodeExpireTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmitVerifyForm = async (values: FormikValues) => {
    if (isNewUser) {
      verifyOtp({
        firstName: values.firstName,
        lastName: values.lastName,
        code: values.code,
        phoneNumber: phoneNumber.current || "",
      });
    } else {
      verifyOtp({ code: values.code, phoneNumber: phoneNumber.current || "" });
    }
console.log('susseccVerifyOtp:', susseccVerifyOtp)
if(susseccVerifyOtp) {
  navigate("/home");
} 
  
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-md ">
        <div className="relative bg-gray-100 ring-2 inset- border-dark rounded-3xl shadow-2xl p-8 md:p-12 ">
          {authStep === 2 && (
            <button
              onClick={() => {
                setAuthStep(1);
                if (codeExpireTime) {
                  showSuccessToast(
                    `از کد قبلی تا ${codeExpireTime} ثانیه دیگر میتوانید استفاده کنید`
                  );
                }
              }}
              className="absolute top-4 left-6 flex items-center justify-center rounded-full p-5 bg-accent hover:bg-secondary"
            >
              <i className="	fas fa-arrow-left text-2xl text-white absolute"></i>
            </button>
          )}
          <h2 className="text-3xl font-iran-yekan-bold text-center mb-8">
            خوش آمدید
          </h2>
          <p className="text-center text-paragray mb-8">
            برای ادامه به حساب کاربری خود وارد شوید
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={authStep}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                duration: 0.15,
                ease: [0.25, 0.8, 0.25, 1],
              }}
              className=""
            >
              {!susseccRequestOtp || authStep === 1 ? (
                <Formik
                  initialValues={{
                    phoneNumber: phoneNumber.current || "",
                  }}
                  onSubmit={handleSubmitRequestForm}
                  validationSchema={yup.object({
                    phoneNumber: yup
                      .string()
                      .required("شماره موبایل الزامی است")
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
                  })}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit} className="">
                        <CustomInput
                          inputType="phone"
                          labelText="شماره موبایل"
                          placeholder="شماره موبایل خود را وارد کنید *"
                          errorMessage={
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                              ? formik.errors.phoneNumber
                              : null
                          }
                          {...formik.getFieldProps("phoneNumber")}
                          className={`${
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                              ? "border-red-500"
                              : ""
                          }`}
                          maxLength={12}
                        />

                        <button
                          type="submit"
                          className="w-full mt-4   main-btn"
                        >
                          ادامه
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              ) : isNewUser ? (
                
                <Formik
                  onSubmit={handleSubmitVerifyForm}
                  initialValues={{
                    phoneNumber: phoneNumber.current,
                    code: "",
                    firstName: "",
                    lastName: "",
                  }}
                  validationSchema={yup.object({
                    firstName: yup.string().required("نام الزامی است"),
                    lastName: yup.string().required("نام خانوادگی الزامی است"),
                    code: yup.string().length(5, "کد باید ۵ رقم باشد").required("کد الزامی است"),
                  })}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit}>
                          <div className="mb-6">
                            <CustomInput
                              inputType="text"
                              labelText="نام"
                              placeholder="لطفا نام خود را وارد کنید"
                              {...formik.getFieldProps("firstName")}
                              className={`${
                                formik.touched.firstName &&
                                formik.errors.firstName
                                  ? "border-red-500"
                                  : ""
                              }`}
                              errorMessage={
                                formik.touched.firstName &&
                                formik.errors.firstName
                                  ? formik.errors.firstName
                                  : null
                              }
                              maxLength={20}
                            />
                            <CustomInput
                              inputType="text"
                              labelText="نام خانوادگی"
                              placeholder="لطفا نام خانوادگی خود را وارد کنید"
                              {...formik.getFieldProps("lastName")}
                              className={`${
                                formik.touched.lastName &&
                                formik.errors.lastName
                                  ? "border-red-500"
                                  : ""
                              }`}
                              errorMessage={
                                formik.touched.lastName &&
                                formik.errors.lastName
                                  ? formik.errors.lastName
                                  : null
                              }
                              maxLength={30}
                            />
                          </div>
                        <p className="text-center mb-2 font-iran-sans-bold">
                          کد تایید برای {phoneNumber.current} ارسال شد
                        </p>
                        <div className="flex flex-row-reverse items-center justify-center gap-2 ">
                          {Array.from({ length }).map((_, i) => (
                            <CustomInput
                              key={i}
                              ref={(el) => {
                                inputsRef.current[i] = el!;
                              }}
                              inputType="number"
                              maxLength={1}
                              manualValue={formik.values.code[i] || ""}
                              manualOnChange={(e) =>
                                handleChange(e, i, formik)
                              }
                              onKeyDown={(e) => handleKeyDown(e, i , formik)}
                              className="size-8! p-1! rounded-lg! md:size-12! md:p-2! text-center border-gray-400! md:rounded-2xl!"
                              

                            />
                          ))}
                        </div>
                        {formik.touched.code && formik.errors.code && (
                          <p className="text-red-500   text-xs text-right pr-6 text-[10px]">
                            {formik.errors.code}
                          </p>
                        )}

                        <button
                          onClick={handleSubmitRequestForm}
                          disabled={!!codeExpireTime}
                          className={`flex items-center justify-end mr-auto ml-8 gap-2 text-paragray font-estedad-light text-sm ${
                            codeExpireTime === 0
                              ? " text-accent! hover:text-secondary! font-estedad-lightbold"
                              : "cursor-not-allowed!"
                          }`}
                        >
                          <span>ارسال دوباره </span>
                          {codeExpireTime !== 0 && (
                            <span>
                              ({" "}
                              {codeExpireTime > 10
                                ? codeExpireTime
                                : 0 + codeExpireTime}{" "}
                              : 00 )
                            </span>
                          )}
                        </button>

                        <button
                          type="submit"
                          className="w-full mt-4   main-btn"
                        >
                          ورود
                        </button>
                        <FormikDevTool/>
                      </form>
                    );
                  }}
                </Formik>
              ) : (
    <Formik
                  onSubmit={handleSubmitVerifyForm}
                  initialValues={{
                    phoneNumber: phoneNumber.current,
                    code: "",
                
                  }}
                  validationSchema={yup.object({
                 
                    code: yup.string().length(5, "کد باید ۵ رقم باشد").required("کد الزامی است"),
                  })}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit}>
                       
                        <p className="text-center mb-2 font-iran-sans-bold">
                          کد تایید برای {phoneNumber.current} ارسال شد
                        </p>
                        <div className="flex flex-row-reverse items-center justify-center gap-2 ">
                          {Array.from({ length }).map((_, i) => (
                            <CustomInput
                              key={i}
                              ref={(el) => {
                                inputsRef.current[i] = el!;
                              }}
                              inputType="number"
                              maxLength={1}
                              manualValue={formik.values.code[i] || ""}
                              manualOnChange={(e) =>
                                handleChange(e, i, formik)
                              }
                              onKeyDown={(e) => handleKeyDown(e, i , formik)}
                              className="size-8! p-1! rounded-lg! md:size-12! md:p-2! text-center border-gray-400! md:rounded-2xl!"
                              

                            />
                          ))}
                        </div>
                        {formik.touched.code && formik.errors.code && (
                          <p className="text-red-500   text-xs text-right pr-6 text-[10px]">
                            {formik.errors.code}
                          </p>
                        )}

                        <button
                          onClick={handleSubmitRequestForm}
                          disabled={!!codeExpireTime}
                          className={`flex items-center justify-end mr-auto ml-8 gap-2 text-paragray font-estedad-light text-sm ${
                            codeExpireTime === 0
                              ? " text-accent! hover:text-secondary! font-estedad-lightbold"
                              : "cursor-not-allowed!"
                          }`}
                        >
                          <span>ارسال دوباره </span>
                          {codeExpireTime !== 0 && (
                            <span>
                              ({" "}
                              {codeExpireTime > 10
                                ? codeExpireTime
                                : 0 + codeExpireTime}{" "}
                              : 00 )
                            </span>
                          )}
                        </button>

                        <button
                          type="submit"
                          className="w-full mt-4   main-btn"
                        >
                          ورود
                        </button>
                        <FormikDevTool/>
                      </form>
                    );
                  }}
                </Formik>

              )
            }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Signin;

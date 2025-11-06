import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import { usePostOtpRequest, usePostOtpVerify } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Formik, type FormikValues } from "formik";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../utils/helpers";
import { AnimatePresence, motion } from "motion/react";
import { showSuccessToast } from "../../../utils/toastify";
import { FormikDevTool } from "formik-devtools";
function Signin() {
  const phoneNumber = useRef<string>("");
  const [codeExpireTime, setCodeExpireTime] = useState<number>(20);
  const [authStep, setAuthStep] = useState<number>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const { mutateAsync: requestOtp } = usePostOtpRequest();
  const { mutateAsync: verifyOtp } = usePostOtpVerify();

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [artificialLoading, setArtificialLoading] = useState<boolean>(false);

  const length = 5;
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleChange = (
    value: string,
    index: number,
    formik: {
      values: { code: string };
      setFieldValue: (field: string, value: string) => void;
      touched: { code?: boolean };
      setFieldTouched: (field: string, touched: boolean) => void;
    }
  ) => {
    const codeArray = formik.values.code.split("");
    codeArray[index] = value.slice(-1);
    formik.setFieldValue("code", codeArray.join(""));
    if (!formik.touched.code) {
      formik.setFieldTouched("code", true);
    }

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // if (newOtp.every((v) => v !== "")) {
    //   handleSubmitVerifyForm(newOtp.join(""));
    // }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    formik: { values: { code: string } }
  ) => {
    const codeArray = formik.values.code.split("");

    if (e.key === "Backspace" && !codeArray[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    _index: number,
    formik: {
      values: { code: string };
      setFieldValue: (field: string, value: string) => void;
      setFieldTouched: (field: string, touched: boolean) => void;
    }
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is exactly 5 characters
    if (pastedData.length === 5) {
      // Only accept numeric characters
      if (/^\d+$/.test(pastedData)) {
        formik.setFieldValue("code", pastedData);
        formik.setFieldTouched("code", true);

        // Focus on the last input after pasting
        if (inputsRef.current[length - 1]) {
          inputsRef.current[length - 1].focus();
        }
      }
    }
  };

  const handleSubmitRequestForm = async (value?: FormikValues | string) => {
    // Clear previous timer if exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Get phone number from parameter or ref
    const phoneToUse =
      typeof value === "string"
        ? value
        : value?.phoneNumber || phoneNumber.current;

    if (
      codeExpireTime > 0 &&
      authStep === 1 &&
      phoneNumber.current === phoneToUse
    ) {
      setAuthStep(2);
      return;
    }

    // تایمر مصنوعی برای تست UI (2 ثانیه)
    setArtificialLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await requestOtp(phoneToUse);
      console.log("response:", response);
      phoneNumber.current = phoneToUse;
      setIsNewUser(response.data?.isNewUser || false);
      setAuthStep(2);
      setCodeExpireTime(20);
      setArtificialLoading(false);

      timerRef.current = setInterval(() => {
        setCodeExpireTime((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error requesting OTP:", error);
      setArtificialLoading(false);
    }
  };

  const handleSubmitVerifyForm = async (values: FormikValues) => {
    // تایمر مصنوعی برای تست UI (3 ثانیه)
    setArtificialLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      if (isNewUser) {
        await verifyOtp({
          firstName: values.firstName,
          lastName: values.lastName,
          code: values.code,
          phoneNumber: phoneNumber.current || "",
        });
      } else {
        console.log(values);

        console.log(phoneNumber.current);

        await verifyOtp({
          code: values.code,
          phoneNumber: phoneNumber.current || "",
        });
      }
      setArtificialLoading(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setArtificialLoading(false);
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
          <p className="text-center text-paragray mb-8 ">
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
              {authStep === 1 ? (
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
                          disabled={formik.isSubmitting || artificialLoading}
                          className={`w-full mt-4 main-btn flex items-center justify-center min-h-[48px] ${
                            formik.isSubmitting || artificialLoading
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {formik.isSubmitting || artificialLoading ? (
                            <div className="btn-loader"></div>
                          ) : (
                            "ادامه"
                          )}
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
                    code: yup
                      .string()
                      .length(5, "کد باید ۵ رقم باشد")
                      .required("کد الزامی است"),
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
                              formik.touched.lastName && formik.errors.lastName
                                ? "border-red-500"
                                : ""
                            }`}
                            errorMessage={
                              formik.touched.lastName && formik.errors.lastName
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
                              manualOnChange={(e) => handleChange(e, i, formik)}
                              onKeyDown={(e) => handleKeyDown(e, i, formik)}
                              onPaste={(e) => handlePaste(e, i, formik)}
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
                          type="button"
                          onClick={() =>
                            handleSubmitRequestForm(phoneNumber.current)
                          }
                          disabled={codeExpireTime > 0}
                          className={`flex items-center justify-end mr-auto ml-8 gap-2 text-paragray font-estedad-light text-sm ${
                            codeExpireTime === 0
                              ? " text-accent! hover:text-secondary! font-estedad-lightbold"
                              : "cursor-not-allowed loader!"
                          }`}
                        >
                          <span>ارسال دوباره </span>
                          {codeExpireTime > 0 && (
                            <span>
                              ({" "}
                              {String(Math.floor(codeExpireTime / 60)).padStart(
                                2,
                                "0"
                              )}
                              :{String(codeExpireTime % 60).padStart(2, "0")} )
                            </span>
                          )}
                        </button>

                        <button
                          type="submit"
                          disabled={formik.isSubmitting || artificialLoading}
                          className={`w-full mt-4 main-btn flex items-center justify-center min-h-[48px] ${
                            formik.isSubmitting || artificialLoading
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {formik.isSubmitting || artificialLoading ? (
                            <div className="btn-loader"></div>
                          ) : (
                            "ورود"
                          )}
                        </button>
                        <FormikDevTool />
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
                    code: yup
                      .string()
                      .length(5, "کد باید ۵ رقم باشد")
                      .required("کد الزامی است"),
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
                              manualOnChange={(e) => handleChange(e, i, formik)}
                              onKeyDown={(e) => handleKeyDown(e, i, formik)}
                              onPaste={(e) => handlePaste(e, i, formik)}
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
                          type="button"
                          onClick={() =>
                            handleSubmitRequestForm(phoneNumber.current)
                          }
                          disabled={codeExpireTime > 0}
                          className={`flex items-center justify-end mr-auto ml-8 gap-2 text-paragray font-estedad-light text-sm ${
                            codeExpireTime === 0
                              ? " text-accent! hover:text-secondary! font-estedad-lightbold"
                              : "cursor-not-allowed!"
                          }`}
                        >
                          <span>ارسال دوباره </span>
                          {codeExpireTime > 0 && (
                            <span>
                              ({" "}
                              {String(Math.floor(codeExpireTime / 60)).padStart(
                                2,
                                "0"
                              )}
                              :{String(codeExpireTime % 60).padStart(2, "0")} )
                            </span>
                          )}
                        </button>

                        <button
                          type="submit"
                          disabled={formik.isSubmitting}
                          className={`w-full mt-4   main-btn ${
                            formik.isSubmitting
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {formik.isSubmitting ? (
                            <div className="btn-loader"></div>
                          ) : (
                            "ورود"
                          )}
                        </button>
                        <FormikDevTool />
                      </form>
                    );
                  }}
                </Formik>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Signin;

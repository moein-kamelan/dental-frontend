import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import { usePostOtpRequest, usePostOtpVerify } from "../../../services/useAuth";
import { useNavigate } from "react-router-dom";
import { Formik, type FormikValues } from "formik";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../validators/phoneNumberValidator";
import { AnimatePresence, motion } from "motion/react";
import { showSuccessToast } from "../../../utils/toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/typedHooks";
import { fetchUser } from "../../../redux/slices/userSlice";
import { formatPersianNameForGreeting } from "../../../utils/helpers";

interface SigninProps {
  onClose?: () => void;
  onWideChange?: (isWide: boolean) => void;
}

function Signin({ onClose, onWideChange }: SigninProps = {}) {
  const phoneNumber = useRef<string>("");
  const [codeExpireTime, setCodeExpireTime] = useState<number>(20);
  const [authStep, setAuthStep] = useState<number>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutateAsync: requestOtp } = usePostOtpRequest();
  const { mutateAsync: verifyOtp } = usePostOtpVerify();
  const { data: existingUser } = useAppSelector((state) => state.user);

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [artificialLoading, setArtificialLoading] = useState<boolean>(false);

  const length = 5;
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
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

    if (pastedData.length === 5) {
      if (/^\d+$/.test(pastedData)) {
        formik.setFieldValue("code", pastedData);
        setTimeout(() => {
          formik.setFieldTouched("code", true);
        }, 10);

        if (inputsRef.current[length - 1]) {
          inputsRef.current[length - 1].focus();
        }
      }
    }
  };

  const handleSubmitRequestForm = async (value?: FormikValues | string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

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

    setArtificialLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await requestOtp(phoneToUse);
      phoneNumber.current = phoneToUse;
      setIsNewUser(response.data?.isNewUser || false);
      setAuthStep(2);
      setCodeExpireTime(20);
      // اطلاع به مودال برای تغییر اندازه
      if (onWideChange) {
        onWideChange(response.data?.isNewUser || false);
      }
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
    setArtificialLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      let response;
      if (isNewUser) {
        response = await verifyOtp({
          firstName: values.firstName,
          lastName: values.lastName,
          code: values.code,
          phoneNumber: phoneNumber.current || "",
          gender: values.gender,
        });
      } else {
        response = await verifyOtp({
          code: values.code,
          phoneNumber: phoneNumber.current || "",
        });
      }

      await dispatch(fetchUser());

      setArtificialLoading(false);
      if (onClose) {
        onClose();
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
      setArtificialLoading(false);
    }
  };

  return (
    <div className={onClose ? "" : "py-20"}>
      <div className={onClose ? "" : `container mx-auto px-4 ${isNewUser && authStep === 2 ? "max-w-4xl" : "max-w-md"}`}>
        <div className={onClose ? `relative p-6 md:p-8 ${isNewUser && authStep === 2 ? "md:p-8" : ""}` : "relative bg-white rounded-3xl shadow-2xl p-6 md:p-8"}>
          {/* دکمه بازگشت */}
          {authStep === 2 && (
            <motion.button
              onClick={() => {
                setAuthStep(1);
                // بازگرداندن سایز مودال به حالت قبلی
                if (onWideChange) {
                  onWideChange(false);
                }
                if (codeExpireTime) {
                  showSuccessToast(
                    `از کد قبلی تا ${codeExpireTime} ثانیه دیگر میتوانید استفاده کنید`
                  );
                }
              }}
              className="absolute top-6 right-6 z-20 flex items-center justify-center gap-2 w-auto h-9 px-4 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <i className="fas fa-arrow-right text-xs text-gray-600 group-hover:text-gray-800 transition-colors"></i>
              <span className="text-xs font-estedad-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                بازگشت
              </span>
            </motion.button>
          )}

          {/* Header Section */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 mb-4"
            >
              <i className="fas fa-user-circle text-2xl text-primary"></i>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl md:text-3xl font-estedad-bold text-dark mb-2"
            >
              {authStep === 2 && !isNewUser && existingUser?.firstName
                ? `${formatPersianNameForGreeting(existingUser.firstName)} عزیز!`
                : authStep === 2 && isNewUser
                ? "لطفاً اطلاعات خود را تکمیل کنید"
                : "خوش آمدید"}
            </motion.h2>
            {authStep === 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-gray-600 text-sm font-estedad-medium"
              >
            برای ادامه به حساب کاربری خود وارد شوید
              </motion.p>
            )}
            {authStep === 2 && !isNewUser && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-gray-600 text-sm font-estedad-medium"
              >
                کد تایید ارسال شده را وارد کنید
              </motion.p>
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={authStep}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
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
                            return false;
                          }
                        }
                      ),
                  })}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit} className="space-y-4 min-h-[200px] flex flex-col">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex-1"
                        >
                        <CustomInput
                          inputType="phone"
                          labelText="شماره موبایل"
                          placeholder="شماره موبایل خود را وارد کنید"
                          errorMessage={
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                              ? formik.errors.phoneNumber
                              : null
                          }
                          {...formik.getFieldProps("phoneNumber")}
                          maxLength={12}
                        />
                        </motion.div>

                        <motion.button
                          type="submit"
                          disabled={formik.isSubmitting || artificialLoading}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className={`w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary/95 to-accent text-white font-estedad-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            formik.isSubmitting || artificialLoading
                              ? "opacity-70 cursor-not-allowed"
                              : "hover:scale-[1.02] active:scale-[0.98]"
                          }`}
                        >
                          {formik.isSubmitting || artificialLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>در حال ارسال...</span>
                            </>
                          ) : (
                            <>
                              <span>ادامه</span>
                              <i className="fas fa-arrow-left text-xs"></i>
                            </>
                          )}
                        </motion.button>
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
                    gender: "" as "MALE" | "FEMALE" | "",
                  }}
                  validationSchema={yup.object({
                    firstName: yup
                      .string()
                      .min(2, "نام باید حداقل 2 کاراکتر باشد")
                      .required("نام الزامی است"),
                    lastName: yup
                      .string()
                      .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
                      .required("نام خانوادگی الزامی است"),
                    gender: yup
                      .string()
                      .oneOf(
                        ["MALE", "FEMALE"],
                        "لطفا جنسیت خود را انتخاب کنید"
                      )
                      .required("انتخاب جنسیت الزامی است"),
                    code: yup
                      .string()
                      .length(5, "کد باید ۵ رقم باشد")
                      .required("کد الزامی است"),
                  })}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* Layout دو ردیفی */}
                        <div className="space-y-4">
                          {/* ردیف بالا: نام و نام خانوادگی */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <CustomInput
                                inputType="text"
                                labelText="نام"
                                placeholder="نام خود را وارد کنید"
                                {...formik.getFieldProps("firstName")}
                                errorMessage={
                                  formik.touched.firstName &&
                                  formik.errors.firstName
                                    ? formik.errors.firstName
                                    : null
                                }
                                maxLength={20}
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <CustomInput
                                inputType="text"
                                labelText="نام خانوادگی"
                                placeholder="نام خانوادگی خود را وارد کنید"
                                {...formik.getFieldProps("lastName")}
                                errorMessage={
                                  formik.touched.lastName && formik.errors.lastName
                                    ? formik.errors.lastName
                                    : null
                                }
                                maxLength={30}
                              />
                            </motion.div>
                          </div>

                          {/* ردیف پایین: جنسیت و کد تایید */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* جنسیت */}
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <label className="block text-dark font-estedad-semibold mb-2 text-sm">
                                جنسیت <span className="text-red-500">*</span>
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                <motion.button
                                  type="button"
                                  onClick={() => {
                                    formik.setFieldValue("gender", "MALE");
                                  }}
                                  className={`h-11 rounded-lg border-2 transition-all duration-300 font-estedad-semibold flex items-center justify-center gap-2 text-sm ${
                                    formik.values.gender === "MALE"
                                      ? "bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg"
                                      : "bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <i
                                    className={`fas ${
                                      formik.values.gender === "MALE"
                                        ? "fa-check-circle"
                                        : "fa-circle"
                                    } text-xs`}
                                  ></i>
                                  <span>مرد</span>
                                </motion.button>
                                <motion.button
                                  type="button"
                                  onClick={() => {
                                    formik.setFieldValue("gender", "FEMALE");
                                  }}
                                  className={`h-11 rounded-lg border-2 transition-all duration-300 font-estedad-semibold flex items-center justify-center gap-2 text-sm ${
                                    formik.values.gender === "FEMALE"
                                      ? "bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg"
                                      : "bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <i
                                    className={`fas ${
                                      formik.values.gender === "FEMALE"
                                        ? "fa-check-circle"
                                        : "fa-circle"
                                    } text-xs`}
                                  ></i>
                                  <span>زن</span>
                                </motion.button>
                              </div>
                              {formik.touched.gender &&
                                formik.errors.gender &&
                                !formik.values.gender && (
                                  <p className="text-red-500 text-xs mt-2 text-right">
                                    {formik.errors.gender}
                                  </p>
                                )}
                            </motion.div>

                            {/* کد تایید */}
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 }}
                            >
                              <label className="block text-dark font-estedad-semibold mb-2 text-sm">
                                لطفا کد ارسال شده به <span className="font-estedad-bold">{phoneNumber.current}</span> را وارد کنید
                              </label>

                              <div className="flex flex-row-reverse items-center justify-center gap-2">
                                {Array.from({ length }).map((_, i) => (
                                  <motion.input
                                    key={i}
                                    ref={(el) => {
                                      inputsRef.current[i] = el!;
                                    }}
                                    type="number"
                                    maxLength={1}
                                    value={formik.values.code[i] || ""}
                                    onChange={(e) => handleChange(e.target.value, i, formik)}
                                    onKeyDown={(e) => handleKeyDown(e, i, formik)}
                                    onPaste={(e) => handlePaste(e, i, formik)}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 border-accent/30 text-center text-lg font-estedad-bold text-dark focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 bg-white"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                  />
                                ))}
                              </div>
                              {formik.touched.code &&
                                formik.errors.code &&
                                formik.values.code.length < 5 && (
                                  <p className="text-red-500 text-xs mt-2 text-right">
                                    {formik.errors.code}
                                  </p>
                                )}
                            </motion.div>
                          </div>
                        </div>

                        {/* دکمه‌های پایین */}
                        <div className="space-y-3 pt-1">
                          {/* ارسال مجدد */}
                          <motion.button
                          type="button"
                          onClick={() =>
                            handleSubmitRequestForm(phoneNumber.current)
                          }
                          disabled={codeExpireTime > 0}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className={`w-full text-center text-xs font-estedad-medium transition-colors ${
                            codeExpireTime === 0
                                ? "text-primary hover:text-accent cursor-pointer"
                                : "text-gray-400 cursor-not-allowed"
                          }`}
                        >
                            <span>ارسال مجدد کد</span>
                          {codeExpireTime > 0 && (
                              <span className="mr-2">
                                ({String(Math.floor(codeExpireTime / 60)).padStart(2, "0")}:
                                {String(codeExpireTime % 60).padStart(2, "0")})
                            </span>
                          )}
                          </motion.button>

                          <motion.button
                          type="submit"
                          disabled={formik.isSubmitting || artificialLoading}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary/95 to-accent text-white font-estedad-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            formik.isSubmitting || artificialLoading
                              ? "opacity-70 cursor-not-allowed"
                                : "hover:scale-[1.02] active:scale-[0.98]"
                          }`}
                        >
                          {formik.isSubmitting || artificialLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>در حال ثبت...</span>
                              </>
                          ) : (
                              <>
                                <span>ثبت نام و ورود</span>
                                <i className="fas fa-check text-xs"></i>
                              </>
                          )}
                          </motion.button>
                        </div>
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
                      <form onSubmit={formik.handleSubmit} className="space-y-4 min-h-[200px] flex flex-col">
                        {/* کد تایید */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-4 flex-1 flex flex-col justify-center"
                        >
                          <div className="text-center mb-2">
                            <p className="text-xs font-estedad-medium text-gray-600">
                              کد تایید برای <span className="font-estedad-bold text-dark">{phoneNumber.current}</span> ارسال شد
                            </p>
                          </div>

                          <div className="flex flex-row-reverse items-center justify-center gap-2">
                            {Array.from({ length }).map((_, i) => (
                              <motion.input
                                key={i}
                                ref={(el) => {
                                  inputsRef.current[i] = el!;
                                }}
                                type="number"
                                maxLength={1}
                                value={formik.values.code[i] || ""}
                                onChange={(e) => handleChange(e.target.value, i, formik)}
                                onKeyDown={(e) => handleKeyDown(e, i, formik)}
                                onPaste={(e) => handlePaste(e, i, formik)}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 border-accent/30 text-center text-lg font-estedad-bold text-dark focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 bg-white"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                              />
                            ))}
                          </div>
                          {formik.touched.code &&
                            formik.errors.code &&
                            formik.values.code.length < 5 && (
                              <p className="text-red-500 text-xs text-center">
                                {formik.errors.code}
                              </p>
                            )}
                        </motion.div>

                        {/* ارسال مجدد */}
                        <motion.button
                          type="button"
                          onClick={() =>
                            handleSubmitRequestForm(phoneNumber.current)
                          }
                          disabled={codeExpireTime > 0}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className={`w-full text-center text-xs font-estedad-medium transition-colors ${
                            codeExpireTime === 0
                              ? "text-primary hover:text-accent cursor-pointer"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <span>ارسال مجدد کد</span>
                          {codeExpireTime > 0 && (
                            <span className="mr-2">
                              ({String(Math.floor(codeExpireTime / 60)).padStart(2, "0")}:
                              {String(codeExpireTime % 60).padStart(2, "0")})
                            </span>
                          )}
                        </motion.button>

                        <motion.button
                          type="submit"
                          disabled={formik.isSubmitting || artificialLoading}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className={`w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary/95 to-accent text-white font-estedad-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            formik.isSubmitting || artificialLoading
                              ? "opacity-70 cursor-not-allowed"
                              : "hover:scale-[1.02] active:scale-[0.98]"
                          }`}
                        >
                          {formik.isSubmitting || artificialLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>در حال ورود...</span>
                            </>
                          ) : (
                            <>
                              <span>ورود</span>
                              <i className="fas fa-arrow-left text-xs"></i>
                            </>
                          )}
                        </motion.button>
                      </form>
                    );
                  }}
                </Formik>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Signin;

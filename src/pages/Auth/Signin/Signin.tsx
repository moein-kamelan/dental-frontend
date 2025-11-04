import React, { useRef, useState, type FormEvent } from "react";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import { usePostOtpRequest, usePostOtpVerify } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Formik, type FormikValues } from "formik";
import * as yup from 'yup';
import { formatPhoneNumber } from "../../../utils/helpers";

function Signin() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const navigate = useNavigate();
  const { mutateAsync: requestOtp, isSuccess: susseccRequestOtp } =
    usePostOtpRequest();
  const { mutateAsync: verifyOtp, isSuccess: susseccVerifyOtp } =
    usePostOtpVerify();

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const length = 5;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index?: number) => {
    const newValue = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index!] = newValue;
    setOtp(newOtp);

    if (newValue && index! < length - 1) {
      inputsRef.current[index! + 1].focus();
    }

    if (newOtp.every((v) => v !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (e.key === "Backspace" && !otp[index!] && index! > 0) {
      inputsRef.current[index! - 1].focus();
    }
  };

  const handleSubmit = async (code: string) => {
    if (isNewUser) {
      verifyOtp({ firstName, lastName, code, phoneNumber });
    } else {
      verifyOtp({ code, phoneNumber });
    }

    navigate("/home");
  };

  const handleSubmitRequestForm = async () => {
    const response = await requestOtp(phoneNumber);
    setIsNewUser(response.data.isNewUser);
  };
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-gray-100 ring-2 inset- border-dark rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-iran-yekan-bold text-center mb-8">
            خوش آمدید
          </h2>
          <p className="text-center text-paragray mb-8">
            برای ادامه به حساب کاربری خود وارد شوید
          </p>

          {!susseccRequestOtp ? (
            <Formik
              initialValues={{
                phoneNumber: "",
              }}
              onSubmit={handleSubmitRequestForm}
              validationSchema={yup.object({
                phoneNumber : yup.string().required("شماره موبایل الزامی است").test("is-valid-phone" , "شماره موبایل معتبر نمیباشد" , (value) => {
                  try {
                    formatPhoneNumber(value)
                    return true
                  } catch (error) {
                    console.log(error);
                    
                    return false
                  }
                })
              })}
            >
              {(formik) => {
                return(
              <form onSubmit={formik.handleSubmit} className="">
                <CustomInput
                  inputType="phone"
                  labelText="شماره موبایل"
                  placeholder="شماره موبایل خود را وارد کنید *"         
                  errorMessage={(formik.touched.phoneNumber && formik.errors.phoneNumber) ? formik.errors.phoneNumber : null}        
                  {...formik.getFieldProps("phoneNumber")}
                  className={`${(formik.touched.phoneNumber && formik.errors.phoneNumber) ? "border-red-500" : ""}`}
                />

                <button type="submit" className="w-full mt-4   main-btn">
                  ادامه
                </button>

          
              </form>

                )

              }}
              
            </Formik>
          ) : (

            
            
            
            <form>
              {isNewUser && (
                <div className="mb-6">
                  <CustomInput
                    inputType="text"
                    labelText="نام"
                    placeholder="لطفا نام خود را وارد کنید"
                    value={firstName}
                    onChange={ setFirstName}
                  />
                  <CustomInput
                    inputType="text"
                    labelText="نام خانوادگی"
                    placeholder="لطفا نام خانوادگی خود را وارد کنید"
                    value={lastName}
                    onChange={ setLastName}
                  />
                </div>
              )}
              <p className="text-center mb-3 font-iran-sans-bold">
                کد تایید برای {phoneNumber} ارسال شد
              </p>
              <div className="flex flex-row-reverse items-center justify-center gap-2 ">
                {otp.map((val, i) => (
                  <CustomInput
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el!;
                    }}
                    inputType="text"
                    maxLength={1}
                    value={val}
                    index={i}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className=" size-8! p-1! rounded-lg!  md:size-12! md:p-2! text-center  border-gray-400! md:rounded-2xl!"
                  />
                ))}
              </div>

              <button type="submit" className="w-full mt-4   main-btn">
                ورود
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Signin;

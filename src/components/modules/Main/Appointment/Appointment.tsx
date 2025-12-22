import React, { useState } from "react";
import { motion } from "motion/react";
import Select, { components } from "react-select";
import type { OptionType } from "../../../../types/types";
import JalaliDatePicker from "../../JalaliDatePicker/JalaliDatePicker";
const options: OptionType[] = [
  { value: "20s", label: "کند: 20 ثانیه" },
  { value: "10s", label: "متعادل: 10 ثانیه" },
  { value: "5s", label: "سریع: 5 ثانیه" },
];

function Appointment() {
  const [doctorValue, setDoctorValue] = useState<OptionType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className=""
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3, margin: "-100px" }}
        >
          <div className="relative grid  xl:grid-cols-[3fr_2fr] gap-8 items-center bg-[url('images/appointment_bg.jpg')] z-10 p-6 sm:p-7.5 md:p-15 rounded-[10px] ">
            <div className="absolute inset-0 bg-primary opacity-90 -z-10 rounded-[10px]"></div>

            <div className="  ">
              <div className="space-y-6 mb-8 text-white">
                <h5 className="custom-sub-title text-white border-r-white">
                  نوبت دهی
                </h5>
                <h2 className="custom-title text-white">
                  ثبت درخواست رزرو رایگان
                </h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-rows-8 md:grid-rows-4 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="نام بیمار*"
                    className="placeholder:text-paragray w-full py-3.5 px-5  bg-white  rounded-full text-dark  focus:outline-none "
                  />
                  <input
                    type="email"
                    placeholder="ایمیل*"
                    className="placeholder:text-paragray w-full py-3.5 px-5  bg-white  rounded-full text-dark  focus:outline-none "
                  />
                  <input
                    type="text"
                    placeholder="شماره تماس*"
                    className="placeholder:text-paragray w-full py-3.5 px-5  bg-white  rounded-full text-dark  focus:outline-none "
                  />
                  <Select<OptionType, false>
                    options={options}
                    value={doctorValue}
                    onChange={(option) => {
                      setDoctorValue(option);
                    }}
                    placeholder="انتخاب دپارتمان"
                    components={{ DropdownIndicator }}
                    classNames={{
                      control: () =>
                        `!text-dark  px-5    !rounded-lg  !border-none !focus:outline-none  h-full !cursor-pointer`,
                      option: ({ isFocused, isSelected }) =>
                        `px-3 py-2 cursor-pointer !text-lg border-r-6  ${
                          isSelected
                            ? "!bg-primary text-white !cursor-pointer "
                            : isFocused
                            ? " !text-secondary  !cursor-pointer"
                            : "bg-white  !cursor-pointer"
                        }`,
                      menu: () =>
                        "!mt-0   !rounded-t-none shadow-lg bg-white overflow-hidden",
                      placeholder: () => `!text-dark`,
                    }}
                  />
                  <Select<OptionType, false>
                    options={options}
                    value={doctorValue}
                    onChange={(option) => {
                      setDoctorValue(option);
                    }}
                    placeholder="انتخاب دکتر"
                    components={{ DropdownIndicator }}
                    classNames={{
                      control: () =>
                        `!text-dark  px-5    !rounded-lg  !border-none !focus:outline-none  h-full !cursor-pointer`,
                      option: ({ isFocused, isSelected }) =>
                        `px-3 py-2 cursor-pointer !text-lg border-r-6  ${
                          isSelected
                            ? "!bg-primary text-white !cursor-pointer "
                            : isFocused
                            ? " !text-secondary  !cursor-pointer"
                            : "bg-white  !cursor-pointer"
                        }`,
                      menu: () =>
                        "!mt-0   !rounded-t-none shadow-lg bg-white overflow-hidden",
                      placeholder: () => `!text-dark`,
                    }}
                  />
                  <div className="[&_.rmdp-container]:w-full [&_.rmdp-input]:!rounded-full [&_.rmdp-input]:!py-3.5 [&_.rmdp-input]:!px-5 [&_.rmdp-input]:!bg-white [&_.rmdp-input]:!border-none [&_.rmdp-input]:!text-dark [&_.rmdp-input]:!placeholder:text-paragray">
                    <JalaliDatePicker
                      value={selectedDate}
                      onChange={(value) => setSelectedDate(value)}
                      placeholder="تاریخ را انتخاب کنید"
                    />
                  </div>

                  <Select<OptionType, false>
                    options={options}
                    value={doctorValue}
                    onChange={(option) => {
                      setDoctorValue(option);
                    }}
                    placeholder="انتخاب زمان"
                    components={{ DropdownIndicator }}
                    classNames={{
                      control: () =>
                        `!text-dark  px-5    !rounded-lg  !border-none !focus:outline-none  h-full !cursor-pointer`,
                      option: ({ isFocused, isSelected }) =>
                        `px-3 py-2 cursor-pointer !text-lg border-r-6  ${
                          isSelected
                            ? "!bg-primary text-white !cursor-pointer "
                            : isFocused
                            ? " !text-secondary  !cursor-pointer"
                            : "bg-white  !cursor-pointer"
                        }`,
                      menu: () =>
                        "!mt-0   !rounded-t-none shadow-lg bg-white overflow-hidden",
                      placeholder: () => `!text-dark`,
                    }}
                  />

                  <button
                    type="submit"
                    className="w-full bg-accent text-white px-8 py-4 rounded-full  transition font-semibold hover:bg-white hover:text-primary"
                  >
                    ثبت درخواست رزور
                  </button>
                </div>
              </form>
            </div>

            <div className="hidden xl:block absolute bottom-0 left-4 h-[105%]">
              <img
                src="images/appoinment_img.png"
                alt="appointment"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className="fas fa-caret-down"></i>
    </components.DropdownIndicator>
  );
};

export default Appointment;

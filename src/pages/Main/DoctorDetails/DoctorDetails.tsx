import React, { useState } from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import type { OptionType } from "../../../types/types";
import Select, { components } from "react-select";
import StickyBox from "react-sticky-box";
import { useParams } from "react-router-dom";
import { useGetDoctorByIdentifier } from "../../../services/useDoctors";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import { translateDayName } from "../../../utils/helpers";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";
const options: OptionType[] = [
  { value: "20s", label: "کند: 20 ثانیه" },
  { value: "10s", label: "متعادل: 10 ثانیه" },
  { value: "5s", label: "سریع: 5 ثانیه" },
];

function DoctorDetails() {
  const { slug } = useParams();
  const [doctorValue, setDoctorValue] = useState<OptionType | null>(null);
  const { data: doctor, isLoading } = useGetDoctorByIdentifier(slug as string);
  console.log(doctor);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات دکتر..." />;

  return (
    <>
      <Breadcrumb />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start ">
            <div className="lg:col-span-2 space-y-8">
              <div className=" ">
                <div className="grid md:grid-cols-[342px_1fr] gap-8 mb-8 ">
                  <div className="max-md:flex max-md:justify-center max-md:items-center">
                    <img
                      src={
                        doctor?.data?.doctor?.profileImage
                          ? `${doctor?.data?.doctor?.profileImage}`
                          : "/images/user_img.png"
                      }
                      alt={
                        doctor?.data?.doctor?.firstName +
                        " " +
                        doctor?.data?.doctor?.lastName
                      }
                      className="rounded-2xl   size-80  "
                    />
                  </div>
                  <div className="space-y-5">
                    <h3 className="text-2xl text-primary font-estedad-verybold ">
                      {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                    </h3>
                    <div className="space-y-2.5 text-dark font-estedad-light">
                      <p className="">{doctor?.data?.doctor?.university}</p>
                      <p className="">
                        {doctor?.data?.doctor?.skills.join(", ")}
                      </p>
                      <p className="">
                        شماره نظام پزشکی:{" "}
                        {doctor?.data?.doctor?.medicalLicenseNo}
                      </p>
                      <a
                        href="callto:0123456789"
                        className="block font-estedad-semibold"
                      >
                        تماس: (۷۰۰) ۲۳۰-۰۰۳۵
                      </a>
                      <a
                        href="mailto:example@gmail.com"
                        className="block font-estedad-semibold"
                      >
                        ایمیل: example@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="section-border ">
                  <div className="py-5 px-6 border-b-[1.5px] border-[rgba(94,91,91,0.09)]">
                    <h3 className="text-2xl font-estedad-semibold text-dark ">
                      بیوگرافی دکتر {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                    </h3>
                  </div>
                  <div
                    className="py-8 px-10"
                    dangerouslySetInnerHTML={{
                      __html: doctor?.data?.doctor?.biography || "",
                    }}
                  ></div>
                </div>
              </div>

              <CommentsBox doctorId={doctor?.data?.doctor?.id} />
              <CommentForm doctorId={doctor?.data?.doctor?.id} />
            </div>

            <StickyBox
              offsetBottom={20}
              offsetTop={100}
              className="max-lg:!static"
            >
              <div className="space-y-6    ">
                <div className="bg-primary rounded-lg  py-9 px-6">
                  <h5 className="font-estedad-semibold text-white text-center text-2xl mb-4">
                    درخواست نوبت
                  </h5>
                  <form className="space-y-5 text-dark">
                    <input
                      type="text"
                      placeholder="نام *"
                      className="placeholder:text-paragray w-full py-3.5 px-5  bg-white  rounded-full text-dark  focus:outline-none "
                    />
                    <input
                      type="text"
                      placeholder=" ایمیل*"
                      className="placeholder:text-paragray w-full py-3.5 px-5  bg-white  rounded-full text-dark  focus:outline-none "
                    />

                    <Select<OptionType, false>
                      options={options}
                      value={doctorValue}
                      onChange={(option) => {
                        setDoctorValue(option);
                      }}
                      placeholder="انتخاب ماه"
                      components={{ DropdownIndicator }}
                      classNames={{
                        control: () =>
                          `!text-dark  px-5  !min-h-[52px]  !rounded-lg  !border-none !focus:outline-none  h-full !cursor-pointer`,
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
                      placeholder="انتخاب ساعت"
                      components={{ DropdownIndicator }}
                      classNames={{
                        control: () =>
                          `!text-dark  px-5  !min-h-[52px]  !rounded-lg  !border-none !focus:outline-none  h-full !cursor-pointer`,
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
                      placeholder="انتخاب تاریخ"
                      components={{ DropdownIndicator }}
                      classNames={{
                        control: () =>
                          `!text-dark  px-5  !min-h-[52px]  !rounded-lg  !border-none !focus:outline-none  h-full !cursor-pointer`,
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
                      className="main-btn  text-primary bg-white flex items-center justify-center py-3 px-5 w-full rounded-full hover:bg-secondary hover:text-white "
                    >
                      ثبت درخواست نوبت
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-2xl border-[1.5px] border-[rgba(94,91,91,0.09)]  p-7.5 sticky h-fit top-24">
                  <h5 className="text-2xl relative   font-estedad-semibold text-dark pb-2.5 border-b-2 border-[#5e5b5b17] mb-6 after:absolute after:content-[''] after:bg-primary after:top-full  after:-translate-y-px after:h-1 after:left-0 after:right-0 after:w-32">
                    روز های کاری
                  </h5>
                  <ul className=" text-paragray *:font-estedad-light  divide-y-2 divide-[rgba(94,91,91,0.09)]">
                    {Object.keys(doctor?.data?.doctor?.workingDays || {})
                      .filter(
                        (day: string) =>
                          doctor?.data?.doctor?.workingDays?.[day] !== null
                      )
                      .map((day: string) => (
                        <li
                          key={day}
                          className="flex items-center justify-between py-3"
                        >
                          <span className="text-dark">
                            {translateDayName(day)}
                          </span>
                          <span className="text-paragray">
                            {doctor?.data?.doctor?.workingDays[day]}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </StickyBox>
          </div>
        </div>
      </section>
    </>
  );
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className="fas fa-caret-down"></i>
    </components.DropdownIndicator>
  );
};

export default DoctorDetails;

import React, { useState } from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import type { OptionType } from "../../../types/types";
import Select, { components } from "react-select";
import StickyBox from "react-sticky-box";
const options: OptionType[] = [
  { value: "20s", label: "کند: 20 ثانیه" },
  { value: "10s", label: "متعادل: 10 ثانیه" },
  { value: "5s", label: "سریع: 5 ثانیه" },
];

function DoctorDetails() {
  const [doctorValue, setDoctorValue] = useState<OptionType | null>(null);

  return (
    <>
      <Breadcrumb />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start ">
            <div className="lg:col-span-2 space-y-8">
              <div className=" ">
                <div className="grid md:grid-cols-[342px_1fr] gap-8 mb-8 ">
                  <div className="">
                    <img
                      src="../../../../public/images/team-2.jpg"
                      alt="doctor"
                      className="rounded-2xl w-full  md:max-h-[362px] "
                    />
                  </div>
                  <div className="space-y-5">
                    <h3 className="text-2xl text-primary font-estedad-verybold ">
                      دکتر رزیتا غفاری
                    </h3>
                    <div className="space-y-2.5 text-dark font-estedad-light">
                      <p className="">MBBS (University of Wyoming)</p>
                      <p className="">
                        M.D. of Medicine (Netherland Medical College)
                      </p>
                      <p className="">
                        <span className="font-estedad-semibold">
                          {" "}
                          Senior Prof. (MBBS, M.D){" "}
                        </span>
                        کالج پزشکی هلند
                      </p>
                      <p className="">شماره نظام پزشکی: الف-۲۳۱۴۴۱</p>
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
                      بیوگرافی دکتر رزیتا عفاری
                    </h3>
                  </div>
                  <div className="space-y-6 p-6">
                    <div>
                      <h4 className="mb-4 font-estedad-semibold text-lg ">
                        پیشینه آموزشی
                      </h4>
                      <p className="text-paragray">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-4 font-estedad-semibold text-lg ">
                        مهارت های تجربه پزشکی
                      </h4>
                      <p className="text-paragray">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-border p-3 md:p-7.5">
                <div></div>
                <h2 className="text-2xl font-estedad-semibold ">
                  مجموع دیدگاه (۰۴)
                </h2>

                <div className="space-y-6">
                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1  space-y-2.5">
                        <div className="flex items-start justify-between  flex-wrap  gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr] gap-4 mr-16">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1  space-y-2.5">
                        <div className="flex items-start justify-between  flex-wrap  gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr] gap-4 mr-16">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1  space-y-2.5">
                        <div className="flex items-start justify-between  flex-wrap  gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr] gap-4 mr-16">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-7.5 section-border ">
                <h2 className="text-2xl font-estedad-semibold text-dark mb-6">
                  ارسال دیدگاه
                </h2>
                <div className="flex gap-1 mb-6">
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                </div>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="نام..."
                      className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="ایمیل..."
                      className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="ارسال دیدگاه..."
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold"
                  >
                    ارسال سریع
                  </button>
                </form>
              </div>
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
                    <li className="flex items-center justify-between py-3 ">
                      <span className="text-dark">جمعه - شنبه</span>
                      <span className="text-paragray">۷:۳۰ صبح - ۴:۰۰ عصر</span>
                    </li>
                    <li className="flex items-center justify-between py-3 ">
                      <span className="text-dark">جمعه - شنبه</span>
                      <span className="text-paragray">۷:۳۰ صبح - ۴:۰۰ عصر</span>
                    </li>
                    <li className="flex items-center justify-between py-3 ">
                      <span className="text-dark">جمعه - شنبه</span>
                      <span className="text-paragray">۷:۳۰ صبح - ۴:۰۰ عصر</span>
                    </li>
                    <li className="flex items-center justify-between py-3 ">
                      <span className="text-dark">جمعه - شنبه</span>
                      <span className="text-paragray">۷:۳۰ صبح - ۴:۰۰ عصر</span>
                    </li>
                    <li className="flex items-center justify-between py-3 ">
                      <span className="text-dark">جمعه - شنبه</span>
                      <span className="text-paragray">۷:۳۰ صبح - ۴:۰۰ عصر</span>
                    </li>
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

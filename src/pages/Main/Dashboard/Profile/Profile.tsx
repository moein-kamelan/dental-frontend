import React from "react";
import StatItem from "../../../../components/templates/Main/Dashboard/Profile/StatItem/StatItem";

function Profile() {
  return (
    <div className="lg:col-span-3">
      <div className="mb-8">
        <h5 className="text-2xl relative   font-estedad-verybold text-dark pb-2.5 border-b-2 border-[#5e5b5b17] mb-6 after:absolute after:content-[''] after:bg-primary after:top-full  after:-translate-y-px after:h-1 after:left-0 after:right-0 after:w-40">
          مشاهده کلی
        </h5>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatItem />
          <StatItem />
          <StatItem />
          <StatItem />
          <StatItem />
          <StatItem />
        </div>
      </div>

      {/* <!-- Profile Details --> */}
      <div className="bg-white  p-8">
        <div className="flex items-center justify-between mb-6 ">
          <div className="flex items-center w-full justify-between pb-2.5 border-b-2 relative border-[#5e5b5b17] mb-6 after:absolute after:content-[''] after:bg-primary after:top-full  after:-translate-y-px after:h-1 after:left-0 after:right-0 after:w-36">
            <h5 className="text-2xl relative   font-estedad-verybold text-dark ">
              پروفایل من
            </h5>
            <a
              href="dashboard_profile_edit.html"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition"
            >
              ویرایش
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 divide-y divide-[#ddd]">
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              نام:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">
              محسن دادار
            </span>
          </div>
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              موبایل:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">
              ۱۶۱۲۳۱ ۱۷۸۵۵۵ ۸۸۰+
            </span>
          </div>
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              ایمیل:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">
              example@gmail.com
            </span>
          </div>
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              جنسیت:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">مرد</span>
          </div>
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              وزن:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">
              ۶۴ کیلوگرم
            </span>
          </div>
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              سن:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">۳۵</span>
          </div>
          <div className=" pb-4 flex items-center  flex-wrap gap-y-3 ">
            <span className="text-dark font-estedad-light w-16 xs:w-25 max-xs:text-sm">
              آدرس:
            </span>
            <span className=" text-paragray mr-3 max-sm:text-sm">
              شیراز. بلوار ارم. کوچه ۱۲
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

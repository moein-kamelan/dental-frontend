import React from "react";

function UpcomingMeeting() {
  return (
    <>
      <h5 className="main-header">نوبت‌های آینده</h5>

      <div className="max-md:max-w-[630px] max-sm:max-w-[470px] max-xs:!max-w-[290px] mx-auto overflow-x-auto border border-[#5e5b5b17] rounded-[10px] shadow-sm ">
        <table className="w-full ">
          <thead className="border-b border-[#5e5b5b17] ">
            <tr className="*:text-right *:p-4.5 ">
              <th>ردیف</th>
              <th>دکتر</th>
              <th>تاریخ</th>
              <th>مدت زمان</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5e5b5b17]">
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">دکتر نوبخت</p>
                <span className="text-sm font-estedad-light text-paragray">
                  دندانپزشک
                </span>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">۰۵ مهر ۱۴۰۲</p>
                <span className="text-xs text-accent">۴:۳۰ عصر</span>
              </td>
              <td className=" text-dark">۳۰ دقیقه</td>
              <td className="space-y-2.5">
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-secondary text-secondary hover:bg-secondary hover:text-white transition">
                  تایید
                </button>
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition">
                  کنسل
                </button>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">دکتر نوبخت</p>
                <span className="text-sm font-estedad-light text-paragray">
                  دندانپزشک
                </span>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">۰۵ مهر ۱۴۰۲</p>
                <span className="text-xs text-accent">۴:۳۰ عصر</span>
              </td>
              <td className=" text-dark">۳۰ دقیقه</td>
              <td className="space-y-2.5">
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-secondary text-secondary hover:bg-secondary hover:text-white transition">
                  تایید
                </button>
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition">
                  کنسل
                </button>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">دکتر نوبخت</p>
                <span className="text-sm font-estedad-light text-paragray">
                  دندانپزشک
                </span>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">۰۵ مهر ۱۴۰۲</p>
                <span className="text-xs text-accent">۴:۳۰ عصر</span>
              </td>
              <td className=" text-dark">۳۰ دقیقه</td>
              <td className="space-y-2.5">
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-secondary text-secondary hover:bg-secondary hover:text-white transition">
                  تایید
                </button>
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition">
                  کنسل
                </button>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">دکتر نوبخت</p>
                <span className="text-sm font-estedad-light text-paragray">
                  دندانپزشک
                </span>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">۰۵ مهر ۱۴۰۲</p>
                <span className="text-xs text-accent">۴:۳۰ عصر</span>
              </td>
              <td className=" text-dark">۳۰ دقیقه</td>
              <td className="space-y-2.5">
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-secondary text-secondary hover:bg-secondary hover:text-white transition">
                  تایید
                </button>
                <button className="w-24 h-9 flex items-center justify-center rounded-full   border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition">
                  کنسل
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UpcomingMeeting;

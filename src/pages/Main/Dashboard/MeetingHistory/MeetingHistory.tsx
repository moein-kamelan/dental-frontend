import React from "react";
import TableContainer from "../../../../components/modules/TableContainer/TableContainer";

function MeetingHistory() {
  return (
    <>
      <h5 className="text-2xl relative   font-estedad-verybold text-dark pb-2.5 border-b-2 border-[#5e5b5b17] mb-6 after:absolute after:content-[''] after:bg-accent after:top-full  after:-translate-y-px after:h-1 after:left-0 after:right-0 after:w-40">
        تاریخچه نوبت‌ها
      </h5>

      <TableContainer>
        <table className="w-full ">
          <thead className="border-b border-[#5e5b5b17] ">
            <tr className="*:text-right *:p-4.5 ">
              <th>ردیف</th>
              <th>بیمار</th>
              <th>ساعت</th>
              <th>شماره تراکنش</th>
              <th>روش پرداخت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5e5b5b17]">
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">نیما نوبخت</p>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">
                  ۰۵ مهر ۱۴۰۲, ۰۳:۵۰ صبح
                </p>
              </td>
              <td className=" text-dark font-estedad-light">
                #DFSADFHGSAF324RSDA
              </td>
              <td className="space-y-2.5">
                <p className="font-estedad-light">زرین پال</p>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">نیما نوبخت</p>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">
                  ۰۵ مهر ۱۴۰۲, ۰۳:۵۰ صبح
                </p>
              </td>
              <td className=" text-dark font-estedad-light">
                #DFSADFHGSAF324RSDA
              </td>
              <td className="space-y-2.5">
                <p className="font-estedad-light">زرین پال</p>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">نیما نوبخت</p>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">
                  ۰۵ مهر ۱۴۰۲, ۰۳:۵۰ صبح
                </p>
              </td>
              <td className=" text-dark font-estedad-light">
                #DFSADFHGSAF324RSDA
              </td>
              <td className="space-y-2.5">
                <p className="font-estedad-light">زرین پال</p>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">نیما نوبخت</p>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">
                  ۰۵ مهر ۱۴۰۲, ۰۳:۵۰ صبح
                </p>
              </td>
              <td className=" text-dark font-estedad-light">
                #DFSADFHGSAF324RSDA
              </td>
              <td className="space-y-2.5">
                <p className="font-estedad-light">زرین پال</p>
              </td>
            </tr>
            <tr className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap">
              <td className=" font-estedad-light ">۱</td>
              <td className="">
                <p className="font-estedad-light">نیما نوبخت</p>
              </td>
              <td className="">
                <p className="font-estedad-light text-dark">
                  ۰۵ مهر ۱۴۰۲, ۰۳:۵۰ صبح
                </p>
              </td>
              <td className=" text-dark font-estedad-light">
                #DFSADFHGSAF324RSDA
              </td>
              <td className="space-y-2.5">
                <p className="font-estedad-light">زرین پال</p>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>

      {/* <!-- Pagination --> */}
      <div className="mt-12 flex justify-center">
        <nav className="flex gap-2 items-center">
          <a
            href="#"
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-accent hover:text-white hover:border-accent transition"
          >
            <i className="far fa-angle-double-right"></i>
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg bg-accent text-white border-accent"
          >
            ۰۱
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-accent hover:text-white hover:border-accent transition"
          >
            ۰۲
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-accent hover:text-white hover:border-accent transition"
          >
            ۰۳
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-accent hover:text-white hover:border-accent transition"
          >
            <i className="far fa-angle-double-left"></i>
          </a>
        </nav>
      </div>
    </>
  );
}

export default MeetingHistory;

import React from 'react'

function QuickStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 md:gap-6 mb-8">
    <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 font-estedad-lightbold">
            کل کاربران
          </p>
          <h3 className="text-2xl font-estedad-semibold mt-2 ">
            ۲,۵۴۳
          </h3>
        </div>
        <div className="w-12 h-12 shrink-0 bg-blue-100  rounded-lg flex items-center justify-center">
          <i className="fas fa-users text-primary text-xl"></i>
        </div>
      </div>
      <div className="mt-4 flex items-center text-green-500">
        <i className="fas fa-arrow-up"></i>
        <span className="mr-2">۱۲٪ افزایش</span>
      </div>
    </div>

    <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 font-estedad-lightbold text-nowrap md:text-sm">
            نوبت های رزرو شده{" "}
            <span className="relative -top-2 text-xs  ">
              (ماه اخیر )
            </span>
          </p>
          <h3 className="text-2xl font-estedad-semibold mt-2 ">
            ۲,۵۴۳
          </h3>
        </div>
        <div className="w-12 h-12 shrink-0 bg-orange-100  rounded-lg flex items-center justify-center">
          <i className="fas fa-tasks text-orange-500 text-xl"></i>
        </div>
      </div>
      <div className="mt-4 flex items-center text-green-500">
        <i className="fas fa-arrow-up"></i>
        <span className="mr-2">۱۲٪ افزایش</span>
      </div>
    </div>

    {/* <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 font-estedad-lightbold">درآمد</p>
                    <h3 className="text-2xl font-estedad-semibold mt-2 ">۴۵,۲۳۱ تومان</h3>
                </div>
                <div className="w-12 h-12 shrink-0 bg-green-100  rounded-lg flex items-center justify-center">
                    <i className="fas fa-dollar-sign text-green-500 text-xl"></i>
                </div>
            </div>
            <div className="mt-4 flex items-center text-green-500">
                <i className="fas fa-arrow-up"></i>
                <span className="mr-2">۸٪ افزایش</span>
            </div>
        </div>

        <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 font-estedad-lightbold">پروژه‌های فعال</p>
                    <h3 className="text-2xl font-estedad-semibold mt-2 ">۱۲</h3>
                </div>
                <div className="w-12 h-12 shrink-0 bg-purple-100  rounded-lg flex items-center justify-center">
                    <i className="fas fa-project-diagram text-purple-500 text-xl"></i>
                </div>
            </div>
            <div className="mt-4 flex items-center text-green-500">
                <i className="fas fa-arrow-up"></i>
                <span className="mr-2">۳٪ افزایش</span>
            </div>
        </div>

        <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 font-estedad-lightbold">وظایف</p>
                    <h3 className="text-2xl font-estedad-semibold mt-2 ">۲۴</h3>
                </div>
                <div className="w-12 h-12 shrink-0 bg-orange-100  rounded-lg flex items-center justify-center">
                    <i className="fas fa-tasks text-orange-500 text-xl"></i>
                </div>
            </div>
            <div className="mt-4 flex items-center text-red-500">
                <i className="fas fa-arrow-down"></i>
                <span className="mr-2">۲٪ کاهش</span>
            </div>
        </div> */}
  </div>
  )
}

export default QuickStats

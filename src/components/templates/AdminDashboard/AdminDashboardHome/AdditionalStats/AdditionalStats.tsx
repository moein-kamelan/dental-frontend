import React from 'react'

function AdditionalStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
    <div className="bg-white  p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-estedad-semibold mb-4 ">
        وضعیت سرور
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 ">CPU</span>
          <div className="w-32 bg-gray-200  rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
          <span className="text-gray-600 ">۴۵٪</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 ">RAM</span>
          <div className="w-32 bg-gray-200  rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <span className="text-gray-600 ">۶۰٪</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 ">Storage</span>
          <div className="w-32 bg-gray-200  rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <span className="text-gray-600 ">۷۵٪</span>
        </div>
      </div>
    </div>

    <div className="bg-white  p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-estedad-semibold mb-4 ">آخرین تراکنش‌ها</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center  space-x-3">
                        <div className="w-8 h-8 bg-green-100  rounded-full flex items-center justify-center">
                            <i className="fas fa-arrow-down text-green-500"></i>
                        </div>
                        <div>
                            <p className=" ">واریز وجه</p>
                            <p className="text-sm text-gray-500 ">۲ دقیقه پیش</p>
                        </div>
                    </div>
                    <span className="text-green-500">+۲۵۰,۰۰۰ تومان</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center  space-x-3">
                        <div className="w-8 h-8 bg-red-100  rounded-full flex items-center justify-center">
                            <i className="fas fa-arrow-up text-red-500"></i>
                        </div>
                        <div>
                            <p className=" ">برداشت وجه</p>
                            <p className="text-sm text-gray-500 ">۱ ساعت پیش</p>
                        </div>
                    </div>
                    <span className="text-red-500">-۱۵۰,۰۰۰ تومان</span>
                </div>
            </div>
        </div>


    {/* <div className="bg-white  p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-estedad-semibold mb-4 ">آخرین تراکنش‌ها</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center  space-x-3">
                        <div className="w-8 h-8 bg-green-100  rounded-full flex items-center justify-center">
                            <i className="fas fa-arrow-down text-green-500"></i>
                        </div>
                        <div>
                            <p className=" ">واریز وجه</p>
                            <p className="text-sm text-gray-500 ">۲ دقیقه پیش</p>
                        </div>
                    </div>
                    <span className="text-green-500">+۲۵۰,۰۰۰ تومان</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center  space-x-3">
                        <div className="w-8 h-8 bg-red-100  rounded-full flex items-center justify-center">
                            <i className="fas fa-arrow-up text-red-500"></i>
                        </div>
                        <div>
                            <p className=" ">برداشت وجه</p>
                            <p className="text-sm text-gray-500 ">۱ ساعت پیش</p>
                        </div>
                    </div>
                    <span className="text-red-500">-۱۵۰,۰۰۰ تومان</span>
                </div>
            </div>
        </div> */}

    <div className="bg-white  p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-estedad-semibold mb-4 ">
        وضعیت سیستم
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 ">آپتایم</span>
          <span className="text-green-500">۹۹.۹٪</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 ">بازدید امروز</span>
          <span className="text-blue-500">۲,۵۴۳</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 ">کاربران آنلاین</span>
          <span className="text-purple-500">۱۲۳</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdditionalStats

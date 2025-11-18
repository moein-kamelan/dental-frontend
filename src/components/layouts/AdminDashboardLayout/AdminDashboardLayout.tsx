import React from 'react'
import WelcomeSection from '../../templates/AdminDashboard/AdminDashboardHome/WelcomeSection/WelcomeSection'
import AdminDashboardSidebar from '../../modules/AdminDashboard/AdminDashboardSidebar/AdminDashboardSidebar'
import { NavLink, Outlet } from 'react-router-dom'
import AdminDashBaordHeader from '../../modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader'

function AdminDashboardLayout() {
  return (
    <body className="  transition-colors duration-200 font-estedad-medium ">
    {/* <!-- Mobile Menu Button --> */}
    <button
      onClick={() => false}
      className="fixed top-4 right-4 z-50 md:hidden bg-white  p-2 rounded-lg shadow-lg"
    >
      <i className="fas fa-bars text-gray-600 "></i>
    </button>

    {/* <!-- Overlay --> */}
    <div id="overlay" className="overlay" onClick={() => false}></div>

    <div className="flex h-screen">

    <AdminDashboardSidebar />

      {/* <!-- Main Content --> */}
      <div className="flex-1 bg-[url('/images/dashboard-bg-pattern.png')] bg-no-repeat bg-cover p-4 md:p-8 overflow-auto">
      
       <WelcomeSection />

        {/* <!-- Header --> */}
   <AdminDashBaordHeader title="نمای کلی داشبورد" />

        {/* <!-- Quick Stats --> */}
      
        <Outlet />
        {/* <!-- Additional Stats --> */}
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

        {/* <!-- Charts Section --> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white  p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-estedad-semibold mb-4 ">نمودار درآمد</h3>
                  <div className="h-64 bg-gray-50  rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 ">نمودار در اینجا نمایش داده خواهد شد</p>
                  </div>
              </div>

              <div className="bg-white  p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-estedad-semibold mb-4 ">فعالیت کاربران</h3>
                  <div className="h-64 bg-gray-50  rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 ">نمودار در اینجا نمایش داده خواهد شد</p>
                  </div>
              </div>
          </div> */}

        {/* <!-- Recent Activity --> */}
        {/* <div className="mt-8 bg-white  p-4 md:p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-estedad-semibold mb-4 ">فعالیت‌های اخیر</h3>
              <div className="space-y-4">
                  <div className="flex items-center  space-x-4 p-3 hover:bg-gray-50  rounded-lg transition">
                      <div className="w-10 h-10 bg-blue-100  rounded-full flex items-center justify-center">
                          <i className="fas fa-user-plus text-primary"></i>
                      </div>
                      <div>
                          <p className=" ">کاربر جدید ثبت نام کرد</p>
                          <p className="text-sm text-gray-500 ">۲ دقیقه پیش</p>
                      </div>
                  </div>
                  <div className="flex items-center  space-x-4 p-3 hover:bg-gray-50  rounded-lg transition">
                      <div className="w-10 h-10 bg-green-100  rounded-full flex items-center justify-center">
                          <i className="fas fa-shopping-cart text-green-500"></i>
                      </div>
                      <div>
                          <p className=" ">سفارش جدید دریافت شد</p>
                          <p className="text-sm text-gray-500 ">۱ ساعت پیش</p>
                      </div>
                  </div>
                  <div className="flex items-center  space-x-4 p-3 hover:bg-gray-50  rounded-lg transition">
                      <div className="w-10 h-10 bg-purple-100  rounded-full flex items-center justify-center">
                          <i className="fas fa-comment text-purple-500"></i>
                      </div>
                      <div>
                          <p className=" ">نظر جدید ثبت شد</p>
                          <p className="text-sm text-gray-500 ">۳ ساعت پیش</p>
                      </div>
                  </div>
              </div>
          </div> */}
      </div>
    </div>
  </body>
  )
}

export default AdminDashboardLayout

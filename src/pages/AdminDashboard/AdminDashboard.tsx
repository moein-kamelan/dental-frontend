import React from "react";
import "./AdminDashboard.css";
import { NavLink } from "react-router-dom";

function AdminDashboard() {
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
        {/* <!-- Sidebar --> */}
        <div
          id="sidebar"
          className="max-md:fixed max-md:-right-full max-md:top-0 h-screen z-50 transition-all duration-300  w-64 bg-linear-to-b from-purple-500 to-deepblue text-white p-4"
        >
          <div className="flex items-center   space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <i className="fas fa-cube text-purple-500 text-xl"></i>
            </div>
            <h1 className="text-xl font-estedad-semibold">پنل مدیریت</h1>
          </div>
          <nav className="space-y-2">
            <NavLink
              to={"/admin-dashboard"}
              className={({ isActive }) =>
                `flex items-center  space-x-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-white/10 hover:bg-white/20"
                    : "hover:bg-white/10"
                }  transition`
              }
            >
              <i className="fas fa-home"></i>
              <span>داشبورد</span>
            </NavLink>

            {/* <!-- Dropdown Menu --> */}
            <div className="relative">
              <button
                onClick={() => false}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition"
              >
                <div className="flex items-center  space-x-3">
                  <i className="fas fa-users"></i>
                  <span>مدیریت کاربران</span>
                </div>
                <i
                  className="fas fa-chevron-down transition-transform duration-300"
                  id="usersArrow"
                ></i>
              </button>
              <div id="usersSubmenu" className="submenu pr-8">
                <NavLink
                  to={""}
                  className="block p-3 hover:bg-white/10 rounded-lg transition"
                >
                  لیست کاربران
                </NavLink>
                <NavLink
                  to={""}
                  className="block p-3 hover:bg-white/10 rounded-lg transition"
                >
                  افزودن کاربر
                </NavLink>
                <NavLink
                  to={""}
                  className="block p-3 hover:bg-white/10 rounded-lg transition"
                >
                  گزارش‌ها
                </NavLink>
              </div>
            </div>

            {/* <NavLink  to={""} className="flex items-center  space-x-3 p-3 rounded-lg hover:bg-white/10 transition">
                    <i className="fas fa-chart-bar"></i>
                    <span>آمار و تحلیل</span>
                </NavLink> */}
            <NavLink
              to={"/turns"}
              className={({ isActive }) =>
                `flex items-center  space-x-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-white/10 hover:bg-white/20"
                    : "hover:bg-white/10"
                }  transition`
              }
            >
              <i className="fas fa-chart-bar"></i>
              <span>سیستم نوبت دهی</span>
            </NavLink>
            <NavLink
              to={"/setting"}
              className={({ isActive }) =>
                `flex items-center  space-x-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-white/10 hover:bg-white/20"
                    : "hover:bg-white/10"
                }  transition`
              }
            >
              <i className="fas fa-cog"></i>
              <span>تنظیمات</span>
            </NavLink>
          </nav>
        </div>

        {/* <!-- Main Content --> */}
        <div className="flex-1 bg-[url('/images/dashboard-bg-pattern.png')] bg-no-repeat bg-cover p-4 md:p-8 overflow-auto">
          {/* <!-- Welcome Section --> */}
          <div className="bg-linear-to-r from-deepblue to-purple-500  rounded-xl p-4 md:p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-iran-yekan-bold mb-2">
                  خوش آمدید، مدیر عزیز!
                </h2>
                <p className="text-white/80 font-iran-yekan-medium text-sm md:text-base">
                  امروز یک روز عالی برای مدیریت کسب و کار شماست.
                </p>
              </div>
              <div className="hidden md:block">
                <i className="fas fa-rocket text-6xl text-white/20"></i>
              </div>
            </div>
          </div>

          {/* <!-- Header --> */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <h2 className="text-xl md:text-2xl font-estedad-semibold text-dark ">
              نمای کلی داشبورد
            </h2>
            <div className="flex items-center  space-x-4 ">
              <button className="size-10 flex items-center justify-center shadow-sm bg-gray-50 hover:bg-gray-300 rounded-full">
                <i className="fas fa-bell text-gray-600 "></i>
              </button>

              {/* <!-- Profile Dropdown --> */}
              <div className="relative">
                <button
                  onClick={() => false}
                  className="flex items-center  gap-4 bg-gray-50 hover:bg-gray-300  py-2 px-5 rounded-lg transition  shadow-sm"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ml-6 ">
                    <span className="text-dark text-lg font-iran-yekan-bold">معین کاملان</span>
                  <span className=" font-iran-yekan-medium text-paragray">مدیر</span>
                  </div>
                  <i className="fas fa-chevron-down text-gray-600 "></i>
                </button>
                <div
                  id="profileDropdown"
                  className="dropdown-content absolute right-0 mt-2 w-48 bg-white  rounded-lg shadow-lg py-2 z-50"
                >
                  <NavLink
                    to={""}
                    className="block px-4 py-2 hover:bg-gray-100  "
                  >
                    پروفایل
                  </NavLink>
                  <NavLink
                    to={""}
                    className="block px-4 py-2 hover:bg-gray-100  "
                  >
                    تنظیمات
                  </NavLink>
                  <hr className="my-2 border-gray-200 " />
                  <NavLink
                    to={""}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 "
                  >
                    خروج
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Quick Stats --> */}
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
  );
}

export default AdminDashboard;

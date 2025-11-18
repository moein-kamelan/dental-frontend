import React from "react";
import { NavLink } from "react-router-dom";

function AdminDashboardSidebar() {
  return (
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
              isActive ? "bg-white/10 hover:bg-white/20" : "hover:bg-white/10"
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
              isActive ? "bg-white/10 hover:bg-white/20" : "hover:bg-white/10"
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
              isActive ? "bg-white/10 hover:bg-white/20" : "hover:bg-white/10"
            }  transition`
          }
        >
          <i className="fas fa-cog"></i>
          <span>تنظیمات</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminDashboardSidebar;

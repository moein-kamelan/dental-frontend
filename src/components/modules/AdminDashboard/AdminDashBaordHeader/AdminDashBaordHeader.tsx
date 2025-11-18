import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminDashBaordHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
    <h2 className="text-xl md:text-2xl font-estedad-semibold text-dark ">
      {title}
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
  )
}

export default AdminDashBaordHeader

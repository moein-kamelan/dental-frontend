import React from "react";
import {  NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-[76px] ">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between py-4 h-full">
          <NavLink to={"/home"} className="w-40">
            <img
              src="../../../../../public/images/Logo_1.png"
              alt="logo"
              className="w-full"
            />
          </NavLink>

          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-iran-sans-bold">
              <li>
                <NavLink to={"/home"} className={({isActive}) => isActive ? "text-primary" : "text-dark hover:text-primary"}>
                  خانه
                </NavLink>
              </li>
              <li>
                <NavLink to={"/about-us"} className={({isActive}) => isActive ? "text-primary" : "text-dark hover:text-primary"}>
                  درباره ما
                </NavLink>
              </li>
              <li>
                <NavLink to={"/services"} className={({isActive}) => isActive ? "text-primary" : "text-dark hover:text-primary"}>
                  خدمات
                </NavLink>
              </li>
              <li className="relative group">
                <button  className={({isActive}) => isActive ? "text-primary" : "text-dark hover:text-primary"}>
                  صفحات <i className="fas fa-plus"></i>
                </button>
                <ul className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
             
                  <li>
                    <NavLink
                      to={"/doctors"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      پزشکان
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      پروفایل کاربری
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/faq"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      سوالات متداول
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/auth/sign-in"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      ورود
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/auth/sign-up"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      ثبت نام
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to={"/blog"} className={({isActive}) => isActive ? "text-primary" : "text-dark hover:text-primary"}>
                  وبلاگ
                </NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} className={({isActive}) => isActive ? "text-primary" : "text-dark hover:text-primary"}>
                  تماس با ما
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <NavLink to={""} className="text-gray-600 hover:text-primary text-xl">
                <i className="fa fa-search"></i>
              </NavLink>
                <NavLink to={""} className="main-btn  " >
                  نوبت دکتر
                </NavLink>
            </div>
          </div>

          <button className="lg:hidden text-dark text-2xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-[76px] ">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between py-4 h-full">
          <Link to={"/home"} className="w-40">
            <img
              src="../../../../../public/images/Logo_1.png"
              alt="logo"
              className="w-full"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-iran-sans-bold">
              <li>
                <Link to={"/home"} className="text-primary ">
                  خانه
                </Link>
              </li>
              <li>
                <Link to={"/about-us"} className="hover:text-primary">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link to={"/services"} className="hover:text-primary">
                  خدمات
                </Link>
              </li>
              <li className="relative group">
                <button  className="hover:text-primary">
                  صفحات <i className="fas fa-plus"></i>
                </button>
                <ul className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
             
                  <li>
                    <Link
                      to={"/doctors"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      پزشکان
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dashboard"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      پروفایل کاربری
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/faq"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      سوالات متداول
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/auth/sign-in"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      ورود
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/auth/sign-up"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      ثبت نام
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={"/blog"} className="hover:text-primary">
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="hover:text-primary">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link to={""} className="text-gray-600 hover:text-primary text-xl">
                <i className="fa fa-search"></i>
              </Link>
                <Link to={""} className="main-btn  " >
                  نوبت دکتر
                </Link>
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

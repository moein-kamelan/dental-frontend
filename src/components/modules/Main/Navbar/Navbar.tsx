import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-[76px] ">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between py-4 h-full">
          <a href="index.html" className="w-40">
            <img
              src="../../../../../public/images/Logo_1.png"
              alt="logo"
              className="w-full"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-iran-sans-bold">
              <li>
                <a href="#" className="text-primary ">
                  خانه
                </a>
              </li>
              <li>
                <a href="about.html" className="hover:text-primary">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="service.html" className="hover:text-primary">
                  خدمات
                </a>
              </li>
              <li className="relative group">
                <a href="#" className="hover:text-primary">
                  صفحات <i className="far fa-plus"></i>
                </a>
                <ul className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <li>
                    <a
                      href="become_doctor.html"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      دکتر شوید
                    </a>
                  </li>
                  <li>
                    <a
                      href="doctor.html"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      دکتر
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard.html"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      داشبورد
                    </a>
                  </li>
                  <li>
                    <a
                      href="faq.html"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      سوالات متداول
                    </a>
                  </li>
                  <li>
                    <a
                      href="sign_in.html"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      ورود
                    </a>
                  </li>
                  <li>
                    <a
                      href="sing_up.html"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      ثبت نام
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="blog.html" className="hover:text-primary">
                  وبلاگ
                </a>
              </li>
              <li>
                <a href="contact.html" className="hover:text-primary">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-primary text-xl">
                <i className="fa fa-search"></i>
              </a>
                <a href="appointment.html" className="main-btn  " >
                  نوبت دکتر
                </a>
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

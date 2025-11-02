import {motion} from 'motion/react';
import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Breadcrumb />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* <!-- Sidebar --> */}

                                  <motion.div
          className="lg:col-span-1"
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
              <div
                className="bg-[linear-gradient(45deg,_#CDFFF1_0%,_rgba(203,245,246,0.73)_28.13%,_rgba(240,251,224,0.80)_79.75%,_#F8FFDA_100%)]
 rounded-2xl shadow-sm p-6 mb-6 text-center "
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src="/images/user_img.png"
                    alt="user"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <label
                    htmlFor="profile_photo"
                    className="absolute bottom-0 left-0 w-10 h-10 bg-white hover:bg-primary rounded-full flex items-center justify-center  hover:text-white cursor-pointer  transition"
                  >
                    <i className="fas fa-camera text-sm"></i>
                  </label>
                  <input id="profile_photo" type="file" className="hidden" />
                </div>
                <h4 className="text-dark  font-estedad-verybold text-2xl mb-2">
                  محسن دادار
                </h4>
                <p className="text-paragray font-estedad-light ">
                  آیدی بیمار: ۲۳۶۰۲۰۳۳۹۸۱۲
                </p>
              </div>

              {/* <!-- Dashboard Menu --> */}
              <div className="">
                <ul className="space-y-6 p-2">
                  <li className="border border-[#1b1d1f14]  overflow-hidden rounded-[30px]">
                    <NavLink
                      to={"/dashboard/profile"}
                      className={({isActive}) => ` ${isActive && "text-white bg-primary hover:bg-primary hover:text-white"} flex items-center justify-between py-3.5 px-5  bg-[#00a6fb0d] hover:bg-gray-100 transition text-dark font-estedad-semibold`}
                    >
                      <span>پروفایل من</span>
                      <i className="fas fa-angle-left"></i>
                    </NavLink>
                  </li>
                  <li className="border border-[#1b1d1f14]  overflow-hidden rounded-[30px]">
                    <NavLink
                      to={"/dashboard/turns"}
                      className={({isActive}) => ` ${isActive && "text-white bg-primary hover:bg-primary hover:text-white"} flex items-center justify-between py-3.5 px-5  bg-[#00a6fb0d] hover:bg-gray-100 transition text-dark font-estedad-semibold`}
                    >
                      <span>نوبت ها</span>
                      <i className="fas fa-angle-left"></i>
                    </NavLink>
                  </li>
                 
                  <li className="border border-[#1b1d1f14]  overflow-hidden rounded-[30px]">
                    <NavLink
                      to={"/dashboard/meeting-history"}
                      className={({isActive}) => ` ${isActive && "text-white bg-primary hover:bg-primary hover:text-white"} flex items-center justify-between py-3.5 px-5  bg-[#00a6fb0d] hover:bg-gray-100 transition text-dark font-estedad-semibold`}
                    >
                      <span>تاریخچه نوبت ها</span>
                      <i className="fas fa-angle-left"></i>
                    </NavLink>
                  </li>
                  <li className="border border-[#1b1d1f14]  overflow-hidden rounded-[30px]">
                    <NavLink
                      to={"/dashboard/upcoming-meeting"}
                      className={({isActive}) => ` ${isActive && "text-white bg-primary hover:bg-primary hover:text-white"} flex items-center justify-between py-3.5 px-5  bg-[#00a6fb0d] hover:bg-gray-100 transition text-dark font-estedad-semibold`}
                    >
                      <span>نوبت های آینده</span>
                      <i className="fas fa-angle-left"></i>
                    </NavLink>
                  </li>
                  <li className="border border-[#1b1d1f14]  overflow-hidden rounded-[30px]">
                    <NavLink
                      to={"/dashboard/messages"}
                      className={({isActive}) => ` ${isActive && "text-white bg-primary hover:bg-primary hover:text-white"} flex items-center justify-between py-3.5 px-5  bg-[#00a6fb0d] hover:bg-gray-100 transition text-dark font-estedad-semibold`}
                    >
                      <span>پیام ها</span>
                      <i className="fas fa-angle-left"></i>
                    </NavLink>
                  </li>
                  <li className="border border-[#1b1d1f14]  overflow-hidden rounded-[30px]">
                    <button                      
                      className="flex items-center justify-between py-3.5 px-5  bg-secondary/80 hover:bg-secondary text-white transition w-full"
                    >
                      <span>خروج</span>
                      <i className="fas fa-angle-left"></i>
                    </button>
                  </li>
                </ul>
            </div>

          </motion.div>
                                <motion.div
          className="lg:col-span-3"
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >

    <Outlet />
          </motion.div>
            

            
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;

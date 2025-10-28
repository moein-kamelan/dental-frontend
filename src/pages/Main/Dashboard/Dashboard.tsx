import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <>
    <Breadcrumb/>

     <section className="py-12">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
                {/* <!-- Sidebar --> */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <img src="images/user_img.png" alt="user" className="w-full h-full rounded-full object-cover"/>
                            <label htmlFor="profile_photo" className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-deepblue transition">
                                <i className="fas fa-camera text-sm"></i>
                            </label>
                            <input id="profile_photo" type="file" className="hidden"/>
                        </div>
                        <h4 className="font-bold text-xl mb-2">محسن دادار</h4>
                        <p className="text-paragray text-sm">آیدی بیمار: ۲۳۶۰۲۰۳۳۹۸۱۲</p>
                    </div>
                    
                    {/* <!-- Dashboard Menu --> */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <ul className="space-y-1 p-2">
                            <li><a href="dashboard.html" className="block px-4 py-3 rounded-lg bg-primary text-white font-semibold"><i className="far fa-user mr-2"></i>پروفایل من</a></li>
                            <li><a href="dashboard_appoinment.html" className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition"><i className="far fa-calendar-alt mr-2"></i>نوبت ها</a></li>
                            <li><a href="dashboard_trannsaction_history.html" className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition"><i className="far fa-file-alt mr-2"></i>تاریخچه تراکنش ها</a></li>
                            <li><a href="dashboard_meeting_history.html" className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition"><i className="fas fa-history mr-2"></i>تاریخچه نوبت ها</a></li>
                            <li><a href="dashboard_upcoming_meeting.html" className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition"><i className="far fa-clock mr-2"></i>نوبت های آینده</a></li>
                            <li><a href="dashboard_message.html" className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition"><i className="far fa-envelope mr-2"></i>پیام ها</a></li>
                            <li><a href="#" className="block px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 transition"><i className="fas fa-sign-out-alt mr-2"></i>خروج</a></li>
                        </ul>
                    </div>
                </div>

              <Outlet/>
            </div>
        </div>
    </section>
    
    
    </>
  )
}

export default Dashboard
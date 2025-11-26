import AdminDashBaordHeader from "../../modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import AdminDashboardSidebar from "../../modules/AdminDashboard/AdminDashboardSidebar/AdminDashboardSidebar";
import { Outlet } from "react-router-dom";
import {
  AdminDashboardHeaderProvider,
  useAdminDashboardHeader,
} from "../../../contexts";

function AdminDashboardHeaderWrapper() {
  const { title, backButton } = useAdminDashboardHeader();
  return <AdminDashBaordHeader title={title} backButton={backButton} />;
}

function AdminDashboardLayout() {
  return (
    <AdminDashboardHeaderProvider>
      <div className="transition-colors duration-200 font-estedad-medium">
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
            {/* <!-- Quick Stats --> */}
            <AdminDashboardHeaderWrapper />
            <Outlet />
            {/* <!-- Additional Stats --> */}

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
      </div>
    </AdminDashboardHeaderProvider>
  );
}

export default AdminDashboardLayout;

import { useEffect } from "react";
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
      <AdminDashboardLayoutContent />
    </AdminDashboardHeaderProvider>
  );
}

function AdminDashboardLayoutContent() {
  const { isSidebarOpen, toggleSidebar } = useAdminDashboardHeader();

  // مخفی کردن ویجت چت آنلاین در پنل ادمین
  useEffect(() => {
    let goftinoWidget: HTMLElement | null = null;

    const findGoftinoWidget = (): HTMLElement | null => {
      const selectors = [
        '[id*="goftino"]',
        '[class*="goftino"]',
        'iframe[src*="goftino"]',
        'div[style*="position: fixed"][style*="bottom"][style*="right"]',
        'div[style*="position:fixed"][style*="bottom"][style*="right"]',
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          return element;
        }
      }

      return null;
    };

    const hideGoftinoWidget = () => {
      if (!goftinoWidget) {
        goftinoWidget = findGoftinoWidget();
      }

      if (goftinoWidget) {
        goftinoWidget.style.display = "none";
        goftinoWidget.style.opacity = "0";
        goftinoWidget.style.pointerEvents = "none";
        goftinoWidget.style.visibility = "hidden";
      }
    };

    // بررسی اولیه با تاخیر برای اطمینان از لود شدن ابزارک
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    let attempts = 0;
    const maxAttempts = 20; // 10 ثانیه (20 * 500ms)

    const startChecking = () => {
      checkInterval = setInterval(() => {
        attempts++;
        hideGoftinoWidget();
        
        if (goftinoWidget || attempts >= maxAttempts) {
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
        }
      }, 500);
    };

    // استفاده از MutationObserver برای مشاهده تغییرات DOM
    const observer = new MutationObserver(() => {
      hideGoftinoWidget();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    startChecking();
    hideGoftinoWidget();

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      observer.disconnect();
      
      // نمایش مجدد ویجت هنگام خروج از پنل ادمین
      if (goftinoWidget) {
        goftinoWidget.style.display = "";
        goftinoWidget.style.opacity = "";
        goftinoWidget.style.pointerEvents = "";
        goftinoWidget.style.visibility = "";
      }
    };
  }, []);

  return (
    <div className="transition-colors duration-200 font-estedad-medium">
      {/* <!-- Overlay --> */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
      ></div>

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
  );
}

export default AdminDashboardLayout;

import { useState } from "react";
import AdminDashboardSidebarLink from "../AdminDashboardSidebarLink/AdminDashboardSidebarLink";
import { useAdminDashboardHeader } from "../../../../contexts/useAdminDashboardHeader";
import { useAppSelector } from "../../../../redux/typedHooks";

function AdminDashboardSidebar() {
  const { isSidebarOpen, toggleSidebar } = useAdminDashboardHeader();
  const { data: user } = useAppSelector((state) => state.user);
  const isAdmin = user?.role === "ADMIN";
  const isSecretary = user?.role === "SECRETARY";
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  // تابع برای بستن سایدبار هنگام کلیک روی لینک (فقط در موبایل)
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && isSidebarOpen) {
      toggleSidebar();
    }
  };
  return (
    <aside
      id="sidebar"
      className={`max-md:fixed max-md:top-0 max-md:h-screen md:h-full z-50 transition-all duration-300 ease-in-out bg-linear-to-b from-purple-600 to-purple-400 text-white flex flex-col overflow-hidden ${
        isSidebarOpen
          ? "max-md:right-0 w-64"
          : "max-md:-right-full md:w-0 md:min-w-0 w-0 min-w-0"
      } ${
        !isSidebarOpen
          ? "pointer-events-none md:pointer-events-none"
          : "pointer-events-auto"
      }`}
    >
      <div
        className={`flex items-center justify-between space-x-3 px-4 pt-3 pb-2 shrink-0 transition-opacity duration-200 ${
          !isSidebarOpen ? "opacity-0" : "opacity-100 delay-200"
        }`}
        style={
          !isSidebarOpen
            ? { transitionDelay: "-100ms" }
            : { transitionDelay: "200ms" }
        }
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <i className="fas fa-cube text-purple-500 text-xl"></i>
          </div>
          <h1 className="text-xl font-estedad-semibold">پنل مدیریت</h1>
        </div>
        {/* دکمه بستن سایدبار */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 group"
          aria-label="بستن منو"
        >
          <i className="fas fa-times text-white group-hover:scale-110 transition-transform duration-200"></i>
        </button>
      </div>
      <nav
        className={`grow overflow-y-auto px-4 pb-4 space-y-2 sidebar-scrollbar transition-opacity duration-200 ${
          !isSidebarOpen ? "opacity-0" : "opacity-100 delay-200"
        }`}
        style={
          !isSidebarOpen
            ? { transitionDelay: "-100ms" }
            : { transitionDelay: "200ms" }
        }
      >
        <AdminDashboardSidebarLink
          to={"/admin"}
          icon="fas fa-home"
          title="داشبورد"
          end={true}
          onClick={handleLinkClick}
        />
        <AdminDashboardSidebarLink
          to={"/admin/appointments-management"}
          icon="fas fa-calendar-alt"
          title="نوبت بیماران"
          onClick={handleLinkClick}
        />
        <AdminDashboardSidebarLink
          to={"/admin/users-management"}
          icon="fas fa-users"
          title="کاربران"
          onClick={handleLinkClick}
        />
        
        {/* فقط برای مدیر */}
        {isAdmin && (
          <>
            <AdminDashboardSidebarLink
              to={"/admin/doctors-management"}
              icon="fas fa-user-md"
              title="پزشکان"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/clinics-management"}
              icon="fas fa-hospital"
              title="کلینیک ها"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/articles-management"}
              icon="fas fa-newspaper"
              title="مقالات"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/services-management"}
              icon="fas fa-handshake"
              title="خدمات"
              onClick={handleLinkClick}
            />

            <button
              onClick={toggleCategories}
              className={`flex items-center justify-between text-sm gap-x-2 p-3 rounded-lg hover:bg-white/10 transition-opacity duration-200 cursor-pointer w-full whitespace-nowrap ${
                !isSidebarOpen ? "opacity-0" : "opacity-100 delay-200"
              }`}
              style={
                !isSidebarOpen
                  ? { transitionDelay: "-100ms" }
                  : { transitionDelay: "200ms" }
              }
            >
              <div className="flex items-center gap-x-3">
                <i className="fas fa-tags"></i>
                <span>دسته بندی ها</span>
              </div>
              <i
                className={`fas ${
                  isCategoriesOpen ? "fa-chevron-up" : "fa-chevron-down"
                } transition-transform duration-300`}
              ></i>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                !isSidebarOpen ? "opacity-0" : "opacity-100 delay-200"
              }`}
              style={{
                gridTemplateRows: isCategoriesOpen ? "1fr" : "0fr",
                transitionDelay: !isSidebarOpen ? "-100ms" : "200ms",
              }}
            >
              <div className="min-h-0 pr-2 ">
                <div className="w-full bg-white/10 space-y-2 rounded-lg">
                  <AdminDashboardSidebarLink
                    to={"/admin/articles-category-management"}
                    icon="fas fa-newspaper"
                    title="دسته بندی مقالات"
                    onClick={handleLinkClick}
                  />
                  <AdminDashboardSidebarLink
                    to={"/admin/services-category-management"}
                    icon="fas fa-handshake"
                    title="دسته بندی خدمات"
                    onClick={handleLinkClick}
                  />
                </div>
              </div>
            </div>

            <AdminDashboardSidebarLink
              to={"/admin/comments-management"}
              icon="fas fa-comments"
              title="نظرات"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/reviews-management"}
              icon="fas fa-star"
              title="دیدگاه کاربران"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/faqs-management"}
              icon="fas fa-question-circle"
              title="سوالات متداول"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/gallery-management"}
              icon="fas fa-images"
              title="گالری"
              onClick={handleLinkClick}
            />

            <AdminDashboardSidebarLink
              to={"/admin/insurance-management"}
              icon="fas fa-shield-alt"
              title="سازمان های بیمه"
              onClick={handleLinkClick}
            />
            <AdminDashboardSidebarLink
              to={"/admin/banner-management"}
              icon="fas fa-layer-group"
              title="بنر"
              onClick={handleLinkClick}
            />
          </>
        )}
        {isAdmin && (
        <AdminDashboardSidebarLink
          to={"/admin/contact-us-management"}
          icon="fas fa-envelope"
          title="پیام های تماس با ما"
          onClick={handleLinkClick}
        />
        )}
        {isAdmin && (
        <AdminDashboardSidebarLink
          to={"/admin/doctor-applications-management"}
          icon="fas fa-user-plus"
          title="درخواست عضویت پزشکان"
          onClick={handleLinkClick}
        />
        )}

        {/* بخش تنظیمات */}
        <div className="border-t border-white/20 pt-2 mt-2">
          {isAdmin && (
            <>
              <AdminDashboardSidebarLink
                to={"/admin/settings"}
                icon="fas fa-cog"
                title="تنظیمات سایت"
                onClick={handleLinkClick}
              />
              <AdminDashboardSidebarLink
                to={"/admin/appointment-settings"}
                icon="fas fa-calendar-check"
                title="تنظیمات نوبت‌دهی"
                onClick={handleLinkClick}
              />
              <AdminDashboardSidebarLink
                to={"/admin/notification-settings"}
                icon="fas fa-bell"
                title="تنظیمات نوتیفیکیشن"
                onClick={handleLinkClick}
              />
            </>
          )}
          <AdminDashboardSidebarLink
            to={"/admin/profile-management"}
            icon="fas fa-user-cog"
            title="پروفایل من"
            onClick={handleLinkClick}
          />
        </div>
      </nav>
    </aside>
  );
}

export default AdminDashboardSidebar;

import { useState } from "react";
import AdminDashboardSidebarLink from "../AdminDashboardSidebarLink/AdminDashboardSidebarLink";

function AdminDashboardSidebar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  return (
    <aside
      id="sidebar"
      className="max-md:fixed max-md:-right-full max-md:top-0 max-md:h-screen md:h-full z-50 transition-all duration-300 w-64 bg-linear-to-b from-purple-600 to-purple-400 text-white flex flex-col overflow-hidden "
    >
      <div className="flex items-center space-x-3 p-4 shrink-0">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <i className="fas fa-cube text-purple-500 text-xl"></i>
        </div>
        <h1 className="text-xl font-estedad-semibold">پنل مدیریت</h1>
      </div>
      <nav className="grow  overflow-y-auto px-4 pb-4 space-y-2 sidebar-scrollbar">
        <AdminDashboardSidebarLink
          to={"/admin"}
          icon="fas fa-home"
          title="داشبورد"
          end={true}
        />
        <AdminDashboardSidebarLink
          to={"/admin/doctors-management"}
          icon="fas fa-user-md"
          title="پزشکان"
        />
        <AdminDashboardSidebarLink
          to={"/admin/clinics-management"}
          icon="fas fa-hospital"
          title="کلینیک ها"
        />
        <AdminDashboardSidebarLink
          to={"/admin/articles-management"}
          icon="fas fa-newspaper"
          title="مقالات"
        />
        <AdminDashboardSidebarLink
          to={"/admin/services-management"}
          icon="fas fa-handshake"
          title="خدمات"
        />

        <button
          onClick={toggleCategories}
          className="flex items-center justify-between text-sm  gap-x-2 p-3 rounded-lg hover:bg-white/10 transition cursor-pointer w-full"
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
          className="grid transition-all duration-300 ease-in-out overflow-hidden"
          style={{
            gridTemplateRows: isCategoriesOpen ? "1fr" : "0fr",
          }}
        >
          <div className="min-h-0 pr-2 ">
            <div className="   w-full bg-white/10 space-y-2 rounded-lg  ">
              <AdminDashboardSidebarLink
                to={"/admin/articles-category-management"}
                icon="fas fa-newspaper"
                title="دسته بندی مقالات"
              />
              <AdminDashboardSidebarLink
                to={"/admin/services-category-management"}
                icon="fas fa-handshake"
                title="دسته بندی خدمات"
              />
            </div>
          </div>
        </div>

        <AdminDashboardSidebarLink
          to={"/admin/comments-management"}
          icon="fas fa-comments"
          title="نظرات"
        />
        <AdminDashboardSidebarLink
          to={"/admin/reviews-management"}
          icon="fas fa-star"
          title="دیدگاه کاربران"
        />
        <AdminDashboardSidebarLink
          to={"/admin/faqs-management"}
          icon="fas fa-question-circle"
          title="سوالات متداول"
        />
        <AdminDashboardSidebarLink
          to={"/admin/gallery-management"}
          icon="fas fa-images"
          title="گالری"
        />

        <AdminDashboardSidebarLink
          to={"/admin/insurance-management"}
          icon="fas fa-shield-alt"
          title="سازمان های بیمه"
        />
        <AdminDashboardSidebarLink
          to={"/admin/contact-us-management"}
          icon="fas fa-envelope"
          title="پیام های تماس با ما"
        />
        <AdminDashboardSidebarLink
          to={"/admin/doctor-applications-management"}
          icon="fas fa-user-plus"
          title="درخواست عضویت پزشکان"
        />
      </nav>
    </aside>
  );
}

export default AdminDashboardSidebar;

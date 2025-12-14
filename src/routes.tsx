import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import {
  ProtectedUserDashboardRoute,
  ProtectedAdminRoute,
  ProtectedAdminAuthRoute,
} from "./components/guards";

// Lazy load Main Layout (only loaded once, so can stay eager)
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import AppointmentsManagementEdit from "./pages/AdminDashboard/AppointmentsManagementEdit/AppointmentsManagementEdit";
import AppointmentsManagement from "./pages/AdminDashboard/AppointmentsManagement/AppointmentsManagemet";
// Lazy load Main pages
const Home = lazy(() => import("./pages/Main/Home/Home"));
const Doctors = lazy(() => import("./pages/Main/Doctors/Doctors"));
const Services = lazy(() => import("./pages/Main/Services/Services"));
const DoctorDetails = lazy(
  () => import("./pages/Main/DoctorDetails/DoctorDetails")
);
const AboutUs = lazy(() => import("./pages/Main/AbousUs/AboutUs"));
const Contact = lazy(() => import("./pages/Main/Contact/Contact"));
const Gallery = lazy(() => import("./pages/Main/Gallery/Gallery"));
const Blog = lazy(() => import("./pages/Main/Blog/Blog"));
const BlogDetails = lazy(() => import("./pages/Main/BlogDetails/BlogDetails"));
const FAQ = lazy(() => import("./pages/Main/FAQ/FAQ"));
const ServiceDetails = lazy(
  () => import("./pages/Main/ServiceDetails/ServiceDetails")
);
const BecomeDoctor = lazy(
  () => import("./pages/Main/BecomeDotor/BecomeDoctor")
);
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

// Lazy load Dashboard pages
const Dashboard = lazy(() => import("./pages/Main/Dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/Main/Dashboard/Profile/Profile"));
const ProfileEdit = lazy(
  () => import("./pages/Main/Dashboard/ProfileEdit/ProfileEdit")
);
const Turns = lazy(() => import("./pages/Main/Dashboard/Turns/Turns"));
const UpcomingMeeting = lazy(
  () => import("./pages/Main/Dashboard/UpcomingMeeting/UpcomingMeeting")
);
const Messages = lazy(() => import("./pages/Main/Dashboard/Messages/Messages"));
const MeetingHistory = lazy(
  () => import("./pages/Main/Dashboard/MeetingHistory/MeetingHistory")
);

// Lazy load Admin Dashboard pages
const AdminDashboardLayout = lazy(
  () => import("./components/layouts/AdminDashboardLayout/AdminDashboardLayout")
);
const AdminDashboardHome = lazy(
  () => import("./pages/AdminDashboard/AdminDashboardHome/AdminDashboardHome")
);
const AdminDashboardLogin = lazy(
  () => import("./pages/AdminDashboard/AdminDashboardLogin/AdminDashboardLogin")
);
const DoctorsManagement = lazy(
  () => import("./pages/AdminDashboard/DoctorsManagement/DoctorsManagement")
);
const DoctorsManagementEdit = lazy(
  () =>
    import("./pages/AdminDashboard/DoctorsManagementEdit/DoctorsManagementEdit")
);
const ClinicsManagement = lazy(
  () => import("./pages/AdminDashboard/ClinicsManagement/ClinicsManagement")
);
const ClinicsManagementEdit = lazy(
  () =>
    import("./pages/AdminDashboard/ClinicsManagementEdit/ClinicsManagementEdit")
);
const ArticlesManagement = lazy(
  () => import("./pages/AdminDashboard/ArticlesManagement/ArticlesManagement")
);
const ArticlesManagementEdit = lazy(
  () =>
    import(
      "./pages/AdminDashboard/ArticlesManagementEdit/ArticlesManagementEdit"
    )
);
const ArticlesCategoryManagement = lazy(
  () =>
    import(
      "./pages/AdminDashboard/ArticlesCategoryManagement/ArticlesCategoryManagement"
    )
);
const ArticlesCategoryManagementEdit = lazy(
  () =>
    import(
      "./pages/AdminDashboard/ArticlesCategoryManagementEdit/ArticlesCategoryManagementEdit"
    )
);
const ServicesCategoryManagement = lazy(
  () =>
    import(
      "./pages/AdminDashboard/ServicesCategoryManagement/ServicesCategoryManagement"
    )
);
const ServicesCategoryManagementEdit = lazy(
  () =>
    import(
      "./pages/AdminDashboard/ServicesCategoryManagementEdit/ServicesCategoryManagementEdit"
    )
);
const ServicesManagement = lazy(
  () =>
    import(
      "./components/modules/AdminDashboard/ServicesManagement/ServicesManagement"
    )
);
const ServicesManagementEdit = lazy(
  () =>
    import(
      "./pages/AdminDashboard/ServicesManagementEdit/ServicesManagementEdit"
    )
);
const CommentsManagements = lazy(
  () => import("./pages/AdminDashboard/CommentsManagement/CommentsManagements")
);
const FaqsManagement = lazy(
  () => import("./pages/AdminDashboard/FaqsManagement/FaqsManagement")
);
const FaqsManagementEdit = lazy(
  () => import("./pages/AdminDashboard/FaqsManagementEdit/FaqsManagementEdit")
);
const GalleryManagement = lazy(
  () => import("./pages/AdminDashboard/GalleryManagement/GalleryManagement")
);
const GalleryManagementEdit = lazy(
  () =>
    import("./pages/AdminDashboard/GalleryManagementEdit/GalleryManagementEdit")
);
const InsurancesManagement = lazy(
  () =>
    import("./pages/AdminDashboard/InsurancesManagement/InsurancesManagement")
);
const InsurancesManagementEdit = lazy(
  () =>
    import(
      "./pages/AdminDashboard/InsurancesManagementEdit/InsurancesManagementEdit"
    )
);
const ContactUsManagement = lazy(
  () => import("./pages/AdminDashboard/ContactUsManagement/ContactUsManagement")
);
const DoctorApplicationsManagement = lazy(
  () =>
    import(
      "./pages/AdminDashboard/DotcorApplicationsManagement/DoctorApplicationsManagement"
    )
);
const ReviewsManagement = lazy(
  () => import("./pages/AdminDashboard/ReviewsManagement/ReviewsManagement")
);
const ReviewsManagementEdit = lazy(
  () =>
    import("./pages/AdminDashboard/ReviewsManagementEdit/ReviewsManagementEdit")
);
const UsersManagement = lazy(
  () => import("./pages/AdminDashboard/UsersManagement/UsersManagement")
);
const UsersManagementEdit = lazy(
  () => import("./pages/AdminDashboard/UsersManagementEdit/UsersManagementEdit")
);
const ProfileManagement = lazy(
  () => import("./pages/AdminDashboard/ProfileManagement/ProfileManagement")
);
const BannerManagement = lazy(
  () => import("./pages/AdminDashboard/BannerManagement/BannerManagement")
);
const BannerManagementEdit = lazy(
  () =>
    import("./pages/AdminDashboard/BannerManagementEdit/BannerManagementEdit")
);
const Settings = lazy(() => import("./pages/AdminDashboard/Settings/Settings"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={"home"} replace /> },
      { path: "/home", element: <Home /> },
      { path: "/become-doctor", element: <BecomeDoctor /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/doctors/:slug", element: <DoctorDetails /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:slug", element: <ServiceDetails /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogDetails /> },
      { path: "/faq", element: <FAQ /> },
      {
        path: "/dashboard/*",
        element: (
          <ProtectedUserDashboardRoute>
            <Dashboard />
          </ProtectedUserDashboardRoute>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <Profile /> },
          { path: "profile-edit", element: <ProfileEdit /> },
          { path: "turns", element: <Turns /> },
          { path: "upcoming-meeting", element: <UpcomingMeeting /> },
          { path: "messages", element: <Messages /> },
          { path: "meeting-history", element: <MeetingHistory /> },
          { path: "*", element: <Navigate to="/404" replace /> },
        ],
      },

      // {path : "/admin-dashboard/*" , element : <AdminDashboard/> , children : [
      //   {index : true , element : <Navigate to={"home"} replace/>},
      //   {path : "home" , element : <AdminDashboardHome/>}
      // ]},
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboardLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardHome /> },
      { path: "appointments-management", element: <AppointmentsManagement /> },
      {
        path: "appointments-management/edit/:id",
        element: <AppointmentsManagementEdit />,
      },
      { path: "doctors-management", element: <DoctorsManagement /> },
      {
        path: "doctors-management/edit/:id",
        element: <DoctorsManagementEdit />,
      },

      { path: "clinics-management", element: <ClinicsManagement /> },
      {
        path: "clinics-management/edit/:id",
        element: <ClinicsManagementEdit />,
      },
      { path: "articles-management", element: <ArticlesManagement /> },
      {
        path: "articles-management/edit/:id",
        element: <ArticlesManagementEdit />,
      },
      {
        path: "articles-category-management",
        element: <ArticlesCategoryManagement />,
      },
      {
        path: "articles-category-management/edit/:id",
        element: <ArticlesCategoryManagementEdit />,
      },
      {
        path: "services-category-management",
        element: <ServicesCategoryManagement />,
      },
      {
        path: "services-category-management/edit/:id",
        element: <ServicesCategoryManagementEdit />,
      },
      { path: "services-management", element: <ServicesManagement /> },
      {
        path: "services-management/edit/:id",
        element: <ServicesManagementEdit />,
      },
      { path: "comments-management", element: <CommentsManagements /> },
      { path: "faqs-management", element: <FaqsManagement /> },
      {
        path: "faqs-management/edit/:id",
        element: <FaqsManagementEdit />,
      },
      { path: "gallery-management", element: <GalleryManagement /> },
      {
        path: "gallery-management/edit/:id",
        element: <GalleryManagementEdit />,
      },
      { path: "insurance-management", element: <InsurancesManagement /> },
      {
        path: "insurances-management/edit/:id",
        element: <InsurancesManagementEdit />,
      },

      { path: "contact-us-management", element: <ContactUsManagement /> },
      {
        path: "doctor-applications-management",
        element: <DoctorApplicationsManagement />,
      },
      { path: "reviews-management", element: <ReviewsManagement /> },
      {
        path: "reviews-management/edit/:id",
        element: <ReviewsManagementEdit />,
      },
      { path: "users-management", element: <UsersManagement /> },
      {
        path: "users-management/edit/:id",
        element: <UsersManagementEdit />,
      },
      { path: "profile-management", element: <ProfileManagement /> },
      {
        path: "banner-management",
        element: <BannerManagement />,
      },
      {
        path: "banner-management/edit/:id",
        element: <BannerManagementEdit />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/admin-login",
    element: (
      <ProtectedAdminAuthRoute>
        <AdminDashboardLogin />
      </ProtectedAdminAuthRoute>
    ),
  },
  { path: "404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" replace /> },
]);

export default routes;

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Main/Home/Home";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Auth from "./pages/Auth/Auth";
import Doctors from "./pages/Main/Doctors/Doctors";
import Services from "./pages/Main/Services/Services";
import DoctorDetails from "./pages/Main/DoctorDetails/DoctorDetails";
import AboutUs from "./pages/Main/AbousUs/AboutUs";
import Contact from "./pages/Main/Contact/Contact";
import Gallery from "./pages/Main/Gallery/Gallery";
import Blog from "./pages/Main/Blog/Blog";
import Dashboard from "./pages/Main/Dashboard/Dashboard";
import Profile from "./pages/Main/Dashboard/Profile/Profile";
import Turns from "./pages/Main/Dashboard/Turns/Turns";
import UpcomingMeeting from "./pages/Main/Dashboard/UpcomingMeeting/UpcomingMeeting";
import Messages from "./pages/Main/Dashboard/Messages/Messages";
import ServiceDetails from "./pages/Main/ServiceDetails/ServiceDetails";
import NotFound from "./pages/NotFound/NotFound";
import BlogDetails from "./pages/Main/BlogDetails/BlogDetails";
import FAQ from "./pages/Main/FAQ/FAQ";
import MeetingHistory from "./pages/Main/Dashboard/MeetingHistory/MeetingHistory";
import {
  ProtectedUserDashboardRoute,
  ProtectedAuthRoute,
  ProtectedAdminRoute,
  ProtectedAdminAuthRoute,
} from "./components/guards";
import ProfileEdit from "./pages/Main/Dashboard/ProfileEdit/ProfileEdit";
import BecomeDoctor from "./pages/Main/BecomeDotor/BecomeDoctor";
import AdminDashboardLayout from "./components/layouts/AdminDashboardLayout/AdminDashboardLayout";
import AdminDashboardHome from "./pages/AdminDashboard/AdminDashboardHome/AdminDashboardHome";
import DoctorsManagement from "./pages/AdminDashboard/DoctorsManagement/DoctorsManagement";
import DoctorsManagementEdit from "./pages/AdminDashboard/DoctorsManagementEdit/DoctorsManagementEdit";
import ClinicsManagement from "./pages/AdminDashboard/ClinicsManagement/ClinicsManagement";
import ClinicsManagementEdit from "./pages/AdminDashboard/ClinicsManagementEdit/ClinicsManagementEdit";
import ArticlesManagement from "./pages/AdminDashboard/ArticlesManagement/ArticlesManagement";
import ArticlesManagementEdit from "./pages/AdminDashboard/ArticlesManagementEdit/ArticlesManagementEdit";
import ArticlesCategoryManagement from "./pages/AdminDashboard/ArticlesCategoryManagement/ArticlesCategoryManagement";
import ArticlesCategoryManagementEdit from "./pages/AdminDashboard/ArticlesCategoryManagementEdit/ArticlesCategoryManagementEdit";
import ServicesCategoryManagement from "./pages/AdminDashboard/ServicesCategoryManagement/ServicesCategoryManagement";
import ServicesCategoryManagementEdit from "./pages/AdminDashboard/ServicesCategoryManagementEdit/ServicesCategoryManagementEdit";
import ServicesManagement from "./components/modules/AdminDashboard/ServicesManagement/ServicesManagement";
import ServicesManagementEdit from "./pages/AdminDashboard/ServicesManagementEdit/ServicesManagementEdit";
import CommentsManagements from "./pages/AdminDashboard/CommentsManagement/CommentsManagements";
import FaqsManagement from "./pages/AdminDashboard/FaqsManagement/FaqsManagement";
import FaqsManagementEdit from "./pages/AdminDashboard/FaqsManagementEdit/FaqsManagementEdit";
import GalleryManagement from "./pages/AdminDashboard/GalleryManagement/GalleryManagement";
import GalleryManagementEdit from "./pages/AdminDashboard/GalleryManagementEdit/GalleryManagementEdit";
import InsurancesManagement from "./pages/AdminDashboard/InsurancesManagement/InsurancesManagement";
import ContactUsManagement from "./pages/AdminDashboard/ContactUsManagement/ContactUsManagement";
import DoctorApplicationsManagement from "./pages/AdminDashboard/DotcorApplicationsManagement/DoctorApplicationsManagement";
import Settings from "./pages/AdminDashboard/Settings/Settings";
import AdminDashboardLogin from "./pages/AdminDashboard/AdminDashboardLogin/AdminDashboardLogin";
import ReviewsManagement from "./pages/AdminDashboard/ReviewsManagement/ReviewsManagement";
import ReviewsManagementEdit from "./pages/AdminDashboard/ReviewsManagementEdit/ReviewsManagementEdit";
import UsersManagement from "./pages/AdminDashboard/UsersManagement/UsersManagement";
import UsersManagementEdit from "./pages/AdminDashboard/UsersManagementEdit/UsersManagementEdit";
import ProfileManagement from "./pages/AdminDashboard/ProfileManagement/ProfileManagement";


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

      {
        path: "/auth/*",
        element: (
          <ProtectedAuthRoute>
            <Auth />
          </ProtectedAuthRoute>
        ),
        children: [
          { index: true, element: <Navigate to="sign-in" replace /> },
          { path: "sign-in", element: <Signin /> },
          { path: "sign-up", element: <Signup /> },
          { path: "*", element: <Navigate to="/404" replace /> },
        ],
      },
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

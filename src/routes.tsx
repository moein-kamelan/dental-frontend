import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Main/Home/Home";
import MainLayout from "./pages/Main/MainLayout";
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
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import {
  ProtectedUserDashboardRoute,
  ProtectedAuthRoute,
} from "./components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={"home"} replace /> },
      { path: "/home", element: <Home /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/doctors/:name", element: <DoctorDetails /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:name", element: <ServiceDetails /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:name", element: <BlogDetails /> },
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

      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  { path: "/admin-dashboard", element: <AdminDashboard /> },
]);

export default routes;

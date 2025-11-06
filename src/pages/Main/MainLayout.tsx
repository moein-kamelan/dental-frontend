import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/modules/Main/Topbar/Topbar";
import Navbar from "../../components/modules/Main/Navbar/Navbar";
import Footer from "../../components/modules/Main/Footer/Footer";

function MainLayout() {
  return (
    <div className="">
      <Topbar />
      <Navbar />

      <Outlet />
      <Footer />

      <div
        id="scrollBtn"
        className="fixed bottom-8 left-8 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-deepblue transition opacity-0 pointer-events-none"
      >
        <i className="fas fa-arrow-alt-up"></i>
      </div>
    </div>
  );
}

export default MainLayout;

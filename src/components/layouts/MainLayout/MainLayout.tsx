import { Outlet } from "react-router-dom";
import Topbar from "../../modules/Main/Topbar/Topbar";
import Navbar from "../../modules/Main/Navbar/Navbar";
import Footer from "../../modules/Main/Footer/Footer";
import { LoginModalProvider } from "../../../contexts/LoginModalContext";
import LoginModal from "../../modules/Main/LoginModal/LoginModal";

function MainLayout() {
  return (
    <LoginModalProvider>
      <div className="">
        <Topbar />
        <Navbar />

        <Outlet />
        <Footer />

        <LoginModal />

        <div
          id="scrollBtn"
          className="fixed bottom-8 left-8 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-deepblue transition opacity-0 pointer-events-none"
        >
          <i className="fas fa-arrow-alt-up"></i>
        </div>
      </div>
    </LoginModalProvider>
  );
}

export default MainLayout;

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../modules/Main/Topbar/Topbar";
import Navbar from "../../modules/Main/Navbar/Navbar";
import Footer from "../../modules/Main/Footer/Footer";
import AuthModal from "../../modules/Main/AuthModal/AuthModal";
import AppointmentModal from "../../modules/Main/AppointmentModal/AppointmentModal";

function MainLayout() {
  useEffect(() => {
    let goftinoWidget: HTMLElement | null = null;

    const findGoftinoWidget = (): HTMLElement | null => {
      // تلاش برای پیدا کردن ابزارک گفتینو با روش‌های مختلف
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

    const handleScroll = () => {
      if (!goftinoWidget) {
        goftinoWidget = findGoftinoWidget();
      }

      const footer = document.querySelector('footer') as HTMLElement;
      
      if (!goftinoWidget || !footer) return;

      const footerTop = footer.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;
      const isNearFooter = scrollPosition >= footerTop - 100; // 100px قبل از فوتر

      if (isNearFooter) {
        // مخفی کردن ابزارک
        goftinoWidget.style.opacity = "0";
        goftinoWidget.style.pointerEvents = "none";
        goftinoWidget.style.transition = "opacity 0.3s ease";
      } else {
        // نمایش ابزارک
        goftinoWidget.style.opacity = "1";
        goftinoWidget.style.pointerEvents = "auto";
      }
    };

    // بررسی اولیه با تاخیر برای اطمینان از لود شدن ابزارک
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    let attempts = 0;
    const maxAttempts = 20; // 10 ثانیه (20 * 500ms)

    const startChecking = () => {
      checkInterval = setInterval(() => {
        attempts++;
        goftinoWidget = findGoftinoWidget();
        
        if (goftinoWidget || attempts >= maxAttempts) {
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
          if (goftinoWidget) {
            handleScroll();
          }
        }
      }, 500);
    };

    // استفاده از MutationObserver برای مشاهده تغییرات DOM
    const observer = new MutationObserver(() => {
      if (!goftinoWidget) {
        goftinoWidget = findGoftinoWidget();
        if (goftinoWidget) {
          handleScroll();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    startChecking();

    // اضافه کردن event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

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

      <AuthModal />
      <AppointmentModal />
    </div>
  );
}

export default MainLayout;

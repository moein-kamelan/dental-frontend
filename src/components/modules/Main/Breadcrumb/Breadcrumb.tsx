import { NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  title?: string;
  items?: BreadcrumbItem[];
}

// Persian labels mapping for routes
const routeLabels: Record<string, string> = {
  home: "خانه",
  "about-us": "درباره ما",
  services: "خدمات",
  doctors: "پزشکان",
  blog: "وبلاگ",
  contact: "تماس با ما",
  gallery: "گالری",
  faq: "سوالات متداول",
  dashboard: "داشبورد",
  profile: "پروفایل",
  turns: "نوبت‌ها",
  "upcoming-meeting": "نوبت‌های آینده",
  messages: "پیام‌ها",
  "meeting-history": "تاریخچه نوبت‌ها",
  auth: "احراز هویت",
  "sign-in": "ورود",
  "sign-up": "ثبت نام",
};

function Breadcrumb({ title, items }: BreadcrumbProps) {
  const location = useLocation();

  // Default breadcrumb based on current path if items not provided
  const getDefaultBreadcrumb = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: "خانه", path: "/home" },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      // Use Persian label if available, otherwise format the segment
      const label =
        routeLabels[segment] ||
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      if (index === pathSegments.length - 1) {
        breadcrumbItems.push({ label, path: undefined });
      } else {
        breadcrumbItems.push({ label, path: currentPath });
      }
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = getDefaultBreadcrumb();
  const pageTitle =
    title || breadcrumbItems[breadcrumbItems.length - 1]?.label || "صفحه";

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/8 via-accent/5 to-white py-8 md:py-10 mb-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23153d3d' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col gap-4 md:gap-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Page Title with Icon */}
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br from-accent to-primary shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <i className="fas fa-home text-white text-lg md:text-xl"></i>
            </motion.div>
            <div className="flex-1">
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-estedad-verybold text-dark mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {pageTitle}
              </motion.h1>
              <div className="h-1 w-20 bg-linear-to-r from-accent via-secondary/50 to-primary rounded-full mt-2"></div>
            </div>
          </div>

          {/* Breadcrumb Navigation with Beautiful Pills */}
          <nav
            className="flex items-center gap-2 flex-wrap"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 md:gap-3 flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 md:gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {index > 0 && (
                    <motion.i
                      className="fas fa-chevron-left text-accent/60 text-xs md:text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    ></motion.i>
                  )}
                  {item.path ? (
                    <NavLink
                      to={item.path}
                      className="group relative px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 hover:border-accent/40 hover:bg-accent/10 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-iran-sans-medium text-sm md:text-base text-paragray hover:text-accent"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {index === 0 && <i className="fas fa-home text-xs"></i>}
                        {item.label}
                      </span>
                      <div className="absolute inset-0 rounded-full bg-linear-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </NavLink>
                  ) : (
                    <motion.span
                      className="px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-linear-to-r from-accent to-primary text-white font-iran-sans-bold text-sm md:text-base shadow-lg flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <i className="fas fa-map-marker-alt text-xs"></i>
                      {item.label}
                    </motion.span>
                  )}
                </motion.li>
              ))}
            </ol>
          </nav>
        </motion.div>
      </div>

      {/* Bottom Border with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent/50 to-transparent"></div>
    </section>
  );
}

export default Breadcrumb;

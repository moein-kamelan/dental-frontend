import { NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  title?: string;
  items?: BreadcrumbItem[];
  searchForm?: ReactNode;
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
  "doctors/:slug": "جزئیات دکتر",
  "services/:slug": "جزئیات خدمات",
  "blog/:slug": "جزئیات وبلاگ",
};

function Breadcrumb({ title, items, searchForm }: BreadcrumbProps) {
  const location = useLocation();

  // Default breadcrumb based on current path if items not provided
  const getDefaultBreadcrumb = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: "خانه", path: "/home" },
    ];

    // Handle dynamic routes (doctors/:slug, services/:slug, blog/:slug)
    if (pathSegments.length === 2) {
      const [parentSegment] = pathSegments;

      // Check if this is a detail page (doctors, services, or blog)
      if (
        parentSegment === "doctors" ||
        parentSegment === "services" ||
        parentSegment === "blog"
      ) {
        const parentLabel = routeLabels[parentSegment] || parentSegment;
        const detailLabel = routeLabels[`${parentSegment}/:slug`] || "جزئیات";

        breadcrumbItems.push({
          label: parentLabel,
          path: `/${parentSegment}`,
        });
        breadcrumbItems.push({
          label: detailLabel,
          path: undefined,
        });

        return breadcrumbItems;
      }
    }

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

  return (
    <section className="relative overflow-hidden py-4 md:py-5 mb-3">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Right side - Breadcrumb */}
          <div className="flex-1 w-full lg:w-auto order-1 lg:order-1 min-w-0">
            <motion.div
              className="flex flex-col gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Compact Breadcrumb Navigation */}
          <nav
                className="flex items-center gap-1 flex-wrap"
            aria-label="Breadcrumb"
          >
                <ol className="flex items-center gap-1 flex-wrap">
              {breadcrumbItems.map((item, index) => (
                <motion.li
                  key={index}
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  {index > 0 && (
                        <motion.span
                          className="text-dark/40 text-[10px] mx-0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 + index * 0.05 }}
                        >
                          /
                        </motion.span>
                  )}
                  {item.path ? (
                    <NavLink
                      to={item.path}
                          className="group relative text-xs md:text-sm text-dark/80 hover:text-dark transition-colors duration-200 font-medium"
                    >
                          <span className="flex items-center gap-1">
                            {index === 0 && (
                              <i className="fas fa-home text-[9px] opacity-70"></i>
                            )}
                        {item.label}
                      </span>
                          <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-right"></span>
                    </NavLink>
                  ) : (
                    <motion.span
                          className="text-xs md:text-sm text-dark font-semibold"
                          style={{ fontFamily: 'var(--font-vazir)' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.li>
              ))}
            </ol>
          </nav>
        </motion.div>
      </div>

          {/* Left side - Search Form */}
          {searchForm && (
            <motion.div
              className="w-full lg:w-auto lg:flex-shrink-0 order-2 lg:order-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {searchForm}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Breadcrumb;

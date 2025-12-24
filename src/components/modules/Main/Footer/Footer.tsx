import { motion } from "motion/react";
import { useState } from "react";
import { useGetSettings } from "../../../../services/useSettings";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../../utils/helpers";
import DevelopersModal from "./DevelopersModal";

function Footer() {
  const { data: settings, isLoading: isSettingsLoading } = useGetSettings();
  const [isDevelopersModalOpen, setIsDevelopersModalOpen] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      url: settings?.data?.settings?.facebook,
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      useImage: false,
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      url: settings?.data?.settings?.twitter,
      bgColor: "bg-blue-400",
      hoverColor: "hover:bg-blue-500",
      useImage: false,
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      url: settings?.data?.settings?.instagram,
      bgColor: "bg-transparent",
      hoverColor: "hover:bg-transparent",
      useImage: true,
      imagePath: "/images/insta.png",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      url: settings?.data?.settings?.linkedin,
      bgColor: "bg-blue-700",
      hoverColor: "hover:bg-blue-800",
      useImage: false,
    },
    {
      name: "Telegram",
      icon: "fab fa-telegram-plane",
      url: settings?.data?.settings?.telegram,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      useImage: false,
    },
    {
      name: "Eitaa",
      icon: "fab fa-telegram-plane",
      url: settings?.data?.settings?.eitaa,
      bgColor: "bg-transparent",
      hoverColor: "hover:bg-transparent",
      useImage: true,
      imagePath: "/images/eita.png",
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      url: settings?.data?.settings?.youtube,
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      useImage: false,
    },
  ].filter((link) => link.url);

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent text-white mt-12 md:mt-16 overflow-hidden">
      <div className="container mx-auto px-4 pt-8 md:pt-12 pb-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* About Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isSettingsLoading ? (
              <div className="mb-4 w-40 h-16 bg-white/10 animate-pulse rounded-lg" />
            ) : (
              <motion.img
                src={
                  settings?.data?.settings?.logo
                    ? getImageUrl(settings.data.settings.logo)
                    : "/images/main-logo.png"
                }
                alt="logo"
                className="mb-4 w-40 h-16 object-contain filter brightness-0 invert"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <p className="text-white/80 font-estedad-light mb-4 leading-relaxed text-sm">
              {settings?.data?.settings?.description ||
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"}
            </p>

            {/* Social Media Links */}
            <div>
              <h6 className="text-white font-estedad-semibold mb-3 flex items-center gap-2 text-sm">
                <i className="fas fa-share-alt text-accent text-xs"></i>
                ما را دنبال کنید
              </h6>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.useImage ? 'w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity duration-300' : `w-9 h-9 rounded-lg ${social.bgColor} ${social.hoverColor} text-white flex items-center justify-center transition-all duration-300 shadow-md`}`}
                    whileHover={social.useImage ? { scale: 1.1 } : { scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.useImage ? (
                      <img
                        src={social.imagePath}
                        alt={social.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        className="w-9 h-9 object-contain"
                      />
                    ) : (
                      <i className={`${social.icon} text-sm`}></i>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h5 className="font-estedad-bold text-lg text-white mb-4 flex items-center gap-2">
              <i className="fas fa-link text-accent text-sm"></i>
              لینک‌های سریع
            </h5>
            <ul className="space-y-2">
              {[
                { to: "/", label: "خانه", icon: "fas fa-home" },
                { to: "/about-us", label: "درباره ما", icon: "fas fa-info-circle" },
                { to: "/services", label: "خدمات ما", icon: "fas fa-tooth" },
                { to: "/doctors", label: "پزشکان", icon: "fas fa-user-md" },
                { to: "/contact", label: "تماس با ما", icon: "fas fa-envelope" },
              ].map((link) => (
                <li key={link.to}>
                <Link
                    to={link.to}
                    className="text-white/80 font-estedad-medium hover:text-accent transition-colors duration-300 flex items-center gap-2 group text-sm"
                >
                    <i className={`${link.icon} text-xs text-accent group-hover:translate-x-1 transition-transform duration-300`}></i>
                    <span>{link.label}</span>
                </Link>
              </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h5 className="font-estedad-bold text-lg text-white mb-4 flex items-center gap-2">
              <i className="fas fa-phone text-accent text-sm"></i>
              تماس با ما
            </h5>
            <div className="space-y-3">
              {/* Online Consultation */}
              <motion.a
                href="https://goftino.com/c/bpADrN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors duration-300 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-comments text-accent text-xs"></i>
                </div>
                <span className="font-estedad-medium text-sm">دریافت مشاوره آنلاین</span>
              </motion.a>
              
              {settings?.data?.settings?.address && (
                <motion.div
                  className="flex items-start gap-2 text-white/80"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mt-0.5">
                    <i className="fas fa-map-marker-alt text-accent text-xs"></i>
                  </div>
                  <p className="font-estedad-light leading-relaxed text-sm">
                  {settings.data.settings.address}
                </p>
                </motion.div>
              )}
              {settings?.data?.settings?.email && (
                <motion.a
                  href={`mailto:${settings.data.settings.email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-accent text-xs"></i>
                  </div>
                  <span className="font-estedad-medium text-sm">{settings.data.settings.email}</span>
                </motion.a>
              )}
              {settings?.data?.settings?.phoneNumber && (
                <motion.a
                  href={`tel:${settings.data.settings.phoneNumber}`}
                  className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone-alt text-accent text-xs"></i>
                  </div>
                  <span className="font-estedad-medium text-sm">{settings.data.settings.phoneNumber}</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright Bar */}
        <motion.div
          className="border-t border-white/20 pt-4 pb-3 flex flex-col md:flex-row justify-between items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 font-estedad-light text-xs md:text-sm text-center md:text-right">
            تمامی حقوق متعلق به کلینیک دندان پزشکی طاها می‌باشد © ۱۴۰۴
          </p>
          <p className="text-white/70 font-estedad-light text-xs md:text-sm text-center md:text-left">
            ساخته شده با <i className="fas fa-heart text-accent mx-1"></i>{" "}
            <button
              onClick={() => setIsDevelopersModalOpen(true)}
              className="underline hover:text-accent transition-colors cursor-pointer"
            >
              مشاهده توسعه دهندگان
            </button>
          </p>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      {/* Developers Modal */}
      <DevelopersModal
        isOpen={isDevelopersModalOpen}
        onClose={() => setIsDevelopersModalOpen(false)}
      />
    </footer>
  );
}

export default Footer;

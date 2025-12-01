import { motion } from "motion/react";
import { useGetSettings } from "../../../../services/useSettings";
import { Link } from "react-router-dom";

function Footer() {
  const { data: settings } = useGetSettings();
  return (
    <footer className="bg-[url('/images/footer_bg.jpg')] bg-no-repeat bg-cover text-white  mt-30 max-sm:mt-42 relative">
      <motion.div
        className="absolute left-0 right-0 top-0 -translate-y-1/2 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center justify-end gap-3 sm:gap-4 md:gap-6 py-6 sm:py-8 md:py-10 px-4 md:px-8 lg:px-12">
          <div className="h-px bg-linear-to-l from-accent via-accent/80 to-transparent flex-1"></div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="text-accent">
                <i className="fas fa-tooth text-sm sm:text-base md:text-lg"></i>
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <div className="text-secondary">
                <i className="fas fa-smile text-sm sm:text-base md:text-lg"></i>
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="text-accent">
                <i className="fas fa-tooth text-sm sm:text-base md:text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="container mx-auto px-4 pt-8 sm:pt-10 md:pt-12 relative ">

        <div className="grid  xs:grid-cols-2  md:grid-cols-4 lg:grid-cols-[3fr_1fr_2fr_3fr] gap-8 mb-12 items-start">
          <div className=" max-lg:col-span-4">
            <img
              src={
                settings?.data?.settings?.logo
                  ? `http://localhost:4000${settings.data.settings.logo}`
                  : "/images/Logo_1.png"
              }
              alt="logo"
              className="mb-6 w-48 h-20 object-contain"
            />
            <p className="text-paragray font-estedad-light mb-4 ">
              {settings?.data?.settings?.description ||
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"}
            </p>

            <div className="mb-4 flex items-center gap-5 ">
              <span className="text-dark font-estedad-light text-nowrap">
                 ما را دنبال کنید :{" "}
              </span>
              <div className="flex flex-wrap gap-3 text-xl">
                {settings?.data?.settings?.facebook && (
                  <Link
                    to={settings.data.settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                        className=" size-7.5 rounded-full bg-accent text-white  hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="text-sm md:text-base fab fa-facebook-f"></i>
                  </Link>
                )}
                {settings?.data?.settings?.twitter && (
                  <Link
                    to={settings.data.settings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                        className=" size-7.5 rounded-full bg-accent text-white  hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="text-sm md:text-base fab fa-twitter"></i>
                  </Link>
                )}
                {settings?.data?.settings?.instagram && (
                  <Link
                    to={settings.data.settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" size-7.5 rounded-full bg-accent text-white  hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="text-sm md:text-base fab fa-instagram"></i>
                  </Link>
                )}
                {settings?.data?.settings?.linkedin && (
                  <Link
                    to={settings.data.settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" size-7.5 rounded-full bg-accent text-white  hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="text-sm md:text-base fab fa-linkedin-in"></i>
                  </Link>
                )}
                {settings?.data?.settings?.telegram && (
                  <Link
                    to={settings.data.settings.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" size-7.5 rounded-full bg-accent text-white  hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="text-sm md:text-base fab fa-telegram-plane"></i>
                  </Link>
                )}
                {settings?.data?.settings?.youtube && (
                  <Link
                    to={settings.data.settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" size-7.5 rounded-full bg-accent text-white  hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="text-sm md:text-base fab fa-youtube"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-estedad-verybold  text-xl text-dark  mb-4 ">
              شرکت
            </h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to={"/"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  to={"/about-us"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  to={"/services"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  خدمات ما
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-estedad-verybold  text-xl text-dark mb-4 ">
              لینک‌های مهم
            </h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to={"/gallery"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  گالری
                </Link>
              </li>
              <li>
                <Link
                  to={"/appointment"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  نوبت دهی
                </Link>
              </li>
              <li>
                <Link
                  to={"/faq"}
                  className="text-paragray font-estedad-semibold hover:text-tertiary"
                >
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          <div className="max-sm:col-span-4 max-lg:col-span-2">
            <h5 className="font-estedad-verybold  text-xl text-dark mb-4 ">
              با ما در تماس باشید
            </h5>
            <div className="space-y-3 text-gray-400">
              {settings?.data?.settings?.address && (
                <p className=" flex items-center gap-4 font-estedad-light">
                  <i className="fas fa-map-marker-alt mr-2 text-accent text-base"></i>
                  {settings.data.settings.address}
                </p>
              )}
              {settings?.data?.settings?.email && (
                <Link
                  to={`mailto:${settings.data.settings.email}`}
                  className=" hover:text-accent flex items-center gap-2"
                >
                  <i className="fas fa-envelope mr-2 text-accent text-base"></i>
                  {settings.data.settings.email}
                </Link>
              )}
              {settings?.data?.settings?.phoneNumber && (
                <Link
                  to={`tel:${settings.data.settings.phoneNumber}`}
                  className=" hover:text-accent flex items-center gap-2"
                >
                  <i className="fas fa-phone-alt mr-2 text-accent text-base"></i>
                  {settings.data.settings.phoneNumber}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#ddd] py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-paragray">
          <p className="font-estedad-light">
          تمامی حقوق متعلق به کلینیک دندان پزشکی طاهابی می‌باشد
          </p>
          <p className="font-estedad-light">ساخته شده توسط</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

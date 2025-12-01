import { useEffect, useState } from "react";
import "./Banner.css";
import {
  useMotionValueEvent,
  useMotionValue,
  animate,
  motion,
} from "motion/react";
import { useGetSettings } from "../../../../../services/useSettings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { showSuccessToast } from "../../../../../utils/toastify";
import { useGetAllDoctors } from "../../../../../services/useDoctors";
import type { Doctor } from "../../../../../types/types";
function Banner() {
  const [displayPatientsRecoverdCount, setDisplayPatientsRecoverdCount] =
    useState(0);
  const [displaySusseccfullVisitsCount, setDisplaySusseccfullVisitsCount] =
    useState(0);
  const [displayPopularDoctorsCount, setDisplayPopularDoctorsCount] =
    useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { data: settings } = useGetSettings();
  const { data: doctorsData } = useGetAllDoctors(1, 4, "");

  // Get doctors array or use empty array as fallback
  const doctors: Doctor[] = doctorsData?.data?.doctors || [];

  const patientsRecoverdCount = useMotionValue(0);
  const susseccfulVisitsCount = useMotionValue(0);
  const popularDoctorsCount = useMotionValue(0);

  useMotionValueEvent(patientsRecoverdCount, "change", (latest) => {
    setDisplayPatientsRecoverdCount(Math.round(latest));
  });
  useMotionValueEvent(susseccfulVisitsCount, "change", (latest) => {
    setDisplaySusseccfullVisitsCount(Math.round(latest));
  });
  useMotionValueEvent(popularDoctorsCount, "change", (latest) => {
    setDisplayPopularDoctorsCount(Math.round(latest));
  });

  useEffect(() => {
    const controls1 = animate(patientsRecoverdCount, 100, { duration: 2 });
    const controls2 = animate(susseccfulVisitsCount, 280, { duration: 2 });
    const controls3 = animate(popularDoctorsCount, 120, { duration: 2 });
    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
    };
  }, []);

  return (
    <motion.section className="bg-linear-to-br from-secondary/20 via-secondary/10 to-accent/30 md:min-h-[1000px] lg:min-h-[800px] md:h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)] pt-5 overflow-hidden">
      <div className="container mx-auto px-4 h-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="custom-sub-title">
              <span>به مدیفکس خوش آمدید</span>
            </div>
            <h1 className="text-4xl sm:text-[42px] lg:text-[38px] xl:text-[52px] custom-title mt-[22px] mb-4 leading-tight xl:max-w-[526px]">
              {settings?.data.settings.siteTitle}
            </h1>
            <p className="text-paragray text-lg xl:max-w-[526px] font-estedad-light">
              {settings?.data.settings.description}
            </p>
            <button
              onClick={() => {
                showSuccessToast("دریافت نوبت به زودی فعال خواهد شد");
              }}
              className="inline-block main-btn"
            >
              درخواست نوبت مشاوره
            </button>

            <div className="flex flex-wrap gap-y-4 max-md:justify-center gap-x-8 pt-8">
              <div>
                <motion.h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">
                  {displayPatientsRecoverdCount}
                  <span className="text-2xl">+</span>
                </motion.h3>
                <p className="text-paragray md:text-lg font-estedad-light ">
                  بیماران بهبود یافته
                </p>
              </div>
              <div>
                <motion.h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">
                  {displaySusseccfullVisitsCount}
                  <span className="text-2xl">%</span>
                </motion.h3>
                <p className="text-paragray md:text-lg font-estedad-light ">
                  بازدید موفق
                </p>
              </div>
              <div>
                <motion.h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">
                  {displayPopularDoctorsCount}
                  <span className="text-2xl">+</span>
                </motion.h3>
                <p className="text-paragray md:text-lg font-estedad-light ">
                  دکترهای محبوب
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative h-full min-h-[500px] md:min-h-[600px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              className="h-[500px] md:h-full w-full absolute top-0 left-0 right-0"
              slidesPerView={1}
              loop={doctors.length > 1}
              autoplay={{
                delay: 7500,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => {
                setActiveSlideIndex(swiper.realIndex);
              }}
              onSwiper={(swiper) => {
                setActiveSlideIndex(swiper.realIndex);
              }}
            >
              {doctors.length > 0 &&
                doctors.map((doctor, index) => (
                  <SwiperSlide key={doctor.id || index} className="relative">
                    <img
                      src="images/banner_img.png"
                      alt="banner"
                      className="w-[80%] mx-auto absolute bottom-0 left-0 right-0 h-[90%] z-20"
                    />
                    {/* Doctor Info Card */}
                    <motion.div
                      key={`doctor-info-${doctor.id}-slide-${activeSlideIndex}`}
                      className="absolute   top-100  w-[280px] md:w-[260px] bg-white/50 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_rgba(21,61,61,0.15)] p-3 md:p-4 z-30 border-2 border-secondary/80 hover:shadow-[0_12px_40px_rgba(21,61,61,0.2)] hover:border-secondary/50 transition-all duration-300 overflow-hidden group"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.74],
                      }}
                    >
                      {/* Accent Bar */}
                      <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-secondary via-accent to-secondary opacity-80"></div>

                      {/* Decorative Corner */}
                      <div className="absolute top-2 left-2 w-12 h-12 bg-secondary/5 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                      <div className="relative space-y-2">
                        {/* Doctor Name with Icon */}
                        <div className="flex items-start gap-2 pb-2 border-b border-secondary/10">
                          <div className="shrink-0 mt-0.5">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-secondary/20 to-accent/20 flex items-center justify-center border border-secondary/20">
                              <i className="fas fa-user-md text-secondary text-sm"></i>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-estedad-semibold text-dark leading-tight mb-0.5">
                              دکتر {doctor.firstName} {doctor.lastName}
                            </h3>
                            <div className="w-12 h-0.5 bg-linear-to-r from-secondary to-transparent rounded-full"></div>
                          </div>
                        </div>

                        {/* University */}
                        {doctor.skills && doctor.skills.length > 0 && (
                          <div className="flex items-center gap-2 text-xs md:text-sm">
                            <div className="shrink-0 w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center border border-accent/20">
                              <i className="fas  fa-stethoscope text-accent text-[10px]"></i>
                            </div>
                            <span className="font-estedad-lightbold text-paragray leading-relaxed">
                              {doctor.skills.slice(0, 2).join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="  h-full  w-[70%]  lg:w-[85%] mx-auto absolute top-10 left-0 right-0">
              <img
                src="images/banner-new-bg.png"
                alt="banner-bg "
                className="translate-y-10 circular-animation "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Banner;

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
import { useGetAllHeroSliders } from "../../../../../services/useHeroSliders";
import type { HeroSlider } from "../../../../../types/types";
import BannerSlide from "./BannerSlide/BannerSlide";
function Banner() {
  const [displayPatientsRecoverdCount, setDisplayPatientsRecoverdCount] =
    useState(0);
  const [displaySusseccfullVisitsCount, setDisplaySusseccfullVisitsCount] =
    useState(0);
  const [displayPopularDoctorsCount, setDisplayPopularDoctorsCount] =
    useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { data: settings } = useGetSettings();
  const { data: bannersData } = useGetAllHeroSliders(1, 20, "true");

  const banners: HeroSlider[] = bannersData?.data?.sliders || [];

  const startYear = 2014;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

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
    const controls1 = animate(patientsRecoverdCount, 32000, { duration: 2 });
    const controls2 = animate(susseccfulVisitsCount, yearsOfExperience, { duration: 2 });
    const controls3 = animate(popularDoctorsCount, 18, { duration: 2 });
    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
    };
  }, [yearsOfExperience]);

  return (
    <motion.section className="bg-linear-to-br from-secondary/20 via-secondary/10 to-accent/30 min-h-[500px] sm:min-h-[550px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] pt-4 sm:pt-5 md:pt-8 lg:pt-10 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
          <motion.div
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:-translate-y-16 xl:-translate-y-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="custom-sub-title text-sm sm:text-base md:text-lg max-md:mx-auto">
              <span>خوش آمدید</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[52px] custom-title mt-4 sm:mt-5 md:mt-[22px] mb-3 sm:mb-4 leading-tight xl:max-w-[526px] max-md:text-center md:text-right">
              {settings?.data.settings.siteTitle}
            </h1>
            <p className="text-paragray text-sm sm:text-base md:text-lg xl:max-w-[526px] font-estedad-light leading-relaxed max-md:text-center md:text-right">
              {settings?.data.settings.description}
            </p>
            <div className="max-md:flex max-md:justify-center md:block">
              <button
                onClick={() => {
                  showSuccessToast("دریافت نوبت به زودی فعال خواهد شد");
                }}
                className="inline-block main-btn text-sm sm:text-base py-2.5 sm:py-3 px-6 sm:px-10 mt-2 sm:mt-3"
              >
                درخواست نوبت مشاوره
              </button>
            </div>

            <div className="flex flex-wrap gap-y-3 sm:gap-y-4 max-md:justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 pt-6 sm:pt-8">
              <div className="flex-none w-auto min-w-[100px] sm:min-w-[110px] md:min-w-[120px]">
                <motion.h3 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[40px] font-estedad-semibold text-dark text-center">
                  {displaySusseccfullVisitsCount}
                  <span className="text-xl sm:text-2xl"> سال</span>
                </motion.h3>
                <p className="text-paragray text-xs sm:text-sm md:text-lg font-estedad-light text-center mt-1">
                  تجربه
                </p>
              </div>
              <div className="flex-none w-auto min-w-[100px] sm:min-w-[110px] md:min-w-[120px]">
                <motion.h3 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[40px] font-estedad-semibold text-dark text-center">
                  {displayPatientsRecoverdCount}
                  <span className="text-xl sm:text-2xl">+</span>
                </motion.h3>
                <p className="text-paragray text-xs sm:text-sm md:text-lg font-estedad-light text-center mt-1">
                  مراجع بهبود یافته
                </p>
              </div>
              <div className="flex-none w-auto min-w-[100px] sm:min-w-[110px] md:min-w-[120px]">
                <motion.h3 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[40px] font-estedad-semibold text-dark text-center">
                  {displayPopularDoctorsCount}
                  <span className="text-xl sm:text-2xl">+</span>
                </motion.h3>
                <p className="text-paragray text-xs sm:text-sm md:text-lg font-estedad-light text-center mt-1">
                  دندان پزشک مجرب
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative w-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[550px] xl:min-h-[600px] flex items-center justify-center mt-4 sm:mt-6 md:-mt-[50px] lg:-mt-[80px] xl:-mt-[100px] 2xl:-mt-[120px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[70%] sm:w-[70%] md:w-[75%] lg:w-[85%] xl:w-[90%] h-auto max-h-full">
                <img
                  src="images/banner-new-bg.png"
                  alt="banner-bg"
                  className="w-full h-auto circular-animation"
                />
              </div>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[600px] w-full relative z-10"
              slidesPerView={1}
              loop={banners.length > 1}
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
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <SwiperSlide
                    key={banner.id || index}
                    className="relative flex items-end justify-center"
                  >
                    <BannerSlide
                      banner={banner}
                      isActive={activeSlideIndex === index}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className="relative flex items-end justify-center">
                  <div className="relative w-full h-full flex items-end justify-center">
                    <img
                      src="images/banner_img.png"
                      alt="banner"
                      className="w-[75%] sm:w-[80%] max-w-[600px] h-auto max-h-[80%] sm:max-h-[85%] object-contain z-20"
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Banner;

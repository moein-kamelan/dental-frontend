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
import { useAppointmentModal } from "../../../../../contexts/useAppointmentModal";
import { useGetAllHeroSliders } from "../../../../../services/useHeroSliders";
import { useGetAllDoctors } from "../../../../../services/useDoctors";
import type { HeroSlider } from "../../../../../types/types";
import BannerSlide from "./BannerSlide/BannerSlide";
function Banner() {
  const [displayYearsExperience, setDisplayYearsExperience] = useState(0);
  const [displayTotalDoctors, setDisplayTotalDoctors] = useState(0);
  const [displayActiveClinics, setDisplayActiveClinics] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { data: settings } = useGetSettings();
  const { data: bannersData, isLoading: isBannersLoading } =
    useGetAllHeroSliders(1, 20, "true");
  const { data: doctorsData } = useGetAllDoctors(1, 1, "");
  const { openModal: openAppointmentModal } = useAppointmentModal();

  // Get banners array or use empty array as fallback (only published banners)
  const banners: HeroSlider[] = bannersData?.data?.sliders || [];

  // Calculate years of experience (starting from 2013)
  const baseYear = 2013;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - baseYear;

  // Get doctors and clinics counts
  const totalDoctors = doctorsData?.meta?.total || 0;
  const activeClinics = 2; // As requested by user

  const yearsExperienceCount = useMotionValue(0);
  const totalDoctorsCount = useMotionValue(0);
  const activeClinicsCount = useMotionValue(0);

  useMotionValueEvent(yearsExperienceCount, "change", (latest) => {
    setDisplayYearsExperience(Math.round(latest));
  });
  useMotionValueEvent(totalDoctorsCount, "change", (latest) => {
    setDisplayTotalDoctors(Math.round(latest));
  });
  useMotionValueEvent(activeClinicsCount, "change", (latest) => {
    setDisplayActiveClinics(Math.round(latest));
  });

  useEffect(() => {
    const controls1 = animate(yearsExperienceCount, yearsOfExperience, { duration: 2 });
    const controls2 = animate(totalDoctorsCount, totalDoctors, { duration: 2 });
    const controls3 = animate(activeClinicsCount, activeClinics, { duration: 2 });
    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearsOfExperience, totalDoctors, activeClinics]);

  return (
    <motion.section className="bg-linear-to-br from-secondary/20 via-secondary/10 to-accent/30   xl:max-h-full lg:max-h-[600px] lg:h-[calc(100vh-96px)] pt-5 overflow-hidden">
      <div className="container mx-auto px-4 h-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 items-center h-full">
          <motion.div
            className="space-y-6 xl:-translate-y-16 max-md:text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="custom-sub-title max-md:mx-auto">
              <span>خوش آمدید</span>
            </div>
            <h1 className="text-4xl sm:text-[42px] lg:text-[38px] xl:text-[52px] custom-title mt-[22px] mb-4 leading-tight xl:max-w-[526px] max-md:text-center">
              {settings?.data?.settings?.siteTitle ?? "عنوان سایت"}
            </h1>
            <p className="text-paragray text-lg xl:max-w-[526px] font-estedad-light">
              {settings?.data?.settings?.description ?? ""}
            </p>
            <button
              onClick={() => openAppointmentModal()}
              className="main-btn group/btn relative flex items-center justify-center lg:text-xs xl:text-sm text-nowrap"
            >
              <span className="group-hover/btn:translate-x-1 transition-all duration-200">دریافت نوبت</span>
              <i className="fas fa-arrow-left absolute left-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2 transition-all duration-200 text-sm"></i>
            </button>

            <div className="flex flex-wrap gap-y-4 max-md:justify-center gap-x-8 pt-8">
              <div>
                <motion.h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">
                  <span className="text-2xl">+</span>
                  {displayYearsExperience}
                </motion.h3>
                <p className="text-paragray md:text-lg font-estedad-light ">
                  تجربه کاری
                </p>
              </div>
              <div>
                <motion.h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">
                  {displayTotalDoctors}
                </motion.h3>
                <p className="text-paragray md:text-lg font-estedad-light ">
                  پزشک فعال
                </p>
              </div>
              <div>
                <motion.h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">
                  {displayActiveClinics}
                </motion.h3>
                <p className="text-paragray md:text-lg font-estedad-light ">
                  کلینیک فعال
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative h-full min-h-[380px] md:min-h-[575px] flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {isBannersLoading ? (
              <div className="h-[380px] md:h-full w-full flex items-center justify-center">
                <div className="w-[80%] max-w-[600px] h-[300px] md:h-[400px] bg-gray-200/50 animate-pulse rounded-2xl" />
              </div>
            ) : (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                className="h-[380px] md:h-full w-full"
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
                        src="images/doctor_banner.png"
                        alt="banner"
                        className="w-[80%] max-w-[600px] h-auto max-h-[85%] object-contain z-20"
                      />
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            )}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[70%] sm:w-[75%] md:w-[80%] lg:w-[85%] h-auto">
                <img
                  src="images/banner-new-bg.png"
                  alt="banner-bg"
                  className="w-full h-auto circular-animation"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Banner;

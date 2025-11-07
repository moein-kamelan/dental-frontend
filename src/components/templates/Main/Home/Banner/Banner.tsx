import { useEffect, useState } from "react";
import "./Banner.css";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
function Banner() {
  const [displayPatientsRecoverdCount, setDisplayPatientsRecoverdCount] =
    useState(0);
  const [displaySusseccfullVisitsCount, setDisplaySusseccfullVisitsCount] =
    useState(0);
  const [displayPopularDoctorsCount, setDisplayPopularDoctorsCount] =
    useState(0);
  const color1 = useMotionValue("#E8F4F4");
  const color2 = useMotionValue("#F5E8D4");

  const background = useMotionTemplate`linear-gradient(135deg, ${color1}, ${color2})`;

  const patientsRecoverdCount = useMotionValue(0);
  const susseccfulVisitsCount = useMotionValue(0);
  const popularDoctorsCount = useMotionValue(0);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await animate(color1, "#C4E8E8", { duration: 2 });
        await animate(color2, "#F0E0C4", { duration: 2 });
        await animate(color1, "#E8F4F4", { duration: 2 });
        await animate(color2, "#F0E0C4", { duration: 2 });
      }
    };
    sequence();
  }, []);

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
    <motion.section
      className=" lg:min-h-[800px]  lg:h-[calc(100vh-120px)] pt-5 overflow-hidden"
      style={{ background }}
    >
      <div className="container mx-auto px-4 h-full overflow-x-hidden">
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
            <h1 className="text-4xl sm:text-[42px] lg:text-[38px] xl:text-[52px] font-estedad-verybold mt-[22px] mb-4 leading-tight xl:max-w-[526px]">
              ما به سلامتی شما متعهد هستیم
            </h1>
            <p className="text-paragray text-lg xl:max-w-[526px] font-estedad-light">
              این یک واقعیت ثابت است که وقتی خواننده حواسش به محتوای یک صفحه
              می‌شود نگاه کردن به این طرح
            </p>
            <a href="doctor.html" className="inline-block main-btn">
              درخواست وقت دکتر
            </a>

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
            className="relative h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src="images/banner_img.png"
              alt="banner"
              className="w-[80%] mx-auto absolute bottom-0 left-0 right-0 h-[90%] z-20"
            />
            <div className=" z-10 h-full overflow-hidden">
              <img
                src="images/banner_img_bg.png"
                alt="banner-bg "
                className="translate-y-10 circular-animation "
              />
            </div>
            <div className="hidden lg:block absolute top-[55%] -right-10  w-20 h-20 z-20">
              <img src="images/react.png" alt="react" className="w-full" />
            </div>
            <div className="hidden lg:block absolute top-[36%] -left-5  w-20 h-20 z-20">
              <img src="images/Call.png" alt="react" className="w-full" />
            </div>
            <div className="hidden lg:block absolute top-[12%] right-28  w-20 h-20 z-20">
              <img src="images/Video-call.png" alt="react" className="w-full" />
            </div>
            <div className="hidden lg:block absolute top-[65%] -left-24  w-[170px] h-[90px] z-20">
              <img src="images/Review.png" alt="react" className="w-full" />
            </div>
            <div className="hidden lg:block absolute top-8 -left-6 2xl:-left-14  size-25 z-20">
              <img src="images/shape-1.png" alt="react" className="w-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Banner;

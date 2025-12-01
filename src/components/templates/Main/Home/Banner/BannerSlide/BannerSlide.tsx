import React from "react";
import { motion } from "motion/react";
import type { HeroSlider } from "../../../../../types/types";

interface BannerSlideProps {
  banner: HeroSlider;
  isActive: boolean;
}

function BannerSlide({ banner, isActive }: BannerSlideProps) {
  const imageUrl = banner.image
    ? `http://localhost:4000${banner.image}`
    : "images/banner_img.png";

  return (
    <div className="relative w-full h-full flex items-end justify-center pb-2 sm:pb-4 md:pb-8 lg:pb-12">
      <img
        src={imageUrl}
        alt={banner.title || "banner"}
        className="w-[85%] sm:w-[80%] md:w-[80%] lg:w-[80%] max-w-[450px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] h-auto max-h-[85%] sm:max-h-[80%] md:max-h-[80%] lg:max-h-[85%] object-contain z-[20] relative"
      />
      <motion.div
        className="hidden md:block absolute bottom-[15%] md:bottom-[18%] lg:bottom-[20%] left-1/2 -translate-x-1/2 md:left-auto md:right-0 lg:right-0 md:translate-x-0 w-[200px] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[100px] md:h-[120px] lg:h-[140px] rounded-2xl bg-linear-to-br from-secondary/30 via-accent/15 to-transparent blur-xl opacity-60 z-[10]"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.08,
          ease: "easeOut",
        }}
      ></motion.div>
      {(banner.title || banner.description || banner.buttonText) && (
        <motion.div
          key={`banner-info-${banner.id}-${isActive}`}
          className="absolute bottom-[5%] sm:bottom-[8%] md:bottom-[25%] lg:bottom-[30%] left-1/2 -translate-x-1/2 md:left-auto md:right-1 lg:right-2 xl:right-4 md:translate-x-0 w-[90%] sm:w-[85%] max-w-[280px] sm:max-w-[280px] md:w-[260px] lg:w-[280px] xl:w-[300px] bg-white/60 sm:bg-white/50 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-[0_8px_32px_rgba(21,61,61,0.15)] p-2.5 sm:p-3 md:p-4 lg:p-5 z-[30] border-2 border-secondary/80 hover:shadow-[0_12px_40px_rgba(21,61,61,0.2)] hover:border-secondary/50 transition-all duration-300 overflow-hidden group"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 18,
            delay: 0.12,
          }}
        >
          <div className="absolute top-0 right-0 left-0 h-0.5 sm:h-1 bg-linear-to-r from-secondary via-accent to-secondary opacity-80"></div>
          <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-8 sm:w-12 h-8 sm:h-12 bg-secondary/5 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="relative space-y-1.5 sm:space-y-2">
            {banner.title && (
              <div className="flex items-start gap-1.5 sm:gap-2 pb-1.5 sm:pb-2 border-b border-secondary/10">
                <div className="shrink-0 mt-0.5">
              
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg font-estedad-semibold text-dark leading-tight mb-0.5">
                    {banner.title}
                  </h3>
                  <div className="w-8 sm:w-12 h-0.5 bg-linear-to-r from-secondary to-transparent rounded-full"></div>
                </div>
              </div>
            )}

            {banner.description && (
              <div className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-accent/10 flex items-center justify-center border border-accent/20 mt-0.5">
                  <i className="fas fa-info-circle text-accent text-[8px] sm:text-[10px]"></i>
                </div>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: banner.description }}></span>
              </div>
            )}

            {banner.buttonText && banner.buttonLink && (
              <div className="pt-1.5 sm:pt-2">
                <a
                  href={banner.buttonLink}
                  className="inline-block text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary font-estedad-medium rounded-lg transition-colors duration-300"
                >
                  {banner.buttonText}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default BannerSlide;

import { motion } from "motion/react";
import type { HeroSlider } from "../../../../../../types/types";

interface BannerSlideProps {
  banner: HeroSlider;
  isActive: boolean;
}

function BannerSlide({ banner, isActive }: BannerSlideProps) {
  const imageUrl = banner.image
    ? `${banner.image}`
    : "images/banner_img.png";

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      <img
        src={imageUrl}
        alt={banner.title || "banner"}
        className="w-[80%] max-w-[600px] h-auto max-h-[85%] object-contain z-20"
      />
      <motion.div
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 md:left-auto md:right-0 lg:right-0 md:translate-x-0 w-[280px] sm:w-[260px] md:w-[280px] lg:w-[260px] h-[120px] md:h-[140px] rounded-2xl bg-linear-to-br from-secondary/30 via-accent/15 to-transparent blur-xl opacity-60 z-10"
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
          className="absolute bottom-[5%] md:bottom-[30%] lg:bottom-[12%] xl:bottom-[25%] left-1/2 -translate-x-1/2 md:left-auto md:right-1 lg:right-0 xl:right-2 md:translate-x-0 w-[200px] sm:w-[240px]  lg:w-[260px] bg-white/50 backdrop-blur-lg rounded-2xl p-2 md:p-4 z-30 border-2 border-secondary/80  hover:border-secondary/50 transition-all duration-300 overflow-hidden group"
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 14,
            delay: 0.2,
          }}
        >
          <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-secondary via-accent to-secondary opacity-80 "></div>
          <div className="absolute top-2 left-2 w-12 h-12 bg-secondary/5 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="relative space-y-1">
            {banner.title && (
              <div className="flex items-start gap-2  border-b border-secondary/10">
                <div className="shrink-0 mt-0.5">
              
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-estedad-semibold text-dark leading-tight mb-0.5 text-center line-clamp-2">
                    {banner.title}
                  </h3>
                  <div className="w-full mt-1 h-0.5 bg-linear-to-r from-transparent via-secondary to-transparent rounded-full"></div>
                </div>
              </div>
            )}

            {banner.description && (
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <div className="shrink-0 w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center border border-accent/20">
                  <i className="fas fa-info-circle text-accent text-[10px]"></i>
                </div>
              <span className=" line-clamp-2" dangerouslySetInnerHTML={{ __html: banner.description }}></span>
              </div>
            )}

            {banner.buttonText && banner.buttonLink && (
              <div className="pt-1">
                <a
                  href={banner.buttonLink}
                  className="inline-block text-xs md:text-sm px-4 py-2 bg-secondary/40 hover:bg-secondary/30 text-primary font-estedad-medium rounded-lg transition-colors duration-300"
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

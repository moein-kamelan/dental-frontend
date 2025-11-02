import React from "react";
import ServiceCard from "../../../../modules/Main/ServiceCard/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination ,Autoplay  } from "swiper/modules";
import {motion} from 'motion/react';
function Services() {
  return (
    <section className="py-20 md:py-24 bg-[url('/public/images/service_bg.jpg')] relative">
      <div className="absolute inset-0 bg-[#ffffff9c]"></div>
      <div className="container mx-auto px-4 relative z-10">
              <motion.div
          className=""
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
             <div className="text-center mb-12">
          <h5 className="custom-sub-title mx-auto">خدمات ما</h5>
          <h2 className="custom-title  text-center">سرویس های پزشکی ما</h2>
        </div>

        <Swiper
          modules={[Pagination , Autoplay ]}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          spaceBetween={34}
          slidesPerView={1}
          loop={true}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
          breakpoints={{
          640: {
            slidesPerView: 2,
          },
       
          1024: {
            slidesPerView: 3,
          },
        }}
        >
          <SwiperSlide>
            <ServiceCard />
          </SwiperSlide>

          <SwiperSlide>
            <ServiceCard />
          </SwiperSlide>

          <SwiperSlide>
            <ServiceCard />
          </SwiperSlide>

          <SwiperSlide>
            <ServiceCard />
          </SwiperSlide>

       
        </Swiper>

        <div className="custom-pagination mt-7.5 flex justify-center items-center gap-2 "></div>
          </motion.div>
      </div>
    </section>
  );
}

export default Services;

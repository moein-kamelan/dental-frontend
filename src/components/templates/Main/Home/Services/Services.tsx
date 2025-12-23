import ServiceCard from "../../../../modules/Main/ServiceCard/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { motion } from "motion/react";
import { useGetAllServices } from "../../../../../services/useServices";
import { Link } from "react-router-dom";
import type { Service } from "../../../../../types/types";

function Services() {
  const { data: services } = useGetAllServices(1, 6);
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-accent/5 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
        >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20 text-accent font-estedad-semibold">
              <i className="fas fa-tooth"></i>
              خدمات ما
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4"
            style={{ fontFamily: 'var(--font-vazir)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            سرویس های دندانپزشکی ما
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6"></div>
          <motion.p
            className="text-paragray text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            با استفاده از جدیدترین تکنولوژی‌ها و تجهیزات مدرن، بهترین خدمات را به شما ارائه می‌دهیم
          </motion.p>
        </motion.div>

        {/* Services Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
              renderBullet: (_index, className) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={services?.data?.services && services.data.services.length > 3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-12"
          >
            {services?.data?.services.map((service: Service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination */}
          <div className="custom-pagination mt-8 flex justify-center items-center gap-2"></div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-primary text-white rounded-2xl font-estedad-bold hover:from-secondary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>مشاهده همه خدمات</span>
              <i className="fas fa-arrow-left"></i>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;

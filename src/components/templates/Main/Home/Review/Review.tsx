import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import CommentCard from "../../../../modules/Main/CommentCard/CommentCard";
import "./Review.css";
import { motion } from "motion/react";
import { useGetPublishedReviews } from "../../../../../services/useReviews";
import type { Review as ReviewType } from "../../../../../types/types";

function Review() {
  const { data: reviewsData, isLoading } = useGetPublishedReviews(20);
  const reviews = reviewsData?.data?.reviews || [];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl hidden md:block"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl hidden md:block"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl hidden lg:block"></div>
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
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4"
            style={{ fontFamily: 'var(--font-vazir)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            آنچه مشتری ما می‌گوید
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6"></div>
          <motion.p
            className="text-paragray text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            تجربیات واقعی بیماران ما از خدمات ما
          </motion.p>
        </motion.div>

        {/* Reviews Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-accent border-t-transparent"></div>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4">
                <i className="fas fa-comment-slash text-gray-400 text-2xl"></i>
              </div>
              <p className="text-paragray font-estedad-medium text-lg">
                هنوز نظری ثبت نشده است
              </p>
            </div>
          ) : (
        <div>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              el: ".comments-pagination",
              clickable: true,
                  renderBullet: (_index, className) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
                spaceBetween={30}
            slidesPerView={1}
                loop={reviews.length > 3}
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
                {reviews.map((review: ReviewType) => (
                  <SwiperSlide key={review.id}>
                    <CommentCard review={review} />
            </SwiperSlide>
                ))}
          </Swiper>

              <div className="comments-pagination mt-8 flex justify-center items-center gap-2"></div>
        </div>
          )}
          </motion.div>
      </div>
    </section>
  );
}

export default Review;

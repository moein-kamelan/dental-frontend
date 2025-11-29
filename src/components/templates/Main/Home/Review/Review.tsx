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
    <section className="py-20 md:py-24 bg-[rgba(94,94,238,0.10)] relative">
      <img
        src="/images/heart.png"
        alt="heart"
        className="absolute top-25 right-40 size-22 opacity-30 hidden md:block heart-bounce"
      />
      <img
        src="/images/family-love.png"
        alt="family-love"
        className="absolute  size-22 bottom-10 left-20 opacity-30 hidden md:block"
      />
      <div className="container mx-auto px-4">
                            <motion.div
          className=""
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
<div className="text-center mb-12">
          <h5 className="custom-sub-title mx-auto">دیدگاه کاربران</h5>
          <h2 className="custom-title text-center">آنچه مشتری ما می‌گوید</h2>
        </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-paragray font-estedad-light">
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
            spaceBetween={34}
            slidesPerView={1}
                loop={reviews.length > 3}
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
                {reviews.map((review: ReviewType) => (
                  <SwiperSlide key={review.id}>
                    <CommentCard review={review} />
            </SwiperSlide>
                ))}
          </Swiper>

          <div className="comments-pagination mt-7.5 flex justify-center items-center gap-2 "></div>
        </div>
          )}
          </motion.div>
      </div>
    </section>
  );
}

export default Review;

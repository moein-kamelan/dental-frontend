import { motion } from "motion/react";
import { useGetSettings } from "../../../../services/useSettings";
import { getImageUrl } from "../../../../utils/helpers";

function AboutUsSection() {
  const { data: settingsData } = useGetSettings();
  const settings = settingsData?.data?.settings;

  const aboutUsImage = settings?.aboutUsImage
    ? `${settings.aboutUsImage}`
    : null;

  const aboutUsContent = settings?.aboutUsContent || "";
  const aboutUsVideo = settings?.aboutUsVideo
    ? `${settings.aboutUsVideo}`
    : null;

  return (
    <section className="pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
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
            مرکز پزشکی ما
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto"></div>
          </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Image/Video Section */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            className="relative"
            >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {aboutUsImage ? (
                <motion.img
                    src={getImageUrl(aboutUsImage)}
                    alt="درباره ما"
                    className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  />
              ) : (
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <i className="fas fa-image text-gray-400 text-3xl"></i>
                      </div>
                    </div>
                    <p className="text-gray-500 text-base font-estedad-medium">
                      تصویر درباره ما
                    </p>
                  </div>
                </div>
              )}

              {/* Video Overlay */}
              {aboutUsVideo && (
                <motion.div
                  className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="rounded-xl overflow-hidden w-64 h-48">
                    <video
                      controls
                      src={aboutUsVideo}
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-3xl"></div>
              </div>
            </motion.div>

          {/* Content Section */}
            <motion.div
            initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
              {aboutUsContent ? (
                <div
                  className="ck-content article-content text-justify leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutUsContent }}
                />
              ) : (
                <div className="space-y-5">
                  <p className="text-paragray text-justify leading-relaxed font-estedad-light text-base">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                    نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                  </p>
                  <p className="text-paragray text-justify leading-relaxed font-estedad-light text-base">
                    کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان
                    جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
                    طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
                    فارسی ایجاد کرد.
                  </p>
                </div>
              )}
            </div>

            {/* Feature Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "fas fa-award", text: "تخصص و تجربه" },
                { icon: "fas fa-users", text: "تیم حرفه‌ای" },
                { icon: "fas fa-heart", text: "مراقبت عالی" },
                { icon: "fas fa-star", text: "رضایت بیماران" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-accent/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl">
                    <i className={`${feature.icon} text-accent text-lg`}></i>
                  </div>
                  <span className="font-estedad-semibold text-dark">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Goftino Chat Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <a
                href="https://goftino.com/c/bpADrN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-primary text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'var(--font-vazir)' }}
              >
                <i className="fas fa-comments text-xl"></i>
                <span className="font-estedad-semibold text-base">ارتباط با ما از طریق گفتینو</span>
                <i className="fas fa-external-link-alt text-sm"></i>
              </a>
            </motion.div>
            </motion.div>
          </div>
        </div>
    </section>
  );
}

export default AboutUsSection;

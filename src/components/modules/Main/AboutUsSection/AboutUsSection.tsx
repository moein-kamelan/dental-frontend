import { motion } from "motion/react";
import { useGetSettings } from "../../../../services/useSettings";

function AboutUsSection() {
  const { data: settingsData } = useGetSettings();
  const settings = settingsData?.data?.settings;

  const aboutUsImage = settings?.aboutUsImage
    ? `http://localhost:4000${settings.aboutUsImage}`
    : null;

  const aboutUsContent = settings?.aboutUsContent || "";

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5 className="custom-sub-title mb-3">درباره ما</h5>
            <h2 className="custom-title">مرکز پزشکی ما</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* تصویر */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              {aboutUsImage ? (
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={aboutUsImage}
                    alt="درباره ما"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-image text-gray-400 text-2xl sm:text-3xl"></i>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base font-estedad-light">تصویر درباره ما</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* محتوا */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {aboutUsContent ? (
                <div
                  className="ck-content article-content text-justify leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutUsContent }}
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-paragray text-justify leading-relaxed font-estedad-light">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                    نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                  </p>
                  <p className="text-paragray text-justify leading-relaxed font-estedad-light">
                    کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان
                    جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
                    طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
                    فارسی ایجاد کرد.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;

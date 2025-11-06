import React from "react";
import "./Helpline.css";
import { motion } from "motion/react";
function HelpLine() {
  return (
    <section className="py-20 md:py-24 bg-[#eef9ff] overflow-x-hidden">
      <div className="container mx-auto px-4 overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <div className="space-y-4">
              <h5 className="custom-sub-title">کمک اضطراری</h5>
              <h2 className="custom-title">نیاز به تماس ضروری</h2>
              <p className="text-paragray leading-relaxed font-estedad-light max-w-140">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است
              </p>
            </div>

            <ul className="space-y-4 text-paragray">
              <li className="flex items-start gap-3 text-dark font-estedad-semibold">
                <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                <span>۲۴/۷ با بیمارستان ما تماس بگیرید.</span>
              </li>
              <li className="flex items-start gap-3 text-dark font-estedad-semibold">
                <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                <span>۲۴ ساعت در بیمارستان ما باز است.</span>
              </li>
              <li className="flex items-start gap-3 text-dark font-estedad-semibold">
                <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                <span>اورژانس با شماره تلفن ما تماس بگیرید.</span>
              </li>
            </ul>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center justify-between gap-2 bg-gray-50 p-6 rounded-2xl max-sm:w-[280px] shadow-sm">
                <div className="space-y-2">
                  <p className="text-sm text-paragray">شماره تماس</p>
                  <a
                    href="callto:123456789"
                    className=" text-[18px] text-paragray font-estedad-light text-nowrap"
                  >
                    ۱۳ ۲۳۲۳ ۰۴۵ ۸۸۰+
                  </a>
                </div>
                <div className="shrink-0 size-12 bg-accent  rounded-full flex items-center justify-center">
                  <i className="fas fa-phone-alt text-white "></i>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-50 p-6 rounded-2xl max-sm:w-[280px] shadow-sm">
                <div className="space-y-2">
                  <p className="text-sm text-paragray">ارسال ایمیل</p>
                  <a
                    href="mailto:example@gmail.com"
                    className=" text-[18px] text-paragray font-estedad-light text-nowrap"
                  >
                    help.info@gmail.com
                  </a>
                </div>
                <div className="shrink-0 size-12 bg-accent  rounded-full flex items-center justify-center">
                  <i className="fas fa-comment-alt text-white "></i>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <img
              src="images/helpline_img.png"
              alt="helpline"
              className="w-full"
            />
            <img
              src="images/helpline_img2.png"
              alt="helpline2"
              className="max-sm:hidden absolute w-32 h-24 md:h-32  md:w-40 -top-6 left-20 lg:-top-20 lg:left-4  xl:-top-6 xl:left-20 scale-animation"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HelpLine;

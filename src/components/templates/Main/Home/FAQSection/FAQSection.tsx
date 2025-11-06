import React, { useState } from "react";
import FAQItem from "../../../../modules/Main/FAQItem/FAQItem";
import { motion } from "motion/react";

function FAQSection() {
  return (
    <section className="py-20 md:py-24 bg-gray-50 ">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-12">
          <h5 className="custom-sub-title mx-auto ">سوالات متداول</h5>
          <h2 className="custom-title text-center">
            سوالات خود را از ما بپرسید
          </h2>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr]  gap-y-12 gap-x-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <FAQItem />
            <FAQItem />
            <FAQItem />
            <FAQItem />
          </motion.div>

          <motion.div
            className="relative lg:max-h-[364px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-b from-accent to-secondary size-40 z-20 rounded-br-lg"></div>

            <div className="relative bg-white pr-4 pb-4 z-40 h-full ">
              <div className="absolute -top-4 -left-4 bg-secondary rounded-2xl size-40 -z-10"></div>

              <div className="h-full">
                <img
                  src="images/faq-img.jpg"
                  alt="faq"
                  className="rounded-2xl h-full w-full"
                />
                <a
                  href="#"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                    <i className="fas fa-play text-accent text-2xl mr-1"></i>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;

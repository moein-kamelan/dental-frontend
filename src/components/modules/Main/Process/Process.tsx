import React from "react";
import {motion} from 'motion/react';


function Process() {
  return (
    <section className="py-20 md:py-24 bg-[url('/images/work_bg.jpg')] bg-no-repeat bg-right bg-cover">
      <div className="container mx-auto px-4">

               <motion.div
          className=""
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
 <div className="text-center mb-12 text-white">
          <h5 className="custom-sub-title mx-auto">شیوه کار ما</h5>
          <h2 className="custom-title text-center">روند کاری ما</h2>
        </div>

        <div className="grid sm:grid-cols-2  grid-rows-2 lg:grid-cols-4 gap-8 ">
          <div className="hidden lg:grid grid-cols-4 col-span-4  relative  z-10 gap-8">
            <img
              src="/images/process_shape.png"
              alt="Process-shape"
              className="absolute -z-10 col-span-3 lg:max-w-[820px] xl:max-w-[1020px] 2xl:max-w-[1200px]"
            />

            <div className=" hidden lg:flex  items-center justify-center rounded-full text-4xl font-bold bg-secondary size-[70px] text-white mb-4">
              ۱
            </div>

            <div className=" hidden lg:flex  items-center justify-center rounded-full text-4xl font-bold bg-accent size-[70px] text-white mb-4">
              ۲
            </div>
            <div className=" hidden lg:flex  items-center justify-center rounded-full text-4xl font-bold bg-semantic-red size-[70px] text-white mb-4">
              ۳
            </div>
            <div className=" hidden lg:flex  items-center justify-center rounded-full text-4xl font-bold bg-semantic-yellow size-[70px] text-white mb-4">
              ۴
            </div>
          </div>

          <div className="bg-white/10  rounded-2xl  text-white ">
            <div className=" flex lg:hidden  items-center justify-center rounded-full text-4xl font-bold bg-secondary size-[70px] text-white mb-4">
              ۱
            </div>
            <h4 className="text-[20px] font-estedad-semibold text-dark mb-3">
              فرم را پر کنید
            </h4>
            <p className="text-paragray">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>

          <div className="bg-white/10   rounded-2xl  text-white ">
            <div className=" flex lg:hidden  items-center justify-center rounded-full text-4xl font-bold bg-accent size-[70px] text-white mb-4">
              ۲
            </div>
            <h4 className="text-[20px] font-estedad-semibold text-dark mb-3">
              رزرو نوبت دکتر
            </h4>
            <p className="text-paragray">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>

          <div className="bg-white/10  rounded-2xl  text-white ">
            <div className=" flex lg:hidden  items-center justify-center rounded-full text-4xl font-bold bg-semantic-red size-[70px] text-white mb-4">
              ۳
            </div>
            <h4 className="text-[20px] font-estedad-semibold text-dark mb-3">
              چک آپ
            </h4>
            <p className="text-paragray">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>

          <div className="bg-white/10  rounded-2xl  text-white ">
            <div className=" flex lg:hidden  items-center justify-center rounded-full text-4xl font-bold bg-semantic-yellow size-[70px] text-white mb-4">
              ۴
            </div>
            <h4 className="text-[20px] font-estedad-semibold text-dark mb-3">
              دریافت گزارش
            </h4>
            <p className="text-paragray">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </p>
          </div>
        </div>
          </motion.div>
       
      </div>
    </section>
  );
}

export default Process;

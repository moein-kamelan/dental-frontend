import React from 'react'
import {motion} from "motion/react"

function AboutUsSection() {
  return (
     <section className="py-20 md:py-24 relative">

        <img src="/images/shape-5.png" alt="shape-5" className='hidden md:block absolute size-20 opacity-30 left-20 xl:right-20 bottom-20' />
        
        <div className="container mx-auto px-4">
            <div className="grid xl:grid-cols-2 gap-12 items-center">
                
       <motion.div
          className="grid grid-cols-1  md:grid-cols-[3fr_2fr] gap-4 "
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >

                    <div className="row-span-2 hidden md:block">
                        <img src="images/about-img1.jpg" alt="about" className="rounded-2xl w-full h-full object-cover"/>
                    </div>
                    <div className="relative md:left-20 md:top-1/2 min-w-[280px] max-h-[400px]">
                        <img src="images/about_img2.jpg" alt="about" className="rounded-2xl w-full h-full object-cover"/>
                        <a href="#" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl hover:bg-opacity-50 transition">
                            <i className="fas fa-play text-white text-4xl"></i>
                        </a>

                        <img src="/images/about_shape1.png" alt="shape" className='hidden md:block absolute -top-30 size-20 circular-animation left-10'/>
                    </div>
          </motion.div>

                 <motion.div
          className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
                
                    <div className="space-y-4 ">
                        <h5 className="custom-sub-title">درباره ما</h5>
                        <h2 className="custom-title w-fit">
                            مکان بزرگ مرکز بیمارستان پزشکی
                        </h2>
                        <p className="text-paragray text-justify leading-relaxed font-estedad-light max-w-[620px]">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
                        </p>
                    </div>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-paragray">
                        <li className="flex items-center font-estedad-semibold text-[18px] text-dark gap-2 text-nowrap">
                            <i className="text-2xl fa fa-check-circle text-primary"></i>
                            خدمات آمبولانس
                        </li>
                        <li className="flex items-center font-estedad-semibold text-[18px] text-dark gap-2 text-nowrap">
                            <i className="text-2xl fa fa-check-circle text-primary"></i>
                            اکسیژن روی چرخ
                        </li>
                        <li className="flex items-center font-estedad-semibold text-[18px] text-dark gap-2 text-nowrap">
                            <i className="text-2xl fa fa-check-circle text-primary"></i>
                            داروخانه در کلینیک
                        </li>
                        <li className="flex items-center font-estedad-semibold text-[18px] text-dark gap-2 text-nowrap">
                            <i className="text-2xl fa fa-check-circle text-primary"></i>
                            پزشکان وظیفه
                        </li>
                        <li className="flex items-center font-estedad-semibold text-[18px] text-dark gap-2 text-nowrap ">
                            <i className="text-2xl fa fa-check-circle text-primary"></i>
                            فوریت های پزشکی ۲۴/۷
                        </li>
                    </ul>
                    
                    <a href="about.html" className="main-btn block w-fit">
                        مشاهده همه
                    </a>

          </motion.div>
                
            </div>
        </div>
    </section>

  )
}

export default AboutUsSection
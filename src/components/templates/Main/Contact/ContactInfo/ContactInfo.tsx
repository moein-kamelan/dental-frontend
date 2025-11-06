import React from 'react'
import {motion} from 'motion/react';

function ContactInfo() {
  return (
       <section className="py-12">
        <div className="container mx-auto px-4">

                                  <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
                
                <div className="bg-white rounded-2xl p-6 text-center   border-2 border-[rgba(94,91,91,0.09)]">
                    <div className="w-20 h-20 bg-semantic-red  rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-map-marker-alt text-white text-3xl"></i>
                    </div>
                    <h4 className="font-estedad-semibold text-dark text-2xl mb-3 ">آدرس شرکت</h4>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base">فارس.شیراز.بلوار نیایش.ساختمان پرشکان</p>
                </div>

                
                <div className="bg-white rounded-2xl p-6 text-center   border-2 border-[rgba(94,91,91,0.09)]">
                    <div className="w-20 h-20 bg-primary  rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-phone-alt text-white text-3xl"></i>
                    </div>
                    <h4 className="font-estedad-semibold text-dark text-2xl mb-3 ">شماره موبایل</h4>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base">+۸۸۰ ۱۲۳۴ ۶۷۲۱۴</p>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base">+۸۸۰ ۱۲۲۴۱ ۶۳۱۳۴</p>
                </div>

                
                <div className="bg-white rounded-2xl p-6 text-center   border-2 border-[rgba(94,91,91,0.09)]">
                    <div className="w-20 h-20 bg-semantic-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-envelope-open text-white text-3xl"></i>
                    </div>
                    <h4 className="font-estedad-semibold text-dark text-2xl mb-3 ">ایمیل شرکت</h4>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base">example@gmail.com</p>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base ">junayedallinone@gmail.com</p>
                </div>

                
                <div className="bg-white rounded-2xl p-6 text-center   border-2 border-[rgba(94,91,91,0.09)]">
                    <div className="w-20 h-20 bg-secondary  rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-globe text-white text-3xl"></i>
                    </div>
                    <h4 className="font-estedad-semibold text-dark text-2xl mb-3 ">شماره فکس</h4>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base">۱۲۳۱ ۴۳۱۴ ۰۲۱+</p>
                    <p className="text-paragray font-estedad-light text-sm xl:text-base">۲۲۱۳ ۴۳۱۱ ۰۲۱+</p>
                </div>

          </motion.div>
        </div>
    </section>
  )
}

export default ContactInfo
import React from 'react'
import {motion} from 'motion/react';
function Breadcrumb() {
  return (
     <section className="relative z-10 bg-[url('/public/images/breadcrumb_bg.jpg')] bg-bottom h-[50vh] bg-cover  py-12 mb-12 ">
        <div className='absolute inset-0 bg-[#013c5aa3] -z-10 '></div>
                                  <motion.div
          className="container mx-auto  px-4 flex flex-col h-full"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0 }}
          >

            <div className=" my-auto z-10  text-white" >
                <h1 className="text-4xl font-bold  mb-4">ورود به حساب کاربری</h1>
                <ul className="flex  gap-4 ">
                    <li><a href="index.html" className="hover:text-primary">خانه</a></li>
                    <li><i className="fas fa-angle-left"></i></li>
                    <li className="">ورود</li>
                </ul>
        </div>
          </motion.div>
    </section>
  )
}

export default Breadcrumb
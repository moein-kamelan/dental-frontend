import React from 'react'
import {motion} from 'motion/react';
function StatsCounter() {
  return (
     <section className="py-20 bg-cover bg-center" >
        <div className="container mx-auto px-4">
                                <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:divide-x divide-gray-300 border border-gray-100  bg-[url('/images/counter_bg.jpg')] rounded-xl p-8 shadow-sm bg-cover bg-no-repeat"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
                <div className="text-center text-white    ">
                    <div className="w-20 h-20 bg-secondary  rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-users text-3xl text-white"></i>
                    </div>
                    <h4 className="text-[40px] font-estedad-semibold text-dark mb-2">۹۵۰ +</h4>
                    <p className="text-paragray  font-estedad-light"> رضایت بیماران</p>
                </div>
                
                <div className="text-center text-white    ">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-user-md text-3xl text-white"></i>
                    </div>
                    <h4 className="text-[40px] font-estedad-semibold text-dark mb-2">۲۵۶ +</h4>
                    <p className="text-paragray font-estedad-light"> تعداد پزشک متخصص</p>
                </div>
                
                <div className="text-center text-white    ">
                    <div className="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-trophy text-3xl text-white"></i>
                    </div>
                    <h4 className="text-[40px] font-estedad-semibold text-dark mb-2">۹۰ +</h4>
                    <p className="text-paragray  font-estedad-light"> برنده جایزه</p>
                </div>
                
                <div className="text-center text-white    ">
                    <div className="w-20 h-20 bg-yellow-500  rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-star text-3xl text-white"></i>
                    </div>
                    <h4 className="text-[40px] font-estedad-semibold text-dark mb-2">۴.۹</h4>
                    <p className="text-paragray  font-estedad-light"> میانگین امتیاز</p>
            </div>
          </motion.div>
          

          
            
        </div>
    </section>
  )
}

export default StatsCounter
import React, { useState } from 'react'
import FAQItem from '../../../../modules/Main/FAQItem/FAQItem'

function FAQSection() {
    

    
  return (
        <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h5 className="custom-sub-title mx-auto ">سوالات متداول</h5>
                <h2 className="custom-title text-center">سوالات خود را از ما بپرسید</h2>
            </div>
            
            <div className="grid lg:grid-cols-[3fr_2fr]  gap-y-12 gap-x-8">

                <div className="space-y-6">

      <FAQItem/>
      <FAQItem/>
      <FAQItem/>
      <FAQItem/>
                    
                    
                </div>
                
             <div className='relative lg:max-h-[364px]'>
                  <div className='absolute -bottom-1 -right-1 bg-gradient-to-b from-primary to-secondary size-40 z-20 rounded-br-lg'></div>

                   <div className="relative bg-white pr-4 pb-4 z-50 h-full ">


                    <div className='absolute -top-4 -left-4 bg-primary rounded-2xl size-40 -z-10'></div>

                  

                 <div className='h-full'>
                       <img src="images/faq-img.jpg" alt="faq" className="rounded-2xl h-full w-full"/>
                    <a href="#" className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                            <i className="fas fa-play text-primary text-2xl mr-1"></i>
                        </div>
                    </a>
                 </div>
                </div>
                
             </div>
            </div>
        </div>
    </section>
  )
}

export default FAQSection
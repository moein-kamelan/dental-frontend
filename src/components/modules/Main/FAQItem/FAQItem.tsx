import React, { useState } from 'react'

function FAQItem() {
    const [isFaqOpen , setIsFaqOpen] = useState(false)

  return (
       <div className=''>

                       <div  onClick={() => setIsFaqOpen(prev => !prev)}  className="bg-primary/20 rounded-sm  p-6" >
                        <div className="font-estedad-semibold text-dark cursor-pointer flex items-center justify-between">
                            پس از ارائه نمونه من چه اتفاقی می‌افتد؟
                            <i className="fas fa-plus text-primary"></i>
                        </div>
                    
                    </div>
                        <div  className={`text-paragray font-estedad-light bg-primary/20   transition-all duration-300 px-4   rounded-bl-sm rounded-br-sm  overflow-hidden text-justify ${isFaqOpen ? "border-t border-t-gray-300 max-h-80 py-4 opacity-100 visible" : "max-h-0 invisible opacity-0"} `}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                            
                        </div>
                
                
             </div>
  )
}

export default FAQItem
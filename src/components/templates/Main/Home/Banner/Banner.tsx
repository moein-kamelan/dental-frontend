import React from 'react'
import "./Banner.css"

function Banner() {
  return (
 <section className="bg-[url('/public/images/banner_bg.jpg')] bg-cover  lg:h-[calc(100vh-120px)] pt-5 overflow-hidden">
        <div className="container mx-auto px-4 h-full ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6">
                    <div className="custom-sub-title">

                        <span>به مدیفکس خوش آمدید</span>
                    </div>
                    <h1 className="text-4xl sm:text-[42px] lg:text-[38px] xl:text-[52px] custom-title mt-[22px] mb-4 leading-tight xl:max-w-[526px]">
                        ما به سلامتی شما متعهد هستیم
                    </h1>
                    <p className="text-paragray text-lg xl:max-w-[526px] font-estedad-light">
                        این یک واقعیت ثابت است که وقتی خواننده حواسش به محتوای یک صفحه می‌شود نگاه کردن به این طرح
                    </p>
                    <a href="doctor.html" className="inline-block main-btn">
                        درخواست وقت دکتر
                    </a>
                    
                    <div className="flex flex-wrap gap-y-4 max-md:justify-center gap-x-8 pt-8">
                        <div>
                            <h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">۳۵۵<span className="text-2xl">+</span></h3>
                            <p className="text-paragray md:text-lg font-estedad-light ">بیماران بهبود یافته</p>
                        </div>
                        <div>
                            <h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">۹۸<span className="text-2xl">%</span></h3>
                            <p className="text-paragray md:text-lg font-estedad-light ">بازدید موفق</p>
                        </div>
                        <div>
                            <h3 className="text-[32px] md:text-[40px] font-estedad-semibold  text-dark text-center">۱۲۰<span className="text-2xl">+</span></h3>
                            <p className="text-paragray md:text-lg font-estedad-light ">دکترهای محبوب</p>
                        </div>
                    </div>
                </div>
                
                <div className="relative h-full  ">

                    
                     <img src="images/banner_img.png" alt="banner" className="w-[80%] mx-auto absolute bottom-0 left-0 right-0 h-[90%] z-20"/>
                    <div className=" z-10 h-full overflow-hidden">
                        <img src="images/banner_img_bg.png" alt="banner-bg " className='translate-y-10 circular-animation '  />
                       
                    </div>
                    <div className="hidden lg:block absolute top-[55%] -right-10  w-20 h-20 z-20">
                        <img src="images/react.png" alt="react" className="w-full"/>
                    </div>
                    <div className="hidden lg:block absolute top-[36%] -left-5  w-20 h-20 z-20">
                        <img src="images/Call.png" alt="react" className="w-full"/>
                    </div>
                    <div className="hidden lg:block absolute top-[12%] right-28  w-20 h-20 z-20">
                        <img src="images/Video-call.png" alt="react" className="w-full"/>
                    </div>
                    <div className="hidden lg:block absolute top-[65%] -left-24  w-[170px] h-[90px] z-20">
                        <img src="images/Review.png" alt="react" className="w-full"/>
                    </div>
                    <div className="hidden lg:block absolute top-8 xl:left-75 2xl:-left-14  size-25 z-20">
                        <img src="images/shape-1.png" alt="react" className="w-full"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner
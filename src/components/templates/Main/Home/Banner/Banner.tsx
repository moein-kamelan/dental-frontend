import React from 'react'
import "./Banner.css"

function Banner() {
  return (
 <section className="bg-[url('/public/images/banner_bg.jpg')] bg-cover  h-[calc(100vh-120px)] pt-5">
        <div className="container mx-auto px-4 h-full">
            <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6">
                    <div className="custom-sub-title">

                        <span>به مدیفکس خوش آمدید</span>
                    </div>
                    <h1 className="text-4xl sm:text-[42px] lg:text-[38px] xl:text-[52px] custom-title mt-[22px] mb-[16px] leading-tight xl:max-w-[526px]">
                        ما به سلامتی شما متعهد هستیم
                    </h1>
                    <p className="text-paragray text-lg xl:max-w-[526px] font-estedad-light">
                        این یک واقعیت ثابت است که وقتی خواننده حواسش به محتوای یک صفحه می‌شود نگاه کردن به این طرح
                    </p>
                    <a href="doctor.html" className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue transition font-semibold">
                        درخواست وقت دکتر
                    </a>
                    
                    <div className="grid grid-cols-3 gap-6 pt-8">
                        <div>
                            <h3 className="text-3xl  text-primary">۳۵۵<span className="text-2xl">+</span></h3>
                            <p className="text-paragray text-sm">بیماران بهبود یافته</p>
                        </div>
                        <div>
                            <h3 className="text-3xl  text-primary">۹۸<span className="text-2xl">%</span></h3>
                            <p className="text-paragray text-sm">بازدید موفق</p>
                        </div>
                        <div>
                            <h3 className="text-3xl  text-primary">۱۲۰<span className="text-2xl">+</span></h3>
                            <p className="text-paragray text-sm">دکترهای محبوب</p>
                        </div>
                    </div>
                </div>
                
                <div className="relative h-full overflow-hidden">
                    <div className="relative z-10 h-full">
                        <img src="images/banner_img_bg.png" alt="banner-bg " className='translate-y-20 circular-animation'  />
                        <img src="images/banner_img.png" alt="banner" className="w-[80%] mx-auto absolute bottom-0 left-0 right-0 h-[90%]"/>
                    </div>
                    <div className="absolute top-10 right-10 w-20 h-20 z-20">
                        <img src="images/react.png" alt="react" className="w-full"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner
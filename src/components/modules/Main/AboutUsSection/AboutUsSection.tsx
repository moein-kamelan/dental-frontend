import React from 'react'

function AboutUsSection() {
  return (
     <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                    <div className="row-span-2">
                        <img src="images/about-img1.jpg" alt="about" className="rounded-2xl w-full h-full object-cover"/>
                    </div>
                    <div className="relative">
                        <img src="images/about_img2.jpg" alt="about" className="rounded-2xl w-full h-full object-cover"/>
                        <a href="#" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl hover:bg-opacity-50 transition">
                            <i className="fas fa-play text-white text-4xl"></i>
                        </a>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h5 className="custom-sub-title">درباره ما</h5>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark">
                            مکان بزرگ مرکز بیمارستان پزشکی
                        </h2>
                        <p className="text-paragray leading-relaxed">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
                        </p>
                    </div>
                    
                    <ul className="grid grid-cols-2 gap-4 text-paragray">
                        <li className="flex items-center gap-2">
                            <i className="fas fa-check-circle text-secondary"></i>
                            خدمات آمبولانس
                        </li>
                        <li className="flex items-center gap-2">
                            <i className="fas fa-check-circle text-secondary"></i>
                            اکسیژن روی چرخ
                        </li>
                        <li className="flex items-center gap-2">
                            <i className="fas fa-check-circle text-secondary"></i>
                            داروخانه در کلینیک
                        </li>
                        <li className="flex items-center gap-2">
                            <i className="fas fa-check-circle text-secondary"></i>
                            پزشکان وظیفه
                        </li>
                        <li className="flex items-center gap-2 col-span-2">
                            <i className="fas fa-check-circle text-secondary"></i>
                            فوریت های پزشکی ۲۴/۷
                        </li>
                    </ul>
                    
                    <a href="about.html" className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue transition font-semibold">
                        مشاهده همه
                    </a>
                </div>
            </div>
        </div>
    </section>

  )
}

export default AboutUsSection
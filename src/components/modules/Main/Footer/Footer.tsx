import React from 'react'

function Footer() {
  return (
       <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
            
            <div className="bg-gradient-to-l from-primary to-deepblue rounded-2xl p-8 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <h2 className="text-2xl md:text-3xl font-bold">برای به‌روزرسانی‌های انحصاری مشترک شوید!</h2>
                    <form className="flex gap-4 flex-1 max-w-md">
                        <input type="text" placeholder="ایمیل آدرس را وارد نمایید" className="flex-1 px-6 py-3 rounded-full text-dark"/>
                        <button type="submit" className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                            عضویت
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                <div>
                    <img src="../../../../../../public/images/footer_logo.png" alt="logo" className="mb-6 w-32"/>
                    <p className="text-gray-400 mb-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    <div className="mb-4">
                        <span className="text-gray-400">سلام به :</span>
                        <a href="#" className="text-primary hover:underline">support@gmail.com</a>
                    </div>
                    <div className="flex gap-4 text-xl">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <div>
                    <h5 className="font-bold text-lg mb-4">شرکت</h5>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="index.html" className="hover:text-primary">خانه</a></li>
                        <li><a href="about.html" className="hover:text-primary">درباره ما</a></li>
                        <li><a href="service.html" className="hover:text-primary">خدمات ما</a></li>
                        <li><a href="contact.html" className="hover:text-primary">تماس با ما</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="font-bold text-lg mb-4">لینک‌های مهم</h5>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-primary">پردازش ما</a></li>
                        <li><a href="#" className="hover:text-primary">نوبت دهی</a></li>
                        <li><a href="faq.html" className="hover:text-primary">سوالات متداول</a></li>
                        <li><a href="#" className="hover:text-primary">سیاست حفظ حریم خصوصی</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="font-bold text-lg mb-4">اطلاعات شرکت</h5>
                    <div className="space-y-3 text-gray-400">
                        <p><i className="fas fa-map-marker-alt mr-2"></i>شیراز. خیابان نیایش. ساختمان پزشکان</p>
                        <a href="#" className="block hover:text-primary"><i className="fas fa-envelope mr-2"></i>company@gmail.com</a>
                        <a href="#" className="block hover:text-primary"><i className="fas fa-phone-alt mr-2"></i>۹۳۵۷۴۶۱۴۳+</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
                <p>همه حقوق متعلق به محسن دادار می‌باشد - زمستان ۱۴۰۲</p>
                <ul className="flex gap-6">
                    <li><a href="#" className="hover:text-primary">شرایط و ضوابط</a></li>
                    <li><a href="#" className="hover:text-primary">کوکی</a></li>
                    <li><a href="#" className="hover:text-primary">سیاست حفظ حریم خصوصی</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
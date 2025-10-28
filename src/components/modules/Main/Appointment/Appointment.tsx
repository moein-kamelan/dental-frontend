import React from 'react'

function Appointment() {
  return (
<section className="py-20 md:py-24 relative overflow-hidden" style={{backgroundImage: "url('images/appointment_bg.jpg')"}}>
        <div className="absolute inset-0 bg-gradient-to-l from-primary to-deepblue opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">

                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                    <div className="space-y-6 mb-8 text-white">
                        <h5 className="text-white font-bold text-lg">نوبت دهی</h5>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">ثبت درخواست رزرو رایگان</h2>
                    </div>
                    
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="نام بیمار*" className="w-full px-6 py-3 border border-white border-opacity-30 bg-white/10 backdrop-blur-sm rounded-full text-white placeholder-white focus:outline-none focus:bg-opacity-20"/>
                            <input type="email" placeholder="ایمیل*" className="w-full px-6 py-3 border border-white border-opacity-30 bg-white/10 backdrop-blur-sm rounded-full text-white placeholder-white focus:outline-none focus:bg-opacity-20"/>
                            <input type="text" placeholder="شماره تماس*" className="w-full px-6 py-3 border border-white border-opacity-30 bg-white/10 backdrop-blur-sm rounded-full text-white placeholder-white focus:outline-none focus:bg-opacity-20"/>
                            <select className="w-full px-6 py-3 border border-white border-opacity-30 bg-white/10 backdrop-blur-sm rounded-full text-white focus:outline-none focus:bg-opacity-20">
                                <option value="">انتخاب دپارتمان</option>
                                <option value="">قلب و عروق</option>
                                <option value="">چشم پزشکی</option>
                                <option value="">اطفال</option>
                                <option value="">رادیولوژی</option>
                                <option value="">اورولوژی</option>
                            </select>
                            <select className="w-full px-6 py-3 border border-white border-opacity-30 bg-white/10 backdrop-blur-sm rounded-full text-white focus:outline-none focus:bg-opacity-20">
                                <option value="">انتخاب دکتر</option>
                                <option value="">دکتر نوبخت</option>
                                <option value="">دکتر دادار</option>
                                <option value="">دکتر ملک پور</option>
                                <option value="">دکتر رضایی</option>
                                <option value="">دکتر احمدی</option>
                            </select>
                            <input type="text" placeholder="تاریخ را وارد نماید" className="w-full px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm rounded-full text-white placeholder-white focus:outline-none focus:bg-opacity-20"/>
                            <select className="w-full px-6 py-3 border border-white border-opacity-30 bg-white/10 backdrop-blur-sm rounded-full text-white focus:outline-none focus:bg-opacity-20">
                                <option value="">انتخاب زمان</option>
                                <option value="">۱۰.۰۰ صبح تا ۱۱.۰۰ صبح</option>
                                <option value="">۱۱:۰۰ صبح تا ۱۲.۰۰ عصر</option>
                                <option value="">۳:۰۰ عصر تا ۴:۰۰ عصر</option>
                                <option value="">۴:۰۰ عصر تا ۵:۰۰ عصر</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-100 transition font-semibold">
                            ثبت درخواست رزور
                        </button>
                    </form>
                </div>
                
                <div className="hidden lg:block">
                    <img src="images/appoinment_img.png" alt="appointment" className="w-full"/>
                </div>
            </div>
        </div>
    </section>

    
    
  )
}

export default Appointment
import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'

function DoctorDetails() {
  return (
    <>
    <Breadcrumb/>

    <section className="py-12">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
                

                <div className="md:col-span-2 space-y-8">
                    

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <img src="../../../../public/images/team-2.jpg" alt="doctor" className="rounded-2xl w-full"/>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold text-dark">دکتر رزیتا غفاری</h3>
                                <p className="text-paragray">MBBS (University of Wyoming)</p>
                                <p className="text-paragray">M.D. of Medicine (Netherland Medical College)</p>
                                <p className="text-paragray"><b>Senior Prof. (MBBS, M.D)</b> کالج پزشکی هلند</p>
                                <p className="text-paragray">شماره نظام پزشکی: الف-۲۳۱۴۴۱</p>
                                <a href="callto:0123456789" className="block text-primary hover:text-deepblue">
                                    تماس: (۷۰۰) ۲۳۰-۰۰۳۵
                                </a>
                                <a href="mailto:example@gmail.com" className="block text-primary hover:text-deepblue">
                                    ایمیل: example@gmail.com
                                </a>
                            </div>
                        </div>

                        

                        <div className="border-t pt-8">
                            <h3 className="text-2xl font-bold mb-4">بیوگرافی دکتر رزیتا عفاری</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-bold mb-3">پیشینه آموزشی</h4>
                                    <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-3">مهارت های تجربه پزشکی</h4>
                                    <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">مجموع دیدگاه (۰۴)</h2>
                        
                        <div className="space-y-6">
                            

                            <div className="border-b pb-6 last:border-b-0">
                                <div className="flex gap-4">
                                    <img src="../../../../public/images/comment-1.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-bold">محسن دادار</h4>
                                                <span className="text-sm text-paragray"><i className="fa fa-clock mr-1"></i>۴ ساعت پیش</span>
                                            </div>
                                            <div className="flex gap-1 text-yellow-400">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می رسد.</p>
                                        <a href="#" className="text-primary hover:text-deepblue"><i className="fa fa-reply-all mr-1"></i>پاسخ</a>
                                    </div>
                                </div>
                            </div>

                            

                            <div className="border-b pb-6 last:border-b-0">
                                <div className="flex gap-4">
                                    <img src="../../../../public/images/comment-2.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-bold">نیما نوبخت</h4>
                                                <span className="text-sm text-paragray"><i className="fa fa-clock mr-1"></i>۱ ساعت پیش</span>
                                            </div>
                                            <div className="flex gap-1 text-yellow-400">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی تزریقی</p>
                                        <a href="#" className="text-primary hover:text-deepblue"><i className="fa fa-reply-all mr-1"></i>پاسخ</a>
                                    </div>
                                </div>
                            </div>

                            

                            <div className="border-b pb-6 last:border-b-0">
                                <div className="flex gap-4">
                                    <img src="../../../../public/images/comment-3.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-bold">داوود عارف</h4>
                                                <span className="text-sm text-paragray"><i className="fa fa-clock mr-1"></i>۶ ساعت پیش</span>
                                            </div>
                                            <div className="flex gap-1 text-yellow-400">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                        <a href="#" className="text-primary hover:text-deepblue"><i className="fa fa-reply-all mr-1"></i>پاسخ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h5 className="font-bold text-xl mb-4">ساعات کاری</h5>
                        <div className="space-y-3 text-paragray">
                            <div className="flex justify-between">
                                <span>دوشنبه - جمعه</span>
                                <span className="font-semibold text-dark">۸:۰۰ - ۱۸:۰۰</span>
                            </div>
                            <div className="flex justify-between">
                                <span>شنبه</span>
                                <span className="font-semibold text-dark">۹:۰۰ - ۱۵:۰۰</span>
                            </div>
                            <div className="flex justify-between">
                                <span>یکشنبه</span>
                                <span className="font-semibold text-dark">تعطیل</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h5 className="font-bold text-xl mb-4">گواهینامه‌ها</h5>
                        <ul className="space-y-2 text-paragray">
                            <li><i className="fas fa-check-circle text-secondary mr-2"></i>MBBS</li>
                            <li><i className="fas fa-check-circle text-secondary mr-2"></i>M.D Medicine</li>
                            <li><i className="fas fa-check-circle text-secondary mr-2"></i>Ph.D in Cardiology</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </>
  )
}

export default DoctorDetails
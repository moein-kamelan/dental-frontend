import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'

function ServiceDetails() {
  return (
    <>
    <Breadcrumb/>

      <section className="py-12">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
                {/* <!-- Main Content --> */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* <!-- Main Image with Icon --> */}
                        <div className="relative">
                            <img src="images/service_dtls-1.jpg" alt="service" className="w-full h-96 object-cover"/>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <i className="fas fa-heartbeat text-5xl text-primary"></i>
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-dark mb-6">جراحی تست قلب هولتر</h3>
                            
                            <div className="space-y-6 text-paragray leading-relaxed">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده</p>

                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی</p>

                                <ul className="space-y-3 list-disc list-inside">
                                    <li>به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب گرد ایجاد کنید</li>
                                    <li>اطلاعات اقتصادی مناسب بدون ترازهای قابل نگهداری</li>
                                    <li>به طور مشترک اطلاعات کلاس جهانی را پس از اصول محوری به اشتراک بگذارید</li>
                                    <li>شبکه‌سازی مشترک بهترین شیوه‌های آجر-و-کلیک از طریق اقتصادی مناسب</li>
                                    <li>اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد کنید</li>
                                </ul>

                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>

                                <h3 className="text-2xl font-bold text-dark mt-8 mb-4">توانایی‌ها</h3>

                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده</p>

                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Gallery --> */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="relative group cursor-pointer">
                            <img src="images/service_dtls-3.jpg" alt="gallery" className="rounded-2xl w-full h-48 object-cover"/>
                            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition rounded-2xl flex items-center justify-center">
                                <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <img src="images/service_dtls-4.jpg" alt="gallery" className="rounded-2xl w-full h-48 object-cover"/>
                            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition rounded-2xl flex items-center justify-center">
                                <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <img src="images/service_dtls-5.jpg" alt="gallery" className="rounded-2xl w-full h-48 object-cover"/>
                            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition rounded-2xl flex items-center justify-center">
                                <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Process Cards --> */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                            <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-eye text-3xl text-primary"></i>
                            </div>
                            <h5 className="font-bold text-xl mb-3">نوبت دهی</h5>
                            <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                            <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-heartbeat text-3xl text-primary"></i>
                            </div>
                            <h5 className="font-bold text-xl mb-3">چکاپ فوری</h5>
                            <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                            <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fad fa-capsules text-3xl text-primary"></i>
                            </div>
                            <h5 className="font-bold text-xl mb-3">پیگیری آزمایش</h5>
                            <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                        </div>
                    </div>

                    {/* <!-- Download Links --> */}
                    <div className="flex gap-4">
                        <a href="#" className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-lg transition flex items-center justify-center gap-3">
                            <i className="fas fa-file-pdf text-3xl text-red-600"></i>
                            <div>
                                <span className="block text-paragray">دانلود</span>
                                <span className="font-bold text-dark">PDF</span>
                            </div>
                        </a>
                        <a href="#" className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-lg transition flex items-center justify-center gap-3">
                            <i className="fas fa-file-word text-3xl text-blue-600"></i>
                            <div>
                                <span className="block text-paragray">دانلود</span>
                                <span className="font-bold text-dark">Doc</span>
                            </div>
                        </a>
                    </div>

                    {/* <!-- Comments --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">مجموع دیدگاه‌ها (۰۴)</h2>
                        
                        <div className="space-y-6">
                            {/* <!-- Comment 1 --> */}
                            <div className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                                <img src="images/comment-1.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold">محسن دادار</h4>
                                        <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۴ ساعت پیش</span>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                    </div>
                                    <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                    <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                </div>
                            </div>

                            {/* <!-- Reply --> */}
                            <div className="flex gap-4 mr-12 border-b pb-6 last:border-b-0 last:pb-0">
                                <img src="images/comment-2.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold">یلدا ملک پور</h4>
                                        <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۱ ساعت پیش</span>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                    </div>
                                    <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                    <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                </div>
                            </div>

                            {/* <!-- Comment 2 --> */}
                            <div className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                                <img src="images/comment-3.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold">نیما نوبخت</h4>
                                        <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۶ ساعت پیش</span>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                    </div>
                                    <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                    <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                </div>
                            </div>

                            {/* <!-- Comment 3 --> */}
                            <div className="flex gap-4">
                                <img src="images/comment-1.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold">رضا یزدانی</h4>
                                        <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۴ ساعت پیش</span>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                        <i className="fas fa-star text-yellow-400"></i>
                                    </div>
                                    <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                    <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Comment Form --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">ارسال دیدگاه</h2>
                        <div className="flex gap-1 mb-6">
                            <i className="fas fa-star text-yellow-400 text-2xl cursor-pointer"></i>
                            <i className="fas fa-star text-yellow-400 text-2xl cursor-pointer"></i>
                            <i className="fas fa-star text-yellow-400 text-2xl cursor-pointer"></i>
                            <i className="fas fa-star text-yellow-400 text-2xl cursor-pointer"></i>
                            <i className="fas fa-star text-yellow-400 text-2xl cursor-pointer"></i>
                        </div>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input type="text" placeholder="نام..." className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                                <input type="email" placeholder="ایمیل..." className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            </div>
                            <textarea rows={4} placeholder="ارسال دیدگاه..." className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"></textarea>
                            <button type="submit" className="bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold">
                                ارسال سریع
                            </button>
                        </form>
                    </div>
                </div>

                {/* <!-- Sidebar --> */}
                <div className="lg:col-span-1 space-y-6">
                    {/* <!-- Search --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h4 className="font-bold mb-4">جستجو</h4>
                        <form className="flex gap-2">
                            <input type="text" placeholder="جستجو..." className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none"/>
                            <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-deepblue transition">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>

                    {/* <!-- Categories --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h5 className="font-bold mb-4">دسته‌بندی</h5>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>اورولوژی</a></li>
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>متخصص زنان و زایمان</a></li>
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>پزشکی</a></li>
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>اطفال</a></li>
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>تست کرونا</a></li>
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>دندانپزشکی</a></li>
                        </ul>
                    </div>

                    {/* <!-- Recent Posts --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h5 className="font-bold mb-4">پست‌های جدید</h5>
                        <ul className="space-y-4">
                            <li className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                                <img src="images/blog_dtls-2.jpg" alt="post" className="w-24 h-24 rounded-lg object-cover flex-shrink-0"/>
                                <div>
                                    <p className="text-sm text-paragray mb-2"><i className="fas fa-calendar-alt ml-1"></i>۲۲ مهر ۱۴۰۲</p>
                                    <a href="#" className="text-dark hover:text-primary font-semibold">نکات ارزشمندی</a>
                                </div>
                            </li>
                            <li className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                                <img src="images/blog_dtls-3.jpg" alt="post" className="w-24 h-24 rounded-lg object-cover flex-shrink-0"/>
                                <div>
                                    <p className="text-sm text-paragray mb-2"><i className="fas fa-calendar-alt ml-1"></i>۲۱ بهمن ۱۴۰۲</p>
                                    <a href="#" className="text-dark hover:text-primary font-semibold">نکات ارزشمندی</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </>
    
  )
}

export default ServiceDetails
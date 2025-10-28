import React from 'react'

function BlogDetails() {
  return (
    <section className="py-12">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
                {/* <!-- Main Content --> */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* <!-- Image --> */}
                        <div className="relative">
                            <img src="images/blog_dtls-1.jpg" alt="blog" className="w-full h-96 object-cover"/>
                        </div>

                        {/* <!-- Header Info --> */}
                        <div className="p-8 border-b">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                <ul className="flex flex-wrap gap-6 text-paragray">
                                    <li><span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">پزشکی</span></li>
                                    <li className="flex items-center gap-2"><i className="far fa-user"></i>ادمین</li>
                                    <li className="flex items-center gap-2"><i className="far fa-calendar-alt"></i>۲۲ مهر ۱۴۰۲</li>
                                </ul>
                                <ul className="flex flex-wrap gap-6 text-paragray">
                                    <li className="flex items-center gap-2"><i className="far fa-comment"></i>۰۵</li>
                                    <li className="flex items-center gap-2"><i className="far fa-heart text-red-500"></i>۲۰</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-share-alt"></i>۱۵</li>
                                </ul>
                            </div>
                            <h2 className="text-3xl font-bold text-dark">نکات ارزشمندی که به شما کمک می کند بهتر شوید</h2>
                        </div>

                        {/* <!-- Content --> */}
                        <div className="p-8 space-y-6 text-paragray leading-relaxed">
                            <p>به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب گرد ایجاد کنید آمادگی وب به طور کامل بدون استفاده از اطلاعات اقتصادی مناسب ترازهای قابل نگهداری اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد کنید بهترین شیوه های تعاونی به صورت مشترک سندیکا</p>
                            
                            <p>از طریق بهترین شیوه های تعاونی به طور مشترک اطلاعات کلاس جهانی را به اشتراک بگذارید پس از آمادگی وب مبتنی بر اصول. بهترین شبکه‌سازی آجرها و کلیک‌ها اقدامات از طریق اقتصادی سالم.</p>

                            <p>به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب گرد ایجاد کنید آمادگی وب به طور کامل بدون استفاده از اطلاعات اقتصادی مناسب ترازهای قابل نگهداری اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد کنید بهترین شیوه های تعاونی به صورت مشترک سندیکا</p>

                            <ul className="space-y-3 list-disc list-inside">
                                <li>به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب گرد ایجاد کنید</li>
                                <li>اطلاعات اقتصادی مناسب بدون ترازهای قابل نگهداری</li>
                                <li>به طور مشترک اطلاعات کلاس جهانی را پس از اصول محوری به اشتراک بگذارید</li>
                                <li>شبکه‌سازی مشترک بهترین شیوه‌های آجر-و-کلیک از طریق اقتصادی مناسب</li>
                                <li>اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد کنید</li>
                            </ul>

                            <p>از طریق بهترین شیوه های تعاونی به طور مشترک اطلاعات کلاس جهانی را به اشتراک بگذارید پس از آمادگی وب مبتنی بر اصول. بهترین شبکه‌سازی آجرها و کلیک‌ها اقدامات از طریق اقتصادی سالم.</p>

                            <p>به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب گرد ایجاد کنید آمادگی وب به طور کامل بدون استفاده از اطلاعات اقتصادی مناسب ترازهای قابل نگهداری اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد کنید بهترین شیوه های تعاونی به صورت مشترک سندیکا</p>

                            {/* <!-- Quote --> */}
                            <div className="bg-gray-100 border-r-4 border-primary p-6 my-8 italic">
                                "انواع مختلفی از معابر Lorem Ipsum وجود دارد در دسترس است، اما اکثریت به نوعی با تغییراتی در قسمت ها دچار تغییر شده اند.
                            </div>

                            <p>به سادگی متن ساختگی صنعت چاپ و حروفچینی است. شده است صنعت است متن ساختگی استاندارد از دهه 1500، زمانی که یک چاپگر ناشناس یک گالری از نوع را گرفت و آن را به هم زد تا درست کند یک نوع کتاب نمونه</p>

                            <p>به سادگی متن ساختگی صنعت چاپ و حروفچینی. لورم ایپسوم دارد این صنعت در حال حاضر یک مانع است متن ساختگی استاندارد از سال 1500 تاکنون.</p>
                        </div>

                        {/* <!-- Tags and Share --> */}
                        <div className="p-8 border-t bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-3">
                                <span className="text-dark font-semibold">برچسب‌ها:</span>
                                <a href="#" className="bg-white px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">نوبت دهی</a>
                                <a href="#" className="bg-white px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">دکترها</a>
                                <a href="#" className="bg-white px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">سلامتی</a>
                                <a href="#" className="bg-white px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">بیمارستان</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-dark font-semibold">اشتراک گذاری:</span>
                                <a href="#" className="text-blue-600 hover:text-blue-700 text-xl"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-blue-400 hover:text-blue-500 text-xl"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-pink-600 hover:text-pink-700 text-xl"><i className="fab fa-instagram-square"></i></a>
                            </div>
                        </div>

                        {/* <!-- Comments Section --> */}
                        <div className="p-8 border-t">
                            <h2 className="text-2xl font-bold mb-6">دیدگاه‌ها (۰۴)</h2>

                            <div className="space-y-6">
                                {/* <!-- Comment 1 --> */}
                                <div className="flex gap-4">
                                    <img src="images/comment-1.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold">محسن دادار</h4>
                                            <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۴ ساعت پیش</span>
                                        </div>
                                        <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می رسد.</p>
                                        <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                    </div>
                                </div>

                                {/* <!-- Reply Comment --> */}
                                <div className="flex gap-4 mr-12">
                                    <img src="images/comment-2.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold">رضا زمانی</h4>
                                            <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۱ ساعت پیش</span>
                                        </div>
                                        <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                        <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                    </div>
                                </div>

                                {/* <!-- Comment 2 --> */}
                                <div className="flex gap-4">
                                    <img src="images/comment-3.png" alt="user" className="w-16 h-16 rounded-full flex-shrink-0"/>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold">یلدا ملک پور</h4>
                                            <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۶ ساعت پیش</span>
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
                                            <h4 className="font-bold">نیما نوبخت</h4>
                                            <span className="text-sm text-paragray"><i className="fal fa-clock ml-1"></i>۴ ساعت پیش</span>
                                        </div>
                                        <p className="text-paragray mb-2">اما اکثریت دچار تغییراتی به شکلی شده اند</p>
                                        <a href="#" className="text-primary hover:text-deepblue"><i className="fal fa-reply-all ml-1"></i>پاسخ</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Comment Form --> */}
                        <form className="p-8 border-t bg-gray-50">
                            <h2 className="text-2xl font-bold mb-6">ارسال دیدگاه</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <input type="text" placeholder="نام..." className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                                <input type="email" placeholder="ایمیل..." className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            </div>
                            <textarea rows={4} placeholder="دیدگاه خود را بنوسید..." className="w-full mt-6 px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"></textarea>
                            <button type="submit" className="mt-6 bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold">
                                ارسال کنید
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
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>تست کووید</a></li>
                            <li><a href="#" className="text-paragray hover:text-primary transition"><i className="far fa-angle-left ml-2"></i>دندانپزشکی</a></li>
                        </ul>
                    </div>

                    {/* <!-- Recent Posts --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h5 className="font-bold mb-4">پست‌های اخیر</h5>
                        <ul className="space-y-4">
                            <li className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                                <img src="images/blog_dtls-2.jpg" alt="post" className="w-24 h-24 rounded-lg object-cover flex-shrink-0"/>
                                <div>
                                    <p className="text-sm text-paragray mb-2"><i className="fas fa-calendar-alt ml-1"></i>۲۲ آذر ۱۴۰۲</p>
                                    <a href="#" className="text-dark hover:text-primary font-semibold">نکات ارزشمندی که به شما کمک می کند</a>
                                </div>
                            </li>
                            <li className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                                <img src="images/blog_dtls-3.jpg" alt="post" className="w-24 h-24 rounded-lg object-cover flex-shrink-0"/>
                                <div>
                                    <p className="text-sm text-paragray mb-2"><i className="fas fa-calendar-alt ml-1"></i>۲۲ خرداد ۱۴۰۲</p>
                                    <a href="#" className="text-dark hover:text-primary font-semibold">نکات ارزشمندی که به شما کمک می کند</a>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <img src="images/blog_dtls-4.jpg" alt="post" className="w-24 h-24 rounded-lg object-cover flex-shrink-0"/>
                                <div>
                                    <p className="text-sm text-paragray mb-2"><i className="fas fa-calendar-alt ml-1"></i>۲۲ بهمن ۱۴۰۲</p>
                                    <a href="#" className="text-dark hover:text-primary font-semibold">نکات ارزشمندی که به شما کمک می کند</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Tags --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h5 className="font-bold mb-4">برچسب‌ها</h5>
                        <div className="flex flex-wrap gap-2">
                            <a href="#" className="bg-gray-100 text-paragray px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">نوبت دهی</a>
                            <a href="#" className="bg-gray-100 text-paragray px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">پزشک</a>
                            <a href="#" className="bg-gray-100 text-paragray px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">سلامتی</a>
                            <a href="#" className="bg-gray-100 text-paragray px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">بیمارستان</a>
                            <a href="#" className="bg-gray-100 text-paragray px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">آزمایشگاه</a>
                            <a href="#" className="bg-gray-100 text-paragray px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">دکترها</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BlogDetails
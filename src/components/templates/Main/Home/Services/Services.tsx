import React from 'react'

function Services() {
  return (
      <section className="py-20 md:py-24 bg-[url('/public/images/service_bg.jpg')] relative">
        <div className="absolute inset-0 bg-[#ffffff9c]"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h5 className="custom-sub-title mx-auto">خدمات ما</h5>
                <h2 className="custom-title mt-2">سرویس های پزشکی ما</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="relative h-48">
                        <img src="images/service-1.jpg" alt="service" className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-eye text-primary text-2xl"></i>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-dark">مانیتورینگ آنلاین</h3>
                        <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        <a href="service_details.html" className="text-primary font-semibold flex items-center gap-2">
                            بیشتر بدانید <i className="far fa-long-arrow-left"></i>
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="relative h-48">
                        <img src="images/service-2.jpg" alt="service" className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-heartbeat text-secondary text-2xl"></i>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-dark">جراحی قلب هولتر</h3>
                        <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        <a href="service_details.html" className="text-primary font-semibold flex items-center gap-2">
                            بیشتر بدانید <i className="far fa-long-arrow-left"></i>
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="relative h-48">
                        <img src="images/service-3.jpg" alt="service" className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <i className="fad fa-capsules text-deepblue text-2xl"></i>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-dark">تشخیص و تحقیق</h3>
                        <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        <a href="service_details.html" className="text-primary font-semibold flex items-center gap-2">
                            بیشتر بدانید <i className="far fa-long-arrow-left"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services
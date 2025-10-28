import React from 'react'

function FAQSection() {
  return (
        <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h5 className="text-primary font-bold text-lg">سوالات متداول</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">سوالات خود را از ما بپرسید</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">

                <div className="space-y-4">
                    <details className="bg-white rounded-lg shadow-md p-6" open>
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between">
                            پس از ارائه نمونه من چه اتفاقی می‌افتد؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                        </p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between">
                            برای ارائه یک نمونه برای آزمایش به کجا می‌توانم مراجعه کنم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                        </p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between">
                            هزینه آزمایش آزمایشگاهی برای من چقدر است؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                        </p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between">
                            آیا می‌توانم از طریق تلفن قرار ملاقات بگذارم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                        </p>
                    </details>
                </div>
                
                <div className="relative">
                    <img src="images/faq-img.jpg" alt="faq" className="rounded-2xl w-full"/>
                    <a href="#" className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                            <i className="fas fa-play text-primary text-2xl mr-1"></i>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FAQSection
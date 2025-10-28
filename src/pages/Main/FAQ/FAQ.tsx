import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'

function FAQ() {
  return (
    <>
    <Breadcrumb/>

    <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* <!-- Column 1 --> */}
                <div className="space-y-4">
                    <details className="bg-white rounded-lg shadow-md p-6" open>
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            برای ارائه یک نمونه برای آزمایش به کجا می‌توانم مراجعه کنم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            پس از ارائه نمونه من چه اتفاقی می‌افتد؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            هزینه آزمایش آزمایشگاهی برای من چقدر است؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            آیا می‌توانم از طریق تلفن قرار ملاقات بگذارم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            استفاده از فناوری نوآورانه
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                    </details>
                </div>
                
                {/* <!-- Column 2 --> */}
                <div className="space-y-4">
                    <details className="bg-white rounded-lg shadow-md p-6" open>
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            چگونه می‌توانم نوبت بگیرم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            آیا می‌توانم نوبت خود را لغو کنم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            چه نوع بیمه‌ها قبول می‌کنید؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            ساعات کاری مطب چه ساعتی است؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    </details>
                    
                    <details className="bg-white rounded-lg shadow-md p-6">
                        <summary className="font-bold text-dark cursor-pointer flex items-center justify-between list-none">
                            چگونه به نتایج آزمایش خود دسترسی داشته باشم؟
                            <i className="fas fa-plus text-primary"></i>
                        </summary>
                        <p className="text-paragray mt-4 pt-4 border-t">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                    </details>
                </div>
            </div>
        </div>
    </section>


      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* <!-- Text Section --> */}
                <div className="lg:col-span-1">
                    <h3 className="text-3xl font-bold text-dark mb-6">آیا سوالی دارید؟</h3>
                    <div className="space-y-4 text-paragray leading-relaxed">
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                    </div>
                    <a href="contact.html" className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue transition font-semibold mt-6">
                        تماس با ما
                    </a>
                </div>

                {/* <!-- Form Section --> */}
                <div className="lg:col-span-2">
                    <form className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <input type="text" placeholder="نام" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            </div>
                            <div>
                                <input type="email" placeholder="ایمیل آدرس" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            </div>
                            <div>
                                <input type="text" placeholder="شماره همراه" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            </div>
                            <div>
                                <input type="text" placeholder="موضوع" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <input type="text" placeholder="خدمات" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                        </div>
                        <div className="mb-6">
                            <textarea rows={5} placeholder="پیام" className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"></textarea>
                        </div>
                        <button type="submit" className="bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold">
                            ارسال درخواست
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    
    </>
  )
}

export default FAQ
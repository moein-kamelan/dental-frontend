import React from 'react'

function Review() {
  return (
     <section className="py-20 md:py-24 bg-[rgba(94,94,238,0.10)]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h5 className="text-primary font-bold text-lg">دیدگاه کاربران</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">آنچه مشتری ما می‌گوید</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <p className="text-paragray mb-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    <div className="flex items-center gap-4">
                        <img src="images/review-1.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                        <div>
                            <h3 className="font-bold text-dark">محسن دادار</h3>
                            <span className="text-paragray text-sm">مشتری</span>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <p className="text-paragray mb-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    <div className="flex items-center gap-4">
                        <img src="images/review-2.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                        <div>
                            <h3 className="font-bold text-dark">یلدا ملک پور</h3>
                            <span className="text-paragray text-sm">مشتری</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <p className="text-paragray mb-6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    <div className="flex items-center gap-4">
                        <img src="images/review-3.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                        <div>
                            <h3 className="font-bold text-dark">نیما نوبخت</h3>
                            <span className="text-paragray text-sm">مشتری</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

  )
}

export default Review
import React from 'react'

function Process() {
  return (
      <section className="py-20 md:py-24 bg-gradient-to-l from-secondary to-primary">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12 text-white">
                <h5 className="font-bold text-lg">شیوه کار ما</h5>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">روند کاری ما</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                    <div className="text-4xl font-bold text-white mb-4">۰۱</div>
                    <h4 className="text-xl font-bold mb-3">فرم را پر کنید</h4>
                    <p className="text-sm opacity-90">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                
                <div className="bg-white/10  backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                    <div className="text-4xl font-bold text-white mb-4">۰۲</div>
                    <h4 className="text-xl font-bold mb-3">رزرو نوبت دکتر</h4>
                    <p className="text-sm opacity-90">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                    <div className="text-4xl font-bold text-white mb-4">۰۳</div>
                    <h4 className="text-xl font-bold mb-3">چک آپ</h4>
                    <p className="text-sm opacity-90">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                    <div className="text-4xl font-bold text-white mb-4">۰۴</div>
                    <h4 className="text-xl font-bold mb-3">دریافت گزارش</h4>
                    <p className="text-sm opacity-90">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Process
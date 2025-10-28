import React from 'react'

function ContactInfo() {
  return (
       <section className="py-12">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-map-marker-alt text-primary text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-xl mb-3">آدرس شرکت</h4>
                    <p className="text-paragray">فارس.شیراز.بلوار نیایش.ساختمان پرشکان</p>
                </div>

                
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <div className="w-20 h-20 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-phone-alt text-secondary text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-xl mb-3">شماره موبایل</h4>
                    <p className="text-paragray">+۸۸۰ ۱۲۳۴ ۶۷۲۱۴</p>
                    <p className="text-paragray">+۸۸۰ ۱۲۲۴۱ ۶۳۱۳۴</p>
                </div>

                
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <div className="w-20 h-20 bg-deepblue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-envelope-open text-deepblue text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-xl mb-3">ایمیل شرکت</h4>
                    <p className="text-paragray">example@gmail.com</p>
                    <p className="text-paragray">junayedallinone@gmail.com</p>
                </div>

                
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
                    <div className="w-20 h-20 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-globe text-yellow-600 text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-xl mb-3">شماره فکس</h4>
                    <p className="text-paragray">۱۲۳۱ ۴۳۱۴ ۰۲۱+</p>
                    <p className="text-paragray">۲۲۱۳ ۴۳۱۱ ۰۲۱+</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactInfo
import React from 'react'

function ContactForm() {
  return (
     <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

                <div className="hidden lg:block">
                    <img src="images/contact_img.jpg" alt="contact" className="rounded-2xl w-full"/>
                </div>
                

                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-dark mb-8">پیام خود را ارسال کنید</h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="نام*" className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            <input type="email" placeholder="ایمیل آدرس*" className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            <input type="text" placeholder="شماره موبایل*" className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            <input type="text" placeholder="موضوع*" className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                        </div>
                        <input type="text" placeholder="خدمات" className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                        <textarea rows={5} placeholder="پیام*" className="w-full px-6 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary resize-none"></textarea>
                        <button type="submit" className="w-full bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold">
                            ارسال کنید
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactForm
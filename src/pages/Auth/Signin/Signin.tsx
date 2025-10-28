import React from 'react'

function Signin() {
  return (
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-center mb-8">خوش آمدید</h2>
                <p className="text-center text-paragray mb-8">برای ادامه به حساب کاربری خود وارد شوید</p>
                
                <form className="space-y-6">
                    <div>
                        <label className="block text-dark font-semibold mb-2">ایمیل یا نام کاربری</label>
                        <input type="text" placeholder="ایمیل یا نام کاربری خود را وارد کنید" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                    </div>
                    
                    <div>
                        <label className="block text-dark font-semibold mb-2">رمز عبور</label>
                        <div className="relative">
                            <input type="password" placeholder="رمز عبور خود را وارد کنید" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                            <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 text-paragray hover:text-primary">
                                <i className="far fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-paragray">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                            <span className="text-sm">مرا به خاطر بسپار</span>
                        </label>
                        <a href="forgot_password.html" className="text-primary hover:text-deepblue text-sm">رمز عبور را فراموش کرده‌اید؟</a>
                    </div>
                    
                    <button type="submit" className="w-full bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold">
                        ورود به حساب کاربری
                    </button>
                    
                    <div className="text-center pt-4">
                        <p className="text-paragray mb-4">حساب کاربری ندارید؟</p>
                        <a href="sing_up.html" className="text-primary font-semibold hover:text-deepblue">
                            ثبت نام کنید
                        </a>
                    </div>
                    
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-paragray">یا</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <button type="button" className="w-full border border-gray-300 rounded-full py-4 hover:bg-gray-50 transition flex items-center justify-center gap-4">
                            <i className="fab fa-google text-red-500 text-xl"></i>
                            <span>ورود با گوگل</span>
                        </button>
                        <button type="button" className="w-full border border-gray-300 rounded-full py-4 hover:bg-gray-50 transition flex items-center justify-center gap-4">
                            <i className="fab fa-facebook text-blue-600 text-xl"></i>
                            <span>ورود با فیسبوک</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Signin
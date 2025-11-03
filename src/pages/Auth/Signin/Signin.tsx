import React, { use, useState } from 'react'
import CustomInput from '../../../components/modules/CustomInput/CustomInput'

function Signin() {
    const [mobileNumber , setMobileNumber] = useState("")
  return (
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-md">
            <div className="bg-gray-100 ring-2 inset- border-dark rounded-3xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-iran-yekan-bold text-center mb-8">خوش آمدید</h2>
                <p className="text-center text-paragray mb-8">برای ادامه به حساب کاربری خود وارد شوید</p>
                
                <form className="space-y-4">

<CustomInput inputType='phone' labelText='شماره تلفن' placeholder='شماره تلفن خود را وارد کنید *' value={mobileNumber} onChange={setMobileNumber}/>
                    
                    {/* <div>
                        <label className="block text-dark font-semibold mb-2">ایمیل یا نام کاربری</label>
                        <input type="text" placeholder="ایمیل یا نام کاربری خود را وارد کنید" className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"/>
                    </div> */}
                    
                 
                    
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
                    
             
            
                </form>
            </div>
        </div>
    </section>
  )
}

export default Signin
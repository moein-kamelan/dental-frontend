import React from 'react'

function Profile() {
  return (

                <div className="lg:col-span-3">
                    <div className="mb-8">
                        <h5 className="text-2xl font-bold mb-6">مشاهده کلی</h5>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* <!-- Stat Card 1 --> */}
                            <div className="bg-gradient-to-br from-primary to-deepblue text-white rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className="fal fa-handshake text-3xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90">تعداد نوبت ها</p>
                                        <h3 className="text-3xl font-bold">۲۵۵</h3>
                                        <p className="text-sm opacity-90">۱۵ روز</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Stat Card 2 --> */}
                            <div className="bg-gradient-to-br from-secondary to-green-600 text-white rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className="far fa-check-circle text-3xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90">نوبت های انجام شده</p>
                                        <h3 className="text-3xl font-bold">۲۲۰</h3>
                                        <p className="text-sm opacity-90">۱۲ روز</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Stat Card 3 --> */}
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className="far fa-file-alt text-3xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90">نوبت های معلق</p>
                                        <h3 className="text-3xl font-bold">۳۵</h3>
                                        <p className="text-sm opacity-90">۵ روز</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Stat Card 4 --> */}
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className="fas fa-hand-holding-usd text-3xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90">مجموع پرداخت</p>
                                        <h3 className="text-3xl font-bold">۲۵۵</h3>
                                        <p className="text-sm opacity-90">۱۵ روز</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Stat Card 5 --> */}
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className="fal fa-stars text-3xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90">مجموع بازدید</p>
                                        <h3 className="text-3xl font-bold">۲۲۰</h3>
                                        <p className="text-sm opacity-90">۵ روز</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Stat Card 6 --> */}
                            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className="far fa-snowflake text-3xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90">سایر موارد</p>
                                        <h3 className="text-3xl font-bold">۳۵</h3>
                                        <p className="text-sm opacity-90">۵ روز</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Profile Details --> */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-2xl font-bold">پروفایل من</h5>
                            <a href="dashboard_profile_edit.html" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-deepblue transition">
                                ویرایش
                            </a>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-b pb-4">
                                <span className="text-paragray">نام:</span>
                                <span className="font-semibold text-dark mr-3">محسن دادار</span>
                            </div>
                            <div className="border-b pb-4">
                                <span className="text-paragray">موبایل:</span>
                                <span className="font-semibold text-dark mr-3">۱۶۱۲۳۱ ۱۷۸۵۵۵ ۸۸۰+</span>
                            </div>
                            <div className="border-b pb-4">
                                <span className="text-paragray">ایمیل:</span>
                                <span className="font-semibold text-dark mr-3">example@gmail.com</span>
                            </div>
                            <div className="border-b pb-4">
                                <span className="text-paragray">جنسیت:</span>
                                <span className="font-semibold text-dark mr-3">مرد</span>
                            </div>
                            <div className="border-b pb-4">
                                <span className="text-paragray">وزن:</span>
                                <span className="font-semibold text-dark mr-3">۶۴ کیلوگرم</span>
                            </div>
                            <div className="border-b pb-4">
                                <span className="text-paragray">سن:</span>
                                <span className="font-semibold text-dark mr-3">۳۵</span>
                            </div>
                            <div className="border-b pb-4 md:col-span-2">
                                <span className="text-paragray">آدرس:</span>
                                <span className="font-semibold text-dark mr-3">شیراز. بلوار ارم. کوچه ۱۲</span>
                            </div>
                        </div>
                    </div>
                </div>
    
    
  )
}

export default Profile
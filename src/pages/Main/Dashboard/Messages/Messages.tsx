import React from 'react'

function Messages() {
  return (
      <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h5 className="text-2xl font-bold mb-6">پیام‌ها</h5>
                        
                        {/* <!-- Message List --> */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="border-2 border-primary bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition">
                                <div className="flex gap-4">
                                    <img src="images/massage-1.png" alt="person" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <h4 className="font-bold">رضا زمانی</h4>
                                        <p className="text-sm text-paragray truncate">لورم ایپسوم متن ساختگی...</p>
                                        <span className="text-xs text-paragray">۳۰ دقیقه پیش</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition">
                                <div className="flex gap-4">
                                    <img src="images/massage-2.png" alt="person" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <h4 className="font-bold">محمد اکبری</h4>
                                        <p className="text-sm text-paragray truncate">لورم ایپسوم متن...</p>
                                        <span className="text-xs text-paragray">۲۰ دقیقه پیش</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition">
                                <div className="flex gap-4">
                                    <img src="images/massage-3.png" alt="person" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <h4 className="font-bold">اصلان احمدی</h4>
                                        <p className="text-sm text-paragray truncate">متن پیام...</p>
                                        <span className="text-xs text-paragray">۱۰ دقیقه پیش</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition">
                                <div className="flex gap-4">
                                    <img src="images/massage-4.png" alt="person" className="w-16 h-16 rounded-full"/>
                                    <div className="flex-1">
                                        <h4 className="font-bold">لیلا مردای</h4>
                                        <p className="text-sm text-paragray truncate">پیام جدید...</p>
                                        <span className="text-xs text-paragray">یک ساعت پیش</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Chat Area --> */}
                        <div className="border-t pt-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src="images/massage-1.png" alt="person" className="w-12 h-12 rounded-full"/>
                                    <div>
                                        <h4 className="font-bold">رضا زمانی</h4>
                                        <span className="text-xs text-paragray">آنلاین</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="bg-white rounded-lg p-4 shadow">
                                        <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                                        <span className="text-xs text-paragray">۳۰ دقیقه پیش</span>
                                    </div>
                                    
                                    <div className="bg-primary text-white rounded-lg p-4 text-left">
                                        <p>ممنون از پیام شما</p>
                                        <span className="text-xs opacity-80">الان</span>
                                    </div>
                                </div>

                                <form className="flex gap-2">
                                    <input type="text" placeholder="پیام خود را بنویسید..." className="flex-1 px-4 py-3 border rounded-full"/>
                                    <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-deepblue transition">
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Messages
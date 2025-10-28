import React from 'react'

function MeetingHistory() {
  return (

     <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h5 className="text-2xl font-bold mb-6">تاریخچه نوبت‌ها</h5>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <tbody className="divide-y">
                                    <tr className="bg-gray-100">
                                        <td className="px-4 py-3 text-right font-semibold">ردیف</td>
                                        <td className="px-4 py-3 text-right font-semibold">بیمار</td>
                                        <td className="px-4 py-3 text-right font-semibold">ساعت</td>
                                        <td className="px-4 py-3 text-right font-semibold">شماره تراکنش</td>
                                        <td className="px-4 py-3 text-right font-semibold">روش پرداخت</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۱</td>
                                        <td className="px-4 py-3 font-semibold">نیما نوبخت</td>
                                        <td className="px-4 py-3 text-paragray">۰۵ مهر ۱۴۰۲, ۰۳:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF51568</td>
                                        <td className="px-4 py-3">زرین پال</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۲</td>
                                        <td className="px-4 py-3 font-semibold">لیلا زمانی</td>
                                        <td className="px-4 py-3 text-paragray">۰۲ مهر ۱۴۰۲, ۰۵:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF5156889</td>
                                        <td className="px-4 py-3">حواله بانکی</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۳</td>
                                        <td className="px-4 py-3 font-semibold">اکبر عبدی</td>
                                        <td className="px-4 py-3 text-paragray">۲۵ مهر ۱۴۰۲, ۰۲:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF515</td>
                                        <td className="px-4 py-3">پرداخت نقدی</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۴</td>
                                        <td className="px-4 py-3 font-semibold">حمید رحیمی</td>
                                        <td className="px-4 py-3 text-paragray">۱۵ دی ۱۴۰۲, ۰۳:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF51568</td>
                                        <td className="px-4 py-3">زیبال</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۵</td>
                                        <td className="px-4 py-3 font-semibold">رحمان احمدی</td>
                                        <td className="px-4 py-3 text-paragray">۰۲ دی ۱۴۰۲, ۰۵:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF5156889</td>
                                        <td className="px-4 py-3">حواله بانکی</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۶</td>
                                        <td className="px-4 py-3 font-semibold">رحیم غابدی</td>
                                        <td className="px-4 py-3 text-paragray">۲۵ خرداد ۱۴۰۲, ۰۲:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF515</td>
                                        <td className="px-4 py-3">پرداخت نقدی</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۷</td>
                                        <td className="px-4 py-3 font-semibold">علی زکانی</td>
                                        <td className="px-4 py-3 text-paragray">۱۶ خرداد ۱۴۰۲, ۰۳:۵۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF51568</td>
                                        <td className="px-4 py-3">زرین پال</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۸</td>
                                        <td className="px-4 py-3 font-semibold">مجید کریمی</td>
                                        <td className="px-4 py-3 text-paragray">۱۰ بهمن ۱۴۰۲, ۰۸:۳۰ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF51569</td>
                                        <td className="px-4 py-3">زرین پال</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 border-b">
                                        <td className="px-4 py-3">۹</td>
                                        <td className="px-4 py-3 font-semibold">مهدی عباس‌زاده</td>
                                        <td className="px-4 py-3 text-paragray">۰۵ بهمن ۱۴۰۲, ۱۰:۱۵ صبح</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF51570</td>
                                        <td className="px-4 py-3">حواله بانکی</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3">۱۰</td>
                                        <td className="px-4 py-3 font-semibold">سامان موسوی</td>
                                        <td className="px-4 py-3 text-paragray">۰۱ بهمن ۱۴۰۲, ۱۴:۲۰ عصر</td>
                                        <td className="px-4 py-3 text-primary">#FB1234124OPF51571</td>
                                        <td className="px-4 py-3">پرداخت نقدی</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <!-- Pagination --> */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex gap-2 items-center">
                                <a href="#" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition">
                                    <i className="far fa-angle-double-right"></i>
                                </a>
                                <a href="#" className="px-4 py-2 rounded-lg bg-primary text-white border-primary">۰۱</a>
                                <a href="#" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition">۰۲</a>
                                <a href="#" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition">۰۳</a>
                                <a href="#" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition">
                                    <i className="far fa-angle-double-left"></i>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
    
  )
}

export default MeetingHistory
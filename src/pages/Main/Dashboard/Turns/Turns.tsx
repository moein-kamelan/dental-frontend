import React from 'react'

function Turns() {
  return (
   <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h5 className="text-2xl font-bold mb-6">تاریخچه نوبت‌ها</h5>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-right font-semibold">ردیف</th>
                                        <th className="px-4 py-3 text-right font-semibold">دکتر</th>
                                        <th className="px-4 py-3 text-right font-semibold">تاریخ</th>
                                        <th className="px-4 py-3 text-right font-semibold">اتاق</th>
                                        <th className="px-4 py-3 text-right font-semibold">وضعیت</th>
                                        <th className="px-4 py-3 text-right font-semibold">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-4">۱</td>
                                        <td className="px-4 py-4">
                                            <p className="font-semibold">دکتر نوبخت</p>
                                            <span className="text-sm text-paragray">دندانپزشک</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p>۰۵ مهر ۱۴۰۲</p>
                                            <span className="text-sm text-paragray">۴:۳۰ عصر</span>
                                        </td>
                                        <td className="px-4 py-4">اتاق ۴۱۲. بیمارستان نمازی</td>
                                        <td className="px-4 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">انجام شده</span></td>
                                        <td className="px-4 py-4"><a href="#" className="text-primary hover:text-deepblue">ویرایش</a></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-4">۲</td>
                                        <td className="px-4 py-4">
                                            <p className="font-semibold">دکتر رضایی</p>
                                            <span className="text-sm text-paragray">قلب و عروق</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p>۰۸ مهر ۱۴۰۲</p>
                                            <span className="text-sm text-paragray">۴:۳۰ عصر</span>
                                        </td>
                                        <td className="px-4 py-4">اتاق ۴. بیمارستان رجایی</td>
                                        <td className="px-4 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">در انتظار</span></td>
                                        <td className="px-4 py-4"><a href="#" className="text-primary hover:text-deepblue">ویرایش</a></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-4">۳</td>
                                        <td className="px-4 py-4">
                                            <p className="font-semibold">دکتر ملک پور</p>
                                            <span className="text-sm text-paragray">اطفال</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p>۱۰ مهر ۱۴۰۲</p>
                                            <span className="text-sm text-paragray">۱۰:۰۰ صبح</span>
                                        </td>
                                        <td className="px-4 py-4">اتاق ۲۰۱. بیمارستان</td>
                                        <td className="px-4 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">انجام شده</span></td>
                                        <td className="px-4 py-4"><a href="#" className="text-primary hover:text-deepblue">ویرایش</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
  )
}

export default Turns
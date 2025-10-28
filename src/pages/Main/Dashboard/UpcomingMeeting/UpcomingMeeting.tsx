import React from 'react'

function UpcomingMeeting() {
  return (
     <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h5 className="text-2xl font-bold mb-6">نوبت‌های آینده</h5>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-right font-semibold">ردیف</th>
                                        <th className="px-4 py-3 text-right font-semibold">دکتر</th>
                                        <th className="px-4 py-3 text-right font-semibold">تاریخ</th>
                                        <th className="px-4 py-3 text-right font-semibold">مدت زمان</th>
                                        <th className="px-4 py-3 text-right font-semibold">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-4">1</td>
                                        <td className="px-4 py-4 font-semibold">دکتر رحیمی</td>
                                        <td className="px-4 py-4">
                                            <p>۰۵ مهر ۱۴۰۲</p>
                                            <span className="text-sm text-paragray">۴:۳۰ عصر</span>
                                        </td>
                                        <td className="px-4 py-4">۳۰ دقیقه</td>
                                        <td className="px-4 py-4">
                                            <div className="flex gap-2">
                                                <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">تایید</button>
                                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">کنسل</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-4">۲</td>
                                        <td className="px-4 py-4 font-semibold">دکتر نوبخت</td>
                                        <td className="px-4 py-4">
                                            <p>۱۵ مهر ۱۴۰۲</p>
                                            <span className="text-sm text-paragray">۱۴:۳۰</span>
                                        </td>
                                        <td className="px-4 py-4">۶۰ دقیقه</td>
                                        <td className="px-4 py-4">
                                            <div className="flex gap-2">
                                                <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">تایید</button>
                                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">کنسل</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
  )
}

export default UpcomingMeeting
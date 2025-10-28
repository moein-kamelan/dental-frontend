import React from 'react'

function SearchForm() {
  return (
      <section className="mb-12">
        <div className="container mx-auto px-4">
            <form className="bg-white rounded-2xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <select className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary">
                        <option>شهر</option>
                        <option>شیراز</option>
                        <option>تهران</option>
                        <option>اصفهان</option>
                    </select>
                    <select className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary">
                        <option>نوع پزشک</option>
                        <option>قلب و عروق</option>
                        <option>چشم پزشکی</option>
                        <option>اطفال</option>
                    </select>
                    <select className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary">
                        <option>ساعت</option>
                        <option>از ۸ تا ۱۰ صبح</option>
                        <option>از ۱۰ تا ۱۲ صبح</option>
                        <option>از ۲ تا ۴ عصر</option>
                    </select>
                    <div className="relative">
                        <input type="text" placeholder="جستجو.." className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-primary pr-12"/>
                        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"><i className="far fa-search"></i></button>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default SearchForm
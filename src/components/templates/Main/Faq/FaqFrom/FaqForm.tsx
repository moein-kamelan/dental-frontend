import React from 'react'

function FaqForm() {
  return (
    <div className="lg:col-span-2">
    <form className=" ">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <input
            type="text"
            placeholder="نام"
            className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="ایمیل آدرس"
            className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="شماره همراه"
            className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="موضوع"
            className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="خدمات"
          className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <textarea
          rows={5}
          placeholder="پیام"
          className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue   main-btn max-sm:w-full"
      >
        ارسال درخواست
      </button>
    </form>
  </div>
  )
}

export default FaqForm

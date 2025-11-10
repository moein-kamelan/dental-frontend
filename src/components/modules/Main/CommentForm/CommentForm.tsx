import React from 'react'

function CommentForm() {
  return (
      <div className="p-4 md:p-7.5 section-border rounded-[10px]">
                <h2 className="text-2xl font-estedad-semibold text-dark mb-6">
                  ارسال دیدگاه
                </h2>
                <div className="flex gap-1 mb-6">
                  <i className="fas fa-star text-secondary text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-secondary text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-secondary text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-secondary text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-secondary text-xl cursor-pointer"></i>
                </div>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="نام..."
                      className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-accent"
                    />
                    <input
                      type="email"
                      placeholder="ایمیل..."
                      className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-accent"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="ارسال دیدگاه..."
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-accent"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-accent text-white px-8 py-4 rounded-full hover:bg-secondary transition font-semibold"
                  >
                    ارسال سریع
                  </button>
                </form>
              </div>
  )
}

export default CommentForm
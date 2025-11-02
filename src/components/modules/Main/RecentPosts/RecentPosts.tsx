import React from 'react'

function RecentPosts() {
  return (
       <div className="section-border  p-6">
                <h5 className="main-header mb-4">پست‌های جدید</h5>
                <ul className="space-y-4">
                  <li className="flex gap-3  ">
                    <img
                      src="/images/blog_dtls-2.jpg"
                      alt="post"
                      className="size-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="">
                      <p className="font-estedad-light text-paragray mb-2 ">
                        <i className="fas fa-calendar-alt ml-1 text-primary "></i>۲۲ مهر ۱۴۰۲
                      </p>
                      <a
                        href="#"
                        className=" text-dark hover:text-primary w-full line-clamp-2 "
                      >
                        نکات ارزشمندی یبشسیب سشبسی یبشیسب
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3  ">
                    <img
                      src="/images/blog_dtls-2.jpg"
                      alt="post"
                      className="size-20 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <p className="font-estedad-light text-paragray mb-2 ">
                        <i className="fas fa-calendar-alt ml-1 text-primary "></i>۲۲ مهر ۱۴۰۲
                      </p>
                      <a
                        href="#"
                        className=" text-dark hover:text-primary w-full line-clamp-2"
                      >
                        نکات ارزشمندی
                      </a>
                    </div>
                  </li>
                 
                </ul>
              </div>
  )
}

export default RecentPosts
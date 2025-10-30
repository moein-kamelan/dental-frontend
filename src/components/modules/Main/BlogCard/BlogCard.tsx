import React from 'react'

function BlogCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group/card">
                    <div className="relative h-64">
                        <img src="images/blog-1.jpg" alt="blog" className="w-full h-full object-cover group-hover/card:scale-105 transition-all duration-800"/>
                        <a href="#" className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">دارو</a>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex flex-wrap gap-6 text-sm text-paragray">
                            <span className='flex items-center gap-2'><i className="fas fa-user mr-1 text-primary"></i>ادمین</span>
                            <span className='flex items-center gap-2'><i className="fas fa-calendar-alt mr-1 text-primary"></i>۲ مهر ۱۴۰۲</span>
                        </div>
                        <h3 className="text-xl  text-dark hover:text-primary transition-colors duration-500">
                            <a href="blog_details.html" className='font-estedad-lightbold text-[22px] lg:text-2xl line-clamp-2'>خدمات بهداشتی از راه دور آماده کمک هستند</a>
                        </h3>
                        <p className="text-paragray font-estedad-light line-clamp-2">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                        <div className="flex justify-between items-center pt-4 ">
                            <a href="blog_details.html" className="text-dark hover:text-primary  flex items-center gap-2 transition-colors duration-500 text-sm md:text-base">
                                بیشتر بخوانید <i className="fas fa-long-arrow-alt-left"></i>
                            </a>
                            <div className="flex gap-4 md:gap-6 text-paragray text-sm">
                                <span className='flex items-center gap-1 '><i className=" text-sm lg:text-base fas fa-comment"></i> ۵</span>
                                <span className='flex items-center gap-1 '><i className=" text-sm lg:text-base fas fa-heart"></i> ۲۰</span>
                                <span className='flex items-center gap-1 '><i className=" text-sm lg:text-base fas fa-share-alt"></i> ۱۵</span>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default BlogCard
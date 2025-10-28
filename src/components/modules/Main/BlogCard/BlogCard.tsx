import React from 'react'

function BlogCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="relative h-64">
                        <img src="images/blog-1.jpg" alt="blog" className="w-full h-full object-cover"/>
                        <a href="#" className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">دارو</a>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex flex-wrap gap-4 text-sm text-paragray">
                            <span><i className="fas fa-user mr-1"></i>ادمین</span>
                            <span><i className="fas fa-calendar-alt mr-1"></i>۲ مهر ۱۴۰۲</span>
                        </div>
                        <h3 className="text-xl font-bold text-dark hover:text-primary">
                            <a href="blog_details.html">خدمات بهداشتی از راه دور آماده کمک هستند</a>
                        </h3>
                        <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                        <div className="flex justify-between items-center pt-4 border-t">
                            <a href="blog_details.html" className="text-primary font-semibold flex items-center gap-2">
                                بیشتر بخوانید <i className="far fa-long-arrow-left"></i>
                            </a>
                            <div className="flex gap-4 text-paragray text-sm">
                                <span><i className="fas fa-comment-lines"></i> ۵</span>
                                <span><i className="fas fa-heart"></i> ۲۰</span>
                                <span><i className="fas fa-share-alt"></i> ۱۵</span>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default BlogCard
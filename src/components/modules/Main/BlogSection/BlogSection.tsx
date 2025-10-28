import React from 'react'
import BlogCard from '../BlogCard/BlogCard'

function BlogSection() {
  return (
    <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h5 className="text-primary font-bold text-lg">آخرین اخبار</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">جدیدترین مطالب و مقالات</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         <BlogCard/>
         <BlogCard/>
         <BlogCard/>
         



            </div>
        </div>
    </section>
  )
}

export default BlogSection
import React from 'react'
import BlogCard from '../BlogCard/BlogCard'
import {motion} from 'motion/react';

function BlogSection() {
  return (
    <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
                              <motion.div
          className=""
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
          
            <div className="text-center mb-12">
                <h5 className="custom-sub-title mx-auto">آخرین اخبار</h5>
                <h2 className="custom-title text-center">جدیدترین مطالب و مقالات</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         <BlogCard/>
         <BlogCard/>
         <BlogCard/>
         



            </div>

          </motion.div>
          
          
        </div>
    </section>
  )
}

export default BlogSection
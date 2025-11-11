import React from 'react'
import BlogCard from '../BlogCard/BlogCard'
import {motion} from 'motion/react';
import { useGetAllArticles } from '../../../../hooks/useArticles';
import type { Article } from '../../../../types/types';
function BlogSection() {
  const { data: articles } = useGetAllArticles(1, 3);
  return (
    <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
                              <motion.div
          className=""
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
          
            <div className="text-center mb-12">
                <h5 className="custom-sub-title mx-auto">آخرین اخبار</h5>
                <h2 className="custom-title text-center">جدیدترین مطالب و مقالات</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         {articles?.data?.articles.map((article: Article) => (
          <BlogCard key={article.id} article={article} />
         ))}
         



            </div>

          </motion.div>
          
          
        </div>
    </section>
  )
}

export default BlogSection

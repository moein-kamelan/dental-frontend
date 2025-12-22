import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useGetAllArticles } from "../../../../services/useArticles";
import type { Article } from "../../../../types/types";

function BlogSection() {
  const { data: articles } = useGetAllArticles(1, 3, "", true);
  
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20 text-accent font-estedad-semibold">
              <i className="fas fa-newspaper"></i>
              آخرین اخبار
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-estedad-verybold text-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            جدیدترین مطالب و مقالات
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6"></div>
          <motion.p
            className="text-paragray text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            با آخرین مقالات و مطالب مفید در زمینه سلامت و دندانپزشکی همراه باشید
          </motion.p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {articles?.data?.articles.map((article: Article, index: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogCard article={article} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {articles?.data?.articles && articles.data.articles.length > 0 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-primary text-white rounded-2xl font-estedad-bold hover:from-secondary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>مشاهده همه مقالات</span>
              <i className="fas fa-arrow-left"></i>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default BlogSection;

import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'
import BlogCard from '../../../components/modules/Main/BlogCard/BlogCard'

function Blog() {
  return (
    <>
    <Breadcrumb/>
   <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>

              
            </div>

            <div className="flex justify-center mt-12 gap-2">
                <a href="#" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-deepblue">1</a>
                <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">2</a>
                <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">3</a>
                <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">»</a>
            </div>
        </div>
    </section>
    
    </>
  )
}

export default Blog
import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'
import SEO from '../../../components/SEO/SEO'

function Gallery() {
  return (
    <>
    <SEO
      title="گالری تصاویر - کلینیک دندان پزشکی طاها"
      description="گالری تصاویر کلینیک دندان پزشکی طاها - مشاهده تصاویر محیط کلینیک، تجهیزات و نمونه کارهای انجام شده"
      keywords="گالری, تصاویر کلینیک, محیط کلینیک, تجهیزات دندانپزشکی, کلینیک طاها"
      url="/gallery"
    />
    <Breadcrumb/>

       <section className="pt-6 pb-12">
        <div className="container mx-auto px-4">

            <div className="grid grid-cols-3 grid-rows-[420px_420px_420px]  gap-8">


                   <div className="relative group cursor-pointer h-full">
                        <img src="images/gallary-1.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>


                        
                    <div className="relative group cursor-pointer h-full row-span-2">
                        <img src="images/gallary-6.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                       <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>
                    


                            <div className="relative group cursor-pointer h-full">
                        <img src="images/gallary-2.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                       <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>
                    
                

                
                    <div className="relative group cursor-pointer h-full">
                        <img src="images/gallary-3.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>
                
                
                
                
                
                    <div className="relative group cursor-pointer h-full">
                        <img src="images/gallary-4.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                       <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>
                
                
                
                    <div className="relative group cursor-pointer h-full">
                        <img src="images/gallary-5.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>
                
            
                
                
                    <div className="relative group cursor-pointer h-full col-span-2">
                        <img src="images/gallary-7.jpg" alt="gallery" className="rounded-2xl w-full h-full"/>
                       <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 scale-80 group-hover:scale-100 transition duration-600 rounded-2xl flex items-center justify-center">
                            <div className='p-5 border-2 border-white rounded-full'>
                            <i className="fa fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>

                            </div>
                        </div>
                    </div>
                
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

export default Gallery
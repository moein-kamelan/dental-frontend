import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'

function Gallery() {
  return (
    <>
    <Breadcrumb/>

       <section className="py-12">
        <div className="container mx-auto px-4">

            <div className="columns-1 md:columns-3 gap-4">
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-1.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-2.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-3.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-4.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-5.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-6.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="relative group cursor-pointer">
                        <img src="images/gallary-7.jpg" alt="gallery" className="rounded-2xl w-full"/>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-80 transition rounded-2xl flex items-center justify-center">
                            <i className="fal fa-plus text-white text-4xl opacity-0 group-hover:opacity-100 transition"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    
    </>
  )
}

export default Gallery
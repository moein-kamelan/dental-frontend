import React from 'react'
function ServiceCard() {
  return (
             <div className="bg-white rounded-[10px] overflow-hidden shadow-lg hover:shadow-xl transition p-5">
                    <div className="relative h-64">
                        <img src="images/service-1.jpg" alt="service" className="w-full h-full object-cover rounded-[5px]"/>
                        <div className="absolute translate-y-1/2 bottom-0 left-4 w-16 h-16 bg-secondary  flex items-center justify-center shadow-lg rounded-[10px]">
                            <i className="fas fa-eye text-white  text-2xl"></i>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-2xl sm:text-[18px] md:text-2xl font-estedad-semibold text-dark">مانیتورینگ آنلاین</h3>
                        <p className="text-paragray font-estedad-light line-clamp-2 mt-2.5 mb-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        <a href="service_details.html" className="text-dark font-estedad-semibold flex items-center gap-2">
                            بیشتر بدانید 
                            <i className="fa fa-arrow-left text-xl text-dark"></i>
                        </a>
                    </div>
                </div>

  )
}

export default ServiceCard
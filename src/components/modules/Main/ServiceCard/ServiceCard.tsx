import React from 'react'

function ServiceCard() {
  return (
             <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div className="relative h-64">
                        <img src="images/service-1.jpg" alt="service" className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <i className="fas fa-eye text-primary text-2xl"></i>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-dark">مانیتورینگ آنلاین</h3>
                        <p className="text-paragray">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        <a href="service_details.html" className="text-primary font-semibold flex items-center gap-2">
                            بیشتر بدانید <i className="far fa-long-arrow-left"></i>
                        </a>
                    </div>
                </div>

  )
}

export default ServiceCard
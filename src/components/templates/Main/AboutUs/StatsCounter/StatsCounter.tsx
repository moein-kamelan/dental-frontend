import React from 'react'

function StatsCounter() {
  return (
     <section className="py-20 bg-cover bg-center" style={{backgroundImage: "url('images/counter_bg.jpg')" ,backgroundColor: "rgba(0, 166, 251, 0.9)", backgroundBlendMode: "overlay"}}>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center text-white bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-20 h-20 bg-primary bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-users text-3xl text-white"></i>
                    </div>
                    <h4 className="text-4xl font-bold mb-2">۹۵۰</h4>
                    <p className="text-white opacity-90">رضایت بیماران</p>
                </div>
                
                <div className="text-center text-white bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-20 h-20 bg-secondary bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-user-md text-3xl text-white"></i>
                    </div>
                    <h4 className="text-4xl font-bold mb-2">۲۵۶</h4>
                    <p className="text-white opacity-90">تعداد پزشک متخصص</p>
                </div>
                
                <div className="text-center text-white bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-20 h-20 bg-yellow-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-trophy-alt text-3xl text-white"></i>
                    </div>
                    <h4 className="text-4xl font-bold mb-2">۹۰</h4>
                    <p className="text-white opacity-90">برنده جایزه</p>
                </div>
                
                <div className="text-center text-white bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="w-20 h-20 bg-red-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="far fa-stars text-3xl text-white"></i>
                    </div>
                    <h4 className="text-4xl font-bold mb-2">۴.۹</h4>
                    <p className="text-white opacity-90">میانگین امتیاز</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default StatsCounter
import React from 'react'

function Team() {
  return (
        <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h5 className="text-primary font-bold text-lg">تیم ما</h5>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">با پزشک متخصص ما آشنا شوید</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                    <div className="relative overflow-hidden">
                        <img src="images/team-1.jpg" alt="team" className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"/>
                        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ul className="flex gap-4 text-white text-xl">
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6">
                        <h6 className="text-xl font-bold text-dark">دکتر محسن دادار</h6>
                        <p className="text-primary font-semibold">عصب شناسی</p>
                        <span className="text-paragray text-sm">MBBS, FCPS, FRCS</span>
                        <a href="doctor_details.html" className="mt-4 inline-block text-primary hover:text-deepblue">
                            <i className="fal fa-plus"></i>
                        </a>
                    </div>
                </div>
                
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                    <div className="relative overflow-hidden">
                        <img src="images/team-2.jpg" alt="team" className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"/>
                        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ul className="flex gap-4 text-white text-xl">
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6">
                        <h6 className="text-xl font-bold text-dark">دکتر نوبخت</h6>
                        <p className="text-primary font-semibold">قلب و عروق</p>
                        <span className="text-paragray text-sm">MBBS, FCPS, FRCS</span>
                        <a href="doctor_details.html" className="mt-4 inline-block text-primary hover:text-deepblue">
                            <i className="fal fa-plus"></i>
                        </a>
                    </div>
                </div>
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                    <div className="relative overflow-hidden">
                        <img src="images/team-3.jpg" alt="team" className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"/>
                        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ul className="flex gap-4 text-white text-xl">
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6">
                        <h6 className="text-xl font-bold text-dark">دکتر زارع</h6>
                        <p className="text-primary font-semibold">چشم پزشکی</p>
                        <span className="text-paragray text-sm">MBBS, FCPS, FRCS</span>
                        <a href="doctor_details.html" className="mt-4 inline-block text-primary hover:text-deepblue">
                            <i className="fal fa-plus"></i>
                        </a>
                    </div>
                </div>
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                    <div className="relative overflow-hidden">
                        <img src="images/team-4.jpg" alt="team" className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"/>
                        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-80 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ul className="flex gap-4 text-white text-xl">
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6">
                        <h6 className="text-xl font-bold text-dark">دکتر ملک پور</h6>
                        <p className="text-primary font-semibold">اطفال</p>
                        <span className="text-paragray text-sm">MBBS, FCPS, FRCS</span>
                        <a href="doctor_details.html" className="mt-4 inline-block text-primary hover:text-deepblue">
                            <i className="fal fa-plus"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-12">
                <a href="doctor.html" className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue transition font-semibold">
                    مشاهده همه
                </a>
            </div>
        </div>
    </section>
  )
}

export default Team
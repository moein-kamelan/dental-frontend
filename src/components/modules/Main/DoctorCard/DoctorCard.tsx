import React from 'react'

function DoctorCard() {
  return (
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
                        <h6 className="text-xl font-bold text-dark">دکتر دادار</h6>
                        <p className="text-primary font-semibold">عصب شناسی</p>
                        <span className="text-paragray text-sm block mb-2">MBBS, FCPS, FRCS</span>
                        <a href="doctor_details.html" className="text-primary hover:text-deepblue"><i className="fal fa-plus"></i></a>
                    </div>
                </div>
  )
}

export default DoctorCard
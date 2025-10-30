import React from 'react'
import DoctorCard from '../DoctorCard/DoctorCard'

function Team() {
  return (
        <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h5 className="custom-sub-title mx-auto">تیم ما</h5>
                <h2 className="custom-title text-center">با پزشک متخصص ما آشنا شوید</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
                <DoctorCard/>
                <DoctorCard/>
                <DoctorCard/>
                <DoctorCard/>
                
            </div>
            
            <div className="text-center mt-12">
                <a href="doctor.html" className="main-btn">
                    مشاهده همه
                </a>
            </div>
        </div>
    </section>
  )
}

export default Team
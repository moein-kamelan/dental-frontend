import React from 'react'
import DoctorCard from '../DoctorCard/DoctorCard'
import {motion} from 'motion/react';
import { Link } from 'react-router-dom';
function Team() {
  return (
        <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
                   <motion.div
          className="space-y-6"
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
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


          </motion.div>
            
            <div className="text-center mt-12">
                <Link to={"/doctors"} className="main-btn">
                    مشاهده همه
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Team
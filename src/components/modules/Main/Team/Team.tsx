import React from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useGetAllDoctors } from "../../../../services/useDoctors";
import type { Doctor } from "../../../../types/types";

function Team() {
  const { data: doctors } = useGetAllDoctors(1, 4);
  const totalDoctors = doctors?.meta?.total || 0;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
        >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20 text-accent font-estedad-semibold">
              <i className="fas fa-user-md"></i>
              تیم ما
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4"
            style={{ fontFamily: 'var(--font-vazir)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
              با دندان پزشکان مجرب ما آشنا شوید
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6"></div>
          <motion.p
            className="text-paragray text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            تیمی از متخصصان با تجربه و حرفه‌ای در خدمت شما
          </motion.p>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {doctors?.data?.doctors.map((doctor: Doctor, index: number) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-primary text-white rounded-2xl font-estedad-bold hover:from-secondary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>مشاهده همه پزشکان</span>
            <i className="fas fa-arrow-left"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Team;

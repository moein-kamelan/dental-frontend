import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import type { Doctor } from "../../../../types/types";
import { stripHtmlTags, getImageUrl } from "../../../../utils/helpers";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";

interface DoctorCardProps {
  doctor?: Doctor;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();
  const { openModal } = useAppointmentModal();

  const handleCardClick = () => {
    if (doctor) {
      navigate(`/doctors/${doctor.slug}`);
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleBookAppointment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (doctor?.id && doctor?.isAppointmentEnabled) {
      openModal(doctor.id);
    }
  };

  // اگر doctor وجود نداشته باشد، چیزی نمایش نده
  if (!doctor) {
    return null;
  }

  const biography = stripHtmlTags(doctor.biography || "");
  const skills = doctor.skills?.slice(0, 2).join("، ") || "";

  return (
    <motion.div
      onClick={handleCardClick}
      className="group/card bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-accent/30 flex flex-col h-full relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative overflow-hidden shrink-0 h-72">
        <motion.img
          src={
            doctor?.profileImage
              ? getImageUrl(doctor.profileImage)
              : "/images/team-1.jpg"
          }
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badge for Appointment Status */}
        {doctor.isAppointmentEnabled && (
          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-full text-xs font-estedad-semibold shadow-lg flex items-center gap-1.5">
            <i className="fas fa-check-circle text-xs"></i>
            <span>قابل رزرو</span>
          </div>
        )}

        {/* View Details Button (appears on hover) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          <motion.button
            onClick={handleCardClick}
            className="bg-white text-primary px-6 py-3 rounded-full font-estedad-semibold shadow-xl flex items-center gap-2 hover:bg-accent hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-eye"></i>
            <span>مشاهده پروفایل</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col px-6 py-5 bg-gradient-to-b from-white to-gray-50/50">
        {/* Doctor Name */}
        <motion.h3
          className="text-xl font-estedad-bold text-dark mb-2 line-clamp-1 group-hover/card:text-accent transition-colors duration-300"
          layout
        >
          دکتر {doctor.firstName} {doctor.lastName}
        </motion.h3>

        {/* Skills/Qualifications */}
        {skills && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <i className="fas fa-graduation-cap text-accent text-sm"></i>
            <span className="text-sm text-paragray font-estedad-medium line-clamp-1">
              {skills}
            </span>
          </div>
        )}

        {/* Biography Preview */}
        {biography && (
          <p className="text-sm text-paragray font-estedad-light leading-relaxed line-clamp-3 mb-4 flex-1">
            {biography}
          </p>
        )}

        {/* University */}
        {doctor.university && (
          <div className="flex items-center gap-2 mb-4 text-xs text-paragray">
            <i className="fas fa-university text-accent/70"></i>
            <span className="font-estedad-medium">{doctor.university}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto space-y-2 pt-3 border-t border-gray-100">
          {doctor.isAppointmentEnabled ? (
            <motion.button
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-accent to-primary text-white py-3 px-4 rounded-xl font-estedad-semibold hover:from-secondary hover:to-accent transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-calendar-check"></i>
              <span>رزرو نوبت</span>
            </motion.button>
          ) : (
            <div className="w-full bg-gray-100 text-paragray py-3 px-4 rounded-xl font-estedad-semibold text-center cursor-not-allowed">
              <i className="fas fa-calendar-times ml-2"></i>
              <span>در حال حاضر غیرفعال</span>
            </div>
          )}
          
          <motion.button
            onClick={handleCardClick}
            className="w-full border-2 border-accent text-accent py-2.5 px-4 rounded-xl font-estedad-semibold hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-user-md"></i>
            <span>مشاهده جزئیات</span>
          </motion.button>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl pointer-events-none"></div>
    </motion.div>
  );
}

export default DoctorCard;

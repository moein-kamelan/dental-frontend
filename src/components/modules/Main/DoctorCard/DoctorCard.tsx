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
      className="group/card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 flex flex-col h-full relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container - Minimalist */}
      <div className="relative overflow-hidden shrink-0 h-64 bg-gray-50">
        {doctor?.profileImage ? (
          <img
            src={getImageUrl(doctor.profileImage)}
            alt={`${doctor.firstName} ${doctor.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <i className="fas fa-user-md text-6xl text-gray-400"></i>
          </div>
        )}
      </div>

      {/* Content Section - Clean & Minimalist */}
      <div className="flex-1 flex flex-col px-5 py-4">
        {/* Doctor Name */}
        <h3
          className="text-lg font-bold text-dark mb-1.5 line-clamp-1 group-hover/card:text-accent transition-colors duration-200"
          style={{ fontFamily: 'var(--font-vazir)' }}
        >
          دکتر {doctor.firstName} {doctor.lastName}
        </h3>

        {/* Skills/Qualifications - Minimalist */}
        {skills && (
          <div className="mb-3">
            <span className="text-xs text-gray-600 line-clamp-1" style={{ fontFamily: 'var(--font-vazir)' }}>
              {skills}
            </span>
          </div>
        )}

        {/* Biography Preview - Compact */}
        {biography && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1" style={{ fontFamily: 'var(--font-vazir)' }}>
            {biography}
          </p>
        )}

        {/* University - Subtle */}
        {doctor.university && (
          <div className="flex items-center gap-1.5 mb-4 text-[10px] text-gray-400">
            <i className="fas fa-university text-[9px]"></i>
            <span style={{ fontFamily: 'var(--font-vazir)' }}>{doctor.university}</span>
          </div>
        )}

        {/* Action Buttons - Minimalist */}
        <div className="mt-auto space-y-2 pt-3 border-t border-gray-100">
          {doctor.isAppointmentEnabled ? (
            <button
              onClick={handleBookAppointment}
              className="w-full bg-accent text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-sm"
              style={{ fontFamily: 'var(--font-vazir)' }}
            >
              <i className="fas fa-calendar-check text-xs"></i>
              <span>رزرو نوبت</span>
            </button>
          ) : (
            <div className="w-full bg-gray-50 text-gray-400 py-2.5 px-4 rounded-lg font-medium text-center cursor-not-allowed text-sm" style={{ fontFamily: 'var(--font-vazir)' }}>
              <i className="fas fa-calendar-times ml-2 text-xs"></i>
              <span>غیرفعال</span>
            </div>
          )}
          
          <button
            onClick={handleCardClick}
            className="w-full border border-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-vazir)' }}
          >
            <i className="fas fa-arrow-left text-xs"></i>
            <span>جزئیات</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default DoctorCard;

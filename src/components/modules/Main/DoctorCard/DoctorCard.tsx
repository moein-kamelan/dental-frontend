import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import type { Doctor } from "../../../../types/types";
import { getImageUrl } from "../../../../utils/helpers";
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

  const skills = doctor.skills?.slice(0, 2).join("، ") || "";
  const averageRating = doctor.stats?.averageRating;
  const totalReviews = doctor.stats?.totalReviews || 0;
  const successfulAppointments = doctor.stats?.successfulAppointments || 0;

  return (
    <motion.div
      onClick={handleCardClick}
      className="group/card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main Content - Horizontal Layout */}
      <div className="flex flex-row gap-2 md:gap-4 p-3 md:p-4">
        {/* Left Section - Doctor Info */}
        <div className="flex-1 flex flex-col gap-1.5 md:gap-2 min-w-0">
        {/* Doctor Name */}
        <h3
            className="text-xl font-bold text-dark line-clamp-1 group-hover/card:text-accent transition-colors duration-200"
          style={{ fontFamily: 'var(--font-vazir)' }}
        >
          دکتر {doctor.firstName} {doctor.lastName}
        </h3>

          {/* Specialty with Stats on same line */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {/* Specialty */}
        {skills && (
              <span className="text-base text-gray-600" style={{ fontFamily: 'var(--font-vazir)' }}>
              {skills}
            </span>
            )}

            {/* Rating and Reviews */}
            {averageRating !== null && averageRating !== undefined && (
              <div className="flex items-center gap-1.5">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'var(--font-vazir)' }}>
                  {averageRating.toFixed(2)}
                </span>
                {totalReviews > 0 && (
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-vazir)' }}>
                    ({totalReviews} نظر)
                  </span>
                )}
          </div>
        )}

            {/* Successful Appointments */}
            {successfulAppointments > 0 && (
              <div className="flex items-center gap-1.5">
                <i className="fas fa-check-circle text-green-500 text-sm"></i>
                <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-vazir)' }}>
                  {successfulAppointments.toLocaleString('fa-IR')} نوبت موفق
                </span>
              </div>
        )}
          </div>
        </div>

        {/* Right Section - Profile Image (Rounded square) */}
        <div className="shrink-0">
          {doctor?.profileImage ? (
            <img
              src={getImageUrl(doctor.profileImage)}
              alt={`${doctor.firstName} ${doctor.lastName}`}
              className="w-28 h-28 md:w-24 md:h-24 rounded-xl object-cover object-top border-2 border-gray-100"
            />
          ) : (
            <div className="w-28 h-28 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-100">
              <i className="fas fa-user-md text-2xl md:text-2xl text-gray-400"></i>
          </div>
        )}
        </div>
      </div>

      {/* Booking Button */}
      <div className="px-3 pb-3 md:px-4 md:pb-4">
          {doctor.isAppointmentEnabled ? (
            <button
              onClick={handleBookAppointment}
              className="w-full bg-accent text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-sm"
              style={{ fontFamily: 'var(--font-vazir)' }}
            >
            <span>نوبت بگیرید</span>
            </button>
          ) : (
            <div className="w-full bg-gray-50 text-gray-400 py-2.5 px-4 rounded-lg font-medium text-center cursor-not-allowed text-sm" style={{ fontFamily: 'var(--font-vazir)' }}>
              <i className="fas fa-calendar-times ml-2 text-xs"></i>
              <span>غیرفعال</span>
            </div>
          )}
      </div>
    </motion.div>
  );
}

export default DoctorCard;

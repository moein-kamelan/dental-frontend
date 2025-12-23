import React from "react";
import { motion } from "motion/react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import type { Clinic } from "../../../types/types";
import StickyBox from "react-sticky-box";
import { useParams } from "react-router-dom";
import { useGetDoctorByIdentifier } from "../../../services/useDoctors";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import { translateDayName, getImageUrl } from "../../../utils/helpers";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";
import { useAppointmentModal } from "../../../contexts/useAppointmentModal";

function DoctorDetails() {
  const { slug } = useParams();
  const { data: doctor, isLoading } = useGetDoctorByIdentifier(slug as string);
  const { openModal } = useAppointmentModal();
  const doctorData = doctor?.data?.doctor;

  const handleBookAppointment = () => {
    if (doctorData?.id) {
      openModal(doctorData.id);
    }
  };

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات دکتر..." />;

  return (
    <>
      <Breadcrumb />

      <section className="pt-3 pb-6 md:pt-4 md:pb-8 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-4 items-start max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Doctor Header Card - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Profile Image - Compact */}
                    <div className="flex justify-center sm:justify-start shrink-0">
                      <div className="relative">
                        <motion.img
                      src={
                        doctor?.data?.doctor?.profileImage
                          ? getImageUrl(doctor.data.doctor.profileImage)
                          : "/images/user_img.png"
                      }
                      alt={
                        doctor?.data?.doctor?.firstName +
                        " " +
                        doctor?.data?.doctor?.lastName
                      }
                          className="rounded-xl w-28 h-28 sm:w-36 sm:h-36 object-cover border-2 border-gray-100"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        />
                        {doctorData?.isAppointmentEnabled && (
                          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-accent px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-sm flex items-center gap-1">
                            <i className="fas fa-check-circle text-[8px]"></i>
                            <span>قابل رزرو</span>
                          </div>
                        )}
                      </div>
                  </div>

                    {/* Doctor Info - Compact */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-dark mb-1.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                          دکتر {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                        </h1>
                        {doctor?.data?.doctor?.university && (
                          <div className="flex items-center gap-1.5 text-gray-600 mb-2">
                            <i className="fas fa-university text-accent text-xs"></i>
                            <span className="text-xs" style={{ fontFamily: 'var(--font-vazir)' }}>
                              {doctor.data.doctor.university}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Skills - Compact Tags */}
                      {doctor?.data?.doctor?.skills &&
                        doctor.data.doctor.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {doctor.data.doctor.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-50 text-gray-700 rounded-md text-[10px] border border-gray-200"
                                style={{ fontFamily: 'var(--font-vazir)' }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Additional Info - Compact */}
                      {doctor?.data?.doctor?.medicalLicenseNo && (
                        <div className="flex items-center gap-2 text-gray-600 pt-1">
                          <div className="flex items-center justify-center w-7 h-7 bg-gray-50 rounded-lg shrink-0">
                            <i className="fas fa-id-card text-accent text-[10px]"></i>
                          </div>
                          <div>
                            <span className="text-[9px] text-gray-400 block leading-tight" style={{ fontFamily: 'var(--font-vazir)' }}>
                              شماره نظام پزشکی
                            </span>
                            <span className="text-xs font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                              {doctor.data.doctor.medicalLicenseNo}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Biography Section - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                  <h2 className="text-base font-bold text-dark flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                    <i className="fas fa-user-md text-accent text-xs"></i>
                    <span>بیوگرافی</span>
                  </h2>
                  </div>
                  <div
                  className="p-4 article-content text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: doctor?.data?.doctor?.biography || "",
                    }}
                  ></div>
              </motion.div>

              {/* Comments Section - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-4"
              >
              <CommentsBox doctorId={doctor?.data?.doctor?.id} />
              <CommentForm doctorId={doctor?.data?.doctor?.id} />
              </motion.div>
            </div>

            {/* Sidebar - Compact */}
            <StickyBox
              offsetBottom={20}
              offsetTop={80}
              className="max-lg:!static"
            >
              <div className="space-y-4">
                {/* Appointment Card - Compact */}
                {doctorData?.isAppointmentEnabled && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-gradient-to-br from-primary via-primary/95 to-accent rounded-xl shadow-sm overflow-hidden border border-primary/20"
                  >
                    <div className="p-3.5">
                      <div className="text-center mb-3">
                        <div className="inline-flex items-center justify-center w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full mb-1.5">
                          <i className="fas fa-calendar-check text-white text-xs"></i>
                        </div>
                        <h3 className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'var(--font-vazir)' }}>
                    درخواست نوبت
                        </h3>
                        <p className="text-white/80 text-[9px] leading-tight" style={{ fontFamily: 'var(--font-vazir)' }}>
                          برای دریافت نوبت اینجا کلیک کنید
                        </p>
                      </div>
                      <motion.button
                      onClick={handleBookAppointment}
                        className="w-full bg-white text-primary py-2 px-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-1.5 text-[10px] shadow-sm"
                        style={{ fontFamily: 'var(--font-vazir)' }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <i className="fas fa-calendar-check text-[9px]"></i>
                        <span>دریافت نوبت</span>
                      </motion.button>
                </div>
                  </motion.div>
                )}

                {/* Working Hours Card - Compact */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-20"
                >
                  <div className="bg-gray-50 px-3.5 py-2.5 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-dark flex items-center gap-1.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                      <div className="flex items-center justify-center w-6 h-6 bg-accent/10 rounded-lg shrink-0">
                        <i className="fas fa-clock text-accent text-[10px]"></i>
                      </div>
                      <span>روزهای کاری</span>
                    </h3>
                  </div>
                  <div className="p-3.5">
                  {(() => {
                    const workingDays = doctor?.data?.doctor?.workingDays;
                    const clinics = doctor?.data?.doctor?.clinics || [];
                    
                    // اگر workingDays خالی است یا null است
                      if (
                        !workingDays ||
                        Object.keys(workingDays).length === 0
                      ) {
                      return (
                          <div className="text-center py-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full mx-auto mb-2">
                              <i className="fas fa-calendar-times text-gray-400 text-xs"></i>
                            </div>
                            <p className="text-gray-500 text-xs" style={{ fontFamily: 'var(--font-vazir)' }}>
                          ساعات کاری تعریف نشده است
                        </p>
                          </div>
                      );
                    }

                    // ساختار جدید: { clinicId: { day: "..." } }
                    return clinics.map((dc: { clinic: Clinic }) => {
                      const clinicId = dc.clinic.id;
                      const clinicWorkingDays = workingDays[clinicId];
                      
                        if (
                          !clinicWorkingDays ||
                          typeof clinicWorkingDays !== "object"
                        ) {
                        return null;
                      }

                        const daysWithHours = Object.keys(
                          clinicWorkingDays
                        ).filter(
                          (day: string) =>
                            clinicWorkingDays[day] !== null &&
                            clinicWorkingDays[day] !== ""
                      );

                      if (daysWithHours.length === 0) {
                        return null;
                      }

                      return (
                          <div key={clinicId} className="mb-4 last:mb-0">
                            <h6 className="text-xs font-semibold text-dark mb-2.5 pb-1.5 border-b border-gray-100 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                              <i className="fas fa-hospital text-accent text-[10px]"></i>
                              {dc.clinic.name}
                            </h6>
                            <ul className="space-y-1">
                            {daysWithHours.map((day: string) => (
                        <li
                          key={day}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-150"
                        >
                                  <span className="text-dark text-[10px] flex items-center gap-1" style={{ fontFamily: 'var(--font-vazir)' }}>
                                    <i className="fas fa-calendar-day text-accent text-[9px]"></i>
                            {translateDayName(day)}
                          </span>
                                  <span className="text-accent font-semibold text-[10px]" style={{ fontFamily: 'var(--font-vazir)' }}>
                                  {clinicWorkingDays[day]}
                          </span>
                        </li>
                      ))}
                  </ul>
                        </div>
                      );
                    });
                  })()}
                </div>
                </motion.div>
              </div>
            </StickyBox>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorDetails;

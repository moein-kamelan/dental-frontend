import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import SEO from "../../../components/SEO/SEO";
import { generateDoctorSchema } from "../../../utils/structuredData";

function DoctorDetails() {
  const { slug } = useParams();
  const { data: doctor, isLoading } = useGetDoctorByIdentifier(slug as string);
  const { openModal } = useAppointmentModal();
  const doctorData = doctor?.data?.doctor;
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleBookAppointment = () => {
    if (doctorData?.id) {
      openModal(doctorData.id);
    }
  };

  // Detect footer visibility with Intersection Observer
  useEffect(() => {
    if (!doctorData?.isAppointmentEnabled) return;

    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // اگر فوتر در viewport است، دکمه را مخفی کن
          setIsButtonVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // وقتی 10% فوتر در viewport باشد
        rootMargin: "0px",
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, [doctorData?.isAppointmentEnabled]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات پزشک..." />;

  const doctorName = doctorData
    ? `${doctorData.firstName} ${doctorData.lastName}`
    : "";
  const doctorTitle = doctorData
    ? `دکتر ${doctorName} - کلینیک دندان پزشکی طاها`
    : "پروفایل پزشک - کلینیک دندان پزشکی طاها";
  const doctorDescription = doctorData
    ? `پروفایل دکتر ${doctorName} - ${doctorData.university || ""} - ${doctorData.skills?.join(", ") || ""}. مشاهده ساعات کاری و دریافت نوبت`
    : "پروفایل پزشک کلینیک دندان پزشکی طاها";

  // Structured Data for Doctor
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const doctorSchema = doctorData ? generateDoctorSchema({
    name: doctorName,
    jobTitle: "دندانپزشک",
    description: doctorDescription,
    image: doctorData.profileImage ? getImageUrl(doctorData.profileImage) : undefined,
    url: `${siteUrl}/doctors/${slug}`,
    worksFor: {
      name: "کلینیک دندان پزشکی طاها",
      url: `${siteUrl}/home`,
    },
    specialty: doctorData.skills || [],
  }) : undefined;

  return (
    <>
      <SEO
        title={doctorTitle}
        description={doctorDescription}
        keywords={`دکتر ${doctorName}, دندانپزشک, ${doctorData?.skills?.join(", ") || ""}, کلینیک طاها`}
        image={doctorData?.profileImage ? getImageUrl(doctorData.profileImage) : undefined}
        url={`/doctors/${slug}`}
        type="profile"
        structuredData={doctorSchema}
      />
      <Breadcrumb />

      <section className="pt-6 pb-24 md:pt-8 md:pb-16 bg-white lg:pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Doctor Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex justify-center sm:justify-start shrink-0">
                      <div className="relative">
                        {doctor?.data?.doctor?.profileImage ? (
                          <motion.img
                            src={getImageUrl(doctor.data.doctor.profileImage)}
                            alt={
                              doctor?.data?.doctor?.firstName +
                              " " +
                              doctor?.data?.doctor?.lastName
                            }
                            className="rounded-xl w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 object-cover object-top border-2 border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          />
                        ) : (
                          <div className="rounded-xl w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 flex items-center justify-center">
                            <i className="fas fa-user-md text-4xl sm:text-5xl md:text-6xl text-gray-400"></i>
                          </div>
                        )}
                      </div>
                  </div>

                    {/* Doctor Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3" style={{ fontFamily: 'var(--font-vazir)' }}>
                          دکتر {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                        </h1>
                        {doctor?.data?.doctor?.university && (
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <i className="fas fa-university text-accent text-sm"></i>
                            <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-vazir)' }}>
                              {doctor.data.doctor.university}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Skills - Tags */}
                      {doctor?.data?.doctor?.skills &&
                        doctor.data.doctor.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {doctor.data.doctor.skills.map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200"
                                style={{ fontFamily: 'var(--font-vazir)' }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Additional Info */}
                      {doctor?.data?.doctor?.medicalLicenseNo && (
                        <div className="flex items-center gap-3 text-gray-600 pt-2">
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg shrink-0">
                            <i className="fas fa-id-card text-accent text-sm"></i>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 block leading-tight mb-1" style={{ fontFamily: 'var(--font-vazir)' }}>
                              شماره نظام پزشکی
                            </span>
                            <span className="text-sm md:text-base font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                              {doctor.data.doctor.medicalLicenseNo}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Biography Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg md:text-xl font-bold text-dark flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                    <i className="fas fa-user-md text-accent text-base"></i>
                    <span>بیوگرافی</span>
                  </h2>
                  </div>
                  <div
                  className="p-6 md:p-8 article-content text-base md:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: doctor?.data?.doctor?.biography || "",
                    }}
                  ></div>
              </motion.div>

              {/* Working Hours Card - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-dark flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                    <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg shrink-0">
                      <i className="fas fa-clock text-accent text-sm"></i>
                    </div>
                    <span>روزهای کاری</span>
                  </h3>
                </div>
                <div className="p-5">
                  {(() => {
                    const workingDays = doctor?.data?.doctor?.workingDays;
                    const clinics = doctor?.data?.doctor?.clinics || [];
                    
                    if (
                      !workingDays ||
                      Object.keys(workingDays).length === 0
                    ) {
                      return (
                        <div className="text-center py-6">
                          <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full mx-auto mb-3">
                            <i className="fas fa-calendar-times text-gray-400 text-base"></i>
                          </div>
                          <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-vazir)' }}>
                            ساعات کاری تعریف نشده است
                          </p>
                        </div>
                      );
                    }

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
                        <div key={clinicId} className="mb-5 last:mb-0">
                          <h6 className="text-sm md:text-base font-semibold text-dark mb-3 pb-2 border-b border-gray-100 flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                            <i className="fas fa-hospital text-accent text-sm"></i>
                            {dc.clinic.name}
                          </h6>
                          <ul className="space-y-2">
                            {daysWithHours.map((day: string) => (
                              <li
                                key={day}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                              >
                                <span className="text-dark text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                                  <i className="fas fa-calendar-day text-accent text-xs"></i>
                                  {translateDayName(day)}
                                </span>
                                <span className="text-accent font-semibold text-sm" style={{ fontFamily: 'var(--font-vazir)' }}>
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
                {/* Appointment Card - Hidden on mobile */}
                {doctorData?.isAppointmentEnabled && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="hidden lg:block bg-gradient-to-br from-primary via-primary/95 to-accent rounded-xl shadow-sm overflow-hidden border border-primary/20"
                  >
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mb-3">
                          <i className="fas fa-calendar-check text-white text-lg"></i>
                        </div>
                        <h3 className="font-bold text-white text-lg md:text-xl mb-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                    دریافت نوبت
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-vazir)' }}>
                          برای دریافت نوبت با این پزشک، اینجا کلیک کنید
                        </p>
                      </div>
                      <motion.button
                      onClick={handleBookAppointment}
                        className="w-full bg-white text-primary py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-sm"
                        style={{ fontFamily: 'var(--font-vazir)' }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span>دریافت نوبت</span>
                      </motion.button>
                </div>
                  </motion.div>
                )}

                {/* Working Hours Card - Desktop Only */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-20"
                >
                  <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-dark flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                      <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg shrink-0">
                        <i className="fas fa-clock text-accent text-sm"></i>
                      </div>
                      <span>روزهای کاری</span>
                    </h3>
                  </div>
                  <div className="p-5">
                  {(() => {
                    const workingDays = doctor?.data?.doctor?.workingDays;
                    const clinics = doctor?.data?.doctor?.clinics || [];
                    
                    // اگر workingDays خالی است یا null است
                      if (
                        !workingDays ||
                        Object.keys(workingDays).length === 0
                      ) {
                      return (
                          <div className="text-center py-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full mx-auto mb-3">
                              <i className="fas fa-calendar-times text-gray-400 text-base"></i>
                            </div>
                            <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-vazir)' }}>
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
                          <div key={clinicId} className="mb-5 last:mb-0">
                            <h6 className="text-sm md:text-base font-semibold text-dark mb-3 pb-2 border-b border-gray-100 flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                              <i className="fas fa-hospital text-accent text-sm"></i>
                              {dc.clinic.name}
                            </h6>
                            <ul className="space-y-2">
                            {daysWithHours.map((day: string) => (
                        <li
                          key={day}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                        >
                                  <span className="text-dark text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
                                    <i className="fas fa-calendar-day text-accent text-xs"></i>
                            {translateDayName(day)}
                          </span>
                                  <span className="text-accent font-semibold text-sm" style={{ fontFamily: 'var(--font-vazir)' }}>
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

      {/* Fixed Mobile Appointment Button */}
      {doctorData?.isAppointmentEnabled && (
        <AnimatePresence>
          {isButtonVisible && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
            >
              <div className="container mx-auto px-4 py-3">
                <motion.button
                  onClick={handleBookAppointment}
                  className="w-full bg-gradient-to-r from-primary via-primary/95 to-accent text-white py-3.5 px-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-2xl pointer-events-auto"
                  style={{ fontFamily: 'var(--font-vazir)' }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-calendar-check text-lg"></i>
                  <span>دریافت نوبت</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default DoctorDetails;

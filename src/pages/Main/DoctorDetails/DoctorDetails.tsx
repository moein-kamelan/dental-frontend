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

      <section className="py-8 md:py-12 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Doctor Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-transparent p-6 md:p-8">
                  <div className="grid md:grid-cols-[280px_1fr] gap-6 md:gap-8">
                    {/* Profile Image */}
                    <div className="flex justify-center md:justify-start">
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
                          className="rounded-3xl w-64 h-64 md:w-80 md:h-80 object-cover shadow-xl border-4 border-white"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        />
                        {doctorData?.isAppointmentEnabled && (
                          <div className="absolute bottom-4 left-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-estedad-semibold shadow-lg flex items-center gap-2">
                            <i className="fas fa-check-circle"></i>
                            <span>قابل رزرو</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-estedad-verybold text-dark mb-2">
                          دکتر {doctor?.data?.doctor?.firstName}{" "}
                          {doctor?.data?.doctor?.lastName}
                        </h1>
                        {doctor?.data?.doctor?.university && (
                          <div className="flex items-center gap-2 text-paragray mb-3">
                            <i className="fas fa-university text-accent"></i>
                            <span className="font-estedad-medium">
                              {doctor.data.doctor.university}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      {doctor?.data?.doctor?.skills &&
                        doctor.data.doctor.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {doctor.data.doctor.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-4 py-1.5 bg-gradient-to-r from-accent/10 to-primary/10 text-accent rounded-full text-sm font-estedad-medium border border-accent/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Additional Info */}
                      <div className="space-y-3 pt-2">
                        {doctor?.data?.doctor?.medicalLicenseNo && (
                          <div className="flex items-center gap-3 text-paragray">
                            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                              <i className="fas fa-id-card text-accent"></i>
                            </div>
                            <div>
                              <span className="text-xs text-paragray block mb-0.5">
                                شماره نظام پزشکی
                              </span>
                              <span className="font-estedad-semibold text-dark">
                                {doctor.data.doctor.medicalLicenseNo}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Biography Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-accent p-6">
                  <h2 className="text-2xl md:text-3xl font-estedad-bold text-white flex items-center gap-3">
                    <i className="fas fa-user-md"></i>
                    <span>
                      بیوگرافی دکتر {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                    </span>
                  </h2>
                </div>
                <div
                  className="p-6 md:p-8 md:p-10 article-content"
                  dangerouslySetInnerHTML={{
                    __html: doctor?.data?.doctor?.biography || "",
                  }}
                ></div>
              </motion.div>

              {/* Comments Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-6"
              >
                <CommentsBox doctorId={doctor?.data?.doctor?.id} />
                <CommentForm doctorId={doctor?.data?.doctor?.id} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <StickyBox
              offsetBottom={20}
              offsetTop={100}
              className="max-lg:!static"
            >
              <div className="space-y-6">
                {/* Appointment Card */}
                {doctorData?.isAppointmentEnabled && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-br from-primary via-accent to-primary rounded-3xl shadow-xl overflow-hidden border border-accent/20"
                  >
                    <div className="p-6 md:p-8">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                          <i className="fas fa-calendar-check text-white text-2xl"></i>
                        </div>
                        <h3 className="font-estedad-bold text-white text-xl md:text-2xl mb-2">
                          درخواست نوبت
                        </h3>
                        <p className="text-white/90 text-sm font-estedad-medium">
                          برای دریافت نوبت اینجا کلیک کنید
                        </p>
                      </div>
                      <motion.button
                        onClick={handleBookAppointment}
                        className="w-full bg-white text-primary py-4 px-6 rounded-2xl font-estedad-bold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <i className="fas fa-calendar-check text-xl"></i>
                        <span>دریافت نوبت</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Working Hours Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden sticky top-24"
                >
                  <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 border-b border-gray-100">
                    <h3 className="text-xl md:text-2xl font-estedad-bold text-dark flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-xl">
                        <i className="fas fa-clock text-white"></i>
                      </div>
                      <span>روزهای کاری</span>
                    </h3>
                  </div>
                  <div className="p-6">
                    {(() => {
                      const workingDays = doctor?.data?.doctor?.workingDays;
                      const clinics = doctor?.data?.doctor?.clinics || [];

                      // اگر workingDays خالی است یا null است
                      if (
                        !workingDays ||
                        Object.keys(workingDays).length === 0
                      ) {
                        return (
                          <div className="text-center py-8">
                            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                              <i className="fas fa-calendar-times text-paragray text-xl"></i>
                            </div>
                            <p className="text-paragray font-estedad-medium">
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
                          <div key={clinicId} className="mb-6 last:mb-0">
                            <h6 className="text-base font-estedad-bold text-dark mb-4 pb-2 border-b border-gray-100">
                              <i className="fas fa-hospital text-accent ml-2"></i>
                              {dc.clinic.name}
                            </h6>
                            <ul className="space-y-2">
                              {daysWithHours.map((day: string) => (
                                <li
                                  key={day}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/5 transition-colors duration-200"
                                >
                                  <span className="text-dark font-estedad-medium flex items-center gap-2">
                                    <i className="fas fa-calendar-day text-accent text-sm"></i>
                                    {translateDayName(day)}
                                  </span>
                                  <span className="text-accent font-estedad-semibold">
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

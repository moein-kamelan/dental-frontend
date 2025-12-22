import React from "react";
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

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start ">
            <div className="lg:col-span-2 space-y-8">
              <div className=" ">
                <div className="grid md:grid-cols-[342px_1fr] gap-8 mb-8 ">
                  <div className="max-md:flex max-md:justify-center max-md:items-center">
                    <img
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
                      className="rounded-2xl   size-80  "
                    />
                  </div>
                  <div className="space-y-5">
                    <h3 className="text-2xl text-primary font-estedad-verybold ">
                      {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                    </h3>
                    <div className="space-y-2.5 text-dark font-estedad-light">
                      <p className="">{doctor?.data?.doctor?.university}</p>
                      <p className="">
                        {doctor?.data?.doctor?.skills.join(", ")}
                      </p>
                      <p className="">
                        شماره نظام پزشکی:{" "}
                        {doctor?.data?.doctor?.medicalLicenseNo}
                      </p>
                      <a
                        href="callto:0123456789"
                        className="block font-estedad-semibold"
                      >
                        تماس: (۷۰۰) ۲۳۰-۰۰۳۵
                      </a>
                      <a
                        href="mailto:example@gmail.com"
                        className="block font-estedad-semibold"
                      >
                        ایمیل: example@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="section-border ">
                  <div className="py-5 px-6 border-b-[1.5px] border-[rgba(94,91,91,0.09)]">
                    <h3 className="text-2xl font-estedad-semibold text-dark ">
                      بیوگرافی دکتر {doctor?.data?.doctor?.firstName}{" "}
                      {doctor?.data?.doctor?.lastName}
                    </h3>
                  </div>
                  <div
                    className="py-8 px-10"
                    dangerouslySetInnerHTML={{
                      __html: doctor?.data?.doctor?.biography || "",
                    }}
                  ></div>
                </div>
              </div>

              <CommentsBox doctorId={doctor?.data?.doctor?.id} />
              <CommentForm doctorId={doctor?.data?.doctor?.id} />
            </div>

            <StickyBox
              offsetBottom={20}
              offsetTop={100}
              className="max-lg:!static"
            >
              <div className="space-y-6    ">
                {doctorData?.isAppointmentEnabled && (
                  <div className="bg-primary rounded-lg py-9 px-6">
                  <h5 className="font-estedad-semibold text-white text-center text-2xl mb-4">
                    درخواست نوبت
                  </h5>
                    <button
                      onClick={handleBookAppointment}
                      className="main-btn w-full text-primary bg-white flex items-center justify-center gap-2 py-4 px-6 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 text-lg font-estedad-semibold"
                    >
                      <i className="fas fa-calendar-check text-xl"></i>
                      دریافت نوبت
                    </button>
                </div>
                )}

                <div className="bg-white rounded-2xl border-[1.5px] border-[rgba(94,91,91,0.09)]  p-7.5 sticky h-fit top-24">
                  <h5 className="text-2xl relative   font-estedad-semibold text-dark pb-2.5 border-b-2 border-[#5e5b5b17] mb-6 after:absolute after:content-[''] after:bg-primary after:top-full  after:-translate-y-px after:h-1 after:left-0 after:right-0 after:w-32">
                    روز های کاری
                  </h5>
                  {(() => {
                    const workingDays = doctor?.data?.doctor?.workingDays;
                    const clinics = doctor?.data?.doctor?.clinics || [];
                    
                    // اگر workingDays خالی است یا null است
                    if (!workingDays || Object.keys(workingDays).length === 0) {
                      return (
                        <p className="text-paragray text-center py-4">
                          ساعات کاری تعریف نشده است
                        </p>
                      );
                    }

                    // ساختار جدید: { clinicId: { day: "..." } }
                    return clinics.map((dc: { clinic: Clinic }) => {
                      const clinicId = dc.clinic.id;
                      const clinicWorkingDays = workingDays[clinicId];
                      
                      if (!clinicWorkingDays || typeof clinicWorkingDays !== "object") {
                        return null;
                      }

                      const daysWithHours = Object.keys(clinicWorkingDays).filter(
                        (day: string) => clinicWorkingDays[day] !== null && clinicWorkingDays[day] !== ""
                      );

                      if (daysWithHours.length === 0) {
                        return null;
                      }

                      return (
                        <div key={clinicId} className="mb-6 last:mb-0">
                          {clinics.length > 1 && (
                            <h6 className="text-lg font-estedad-semibold text-dark mb-3">
                              {dc.clinic.name}
                            </h6>
                          )}
                          <ul className="text-paragray *:font-estedad-light divide-y-2 divide-[rgba(94,91,91,0.09)]">
                            {daysWithHours.map((day: string) => (
                        <li
                          key={day}
                          className="flex items-center justify-between py-3"
                        >
                          <span className="text-dark">
                            {translateDayName(day)}
                          </span>
                          <span className="text-paragray">
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
              </div>
            </StickyBox>
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorDetails;

import React from "react";
import { useNavigate } from "react-router-dom";
import type { Doctor } from "../../../../types/types";
import { stripHtmlTags } from "../../../../utils/helpers";

interface DoctorCardProps {
  doctor?: Doctor;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (doctor) {
      navigate(`/doctors/${doctor.slug}`);
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // اگر doctor وجود نداشته باشد، چیزی نمایش نده
  if (!doctor) {
    return null;
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_24px_rgba(42,122,122,0.15)] transition group/card cursor-pointer border border-transparent hover:border-secondary/20 flex flex-col h-full"
    >
      <div className="relative overflow-hidden shrink-0">
        <img
          src={
            doctor?.profileImage
              ? `http://localhost:4000${doctor.profileImage}`
              : "/images/team-1.jpg"
          }
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="w-full h-80 object-cover"
        />

        <div className=" absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover/card:bg-primary/50 scale-90 group-hover/card:scale-100 origin-center"></div>
      </div>

      <div className="grow  shrink-0 px-6 py-4 bg-primary text-white group-hover/card:bg-secondary transition-all duration-500 flex  justify-between gap-x-4">
        <div className="flex flex-col grow justify-between  gap-y-2">
          <h6 className="text-xl font-estedad-semibold line-clamp-2">
            {doctor.firstName} {doctor.lastName}
          </h6>
          <p className="text-sm line-clamp-2">
            {stripHtmlTags(doctor.biography || "")}
          </p>
          <div className="flex mt-auto items-center  gap-3">
            <i className="	fas fa-graduation-cap"></i>
            <span className="text-sm block  font-estedad-light">
              MBBS, FCPS, FRCS
            </span>
          </div>
        </div>
        <div className="flex shrink-0 my-auto  items-center justify-center size-9 bg-white rounded-full">
          <i className="fa fa-plus text-primary"></i>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;

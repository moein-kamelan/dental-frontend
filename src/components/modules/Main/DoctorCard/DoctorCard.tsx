import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }: { doctor: any }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/doctors/${doctor.slug}`);
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_24px_rgba(42,122,122,0.15)] transition group/card cursor-pointer border border-transparent hover:border-secondary/20"
    >
      <div className="relative overflow-hidden">
        <img
          src="images/team-1.jpg"
          alt="team"
          className="w-full h-80 object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover/card:bg-primary/50 scale-90 group-hover/card:scale-100 origin-center">
          <ul className="absolute invisible opacity-0 group-hover/card:visible group-hover/card:opacity-100 bottom-8 left-8 flex flex-col items-center bg-primary gap-2 px-1 py-2 rounded-4xl transition-all duration-500">
            <li className="group size-8 flex items-center justify-center rounded-full hover:bg-white transition">
              <a href="#" onClick={handleSocialClick}>
                <i className="fab fa-facebook-f text-white text-base group-hover:text-primary"></i>
              </a>
            </li>
            <li className="group size-8 flex items-center justify-center rounded-full hover:bg-white transition">
              <a href="#" onClick={handleSocialClick}>
                <i className="fab fa-twitter text-white text-base group-hover:text-primary"></i>
              </a>
            </li>
            <li className="group size-8 flex items-center justify-center rounded-full hover:bg-white transition">
              <a href="#" onClick={handleSocialClick}>
                <i className="fab fa-whatsapp text-white text-base group-hover:text-primary"></i>
              </a>
            </li>
            <li className="group size-8 flex items-center justify-center rounded-full hover:bg-white transition">
              <a href="#" onClick={handleSocialClick}>
                <i className="fab fa-linkedin-in text-white text-base group-hover:text-primary"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-6 py-4 bg-primary text-white group-hover/card:bg-secondary transition-all duration-500 flex items-center justify-between gap-x-4">
        <div className="flex flex-col gap-y-2 ">
          <h6 className="text-xl font-estedad-semibold">{doctor.firstName} {doctor.lastName} </h6>
          <p className="text-sm"> {doctor.biography} ({doctor.skills.join(', ')})</p>
          <div className="flex items-center  gap-3">
            <i className="	fas fa-graduation-cap"></i>
            <span className="text-sm block  font-estedad-light">
              MBBS, FCPS, FRCS
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center size-9 bg-white rounded-full">
          <i className="fa fa-plus text-primary"></i>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;

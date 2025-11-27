import { useNavigate } from "react-router-dom";
import type { Service } from "../../../../types/types";
import { stripHtmlTags } from "../../../../utils/helpers";

function ServiceCard({ service }: { service: Service }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (service) {
      navigate(`/services/${service.slug}`);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const formatPrice = (price?: number) => {
    if (!price) return "تماس بگیرید";
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-[10px] group overflow-hidden shadow-lg hover:shadow-[0_8px_24px_rgba(42,122,122,0.15)] transition p-5 cursor-pointer border border-transparent hover:border-secondary/20 flex flex-col"
    >
      <div className="relative h-64">
        <img
          src={
            service?.coverImage
              ? `http://localhost:4000${service.coverImage}`
              : "/images/service-1.jpg"
          }
          alt={service.title}
          className="w-full h-full  rounded-[5px] group-hover:scale-105 transition-all duration-500"
        />
 
      </div>
      <div className="mt-6 flex flex-col grow gap-y-3">
        <h3 className="text-2xl sm:text-[18px] md:text-2xl font-estedad-semibold text-dark group-hover:text-accent transition-all duration-500 line-clamp-1">
          {service.title}
        </h3>
        <p className="text-paragray font-estedad-light line-clamp-2 ">
          {stripHtmlTags(service.description)}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span
            onClick={handleLinkClick}
            className="text-dark font-estedad-semibold flex items-center gap-2 group-hover:text-accent transition-all duration-500"
          >
            بیشتر بدانید
            <i className="fa fa-arrow-left text-xl text-dark group-hover:text-accent transition-all duration-500"></i>
          </span>
          <span className="text-primary font-estedad-semibold text-sm">
            {formatPrice(service.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;

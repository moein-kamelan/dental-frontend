import { useNavigate } from "react-router-dom";
import type { Service } from "../../../../types/types";
import { stripHtmlTags, getImageUrl } from "../../../../utils/helpers";

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
      className="bg-white rounded-xl group overflow-hidden shadow-lg hover:shadow-[0_8px_24px_rgba(42,122,122,0.15)] transition p-5 cursor-pointer border border-transparent hover:border-secondary/20 flex flex-col"
    >
      <div className="relative  flex  items-center gap-4 ">
        {service?.coverImage ? (
<div className="basis-1/4 shrink-0 ">
<img
            src={getImageUrl(service.coverImage)}
            alt={service.title}
            className=" rounded-full group-hover:scale-105 transition-all duration-500 object-cover"
          />
</div>
        ) : (
          <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <i className="fas fa-image text-gray-400 text-xl sm:text-2xl"></i>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm font-estedad-light">
                تصویر خدمات
              </p>
            </div>
          </div>
        )}
              <h3 className="basis-2/3 text-2xl sm:text-[18px] md:text-2xl font-estedad-semibold text-dark group-hover:text-accent transition-all duration-500 line-clamp-2 ">
          {service.title}
        </h3>
      </div>
      <div className="mt-6 flex flex-col grow gap-y-3">
  
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

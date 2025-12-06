import type { Review } from "../../../types/types";

function CommentCard({ review }: { review?: Review }) {
  // Fallback for static content if no review provided
  if (!review) {
  return (
    <div className="bg-white rounded-lg  p-8 shadow-lg">
      <div className="flex gap-1 text-secondary mb-4">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
      <p className="text-paragray mb-6 font-estedad-light line-clamp-3">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="images/review-1.png"
            alt="reviewer"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-bold text-dark">محسن دادار</h3>
              <span className="text-paragray text-sm font-estedad-light">
                مشتری
              </span>
            </div>
          </div>
          <div className="w-[42px] h-8 shrink-0 flex items-center justify-center">
            <div className="text-accent">
              <i className="fas fa-tooth text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg  p-8 shadow-lg">
      <div className="flex gap-1 text-secondary mb-4">
        {Array.from({ length: review.rating }).map((_, index) => (
          <i className="fas fa-star" key={index}></i>
        ))}
        {Array.from({ length: 5 - review.rating }).map((_, index) => (
          <i className="fas fa-star text-gray-300" key={index}></i>
        ))}
      </div>
      <p className="text-paragray mb-6 font-estedad-light line-clamp-3">
        {review.content}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {review.profileImage ? (
            <img
              src={`http://localhost:4000${review.profileImage}`}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src="images/review-1.png"
              alt="reviewer"
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <h3 className="font-bold text-dark">{review.name}</h3>
            <span className="text-paragray text-sm font-estedad-light">
              مشتری
            </span>
          </div>
        </div>
        <div className="w-[42px] h-8 shrink-0 flex items-center justify-center">
          <div className="text-accent">
            <i className="fas fa-tooth text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;

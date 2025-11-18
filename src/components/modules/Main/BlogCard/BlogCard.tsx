import { useNavigate } from "react-router-dom";
import type { Article } from "../../../../types/types";

interface BlogCardProps {
  article?: Article;
}

function BlogCard({ article }: BlogCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (article) {
      navigate(`/blog/${article.slug}`);
    }
  };

  // اگر article وجود نداشته باشد، یک کارت نمونه نمایش می‌دهیم
  if (!article) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_24px_rgba(42,122,122,0.15)] transition group/card cursor-pointer border border-transparent hover:border-secondary/20"
    >
      <div className="relative h-64">
        <img
          src={article.coverImage || "images/blog-1.jpg"}
          alt={article.title}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-all duration-800"
        />
        {article.categories && article.categories.length > 0 && (
          <span
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            {article.categories[0].name}
          </span>
        )}
      </div>
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-6 text-sm text-paragray">
          <span className="flex items-center gap-2">
            <i className="fas fa-user mr-1 text-primary"></i>ادمین
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-calendar-alt mr-1 text-primary"></i>
            {formatDate(article.createdAt)}
          </span>
        </div>
        <h3 className="text-xl text-dark hover:text-primary transition-colors duration-500">
          <span className="font-estedad-lightbold text-[22px] lg:text-2xl line-clamp-2 group-hover/card:text-accent transition-all duration-500">
            {article.title}
          </span>
        </h3>
        <p className="text-paragray font-estedad-light line-clamp-2">
          {article.excerpt || article.content.substring(0, 100)}
        </p>
        <div className="flex justify-between items-center pt-4">
          <span className="text-dark hover:text-primary flex items-center gap-2 transition-colors duration-500 text-sm md:text-base group-hover/card:text-accent">
            بیشتر بخوانید <i className="fas fa-long-arrow-alt-left"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;

import { useGetCommentsStats } from "../../../../../services/useComments";

function CommentsStats() {
  const { data: statsData, isLoading } = useGetCommentsStats();

  const doctorStats = statsData?.data?.doctor || {
    total: 0,
    published: 0,
    unpublished: 0,
    read: 0,
    unread: 0,
  };

  const articleStats = statsData?.data?.article || {
    total: 0,
    published: 0,
    unpublished: 0,
    read: 0,
    unread: 0,
  };

  const serviceStats = statsData?.data?.service || {
    total: 0,
    published: 0,
    unpublished: 0,
    read: 0,
    unread: 0,
  };

  const statsCards = [
    {
      title: "نظرات پزشکان",
      stats: doctorStats,
      icon: "fas fa-user-md",
      bgColor: "bg-blue-100",
      iconColor: "text-primary",
      isLoading: isLoading,
    },
    {
      title: "نظرات مقالات",
      stats: articleStats,
      icon: "fas fa-newspaper",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      isLoading: isLoading,
    },
    {
      title: "نظرات خدمات",
      stats: serviceStats,
      icon: "fas fa-handshake",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      isLoading: isLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-estedad-semibold text-dark">
              {card.title}
            </h4>
            <div
              className={`w-12 h-12 shrink-0 ${card.bgColor} rounded-lg flex items-center justify-center`}
            >
              <i className={`${card.icon} ${card.iconColor} text-xl`}></i>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-estedad-light text-sm">
                کل نظرات:
              </p>
              {card.isLoading ? (
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-lg font-estedad-semibold text-dark">
                  {card.stats.total.toLocaleString("fa-IR")}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-estedad-light text-sm">
                منتشر شده:
              </p>
              {card.isLoading ? (
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-lg font-estedad-semibold text-green-500">
                  {card.stats.published.toLocaleString("fa-IR")}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-estedad-light text-sm">
                منتشر نشده:
              </p>
              {card.isLoading ? (
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-lg font-estedad-semibold text-orange-500">
                  {card.stats.unpublished.toLocaleString("fa-IR")}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-estedad-light text-sm">
                خوانده شده:
              </p>
              {card.isLoading ? (
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-lg font-estedad-semibold text-green-600">
                  {card.stats.read.toLocaleString("fa-IR")}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 font-estedad-light text-sm">
                خوانده نشده:
              </p>
              {card.isLoading ? (
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-lg font-estedad-semibold text-blue-600">
                  {card.stats.unread.toLocaleString("fa-IR")}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsStats;

